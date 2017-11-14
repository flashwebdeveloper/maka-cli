var ApiGenerator = Generator.create({
    name: 'api',
    aliases: ['api'],
    usage: 'maka {generate, g}:{api} <concept>',
    description: 'Generate scaffolding for a api concept (i.e. Todos).',
    examples: [
        'maka g:api todos'
    ]
}, function (args, opts) {

    var pathToApi = this.pathFromApp(
        'imports/api',
        opts.dir,
        this.fileCase(opts.resourceName),
        this.fileCase(opts.resourceName)
    );

    var config = CurrentConfig.get();

    var context = {
        name: this.classCase(opts.resourceName),
        fileName: this.fileCase(opts.resourceName),
        camelCase: this.camelCase(opts.resourceName),
        optsDir: (opts.dir) ? '/' + opts.dir + '/' : '/',
        api: config.engines.api,
        graphql: config.engines.graphql
    };

    this.template(
        'api/collection.js',
        pathToApi + '.js',
        context
    );

    if (config.egines.api !== 'none') {
        this.template(
            'api/api.js',
            this.pathFromApp('imports/api/', opts.dir, this.fileCase(opts.resourceName), 'api.' + config.engines.js),
            context
        );
    }

    this.template(
        'api/methods.js',
        this.pathFromApp('imports/api/', opts.dir, this.fileCase(opts.resourceName), 'methods.' + config.engines.js),
        context
    );

    this.template(
        'api/fixtures.js',
        this.pathFromApp('imports/api/', opts.dir, this.fileCase(opts.resourceName), 'fixtures.' + config.engines.js),
        context
    );

    if (config.engines.test !== 'none') {
        this.template(
            'api/app-tests.js',
            this.pathFromApp('imports/api/', opts.dir, this.fileCase(opts.resourceName), this.fileCase(opts.resourceName) + '.app-tests.js'),
            context
        );
    }

    this.template(
        'api/publications.js',
        this.pathFromApp('imports/api/', opts.dir, this.fileCase(opts.resourceName), 'publications.' + config.engines.js),
        context
    );

    if (config.engines.graphql === 'apollo') {
        var destpath = this.rewriteDestinationPathForEngine(this.pathFromApp('imports/startup/server/index.jsx'));

        var typeDefPath = this.pathFromApp('imports/api/', opts.dir, this.fileCase(opts.resourceName), 'graphql/', 'typeDefs.' + config.engines.js);
        var apptypeDefPath = '/imports/api/' + opts.dir + this.fileCase(opts.resourceName) + '/graphql/typeDefs.' + config.engines.js;
        this.template(
            'api/typeDefs.js',
            typeDefPath,
            context
        );
        this.injectAtBeginningOfFile(destpath, '\n' + 'import { typeDefs as ' + this.camelCase(opts.resourceName) + 'TypeDefs } from \'' + apptypeDefPath + '\'');
        this.injectIntoFile(destpath, '\ntypeList.push(' + this.camelCase(opts.resourceName) + 'TypeDefs' + ');\n', 'const', 'if');
        

        var resolversPath = this.pathFromApp('imports/api/', opts.dir, this.fileCase(opts.resourceName),'graphql/', 'resolvers.' + config.engines.js);
        var appResolverPath = '/imports/api/' + opts.dir + this.fileCase(opts.resourceName) + '/graphql/resolvers.' + config.engines.js;
        this.template(
            'api/resolvers.js',
            resolversPath,
            context
        );
        this.injectAtBeginningOfFile(destpath, '\n' + 'import { resolvers as ' + this.camelCase(opts.resourceName) + 'Resolvers } from \'' + appResolverPath + '\'');
        this.injectIntoFile(destpath, '\nresolverList.push(' + this.camelCase(opts.resourceName) + 'Resolvers' + ');\n', 'const', 'if');
        
    }

    this.template(
        'api/register-api.js',
        this.pathFromApp('imports/startup/server', 'register-' + this.fileCase(opts.resourceName) + '-api.' + config.engines.js),
        context
    );

    var destPath = this.pathFromApp('imports/startup/server/index.' + config.engines.js);
    this.injectAtEndOfFile(destPath, 'import \'./register-' + this.fileCase(opts.resourceName) + '-api.' + config.engines.js + '\';');
});
