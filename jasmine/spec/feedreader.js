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
         * empty. 
         */
        it('are defined', function() {
            expect(allFeeds).toBeDefined();
            expect(allFeeds.length).not.toBe(0);
        });


        /* A test that loops through each feed
         * in the allFeeds object and ensures it has a URL defined
         * and that the URL is not empty.
         */
        it('have defined urls', function() {
            for(var i in allFeeds) {
            expect(allFeeds[i].url).toBeDefined();
            expect(allFeeds[i].url.length).not.toBe(0);
            }
        });

        /* A test that loops through each feed
         * in the allFeeds object and ensures it has a name defined
         * and that the name is not empty.
         */

        it('have defined names', function() {
            for(var i in allFeeds) {
            expect(allFeeds[i].name).toBeDefined();
            expect(allFeeds[i].name.length).not.toBe(0);
            expect(typeof allFeeds[i].name).toBe('string');
            }
        })

    });


    describe('The menu', function() {

        /* A test that ensures the menu element is
         * hidden by default. 
         */
        it('the menu element is hidden by default', function() {

            expect($('body').hasClass('menu-hidden')).toEqual(true);      
        });
 
        /* A test that ensures the menu changes
         * visibility when the menu icon is clicked. 
         */
          
        it('the menu changes visibility when the menu icon is clicked', function() {

            $('.menu-icon-link').click();
            expect($('body').hasClass('menu-hidden')).toEqual(false);

            $('.menu-icon-link').click();
            expect($('body').hasClass('menu-hidden')).toEqual(true);

        });


    });


    describe('Initial Entries', function() {

        /* A test that ensures when the loadFeed
         * function is called and completes its work, there is at least
         * a single .entry element within the .feed container.
         */

        /* wait for async loading */
        beforeEach(function(done) {
            loadFeed(0, done);
        });

        it('feed container is not empty after loadFeed', function() {
            var entryNumber = $('.entry').length;
            expect(entryNumber).toBeGreaterThan(0);
        });
    });

    describe('New Feed Selection', function() {

        /* A test that ensures when a new feed is loaded
         * by the loadFeed function that the content actually changes.
         */

        var content1,
            content2;


        /* wait for async loading */
        beforeEach(function(done) {
            loadFeed(0, function() {
                content0 = $('.feed').html();
                loadFeed(1, function() {
                    content1 = $('.feed').html();
                    done();
                });
            });    
        });

        it('content changes after new feed is loaded', function() {
            expect(content0).not.toBe(content1);

        });
    });


}());
