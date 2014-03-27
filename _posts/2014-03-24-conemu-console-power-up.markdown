---
layout: post
title: "ConEmu: console's power up"
category: Productivity
tags: "console, ConEmu"
description: "The way you use the Windows console is about to change with this little, yet feature rich, utility program!"
---
## Intro ##
Everyone has faced the need to interact with command line tools in some point of their life.
Not all like this "low" level of interaction, or maybe are used to more polished interfaces, but in some point there is no alternative.
On the other hand, there are the people that use them fluently to perform the most diverse kind of tasks in an automated way.

I place myself in some place in the middle of both, passing most of my days apart from consoles, but not disliking when I've to get my hands on them.

For all of us, under a Windows environment, the out-of-the-box tool (cmd.exe) is pretty limited, having only the basic functions, like command history, paste, and selection (but only by column, drawing a rectangular area to copy, which includes empty spaces).

## Enhancing the experience ##
The tool this post talks about is [ConEmu](https://code.google.com/p/conemu-maximus5/ "ConEmu's home page"), a *Console Emulator* that brings an impressive number of goodies to the classic console. It's not a new tool, as it has been around since 2006, and in 2008 development shifted to the actual mantainer, maximus5. Other [blog post](www.hanselman.com/blog/ConEmuTheWindowsTerminalConsolePromptWeveBeenWaitingFor.aspx "Scott post on ConEmu") has been written about this too.

Originally, ConEmu was made as a plugin for [FAR Manager](http://farmanager.com/index.php?l=en "FAR Manager home page"), a program for managing files and archives with a text based UI, and developed by Eugene Roshal, the maker of WinRAR.

ConEmu it's not a shell *per se*, but a host for other console applications, like cmd, powershell, and git-bash. Even single GUI applications can run inside ConEmu. So you end running this tool to interact with other processes with a better experience, and that is the topic that I'll cover in the rest of this post.

## Simple commonly used features ##
Let's talk about the features that you will be unconsciously using, cause they feel natural and can be found in other applications.

I've been using ConEmu for a month or so, and these're the things noted at first glance and I think they are also the most used.

At the time of this writing I'm using ConEmu 140304pre. 

### Tabs ###
Tabs are a must for proper multitasking work. They can be found in a lot of programs, from text editors to browsers. We're used to work in a tabbed environment, and consoles shouldn't be the exception.

The deal here is to run multiple consoles, each one in a different tab. As expected, you can switch through them with `Ctrl+TAB` (LRU order). After the first `Ctrl+TAB` stroke, you can cycle tabs sequentially using the left and right arrow keys (while still holding `Ctrl`).

![ConEmu tabbed view](/images/conemu-tabs.png)

### Text selection ###
Click anywhere on the screen and drag the mouse to select text. When you release the mouse button you'll have your selection copied into the clipboard. Hurray!

There're two selection modes, by line (like in a word processor) or by column (like in cmd.exe). Both support some kind of gesture that allows them to be started automatically, or a explicit form aided by a keystroke hold.  

To perform the former, just start dragging the pointer *horizontally* after clicking the screen. Alternatively, you can hold `Shift` and then perform the selection in any direction.

The column selection it is done by dragging *verticallly* the cursor after clicking, or by holding the `Alt` key. 

![ConEmu text selection](/images/conemu-text-selection.png)

### One right-click paste ###
This is not a revolutionary shortcut, but technically speaking, it reduces 50% the number of clicks to paste text into the console, compared to the traditional method :-P 

### Cursor positioning ###
Click anywhere between the text to place the cursor in that position. No more arrow keys navigation!

### Window resizing, fullscreen support and split screen ###
The odd cmd window with his 80-columns width is awful. ConEmu can take advantage of a big screen by letting us expand the window *a piacere*. And if maximized isn't enough, it also has a fullscreen mode (that can be toggled easily with `Alt+Enter`).

That's ok. But taking the whole screen for a single console could be much room for nothing. Because of this, another great feature is the hability to split (vertical or horizontal) the window and work with multiple tabs on the same screen. The next image speaks for itself.

![ConEmu split screen](/images/conemu-split-screen.png)

### Jump lists ###
Pin ConEmu to the Windows Task Bar and start your favorite tasks from the right-click menu. It'll show up the first nine tasks you have. Every time you update or reorder your task list, remember to use the update button in settings. 

![ConEmu split screen](/images/conemu-jump-lists.png)

## Conclusion ##
There's so much about ConEmu not covered in this post that makes it very superficial. It has a lot of tunning options, that lets you adapt it to better suit your taste. It pair togheter with other tools like [Clink](http://mridgers.github.io/clink/ "Clink's home page"), making it extremely adaptable, so you don't have to left anything behind for use this powerful program.

Also, many of the features described here are configurable in many different ways, so this is by no means an exhaustive guide on how to use them.

The best way to get started with a tool like this, is to start using the basic things, and then move to the more advanced settings (which maybe I'll cover in another post). There're also [many questions](http://superuser.com/questions/tagged/conemu "ConEmu questions on superuser.com") about ConEmu on superuser.com, much of them answered by Maximus himself.

I hope you find this post useful and give [ConEmu](https://code.google.com/p/conemu-maximus5/ "ConEmu's home page") a try! 
