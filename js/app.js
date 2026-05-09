let currentLang = 'ko';
const supportedLangs = ['ko', 'en', 'zh', 'es', 'pt', 'tl'];

document.addEventListener('DOMContentLoaded', () => {
  initLanguage();
  applyTranslations();
  setupLanguageSelector();
  initImageModal();
  
  if (document.getElementById('devotional-container')) {
    renderDevotionalButtons();
  }

  if (document.getElementById('weekly-meditation-container')) {
    renderWeeklyMeditationButtons();
    renderYearlyMeditationArchive();
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

        // 모바일 메뉴가 열려있다면 클릭 후 닫기
        const navMenu = document.querySelector('.nav-menu');
        if (navMenu && navMenu.classList.contains('active')) {
          navMenu.classList.remove('active');
        }
      }
    });
  });

  // Dropdown smooth close on click of sub-menu items
  document.querySelectorAll('.dropdown').forEach(dropdown => {
    const menuLinks = dropdown.querySelectorAll('.dropdown-menu a');
    
    menuLinks.forEach(link => {
      link.addEventListener('click', () => {
        dropdown.classList.add('force-hide');
      });
    });

    // Cleanup states on mouseleave
    dropdown.addEventListener('mouseleave', () => {
      dropdown.classList.remove('force-hide');
      dropdown.classList.remove('desktop-active');
    });
  });

  // Mobile & Desktop Dropdown Toggle Logic
  document.querySelectorAll('.dropdown-toggle').forEach(toggle => {
    toggle.addEventListener('click', function(e) {
      const dropdown = this.closest('.dropdown');
      if (dropdown) {
        // Dropdown toggles should not navigate to their href
        e.preventDefault();
        e.stopPropagation();
        
        if (window.innerWidth <= 768) {
          // Mobile: toggle
          dropdown.classList.toggle('mobile-active');
        } else {
          // Desktop: ensure it's open and stays open (user said "또 클릭하면 접혀지지 않도록")
          dropdown.classList.add('desktop-active');
        }
      }
    });
  });
});

// 모바일 메뉴 토글 함수
function toggleMenu() {
  const navMenu = document.querySelector('.nav-menu');
  if (navMenu) {
    navMenu.classList.toggle('active');
  }
}

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
      if (document.getElementById('weekly-meditation-container')) {
        renderWeeklyMeditationButtons();
        renderYearlyMeditationArchive();
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
      el.innerHTML = t[key];
    }
  });

  // 이미지 다국어 처리 (data-i18n-src)
  const imgElements = document.querySelectorAll('[data-i18n-src]');
  imgElements.forEach(img => {
    const key = img.getAttribute('data-i18n-src');
    if (t[key]) {
      img.src = t[key];
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

/**
 * 이미지 모달(라이트박스) 초기화
 */
function initImageModal() {
  const images = document.querySelectorAll('.program-img-col img');
  if (images.length === 0) return;

  // 모달 요소가 없으면 생성
  let modal = document.getElementById('imageModal');
  if (!modal) {
    modal = document.createElement('div');
    modal.id = 'imageModal';
    modal.className = 'modal';
    modal.innerHTML = `
      <span class="modal-close">&times;</span>
      <img class="modal-content" id="modalImage">
    `;
    document.body.appendChild(modal);
  }

  const modalImg = document.getElementById('modalImage');
  const closeBtn = modal.querySelector('.modal-close');

  images.forEach(img => {
    img.onclick = function() {
      modal.style.display = "flex";
      modalImg.src = this.src;
      document.body.style.overflow = 'hidden'; // 스크롤 방지
    }
  });

  function closeModal() {
    modal.style.display = "none";
    document.body.style.overflow = 'auto'; // 스크롤 복원
  }

  closeBtn.onclick = closeModal;
  modal.onclick = function(e) {
    if (e.target === modal) {
      closeModal();
    }
  };

  // ESC 키로 닫기
  document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape' && modal.style.display === "flex") {
      closeModal();
    }
  });
}

/**
 * 최근 5주치 묵상 자료 렌더링
 */
function renderWeeklyMeditationButtons() {
  const container = document.getElementById('weekly-meditation-container');
  if (!container) return;
  container.innerHTML = ''; 

  const t = translations[currentLang] || translations['ko'];
  const sundays = [];
  const today = new Date();
  
  // 가장 최근 일요일 찾기 (오늘이 일요일이면 오늘 포함)
  const lastSunday = new Date(today);
  lastSunday.setDate(today.getDate() - today.getDay());
  lastSunday.setHours(0, 0, 0, 0);

  for (let i = 0; i < 5; i++) {
    const d = new Date(lastSunday);
    d.setDate(lastSunday.getDate() - (i * 7));
    sundays.push(d);
  }

  sundays.forEach((date, index) => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    const dateStr = `${year}-${month}-${day}`;
    
    // 버튼 라벨: 언어별 현지화 날짜 포맷
    let dateLabel = '';
    if (currentLang === 'ko') {
      dateLabel = `${year}년 ${month}월 ${day}일`;
    } else {
      const options = { year: 'numeric', month: 'long', day: 'numeric' };
      dateLabel = date.toLocaleDateString(currentLang === 'zh' ? 'zh-CN' : currentLang, options);
    }
    const label = `${dateLabel}${t['meditationDateSuffix'] || (currentLang === 'ko' ? ' 묵상' : ' Devotional')}`;

    const btnBox = document.createElement('div');
    btnBox.className = 'btn-box';
    
    const btn = document.createElement('button');
    btn.className = 'download-btn';
    btn.innerHTML = `<span>${dateLabel}</span>`;
    
    btn.addEventListener('click', () => {
      const linkData = appData.weeklyMeditationLinks[dateStr];
      const link = linkData ? linkData[currentLang] : null;
      if (link) {
        window.open(link, '_blank');
      } else {
        alert(currentLang === 'ko' ? "해당 날짜의 자료를 준비 중입니다." : "Materials for this date are being prepared.");
      }
    });
    
    btnBox.appendChild(btn);
    container.appendChild(btnBox);
  });
}

/**
 * 2026년 연간 묵상 자료 아카이브 렌더링 (플로팅 UX 개선)
 */
function renderYearlyMeditationArchive() {
  const container = document.getElementById('yearly-meditation-container');
  if (!container) return;
  container.innerHTML = '';

  const hybridWrapper = document.createElement('div');
  hybridWrapper.className = 'archive-hybrid-container';

  // 1. 년도 행
  const yearRow = document.createElement('div');
  yearRow.className = 'year-pill-row';
  
  // 2. 플로팅 드롭다운 메뉴
  const floatingMenu = document.createElement('div');
  floatingMenu.className = 'archive-floating-menu';

  // 2-1. 월 컬럼
  const monthCol = document.createElement('div');
  monthCol.className = 'archive-column';
  monthCol.innerHTML = `<h4 data-i18n="archiveMonth">Month</h4>`;
  const monthMenu = document.createElement('div');
  monthMenu.className = 'vertical-menu';
  monthCol.appendChild(monthMenu);

  // 2-2. 일자 컬럼
  const dateCol = document.createElement('div');
  dateCol.className = 'archive-column';
  dateCol.innerHTML = `<h4 data-i18n="archiveDate">Date</h4>`;
  const dateMenu = document.createElement('div');
  dateMenu.className = 'vertical-menu';
  dateCol.appendChild(dateMenu);

  floatingMenu.appendChild(monthCol);
  floatingMenu.appendChild(dateCol);

  const years = [2026, 2025, 2024, 2023, 2022, 2021];

  years.forEach(year => {
    const yearPill = document.createElement('div');
    yearPill.className = 'archive-pill';
    yearPill.textContent = year;

    yearPill.addEventListener('mouseenter', (e) => {
      yearRow.querySelectorAll('.archive-pill').forEach(p => p.classList.remove('active'));
      yearPill.classList.add('active');
      
      // 메뉴 내용 업데이트
      updateMonthMenu(year, monthMenu, dateMenu);
      
      // 위치 계산 및 표시
      const rect = yearPill.getBoundingClientRect();
      const containerRect = hybridWrapper.getBoundingClientRect();
      
      // 알약의 중앙에 메뉴가 오도록 계산 (최대/최소 범위 제한)
      let leftPos = (rect.left - containerRect.left) + (rect.width / 2) - 225; // 225는 메뉴 너비의 절반
      if (leftPos < 0) leftPos = 0;
      if (leftPos + 450 > containerRect.width) leftPos = containerRect.width - 450;
      
      floatingMenu.style.left = `${leftPos}px`;
      floatingMenu.classList.add('active');
    });

    yearRow.appendChild(yearPill);
  });

  // 컨테이너 밖으로 마우스가 나가면 메뉴 닫기
  hybridWrapper.addEventListener('mouseleave', () => {
    floatingMenu.classList.remove('active');
    yearRow.querySelectorAll('.archive-pill').forEach(p => p.classList.remove('active'));
  });

  hybridWrapper.appendChild(yearRow);
  hybridWrapper.appendChild(floatingMenu);
  container.appendChild(hybridWrapper);
}

/**
 * 특정 년도의 월 메뉴 업데이트
 */
function updateMonthMenu(year, monthMenu, dateMenu) {
  monthMenu.innerHTML = '';
  const today = new Date();
  const endMonth = (today.getFullYear() === year) ? today.getMonth() : 11;

  for (let m = endMonth; m >= 0; m--) {
    const monthItem = document.createElement('div');
    monthItem.className = 'archive-item';
    monthItem.textContent = currentLang === 'ko' ? `${m + 1}월` : new Date(year, m).toLocaleString(currentLang, { month: 'long' });

    monthItem.addEventListener('mouseenter', () => {
      monthMenu.querySelectorAll('.archive-item').forEach(i => i.classList.remove('active'));
      monthItem.classList.add('active');
      updateDateMenu(year, m, dateMenu);
    });

    monthMenu.appendChild(monthItem);
  }
}

/**
 * 특정 년도/월의 일자 메뉴 업데이트
 */
function updateDateMenu(year, month, dateMenu) {
  dateMenu.innerHTML = '';
  const sundays = getSundaysOfMonth(year, month);

  sundays.reverse().forEach(date => {
    const y = date.getFullYear();
    const m = String(date.getMonth() + 1).padStart(2, '0');
    const d = String(date.getDate()).padStart(2, '0');
    const dateStr = `${y}-${m}-${d}`;
    const linkData = appData.weeklyMeditationLinks[dateStr];
    
    const dateItem = document.createElement('div');
    dateItem.className = 'date-item';
    if (!linkData) {
      dateItem.style.opacity = '0.5';
      dateItem.style.borderStyle = 'dashed';
    }
    
    let dateLabel = '';
    if (currentLang === 'ko') {
      dateLabel = `${parseInt(m)}월 ${parseInt(d)}일`;
    } else {
      dateLabel = date.toLocaleDateString(currentLang, { month: 'short', day: 'numeric' });
    }
    
    dateItem.textContent = dateLabel;
    dateItem.addEventListener('click', () => {
      const link = linkData ? linkData[currentLang] : '#';
      if (link && link !== '#') {
        window.open(link, '_blank');
      } else {
        alert(currentLang === 'ko' ? "해당 날짜의 자료를 준비 중입니다." : "Materials for this date are being prepared.");
      }
    });
    
    dateMenu.appendChild(dateItem);
  });
}

/**
 * 특정 연도/월의 모든 일요일 날짜 가져오기
 */
function getSundaysOfMonth(year, month) {
  const dates = [];
  const date = new Date(year, month, 1);
  while (date.getMonth() === month) {
    if (date.getDay() === 0) {
      dates.push(new Date(date));
    }
    date.setDate(date.getDate() + 1);
  }
  return dates;
}
