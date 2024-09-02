document.addEventListener("DOMContentLoaded", function () {
  document.querySelectorAll("#menu .btn-event").forEach((btn) => {
    btn.addEventListener("click", function (event) {
      event.preventDefault(); // デフォルトのリンク動作を防止
      menuOperation(this);
    });
  });

  const contentDiv = document.getElementById("content");

  function btnAnimaRes() {
    setTimeout(() => {
      document.querySelectorAll("#menu .btn-event").forEach((btn) => {
        btn.style.animation = `none`;
      });
    }, 50);
  }

  function cancelAllBtnActive() {
    document.querySelectorAll("#menu .btn-event").forEach((btn) => {
      btn.setAttribute("data-btn-active", "false");
    });
  }

  function menuOperation(btnEvent) {
    const contentUrl = btnEvent.getAttribute("data-content");
    const menu = document.getElementById("menu");
    const isMenuActive = menu.getAttribute("data-menu-active") === "true";
    const isBtnActive = btnEvent.getAttribute("data-btn-active") === "true";

    if (isMenuActive) {
      openContent(contentUrl);
      menu.setAttribute("data-menu-active", "false");
      btnEvent.setAttribute("data-btn-active", "true");
    } else if (isBtnActive) {
      closeContent();
      menu.setAttribute("data-menu-active", "true");
      btnEvent.setAttribute("data-btn-active", "false");
    } else if (!isMenuActive) {
      cancelAllBtnActive();
      btnEvent.setAttribute("data-btn-active", "true");
      toggleContent(contentUrl);
    }
    btnAnimaRes();
  }

  function openContent(contentUrl) {
    fetchContent(contentUrl).then((content) => {
      contentDiv.innerHTML = content;
      // ページの内容が読み込まれてからアニメーションを開始
      menu.style.animation = `none`;
      setTimeout(() => {
        menu.style.animation = `menuShrinkAnime 390ms cubic-bezier(.5,0,0,1) 0s forwards`;
      }, 50);
    });
  }

  function closeContent() {
    setTimeout(() => {
      menu.style.animation = `menuEnlargeAnime 390ms cubic-bezier(.5,0,0,1) 0s forwards`;
    }, 50);
    menu.addEventListener("animationend", function handleAnimationEnd() {
      contentDiv.innerHTML = "";
      contentDiv.style.animation = `none`;
      menu.style.animation = `none`;
      menu.removeEventListener("animationend", handleAnimationEnd);
    });
  }

  function toggleContent(contentUrl) {
    hideContent();
    contentDiv.addEventListener("animationend", function handleAnimationEnd() {
      showContent(contentUrl);
      contentDiv.removeEventListener("animationend", handleAnimationEnd);
    });
  }

  function showContent(contentUrl) {
    fetchContent(contentUrl).then((content) => {
      contentDiv.innerHTML = content;
      contentDiv.style.animation = `contentInAnime 390ms ease 0s forwards`;
    });
    contentDiv.addEventListener("animationend", function handleAnimationEnd() {
      contentDiv.style.animation = `none`;
      contentDiv.removeEventListener("animationend", handleAnimationEnd);
    });
  }

  function hideContent() {
    setTimeout(() => {
      contentDiv.style.animation = `contentOutAnime 390ms ease 0s forwards`;
    }, 50);
    contentDiv.addEventListener("animationend", function handleAnimationEnd() {
      contentDiv.innerHTML = "";
      contentDiv.style.animation = `none`;
      contentDiv.removeEventListener("animationend", handleAnimationEnd);
    });
  }

  function fetchContent(contentUrl) {
    return fetch(contentUrl)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.text();
      })
      .then((data) => {
        return data;
      })
      .catch((error) => {
        console.error("Error loading content:", error);
        const style = `
        height: 95vh;
        display: flex;
        align-items: center;
        justify-content: center;
        `;
        return `<div class="centered mjs-error" style="${style}"><p class="error-msg">error: コンテンツを読み込めませんでした。</p></div>`;
      });
  }
});
