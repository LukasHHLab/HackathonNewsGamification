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

  function addBadge(badgeName, earnedAt, badgeDescription) {
    user.badges.push({
      "badgeName": badgeName,
      "badgeDescription": badgeDescription,
      "earnedAt": earnedAt
    });

    reloadBadgesView();
  }