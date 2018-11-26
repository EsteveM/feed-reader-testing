/* feedreader.js
 *
 * This is the spec file that Jasmine will read and contains
 * all of the tests that will be run against your application.
 */

/* We're placing all of our tests within the $() function,
 * since some of these tests may require DOM elements. We want
 * to ensure they don't run until the DOM is ready.
 */
$(function() {
    /* This is our first test suite - a test suite just contains
    * a related set of tests. This suite is all about the RSS
    * feeds definitions, the allFeeds variable in our application.
    */
    describe('RSS Feeds', function() {
        /* This is our first test - it tests to make sure that the
         * allFeeds variable has been defined and that it is not
         * empty. Experiment with this before you get started on
         * the rest of this project. What happens when you change
         * allFeeds in app.js to be an empty array and refresh the
         * page?
         */
        it('are defined', function() {
            expect(allFeeds).toBeDefined();
            expect(allFeeds.length).not.toBe(0);
        });
        /* TODO: Write a test that loops through each feed
         * in the allFeeds object and ensures it has a URL defined
         * and that the URL is not empty.
         */
        it('have a URL', function() {
            for (let feed of allFeeds) {
                expect(feed.url).toBeDefined();
                expect(feed.url).not.toBe('');
            }
        });
        /* TODO: Write a test that loops through each feed
         * in the allFeeds object and ensures it has a name defined
         * and that the name is not empty.
         */
        it('have a name', function() {
            for (let feed of allFeeds) {
                expect(feed.name).toBeDefined();
                expect(feed.name).not.toBe('');
            }
        });
    });


    /* TODO: Write a new test suite named "The menu" */
    describe('The menu', function() {
        /* TODO: Write a test that ensures the menu element is
         * hidden by default. You'll have to analyze the HTML and
         * the CSS to determine how we're performing the
         * hiding/showing of the menu element.
         */
         /* If the body element contains the menu-hidden class,
            the menu is hidden. Otherwise it is shown. */
        it('is hidden by default', function() {
            expect(document.querySelector('body').
                classList.contains('menu-hidden')).toBe(true);
        });
         /* TODO: Write a test that ensures the menu changes
          * visibility when the menu icon is clicked. This test
          * should have two expectations: does the menu display when
          * clicked and does it hide when clicked again.
          */
         /* By default, the menu is hidden. Then, if a click is triggered on
            the menu icon by the click() function, the menu-hidden class should
            not be present. If yet another click is triggered, the menu-hidden
            should be present again. */
        it('changes visibility when the menu icon is clicked', function() {
            let body = document.querySelector('body');
            let menuIconLink = document.querySelector('.menu-icon-link');
            menuIconLink.click();
            expect(body.classList.contains('menu-hidden')).toBe(false);
            menuIconLink.click();
            expect(body.classList.contains('menu-hidden')).toBe(true);
        });
    });
    /* TODO: Write a new test suite named "Initial Entries" */
    describe('Initial Entries', function() {
        /* TODO: Write a test that ensures when the loadFeed
         * function is called and completes its work, there is at least
         * a single .entry element within the .feed container.
         * Remember, loadFeed() is asynchronous so this test will require
         * the use of Jasmine's beforeEach and asynchronous done() function.
         */
        beforeEach(function(done) {
            loadFeed(0,function() {
                done();
            });
        });
        it('are not empty', function() {
            expect(document.querySelector('.feed').firstElementChild).
                        not.toBeNull();
        });
    });
    /* TODO: Write a new test suite named "New Feed Selection" */
    describe('New Feed Selection', function() {
        /* TODO: Write a test that ensures when a new feed is loaded
         * by the loadFeed function that the content actually changes.
         * Remember, loadFeed() is asynchronous.
         */
        /* previousFeed and nextFeed are two arrays that are going to contain
         * the contents of the previous and next feed respectively. In
         * particular, they are going to contain the textContent of the entries
         * (children) of the feed container.
         * The structure of the test will be:
         *     - Firstly, we load a feed and store its contents in the
         *       previousFeed variable.
         *     - Secondly, we load a different feed and store its contents
         *       in the nextFeed variable.
         *     - Finally, we compare both variables to check that their values
         *       are indeed different.
         * loadFeed is an asynchronous function. As a result:
         *     - The first call to loadFeed (previous feed) is executed within
         *       the beforeEach and using the done() function. In this way, we
         *       know that its execution will be completed when we store the
         *       feed contents in the corresponding variable (previousFeed).
         *     - In addition to that, the second call to loadFeed is executed
         *       as a callback of the first one. In this way, we know that its
         *       execution will start once the first call has completed, and
         *       will be completed when we store the feed contents in the
         *       corresponding variable (nextFeed).
         */
        let previousFeed = [];
        let nextFeed = [];
        beforeEach(function(done) {
            loadFeed(1,function() {
                const previousChildren = document.querySelector('.feed').children;
                for (const child of previousChildren) {
                    previousFeed.push(child.textContent);
                }
                loadFeed(0,function() {
                    const nextChildren = document.querySelector('.feed').children;
                    for (const child of nextChildren) {
                        nextFeed.push(child.textContent);
                    }
                    done();
                });
            });
        });
        it('changes content', function() {
            expect(nextFeed).not.toEqual(previousFeed);
        });
    });
}());
