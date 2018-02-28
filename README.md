# maka
###### Subscribe on twitter for latest @maka_cli announcements!
[![Donate](https://img.shields.io/badge/Donate-PayPal-green.svg)](https://www.paypal.com/cgi-bin/webscr?cmd=_s-xclick&hosted_button_id=CQ2NZZELXC292)

Meteor Apps Kick Ass! (maka) 

Maka is a command line scaffolding tool for Meteor applications with options for Server Side Rendering (SSR), GraphQL using Apollo, theme's by Material-UI (next), Tests with Jasmine, documentation with JSDocs and much more.

It automatically creates project structure, files and boilerplate code.  You may use maka where ever you use meteor.

Maka works great on OSX and Linux... and Windows.


``` sh

    $ maka create something-aweosme --graphql=apollo --theme=material --test=jasmine --ssr=true

```

--
Maka


## UPDATE 2.9.0
Good evening!

I've been away a little bit, but I just decided to come back! I come with a gift!  REFLUX!

If you don't know what reflux is... well you should find out.  If you DO, then please help yourself to the new
reflux client engine and generator.

```sh
$ maka create reflux-app --client=reflux
```

```sh
$maka g:template new-store --store
```

Look for the new store in:
```sh
$ reflix-app/app/imports/ui/stores/new-store
```

Now, "what about actions?!" you fervently ask?  I'm not sure where to put those at the moment.  For all my dealings, they
sit just fine right in the stores... maybe my ignorance... I'm open to suggestions (and yes, I've already thought of a
directory in ./ui called "actions" but if that makes the MOST sense then so shall it be).

I also want to turn your attention to the new option when creating apps to NOT include 'withTracker'.  I've thought about
this long and hard... and I find that trying to use testing, meteor's reactivity and just another layer has been ever so
exhausting.  I'm not saying I don't love Meteor... after all.. Meteor Apps Kick Ass!  I'm just saying I don't have to
LIKE withTracker right now.  So if you would like to skip the inclusion of withTracker use this option.

```sh
$ maka create no-track-app --skip-tracker
```

For existing apps, if you want to disable the withTracker you'll just need to go into the .maka/config.json and add the following to the object:

```json
...
"features": {
    "withTracker": "false"
}
...
```


Anywho... I also removed all those boiler plate docstrings from the react templates. I may have gotten carried away with the boilerplate... 


## Installation
Make sure Meteor is installed:

Linux & OSX
```sh
$ curl https://install.meteor.com/ | sh
```

Windows:
[Download Installer](https://install.meteor.com/windows)

Install the maka command line tool globally so you can use it from any project directory.

```sh
$ npm install -g maka-cli
```

## Usage
Use the `help` command to get a list of the top level commands.

```
$ maka help
```

Use the `g` command to see a list of generators.

```
$ maka g
```

## Commands

### Migrate from Iron-meteor
In the app directory:
```sh
$ maka migrate
```

### Create a Blaze application
```sh
$ maka create my-app --client=blaze
```

### Create a React App
```
$ maka create ReactApp
```

### Create a GraphQL App
```
$ maka create GraphQLApp --graphql=apollo

$ maka g:api boats
```
Currently there is a problem with Safari, so use Chrome and go to http://localhost:3000/graphiql to see the server running!


### Run Your Application
```sh
$ maka run
```

or just
```sh
$ maka
```

### Generators
```sh
$ maka g:scaffold todos
$ maka g:template todos/todo_item [--layout] [--component] # no route
$ maka g:api cars
$ maka g:collection todos
$ maka g:route webhooks/stripe				# also creates a page template
$ maka g:route todos/show todos/:id
$ maka g:route todos/edit todos/:id/edit
$ maka g:publish todos
$ maka g:stylesheet main
$ maka g:package username:packageName. 		# Create an atmosphere package that can be published
$ maka g:package packageName				# Create a meteor package that is local

Help:
$ maka g 
```

## Options

The following parameters can be specified:
```
--skip-meteor-tracker                Don't wrap React/Reflux apps in the meteor tracker.
--skip-template-css=true|false       Don't generate CSS files when templates are made.
--skip-template-js=true|false        Don't generate JS files when templates are made.
--skip-template-html=true|false      Don't generate HTML files when templates are made.
--skip-route-template                Don't create templates with route generators.
--test=jasmine                      Install testing packages (jasmine, html/console reporter, factory, etc)
--api=rest							 Install REST API package that ties directly with Meteor MongoDB collections.
```

## Testing
```sh
$ maka --test
```

This may be used with --env to test prod settings as well as other options such as --port:

```sh
$ maka --test --env production --port 3010
```

Testing packages in isolation with jasmine has also been added:

```sh
$ maka --test-packages package-name
```

To prevent the install of this testing package use the param:
```sh
$ maka create package-name --skip-jasmine
```

If you don't have jasmine, and would like it in your existing app:
```sh
$ maka add sanjo:jasmine velocity:html-reporter.
```

This will automatically load your config/development/env.sh and config/development/settings.json files.

### Run the Application with a Different Environment
```sh
$ maka run --env=staging
```

This will use the config files in `config/staging` instead.

### Debug Your Application on the Server Side
```sh
$ maka debug
```

### Build Your Application
```sh
$ maka build
```

### Connect to MongoDB Database
```sh
$ maka mongo
```

### Connect to Meteor shell
```sh
$ maka shell
```

## JSDoc Generated documentation 
Use the popular JSDocs CLI to generate documentation for your meteor app. All you need is to make sure you have:

```sh
$ npm install -g jsdoc
```

Once you have jsdoc, simply run the following command to create a jsdoc-config.json file in your config/ directory, and output the JSDoc to <project-dir>/docs/ 

```sh
$ maka jsdoc
```

## Deployment

### Deploy Your Application with Meteor Up
[Meteor Up](https://github.com/arunoda/meteor-up) is a command line tool to deploy any Meteor app to your own server.

#### Configure Meteor Up
The following configuration options are supported in `config.json`:

```
"mup": {
  "environment": "/path/to/environment"
}
```

#### Initialize Meteor Up
Use `maka mupx` to run Meteor Up commands. To create a `mup.json` file for an environment run:

```sh
maka mupx <environment> --init
```

### Deploy Your Application on Heroku
Maka projects require buildpacks to look for the app in /app/ in addition to the root for deployments to work. Currently there is a patched version of the Horse buildpack available that is compatible with Maka based projects. Use this fork until the patches has been added to the main Horse repo.

Initialize the git repo
```sh
$ git init
$ git add .
$ git commit -m 'init'
```

Create the heroku app:
```sh
$ heroku create <app-name>
```

Setup the build pack

```sh
$ heroku buildpacks:set https://github.com/AdmitHub/meteor-buildpack-horse.git
```

This will build your application and put the resulting bundle into the project's
build folder.

If that doesn't work, and you're getting a version issue try this build pack:

```sh
$ heroku buildpacks:set https://github.com/AdmitHub/meteor-buildpack-horse.git#beta
```


Setup MongoDB
```sh
$ heroku addons:create mongolab
```
Configure your ROOT_URL
```sh
$ heroku config:set ROOT_URL=https://<app-name>.herokuapp.com

or, if you have DNS setup

$ heroku config:set ROOT_URL=https://www.<domain-name>.com
```
Depoy to heroku
```sh
$ git push heroku master
```

Enable sticky session-support
```sh
$ heroku labs:enable http-session-affinity
```

Set your settings path
```sh
$ heroku config:add METEOR_SETTINGS="$(cat config/production/settings.json)"
```

## Deploy Meteor App on CentOS
```sh
$ maka build --architecture os.linux.x86_32
or
$ maka build --architecture os.linux.x86_64

Copy the build to its final home on the CentOS box.

Update Yum:
	$ yum -y update

    Install EPEL
    $ yum -y install epel-release

    Install NodeJS and Npm:
    $ yum -y install nodejs npm

    Verify Node Version
    $ node --version

    Install MongoDB
    	1. Add the MongoDB Yum repo by editing mongodb.repo and adding in the definition:
    	$ vim /etc/yum.repos.d/mongodb.repo

            [mongodb]
            name=MongoDB repo
            baseurl=http://downloads-distro.mongodb.org/repo/redhat/os/x86_64/
            gpgcheck=0
            enabled=1

        2. Install the MongoDB packages
            $ yum install mongodb-org

        3. Start MongoDB
            $ chkconfig mongod on
            $ service mongod start


The following environment variables should be modified to suit your needs.
$ export MONGO_URL='mongodb://localhost:27017/<dbName>'
$ export ROOT_URL='http://localhost'
$ export MAIL_URL='smtp://user:password@mailhost:port/'
$ export PORT=3000

$ (cd programs/server && npm install)

$ (cd to bundle root)
$ node main.js

```
## Directory Structure
The application will have the following directory structure:

### Vanilla Example

```sh
mjc@Mac vanilla-example $ tree
.
├── app
│   ├── client
│   │   ├── body.html
│   │   ├── head.html
│   │   └── main.jsx
│   ├── imports
│   │   ├── api
│   │   │   └── todos
│   │   │       ├── fixtures.jsx
│   │   │       ├── methods.jsx
│   │   │       ├── publications.jsx
│   │   │       └── todos.jsx  // The Todos class collection
│   │   ├── startup
│   │   │   ├── client
│   │   │   │   ├── index.jsx
│   │   │   │   ├── routes.jsx // React client side routes.
│   │   │   │   └── templates.jsx
│   │   │   ├── lib
│   │   │   │   └── index.jsx
│   │   │   └── server
│   │   │       ├── index.jsx
│   │   │       └── register-todo-api.jsx
│   │   └── ui
│   │       ├── layouts
│   │       │   └── master-layout
│   │       │       ├── master-layout.css
│   │       │       └── master-layout.jsx
│   │       ├── pages
│   │       │   ├── home
│   │       │   │   ├── home.css
│   │       │   │   └── home.jsx
│   │       │   └── not-found
│   │       │       ├── not-found.css
│   │       │       └── not-found.jsx
│   │       └── test-helpers.jsx
│   ├── lib
│   │   └── main.jsx
│   ├── package-lock.json
│   ├── package.json
│   ├── node_modules // Directory for npm packages.
│   ├── packages
│   ├── private  // Server side only assets
│   ├── public   // Client side assets
│   │   └── favicon.ico
│   └── server
│       └── main.jsx
├── bin
├── build
│   └── README
└── config
    ├── development
    │   ├── env.sh
    │   └── settings.json
    ├── production
    │   ├── env.sh
    │   └── settings.json
    └── staging
        ├── env.sh
        └── settings.json

26 directories, 32 files

```

### SSR Example

``` sh
mjc@Mac ssr-example $ tree
.
├── app
│   ├── client
│   │   ├── body.html
│   │   ├── head.html
│   │   └── main.jsx
│   ├── imports
│   │   ├── api
│   │   ├── startup
│   │   │   ├── client
│   │   │   │   └── index.jsx
│   │   │   ├── lib
│   │   │   │   ├── index.jsx
│   │   │   │   ├── routes.jsx  // Routes are available for both server and client.
│   │   │   │   └── templates.jsx
│   │   │   └── server
│   │   │       └── index.jsx
│   │   └── ui
│   │       ├── layouts
│   │       │   └── master-layout
│   │       │       └── master-layout.jsx
│   │       ├── pages
│   │       │   ├── home
│   │       │   │   └── home.jsx
│   │       │   └── not-found
│   │       │       └── not-found.jsx
│   │       └── test-helpers.jsx
│   ├── lib
│   │   └── main.jsx
│   ├── package-lock.json
│   ├── package.json
│   ├── node_modules
│   ├── packages
│   ├── private
│   ├── public
│   │   └── favicon.ico
│   └── server
│       └── main.jsx
├── bin
├── build
│   └── README
└── config
    ├── development
    │   ├── env.sh
    │   └── settings.json
    ├── production
    │   ├── env.sh
    │   └── settings.json
    └── staging
        ├── env.sh
        └── settings.json

25 directories, 24 files

```

### GraphQL Example

``` sh

mjc@Mac graphql-example $ tree
.
├── app
│   ├── client
│   │   ├── body.html
│   │   ├── head.html
│   │   └── main.jsx
│   ├── imports
│   │   ├── api
│   │   │   └── todos
│   │   │       ├── fixtures.jsx
│   │   │       ├── graphql  // GraphQL resource
│   │   │       │   ├── resolvers.jsx
│   │   │       │   └── typeDefs.jsx
│   │   │       ├── methods.jsx
│   │   │       ├── publications.jsx
│   │   │       └── todos.jsx
│   │   ├── startup
│   │   │   ├── client
│   │   │   │   ├── index.jsx   // Where the client GraphQL config is.
│   │   │   │   ├── routes.jsx
│   │   │   │   └── templates.jsx
│   │   │   ├── lib
│   │   │   │   ├── index.jsx
│   │   │   │   ├── routes.jsx
│   │   │   │   └── templates.jsx
│   │   │   └── server
│   │   │       ├── index.jsx   // Where the server GraphQL config is.
│   │   │       └── register-todos-api.jsx
│   │   └── ui
│   │       ├── layouts
│   │       │   └── master-layout
│   │       │       ├── master-layout.css
│   │       │       └── master-layout.jsx
│   │       ├── pages
│   │       │   ├── home
│   │       │   │   ├── home.css
│   │       │   │   └── home.jsx
│   │       │   └── not-found
│   │       │       ├── not-found.css
│   │       │       └── not-found.jsx
│   │       └── test-helpers.jsx
│   ├── lib
│   │   └── main.jsx
│   ├── package-lock.json
│   ├── package.json
│   ├── node_modules
│   ├── packages
│   ├── private
│   ├── public
│   │   └── favicon.ico
│   └── server
│       └── main.jsx
├── bin
├── build
│   └── README
└── config
    ├── development
    │   ├── env.sh
    │   └── settings.json
    ├── production
    │   ├── env.sh
    │   └── settings.json
    └── staging
        ├── env.sh
        └── settings.json

27 directories, 36 files

```


## License

The MIT License (MIT)
Copyright (C) 2017 Campbell Labs, LLC.

Permission is hereby granted, free of charge, to any person obtaining a copy of
this software and associated documentation files (the "Software"), to deal in
the Software without restriction, including without limitation the rights to
use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies
of the Software, and to permit persons to whom the Software is furnished to do
so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.

