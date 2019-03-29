
  $(document).ready(function () {
    if(localStorage.getItem("user") === null){
        initUser("Max Muster");
    }
    var user = loadUser();

    reloadScoreView();
    reloadBadgesView();
    $(".js-profile-username").text(user.username);
  });

  function initUser(username) {
      user = {
        "username": username,
        "score": 0,
        "badges": [{
            "badgeName": "Entdecker",
            "badgeDescription": "Beende deine erste IStory.",
            "earnedAt": "28.03.2019 12:55"
          }
        ]
      };

      saveUser(user);
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

    reloadBadgesView();
  }