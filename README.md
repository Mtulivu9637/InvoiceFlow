# InvoiceFlow - Freelance Invoice & Contract Automation

<div align="center">
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" class="w-24 h-24 text-primary" fill="hsl(207, 88%, 68%)" width="96" height="96">
    <path d="M14 2H6C4.9 2 4 2.9 4 4V20C4 21.1 4.9 22 6 22H18C19.1 22 20 21.1 20 20V8L14 2ZM18 20H6V4H13V9H18V20ZM11 19H13V16H11V19ZM11 15H13C14.1 15 15 14.1 15 13C15 11.9 14.1 11 13 11H11V15Z" />
  </svg>
  <h1 align="center">InvoiceFlow</h1>
  <p align="center">
    A comprehensive Freelance Invoice & Contract Automation Tool built with Next.js and AI.
    <br />
    <a href="/dashboard"><strong>Explore the app »</strong></a>
  </p>
</div>

---

![InvoiceFlow Dashboard Screenshot](https://placehold.co/1200x600.png)
*<p align="center">A placeholder image of the main dashboard. Replace with a real screenshot.</p>*


## ✨ Introduction

InvoiceFlow is a modern, all-in-one solution designed to simplify the administrative tasks of freelancing. From creating professional invoices and contracts to managing clients and sending intelligent reminders, InvoiceFlow leverages the power of AI to help you get paid faster and focus on what you do best.

## 🚀 Key Features

- **📊 Interactive Dashboard**: Get a quick overview of your financials, including total revenue, active clients, and pending/overdue invoices.
- **📄 Invoice Generator**: Easily create and customize professional invoices. Add line items, taxes, and due dates in a clean interface.
- **✍️ Contract Builder**: Draft and manage reusable contracts with placeholders. Load templates to speed up your workflow.
- **👥 Client Management**: Keep all your client information organized in one place for easy access and management.
- **🤖 AI Smart Reminders**: Use Genkit-powered AI to generate tailored reminder messages based on client payment history and invoice status, increasing the likelihood of on-time payments.
- **💳 Subscription Tiers**: A clear, tiered pricing structure to accommodate everyone from beginners to established agencies.

## 🛠️ Tech Stack

This project is built with a modern, scalable tech stack:

- **Framework**: [Next.js](https://nextjs.org/) (App Router)
- **UI**: [React](https://reactjs.org/), [TypeScript](https://www.typescriptlang.org/), [ShadCN UI](https://ui.shadcn.com/)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/)
- **AI/Generative**: [Firebase Genkit](https://firebase.google.com/docs/genkit)
- **Forms**: [React Hook Form](https://react-hook-form.com/) with [Zod](https://zod.dev/) for validation
- **Deployment**: Firebase App Hosting

## ⚙️ Getting Started

Follow these instructions to get a local copy up and running for development and testing purposes.

### Prerequisites

- [Node.js](https://nodejs.org/) (version 20 or later)
- [npm](https://www.npmjs.com/) or [yarn](https://yarnpkg.com/)

### Installation

1.  **Clone the repository:**
    ```sh
    git clone https://github.com/your-username/invoiceflow.git
    cd invoiceflow
    ```

2.  **Install dependencies:**
    ```sh
    npm install
    ```

3.  **Set up environment variables:**
    Create a `.env` file in the root of your project and add any necessary environment variables (e.g., for Firebase or Genkit).

4.  **Run the development server:**
    ```sh
    npm run dev
    ```

Open [http://localhost:9002](http://localhost:9002) with your browser to see the result.

## 📁 Project Structure

The project follows a standard Next.js App Router structure:

```
src
├── ai/                # Genkit AI flows and configuration
├── app/               # Next.js routes, pages, and layouts
│   ├── (app)/         # Logged-in application routes
│   └── ...
├── components/        # Reusable UI components (ShadCN)
├── hooks/             # Custom React hooks
└── lib/               # Utility functions
```

---

<p align="center">Built with ❤️ for freelancers everywhere.</p>
