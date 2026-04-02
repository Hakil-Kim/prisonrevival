let currentLang = 'ko';
const supportedLangs = ['ko', 'en', 'zh', 'es', 'pt', 'tl'];

document.addEventListener('DOMContentLoaded', () => {
  initLanguage();
  applyTranslations();
  setupLanguageSelector();
  
  if (document.getElementById('devotional-container')) {
    renderDevotionalButtons();
  }
  
  const youtubeBtn = document.getElementById('youtube-btn');
  if (youtubeBtn) {
    youtubeBtn.addEventListener('click', () => {
      window.open(appData.youtubeDevotionalLink, '_blank');
    });
  }
});

function initLanguage() {
  const savedLang = localStorage.getItem('prisonRevivalLang');
  if (savedLang && supportedLangs.includes(savedLang)) {
    currentLang = savedLang;
  } else {
    // navigator.language 가져오기 (예: "ko-KR", "en-US")
    const browserLang = navigator.language.split('-')[0].toLowerCase();
    if (supportedLangs.includes(browserLang)) {
      currentLang = browserLang;
    } else {
      currentLang = 'ko'; // 기본 폴백 언어
    }
  }
  
  const langSelect = document.getElementById('lang-select');
  if (langSelect) {
    langSelect.value = currentLang;
  }
}

function setupLanguageSelector() {
  const langSelect = document.getElementById('lang-select');
  if (langSelect) {
    langSelect.addEventListener('change', (e) => {
      currentLang = e.target.value;
      localStorage.setItem('prisonRevivalLang', currentLang);
      applyTranslations();
      
      // 언어 변경 시 버튼을 다시 렌더링 할 필요 없이 링크 연결 시점에 currentLang을 참조하도록 구현하였음.
      // (혹은 버튼 텍스트가 번역되어야 하니 리렌더링 권장)
      if (document.getElementById('devotional-container')) {
        renderDevotionalButtons();
      }
    });
  }
}

function applyTranslations() {
  // 문서 내의 [data-i18n] 속성을 가진 모든 요소를 찾아서 텍스트 반영
  const elements = document.querySelectorAll('[data-i18n]');
  const t = translations[currentLang] || translations['ko'];
  
  elements.forEach(el => {
    const key = el.getAttribute('data-i18n');
    if (t[key]) {
      el.textContent = t[key];
    }
  });

  // title 동적 변경
  if (t['siteTitle']) {
    document.title = t['siteTitle'];
  }
}

function renderDevotionalButtons() {
  const container = document.getElementById('devotional-container');
  container.innerHTML = ''; // 초기화
  
  const t = translations[currentLang] || translations['ko'];
  
  for (let i = 1; i <= appData.currentMonthWeeks; i++) {
    const weekKey = `week${i}`;
    
    // 버튼 래퍼
    const btnBox = document.createElement('div');
    btnBox.className = 'btn-box';
    
    // 다운로드 버튼
    const btn = document.createElement('button');
    btn.className = 'download-btn';
    btn.textContent = t[weekKey] || `${i}주차 묵상`;
    
    // 클릭 시 링크 이동 로직
    btn.addEventListener('click', () => {
      const link = appData.devotionalLinks[weekKey][currentLang];
      if (link) {
        window.open(link, '_blank');
      } else {
        alert("Link not available yet.");
      }
    });
    
    btnBox.appendChild(btn);
    container.appendChild(btnBox);
  }
}
