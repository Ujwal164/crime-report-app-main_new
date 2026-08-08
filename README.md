Read file: crime-report-app-main/README.md
Here is a detailed README for your Anonymous Reporting App, incorporating your current content and expanding with additional sections for clarity, security, API usage, and troubleshooting.

---

# Anonymous Reporting App

<div align="center">
  <br />
    <a href="your-demo-video-link" target="_blank">
      <img src="./public/report.jpg" alt="Project Banner">
    </a>
  <br />
  <div>
    <img src="https://img.shields.io/badge/-TypeScript-black?style=for-the-badge&logoColor=white&logo=typescript&color=3178C6" alt="typescript" />
    <img src="https://img.shields.io/badge/-Next_JS-black?style=for-the-badge&logoColor=white&logo=nextdotjs&color=000000" alt="nextdotjs" />
    <img src="https://img.shields.io/badge/-Tailwind_CSS-black?style=for-the-badge&logoColor=white&logo=tailwindcss&color=06B6D4" alt="tailwindcss" />
    <img src="https://img.shields.io/badge/-Prisma-black?style=for-the-badge&logoColor=white&logo=prisma&color=2D3748" alt="prisma" />
  </div>
  <h3 align="center">Anonymous Reporting App</h3>
  <div align="center">
    A secure platform for anonymous incident reporting
  </div>
</div>

---

## 📋 Table of Contents

1. 🤖 [Introduction](#introduction)
2. ⚙️ [Tech Stack](#tech-stack)
3. 🔋 [Features](#features)
4. 🤸 [Quick Start](#quick-start)
5. 🕸️ [Environment Setup](#environment-setup)
6. 🔐 [Security](#security)
7. 🛠️ [API Usage](#api-usage)
8. 🚀 [Deployment](#deployment)
9. 🧑‍💻 [Development & Scripts](#development--scripts)
10. 🐞 [Troubleshooting](#troubleshooting)
11. 🤝 [Contributing](#contributing)
12. 📝 [License](#license)

---

## 🤖 Introduction

This is a state-of-the-art anonymous reporting system built with Next.js, designed to provide a secure platform for reporting incidents while maintaining complete anonymity. It supports image analysis using GeminiAI, secure authentication, and robust role-based access.

---

## ⚙️ Tech Stack

- **Next.js** (v14 & v15)
- **TypeScript**
- **Prisma** with Neon Database
- **NextAuth.js** for Authentication
- **Tailwind CSS**
- **React Hook Form**
- **GeminiAI** (Google Generative AI)
- **BCrypt** for Password Encryption

---

## 🔋 Features

- Anonymous incident reporting
- Image analysis using GeminiAI
- Role-based access (Admin, Moderator, User)
- Secure authentication with NextAuth.js
- Real-time report tracking
- PDF report generation
- Dashboard for report management
- Responsive UI with Tailwind CSS

---

## 🤸 Quick Start

**Prerequisites**

- [Node.js](https://nodejs.org/en)
- [npm](https://www.npmjs.com/) or [yarn](https://yarnpkg.com/)
- [Git](https://git-scm.com/)

**Installation**

```bash
# Clone the repository
git clone <your-repo-url>
cd crime-report-app-main

# Install dependencies for both apps
cd crime-report-app-main
npm install
cd avu-crime-report-app
npm install

# Set up the database
cd ..
npx prisma generate
npx prisma db push

# Start the development server (main app)
npm run dev
```

---

## 🕸️ Environment Setup

Create a `.env` file in the root directory with the following variables:

```env
NEXT_PUBLIC_MAPBOX_API_KEY=your-mapbox-key
DATABASE_URL=postgresql://your-database-url
NEXTAUTH_SECRET=your-secret-key
NEXTAUTH_URL=http://localhost:3000/api/auth
GEMINI_API_KEY=your-gemini-api-key
NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN=your-mapbox-access-api-key
```

---

## 🔐 Security

- **Authorization Middleware:**  
  The `/dashboard` and subroutes are protected by middleware. Only authenticated users can access these routes.
- **Vulnerability Management:**  
  Dependencies are regularly updated. Critical vulnerabilities (e.g., Next.js authorization bypass) are patched promptly.
- **Password Encryption:**  
  User passwords are hashed using BCrypt.
- **Environment Variables:**  
  Sensitive keys and secrets are stored in `.env` and never committed to version control.

---

## 🛠️ API Usage

### Analyze Image Endpoint

**POST** `/api/analyze-image`

**Request Body:**
```json
{
  "image": "data:image/jpeg;base64,..."
}
```

**Response:**
```json
{
  "title": "Brief title",
  "reportType": "Theft | Fire Outbreak | Medical Emergency | Natural Disaster | Violence | Other",
  "description": "Concise description",
  "isEmergency": true
}
```

**Rate Limiting:**  
If the Gemini API rate limit is hit (HTTP 429), the endpoint will automatically retry up to 3 times, waiting for the delay specified by the API.

---

## 🚀 Deployment

The application can be easily deployed on [Vercel](https://vercel.com):

1. Push your code to a Git repository
2. Connect your repository to Vercel
3. Configure the environment variables
4. Deploy!

---

## 🧑‍💻 Development & Scripts

- **Start Dev Server:** `npm run dev`
- **Build:** `npm run build`
- **Start Production:** `npm start`
- **Lint:** `npm run lint`
- **Create User Script:**  
  Use `node scripts/createUser.js` to create users from the command line.

---

## 🐞 Troubleshooting

- **Gemini API 429 Errors:**  
  The app will retry automatically. If you hit the limit frequently, consider reducing request frequency or upgrading your quota.
- **Database Issues:**  
  Ensure your `DATABASE_URL` is correct and the database is accessible.
- **Authentication Issues:**  
  Check your `NEXTAUTH_SECRET` and `NEXTAUTH_URL` values.

---

## 🤝 Contributing

Contributions are welcome! Please read our [Contributing Guidelines](CONTRIBUTING.md) first.

---

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

Would you like this README saved to your project, or do you want to customize any section further?
