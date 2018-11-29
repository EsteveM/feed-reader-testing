/*                     -------------
 *                     feedreader.js
 *                     -------------
 * This spec file will be read by Jasmine and contains a number
 * of tests to be passed by the application. The tests are grouped
 * into four tests suites.
 *
 */

$(function() {
    /* The first test suite, named 'RSS Feeds', includes three tests. */
    describe('RSS Feeds', function() {
        /* The first test checks that the allFeeds variable is defined
           and not empty. */
        it('are defined', function() {
            expect(allFeeds).toBeDefined();
            expect(allFeeds.length).not.toBe(0);
        });
        /* The second test checks that each feed in the allFeeds object
           has a URL defined and not empty. */
        it('have a URL', function() {
            for (let feed of allFeeds) {
                expect(feed.url).toBeDefined();
                expect(feed.url).not.toBe('');
            }
        });
        /* The third test does the same as the second one but for the
           name, instead of the URL. */
        it('have a name', function() {
            for (let feed of allFeeds) {
                expect(feed.name).toBeDefined();
                expect(feed.name).not.toBe('');
            }
        });
    });


    /* The second test suite, named 'The menu', includes two tests. */
    describe('The menu', function() {
        /* The first test checks that the menu element is hidden by default.
           It can be seen that if the body element contains the 'menu-hidden'
           class, the menu is hidden. Otherwise it is shown. */
        it('is hidden by default', function() {
            expect(document.querySelector('body').
                classList.contains('menu-hidden')).toBe(true);
        });
        /* The second test checks that the menu changes visibility when the
           menu icon is clicked. By default, the menu is hidden. Then, if a
           click is triggered on the menu icon by the click() function, the
           menu-hidden class should not be present. If yet another click is
           triggered, the menu-hidden should be present again. */
        it('changes visibility when the menu icon is clicked', function() {
            let body = document.querySelector('body');
            let menuIconLink = document.querySelector('.menu-icon-link');
            menuIconLink.click();
            expect(body.classList.contains('menu-hidden')).toBe(false);
            menuIconLink.click();
            expect(body.classList.contains('menu-hidden')).toBe(true);
        });
    });
    /* The third test suite, 'Initial Entries', includes one test only. */
    describe('Initial Entries', function() {
        /* It tests that when the loadFeed function completes, the .feed
           container contains at least one .entry element. In this case,
           as loadFeed() is asynchronous, Jasmine's beforeEach and done()
           are used. */
        beforeEach(function(done) {
            loadFeed(0,function() {
                done();
            });
        });
        it('are not empty', function() {
            expect(document.querySelectorAll('.feed .entry').length).
                        toBeGreaterThan(0);
        });
    });
    /* The fourth test suite, 'New Feed Selection', includes one test only. */
    describe('New Feed Selection', function() {
        /* It checks that when loadFeed() loads a new feed, the content changes.
         */
        /* The test will first load a feed and store its contents in a variable.
           Then, will load a different feed and store its contents in another
           variable. Finally, both variables will be compared to check that
           their values are indeed different. As already mentioned, loadFeed()
           is an asynchronous function. For this reason, the first call to the
           function is executed within the beforeEach and using the done()
           function. The second call is executed as a callback of the first one.
           In this way, we know that its execution will start once the first
           call has completed. */
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
