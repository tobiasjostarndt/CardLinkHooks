#!/usr/bin/env node

var fs = require('fs');
var path = require('path');

module.exports = function (context) {
  console.log('\n[CARDLINK] - Installation start');

  const log = '\t';
  var rootdir = context.opts.projectRoot;
  var project = path.join(rootdir, 'platforms/android');

  try {
    fs.accessSync(rootdir, fs.F_OK);

  } catch (e) {
    console.error(log + e);
    return;
  }

  let cnt = "/* Licensed to the Apache Software Foundation (ASF) under one\n" + 
  " or more contributor license agreements.  See the NOTICE file\n" + 
  " distributed with this work for additional information\n" + 
  " regarding copyright ownership.  The ASF licenses this file\n" + 
  " to you under the Apache License, Version 2.0 (the\n" + 
  " \"License\"); you may not use this file except in compliance\n" + 
  " with the License.  You may obtain a copy of the License at\n" + 
  "\n" + 
  "   http://www.apache.org/licenses/LICENSE-2.0\n" + 
  "\n" + 
  " Unless required by applicable law or agreed to in writing,\n" + 
  " software distributed under the License is distributed on an\n" + 
  " \"AS IS\" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY\n" + 
  " KIND, either express or implied.  See the License for the\n" + 
  " specific language governing permissions and limitations\n" + 
  " under the License.*/\n" + 
  "\n" + 
  " ext.repos = {\n" + 
  "     google()\n" + 
  "     mavenCentral()\n" + 
  "     maven {\n" +
  "         url uri('../project-repo')\n" +
  "     }\n" +
  "};";

  fs.writeFileSync(path.join(project, 'app/repositories.gradle'), cnt);

  console.log(log + 'Repos added');
  
  console.log('[CARDLINK] - Installation finished\n');
};