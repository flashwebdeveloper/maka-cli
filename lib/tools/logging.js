var cli = require('cli-color');
var log = require('single-line-log').stdout;
var _ = require('underscore');
var cliSpinners = require('cli-spinners');

module.exports = {
  logSuccess: function () {
    console.log(cli.green.apply(this, arguments));
  },

  logWarn: function () {
    console.log(cli.yellow.apply(this, arguments));
  },

  logNotice: function () {
    console.log(cli.blue.apply(this, arguments));
  },

  logError: function () {
    console.log(cli.red.bold.apply(this, arguments));
  },

  logUsage: function () {
    var header = cli.blackBright;

    var description = this.description();
    var usage = this.usage();
    var examples = this.examples();

    console.log();
    this.logNotice(description);
    console.log();
    console.log(header('Usage: ') + usage);

    if (examples && examples.length > 0) {
      console.log();
      console.log(header('Examples:'));
      _.each(examples, function (example) {
        console.log('  > ' + example);
      });
      console.log();
    }

    this.onUsage();
  },

  singleLineLog: function singleLineLog(/* args */) {
    return log.apply(log, arguments);
  },

  logWithSpinner: function logWithSpinner(/* args */) {
    var self = this;
    var spinner = cliSpinners.dots4;
    var message = _.toArray(arguments).join(' ');
    var i = 0;

    var timer = setInterval(function() {
        const frames = spinner.frames;
        self.singleLineLog(message + ' ' + frames[i = ++i % frames.length] + ' ');
    }, spinner.interval);

    return {
      stop: function() {
        clearInterval(timer);
        console.log();
      }
    };
  }
};
