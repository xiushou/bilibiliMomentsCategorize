async function replacePage() {
  const html = await fetch(chrome.runtime.getURL("page.html")).then((r) =>
    r.text(),
  );

  document.open();
  document.write(html);
  document.close();

  const script = document.createElement("script");
  script.src = chrome.runtime.getURL("page.js");
  document.body.appendChild(script);
}

replacePage();
