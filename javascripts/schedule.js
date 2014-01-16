// template filling

$(function(){



  // JSON data sources
  var shows = showJson.shows;
  var dayList = showJson.days;
  var colours = showJson.colours;
  
  // Data massage functions
  var sortShows = function() {
    for (var i = 0, len=dayList.length; i < len; i++) {
      var thisDay=dayList[i];
      thisDay.shows = [];
      for (var n = 0, leng=shows.length; n < leng; n++) {
        if(shows[n].day == thisDay.theDay) {
          // add earlyLate property
          if (shows[n].start < 600) {
            shows[n].early = true;
          }
          thisDay.shows.push(shows[n]);
        };
      };
      thisDay.shows.sort(function(a,b){
        return a.start - b.start;
      });
    };
  };
  sortShows();
  // add daysId attribute to sorted shows
  for (var i = 0, len=dayList.length; i < len; i++) {
    for (var n = 0, leng = dayList[i].shows.length; n < leng; n++) {
      dayList[i].shows[n].daysId = n;
    };
  };
  // alert(JSON.stringify(dayList));

  // Template Sources
  var headerSource = $('#header-template').html();
  var daySource = $('#day-template').html();
  var showSource = $('#show-template').html();
  var clearSource = '<div class="clearFix"></div>';
  var featureSource = $('#feature-template').html();
  var earlySource = $('#early-template').html();
  var bbcSource = $('#bbc-template').html();
  var legendSource = $('#legend-template').html();

  // Template Functions
  var templateHeader = function(day) {
    var headerTemplate = Handlebars.compile(headerSource);
    var headerHtml = headerTemplate(day);
    $('#dayHeaders').append(headerHtml);
  }
  var templateDay = function(day) {
    var dayTemplate = Handlebars.compile(daySource);
    var dayHtml = dayTemplate(day);
    $('#days-box').append(dayHtml);
  };
  var templateEarlyDiv = function(day, targetDiv) {
    var earlyTemplate = Handlebars.compile(earlySource);
    var earlyHtml = earlyTemplate(day);
    $('#' + targetDiv).append(earlyHtml);
  };

  var templateShow = function(show, targetDiv) {
    var showTemplate = Handlebars.compile(showSource);
    var showHtml = showTemplate(show);
    $('#' + targetDiv).append(showHtml);
  };
  var templateBBC = function(show, targetDiv) {
    var bbcTemplate = Handlebars.compile(bbcSource);
    var bbcHtml = bbcTemplate(show);
    $('#' + targetDiv).append(bbcHtml);
  }

  var templateFeature = function(show) {
    show.fullDay = formatDay(show.day);
    show.timeString =  formatTimeString(show.start) + " - " + formatTimeString(show.end);
    var featureTemplate = Handlebars.compile(featureSource);
    var featureHtml = featureTemplate(show);
    $('#featureTarget').append(featureHtml);
  };
  var templateLegend = function(colour) {
    var legendTemplate = Handlebars.compile(legendSource);
    var legendHtml = legendTemplate(colour);
    $('#legendSwatches').append(legendHtml);
  };


  // Data formatting
  var formatDay = function(dayAbbr) {
    var fullDay = "";
    for (var i = 0, len=dayList.length; i < len; i++) {
      if(dayList[i].theDay == dayAbbr) {
        fullDay = dayList[i].fullDay;
      }
    };
    return fullDay;
  };
  var formatTimeString = function(timeInt) {
    var timeString = "", hourInt;
    ((timeInt%100 == 0) ? 
      (hourInt=timeInt/100) : 
      (hourInt=(timeInt-30)/100));

    if (timeInt > 1200) {
      hourInt -= 12;
    };
    switch(timeInt) {
      case(0):
        timeString = "Midnight";
        break;
      case(1200):
        timeString = "Noon";
        break;
      case(2400):
        timeString = "Midnight";
        break;
      default:
        if ((timeInt%100) == 0) {
          timeString = hourInt + ":00";
        } else {
          timeString = hourInt + ":" + (timeInt%100);
        };

        if (timeInt < 1200) {
          timeString += " AM";
        } else{
          timeString += " PM";
        };
        break;
    };
    return timeString;
  };

  // VIEW FUNCTIONS.
  // generate timeBlocks and append them to .timestrip
  var generateTimeBlocks = function() {
    for(var i=0; i < 24; i++) {
      var timeBlock = "";
      var iPlus = (i + 6);
      var iMinus = (i - 6);
      var jMinus = (i - 18);

      if (i <= 6) {
        timeBlock += '<div class="timeBlock start-' + iPlus + '00">';
        timeBlock += iPlus + ':00' + ((i==6) ? 'PM' : 'AM');
        timeBlock += '</div><div class="timeBlock start-';
        timeBlock += iPlus + '30">' + iPlus + ':30';
        timeBlock += ((i==6) ? 'PM' : 'AM') +'</div>';
      } else {
        timeBlock += '<div class="timeBlock start-';
        timeBlock += ((iPlus < 24) ? iPlus : jMinus) + '00">';
        timeBlock += ((iMinus > 12) ? jMinus : iMinus) + ':00';
        timeBlock += ((iMinus >= 12) ? 'AM' : 'PM'); 
        timeBlock += '</div><div class="timeBlock start-';
        timeBlock += ((iPlus < 24) ? iPlus : jMinus) + '30">';
        timeBlock += ((iMinus > 12) ? jMinus : iMinus) + ':30';
        timeBlock += ((iMinus >= 12) ? 'AM' : 'PM') + '</div>';
      }
      $('.timestrip').append(timeBlock);
    };
  };

  // ABSOLUTE POSITIONING FOR SHOWS
  var positionShowDivs = function() {
    var classHeight;
    var evenStart, oddStart;
    var startArray = [];
    // Build classArray
    for (i = 0; i < 24; i++) {
      if (i == 0) {
        evenStart = ('start-600');
        oddStart = ('start-630');
      } else if (i > 0 && i < 18) {
        evenStart = ('start-' + (i + 6) + '00');
        oddStart = ('start-' + (i + 6) + '30');
      } else {
        evenStart = ('start-' + (i - 18) + '00');
        oddStart = ('start-' + (i - 18) + '30');
      }
      startArray.push(evenStart);
      startArray.push(oddStart);
    };

    var titleBoxHeight = 0; // 290;
    var messageBoxHeight = 30;
    var headerHeight = 31;   
    var preHeight = titleBoxHeight + messageBoxHeight + headerHeight;
    var blockHeight = 30;
    // set classArray CSS
    for (i = 0, len=startArray.length - 1; i<len; i++) {
      heightCalc = (preHeight + (i * blockHeight));
      $('.' + startArray[i]).css("top", heightCalc);
    };
    $('.start-0').css('top', (preHeight + (36 * blockHeight)));

    $('#bbcBanner').css("top", preHeight);
  }; // end of positionShowDivs

  // Show heights
  var setShowHeights = function() {
    for (var n = 0, leng = dayList.length; n < leng; n++) {
      for (var i=0, len=dayList[n].shows.length; i < len; i++) {
        var show = dayList[n].shows[i];
        var startEnd = show.end - show.start
        var showHeight;
        if (startEnd == 130 || startEnd == 170) 
          {  
            showHeight = 88
          } else {
            showHeight = (((startEnd)%100) == 0) ? 
              ((((startEnd)/100) * 60) - 2) : 28;
          };
        
        $('#' + show.day + '-' + show.daysId).height(showHeight);
        $('#' + show.day + '-' + show.daysId).css('max-height', showHeight + 'px');
      };
    };
    $('#bbcBanner').height(58);
  }; // end of setShowHeights

  // adjustHeights function is from http://www.metaltoad.com/blog/resizing-text-fit-container
  var adjustHeights = function(elem) {
    var fontstep = 2;
    if ($(elem).height()>$(elem).parent().height() || $(elem).width()>$(elem).parent().width()) {
      $(elem).css('font-size',(($(elem).css('font-size').substr(0,2)-fontstep)) + 'px').css('line-height',(($(elem).css('font-size').substr(0,2))) + 'px');
      adjustHeights(elem);
    }
  }


  var eventListeners = function() {
    // fill modal with the featured show.

    $('.schedShow').click(function(){
      var dayAbbr = this.id.split('-')[0];
      var dayId = parseInt(this.id.split('-')[1]);

      for (var n = 0, leng= dayList.length; n < leng; n++) {
        if(dayList[n].theDay == dayAbbr) {
          templateFeature(dayList[n].shows[dayId]);
          nextPrevButtons();
        };
      };
    }); // end of .schedShow.click()

    // chevron button heights
    $('#featureModal').on('shown.bs.modal', function() {
      $('.nextPrevious').height($('.feature').height());
    });
    // empty modal after it's hidden.
    $('#featureModal').on('hidden.bs.modal', function(){
      $('#featureTarget').empty();
    });

    // next/previous show
    var nextPrevButtons = function() {
      $('.nextPrevious').click(function(){
        var nextPrevious = this.id.split('-')[0];
        var dayAbbr = this.id.split('-')[1];
        var dayId = parseInt(this.id.split('-')[2]);
        

        for (var n = 0, leng= dayList.length; n < leng; n++) {
          if(dayList[n].theDay == dayAbbr) {
            var dayIndex = n;
            var targetDayId;
            
            if (nextPrevious == 'next') {
              
              if (dayId == dayList[n].shows.length - 1) {
                if (dayIndex == leng - 1) {
                  dayIndex = 0;
                  targetDayId = 0;
                } else {
                  dayIndex++;
                  targetDayId = 0;
                }
              } else {
                targetDayId = dayId + 1;
              };

            } else if (nextPrevious == 'prev') {

              if(dayId == 0) {
                if (n == 0) {
                  dayIndex = dayList.length - 1; 
                  targetDayId = dayList[dayIndex].shows.length - 1;
                } else {
                  dayIndex = n - 1;
                  targetDayId = dayList[dayIndex].shows.length - 1;
                }
              } else {
                dayIndex = n;
                targetDayId = dayId - 1;
              };

            };


            $('#featureTarget').empty();

            templateFeature(dayList[dayIndex].shows[targetDayId]);
            nextPrevButtons();
            $('.nextPrevious').height($('.feature').height());
          };
        };
      }); // end of nextPrevious.click()
    }; // end nextPrevButtons
  }; // end of eventListeners
  
  // Function calls.
  generateTimeBlocks();
  // templateLegend();

  // template days
  for (var i = 0,len=dayList.length; i < len; i++) {
    templateHeader(dayList[i]);
    templateDay(dayList[i]);
  };
  for (var i = 0,len=dayList.length; i < len; i++) {
    (i == 0) ?
      templateEarlyDiv(dayList[i], dayList[len - 1].theDay + 'Column') :
      templateEarlyDiv(dayList[i], dayList[i-1].theDay + 'Column');
  };
  $('#monColumn').append('<span id="bbcBanner">BBC World Service</span>');

  // set the height for .day to the height of .timestrip
  var boxHeight = $('.timestrip').height() - 1;
  $('.day').height(boxHeight);

  //template shows
  for (var i = 0, len = dayList.length; i < len; i++) {
    for (var n = 0,leng=dayList[i].shows.length; n < leng; n++) {
      if (dayList[i].shows[n].bbc) {
        templateBBC(dayList[i].shows[n], dayList[i].theDay);
      } else if (dayList[i].shows[n].early) {
        templateShow(dayList[i].shows[n], dayList[i].theDay + 'Early');
      } else {
        templateShow(dayList[i].shows[n], dayList[i].theDay);
      };
    };
  };

  positionShowDivs();
  setShowHeights();
  // autoSizeText('schedShow');

  // adjustHeight() take the element, not a string. Should write a loop
  // to only pass in shows schedShows that have overflow.

  // adjustHeights('schedShow');

  // template legend
  $('#scheduleBox').append(clearSource);
  //$('#scheduleBox').append('<span class="clearFix"></span><div id="legendContainer"><h3>Legend</h3></div><span class="clearFix">');
  $('#legendContainer').append('<h3>Legend</h3>');
  $('#legendContainer').append('<div id="legendSwatches"></div><div class="clearFix"></div>');

  for (var i = 0, len = colours.length; i < len; i++) {
    console.log(colours[i].colour);
    templateLegend(colours[i]);
  };



  // $('.legendSwatch').popover({
  //   placement: 'right',
  //   trigger: 'hover'
  // });

  eventListeners();

});
