const API_KEY = "AIzaSyDMWjtHM19Ncp0Kll2v33cak6L_dVhvJwQ";
const API_URL = "https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=" + API_KEY;

const chatBox = document.getElementById("chat-box");
const input = document.getElementById("user-input");
const sendBtn = document.getElementById("send-btn");

function addMessage(text, sender) {
    const msg = document.createElement("div");
    msg.classList.add("message", sender);
    msg.innerText = text;
    chatBox.appendChild(msg);
    chatBox.scrollTop = chatBox.scrollHeight;
}

// typing animation
function showTyping() {
    const typing = document.createElement("div");
    typing.classList.add("message", "bot");
    typing.innerText = "Typing...";
    chatBox.appendChild(typing);
    chatBox.scrollTop = chatBox.scrollHeight;
    return typing;
}

async function sendMessage() {
    const text = input.value.trim();
    if (!text) return;

    addMessage(text, "user");
    input.value = "";

    const typingBubble = showTyping();

    const body = {
        contents: [
            { role: "user", parts: [{ text }] }
        ]
        };

    const res = await fetch(API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body)
    });

    const data = await res.json();
    chatBox.removeChild(typingBubble);

    const reply =
        data?.candidates?.[0]?.content?.parts?.[0]?.text ||
        "Error: No response.";

    addMessage(reply, "bot");
}

sendBtn.addEventListener("click", sendMessage);
input.addEventListener("keypress", e => {
    if (e.key === "Enter") sendMessage();
});
