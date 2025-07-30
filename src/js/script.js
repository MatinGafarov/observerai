// Navbar scroll spy for section highlighting
document.addEventListener("DOMContentLoaded", function () {
    const sections = document.querySelectorAll("main section[id]");
    const navLinks = document.querySelectorAll(".navbar-links a");

    function onScroll() {
        let scrollPos = window.scrollY + 100;
        sections.forEach(section => {
            if (
                section.offsetTop <= scrollPos &&
                section.offsetTop + section.offsetHeight > scrollPos
            ) {
                navLinks.forEach(link => {
                    link.classList.remove("active");
                    if (link.getAttribute("href") === "#" + section.id) {
                        link.classList.add("active");
                    }
                });
            }
        });
    }
    window.addEventListener("scroll", onScroll);
    onScroll();
});

// FAQ accordion toggle
document.querySelectorAll('.faq-question').forEach(btn => {
    btn.addEventListener('click', function() {
        const item = btn.parentElement;
        const open = item.classList.contains('open');
        document.querySelectorAll('.faq-item').forEach(i => {
            i.classList.remove('open');
            i.querySelector('.faq-question').setAttribute('aria-expanded', 'false');
            i.querySelector('.faq-icon').textContent = '+';
        });
        if (!open) {
            item.classList.add('open');
            btn.setAttribute('aria-expanded', 'true');
            btn.querySelector('.faq-icon').textContent = '–';
        }
    });
});

// Navbar mobile toggle
document.getElementById('navbarToggle').onclick = function() {
    document.getElementById('navbarLinks').classList.toggle('show');
};

// Navbar active link based on page
document.addEventListener("DOMContentLoaded", function() {
    const links = document.querySelectorAll('.navbar-links a');
    const current = window.location.pathname.split('/').pop();
    links.forEach(link => {
        link.classList.remove('active');
        if (
            (current === '' || current === 'index.html') && link.getAttribute('href') === 'index.html'
        ) {
            link.classList.add('active');
        } else if (link.getAttribute('href') === current) {
            link.classList.add('active');
        }
    });
});

// Scroll fade-in animation for elements
document.addEventListener("DOMContentLoaded", function() {
    const scrollElements = document.querySelectorAll('.scroll-fade-in');
    function handleScrollFadeIn() {
        scrollElements.forEach(el => {
            const rect = el.getBoundingClientRect();
            if (rect.top < window.innerHeight - 60) {
                el.classList.add('visible');
            }
        });
    }
    window.addEventListener('scroll', handleScrollFadeIn);
    handleScrollFadeIn();
});
document.addEventListener("DOMContentLoaded", function() {
    const scrollBtn = document.getElementById('scrollToTopBtn');
    window.addEventListener('scroll', function() {
        if (window.scrollY > 200) {
            scrollBtn.classList.add('show');
        } else {
            scrollBtn.classList.remove('show');
        }
    });
    scrollBtn.addEventListener('click', function() {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });
});