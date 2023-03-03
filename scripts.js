// Sidenav
function throttle(fn, wait) {
  var time = Date.now();
  return function () {
    if (time + wait - Date.now() < 0) {
      fn();
      time = Date.now();
    }
  };
}

function scroll_cb() {
  var scroll = $(window).scrollTop();
  var addClassOnScroll = function () {
    var windowTop = $(window).scrollTop();
    $("section[id]").each(function (index, elem) {
      var offsetTop = $(elem).offset().top;
      var outerHeight = $(this).outerHeight(true);

      if (windowTop > offsetTop - 50 && windowTop < offsetTop + outerHeight) {
        var elemId = $(elem).attr("id");
        $(".sidenav ul li a.current").removeClass("current");
        $(".sidenav ul li a[href='#" + elemId + "']").addClass("current");
      }
    });
  };
  addClassOnScroll();
}

$(document).ready(function () {
  window.addEventListener("scroll", throttle(scroll_cb, 100));
  $(window).scroll(function () {
    var scroll = $(window).scrollTop();
    var doc = $(document).height();
    var win = $(window).height();
    var value =
      (scroll / (doc - win)) *
      90; /* this value will varie in function of your page height*/
    $("ul .sideline").css("height", value + "%");
  });
  $("a.clickable").click(function () {
    $("a.current").removeClass("current");
    $(this).addClass("current");
  });
});


const text = document.getElementById("text");
const words = ["Luka Kutchaidze", "Web Developer"];
let currentWordIndex = 0;
let currentLetterIndex = 0;
let isDeleting = false;
let textColor = [255, 0, 0];

function updateTextColor() {
  for (let i = 0; i < 3; i++) {
    textColor[i] = Math.floor(Math.random() * 256);
  }
  text.style.color = `rgb(${textColor[0]}, ${textColor[1]}, ${textColor[2]})`;
}

function type() {
  const currentWord = words[currentWordIndex];
  const speed = isDeleting ? 50 : 100; // change the speed based on whether letters are being deleted or typed

  if (currentLetterIndex < currentWord.length && !isDeleting) {
    text.textContent += currentWord[currentLetterIndex];
    currentLetterIndex++;
    setTimeout(type, speed);
  } else {
    isDeleting = true;
    setTimeout(() => {
      if (currentLetterIndex >= 0) {
        text.textContent = currentWord.substring(0, currentLetterIndex);
        currentLetterIndex--;
        setTimeout(type, speed / 2); // reduce the delay when deleting letters
      } else {
        currentWordIndex = (currentWordIndex + 1) % words.length;
        currentLetterIndex = 0;
        isDeleting = false;
        updateTextColor();
        setTimeout(type, 1000); // reduce the delay after a word is typed
      }
    }, 200); // reduce the delay after "Luka Kutchaidze" or "Web Developer" is typed
  }
  updateTextColor();
}

type();


function showDropdown() {
  var dropdownContent = document.getElementById("navbarDropdownContent");
  dropdownContent.classList.toggle("show");
  dropdownContent.style = "display: block";

}
function toggleMode() {
  const currentMode = document.documentElement.getAttribute("data-theme");
  const targetMode = currentMode === "dark" ? "light" : "dark";
  document.documentElement.setAttribute("data-theme", targetMode);

  const icon = document.querySelector('.mode-btn i');
  icon.className = targetMode === 'dark' ? 'bx bx-moon' : 'bx bx-sun';
}
const dropdownBtn = document.querySelector('.dropdown-btn');
const dropdownContent = document.querySelector('.dropdown-content');

dropdownBtn.addEventListener('click', () => {
  dropdownContent.classList.toggle('hide');
});

dropdownContent.addEventListener('click', (event) => {
  event.stopPropagation();
});


// Music
const musicIcon = document.querySelector('.music-icon');
const musicButton = document.querySelector('.music-icon-button');
const musicWaves = document.querySelector('.music-waves-container');
const music = document.getElementById('music');

let isPlaying = false;

musicIcon.addEventListener('click', function () {
  if (isPlaying) {
    music.pause();
    isPlaying = false;
    musicButton.style.display = 'block';
    musicWaves.style.display = 'none';
  } else {
    music.play();
    isPlaying = true;
    musicButton.style.display = 'none';
    musicWaves.style.display = 'flex';
  }
});

// Scroll-up
const scrollTopBtn = document.getElementById('scroll-top-btn');
const sec1 = document.getElementById('sec1');

window.addEventListener('scroll', function() {
  if (window.pageYOffset > sec1.offsetTop) {
    scrollTopBtn.classList.remove('hidden');
  } else {
    scrollTopBtn.classList.add('hidden');
  }
});

scrollTopBtn.addEventListener('click', function(event) {
  event.preventDefault();

  const targetPosition = 0;
  const startPosition = window.pageYOffset;
  const distance = targetPosition - startPosition;
  const duration = 500;

  let start = null;

  function step(timestamp) {
    if (!start) start = timestamp;
    const progress = timestamp - start;
    window.scrollTo(0, easeInOutCubic(progress, startPosition, distance, duration));
    if (progress < duration) window.requestAnimationFrame(step);
  }

  function easeInOutCubic(t, b, c, d) {
    t /= d / 2;
    if (t < 1) return c / 2 * t * t * t + b;
    t -= 2;
    return c / 2 * (t * t * t + 2) + b;
  }

  window.requestAnimationFrame(step);
});
