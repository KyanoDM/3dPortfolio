document.addEventListener('DOMContentLoaded', function () {
    var toggle = document.getElementById('navToggle');
    var links = document.getElementById('navLinks');

    if (toggle && links) {
        toggle.addEventListener('click', function () {
            var isOpen = links.classList.toggle('open');
            toggle.classList.toggle('active', isOpen);
            toggle.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
        });

        links.querySelectorAll('a').forEach(function (a) {
            a.addEventListener('click', function () {
                links.classList.remove('open');
                toggle.classList.remove('active');
                toggle.setAttribute('aria-expanded', 'false');
            });
        });
    }

    var navAnchors = document.querySelectorAll('.nav-links a[data-section]');
    var sections = Array.prototype.map.call(navAnchors, function (a) {
        return document.getElementById(a.dataset.section);
    }).filter(Boolean);

    if (!sections.length || !('IntersectionObserver' in window)) return;

    var observer = new IntersectionObserver(function (entries) {
        entries.forEach(function (entry) {
            if (!entry.isIntersecting) return;
            navAnchors.forEach(function (a) {
                a.classList.toggle('active', a.dataset.section === entry.target.id);
            });
        });
    }, { rootMargin: '-45% 0px -50% 0px', threshold: 0 });

    sections.forEach(function (section) {
        observer.observe(section);
    });
});
