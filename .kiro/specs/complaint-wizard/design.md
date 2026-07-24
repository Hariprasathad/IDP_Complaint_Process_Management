# Design: Customer Feedback & Complaint Submission Wizard

## 1. High-Level Architecture

```
┌─────────────────────────────────────────────────────────────────┐
│                        CLIENT (Browser)                          │
│  ┌───────────────────────────────────────────────────────────┐  │
│  │         React SPA (JavaScript + Vite)                     │  │
│  │  ┌─────────┐ ┌─────────┐ ┌─────────┐ ┌─────────┐        │  │
│  │  │ Step 1  │ │ Step 2  │ │ Step 3  │ │ Step 4  │        │  │
│  │  │Complaint│ │Location │ │ Who     │ │Contact  │        │  │
│  │  └─────────┘ └─────────┘ └─────────┘ └─────────┘        │  │
│  │  ┌──────────────────────────────────────────────────┐     │  │
│  │  │  Shared: Wizard Shell, Validation, Autosave      │     │  │
│  │  └──────────────────────────────────────────────────┘     │  │
│  └───────────────────────────────────────────────────────────┘  │
└────────────────────────────┬────────────────────────────────────┘
                             │ HTTPS
┌────────────────────────────▼────────────────────────────────────┐
│                     API GATEWAY / CDN                            │
│                    (Rate Limiting only)                          │
└────────────────────────────┬────────────────────────────────────┘
                             │
┌────────────────────────────▼────────────────────────────────────┐
│                 BACKEND (Node.js + Express, JavaScript)          │
│  ┌──────────────┐ ┌──────────────┐ ┌────────────────────────┐  │
│  │ Complaint    │ │ File Upload  │ │ Reference Data         │  │
│  │ Service      │ │ Service      │ │ Service (Countries)    │  │
│  └──────┬───────┘ └──────┬───────┘ └────────────────────────┘  │
│         │                │                                       │
└─────────┼────────────────┼───────────────────────────────────────┘
          │                │
┌─────────▼──────┐  ┌─────▼──────────┐  ┌───────────────┐
│ AWS DynamoDB   │  │ AWS S3         │  │ AWS SES       │
│ (NoSQL)        │  │ (File Storage) │  │ (Email)       │
└────────────────┘  └────────────────┘  └───────────────┘
```

---

## 2. Tech Stack

| Layer | Technology | Rationale |
|-------|-----------|-----------|
| Frontend Framework | React 18 + JavaScript (JSX) | Strong ecosystem, component model suits wizard pattern |
| Build Tool | Vite | Fast dev server, optimized production builds |
| State Management | React Hook Form + Zustand | Hook Form for per-step validation; Zustand for cross-step wizard state |
| Styling | Tailwind CSS | Utility-first, responsive-friendly, minimal bundle |
| Backend | Node.js + Express (JavaScript) | Same language as frontend, good async I/O for file uploads |
| Database | AWS DynamoDB | Serverless, AWS-native (aligns with S3/SES), scales without management |
| File Storage | AWS S3 | Scalable, pre-signed URLs for direct upload |
| Email | AWS SES | Cost-effective, reliable, integrates with AWS ecosystem |
| Validation | Yup (shared FE/BE) | Schema validation library, works well with React Hook Form |
| Malware Scan | ClamAV (via Lambda or sidecar) | Open-source, can run as microservice |
| ID Generation | nanoid (custom alphabet) | Human-readable, collision-resistant, configurable format |
| Bot Protection | **DEFERRED** — IP-based rate limiting only for now | TODO: Add CAPTCHA in future phase |

---

## 3. UI Layout (Based on Mockups)

The UI follows the layout patterns from the provided mockups:

### 3.1 Page Structure

```
┌─────────────────────────────────────────────────────────┐
│  HEADER: Logo (top-left), light background              │
│  ─────────────────────────────────────────────────────  │ ← thin divider
│                                                         │
│  CONTENT AREA (white, centered, max-width ~720px):      │
│                                                         │
│    ┌─ Step indicator (right-aligned): "Step X of 4" ─┐  │
│    │                                                  │  │
│    │  ████████  ████████  ████████  ────────          │  │
│    │  (green=done, blue=current, grey=future)         │  │
│    └──────────────────────────────────────────────────┘  │
│                                                         │
│    FORM FIELDS                                          │
│    - Bold question labels                               │
│    - Radio buttons with circular indicators             │
│    - Text inputs with light grey borders, rounded       │
│    - Dropdowns with chevron indicator                   │
│    - Conditional sections in grey-background card       │
│                                                         │
│    ─────────────────────────────────────────────────    │ ← thin divider
│                                                         │
│    NAVIGATION BUTTONS (left-aligned):                   │
│    [← Previous]  [  Next  ]                             │
│     (outlined,    (filled blue,                         │
│      pill shape)   pill shape)                          │
│                                                         │
└─────────────────────────────────────────────────────────┘
┌─────────────────────────────────────────────────────────┐
│  FOOTER: Dark slate background, white text              │
│  "© IDP Education. All rights reserved."                │
└─────────────────────────────────────────────────────────┘
```

### 3.2 Visual Design Tokens

| Element | Style |
|---------|-------|
| Progress bar - completed steps | Green (#22c55e) solid bars |
| Progress bar - current step | Blue (#2563eb) solid bar |
| Progress bar - future steps | Light grey (#e5e7eb) bars |
| Step indicator text | Right-aligned, "Step X of 4" |
| Primary button (Next/Submit) | Filled blue, white text, pill-shaped (rounded-full) |
| Secondary button (Previous) | Outlined blue border, blue text, pill-shaped, left arrow icon |
| Form inputs | Rounded borders, light grey stroke, full-width |
| Contact section (expanded) | Light grey background card with rounded corners |
| Radio buttons | Circular, blue fill when selected |
| Footer | Dark slate (#334155), white text, centered copyright |
| Header | White/light background, logo top-left |

### 3.3 Step-Specific Layouts

**Step 1 — Complaint Details:**
- Page title / intro text at top
- Links to Privacy Policy and Terms (blue, underlined)
- Progress bar
- Bold question: "Can you please describe what's happened?"
- Subtext with guidance
- Multiline textarea (tall, ~150px height)
- File upload section: dashed border box, upload icon, "Drag and drop or Browse" text, format hint below

**Step 2 — Incident Location:**
- Country dropdown (full-width, with chevron)
- Office text input (full-width)
- Checkbox list for location qualifiers (e.g. "Online", "Other")
- Conditional "Please Specify" text field when "Other/Online" selected

**Step 3 — Who Is Lodging:**
- Radio button list (vertical): Student, Parent, University/College/School Representative, Other
- Conditional "Please Specify" text field below radio group when "Other" selected

**Step 4 — Contact Preference:**
- Radio buttons: Yes / No
- **Yes selected:** Grey card expands below with:
  - Full Name (text input)
  - Email (text input)
  - Country Code (dropdown, narrow) + Phone Number (text input, wider) — side by side
  - Current Country (dropdown)
  - Study Destination (dropdown)
- **No selected:** Card hidden, only Privacy Policy checkbox shown
- Privacy Policy checkbox (both flows)
- Submit button (blue, pill-shaped)

---

## 4. Component Hierarchy

```
<App>
  <Header />                        ← Logo
  <WizardProvider>                  ← Zustand store context
    <WizardShell>                   ← Progress bar, step container, nav buttons
      <ProgressBar />               ← Green/blue/grey segmented bar + "Step X of 4"
      <Step1_ComplaintDetails>
        <TextArea />                ← Complaint description
        <FileUploader />            ← Drag-drop zone + browse + file list
      </Step1_ComplaintDetails>

      <Step2_IncidentLocation>
        <Dropdown />                ← Country (async from API)
        <TextInput />               ← Office (conditional mandatory)
        <TextInput />               ← Other Specify (conditional render)
      </Step2_IncidentLocation>

      <Step3_WhoIsLodging>
        <RadioGroup />              ← Student/Parent/Rep/Other
        <TextInput />               ← Please Specify (conditional render)
      </Step3_WhoIsLodging>

      <Step4_ContactPreference>
        <RadioGroup />              ← Yes/No
        <ContactCard>               ← Grey background card (conditional expand)
          <TextInput />             ← Full Name
          <TextInput />             ← Email
          <Dropdown />              ← Country Code (narrow)
          <TextInput />             ← Phone (wider)
          <Dropdown />              ← Current Country
          <Dropdown />              ← Study Destination
        </ContactCard>
        <Checkbox />                ← Privacy Policy
        <SubmitButton />
      </Step4_ContactPreference>

      <ConfirmationScreen />        ← Post-submission message
      <NavigationButtons />         ← Previous (outlined) + Next (filled)
    </WizardShell>
  </WizardProvider>
  <Footer />                        ← Dark footer with copyright
</App>
```

---

## 5. Wizard State Machine

```
States: STEP_1 → STEP_2 → STEP_3 → STEP_4 → SUBMITTING → CONFIRMED

Transitions:
  STEP_1 --[validate + next]--> STEP_2
  STEP_2 --[validate + next]--> STEP_3
  STEP_3 --[validate + next]--> STEP_4
  STEP_4 --[validate + submit]--> SUBMITTING
  SUBMITTING --[success]--> CONFIRMED
  SUBMITTING --[failure]--> STEP_4 (with error message)

  STEP_2 --[previous]--> STEP_1
  STEP_3 --[previous]--> STEP_2
  STEP_4 --[previous]--> STEP_3

Guards:
  - Forward transitions require current step validation to pass
  - Backward transitions always allowed (no validation required)
  - Direct jump to step N requires steps 1..(N-1) to be valid
  - CONFIRMED state is terminal (no navigation back into wizard)
```

### Zustand Store Shape

```javascript
// store/wizardStore.js
const useWizardStore = create((set, get) => ({
  currentStep: 1,         // 1 | 2 | 3 | 4 | 'confirmed'
  isSubmitting: false,
  submissionError: null,
  complaintId: null,

  // Step data
  step1: {
    description: '',
    attachments: [],      // [{ fileId, fileName, size, mimeType }]
  },
  step2: {
    country: null,
    office: '',
    otherSpecify: '',
  },
  step3: {
    personType: null,     // 'student' | 'parent' | 'representative' | 'other'
    otherSpecify: '',
  },
  step4: {
    contactPreference: null, // 'yes' | 'no'
    fullName: '',
    email: '',
    countryCode: '',
    phone: '',
    currentCountry: null,
    studyDestinations: [],
    privacyAccepted: false,
  },

  // Actions
  goNext: () => { /* validate then increment step */ },
  goPrevious: () => { /* decrement step, no validation */ },
  setStepData: (step, data) => { /* merge data into step */ },
  submit: async () => { /* POST to API, handle response */ },
  reset: () => { /* clear all state */ },
}));
```

---

## 6. API Contracts

### 6.1 Reference Data

#### GET /api/countries

Returns the canonical country list used across all country fields.

```json
// Response 200
{
  "countries": [
    {
      "code": "AU",
      "name": "Australia",
      "phoneCode": "+61",
      "phoneMinLength": 9,
      "phoneMaxLength": 10
    },
    {
      "code": "ONLINE",
      "name": "Online",
      "phoneCode": null,
      "phoneMinLength": null,
      "phoneMaxLength": null
    }
  ]
}
```

> Single source of truth for Incident Location Country (Step 2), Current Country (Step 4), Country Code (Step 4), and Study Destination (Step 4). "Online" is included as a special entry with `code: "ONLINE"`.

---

#### GET /api/offices?countryCode={code}

Returns offices for a given country (used in Step 2).

```json
// Response 200
{
  "offices": [
    { "id": "syd-01", "name": "Sydney CBD" },
    { "id": "mel-01", "name": "Melbourne" }
  ]
}
```

---

### 6.2 File Upload

#### POST /api/upload

Pre-validates and stores a single file. Called per-file as the user attaches them.

```
Content-Type: multipart/form-data
Body: file (binary), sessionToken (string)
```

```json
// Response 201
{
  "fileId": "f_abc123",
  "fileName": "transcript.pdf",
  "size": 245000,
  "mimeType": "application/pdf",
  "scanStatus": "clean"
}

// Response 400
{
  "error": "FILE_TOO_LARGE",
  "message": "File exceeds 10MB limit"
}

// Response 422
{
  "error": "MALWARE_DETECTED",
  "message": "File failed security scan"
}
```

#### DELETE /api/upload/{fileId}

Removes a previously uploaded file (user removes attachment before submission).

```json
// Response 204 (no body)
```

---

### 6.3 Complaint Submission

#### POST /api/complaints

Creates the complaint record. Called once at final submission.

```json
// Request Body
{
  "description": "string (trimmed, max N chars)",
  "attachmentIds": ["f_abc123", "f_def456"],
  "incidentLocation": {
    "countryCode": "AU",
    "office": "Sydney CBD",
    "otherSpecify": null
  },
  "lodgedBy": {
    "type": "student",
    "otherSpecify": null
  },
  "contactPreference": "yes",
  "contactDetails": {
    "fullName": "Jane Smith",
    "email": "jane@example.com",
    "countryCode": "+61",
    "phone": "412345678",
    "currentCountry": "AU",
    "studyDestinations": ["GB", "CA"]
  },
  "privacyAccepted": true
}
```

```json
// Response 201
{
  "complaintId": "IDP-20260723-A4K9",
  "status": "received",
  "emailSent": true
}

// Response 201 (No flow — contactDetails omitted)
{
  "complaintId": "IDP-20260723-B7M2",
  "status": "received",
  "emailSent": false
}

// Response 400
{
  "error": "VALIDATION_ERROR",
  "fields": {
    "description": "Required",
    "contactDetails.email": "Invalid email format"
  }
}

// Response 429
{
  "error": "RATE_LIMITED",
  "message": "Too many submissions. Please try again later.",
  "retryAfter": 60
}
```

---

## 7. Data Model (AWS DynamoDB)

### 7.1 Table Design

**Table: `Complaints`**

| Attribute | Type | Key | Description |
|-----------|------|-----|-------------|
| PK | String | Partition Key | `COMPLAINT#<complaintId>` |
| SK | String | Sort Key | `METADATA` |
| complaintId | String | GSI1-PK | Human-readable ID: `IDP-20260723-A4K9` |
| createdAt | String (ISO) | GSI1-SK | Timestamp for sorting |
| description | String | — | Complaint text |
| incidentCountryCode | String | — | Country code |
| incidentOffice | String | — | Office name (nullable) |
| incidentOtherSpecify | String | — | Free text for Online (nullable) |
| lodgedByType | String | — | student/parent/representative/other |
| lodgedByOther | String | — | Free text if "other" (nullable) |
| contactPreference | Boolean | — | true=Yes, false=No |
| fullName | String | — | **NULL if contactPreference=false** |
| email | String | — | **NULL if contactPreference=false** |
| countryCode | String | — | **NULL if contactPreference=false** |
| phone | String | — | **NULL if contactPreference=false** |
| currentCountry | String | — | **NULL if contactPreference=false** |
| studyDestinations | List | — | **NULL if contactPreference=false** |
| privacyAccepted | Boolean | — | Always true at submission |
| status | String | — | received / in_progress / resolved |
| updatedAt | String (ISO) | — | Last modification timestamp |

**Attachments (same table, different SK):**

| Attribute | Type | Key | Description |
|-----------|------|-----|-------------|
| PK | String | Partition Key | `COMPLAINT#<complaintId>` |
| SK | String | Sort Key | `ATTACHMENT#<fileId>` |
| fileId | String | — | Unique file identifier |
| fileName | String | — | Original file name |
| fileSize | Number | — | Size in bytes |
| mimeType | String | — | Validated MIME type |
| s3Key | String | — | S3 object key |
| scanStatus | String | — | pending/clean/infected |
| uploadedAt | String (ISO) | — | Upload timestamp |

**Audit Log (same table, different SK):**

| Attribute | Type | Key | Description |
|-----------|------|-----|-------------|
| PK | String | Partition Key | `COMPLAINT#<complaintId>` |
| SK | String | Sort Key | `AUDIT#<timestamp>#<action>` |
| action | String | — | created/email_sent/email_failed/deleted |
| details | Map | — | Additional context |
| createdAt | String (ISO) | — | Event timestamp |

### 7.2 Global Secondary Indexes

| GSI | Partition Key | Sort Key | Purpose |
|-----|--------------|----------|---------|
| GSI1 | `complaintId` | `createdAt` | Look up by human-readable ID |
| GSI2 | `status` | `createdAt` | Query complaints by status (admin) |

### 7.3 Access Patterns

| Pattern | Key Condition | Use Case |
|---------|--------------|----------|
| Get complaint + all attachments + audit | PK = `COMPLAINT#<id>` | Full complaint view |
| Get complaint metadata only | PK = `COMPLAINT#<id>`, SK = `METADATA` | Quick lookup |
| Find by human-readable ID | GSI1: complaintId = `IDP-...` | User reference lookup |
| List complaints by status | GSI2: status = `received`, SK desc | Admin dashboard |

### 7.4 PII Enforcement

Since DynamoDB doesn't have CHECK constraints like SQL, PII enforcement is handled at the **application layer** (backend service):

```javascript
// services/complaintService.js — enforced before DynamoDB write
function buildComplaintItem(data) {
  const item = {
    PK: `COMPLAINT#${data.complaintId}`,
    SK: 'METADATA',
    complaintId: data.complaintId,
    description: data.description,
    // ... non-PII fields
    contactPreference: data.contactPreference,
    status: 'received',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };

  // PII fields ONLY populated when contactPreference is true
  if (data.contactPreference === true) {
    item.fullName = data.contactDetails.fullName;
    item.email = data.contactDetails.email;
    item.countryCode = data.contactDetails.countryCode;
    item.phone = data.contactDetails.phone;
    item.currentCountry = data.contactDetails.currentCountry;
    item.studyDestinations = data.contactDetails.studyDestinations;
  }
  // When contactPreference is false, PII attributes are simply not written

  return item;
}
```

### 7.5 Complaint ID Format

```
IDP-YYYYMMDD-XXXX

Where:
  YYYY = 4-digit year
  MM   = 2-digit month
  DD   = 2-digit day
  XXXX = 4-character alphanumeric (uppercase, no ambiguous chars)

Example: IDP-20260723-A4K9
```

Generated using nanoid with custom alphabet: `ABCDEFGHJKLMNPQRSTUVWXYZ23456789` (32 chars, avoids confusion between 0/O, 1/I/l).

---

## 8. File Upload Design

### 8.1 Upload Flow

```
User selects file(s)
     │
     ▼
[Client-side validation]
  - Check file count (max 10 total)
  - Check file size (max 10MB)
  - Check file extension (whitelist)
     │
     ▼ (pass)
[Upload to backend: POST /api/upload]
     │
     ▼
[Server-side validation]
  - Validate MIME type via magic bytes (not extension)
  - Check size again (defense in depth)
     │
     ▼ (pass)
[Stream to S3 with temporary prefix]
     │
     ▼
[Trigger malware scan (async)]
     │
     ├── clean → mark scanStatus = 'clean', return fileId to client
     └── infected → delete from S3, return 422 to client
```

### 8.2 Storage Structure (S3)

```
s3://idp-complaints-{env}/
  uploads/
    pending/          ← Files awaiting scan
      {sessionToken}/{fileId}/{originalName}
    clean/            ← Scanned files, linked to complaint
      {complaintId}/{fileId}/{originalName}
    quarantine/       ← Infected files (retained briefly for analysis)
      {fileId}/{originalName}
```

### 8.3 Upload Session

Files are uploaded before final submission. A temporary `sessionToken` (UUID generated on first upload) groups files. On complaint creation, files are moved from `pending/` to `clean/` and linked to the complaint record. Unsubmitted files are garbage-collected after 24 hours via S3 lifecycle policy.

---

## 9. Security Design

### 9.1 Rate Limiting

| Endpoint | Limit | Window | Scope |
|----------|-------|--------|-------|
| POST /api/complaints | 5 requests | 15 minutes | Per IP |
| POST /api/upload | 20 requests | 15 minutes | Per IP |
| GET /api/countries | 60 requests | 1 minute | Per IP |

Implementation: Express rate-limit middleware (in-memory or backed by DynamoDB TTL-based counter).

### 9.2 Bot Protection

> **DEFERRED TO FUTURE PHASE**
>
> No CAPTCHA widget, no token generation, no server-side verification in this phase.
> IP-based rate limiting (Section 9.1) serves as the interim safeguard.
>
> **TODO:** Implement Cloudflare Turnstile or equivalent before production launch to prevent automated spam.

### 9.3 File Security

| Layer | Validation |
|-------|-----------|
| Client | Extension whitelist, size check (UX only — not trusted) |
| Server | Magic-byte MIME detection (file-type library), size re-check |
| Storage | Files uploaded to `pending/` prefix, not publicly accessible |
| Scan | ClamAV scan via sidecar service or AWS Lambda |
| Access | S3 objects never publicly accessible; served via signed URLs with short TTL if needed |

### 9.4 Input Sanitization

- All text inputs trimmed (leading/trailing whitespace)
- Description field: no HTML allowed, stored as plain text
- "Please Specify" fields: alphanumeric + basic punctuation, max 500 chars
- Email validated server-side with strict RFC 5322 regex
- Phone validated as numeric-only, length per country rules

### 9.5 PII Protection

- Application-layer enforcement: PII attributes never written to DynamoDB when `contactPreference = false`
- sessionStorage used for client-side autosave (cleared on tab close)
- No PII logged in application logs — complaint IDs used for reference
- HTTPS enforced for all API communication
- DynamoDB encryption at rest enabled (AWS default)

---

## 10. Navigation & Autosave Design

### 10.1 Navigation Implementation

```javascript
// Navigation is purely state-driven, no router history manipulation
const goNext = () => {
  if (validateCurrentStep()) {
    setCurrentStep(currentStep + 1);
    saveToSessionStorage();
  }
};

const goPrevious = () => {
  // Always allowed, no validation required
  setCurrentStep(currentStep - 1);
  saveToSessionStorage();
};

// "Return to IDP.com" button — hardcoded URL, never history.back()
const returnToHome = () => {
  window.location.href = 'https://www.idp.com';
};
```

### 10.2 Step Guard

```javascript
// Prevent direct state manipulation / URL-based step skipping
const canAccessStep = (targetStep) => {
  for (let i = 1; i < targetStep; i++) {
    if (!isStepValid(i)) return false;
  }
  return true;
};
```

### 10.3 Autosave (sessionStorage)

- **Trigger:** On every field change (debounced 500ms) and on step navigation
- **Storage key:** `idp_complaint_draft`
- **What's stored:** Steps 1–3 data always; Step 4 data only if contact preference is "yes" and user has entered data
- **Restore:** On component mount, check for existing draft and hydrate form state
- **Clear:** On successful submission or explicit user action

### 10.4 Unsaved Changes Warning

```javascript
useEffect(() => {
  const handler = (e) => {
    if (hasUnsavedData && currentStep !== 'confirmed') {
      e.preventDefault();
      e.returnValue = ''; // Browser shows native dialog
    }
  };
  window.addEventListener('beforeunload', handler);
  return () => window.removeEventListener('beforeunload', handler);
}, [hasUnsavedData, currentStep]);
```

---

## 11. Validation Strategy

### 11.1 Dual-Layer Validation

| Layer | Purpose | Implementation |
|-------|---------|----------------|
| Client (React Hook Form) | Immediate UX feedback | Yup schemas per step, validated on blur + submit |
| Server (Express) | Security + integrity | Yup schemas (shared with client), validated before DB write |

### 11.2 Validation Timing

- **On blur:** Validate individual field, show inline error if invalid
- **On "Next" click:** Validate entire step, show all inline errors, focus first invalid field
- **On "Submit" click:** Validate Step 4 + privacy policy

### 11.3 Validation Schemas (Yup)

```javascript
import * as yup from 'yup';

// Step 1
const step1Schema = yup.object({
  description: yup.string()
    .trim()
    .required('Please answer this question')
    .max(MAX_DESCRIPTION_LENGTH, `Maximum ${MAX_DESCRIPTION_LENGTH} characters`),
});

// Step 2
const step2Schema = yup.object({
  country: yup.string().required('Please answer this question'),
  office: yup.string().when('country', {
    is: (val) => val && val !== 'ONLINE',
    then: (schema) => schema.required('Please answer this question'),
    otherwise: (schema) => schema.optional(),
  }),
  otherSpecify: yup.string().when('country', {
    is: 'ONLINE',
    then: (schema) => schema.required('Please answer this question'),
    otherwise: (schema) => schema.optional(),
  }),
});

// Step 3
const step3Schema = yup.object({
  personType: yup.string()
    .oneOf(['student', 'parent', 'representative', 'other'])
    .required('Please answer this question'),
  otherSpecify: yup.string().when('personType', {
    is: 'other',
    then: (schema) => schema.trim().required('Please specify'),
    otherwise: (schema) => schema.optional(),
  }),
});

// Step 4 (Yes flow)
const contactDetailsSchema = yup.object({
  fullName: yup.string().trim()
    .required('Enter a valid name')
    .matches(/^[a-zA-Z\s]+$/, 'Enter a valid name'),
  email: yup.string()
    .required('Enter a valid email address')
    .email('Enter a valid email address'),
  countryCode: yup.string().required('Please answer this question'),
  phone: yup.string()
    .required('Enter a valid mobile number')
    .matches(/^\d+$/, 'Enter a valid mobile number'),
  currentCountry: yup.string().required('Please answer this question'),
  studyDestinations: yup.array()
    .of(yup.string())
    .min(1, 'Please answer this question'),
});
```

---

## 12. Email Handling (Yes Flow)

### 12.1 Acknowledgement Email Flow

```
Complaint created in DynamoDB
     │
     ▼
[Queue email job] ← async, non-blocking
     │
     ▼
[Email Service attempts send via AWS SES]
     │
     ├── Success → audit entry: "email_sent"
     └── Failure → retry (max 3 attempts, exponential backoff)
                     │
                     └── All retries fail → audit entry: "email_failed"
                         (complaint still valid, user sees confirmation)
```

### 12.2 Design Decisions

- Email sending is **asynchronous** — complaint creation responds immediately
- The `emailSent` field in the API response reflects whether the email was *queued*, not delivered
- Retry strategy: 3 attempts with exponential backoff (1s, 4s, 16s)
- Failed emails logged to audit entries for manual follow-up
- Complaint submission is never blocked by email failure

---

## 13. Responsive Design Approach

### 13.1 Breakpoints

| Breakpoint | Width | Layout |
|-----------|-------|--------|
| Mobile | < 640px | Single column, stacked fields, full-width buttons |
| Tablet | 640px – 1024px | Single column with wider fields, side margins |
| Desktop | > 1024px | Centered card (max-width 720px), inline labels possible |

### 13.2 Component Adaptations

- **Progress indicator:** Horizontal segmented bar on all sizes, "Step X of 4" right-aligned
- **File upload:** Drag-drop zone on desktop, "Browse" button prominent on mobile
- **Phone input:** Country Code dropdown + Phone input side-by-side (stacks on mobile)
- **Navigation buttons:** Previous (outlined pill) + Next (filled blue pill), left-aligned below divider
- **Footer:** Full-width dark slate bar, fixed at bottom of content

---

## 14. Project Structure

```
idp-complaint-wizard/
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   │   ├── layout/
│   │   │   │   ├── Header.jsx
│   │   │   │   ├── Footer.jsx
│   │   │   │   └── PageLayout.jsx
│   │   │   ├── wizard/
│   │   │   │   ├── WizardShell.jsx
│   │   │   │   ├── ProgressBar.jsx
│   │   │   │   ├── NavigationButtons.jsx
│   │   │   │   └── ConfirmationScreen.jsx
│   │   │   ├── steps/
│   │   │   │   ├── Step1_ComplaintDetails.jsx
│   │   │   │   ├── Step2_IncidentLocation.jsx
│   │   │   │   ├── Step3_WhoIsLodging.jsx
│   │   │   │   └── Step4_ContactPreference.jsx
│   │   │   ├── form/
│   │   │   │   ├── TextArea.jsx
│   │   │   │   ├── TextInput.jsx
│   │   │   │   ├── FileUploader.jsx
│   │   │   │   ├── Dropdown.jsx
│   │   │   │   ├── RadioGroup.jsx
│   │   │   │   ├── PhoneInput.jsx
│   │   │   │   ├── MultiSelect.jsx
│   │   │   │   └── Checkbox.jsx
│   │   │   └── ui/
│   │   │       ├── InlineError.jsx
│   │   │       ├── FieldLabel.jsx
│   │   │       └── LoadingSpinner.jsx
│   │   ├── hooks/
│   │   │   ├── useAutosave.js
│   │   │   ├── useBeforeUnload.js
│   │   │   └── useCountries.js
│   │   ├── store/
│   │   │   └── wizardStore.js         ← Zustand store
│   │   ├── validation/
│   │   │   ├── schemas.js             ← Yup schemas (shared with backend)
│   │   │   └── messages.js            ← Validation message constants
│   │   ├── services/
│   │   │   ├── api.js                 ← Fetch wrapper
│   │   │   ├── uploadService.js
│   │   │   └── complaintService.js
│   │   ├── App.jsx
│   │   └── main.jsx
│   ├── public/
│   │   └── idp-logo.svg
│   ├── index.html
│   ├── package.json
│   ├── tailwind.config.js
│   └── vite.config.js
├── backend/
│   ├── src/
│   │   ├── routes/
│   │   │   ├── complaints.js
│   │   │   ├── upload.js
│   │   │   └── countries.js
│   │   ├── services/
│   │   │   ├── complaintService.js
│   │   │   ├── fileService.js
│   │   │   ├── emailService.js
│   │   │   ├── scanService.js
│   │   │   └── idGeneratorService.js
│   │   ├── middleware/
│   │   │   ├── rateLimiter.js
│   │   │   └── errorHandler.js
│   │   ├── validation/
│   │   │   └── schemas.js             ← Shared Yup schemas
│   │   ├── db/
│   │   │   └── dynamoClient.js        ← AWS DynamoDB DocumentClient
│   │   ├── config/
│   │   │   └── index.js
│   │   └── app.js
│   ├── package.json
│   └── .env.example
├── shared/
│   └── validation/                     ← Yup schemas shared between FE & BE
│       ├── schemas.js
│       └── messages.js
└── README.md
```

---

## 15. Key Design Decisions

| # | Decision | Rationale |
|---|----------|-----------|
| D1 | Upload files immediately (not at submission) | Better UX — progress shown per-file, scan runs in parallel, reduces submission payload size |
| D2 | Single /api/countries endpoint for all country needs | Prevents drift between 3 separate country lists (OQ5 resolved by design) |
| D3 | "Online" treated as a special country entry | Simplifies UI logic — same dropdown, conditional behavior based on code="ONLINE" |
| D4 | Yup schemas shared between frontend and backend | Single source of truth for validation rules, reduces bugs from rule mismatch |
| D5 | sessionStorage over localStorage for autosave | PII in Step 4 should not persist beyond tab lifecycle |
| D6 | Async email with retry | Decouples complaint creation from email delivery reliability |
| D7 | Human-readable ID (IDP-DATE-CODE) | Easy for users to reference verbally or in follow-up communications |
| D8 | Privacy Policy mandatory in both flows | Per AC8 — even anonymous users must acknowledge before submission |
| D9 | DynamoDB single-table design | All complaint data (metadata, attachments, audit) in one table; efficient queries by complaint ID |
| D10 | Application-layer PII enforcement | Since DynamoDB lacks CHECK constraints, backend service ensures no PII is written for anonymous complaints |
| D11 | CAPTCHA deferred | Keep initial implementation simpler; rate limiting provides interim protection |
| D12 | Plain JavaScript (no TypeScript) | Faster development, lower barrier for team, no build complexity from types |

---

## 16. Assumptions (Pending OQ Resolution)

| Assumption | Fallback if Wrong |
|-----------|-------------------|
| Max description length = 5000 chars | Easily configurable via env variable |
| Max full name length = 200 chars | Standard for most systems |
| Study Destination shown for ALL personas | Can be conditionally toggled per persona with minimal change |
| Phone validation via libphonenumber-js | Country-specific length/format rules |
| Complaint ID format: IDP-YYYYMMDD-XXXX | Configurable format string |
| Email retry: 3 attempts, exponential backoff | Configurable via env |

---

*This design document should be reviewed alongside [requirements.md](./requirements.md). Open questions from requirements should be resolved before implementation begins.*
