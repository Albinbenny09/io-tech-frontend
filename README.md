# 🖥 IO-Tech Frontend – Technical Task

This repository contains the **frontend implementation** for the IO-Tech technical task.

It is built with **Next.js 15** using **App Router**, and it fetches dynamic content from a separate **Strapi CMS** backend hosted on Render.




---

## ✅ Features

- 🌍 **Multilingual** support with English & Arabic (via `next-intl`)
- ↔️ **RTL layout** for Arabic using Tailwind's `dir-rtl` utilities
- 🎨 Responsive UI based on provided Figma design
- 🧑‍💼 **Team**, **Services**, **Clients**, and **Blog** — all fetched from CMS
- 🔍 Full search across **Team Members** and **Services**
- 📧 Subscription form with validation using **Formik + Yup**
- 🌀 Global loading spinner using **Redux Toolkit**
- ⚙️ Dynamically connected to CMS using environment variables

---

## 🚀 Tech Stack

| Frontend         | Integration & Dev Tools |
|------------------|--------------------------|
| Next.js 15       | Strapi CMS (Headless)    |
| Tailwind CSS     | Redux Toolkit            |
| Formik + Yup     | next-intl (i18n)         |
| App Router (Pages) | Responsive Design      |
| Vercel Deployment | Render Deployment (CMS) |

---

## 🧪 How to Run Locally

### 1️⃣ Clone the Repo

```bash
git clone https://github.com/Albinbenny09/io-tech-frontend
cd io-tech-frontend

2️⃣ Install Dependencies

npm install

3️⃣ Create Environment Variables
Create a file named .env.local in the root of the project:

Copy this:
# .env.local
NEXT_PUBLIC_STRAPI_API=http://localhost:1337/api

# For accessing media (images, videos, etc.)
NEXT_PUBLIC_STRAPI_MEDIA=http://localhost:1337


These variables allow the frontend to connect to the deployed CMS and fetch content & media.

4️⃣ Start the Development Server

npm run dev
By default, your app will run on:
📍 http://localhost:3000

Now you can go : 📦 **CMS GitHub Repo**: https://github.com/Albinbenny09/io-tech-cms

then read read.me in that repo

📂 Project Structure
pgsql
Copy
Edit
.
├── app/                    → App Router Pages
│   └── [locale]/           → Localized routes
├── components/             → UI Components (Navbar, Hero, Footer, etc.)
├── lib/api.js              → Fetch logic from Strapi
├── locales/en.json         → English translations
├── locales/ar.json         → Arabic translations
├── public/                 → Static assets
├── store/                  → Redux Toolkit store
├── styles/                 → Global styles
└── .env.local              → API connection to Strapi

📎 Linked Projects
Repo	Description
io-tech-cms	Strapi CMS powering all content
Frontend (this repo)	Connects to CMS via env vars and renders UI

👨‍💻 Developer Info
Albin Benny
📧 albinbenny1515@gmail.com
📱 +971-558819072


