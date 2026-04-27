const appData = {
  // 이번 달에 표시할 주차 (기본 4주 혹은 5주 설정 가능)
  currentMonthWeeks: 4,
  
  // 주차별 묵상 파일 링크.
  // 나중에 구글 드라이브 링크가 새로 나오면 아래 문자열 부분만 수정하시면 됩니다.
  // 기본 요구사항에 맞추어 임시로 동일한 URL을 넣어두겠습니다.
  devotionalLinks: {
    week1: {
      ko: "https://drive.google.com/file/d/1MkPRFdtaMldB0v0oXJhx_U_KsgiL2l4m/view?usp=sharing",
      en: "https://drive.google.com/file/d/1MkPRFdtaMldB0v0oXJhx_U_KsgiL2l4m/view?usp=sharing",
      zh: "https://drive.google.com/file/d/1MkPRFdtaMldB0v0oXJhx_U_KsgiL2l4m/view?usp=sharing",
      es: "https://drive.google.com/file/d/1MkPRFdtaMldB0v0oXJhx_U_KsgiL2l4m/view?usp=sharing",
      pt: "https://drive.google.com/file/d/1MkPRFdtaMldB0v0oXJhx_U_KsgiL2l4m/view?usp=sharing",
      tl: "https://drive.google.com/file/d/1MkPRFdtaMldB0v0oXJhx_U_KsgiL2l4m/view?usp=sharing"
    },
    week2: {
      ko: "https://drive.google.com/file/d/1MkPRFdtaMldB0v0oXJhx_U_KsgiL2l4m/view?usp=sharing",
      en: "https://drive.google.com/file/d/1MkPRFdtaMldB0v0oXJhx_U_KsgiL2l4m/view?usp=sharing",
      zh: "https://drive.google.com/file/d/1MkPRFdtaMldB0v0oXJhx_U_KsgiL2l4m/view?usp=sharing",
      es: "https://drive.google.com/file/d/1MkPRFdtaMldB0v0oXJhx_U_KsgiL2l4m/view?usp=sharing",
      pt: "https://drive.google.com/file/d/1MkPRFdtaMldB0v0oXJhx_U_KsgiL2l4m/view?usp=sharing",
      tl: "https://drive.google.com/file/d/1MkPRFdtaMldB0v0oXJhx_U_KsgiL2l4m/view?usp=sharing"
    },
    week3: {
      ko: "https://drive.google.com/file/d/1MkPRFdtaMldB0v0oXJhx_U_KsgiL2l4m/view?usp=sharing",
      en: "https://drive.google.com/file/d/1MkPRFdtaMldB0v0oXJhx_U_KsgiL2l4m/view?usp=sharing",
      zh: "https://drive.google.com/file/d/1MkPRFdtaMldB0v0oXJhx_U_KsgiL2l4m/view?usp=sharing",
      es: "https://drive.google.com/file/d/1MkPRFdtaMldB0v0oXJhx_U_KsgiL2l4m/view?usp=sharing",
      pt: "https://drive.google.com/file/d/1MkPRFdtaMldB0v0oXJhx_U_KsgiL2l4m/view?usp=sharing",
      tl: "https://drive.google.com/file/d/1MkPRFdtaMldB0v0oXJhx_U_KsgiL2l4m/view?usp=sharing"
    },
    week4: {
      ko: "https://drive.google.com/file/d/1MkPRFdtaMldB0v0oXJhx_U_KsgiL2l4m/view?usp=sharing",
      en: "https://drive.google.com/file/d/1MkPRFdtaMldB0v0oXJhx_U_KsgiL2l4m/view?usp=sharing",
      zh: "https://drive.google.com/file/d/1MkPRFdtaMldB0v0oXJhx_U_KsgiL2l4m/view?usp=sharing",
      es: "https://drive.google.com/file/d/1MkPRFdtaMldB0v0oXJhx_U_KsgiL2l4m/view?usp=sharing",
      pt: "https://drive.google.com/file/d/1MkPRFdtaMldB0v0oXJhx_U_KsgiL2l4m/view?usp=sharing",
      tl: "https://drive.google.com/file/d/1MkPRFdtaMldB0v0oXJhx_U_KsgiL2l4m/view?usp=sharing"
    },
    week5: {
      ko: "https://drive.google.com/file/d/1MkPRFdtaMldB0v0oXJhx_U_KsgiL2l4m/view?usp=sharing",
      en: "https://drive.google.com/file/d/1MkPRFdtaMldB0v0oXJhx_U_KsgiL2l4m/view?usp=sharing",
      zh: "https://drive.google.com/file/d/1MkPRFdtaMldB0v0oXJhx_U_KsgiL2l4m/view?usp=sharing",
      es: "https://drive.google.com/file/d/1MkPRFdtaMldB0v0oXJhx_U_KsgiL2l4m/view?usp=sharing",
      pt: "https://drive.google.com/file/d/1MkPRFdtaMldB0v0oXJhx_U_KsgiL2l4m/view?usp=sharing",
      tl: "https://drive.google.com/file/d/1MkPRFdtaMldB0v0oXJhx_U_KsgiL2l4m/view?usp=sharing"
    }
  },
  
  // 유튜브 관련 링크들
  youtubeLinks: {
    shorts: "https://www.youtube.com/@PrisonRevival/shorts",
    intro: "https://youtu.be/oG_jy34D42M?si=3NAyzb4s9bjkmnjU",
    anniversary: "https://youtu.be/qiTprhhuOSs?si=RQMHR9R1iV50CaZo",
    meditation: "https://www.youtube.com/playlist?list=PLY8ptMzVZp7V4DslzbPFEsJA73cu5hvcX",
    inside: "https://www.youtube.com/playlist?list=PLY8ptMzVZp7V4DWZ4Zn5EpKohvzgGCIkV",
    angeltree: "https://www.youtube.com/playlist?list=PLY8ptMzVZp7VbyoLKBaEJV0XkCLp2PTzQ"
  },
  
  // 메인 랜딩 유튜브 영상 ID
  mainVideoId: "oG_jy34D42M",

  // 소개 페이지용 링크들
  introLinks: {
    pastorVideo: "https://youtu.be/46SzM3kF2Y8?si=uPzwe5dRQ7XqDRDK",
    press: {
      lawToday: "https://www.lawtoday.co.kr/news/articleView.html?idxno=321",
      goodNews: "https://www.goodnews1.com/news/articleView.html?idxno=441689"
    },
    partners: {
      samintl: "https://samintl.net/",
      godpeople: "https://cnts.godpeople.com/",
      kyujang: "https://www.kyujang.com/",
      iseum: "https://iseum.or.kr/",
      jusomang: "https://www.youtube.com/@%EC%98%81%EB%93%B1%ED%8F%AC%EB%AC%B4%EB%A3%8C%EA%B8%89%EC%8B%9D",
      alliance: "https://prisonalliance.org/about/",
      fellowship: "https://www.prisonfellowship.org/"
    }
  }
};
