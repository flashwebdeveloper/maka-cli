var path = require('path');
var _ = require('underscore');

// --css=css|scss|less
// --js=js|coffee|ts|jsx
// --html=html|jade
// --client=blaze|react

// --skip-template-css=true|false
// --skip-template-js=true|false
// --skip-template-html=true|false
// --skip-flow-router

// --skip-route-template

Command.create({
  name: 'init',
  usage: 'maka init',
  description: 'Initialize your project structure.'
}, function (args, opts) {
  // the app name is either the first argument to the
  // generator or inferred from the current directory.
  // if no appname is provided, we assume we're already
  // in the project directory.
  var appName = args[0] || path.basename(process.cwd());
  var projectDirectory = args[0] || process.cwd();
  var orbitDirectory = path.join(projectDirectory, 'app', 'client');

  var config = {
    engines: {
      html: opts.html || 'html',
      js: opts.js || 'js',
      css: opts.css || 'css',
      api: opts.api || 'rest',
      client: opts.client || 'react',
      test: opts.test || 'jasmine',
      apollo: opts.apollo || 'none'
    },
    template: {
      html: !_.has(opts, 'skip-template-html'),
      js: !_.has(opts, 'skip-template-js'),
      css: !_.has(opts, 'skip-template-css'),
      test: !_.has(opts, 'skip-testing')
    },
    route: {
      template: !_.has(opts, 'skip-route-template')
    },
    generator: {
      comments: !_.has(opts, 'skip-generator-comments')
    }
  };

  if (config.engines.client === 'react') {
    config.engines.js = 'jsx';
    config.template.html = false;
  }

  var context = {
    app: appName,
    config: config
  };


  var self = this;

  return CurrentConfig.withValue(config, function () {
    // copy the project template directory to the project directory
    self.copyTemplateDirectory('project', projectDirectory, context);

    // create an empty meteor project in the app folder
    self.createEmptyMeteorProject('app', {cwd: projectDirectory});

    var appDirectory = path.join(projectDirectory, 'app');

    // copy the meteor app folder template to our new app
    self.copyTemplateDirectory('app', appDirectory, context);

    // invoke the right generators for some default files
    Maka.findGenerator('template').invoke(['MasterLayout'], {cwd: projectDirectory, root: true, config, layout: true});
    Maka.findGenerator('route').invoke(['Home', '/'], {cwd: projectDirectory, root: true, config});
    Maka.findGenerator('template').invoke(['Home'], {cwd: projectDirectory, root: true, config});
    Maka.findGenerator('template').invoke(['NotFound'], {cwd: projectDirectory, root: true, config});

    if (!_.has(opts, 'skip-flow-router') && context.config.engines.client === 'blaze') {
      // install the flow router package
      // kadira:flow-router
      // kadira:blaze-layout
      self.installMeteorPackage('kadira:flow-router kadira:blaze-layout', {cwd: appDirectory});
    }

    if (config.template.test) {
      // install the jasmine driver package and html/console reporter
      self.installMeteorPackage('sanjo:jasmine velocity:html-reporter velocity:console-reporter dburles:factory', {cwd: appDirectory});
    }

    if (config.engines.api) {

        if (config.engines.api === 'rest') {
            self.installMeteorPackage('maka:rest', {cwd: appDirectory});
        }

        if (config.engines.api === 'restivus') {

            if (!_.has(opts, 'skip-restivus') || !_.has(opts, 'maka-rest')) {
                // install the RESTful api package, restivus
                self.installMeteorPackage('accounts-password nimble:restivus', {cwd: appDirectory});
            }
        }
    }

    if (!_.has(opts, 'skip-validated-methods')) {
      self.installMeteorPackage('mdg:validated-method', {cwd: appDirectory});
    }

    if (config.template.css) {
      if (config.engines.css == 'scss')
        self.installMeteorPackage('fourseven:scss', {cwd: appDirectory});

      if (config.engines.css == 'less')
        self.installMeteorPackage('less', {cwd: appDirectory});
    }

    if (config.template.js) {
      if (config.engines.js == 'coffee')
        self.installMeteorPackage('coffeescript', {cwd: appDirectory});
    }

    if (config.template.html) {
      if (config.engines.html === 'jade')
        self.installMeteorPackage('mquandalle:jade', {cwd: appDirectory});
    }

    if (config.template.js) {
      if (config.engines.js === 'ts')
        self.installMeteorPackage('barbatus:typescript', {cwd: appDirectory});
    }

    if (opts.orbit) {
        // copy the orbit directory
        self.copyTemplateDirectory('orbit', orbitDirectory, context);
        // install rainhaven:orbit
        self.installMeteorPackage('scottmcpherson:orbit', {cwd: appDirectory});
    }

    if ('js' in opts && opts['js'].toLowerCase() === 'es6') {
        // install the Babel package for Meteor.
        self.installMeteorPackage('grigio:babel', {cwd: appDirectory});
    }

    // invoke npm install
    self.initNpm({cwd: appDirectory});
    self.installNpmPackage('babel-runtime', {cwd: appDirectory});
    self.installNpmPackage('bcrypt', {cwd: appDirectory});

    // install react and react router if using...react.
    if (config.engines.client === 'react') {
        self.installMeteorPackage('react-meteor-data', {cwd: appDirectory});
        self.installNpmPackage(' react react-dom react-router@3.0.2 react-addons-pure-render-mixin babel-plugin-transform-decorators-legacy react-addons-test-utils', {cwd: appDirectory});
    }

    if (config.engines.apollo === 'client' || config.engines.apollo === 'both') {
        self.installNpmPackage('react-apollo', {cwd: appDirectory});
    }

    return true;
  });
});
