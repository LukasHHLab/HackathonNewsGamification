$(document).ready(function () {
    var myElement = $('.active')[0];
    var mc = new Hammer(myElement);
    mc.get('pan').set({ direction: Hammer.DIRECTION_ALL });
    mc.get('swipe').set({ direction: Hammer.DIRECTION_ALL });

    mc.on("panleft panright panup pandown tap press", function (ev) {
        myElement.textContent = ev.type +" gesture detected.";
    });
    mc.on("swipeleft swiperight swipeup swipedown tap press", function (ev) {
        myElement.textContent = ev.type +" gesture detected.";
    });
});