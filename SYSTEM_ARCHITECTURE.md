# System Flow & Architecture

## 🔄 Complete User Flow

```
┌─────────────────────────────────────────────────────────────────┐
│                      ADMIN DASHBOARD                             │
│                   /admin/page.tsx                                │
└────────┬────────────────────────────────────────────────────────┘
         │
         ├─────────────────────┬────────────────────┬──────────────┐
         │                     │                    │              │
         ▼                     ▼                    ▼              ▼
    ┌─────────┐        ┌──────────────┐     ┌──────────────┐  ┌─────────┐
    │Projects │        │Project Members   │  │ Risks       │  │Activity │
    │ /admin/ │        │/admin/users   │  │              │  │         │
    │projects │        │(Employees)    │  │              │  │         │
    └────┬────┘        └──────┬────────┘  └──────────────┘  └─────────┘
         │                    │
         ├─────────┬──────────┴─────────┐
         │         │                    │
         ▼         ▼                    ▼
    ┌──────┐  ┌──────────┐         ┌──────────┐
    │View  │  │Create New│         │Edit Project
    │All   │  │Project   │         │/admin/
    │      │  │/admin/   │         │projects/[id]
    └──────┘  │projects/ │         └──────────┘
              │new       │
              └────┬─────┘
                   │
              ┌────▼────────────────────────┐
              │  Form (Project + Employees) │
              │  - Name                     │
              │  - Description              │
              │  - Client (with email)      │
              │  - Start/End dates          │
              │  - Employee checkboxes      │
              └────┬──────────────────────┬─┘
                   │                      │
              ┌────▼─┐              ┌────▼──┐
              │Create│              │Update │
              │      │              │       │
              └────┬─┘              └───┬───┘
                   │                    │
              ┌────▼────────────────────▼─┐
              │  Save to localStorage     │
              │  localStorage['projects'] │
              └────┬──────────────────────┘
                   │
              ┌────▼────────────────────┐
              │ Redirect to /admin/     │
              │ projects                │
              │ (Show success message)  │
              └─────────────────────────┘
```

## 🔌 Data Structure in localStorage

### Projects Array
```typescript
localStorage['projects'] = [
  {
    id: "1706256000000",          // Unique ID (timestamp)
    name: "E-commerce Redesign",  // Project name
    description: "...",           // Project description
    clientId: "client1",          // Selected client
    employeeIds: [                // Array of employee IDs
      "emp1",
      "emp2",
      "emp6"
    ],
    startDate: "2025-01-01",      // ISO date string
    endDate: "2025-06-30",        // ISO date string
    createdAt: "2025-01-01T...", // ISO timestamp
    updatedAt: "2025-01-15T..."  // ISO timestamp
  },
  ...more projects
]
```

## 👥 Employee Lookup

```typescript
const allEmployees = {
  "emp1": "John Doe",
  "emp2": "Jane Smith",
  "emp3": "Mike Johnson",
  "emp4": "Sarah Williams",
  "emp5": "Bob Brown",
  "emp6": "Alice Green",
  "emp7": "Charlie Davis"
}
```

## 🏢 Client Lookup

```typescript
const allClients = {
  "client1": {
    name: "Acme Corp",
    email: "contact@acme.com"
  },
  "client2": {
    name: "TechStart Inc", 
    email: "info@techstart.com"
  },
  "client3": {
    name: "DataCorp",
    email: "hello@datacorp.com"
  },
  "client4": {
    name: "RetailHub Ltd",
    email: "support@retailhub.com"
  }
}
```

## 📊 Page Responsibilities

### `/admin/projects/new` (CreateProjectPage)
```
Input: Form submission with:
  - name, description
  - clientId 
  - employeeIds: string[]
  - startDate, endDate

Process:
  1. Validate all fields
  2. Generate unique ID (Date.now())
  3. Create project object
  4. Push to localStorage['projects']
  5. Redirect to /admin/projects

Output: Project saved in localStorage
```

### `/admin/projects/[id]` (EditProjectPage)
```
Input: URL param [id]

Process:
  1. Load projects from localStorage
  2. Find project by ID
  3. Load form data from project
  4. On submit:
     - Validate
     - Update project in array
     - Save to localStorage
     - Redirect

Output: Updated project in localStorage
```

### `/admin/projects` (ProjectsListPage)
```
Input: None

Process:
  1. Load projects from localStorage
  2. Display all projects
  3. For each project:
     - Show name, description
     - Show team size (employeeIds.length)
     - Link to /admin/projects/[id]

Output: List of clickable project cards
```

### `/admin/users` (ProjectMembersPage)
```
Input: None

Process:
  1. Load projects from localStorage
  2. For each project:
     - Look up employeeIds
     - Convert to employee objects
     - Look up clientId
     - Get client name
  3. Display with structure:
     Project → Client → [Employees]

Output: Organized view of all project teams
```

## 🔑 Key Patterns

### Loading Data
```typescript
const projectsJson = localStorage.getItem('projects');
const projects = projectsJson ? JSON.parse(projectsJson) : [];
```

### Saving Data
```typescript
const newProject = { id, name, description, ... };
projects.push(newProject);
localStorage.setItem('projects', JSON.stringify(projects));
```

### Converting IDs to Objects
```typescript
const employees = project.employeeIds.map(empId => 
  allEmployees.find(e => e.id === empId)
);
```

## 🎯 State Management

| Page | State | Source |
|------|-------|--------|
| Create | formData | Local state |
| Edit | formData + project | localStorage |
| List | projects | localStorage |
| Team Members | projects | localStorage |

All using React `useState` and `useEffect` hooks.

## ✨ User Experience

### Creating Project
1. Select "New Project" button
2. Fill required fields (all have validation)
3. Select multiple employees via checkboxes
4. See selected employees as pills
5. Click "Create Project"
6. ✅ Success message
7. ✅ Auto redirect

### Editing Project
1. Click project from list
2. All fields pre-filled
3. Can edit anything
4. Add/remove employees
5. Click "Update Project"
6. ✅ Success message
7. ✅ Auto redirect

### Finding Team Members
1. Click "Project Team Members"
2. See all projects
3. See assigned employees
4. Click "Edit Project" to modify

## 🔐 Validation Rules

```typescript
// Project name: required, non-empty
// Description: required, non-empty
// Client: required, must select
// Start Date: required
// End Date: required, must be AFTER start date
// Employees: required, minimum 1
```

## 🚀 Performance Notes

- ✅ All data in localStorage (instant access)
- ✅ No API calls (for now)
- ✅ Efficient employee/client lookups
- ✅ Form validation before save
- ✅ No unnecessary re-renders

---

This architecture is simple, clean, and ready for backend integration when needed!
