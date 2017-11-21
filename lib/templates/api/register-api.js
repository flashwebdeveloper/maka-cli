/**
 * Registration of the following files for the
 * <%= name %> API into the Server namespace.
 * ```
 * './api<%= optsDir %><%= fileName %>/methods.js'
 * './api<%= optsDir %><%= fileName %>/api.js'
 * './api<%= optsDir %><%= fileName %>/fixtures.js'
 * './api<%= optsDir %><%= fileName %>/publications.js'
 * ```
 * @namespace Server.<%= name %>
 */
import '../../api<%= optsDir %><%= fileName %>/methods.js';
<% if (api !== 'none') { %> import '../../api<%= optsDir %><%= fileName %>/api.js'; <% } %>
import '../../api<%= optsDir %><%= fileName %>/fixtures.js';
import '../../api<%= optsDir %><%= fileName %>/publications.js';
