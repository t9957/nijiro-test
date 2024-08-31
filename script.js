document.addEventListener("DOMContentLoaded", function () {
  document.querySelectorAll("#menu .btn").forEach((btn) => {
    btn.addEventListener("click", function (event) {
      console.log("log");
      event.preventDefault(); // デフォルトのリンク動作を防止
      const contentUrl = this.getAttribute("data-content"); // 対応するコンテンツファイルのURLを取得
      const contentDiv = document.getElementById("content");

      // コンテンツを非同期で読み込む
      fetch(contentUrl)
        .then((response) => response.text())
        .then((data) => {
          contentDiv.innerHTML = data; // 取得したコンテンツを挿入
        })
        .catch((error) => {
          console.error("Error loading content:", error);
          contentDiv.innerHTML = "<p>コンテンツを読み込めませんでした。</p>";
        });
    });
  });
});
