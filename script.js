 // ********** CONFIG (replace with your working API key) **********
const API_KEY = "AIzaSyAsedAXzWrXEBEOBdY09Xh7xfQ7wggvjqw"; // <-- PUT your working key here
const MODEL = "gemini-1.5-flash";                         // change if your key supports other model
// *****************************************************************

// UI elements
const modelNameEl = document.getElementById("model-name");
const statusEl = document.getElementById("status");
const chatBox = document.getElementById("chat-box");
const input = document.getElementById("user-input");
const sendBtn = document.getElementById("send-btn");

// Print model in UI & console
modelNameEl.innerText = MODEL;
console.log("Using model:", MODEL);

// Helper: add message
function pushMessage(text, who="bot", meta=null) {
  const el = document.createElement("div");
  el.className = "message " + (who === "user" ? "msg-user" : "msg-bot");
  el.textContent = text;
  if (meta) {
    const m = document.createElement("div");
    m.className = "meta";
    m.textContent = meta;
    el.appendChild(m);
  }
  chatBox.appendChild(el);
  chatBox.scrollTop = chatBox.scrollHeight;
}

// Typing indicator
function showTyping() {
  removeTyping();
  const t = document.createElement("div");
  t.id = "__typing";
  t.className = "typing";
  t.textContent = "Gemini is typing…";
  chatBox.appendChild(t);
  chatBox.scrollTop = chatBox.scrollHeight;
}
function removeTyping() {
  const t = document.getElementById("__typing");
  if (t) t.remove();
}

// Build API URL and log
const API_URL = `https://generativelanguage.googleapis.com/v1beta/models/${MODEL}:generateContent?key=${API_KEY}`;
console.log("API URL:", API_URL);

// Send message handler
async function sendMessage() {
  const txt = (input.value || "").trim();
  if (!txt) return;
  // UI
  pushMessage(txt, "user");
  input.value = "";
  input.disabled = true;
  sendBtn.disabled = true;
  showTyping();

  // Request body
  const body = {
    contents: [
      {
        parts: [{ text: txt }]
      }
    ]
  };

  try {
    // call
    const res = await fetch(API_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });

    // debug
    console.log("HTTP status:", res.status, res.statusText);

    if (!res.ok) {
      // show helpful error
      const txtErr = await res.text().catch(()=>null);
      removeTyping();
      pushMessage(`❌ API Error: ${res.status} ${res.statusText}\n${txtErr || ""}`, "bot");
      statusEl.innerHTML = `<span style="color:#ff6b6b">error</span>`;
      console.error("API error text:", txtErr);
      return;
    }

    const data = await res.json();
    console.log("API response:", data);

    // parse reply
    const reply = data?.candidates?.[0]?.content?.parts?.[0]?.text;
    if (reply) {
      removeTyping();
      pushMessage(reply, "bot");
      statusEl.innerHTML = `<span style="color:#5eead4">ok</span>`;
    } else {
      removeTyping();
      pushMessage("⚠️ No reply from model (empty). See console for response.", "bot");
      console.warn("Empty candidate:", data);
      statusEl.innerHTML = `<span style="color:#ffb020">no-reply</span>`;
    }
  } catch (err) {
    removeTyping();
    pushMessage("❌ Network or CORS error. See console.", "bot");
    console.error("Network/CORS error:", err);
    statusEl.innerHTML = `<span style="color:#ff6b6b">network</span>`;
  } finally {
    input.disabled = false;
    sendBtn.disabled = false;
    input.focus();
  }
}

// bindings
sendBtn.addEventListener("click", sendMessage);
input.addEventListener("keydown", (e)=> {
  if (e.key === "Enter") sendMessage();
});

// Shortcut: test API key by listing models (won't work if key restricted)
async function testListModels() {
  if (!API_KEY || API_KEY === "REPLACE_WITH_YOUR_VALID_CLOUD_API_KEY") {
    console.warn("Replace API_KEY in script.js with your cloud API key.");
    return;
  }
  try {
    const r = await fetch(`https://generativelanguage.googleapis.com/v1beta/models?key=${API_KEY}`);
    const json = await r.json();
    console.log("List models test:", r.status, json);
  } catch (e) {
    console.error("List models test error:", e);
  }
}
testListModels();
