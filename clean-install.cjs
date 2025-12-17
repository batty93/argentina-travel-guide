const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

const rootDir = __dirname;
const subDir = path.join(rootDir, 'argentina-travel-guide-main');

const pathsToClean = [
    path.join(rootDir, 'node_modules'),
    path.join(rootDir, 'package-lock.json'),
    path.join(subDir, 'node_modules'),
    path.join(subDir, 'package-lock.json'),
];

console.log('Cleaning up project artifacts to fix npm errors...');
pathsToClean.forEach(p => {
    if (fs.existsSync(p)) {
        console.log(`Removing ${p}`);
        fs.rmSync(p, { recursive: true, force: true });
    }
});

console.log('Installing dependencies (this may take a minute)...');
try {
    execSync('npm install', { stdio: 'inherit', cwd: rootDir });
    execSync('npm install --legacy-peer-deps', { stdio: 'inherit', cwd: subDir });
    console.log('✅ Setup complete! You can now run "npm run dev:all"');
} catch (e) {
    console.error('❌ Error during installation:', e.message);
    process.exit(1);
}