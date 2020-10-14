const updateVersionInPackageJson = () => {

    const currentVersion = require('./get-version');
    const package = require('../package.json');
    package.version = currentVersion;

    const fs = require('fs');
    const data = JSON.stringify(package, null, 2) + '\n';
    fs.writeFileSync('./package.json', data);
    console.log(`package.json successfully updated with version: ${package.version}`);
}

updateVersionInPackageJson();
