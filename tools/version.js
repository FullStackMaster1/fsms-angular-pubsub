const standardVersion = require("standard-version");

// Options are the same as command line, except camelCase
// standardVersion returns a Promise
standardVersion({
  noVerify: true,
  infile: "CHANGELOG.md",
  silent: false,
  skip: {
    commit: true,
    tag: true,
  },
})
  .then((x) => {
    // standard-version is done
    console.log(require("../package.json").version);
  })
  .catch((err) => {
    console.error(`standard-version failed with message: ${err.message}`);
  });
