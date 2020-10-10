const flags = [
    '--major', '--minor', '--patch'
];

const main = () => {
    if (!verifyArgs()) {
        showHelp();
        return;
    }

    incrementVersion(process.argv.slice(2)[0]);
};

const verifyArgs = () => {
    const flags = process.argv.slice(2);
    if (flags.length !== 1) {
        return false;
    }

    return true;
};

const showHelp = () => {
    console.log(`
update-version.js Updates the version in package.json

Usage: node update-version.js [--major] [--minor] [--patch]

    --major     Updates the major version
    --minor     Updates the minor version
    --patch     Updates the patch version
    `);
};

const incrementVersion = (type) => {
    const package = require('../package.json');

    switch (type) {
        case "--major":
            package.version = nextVersion(package.version, type);
            writePackageJsonFile(package);
            break;

        case "--minor":
            package.version = nextVersion(package.version, type);
            writePackageJsonFile(package);
            break;

        case "--patch":
            package.version = nextVersion(package.version, type);
            writePackageJsonFile(package);
            break;

        default:
            console.log(`error: unsupported type found: ${type}`);
            showHelp();
            break;
    }
};

const nextVersion = (currentVersion, type) => {
    [ major, minor, patch ] = currentVersion.split('.');

    switch (type) {
        case "--major":
            major++;
            minor = 0;
            patch = 0;
            break;

        case "--minor":
            minor++;
            patch = 0;
            break;

        case "--patch":
            patch++;
            break;

        default:
            console.log(`error: unknown type provided: ${type}`)
            break;
    }

    return `${major}.${minor}.${patch}`;
}

const writePackageJsonFile = (packageJson) => {
    const fs = require('fs');
    const data = JSON.stringify(packageJson, null, 2);

    fs.writeFile('./package.json', data + '\n', (err) => {
        if (err) {
            throw err;
        }

        console.log(`package.json update with new version: ${packageJson.version}`);
    });
}

main();