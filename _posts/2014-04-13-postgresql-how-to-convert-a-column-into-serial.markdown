---
layout: post
title: "PostgreSQL: how to convert a column into serial"
category: Programming
tags: "postgresql serial sequence"
toc: true
relatedContent:
  - title: "SQL:2003 Features"
    url: "http://www.wiscorp.com/SQL2003Features.pdf"

  - title: "Subtle SQL differences: IDENTITY columns"
    url: "http://blog.jooq.org/tag/generated-as-identity"
---
## Intro ##
I've been working with PostgreSQL recently, doing some things on the GIS ground.

One thing I've to do last day was to turn a column into an _autoincremental column_ (those types of columns that gets their value automatically from some type of source, whichs feeds them with incremental integer numbers).

In Postgres, like in many other database engines (Oracle, SQL Server 2012, just to mention the most populars) you've **sequence objects**, which are the ones from where you can obtain the next value to use. Sequences were standardized in the SQL:2003 standard.

They can be used as free-standing objets, to perform any kind of operation that requires a sequentally unique number, inside functions or stored procedures. Or they can be used to assign values to a column upon inserting rows. This is the most used scenario for sequences I've seen so far, having an integer primary key that we don't care about its particular value (the so called _surrogate key_), and hence, we don't want to bother in calculating it manually.

For the last scenario, each particular engine offers some help to correlate the values of a sequence with a column. Sometimes it's the IDE that does that job for us. For example, in Oracle's SQL Developer, the dialog for sequence creation also allows us to select a table and column for which the sequence is intended to be used. Doing that, it'll not only create the sequence, but also create a `BEFORE INSERT` trigger to assign the next value in the sequence to the incomming row.

PostgreSQL has the `SERIAL` pseudotype, which is a shorthand to create a `NOT NULL` integer column, create a sequence, and bind them togheter with a `DEFAULT` constraint and proper ownership.

For long time SQL Server has shipped with the `IDENTITY` property, being the only way to do an autoincremental column managed by the engine. In fact, the SQL:2003 standard also specifies this type of columns, adding the expression `GENERATED { ALWAYS | BY DEFAULT } AS IDENTITY` to the SQL dialect (which is part of the column definition at table creation time). SQL Server 2012 added sequence objects, which overcomes many of the limitations impossed by the `IDENTITY` property. But, unlike PostgreSQL, you must create the sequence manually and setup the constraint on the column by yourself.

Well, this intro has become larger than expected and too much documentary-like, so let's go straight to the point.

## Can I change that column to SERIAL? ##
Back on track, what happens in PostgreSQL if we create a simple integer column, and some time later we need it to behaves like if it was created with the `SERIAL` keyword?

If we take a look at the modify column window in PgAdmin, we'll find that the dropdown list for column type has a lot less options compared to the original one, when we added the column.

This fact led us to do the job by ourselves.

Excecuting a step-by-step list of commands be can do it easily.

## Setup sample objects ##

For testing purposes, I'll create a new schema to work with. This is because working in the public schema hides some caveats that must be taken into account.

So let's create the schema:
{% highlight sql %}
CREATE SCHEMA test_schema;
{% endhighlight %}

Next, we'll create our sample table in that schema:
{% highlight sql %}
CREATE TABLE test_schema.test_table
(
    id INT NOT NULL PRIMARY KEY
);
ALTER TABLE test_schema.test_table OWNER to postgres;
{% endhighlight %}

And we'll add some rows to it:
{% highlight sql %}
INSERT INTO test_schema.test_table VALUES (1);
INSERT INTO test_schema.test_table VALUES (2);
INSERT INTO test_schema.test_table VALUES (3);
{% endhighlight %}

## Creating and binding the sequence ##

Now it's time to alter the `id` column in order to associate it with a sequence. First comes the sequence creation:
{% highlight sql %}
SET search_path TO test_schema;

CREATE SEQUENCE test_schema.test_seq;
ALTER SEQUENCE test_schema.test_seq OWNER TO postgres;
ALTER SEQUENCE test_schema.test_seq OWNED BY test_table.id;
{% endhighlight %}

One important thing to note here is the first `SET` instruction. I found this is required in order for the `OWNED BY` option to work properly. The allowed syntax is `<table>.<column>`, and we must explicitly set the search path, otherwise it'll not found the table (an error "Relation test_layer doesn't exist" will be raised).

Finally, all what it's left is to put a default constraint on the id column, gathering a value for the squence 
{% highlight sql %}
ALTER TABLE test_schema.test_table
ALTER COLUMN id SET DEFAULT nextval('test_schema.test_seq');
{% endhighlight %}

At this point we have our sequence bound to the column, so if we insert some new record:
{% highlight sql %}
INSERT INTO test_schema.test_table VALUES (DEFAULT);
{% endhighlight %}

We get..

    ERROR:  duplicate key value violates unique constraint "test_table_pkey"
    DETAIL:  Key (id)=(1) already exists.

..an error! :/

Why this happens? It's important to note that we created the sequence with all default options, and thus, the initial value is set to 1. Then, when the column gets that value by default, the primary key constraint is not met, which raises an error.

The additional step needed to solve this situation (only required if the table already has rows at the time we make the change) is to update the sequence's next value:

{% highlight sql %}
SELECT setval('test_schema.test_seq', (SELECT MAX(id) FROM test_schema.test_table));
{% endhighlight %}

And that's it, work done!

To tear down the objects created by running this example, use the following code:
{% highlight sql %}
DROP TABLE test_schema.test_table;
DROP SCHEMA test_schema;
{% endhighlight %}

One advantage to have the sequence owned by a table column is that dropping the column also drops the sequence, which derives in less maintainance effort.

## Conclusion ##
As we have seen, PostgreSQL does a great job by setting up the sequence at the table creation time, but we need to put our hands a little deeper in code to make changes in order to achieve the same results.

The scenario described in this post has an [answered question in SO](http://stackoverflow.com/questions/9490014/adding-serial-to-existing-column-in-postgres "Related SO Question") which has been of great help to get started.

Yet, some things are not covered in the answer, and was why I ended making this post, to show how I've addressed other common pitfalls in applying the changes.

It's worth to say that this is not a scenario seen many times. Normally you'll have clearly defined when to use a `SERIAL` from the beginning, avoiding this entirely.

In my particular case, I was using a tool that generates the table for me, and inserts data into it. Some limitations keep me from use a particular column like autoincremental primary key, so I had to use this scripts to accomodate the table structure in a post-creation step.

Well, nothing more to say, just wish you good luck whenever you need to use this!
(and you should have it since you got the scripts ;)