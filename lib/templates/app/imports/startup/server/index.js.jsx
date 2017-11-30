/** @namespace Server */
<% if (config.engines.graphql === 'apollo') { %>
// Apollo Server imports
import { createApolloServer } from 'meteor/apollo';
import { makeExecutableSchema } from 'graphql-tools';
import { mergeTypes, mergeResolvers } from 'merge-graphql-schemas';

const typeList = [];
const resolverList = [];


if (typeList.length > 0 && resolverList.length > 0) {

    const typeDefs = mergeTypes(typeList);
    const resolvers = mergeResolvers(resolverList);

    const schema = makeExecutableSchema({
        typeDefs,
        resolvers,
    });

    createApolloServer({
        schema,
    });
}<% } %><% if (config.engines.ssr === 'true') { %>
import Routes from '../lib/routes.jsx';
import React from 'react';
import { renderToStaticMarkup } from 'react-dom/server';
import { onPageLoad } from 'meteor/server-render';
import { StaticRouter } from 'react-router-dom';
import { ServerStyleSheet } from 'styled-components';
import { createMemoryHistory } from 'history';

onPageLoad(sink => {
    const history = createMemoryHistory(sink.request.url.pathname);

    const App = (props) => (
        <StaticRouter
            location={props.location}
            context={{}}>
            <Routes history={history}/>
        </StaticRouter>
    );

    const sheet = new ServerStyleSheet();
    const html = renderToStaticMarkup(sheet.collectStyles(
        <App location={sink.request.url} />
    ));

    // This will cause warnings... but it actually works...
    // So I'm going to leave it as is.
    sink.appendToBody(html);
    sink.appendToHead(sheet.getStyleTags());

    // This method doesn't work.
    // Issue created: https://github.com/meteor/meteor/issues/9429
    // sink.renderIntoElementById('app', html);
});<% } %>
