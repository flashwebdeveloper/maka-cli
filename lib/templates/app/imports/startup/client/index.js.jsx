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
<% } %><% if (config.engines.theme === 'material') { %>
// Material UI Theme config using roboto typefont and default mui.
import 'typeface-roboto'
import { MuiThemeProvider, createMuiTheme } from 'material-ui/styles';
const theme = createMuiTheme();
<% } %><% if (config.engines.ssr === 'true') { %>
// Server Side Rendering sink and router classifier.
import { BrowserRouter } from 'react-router-dom'
import { onPageLoad } from "meteor/server-render";
import { browserHistory } from 'react-router';
<% } %>

const App = () => (
    <% if (config.engines.ssr === 'true') { %><BrowserRouter><% } %>
    <% if (config.engines.graphql === 'apollo') { %><ApolloProvider client={client}><% } %>
        <% if (config.engines.theme === 'material') { %><MuiThemeProvider theme={theme}><% } %>
            <% if (config.engines.ssr === 'true') { %><Routes history={browserHistory}/><% } else { %><Routes/><% } %>
         <% if (config.engines.theme === 'material') { %></MuiThemeProvider><% } %>
    <% if (config.engines.graphql === 'apollo') { %></ApolloProvider><% } %>
    <% if (config.engines.ssr === 'true') { %></BrowserRouter><% } %>
);

Meteor.startup(() => {<% if (config.engines.ssr === 'true') { %>
    onPageLoad(sink => {
        // TODO: Once mdg figures out the issue with sink.renderIntoElementById change this back to the app id
        ReactDOM.hydrate(<App />,document.body);
    });<% } else { %>
    ReactDOM.render(<App />, document.getElementById('app'));<% } %>
});
