$(document).ready(function() {
    $('.quiz-widget').quizWidget();
});

(function ($) {
    $.fn.quizWidget = function () {

        return this.each(function() {
            var $quizWidget = $(this);
            var $selectionList = $quizWidget.find('.selection-list');
            var $options = $selectionList.find('.option');

            var clickEnable = true;

            var checkOption = function(answer) {
                $('[data-answer="correct"]').addClass('correct').siblings().addClass('wrong');
                $('.quiz-answer-'+answer).removeClass('quiz-hide');

                if(answer === "correct") {
                    // init function for correct add score
                } else {
                    // init function for wrong  add score
                }
            };

            // set options height
            $options.css({'min-height': 50/$options.length + 'vh'});

            $options.on('click', function(){
                if(clickEnable) {
                    checkOption($(this).data('answer'));
                    clickEnable = false;
                }
            });

        });
    };
})(jQuery);