const fs = require('fs');
const path = require('path');
var xml2js = require('xml2js');

var parser = new xml2js.Parser();

module.exports = function (ctx) {
    var rootdir = ctx.opts.projectRoot;
    var project = path.join(rootdir, 'platforms/ios');

    let config_xml = path.join(rootdir, 'config.xml');
    let configAsString = fs.readFileSync(config_xml).toString();

    let bundleId;
    let appName;
    let teamId = "8JX63PMAQE";
    parser.parseString(configAsString, function (err, data) {
        bundleId = data.widget.$.id;
        appName = "appdinx";       //data.widget.name[0];
        console.log("Identified BUNDLE_IDENTIFIER: ", bundleId);
        console.log("Using fixed APP_NAME: ", appName);
        console.log("Using fixed TEAM_ID: ", teamId);
    });

    ['Entitlements-Release.plist', 'Entitlements-Debug.plist'].forEach((target) => {
        var cnt = fs.readFileSync(path.join(project, appName, target), 'utf8');

        if (!cnt.includes('com.apple.developer.nfc.readersession.formats')) {
            const capabilityEntry = `
                <key>com.apple.developer.nfc.readersession.formats</key>
                <array>
                    <string>TAG</string>
                </array>`;

            cnt = cnt.replace('</dict>', `${capabilityEntry}\n</dict>`);

            fs.writeFileSync(path.join(project, appName, target), cnt);

            console.log('NFC capabilities erfolgreich hinzugefügt.');
        }
    });
};
