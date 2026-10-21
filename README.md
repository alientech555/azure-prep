# CloudVibe: Unofficial AZ-900 Exam Prep Tool 🚀

Welcome to **CloudVibe**, a rapid-prototype, AI-assisted exam preparation tool built for the **Vibe Coding Hackathon: AZ-900 Exam Prep Edition**. 

> ⚠️ **Disclaimer:** This is an UNOFFICIAL prep tool. It is not affiliated with, endorsed by, or sponsored by Microsoft. All practice questions are 100% original and grounded strictly in official Azure documentation.

## 🏆 Hackathon Alignment

### 1. Smart Quiz Builder
Features instant, detailed explanations for every question. Questions are original scenarios derived directly from the AZ-900 learning paths (Cloud Concepts, Architecture, Governance).

### 2. Flashcard Coach (with Prompt Engineering Showcase)
Instead of a black-box AI, the Flashcard Coach **exposes its prompt engineering**. 
- Click **"View Engineered Prompt"** to see the exact System Prompt, Context, and Constraints being utilized.
- Select a learning style ("Analogy" or "Explain Like I'm 5") to see how the AI adapts its output based on the prompt parameters.
- *Note: For this static showcase, the AI responses are pre-validated against the PDF knowledge base to guarantee 0% hallucination, but the prompt architecture is fully visible and ready for Azure OpenAI integration.*

## 🏗️ Architecture & Azure Mapping

This project is designed as a **Static Web Application** to demonstrate rapid prototyping and zero-configuration cloud deployment.

- **Frontend:** Vanilla HTML5, CSS3 (Custom 3D animations), ES6 JavaScript.
- **Hosting:** Deployed via **Render Static Sites** (demonstrating PaaS static hosting capabilities).
- **Future AI Integration:** The prompt engineering logic in `script.js` is structured to be directly mapped to the `@azure/openai` SDK in a Node.js backend when scaling to production.

## 🚀 Deployment on Render (Rapid Prototyping)

This app is optimized for Render's Static Site hosting. 

### Option 1: Render Blueprint (Infrastructure as Code)
This repository includes a `render.yaml` file. When you push this repo to Render, it will automatically detect the blueprint and deploy the site.

### Option 2: Manual Deploy
1. Go to [Render Dashboard](https://dashboard.render.com/).
2. Click **New** -> **Static Site**.
3. Connect your GitHub repository.
4. Set **Build Command** to: (Leave blank)
5. Set **Publish Directory** to: `/` (Root)
6. Click **Deploy**. Your site will be live in seconds!

## 📂 Repository Structure
```text
├── index.html      # Application shell & semantic structure
├── style.css       # UI/UX, 3D animations, responsive design
├── script.js       # State management, quiz logic, AI prompt simulator
├── README.md       # You are here!
└── render.yaml     # Render IaC deployment blueprint
```

## Caveats Met
- Original Questions: No copied real exam questions.
- No Microsoft Logos: Uses a custom abstract SVG cloud icon.
- Unofficial Labeling: Persistent disclaimer banner at the top of the UI.