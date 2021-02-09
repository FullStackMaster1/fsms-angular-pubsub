const tracker = [
  {
    filename: "src/package.json",
    updater: require("standard-version-updater"),
  },
  {
    filename: "package.json",
    updater: require("standard-version-updater"),
  },
];

module.exports = {
  bumpFiles: tracker,
  packageFiles: tracker,
};
