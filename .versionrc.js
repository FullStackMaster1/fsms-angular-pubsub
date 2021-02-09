const tracker = [
  {
    filename: "src/package.json",
    updater: require("standard-version"),
  },
  {
    filename: "package.json",
    updater: require("standard-version"),
  },
];

module.exports = {
  bumpFiles: tracker,
  packageFiles: tracker,
};
