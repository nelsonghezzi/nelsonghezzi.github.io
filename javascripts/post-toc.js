$(document).ready(function() {

    var stickyNav = function($elem){
        var $window = $(window),
            offset = $elem.offset(),
            stickyNavTop = offset.top;

        $elem.css('left', offset.left);

        var stickyFn = function() {
            var scrollTop = $window.scrollTop();

            if (scrollTop > stickyNavTop) {
                $elem.addClass('sticky');
            } else {
                $elem.removeClass('sticky');
            }
        };

        $window.scroll(stickyFn);

        stickyFn();
    };

    var toc = $(document.createElement('nav'));
    toc.prop('id', 'toc');

    $('#sidebar').append(toc);
    toc.tocify({
        context: 'article.post',
        selectors: 'h2, h3',
        hashGenerator: 'pretty',
        extendPage: false,
        showAndHide: true,
        theme: 'bootstrap'
    });

    stickyNav(toc);
});