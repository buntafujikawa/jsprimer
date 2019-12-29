'use strict';

/*
# 非同期処理:コールバック/Promise/Async Function
https://jsprimer.net/basic/async/

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
    delay(2),
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
