import React from 'react';<% if (client === 'react') { %>
import { Component } from 'react';<% } %><% if (client === 'reflux') { %>
import Reflux, { Component } from 'reflux';<% } %><% if (features.withTracker !== 'false') { %>
import { withTracker } from 'meteor/react-meteor-data';<% } %><% if(graphql === 'apollo') { %>
import { graphql, compose } from 'react-apollo';
import gql from 'graphql-tag';<% } %>

class <%= className %>Component extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    static propTypes = {}

    static defaultProps = {}

    componentWillMount() {<% if (client === 'reflux' && !isStore) { %>
        super.componentWillMount();<% }%>
    }

    render() { return (<div>{ this.props.children }</div>); }

    componentDidMount() { }

    componentWillUnmount() {<% if (client === 'reflux' && !isStore) { %>
        super.componentWillUnmount();<% }%>
    }

    componentDidCatch(error, info) { console.log(error, info); }
}
<% if(graphql === 'apollo' && features.withTracker !== 'false') { %>
const <%= className %> = compose(
    //graphql(),
    withTracker((props) => {
        return {};
    })
)(<%= className %>Component);<% } else if (graphql === 'apollo' && features.withTracker === 'false') { %>
const <%= className %> = compose(
    //graphql()
)(<%= className %>Component);<% } else if (features.withTracker !== 'false') { %>
const <%= className %> = withTracker((props) => {
        return {};
    })
(<%= className %>Component);<% } else { %>
const <%= className %> = <%= className %>Component;<% } %>

export { <%= className %>, <%= className %>Component };
