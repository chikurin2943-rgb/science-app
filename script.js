document.addEventListener('DOMContentLoaded', () => {
  
  // 1. ふわっと表示させるスクロール監視 (Intersection Observer)
  const fadeElements = document.querySelectorAll('.fade-in-up');

  const observerOptions = {
    root: null,          // ビューポート（画面）基準
    rootMargin: '0px 0px -50px 0px', // 画面下に少し入った段階で発動
    threshold: 0.15      // 要素が15%見えたら実行
  };

  const scrollObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        // 画面に入ったら .is-show を付与してアニメーションさせる
        entry.target.classList.add('is-show');
        // 一度表示されたら監視を解除（何度もちらつくのを防ぐ）
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);

  fadeElements.forEach(el => scrollObserver.observe(el));


  // 2. スクロールに応じたヘッダーの影・縮小変化
  const header = document.querySelector('.header');
  window.addEventListener('scroll', () => {
    if (window.scrollY > 20) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  });

});

// --- 学年フィルターの制御機能 ---
document.addEventListener('DOMContentLoaded', () => {
  const filterBtns = document.querySelectorAll('.filter-btn');
  const cards = document.querySelectorAll('.card[data-grade]');

  // 表示切り替え関数
  const filterGrade = (grade) => {
    // ボタンの見た目変更
    filterBtns.forEach(btn => {
      if (btn.getAttribute('data-filter') === grade) {
        btn.classList.add('active');
      } else {
        btn.classList.remove('active');
      }
    });

    // カードの表示・非表示
    cards.forEach(card => {
      const cardGrade = card.getAttribute('data-grade');
      if (grade === 'all' || cardGrade === grade) {
        card.style.display = 'flex';
      } else {
        card.style.display = 'none';
      }
    });
  };

  // ボタンクリック時の挙動
  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const targetGrade = btn.getAttribute('data-filter');
      filterGrade(targetGrade);
    });
  });

  // URLのパラメータ (?grade=1 など) を読み込んで初期表示を判定
  const urlParams = new URLSearchParams(window.location.search);
  const gradeParam = urlParams.get('grade');
  if (gradeParam) {
    filterGrade(gradeParam);
  }
});