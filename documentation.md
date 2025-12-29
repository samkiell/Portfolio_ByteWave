# ByteWave Project Documentation

This document outlines the architecture, technology stack, and team responsibilities for the ByteWave Portfolio project.

## 🏗 Project Architecture

The ByteWave Portfolio is built using a modern, scalable architecture designed for high performance and premium aesthetics. 

### Technology Stack
- **Framework:** [Next.js 16.1 (App Router)](https://nextjs.org/) - Utilizing Turbopack for lightning-fast development and build times.
- **Language:** JavaScript (JSX) - Optimized for rapid development and clean component logic.
- **Library:** [React 19](https://react.dev/) - Leveraging the latest concurrent features and server components.
- **Styling:** [Tailwind CSS](https://tailwindcss.com/) - Using a utility-first approach with a custom design system defined in `tailwind.config.js`.
- **Icons:** [Lucide React](https://lucide.dev/) - Integrated for consistent, vector-based iconography.
- **Animations:** [Framer Motion](https://www.framer.com/motion/) - Used for subtle, premium micro-interactions.
- **Theming:** [next-themes](https://github.com/pacocoursey/next-themes) - Supporting light/dark mode with system preference detection.

### Folder Structure
```text
src/
├── app/              # Next.js App Router (Routes, Layouts, Metadata)
│   ├── services/     # Services showcase route
│   ├── projects/     # Portfolio grid route
│   ├── about/        # Brand story route
│   ├── contact/      # Inquiry form route
│   └── layout.jsx    # Root layout with Navbar/Footer
├── components/       # Reusable UI Components
│   ├── layout/       # Brand-specific layouts (Navbar, Footer)
│   ├── sections/     # Landing page modular sections
│   └── ui/           # Shared atoms and molecule components
├── lib/              # Shared utility functions
└── public/           # Static assets (Favicon, Brand Images)
```

## 👥 Team & Responsibilities

Roles and tasks assigned by **[@samkiell](https://github.com/samkiell)**.

### 🛠 Technical Lead & Architect
- **[@samkiell](https://github.com/samkiell)** (Samuel Ezekiel)
  - **Status:** Completed Landing Page & Core Architecture.
  - **Responsibilities:** Technical oversight, project scaffolding, deployment management, and code review.

### 🎨 Senior Frontend Engineers (UI/UX)
- **[@Ayomide-Philip](https://github.com/Ayomide-Philip)** (Ayomide Philip)
  - **Assigned Tasks:**
    - **Development of `/services` page:** Detailed breakdown of Web and Mobile offerings, tech stacks, and engineering processes.

- **[@pamwise](https://github.com/pamwise)** (pamwise)
  - **Assigned Tasks:**
    - **Development of `/contact` page:** Building the functional project inquiry form with validation and email service integration.
    - **Analytics Integration:** Setting up tracking for landing page engagement.

### 💻 Core Frontend Developers
- **[@ayodelebello310-svg](https://github.com/ayodelebello310-svg)**
  - **Assigned Tasks:**
    - **Development of `/projects` page:** Creating a comprehensive showcase of all the projects ByteWave has worked on, featuring dynamic grids, results, and detailed case studies.

- **[@Robotinic17](https://github.com/Robotinic17)**
  - **Assigned Tasks:**
    - **Development of `/about` page:** Crafting the global collective story and mission.
    - **SEO & Performance Optimization:** Ensuring all pages follow best practices.

## 🚀 Development Workflow

1. **Branching:** All developers must work on their respective branches.
2. **Pull Requests:** Once a page or component is complete, create a Pull Request to the `main` branch.
3. **Review:** [@samkiell](https://github.com/samkiell) will review the PR for performance, responsiveness, and design consistency.
4. **Deploy:** Successful merges to `main` will automatically trigger a Vercel deployment.

---

## 📬 Contact form & email sending
- Server API: `POST /api/inquiry` — validates requests with Zod and sends emails via SendGrid.
- Environment variables (add to your deployment or `.env`):
  - `SENDGRID_API_KEY` — **required** to enable email sending.
  - `CONTACT_TO_EMAIL` — recipient address (defaults to `bytewaveteams@gmail.com`).
  - `CONTACT_FROM_EMAIL` — sender address (use a verified SendGrid sender).

If `SENDGRID_API_KEY` is missing, the API responds with 503 and the form shows a friendly fallback instructing users to email directly.

**Notes:** For static-only deployments without a server, consider a third-party form backend (Formspree, Getform) as an alternative.

## 📈 Analytics (Google Analytics - GA4)
- We load GA4 in `src/app/layout.jsx` and track page views automatically.
- Form submissions fire a GA event `generate_lead` with `{ method: 'contact_form' }` from `InquiryForm.jsx` on successful send.
- Set your measurement ID in an environment variable: `NEXT_PUBLIC_GA_MEASUREMENT_ID` (public). The project currently falls back to the provided ID: `G-R41VL94TC4` if the env var is not set.

**Privacy & Consent:** If you need GDPR/CCPA compliance, add a consent banner and delay loading GA until consent is granted.

---
**ByteWave** | *Corporate. Polished. Modern. Confident.*
