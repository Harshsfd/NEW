document.addEventListener('DOMContentLoaded', () => {

    /* ---------------- NAVIGATION ---------------- */
    const navSlide = () => {
        const burger = document.querySelector('.burger');
        const nav = document.querySelector('.nav-links');
        const navLinks = document.querySelectorAll('.nav-links li');

        burger.addEventListener('click', () => {
            nav.classList.toggle('nav-active');

            // Animate Links
            navLinks.forEach((link, index) => {
                if (link.style.animation) {
                    link.style.animation = '';
                } else {
                    link.style.animation = `navLinkFade 0.5s ease forwards ${index / 7 + 0.3}s`;
                }
            });

            burger.classList.toggle('toggle');
        });
    };

    /* ---------------- SCROLL TO SECTION ---------------- */
    document.querySelectorAll('.nav-links li a').forEach(link => {
        link.addEventListener('click', e => {
            e.preventDefault();
            const targetId = link.getAttribute('href').substring(1);
            const targetSection = document.getElementById(targetId);
            if (targetSection) {
                targetSection.scrollIntoView({ behavior: 'smooth' });
            }
        });
    });

    /* ---------------- CONTACT FORM ---------------- */
    const contactForm = document.getElementById('contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            alert('Thank you for your message! We will get back to you soon.');
            contactForm.reset();
        });
    }

    /* ---------------- ADVANCED LOCAL CHATBOT ---------------- */
    const chatIcon = document.querySelector('.chat-icon');
    const chatContainer = document.querySelector('.chat-container');
    const closeBtn = document.querySelector('.close-btn');
    const chatBox = document.getElementById('chat-box');
    const userInput = document.getElementById('user-input');
    const sendBtn = document.getElementById('send-btn');

    // Extended knowledge base
    const knowledgeBase = {
        "hello": "Hi! 👋 How can I assist you today with your web development learning?",
        "hi": "Hello! I am your EDU AI Assistant. Ask me anything about HTML, CSS, or JavaScript.",
        "what is html": "HTML (HyperText Markup Language) is the standard language for creating web pages. It structures content with elements like headings, paragraphs, links, and images.",
        "what is css": "CSS (Cascading Style Sheets) is used to style HTML elements. You can change colors, fonts, layouts, animations, and make websites responsive.",
        "what is javascript": "JavaScript is a programming language that allows you to create interactive and dynamic web content. You can manipulate HTML/CSS, handle events, and communicate with servers.",
        "web development": "Web development involves building websites and applications. It includes front-end (HTML, CSS, JS) and back-end development (Node.js, Django, databases).",
        "how to learn web development": "Start with HTML basics, then CSS for styling, followed by JavaScript for interactivity. Build small projects and gradually move to frameworks like React.js or backend technologies.",
        "who are you": "I am your EDU AI Assistant, designed to help you with web development topics and answer questions related to learning paths.",
        "thank you": "You're welcome! 😊 Happy learning!",
        "bye": "Goodbye! Come back anytime for help with web development!",
        "css selectors": "CSS selectors allow you to target HTML elements for styling. Examples: .class, #id, element, attribute selectors.",
        "html elements": "HTML elements include tags like <div>, <p>, <a>, <img>, <h1>.. <h6>, <ul>, <li>, and more.",
        "javascript functions": "Functions in JavaScript are blocks of code designed to perform tasks. Example: function greet() { console.log('Hello'); }",
        "responsive design": "Responsive design ensures websites look good on all devices. Use media queries, flexible grids, and relative units like %, em, rem.",
        "flexbox": "Flexbox is a CSS layout model that helps arrange items in rows or columns with alignment, spacing, and distribution.",
        "grid": "CSS Grid is a layout system for creating 2D layouts with rows and columns.",
        "front-end": "Front-end development deals with what users see and interact with: HTML, CSS, JS, and frameworks like React.",
        "back-end": "Back-end development manages servers, databases, and application logic using Node.js, Django, Express, etc.",
        "projects": "Building projects is essential! Examples: Portfolio website, To-do app, Blog, E-commerce site, Chatbot.",
        "learning path": "Our learning paths include AI & Robotics, Web Development, Data Science, UI/UX, and Machine Learning."
    };

    function appendMessage(message, sender) {
        const messageDiv = document.createElement('div');
        messageDiv.classList.add('message', `${sender}-message`);
        messageDiv.textContent = message;
        chatBox.appendChild(messageDiv);
        chatBox.scrollTop = chatBox.scrollHeight;
    }

    function simulateTypingResponse(response) {
        let i = 0;
        const interval = setInterval(() => {
            if (i < response.length) {
                let currentText = chatBox.querySelector('.ai-message:last-child');
                if (!currentText) {
                    currentText = document.createElement('div');
                    currentText.classList.add('message', 'ai-message');
                    chatBox.appendChild(currentText);
                }
                currentText.textContent += response[i];
                chatBox.scrollTop = chatBox.scrollHeight;
                i++;
            } else {
                clearInterval(interval);
            }
        }, 30); // typing speed
    }

    function getLocalResponse(query) {
        const lowerCaseQuery = query.toLowerCase().trim();

        // Exact match
        if (knowledgeBase[lowerCaseQuery]) return knowledgeBase[lowerCaseQuery];

        // Keyword match
        for (const key in knowledgeBase) {
            if (lowerCaseQuery.includes(key)) {
                return knowledgeBase[key];
            }
        }

        return "I'm sorry, I don't have information on that topic yet. Try asking about HTML, CSS, JS, or web development.";
    }

    chatIcon.addEventListener('click', () => {
        chatContainer.style.display = 'flex';
        userInput.focus();
    });

    closeBtn.addEventListener('click', () => {
        chatContainer.style.display = 'none';
    });

    function sendMessage() {
        const userMessage = userInput.value.trim();
        if (!userMessage) return;

        // Show user message
        appendMessage(userMessage, 'user');

        // Show AI typing placeholder
        const typingDiv = document.createElement('div');
        typingDiv.classList.add('message', 'ai-message');
        typingDiv.textContent = "Typing...";
        chatBox.appendChild(typingDiv);
        chatBox.scrollTop = chatBox.scrollHeight;

        // Get AI response
        const aiResponse = getLocalResponse(userMessage);

        // Simulate typing
        setTimeout(() => {
            typingDiv.textContent = "";
            simulateTypingResponse(aiResponse);
        }, 500);

        userInput.value = '';
    }

    sendBtn.addEventListener('click', sendMessage);

    userInput.addEventListener('keydown', e => {
        if (e.key === 'Enter') {
            e.preventDefault();
            sendMessage();
        }
    });

    navSlide();
});
