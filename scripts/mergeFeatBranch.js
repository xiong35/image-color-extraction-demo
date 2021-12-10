#!/usr/bin/env node
/**
 * 将一个feat 分支合并到 dev 并删除此分支\
 * 执行前请确保当前工作区无 修改或暂存 的文件
 */

const { exec, readLineSync } = require("./_utils");

(async function () {
  const ans = await readLineSync(
    `Before merging, have you committed all changes to feat branch? [Y/n]`
  );
  if (ans !== "Y" && ans !== "y") return;

  const name = await readLineSync(`Enter name of branch to be merged to DEV: `);

  console.log("\n### switch to DEV ###\n");
  await exec("git switch dev");

  console.log(`\n### merge ${name} to DEV ###\n`);
  await exec(`git merge ${name} --no-ff`);

  console.log(`\n### delete branch: ${name} ###\n`);
  await exec(`git branch -D ${name}`);

  console.log("\n\n# # # # # # # # # # # #");
  console.log("#       ALL DONE      #");
  console.log("# # # # # # # # # # # #");
})();
