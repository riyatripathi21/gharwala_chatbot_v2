const options = [
  {
    "id": 10000,
    "name": "Properties",
    "children": [
      {
        "id": 11000,
        "parentID": 10000,
        "name": "Residential",
        "children": [
          {
            "id": 11100,
            "parentID": 11000,
            "name": "Rent",
            "children": [
              {
                "id": 11110,
                "parentID": 11100,
                "name": "Flat"
              },
              {
                "id": 11120,
                "parentID": 11100,
                "name": "PG"
              },
              {
                "id": 11130,
                "parentID": 11100,
                "name": "Room Rent"
              }
            ]
          },
          {
            "id": 11200,
            "parentID": 11000,
            "name": "Sale",
            "children": [
              {
                "id": 11210,
                "parentID": 11200,
                "name": "Flat"
              },
              {
                "id": 11220,
                "parentID": 11200,
                "name": "Land"
              },
              {
                "id": 11230,
                "parentID": 11200,
                "name": "House"
              }
            ]
          }
        ]
      },
      {
        "id": 12000,
        "parentID": 10000,
        "name": "Commercial",
        "children": [
          {
            "id": 12100,
            "parentID": 12000,
            "name": "Rent",
            "children": [
              {
                "id": 12110,
                "parentID": 12100,
                "name": "Office"
              },
              {
                "id": 12120,
                "parentID": 12100,
                "name": "Godown"
              }
            ]
          },
          {
            "id": 12200,
            "parentID": 12000,
            "name": "Sale",
            "children": [
              {
                "id": 12210,
                "parentID": 12200,
                "name": "Office"
              },
              {
                "id": 12220,
                "parentID": 12200,
                "name": "Godown"
              },
              {
                "id": 12230,
                "parentID": 12200,
                "name": "Commercial"
              }
            ]
          }
        ]
      }
    ]
  },
  {
    "id": 20000,
    "name": "Electronics and Home Appliances Rental",
    "children": [
      {
        "id": 21000,
        "parentID": 20000,
        "name": "AC"
      },
      {
        "id": 22000,
        "parentID": 20000,
        "name": "Fridge"
      },
      {
        "id": 23000,
        "parentID": 20000,
        "name": "Washing Machine"
      },
      {
        "id": 24000,
        "parentID": 20000,
        "name": "Furniture"
      }
    ]
  },
  {
    "id": 30000,
    "name": "Services",
    "children": [
      {
        "id": 31000,
        "parentID": 30000,
        "name": "AC Mechanic"
      },
      {
        "id": 32000,
        "parentID": 30000,
        "name": "Beautician"
      },
      {
        "id": 33000,
        "parentID": 30000,
        "name": "Plumber"
      },
      {
        "id": 34000,
        "parentID": 30000,
        "name": "Electrician"
      }
    ]
  }
];
document.addEventListener('click', function (e) {
  if (e.target.closest('.iconInner')) {
    e.target.closest('.botIcon').classList.add('showBotSubject');
    document.querySelector("[name='msg']").focus();
  }

  if (e.target.closest('.closeBtn') || e.target.closest('.chat_close_icon')) {
    const botIcon = e.target.closest('.botIcon');
    botIcon.classList.remove('showBotSubject');
    botIcon.classList.remove('showMessenger');
  }
});


document.addEventListener("DOMContentLoaded", function () {
  document.getElementById('initialDetails').style.display = 'block';
  document.getElementById('messenger').style.display = 'none';
  document.getElementById("txtName").focus();
});


// initial message starting
let childValue = [];
let userName = '';
let selectedOpt = '';
document.addEventListener('DOMContentLoaded', function () {
  document.getElementById('userForm').addEventListener('submit', function (event) {
    event.preventDefault();
    const name = document.getElementById('txtName').value;
    const email = document.getElementById('txtEmail').value;
    const phone = document.getElementById('txtPhone').value;
    const area = document.getElementById('txtArea').value;
    userName = name;

    if (validationRegex(name, email, phone, area)) {
      console.log('Name:', name);
      console.log('Email:', email);
      console.log('Phone:', phone);
      console.log('Area:', area);

      document.getElementById('userForm').reset();
      document.getElementById('initialDetails').style.display = 'none';
      document.getElementById('messenger').style.display = 'block';
      chatStart();
    }
  });
});

function validationRegex(name, email, phone, area) {
  const namePattern = /^[a-zA-Z\s]+$/;
  const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  const phonePattern = /^\d{10}$/;
  const areaPattern = /^[a-zA-Z\s]+$/;

  const nameError = document.getElementById('nameError');
  const emailError = document.getElementById('emailError');
  const phoneError = document.getElementById('phoneError');
  const areaError = document.getElementById('areaError');

  nameError.textContent = '';
  emailError.textContent = '';
  phoneError.textContent = '';
  areaError.textContent = '';

  let isValid = true;

  if (!namePattern.test(name)) {
    nameError.textContent = 'Name should contain only letters and spaces.';
    isValid = false;
  }
  if (!emailPattern.test(email)) {
    emailError.textContent = 'Enter a valid email address.';
    isValid = false;
  }
  if (!phonePattern.test(phone)) {
    phoneError.textContent = 'Phone number should be 10 digits long.';
    isValid = false;
  }
  if (!areaPattern.test(area)) {
    areaError.textContent = 'Location should contain only letters and spaces.';
    isValid = false;
  }
  return isValid;
}

function chatStart() {
  const welcomeMessage = "Hello, " + userName + " welcome to GharWala.";
  const currentTime = new Date().toLocaleTimeString();
  displayMessage(welcomeMessage, 'bot', currentTime, false);

  const autoMessage = "what are you looking for ?";
  const msgTime = new Date().toLocaleTimeString();
  displayMessage(autoMessage, 'bot', msgTime, false);
  // createLoader();

  document.getElementById('submitButton').addEventListener('click', function () {
    handleUserInput();
  });
}

document.getElementById('messageInput').addEventListener('keypress', function (e) {
  if (e.key === 'Enter') {
    e.preventDefault();
    handleUserInput();
  }
});

function handleUserInput() {
  const messageInput = document.getElementById('messageInput');
  const messageText = messageInput.value.trim();

  if (messageText !== '') {
    const userTime = new Date().toLocaleTimeString();
    displayMessage(messageText, 'user', userTime, false);
    messageInput.value = '';
    setTimeout(() => {
      const botResponse = generateBotResponse(messageText);
      const botTime = new Date().toLocaleTimeString();
      displayMessage(botResponse, 'bot', botTime, false);
    }, 500);
  }
}

function displayMessage(message, sender, time, bollean) {
  const messageDiv = document.createElement('div');
  messageDiv.className = sender === 'bot' ? 'answer left' : 'answer right';

  const avatarDiv = document.createElement('div');
  avatarDiv.className = 'avatar';

  const msgOwnerDiv = document.createElement('div');
  msgOwnerDiv.className = 'name';
  msgOwnerDiv.textContent = sender === 'bot' ? 'Gharwala Chatbot' : 'You';

  const img = document.createElement('img');
  img.src = sender === 'bot' ? './images/gharwala-logo.png' : './images/images.jpeg';
  img.alt = sender === 'bot' ? 'Gharwala Chatbot' : 'User';
  avatarDiv.appendChild(img);

  const textDiv = document.createElement('div');
  textDiv.className = 'text';

  const timeDiv = document.createElement('div');
  timeDiv.className = 'time';
  timeDiv.textContent = 'sent on - ' + time;

  if (bollean && sender === "bot") {
    const loaderContainer = createLoader();
    messageDiv.appendChild(msgOwnerDiv);
    messageDiv.appendChild(avatarDiv);
    messageDiv.appendChild(loaderContainer);
    messageDiv.appendChild(timeDiv);

    document.getElementById('chatContainer').appendChild(messageDiv);

    setTimeout(() => {
      loaderContainer.remove(); // Remove loader
      // textDiv.textContent = message;

      if (sender === 'bot' && message == "child") {
        textDiv.textContent = "what are you looking for in " + selectedOpt + "?";
      } else if ((sender === 'user') && (selectedOpt != null || '')) {
        textDiv.textContent = "You have selected " + message;
      } else if (sender === 'bot' && message == "nochild") {
        textDiv.textContent = "Thank you for your interest. Our team will contact you soon.";
      } else {
        textDiv.textContent = message;
      }
    
      if (sender === 'bot' && message.toLowerCase().includes("what are you looking for ?")) {
        let a = populateOption(options);
        textDiv.appendChild(a);
      } else if (sender === 'bot' && message == "child") {
        let a = populateOption(childValue);
        textDiv.appendChild(a);
      }

      messageDiv.appendChild(textDiv);
      document.getElementById('chatContainer').scrollTop = document.getElementById('chatContainer').scrollHeight;
    }, 1000);
  } else {
    if (sender === 'bot' && message == "child") {
      textDiv.textContent = "what are you looking for in " + selectedOpt + "?";
    } else if ((sender === 'user') && (selectedOpt != null || '')) {
      textDiv.textContent = "You have selected " + message;
    } else if (sender === 'bot' && message == "nochild") {
      textDiv.textContent = "Thank you for your interest. Our team will contact you soon.";
    } else {
      textDiv.textContent = message;
    }
  
    if (sender === 'bot' && message.toLowerCase().includes("what are you looking for ?")) {
      let a = populateOption(options);
      textDiv.appendChild(a);
    } else if (sender === 'bot' && message == "child") {
      let a = populateOption(childValue);
      textDiv.appendChild(a);
    }

    messageDiv.appendChild(msgOwnerDiv);
    messageDiv.appendChild(avatarDiv);
    messageDiv.appendChild(textDiv);
    messageDiv.appendChild(timeDiv);

    document.getElementById('chatContainer').appendChild(messageDiv);
  }

  document.getElementById('chatContainer').scrollTop = document.getElementById('chatContainer').scrollHeight;
}

function createLoader() {
  const loaderContainer = document.createElement('div');
  loaderContainer.classList.add('loader', 'show'); // Add loader classes
  loaderContainer.innerHTML = `
    <div class="text">
      <span></span>
      <span></span>
      <span></span>
    </div>
  `;
  return loaderContainer; // Return loader container
}
function populateOption(opt) {
  let Opt = opt;
  const optionsContainer = document.createElement('div');
  optionsContainer.className = 'options-container';
  Opt.forEach(option => {
    const button = document.createElement('button');
    button.textContent = option.name;
    button.className = 'btn btn-sm btn-outline-secondary option-button me-2 mt-2';

    button.addEventListener('click', () => {
      handleOptionClick(option);
    });

    optionsContainer.appendChild(button);
  });

  return optionsContainer;
}
function handleOptionClick(option) {
  const userTime = new Date().toLocaleTimeString();
  selectedOpt = option.name;
  displayMessage(selectedOpt, 'user', userTime, false);
  if (Array.isArray(option.children) && option.children.length > 0) {
    childValue = option.children;
    let cVal = "child";
    displayMessage(cVal, 'bot', userTime, true);
  } else if (option.children == undefined) {
    let cVal = "nochild";
    displayMessage(cVal, 'bot', userTime, true);
  }
}

function generateBotResponse(userMessage) {
  const responses = {
    "hello": "Hi there! What are you looking for?",
    "how are you": "I'm just a bot, but I'm here to help you!",
    "what is your name": "I'm Gharwala Chatbot. Nice to meet you!",
    // "ac": "You selected AC. Can you assist me with contact details, so that our team can reach you?",
    // "furniture": "You selected Furniture. Can you assist me with contact details, so that our team can reach you?",
    // "flat": "You selected Flat. Can you assist me with contact details, so that our team can reach you?",
    // "room rent": "You selected Room Rent. Can you assist me with contact details, so that our team can reach you?"
  };

  const lowerCaseMessage = userMessage.toLowerCase();
  const response = responses[lowerCaseMessage];

  return response || "Sorry, I didn't understand that. Can you please rephrase?";
}
function frmSubmit() {
  alert("Hello");
  var params ={
    from_name : document.getElementById("txtName").value,
    email_id : document.getElementById("txtEmail").value,
    txtPhone : document.getElementById("txtPhone").value,
    txtArea : document.getElementById("txtArea").value
    // frmSubmit : document.getElementById("frmSubmit").value
  
  }
  
  emailjs.send("service_uzkehig" , "template_98qkxk8" , {params}).then(function (res) { alert("Success! " + res.status);
  
    
  })
}