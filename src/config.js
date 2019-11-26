const { cosmiconfigSync } = require('cosmiconfig');

const packageName = 'branchlint';
const chalk = require('chalk');
const _ = require('lodash');

export class Config {
  constructor(options = null) {
    this.options = options;
    this.configFileOptions = {};

    this.setDefaultOptions();
    this.readFromConfigFile(options);

    this.options = _.extend(
      this.defaultOptions,
      this.configFileOptions,
      this.options,
    );
  }

  readFromConfigFile(options) {
    try {
      const explorer = cosmiconfigSync(packageName);

      if (options.config) {
        const searchedFor = explorer.load(options.config);
        this.configFileOptions = searchedFor.config;
        return;
      }

      const searchedFor = explorer.search();

      if (searchedFor) {
        this.configFileOptions = searchedFor.config;
      }
    } catch (e) {
      console.log(chalk.red(`Config error: ${e}`));
      process.exit(1);
    }
  }

  setDefaultOptions() {
    this.defaultOptions = {
      allowed: [],
      prefixes: [],
      disallowed: [],
      regularExpressions: [],
      separator: '',
      maxSections: null,
      msgPrefixNotAllowed:
        'Branch name "%s" is not allowed.\n' +
        'Allowed branch name prefix is %s and separator is "%s"',
      msgBranchDisallowed: 'Pushing to "%s" is not allowed, use github-flow.',
      msgRegexNotMatched:
        'Pushing to "%s" is not allowed, Allowed regex pattern is "%s"',
      msgSeperatorRequired: 'Branch "%s" must contain a seperator "%s".',
      msgSectionsOver: `Branch name "%s" is not allowed\n\
        Allowed max section length is %s`,
    };
  }
}

export default {
  Config,
};
