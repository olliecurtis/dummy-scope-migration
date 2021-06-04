#!/usr/bin/env node

/*
 *
 * Copyright 2020 Skyscanner Ltd
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

/* eslint-disable no-console */
const fs = require('fs');

const colors = require('colors');

const replaceOccurrences = require('./src/utils');

const updatePackage = (file) =>
  new Promise((resolve, reject) => {
    fs.readFile(file, 'utf8', (readError, data) => {
      if (readError) {
        reject(readError);
      }
      let fileContents;
      try {
        fileContents = JSON.parse(data);
      } catch (parseError) {
        reject(parseError);
      }

      if (fileContents.dependencies) {
        fileContents.dependencies = replaceOccurrences(
          fileContents.dependencies,
          'prod',
        );
      }
      if (fileContents.devDependencies) {
        fileContents.devDependencies = replaceOccurrences(
          fileContents.devDependencies,
          'dev',
        );
      }
      if (fileContents.peerDependencies) {
        fileContents.peerDependencies = replaceOccurrences(
          fileContents.peerDependencies,
          'peer',
        );
      }
    });
  });

console.log(colors.blue('🎒 Upgrading packages..'));

updatePackage('package.json')
  .then(() => {
    console.log(colors.green(`All done. 😎`));
  })
  .catch((error) => {
    console.error(colors.red(`Something went wrong 😱`));
    console.error(error);
  });
