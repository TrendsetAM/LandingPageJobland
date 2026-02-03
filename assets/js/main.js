(function () {
  "use strict";

  // Derive logo path from the image's current src so it works locally and in production (any domain/base path)
  function setLogoSrc(logo, filename) {
    if (!logo || !logo.src) return;
    
    try {
      // Get the directory from current src
      var currentSrc = logo.src;
      var lastSlashIndex = currentSrc.lastIndexOf('/');
      
      if (lastSlashIndex === -1) return; // No slash found, can't determine directory
      
      var dir = currentSrc.substring(0, lastSlashIndex + 1);
      var newSrc = dir + filename;
      
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
