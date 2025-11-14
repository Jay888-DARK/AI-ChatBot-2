 // ********** CONFIG (replace with your working API key) **********
const API_KEY = "AIzaSyAsedAXzWrXEBEOBdY09Xh7xfQ7wggvjqw"; // <-- PUT your working key here
const MODEL = "gemini-1.5-flash";

const modelNameEl = document.getElementById("model-name");
const chatBox = document.getElementById("chat-box");
const input = document.getElementById("user-input");
const sendBtn = document.getElementById("send-btn");

modelNameEl.innerText = MODEL;

// Add user/bot messages
function pushMessage(text, sender="bot") {
  const msg = document.createElement("div");
  msg.className = "message " + (sender === "user" ? "msg-user" : "msg-bot");
  msg.textContent = text;
  chatBox.appendChild(msg);
  chatBox.scrollTop = chatBox.scrollHeight;
}

// Typing indicator
function showTyping() {
  removeTyping();
  const t = document.createElement("div");
  t.id = "typing";
  t.className = "typing";
  t.innerText = "Gemini is typing…";
  chatBox.appendChild(t);
  chatBox.scrollTop = chatBox.scrollHeight;
}

function removeTyping() {
  const t = document.getElementById("typing");
  if (t) t.remove();
}

// Send request
async function sendMessage() {
  const text = input.value.trim();
  if (!text) return;

  pushMessage(text, "user");
  input.value = "";
  showTyping();

  try {
    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/${MODEL}:generateContent?key=${API_KEY}`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          contents: [{ parts: [{ text }] }]
        })
      }
    );

    removeTyping();

    if (!response.ok) {
      pushMessage("❌ API Error: " + response.statusText);
      return;
    }

    const data = await response.json();
    const reply = data?.candidates?.[0]?.content?.parts?.[0]?.text;

    pushMessage(reply || "⚠ No response from model");

  } catch (err) {
    removeTyping();
    pushMessage("❌ Network Error");
  }
}

sendBtn.addEventListener("click", sendMessage);
input.addEventListener("keypress", e => {
  if (e.key === "Enter") sendMessage();
});
