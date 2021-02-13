/**
 * . bump the npm version using build id
 * . publish to npm package repository
 * . return new npm version
 */
const fs = require('fs');
const path = require('path');

var libPackageJson =path.resolve(__dirname, '../', `dist/fsms-angular-pubsub/package.json`);
const buildId = process.argv[2],

if (!buildId) {
  throw new Error('Build buildId is required');
}

const newVersion = createNewPackageVersion();

updateVersion(
  libPackageJson,
  newVersion
);

console.log(newVersion);

function createNewPackageVersion() {
  return require('../package.json').version
    .split('.')
    .map((x, i) => (i == 2 ? buildId : x))
    .join('.');
}

function updateVersion(packageJsonFilePath,newVersion) {
  var package = require(packageJsonFilePath);
  package.version = newVersion;
  fs.writeFileSync(packageJsonFilePath, JSON.stringify(package, null, 2));
}
