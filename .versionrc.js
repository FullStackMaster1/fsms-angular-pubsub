const tracker = [
  {
    filename: "src/package.json",
    updater: require("standard-version"),
    type: "json"
  },
  {
    filename: "package.json",
    updater: require("standard-version"),
    type: "json"
  },
];

module.exports = {
  bumpFiles: tracker,
  packageFiles: tracker,
};
