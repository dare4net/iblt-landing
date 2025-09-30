(function () {
  // Keep body content below fixed header
  function adjustBodyOffset() {
    var header = document.getElementById('site-header');
    if (!header) return;
    document.body.style.paddingTop = header.offsetHeight + 'px';
  }

  // Recalculate on resize
  window.addEventListener('resize', adjustBodyOffset);

  // After partials load (header injected)
  window.addEventListener('partials:loaded', adjustBodyOffset);

  // On DOM ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', adjustBodyOffset);
  } else {
    adjustBodyOffset();
  }
})();

// Topbar sweep animation (JS-driven initializer)
(function () {
  function startTopbarSweep() {
    var bar = document.querySelector('.topbar-ani');
    if (!bar) return;
    var fill = bar.querySelector('.topbar-fill');
    if (!fill) return;

    // Reset state
    bar.classList.remove('topbar-ani-done');
    bar.classList.remove('topbar-animating');

    // Ensure we don't get stuck white
    // Leave topbar-start until we actually trigger the animation
    // then remove it so the background is primary under the fill

    // Restart the animation on the fill element
    fill.style.animation = 'none';
    void fill.offsetWidth; // reflow
    fill.style.animation = '';

    // Sequence with RAF to ensure style application before toggling classes
    requestAnimationFrame(function () {
      // Trigger class-driven animation
      bar.classList.add('topbar-animating');
      requestAnimationFrame(function () {
        // Once running, drop the white start background so primary shows under fill
        bar.classList.remove('topbar-start');
      });
    });

    var onEnd = function () {
      bar.classList.add('topbar-ani-done');
      bar.classList.remove('topbar-animating');
      fill.removeEventListener('animationend', onEnd);
    };
    fill.addEventListener('animationend', onEnd);

    // Fallback to final state
    clearTimeout(startTopbarSweep._t);
    startTopbarSweep._t = setTimeout(function () {
      bar.classList.add('topbar-ani-done');
      bar.classList.remove('topbar-animating');
      bar.classList.remove('topbar-start');
    }, 2000);
  }

  // After partials injected
  window.addEventListener('partials:loaded', startTopbarSweep);
  // After all assets load (mobile reliability)
  window.addEventListener('load', startTopbarSweep);
  // On DOM ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', startTopbarSweep);
  } else {
    startTopbarSweep();
  }
})();

// Scroll animations extracted from code.html
(function () {
  const scrollElements = document.querySelectorAll('.animate-on-scroll');
  const elementInView = (el, dividend = 1) => {
    const elementTop = el.getBoundingClientRect().top;
    return elementTop <= (window.innerHeight || document.documentElement.clientHeight) / dividend;
  };
  const displayScrollElement = (element) => {
    element.classList.add('animated');
  };
  const handleScrollAnimation = () => {
    scrollElements.forEach((el) => {
      if (elementInView(el, 1.25)) {
        displayScrollElement(el);
      }
    });
  };
  window.addEventListener('scroll', handleScrollAnimation);
  // Initial check
  handleScrollAnimation();
})();

// Mobile menu toggle
(function () {
  function initMobileMenu() {
    var toggle = document.getElementById('mobile-menu-toggle');
    var menu = document.getElementById('mobile-menu');
    var content = document.getElementById('mobile-menu-content');
    if (!toggle || !menu) return;
    if (toggle.__menuBound) return; // prevent duplicate bindings

    var menuIcon = toggle.querySelector('.menu-icon');
    var closeIcon = toggle.querySelector('.close-icon');

    function openMenu() {
      // reveal
      menu.classList.remove('hidden', 'pointer-events-none');
      // prepare height from 0 to full to push page downward
      menu.style.height = '0px';
      // allow layout update then animate
      requestAnimationFrame(function () {
        // Expand to full height
        var full = menu.scrollHeight;
        menu.style.height = full + 'px';
        if (content) content.classList.remove('opacity-0', 'translate-y-2');
      });
      toggle.setAttribute('aria-expanded', 'true');
      if (menuIcon) menuIcon.classList.add('hidden');
      if (closeIcon) closeIcon.classList.remove('hidden');
      bindOutsideHandlers();
      // after transition, set height to auto for responsiveness
      var opened = function (e) {
        if (e && e.target !== menu) return;
        menu.style.height = 'auto';
        menu.removeEventListener('transitionend', opened);
      };
      menu.addEventListener('transitionend', opened);
    }

    function closeMenu() {
      // animate close: from current height to 0 to pull page upward
      if (content) content.classList.add('opacity-0', 'translate-y-2');
      // if height is auto, set current pixel height to enable transition
      var current = menu.scrollHeight;
      menu.style.height = current + 'px';
      // force reflow so the browser acknowledges the current height
      void menu.offsetHeight;
      // then transition to 0
      menu.style.height = '0px';
      toggle.setAttribute('aria-expanded', 'false');
      if (menuIcon) menuIcon.classList.remove('hidden');
      if (closeIcon) closeIcon.classList.add('hidden');
      var onEnd = function (e) {
        if (e && e.target !== menu) return;
        menu.classList.add('hidden', 'pointer-events-none');
        // cleanup inline height for next open
        menu.style.height = '';
        menu.removeEventListener('transitionend', onEnd);
      };
      menu.addEventListener('transitionend', onEnd);
      unbindOutsideHandlers();
    }

    function isOpen() {
      return toggle.getAttribute('aria-expanded') === 'true';
    }

    function toggleMenu() {
      if (isOpen()) closeMenu(); else openMenu();
    }

    // Click on toggle button
    toggle.addEventListener('click', toggleMenu);
    toggle.__menuBound = true;

    // Close on nav link click inside menu
    menu.addEventListener('click', function (e) {
      var link = e.target.closest('a');
      if (link) closeMenu();
    });

    // Outside click & Escape key
    var outsideClickHandler = function (e) {
      if (!isOpen()) return;
      if (toggle.contains(e.target) || menu.contains(e.target)) return;
      closeMenu();
    };
    var escapeHandler = function (e) {
      if (e.key === 'Escape' && isOpen()) closeMenu();
    };

    function bindOutsideHandlers() {
      document.addEventListener('click', outsideClickHandler);
      document.addEventListener('keydown', escapeHandler);
    }
    function unbindOutsideHandlers() {
      document.removeEventListener('click', outsideClickHandler);
      document.removeEventListener('keydown', escapeHandler);
    }
  }

  // Run after DOM is ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initMobileMenu);
    initMobileMenu();
  }
  // Also run after partials are injected
  window.addEventListener('partials:loaded', initMobileMenu);
})();

// Hero typewriter effect
(function () {
  var phrases = [
    'make an impact.',
    'change the world.',
    'build your future.',
    'lead with confidence.'
  ];
  var prefixEl;         // #typewriter-prefix (static prefix span)
  var endingEl;         // #typewriter-ending (dynamic ending span)
  var h1El;             // Hero H1 element
  var h1Text = 'In our School you can';
  var prefixText = 'learn how to ';
  var phraseIndex = 0;  // which phrase from phrases
  var charIndex = 0;    // character progress
  var phase = 'idle';   // 'h1' | 'prefix' | 'type' | 'hold' | 'delete'

  // Slower, smoother timings
  var typeSpeed = 160;        // ms per char when typing
  var deleteSpeed = 100;      // ms per char when deleting
  var holdAfterType = 2000;   // pause after finishing typing
  var holdAfterDelete = 800;  // pause before typing next
  var initialDelay = 1000;    // caret visible before typing starts

  function tick() {
    if (!prefixEl || !endingEl || !h1El) return;

    if (phase === 'h1') {
      // Type the H1 text first
      h1El.textContent = h1Text.slice(0, charIndex + 1);
      charIndex++;
      if (charIndex >= h1Text.length) {
        phase = 'prefix';
        charIndex = 0;
        setTimeout(tick, typeSpeed);
        return;
      }
      setTimeout(tick, typeSpeed);
      return;
    }

    if (phase === 'prefix') {
      // Then type the H2 prefix into its own span before cycling endings
      prefixEl.textContent = prefixText.slice(0, charIndex + 1);
      charIndex++;
      if (charIndex >= prefixText.length) {
        phase = 'type';
        charIndex = 0;
        setTimeout(tick, typeSpeed);
        return;
      }
      setTimeout(tick, typeSpeed);
      return;
    }

    var current = phrases[phraseIndex];
    if (phase === 'type') {
      endingEl.textContent = current.slice(0, charIndex + 1);
      charIndex++;
      if (charIndex >= current.length) {
        phase = 'hold';
        setTimeout(tick, holdAfterType);
        return;
      }
      setTimeout(tick, typeSpeed);
      return;
    }

    if (phase === 'hold') {
      phase = 'delete';
      setTimeout(tick, deleteSpeed);
      return;
    }

    if (phase === 'delete') {
      // Delete only the dynamic ending; prefix stays
      endingEl.textContent = current.slice(0, charIndex - 1);
      charIndex--;
      if (charIndex <= 0) {
        phase = 'type';
        phraseIndex = (phraseIndex + 1) % phrases.length;
        charIndex = 0;
        setTimeout(tick, holdAfterDelete);
        return;
      }
      setTimeout(tick, deleteSpeed);
      return;
    }
  }

  function start() {
    prefixEl = document.getElementById('typewriter-prefix');
    endingEl = document.getElementById('typewriter-ending');
    if (!prefixEl || !endingEl) return;
    // Find the H1 within the same hero container
    var heroContainer = endingEl.closest('div');
    h1El = heroContainer ? heroContainer.querySelector('h1') : document.querySelector('h1');
    if (!h1El) return;

    // Reset display
    h1El.textContent = '';
    prefixEl.textContent = '';
    endingEl.textContent = '';
    phase = 'h1';
    charIndex = 0;
    phraseIndex = 0;

    setTimeout(tick, initialDelay);
  }

  // Wait for partials to load
  window.addEventListener('partials:loaded', start);
  
  // Fallback if partials already loaded
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', function() {
      setTimeout(start, 500); // Give partials time to load
    });
  }
})();
