// Code taken from https://github.com/resin-io-modules/drivelist

import childProcess from 'child_process';
import lodash from 'lodash';
import yaml from 'js-yaml';
import os from 'os';
import path from 'path';

/**
 * @summary Absolute path to platform scripts
 * @constant
 * @private
 * @type {String}
 */
const SCRIPTS_PATH = 'scripts';

/**
 * @summary Script paths
 * @namespace paths
 * @public
 */
const paths = {

  /**
   * @property {String} win32
   * @memberof paths
   *
   * @description
   * Windows drivelist script path
   */
  win32: path.join(SCRIPTS_PATH, 'win32.bat'),

  /**
   * @property {String} darwin
   * @memberof paths
   *
   * @description
   * macOS drivelist script path
   */
  darwin: path.join(SCRIPTS_PATH, 'darwin.sh'),

  /**
   * @property {String} linux
   * @memberof paths
   *
   * @description
   * GNU/Linux drivelist script path
   */
  linux: path.join(SCRIPTS_PATH, 'linux.sh')

};

/**
 * @summary List available drives
 * @function
 * @public
 *
 * @param {Function} callback - callback (error, drives)
 *
 * @example
 * const drivelist = require('drivelist');
 *
 * drivelist.listAvailableDrives((error, drives) => {
 *   if (error) {
 *     throw error;
 *   }
 *
 *   drives.forEach((drive) => {
 *     console.log(drive);
 *   });
 * });
 */
export function listAvailableDrives(callback) {
  const operatingSystem = os.platform();
  const script = paths[operatingSystem];

  if (!script) {
    callback(new Error(`Your OS is not supported by this module: ${operatingSystem}`));
    return;
  }

  return run(script, (error, output) => {
    if (error) {
      return callback(error);
    }

    return callback(null, parse(output));
  });
}

/**
 * @summary Run a platform script
 * @function
 * @public
 *
 * @param {String} script - path to script
 * @param {Function} callback - callback (error, output)
 *
 * @example
 * scripts.run(scripts.paths.win32, (error, output) => {
 *   if (error) {
 *     throw error;
 *   }
 *
 *   console.log(output);
 * });
 */
function run(script, callback) {
  childProcess.execFile(script, (error, stdout, stderr) => {
    if (error) {
      return callback(error);
    }

    if (stderr.trim().length) {
      return callback(new Error(stderr));
    }

    return callback(null, stdout);
  });
}

/**
 * @summary Parse drivelist scripts output
 * @function
 * @public
 *
 * @param {String} input - input text
 * @returns {Object} parsed drivelist script output
 *
 * @example
 * const drives = parse([
 *   'device: /dev/disk1',
 *   'description: Macintosh HD',
 *   'size: 249.8 GB',
 *   'mountpoint: /',
 *   '',
 *   'device: /dev/disk2',
 *   'description: elementary OS',
 *   'size: 15.7 GB',
 *   'mountpoint: /Volumes/Elementary'
 * ].join('\n'));
 *
 * console.log(drives);
 *
 * > [
 * >   {
 * >     device: '/dev/disk1',
 * >     description: 'Macintosh HD',
 * >     size: '249.8 GB',
 * >     mountpoint: '/'
 * >   }
 * >  ,
 * >   {
 * >     device: '/dev/disk2',
 * >     description: 'elementary OS',
 * >     size: '15.7 GB',
 * >     mountpoint: '/Volumes/Elementary'
 * >   }
 * > ]
 */

function parse(input) {
  if (lodash.isEmpty(lodash.trim(input))) {
    return [];
  }

  return lodash.compact(lodash.map(input.split(/\n\s*\n/), (device) => {

    device = lodash.chain(device)
        .split('\n')
        .filter((line) => {
          return /^(\s\s-\s)?[a-z]+:/g.test(line);
        })
        .map((line) => {
          return line.replace(/"/g, (match, index, string) => {
            if (lodash.some([
                  string.indexOf('"') === index,
                  string.lastIndexOf('"') === index
                ])) {
              return match;
            }

            return '\\"';
          });
        })
        .join('\n')
        .value();

    const result = yaml.safeLoad(device);

    if (lodash.isString(result)) {
      return lodash.object([ result ], [ null ]);
    }

    if (!result || !result.device) {
      return;
    }

    return result;
  }));
}
