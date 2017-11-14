# maka
###### Subscribe on twitter for latest @maka_cli announcements!
[![Donate](https://img.shields.io/badge/Donate-PayPal-green.svg)](https://www.paypal.com/cgi-bin/webscr?cmd=_s-xclick&hosted_button_id=CQ2NZZELXC292)

Meteor Apps Kick Ass! (maka) 

Maka is a command line scaffolding tool for Meteor applications.

It automatically creates project structure, files and boilerplate code.  You may use maka where ever you use meteor.

Maka works great on OSX and Linux... and now much better on Windows.

All the Meteor 1.3 style templates have been updated with JSDoc tags. This includes the api, ui, routes, and some others.  So if you start a new project with maka, you'll get documentation right from the get go!  Otherwise you'll have to enjoy the new JSDoc comments on newly generated files.

Enjoy! Let me know what you think, or if you have any suggestions!

--
Maka

### Update. 2.7.6
So I've been seeing a trend that maka-cli base app is getting pretty... big boned... and I think it's best to cull some of the packages that are going in by default.  Namely, test and rest.

New apps will no longer be built by default with test and rest packages, saving hundreds of initial package loads from going in!

In other news, I've had this test coverage itch I just couldn't stop scratching.  As such... you know that cool Velocity html-reporter that we use (if you're not... pff) well I integrated meteor-coverage into maka scaffold-ed apps so now when you run tests and use meteor-coverage you'll get a new button to generate a coverage report!  Neat!  If you partake in the test suite, all you have to do is run 

```sh 
    $ maka --test

```


Recap:

 * Tests and Rest API are not longer default.
 * I was itchy.
 * Coverage now comes with the test suite.

 To load the two, now orphaned, options you'll need to use the following:

 ``` sh
    $ maka create newApp --test=jasmine --api=rest
 ```

 Sorry for those that really like that bcrypt message caused by restivus... ha!

 --
 Maka

### Update 2.7.5
Looks like the update to React did some strange stuff to the testing suite.  ReactTestUtils and the Shallow Renderer packages have been moved around.  As such, I had to include a new package ``` maka npm install --save react-test-renderer ``` and update the *.app-test.jsx render to include this new module along with point ReactTestUtils to it's new home inside react-dom.

Unfortunatly, if you have a lot of tests this means they each need to be updated... sucks!

Sorry, but it is what it is.  Blame Facebook?

--
Maka


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

### Create an Application
```sh
$ maka create my-app
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


The following parameters can be specified:
```
--skip-template-css=true|false       Don't generate CSS files when templates are made.
--skip-template-js=true|false        Don't generate JS files when templates are made.
--skip-template-html=true|false      Don't generate HTML files when templates are made.
--skip-flow-router                   Don't install flow-router. (route generators will be disabled in maka-cli)
--skip-route-template                Don't create templates with route generators.
--skip-testing                         Don't install testing packages (jasmine, html/console reporter, factory, etc)
```

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
$ maka g:package username:packageName
$ maka g:package packageName

Help:
$ maka g 
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
Maka projects require buildpacks to look for the app in /app/ in addition to the root for deployments to work. Currently there is a patched version of the Horse buildpack available that is compatible with Iron based projects. Use this fork until the patches has been added to the main Horse repo.

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
$heroku addons:create mongolab
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

```sh
.
├── app
│   ├── client
│   │   ├── head.html					 # The <head> tag
│   │   └── main.js  					 # The entry point for imports/ui
│   ├── imports      					 # Lazy loaded files live here
│   │   ├── api      					 # Server concept logic
│   │   │   └── todos					 # "maka g:api todos"
│   │   │       ├── api.js   			 # RESTFul endpoints (restivus)
│   │   │       ├── fixtures.js 		 # Preload data
│   │   │       ├── methods.js   		 # Client invoked Server functions.
│   │   │       ├── publications.js  	 # Broadcasted sets of data
│   │   │       ├── todos.app-tests.js
│   │   │       └── todos.js    		 # Collection
│   │   ├── startup  					 
│   │   │   ├── client
│   │   │   │   ├── index.js
│   │   │   │   ├── routes.js   		 # FlowRouter routes
│   │   │   │   └── templates.js     	 # Registers templates from ui/
│   │   │   ├── lib
│   │   │   │   └── index.js
│   │   │   └── server
│   │   │       ├── index.js
│   │   │       └── register-todos-api.js
│   │   └── ui
│   │       ├── components      		 # Reusable components
│   │       │   └── header   			 # "maka g:t header --component"
│   │       │       ├── header.css
│   │       │       ├── header.html
│   │       │       └── header.js
│   │       ├── layouts      			 # Site layout
│   │       │   └── master-layouts   	 # "maka g:t masterLayout --component" 
│   │       │       ├── master-layout.html
│   │       │       └── master-layout.js
│   │       ├── pages       			 # "maka g:route home" or for no route:"maka g:t home" 
│   │       │   └── home
│   │       │       ├── home.css
│   │       │       ├── home.html
│   │       │       └── home.js
│   │       └── test-helpers.js  		 # UI test helper function
│   ├── lib
│   │   └── main.js     				 # The entry point for imports/lib
│   ├── packages				      	 # "maka g:package [account:]package"
│   ├── private          				 # Server accessible (only) files
│   ├── public          				 # Globally accessible files
│   └── server
│       └── main.js      				 # The entry point for imports/api
├── bin
├── build      		# "maka build --architecture [os.linux.x86_64] [os.linux.x86_32] [os.osx.x86_64] [os.windows.x86_32]"
│   └── README
└── config
    ├── development
    │   ├── env.sh
    │   └── settings.json
    └── production
        ├── env.sh
        └── settings.json


26 directories, 30 files

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

