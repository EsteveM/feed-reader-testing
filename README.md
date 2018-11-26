# Feed Reader Testing Project

This project implements a number of tests to be passed by a pre-existing web-based application that reads RSS feeds. Tests suites are written based on [Jasmine](http://jasmine.github.io/). The main goal is to test business logic, event handling, and DOM manipulation.

## Table of Contents

* [Description of the Test Suites](#description-of-the-test-suites)
* [Getting Started](#getting-started)
* [Contributing](#contributing)

## Description of the Test Suites

As already mentioned, several tests have been written based on Jasmine. Before examing the tests, it is recommended to gain an understanding of the application's code and functionality. The tests are grouped into four tests suites:

* The first test suite, named 'RSS Feeds', includes three tests. The first one tests that the allFeeds variable is defined and not empty. The second one tests that each feed in the allFeeds object has a URL defined and not empty. Finally, the last one does the same as the second one but for the name, instead of the URL.

* The second test suite, named 'The menu', includes two tests. The first one tests that the menu element is hidden by default. It can be seen that if the body element contains the 'menu-hidden' class, the menu is hidden. Otherwise it is shown. The second test checks that the menu changes visibility when the menu icon is clicked. By default, the menu is hidden. Then, if a click is triggered on the menu icon by the click() function, the menu-hidden class should not be present. If yet another click is triggered, the menu-hidden should be present again.

* The third test suite, named 'Initial Entries', includes one test only. It tests that when the loadFeed function completes, the feed container contains at least one entry. In this case, as loadFeed() is asynchronous, Jasmine's beforeEach and done() are used.

* The fourth and last test suite, named 'New Feed Selection', includes one test only. It checks that when loadFeed() loads a new feed, the content changes. The test will first load a feed and store its contents in a variable. Then, will load a different feed and store its contents in another variable. Finally, both variables will be compared to check that their values are indeed different. As already mentioned, loadFeed() is an asynchronous function. For this reason, the first call to the function is executed within the beforeEach and using the done() function. The second call is executed as a callback of the first one. In this way, we know that its execution will start once the first call has completed.

Tests are independent from one another. As expected, it can be seen that all of them pass when the application is run. The next section details how to run the application.

## Getting Started

This is a fully browser-based application, so you will only need a browser to run it. There are no external dependencies.

It is made up of a number of files. The main ones are:

* index.html: It contains the application's HTML code.
* css\style.css: It contains the application's CSS code.
* js\app.js: It contains the application's JavaScript code.
* jasmine\spec\feedreader.js: It contains the Jasmine specification file. Tests are written in this file.
* README.md: It contains the documentation file you are viewing right now.

The application can be started by simply running the index.html file on a browser. As already mentioned, it can be seen that all tests pass.

## Contributing

This repository contains all the code that makes up the application. Individuals and I myself are encouraged to further improve this project. This can be done in two main ways: adding new tests, or improving existing ones. As a result, I will be more than happy to consider any pull requests.