document.addEventListener('DOMContentLoaded', () => {
    const navSlide = () => {
        const burger = document.querySelector('.burger');
        const nav = document.querySelector('.nav-links');
        const navLinks = document.querySelectorAll('.nav-links li');

        burger.addEventListener('click', () => {
            // Toggle Nav
            nav.classList.toggle('nav-active');

            // Animate Links
            navLinks.forEach((link, index) => {
                if (link.style.animation) {
                    link.style.animation = '';
                } else {
                    link.style.animation = `navLinkFade 0.5s ease forwards ${index / 7 + 0.3}s`;
                }
            });

            // Burger Animation
            burger.classList.toggle('toggle');
        });
    };

    const loadMoreContent = () => {
        const moreLink = document.getElementById('more-link');
        const moreContainer = document.getElementById('more-content-container');

        moreLink.addEventListener('click', (e) => {
            e.preventDefault();
            
            // Check if content is already loaded to avoid multiple loads
            if (moreContainer.innerHTML.trim() === '') {
                fetch('more.html')
                    .then(response => response.text())
                    .then(data => {
                        moreContainer.innerHTML = data;
                        moreContainer.style.display = 'block';
                        
                        // Scroll to the loaded content
                        moreContainer.scrollIntoView({ behavior: 'smooth' });
                    })
                    .catch(error => console.error('Error loading more.html:', error));
            } else {
                // If content is already there, just toggle its visibility
                if (moreContainer.style.display === 'none' || moreContainer.style.display === '') {
                    moreContainer.style.display = 'block';
                    moreContainer.scrollIntoView({ behavior: 'smooth' });
                } else {
                    moreContainer.style.display = 'none';
                }
            }
        });
    };

    // AI Assistant Logic
    const chatIcon = document.querySelector('.chat-icon');
    const chatContainer = document.querySelector('.chat-container');
    const closeBtn = document.querySelector('.close-btn');
    const chatBox = document.getElementById('chat-box');
    const userInput = document.getElementById('user-input');
    const sendBtn = document.getElementById('send-btn');

    const knowledgeBase = {
        "hello": "Hi there! How can I help you with your studies today?",
        "hi": "Hello! I am your EDU AI Assistant. Ask me anything about HTML, CSS, or JavaScript.",
        "what is html": "HTML stands for HyperText Markup Language. It's the standard markup language for documents designed to be displayed in a web browser.",
        "what is css": "CSS stands for Cascading Style Sheets. It's used for styling the appearance of web pages, like colors, fonts, and layout.",
        "what is javascript": "JavaScript is a programming language that enables interactive web pages. It's essential for creating dynamic content and web applications.",
        "how to learn web development": "To learn web development, you should start with HTML, then move to CSS for styling, and finally learn JavaScript for interactivity.",
        "who are you": "I am an EDU AI Assistant, a simple local bot designed to help you with basic web development questions.",
        "thank you": "You're welcome! Happy to help.",
        "bye": "Goodbye! Feel free to come back if you have more questions."
    };

    function appendMessage(message, sender) {
        const messageDiv = document.createElement('div');
        messageDiv.classList.add('message', `${sender}-message`);
        messageDiv.textContent = message;
        chatBox.appendChild(messageDiv);
        chatBox.scrollTop = chatBox.scrollHeight;
    }

    function getLocalResponse(query) {
        const lowerCaseQuery = query.toLowerCase().trim();
        // Check for exact matches in the knowledge base
        if (knowledgeBase[lowerCaseQuery]) {
            return knowledgeBase[lowerCaseQuery];
        }

        // Simple keyword-based matching for better results
        for (const key in knowledgeBase) {
            if (lowerCaseQuery.includes(key.toLowerCase())) {
                return knowledgeBase[key];
            }
        }
        
        return "I'm sorry, I don't have information on that topic yet. Please try another question.";
    }

    chatIcon.addEventListener('click', () => {
        chatContainer.style.display = 'flex';
    });

    closeBtn.addEventListener('click', () => {
        chatContainer.style.display = 'none';
    });

    sendBtn.addEventListener('click', () => {
        const userMessage = userInput.value.trim();
        if (userMessage) {
            appendMessage(userMessage, 'user');
            const aiResponse = getLocalResponse(userMessage);
            // Simulate AI typing delay
            setTimeout(() => {
                appendMessage(aiResponse, 'ai');
            }, 500);
            userInput.value = '';
        }
    });

    userInput.addEventListener('keydown', (e) => {
        if (e.key === 'Enter') {
            e.preventDefault();
            sendBtn.click();
        }
    });

    // Event listener for the contact form
    const contactForm = document.getElementById('contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            alert('Thank you for your message! We will get back to you soon.');
            contactForm.reset();
        });
    }

    navSlide();
    loadMoreContent();
});
