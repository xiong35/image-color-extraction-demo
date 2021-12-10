"use strict";
module.exports = {
  types: [
    { value: "feat", name: "✨特性:    一个新的特性" },
    { value: "fix", name: "🐛修复:    修复一个Bug" },
    { value: "docs", name: "📝文档:    变更的只有文档" },
    { value: "style", name: "💄风格:    空格, 分号等格式修复" },
    { value: "refactor", name: "♻️重构:    代码重构，注意和特性、修复区分开" },
    { value: "perf", name: "⚡️性能:    提升性能" },
    { value: "test", name: "✅测试:    添加一个测试" },
    { value: "build", name: "🔧工具:    开发工具变动(构建、脚手架工具等)" },
    { value: "revert", name: "⏪回滚:    代码回退" },
    { value: "chore", name: "🧹杂务:    不改变 src 文件夹下项目的变更" },
  ],
  scopes: [
    { name: "page" },
    { name: "component" },
    { name: "hook" },
    { name: "model" },
    { name: "network" },
    { name: "utils" },
    { name: "style" },
    { name: "other" },
  ],
  messages: {
    type: "选择一种你的提交类型:",
    scope: "选择一个作用范围 (可选):",
    // used if allowCustomScopes is true
    customScope: "说明更改的作用范围:",
    subject: "简短说明:",
    body: '长说明，使用"|"换行(可选)',
    breaking: "非兼容性说明 (可选):",
    footer: "关联关闭的issue，例如：#31, #34(可选):",
    confirmCommit: "确定提交说明?",
  },
  allowBreakingChanges: ["特性", "修复"],
  subjectLimit: 100,
};
