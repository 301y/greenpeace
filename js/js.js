
// IntersectionObserver 를 등록한다.
const io = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    // 관찰 대상이 viewport 안에 들어온 경우 'on' 클래스를 추가
    if (entry.intersectionRatio > 0) {
      entry.target.classList.add('on');
    }
    // 그 외의 경우 'on' 클래스 제거
    else {
      entry.target.classList.remove('on');
    }
  });
});

// 관찰할 대상을 선언하고, 해당 속성을 관찰시킨다.
const boxElList = document.querySelectorAll('.highlight');
boxElList.forEach((el) => {
  io.observe(el);
});


$(window).scroll(function () {
  var height = $(window).scrollTop();
  if (height > 200) {
    $('.top_btn').fadeIn();
  } else {
    $('.top_btn').fadeOut();
  }
});

$('.top_btn').click(function () {
  $('html, body').animate({ scrollTop: 0 }, 400);
  return false;
});


// HTML 요소 선택
const gnb1 = document.querySelector('.gnb1');

// 초기 상태 설정
gnb1.classList.add('transparent');

// 스크롤 이벤트 리스너 등록
window.addEventListener('scroll', function () {
  // `.gnb1` 요소의 위치 확인
  const gnb1Rect = gnb1.getBoundingClientRect();

  // `.gnb1` 요소가 화면 최상단에 오면 클래스 변경
  if (gnb1Rect.top <= 0) {
    gnb1.classList.remove('transparent');
    gnb1.classList.add('sticky');
  } else {
    gnb1.classList.remove('sticky');
    gnb1.classList.add('transparent');
  }
});


$(function () {
  var swiper = new Swiper('.main .slide ', {
    slidesPerView: 1.8,//보여지는 갤러리 수
    spaceBetween: 80,//갤러리 사이 간격
    centeredSlides: true,//센터모드
    slidesperview: true,
    speed: 800,//버튼을 슬라이드가 넘어가는 시간
    autoplay: {
      delay: 2500,//자동으로 넘어가기 전 머무르는 시간
      disableOnInteraction: false,
    },
    loop: true,//슬라이드 무한반복
    navigation: {//화살표 버튼
      nextEl: '.slide .swiper-button-next',
      prevEl: '.slide .swiper-button-prev',
    },
    breakpoints: {
      // when window width is >= 768px
      300: {
        slidesPerView: 1.1,
        spaceBetween: 10
      },
      600: {
        slidesPerView: 1.1,
        spaceBetween: 20
      },
      // when window width is >= 1200px
      1300: {
        slidesPerView: 1.8,
        spaceBetween: 60
      }
    }
  });
});

// 슬라이드2

$(function () {
  var swiper = new Swiper(".slide2 .gallery-center_inner ", {
    slidesPerView: 3.2, //보여지는 갤러리 수
    spaceBetween: 24, //갤러리 사이 간격
    centeredSlides: true, //센터모드
    speed: 800, //버튼을 슬라이드가 넘어가는 시간
    autoplay: {
      delay: 2500, //자동으로 넘어가기 전 머무르는 시간
      disableOnInteraction: false,
    },
    loop: true, //슬라이드 무한반복
    navigation: {
      //화살표 버튼
      nextEl: ".slide2 .gallery-center .swiper-button-next",
      prevEl: ".slide2 .gallery-center .swiper-button-prev",
    },

    pagination: {
      el: ".slide2 .swiper-pagination",
      type: "fraction",
    },
    breakpoints: {
      // when window width is >= 768px
      300: {
        slidesPerView: 1.1,
        spaceBetween: 10
      },
      550: {
        slidesPerView: 2.2,
        spaceBetween: 20
      },
      800: {
        slidesPerView: 2.7,
        spaceBetween: 20
      },
      // when window width is >= 1200px
      1000: {
        slidesPerView: 3.2,
        spaceBetween: 30
      }
    }
  });
});

// 원형 그래프

function drawCircleGraph() {
  $(".slide2 .circle-graph").each(function (index, node) {
    let perNum = $(this).attr("circleProgress");
    let fillColors = "#ffffff"; // 그래프의 색상 배열
    let fillColor = fillColors;


    let slideWidth = $(".slide2 .swiper-slide").width(); // .slide2의 폭을 가져옴

    $(this).circleProgress({
      size: slideWidth, // 그래프 크기를 .slide2의 폭으로 설정
      value: perNum / 100, // 그래프에 표시될 값
      startAngle: 300, // 시작지점
      thickness: 11, // 그래프 두께
      fill: {
        // 그래프 선 색
        color: fillColor,
      },
      animation: {
        duration: 1400,
        delay: 2000, // 0.2초의 지연 시간 추가
      },
      lineCap: "round", // 그래프 선 모양
      reverse: false, // 그래프가 진행되는 방향

    });
  });
}

let observer = new IntersectionObserver(
  function (entries) {
    entries.forEach(function (entry) {
      if (
        entry.isIntersecting &&
        entry.target.classList.contains("slide2")
      ) {
        drawCircleGraph();
        observer.unobserve(entry.target);
      }
    });
  },
  {
    threshold: 1, // 요소가 100% 보이면 실행
  }
);

$(".slide2").each(function () {
  observer.observe(this);
});


window.onload = function () {
  // .odometer 클래스를 가진 모든 요소를 선택
  const odometers = document.querySelectorAll(".odometer");

  // 오도미터 요소의 초기값 설정
  odometers.forEach((odometer, index) => {
    // 각 오도미터 요소에 초기값을 설정 (소수점 1자리로 고정)
    odometer.textContent = [38.2, 24, 18.9, 6.8, 6.4, 5.7][index].toFixed(1);
  });

  // 인터섹션 옵저버 등록
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          // 뷰포트에 진입하면 해당 오도미터 애니메이션 실행
          const index = Array.from(odometers).indexOf(entry.target);
          const targetValue = [38.2, 24, 18.9, 6.8, 6.4, 5.7][index];
          const duration = index === 1 ? 1500 : 2000; // 24의 경우 더 짧은 duration
          animateOdometer(entry.target, targetValue, duration);
          // 관찰 중지
          observer.unobserve(entry.target);
        }
      });
    },
    {
      rootMargin: "0px",
      threshold: 0.5, // 요소가 50% 이상 보이면 실행
    }
  );

  // 각 오도미터 요소에 대해 옵저버 등록
  odometers.forEach((odometer) => {
    observer.observe(odometer);
  });
};

function animateOdometer(odometer, targetValue, duration) {
  const startValue = parseFloat(odometer.textContent);
  const startTime = performance.now();

  function animate(currentTime) {
    const elapsedTime = currentTime - startTime;
    const progress = easeOutQuad(elapsedTime / duration); // easing 함수 적용
    let currentValue;
    if (targetValue === 24) {
      // 24의 경우 정수로 표현
      currentValue = startValue + Math.round((targetValue - startValue) * progress);
    } else {
      // 그 외의 경우 소수점 1자리로 표현
      currentValue = startValue + (targetValue - startValue) * progress;
    }
    odometer.textContent = currentValue.toFixed(targetValue === 24 ? 0 : 1);

    if (elapsedTime < duration) {
      // 애니메이션이 아직 끝나지 않았으면 다음 프레임 요청
      requestAnimationFrame(animate);
    }
  }

  // 첫 번째 애니메이션 프레임 요청
  requestAnimationFrame(animate);
}

// easing 함수
function easeOutQuad(t) {
  return t * (2 - t); // 애니메이션의 속도를 부드럽게 조절하는 함수
}





// 스크롤 aos
AOS.init({
  duration: 1200 //aos 나타나는 속도
});


// 서명 슬라이드
$(function () {
  var swiper = new Swiper(".bannerslide .gallery-center_inner ", {
    slidesPerView: 1.1, //보여지는 갤러리 수
    spaceBetween: 10, //갤러리 사이 간격
    speed: 800, //버튼을 슬라이드가 넘어가는 시간
    autoplay: {
      delay: 2500, //자동으로 넘어가기 전 머무르는 시간
      disableOnInteraction: false,
    },
    loop: true, //슬라이드 무한반복
    navigation: {
      //화살표 버튼
      nextEl: ".bannerslide .swiper-button-next",
      prevEl: ".bannerslide .swiper-button-prev",
    },
    pagination: {
      el: ".bannerslide .swiper-pagination",
      type: "fraction",
    },
    breakpoints: {
      // when window width is >= 768px
      300: {
        slidesPerView: 1,
        spaceBetween: 5
      },
      800: {
        slidesPerView: 1.2,
        spaceBetween: 20
      }
    }
  });
});



$(function () {
  var swiper = new Swiper('.gall2 .gallery .gallery_inner ', {
    slidesPerView: 3,//보여지는 갤러리 수
    speed: 800,//버튼을 슬라이드가 넘어가는 시간
    autoplay: {
      delay: 2500,//자동으로 넘어가기 전 머무르는 시간
      disableOnInteraction: false,
    },
    loop: true,//슬라이드 무한반복
    pagination: {//블릿 버튼
      el: '.gall2 .gallery .swiper-pagination',
      clickable: true,
    },
    breakpoints: {
      // when window width is >= 768px
      300: {
        slidesPerView: 1,
      },
      600: {
        slidesPerView: 1.2,
      },
      900: {
        slidesPerView: 2.1,
      },
      // when window width is >= 1200px
      1200: {
        slidesPerView: 3,
      }
    }
  });
});


// 인스타그램

$(function () {
  var swiper = new Swiper('.ins_slide .flowslide_inner ', {
    slidesPerView: 5,//보여지는 갤러리 수
    spaceBetween: 10,//갤러리 사이 간격
    speed: 8000,//버튼을 슬라이드가 넘어가는 시간
    autoplay: {
      delay: 0,//자동으로 넘어가기 전 머무르는 시간
      disableOnInteraction: false,
    },
    loop: true,//슬라이드 무한반복
    breakpoints: {
      // when window width is >= 768px
      300: {
        slidesPerView: 2.5,
      },
      600: {
        slidesPerView: 3,
      },
      900: {
        slidesPerView: 3.5,
      },
      1300: {
        slidesPerView: 4,
      },
    }
  });

  $('.ins_slide .flowslide .swiper-slide').on('mouseover', function () {
    swiper.autoplay.stop();
  });
  $('.ins_slide .flowslide .swiper-slide').on('mouseout', function () {
    swiper.autoplay.start();
  });
});


// 각 메뉴 링크의 id 값과 해당 섹션의 높이
const menuInfo = [
  { id: 'project', height: 0 },
  { id: 'involvement', height: 0 },
  { id: 'donation', height: 0 },
  { id: 'core', height: 0 },
  { id: 'news', height: 0 }
];

// 각 섹션의 높이를 초기화
function initSectionHeight() {
  menuInfo.forEach(item => {
    item.height = document.getElementById(item.id).offsetHeight;
  });
}

// 현재 스크롤 위치를 저장할 변수
let currentScrollPosition = 0;

// PC용 및 모바일용 스크롤 이벤트 핸들러
window.addEventListener('scroll', function () {
  currentScrollPosition = window.pageYOffset || document.documentElement.scrollTop;

  // 각 메뉴 링크의 id 값에 도달했을 때 처리
  for (let i = 0; i < menuInfo.length; i++) {
    const section = document.getElementById(menuInfo[i].id);
    if (section && currentScrollPosition >= section.offsetTop - 100 && currentScrollPosition < section.offsetTop + menuInfo[i].height) {
      // 모든 PC 메뉴 링크의 on_menu 클래스 제거
      document.querySelectorAll('.nav li a').forEach(link => {
        link.classList.remove('on_menu');
      });
      // 현재 PC 메뉴 링크에 on_menu 클래스 추가
      document.querySelector(`.nav li a[href="#${menuInfo[i].id}"]`).classList.add('on_menu');

      // 모든 모바일 메뉴 링크의 on_menu 클래스 제거
      document.querySelectorAll('.mobile_nav li a').forEach(link => {
        link.classList.remove('on_menu');
      });
      // 현재 모바일 메뉴 링크에 on_menu 클래스 추가
      document.querySelector(`.mobile_nav li a[href="#${menuInfo[i].id}"]`).classList.add('on_menu');
      
      break; // 현재 메뉴 링크에 도달했으면 루프 종료
    }
  }
});

// 모바일 메뉴 토글 기능
document.querySelector('.menu_on').addEventListener('click', function() {
  document.querySelector('.mobile_menu').classList.toggle('active');
});

// 모바일 메뉴 링크 클릭 이벤트
document.querySelectorAll('.mobile_nav li a').forEach(link => {
  link.addEventListener('click', function() {
    // 모든 모바일 메뉴 링크의 on_menu 클래스 제거
    document.querySelectorAll('.mobile_nav li a').forEach(link => {
      link.classList.remove('on_menu');
    });
    // 클릭한 링크에 on_menu 클래스 추가
    this.classList.add('on_menu');
    
    // 모바일 메뉴 숨기기
    document.querySelector('.mobile_menu').classList.remove('active');
  });
});

// 페이지 로드 시 섹션 높이 초기화
window.addEventListener('load', initSectionHeight);




// 반응형 클릭 제이쿼리


// 후원하기
$('.do_btn0').click(function () {
  // 모든 howbox에서 how_on 클래스 제거
  $('.do_btn0').removeClass('do_on');
  // 클릭한 howbox에 how_on 클래스 추가
  $(this).addClass('do_on');
});


// 후원금 오도미터
$(window).resize(function () {
  if ($(window).width() <= 900) {
    // 다른 클래스에서 how_on 클래스 제거
    $('[class*="how_"]').removeClass('how_on');

    // 첫 번째 howbox에 how_on 클래스 추가
    $('.howbox').first().addClass('how_on');

    // 클릭 이벤트 설정
    $('.howbox').click(function () {
      // 모든 howbox에서 how_on 클래스 제거
      $('.howbox').removeClass('how_on');
      // 클릭한 howbox에 how_on 클래스 추가
      $(this).addClass('how_on');
    });
  } else {
    // 900px 초과일 때 동작 제거
    $('.howbox').off('click');
    $('.howbox').removeClass('how_on');
  }
}).resize(); // 페이지 로드 시 실행



$(document).ready(function () {
  // 메뉴 아이콘을 클릭하면 moblie_menu에 show 클래스를 토글
  $(".gnb .gnb_icon .menu_on").click(function () {
    $(".moblie_menu").toggleClass("show");
  });

  // moblie_menu의 mobile_nav의 li a 요소를 클릭하면 show 클래스 제거
  $(".moblie_menu .mobile_nav li a").click(function () {
    $(".moblie_menu").removeClass("show");
  });

  // 윈도우 리사이즈 이벤트 감지
  $(window).resize(function () {
    if ($(window).width() >= 1050) {
      $(".moblie_menu").removeClass("show");
    }
  });

  // 페이지 로드 시에도 뷰포트 너비 체크
  if ($(window).width() >= 1050) {
    $(".moblie_menu").removeClass("show");
  }
});
