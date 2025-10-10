(function () {
  // Apply saved theme early
  try {
    var savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'light' || savedTheme === 'dark') {
      document.documentElement.setAttribute('data-theme', savedTheme);
    }
  } catch (e) {}

  // Apply saved language early
  var defaultLang = 'id';
  var lang = defaultLang;
  try {
    var savedLang = localStorage.getItem('lang');
    if (savedLang === 'id' || savedLang === 'en') lang = savedLang;
  } catch (e) {}

  // Toggle menu mobile
  var toggle = document.querySelector('.nav-toggle');
  var links = document.querySelector('.nav-links');
  if (toggle && links) {
    toggle.addEventListener('click', function () {
      var isOpen = links.classList.toggle('open');
      toggle.setAttribute('aria-expanded', String(isOpen));
    });
    links.querySelectorAll('a').forEach(function (a) {
      a.addEventListener('click', function () {
        links.classList.remove('open');
        toggle.setAttribute('aria-expanded', 'false');
      });
    });
  }

  // IntersectionObserver untuk reveal animasi
  var observer = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting) {
        entry.target.classList.add('in-view');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });

  document.querySelectorAll('.reveal').forEach(function (el) { observer.observe(el); });

  // Smooth scroll untuk link internal
  document.querySelectorAll('a[href^="#"]').forEach(function (link) {
    link.addEventListener('click', function (e) {
      var targetId = this.getAttribute('href');
      if (targetId === '#') return;
      
      var targetElement = document.querySelector(targetId);
      if (targetElement) {
        e.preventDefault();
        
        // Hitung posisi target dengan offset untuk header sticky
        var headerHeight = document.querySelector('.site-header')?.offsetHeight || 0;
        var targetPosition = targetElement.offsetTop - headerHeight - 20;
        
        // Smooth scroll dengan fallback
        if ('scrollBehavior' in document.documentElement.style) {
          window.scrollTo({
            top: targetPosition,
            behavior: 'smooth'
          });
        } else {
          // Fallback untuk browser lama
          var startPosition = window.pageYOffset;
          var distance = targetPosition - startPosition;
          var duration = 800;
          var start = null;
          
          function animation(currentTime) {
            if (start === null) start = currentTime;
            var timeElapsed = currentTime - start;
            var run = easeInOutQuad(timeElapsed, startPosition, distance, duration);
            window.scrollTo(0, run);
            if (timeElapsed < duration) requestAnimationFrame(animation);
          }
          
          function easeInOutQuad(t, b, c, d) {
            t /= d / 2;
            if (t < 1) return c / 2 * t * t + b;
            t--;
            return -c / 2 * (t * (t - 2) - 1) + b;
          }
          
          requestAnimationFrame(animation);
        }
      }
    });
  });

  // Theme toggle handler
  var themeToggle = document.getElementById('themeToggle');
  if (themeToggle) {
    themeToggle.addEventListener('click', function () {
      var current = document.documentElement.getAttribute('data-theme');
      var next = current === 'dark' ? 'light' : 'dark';
      document.documentElement.setAttribute('data-theme', next);
      try { localStorage.setItem('theme', next); } catch (e) {}
    });
  }

  // Simple i18n dictionary
  var dict = {
    id: {
      'brand.name': 'Genesis',
      'nav.tentang': 'Tentang',
      'nav.sejarah': 'Sejarah',
      'nav.program': 'Program',
      'nav.berita': 'Berita',
      'nav.kegiatan': 'Kegiatan',
      'nav.tim': 'Tim',
      'nav.kontak_btn': 'Hubungi Kami',
      'ui.theme': 'Tema',
      'hero.title': 'Mewujudkan Dampak Nyata untuk Masyarakat',
      'hero.desc': 'Kami adalah organisasi yang berfokus pada pemberdayaan, pendidikan, dan kolaborasi lintas komunitas untuk masa depan yang keberlanjutan.',
      'hero.cta_program': 'Lihat Program',
      'hero.cta_join': 'Bergabung',
      'about.title': 'Tentang Kami',
      'about.desc': 'Kami berdiri untuk menjembatani akses pengetahuan dan sumber daya. Melalui program-program berbasis riset dan kolaborasi, kami menghadirkan solusi yang berpusat pada manusia.',
      'about.nilai_title': 'Nilai',
      'about.nilai_desc': 'Integritas, empati, inklusif, dan akuntabilitas dalam setiap langkah.',
      'about.visi_title': 'Visi',
      'about.visi_desc': 'Masyarakat berdaya yang mampu memimpin perubahan di lingkungannya.',
      'about.misi_title': 'Misi',
      'about.misi_desc': 'Menyediakan pendidikan, pelatihan, dan platform kolaborasi yang berdampak.',
      'contact.title': 'Siap Berkolaborasi?',
      'contact.desc': 'Hubungi kami untuk kemitraan, program, atau relawan.',
      'footer.rights': 'Semua hak dilindungi.'
    },
    en: {
      'brand.name': 'Genesis',
      'nav.tentang': 'About',
      'nav.sejarah': 'History',
      'nav.program': 'Programs',
      'nav.berita': 'News',
      'nav.kegiatan': 'Activities',
      'nav.tim': 'Team',
      'nav.kontak_btn': 'Contact Us',
      'ui.theme': 'Theme',
      'hero.title': 'Creating Real Impact for Society',
      'hero.desc': 'We focus on empowerment, education, and cross‑community collaboration for a sustainable future.',
      'hero.cta_program': 'See Programs',
      'hero.cta_join': 'Join',
      'about.title': 'About Us',
      'about.desc': 'We bridge access to knowledge and resources through research‑based programs and human‑centered collaboration.',
      'about.nilai_title': 'Values',
      'about.nilai_desc': 'Integrity, empathy, inclusivity, and accountability in every step.',
      'about.visi_title': 'Vision',
      'about.visi_desc': 'An empowered society able to lead change in its community.',
      'about.misi_title': 'Mission',
      'about.misi_desc': 'Provide education, training, and impactful collaboration platforms.',
      'contact.title': 'Ready to Collaborate?',
      'contact.desc': 'Contact us for partnerships, programs, or volunteering.',
      'footer.rights': 'All rights reserved.'
    }
  };

  function applyLang(nextLang) {
    var table = dict[nextLang] || dict[defaultLang];
    document.querySelectorAll('[data-i18n]').forEach(function (el) {
      var key = el.getAttribute('data-i18n');
      if (table[key]) el.textContent = table[key];
    });
    document.querySelectorAll('.lang-btn').forEach(function (btn) {
      btn.setAttribute('aria-pressed', String(btn.getAttribute('data-lang') === nextLang));
    });
  }

  // Initialize language UI
  applyLang(lang);
  document.querySelectorAll('.lang-btn').forEach(function (btn) {
    btn.addEventListener('click', function () {
      var next = this.getAttribute('data-lang');
      if (next && (next === 'id' || next === 'en')) {
        lang = next;
        try { localStorage.setItem('lang', lang); } catch (e) {}
        applyLang(lang);
      }
    });
  });

  // Back-to-top button
  var backTop = document.createElement('button');
  backTop.setAttribute('type', 'button');
  backTop.setAttribute('aria-label', 'Kembali ke atas');
  backTop.textContent = '↑';
  backTop.style.position = 'fixed';
  backTop.style.right = '16px';
  backTop.style.bottom = '16px';
  backTop.style.width = '40px';
  backTop.style.height = '40px';
  backTop.style.borderRadius = '999px';
  backTop.style.border = '1px solid var(--border)';
  backTop.style.background = 'var(--surface)';
  backTop.style.color = 'var(--text)';
  backTop.style.boxShadow = 'var(--shadow)';
  backTop.style.cursor = 'pointer';
  backTop.style.opacity = '0';
  backTop.style.transform = 'translateY(8px)';
  backTop.style.transition = 'opacity .2s ease, transform .2s ease';
  backTop.style.zIndex = '60';
  backTop.addEventListener('click', function () { window.scrollTo({ top: 0, behavior: 'smooth' }); });
  document.body.appendChild(backTop);

  window.addEventListener('scroll', function () {
    if (window.scrollY > 400) {
      backTop.style.opacity = '1';
      backTop.style.transform = 'translateY(0)';
    } else {
      backTop.style.opacity = '0';
      backTop.style.transform = 'translateY(8px)';
    }
  });

  // ===== News search & filter (berita.html) =====
  var searchInput = document.getElementById('newsSearch');
  var tagButtons = document.querySelectorAll('.tag-btn');
  var newsList = document.getElementById('newsList');
  if (newsList) {
    var activeTag = 'all';
    function normalize(s) { return (s || '').toLowerCase(); }
    function renderArticles(articles) {
      newsList.innerHTML = '';
      articles.forEach(function (a) {
        var articleEl = document.createElement('article');
        articleEl.className = 'card';
        articleEl.setAttribute('data-title', a.title);
        articleEl.setAttribute('data-author', a.author);
        articleEl.setAttribute('data-tags', (a.tags || []).join(','));
        var safeTitle = String(a.title || '').replace(/"/g,'&quot;');
        var dateStr = '';
        try { dateStr = new Date(a.date).toLocaleDateString('id-ID', { day: '2-digit', month: 'short', year: 'numeric' }); } catch(e) { dateStr = a.date || ''; }
        var primaryTag = (a.tags && a.tags[0]) ? ' · ' + a.tags[0] : '';
        articleEl.innerHTML = `
          <img src="${a.cover}" alt="${safeTitle}" width="640" height="360" loading="lazy" decoding="async">
          <h3><a class="link" href="artikel.html?id=${a.id}">${a.title}</a></h3>
          <p class="muted">${dateStr}${primaryTag}</p>
          <p>${a.summary}</p>
        `;
        newsList.appendChild(articleEl);
      });
    }
    function applyFilter() {
      var q = normalize(searchInput ? searchInput.value : '');
      var cards = newsList.querySelectorAll('.card');
      cards.forEach(function (card) {
        var title = normalize(card.getAttribute('data-title'));
        var author = normalize(card.getAttribute('data-author'));
        var tags = normalize(card.getAttribute('data-tags'));
        var matchQuery = !q || title.includes(q) || author.includes(q) || tags.includes(q);
        var matchTag = activeTag === 'all' || (tags.split(',').map(function (t){return t.trim();}).indexOf(activeTag.toLowerCase()) !== -1);
        card.style.display = (matchQuery && matchTag) ? '' : 'none';
      });
    }
    // Load news JSON (listing) and render
    fetch('data/news.json').then(function (r){ return r.json(); }).then(function (data){
      // Sort by date desc
      try { data.sort(function(a,b){ return new Date(b.date) - new Date(a.date); }); } catch(e){}
      renderArticles(data);
      applyFilter();
    }).catch(function(){ /* fallback: keep static markup if any */ });

    if (searchInput) {
      searchInput.addEventListener('input', applyFilter);
    }
    tagButtons.forEach(function (btn) {
      btn.addEventListener('click', function () {
        tagButtons.forEach(function (b){ b.setAttribute('aria-pressed','false'); });
        this.setAttribute('aria-pressed','true');
        activeTag = (this.getAttribute('data-tag') || 'all').toLowerCase();
        applyFilter();
      });
    });
  }
})();


