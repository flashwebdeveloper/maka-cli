/**
 * @namespace Client.Templates.<%= className %>
 * @memberof Client.Layouts
 */

import React, { Component } from 'react';
import { withTracker } from 'meteor/react-meteor-data';
<% if(graphql === 'apollo') { %>
import { graphql, compose } from 'react-apollo';
import gql from 'graphql-tag';
<% } %>

class <%= className %>Component extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    shouldComponentUpdate() {
        return true;
    }

    componentWillMount() {
    }

    // The main render function
    render() {
        return (
            <div>
                { this.props.children }
            </div>
        );
    }

    componentDidMount() {

    }

    componentWillUnmount() {

    }
}<% if(graphql === 'apollo') { %>
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
