/**
 * @namespace Client.Templates.<%= className %>
 * @memberof Client.Layouts
 */

import React, { Component } from 'react';
<% if(graphql === 'apollo') { %>
import { withTracker } from 'meteor/react-meteor-data';
import { graphql, compose } from 'react-apollo';
import gql from 'graphql-tag';
<% } else { %>
import { createContainer } from 'meteor/react-meteor-data';
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
}

<% if(graphql === 'apollo') { %>
const <%= className %> = compose(
    //graphql(),
    withTracker((props) => {
        return {};
    })
)(<%= className %>Component);
<% } else { %>
const <%= className %> = createContainer((props) => {

    // Return our context to the react component.
    return {};

}, <%= className %>Component);
<% } %>

export { <%= className %>, <%= className %>Component }
