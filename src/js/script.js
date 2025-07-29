document.addEventListener("DOMContentLoaded", function () {
    const sections = document.querySelectorAll("main section[id]");
    const navLinks = document.querySelectorAll(".navbar-links a");

    function onScroll() {
        let scrollPos = window.scrollY + 100; // Offset for navbar height
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
    onScroll(); // Run on page load
});
document.querySelectorAll('.faq-question').forEach(btn => {
    btn.addEventListener('click', function() {
        const item = btn.parentElement;
        const open = item.classList.contains('open');
        // Close all
        document.querySelectorAll('.faq-item').forEach(i => {
            i.classList.remove('open');
            i.querySelector('.faq-question').setAttribute('aria-expanded', 'false');
            i.querySelector('.faq-icon').textContent = '+';
        });
        // Open clicked if not already open
        if (!open) {
            item.classList.add('open');
            btn.setAttribute('aria-expanded', 'true');
            btn.querySelector('.faq-icon').textContent = '–';
        }
    });
});