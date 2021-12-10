const child_process = require("child_process");

/**
 * 执行一段命令行脚本
 * @param {string} command 要执行的 bash 指令
 */
async function exec(command) {
  return new Promise((resolve, reject) => {
    child_process.exec(command, (err, stdout, stderr) => {
      console.log(stdout);
      if (stderr || err) console.log(err, stderr);
      resolve();
    });
  });
}

/**
 * 打印提示语并从控制台读取一行输入
 * @param {string} hint 展示的提示语
 * @returns 输入的值
 */
async function readLineSync(hint) {
  const readline = require("readline").createInterface({
    input: process.stdin,
    output: process.stdout,
  });
  return new Promise((resolve, reject) => {
    readline.question(hint, (res) => {
      resolve(res);
      readline.close();
    });
  });
}

/**
 * "PostCard" => "post_card"
 * @param {string}} 待转化的字符串
 * @returns 转化后的结果
 */
const kebabCase = (string) =>
  string
    .replace(/([a-z])([A-Z])/g, "$1_$2")
    .replace(/\s+/g, "_")
    .toLowerCase();

module.exports = { exec, readLineSync, kebabCase };
