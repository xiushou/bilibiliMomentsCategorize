// 设置的键名
const STORAGE_KEYS = {
  UP_GROUP: "bilibili_up_group_name",
};

// 初始化设置页面
document.addEventListener("DOMContentLoaded", () => {
  initializeSettings();
  setupEventListeners();
});

/**
 * 初始化设置页面 - 从chrome.storage加载值
 */
async function initializeSettings() {
  // 加载up分组设置
  const upGroupInput = document.getElementById("upGroupInput");

  try {
    const result = await chrome.storage.local.get(STORAGE_KEYS.UP_GROUP);
    if (result[STORAGE_KEYS.UP_GROUP]) {
      upGroupInput.value = result[STORAGE_KEYS.UP_GROUP];
    }
  } catch (error) {
    console.error("读取存储数据失败:", error);
  }
}

/**
 * 设置事件监听器
 */
function setupEventListeners() {
  // up分组输入框变化事件
  const upGroupInput = document.getElementById("upGroupInput");
  upGroupInput.addEventListener("input", (e) => {
    const value = e.target.value;
    saveUpGroupSetting(value);
  });

  // 分类切换事件（为未来扩展做准备）
  document.querySelectorAll(".category-item").forEach((item) => {
    item.addEventListener("click", (e) => {
      switchCategory(item.dataset.category);
    });
  });

  // 初始化时设置第一个分类为活跃
  const firstCategory = document.querySelector(".category-item");
  if (firstCategory) {
    firstCategory.classList.add("active");
  }
}

/**
 * 保存up分组设置到chrome.storage
 * @param {string} value - 分组名称
 */
async function saveUpGroupSetting(value) {
  try {
    await chrome.storage.local.set({ [STORAGE_KEYS.UP_GROUP]: value });
    console.log("已保存up分组设置:", value);
  } catch (error) {
    console.error("保存存储数据失败:", error);
  }
}

/**
 * 切换分类显示
 * @param {string} categoryId - 分类ID
 */
function switchCategory(categoryId) {
  // 隐藏所有内容
  document.querySelectorAll(".category-content").forEach((content) => {
    content.style.display = "none";
  });

  // 移除所有活跃状态
  document.querySelectorAll(".category-item").forEach((item) => {
    item.classList.remove("active");
  });

  // 显示选中的分类内容
  const selectedContent = document.getElementById(`${categoryId}-content`);
  if (selectedContent) {
    selectedContent.style.display = "block";
  }

  // 添加活跃状态到选中的分类
  document
    .querySelector(`[data-category="${categoryId}"]`)
    .classList.add("active");
}
