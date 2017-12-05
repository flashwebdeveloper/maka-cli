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
import { createMemoryHistory } from 'history';

<% if (config.engines.theme === 'material') { %>
import { SheetsRegistry } from 'react-jss/lib/jss';
import JssProvider from 'react-jss/lib/JssProvider';
import { create } from 'jss';
import preset from 'jss-preset-default';
import { MuiThemeProvider, createMuiTheme } from 'material-ui/styles';
import createGenerateClassName from 'material-ui/styles/createGenerateClassName';
import { grey } from 'material-ui/colors';
<% } else { %>
import { ServerStyleSheet } from 'styled-components';
<% } %>
onPageLoad(sink => {
    const history = createMemoryHistory(sink.request.url.pathname);

    const App = (props) => (
        <StaticRouter
            location={props.location}
            context={{}}>
            <Routes history={history}/>
        </StaticRouter>
    );
    <% if (config.engines.theme === 'material') { %>
    // Create a sheetsRegistry instance.
    const sheetsRegistry = new SheetsRegistry();

    // Create a theme instance.
    const theme = createMuiTheme({
        palette: {
            primary: grey,
            accent: grey,
            type: 'light',
        },
    });

    const jss = create(preset());
    jss.options.createGenerateClassName = createGenerateClassName;

    const html = renderToStaticMarkup(
        <JssProvider registry={sheetsRegistry} jss={jss}>
            <MuiThemeProvider theme={theme} sheetsManager={new Map()}>
                <App location={sink.request.url} />
            </MuiThemeProvider>
        </JssProvider>
    );

    const css = sheetsRegistry.toString();
    sink.appendToHead(`<style id="jss-server-side">${css}</style>`);
    <% } else { %>
    const sheet = new ServerStyleSheet();
    const html = renderToStaticMarkup(sheet.collectStyles(
        <App location={sink.request.url} />
    ));

    sink.appendToHead(sheet.getStyleTags());
    <% } %>

    sink.renderIntoElementById('app', html);

});<% } %>
