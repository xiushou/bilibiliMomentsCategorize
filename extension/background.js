// 存储最近通过网络请求观测到的 Cookie（当 cookie 为 HttpOnly 时，content script 无法读取，但能从请求头中看到）
const observedCookies = {};

chrome.webRequest?.onBeforeSendHeaders?.addListener(
  (details) => {
    const header = (details.requestHeaders || []).find(
      (h) => h.name && h.name.toLowerCase() === "cookie",
    );
    if (header && header.value) {
      try {
        const url = new URL(details.url);
        const host = url.hostname;
        observedCookies[host] = header.value;
        // 也记录根域名以增加匹配概率
        const parts = host.split(".");
        if (parts.length > 2) {
          const root = parts.slice(-2).join(".");
          observedCookies[root] = header.value;
        }
      } catch (e) {
        console.error("webRequest cookie parse error", e);
      }
    }
  },
  { urls: ["*://*.bilibili.com/*"] },
  ["requestHeaders"],
);

chrome.runtime.onMessage.addListener((msg, sender, sendResponse) => {
  if (msg.type !== "GET_COOKIE") return;
  // 尝试通过 URL 获取 cookie；失败时回退到按 domain 获取以增加命中率
  function respondWith(cookies) {
    try {
      const value =
        cookies && cookies.length > 0
          ? cookies.map((cookie) => `${cookie.name}=${cookie.value}`).join("; ")
          : null;

      sendResponse({ value, count: cookies ? cookies.length : 0 });
    } catch (e) {
      console.error("respondWith error", e);
      sendResponse({ value: null, error: String(e) });
    }
  }

  // 优先使用发送消息的页面 URL（包含路径和协议），能更准确命中 cookie
  const urlForGet =
    sender && sender.tab && sender.tab.url
      ? sender.tab.url
      : "https://www.bilibili.com/";

  chrome.cookies.getAll({ url: urlForGet }, (cookies) => {
    if (chrome.runtime.lastError) {
      console.error("cookies.getAll(url) error:", chrome.runtime.lastError);
    }
    console.log("cookies.getAll(url) =>", cookies);

    if (cookies && cookies.length > 0) {
      respondWith(cookies);
      return;
    }

    // 若 cookies API 未命中，尝试使用从网络请求中观测到的 Cookie
    try {
      const pageHost =
        sender && sender.tab && sender.tab.url
          ? new URL(sender.tab.url).hostname
          : null;
      if (pageHost) {
        const byHost = observedCookies[pageHost];
        const byRoot = observedCookies[pageHost.split(".").slice(-2).join(".")];
        const found = byHost || byRoot;
        if (found) {
          console.log(
            "Returning cookie from webRequest observation for",
            pageHost,
          );
          sendResponse({ value: found, fromWebRequest: true });
          return;
        }
      }
    } catch (e) {
      console.error("observed cookie lookup error", e);
    }

    // 回退：按域名查找（例如 .bilibili.com）
    chrome.cookies.getAll({ domain: ".bilibili.com" }, (cookies2) => {
      if (chrome.runtime.lastError) {
        console.error(
          "cookies.getAll(domain) error:",
          chrome.runtime.lastError,
        );
      }
      console.log("cookies.getAll(domain) =>", cookies2);

      respondWith(cookies2);
    });
  });

  return true; // 表示异步回复
});
