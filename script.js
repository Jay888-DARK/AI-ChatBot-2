body {
    background: #111;
    margin: 0;
    font-family: Arial, sans-serif;
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100vh;
}

.chat-container {
    background: #1c1c1c;
    width: 480px;
    height: 700px;
    border-radius: 12px;
    display: flex;
    flex-direction: column;
    border: 1px solid #333;
}

.header {
    padding: 15px;
    background: #222;
    text-align: center;
    color: #0ff;
    font-size: 20px;
    font-weight: bold;
    border-bottom: 1px solid #333;
}

.chat-box {
    flex: 1;
    padding: 15px;
    overflow-y: auto;
}

.message {
    margin: 10px 0;
    padding: 12px 16px;
    border-radius: 8px;
    max-width: 80%;
    animation: fade 0.2s ease-in-out;
    line-height: 1.4;
}

.user {
    background: #0a84ff;
    color: #fff;
    margin-left: auto;
}

.bot {
    background: #333;
    color: #fff;
    margin-right: auto;
}

.input-area {
    padding: 10px;
    display: flex;
}

#user-input {
    flex: 1;
    padding: 10px;
    background: #333;
    border: none;
    border-radius: 5px;
    color: #fff;
}

#send-btn {
    margin-left: 10px;
    padding: 10px 18px;
    background: #0a84ff;
    color: #fff;
    border: none;
    border-radius: 5px;
    cursor: pointer;
}

@keyframes fade {
    from { opacity: 0; transform: translateY(5px); }
    to { opacity: 1; transform: translateY(0); }
}
