async function getBilibiliDynamic() {
  try {
    const res = await fetch(
      "https://api.bilibili.com/x/polymer/web-dynamic/v1/feed/all?timezone_offset=-480&type=all&platform=web&offset=1214599979474092040&page=3&features=itemOpusStyle,listOnlyfans,opusBigCover,onlyfansVote,decorationCard,onlyfansAssetsV2,forwardListHidden,ugcDelete,onlyfansQaCard,commentsNewVersion,avatarAutoTheme,sunflowerStyle,cardsEnhance,eva3CardOpus,eva3CardVideo,eva3CardComment,eva3CardVote,eva3CardUser&web_location=333.1365&x-bili-device-req-json=%7B%22platform%22:%22web%22,%22device%22:%22pc%22,%22spmid%22:%22333.1365%22%7D",
      {
        method: "GET",
        credentials: "include",
      },
    );

    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const data = await res.json();
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

  console.log("========");
  console.log("渲染动态", { link, title, upName, avatar, pubTime, type });

  const itemEl = document.createElement("div");
  itemEl.className = "item-card";

  if (type === "MAJOR_TYPE_ARCHIVE") {
    const videoUrl = link ? `https://www.bilibili.com/video/${link}` : "#";
    const avatarHtml = avatar
      ? `<img class="avatar" src="${escapeHtml(avatar)}" alt="${escapeHtml(upName)}" />`
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
      <a class="item-title" href="${escapeHtml(videoUrl)}" target="_blank" rel="noopener noreferrer">${escapeHtml(title)}</a>
    `;
  } else {
    itemEl.innerHTML = `<div class="unsupported">暂不支持类型: ${escapeHtml(type || "未知")}</div>`;
  }

  listEl.appendChild(itemEl);
}

// 调用
(async () => {
  const res = await getBilibiliDynamic();
  const items = res?.data?.items || [];
  const listEl = document.getElementById("list");

  if (listEl) {
    listEl.innerHTML = "";
  }

  items.forEach(renderItem);

  // const cookieEl = document.getElementById("cookie");
  // if (cookieEl) {
  //   cookieEl.textContent = json_str(res);
  // }
})();
