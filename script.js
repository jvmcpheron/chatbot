function getResponse(userInput) {
    const splitMessage = userInput.toLowerCase().split(/\s+|[,;?!.-]\s*/);
    const response = checkAllMessages(splitMessage);
    return response;
}

document.addEventListener("DOMContentLoaded", function() {
    const chatLog = document.getElementById("chat-log");
    const userMessageInput = document.getElementById("user-message");
    const sendButton = document.getElementById("send-button");

    function addMessageToChatLog(message, sender) {
        const messageElement = document.createElement("div");
        messageElement.className = sender === "user" ? "user-message" : "bot-message";
        messageElement.textContent = message;
        chatLog.appendChild(messageElement);
        chatLog.scrollTop = chatLog.scrollHeight;
    }

    function processUserInput() {
        const userInput = userMessageInput.value.trim();
        if (userInput !== "") {
            addMessageToChatLog(userInput, "user");
            const botResponse = getResponse(userInput);
            addMessageToChatLog(botResponse, "bot");
            userMessageInput.value = "";
        }
    }

    sendButton.addEventListener("click", processUserInput);
    userMessageInput.addEventListener("keydown", function(event) {
        if (event.key === "Enter") {
            event.preventDefault();
            processUserInput();
        }
    });

    userMessageInput.focus();
});