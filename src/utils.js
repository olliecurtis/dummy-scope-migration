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

const { execSync } = require('child_process');

const isTokens = (packageName, env) => {
  const matchTokens = packageName.match(/^bpk-tokens+$/);
  if (!matchTokens) {
    return packageName;
  }

  let complete = false;
  switch (env) {
    case 'prod':
      execSync('npm i --save @skyscanner/bpk-web');
      execSync('npm uninstall bpk-tokens');
      complete = true;
      break;
    case 'dev':
      execSync('npm i --save-dev @skyscanner/bpk-web');
      execSync('npm uninstall bpk-tokens');
      complete = true;
      break;
    case 'peer':
      execSync('npm i --save-peer @skyscanner/bpk-web');
      execSync('npm uninstall bpk-tokens');
      complete = true;
      break;
    default:
      break;
  }
  return complete;
};

const isSvgs = (packageName, env) => {
  const matchTokens = packageName.match(/^bpk-svgs+$/);
  if (!matchTokens) {
    return packageName;
  }

  let complete = false;
  switch (env) {
    case 'prod':
      execSync('npm i --save @skyscanner/bpk-svgs');
      execSync('npm uninstall bpk-svgs');
      complete = true;
      break;
    case 'dev':
      execSync('npm i --save-dev @skyscanner/bpk-svgs');
      execSync('npm uninstall bpk-svgs');
      complete = true;
      break;
    case 'peer':
      execSync('npm i --save-peer @skyscanner/bpk-svgs');
      execSync('npm uninstall bpk-svgs');
      complete = true;
      break;
    default:
      break;
  }
  return complete;
};

const replaceOccurrences = (dependencies, env) => {
  Object.keys(dependencies).forEach((packageName) => {
    isTokens(packageName, env);
    isSvgs(packageName, env);
  });
};

module.exports = replaceOccurrences;
