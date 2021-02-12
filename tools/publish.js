const execSync = require('child_process').execSync;
const app =  process.argv[2],

try {
  const cwd = path.resolve(__dirname, '../', `dist/apps/${app}`);
  execSync(`npm publish --access public`, { cwd, stdio: [0, 1, 2] });
} catch (error) {
  console.log(error);
  process.exit(1);
}
