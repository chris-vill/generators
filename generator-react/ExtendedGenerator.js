const Generator = require('yeoman-generator');
const yosay = require('yosay');
const chalk = require('chalk');

module.exports = class extends Generator {
  constructor(args, opts) {
    super(args, opts);
  }

  // FIXME
  // _divider() {
  //   this.spawnCommandSync('printf', ['─%.s', '{1..$(tput cols)}']);
  // }

  _copyRawFiles(file) {
    this.fs.copy(
      this.templatePath(file),
      this.destinationPath(`${this.options.path}/${file}`)
    );
  }

  _buildTemplate(file, options) {
    this.fs.copyTpl(
      this.templatePath(file),
      this.destinationPath(`${this.options.path}/${file}`),
      options || this.options
    );
  }

  _makeDir(path) {
    this.spawnCommandSync(
      'mkdir',
      [ path || this.options.path ]
    );
  }

  _stepLog(msg) {
    this.log(
      chalk.bold.yellow(msg)
    );
  }

  _yarnInstall(dependencies, path, args) {
    const _path = path || this.options.path;
    const spawnOptions = _path
      ? { cwd: _path }
      : {};

    this.yarnInstall(
      dependencies,
      args || {},
      spawnOptions
    );
  }

  // // TODO maybe change this
  _yarnInstallDev(dependencies, path) {
    this._yarnInstall(
      dependencies,
      path,
      {
        dev: true
      }
    );
  }

  _yarnRun(cmd, path) {
    this.spawnCommandSync(
      'yarn',
      [ cmd ],
      { cwd: path }
    );
  }

  _yoSay(msg) {
    this.log(
      yosay(
        chalk.cyan(msg)
      )
    );
  }
}
