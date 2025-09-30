// Simple HTML partial include utility
// Usage: <div data-include="partials/header.html"></div>
(function () {
  function includePartials() {
    var nodes = document.querySelectorAll('[data-include]');
    var promises = Array.prototype.map.call(nodes, function (el) {
      var url = el.getAttribute('data-include');
      if (!url) return Promise.resolve();
      
      // Try XMLHttpRequest for better file:// protocol support
      return new Promise(function(resolve, reject) {
        var xhr = new XMLHttpRequest();
        xhr.open('GET', url, true);
        xhr.onreadystatechange = function() {
          if (xhr.readyState === 4) {
            if (xhr.status === 200 || xhr.status === 0) { // 0 for file:// protocol
              el.innerHTML = xhr.responseText;
              resolve();
            } else {
              console.error('Include failed for', url, 'Status:', xhr.status);
              reject(new Error('Failed to load ' + url));
            }
          }
        };
        xhr.onerror = function() {
          console.error('Include error for', url);
          reject(new Error('Network error for ' + url));
        };
        xhr.send();
      });
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
