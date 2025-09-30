// Simple HTML partial include utility
// Usage: <div data-include="partials/header.html"></div>
(function () {
  function includePartials() {
    var nodes = document.querySelectorAll('[data-include]');
    var promises = Array.prototype.map.call(nodes, function (el) {
      var url = el.getAttribute('data-include');
      if (!url) return Promise.resolve();
      return fetch(url)
        .then(function (res) { return res.text(); })
        .then(function (html) { el.innerHTML = html; })
        .catch(function (err) { console.error('Include failed for', url, err); });
    });
    return Promise.all(promises).then(function () {
      // Notify that partials have been injected
      try {
        var evt = new CustomEvent('partials:loaded');
        window.dispatchEvent(evt);
      } catch (e) {
        // IE fallback
        var ev = document.createEvent('Event');
        ev.initEvent('partials:loaded', true, true);
        window.dispatchEvent(ev);
      }
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', includePartials);
  } else {
    includePartials();
  }
})();
