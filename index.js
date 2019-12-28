'use strict';

/*
# JavaScriptとは
## ECMAScript
ECMAScriptという仕様では、どの実行環境でも共通な動作のみが定義されているという仕様では、どの実行環境でも共通な動作のみが定義されている
「ECMAScript」はどの実行環境でも共通の部分、「JavaScript」はECMAScriptと実行環境の固有機能も含んだ範囲というのがイメージしやすいでしょう

ECMAScriptは後方互換性を尊重している
→varを変更せずに、let,constが追加されたのはこのため

jsのstrict modeあるとのこと
*/

const hoge = 'hoge', fuga = 'fuga';
console.log(hoge)
console.log(fuga)

// 変更可能、JavaScriptのconstは値を固定するのではなく、変数への再代入を防ぐためのもの
const object = {
  key: 'val'
};

object.key = 'val2';
console.log(object);

// note [ES2015] 変数定義は基本const、変更されるならlet


/*
# データ型とリテラル
静的型付け言語のような変数の型はありません。 しかし、文字列、数値、真偽値といった値の型は存在します。 これらの値の型のことをデータ型とよびます。

## プリミティブ型とオブジェクト
- 6種類のプリミティブ型とオブジェクトがある

- リテラルはデータ型の値を直接記述できる構文として定義されたもので、プリミティブ型の真偽値、数値、文字列、nullはリテラル表現
プリミティブ型のデータでもプロパティアクセス可能、str.lengthみたいな

- オブジェクト（複合型）
一方、プリミティブ型ではないものをオブジェクト（複合型）とよび、 オブジェクトは複数のプリミティブ型の値またはオブジェクトからなる集合です。
オブジェクトは、一度作成した後もその値自体を変更できるためミュータブル（mutable）の特性を持ちます。
オブジェクトは、値そのものではなく値への参照を経由して操作されるため、参照型のデータともいいます。

プリミティブ型以外のデータ
オブジェクト、配列、関数、正規表現、Dateなど
 */

// ドット記法、ブラケット記法どちらも可能
console.log(object.key)
console.log(object['key'])

var object2 = {
  "123": "value"
};

console.log(object2['123'])
// 識別子として利用できないプロパティ名はNG
// console.log(object2.123)

// 配列リテラル→複数の値に順序をつけて格納できるオブジェクトの一種


/*
# 演算子

- 数値は内部的にIEEE 754方式の浮動小数点数として表現されています
そのため、整数と浮動小数点数の加算もプラス演算子で行えます
 */

// 単項演算子
console.log(typeof "1") // string
console.log(typeof +"1") // number
console.log(typeof +"hoge") // NaN Not-a-Number


// 自分自身とも一致しない
console.log(NaN === NaN); // => false
// Number型である
console.log(typeof NaN); // => "number"
// Number.isNaNでNaNかどうかを判定
console.log(Number.isNaN(NaN)); // => true


// マイナスの1という数値を -1 と書くことができるのは、単項マイナス演算子を利用しているからです。
console.log(-1); // => -1
console.log(-(-1)); // => 1


// 暗黙的な型変換

// "01"を数値にすると`1`となる
console.log(1 == "01"); // => true
// 真偽値を数値に変換してから比較
console.log(0 == false); // => true
// nullの比較はfalseを返す
console.log(0 == null); // => false
// nullとundefinedの比較は常にtrueを返す → null または undefined であることを判定したい場合には `==` を使用する
console.log(null == undefined); // => true

// note [ES2015] 否定演算子（~）とindexOfメソッドを使ったイディオムは、includesメソッドに置き換えられます。

// note [ES2015] 分割代入
const array = [1, 2];
const [a, b] = array;
console.log(a); // => 1
console.log(b); // => 2

const obj = {
  "key": "value",
  "key2": "value2"
};
// objectも分割代入可能
// const { key } = obj; // const key = obj.key
const { key, key2 } = obj; // const key = obj.key
console.log(key); // => "value"/
console.log(key2); // => "value"

/*
# 暗黙的な型変換

- 暗黙的な型変換では、結果の値の型はオペランドの型に依存しています。 それを避けるには、暗黙的ではない変換 ー つまり明示的な型変換をする必要があります。
- symbolは暗黙的な型変換はできない
- NaNは何と演算しても結果がNaNとなってしまう
 */

// まじか...
console.log(1 + true); // => 2

const x = 1, y = "2", z = 3;
console.log(x + y + z); // => "123"
console.log(y + x + z); // => "213"
console.log(x + z + y); // => "42"


const userInput = "任意の文字列";
const num = Number.parseInt(userInput, 10);
if (!Number.isNaN(num)) {
  console.log("NaNではない値にパースできた", num);
} else {
  // Number型と互換性がない値を数値にしても、NaNとなってしまう
  console.log("NaNになった...", num);
}


/*
# 関数と宣言

- 引数を渡さずに呼び出すと、仮引数にはundefinedが入る
- 引数が多い場合には無視される
- 関数は関数オブジェクトとも呼ばれ、オブジェクトの一種
  - 関数名に()を付けることで、関数としてまとめた処理を呼び出すことができる
  - ()をつけて呼び出されなければ、関数をオブジェクトとして参照できる
    - 関数が値として扱えることを、ファーストクラスファンクション（第一級関数）と呼ぶ
- 関数を値として変数へ代入している式のことを関数式と呼ぶ
- シンプルで且つ `this` の問題を解決できるので、functionキーワードよりもarrow functionで書いた方が良い

 */

function fn() {
  console.log("fnが呼び出されました");
}
// 関数`fn`を`myFunc`変数に代入している
const myFunc = fn;
myFunc();

// arrow function
// 仮引数の数と定義
const fnA = () => { /* 仮引数がないとき */ };
const fnB = (x) => { /* 仮引数が1つのみのとき */ };
const fnC = x => { /* 仮引数が1つのみのときは()を省略可能 */ };
const fnD = (x, y) => { /* 仮引数が複数の時 */ };
// 値の返し方
// 次の２つの定義は同じ意味となる
const mulA = x => { return x * x; }; // ブロックの中でreturn
const mulB = x => x * x;            // 1行のみの場合はreturnとブロックを省略できる


// 第1引数のオブジェクトから`id`プロパティを変数`id`として定義する
function printUserId({ id }) {
  console.log(id); // => 42
}
const user = {
  id: 42
};
printUserId(user);

// オブジェクトのプロパティである関数をメソッドとよぶ
// > objのmethod1プロパティとmethod2プロパティに関数を定義しています。 このobj.method1プロパティとobj.method2プロパティがメソッドです。
const obj1 = {
  method1: function() {
    // `function`キーワードでのメソッド
    return "this is method1";
  },
  method2: () => {
    // Arrow Functionでのメソッド
    return "this is method2";
  },
  // note [ES2015] 短縮記法
  method3() {
    return "this is method3";
  }
};

console.log(obj1.method1());
console.log(obj1.method2());
console.log(obj1.method3());


/*
# 文と式

- 評価した結果を変数に代入できるものは式
- 処理する1ステップが1つの文
- 式は文となることができますが(式文)、文は式となることができない
 */

// {と}で囲んだ範囲をブロックと呼び、ブロックもスコープを作成する ifとかと一緒
{
  const isTrue = true;
  // isTrueという式がif文の中に出てくる
  if (isTrue) {
  }
}

/*
# ループと反復処理

- JavaScriptでは、オブジェクトは何らかのオブジェクトを継承しているため、for...in文は親オブジェクトまで探索してしまう
- Symbol.iteratorという特別な名前のメソッドを実装したオブジェクトをiterableと呼びます。 iterableオブジェクトは、for...of文で反復処理できます。
 */
{
  const array = [1, 2, 3];
  for (const value of array) {
    console.log(value);
  }
  // 1
  // 2
  // 3

  for (const value in array) {
    console.log(value);
  }
  // 0
  // 1
  // 2

  // stringもiterable
  const str = "吉野家";
  for (const value of str) {
    console.log(value);
  }
  // 吉
  // 野
  // 家
}

/*
# オブジェクト

- オブジェクトはプロパティの集合です。プロパティとは名前（キー）と値（バリュー）が対になったものです。
- 配列や関数などもオブジェクトの一種
 */
{
  // プロパティ名と値に指定する変数名が同じ場合は{ name }のように省略して書けます
  const name = "hoge";
  const obj = {
    name
  };
  console.log(obj);

  const obj2 = new Object(); // = {} と同じ
  console.log(obj2);

  // 分割代入
  const languages = {
    ja: "日本語",
    en: "英語"
  };
  // note [ES2015] 分割代入
  const { ja, en } = languages;
  console.log(ja);
  console.log(en);

  // Computed property names
  const key = "key-string";
  const obj3 = {
    [key]: "value"
  };
  console.log(obj3); // { 'key-string': 'value' }

  // note JavaScriptのconstは値を固定するのではなく、変数への再代入を防ぐためのもの。オブジェクトのプロパティの変更を防止するにはObject.freezeメソッドを利用する必要あり
  const object = Object.freeze({key: "value"});
  // object.key = "value"

  // プロパティの存在確認
  // 1. undefinedとの比較は値がundefinedの場合に区別できないので×
  // 2. in
  if ("ja" in languages) {
    console.log("ok");
  }
  // 3. hasOwnProperty
  console.log(languages.hasOwnProperty("ja"));

  // String() は引数のtoStringを実行している
  const customeObject = {
    toString() {
      return "hoge"
    }
  };
  console.log(String(customeObject)); // hoge

  // note オブジェクトのプロパティ名は文字列として扱われる
  const obj4 = {};
  const keyObject1 = { a: 1 };
  obj4[keyObject1] = "1";
  console.log(obj4); // { '[object Object]': '1' }

  // 静的メソッド
  console.log(Object.keys(languages));
  console.log(Object.values(languages));
  console.log(Object.entries(languages)); // [ [ 'ja', '日本語' ], [ 'en', '英語' ] ]

  // オブジェクトの複製とマージ
  // note [ES2015] Object.assignメソッド 空のオブジェクトをtargetにすることで、既存のオブジェクトには影響を与えずマージしたオブジェクトを作ることができる
  // note Object.assignメソッドはshallow copy オブジェクト直下にあるプロパティだけをコピーする
  // const obj = Object.assign(target, ...sources);
  const merged = Object.assign({}, languages, obj3); // { ja: '日本語', en: '英語', 'key-string': 'value' }
  console.log(merged);

  // note [ES2018] スプレッド構文がオブジェクトに対してもES2018でサポート
  const merged2 = {...languages, ...obj3};
  console.log(merged2);
}

/*
# プロトタイプオブジェクト
- オブジェクトに自動的に実装されるメソッドをビルトインメソッドと呼ぶ(toStringとか)
- prototypeオブジェクトに組み込まれているメソッドはプロトタイプメソッドと呼ぶ → インスタンス化時に継承
- インスタンスからprototypeオブジェクト上に定義されたメソッドを参照できる仕組みをプロトタイプチェーンと呼びます

ほとんどすべてのオブジェクトはObject.prototypeプロパティに定義されたprototypeオブジェクトを継承している
 */

{
  console.log(typeof Object.prototype.toString); // => "function"
  const hoge = {}; // インスタンス化時に継承
  console.log(hoge.toString === Object.prototype.toString);

  // プロパティの存在確認の詳細
  const obj = {};
  console.log(obj.hasOwnProperty("toString")); // false
  console.log("toString" in obj); // true プロトタイプオブジェクトまで確認をする

  // 継承元を明示する
  // インスタンス化時にプロトタイプオブジェクトが継承されているので、下記の書き方と実質同じになる
  const obj2 = Object.create(Object.prototype); // = {}

  // ArrayもArray.prototypeを持っており、それを継承する。また、Array.prototypeはObject.prototypeを継承している
  const array = [];
  console.log(array.hasOwnProperty === Object.prototype.hasOwnProperty); // true!!
}

/*
# 配列


 */

{
  const sparseArray = [1,, 3];
  console.log(sparseArray[1]); // => undefined

  // objectの一種なので...
  console.log(typeof sparseArray); // => object
  console.log(Array.isArray(sparseArray)); // true

  // note [ES2015] 配列と分割代入
  const array = ["one", "two", "three"];
  const [first, second, third] = array;

  const denseArray = [undefined];
  console.log(denseArray[0]); // undefined
  console.log(denseArray[1]); // undefined

  console.log(denseArray.hasOwnProperty(0)); // true
  console.log(denseArray.hasOwnProperty(1)); // false

  // 要素の検索
  const colors = [
    { "color": "red" },
    { "color": "green" },
    { "color": "blue" }
  ];

  const indexOfBlue = colors.findIndex((obj) => {
    return obj.color === "blue";
  });
  console.log(indexOfBlue);

  const blueColor = colors.find((obj) => {
    return obj.color === "blue";
  })
  console.log(blueColor);

  console.log(array.slice(1, 3));

  const isIncludedBlueColor = colors.some((obj) => {
    return obj.color === 'blue';
  })
  console.log(isIncludedBlueColor);

  const newArray = ['a', 'b', ...array];
}

/*
# 文字列

- 文字からビット列へ変換することを符号化（エンコード）と呼びます
- JavaScriptの文字列の各要素はUTF-16のCode Unitで構成されている
 */
{
  const url = "https://example.com?param=1";
  const indexOfQuery = url.indexOf("?");
  const query = url.slice(indexOfQuery);
  console.log(query); // ?param=1

  console.log(url.startsWith("https"));
  console.log(url.includes("param"));

  // 正規表現リテラルとRegExpコンストラクタの違い
  // note 正規表現リテラルはソースコードロード時に、RegExpコンストラクタは実行時に正規表現のパターンが評価
  function main() {
    // 正規表現リテラルは、ソースコードをロード（パース）した段階で正規表現のパターンが評価 → そのためエラーになる
    // const invalidPattern = /[/;
  }

  function main2() {
    // RegExpコンストラクタは実行時に正規表現のパターンが評価 → 呼び出されるまではエラーにならない → 変数と組み合わせる場合など
    // エスケープも必要でパフォーマンスも悪い
    const invalidPattern = new RegExp("[]");
  }

  const str = "ABC あいう DE えお";
  const alphabetsPattern = /[a-zA-Z]+/g;
  let matches;
  while (matches = alphabetsPattern.exec(str)) {
    console.log(`match: ${matches[0]}, lastIndex: ${alphabetsPattern.lastIndex}`);
  }

  function toDateJa(dateString) {
    return dateString.replace(/(\d{4})-(\d{2})-(\d{2})/, (all, year, month, day) => {
      return `${year}年${month}月${day}日`;
    });
  }
  console.log(toDateJa("今日は2017-03-01です")); // => "今日は2017年03月01日です"

  // note [ES2015] タグ付きテンプレート関数
  // タグ付きテンプレート関数とは、関数`テンプレート` という形式で記述する関数とテンプレートリテラルをあわせた表現
  // 変数をURLエスケープするタグ関数
  function escapeURL(strings, ...values) {
    return strings.reduce((result, str, i) => {
      return result + encodeURIComponent(values[i - 1]) + str;
    });
  }

  const input = "A&B";
  // escapeURLタグ関数を使ったタグ付きテンプレート
  const escapedURL = escapeURL`https://example.com/search?q=${input}&sort=desc`;
  console.log(escapedURL); // => "https://example.com/search?q=A%26B&sort=desc"
}

/*
# 文字列とUnicode

- Unicodeはすべての文字（制御文字などの画面に表示されない文字も含む）に対してIDを定義する目的で策定されている仕様
- この「文字」に対する「一意のID」のことをCode Point（符号位置）と呼ぶ

 */
{
  console.log("あ".codePointAt(0)); // => 12354
  console.log(String.fromCodePoint(12354)); // => "あ"

  // UTF-16では2つCode Unitの組み合わせ（合計4バイト）で1つの文字（1つのCode Point）を表現する仕組みをサロゲートペアと呼ぶ
  // 例えば 🍎 は \uD83C\uDF4E
  console.log("🍎".codePointAt(0)); // => 127822
  console.log("🍎".length); // => 2

  // note [ES2015] 正規表現のu（Unicode）フラグを使用した方が良い
  // uフラグがない場合は、Code Unitが順番に並んだものとして扱い、uフラグをつけるとCode Pointごとに扱う → サロゲートペアも正しく扱える

  function countOfCodePoints(str, codePoint) {
    let count = 0;
    for (const item of str) {
      if (item === codePoint) {
        count++;
      }
    }
    return count;
  }

  console.log(countOfCodePoints("🍎🍇🍎🥕🍒", "🍎")); // 2
}

/*
# ラッパーオブジェクト

- JavaScriptのデータ型はプリミティブ型とオブジェクトに分けられる
- 常にリテラルを使う方が良い
 */

{
  // プリミティブ型の文字列がStringオブジェクトのインスタンスメソッドであるtoUpperCaseメソッドを呼び出せる → 自動でラッパーオブジェクトに変換される
  console.log("string".toUpperCase()); // => "STRING"

  // プリミティブ型の値を包んだ（ラップした）オブジェクト → ラッパーオブジェクト
  const str = new String("input value");
  console.log(typeof str); // object
}

/*
# 関数とスコープ

- ビルトインオブジェクト
  - プログラム実行時に自動的に定義される
  - undefinedのような変数やdocumentやmoduleなど
- クロージャーとは「外側のスコープにある変数への参照を保持できる」という関数がもつ性質のこと
- JavaScriptのスコープでは、どの識別子がどの変数を参照するかが静的に決定されるという性質を持ちます。 つまり、コードを実行する前にどの識別子がどの変数を参照しているかがわかる
- 不要なデータをメモリから解放する方法は、ガベージコレクションが採用されている
  - note データがメモリ上から解放されるかどうかはあくまで、そのデータが参照されているかによって決定される
 */

{
  // note varの巻き上げ
  // 変数宣言が宣言と代入の2つの部分から構成されていると考える
  // 宣言部分が暗黙的にもっとも近い関数またはグローバルスコープの先頭に巻き上げられ、代入部分はそのままの位置に残るという特殊な動作をする

  // 下記の行だけだとエラーになるが、そのあとで定義をしていると undefined となる

  // 変数の宣言部分がグローバルスコープの先頭に移動しているかのように見える動作をする
  // var var_x; ← この行が追加されたような動き
  console.log(var_x)
  var var_x = 1;

  // GC
  let t = "A"; // 文字列Aのデータがメモリ上に確保される
  t = "B"; // Aという文字列のデータはどこからも参照されなくなったのでGCの回収対象になる

  function printX() {
    const x = "X";
    console.log(x); // => "X"
  }

  printX(); // この時点で`"X"`を参照するものはなくなる -> 解放される

  function createArray() {
    const tempArray = [1, 2, 3];
    return tempArray;
  }
  const array = createArray();
  console.log(array); // => [1, 2, 3]
  // 変数`array`が`[1, 2, 3]`という値を参照してる -> 解放されない

  // countが参照され続けているから解放されない
  function createCounter() {
    let count = 0;
    // `increment`関数は`count`変数を参照
    function increment() {
      count = count + 1;
      return count;
    }
    return increment;
  }
  // `myCounter`は`createCounter`が返した関数を参照
  const myCounter = createCounter();
  myCounter(); // => 1
  myCounter(); // => 2
}

/*
# 関数とthis

- オブジェクトのプロパティが関数である場合にそれをメソッドと呼びます。 一般的にはメソッドも含めたものを関数といい、関数宣言などとプロパティである関数を区別する場合にメソッドと呼びます
- 関数におけるthisの基本的な参照先（暗黙的に関数に渡すthisの値）はベースオブジェクト
  - ベースオブジェクトとは「メソッドを呼ぶ際に、そのメソッドのドット演算子またはブラケット演算子のひとつ左にあるオブジェクト」のこと
- thisが参照先を決めるルールは、Arrow Functionとそれ以外の関数定義の方法で異なる
 */
{
  // 関数宣言や関数式におけるthis
  function fn1() {
    return this;
  }
  console.log(fn1()); // strictモードだとundefined、そうでないとグローバルオブジェクトを参照するように変換される

  // メソッド呼び出しにおけるthis

  const person = {
    fullName: "Brendan Eich",
    sayName: function() {
      // `person.fullName`と書いているのと同じ
      return this.fullName;
    }
  };
  // `person.fullName`を出力する
  console.log(person.sayName()); // => "Brendan Eich"

  // 問題1: thisを含むメソッドを変数に代入した場合
  // note thisがどの値を参照するかは関数の呼び出し時（動的）に決まる
  // sayのベースオブジェクトを参照している
  const say = person.sayName;
  // say(); TypeError: Cannot read property 'fullName' of undefined

  function say2(message) {
    return `${message} ${this.fullName}！`;
  }
  // callでthisを明示する (apply,bind)
  console.log(say2.call(person, "こんにちは")); // こんにちは Brendan Eich！


  // 問題2: コールバック関数とthis
  const Prefixer = {
    prefix: "pre",
    prefixArray(strings) {
      // コールバック関数として匿名関数を渡しているので、thisがこの匿名関数のベースオブジェクトを参照する事になる
      return strings.map(function(str) {
        // コールバック関数における`this`は`undefined`となる(strict mode)
        return this.prefix + "-" + str;
      });
    },
    prefixArray2(strings) {
      return strings.map((str) => {
        // Arrow Function自体は`this`を持たない
        return this.prefix + "-" + str;
      });
    }
  };

  // Arrow Functionとthis
  // note Arrow Functionで定義された関数やメソッドにおけるthisがどの値を参照するかは関数の定義時（静的）に決まります
  // Arrow Functionはthisをもつことができないので、thisをbindできない
}

/*
# クラス

- ここではクラスは構造、動作、状態を定義できるものを示すことにする
  - クラスとは動作や状態を定義した構造
  - インスタンスはクラスに定義した動作を継承し、状態は動作によって変化
- ECMAScript 2019では、外から原理的に参照できないプライベートプロパティ（hard private）を定義する構文はない
  - 習慣として外から直接読み書きしてほしくないプロパティを_（アンダーバー）で開始する
- インスタンスからプロトタイプメソッドを呼び出せるのはプロトタイプチェーンと呼ばれる仕組みによるもの

 */
{
  class ConflictClass {
    constructor() {
      this.method = () => {
        console.log("インスタンスオブジェクトのメソッド");
      };
    }

    // プロトタイプメソッド or インスタンスメソッド
    // note class構文のメソッド定義は、このプロトタイプオブジェクトのプロパティとして定義される
    method() {
      console.log("プロトタイプメソッド");
    }
  }

  const conflict = new ConflictClass();
  conflict.method(); // "インスタンスオブジェクトのメソッド"
  delete conflict.method;
  // 上書きされずにどちらも定義されている
  // note プロパティを参照する際に、オブジェクト自身から[[Prototype]]内部プロパティへと順番に探す仕組みのことをプロトタイプチェーンと呼ぶ
  conflict.method(); // "プロトタイプのメソッド"
}

/*
# 例外処理

 */
{
  function assertPositiveNumber(num) {
    if (num < 0) {
      throw new Error(`${num} is not positive.`);
    }
  }

  try {
    // 0未満の値を渡しているので、関数が例外を投げる
    assertPositiveNumber(-1);
  } catch (error) {
    console.log(error instanceof Error); // => true
    console.log(error.message); // => "-1 is not positive."
  }
}

/*
# 非同期処理:コールバック/Promise/Async Function

- 非同期処理はその処理が終わるのを待つ前に次の処理を評価すること
- 非同期処理であってもメインスレッド(UIスレッドとも呼ばれる)で実行されることがある
  - メインスレッドが他の処理で専有されると、表示が更新されなくなりフリーズしたような体感となる(1秒間スクロールなどの操作が効かないとか)
- JavaScriptでは一部の例外を除き非同期処理が並行処理（concurrent）として扱われる
  - 処理を一定の単位ごとに分けて処理を切り替えながら実行すること
- Web Worker APIを使い、メインスレッド以外でJavaScriptを実行できる
  - Web Workerにおける非同期処理は並列処理（Parallel）で、排他的に複数の処理を同時に実行できる
 */
{
  console.log('1');
  setTimeout(() => {
    console.log('2')
  }, 1);
  console.log('3'); // 1 3 2

  // 非同期処理では、try...catch構文を使っても非同期的に発生した例外をキャッチできない
  try {
    setTimeout(() => {
      // 実際に実行され例外を投げるのは、すべての同期処理が終わった後
      // throw new Error("非同期的なエラー");
    }, 10);
  } catch (error) {
    // 非同期処理の外からは非同期処理の中で例外が発生したかが分からない
    console.log(error.message);
  }
  console.log("この行は実行されます");

  // エラーファーストコールバック
  // 非同期処理中に発生した例外を扱う方法を決めたルール → 仕様ではない  1つのコールバック関数の中で成功した場合と失敗した場合を定義
  // note コールバック関数の1番目の引数にはエラーオブジェクトまたはnullを入れ、それ以降の引数にデータを渡すというルール化したものをエラーファーストコールバックと呼ぶ
  const fs = require('fs');
  fs.readFile("./example.txt", (error, data) => {
    if (error) {
      console.log('読み込み中にエラーが発生しました');
    } else {
      console.log('データを読み込むことができました');
    }
  });

  /*
  ## [ES2015] Promise
  - Promiseはエラーファーストコールバックを発展させたもので、単なるルールではなくオブジェクトという形にして非同期処理を統一的なインターフェースで扱うことを目的にしている
  - Promiseインスタンスの状態は作成時にPending、一度でもFulfilledまたはRejectedへ変化すると、それ以降状態は変化しなくなる
    - Promiseインスタンスの状態が変化した時に、一度だけ呼ばれるコールバック関数を登録するのがthenやcatchメソッド
   */
  function delay(timeoutMs) {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(timeoutMs);
      }, timeoutMs);
    });
  }
  // `then`メソッドで成功時のコールバック関数だけを登録
  delay(1).then(() => {
    console.log("1ミリ秒後に呼ばれる");
  });

  // Fulfilledの状態となったPromiseインスタンスを作成
  const fulFilledPromise = Promise.resolve();
  const fulFilledPromise2 = new Promise((resolve => {
    resolve();
  }))

  // Promiseチェーン
  Promise.resolve()
  // note thenメソッドは新しい`Promise`インスタンスを返す
  // thenやcatchメソッドはFulfilled状態のPromiseインスタンスを作成して返す、例外が発生したとき、thenやcatchメソッドはRejectedなPromiseインスタンスを返す
  .then(() => {
    console.log('hoge');
  })
  .then(() => {
    console.log('fuga');
  });

  // note catchメソッドはthenメソッドの糖衣構文
  function errorPromise(message) {
    return new Promise((resolve, reject) => {
      reject(new Error(message));
    });
  }
  // thenでかくとこうなる
  errorPromise("thenでエラーハンドリング").then(undefined, (error) => {
    console.log(error.message); // => "thenでエラーハンドリング"
  });

  // コールバック関数で任意の値を返すと、その値でresolveされたFulfilled状態のPromiseインスタンスが作成されるが、コールバック関数でPromiseインスタンスを返した場合は同じ状態のPromiseインスタンスが返る
  Promise.resolve().then(function onFulfilledA() {
    return Promise.reject(new Error("失敗"));
  }).then(function onFulfilledB() {
    console.log("onFulfilledBは呼び出されません");
  }).catch(function onRejected(error) {
    console.log(error.message); // => "失敗"
  }).then(function onFulfilledC() {
    console.log("onFulfilledCは呼び出されます");
  });

  // Promise.allで複数のPromiseをまとめる
  const promise1 = delay(1);
  const promise2 = delay(2);
  const promise3 = delay(3);

  // 配列のすべてのPromiseインスタンスがFulfilledとなった場合は、返り値のPromiseインスタンスもFulfilledとなる。ひとつでもRejectedとなった場合は、返り値のPromiseインスタンスもRejectedとなる
  Promise.all([promise1, promise2, promise3]).then(function(values) {
    console.log(values);
  })
  Promise.all([promise1, promise2, promise3]).then(([response1, response2, response3]) => {
    console.log(response1);
    console.log(response2);
    console.log(response3);
  })

  // Promise.race
  // 複数のPromiseを受け取りますが、Promiseが1つでも完了した（Settle状態となった）時点で次の処理を実行。配列のなかで一番最初にSettle状態へとなったPromiseインスタンスと同じ状態になる
  const racePromise = Promise.race([
    delay(1),
    delay(32),
    delay(64),
    delay(128)
  ]);
  racePromise.then(value => {
    console.log(value); // 1
  })

  // タイムアウト処理
  function timeout(timeoutMs) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        reject(new Error(`Timeout: ${timeoutMs}ミリ秒経過`));
      }, timeoutMs);
    });
  }

  Promise.race([
    delay(100),
    timeout(1)
  ]).then(value => {
    console.log(value);
  }).catch(error => {
    console.log(error.message);
  });

  /*
  ## [ES2017] Async Function
  - Async Functionは通常の関数とは異なり、必ずPromiseインスタンスを返す関数を定義する構文
  - Async Functionの関数内ではawait式を利用できます
    - await式は右辺のPromiseインスタンスがFulfilledまたはRejectedになるまでその場で非同期処理の完了を待ちます
   */

  // Async Functionとawait式を使うことで、非同期処理を同期処理のような見た目で書ける
  async function asyncMain() {
    try {
      const result = await delay(10);
      console.log(result);
      console.log('delayの処理が完了後に呼ばれる');
    } catch (e) {
      console.log(e.message);
    }
  }

  asyncMain();
}
