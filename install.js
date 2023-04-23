#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const chalk = require('chalk'); // console.log 的 颜色

let version = require(path.join(__dirname, 'package.json')).version; // 库文件
const infolog = (msg) => {
  console.log(chalk.grey(`frontengineerplugin  ${version} - ${msg}`));
};
const successlog = (msg) => {
  console.log(chalk.green(`frontengineerplugin ${version} - ${msg}`));
};

function installInit() {
  // 拿到两层以上的，不然不行。 pnpm 有问题，这个要三层
  console.log(path.resolve(process.cwd()),__dirname)
  const packageJsonStr = fs
    .readFileSync(path.resolve(process.cwd(),"..","..",'package.json')) // 工程文件
    .toString();
  
    // console.log(packageJsonStr)
  try {
    const packageJson = JSON.parse(packageJsonStr);
    if(!packageJson.scripts){
      packageJson.scripts = {}
    }
    if (packageJson.scripts['engineer']) {
      infolog('package.json中 engineer字段 重复,替换字段');
    } else {
      packageJson.scripts['engineer'] = 'frontengineerplugin gui';
    }

    fs.writeFileSync(path.resolve(process.cwd(),"..","..", 'package.json'),JSON.stringify(packageJson, null, '\t'),);
  } catch (e) {
    console.error('frontEngineerPlugin安装失败，请重试', e.message);
    process.exit(1);
  }
  
  successlog('安装成功,请运行npm run engineer');
}

installInit();
// exports.installInit = installInit;