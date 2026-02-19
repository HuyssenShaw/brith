// ==========================================
// 功能1：实时更新时钟
// ==========================================
function updateTime() {
  const now = new Date();
  const timeString = now.toLocaleTimeString('zh-CN', {
    hour12: false,
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit'
  });
  document.getElementById('clock').textContent = timeString;
}
setInterval(updateTime, 1000); // 每秒更新一次
updateTime(); // 页面加载时立即显示

// ==========================================
// 功能2：滚动时卡片渐显动画
// ==========================================
const observerOptions = {
  threshold: 0.2 // 当卡片出现20%时触发动画
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
    }
  });
}, observerOptions);

// 监视所有的 message-box
document.querySelectorAll('.message-box').forEach(box => {
  observer.observe(box);
});

// ==========================================
// 功能3：点击页面任意位置放烟花
// ==========================================
function createFirework(x, y) {
  const firework = document.createElement('div');
  firework.style.position = 'fixed';
  firework.style.left = x + 'px';
  firework.style.top = y + 'px';
  firework.style.width = '8px';
  firework.style.height = '8px';
  firework.style.borderRadius = '50%';
  // 随机颜色（金色/粉色/白色为主，更有生日氛围）
  const colors = ['#ffd700', '#ff6b8b', '#ffffff', '#ff8e53', '#87CEEB'];
  firework.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
  firework.style.zIndex = '9999';
  firework.style.pointerEvents = 'none';
  document.body.appendChild(firework);

  // 烟花炸开动画
  setTimeout(() => {
    firework.style.transition = 'all 0.8s ease-out';
    firework.style.width = '150px';
    firework.style.height = '150px';
    firework.style.opacity = '0';
    firework.style.transform = 'scale(1.5)';
    firework.style.marginLeft = '-75px';
    firework.style.marginTop = '-75px';
  }, 10);

  // 移除烟花元素，防止内存泄漏
  setTimeout(() => {
    document.body.removeChild(firework);
  }, 800);
}

// 监听页面点击事件
document.addEventListener('click', (e) => {
  // 每次点击生成4个烟花，更有氛围感
  for (let i = 0; i < 4; i++) {
    // 让烟花稍微分散一点
    const offsetX = e.clientX + (Math.random() - 0.5) * 50;
    const offsetY = e.clientY + (Math.random() - 0.5) * 50;
    createFirework(offsetX, offsetY);
  }
});

// ==========================================
// 功能4：点击按钮切换祝福语
// ==========================================
// 【这里改祝福语列表】把引号里的内容换成你想说的话
const wishes = [
  "愿你岁岁年年，平安喜乐～",
  "新的一岁，暴富暴美！",
  "今天你最大，随便任性～",
  "生日快乐！我的超棒朋友✨",
  "愿你想要的都拥有！"
];
let wishIndex = 0;
const wishBtn = document.getElementById('wishBtn');
const wishText = document.getElementById('wishText');

wishBtn.addEventListener('click', () => {
  wishText.textContent = wishes[wishIndex];
  wishIndex = (wishIndex + 1) % wishes.length; // 循环切换

  // 按钮点击时的缩小动画
  wishBtn.style.transform = 'scale(0.95)';
  setTimeout(() => {
    wishBtn.style.transform = 'scale(1)';
  }, 100);
});

// ==========================================
// 功能5：许愿输入框交互
// ==========================================
const wishInput = document.getElementById('wishInput');
const submitWish = document.getElementById('submitWish');
const showWish = document.getElementById('showWish');

// 点击按钮提交愿望
submitWish.addEventListener('click', submitWishFunc);
// 按回车也能提交愿望
wishInput.addEventListener('keydown', (e) => {
  if (e.key === 'Enter') submitWishFunc();
});

function submitWishFunc() {
  const wish = wishInput.value.trim();
  if (wish) {
    showWish.textContent = `✨ 你的愿望：${wish} —— 一定会实现！`;
    wishInput.value = ''; // 清空输入框

    // 愿望显示时的闪烁动画
    showWish.style.animation = 'none';
    setTimeout(() => {
      showWish.style.animation = 'wishFlash 1s ease';
    }, 10);
  } else {
    showWish.textContent = '😜 还没输入愿望哦～';
  }
}

// 添加愿望闪烁动画的CSS
const style = document.createElement('style');
style.textContent = `
    @keyframes wishFlash {
        0%, 100% { opacity: 1; transform: scale(1); }
        50% { opacity: 0.8; transform: scale(1.05); }
    }
`;
document.head.appendChild(style);