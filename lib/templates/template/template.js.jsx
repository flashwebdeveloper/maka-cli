import React from 'react';<% if (client === 'react') { %>
import { Component } from 'react';
import PropTypes from 'prop-types';<% } else if (client === 'reflux') { %><% if ( isStore ) { %>
import { Store } from 'reflux'; <% } else { %>
import { Component } from 'reflux';
import PropTypes from 'prop-types';<% } %><% } %><% if (features.withTracker !== 'false' && !isStore) { %>
import { withTracker } from 'meteor/react-meteor-data';<% } %><% if(graphql === 'apollo' && !isStore) { %>
import { Query } from 'react-apollo';
import { gql } from 'apollo-boost'; <% } %>

<% if (!isStore) { %>
class <%= className %>Component extends Component {<% } else { %>
class <%= className %>Component extends Store { <% } %><% if (client === 'reflux' && isStore) { %>
    constructor() {
        super();
        this.state = {};
    }<% } else { %>
    constructor(props) {
        super(props);
        this.state = {};<% if (client === 'reflux') { %>
        this.store = null;<% } %>
    }

    static propTypes = {}

    static defaultProps = {}

    componentWillMount() {<% if (client === 'reflux' && !isStore) { %>
        super.componentWillMount();<% }%>
    }

    render() { 
        return (<h2 className="<%=fileName%>">Find me in <%= myPath %></h2>);
    }

    componentDidMount() { }

    componentWillUnmount() {<% if (client === 'reflux' && !isStore) { %>
        super.componentWillUnmount();<% }%>
    }

    componentDidCatch(error, info) { console.log(error, info); }<% } %>
}<% if (!isStore) { if (features.withTracker !== 'false') { %>
const <%= className %> = withTracker((props) => {
    return {};
})
(<%= className %>Component);<% } else { %>
const <%= className %> = <%= className %>Component;<% } %>

export { <%= className %>, <%= className %>Component };<% } else { %>
const <%= className %> = <%= className %>Component;

export { <%= className %> };<% } %>
