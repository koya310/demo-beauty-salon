// ============================================
// スティッキーヘッダー
// ============================================
window.addEventListener('scroll', () => {
  const header = document.querySelector('header');
  if (window.scrollY > 50) {
    header.classList.add('scrolled');
  } else {
    header.classList.remove('scrolled');
  }
});

// ============================================
// スムーズスクロール
// ============================================
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function(e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      const headerHeight = document.querySelector('header').offsetHeight;
      const top = target.getBoundingClientRect().top + window.scrollY - headerHeight;
      window.scrollTo({ top, behavior: 'smooth' });
      
      // ハンバーガーメニューを閉じる
      const nav = document.querySelector('nav');
      if (nav.classList.contains('open')) {
        nav.classList.remove('open');
      }
    }
  });
});

// ============================================
// ハンバーガーメニュー
// ============================================
const hamburger = document.querySelector('.hamburger');
const nav = document.querySelector('nav');

if (hamburger) {
  hamburger.addEventListener('click', () => {
    nav.classList.toggle('open');
  });
}

// ============================================
// ウィンドウリサイズ時にメニューを閉じる
// ============================================
window.addEventListener('resize', () => {
  if (window.innerWidth > 768 && nav.classList.contains('open')) {
    nav.classList.remove('open');
  }
});
