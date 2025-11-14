body {
    margin: 0;
    background: #121212;
    color: white;
    font-family: Arial, sans-serif;
}

.chat-container {
    max-width: 700px;
    margin: auto;
    height: 100vh;
    display: flex;
    flex-direction: column;
}

.chat-box {
    flex: 1;
    padding: 15px;
    overflow-y: auto;
}

.message {
    padding: 12px 16px;
    border-radius: 12px;
    margin: 8px 0;
    width: fit-content;
    max-width: 80%;
}

.user {
    background: #0b93f6;
    margin-left: auto;
}

.bot {
    background: #262626;
}

.input-area {
    display: flex;
    padding: 10px;
    background: #1e1e1e;
}

#user-input {
    flex: 1;
    padding: 12px;
    border: none;
    border-radius: 8px;
}

#send-btn {
    padding: 12px 18px;
    margin-left: 10px;
    border: none;
    border-radius: 8px;
    background: #0b93f6;
    color: white;
    cursor: pointer;
}
