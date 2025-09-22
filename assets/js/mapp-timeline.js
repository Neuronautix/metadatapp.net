/* MAPP timeline reveal on scroll
   - Progressive enhancement: items are visible by default.
   - Adds `js` class to <html>, enabling CSS-only initial hidden state.
   - Uses IntersectionObserver with a small vanilla fallback.
*/
(function () {
  try { document.documentElement.classList.add('js'); } catch (e) {}

  var items = Array.prototype.slice.call(document.querySelectorAll('.mapp-timeline__item'));
  if (!items.length) return;

  function revealEl(el) {
    if (!el.classList.contains('is-revealed')) {
      el.classList.add('is-revealed');
    }
  }

  if ('IntersectionObserver' in window) {
    var obs = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          revealEl(entry.target);
          obs.unobserve(entry.target);
        }
      });
    }, { root: null, rootMargin: '0px 0px -10% 0px', threshold: 0.15 });
    items.forEach(function (el) { obs.observe(el); });
  } else {
    // Minimal fallback
    function inViewport(el) {
      var rect = el.getBoundingClientRect();
      var vh = (window.innerHeight || document.documentElement.clientHeight);
      var threshold = Math.min(120, rect.height * 0.2);
      return rect.top <= vh - threshold && rect.bottom >= threshold;
    }
    function scan() {
      items.forEach(function (el) { if (inViewport(el)) revealEl(el); });
    }
    window.addEventListener('scroll', scan, { passive: true });
    window.addEventListener('resize', scan);
    scan();
  }
})();
