# bjobsearch

Brief:
======
This codebase demonstrates searching with filtering and sorting capabilities
for a job portal. Things that this code base do:

* Search jobs with key word like driver, driver with batch, cook 
* Filter with various data points
* Sort with multiple data points

This demo use the data coded in the UI layer for demonstration purpose.

Demo:
=====
A demo of this code base can be see @ https://bjobsearch.herokuapp.com

Prerequisite:
==============
1. node v5.0.0
2. npm 3.3.6

Install:
========
1. Download the code from github https://github.com/madhanganesh/bjobssearch.git
2. Type npm start from root folder (where package.json is present) 
3. Browse to http://localhost:8080 to see the app

Note: the assets are already built and bundled in the above source repository.
If you need to build, type npm run build

Tools Used:
==========
* SPA - Single Page Architecture
* ES6 - JavaScript 2105 version
* ES6 based dependency management
* ReactJS - for view layer
* ReactRouter - shell and routing
* Webpack - build tool
* Bootstrap - layout management
* SASS - styles
* JEST - for unit testing
* ESLint - for linting
* NodeJS - for web server

npm commands:
=============
* npm run dev -> runs development server with hot reloading
* npm run build -> builds UI assets to ./dist folder
* npm test -> to run all unit tests
* npm run -> to run NodeJS server
* npm install -> to install all dependencies
