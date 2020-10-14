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
update-version.js Updates the version in .app-metadata.json

Usage: node update-version.js [--major] [--minor] [--patch]

    --major     Updates the major version
    --minor     Updates the minor version
    --patch     Updates the patch version
    `);
};

const incrementVersion = (type) => {
    const appMetadata = require('../.app-metadata.json');

    switch (type) {
        case "--major":
            appMetadata.version = nextVersion(appMetadata.version, type);
            writeappMetadataJsonFile(appMetadata);
            break;

        case "--minor":
            appMetadata.version = nextVersion(appMetadata.version, type);
            writeappMetadataJsonFile(appMetadata);
            break;

        case "--patch":
            appMetadata.version = nextVersion(appMetadata.version, type);
            writeappMetadataJsonFile(appMetadata);
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

const writeappMetadataJsonFile = (appMetadataJson) => {
    const fs = require('fs');
    const data = JSON.stringify(appMetadataJson, null, 2);

    fs.writeFile('./.app-metadata.json', data + '\n', (err) => {
        if (err) {
            throw err;
        }

        console.log(`.app-metadata.json update with new version: ${appMetadataJson.version}`);
    });
}

main();