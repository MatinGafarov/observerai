// ===================== ƏSAS FUNKSIYALAR (OLDUĞU KIMI SAXLANILIR) =====================

// Navbar active link based on page
document.addEventListener('DOMContentLoaded', function () {
    const links = document.querySelectorAll('.navbar__links a, .navbar-links__link');
    const current = window.location.pathname.split('/').pop();
    links.forEach(link => {
        link.classList.remove('active');
        if ((current === '' || current === 'index.html') && link.getAttribute('href') === 'index.html') {
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
    const faqQuestions = document.querySelectorAll('.faq__question');
    if (faqQuestions.length === 0) return;
    
    faqQuestions.forEach(btn => {
        btn.addEventListener('click', function () {
            const isExpanded = this.getAttribute('aria-expanded') === 'true';
            this.setAttribute('aria-expanded', !isExpanded);
        });
    });
});

// Scroll fade-in animation for elements
document.addEventListener('DOMContentLoaded', function () {
    const scrollElements = document.querySelectorAll('.scroll__fade__in');
    if (scrollElements.length === 0) return;
    
    function handleScrollFadeIn() {
        scrollElements.forEach(el => {
            const elementPosition = el.getBoundingClientRect().top;
            const screenHeight = window.innerHeight;
            if (elementPosition < screenHeight * 0.9) {
                el.classList.add('visible');
            }
        });
    }
    
    window.addEventListener('scroll', handleScrollFadeIn);
    handleScrollFadeIn();
});

// ===================== EXPLORE.HTML LEADERS GRID =====================

// Leaders data - Explore page için
const leaders = [
    {
        name: "Maya Solaris",
        key: "maya-solaris", // Leaderchat üçün istifadə ediləcək unikal açar
        image: "src/assets/images/leader1.jpg",
        category: "spiritual",
        description: "Astrology guide offering cosmic wisdom and celestial insights for your spiritual journey."
    },
    {
        name: "Ethan Rivers",
        key: "ethan-rivers",
        image: "src/assets/images/leader2.jpg",
        category: "mindfulness",
        description: "Mindfulness expert helping you cultivate presence and emotional awareness in daily life."
    },
    {
        name: "Leila Chen",
        key: "leila-chen",
        image: "src/assets/images/leader2.jpg",
        category: "movement",
        description: "Yoga instructor guiding embodied movement practices for strength and inner peace."
    },
    {
        name: "Marcus Webb",
        key: "marcus-webb",
        image: "src/assets/images/leader1.jpg",
        category: "coaching",
        description: "Life coach specializing in personal growth and transformational goal achievement."
    },
    {
        name: "Sofia Mendez",
        key: "sofia-mendez",
        image: "src/assets/images/leader1.jpg",
        category: "creative",
        description: "Art therapist exploring creative expression as a pathway to healing and self-discovery."
    },
    {
        name: "Aiden Forest",
        key: "aiden-forest",
        image: "src/assets/images/leader2.jpg",
        category: "spiritual",
        description: "Tarot reader offering intuitive guidance and symbolic wisdom for life's crossroads."
    }
];

// Explore.html-də leaders grid funksiyası
document.addEventListener('DOMContentLoaded', function() {
    const leadersGrid = document.getElementById('leadersGrid');
    const filterButtons = document.querySelectorAll('.filter__button');
    if (!leadersGrid) return; // Əgər leadersGrid yoxdursa, davamını yerinə yetirmə
    
    // Leaders render funksiyası
    function renderLeaders(category = 'all') {
        leadersGrid.innerHTML = '';
        const filteredLeaders = category === 'all'
            ? leaders
            : leaders.filter(leader => leader.category === category);
        
        filteredLeaders.forEach(leader => {
            const leaderCard = document.createElement('div');
            leaderCard.className = 'leader__card';
            
            // Leader chat-ə keçid linki (key ilə)
            leaderCard.innerHTML = `
                <img src="${leader.image}" alt="${leader.name}" class="leader__image">
                <div class="leader__info">
                    <h3 class="leader__name">${leader.name}</h3>
                    <p class="leader__category">${leader.category.charAt(0).toUpperCase() + leader.category.slice(1)}</p>
                    <p class="leader__description">${leader.description}</p>
                    <a href="leaderchat.html?leader=${leader.key}" class="leader__button">Chat Now</a>
                </div>
            `;
            leadersGrid.appendChild(leaderCard);
        });
    }
    
    // İlk render
    renderLeaders();
    
    // Filter button-lar üçün event listener
    filterButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Aktiv filter-i təmizlə
            filterButtons.forEach(b => b.classList.remove('active'));
            // Bu button-u aktiv et
            this.classList.add('active');
            // Seçilmiş kateqoriya ilə liderleri render et
            renderLeaders(this.getAttribute('data-filter'));
        });
    });
});

// ===================== CHAT PAGE (CHAT.HTML) =====================

document.addEventListener('DOMContentLoaded', function() {
    const chatForm = document.getElementById('chatForm');
    const chatInput = document.getElementById('chatInput');
    const chatWindow = document.getElementById('chatWindow');
    
    if (!chatForm || !chatInput || !chatWindow) return;
    
    // Submit hadisəsi
    chatForm.addEventListener('submit', function(e) {
        e.preventDefault();
        const userMsg = chatInput.value.trim();
        if (!userMsg) return;
        
        // İstifadəçi mesajını göstər
        const userDiv = document.createElement('div');
        userDiv.className = 'chat__message user';
        userDiv.textContent = userMsg;
        chatWindow.appendChild(userDiv);
        
        // AI cavabını simulyasiya et
        setTimeout(() => {
            const aiDiv = document.createElement('div');
            aiDiv.className = 'chat__message ai';
            aiDiv.textContent = getAIResponse(userMsg);
            chatWindow.appendChild(aiDiv);
            chatWindow.scrollTop = chatWindow.scrollHeight;
        }, 700);
        
        chatInput.value = '';
        chatWindow.scrollTop = chatWindow.scrollHeight;
    });
    
    // Sadə AI cavab funksiyası
    function getAIResponse(msg) {
        const lowercaseMsg = msg.toLowerCase();
        
        if (lowercaseMsg.includes('hello') || lowercaseMsg.includes('hi')) {
            return "Hello! I'm ObserverAI. How can I assist you today?";
        }
        
        if (lowercaseMsg.includes('who are you')) {
            return "I am ObserverAI, your digital companion for exploring wisdom and insights across various disciplines. Would you like to learn more about our AI leaders?";
        }
        
        return "Thank you for your message. Would you like to explore specific topics with our specialized AI leaders? You can visit the 'Explore Leaders' page to find a guide that resonates with your interests.";
    }
});

// ===================== OTP VERIFICATION PAGE =====================

document.addEventListener('DOMContentLoaded', function() {
    const otpInputs = document.querySelectorAll('.otp__input');
    if (otpInputs.length === 0) return;
    
    // Avtomatik fokus və növbəti inputa keçid
    otpInputs.forEach((input, index) => {
        input.addEventListener('input', function() {
            if (this.value.length === 1) {
                if (index < otpInputs.length - 1) {
                    otpInputs[index + 1].focus();
                }
            }
        });
        
        // Backspace düyməsi
        input.addEventListener('keydown', function(e) {
            if (e.key === 'Backspace' && !this.value && index > 0) {
                otpInputs[index - 1].focus();
            }
        });
        
        // Paste funksiyası
        input.addEventListener('paste', function(e) {
            e.preventDefault();
            const pasteData = e.clipboardData.getData('text').trim();
            const digits = pasteData.split('').filter(char => /\d/.test(char)).slice(0, otpInputs.length);
            
            otpInputs.forEach((input, i) => {
                if (i < digits.length) {
                    input.value = digits[i];
                    if (i < otpInputs.length - 1) {
                        otpInputs[i + 1].focus();
                    }
                }
            });
        });
    });
    
    // OTP formunun göndərilməsi
    const otpForm = document.querySelector('.otp__form');
    if (otpForm) {
        otpForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            let otp = '';
            otpInputs.forEach(input => {
                otp += input.value;
            });
            
            // OTP-nin doğrulanması üçün server-ə göndərilməsi (demo üçün konsola yazılır)
            console.log('OTP submitted:', otp);
            
            // Demo məqsədi üçün 1 saniyə sonra yönləndirmə
            setTimeout(() => {
                window.location.href = 'profile.html';
            }, 1000);
        });
    }
});

// ===================== REGISTER FORM =====================
document.addEventListener('DOMContentLoaded', function() {
    const registerForm = document.getElementById('registerForm');
    if (registerForm) {
        registerForm.addEventListener('submit', function(e) {
            e.preventDefault();
            window.location.href = 'otp.html';
        });
    }
});

// ===================== LEADERCHAT DATA AND FUNCTIONALITY =====================

// Leader chat data - Liderlər haqqında ətraflı məlumat
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

// ===================== LEADERCHAT PAGE (LEADERCHAT.HTML) =====================

document.addEventListener('DOMContentLoaded', function() {
    // Yalnız leaderchat.html səhifəsində işlə
    const leaderMain = document.getElementById('leaderMain');
    const leaderList = document.getElementById('leaderList');
    
    if (!leaderMain || !leaderList) return;
    
    // URL-dən leaderin açarını əldə et
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
            <form class="leaderchat__form fade-in-up" id="chatForm">
                <input type="text" placeholder="Type your message..." required>
                <button type="submit">Send</button>
            </form>
        `;
        
        // Mesaj göndərmək funksiyası
        const chatForm = document.getElementById('chatForm');
        const messagesContainer = document.getElementById('messagesContainer');
        
        if (chatForm && messagesContainer) {
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
        }
        
        // Scroll aşağı
        if (messagesContainer) {
            messagesContainer.scrollTop = messagesContainer.scrollHeight;
        }
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
        if (!leaderKey) return;
        
        selectedLeaderKey = leaderKey;
        
        // Aktiv klası yenilə
        this.querySelectorAll('li').forEach(li => {
            li.classList.remove('active');
        });
        listItem.classList.add('active');
        
        // Chat pəncərəsini yenilə
        renderLeaderChat(leaderKey);
        
        // URL-i yenilə
        history.pushState({}, '', `?leader=${leaderKey}`);
    });
    
    // İlk yükləmədə seçilmiş lider üçün chat pəncərəsini göstər
    renderLeaderChat(selectedLeaderKey);
});
// Navbar Toggle Menu Function
document.addEventListener('DOMContentLoaded', function() {
    const navbarToggle = document.getElementById('navbarToggle');
    const navbarLinks = document.getElementById('navbarLinks');
    
    if (navbarToggle && navbarLinks) {
        navbarToggle.addEventListener('click', function() {
            navbarLinks.classList.toggle('show');
            
            // Toggle icon animasiyası üçün
            const spans = this.querySelectorAll('span');
            spans.forEach(span => span.classList.toggle('active'));
        });
    }
});