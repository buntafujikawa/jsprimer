console.log("index.js: loaded");

/*
Fetch APIはHTTP通信を行いリソースを取得するためのAPIです。Fetch APIを使うことで、ページ全体を再読み込みすることなく指定したURLからデータを取得できます。
Fetch APIは同じくHTTP通信を扱うXMLHttpRequestと似たAPIですが、より強力で柔軟な操作が可能です。
 */

function main() {
  fetchUserInfo("buntafujikawa");
}

function fetchUserInfo(userId) {
  fetch(`https://api.github.com/users/${encodeURIComponent(userId)}`)
  .then(response => {
    console.log(response.status);

    if (!response.ok) {
      console.error("エラーレスポンス", response);
    } else {
      return response.json().then(userInfo => {
        const view = createView(userInfo);
        displayView(view);
      });
    }
  }).catch(error => {
    console.error(error);
  });
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
