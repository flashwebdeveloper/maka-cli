/** @namespace Client */
<% if (config.engines.ssr === 'true') { %>import Routes from '../lib/routes.jsx';<% } else { %> import Routes from './routes.jsx'; <% } %>

import React from 'react';
import ReactDOM from 'react-dom';
import { Meteor } from 'meteor/meteor';
<% if (config.engines.graphql === 'apollo') {  %>
// Apollo Client configuration using vanilla meteor settings.
import ApolloClient from 'apollo-client';
import { meteorClientConfig } from 'meteor/apollo';
import { ApolloProvider } from 'react-apollo';
const client = new ApolloClient(meteorClientConfig());
<% } %>
<% if (config.engines.theme === 'material') { %>
// Material UI Theme config using roboto typefont and default mui.
import 'typeface-roboto'
import { MuiThemeProvider, createMuiTheme } from 'material-ui/styles';
const theme = createMuiTheme();
<% } %>

const App = () => (
    <% if (config.engines.graphql === 'apollo') { %><ApolloProvider client={client}><% } %>
        <% if (config.engines.theme === 'material') { %><MuiThemeProvider theme={theme}><% } %>
            <Routes/>
        <% if (config.engines.theme === 'material') { %></MuiThemeProvider><% } %>
    <% if (config.engines.graphql === 'apollo') { %></ApolloProvider><% } %>
);

Meteor.startup( () => {
    ReactDOM.render(<App />, document.getElementById( 'react-root' ));
});
