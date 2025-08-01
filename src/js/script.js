
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

  document.addEventListener("DOMContentLoaded", function () {
    const burger = document.getElementById('modernNavbarToggle');
    const links = document.getElementById('modernNavbarLinks');
    burger.addEventListener('click', () => {
      links.classList.toggle('open');
      burger.classList.toggle('open');
    });
  });
        document.addEventListener('DOMContentLoaded', function () {
            var loggedIn = localStorage.getItem('loggedIn');
            if (loggedIn === 'true') {
                document.getElementById('profile-link').style.display = 'block';
                document.getElementById('login-link').style.display = 'none';
                document.getElementById('register-link').style.display = 'none';
            } else {
                document.getElementById('profile-link').style.display = 'none';
                document.getElementById('login-link').style.display = 'block';
                document.getElementById('register-link').style.display = 'block';
            }
        });
        
     
        document.addEventListener('DOMContentLoaded', function() {
            // Sample leader data
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
                    image: "src/assets/images/leader3.jpg",
                    category: "movement",
                    description: "Yoga instructor guiding embodied movement practices for strength and inner peace."
                },
                {
                    name: "Marcus Webb",
                    image: "src/assets/images/leader4.jpg",
                    category: "coaching",
                    description: "Life coach specializing in personal growth and transformational goal achievement."
                },
                {
                    name: "Sofia Mendez",
                    image: "src/assets/images/leader5.jpg",
                    category: "creative",
                    description: "Art therapist exploring creative expression as a pathway to healing and self-discovery."
                },
                {
                    name: "Aiden Forest",
                    image: "src/assets/images/leader6.jpg",
                    category: "spiritual",
                    description: "Tarot reader offering intuitive guidance and symbolic wisdom for life's crossroads."
                },
                {
                    name: "Nora Kim",
                    image: "src/assets/images/leader7.jpg",
                    category: "mindfulness",
                    description: "Psychology expert specializing in emotional intelligence and relationship dynamics."
                },
                {
                    name: "Kai Johnson",
                    image: "src/assets/images/leader8.jpg",
                    category: "movement",
                    description: "Holistic wellness coach integrating movement, nutrition, and mindful living practices."
                }
            ];
            
            const leadersGrid = document.getElementById('leadersGrid');
            const filterButtons = document.querySelectorAll('.filter-button');
            
            // Function to render leaders
            function renderLeaders(category = 'all') {
                leadersGrid.innerHTML = '';
                
                const filteredLeaders = category === 'all' 
                    ? leaders 
                    : leaders.filter(leader => leader.category === category);
                
                filteredLeaders.forEach(leader => {
                    const leaderCard = document.createElement('div');
                    leaderCard.className = 'leader-card';
                    leaderCard.innerHTML = `
                        <img src="${leader.image}" alt="${leader.name}" class="leader-image">
                        <div class="leader-info">
                            <h3 class="leader-name">${leader.name}</h3>
                            <p class="leader-category">${leader.category.charAt(0).toUpperCase() + leader.category.slice(1)}</p>
                            <p class="leader-description">${leader.description}</p>
                            <a href="chat.html?leader=${leader.name.toLowerCase().replace(' ', '-')}" class="leader-button">Chat Now</a>
                        </div>
                    `;
                    leadersGrid.appendChild(leaderCard);
                });
            }
            
            // Initial render
            renderLeaders();
            
            // Filter functionality
            filterButtons.forEach(button => {
                button.addEventListener('click', function() {
                    const filter = this.getAttribute('data-filter');
                    
                    // Update active state
                    filterButtons.forEach(btn => btn.classList.remove('active'));
                    this.classList.add('active');
                    
                    // Render filtered leaders
                    renderLeaders(filter);
                });
            });
        });
       // Sample JavaScript for the leaders grid
        document.addEventListener('DOMContentLoaded', function() {
            // Sample leader data
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
                    image: "src/assets/images/leader3.jpg",
                    category: "movement",
                    description: "Yoga instructor guiding embodied movement practices for strength and inner peace."
                },
                {
                    name: "Marcus Webb",
                    image: "src/assets/images/leader4.jpg",
                    category: "coaching",
                    description: "Life coach specializing in personal growth and transformational goal achievement."
                },
                {
                    name: "Sofia Mendez",
                    image: "src/assets/images/leader5.jpg",
                    category: "creative",
                    description: "Art therapist exploring creative expression as a pathway to healing and self-discovery."
                },
                {
                    name: "Aiden Forest",
                    image: "src/assets/images/leader6.jpg",
                    category: "spiritual",
                    description: "Tarot reader offering intuitive guidance and symbolic wisdom for life's crossroads."
                },
                {
                    name: "Nora Kim",
                    image: "src/assets/images/leader7.jpg",
                    category: "mindfulness",
                    description: "Psychology expert specializing in emotional intelligence and relationship dynamics."
                },
                {
                    name: "Kai Johnson",
                    image: "src/assets/images/leader8.jpg",
                    category: "movement",
                    description: "Holistic wellness coach integrating movement, nutrition, and mindful living practices."
                }
            ];
            
            const leadersGrid = document.getElementById('leadersGrid');
            const filterButtons = document.querySelectorAll('.filter-button');
            
            // Function to render leaders
            function renderLeaders(category = 'all') {
                leadersGrid.innerHTML = '';
                
                const filteredLeaders = category === 'all' 
                    ? leaders 
                    : leaders.filter(leader => leader.category === category);
                
                filteredLeaders.forEach(leader => {
                    const leaderCard = document.createElement('div');
                    leaderCard.className = 'leader-card';
                    leaderCard.innerHTML = `
                        <img src="${leader.image}" alt="${leader.name}" class="leader-image">
                        <div class="leader-info">
                            <h3 class="leader-name">${leader.name}</h3>
                            <p class="leader-category">${leader.category.charAt(0).toUpperCase() + leader.category.slice(1)}</p>
                            <p class="leader-description">${leader.description}</p>
                            <a href="chat.html?leader=${leader.name.toLowerCase().replace(' ', '-')}" class="leader-button">Chat Now</a>
                        </div>
                    `;
                    leadersGrid.appendChild(leaderCard);
                });
            }
            
            // Initial render
            renderLeaders();
            
            // Filter functionality
            filterButtons.forEach(button => {
                button.addEventListener('click', function() {
                    const filter = this.getAttribute('data-filter');
                    
                    // Update active state
                    filterButtons.forEach(btn => btn.classList.remove('active'));
                    this.classList.add('active');
                    
                    // Render filtered leaders
                    renderLeaders(filter);
                });
            });
        });
        const chatForm = document.getElementById('chatForm');
const chatInput = document.getElementById('chatInput');
const chatWindow = document.getElementById('chatWindow');

chatForm.addEventListener('submit', function(e) {
    e.preventDefault();
    const userMsg = chatInput.value.trim();
    if (!userMsg) return;

    // Show user message
    const userDiv = document.createElement('div');
    userDiv.className = 'chat-message user';
    userDiv.textContent = userMsg;
    chatWindow.appendChild(userDiv);

    // Simulate AI reply (replace with real AI backend if needed)
    setTimeout(() => {
        const aiDiv = document.createElement('div');
        aiDiv.className = 'chat-message ai';
        aiDiv.textContent = "AI: " + getAIResponse(userMsg);
        chatWindow.appendChild(aiDiv);
        chatWindow.scrollTop = chatWindow.scrollHeight;
    }, 700);

    chatInput.value = '';
    chatWindow.scrollTop = chatWindow.scrollHeight;
});

// Simple AI response for demo
function getAIResponse(msg) {
    // You can integrate backend here
    if (msg.toLowerCase().includes('hello')) return "Hello! How can I help you today?";
    if (msg.toLowerCase().includes('who are you')) return "I'm ObserverAI, your personal AI assistant.";
    return "I have received your message: \"" + msg + "\"";
}

document.addEventListener('DOMContentLoaded', function() {
    // Set animation delay for category cards
    const categoryCards = document.querySelectorAll('.category-card');
    categoryCards.forEach((card, index) => {
        card.style.setProperty('--card-index', index);
    });
    
    // Set animation delay for filter buttons
    const filterButtons = document.querySelectorAll('.filter-button');
    filterButtons.forEach((button, index) => {
        button.style.setProperty('--button-index', index);
    });
});
document.addEventListener('DOMContentLoaded', function() {
    // Scroll fade-in animation
    const scrollFadeElements = document.querySelectorAll('.scroll-fade-in');
    
    const fadeInOnScroll = () => {
        scrollFadeElements.forEach(element => {
            const elementTop = element.getBoundingClientRect().top;
            const elementVisible = 150;
            
            if (elementTop < window.innerHeight - elementVisible) {
                element.classList.add('visible');
            }
        });
    };
    
    // Initial check for elements in view
    fadeInOnScroll();
    
    // Check on scroll
    window.addEventListener('scroll', fadeInOnScroll);
    
    // Scroll to top button
    const scrollToTopBtn = document.getElementById('scrollToTopBtn');
    
    const scrollFunction = () => {
        if (document.body.scrollTop > 500 || document.documentElement.scrollTop > 500) {
            scrollToTopBtn.classList.add('show');
        } else {
            scrollToTopBtn.classList.remove('show');
        }
    };
    
    window.addEventListener('scroll', scrollFunction);
    
    scrollToTopBtn.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
    
    // Add animation delay to FAQ items
    const faqItems = document.querySelectorAll('.faq-item');
    faqItems.forEach((item, index) => {
        item.style.animationDelay = `${0.3 + (index * 0.1)}s`;
    });
    
    // FAQ functionality
    const faqQuestions = document.querySelectorAll('.faq-question');
    
    faqQuestions.forEach(question => {
        question.addEventListener('click', () => {
            const expanded = question.getAttribute('aria-expanded') === 'true';
            question.setAttribute('aria-expanded', !expanded);
        });
    });
});