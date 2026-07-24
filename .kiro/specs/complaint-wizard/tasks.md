# Tasks: Customer Feedback & Complaint Submission Wizard

## Task Breakdown

Each task includes acceptance criteria and dependencies. Tasks are grouped by phase and should be completed in order within each phase. Phases can overlap where dependencies allow.

---

## Phase 1: Project Scaffolding & Shared Setup

### Task 1.1 — Initialize Frontend Project
- [x] Create `frontend/` directory with Vite + React (JavaScript) template
- [x] Install dependencies: react, react-dom, react-hook-form, zustand, yup, @hookform/resolvers, tailwindcss, postcss, autoprefixer
- [x] Configure Tailwind CSS (`tailwind.config.js`, base styles)
- [x] Configure Vite (`vite.config.js` with proxy to backend for dev)
- [x] Create `index.html` with basic meta tags and viewport
- [x] Verify: `npm run dev` starts without errors, blank page renders

**Depends on:** Nothing

---

### Task 1.2 — Initialize Backend Project
- [ ] Create `backend/` directory with Express (JavaScript) setup
- [x] Install dependencies: express, cors, helmet, express-rate-limit, multer, @aws-sdk/client-dynamodb, @aws-sdk/lib-dynamodb, @aws-sdk/client-s3, @aws-sdk/client-ses, nanoid, yup, dotenv, file-type, uuid
- [x] Create `src/app.js` with Express app, CORS, helmet, JSON parsing
- [ ] Create `src/config/index.js` with environment variable loading
- [ ] Create `.env.example` with all required env vars documented
- [ ] Verify: `npm start` starts server on configured port, returns 200 on health endpoint

**Depends on:** Nothing

---

### Task 1.3 — Shared Validation Schemas
- [ ] Create `shared/validation/schemas.js` with Yup schemas for all 4 steps
- [ ] Create `shared/validation/messages.js` with all validation message constants
- [ ] Ensure schemas are importable from both frontend and backend (configure package.json or path aliases)
- [ ] Verify: schemas validate correct and incorrect data as expected

**Depends on:** Task 1.1, Task 1.2

---

### Task 1.4 — DynamoDB Table Setup
- [ ] Create `backend/src/db/dynamoClient.js` — DynamoDB DocumentClient initialization
- [ ] Document table creation (CloudFormation/CDK script or manual instructions):
  - Table: `Complaints`
  - PK: `PK` (String), SK: `SK` (String)
  - GSI1: `complaintId` (PK) + `createdAt` (SK)
  - GSI2: `status` (PK) + `createdAt` (SK)
- [ ] Create helper functions for common operations (putItem, getItem, query)
- [ ] Verify: Can write and read a test item from DynamoDB (local or AWS)

**Depends on:** Task 1.2

---

## Phase 2: Frontend — Layout & Wizard Shell

### Task 2.1 — Page Layout Components
- [ ] Create `Header.jsx` — logo top-left, light background, thin bottom divider
- [ ] Create `Footer.jsx` — dark slate background, white centered copyright text
- [ ] Create `PageLayout.jsx` — wraps Header + content area + Footer
- [ ] Content area: white, centered, max-width 720px, responsive padding
- [ ] Verify: Layout renders correctly on desktop (>1024px), tablet (640-1024px), mobile (<640px)

**Depends on:** Task 1.1

---

### Task 2.2 — Progress Bar Component
- [ ] Create `ProgressBar.jsx` — 4-segment horizontal bar
- [ ] Completed steps: green (#22c55e) solid bar
- [ ] Current step: blue (#2563eb) solid bar
- [ ] Future steps: light grey (#e5e7eb) bar
- [ ] Right-aligned text: "Step X of 4"
- [ ] Props: `currentStep` (1-4), `totalSteps` (4)
- [ ] Verify: Visually matches mockup, updates correctly per step

**Depends on:** Task 2.1

---

### Task 2.3 — Wizard Shell & Navigation Buttons
- [ ] Create `WizardShell.jsx` — renders ProgressBar + current step component + NavigationButtons
- [ ] Create `NavigationButtons.jsx`:
  - Previous: outlined blue border, pill-shaped, left arrow + text, hidden on Step 1
  - Next: filled blue, pill-shaped, white text (Steps 1-3)
  - Submit: filled blue, pill-shaped (Step 4 only)
- [ ] Buttons placed below a thin horizontal divider, left-aligned
- [ ] Verify: Correct buttons shown per step, pill shape matches mockup

**Depends on:** Task 2.2

---

### Task 2.4 — Wizard Store (Zustand)
- [ ] Create `store/wizardStore.js` with full state shape (all step data, currentStep, isSubmitting, etc.)
- [ ] Implement `goNext()` — validates current step, increments if valid
- [ ] Implement `goPrevious()` — decrements step, no validation
- [ ] Implement `setStepData(step, data)` — merges partial data
- [ ] Implement `canAccessStep(targetStep)` — step guard logic
- [ ] Implement `reset()` — clears all state
- [ ] Verify: State transitions work correctly, guards prevent skipping

**Depends on:** Task 1.3

---

### Task 2.5 — Autosave & Before-Unload Hooks
- [ ] Create `hooks/useAutosave.js` — debounced (500ms) save to sessionStorage on field changes
- [ ] On mount: restore from `idp_complaint_draft` key if exists
- [ ] On successful submission: clear sessionStorage
- [ ] Create `hooks/useBeforeUnload.js` — warns user if unsaved data exists and step !== 'confirmed'
- [ ] Verify: Data persists through page refresh, warning shows on tab close with data

**Depends on:** Task 2.4

---

## Phase 3: Frontend — Step Components

### Task 3.1 — Form Field Components (Shared)
- [ ] `TextInput.jsx` — label, input, inline error, mandatory asterisk
- [ ] `TextArea.jsx` — label, multiline textarea, char counter, inline error
- [ ] `Dropdown.jsx` — label, select with chevron, placeholder, inline error
- [ ] `RadioGroup.jsx` — label, vertical radio list, inline error
- [ ] `Checkbox.jsx` — checkbox with label (supports links in label text)
- [ ] `InlineError.jsx` — red text below field
- [ ] `FieldLabel.jsx` — bold label with optional asterisk for mandatory fields
- [ ] All fields show validation on blur and on submit attempt
- [ ] Verify: Each component renders correctly, shows/hides errors appropriately

**Depends on:** Task 2.1

---

### Task 3.2 — File Uploader Component
- [ ] Create `FileUploader.jsx`:
  - Dashed border drop zone with upload icon
  - "Drag and drop or Browse" text (Browse is clickable link)
  - Format hint below: "PDF, DOC, DOCX, JPG, JPEG, PNG — max 10MB"
  - File list below with name, size, remove button
  - Per-file progress bar during upload
- [ ] Client-side validation: max 10 files, max 10MB each, extension whitelist
- [ ] Call `POST /api/upload` per file, track progress
- [ ] Support `DELETE /api/upload/{fileId}` on remove
- [ ] Inline error messages for invalid files
- [ ] Verify: Upload works, progress shows, file list updates, errors display for invalid files

**Depends on:** Task 3.1, Task 4.2 (backend upload endpoint)

---

### Task 3.3 — Step 1: Complaint Details
- [ ] Create `Step1_ComplaintDetails.jsx`
- [ ] Integrate with React Hook Form + Yup step1Schema
- [ ] Complaint description: mandatory multiline TextArea with character counter
- [ ] File upload section using FileUploader component
- [ ] Validation on blur and on Next click
- [ ] Verify: Cannot proceed with blank description, files upload correctly, errors show inline

**Depends on:** Task 3.1, Task 3.2, Task 2.4

---

### Task 3.4 — Step 2: Incident Location
- [ ] Create `Step2_IncidentLocation.jsx`
- [ ] Integrate with React Hook Form + Yup step2Schema
- [ ] Country dropdown: async-loaded from `GET /api/countries`
- [ ] Office text field: mandatory unless "Online" selected
- [ ] "Other, Please Specify" field: hidden by default, rendered only when "Online" selected
- [ ] Conditional logic: Online → office optional, otherSpecify mandatory
- [ ] Verify: Country loads from API, conditional fields show/hide correctly, validation works

**Depends on:** Task 3.1, Task 2.4, Task 4.1 (countries endpoint)

---

### Task 3.5 — Step 3: Who Is Lodging
- [ ] Create `Step3_WhoIsLodging.jsx`
- [ ] Integrate with React Hook Form + Yup step3Schema
- [ ] RadioGroup: Student, Parent, University/College/School Representative, Other
- [ ] "Please Specify" text field: hidden by default, rendered only when "Other" selected
- [ ] Verify: Radio selection works, conditional field appears for "Other", validation prevents empty proceed

**Depends on:** Task 3.1, Task 2.4

---

### Task 3.6 — Step 4: Contact Preference
- [ ] Create `Step4_ContactPreference.jsx`
- [ ] RadioGroup: Yes / No
- [ ] **Yes flow:** Expand grey-background card (ContactCard) with:
  - Full Name (TextInput)
  - Email (TextInput)
  - Country Code (Dropdown, narrow) + Phone (TextInput, wider) — side by side
  - Current Country (Dropdown)
  - Study Destination (Multi-select or Dropdown)
  - All fields mandatory, validated with contactDetailsSchema
- [ ] **No flow:** Hide contact card, show only Privacy Policy checkbox
- [ ] Privacy Policy checkbox (mandatory in both flows), links open in new tab
- [ ] Submit button: disabled until privacy accepted, disables on click to prevent double-submit
- [ ] Verify: Yes/No toggle shows/hides contact section, validation per flow, submit disables correctly

**Depends on:** Task 3.1, Task 2.4, Task 4.1 (countries endpoint)

---

### Task 3.7 — Confirmation Screen
- [ ] Create `ConfirmationScreen.jsx`
- [ ] **Yes flow message:** "Thank you for sharing. Understanding your situation helps us continually improve and we will be in touch soon."
- [ ] **No flow message:** "As you have asked us not to contact you, we won't. That said, understanding your situation helps us continually improve so thank you for sharing."
- [ ] Display Complaint ID prominently
- [ ] "Return to IDP.com" button — navigates to hardcoded URL (not history.back)
- [ ] Verify: Correct message shown per flow, complaint ID displayed, return button works

**Depends on:** Task 2.3

---

## Phase 4: Backend — API Endpoints

### Task 4.1 — Countries & Offices Endpoints
- [ ] Create `src/routes/countries.js`
- [ ] `GET /api/countries` — returns canonical country list (seeded data or DynamoDB lookup)
- [ ] Include "Online" as special entry with `code: "ONLINE"`
- [ ] `GET /api/offices?countryCode={code}` — returns offices for a country
- [ ] Apply rate limiting (60 req/min per IP)
- [ ] Verify: Returns correct JSON structure, "Online" present, rate limiting triggers on excess

**Depends on:** Task 1.2

---

### Task 4.2 — File Upload Endpoint
- [ ] Create `src/routes/upload.js`
- [ ] `POST /api/upload` — accepts multipart file + sessionToken
- [ ] Server-side validation: MIME type via magic bytes (file-type lib), size ≤ 10MB
- [ ] Upload to S3 under `uploads/pending/{sessionToken}/{fileId}/{originalName}`
- [ ] Trigger malware scan (or mock for initial implementation)
- [ ] Return `{ fileId, fileName, size, mimeType, scanStatus }`
- [ ] `DELETE /api/upload/{fileId}` — removes file from S3
- [ ] Apply rate limiting (20 req/15min per IP)
- [ ] Verify: File uploads to S3, invalid files rejected, delete removes file

**Depends on:** Task 1.2, Task 1.4

---

### Task 4.3 — Complaint Submission Endpoint
- [ ] Create `src/routes/complaints.js`
- [ ] `POST /api/complaints` — accepts full complaint payload
- [ ] Server-side validation using shared Yup schemas
- [ ] Generate human-readable Complaint ID (nanoid: `IDP-YYYYMMDD-XXXX`)
- [ ] Write complaint item to DynamoDB (PK/SK pattern)
- [ ] Write attachment items to DynamoDB (link fileIds)
- [ ] Move S3 files from `pending/` to `clean/{complaintId}/`
- [ ] Write audit entry: `created`
- [ ] **PII enforcement:** Do NOT write PII fields when contactPreference = false
- [ ] Apply rate limiting (5 req/15min per IP)
- [ ] Return `{ complaintId, status, emailSent }`
- [ ] Verify: Complaint created in DynamoDB, files moved in S3, PII not stored for No flow

**Depends on:** Task 1.3, Task 1.4, Task 4.2

---

### Task 4.4 — Email Service
- [ ] Create `src/services/emailService.js`
- [ ] Send acknowledgement email via AWS SES (Yes flow only)
- [ ] Async — do not block complaint response
- [ ] Retry logic: 3 attempts, exponential backoff (1s, 4s, 16s)
- [ ] Log success/failure to audit entries in DynamoDB
- [ ] Verify: Email sends for Yes flow, does not send for No flow, retries on failure

**Depends on:** Task 4.3

---

### Task 4.5 — Complaint ID Generator Service
- [ ] Create `src/services/idGeneratorService.js`
- [ ] Format: `IDP-YYYYMMDD-XXXX` (4 chars from alphabet `ABCDEFGHJKLMNPQRSTUVWXYZ23456789`)
- [ ] Use nanoid with custom alphabet
- [ ] Check uniqueness against DynamoDB GSI1 before returning
- [ ] Verify: Generates valid format, no ambiguous characters, handles collision retry

**Depends on:** Task 1.4

---

### Task 4.6 — Error Handling & Rate Limiting Middleware
- [ ] Create `src/middleware/errorHandler.js` — global error handler, consistent JSON error responses
- [ ] Create `src/middleware/rateLimiter.js` — configurable per-endpoint rate limits
- [ ] Rate limit responses: 429 with `retryAfter` field
- [ ] Validation error responses: 400 with `fields` object
- [ ] Verify: Errors return proper status codes and JSON structure

**Depends on:** Task 1.2

---

## Phase 5: Integration & Polish

### Task 5.1 — Connect Frontend to Backend
- [ ] Wire Step 1 FileUploader to `POST/DELETE /api/upload`
- [ ] Wire Step 2 Country dropdown to `GET /api/countries`
- [ ] Wire Step 4 Country Code / Current Country to same `/api/countries` data
- [ ] Wire Submit button to `POST /api/complaints`
- [ ] Handle loading states, error states, and 429 (rate limited) responses in UI
- [ ] Verify: Full flow works end-to-end from Step 1 through Confirmation

**Depends on:** Phase 3, Phase 4

---

### Task 5.2 — Autosave Integration
- [ ] Connect `useAutosave` hook to wizard store
- [ ] Ensure sessionStorage saves on every field change (debounced)
- [ ] Hydrate store from sessionStorage on page load
- [ ] Clear on successful submission
- [ ] Verify: Refresh mid-flow retains all entered data, submission clears draft

**Depends on:** Task 2.5, Task 5.1

---

### Task 5.3 — Responsive Testing & Polish
- [ ] Test all steps on mobile (<640px), tablet (640-1024px), desktop (>1024px)
- [ ] Ensure phone Country Code + Phone Number stack on mobile, side-by-side on desktop
- [ ] Ensure navigation buttons are usable at all sizes
- [ ] Ensure file upload drag-drop works on desktop, browse button prominent on mobile
- [ ] Verify: No horizontal scroll, all interactive elements reachable, text readable at all breakpoints

**Depends on:** Task 5.1

---

### Task 5.4 — Accessibility Audit
- [ ] All form fields have associated labels (htmlFor/id)
- [ ] Error messages linked to fields via aria-describedby
- [ ] Progress bar has appropriate aria-label/role
- [ ] Radio groups use proper fieldset/legend
- [ ] Focus management: first invalid field focused on validation failure
- [ ] Keyboard navigation works through all steps
- [ ] Verify: Can complete full flow using keyboard only, screen reader announces errors

**Depends on:** Task 5.1

---

### Task 5.5 — Malware Scan Integration
- [ ] Implement actual ClamAV scan (Lambda or sidecar) or document mock behavior
- [ ] On scan failure: delete file from S3, return 422 to client
- [ ] On scan success: mark file as `clean` in DynamoDB attachment record
- [ ] Verify: Clean files pass, infected test file (EICAR) is rejected

**Depends on:** Task 4.2

---

### Task 5.6 — Data Retention & Deletion
- [ ] Implement `DELETE /api/complaints/{complaintId}` for GDPR erasure
- [ ] Delete DynamoDB items (complaint + attachments + audit)
- [ ] Delete S3 objects for all attachments
- [ ] Write audit entry before deletion (for compliance log)
- [ ] Configure S3 lifecycle policy: delete `pending/` objects after 24 hours
- [ ] Verify: Complaint fully removed from DynamoDB and S3 on delete

**Depends on:** Task 4.3

---

## Phase 6: Documentation & Deployment Prep

### Task 6.1 — README & Setup Documentation
- [ ] Root README.md with project overview, architecture diagram, and local setup instructions
- [ ] Frontend README: how to run dev server, build for production
- [ ] Backend README: environment variables, DynamoDB table setup, S3 bucket config
- [ ] Document API endpoints (can be a simple markdown or Swagger/OpenAPI later)

**Depends on:** All above

---

### Task 6.2 — Environment Configuration
- [ ] Create `.env.example` files for frontend and backend
- [ ] Document all required AWS credentials and resource ARNs
- [ ] Document DynamoDB table creation steps (or provide IaC script)
- [ ] Document S3 bucket creation with appropriate policies

**Depends on:** Task 6.1

---

## Summary

| Phase | Tasks | Focus Area |
|-------|-------|-----------|
| Phase 1 | 1.1 – 1.4 | Project scaffolding, shared schemas, DynamoDB setup |
| Phase 2 | 2.1 – 2.5 | Layout, wizard shell, progress bar, store, autosave |
| Phase 3 | 3.1 – 3.7 | All step components, form fields, file uploader, confirmation |
| Phase 4 | 4.1 – 4.6 | All backend endpoints, services, middleware |
| Phase 5 | 5.1 – 5.6 | Integration, responsive polish, accessibility, malware scan, deletion |
| Phase 6 | 6.1 – 6.2 | Documentation and deployment preparation |

**Total: 25 tasks across 6 phases**

---

*Tasks reference [requirements.md](./requirements.md) and [design.md](./design.md) for detailed specifications.*
