/**
 * =============================================
 * YASHI SOLAR-TECH SOLUTIONS
 * Main JavaScript File (CLEAN & FINAL)
 * =============================================
 */

document.addEventListener('DOMContentLoaded', function () {

    initMobileMenu();
    initStickyHeader();
    initProjectsFilter();
    initContactForm();
    initSmoothScroll();
    initAnimations();
    initCounterAnimation();
    initServiceImageLightbox(); // ✅ FIXED

});

/* =============================================
   MOBILE MENU
============================================= */
function initMobileMenu() {
    const mobileMenuBtn = document.getElementById('mobileMenuBtn');
    const mobileNav = document.getElementById('mobileNav');
    if (!mobileMenuBtn || !mobileNav) return;

    mobileMenuBtn.addEventListener('click', () => {
        mobileMenuBtn.classList.toggle('active');
        mobileNav.classList.toggle('active');
        document.body.style.overflow = mobileNav.classList.contains('active') ? 'hidden' : '';
    });

    document.addEventListener('click', e => {
        if (!mobileMenuBtn.contains(e.target) && !mobileNav.contains(e.target)) {
            mobileMenuBtn.classList.remove('active');
            mobileNav.classList.remove('active');
            document.body.style.overflow = '';
        }
    });
}

/* =============================================
   STICKY HEADER
============================================= */
function initStickyHeader() {
    const header = document.getElementById('header');
    if (!header) return;

    window.addEventListener('scroll', () => {
        header.style.boxShadow =
            window.scrollY > 10
                ? '0 4px 6px rgba(0,0,0,0.1)'
                : '0 1px 2px rgba(0,0,0,0.05)';
    });
}

/* =============================================
   PROJECT FILTER
============================================= */
function initProjectsFilter() {
    const tabs = document.querySelectorAll('.filter-tab');
    const cards = document.querySelectorAll('.project-card');
    if (!tabs.length || !cards.length) return;

    tabs.forEach(tab => {
        tab.addEventListener('click', () => {
            tabs.forEach(t => t.classList.remove('active'));
            tab.classList.add('active');

            const filter = tab.dataset.filter;
            cards.forEach(card => {
                const type = card.dataset.type;
                card.style.display = filter === 'all' || type === filter ? '' : 'none';
            });
        });
    });
}

/* =============================================
   CONTACT FORM
============================================= */

function initContactForm() {
    const form = document.getElementById('contactForm');
    const successBox = document.getElementById('formSuccess');

    if (!form) return;

    form.addEventListener('submit', function (e) {
        e.preventDefault();

        const formData = new FormData(form);

        fetch("send-mail.php", {
            method: "POST",
            body: formData
        })
        .then(res => res.text())
        .then(response => {
            if (response.trim() === "success") {
                form.style.display = "none";
                if (successBox) successBox.style.display = "block";
            } else {
                alert("Email not sent. Please try again.");
            }
        })
        .catch(() => {
            alert("Server error. Please try later.");
        });
    });
}

/* =============================================
   SMOOTH SCROLL
============================================= */
function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(link => {
        link.addEventListener('click', e => {
            const target = document.querySelector(link.getAttribute('href'));
            if (!target) return;

            e.preventDefault();
            window.scrollTo({
                top: target.offsetTop - 80,
                behavior: 'smooth'
            });
        });
    });
}

/* =============================================
   SCROLL ANIMATIONS
============================================= */
function initAnimations() {
    if (!('IntersectionObserver' in window)) return;

    const elements = document.querySelectorAll('.animate-on-scroll');
    const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-fadeInUp');
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1 });

    elements.forEach(el => observer.observe(el));
}

/* =============================================
   COUNTER
============================================= */
function initCounterAnimation() {
    const stats = document.querySelectorAll('.stat-value');
    if (!stats.length) return;

    const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateCounter(entry.target, parseInt(entry.target.textContent), 2000);
                observer.unobserve(entry.target);
            }
        });
    });

    stats.forEach(stat => observer.observe(stat));
}

function animateCounter(el, target, duration) {
    let current = 0;
    const increment = target / (duration / 16);
    function update() {
        current += increment;
        if (current < target) {
            el.textContent = Math.floor(current) + '+';
            requestAnimationFrame(update);
        } else {
            el.textContent = target + '+';
        }
    }
    update();
}

/* =============================================
   ✅ SERVICE IMAGE LIGHTBOX (FINAL FIX)
============================================= */
function initServiceImageLightbox() {

    const lightbox = document.getElementById('imageLightbox');
    const image = document.querySelector('.lightbox-image');
    const close = document.querySelector('.lightbox-close');

    if (!lightbox || !image || !close) return;

    document.querySelectorAll('.service-image img').forEach(img => {
        img.style.cursor = 'zoom-in';
        img.addEventListener('click', () => {
            image.src = img.src;
            lightbox.classList.add('active');
            document.body.style.overflow = 'hidden';
        });
    });

    close.addEventListener('click', closeLightbox);
    lightbox.addEventListener('click', e => e.target === lightbox && closeLightbox());
    document.addEventListener('keydown', e => e.key === 'Escape' && closeLightbox());

    function closeLightbox() {
        lightbox.classList.remove('active');
        document.body.style.overflow = '';
    }
}



//  anitmate service images on hover
/* =====================================
   PROCESS SECTION SCROLL REVEAL (JS ONLY)
===================================== */

const processItems = document.querySelectorAll(".process-item");

// Initial hidden state (JS se)
processItems.forEach((item, index) => {
    item.style.opacity = "0";
    item.style.transform = "translateY(40px)";
    item.style.transition =
        "opacity 0.8s ease, transform 0.8s ease";
    item.style.transitionDelay = `${index * 0.15}s`;
});

const processObserver = new IntersectionObserver(
    (entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = "1";
                entry.target.style.transform = "translateY(0)";
                processObserver.unobserve(entry.target); // animate once
            }
        });
    },
    {
        threshold: 0.25
    }
);

processItems.forEach(item => {
    processObserver.observe(item);
});


//  about secton  scroll reveal
/* ================= SCROLL ANIMATIONS ================= */

document.addEventListener("DOMContentLoaded", () => {

    const animatedItems = document.querySelectorAll(
        ".section-header, .value-item, .team-card"
    );

    animatedItems.forEach((el) => {
        el.style.opacity = "0";
        el.style.transform = "translateY(30px)";
        el.style.transition = "opacity 0.8s ease, transform 0.8s ease";
    });

    const observer = new IntersectionObserver(
        (entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    entry.target.style.opacity = "1";
                    entry.target.style.transform = "translateY(0)";
                    observer.unobserve(entry.target);
                }
            });
        },
        {
            threshold: 0.15,
        }
    );

    animatedItems.forEach((el, index) => {
        el.style.transitionDelay = `${index * 0.12}s`;
        observer.observe(el);
    });

});



//  service section animation on scroll
/* ================= SERVICES SCROLL ANIMATION ================= */

document.addEventListener("DOMContentLoaded", () => {

    const services = document.querySelectorAll(".service-detail");

    // Initial hidden state (JS se hi)
    services.forEach(service => {
        const image = service.querySelector(".service-detail-image");
        const content = service.querySelector(".service-detail-content");

        service.style.opacity = "0";
        service.style.transform = "translateY(40px)";
        service.style.transition = "opacity 0.9s ease, transform 0.9s ease";

        if (image) {
            image.style.opacity = "0";
            image.style.transform = "translateX(-40px)";
            image.style.transition = "opacity 0.9s ease, transform 0.9s ease";
        }

        if (content) {
            content.style.opacity = "0";
            content.style.transform = "translateX(40px)";
            content.style.transition = "opacity 0.9s ease, transform 0.9s ease";
        }
    });

    const observer = new IntersectionObserver(
        (entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    const service = entry.target;
                    const image = service.querySelector(".service-detail-image");
                    const content = service.querySelector(".service-detail-content");

                    service.style.opacity = "1";
                    service.style.transform = "translateY(0)";

                    setTimeout(() => {
                        if (image) {
                            image.style.opacity = "1";
                            image.style.transform = "translateX(0)";
                        }
                        if (content) {
                            content.style.opacity = "1";
                            content.style.transform = "translateX(0)";
                        }
                    }, 120);

                    observer.unobserve(service);
                }
            });
        },
        {
            threshold: 0.18,
        }
    );

    services.forEach((service, index) => {
        service.style.transitionDelay = `${index * 0.1}s`;
        observer.observe(service);
    });

});


/* ================= CTA SECTION ANIMATION ================= */

document.addEventListener("DOMContentLoaded", () => {

    const ctaSection = document.querySelector(".cta-section");
    if (!ctaSection) return;

    const ctaCard = ctaSection.querySelector(".cta-card");
    const ctaBg = ctaSection.querySelector(".cta-bg");
    const ctaContent = ctaSection.querySelector(".cta-content");
    const ctaButtons = ctaSection.querySelectorAll(".cta-buttons a");

    /* Initial hidden state */
    ctaCard.style.opacity = "0";
    ctaCard.style.transform = "translateY(50px)";
    ctaCard.style.transition = "opacity 1s ease, transform 1s ease";

    if (ctaBg) {
        ctaBg.style.opacity = "0";
        ctaBg.style.transform = "scale(1.05)";
        ctaBg.style.transition = "opacity 1.2s ease, transform 1.2s ease";
    }

    if (ctaContent) {
        ctaContent.style.opacity = "0";
        ctaContent.style.transform = "translateY(30px)";
        ctaContent.style.transition = "opacity 0.9s ease, transform 0.9s ease";
    }

    ctaButtons.forEach((btn) => {
        btn.style.opacity = "0";
        btn.style.transform = "translateY(20px)";
        btn.style.transition = "opacity 0.6s ease, transform 0.6s ease";
    });

    const observer = new IntersectionObserver(
        (entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {

                    /* Card reveal */
                    ctaCard.style.opacity = "1";
                    ctaCard.style.transform = "translateY(0)";

                    /* Background subtle zoom-in */
                    if (ctaBg) {
                        setTimeout(() => {
                            ctaBg.style.opacity = "1";
                            ctaBg.style.transform = "scale(1)";
                        }, 150);
                    }

                    /* Text reveal */
                    if (ctaContent) {
                        setTimeout(() => {
                            ctaContent.style.opacity = "1";
                            ctaContent.style.transform = "translateY(0)";
                        }, 300);
                    }

                    /* Buttons stagger */
                    ctaButtons.forEach((btn, index) => {
                        setTimeout(() => {
                            btn.style.opacity = "1";
                            btn.style.transform = "translateY(0)";
                        }, 450 + index * 120);
                    });

                    observer.unobserve(entry.target);
                }
            });
        },
        {
            threshold: 0.3,
        }
    );

    observer.observe(ctaSection);

});


/* ================= COUNTER ANIMATION ================= */

document.addEventListener("DOMContentLoaded", () => {

    const counters = document.querySelectorAll(".project-stat-value");

    if (!counters.length) return;

    const animateCounter = (el) => {
        const text = el.innerText.trim();

        // Detect suffix
        let suffix = "";
        if (text.includes("+")) suffix = "+";
        if (text.includes("%")) suffix = "%";
        if (text.toLowerCase().includes("mw")) suffix = " MW";

        // Extract number
        const number = parseFloat(text.replace(/[^\d.]/g, ""));
        const duration = 1600;
        const startTime = performance.now();

        const update = (currentTime) => {
            const progress = Math.min((currentTime - startTime) / duration, 1);
            const value = number * progress;

            el.innerText =
                (number % 1 === 0 ? Math.floor(value) : value.toFixed(1)) + suffix;

            if (progress < 1) {
                requestAnimationFrame(update);
            } else {
                el.innerText = number + suffix;
            }
        };

        requestAnimationFrame(update);
    };

    const observer = new IntersectionObserver(
        (entries, obs) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    animateCounter(entry.target);
                    obs.unobserve(entry.target);
                }
            });
        },
        { threshold: 0.5 }
    );

    counters.forEach((counter) => observer.observe(counter));

});

