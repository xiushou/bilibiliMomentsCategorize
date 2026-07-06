document.getElementById("cookie").innerText =
  document.body.dataset.cookie || "未检测到 Cookie";

console.log("页面已加载，Cookie: " + document.body.dataset.cookie);
