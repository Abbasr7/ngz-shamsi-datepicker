const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

function getAngularVersion() {
  try {
    const packageJsonPath = path.join(process.cwd(), 'package.json');
    const packageJson = JSON.parse(fs.readFileSync(packageJsonPath, 'utf8'));
    return packageJson.dependencies['@angular/core'] || packageJson.devDependencies['@angular/core'];
  } catch (error) {
    console.error('Error reading package.json:', error);
    return null;
  }
}

function installCompatibleDependencies(angularVersion) {
  const majorVersion = parseInt(angularVersion.match(/^\D*(\d+)/)[1], 10);
  const dependencies = [
    '@angular/cdk',
    '@angular/core',
    '@angular/common',
    '@angular/forms',
    '@angular/router',
    '@angular/animations'
  ];
  
  dependencies.forEach(dep => {
    try {
      console.log(`Installing ${dep}@${majorVersion}`);
      execSync(`npm install ${dep}@${majorVersion} --save-peer`, { stdio: 'inherit' });
    } catch (error) {
      console.error(`Error installing ${dep}:`, error);
    }
  });
}

const angularVersion = getAngularVersion();
if (angularVersion) {
  installCompatibleDependencies(angularVersion);
} else {
  console.error('Unable to determine Angular version. Please install Angular dependencies manually.');
}