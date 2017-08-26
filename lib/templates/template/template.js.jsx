import { Meteor } from 'meteor/meteor';
import { createContainer } from 'meteor/react-meteor-data';
import React, { Component, PropTypes } from 'react';

/**
 * @namespace Client.Component.<%= className %>Component
 * @memberof Client.Component
 */

/**
 * @memberof Client.Component.<%= className %>Component
 * @desc This is the root react component that will be wrapped
 * by the createContainer symbol.
 * @extends Component
 */
class <%= className %>Component extends Component {
    /**
     * @param { object } props The properties (attr) from the react component.
     * e.g. ( <<%= className %> title="new" /> , where "title" is the prop )
     *
     * @desc The only declaration here is the "this.state" which is a react object
     * and has special characteristics.  Note: to set this object use "this.setState()"
     */
    constructor(props) {
        super(props);
        this.state = {};
    }

    /**
     * @public
     * @param { object } nextProps Will contain the next "this.props".
     * @param { object } nextState Will contain the next "this.state".
     * @desc Use shouldComponentUpdate() to let React know if a component's
     * output is not affected by the current change in state or props. The
     * default behavior is to re-render on every state change, and in the
     * vast majority of cases you should rely on the default behavior.
     *
     * If you are confident you want to write it by hand, you may compare
     * this.props with nextProps and this.state with nextState and return
     * false to tell React the update can be skipped.
     * @returns { bool } This needs to be either true or false.
     */
    shouldComponentUpdate(nextProps, nextState) {
        return true;
    }

    /**
     * @public
     * @desc componentWillMount() is invoked immediately before mounting
     * occurs. It is called before render(), therefore setting state in this
     * method will not trigger a re-rendering. Avoid introducing any
     * side-effects or subscriptions in this method.
     */
    componentWillMount() { }

    /**
     * @public
     * @desc When called, it should examine this.props and this.state and
     * return a single React element. This element can be either a representation
     * of a native DOM component, such as div, or another composite component
     * that you've defined yourself.
     * The render() method is required.
     *
     * Note: render() will not be invoked if shouldComponentUpdate() returns false.
     */
    render() {
        return (<h2 className="<%= fileName %>">Find me in <%= myPath %></h2>);
    }

    /**
     * @public
     * @desc componentDidMount() is invoked immediately after a component is mounted.
     * Initialization that requires DOM nodes should go here. If you need to load
     * data from a remote endpoint, this is a good place to instantiate the network
     * request. Setting state in this method will trigger a re-rendering.
     *
     */
    componentDidMount() { }

    /**
     * @public
     * @desc componentWillUnmount() is invoked immediately before a component
     * is unmounted and destroyed. Perform any necessary cleanup in this
     * method, such as invalidating timers, canceling network requests, or
     * cleaning up any DOM elements that were created in componentDidMount
     */
    componentWillUnmount() { }
}

/**
 * @memberof Client.Component.<%= className %>Component
 * @desc
 * Define property types for each of the react component data context properties.
 *
 * Refer to this site for more information on React PropTypes:
 * https://facebook.github.io/react/docs/typechecking-with-proptypes.html
 */
<%= className %>Component.propTypes = {};

/**
 * @memberof Client.Component.<%= className %>Component
 *
 * @desc
 * Set up the data context for our component
 * This is where we would create our Meteor.subscribe handler as
 * well as any other context properties that will need to be reactive.
 *
 * Example:
 *
 * ```
 * const subs      = Meteor.subscribe('<%= className %>.public');
 * const loading   = !subs.ready();
 * const data      = <%= className %>.find({}).fetch() || [];
 *
 * return { loading, data };
 *
 * ```
 *
 * Refer to this page for more information on the createContainer symbol
 * https://atmospherejs.com/meteor/react-meteor-data
 */
const <%= className %> = createContainer((props) => {

    // Return our context to the react component.
    return {};

}, <%= className %>Component);

export { <%= className %>, <%= className %>Component };
