(function () {
  var reduceMotion = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  // Rotating hero lines (homepage only)
  var rotatingEl = document.getElementById('rotating-line');
  if (rotatingEl) {
    var lines = [
      "For founders who have an idea but haven't tested it.",
      "For founders who are tired of advice and ready for evidence.",
      "For founders who'd rather find out now than after they've spent their savings."
    ];
    var i = 0;
    if (!reduceMotion) {
      setInterval(function () {
        i = (i + 1) % lines.length;
        rotatingEl.style.opacity = 0;
        setTimeout(function () {
          rotatingEl.textContent = lines[i];
          rotatingEl.style.opacity = 1;
        }, 200);
      }, 4500);
      rotatingEl.style.transition = 'opacity .2s ease';
    }
  }

  // Mirror section scroll reveal
  var mirrorLines = document.querySelectorAll('#mirror-lines p');
  if (mirrorLines.length) {
    if (reduceMotion) {
      mirrorLines.forEach(function (p) { p.classList.add('visible'); });
    } else if ('IntersectionObserver' in window) {
      var obs = new IntersectionObserver(function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
          }
        });
      }, { threshold: 0.4 });
      mirrorLines.forEach(function (p) { obs.observe(p); });
    } else {
      mirrorLines.forEach(function (p) { p.classList.add('visible'); });
    }
  }

  // Photo carousels (auto-advance every 3s, loop; pauses on hover, respects reduced motion)
  document.querySelectorAll('.photo-carousel').forEach(function (carousel) {
    var slides = carousel.querySelectorAll('.photo-carousel-slide');
    if (slides.length < 2) return;
    var idx = 0;
    slides[0].classList.add('active');
    if (reduceMotion) return;
    var timer = setInterval(advance, 3000);
    function advance() {
      slides[idx].classList.remove('active');
      idx = (idx + 1) % slides.length;
      slides[idx].classList.add('active');
    }
    carousel.addEventListener('mouseenter', function () { clearInterval(timer); });
    carousel.addEventListener('mouseleave', function () { timer = setInterval(advance, 3000); });
  });
})();
