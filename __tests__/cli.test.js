const path = require('path');
const cmd = require('./support/cmd');

const branchLintPath = path.resolve(__basedir, 'bin', 'branchlint');

describe('CLI test', () => {
  test('should show help', async () => {
    const response = await cmd.execute(branchLintPath, ['-h']);
    expect(response).toMatch('help');
  });

  test('should lint branch if no option passed', async () => {
    const response = cmd.executeSync(branchLintPath, []);
    const { status } = response;
    expect(status).toEqual(0);
  });

  test('should lint branch if config option passed', async () => {
    const response = cmd.executeSync(branchLintPath, [
      '-c',
      `${__basedir}/__tests__/fixtures/.branchlintrc.allowed.json`,
    ]);
    const { status } = response;
    expect(status).toEqual(0);
  });
});

describe('CLI Test requires checkout', () => {
  const beforeBranch = cmd
    .executeExternal('git', ['rev-parse', '--abbrev-ref', 'HEAD'])
    .stdout.trim();

  beforeEach(async () => {
    cmd.executeExternal('git', ['stash']);
  });

  afterEach(() => {
    cmd.executeExternal('git', ['checkout', beforeBranch]);
    cmd.executeExternal('git', ['stash', 'pop']);
  });

  test('should lint branch if prefix option passed by config file', () => {
    cmd.executeExternal('git', ['checkout', '-B', 'foo/bar']);
    const response = cmd.executeSync(branchLintPath, [
      '-c',
      `${__basedir}/__tests__/fixtures/.branchlintrc.prefix.json`,
    ]);
    const { status } = response;
    expect(status).toEqual(1);
  });

  test('should lint branch if disallowed option passed by config file', () => {
    cmd.executeExternal('git', ['checkout', '-B', 'test/foobaz']);
    const response = cmd.executeSync(branchLintPath, [
      '-c',
      `${__basedir}/__tests__/fixtures/.branchlintrc.disallowed.json`,
    ]);
    const { status } = response;
    expect(status).toEqual(1);
  });

  test('should lint branch if regex option passed by config file', () => {
    cmd.executeExternal('git', ['checkout', '-B', 'test/validregex']);
    const response = cmd.executeSync(branchLintPath, [
      '-c',
      `${__basedir}/__tests__/fixtures/.branchlintrc.regex.json`,
    ]);
    const { status } = response;
    expect(status).toEqual(0);
  });

  test('should lint branch if section option passed by config file', () => {
    cmd.executeExternal('git', ['checkout', '-B', 'test/foo/bar']);
    const response = cmd.executeSync(branchLintPath, [
      '-c',
      `${__basedir}/__tests__/fixtures/.branchlintrc.section.json`,
    ]);
    const { status } = response;
    expect(status).toEqual(1);
  });

  test('should lint branch if section option passed by config file', () => {
    cmd.executeExternal('git', ['checkout', '-B', 'test-foo-bar']);
    const response = cmd.executeSync(branchLintPath, [
      '-c',
      `${__basedir}/__tests__/fixtures/.branchlintrc.separator.json`,
    ]);
    const { status } = response;
    expect(status).toEqual(1);
  });
});
