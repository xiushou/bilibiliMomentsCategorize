let timer = null;

function checkCookie() {
  chrome.runtime.sendMessage(
    {
      type: "GET_COOKIE",
    },
    (res) => {
      console.log("开始检测 Cookie: " + res.value);

      if (!res?.value) return;

      clearInterval(timer);

      replacePage(res.value);
    },
  );
}

timer = setInterval(checkCookie, 500);

checkCookie();

async function replacePage(cookie) {
  const html = await fetch(chrome.runtime.getURL("page.html")).then((r) =>
    r.text(),
  );

  document.open();
  document.write(html);
  document.close();

  window.__COOKIE__ = cookie;

  document.body.dataset.cookie = cookie;

  console.log("Cookie 已注入到页面: " + window.__COOKIE__);

  const script = document.createElement("script");
  script.src = chrome.runtime.getURL("page.js");
  document.body.appendChild(script);
}
