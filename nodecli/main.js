/*
# processオブジェクト

- Node.js実行環境のグローバル変数のひとつ
- processオブジェクトが提供するのは、現在のNode.jsの実行プロセスについて、情報の取得と操作をするAPI
https://nodejs.org/dist/latest-v12.x/docs/api/process.html#process_process
 */

// console.log(process.argv);
/*
  [bunta.fujikawa]$ node main.js one two=three four                          (git)-[master]
[
  '/Users/bunta.fujikawa/.nvm/versions/node/v12.14.0/bin/node',
  '/Users/bunta.fujikawa/workspace/jsprimer/nodecli/main.js',
  'one',
  'two=three',
  'four'
]
 */

const program = require("commander");
const fs = require("fs");
const marked = require("marked");

// gfmオプションを定義
program.option("--gfm", "GFMを有効にする");
program.parse(process.argv);
const options = program.opts();
console.log(options.gfm);

const filePath = program.args[0];

// デフォルトをアプリケーションで定義する
const cliOptions = {
  gfm: false,
  ...program.opts(),
};

// console.log(filePath); // ./sample.md

// コールバック関数の第2引数にはファイルの中身を表すBufferインスタンスのため、ファイルをUTF-8と指定する
fs.readFile(filePath, { encoding: "utf8" }, (err, file) => {
  if (err) {
    console.error(err.message);
    process.exit(1);
    return;
  }
  const html = marked(file, {
    gfm: cliOptions.gfm,
  });
  console.log(html);
});
