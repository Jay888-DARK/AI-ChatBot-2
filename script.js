async function sendMessage() {
    const apiKey = "AIzaSyAsedAXzWrXEBEOBdY09Xh7xfQ7wggvjqw";
    const userInput = document.getElementById("userInput").value;
    if (!userInput) return;

    addMessage("user", userInput);
    document.getElementById("userInput").value = "";

    const response = await fetch(
        `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey}`,
        {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                contents: [{
                    parts: [{ text: userInput }]
                }]
            })
        }
    );

    const result = await response.json();

    try {
        const botReply =
            result.candidates?.[0]?.content?.parts?.[0]?.text ||
            "⚠️ API Error: No response";

        addMessage("bot", botReply);
    } catch (e) {
        addMessage("bot", "⚠️ Error reading response");
    }
}

function addMessage(sender, text) {
    const chatbox = document.getElementById("chatbox");
    const msg = document.createElement("div");
    msg.className = sender;
    msg.innerText = (sender === "user" ? "🧑 You: " : "🤖 Bot: ") + text;
    chatbox.appendChild(msg);
    chatbox.scrollTop = chatbox.scrollHeight;
}
