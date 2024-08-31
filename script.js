document.addEventListener("DOMContentLoaded", function () {
  document.querySelectorAll("#menu .btn-event").forEach((btn) => {
    btn.addEventListener("click", function (event) {
      event.preventDefault(); // デフォルトのリンク動作を防止
      const contentUrl = this.getAttribute("data-content"); // 対応するコンテンツファイルのURLを取得
      const contentDiv = document.getElementById("content");

      // コンテンツを非同期で読み込む
      fetch(contentUrl)
        .then((response) => response.text())
        .then((data) => {
          if (!menu.getAttribute("data-menu-active") === "true") {
            contentOut();
          }
          setTimeout(() => {
            contentDiv.innerHTML = data; // 取得したコンテンツを挿入
          }, 390);
          menuBtnEventAnimation(this);
        })
        .catch((error) => {
          console.error("Error loading content:", error);
          contentDiv.innerHTML = "<p>コンテンツを読み込めませんでした。</p>";
        });
    });
  });
});

function menuBtnEventAnimation(content_btn) {
  const menu = document.getElementById("menu");
  const contentDiv = document.getElementById("content");
  const isMenuActive = menu.getAttribute("data-menu-active") === "true";
  const isBtnActive = content_btn.getAttribute("data-btn-active") === "true";

  if (isMenuActive) {
    // メニューがアクティブな場合
    menu.style.animation = "none";
    setTimeout(() => {
      menu.style.animation = `menuShrinkAnime 770ms cubic-bezier(.23,0,0,1) 0s forwards`;
    }, 50);
    menu.setAttribute("data-menu-active", "false");
    content_btn.setAttribute("data-btn-active", "true");
  } else if (isBtnActive) {
    // ボタンがアクティブな場合
    // menu.style.animation = "none";
    setTimeout(() => {
      menu.style.animation = `menuEnlargeAnime 770ms cubic-bezier(.23,0,0,1) 0s forwards`;
    }, 50);
    contentOut();
    contentDiv.innerHTML = "";
    menu.setAttribute("data-menu-active", "true");
    content_btn.setAttribute("data-btn-active", "false");
  } else if (!isMenuActive) {
    document.querySelectorAll("#menu .btn-event").forEach((btn) => {
      btn.setAttribute("data-btn-active", "false");
    });
    content_btn.setAttribute("data-btn-active", "true");
    contentIn();
  }
  btnAnimaRes();
}

function contentIn() {
  const contentDiv = document.getElementById("content");
  setTimeout(() => {
    contentDiv.style.animation = `contentInAnime 390ms ease 0s forwards`;
  }, 50);
  contentDiv.style.animation = `none`;
}

function contentOut() {
  const contentDiv = document.getElementById("content");
  contentDiv.style.animation = `none`;
  setTimeout(() => {
    contentDiv.style.animation = `contentOutAnime 390ms ease 0s forwards`;
  }, 50);
}

function btnAnimaRes() {
  setTimeout(() => {
    document.querySelectorAll("#menu .btn-event").forEach((btn) => {
      btn.style.animation = "none";
    });
  }, 50);
}
