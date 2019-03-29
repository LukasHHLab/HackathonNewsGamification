$(document).ready(function () {
  if (localStorage.getItem("user") === null) {
    toggleNewUserModal();
  } else {
    var user = loadUser();

    reloadScoreView();
    reloadBadgesView();
    $(".js-profile-username").text(user.username);
    loadRankingList();

    var $articles = $('article');
    var $sections = $articles.find('> section');
    var $progressBarContainerS = $articles.find('.progress-bar-container');
    $sections.hide();
    $sections.first().show();
    var i = 1;

    $articles.each(function(){
        var $barItemContainer = $(this).find('.progress-bar-container');
        $(this).find('section').each(function(){
            $('<span class="progress-bar-item bar-item-' + $(this).index() + '"></span>').appendTo($barItemContainer);
        })
    });

    var $progressBarItems = $articles.find('.progress-bar-item');
    $progressBarItems.eq(0).addClass('question-correct');

    $sections.each(function(){
        $(this).on('click', function(){
            $sections.hide();
            $sections.eq(i).show();
            $progressBarItems.eq(i).addClass('question-correct');
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
        "badgeName": "Erste Schritte",
        "badgeIcon": "fas fa-shoe-prints",
        "badgeDescription": "Erstelle ein Benutzerprofil."
      },
      {
        "badgeName": "NewsFindMe",
        "badgeIcon": "fas fa-newspaper",
        "badgeDescription": "Nimm am NewsFindMe-Hackathon teil."
      }
    ]
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
    $(".js-profile-badges").append("<div class='profile-badges-item'><span class='fa-layers fa-fw profile-badges-item-icon'>" +
      "<i class='fas fa-trophy'></i><i class='fa-inverse " + user.badges[i].badgeIcon + "' data-fa-transform='shrink-12 up-3' style='color:Tomato'></i>" +
      "</span><span class='profile-badges-item-name'>" + user.badges[i].badgeName + " </span><small class='profile-badges-item-description'>" + user.badges[i].badgeDescription +
      "</small></div>");
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
