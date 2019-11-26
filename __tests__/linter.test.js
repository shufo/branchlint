import { Linter } from '../src/linter';
import { Config } from '../src/config';

// eslint-disable-next-line max-lines-per-function
describe('Linter', () => {
  test('should lint invalid branch name', () => {
    const config = new Config({ disallowed: ['invalidName', 'badName'] });
    const linter = new Linter(config);

    expect(linter.lint('invalidName')).toEqual(false);
    expect(linter.lint('badName')).toEqual(false);
  });

  test('valid branch name returns true ', () => {
    const config = new Config({ allowed: ['master'] });
    const linter = new Linter(config);

    expect(linter.lint('master')).toEqual(true);
  });

  test('check prefixes', () => {
    const config = new Config({ prefixes: ['feature'] });
    const linter = new Linter(config);

    expect(linter.lint('feature/foo')).toEqual(true);
    expect(linter.lint('fix/bar')).toEqual(false);
  });

  test('check if branch name satisfied regular expressions', () => {
    const config = new Config({
      regularExpressions: ['^valid-.*'],
    });
    const linter = new Linter(config);

    expect(linter.lint('valid-name')).toEqual(true);
    expect(linter.lint('valid_name?')).toEqual(false);
  });

  test('check if branch name includes separator', () => {
    const config = new Config({
      separator: ['/'],
    });
    const linter = new Linter(config);

    expect(linter.lint('foo/bar')).toEqual(true);
    expect(linter.lint('foo_bar')).toEqual(false);
  });

  test('check if branch name satisfied max sections parameter', () => {
    const config = new Config({
      maxSections: 2,
      separator: '/',
    });
    const linter = new Linter(config);

    expect(linter.lint('foo/bar')).toEqual(true);
    expect(linter.lint('foo/bar/baz')).toEqual(false);
  });
});
