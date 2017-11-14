import React from 'react';
import { render } from 'react-dom';
import { Router, Route, IndexRoute, browserHistory } from 'react-router';

<% if (config.engines.graphql === 'apollo') {  %>
import { Meteor } from 'meteor/meteor';

import ApolloClient from 'apollo-client';
import { meteorClientConfig } from 'meteor/apollo';
import { ApolloProvider } from 'react-apollo';

const client = new ApolloClient(meteorClientConfig());

<% } %>

/**
 * The React Router client side routing definitions.
 * @namespace Client.Routes
 * @desc This is the main definition for the react router.
 */

import * as Component from './templates.jsx';

Meteor.startup( () => {
  render(
    <% if (config.engines.graphql === 'apollo') { %><ApolloProvider client={client}> <% } %>
    <Router history={ browserHistory }>
        <Route path="*" component={ Component.MasterLayout }>
            <IndexRoute component={ Component.NotFound }/>
        </Route>
    </Router>
    <% if (config.engines.graphql === 'apollo') { %> </ApolloProvider>, <% } else { %> , <% } %>
    document.getElementById( 'react-root' )
  );
});
