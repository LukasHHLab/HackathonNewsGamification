$(document).ready(function () {
    var $document = $(document);
    var selector = '[data-rangeslider]';
    var $element = $(selector);
    var textContent = ('textContent' in document) ? 'textContent' : 'innerText';

    $('input[type="range"]').rangeslider({
        polyfill: false,
        rangeClass: 'rangeslider',
        disabledClass: 'rangeslider--disabled',
        horizontalClass: 'rangeslider--horizontal',
        verticalClass: 'rangeslider--vertical',
        fillClass: 'rangeslider__fill',
        handleClass: 'rangeslider__handle',

        onInit: function () {

        },

        // Callback function
        onSlide: function (position, value) {

        },

        // Callback function
        onSlideEnd: function (position, value) {
            if (value > 480) {
                //window.alert("super");
            } else {
                //window.alert(".....");
            }
        }
    });

    $('.rangeslider__handle').on('click', function (e) {
        e.preventDefault();
        e.stopPropagation();
    });

    function valueOutput (element) {
        var value = element.value;
        var output = element.parentNode.getElementsByTagName('output')[0] || element.parentNode.parentNode.getElementsByTagName('output')[0];
        output[textContent] = value;
    }

    $document.on('input', 'input[type="range"], ' + selector, function (e) {
        valueOutput(e.target);
    });
});