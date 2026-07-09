async function get() {
  const res = await fetch(
    "https://api.bilibili.com/x/relation/tags?only_master=false&web_location=333.1387",
    {
      headers: {
        accept: "*/*",
        "accept-language": "zh-CN,zh;q=0.9,en-US;q=0.8,en;q=0.7,en-GB;q=0.6",
        "cache-control": "no-cache",
        pragma: "no-cache",
        priority: "u=1, i",
        "sec-ch-ua":
          '"Not;A=Brand";v="8", "Chromium";v="150", "Microsoft Edge";v="150"',
        "sec-ch-ua-mobile": "?0",
        "sec-ch-ua-platform": '"Windows"',
        "sec-fetch-dest": "empty",
        "sec-fetch-mode": "cors",
        "sec-fetch-site": "same-site",
        cookie:
          "buvid3=543980D8-2A56-A116-03C5-6E1028EE191075537infoc; b_nut=1781447275; _uuid=CFACC66E-3D9C-76A1-9CE2-86533287710C976732infoc; CURRENT_QUALITY=0; buvid4=37A0EC8B-16D9-1EA9-550A-550DC3B5337677119-026061422-tzq4fWFGsOg1At9aTNYMpA%3D%3D; buvid_fp=66dedd7bea1ca994d04bea4da7f172ec; rpdid=|(J|lYYklku|0J'u~)uRR~k~~; DedeUserID=527572659; DedeUserID__ckMd5=f2cbab29c9733e33; theme-tip-show=SHOWED; theme-avatar-tip-show=SHOWED; hit-dyn-v2=1; home_feed_column=5; SESSDATA=d9efa0c1%2C1799058339%2Cbdbf4%2A72CjCagKRRuu99E3gFCQqjKwa5U_2mvGRR8QwQYp2Zwjo7OxnmwQhJOwTB7worah8tprASVnk3OHM0bk4tZWZzaG1TNE5YVUc0eWhPNGJsWkRKOEN5YjF2bnctZFlYZGZsUlMyZ0JxRWRhSVVVNjc3eFZ5bE50NS1mOVhQRFdQNGNyaHRmOXZCNm1RIIEC; bili_jct=e625d07e01aa80e0ddbe8e9f3eb6c525; bili_ticket=eyJhbGciOiJIUzI1NiIsImtpZCI6InMwMyIsInR5cCI6IkpXVCJ9.eyJleHAiOjE3ODM3ODI2MDgsImlhdCI6MTc4MzUyMzM0OCwicGx0IjotMX0.MK0FPjuF78kTvHd9y0bT4JNirvVwhK103FQkhmXXK_E; bili_ticket_expires=1783782548; CURRENT_FNVAL=4048; sid=8n3jeq3x; theme-switch-show=SHOWED; browser_resolution=1466-746; bp_t_offset_527572659=1222869823025840128; b_lsid=199C0559_19F44764C73",
        Referer:
          "https://space.bilibili.com/527572659/relation/follow?tagid=-10",
      },
      body: null,
      method: "GET",
    },
  );

  console.log(JSON.stringify(await res.json(), null, 10));
}

get();
