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

// 変更可能
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
6種類のプリミティブ型とオブジェクトがある

リテラルはデータ型の値を直接記述できる構文として定義されたもので、プリミティブ型の真偽値、数値、文字列、nullはリテラル表現
プリミティブ型のデータでもプロパティアクセス可能、str.lengthみたいな

オブジェクト（複合型）
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

数値は内部的にIEEE 754方式の浮動小数点数として表現されています
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
