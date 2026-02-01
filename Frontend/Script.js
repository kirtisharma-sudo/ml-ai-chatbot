const chatBtn = document.getElementById("chat-btn");
const chatbox = document.getElementById("chatbox");
const messagesDiv = document.getElementById("messages");

chatBtn.onclick = () => {
  chatbox.classList.toggle("hidden");
  loadHistory();
};

function loadHistory() {
  messagesDiv.innerHTML = "";
  const history = JSON.parse(localStorage.getItem("ml_chat")) || [];
  history.forEach(msg => {
    messagesDiv.innerHTML += `<p><b>${msg.role}:</b> ${msg.text}</p>`;
  });
}

async function sendMessage() {
  const input = document.getElementById("userInput");
  const text = input.value;
  if (!text) return;

  saveMessage("You", text);
  input.value = "";

  const res = await fetch("https://YOUR_BACKEND_URL/chat", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ message: text })
  });

  const data = await res.json();
  saveMessage("AI", data.reply);
}

function saveMessage(role, text) {
  const history = JSON.parse(localStorage.getItem("ml_chat")) || [];
  history.push({ role, text });
  localStorage.setItem("ml_chat", JSON.stringify(history));
  loadHistory();
}
