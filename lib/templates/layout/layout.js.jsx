import React from 'react';<% if (client === 'react') { %>
import { Component } from 'react';<% } else { %>
import { Component } from 'reflux';<% } %>
import PropTypes from 'prop-types';


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

const <%= className %> = <%= className %>Component;
export { <%= className %>, <%= className %>Component };
