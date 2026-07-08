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

// 调用
(async () => {
  const res = await getBilibiliDynamic();
  // console.log("返回数据：", json_str(res));

  const items = res?.data?.items || [];
  // console.log("items: ", json_str(items));

  for (const item of items) {
    console.log("================================");
    const link = item?.modules?.module_dynamic?.major?.archive?.bvid || "";
    const title = item?.modules?.module_dynamic?.major?.archive?.title || "";
    const up_name = item?.modules?.module_author?.name || "";
    const avater = item?.modules?.module_author?.face || "";
    const pub_time = item?.modules?.module_author?.pub_time || "";
    const type = item?.modules?.module_dynamic?.major?.type || "";

    console.log("link: ", link);
    console.log("title: ", title);
    console.log("up_name: ", up_name);
    console.log("avater: ", avater);
    console.log("pub_time: ", pub_time);
    console.log("type: ", type);

    switch (type) {
      case "AUTHOR_TYPE_NORMAL":
        break;
      default:
        break;
    }
  }

  document.getElementById("cookie").textContent = json_str(res);
})();
