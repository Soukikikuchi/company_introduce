/* ブラウザテスト用のJavaScript */
document.addEventListener('DOMContentLoaded', function() {
  // レスポンシブテスト用のインジケーターを表示
  const indicator = document.querySelector('.responsive-test-indicator');
  
  // 画面サイズの変更を検知して表示を更新
  function updateScreenSizeInfo() {
    const width = window.innerWidth;
    const height = window.innerHeight;
    indicator.setAttribute('title', `画面サイズ: ${width}px × ${height}px`);
  }
  
  // 初期表示と画面サイズ変更時に情報を更新
  updateScreenSizeInfo();
  window.addEventListener('resize', updateScreenSizeInfo);
  
  // リンクのテスト
  const links = document.querySelectorAll('a');
  links.forEach(link => {
    if (link.getAttribute('href') === '#') {
      link.addEventListener('click', function(e) {
        e.preventDefault();
        console.log('リンクがクリックされました:', this.textContent);
      });
    }
  });
  
  // フォームのテスト
  const form = document.querySelector('form');
  if (form) {
    form.addEventListener('submit', function(e) {
      e.preventDefault();
      console.log('フォームが送信されました');
      
      // フォームの入力値を検証
      const inputs = this.querySelectorAll('input, textarea');
      let isValid = true;
      
      inputs.forEach(input => {
        if (input.hasAttribute('required') && !input.value) {
          input.classList.add('is-invalid');
          isValid = false;
        } else {
          input.classList.remove('is-invalid');
        }
      });
      
      if (isValid) {
        console.log('フォームの検証に成功しました');
        // 成功メッセージを表示
        const successMessage = document.createElement('div');
        successMessage.className = 'alert alert-success mt-3';
        successMessage.textContent = 'お問い合わせありがとうございます。担当者より連絡いたします。';
        form.appendChild(successMessage);
        
        // 3秒後にメッセージを消す
        setTimeout(() => {
          successMessage.remove();
        }, 3000);
      } else {
        console.log('フォームの検証に失敗しました');
      }
    });
  }
  
  // スクロール時のヘッダー変更テスト
  const header = document.querySelector('.header');
  if (header) {
    window.addEventListener('scroll', function() {
      if (window.scrollY > 50) {
        header.classList.add('scrolled');
      } else {
        header.classList.remove('scrolled');
      }
    });
  }
  
  // アニメーション要素のテスト
  const animatedElements = document.querySelectorAll('.fade-in');
  
  // Intersection Observerを使用して要素が表示されたらアニメーションを開始
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = '1';
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1 });
  
  animatedElements.forEach(element => {
    observer.observe(element);
  });
});
