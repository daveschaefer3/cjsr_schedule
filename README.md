CJSR Schedule
=============

An online schedule application for CJSR 88.5FM, Alberta, Canada's first campus radio station.

This schedule is created within the browser using JavaScript every time the page is visited.
All of the show data is currently kept in a flat file (showJson.js) in JSON notation.
This data is processed by schedule.js and Handlebars string templates located in index.php are filled.
These string templates are styled using Less (a dynamic stylesheet language.)


Future features include:
  - an improved responsive design for mobile and widescreen browsers
  - a re-organization of the codebase using Backbone.js
  - a back-end for administration (CRUD functions)
  - pre-processing of LESS stylesheets using node.js (support for Internet Explorer)
