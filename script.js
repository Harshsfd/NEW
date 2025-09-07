document.addEventListener('DOMContentLoaded', () => {

    // Mobile Nav
    const burger = document.querySelector('.burger');
    const nav = document.querySelector('.nav-links');
    const navLinks = document.querySelectorAll('.nav-links li');
    burger.addEventListener('click', () => {
        nav.classList.toggle('nav-active');
        navLinks.forEach((link,index) => {
            link.style.animation = link.style.animation ? '' : `navLinkFade 0.5s ease forwards ${index/7 + 0.3}s`;
        });
        burger.classList.toggle('toggle');
    });

    // Dynamic Learning Path Cards
    const courses = [
        {title:"AI & Robotics", icon:"fas fa-robot", description:"Build intelligent AI models and explore robotics."},
        {title:"Web Development", icon:"fas fa-code", description:"HTML, CSS, JavaScript and modern web frameworks."},
        {title:"Data Science", icon:"fas fa-brain", description:"Analyze data and gain insights from datasets."},
        {title:"Machine Learning", icon:"fas fa-chart-line", description:"Learn ML concepts and algorithms for AI projects."},
        {title:"UI/UX Design", icon:"fas fa-pencil-ruler", description:"Design beautiful and user-friendly interfaces."}
    ];
    const pathCardsContainer = document.getElementById('path-cards');
    courses.forEach(course => {
        const card = document.createElement('div');
        card.classList.add('path-card');
        card.innerHTML = `<i class="${course.icon}"></i><h3>${course.title}</h3><p>${course.description}</p>`;
        pathCardsContainer.appendChild(card);
    });

    // More Content Load
    const moreLink = document.getElementById('more-link');
    const moreContainer = document.getElementById('more-content-container');
    moreLink.addEventListener('click', e => {
        e.preventDefault();
        if(!moreContainer.innerHTML){
            moreContainer.innerHTML = `
                <section class="more-section container">
                    <h2>Advanced Features</h2>
                    <p>Interactive courses, smart AI assistant, and responsive design.</p>
                </section>`;
            moreContainer.style.display = 'block';
            moreContainer.scrollIntoView({behavior:'smooth'});
        } else {
            moreContainer.style.display = moreContainer.style.display==='none' ? 'block' : 'none';
        }
    });

    // Chatbot
    const chatIcon = document.querySelector('.chat-icon');
    const chatContainer = document.querySelector('.chat-container');
    const closeBtn = document.querySelector('.close-btn');
    const chatBox = document.getElementById('chat-box');
    const userInput = document.getElementById('user-input');
    const sendBtn = document.getElementById('send-btn');

    const knowledgeBase = {
        "hello":"Hi! How can I help you with web development?",
        "hi":"Hello! Ask me anything about HTML, CSS, or JavaScript.",
        "what is html":"HTML stands for HyperText Markup Language, used to create web pages.",
        "what is css":"CSS stands for Cascading Style Sheets, used for styling websites.",
        "what is javascript":"JavaScript enables interactive features on web pages.",
        "html tags":"Some important HTML tags are &lt;div&gt;, &lt;p&gt;, &lt;a&gt;, &lt;img&gt;, &lt;h1&gt;-&lt;h6&gt;.",
        "css properties":"Important CSS properties include color, font-size, margin, padding, display, flex, grid.",
        "javascript functions":"Functions in JS define reusable blocks of code: function myFunc(){ ... }",
        "how to start web development":"Start with HTML, then CSS, then JavaScript. Build projects as you learn.",
        "who are you":"I am your EDU AI Assistant, ready to answer web development questions.",
        "thank you":"You're welcome! Happy learning.",
        "bye":"Goodbye! Keep coding!"
    };

    function appendMessage(message, sender){
        const div = document.createElement('div');
        div.classList.add('message', `${sender}-message`);
        div.innerHTML = message;
        chatBox.appendChild(div);
        chatBox.scrollTop = chatBox.scrollHeight;
    }

    function getResponse(query){
        const q = query.toLowerCase().trim();
        if(knowledgeBase[q]) return knowledgeBase[q];
        for(let key in knowledgeBase){
            if(q.includes(key)) return knowledgeBase[key];
        }
        return "Sorry, I don't know that yet. Try asking something else.";
    }

    chatIcon.addEventListener('click',()=> chatContainer.style.display='flex');
    closeBtn.addEventListener('click',()=> chatContainer.style.display='none');

    sendBtn.addEventListener('click',()=>{
        const msg = userInput.value.trim();
        if(msg){
            appendMessage(msg,'user');
            setTimeout(()=> appendMessage(getResponse(msg),'ai'),500);
            userInput.value='';
        }
    });

    userInput.addEventListener('keydown', e=>{
        if(e.key==='Enter'){ e.preventDefault(); sendBtn.click(); }
    });

    // Contact Form
    const contactForm = document.getElementById('contact-form');
    contactForm.addEventListener('submit', e=>{
        e.preventDefault();
        alert('Thank you! We will contact you soon.');
        contactForm.reset();
    });
});
