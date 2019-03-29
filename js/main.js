let user = {
    "username": "Max Mustermann",
    "score": 100,
    "badges": [{
        "badgeName": "Entdecker",
        "badgeDescription": "Beende deine erste IStory.",
        "earnedAt": "28.03.2019 12:55"
      },
      {
        "badgeName": "Lokalheld",
        "badgeDescription": "Lies fünf lokale IStories.",
        "earnedAt": "29.03.2019 14:09"
      }
    ]
  };

  $(document).ready(function () {
    reloadScoreView();
    reloadBadgesView();
    $(".js-profile-username").text(user.username);
  });

  function reloadScoreView() {
    $(".js-user-score").text(user.score);
    $(".js-profile-score").text(user.score);
  }

  function reloadBadgesView() {
    $(".js-profile-badges").empty();

    for (var i in user.badges) {
      $(".js-profile-badges").append("<li>" + user.badges[i].badgeName + " <small>" + user.badges[i].earnedAt +
        "</small></li>");
    }

  }

  function toggleProfileModal() {
    $(".js-modal-profile").slideToggle();
    $(".js-modal-profile").toggleClass("active");
    $(".js-content").slideToggle();
    reloadScoreView();
  }

  function increaseUserScore(value) {
    user.score += value;
    reloadScoreView();
  }
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
  function addBadge(badgeName, earnedAt, badgeDescription) {
    user.badges.push({
      "badgeName": badgeName,
      "badgeDescription": badgeDescription,
      "earnedAt": earnedAt
    });

    reloadBadgesView();
  }