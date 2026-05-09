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
  },

  // 발렌티어 안내 관련 링크
  volunteerGuideLinks: {
    kakaoSupport: "http://pf.kakao.com/_ptYAG/chat",
    chatRooms: {
      main: "https://invite.kakao.com/tc/AP7EYFnhfD",
      prayer: "https://invite.kakao.com/tc/ywidwLqV80",
      meditation: "https://invite.kakao.com/tc/OXPpjmI2Qf"
    }
  },

  // 담당자 안내 데이터
  contactManagers: [
    {
      role: "프리즌사역 협력 문의",
      org: "프리즌 리바이벌 & 엔젤트리",
      name: "오혁 대표",
      kakao: "Prisonrevival",
      email: "21davidoh@gmail.com",
      phone: "+82-10-5137-8822(먼저 문자로 연락 부탁드림)"
    },
    {
      role: "발렌티어 진행 및 프리즌 후원문의",
      name: "이은희 총괄팀장",
      kakao: "labella76",
      email: "labella76@daum.net",
      phone: "+82-10-2634-4656(먼저 문자로 연락 부탁드림)"
    },
    {
      role: "신규 발렌티어 지원 및 카카오채널 문의",
      name: "마수정 팀장",
      kakao: "soojma",
      email: "soojma@naver.com",
      phone: "+82-10-9960-0994(먼저 문자로 연락 부탁드림)"
    },
    {
      role: "엔젤트리 및 만나브릿지 후원문의",
      name: "임금주 엔젤트리 팀장",
      kakao: "youngestddal",
      email: "ckdm0222@naver.com"
    },
    {
      role: "묵상편지 디자인 관련 문의",
      name: "박미혜 디자인 총괄 팀장",
      kakao: "grenge",
      email: "grenge@hanmail.net"
    },
    {
      role: "도서발송 관련 문의",
      name: "박정희 도서팀장",
      kakao: "issue0414",
      email: "cosmosab2000@gmail.com"
    },
    {
      role: "중보기도 관련 문의",
      name: "김연진 중보기도팀장",
      kakao: "soda633",
      email: "soda633@gmail.com"
    },
    {
      role: "편지팀 관련 문의",
      name: "이수빈 편지팀장",
      kakao: "",
      email: ""
    },
    {
      role: "유튜브 관련 문의",
      name: "최주연 유튜브팀장",
      kakao: "hyunna97",
      email: "cjuyeon33@nate.com"
    },
    {
      role: "오크나무 카페관련 문의",
      name: "정주화 오크나무팀장",
      kakao: "",
      email: ""
    },
    {
      role: "홈페이지 관련 문의",
      name: "김학일 홈페이지 팀장",
      kakao: "",
      email: ""
    },
    {
      role: "홍보팀장",
      name: "김은선 홍보팀장",
      kakao: "",
      email: ""
    },
    {
      role: "편지 답장팀",
      name: "박희연 편지답장팀장",
      kakao: "ginjloveg",
      email: "ginjloveg@hanmail.net"
    },
    {
      role: "미디어 팀장",
      name: "양예은 미디어 팀장",
      kakao: "",
      email: ""
    },
    {
      role: "글로벌 사역문의",
      name: "황득연 글로벌 팀장",
      kakao: "",
      email: ""
    }
  ]
};
