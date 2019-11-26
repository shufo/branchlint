import util from './util';

const _ = require('lodash');

export class Linter {
  constructor(config) {
    this.options = config.options;
  }

  // eslint-disable-next-line max-lines-per-function
  lint(branchName) {
    if (this.isAllowed(branchName)) {
      return true;
    }

    const validations = [
      { type: 'prefix', isValid: this.validatePrefix(branchName) },
      { type: 'disallowed', isValid: this.validateDisallowedName(branchName) },
      { type: 'regex', isValid: this.validateRegex(branchName) },
      { type: 'separator', isValid: this.validateSeparator(branchName) },
      { type: 'sections', isValid: this.validateSections(branchName) },
    ];

    this.printErrors(validations, branchName);

    const somethingError = _.some(validations, validation => {
      return !validation.isValid;
    });

    if (somethingError) {
      process.exitCode = 1;
      return false;
    }

    return true;
  }

  isAllowed(branchName) {
    if (_.includes(this.options.allowed, branchName)) {
      util.log('valid branch name');
      return true;
    }

    return false;
  }

  printErrors(validations, branchName) {
    if (!this.options.quiet) {
      _.each(validations, validation => {
        if (!validation.isValid) {
          util.printErrorMessage(this.options, validation.type, branchName);
        }
      });
    }
  }

  validatePrefix(branchName) {
    const { prefixes, separator } = this.options;

    if (prefixes.length === 0) {
      return true;
    }

    return _.some(prefixes, prefix => {
      const regex = new RegExp(`^${prefix}${separator}`);
      return branchName.match(regex);
    });
  }

  validateDisallowedName(branchName) {
    const { disallowed } = this.options;

    if (disallowed.length === 0) {
      return true;
    }

    return !_.some(disallowed, name => {
      const regex = new RegExp(`^${name}$`);
      return branchName.match(regex);
    });
  }

  validateRegex(branchName) {
    const { regularExpressions } = this.options;

    if (regularExpressions.length === 0) {
      return true;
    }

    return _.some(regularExpressions, regularExpression => {
      const regex = new RegExp(regularExpression);
      return branchName.match(regex);
    });
  }

  validateSeparator(branchName) {
    const { separator } = this.options;
    if (!separator || separator === '') {
      return true;
    }

    const regex = new RegExp(`^.*${separator}.*`);
    return !_.isNull(branchName.match(regex));
  }

  validateSections(branchName) {
    const { separator, maxSections } = this.options;
    const splited = branchName.split(separator);

    if (!separator || !maxSections) {
      return true;
    }

    if (splited.length > maxSections) {
      return false;
    }

    return true;
  }
}

export default {
  Linter,
};
