document.addEventListener('DOMContentLoaded', function () {
    // Modals
    var openTriggers = document.querySelectorAll('[data-modal-open]');
    var modals = document.querySelectorAll('[data-modal]');

    function closeAllModals() {
        modals.forEach(function (m) {
            m.classList.remove('open');
        });
        document.body.style.overflow = '';
    }

    openTriggers.forEach(function (trigger) {
        trigger.addEventListener('click', function () {
            var id = trigger.getAttribute('data-modal-open');
            var modal = document.getElementById('modal-' + id);
            if (!modal) return;
            modal.classList.add('open');
            document.body.style.overflow = 'hidden';
            // Splide measures 0 width/height if mounted while display:none, which breaks
            // arrow positioning, so mount/refresh only once the modal is actually visible.
            mountSplides(modal);
        });
    });

    modals.forEach(function (modal) {
        modal.querySelectorAll('[data-modal-close]').forEach(function (btn) {
            btn.addEventListener('click', closeAllModals);
        });
        modal.addEventListener('click', function (event) {
            if (event.target === modal) closeAllModals();
        });
        modal.querySelectorAll('[data-bg-toggle]').forEach(function (btn) {
            btn.addEventListener('click', function () {
                modal.querySelector('.modal__content').classList.toggle('light-bg');
            });
        });
    });

    document.addEventListener('keydown', function (event) {
        if (event.key === 'Escape') closeAllModals();
    });

    // Splide carousels (lazily mounted per modal, see mountSplides below)
    var splideInstances = new Map();

    function mountSplides(container) {
        container.querySelectorAll('.splide').forEach(function (el) {
            var instance = splideInstances.get(el);
            if (instance) {
                instance.refresh();
                return;
            }
            instance = new Splide(el, {
                type: 'loop',
                perPage: 3,
                gap: '1rem',
                autoplay: true,
                pauseOnHover: true,
                breakpoints: {
                    700: { perPage: 1 }
                }
            });
            instance.mount();
            splideInstances.set(el, instance);
        });
    }

    // Copy Discord username to clipboard
    document.querySelectorAll('[data-copy]').forEach(function (btn) {
        btn.addEventListener('click', function () {
            var text = btn.getAttribute('data-copy');
            var label = btn.querySelector('.copy-label');
            var reset = function (msg, ms) {
                if (!label) return;
                var original = label.dataset.original || label.textContent;
                label.dataset.original = original;
                label.textContent = msg;
                setTimeout(function () { label.textContent = original; }, ms);
            };
            var done = function () { reset('Copied!', 1800); };
            if (navigator.clipboard && navigator.clipboard.writeText) {
                navigator.clipboard.writeText(text).then(done).catch(function () {
                    legacyCopy(text);
                    done();
                });
            } else {
                legacyCopy(text);
                done();
            }
        });
    });

    function legacyCopy(text) {
        var tempInput = document.createElement('input');
        tempInput.value = text;
        tempInput.style.position = 'fixed';
        tempInput.style.opacity = '0';
        document.body.appendChild(tempInput);
        tempInput.select();
        tempInput.setSelectionRange(0, 99999);
        document.execCommand('copy');
        document.body.removeChild(tempInput);
    }

    // Scroll reveal
    var revealEls = document.querySelectorAll('.reveal');
    if ('IntersectionObserver' in window && revealEls.length) {
        var revealObserver = new IntersectionObserver(function (entries, obs) {
            entries.forEach(function (entry) {
                if (entry.isIntersecting) {
                    entry.target.classList.add('in-view');
                    obs.unobserve(entry.target);
                }
            });
        }, { threshold: 0.15 });
        revealEls.forEach(function (el) {
            revealObserver.observe(el);
        });
    } else {
        revealEls.forEach(function (el) {
            el.classList.add('in-view');
        });
    }

    var yearEl = document.getElementById('year');
    if (yearEl) yearEl.textContent = new Date().getFullYear();

    // Contact form (Web3Forms)
    var contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', function (event) {
            event.preventDefault();
            var status = contactForm.querySelector('.contact-form__status');
            var submitBtn = contactForm.querySelector('button[type="submit"]');
            var originalBtnText = submitBtn.textContent;

            submitBtn.disabled = true;
            submitBtn.textContent = 'Sending...';
            status.textContent = '';
            status.classList.remove('is-error', 'is-success');

            var data = Object.fromEntries(new FormData(contactForm));

            fetch(contactForm.action, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
                body: JSON.stringify(data)
            })
                .then(function (response) { return response.json(); })
                .then(function (result) {
                    if (result.success) {
                        status.textContent = "Thanks! I'll get back to you soon.";
                        status.classList.add('is-success');
                        contactForm.reset();
                    } else {
                        status.textContent = result.message || 'Something went wrong. Please email me directly instead.';
                        status.classList.add('is-error');
                    }
                })
                .catch(function () {
                    status.textContent = 'Something went wrong. Please email me directly instead.';
                    status.classList.add('is-error');
                })
                .finally(function () {
                    submitBtn.disabled = false;
                    submitBtn.textContent = originalBtnText;
                });
        });
    }
});
