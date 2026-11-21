// Copies src/ into dist/ so the folder can be zipped and uploaded to itch.io.
// index.html must sit at the root of dist/.
const fs = require('fs');
const path = require('path');
const src = path.join(__dirname, '..', 'src');
const dist = path.join(__dirname, '..', 'dist');
fs.rmSync(dist, { recursive: true, force: true });
fs.cpSync(src, dist, { recursive: true });
if (!fs.existsSync(path.join(dist, 'index.html'))) throw new Error('dist/index.html missing');
console.log('Built to dist/:', fs.readdirSync(dist).join(', '));
