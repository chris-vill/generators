const ExtendedGenerator = require('../ExtendedGenerator');

module.exports = class extends ExtendedGenerator {

  constructor(args, opts) {
    super(args, opts);
  }

  async prompting() {

    this._yoSay('Welcome fellow developer! Let me guide you on setting up your dream project ;)');
    this.options = await this.prompt([
      {
        type: "input",
        name: "path",
        message: "Path (must contain project name at the end):",
        default: this.appname // Default to current folder name
      },
      {
        type: "input",
        name: "projectDescription",
        message: "Description:"
      },
      {
        type: "input",
        name: "authorName",
        message: "Author:"
      },
      {
        type: "input",
        name: "gitSSH",
        message: "SSH of your github project:"
      }
    ]);
  }

  configuring() {
    const regex = /^(?:.+\/)?(.+)$/;

    this._stepLog("Transforming Data");
    this.options.projectName = this.options.path.match(regex)[1];

    if (this.options.gitSSH) {
      // SSH - git@github.com:chris-vill/react-resume.git
      // URL - git+https://github.com/chris-vill/react-resume.git
      // BUGs - https://github.com/chris-vill/react-resume/issues
      // HOME - https://github.com/chris-vill/react-resume#readme

      this.options.gitRepository = this.options.gitSSH
        .replace("@", "+https://")
        .replace(/github.com(\:)/, "/");

      this.options.gitBugs = this.options.gitRepository
        .replace("git+", "")
        .replace(".git", "/issues");

      this.options.gitHomepage = this.options.gitBugs
        .replace("#readme");
    }
  }

  writing() {
    const rawFiles = [
      '.babelrc',
      '.gitignore',
      'README.md',
      'webpack.config.js',
      'src/index.html',
      'src/index.js',
      'src/utils.js',
      'src/components/index.js',
      'src/components/sample/Sample.js',
      'src/components/sample/Sample.sass',
      'src/styles/_constants.sass',
      'src/styles/main.sass',
    ];

    this._stepLog("Creating Directory");
    this._makeDir();
    this.log(`  create ${ this.options.path }`)

    this._stepLog("Creating Files");
    this._buildTemplate('package.json');
    rawFiles.forEach(f => this._copyRawFiles(f));
  }

  install() {
    const dependencies = [
      "react",
      "react-dom",
      "@fortawesome/fontawesome-svg-core",
      "@fortawesome/free-brands-svg-icons",
      "@fortawesome/free-regular-svg-icons",
      "@fortawesome/free-solid-svg-icons",
      "@fortawesome/react-fontawesome"
    ];
    const devDependencies = [
      "@babel/core",
      "@babel/preset-env",
      "@babel/preset-react",
      "babel-loader",
      "babel-plugin-transform-react-jsx",
      "clean-webpack-plugin",
      "html-webpack-plugin",
      "css-loader",
      "style-loader",
      "sass",
      "sass-loader",
      "webpack",
      "webpack-cli",
      "webpack-dev-server"
    ];

    this._stepLog("Installing Dependencies");
    this._yarnInstall(dependencies);

    this._stepLog("Installing Dev Dependencies");
    this._yarnInstallDev(devDependencies);
  }

  // TODO Test App in templates/
  end() {
    this._stepLog("Starting App");
    this._yarnRun('start', this.options.path);
  }
};
