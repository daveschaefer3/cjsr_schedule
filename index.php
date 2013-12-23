<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <title>CJSR Program Schedule</title>
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <link href="http://cjsrfm88.blogspot.ca/favicon.ico" rel="icon" type="image/x-icon">
  <link rel="stylesheet" type="text/css" href="css/reset.css">
  <link rel="stylesheet" href="css/bootstrap.min.css" media="screen">
  <!-- HTML5 shim and Respond.js IE8 support of HTML5 elements and media queries -->
  <!--[if lt IE 9]>
    <script src="javascripts/lib/html5shiv.js"></script>
    <script src="javascripts/lib/respond.min.js"></script>
  <![endif]-->
  
  <link rel="stylesheet/less" type="text/css" href="http://notsubliminal.com/cjsr_schedule/css/schedule.less?ts=<?=filemtime('css/schedule.less')?>" />

  <script type="text/javascript" src="javascripts/lib/jquery-1.10.2.min.js"></script>
  <script type="text/javascript" src="javascripts/lib/handlebars-1.0.0.js"></script>
  <script type="text/javascript" src="javascripts/lib/json2.js"></script>
  <!-- <script type="text/javascript" src="javascripts/lib/underscore-1.5.2/underscore-1.5.2.js"></script>
  <script type="text/javascript" src="javascripts/lib/backbone-1.0.0/backbone-1.0.0-min.js"></script> -->
  <script type="text/javascript" src="javascripts/lib/less-1.4.1.min.js"></script>
<script type="text/javascript">
    // custom Handlebars template helpers

    Handlebars.registerHelper("");
  </script>
  <script type="text/javascript" src="javascripts/showJson.js"></script>
  <script type="text/javascript" src="javascripts/schedule.js"></script>

</head>
<body>

<div id="featureModal" class="modal fade">
  <div id="featureWrap" class="modal-dialog">
    <div id="featureTarget" class="modal-content"></div>

    <div class="clearFix"></div>
  </div> <!-- /.modal-dialog -->
</div> <!-- /.modal -->


<div id="contentContainer">
  <div id="pageBanner">
    <a target="_blank" href="http://cjsr.com/"><img class="background" src="images/back_etc.png" alt="background"></a>
  </div>
<!-- 
  <div id="bannerHeight"></div> -->

  <div id="scheduleBox">
    <div class="topBuffer">
      <div id="messageBox">
        <div id="message">
          <p><strong>Click on any of the shows below to see more information.</strong></p>
        </div>
        <span class="clearFix"></span>
      </div>
    
      <div id="headerRow">
        <div class="timeHeader"></div>
        <div id="dayHeaders"></div>
        <div class="timeHeader"></div>
        <span class="clearFix"></span>
      </div><!-- / #headerRow -->
      <span class="clearFix"></span>
    </div>

    

    <div id="contentRow">
      <div id="left-times">
        <div class="timestrip"></div>
      </div>
      
      <div id="days-box">

      </div>

      <div id="right-times">
        <div class="timestrip"></div>
      </div>

    </div><!-- / #contentRow -->
    <span class="clearFix"></span>
    <!-- <div id="scheduleBuffer"></div> -->

    <span class="clearFix"></span>
    <div id="footer">
      <p>
        Banner image designed by <a target="_blank" href="http://mountpioneer.com/">Mount Pioneer</a><br/>
        Schedule developed by <a target="_blank" href="http://notsubliminal.com">Not Subliminal</a> &nbsp;|&nbsp; 
        <a target="_blank" href="https://github.com/daveschaefer3/cjsr_schedule">{ Fork this project on GitHub }</a><br/>
        &copy; 2013 - 2014 First Alberta Campus Radio Association &nbsp;|&nbsp; <a target="_blank" href="http://cjsr.com/">CJSR.COM</a>
      </p>
    </div>
    <span class="clearFix"></span>
    
  </div><!-- / #scheduleBox -->
  
  

  
</div> <!-- / contentContainer -->



<!-- TEMPLATES START -->
<script id="header-template" type="text/x-handlebars-template">
    <div class="dayHeader">
      <strong>{{fullDay}}</strong>
    </div>
</script>

<script id="day-template" type="text/x-handlebars-template">
  <div id="{{theDay}}Column" class="day">
    <div class="showColumn" id="{{theDay}}">

    </div>
  </div>
</script>

<script id="early-template" type="text/x-handlebars-template">
  <div id="{{theDay}}Early">
    
  </div>
</script>

<script id="legend-template" type="text/x-handlebars-template">
  <div class="scheduleLegend">
    <span id="genre-{{colour}}" class="legendGenre">
      <span id="{{colour}}Color" class="legendSwatch {{colour}}" data-content="{{description}}">
        <p class="legendLabel">{{label}}</p>
      </span>
      <!-- <span class="legendDescription">{{description}}</span> -->
    </span>
  </div><span class="clearFix"></span>
</script>

<script id="show-template" type="text/x-handlebars-template">
  <span class="schedShow show-style start-{{start}} {{colour}}" id="{{day}}-{{daysId}}" data-toggle="modal" data-target="#featureModal">
    <span>
      {{{name}}}
    </span>
  </span>
</script>

<script id="bbc-template" type="text/x-handlebars-template">
  <span class="schedShow bbc start-{{start}}" id="{{day}}-{{daysId}}" data-toggle="modal" data-target="#featureModal">
  </span>
</script>

<script id="feature-template" type="text/x-handlebars-template">
  <div class="featureHead modal-header">
    <button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>
    <h3 class="featName">{{{name}}}</h3>
    <p>{{tagline}}</p>  
  </div>

  <div id="feature-modal-body" class="modal-body">
    <div id="prev-{{day}}-{{daysId}}" class="previousFeat nextPrevious"><span class="glyphicon glyphicon-chevron-left"></span></div>
    <div class="feature" id="feature-{{day}}-{{daysId}}">
      <p><strong><span class="featDay" id="featDay-{{day}}">{{fullDay}}</span> - <span class="featTimes">{{timeString}}</span></strong></p>
      <p class="description">{{{description}}}</p>
      <p>{{{genre}}}</p>
      
      {{#if email}}
        <span class="featEmail"><strong>Email: </strong>{{email}}</span><br/>
      {{/if}}

      {{#if twitter}}
        <span class="featTwitter"><strong>Twitter: </strong><a target="_blank" href="https://twitter.com/{{twitter}}">@{{twitter}}</span><br/>
      {{/if}}

      {{#if website}}
        <span class="featSite"><a href="{{website}}" target="_blank">Website</a></span><br/>
      {{/if}}
    </div>

    <div id="next-{{day}}-{{daysId}}" class="nextFeat nextPrevious pull-right"><span class="glyphicon glyphicon-chevron-right"></span>&nbsp;&nbsp;&nbsp;</div>
    <div class="clearFix"></div>
  </div> 
</script>

<!-- TEMPLATES END -->

<script type="text/javascript" src="javascripts/lib/bootstrap.min.js"></script>

</body>
</html>