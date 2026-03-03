/* ============================================================
   MAISON AURA — Main JavaScript v9 (Redesign)
   ============================================================ */

(function() {
  'use strict';

  /* ---- Header scroll behavior ---- */
  const header = document.getElementById('header');
  window.addEventListener('scroll', () => {
    header.classList.toggle('scrolled', window.scrollY > 60);
  }, { passive: true });

  /* ---- Hamburger ---- */
  const hamburger = document.getElementById('hamburger');
  const nav = document.getElementById('nav');
  if (hamburger && nav) {
    hamburger.addEventListener('click', () => {
      hamburger.classList.toggle('open');
      nav.classList.toggle('open');
    });
  }

  /* ---- Hero Parallax (rAF-based) ---- */
  const heroImg = document.getElementById('heroImg');
  if (heroImg) {
    let ticking = false;
    window.addEventListener('scroll', () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          const scrollY = window.scrollY;
          if (scrollY < window.innerHeight * 1.5) {
            heroImg.style.transform = `translateY(${scrollY * 0.3}px) scale(1.08)`;
          }
          ticking = false;
        });
        ticking = true;
      }
    }, { passive: true });
  }

  /* ---- Lerp Parallax for Concept image ---- */
  const conceptImgWrap = document.getElementById('conceptImgWrap');
  const conceptImg = conceptImgWrap ? conceptImgWrap.querySelector('.concept-img') : null;

  if (conceptImg) {
    let lerpCurrent = 0;
    let lerpTarget = 0;

    function lerpParallax() {
      const rect = conceptImgWrap.getBoundingClientRect();
      const viewH = window.innerHeight;

      // Only animate when section is in view
      if (rect.bottom > 0 && rect.top < viewH) {
        const progress = (viewH - rect.top) / (viewH + rect.height);
        lerpTarget = (progress - 0.5) * 60; // ±30px range
      }

      lerpCurrent += (lerpTarget - lerpCurrent) * 0.08;
      conceptImg.style.transform = `translateY(${lerpCurrent.toFixed(2)}px) scale(1.12)`;
      requestAnimationFrame(lerpParallax);
    }
    lerpParallax();
  }

  /* ---- Hero Title Line Animation ---- */
  document.querySelectorAll('.hero-line').forEach((line, i) => {
    line.style.setProperty('--delay', `${0.2 + i * 0.18}s`);
    setTimeout(() => { line.classList.add('revealed'); }, (0.2 + i * 0.18) * 1000);
  });

  /* ---- Scroll Reveal (Intersection Observer) with clipPath ---- */
  const revealEls = document.querySelectorAll('[data-reveal]');

  function revealEl(el) {
    if (el.classList.contains('revealed')) return;
    const delay = el.style.getPropertyValue('--delay') || '0s';
    setTimeout(() => { el.classList.add('revealed'); }, parseFloat(delay) * 1000);
  }

  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        revealEl(entry.target);
        revealObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1, rootMargin: '0px 0px -30px 0px' });

  revealEls.forEach(el => revealObserver.observe(el));

  // Fallback: immediately reveal elements already in viewport on load
  // (belt-and-suspenders for IntersectionObserver timing with clip-path)
  function checkReveal() {
    revealEls.forEach(el => {
      if (!el.classList.contains('revealed')) {
        const r = el.getBoundingClientRect();
        if (r.top < window.innerHeight - 30 && r.bottom > 0) revealEl(el);
      }
    });
  }

  requestAnimationFrame(() => { requestAnimationFrame(checkReveal); });

  // Scroll fallback (covers IntersectionObserver edge cases across all environments)
  let revealScrollTicking = false;
  window.addEventListener('scroll', () => {
    if (!revealScrollTicking) {
      requestAnimationFrame(() => { checkReveal(); revealScrollTicking = false; });
      revealScrollTicking = true;
    }
  }, { passive: true });

  /* ---- Smooth scroll for anchors ---- */
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', (e) => {
      const target = document.querySelector(anchor.getAttribute('href'));
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        if (nav && nav.classList.contains('open')) {
          hamburger.classList.remove('open');
          nav.classList.remove('open');
        }
      }
    });
  });

  /* ---- Commission form AJAX submission ---- */
  const commissionForm = document.getElementById('commission-form');
  const commissionStatus = document.getElementById('commission-status');
  const commissionSubmit = document.getElementById('commission-submit');

  if (commissionForm && commissionStatus) {
    commissionForm.addEventListener('submit', async (e) => {
      e.preventDefault();
      commissionSubmit.textContent = '送信中...';
      commissionSubmit.disabled = true;

      try {
        const data = Object.fromEntries(new FormData(commissionForm));
        const res = await fetch('/api/contact', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(data),
        });

        if (res.ok) {
          commissionForm.style.display = 'none';
          commissionStatus.style.cssText = 'display:block;background:#f0faf4;border:1px solid #a8d5b5;color:#1a6b35;padding:16px;border-radius:6px;font-size:14px';
          commissionStatus.innerHTML = '<strong>ありがとうございます！</strong><br>お問い合わせを受け付けました。<br>通常48時間以内にご返信いたします。';
        } else {
          throw new Error('送信失敗');
        }
      } catch {
        commissionSubmit.textContent = '無料相談を申し込む →';
        commissionSubmit.disabled = false;
        commissionStatus.style.cssText = 'display:block;background:#fff0f0;border:1px solid #f5c6c6;color:#c0392b;padding:16px;border-radius:6px;font-size:14px';
        commissionStatus.textContent = '送信に失敗しました。直接メールでご連絡ください: support@irohani.tech';
      }
    });
  }

})();
