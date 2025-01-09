#!/usr/bin/env node

var fs = require('fs');
var path = require('path');
var shell = require('shelljs');

module.exports = function (context) {
  console.log('\n[CardLink Pods');

  const log = '\t';
  var rootdir = context.opts.projectRoot;
  var project = path.join(rootdir, 'platforms/ios');

  try {
    fs.accessSync(rootdir, fs.F_OK);

  } catch (e) {
    console.error(log + e);
    return;
  }

  // Overwrite PodFile
  fs.writeFileSync(path.join(project, 'Podfile'),
  `# auto-generated by Apache Cordova, overwritten by HOOK script
  source 'https://cdn.cocoapods.org/'
  platform :ios, '12.0'
  use_frameworks!

  target 'TARGETNAME' do
      project 'appdinx.xcodeproj'
      pod 'Starscream', '~> 4.0.6'
  end
  `);

  console.log(log + 'Podfile written');

  // we are in "app"
  shell.cd('platforms');
  shell.cd('ios');

  // now we are in "ios"s
  shell.exec('pod install');
  console.log(log + 'Executed pod install');

  console.log('[CardLink pods finished\n');
};