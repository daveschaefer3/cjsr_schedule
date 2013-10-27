cjsr_schedule
=============

Online schedule for CJSR 88.5FM, Edmonton's campus-community radio station.

This CJSR Program Schedule is created within the browser using JavaScript.

All of the show data is currently kept in a flat file (javascripts/showJson.js) in JavaScript Object Notation (JSON).

The show data is processed by javascripts/schedule.js and the data is filled into Handlebars.js templates located in index.php.


Future features include:
  - a back-end for administration (CRUD functions)
  - an improved responsive design for mobile and widescreen browsers
  - a re-organization of the codebase using Backbone.js
