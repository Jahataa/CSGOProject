$(document).ready(function() {
    $('#Main').click(function() {
      $('.Main').fadeIn();
      $('.Achievments').hide();
      $('.Stats').hide();
      $('.Abouttheteam').hide();
    });
    $('#Achievments').click(function() {
      $('.Main').hide();
      $('.Achievments').fadeIn();
      $('.Stats').hide();
      $('.Abouttheteam').hide();
    });
    $('#Stats').click(function() {
      $('.Main').hide();
      $('.Achievments').hide();
      $('.Stats').fadeIn();
      $('.Abouttheteam').hide();
    });
    $('#Abouttheteam').click(function() {
      $('.Main').hide();
      $('.Achievments').hide();
      $('.Stats').hide();
      $('.Abouttheteam').fadeIn();
    });

    $.get('/api/achievements' + window.location.search).done(function (data) {
        var playerStatistics = data.playerstats;
        var achievements = $('.Achievments');
        for(var i=0; i < playerStatistics.achievements.length; i++) {
          var achievement = playerStatistics.achievements[i];
          // console.log(achievement);

          if (achievement.achieved == 1) {
            var achievementElement = document.createElement('div');
            achievementElement.className = 'achievement';

            var achievementImage = document.createElement('img');
            var img_name = 'images/achievements/' + achievement.apiname.toLowerCase() + '.jpg';
            achievementImage.src = img_name;
            achievementImage.onerror = (function (name) {
              return function () {
                console.log(name);
              }
            })(img_name)



            achievementElement.appendChild(achievementImage);

            achievements.append(achievementElement)
          }
        }

    })

    $.get('/api/stats' + window.location.search).done(function (data) {
        var playerStatistics = data.playerstats.stats;
        var statsElement = $('.statsTable');
        for(var i=0; i < playerStatistics.length; i++) {
          var statistic = playerStatistics[i];

          var statsRow = document.createElement('tr');


          var statName = document.createElement('td');
          var statValue = document.createElement('td');
          statName.textContent = statistic.name;
          statValue.textContent = statistic.value;



          statsRow.appendChild(statName);
          statsRow.appendChild(statValue);

          statsElement.append(statsRow)

        }

    })
 if(window.location.search == "?id=76561198029440841"){
   $('.playerName').fadeIn();
 }
 else {
    $('.playerName').hide();
 }
    /*
    $('#Achivments').hover(function(){
      $('.Main').hide();
      $('.Achivments').fadeIn();
      $('.Stats').hide();
      $('.Abouttheteam').hide();
    })*/
});
