const fs = require('node:fs');
const path = require('node:path');

const packagePath = path.resolve(__dirname, '../package.json');
const package_ = JSON.parse(fs.readFileSync(packagePath, 'utf8'));

const [major, minor, patch] = package_.version.split('.').map(Number);
const newVersion = [major, minor, patch + 1].join('.');
package_.version = newVersion;

fs.writeFileSync(packagePath, `${JSON.stringify(package_, undefined, 2)}\n`);
console.log(`Patch version bumped to ${newVersion}`);
