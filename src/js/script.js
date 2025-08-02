
// Navbar active link based on page
document.addEventListener('DOMContentLoaded', function () {
    const links = document.querySelectorAll('.navbar__links a, .navbar-links__link');
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

// Scroll to top button
document.addEventListener('DOMContentLoaded', function () {
    const scrollBtn = document.getElementById('scrollToTopBtn');
    if (!scrollBtn) return;
    window.addEventListener('scroll', function () {
        if (window.scrollY > 200) {
            scrollBtn.classList.add('show');
        } else {
            scrollBtn.classList.remove('show');
        }
    });
    scrollBtn.addEventListener('click', function () {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });
});

// FAQ accordion toggle
document.addEventListener('DOMContentLoaded', function () {
    document.querySelectorAll('.faq__question').forEach(btn => {
        btn.addEventListener('click', function () {
            const item = btn.parentElement;
            const open = item.classList.contains('open');
            document.querySelectorAll('.faq__item').forEach(i => {
                i.classList.remove('open');
                i.querySelector('.faq__question').setAttribute('aria-expanded', 'false');
                i.querySelector('.faq__icon').textContent = '+';
            });
            if (!open) {
                item.classList.add('open');
                btn.setAttribute('aria-expanded', 'true');
                btn.querySelector('.faq__icon').textContent = '–';
            }
        });
    });
});

// Scroll fade-in animation for elements
document.addEventListener('DOMContentLoaded', function () {
    const scrollElements = document.querySelectorAll('.scroll__fade__in');
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

// Leaders grid (explore.html)
document.addEventListener('DOMContentLoaded', function () {
    const leadersGrid = document.getElementById('leadersGrid');
    const filterButtons = document.querySelectorAll('.filter__button');
    if (!leadersGrid || filterButtons.length === 0) return;
    
    const leaders = [
        {
            name: "Maya Solaris",
            image: "src/assets/images/leader1.jpg",
            category: "spiritual",
            description: "Astrology guide offering cosmic wisdom and celestial insights for your spiritual journey."
        },
        {
            name: "Ethan Rivers",
            image: "src/assets/images/leader2.jpg",
            category: "mindfulness",
            description: "Mindfulness expert helping you cultivate presence and emotional awareness in daily life."
        },
        {
            name: "Leila Chen",
            image: "src/assets/images/leader2.jpg",
            category: "movement",
            description: "Yoga instructor guiding embodied movement practices for strength and inner peace."
        },
        {
            name: "Marcus Webb",
            image: "src/assets/images/leader1.jpg",
            category: "coaching",
            description: "Life coach specializing in personal growth and transformational goal achievement."
        },
        {
            name: "Sofia Mendez",
            image: "src/assets/images/leader1.jpg",
            category: "creative",
            description: "Art therapist exploring creative expression as a pathway to healing and self-discovery."
        },
        {
            name: "Aiden Forest",
            image: "src/assets/images/leader2.jpg",
            category: "spiritual",
            description: "Tarot reader offering intuitive guidance and symbolic wisdom for life's crossroads."
        },
        {
            name: "Nora Kim",
            image: "src/assets/images/leader1.jpg",
            category: "mindfulness",
            description: "Psychology expert specializing in emotional intelligence and relationship dynamics."
        },
        {
            name: "Kai Johnson",
            image: "src/assets/images/leader2.jpg",
            category: "movement",
            description: "Holistic wellness coach integrating movement, nutrition, and mindful living practices."
        }
    ];
    
    function renderLeaders(category = 'all') {
        leadersGrid.innerHTML = '';
        const filteredLeaders = category === 'all'
        ? leaders
        : leaders.filter(leader => leader.category === category);
        
        filteredLeaders.forEach(leader => {
            const leaderCard = document.createElement('div');
            leaderCard.className = 'leader__card';
            leaderCard.innerHTML = `
            <img src="${leader.image}" alt="${leader.name}" class="leader__image">
            <div class="leader__info">
            <h3 class="leader__name">${leader.name}</h3>
            <p class="leader__category">${leader.category.charAt(0).toUpperCase() + leader.category.slice(1)}</p>
            <p class="leader__description">${leader.description}</p>
            <a href="chat.html?leader=${leader.name.toLowerCase().replace(/\s+/g, '-')}" class="leader__button">Chat Now</a>
            </div>
            `;
            leadersGrid.appendChild(leaderCard);
        });
    }
    
    renderLeaders();
    
    filterButtons.forEach(button => {
        button.addEventListener('click', function () {
            const filter = this.getAttribute('data-filter');
            filterButtons.forEach(btn => btn.classList.remove('active'));
            this.classList.add('active');
            renderLeaders(filter);
        });
    });
});

// Chat page (chat.html)
document.addEventListener('DOMContentLoaded', function () {
    const chatForm = document.getElementById('chatForm');
    const chatInput = document.getElementById('chatInput');
    const chatWindow = document.getElementById('chatWindow');
    if (!chatForm || !chatInput || !chatWindow) return;
    
    chatForm.addEventListener('submit', function (e) {
        e.preventDefault();
        const userMsg = chatInput.value.trim();
        if (!userMsg) return;
        
        // Show user message
        const userDiv = document.createElement('div');
        userDiv.className = 'chat__message chat__message--user';
        userDiv.textContent = userMsg;
        chatWindow.appendChild(userDiv);
        
        // Simulate AI reply (replace with real AI backend if needed)
        setTimeout(() => {
            const aiDiv = document.createElement('div');
            aiDiv.className = 'chat__message chat__message--ai';
            aiDiv.textContent = "AI: " + getAIResponse(userMsg);
            chatWindow.appendChild(aiDiv);
            chatWindow.scrollTop = chatWindow.scrollHeight;
        }, 700);
        
        chatInput.value = '';
        chatWindow.scrollTop = chatWindow.scrollHeight;
    });
    
    function getAIResponse(msg) {
        if (msg.toLowerCase().includes('hello')) return "Hello! How can I help you today?";
        if (msg.toLowerCase().includes('who are you')) return "I'm ObserverAI, your personal AI assistant.";
        return "I have received your message: \"" + msg + "\"";
    }
});

// Profile/login/register link visibility (optional, if you use localStorage for auth)
document.addEventListener('DOMContentLoaded', function () {
    const profileLink = document.getElementById('profile__link');
    const loginLink = document.getElementById('login__link');
    const registerLink = document.getElementById('register__link');
    if (!profileLink || !loginLink || !registerLink) return;
    var loggedIn = localStorage.getItem('loggedIn');
    if (loggedIn === 'true') {
        profileLink.style.display = 'block';
        loginLink.style.display = 'none';
        registerLink.style.display = 'none';
    } else {
        profileLink.style.display = 'none';
        loginLink.style.display = 'block';
        registerLink.style.display = 'block';
    }
});

// Navbar mobile toggle
document.addEventListener('DOMContentLoaded', function () {
    const navbarToggle = document.getElementById('navbarToggle');
    const navbarLinks = document.getElementById('navbarLinks');
    if (navbarToggle && navbarLinks) {
        navbarToggle.onclick = function () {
            navbarLinks.classList.toggle('show');
        };
    }
});