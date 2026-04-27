let currentLang = 'ko';
const supportedLangs = ['ko', 'en', 'zh', 'es', 'pt', 'tl'];

document.addEventListener('DOMContentLoaded', () => {
  initLanguage();
  applyTranslations();
  setupLanguageSelector();
  
  if (document.getElementById('devotional-container')) {
    renderDevotionalButtons();
  }

  if (document.getElementById('pastorSlides')) {
    initPastorSlider();
  }

  // Smooth scroll for nav links
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      e.preventDefault();
      const targetId = this.getAttribute('href');
      const targetElement = document.querySelector(targetId);
      if (targetElement) {
        const headerOffset = 80;
        const elementPosition = targetElement.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

        window.scrollTo({
          top: offsetPosition,
          behavior: "smooth"
        });
      }
    });
  });
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

let sliderIndex = 1; // Start at 1 because of prepended clone
let sliderInterval;

// Expose functions globally for HTML onclick handlers
window.moveSlider = moveSlider;
window.goToSlide = goToSlide;

function initPastorSlider() {
  const slidesContainer = document.getElementById('pastorSlides');
  if (!slidesContainer) return;
  
  const originalSlides = Array.from(slidesContainer.children);
  const slideCount = originalSlides.length;
  
  // Clone first and last slides for infinite loop
  const firstClone = originalSlides[0].cloneNode(true);
  const lastClone = originalSlides[slideCount - 1].cloneNode(true);
  
  slidesContainer.appendChild(firstClone);
  slidesContainer.insertBefore(lastClone, slidesContainer.firstChild);
  
  // Initial position
  updateSlider(false); // No transition for initial setup

  const dotsContainer = document.getElementById('sliderDots');
  if (dotsContainer) {
    dotsContainer.innerHTML = ''; 
    for (let i = 0; i < slideCount; i++) {
      const dot = document.createElement('div');
      dot.className = i === 0 ? 'dot active' : 'dot';
      dot.addEventListener('click', () => goToSlide(i + 1));
      dotsContainer.appendChild(dot);
    }
  }
  
  startSlider();
  
  const sliderContainer = document.querySelector('.pastor-slider');
  if (sliderContainer) {
    sliderContainer.addEventListener('mouseenter', stopSlider);
    sliderContainer.addEventListener('mouseleave', startSlider);
  }
}

function startSlider() {
  stopSlider();
  if (!document.getElementById('pastorSlides')) return;
  sliderInterval = setInterval(() => {
    moveSlider(1);
  }, 2000); // 2 seconds interval
}

function stopSlider() {
  if (sliderInterval) clearInterval(sliderInterval);
}

function moveSlider(step) {
  const slidesContainer = document.getElementById('pastorSlides');
  if (!slidesContainer) return;
  
  sliderIndex += step;
  updateSlider(true);
  
  const slideCount = slidesContainer.children.length - 2; // Subtract clones
  
  // Handle loop jump after transition
  if (sliderIndex > slideCount) {
    setTimeout(() => {
      sliderIndex = 1;
      updateSlider(false);
    }, 1000); // Wait for transition duration (1s)
  } else if (sliderIndex < 1) {
    setTimeout(() => {
      sliderIndex = slideCount;
      updateSlider(false);
    }, 1000);
  }
  
  startSlider();
}

function goToSlide(index) {
  sliderIndex = index;
  updateSlider(true);
  startSlider();
}

function updateSlider(withTransition) {
  const slidesContainer = document.getElementById('pastorSlides');
  if (!slidesContainer) return;
  
  slidesContainer.style.transition = withTransition ? 'transform 1s cubic-bezier(0.4, 0, 0.2, 1)' : 'none';
  slidesContainer.style.transform = `translateX(-${sliderIndex * 100}%)`;
  
  // Update dots
  const slideCount = slidesContainer.children.length - 2;
  let activeIndex = sliderIndex - 1;
  if (sliderIndex > slideCount) activeIndex = 0;
  if (sliderIndex < 1) activeIndex = slideCount - 1;
  
  const dots = document.querySelectorAll('.dot');
  dots.forEach((dot, i) => {
    dot.classList.toggle('active', i === activeIndex);
  });
}
