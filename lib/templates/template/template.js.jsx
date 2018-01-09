import { Meteor } from 'meteor/meteor';
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withTracker } from 'meteor/react-meteor-data';
<% if(graphql === 'apollo') { %>
import { graphql, compose } from 'react-apollo';
import gql from 'graphql-tag';
<% } %>

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
     * @desc You should define any props that the component has here, making sure
     * to set required props when needed.  This greatly improves the class's readability.
     */
    static propTypes = {

    }

    /**
     * @desc Setting default properties can be very useful, as this is the only place
     * where properties can be set within the component.  Props are immutable after the
     * component is instantiated.
     */
    static defaultProps = {

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
 *
 * @desc
 * Set up the data context for our component
 * This is where we would create our Meteor.subscribe handler as
 * well as any other context properties that will need to be reactive.
 *
 * Refer to this page for more information on the symbol
 * https://github.com/meteor/react-packages/tree/devel/packages/react-meteor-data
 */<% if(graphql === 'apollo') { %>
const <%= className %> = compose(
    withTracker((props) => {
        return {};
    })
)(<%= className %>Component);<% } else { %>
const <%= className %> = withTracker((props) => {
        return {};
    })
(<%= className %>Component);<% } %>

export { <%= className %>, <%= className %>Component };
