import React from 'react';
<% if (client === 'react') { %>
import { Component } from 'react';<% } else if (client === 'reflux') { %>
import Reflux from 'reflux';
import { Component } from 'reflux';<% } %><% if (client === 'reflux' && isStore) { %>
import { Store } from 'reflux';<% } %>
import PropTypes from 'prop-types';<% if (features.withTracker !== 'false') { %>
import { withTracker } from 'meteor/react-meteor-data';<% } %><% if(graphql === 'apollo') { %>
import { graphql, compose } from 'react-apollo';
import gql from 'graphql-tag';<% } %><% if (!isStore) { %>

class <%= className %>Component extends Component {<% } else { %>
class <%= className %>Component extends Store { <% } %><% if (client === 'reflux' && isStore) { %>
    constructor() {
        super();
        this.state = {};
    }<% } else { %>
    constructor(props) {
        super(props);
        this.state = {};<% if (client === 'reflux') { %>
        this.store = {};<% } %>
    }

    static propTypes = {}

    static defaultProps = {}

    componentWillMount() {}

    render() { 
        return (<h2 className="<%=fileName%>">Find me in <%= myPath %></h2>);
    }

    componentDidMount() { }

    componentWillUnmount() { }

    componentDidCatch(error, info) { console.log(error, info); }<% } %>
}
<% if(graphql === 'apollo') { %>
const <%= className %> = compose(
    withTracker((props) => {
        return {};
    })
)(<%= className %>Component);<% } else if (features.withTracker !== 'false') { %>
const <%= className %> = withTracker((props) => {
        return {};
    })
(<%= className %>Component);<% } else { %>
const <%= className %> = <%= className %>Component;<% } %>
export { <%= className %>, <%= className %>Component };
