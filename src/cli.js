import yargs from 'yargs';
import { Config } from './config';
import { Linter } from './linter';

const gitBranchIs = require('git-branch-is');

export default async function cli() {
  const argv = await yargs
    .usage('Usage: $0')
    .example('$0', 'Lint current branch')
    .help('h')
    .alias('h', 'help')
    .option('config', {
      alias: 'c',
      type: 'string',
      description: 'Config file path',
      default: null,
    })
    .epilog('Copyright Shuhei Hayashibara 2019').argv;
  const config = new Config({ config: argv.config });

  gitBranchIs.getBranch().then(branchName => {
    const linter = new Linter(config);
    linter.lint(branchName);
  });
}
