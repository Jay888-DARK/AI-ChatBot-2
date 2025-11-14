// ⭐ Put your real Gemini API key
const API_KEY = "AIzaSyDMWjtHM19Ncp0Kll2v33cak6L_dVhvJwQ";

// ⭐ Gemini model
const MODEL = "gemini-1.5-flash";
const API_URL = `https://generativelanguage.googleapis.com/v1beta/models/${MODEL}:generateContent?key=${API_KEY}`;

console.log("Model Loaded:", MODEL);

const chatWindow = document.getElementById("chat-window");
const input = document.getElementById("user-input");
const sendBtn = document.getElementById("send-btn");

// Add message to UI
function addMessage(text, sender) {
    const msg = document.createElement("div");
    msg.classList.add("message", sender);
    msg.textContent = text;
    chatWindow.appendChild(msg);
    chatWindow.scrollTop = chatWindow.scrollHeight;
}

// Typing animation
function showTyping() {
    const typing = document.createElement("div");
    typing.id = "typing";
    typing.classList.add("typing");
    typing.innerText = "Gemini is typing...";
    chatWindow.appendChild(typing);
    chatWindow.scrollTop = chatWindow.scrollHeight;
}

function removeTyping() {
    const typing = document.getElementById("typing");
    if (typing) typing.remove();
}

// Send message to Gemini
async function sendMessage() {
    const text = input.value.trim();
    if (text === "") return;

    addMessage(text, "user");
    input.value = "";

    showTyping();

    try {
        const body = {
            contents: [
                {
                    parts: [{ text }]
                }
            ]
        };

        const response = await fetch(API_URL, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(body)
        });

        const json = await response.json();
        removeTyping();

        if (json.error) {
            addMessage("❌ Error: " + json.error.message, "bot");
            return;
        }

        const output = json.candidates?.[0]?.content?.parts?.[0]?.text;

        if (output) {
            addMessage(output, "bot");
        } else {
            addMessage("⚠ No Response from Gemini", "bot");
        }

    } catch (err) {
        removeTyping();
        addMessage("⚠ Network Error: " + err.message, "bot");
    }
}

// Event Listeners
sendBtn.addEventListener("click", sendMessage);

input.addEventListener("keydown", (e) => {
    if (e.key === "Enter") sendMessage();
});
