const fs = require('node:fs');
const path = require('node:path');

const pkgPath = path.resolve(__dirname, '../package.json');
const pkg = JSON.parse(fs.readFileSync(pkgPath, 'utf8'));

const [major, minor, patch] = pkg.version.split('.').map(Number);
const newVersion = [major, minor, patch + 1].join('.');
pkg.version = newVersion;

fs.writeFileSync(pkgPath, `${JSON.stringify(pkg, null, 2)}\n`);
console.log(`Patch version bumped to ${newVersion}`);
