// ==========================================
// KNOWLEDGE BASE (Grounded strictly in PDFs)
// ==========================================

const quizData = [
    {
        id: 1,
        category: "Cloud Concepts",
        question: "Under the Azure shared responsibility model, which of the following is ALWAYS the responsibility of the cloud consumer, regardless of whether they use IaaS, PaaS, or SaaS?",
        options: [
            "A. Physical datacenter security and power cooling",
            "B. Operating system patching and maintenance",
            "C. Data, information, and identity account management",
            "D. Underlying physical network infrastructure"
        ],
        correctIndex: 2,
        explanation: "According to the shared responsibility model, while infrastructure and OS management shift to the provider in PaaS/SaaS, the consumer is ALWAYS responsible for their data, information, devices, and account/identity management."
    },
    {
        id: 2,
        category: "Azure Architecture",
        question: "Your company requires a highly available application that must survive a complete physical datacenter failure within a single Azure region. Which infrastructure feature should you utilize?",
        options: [
            "A. Availability Sets",
            "B. Availability Zones",
            "C. Region Pairs",
            "D. Resource Groups"
        ],
        correctIndex: 1,
        explanation: "Availability Zones are physically separate datacenters within an Azure region with independent power, cooling, and networking. They protect against datacenter-level failures. Availability Sets only protect against rack/server failures within a single datacenter."
    },
    {
        id: 3,
        category: "Management & Governance",
        question: "You need to prevent a critical production database from being accidentally deleted by any user, including those with Owner permissions. What Azure governance feature should you apply?",
        options: [
            "A. Azure Policy",
            "B. Role-Based Access Control (RBAC)",
            "C. Resource Locks",
            "D. Management Groups"
        ],
        correctIndex: 2,
        explanation: "Resource Locks (specifically a 'Delete' or 'Read-only' lock) prevent the deletion or modification of a resource, regardless of the user's RBAC permissions. Even an Owner must remove the lock before deleting the resource."
    }
];

const flashcardData = [
    {
        id: 1,
        category: "Service Models",
        front: "IaaS vs. PaaS vs. SaaS",
        back: "IaaS: You manage OS, middleware, and apps (max control). PaaS: Provider manages OS and middleware; you manage apps and data. SaaS: Provider manages everything; you just manage data and access.",
        promptContext: "Explain the shared responsibility shift across IaaS, PaaS, and SaaS.",
        aiResponses: {
            analogy: "Think of housing: IaaS is like renting an empty plot of land (you build the house and maintain it). PaaS is like renting a fully built house (you just bring your furniture and live there). SaaS is like staying in a hotel (everything is provided, you just check in and use the room). In Azure, as you move from IaaS to SaaS, the cloud provider takes on more maintenance responsibility.",
            simple: "IaaS means you do most of the computer fixing. PaaS means Microsoft fixes the computer, but you fix the apps. SaaS means Microsoft fixes everything, and you just use the app. The more 'S' (Service) it has, the less work you have to do!"
        }
    },
    {
        id: 2,
        category: "Management Hierarchy",
        front: "Azure Management Hierarchy",
        back: "Management Groups (top) -> Subscriptions (billing/access boundary) -> Resource Groups (logical container) -> Resources (actual services like VMs, DBs). Policies applied at the top inherit downwards.",
        promptContext: "Explain the Azure management hierarchy and how inheritance works.",
        aiResponses: {
            analogy: "Imagine a corporate structure: Management Groups are the Global Headquarters. Subscriptions are the Regional Offices (they handle their own billing). Resource Groups are the specific Departments (like HR or IT). Resources are the individual Employees. If the Global HQ makes a rule (Azure Policy), every employee in every department automatically follows it.",
            simple: "It's like Russian nesting dolls! The biggest doll is the Management Group. Inside that are Subscriptions. Inside those are Resource Groups. And inside those are the actual Resources (like your virtual machines). Rules made on the outside apply to everything on the inside."
        }
    },
    {
        id: 3,
        category: "Storage Redundancy",
        front: "LRS vs. ZRS vs. GRS",
        back: "LRS: 3 copies in one datacenter. ZRS: 3 copies across 3 Availability Zones in a region. GRS: 3 copies in primary region (LRS) + 3 copies asynchronously replicated to a secondary paired region.",
        promptContext: "Compare storage redundancy options focusing on durability and failure protection.",
        aiResponses: {
            analogy: "LRS is like keeping 3 copies of your photo album in the same drawer (safe from a torn page, but if the house burns down, they're gone). ZRS is like keeping copies in three different rooms in your house (safe if one room catches fire). GRS is like keeping copies in your house AND a safety deposit box in another city (safe even if your whole city has a disaster).",
            simple: "LRS keeps your data safe if a hard drive breaks. ZRS keeps it safe if a whole datacenter building loses power. GRS keeps it safe if a massive disaster destroys the entire city where the datacenter is, by copying it to a totally different part of the country."
        }
    }
];

// ==========================================
// APPLICATION STATE & LOGIC
// ==========================================

let currentQuizIndex = 0;
let quizScore = 0;
let currentCardIndex = 0;

// DOM Elements
const quizSection = document.getElementById('quiz-section');
const flashcardSection = document.getElementById('flashcard-section');
const navBtns = document.querySelectorAll('.nav-btn');

// Navigation
navBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        navBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        
        document.querySelectorAll('.content-section').forEach(sec => sec.classList.remove('active'));
        document.getElementById(btn.dataset.target).classList.add('active');
    });
});

// ==========================================
// SMART QUIZ BUILDER
// ==========================================

function renderQuiz() {
    const q = quizData[currentQuizIndex];
    const container = document.getElementById('quiz-card');
    document.getElementById('quiz-total').textContent = quizData.length;
    document.getElementById('quiz-score').textContent = quizScore;

    container.innerHTML = `
        <div class="quiz-category">${q.category}</div>
        <div class="quiz-question">${q.question}</div>
        <div class="quiz-options" id="quiz-options">
            ${q.options.map((opt, i) => `
                <button class="quiz-option" data-index="${i}">${opt}</button>
            `).join('')}
        </div>
        <div class="explanation-box" id="explanation-box">
            <h4>💡 Instant Explanation</h4>
            <p>${q.explanation}</p>
            <button class="next-btn" id="next-btn">Next Question →</button>
        </div>
    `;

    const options = container.querySelectorAll('.quiz-option');
    options.forEach(opt => {
        opt.addEventListener('click', () => handleQuizAnswer(parseInt(opt.dataset.index), q.correctIndex, options));
    });
}

function handleQuizAnswer(selectedIndex, correctIndex, options) {
    options.forEach((opt, i) => {
        opt.disabled = true;
        if (i === correctIndex) opt.classList.add('correct');
        if (i === selectedIndex && i !== correctIndex) opt.classList.add('incorrect');
    });

    if (selectedIndex === correctIndex) quizScore++;
    document.getElementById('quiz-score').textContent = quizScore;
    document.getElementById('explanation-box').classList.add('visible');

    document.getElementById('next-btn').addEventListener('click', () => {
        currentQuizIndex = (currentQuizIndex + 1) % quizData.length;
        renderQuiz();
    });
}

// ==========================================
// FLASHCARD COACH & PROMPT ENGINEERING
// ==========================================

function renderFlashcard() {
    const card = flashcardData[currentCardIndex];
    const container = document.getElementById('flashcard-container');
    document.getElementById('card-total').textContent = flashcardData.length;
    document.getElementById('card-current').textContent = currentCardIndex + 1;
    
    // Reset coach panel
    document.getElementById('coach-response').classList.add('hidden');
    document.getElementById('prompt-showcase').classList.add('hidden');
    document.getElementById('toggle-prompt-btn').classList.remove('active');

    container.innerHTML = `
        <div class="flashcard-inner">
            <div class="flashcard-front">
                <div class="quiz-category">${card.category}</div>
                <h3>${card.front}</h3>
                <span class="flip-hint">Click to flip</span>
            </div>
            <div class="flashcard-back">
                <p>${card.back}</p>
            </div>
        </div>
    `;

    container.classList.remove('flipped');
    container.addEventListener('click', () => container.classList.toggle('flipped'));

    // Setup Coach Buttons
    document.querySelectorAll('.coach-btn.analogy, .coach-btn.simple').forEach(btn => {
        btn.onclick = () => generateCoachResponse(btn.dataset.style);
    });

    document.getElementById('toggle-prompt-btn').onclick = togglePromptView;
}

function generateCoachResponse(style) {
    const card = flashcardData[currentCardIndex];
    const responseBox = document.getElementById('coach-response');
    const responseText = document.getElementById('response-text');
    
    // Simulate AI generation delay
    responseText.textContent = "CloudSensei is thinking...";
    responseBox.classList.remove('hidden');

    setTimeout(() => {
        responseText.textContent = card.aiResponses[style];
    }, 600);
}

function togglePromptView() {
    const showcase = document.getElementById('prompt-showcase');
    const promptText = document.getElementById('prompt-text');
    const btn = document.getElementById('toggle-prompt-btn');
    const card = flashcardData[currentCardIndex];

    showcase.classList.toggle('hidden');
    btn.classList.toggle('active');

    if (!showcase.classList.contains('hidden')) {
        // Show the engineered prompt structure
        promptText.textContent = `SYSTEM PROMPT:
You are "CloudSensei", an expert Azure Cloud Architect and empathetic technical tutor. 
Your knowledge is strictly bounded by official Azure AZ-900 documentation.

CONTEXT: ${card.promptContext}

RULES:
1. Never invent Azure services. 
2. Adapt your explanation to the user's requested learning style: "[DYNAMIC_STYLE]".
3. Keep explanations concise, engaging, and free of corporate jargon. Use analogies.
4. End with a quick 1-sentence knowledge check question.

USER REQUEST: Explain this concept using the [DYNAMIC_STYLE] approach.`;
    }
}

// Next Card Logic (Added to footer of flashcard section dynamically or via a button)
// For simplicity, clicking the card counter or adding a next button. Let's add a next button to the coach panel.
document.querySelector('.coach-panel').insertAdjacentHTML('beforeend', `
    <button class="next-btn" id="next-card-btn" style="margin-top: 1.5rem; width: 100%;">Next Flashcard →</button>
`);
document.getElementById('next-card-btn').addEventListener('click', () => {
    currentCardIndex = (currentCardIndex + 1) % flashcardData.length;
    renderFlashcard();
});

// Initialize
renderQuiz();
renderFlashcard();