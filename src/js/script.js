
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

document.addEventListener('DOMContentLoaded', function() {
    const inputs = document.querySelectorAll('.otp__input');
    
    // Auto-focus and move to next input
    inputs.forEach((input, index) => {
        input.addEventListener('input', function() {
            if (this.value.length === this.maxLength) {
                if (index < inputs.length - 1) {
                    inputs[index + 1].focus();
                }
            }
        });
        
        // Handle backspace
        input.addEventListener('keydown', function(e) {
            if (e.key === 'Backspace' && !this.value && index > 0) {
                inputs[index - 1].focus();
            }
        });
        
        // Handle paste
        input.addEventListener('paste', function(e) {
            e.preventDefault();
            const pasteData = e.clipboardData.getData('text').trim();
            
            if (!/^\d+$/.test(pasteData)) return; // Only allow digits
            
            const digits = pasteData.split('');
            
            inputs.forEach((input, i) => {
                if (i < digits.length) {
                    input.value = digits[i];
                    if (i < inputs.length - 1) {
                        inputs[i + 1].focus();
                    }
                }
            });
        });
    });
    
    // Form submission
    document.querySelector('.otp__form').addEventListener('submit', function(e) {
        e.preventDefault();
        
        let otp = '';
        inputs.forEach(input => {
            otp += input.value;
        });
        
        // Here you would typically send the OTP to your server for verification
        console.log('OTP submitted:', otp);
        
        // For demo purposes, redirect to profile page after 1 second
        setTimeout(() => {
            window.location.href = 'profile.html';
        }, 1000);
    });
});
     // OTP yönləndirməsi üçün
    document.getElementById('registerForm').addEventListener('submit', function(e) {
        e.preventDefault();
        window.location.href = 'otp.html';
    });
    // ====================== LEADER CHAT FUNCTIONALITY ======================
// Lider məlumatları
const leaderChatData = {
    "maya-solaris": {
        name: "Maya Solaris",
        key: "maya-solaris",
        img: "src/assets/images/leader1.jpg",
        category: "spiritual",
        messages: [
            { from: "leader", text: "Welcome to ObserverAI! I'm Maya Solaris, your spiritual guide. How can I help you today?" },
            { from: "user", text: "Hi Maya! I'm interested in learning about astrology." },
            { from: "leader", text: "That's wonderful! Astrology is a beautiful system for understanding cosmic patterns and their influence on our lives. Would you like to learn about your sun sign or how astrology can guide your daily life?" }
        ]
    },
    "ethan-rivers": {
        name: "Ethan Rivers",
        key: "ethan-rivers",
        img: "src/assets/images/leader2.jpg",
        category: "mindfulness",
        messages: [
            { from: "leader", text: "Hello! I'm Ethan Rivers, your mindfulness guide. How are you feeling today?" },
            { from: "user", text: "I'm feeling a bit stressed lately." },
            { from: "leader", text: "I understand. Stress is a natural part of life, but we can learn to relate to it differently. Would you like to try a quick breathing exercise to center yourself, or shall we explore what's causing your stress?" }
        ]
    },
    "leila-chen": {
        name: "Leila Chen",
        key: "leila-chen",
        img: "src/assets/images/leader2.jpg",
        category: "movement",
        messages: [
            { from: "leader", text: "Hi there! I'm Leila Chen, your movement and body wellness guide. How can I support your physical wellbeing today?" },
            { from: "user", text: "I'm looking for exercises to help with lower back pain." },
            { from: "leader", text: "I'd be happy to help with that! Lower back pain can be challenging. Let me suggest some gentle stretches and strengthening exercises that can provide relief. Would you prefer seated, standing, or floor exercises to start with?" }
        ]
    },
    "marcus-webb": {
        name: "Marcus Webb",
        key: "marcus-webb",
        img: "src/assets/images/leader1.jpg",
        category: "coaching",
        messages: [
            { from: "leader", text: "Welcome! I'm Marcus Webb, your personal growth coach. What aspect of your life are you looking to develop?" },
            { from: "user", text: "I'm trying to build better habits." },
            { from: "leader", text: "Building better habits is a fantastic goal! Small, consistent changes can transform your life over time. Let's talk about which habits you'd like to develop and create a sustainable approach that works for your lifestyle." }
        ]
    },
    "sofia-mendez": {
        name: "Sofia Mendez",
        key: "sofia-mendez",
        img: "src/assets/images/leader1.jpg",
        category: "creative",
        messages: [
            { from: "leader", text: "Hello creative soul! I'm Sofia Mendez, your guide in the creative arts. How would you like to express yourself today?" },
            { from: "user", text: "I've always wanted to try painting but don't know where to start." },
            { from: "leader", text: "It's wonderful that you want to explore painting! Everyone starts somewhere, and the joy is in the journey. Would you prefer to begin with watercolors, acrylics, or perhaps simple sketching to build confidence first?" }
        ]
    },
    "aiden-forest": {
        name: "Aiden Forest",
        key: "aiden-forest",
        img: "src/assets/images/leader2.jpg",
        category: "spiritual",
        messages: [
            { from: "leader", text: "Greetings! I'm Aiden Forest, your tarot and intuition guide. What brings you to our conversation today?" },
            { from: "user", text: "I'm curious about tarot readings." },
            { from: "leader", text: "Tarot is a fascinating tool for self-reflection and insight! The cards can offer new perspectives on your life journey. Would you like to learn about the basic structure of the tarot deck, or would you prefer to explore how a reading might work?" }
        ]
    }
};

// Leader chat səhifəsi və funksiyaları
document.addEventListener('DOMContentLoaded', function() {
    // Yalnız leaderchat.html səhifəsində işləsin
    const leaderMain = document.getElementById('leaderMain');
    const leaderList = document.getElementById('leaderList');
    
    if (!leaderMain || !leaderList) return;
    
    // URL-dən lideri oxu
    const urlParams = new URLSearchParams(window.location.search);
    let selectedLeaderKey = urlParams.get('leader') || 'maya-solaris';
    
    // Sidebar-a liderləri əlavə et
    for (const leaderKey in leaderChatData) {
        const leader = leaderChatData[leaderKey];
        const li = document.createElement('li');
        li.setAttribute('data-leader', leaderKey);
        li.innerHTML = `<img src="${leader.img}" alt="${leader.name}">${leader.name}`;
        
        if (leaderKey === selectedLeaderKey) {
            li.classList.add('active');
        }
        
        leaderList.appendChild(li);
    }
    
    // Chat pəncərəsini göstər
    function renderLeaderChat(leaderKey) {
        const leader = leaderChatData[leaderKey];
        if (!leader) {
            leaderMain.innerHTML = `
                <div class="leaderchat__empty">
                    <img src="src/assets/images/profile svg.svg" alt="No Leader">
                    <p>Leader not found</p>
                </div>
            `;
            return;
        }
        
        // Chat başlığı və mesajları əlavə et
        leaderMain.innerHTML = `
            <div class="leaderchat__header fade-in">
                <img src="${leader.img}" alt="${leader.name}">
                <span>${leader.name}</span>
            </div>
            <div class="leaderchat__messages fade-in-up" id="messagesContainer">
                ${leader.messages.map(message => `
                    <div class="leaderchat__message leaderchat__message--${message.from}">
                        <span class="leaderchat__avatar"></span>
                        <div class="leaderchat__bubble">${message.text}</div>
                    </div>
                `).join('')}
            </div>
            <form class="leaderchat__form" id="chatForm">
                <input type="text" placeholder="Type your message..." required>
                <button type="submit">Send</button>
            </form>
        `;
        
        // Mesaj göndərmək funksiyası
        const chatForm = document.getElementById('chatForm');
        const messagesContainer = document.getElementById('messagesContainer');
        
        chatForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const input = this.querySelector('input');
            const message = input.value.trim();
            
            if (!message) return;
            
            // İstifadəçi mesajını göstər
            const userMessageDiv = document.createElement('div');
            userMessageDiv.className = 'leaderchat__message leaderchat__message--user';
            userMessageDiv.innerHTML = `
                <span class="leaderchat__avatar"></span>
                <div class="leaderchat__bubble">${message}</div>
            `;
            messagesContainer.appendChild(userMessageDiv);
            
            // Mesajı lider məlumatlarına əlavə et
            leader.messages.push({ from: 'user', text: message });
            
            // İnputu təmizlə
            input.value = '';
            
            // Aşağıya scroll et
            messagesContainer.scrollTop = messagesContainer.scrollHeight;
            
            // Liderin cavabını gözlət və göstər (simulyasiya)
            setTimeout(() => {
                // Liderin cavabını əlavə et
                const leaderResponse = getLeaderResponse(leader, message);
                const leaderMessageDiv = document.createElement('div');
                leaderMessageDiv.className = 'leaderchat__message leaderchat__message--leader';
                leaderMessageDiv.innerHTML = `
                    <span class="leaderchat__avatar"></span>
                    <div class="leaderchat__bubble">${leaderResponse}</div>
                `;
                messagesContainer.appendChild(leaderMessageDiv);
                
                // Mesajı lider məlumatlarına əlavə et
                leader.messages.push({ from: 'leader', text: leaderResponse });
                
                // Aşağıya scroll et
                messagesContainer.scrollTop = messagesContainer.scrollHeight;
            }, 1000);
        });
        
        // Scroll aşağı
        messagesContainer.scrollTop = messagesContainer.scrollHeight;
    }
    
    // Sadə AI cavabları (gerçək AI yerinə)
    function getLeaderResponse(leader, userMessage) {
        const lowerMessage = userMessage.toLowerCase();
        const category = leader.category;
        
        // Ümumi cavablar
        if (lowerMessage.includes('hello') || lowerMessage.includes('hi')) {
            return `Hello! It's great to connect with you. How can I support your ${category} journey today?`;
        }
        
        if (lowerMessage.includes('thank') || lowerMessage.includes('thanks')) {
            return "You're welcome! I'm here to support you anytime you need guidance.";
        }
        
        if (lowerMessage.includes('bye') || lowerMessage.includes('goodbye')) {
            return "Farewell for now! Remember that you can return anytime for more guidance. Take care!";
        }
        
        // Kateqoriyaya əsaslanan cavablar
        if (category === 'spiritual') {
            if (lowerMessage.includes('tarot') || lowerMessage.includes('cards')) {
                return "Tarot cards are a wonderful tool for spiritual guidance. Each card carries symbols and energies that can offer insights into your journey. What specific aspect of tarot interests you?";
            }
            if (lowerMessage.includes('meditation') || lowerMessage.includes('meditate')) {
                return "Meditation is a powerful practice for connecting with your spiritual essence. Would you like a simple meditation technique to try, or are you looking to deepen an existing practice?";
            }
            return "That's an interesting spiritual question. The universe often speaks to us in subtle ways. Would you like to explore this topic further through intuitive guidance or perhaps a spiritual practice?";
        }
        
        if (category === 'mindfulness') {
            if (lowerMessage.includes('stress') || lowerMessage.includes('anxiety')) {
                return "I understand how challenging stress can be. Let's try a simple mindfulness technique: take three slow, deep breaths, focusing only on the sensation of breathing. How do you feel after this brief pause?";
            }
            if (lowerMessage.includes('focus') || lowerMessage.includes('concentrate')) {
                return "Improving focus through mindfulness is about gently training your attention. Try setting a timer for 5 minutes and simply notice your breath. When your mind wanders (and it will), gently bring it back without judgment.";
            }
            return "Mindfulness invites us to be fully present with whatever arises. What's one small moment today where you could practice being fully present?";
        }
        
        if (category === 'movement') {
            if (lowerMessage.includes('pain') || lowerMessage.includes('injury')) {
                return "I'm sorry to hear you're experiencing discomfort. While I can offer general movement suggestions, it's important to consult a healthcare professional for persistent pain. Would gentle stretching be appropriate for you right now?";
            }
            if (lowerMessage.includes('yoga') || lowerMessage.includes('stretch')) {
                return "Yoga and stretching can be wonderful for both body and mind. A simple practice to try is a gentle forward fold - stand with feet hip-width apart, and slowly fold forward, allowing your upper body to hang heavy. How does that feel in your body?";
            }
            return "Our bodies are designed for movement. Even small amounts of intentional movement can bring great benefits. What type of movement brings you joy?";
        }
        
        // Default cavab
        return `Thank you for sharing that with me. As your ${category} guide, I'm here to support your journey. What specific aspect of this would you like to explore further?`;
    }
    
    // Sidebar-da lider seçimini izlə
    leaderList.addEventListener('click', function(e) {
        const listItem = e.target.closest('li');
        if (!listItem) return;
        
        // Aktiv lideri yenilə
        const leaderKey = listItem.getAttribute('data-leader');
        selectedLeaderKey = leaderKey;
        
        // Aktiv klası yenilə
        document.querySelectorAll('#leaderList li').forEach(li => {
            li.classList.remove('active');
        });
        listItem.classList.add('active');
        
        // Chat pəncərəsini yenilə
        renderLeaderChat(leaderKey);
        
        // URL-i yenilə (optional)
        history.pushState({}, '', `?leader=${leaderKey}`);
    });
    
    // İlk yükləmədə seçilmiş lider üçün chat pəncərəsini göstər
    renderLeaderChat(selectedLeaderKey);
});

// Leaders grid-də Chat Now düyməsini yenilə (explore.html üçün)
document.addEventListener('DOMContentLoaded', function() {
    const leadersGrid = document.getElementById('leadersGrid');
    if (!leadersGrid) return;
    
    // Mövcud leaders render funksiyasını override et
    window.renderLeaders = function(category = 'all') {
        leadersGrid.innerHTML = '';
        const filteredLeaders = category === 'all'
            ? leaders
            : leaders.filter(leader => leader.category === category);
        
        filteredLeaders.forEach(leader => {
            const leaderCard = document.createElement('div');
            leaderCard.className = 'leader__card';
            
            // Leader key yaratmaq üçün ad formatlaşdır
            const leaderKey = leader.name.toLowerCase().replace(/\s+/g, '-');
            
            leaderCard.innerHTML = `
                <img src="${leader.image}" alt="${leader.name}" class="leader__image">
                <div class="leader__info">
                    <h3 class="leader__name">${leader.name}</h3>
                    <p class="leader__category">${leader.category.charAt(0).toUpperCase() + leader.category.slice(1)}</p>
                    <p class="leader__description">${leader.description}</p>
                    <a href="leaderchat.html?leader=${leaderKey}" class="leader__button">Chat Now</a>
                </div>
            `;
            leadersGrid.appendChild(leaderCard);
        });
    };
    
    // İlk dəfə render et
    renderLeaders();
});
