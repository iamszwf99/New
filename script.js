// Toggle between guide tabs
const labels = document.querySelectorAll('.labels button');
const contents = document.querySelectorAll('.content');

labels.forEach(label => {
  label.addEventListener('click', () => {
    labels.forEach(l => l.classList.remove('active'));
    label.classList.add('active');

    const tab = label.getAttribute('data-tab');
    contents.forEach(content => {
      if (content.id === tab) {
        content.classList.add('active');
      } else {
        content.classList.remove('active');
      }
    });
  });
});

// Populate agenda results
const agendaResults = document.querySelector('#agenda .results');
const sessionResults = document.querySelector('#sessions .results');
const speakerResults = document.querySelector('#speakers .results');

function populateAgenda(option) {
  agendaResults.innerHTML = '';
  const sessions = option === 'all-bookmarks' ? 3 : 2;
  for (let i = 1; i <= sessions; i++) {
    agendaResults.innerHTML += `
      <div class="session-card">
        <h3>Session ${i}</h3>
        <p>Speaker Name</p>
        <button>Join</button>
      </div>
    `;
  }
}

function populateSessions(option) {
  sessionResults.innerHTML = '';
  const sessions = option === 'all' ? 6 : 2;
  for (let i = 1; i <= sessions; i++) {
    sessionResults.innerHTML += `
      <div class="session-card">
        <h3>Session ${i}</h3>
        <p>Speaker Name</p>
        <button>Join</button>
      </div>
    `;
  }
}

function populateSpeakers() {
  speakerResults.innerHTML = '';
  const speakers = ['Speaker A', 'Speaker B', 'Speaker C'];
  speakers.forEach(speaker => {
    speakerResults.innerHTML += `
      <div class="speaker-card">
        <h3>${speaker}</h3>
        <p>Details about ${speaker}</p>
      </div>
    `;
  });
}

// Handle agenda options
const agendaOptions = document.querySelectorAll('#agenda .options button');
agendaOptions.forEach(option => {
  option.addEventListener('click', () => {
    agendaOptions.forEach(o => o.classList.remove('active'));
    option.classList.add('active');
    populateAgenda(option.getAttribute('data-option'));
  });
});

// Handle session options
const sessionOptions = document.querySelectorAll('#sessions .options button');
sessionOptions.forEach(option => {
  option.addEventListener('click', () => {
    sessionOptions.forEach(o => o.classList.remove('active'));
    option.classList.add('active');
    populateSessions(option.getAttribute('data-option'));
  });
});

// Populate initial data
populateAgenda('all-bookmarks');
populateSessions('all');
populateSpeakers();

// Handle popover windows
document.addEventListener('click', (e) => {
  if (e.target.classList.contains('session-card') || e.target.classList.contains('speaker-card')) {
    const popover = document.createElement('div');
    popover.className = 'popover';
    popover.innerHTML = `
      <button onclick="this.parentElement.remove()">Close</button>
      <p>Details for ${e.target.querySelector('h3').textContent}</p>
    `;
    document.body.appendChild(popover);
  }
});

// Chat functionality
const chatInput = document.getElementById('chat-input');
const sendButton = document.getElementById('send-button');
const chatMessages = document.querySelector('.chat-messages');

sendButton.addEventListener('click', () => {
  const message = chatInput.value.trim();
  if (message) {
    const messageElement = document.createElement('div');
    messageElement.textContent = message;
    chatMessages.appendChild(messageElement);
    chatInput.value = '';
    chatMessages.scrollTop = chatMessages.scrollHeight; // Auto-scroll to bottom
  }
});

chatInput.addEventListener('keypress', (e) => {
  if (e.key === 'Enter') {
    sendButton.click();
  }
});

// Minimize/restore guide tab
const minimizeButton = document.getElementById('minimize-button');
const guideTab = document.querySelector('.guide-tab');

minimizeButton.addEventListener('click', () => {
  guideTab.classList.toggle('minimized');
  minimizeButton.textContent = guideTab.classList.contains('minimized') ? '+' : '-';
});

// Handle popover windows
document.addEventListener('click', (e) => {
    if (e.target.classList.contains('session-card') || e.target.classList.contains('speaker-card')) {
      // Close any existing popovers
      const existingPopovers = document.querySelectorAll('.popover');
      existingPopovers.forEach(popover => popover.remove());
  
      // Create new popover
      const popover = document.createElement('div');
      popover.className = 'popover';
  
      // Populate popover content
      const title = e.target.querySelector('h3').textContent;
      popover.innerHTML = `
        <button onclick="this.parentElement.remove()">Close</button>
        <h3>${title}</h3>
        <p>Details for ${title}</p>
      `;
  
      // Append popover to the body
      document.body.appendChild(popover);
    }
  });