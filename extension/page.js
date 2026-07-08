// import { getExtensionId, setExtensionId, getOptionsLink } from "./global.js";

// const extensionId = document.body.dataset.extensionId;
// setExtensionId(extensionId);
// console.log("get extensionId from content.js:", getExtensionId());

console.log("upName from content.js:", document.body.dataset.upGroupName);

async function getBilibiliDynamic(currentOffset = offset) {
  try {
    const url = new URL(
      "https://api.bilibili.com/x/polymer/web-dynamic/v1/feed/all",
    );
    url.searchParams.set("timezone_offset", "-480");
    url.searchParams.set("type", "all");
    url.searchParams.set("platform", "web");
    url.searchParams.set(
      "x-bili-device-req-json",
      JSON.stringify({ platform: "web", device: "pc" }),
    );

    if (
      currentOffset !== null &&
      currentOffset !== undefined &&
      currentOffset !== ""
    ) {
      url.searchParams.set("offset", String(currentOffset));
    }

    const res = await fetch(url.toString(), {
      method: "GET",
      credentials: "include",
    });

    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const data = await res.json();

    // console.log(json_str(data));

    return data;
  } catch (e) {
    console.error("请求异常", e);
    return null;
  }
}

function json_str(data) {
  return JSON.stringify(data, null, 10);
}

function escapeHtml(value) {
  return String(value)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

let offset = null;
let isLoading = false;
let hasMore = true;

function renderItem(item) {
  const listEl = document.getElementById("list");
  if (!listEl) return;

  const link = item?.modules?.module_dynamic?.major?.archive?.bvid || "";
  const title =
    item?.modules?.module_dynamic?.major?.archive?.title || "无标题";
  const upName = item?.modules?.module_author?.name || "未知UP主";
  const avatar = item?.modules?.module_author?.face || "";
  const pubTime = item?.modules?.module_author?.pub_time || "";
  const type = item?.modules?.module_dynamic?.major?.type || "";
  const cover = item?.modules?.module_dynamic?.major?.archive?.cover || "";

  // console.log("========");
  // console.log("渲染动态", { link, title, upName, avatar, pubTime, type });

  const itemEl = document.createElement("div");
  itemEl.className = "item-card";

  if (type === "MAJOR_TYPE_ARCHIVE") {
    const videoUrl = link ? `https://www.bilibili.com/video/${link}` : "#";
    const avatarHtml = avatar
      ? `<img class="avatar" src="${escapeHtml(avatar)}" alt="${escapeHtml(upName)}" />`
      : "";
    const coverHtml = cover
      ? `<img class="item-cover" src="${escapeHtml(cover)}" alt="${escapeHtml(title)}" />`
      : "";
    const parsedTime = Number(pubTime);
    const pubTimeText = Number.isFinite(parsedTime)
      ? new Date(parsedTime * 1000).toLocaleString()
      : pubTime || "未知时间";

    itemEl.innerHTML = `
      <div class="item-header">
        ${avatarHtml}
        <div>
          <div class="up-name">${escapeHtml(upName)}</div>
          <div class="pub-time">${escapeHtml(pubTimeText)}</div>
        </div>
      </div>
      <div class="item-main">
        ${coverHtml ? `<div class="item-cover-wrap">${coverHtml}</div>` : ""}
        <div class="item-body">
          <a class="item-title" href="${escapeHtml(videoUrl)}" target="_blank" rel="noopener noreferrer">${escapeHtml(title)}</a>
        </div>
      </div>
    `;
  } else {
    itemEl.innerHTML = `<div class="unsupported">暂不支持类型: ${escapeHtml(type || "未知")}</div>`;
  }

  listEl.appendChild(itemEl);
}

async function loadMoreDynamic() {
  if (isLoading || !hasMore) return;

  isLoading = true;
  const res = await getBilibiliDynamic(offset);

  if (!res?.data) {
    hasMore = false;
    isLoading = false;
    return;
  }

  offset = res.data.offset;
  const items = res.data.items || [];

  if (items.length > 0) {
    items.forEach(renderItem);
  }

  if (offset === null || offset === undefined || offset === "") {
    hasMore = false;
  }

  isLoading = false;
}

function handleScroll() {
  const nearBottom =
    window.innerHeight + window.scrollY >=
    document.documentElement.scrollHeight - 200;

  if (nearBottom) {
    loadMoreDynamic();
  }
}

(async () => {
  const res = await getBilibiliDynamic(offset);

  offset = res?.data?.offset;
  hasMore = offset !== null && offset !== undefined && offset !== "";

  const items = res?.data?.items || [];
  const listEl = document.getElementById("list");

  if (listEl) {
    listEl.innerHTML = "";
  }

  items.forEach(renderItem);

  window.addEventListener("scroll", handleScroll, { passive: true });
})();
