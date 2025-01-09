#!/usr/bin/env node

var fs = require('fs');
var path = require('path');

module.exports = function (context) {
  console.log('\n[CARDLINK] - Installation start');

  const log = '\t';
  var rootdir = context.opts.projectRoot;
  var project = path.join(rootdir, 'platforms/ios');

  try {
    fs.accessSync(rootdir, fs.F_OK);

  } catch (e) {
    console.error(log + e);
    return;
  }

  let appName = "appdinx"; 

  var cnt = fs.readFileSync(path.join(project, appName + '.xcodeproj/project.pbxproj'), 'utf8');

  if (cnt.indexOf('NFCCardReaderProvider') > -1) {
    console.log(log + 'Source files and Frameworks already installed. [Skip]');
  } else {

    // Get Project Object ID
    var projId = cnt.match(/rootObject = (.+?)(?:| \/\* Project object \*\/);/);
    if (!!!projId) {
      console.error(log + 'Can\'t get Project object from project.pbxproj');
      process.exit(1);
    }
    projId = projId[1];

    // Append PBXBuildFile section
    console.log(log + 'Append PBXBuildFile section');
    cnt = cnt.replace('/* End PBXBuildFile section */',
      '\t\t2EC94A2C2D15A56D006E69B7 /* GemCommonsKit in Frameworks */ = {isa = PBXBuildFile; productRef = 2EC94A2B2D15A56D006E69B7 /* GemCommonsKit */; };\n' +
      '\t\t2EC94A2E2D15A56D006E69B7 /* ObjCCommonsKit in Frameworks */ = {isa = PBXBuildFile; productRef = 2EC94A2D2D15A56D006E69B7 /* ObjCCommonsKit */; };\n' +
      '\t\t2EC94A302D15A56D006E69B7 /* CardReaderProviderApi in Frameworks */ = {isa = PBXBuildFile; productRef = 2EC94A2F2D15A56D006E69B7 /* CardReaderProviderApi */; };\n' +
      '\t\t2EC94A322D15A56D006E69B7 /* NFCCardReaderProvider in Frameworks */ = {isa = PBXBuildFile; productRef = 2EC94A312D15A56D006E69B7 /* NFCCardReaderProvider */; };\n' +
      "/* End PBXBuildFile section */");

    // Append PBXFrameworksBuildPhase section ???
    console.log(log + 'Append PBXFrameworksBuildPhase section');
    cnt = cnt.replace('1D60588F0D05DD3D006BFB54 /* Frameworks */ = {\n\t\t\tisa = PBXFrameworksBuildPhase;\n\t\t\tbuildActionMask = 2147483647;\n\t\t\tfiles = (',
    '1D60588F0D05DD3D006BFB54 /* Frameworks */ = {\n\t\t\tisa = PBXFrameworksBuildPhase;\n\t\t\tbuildActionMask = 2147483647;\n\t\t\tfiles = (' +
    '\t\t\t\t2EC94A2C2D15A56D006E69B7 /* GemCommonsKit in Frameworks */,\n' +
    '\t\t\t\t2EC94A322D15A56D006E69B7 /* NFCCardReaderProvider in Frameworks */, \n' +
    '\t\t\t\t2EC94A2E2D15A56D006E69B7 /* ObjCCommonsKit in Frameworks */,\n' +
    '\t\t\t\t2EC94A302D15A56D006E69B7 /* CardReaderProviderApi in Frameworks */,\n');

    // Append PBXFrameworksBuildPhase section ???
    if (cnt.indexOf('XCSwiftPackageProductDependency') > -1) {
        console.log(log + 'Append XCSwiftPackageProductDependency section');
        cnt = cnt.replace('/* End XCSwiftPackageProductDependency section */',
        '\t\t\t\t2EC94A2B2D15A56D006E69B7 /* GemCommonsKit */ = {isa = XCSwiftPackageProductDependency;productName = GemCommonsKit;}; \n' +
        '\t\t\t\t2EC94A2D2D15A56D006E69B7 /* ObjCCommonsKit */ = {isa = XCSwiftPackageProductDependency;productName = ObjCCommonsKit;};\n' +
        '\t\t\t\t2EC94A2F2D15A56D006E69B7 /* CardReaderProviderApi */ = {isa = XCSwiftPackageProductDependency;productName = CardReaderProviderApi;};\n' +
        '\t\t\t\t2EC94A312D15A56D006E69B7 /* NFCCardReaderProvider */ = {isa = XCSwiftPackageProductDependency;productName = NFCCardReaderProvider;};\n' +
        '/* End PBXFrameworksBuildPhase section */');
    }else{
        console.log(log + 'Add XCSwiftPackageProductDependency section');
        cnt = cnt.replace('/* End XCConfigurationList section */',
        '/* End XCConfigurationList section */\n\n'+
        '/* Begin XCSwiftPackageProductDependency section */\n'+
        '\t\t\t\t2EC94A2B2D15A56D006E69B7 /* GemCommonsKit */ = {isa = XCSwiftPackageProductDependency;productName = GemCommonsKit;}; \n' +
        '\t\t\t\t2EC94A2D2D15A56D006E69B7 /* ObjCCommonsKit */ = {isa = XCSwiftPackageProductDependency;productName = ObjCCommonsKit;};\n' +
        '\t\t\t\t2EC94A2F2D15A56D006E69B7 /* CardReaderProviderApi */ = {isa = XCSwiftPackageProductDependency;productName = CardReaderProviderApi;};\n' +
        '\t\t\t\t2EC94A312D15A56D006E69B7 /* NFCCardReaderProvider */ = {isa = XCSwiftPackageProductDependency;productName = NFCCardReaderProvider;};\n' +
        '/* End PBXFrameworksBuildPhase section */');
    }

    fs.writeFileSync(path.join(project, appName + '.xcodeproj/project.pbxproj'), cnt);

    console.log(log + 'Source files and Frameworks installed');
  }

  console.log('[CARDLINK] - Installation finished\n');
};