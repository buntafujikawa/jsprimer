console.log("index.js: loaded");

/*
Fetch APIはHTTP通信を行いリソースを取得するためのAPIです。Fetch APIを使うことで、ページ全体を再読み込みすることなく指定したURLからデータを取得できます。
Fetch APIは同じくHTTP通信を扱うXMLHttpRequestと似たAPIですが、より強力で柔軟な操作が可能です。
 */

/*
Promiseチェーンを使って処理を分割する利点は、同期処理と非同期処理を区別せずに連鎖できることです
一般に、同期的に書かれた処理を後から非同期処理へと変更することは、全体を書き換える必要があるため難しいです。
そのため、最初から処理を分けておき、処理をthenを使ってつなぐことで、変更に強いコードを書くことができます。
 */
async function main() {
  try {
    const userId = getUserId();
    const userInfo = await fetchUserInfo(userId);
    const view = createView(userInfo);
    displayView(view);
  } catch (error) {
    console.error(`エラーが発生しました (${error})`);
  }
}

function fetchUserInfo(userId) {
  return fetch(`https://api.github.com/users/${encodeURIComponent(userId)}`)
  .then(response => {
    // console.log(response);
    // console.log(response.json());
    if (!response.ok) {
      new Promise.reject(new Error(`${response.status}: ${response.statusText}`));
    } else {
      return response.json();
    }
  });
}

function getUserId() {
  const value = document.getElementById("userId").value;
  return encodeURIComponent(value);
}

function createView(userInfo) {
  // テンプレートリテラルをタグ付けする
  // タグつきテンプレート関数を利用することで、テンプレートとなる文字列に対して特定の形式に変換したデータを埋め込むといったテンプレート処理が行える
  // https://jsprimer.net/basic/string/#tagged-template-function
  return escapeHTML`
    <h4>${userInfo.name} (@${userInfo.login})</h4>
    <img src="${userInfo.avatar_url}" alt="${userInfo.login}" height="100">
    <dl>
        <dt>Location</dt>
        <dd>${userInfo.location}</dd>
        <dt>Repositories</dt>
        <dd>${userInfo.public_repos}</dd>
    </dl>
    `;
}

function displayView(view) {
  const result = document.getElementById("result");
  result.innerHTML = view;
}

function escapeSpecialChars(str) {
  return str
  .replace(/&/g, "&amp;")
  .replace(/</g, "&lt;")
  .replace(/>/g, "&gt;")
  .replace(/"/g, "&quot;")
  .replace(/'/g, "&#039;");
}

function escapeHTML(strings, ...values) {
  return strings.reduce((result, str, i) => {
    const value = values[i - 1];
    if (typeof value === "string") {
      return result + escapeSpecialChars(value) + str;
    } else {
      return result + String(value) + str;
    }
  });
}
