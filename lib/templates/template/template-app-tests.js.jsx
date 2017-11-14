import { Meteor } from 'meteor/meteor';

/**
 * @namespace Client.Component.<%= className %>Component
 * @memberof Client.Component
 * Here we've got to setup some things for our react tests.
 * Refer to the React Test Utilities website for more information:
 * https://facebook.github.io/react/docs/test-utils.html
 *
 * */
if (Meteor.isClient) {
    // this import needs to be in the Meteor.isClient conditional
    // because meteor will try to import on the server too.
    import { $ } from 'meteor/jquery';
    import React from 'react';
    import ReactDOM from 'react-dom';
    import ReactTestUtils from 'react-dom/test-utils';
    import ShallowRenderer from 'react-test-renderer/shallow';

    // **** Subject under test (SUT) ****
    import { <%= className %>Component } from './<%= fileName %>.jsx';

    /**
     * @desc
     * Next, we're going to setup our beforeEach and afterEach
     * which will be called (you guessed it) before and after each
     * test.
     */

    // setup the shallowRenderer and simulator variables.
    const shallowRenderer = new ShallowRenderer();
    const simulator = ReactTestUtils.Simulate;

    // variables to hold our shadow DOM element and our actual element (el).
    let shallowDOM, el;
    beforeEach(function() {
        // assign a shallowRenderer, and render the component into it.
        shallowRenderer.render(<<%= className %>Component />);

        // save the rendered output.
        shallowDOM = shallowRenderer.getRenderOutput();

        // create an actual DOM element
        let detachedDOM = ReactTestUtils.renderIntoDocument(<<%= className %>Component />);
        el = ReactDOM.findDOMNode(detachedDOM);
    });

    // clean up when done.
    afterEach(function() {
        shallowDOM = null;
        el = null;
    });

    /**
     * @memberof Client.Component.<%= className %>Component
     * @desc
     * Everything before this is basically boilerplate.  What comes next
     * is the meat and potatoes of the unit test.
     *
     * Basic unit test using Jasmine to test the DOM element.
     * Additional tests could be conducted using JQuery; click events,
     * test attributes, etc.
     *
     * For more information on Jasmine testing:
     * https://jasmine.github.io/2.5/introduction
     */
    describe('<%= name %>', function() {
        // Example of a test that can be done easily against the shadowDOM
        it('Did create an element...', function() {
            expect(shallowDOM.type).toBe('h2');
        });

        // Example of how to use the simulator to trigger events.
        it('Has no event handlers...', function() {
            expect(simulator.click(el)).toBe(undefined);
        });
    });
}
