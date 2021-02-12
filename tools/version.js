const standardVersion = require("standard-version");
const buildId = process.argv[2];
const sourceBranchName = process.argv[3];
// Options are the same as command line, except camelCase
// standardVersion returns a Promise
await standardVersion({
  noVerify: true,
  infile: "CHANGELOG.md",
  silent: true,
  skip: {
    commit: true,
    tag: true,
  },
});

// standard-version is done
console.log(
  require("../package.json").version + buildId + "-" + sourceBranchName
);
