async function replacePage() {
  const html = await fetch(chrome.runtime.getURL("page.html")).then((r) =>
    r.text(),
  );

  document.open();
  document.write(html);
  document.close();

  const link = document.createElement("link");
  link.rel = "stylesheet";
  link.href = chrome.runtime.getURL("style.css");
  document.head.appendChild(link);

  const script = document.createElement("script");
  script.src = chrome.runtime.getURL("page.js");
  document.body.appendChild(script);
}

replacePage();
