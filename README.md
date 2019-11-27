[![npm version](https://badge.fury.io/js/branchlint.svg)](https://badge.fury.io/js/branchlint) [![Actions Status](https://github.com/shufo/branchlint/workflows/Build%20and%20Test/badge.svg)](https://github.com/shufo/branchlint/actions)

# branchlint

A git branch linter to enforce branch naming convention

## Installation

npm

```
npm install --save-dev branchlint
```

yarn

```
yarn add -D branchlint
```

Add `.branchlintrc` or `.branchlintrc.json` like

```json
{
  "allowed": ["master"],
  "disallowed": ["develop", "staging"],
  "prefixes": ["feature", "fix", "hotfix", "release"],
  "separator": "/",
  "maxSections": 2
}
```

You can customize conventions by override options. The default parameters are

```json
{
  "allowed": [],
  "disallowed": [],
  "prefixes": [],
  "regularExpressions": [],
  "separator": "",
  "maxSections": null,
  "msgPrefixNotAllowed": "Branch name \"%s\" is not allowed.\nAllowed branch name prefix is %s and separator is \"%s\"",
  "msgBranchDisallowed": "Pushing to \"%s\" is not allowed, use GitHub Flow.",
  "msgRegexNotMatched": "Pushing to \"%s\" is not allowed, Allowed regex pattern is \"%s\"",
  "msgSeperatorRequired": "Branch \"%s\" must contain a seperator \"%s\".",
  "msgSectionsOver": "Branch name \"%s\" is not allowed\nAllowed max section length is %s"
}
```

## husky integration

You can use [husky](https://github.com/typicode/husky) a git hook library to check naming convention before push

```bash
# npm
npm install --save-dev husky
# yarn
yarn add -D husky
```

Add husky configuration to `package.json` or `.huskyrc` to check branch name.

```json
~
"husky": {
  "hooks": {
      "pre-push": "branchlint"
  }
},
```

### Example Conventions

#### GitHub Flow convention

```json
{
  "allowed": ["master"],
  "disallowed": ["develop", "staging"],
  "prefixes": ["feature", "fix", "hotfix", "release"],
  "separator": "/",
  "maxSections": 2
}
```

#### Git Flow convention

```json
{
  "allowed": ["master", "develop"],
  "disallowed": [],
  "prefixes": ["feature", "fix", "hotfix", "release"],
  "separator": "/",
  "maxSections": 2,
  "msgBranchDisallowed": "Pushing to \"%s\" is not allowed, use git-flow."
}
```

## Usage

### Options

|           option |                                                                                        description |
| ---------------: | -------------------------------------------------------------------------------------------------: |
| `-c`, `--config` | A config file path. Default is `.branchlintrc` or `.brachlintrc.json` in current working directory |

### Configurations

|                config |                                                         description |
| --------------------: | :------------------------------------------------------------------ |
|             `allowed` |                              An allowed branch names. default: `[]` |
|          `disallowed` |                            A disallowed branch names. default: `[]` |
|            `prefixes` |                      A required branch name prefixes. default: `[]` |
|  `regularExpressions` |                        A regular expressions used for validation. default: `[]` |
|           `separator` |                 A separator required for branch name. default: `""` |
|         `maxSections` |    Max sections separated by `separator` parameter. default: `null` |
| `msgPrefixNotAllowed` | The error message when branch name not listed in `prefixes` is used |
| `msgBranchDisallowed` |               The error message when disallowed branch name is used |
|                    `msgRegexNotMatched` |The error message when listed regular expressions in `regularExpressions`|
|`msgSeperatorRequired`|The error message when required separator is not found|
|`msgSectionsOver`|The error message when section count is bigger than `maxSections`|


## Test

Run

```
yarn test
```

## Contributing

1.  Fork it
2.  Create your feature branch (`git checkout -b my-new-feature`)
3.  Commit your changes (`git commit -am 'Add some feature'`)
4.  Push to the branch (`git push origin my-new-feature`)
5.  Create new Pull Request


## LICENSE

MIT
