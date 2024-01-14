document.addEventListener("DOMContentLoaded", () => {
  const messageInput = document.getElementById("message-input");
  const usernameElement = document.getElementById("username");
  const messageBox = document.getElementById("message-box");

  const socket = io();

  document.querySelector("button").addEventListener("click", () => {
    const messageContent = messageInput.value.trim();

    if (messageContent !== "") {
      const username = usernameElement.textContent;
      socket.emit("message", { username, messageContent });
      messageInput.value = "";
    }
  });

  socket.on("new_message", (data) => {
    const messageDiv = document.createElement("div");

    messageDiv.innerHTML = `
      <span class="text-sm">${data.username}</span><p class="pt-none">${data.messageContent}</p>`;
    messageBox.appendChild(messageDiv);
    messageDiv.scrollIntoView();
  });
});
