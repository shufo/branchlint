const { sprintf } = require('sprintf-js');
const chalk = require('chalk');

function log(body) {
  // eslint-disable-next-line no-console
  console.log(body);
}

function getPrefixErrorMessage(config, branchName) {
  return sprintf(
    config.msgPrefixNotAllowed,
    branchName,
    config.prefixes,
    config.separator,
  );
}

function getDisallowedErrorMessage(config, branchName) {
  return sprintf(config.msgBranchDisallowed, branchName);
}

function getRegexErrorMessage(config, branchName) {
  return sprintf(
    config.msgRegexNotMatched,
    branchName,
    config.regularExpressions,
  );
}

function getSeparatorErrorMessage(config, branchName) {
  return sprintf(config.msgSeperatorRequired, branchName, config.separator);
}

function getSectionsErrorMessage(config, branchName) {
  return sprintf(config.msgSectionsOver, branchName, config.maxSections);
}

// eslint-disable-next-line max-lines-per-function
function printErrorMessage(config, type, branchName) {
  switch (type) {
    case 'prefix':
      return log(
        chalk.red('prefix: ') + getPrefixErrorMessage(config, branchName),
      );

    case 'disallowed':
      return log(
        chalk.red('name: ') + getDisallowedErrorMessage(config, branchName),
      );

    case 'regex':
      return log(
        chalk.red('regex: ') + getRegexErrorMessage(config, branchName),
      );

    case 'separator':
      return log(
        chalk.red('separator: ') + getSeparatorErrorMessage(config, branchName),
      );

    case 'sections':
      return log(
        chalk.red('sections: ') + getSectionsErrorMessage(config, branchName),
      );

    default:
      return '';
  }
}

export default {
  log,
  printErrorMessage,
};
