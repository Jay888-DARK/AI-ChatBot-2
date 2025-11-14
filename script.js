const chatBox = document.getElementById("chat-box");
const userInput = document.getElementById("user-input");
const sendBtn = document.getElementById("send-btn");

sendBtn.addEventListener("click", sendMessage);
userInput.addEventListener("keypress", (e) => {
    if (e.key === "Enter") sendMessage();
});

async function sendMessage() {
    const query = userInput.value.trim();
    if (!query) return;
    appendMessage(query, "user");
    userInput.value = "";

    appendMessage("Typing...", "bot");

    try {
        const res = await fetch(`/research?query=${encodeURIComponent(query)}`);
        const data = await res.json();
        // Remove "Typing..." message
        chatBox.lastChild.remove();
        appendMessage(data.summary, "bot");
    } catch (err) {
        chatBox.lastChild.remove();
        appendMessage("Error: " + err.message, "bot");
    }
}

function appendMessage(text, sender) {
    const div = document.createElement("div");
    div.classList.add("message", sender);
    div.textContent = text;
    chatBox.appendChild(div);
    chatBox.scrollTop = chatBox.scrollHeight;
}
