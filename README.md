# To use the seedAdmin /api/seedAdmin make here a get req...As this should be a post req but it was given for random user purpose


# Health Tracker - Project Management System

A comprehensive web-based system for tracking project health, managing team progress, and facilitating structured feedback between clients, employees, and administrators.

## Overview

This system is designed for IT and software companies to monitor project progress, track client satisfaction, identify risks, and make data-driven decisions about project interventions. It provides role-based dashboards and workflows for three user types: Admins, Employees, and Clients.

## Tech Stack

- **Frontend**: Next.js 16.1.1 with App Router & TypeScript
- **Styling**: Tailwind CSS 4
- **State Management**: Context API (Auth)
- **Backend**: Ready for Express.js or Next.js API Routes
- **Database**: MongoDB (Ready for integration)
- **Authentication**: JWT-based with context API

## Key Features

### 1. Authentication & Access Control
- JWT-based secure login
- Three distinct roles: Admin, Employee, Client
- Protected routes with role-based access
- Session persistence with cookies
- As [Login system (no public registration)] was recommended so admin can sign up and client and employee accounts will be       created after the invitation by the admin.The password will be sent through email.

### 2. Project Management
- Admins create projects and assign teams
- Multiple employees per project, one client
- Timeline management with start/end dates
- Project status tracking
- Automatic health score calculation

### 3. Weekly Check-In System
**Employee Check-Ins**: Progress updates, blockers, confidence level, completion %
**Client Feedback**: Satisfaction rating, communication clarity, comments, issue flagging

### 4. Project Health Score (0-100)
Automatic calculation based on:
- Client satisfaction (30 pts)
- Employee confidence (25 pts)
- Progress tracking (20 pts)
- Risk management (25 pts)
- Flagged issues (10 pts)

**Status Interpretation**:
- 80-100: On Track (Green)
- 60-79: At Risk (Yellow)
- Below 60: Critical (Red)

### 5. Risk Management
- Employees report risks with severity levels
- Mitigation planning
- Status tracking (Open/Resolved/Mitigated)
- Admin risk overview and filtering

### 6. Role-Based Dashboards
- **Admin**: Project statistics, health overview, risk summary
- **Employee**: Assigned projects, pending check-ins, open risks
- **Client**: Project overview, health status, feedback history

### 7. Activity Timeline
Track all project events with timestamps and user info

### 8. Professional UI
- Responsive design (mobile, tablet, desktop)
- Consistent Tailwind CSS styling
- Status indicators and color coding
- Loading states, error handling, empty states

## Project Structure

```
health-tracker/
├── app/
│   ├── components/              # Reusable UI components
│   │   ├── Button, Card, Input, Select, Textarea
│   │   ├── Alert, Modal, Tabs, HealthScoreBadge
│   │   ├── Navigation, Loading, EmptyState
│   │   └── index.ts
│   ├── admin/                   # Admin pages
│   │   ├── page.tsx            (Dashboard)
│   │   └── projects/           (List, Create, Details)
│   ├── employee/                # Employee pages
│   │   ├── page.tsx            (Dashboard)
│   │   ├── projects/           (List, Details)
│   │   ├── check-ins/          (List, Submit)
│   │   └── risks/              (List, Report)
│   ├── client/                  # Client pages
│   │   ├── page.tsx            (Dashboard)
│   │   ├── projects/           (List, Details)
│   │   └── feedback/           (List, Submit)
│   ├── auth/                    (Login page)
│   ├── layout.tsx              (Root layout with auth provider)
│   └── page.tsx                (Home - redirects to dashboard)
├── lib/
│   ├── types/index.ts          (All TypeScript definitions)
│   ├── utils/
│   │   ├── api.ts              (API client for backend)
│   │   └── healthScore.ts      (Health score calculation logic)
│   └── hooks/
│       ├── useAuth.tsx         (Auth context + hook)
│       └── useProtectedRoute.ts (Route protection)
├── package.json
├── tsconfig.json
├── tailwind.config.ts
├── next.config.ts
└── README.md
```Later this was edited when needed...

## Demo Credentials

```
Admin:
Email: admin@example.com | Password: password

Employee:
Email: emp@example.com | Password: password

Client:
Email: client@example.com | Password: password
```

## Getting Started

### Prerequisites
- Node.js 18+
- npm or yarn

### Installation & Run

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Open http://localhost:3000
```

### Build

```bash
npm run build
npm start
```

## Health Score Calculation Formula

```
Base Score: 100

Deductions:

Client Satisfaction (max 30 pts):

Average satisfaction × 3

Average communication clarity × 3

Each flagged issue: -2 pts (max 10 pts)

Employee Confidence (max 25 pts):

Average confidence level (1-5) × 5

Progress Tracking (max 20 pts):

Compare actual vs expected completion

10%+ behind: 20 pts deduction

5-10% behind: 10 pts deduction

On track: 2 pts deduction

Risk Management (max 25 pts):

High severity risk: -10 pts each

Medium severity risk: -5 pts each

Low severity risk: -2 pts each

Maximum deduction capped at 25 pts

Flagged Issues (max 10 pts):

Each flagged issue: -2 pts

Final Score = max(0, min(100, 100 - total_deductions))

Brief Explanation:

Base Score: Starts at 100.

Client Satisfaction (30 pts): Uses the most recent 4 client feedbacks. Scores are based on average satisfaction and communication clarity, with deductions for flagged issues (max 10 pts).

Employee Confidence (25 pts): Uses the most recent 4 employee check-ins. Deduction depends on the average confidence level (1–5 scale).

Progress Tracking (20 pts): Compares actual project completion with expected progress based on elapsed days. More delay means higher deduction.

Risk Management (25 pts): Each solved risk deducts points depending on severity (high: 10, medium: 5, low: 2), capped at 25 pts.

Flagged Issues (10 pts): Each flagged issue reduces 2 pts.

Final Score: Ensures the result is between 0 and 100.
```

## API Integration Ready

Frontend prepared with full API client structure:

```typescript

createProject
createUser
updateProject
fetchProjects
fetchEmployee
createFeedback
fetchFeedback
createCheckIn
fetchCheckIns
createRisk
fetchRisk
solveRisk

The login and singUp api was not included here.But it will be.To reduce the hook issue it was done inside the file.Due to time sortage now it was not added here.Local state was handled through Cookies

### Backend Setup

1. **Configure API URL**:
   ```
   NEXT_PUBLIC_API_URL=http://localhost:5000/api
   ```

2. **Choose Backend**:
   - Option A: Express.js REST API
   - Option B: Next.js API Routes

3. **Implement Endpoints** for:
   - Authentication (login, token validation)
   - Projects (CRUD)
   - Check-Ins (Create, Read)
   - Feedback (Create, Read)
   - Risks (CRUD)
   - Activities (Read)

4. **MongoDB Collections**:
   - users
   - projects
   - check_ins
   - feedbacks
   - risks
   - activities

## Page Routes

### Admin Routes
- `/admin` - Redirecting to projects as seperate dashboard section creates redundancy
- `/admin/projects` - Projects list
- `/admin/projects/new` - Create project
- `/admin/projects/[id]` - Project details or edition
- `/admin/users` - User management
- `/admin/risks` - Risk overview
- `/admin/activity` - Activity timeline

### Employee Routes
- `/employee` - Dashboard
- `/employee/projects` - Assigned projects
- `/employee/projects/[id]` - Project details
- `/employee/check-ins` - Check-ins history
- `/employee/check-ins/[projectId]` - Submit check-in
- `/employee/risks` - My risks
- `/employee/risks/new` - Report new risk

### Client Routes
- `/client` - Dashboard
- `/client/projects` - Assigned projects
- `/client/projects/[id]` - Project details
- `/client/feedback` - Feedback history
- `/client/feedback/[projectId]` - Submit feedback

### Auth Routes
- `/auth/login` - Login page
- `/unauthorized` - 403 Access Denied
- `/not-found` - 404 Page Not Found

## Component Library

### Input Components
- **Button**: Variants (primary, secondary, danger, success, warning), sizes (sm, md, lg)
- **Input**: Text input with label, error, helper text
- **Select**: Dropdown with options, labels, errors
- **Textarea**: Multi-line input with validation

### Layout Components
- **Card**: CardHeader, CardBody, CardFooter with hover effect
- **Modal**: Dialog with title, close button
- **Navigation**: Responsive sidebar + mobile menu
- **Tabs**: Tab switcher component

### Display Components
- **Alert**: Info, success, warning, error states
- **HealthScoreBadge**: Colored badge with score and status
- **Loading**: Spinner and page loading states
- **EmptyState**: No data message with optional action

## Features Highlights

✅ All UI pages and components built per requirements
✅ Professional, clean, responsive design
✅ Complete navigation with role-based menus
✅ Mock data ready for backend integration
✅ Full TypeScript type safety
✅ Protected routes with role-based access
✅ Health score calculation logic implemented
✅ Activity timeline and comprehensive tracking
✅ Form validation and error handling
✅ Loading states and user feedback
✅ Empty states and error pages
✅ Accessible and WCAG compliant


## Technology Decisions

### Frontend Framework: Next.js
- App Router for file-based routing
- Server-side rendering support
- Excellent for full-stack applications
- Great TypeScript support

### Styling: Tailwind CSS
- Utility-first CSS framework
- Responsive design out of box
- Consistent color scheme
- Easy customization

### Authentication: JWT + Context API
- Stateless authentication
- Secure token-based auth
- Context API for global state
- localStorage for persistence

## Responsive Design

- **Mobile**: Full-width, single column, hamburger menu
- **Tablet**: Two-column layouts, responsive cards
- **Desktop**: Three-column, sidebar navigation
- Touch-friendly buttons and inputs
- Optimized typography for all screen sizes

## Accessibility

- Semantic HTML structure
- ARIA labels and roles
- Color contrast compliance
- Keyboard navigation support
- Focus indicators
- Form label associations

## Performance Optimization

- Code splitting via Next.js
- Image optimization ready
- Lazy loading support
- Efficient component re-renders
- Minimal dependencies

## License

Copyright © 2025 Health Tracker - Project Management System. All rights reserved.

---

