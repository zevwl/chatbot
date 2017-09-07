const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
const recognition = new SpeechRecognition();
recognition.lang = 'en-US';
recognition.interimResults = false;

const socket = io();

const button = document.querySelector('button');

recognition.addEventListener('start', (event) => button.disabled = true);
recognition.addEventListener('end', (event) => button.disabled = false);

button.addEventListener('click', () => {
  recognition.start();
});

recognition.addEventListener('result', (event) => {
  let last = event.results.length - 1;
  let text = event.results[last][0].transcript;

  console.log(`Confidence: ${event.results[0][0].confidence}`);

  socket.emit('chatmessage', text);
});

function synthVoice(text) {
  const synth = window.speechSynthesis;
  const utterance = new SpeechSynthesisUtterance();
  utterance.text = text;
  utterance.voice = synth.getVoices()[2]; // Google US English
  synth.speak(utterance);
}

socket.on('botreply', (replyText) => synthVoice(replyText));

