// 要提取的关键字段（按你指定的顺序）
const REQUIRED_KEYS = ['SESSDATA', 'buvid3', 'buvid4', 'bili_jct', 'DedeUserID'];

// 获取所有 Bilibili Cookie 并按 key 去重（保留第一个）
async function fetchUniqueCookies() {
    const domains = [
        'https://www.bilibili.com',
        'http://www.bilibili.com',
    ];

    const allPromises = domains.map(url => chrome.cookies.getAll({url}).catch(() => []));
    const cookieLists = await Promise.all(allPromises);
    const allCookies = cookieLists.flat();

    // 去重：只保留第一个出现的 key
    const seen = new Set();
    const uniqueCookies = [];
    for (const cookie of allCookies) {
        if (!seen.has(cookie.name)) {
            seen.add(cookie.name);
            uniqueCookies.push(cookie);
        }
    }

    const cookieMap = new Map(uniqueCookies.map(c => [c.name, c]));
    return { cookieMap, uniqueCookies }; // ← 同时返回
}

// 渲染表格（只显示 REQUIRED_KEYS）
function renderTable(cookieMap) {
    const tbody = document.getElementById('tbody');
    tbody.innerHTML = '';

    REQUIRED_KEYS.forEach(key => {
        const cookie = cookieMap.get(key);
        const tr = document.createElement('tr');

        const tdKey = document.createElement('td');
        tdKey.textContent = key;

        const tdValue = document.createElement('td');
        tdValue.textContent = cookie ? cookie.value : '未获取到';
        tdValue.title = cookie ? cookie.value : ''; // 鼠标悬停显示完整值

        const tdAction = document.createElement('td');
        const copyBtn = document.createElement('button');
        copyBtn.className = 'copy-btn';
        copyBtn.textContent = '复制';
        copyBtn.onclick = async () => {
            const text = cookie ? `${key}=${cookie.value}` : '';
            if (!text) return;

            try {
                await navigator.clipboard.writeText(text);
                copyBtn.textContent = '已复制';
                copyBtn.classList.add('copied');
                setTimeout(() => {
                    copyBtn.textContent = '复制';
                    copyBtn.classList.remove('copied');
                }, 1000);
            } catch (err) {
                copyBtn.textContent = '失败';
                setTimeout(() => copyBtn.textContent = '复制', 1000);
            }
        };
        tdAction.appendChild(copyBtn);

        tr.appendChild(tdKey);
        tr.appendChild(tdValue);
        tr.appendChild(tdAction);
        tbody.appendChild(tr);
    });
}

// 生成单行 JSON 字符串（缺失字段留空）
function buildJsonString(cookieMap) {
    const pairs = REQUIRED_KEYS.map(key => {
        const value = cookieMap.get(key)?.value || '';
        return `"${key}": ${JSON.stringify(value)}`;
    });
    return `{ ${pairs.join(', ')} }`;
}

// 主加载逻辑
async function loadCookies() {
    const { cookieMap, uniqueCookies } = await fetchUniqueCookies(); // ← 解构
    renderTable(cookieMap);

    // 绑定 复制全部 按钮
    document.getElementById('copy-all-btn').onclick = async () => {
        if (uniqueCookies.length === 0) {
            alert('未获取到任何 Cookie');
            return;
        }
        // 格式：key1=value1 key2=value2 key3=value3 ...
        const text = uniqueCookies
            .map(c => `${c.name}=${c.value}`)
            .join('; '); // 单行，空格分隔

        try {
            await navigator.clipboard.writeText(text);
            const btn = document.getElementById('copy-all-btn');
            const original = btn.textContent;
            btn.textContent = '已复制';
            btn.disabled = true;
            setTimeout(function () {
                btn.disabled = false;
                return btn.textContent = original;
            }, 1000);
        } catch (err) {
            alert('复制失败，请允许剪贴板权限');
        }
    };

    // 绑定 复制JSON 按钮
    document.getElementById('copy-json-btn').onclick = async () => {
        const jsonStr = buildJsonString(cookieMap);
        try {
            await navigator.clipboard.writeText(jsonStr);
            const btn = document.getElementById('copy-json-btn');
            const original = btn.textContent;
            btn.textContent = '已复制';
            btn.disabled = true;
            setTimeout(function () {
                btn.disabled = false;
                return btn.textContent = original;
            }, 1000);
        } catch (err) {
            alert('复制失败，请允许剪贴板权限');
        }
    };
}

// 初始化
document.addEventListener('DOMContentLoaded', () => {
    document.getElementById('refresh-btn').onclick = loadCookies;
    loadCookies();

    // 首次安装自动显示帮助
    const hasShownHelp = localStorage.getItem('hasShownHelp');
    if (!hasShownHelp) {
        setTimeout(() => {
            document.getElementById('help-overlay').classList.add('active');
        }, 300); // 小延迟确保 DOM 渲染完成
        localStorage.setItem('hasShownHelp', 'true');
    }

    // 帮助按钮交互
    document.getElementById('help-btn').onclick = () => {
        document.getElementById('help-overlay').classList.add('active');
    };

    document.getElementById('close-help').onclick = () => {
        document.getElementById('help-overlay').classList.remove('active');
    };

    // 点击遮罩外区域关闭
    document.getElementById('help-overlay').onclick = (e) => {
        if (e.target === e.currentTarget) {
            e.currentTarget.classList.remove('active');
        }
    };
});
