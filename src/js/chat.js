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