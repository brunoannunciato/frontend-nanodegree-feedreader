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
    describe('RSS Feeds', () => {
        /* This is our first test - it tests to make sure that the
         * allFeeds variable has been defined and that it is not
         * empty. Experiment with this before you get started on
         * the rest of this project. What happens when you change
         * allFeeds in app.js to be an empty array and refresh the
         * page?
         */
        it('are defined', () => {
            expect(allFeeds).toBeDefined();
            expect(allFeeds.length).not.toBe(0);
        });


        // get all items of object allFeeds and
        // verify if all them have url Property
        it('verify if all feeds has a url', () => {
            for (const item of allFeeds) {
                expect(item.url).toBeTruthy();
            }
        });

        // get all items of object allFeeds and
        // verify if all them have name Property

        it('verify if all feeds has a name', () => {
            for (const item of allFeeds) {
                expect(item.name).toBeTruthy();
            }
        });
    });


    /* Start of a test suit called 'The menu' */
    describe('The menu', () => {
        let docBody;
        beforeEach(() => {
            docBody = document.querySelector('body');
        });

        /* Verify if body element has 'menu-hidden' class */
        
        it ('Menu must be hidden when site render', () => {     
            expect(docBody.classList).toContain('menu-hidden');
        });

         /* click in menu icon two time and ensure if this function is working as expected */

        it('Open and close menu function working', () => {
            let menuIcon = document.querySelector('.icon-list');

            menuIcon.click();
            expect(docBody.classList).not.toContain('menu-hidden');
            menuIcon.click();
            expect(docBody.classList).toContain('menu-hidden');
        });


    });

    /* Start of a test suit called 'Initial Entries' */
    describe('Initial Entries', () => {
         
        /* Before each specs call loadFeed function with id 0 and done function in callback then verify if there more than one .entry inside .feed*/
        beforeEach(function (done) {
            loadFeed(0, () => done());
        });

        it('verify loadFeed call and if there is a .entry element inside .feed', (done) => {
            expect(document.querySelectorAll('.feed .entry').length).not.toBe(0);
            
            done();
        });
       
    });
    
    /* Start of a test suit called 'Initial Entries' */
    describe('New Feed Selection', () => {

        /* 
        Before the specs define primaryFeed and secondaryFeed variables and save the text content inside them.
        Then verify if the variables has different content.
        */

        let primaryFeed,
            secondaryFeed;

        beforeEach(function (done) {
            loadFeed(0, function () {
                primaryFeed = document.querySelector('.entry h2').textContent;

                loadFeed(1, function () {
                    secondaryFeed = document.querySelector('.entry h2').textContent;
                    done();
                });
            });
        });

        it('Verify if feeds title is not iquals', function () {
            expect(primaryFeed).not.toEqual(secondaryFeed);
        });
    })
}());
