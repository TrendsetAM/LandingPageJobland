(function () {
  "use strict";

  // Get the base URL for assets (works for both root and subdirectory pages)
  function getAssetsPath() {
    // Extract the origin and base path from current location
    var origin = window.location.origin;
    var pathname = window.location.pathname;
    
    // If we're in a subdirectory, we need to go back to root
    // For https://resumedropai.com/professional-resume-writing-services/ -> https://resumedropai.com/
    // For https://resumedropai.com/ -> https://resumedropai.com/
    return origin + '/assets/images/logo/';
  }

  // Set logo src using absolute path from root
  function setLogoSrc(logo, filename) {
    if (!logo) return;
    
    try {
      var assetsPath = getAssetsPath();
      var newSrc = assetsPath + filename;
      
      // Only update if the new src is different
      if (logo.src !== newSrc) {
        logo.src = newSrc;
      }
    } catch (e) {
      console.error('Error setting logo src:', e);
    }
  }

  // Track sticky state to avoid unnecessary logo changes
  let isSticky = false;

  // ======= Sticky
  window.onscroll = function () {
    const ud_header = document.querySelector(".ud-header");
    if (!ud_header) return;
    const sticky = ud_header.offsetTop;
    const logo = document.querySelector(".navbar-brand img");

    const shouldBeSticky = window.pageYOffset > sticky;

    if (shouldBeSticky) {
      ud_header.classList.add("sticky");
    } else {
      ud_header.classList.remove("sticky");
    }

    // === logo change (only when sticky state changes to avoid repeated loading)
    if (logo && shouldBeSticky !== isSticky) {
      isSticky = shouldBeSticky;
      setLogoSrc(logo, isSticky ? "RDLogoB.png" : "RDLogoC.png");
    }

    // show or hide the back-top-top button
    const backToTop = document.querySelector(".back-to-top");
    if (
      document.body.scrollTop > 50 ||
      document.documentElement.scrollTop > 50
    ) {
      backToTop.style.display = "flex";
    } else {
      backToTop.style.display = "none";
    }
  };

  //===== close navbar-collapse when a  clicked
  let navbarToggler = document.querySelector(".navbar-toggler");
  const navbarCollapse = document.querySelector(".navbar-collapse");

  document.querySelectorAll(".ud-menu-scroll").forEach((e) =>
    e.addEventListener("click", () => {
      navbarToggler.classList.remove("active");
      navbarCollapse.classList.remove("show");
    })
  );
  navbarToggler.addEventListener("click", function () {
    navbarToggler.classList.toggle("active");
    navbarCollapse.classList.toggle("show");
  });

  // ===== submenu
  const submenuButton = document.querySelectorAll(".nav-item-has-children");
  submenuButton.forEach((elem) => {
    elem.querySelector("a").addEventListener("click", () => {
      elem.querySelector(".ud-submenu").classList.toggle("show");
    });
  });

  // ===== wow js
  new WOW().init();

  // ====== scroll top js
  function scrollTo(element, to = 0, duration = 500) {
    const start = element.scrollTop;
    const change = to - start;
    const increment = 20;
    let currentTime = 0;

    const animateScroll = () => {
      currentTime += increment;

      const val = Math.easeInOutQuad(currentTime, start, change, duration);

      element.scrollTop = val;

      if (currentTime < duration) {
        setTimeout(animateScroll, increment);
      }
    };

    animateScroll();
  }

  Math.easeInOutQuad = function (t, b, c, d) {
    t /= d / 2;
    if (t < 1) return (c / 2) * t * t + b;
    t--;
    return (-c / 2) * (t * (t - 2) - 1) + b;
  };

  document.querySelector(".back-to-top").onclick = () => {
    scrollTo(document.documentElement);
  };
})();
