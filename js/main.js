$(document).ready(function () {
    var myElement = $('.active')[0];
    var mc = new Hammer(myElement);

    mc.get('pan').set({ direction: Hammer.DIRECTION_ALL });
    mc.get('swipe').set({ direction: Hammer.DIRECTION_ALL });

    var previousArticle = function () {
        var curr = $('article.active');
        curr.removeClass('active');
        var prev = curr.prev();
        if (!prev.length) {
            prev = $('article').last();
        }
        prev.addClass('active');
    };

    var nextArticle = function () {
        var curr = $('article.active');
        curr.removeClass('active');
        var next = curr.next();
        if (!next.length) {
            next = $('article').first();
        }

        next.addClass('active');
    };

    var nextSection = function () {
        var curr = $('article section.active');
        var article = curr.closest('article');
        curr.removeClass('active');
        var next = curr.next();
        if (!next.length) {
            next = $(article).find('section').first();
        }

        next.addClass('active');
    };

    mc.on("panleft panright tap press", function (ev) {
        switch (ev.type) {
            case "panleft":
                previousArticle();
                break;
            case "panright":
                nextArticle();
                break;
            case "tap":
            case "press":
                nextSection();
                break;
        }
    });
});