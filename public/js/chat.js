document.addEventListener("DOMContentLoaded", () => {
  const messageInput = document.getElementById("message-input");
  const usernameElement = document.getElementById("username");
  const imageElement = document.getElementById("image");
  const messageBox = document.getElementById("message-box");

  const socket = io();

  document.querySelector("button").addEventListener("click", () => {
    const messageContent = messageInput.value.trim();

    if (messageContent !== "") {
      const username = usernameElement.textContent;
      const imageUrl = imageElement.src;
      socket.emit("message", { username, messageContent, image: imageUrl });
      messageInput.value = "";
    }
  });

  socket.on("new_message", (data) => {
    const messageDiv = document.createElement("div");

    messageDiv.innerHTML = `<img class="w-5 rounded-full" src="${data.image}" alt="" />
      <span class="text-sm">${data.username}</span><p class="pt-none">${data.messageContent}</p>`;
    messageBox.appendChild(messageDiv);
    messageDiv.scrollIntoView();
  });
});
