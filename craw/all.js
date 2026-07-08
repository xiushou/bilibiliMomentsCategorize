// fetch(
//   "https://api.bilibili.com/x/polymer/web-dynamic/v1/feed/all?timezone_offset=-480&type=all&platform=web&offset=1214599979474092040&page=3&features=itemOpusStyle,listOnlyfans,opusBigCover,onlyfansVote,decorationCard,onlyfansAssetsV2,forwardListHidden,ugcDelete,onlyfansQaCard,commentsNewVersion,avatarAutoTheme,sunflowerStyle,cardsEnhance,eva3CardOpus,eva3CardVideo,eva3CardComment,eva3CardVote,eva3CardUser&web_location=333.1365&x-bili-device-req-json=%7B%22platform%22:%22web%22,%22device%22:%22pc%22,%22spmid%22:%22333.1365%22%7D",
//   {
//     headers: {
//       accept: "*/*",
//       "accept-language": "zh-CN,zh;q=0.9,en-US;q=0.8,en;q=0.7,en-GB;q=0.6",
//       "cache-control": "no-cache",
//       pragma: "no-cache",
//       priority: "u=1, i",
//       "sec-ch-ua":
//         '"Microsoft Edge";v="149", "Chromium";v="149", "Not)A;Brand";v="24"',
//       "sec-ch-ua-mobile": "?0",
//       "sec-ch-ua-platform": '"Windows"',
//       "sec-fetch-dest": "empty",
//       "sec-fetch-mode": "cors",
//       "sec-fetch-site": "same-site",
//       cookie:
//         "buvid3=543980D8-2A56-A116-03C5-6E1028EE191075537infoc; b_nut=1781447275; _uuid=CFACC66E-3D9C-76A1-9CE2-86533287710C976732infoc; CURRENT_QUALITY=0; buvid4=37A0EC8B-16D9-1EA9-550A-550DC3B5337677119-026061422-tzq4fWFGsOg1At9aTNYMpA%3D%3D; buvid_fp=66dedd7bea1ca994d04bea4da7f172ec; rpdid=|(J|lYYklku|0J'u~)uRR~k~~; SESSDATA=6172f6c1%2C1796999307%2C95ae3%2A62CjALHV6m060MOsx2JqKohojM982lE7lEzAASDTk2JXECxekinPOCkbaF1-cZBzLzyM4SVnM1Z2Y3eVZIUDU2b3dWV2NZX2NGempzMzMwQ1NnckJtX25XSHVKZ2xaUTFkRFZhbzloTDJreGQ0VUcwSjFhU3RrZ1R3MGtXSnFJTmwwdjNob0F2LWJnIIEC; bili_jct=a208e0c24c4ec854e914e4543320b488; DedeUserID=527572659; DedeUserID__ckMd5=f2cbab29c9733e33; sid=6zs9o706; theme-tip-show=SHOWED; home_feed_column=5; browser_resolution=1466-746; theme-avatar-tip-show=SHOWED; CURRENT_FNVAL=4048; hit-dyn-v2=1; bili_ticket=eyJhbGciOiJIUzI1NiIsImtpZCI6InMwMyIsInR5cCI6IkpXVCJ9.eyJleHAiOjE3ODE5NjA1NDgsImlhdCI6MTc4MTcwMTI4OCwicGx0IjotMX0.bgNiB2FBrYj3FVOO5YdSj9fYrL9ZUecNYCXt4Qpksno; bili_ticket_expires=1781960488; bp_t_offset_527572659=1214887119500083200; b_lsid=CFF1EB0F_19ED5AE38EF",
//       Referer: "https://t.bilibili.com/?spm_id_from=333.1007.0.0",
//     },
//     body: null,
//     method: "GET",
//   },
// );

// Node.js 18+ 直接运行，无需安装依赖
async function getBilibiliDynamic() {
  try {
    const res = await fetch(
      // "https://api.bilibili.com/x/polymer/web-dynamic/v1/feed/all?timezone_offset=-480&type=all&platform=web&offset=1214599979474092040&page=3&features=itemOpusStyle,listOnlyfans,opusBigCover,onlyfansVote,decorationCard,onlyfansAssetsV2,forwardListHidden,ugcDelete,onlyfansQaCard,commentsNewVersion,avatarAutoTheme,sunflowerStyle,cardsEnhance,eva3CardOpus,eva3CardVideo,eva3CardComment,eva3CardVote,eva3CardUser&web_location=333.1365&x-bili-device-req-json=%7B%22platform%22:%22web%22,%22device%22:%22pc%22,%22spmid%22:%22333.1365%22%7D",
      'https://api.bilibili.com/x/polymer/web-dynamic/v1/feed/all?timezone_offset=-480&type=all&platform=web&offset=1214591385237192711&x-bili-device-req-json={"platform":"web","device":"pc"}',
      {
        headers: {
          accept: "*/*",
          "accept-language": "zh-CN,zh;q=0.9,en-US;q=0.8,en;q=0.7,en-GB;q=0.6",
          "cache-control": "no-cache",
          pragma: "no-cache",
          priority: "u=1, i",
          "sec-ch-ua":
            '"Microsoft Edge";v="149", "Chromium";v="149", "Not)A;Brand";v="24"',
          "sec-ch-ua-mobile": "?0",
          "sec-ch-ua-platform": '"Windows"',
          "sec-fetch-dest": "empty",
          "sec-fetch-mode": "cors",
          "sec-fetch-site": "same-site",
          cookie:
            "buvid3=543980D8-2A56-A116-03C5-6E1028EE191075537infoc; b_nut=1781447275; _uuid=CFACC66E-3D9C-76A1-9CE2-86533287710C976732infoc; CURRENT_QUALITY=0; buvid4=37A0EC8B-16D9-1EA9-550A-550DC3B5337677119-026061422-tzq4fWFGsOg1At9aTNYMpA%3D%3D; buvid_fp=66dedd7bea1ca994d04bea4da7f172ec; rpdid=|(J|lYYklku|0J'u~)uRR~k~~; SESSDATA=6172f6c1%2C1796999307%2C95ae3%2A62CjALHV6m060MOsx2JqKohojM982lE7lEzAASDTk2JXECxekinPOCkbaF1-cZBzLzyM4SVnM1Z2Y3eVZIUDU2b3dWV2NZX2NGempzMzMwQ1NnckJtX25XSHVKZ2xaUTFkRFZhbzloTDJreGQ0VUcwSjFhU3RrZ1R3MGtXSnFJTmwwdjNob0F2LWJnIIEC; bili_jct=a208e0c24c4ec854e914e4543320b488; DedeUserID=527572659; DedeUserID__ckMd5=f2cbab29c9733e33; sid=6zs9o706; theme-tip-show=SHOWED; home_feed_column=5; browser_resolution=1466-746; theme-avatar-tip-show=SHOWED; CURRENT_FNVAL=4048; hit-dyn-v2=1; bili_ticket=eyJhbGciOiJIUzI1NiIsImtpZCI6InMwMyIsInR5cCI6IkpXVCJ9.eyJleHAiOjE3ODE5NjA1NDgsImlhdCI6MTc4MTcwMTI4OCwicGx0IjotMX0.bgNiB2FBrYj3FVOO5YdSj9fYrL9ZUecNYCXt4Qpksno; bili_ticket_expires=1781960488; bp_t_offset_527572659=1214887119500083200; b_lsid=CFF1EB0F_19ED5AE38EF",
          Referer: "https://t.bilibili.com/?spm_id_from=333.1007.0.0",
        },
        method: "GET",
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

// 调用
(async () => {
  const res = await getBilibiliDynamic();
  console.log("返回数据：", JSON.stringify(res, null, 10));
})();
