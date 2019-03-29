$(document).ready(function () {
  if (localStorage.getItem("user") === null) {
    toggleNewUserModal();
  } else {
    var user = loadUser();

    reloadScoreView();
    reloadBadgesView();
    $(".js-profile-username").text(user.username);
    loadRankingList();

    var $sections = $('article > section');
    $sections.hide();
    $sections.first().show();
    var i = 1;
    $sections.each(function(){
        $(this).on('click', function(){
            $sections.hide();
            $sections.eq(i).show();
            i++;
        });
    });

    $('main').slick({
        'arrows':false
    });
  }

});

function initUser(username) {
  user = {
    "username": username,
    "score": 0,
    "badges": [{
      "badgeName": "Entdecker",
      "badgeDescription": "Beende deine erste IStory.",
      "earnedAt": "28.03.2019 12:55"
    }]
  };

  saveUser(user);
  location.reload();
}

function loadUser() {
  return JSON.parse(localStorage.getItem("user"));
}

function saveUser(user) {
  localStorage.setItem("user", JSON.stringify(user));
}

function reloadScoreView() {
  var user = loadUser();
  $(".js-user-score").text(user.score);
  $(".js-profile-score").text(user.score);
}

function reloadBadgesView() {
  var user = loadUser();
  $(".js-profile-badges").empty();

  for (var i in user.badges) {
    $(".js-profile-badges").append("<li>" + user.badges[i].badgeName + " <small>" + user.badges[i].earnedAt +
      "</small></li>");
  }

}

function toggleProfileModal() {
  $(".js-modal-profile").slideToggle();
  $(".js-user").toggleClass("active");
  $(".js-content").slideToggle();
  reloadScoreView();
}

function increaseUserScore(value) {
  var user = loadUser();
  user.score += value;
  saveUser(user);
  loadRankingList();
  reloadScoreView();
}

function addBadge(badgeName, earnedAt, badgeDescription) {
  var user = loadUser();
  user.badges.push({
    "badgeName": badgeName,
    "badgeDescription": badgeDescription,
    "earnedAt": earnedAt
  });
  saveUser(user);
  toastr["info"]("Super! Du hast den Badge <b>" + badgeName + "</b> verdient.", "Badge erhalten.");

  reloadBadgesView();
}

function saveNewUser() {
  initUser($("#txtUsername").val());
  toggleNewUserModal();
}

function toggleNewUserModal() {
  $(".js-user").toggle();
  $(".js-modal-newuser").slideToggle();
  $(".js-content").slideToggle();
}

function loadRankingList() {
  var user = loadUser();
  var ranking = [{
      "username": "Peter",
      "score": 10
    },
    {
      "username": "Marco",
      "score": 38
    },
    {
      "username": "Lisa",
      "score": 20
    },
    {
      "username": "Maren",
      "score": 24
    },
    {
      "username": "Allan",
      "score": 45
    }
  ];

  ranking.push({
    "username": "<b>" + user.username + "</b>",
    "score": user.score
  });

  var sortedRanking = ranking.sort(function (current, next) {
    return next.score - current.score
  });
  for (var i in sortedRanking) {
    $(".js-ranking-list").append("<li>" + sortedRanking[i].username + " <small>(Punkte: " + sortedRanking[i].score + ")</small></li>");
  }
}
