#!/usr/bin/env node
/**
 * 在当前目录下创建一个文件夹, 其中包含 react 组件的 jsx, 对应的 scss 和子文件夹
 */

const fs = require("fs");

const { exec, readLineSync, kebabCase } = require("./_utils");
const { tsxTemplate, scssTemplate, hooksTemplate } = require("./_template");

(async function () {
  const compName = await readLineSync(
    `Enter component name(e.g: PostDetail): `
  );
  const kebabName = kebabCase(compName);

  // 创建组件文件夹
  fs.mkdirSync(compName);

  // 创建 index.tsx
  fs.writeFileSync(
    compName + "/index.tsx",
    tsxTemplate
      .replace(/\{COMP_NAME\}/g, compName)
      .replace(/\{KEBAB_NAME\}/g, kebabName)
  );

  // 创建 index.scss
  fs.writeFileSync(
    compName + "/index.scss",
    scssTemplate
      .replace(/\{COMP_NAME\}/g, compName)
      .replace(/\{KEBAB_NAME\}/g, kebabName)
  );

  // 创建 子文件夹
  fs.mkdirSync(compName + "/components");
  fs.mkdirSync(compName + "/hooks");

  console.log("\n\n# # # # # # # # # # # #");
  console.log("#       ALL DONE      #");
  console.log("# # # # # # # # # # # #");
})();
