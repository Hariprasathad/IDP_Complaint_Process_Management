# Requirements: Customer Feedback & Complaint Submission Wizard

## 1. Overview

A single-page, 4-step complaint/feedback submission wizard on IDP.com. No authentication required. Users proceed sequentially through Steps 1–4, may optionally attach files, and choose whether IDP should contact them. The form supports anonymous submission or identified submission with contact details.

---

## 2. Functional Requirements (EARS Format)

> **EARS legend:**
> - **Ubiquitous** – "The system shall …"
> - **Event-driven** – "When [event], the system shall …"
> - **State-driven** – "While [state], the system shall …"
> - **Unwanted behaviour** – "If [condition], then the system shall …"
> - **Optional** – "Where [feature], the system shall …"

---

### 2.1 Step 1 – Complaint Details (AC1)

| ID | Requirement |
|----|-------------|


Allow ony English language



| REQ-1.1 | The system shall display a mandatory multiline text field labelled "Can you please describe what's happened?" |
| REQ-1.2 | When the user attempts to proceed, the system shall prevent navigation if the complaint description is blank after trimming leading and trailing whitespace. |
| REQ-1.3 | The system shall enforce a maximum character limit on the complaint description. -- 10K character **[OPEN: Business to confirm limit]** |

| REQ-1.4 | When the complaint description is blank or exceeds the character limit, the system shall display the inline validation message: "Please answer this question". |-- 

| REQ-1.5 | The system shall provide an optional file upload control labelled "Can you share any supporting information or documentation?" supporting drag-and-drop and a Browse button. |
| REQ-1.6 | The system shall allow a maximum of 10 file attachments per submission. |
| REQ-1.7 | The system shall reject any single file exceeding 10 MB in size. |
| REQ-1.8 | The system shall accept only the following file formats: PDF, DOC, DOCX, JPG, JPEG, PNG. |
| REQ-1.9 | If a file fails validation (size, format, or count exceeded), then the system shall display an appropriate inline error message and shall not upload the invalid file. |
| REQ-1.10 | The system shall display a file upload progress indicator for each file being uploaded. |

| REQ-1.11 | The system shall validate uploaded files server-side by inspecting actual file content / MIME type, not solely the file extension. |
| REQ-1.12 | The system shall perform malware scanning on uploaded files before persisting them to storage. |

---

### 2.2 Step 2 – Incident Location (AC2)

| ID | Requirement |
|----|-------------|
| REQ-2.1 | The system shall display a mandatory dropdown labelled "Where did this happen? Country" populated via a backend API endpoint. |
| REQ-2.2 | When no country is selected, the system shall display the inline validation message: "Please answer this question". |
| REQ-2.3 | The system shall display a text field labelled "Office". |
| REQ-2.4 | While a country other than "Online" is selected, the Office field shall be mandatory. |

| REQ-2.5 | While "Online" is selected as the country, the Office field shall become optional. |
| REQ-2.6 | While "Online" is selected, the system shall display a mandatory field "Other, Please Specify". |
| REQ-2.7 | The "Other, Please Specify" field shall be hidden by efault and shall only render once "Online" is selected. |
| REQ-2.8 | When the user attempts to proceed without completing required fields, the system shall prevent navigation and display inline validation messages. |

| REQ-2.9 | The Office field shall accept alphabetic characters only. |

---

### 2.3 Step 3 – Who Is Lodging the Complaint (AC3)

| ID | Requirement |
|----|-------------|
| REQ-3.1 | The system shall display a mandatory radio-button group labelled "Which of the following best describes you?" with options: Student, Parent, University/College/School Representative, Other. |
| REQ-3.2 | When no option is selected and the user attempts to proceed, the system shall display: "Please answer this question". |
| REQ-3.3 | When "Other" is selected, the system shall display a mandatory "Please Specify" text field. |
| REQ-3.4 | The "Please Specify" field shall be hidden by default and shall only render once "Other" is selected. |
| REQ-3.5 | When "Other" is selected but "Please Specify" is blank, the system shall prevent navigation and show an inline validation message. |

---

### 2.4 Step 4 – Contact Preference (AC4, AC5, AC6, AC8)

| ID | Requirement |
|----|-------------|
| REQ-4.1 | The system shall display a mandatory radio-button group labelled "Would you like us to contact you about your Complaint?" with options: Yes, No. |
| REQ-4.2 | When no option is selected and the user attempts to proceed/submit, the system shall display: "Please answer this question". |
| REQ-4.3 | While "Yes" is selected, the system shall dynamically expand a contact information section with the fields defined in REQ-4.4–REQ-4.10. |
| REQ-4.4 | The system shall display a mandatory text field "Full Name" — alphabets only, cannot contain only spaces, maximum length enforced. Validation message: "Enter a valid name". | -- 200 char
| REQ-4.5 | The system shall display a mandatory email field "Best Email Address" — must be valid email format. Validation message: "Enter a valid email address". |
| REQ-4.6 | The system shall display a mandatory dropdown "Country Code" populated from the shared country data source. |


| REQ-4.7 | The system shall display a mandatory numeric field "Best Contact Phone Number" — numeric only, length validated per selected country. Validation message: "Enter a valid mobile number". |

| REQ-4.8 | The system shall display a mandatory dropdown "Where are you currently located?" (Current Country). Validation message: "Please answer this question". |


| REQ-4.9 | The system shall display a mandatory dropdown/multi-select "Where are you hoping to study in the future?" (Future Study Destination) — at least one destination must be selected. Validation message: "Please answer this question". |

| REQ-4.10 | The system shall display a mandatory Privacy Policy acceptance checkbox. The Submit button shall remain disabled until this checkbox is checked. |
| REQ-4.11 | While "No" is selected, the contact information section shall be hidden and no personal details shall be requested. |
| REQ-4.12 | While "No" is selected, the Privacy Policy acceptance checkbox shall still be displayed and shall be mandatory before submission. |
| REQ-4.13 | Privacy Policy and Terms hyperlinks shall open in a new browser tab. |

---

### 2.5 Submission – Yes Flow (AC7)

| ID | Requirement |
|----|-------------|
| REQ-5.1 | When the user clicks "Submit Complaint" and all validations pass, the system shall create a complaint record. |
| REQ-5.2 | The system shall generate a human-readable Complaint ID (not a raw UUID). |
| REQ-5.3 | The system shall store uploaded documents to the configured file storage (AWS S3 or equivalent). |
| REQ-5.4 | The system shall send an acknowledgement email to the user's provided email address. |
| REQ-5.5 | If the acknowledgement email fails to send, the system shall not block complaint creation; it shall handle the failure gracefully with retry logic and logging. |
| REQ-5.6 | The system shall display a confirmation screen with the Complaint ID and the message: "Thank you for sharing. Understanding your situation helps us continually improve and we will be in touch soon." |

---

### 2.6 Submission – No Flow (AC9)

| ID | Requirement |
|----|-------------|
| REQ-6.1 | When the user selects "No" and submits, the system shall create an anonymous complaint record. |
| REQ-6.2 | The system shall generate and display a human-readable Complaint ID on the confirmation screen. |
| REQ-6.3 | The system shall store any uploaded attachments. |
| REQ-6.4 | The system shall NOT send an acknowledgement email. |
| REQ-6.5 | The system shall display a confirmation screen with the message: "As you have asked us not to contact you, we won't. That said, understanding your situation helps us continually improve so thank you for sharing." |
| REQ-6.6 | The system shall NOT persist any personally identifiable information (PII) for anonymous complaints — enforced at the backend/schema level, not solely via frontend hiding. |

---

### 2.7 Navigation (AC10 + Implementation Notes)

| ID | Requirement |
|----|-------------|
| REQ-7.1 | The system shall implement Previous/Next as app-level state transitions between wizard steps, not browser history-based navigation. |
| REQ-7.2 | When the user clicks Previous, all previously entered information and uploaded documents shall be retained. |
| REQ-7.3 | The system shall NOT use `history.back()` for any navigation control. |
| REQ-7.4 | Any "return to home" or "return to previous page" button shall navigate to a hardcoded route/URL. |
| REQ-7.5 | The system shall enforce sequential step access — users shall not be able to skip ahead via direct state manipulation or URL manipulation. |
| REQ-7.6 | The system shall display a progress indicator showing the current step within the 4-step wizard. |
| REQ-7.7 | When the user has unsaved form data and attempts to close the tab or navigate away, the system shall display a browser-native beforeunload confirmation warning. |
| REQ-7.8 | The system shall implement lightweight autosave to sessionStorage (not localStorage) so an accidental page refresh does not wipe entered form data. |

| REQ-9.1 | When the user clicks "Submit Complaint", the Submit button shall disable immediately to prevent duplicate submissions from double-clicking. |
| REQ-9.2 | The system shall implement rate limiting on the public submission endpoint to prevent spam/abuse (IP-based throttling as interim safeguard). |
| REQ-9.3 | ~~DEFERRED~~ Bot protection (CAPTCHA) is deferred to a future phase. **TODO:** Implement CAPTCHA or equivalent bot protection before production launch. |
| REQ-9.4 | The system shall log complaint submissions to an Audit Logging Service. |=========================================================================================================================================================================================================================================================================================================================================




### 2.8 Validation UX (AC11 + Implementation Notes)

| ID | Requirement |
|----|-------------|
| REQ-8.1 | The system shall display inline validation messages per field (not page-level alerts). |
| REQ-8.2 | Validation messages shall appear on field blur and on form-step submit attempt. |
| REQ-8.3 | The system shall provide a clear visual distinction between mandatory and optional fields (e.g. asterisk indicator). |
| REQ-8.4 | The system shall use the specific validation error messages defined in the "Complaint Form - Validation Message" specification (see Section 4 below). |

---

### 2.9 Submission UX & Security (Implementation Notes)

| ID | Requirement |
|----|-------------|
| REQ-9.1 | When the user clicks "Submit Complaint", the Submit button shall disable immediately to prevent duplicate submissions from double-clicking. |
| REQ-9.2 | The system shall implement rate limiting on the public submission endpoint to prevent spam/abuse. |

| REQ-9.4 | The system shall log complaint submissions to an Audit Logging Service. |

---

### 2.10 Data & Privacy (Implementation Notes)

| ID | Requirement |
|----|-------------|
| REQ-10.1 | The system shall use sessionStorage (not localStorage) for autosave, since Step 4 may contain PII. |


---

### 2.11 Responsiveness & Design

| ID | Requirement |
|----|-------------|
| REQ-11.1 | The system shall be responsive across desktop, tablet, and mobile viewports. |
| REQ-11.2 | The system shall perform inline validation without page refresh. |
| REQ-11.3 | The system shall support drag-and-drop file upload in addition to a Browse button. |

---

## 3. Validation Messages (from Complaint Form - Validation Message.xlsx)

### Student Form

| Field | Type | Mandatory | Validation Rule | Error Message |
|-------|------|-----------|-----------------|---------------|
| Complaint description | Text | Y | Not blank | Please answer this question |
| Supporting documentation | Attachment | N | — | — |
| Country | Dropdown | Y | Selection required | Please answer this question |
| Office | Text | N | Alphabets only | — |
| Other | Selection | N | — | — |
| Who are you? | Radio | Y | Selection required | Please answer this question |
| Contact preference | Radio | Y | Selection required | Please answer this question |
| Contact section (group) | — | Y | All fields required | Please answer all the questions |
| Name | Text | Y | Alphabets only | Enter a valid name |
| Email | Email | Y | Valid email format | Enter a valid email address |
| Phone Number & Code | Number | Y | Numeric only | Enter a valid mobile number |
| Current Country | Dropdown | Y | Selection required | Please answer this question |
| Study Destination | Dropdown | Y | Selection required | Please answer this question |

### Client Form

| Field | Type | Mandatory | Validation Rule | Error Message |
|-------|------|-----------|-----------------|---------------|
| Complaint description | Text | Y | Not blank | Please answer this question |
| Supporting documentation | Attachment | N | — | — |
| Country | Dropdown | Y | Selection required | Please answer this question |
| Office | Text | N | Alphabets only | — |
| Other | Selection | N | — | — |
| Who are you? | Radio | Y | Selection required | Please answer this question |
| Contact preference | Radio | Y | Selection required | Please answer this question |
| Contact section (group) | — | Y | All fields required | Please answer all the questions |
| Name | Text | Y | Alphabets only | Enter a valid name |
| Email | Email | Y | Valid email format | Enter a valid email address |
| Phone Number & Code | Number | Y | Numeric only | Enter a valid mobile number |
| Current Country | Dropdown | Y | Selection required | Please answer this question |

> **Note:** The Client Form does not include "Where are you hoping to study in the future?" — this field appears only in the Student Form.

---

## 4. Integration Interfaces

| System | Purpose |
|--------|---------|
| Complaint API | Backend service handling complaint CRUD operations |
| AWS Document Storage (S3) | File/attachment persistence |
| SAP C4C Complaint Object | Complaint record synchronization |
| Email Notification Service | Acknowledgement emails (Yes flow) |
| Institution/Country Master Data | Country list, institution list, country codes |
| Complaint ID Generation Service | Human-readable complaint ID generation |
| Audit Logging Service | Submission and action logging |

---

## 5. Conflicts Identified

| # | Conflict | Resolution Needed |
|---|----------|-------------------|
| C1 | **Client Form vs Student Form scope:** The validation message spreadsheet defines two forms (Student and Client). The Client Form omits "Where are you hoping to study in the future?" (Study Destination). However, the AC doc (AC5/AC6) treats "Future Study Destination" as mandatory in the Yes flow without distinguishing user types. | **Clarify:** Should the Study Destination field be shown to all users, or only when "Student" is selected in Step 3? If "Client Form" applies to non-student personas, the field should be conditionally shown. |
| C2 | **Privacy Policy in No flow:** AC8 states "Privacy Policy acceptance is still mandatory" in the No flow. The validation message spreadsheet does not list Privacy Policy as a standalone validated field. | **Assumed:** Privacy Policy checkbox is mandatory in both flows. Confirm this is intentional for the anonymous (No) path. |
| C3 | **"Online" as a country option:** AC2 treats "Online" as a selectable value in the Country dropdown that triggers conditional logic. The implementation notes say country data comes from a backend API. | **Clarify:** Is "Online" a special entry injected into the country list, or a separate radio/toggle? How should the API represent it? |

---

## 6. Open Questions & Ambiguities

| # | Question | Source |
|---|----------|--------|
| OQ1 | What is the maximum character limit for the complaint description field? | AC1 — 10K char
| OQ2 | What is the maximum length for Full Name? | AC6 — "Maximum length as per standard" — which standard? | -- 100 char
| OQ3 | What is the phone number length validation rule per country? Is there a reference dataset or should libphonenumber (or similar) be used? | AC6 | use -> libphonenumber

| OQ4 | Is the country list sourced from a real external API or an internally seeded/maintained list? | Implementation Notes |


| OQ6 | What is the data retention period for complaint records and attachments? | Implementation Notes — GDPR/erasure |

| OQ7 | Should "Future Study Destination" be shown only for Student persona, or for all personas? | Conflict C1 above |
| OQ8 | Is "Online" a special entry in the country dropdown, or a separate UI control? | Conflict C3 above |
| OQ9 | ~~RESOLVED — DEFERRED~~ CAPTCHA/bot protection deferred to a future phase. IP-based rate limiting used as interim safeguard. | Implementation Notes |

| OQ10 | What is the human-readable Complaint ID format (e.g. IDP-YYYYMMDD-XXXX, sequential, etc.)? | not yet decided

| OQ11 | Should the Client Form (no Study Destination) apply to Parent / Rep / Other personas? | Validation spreadsheet vs AC doc | ->its for partners not for parents/rep or others


| OQ12 | Is there a maximum combined file size limit across all 10 attachments, or only per-file? | all 10 and one by one


| OQ13 | What is the email retry strategy? (max retries, backoff, dead-letter queue?) | not yet decided

| OQ14 | Should the confirmation screen offer a "Print" or "Download" option for the Complaint ID? | no we will oyt give any complaint Id in the confirmation page ,instead we will be sending the mail


| OQ15 | ~~RESOLVED~~ Tech stack confirmed: React (JavaScript/JSX) frontend, Node.js + Express (JavaScript) backend, AWS DynamoDB, AWS S3. | Implementation Notes |
---


complete flow

FRONTEND
 
IDP. COM FORM
 
*CALLing BFF API
 
DOCUMENT-API
 
*PARTNER PORTAL-FORM
 
A CALLING OFF API - P
 
AWS
 
BFF
 
TICKET CREATION 
 
 
A MICRO SERVICE
 
[SQS, DB,
 
A DOCUMENT UPLOAD
 
CLEAN BUcket
 
#INTEGRATION SERVICE (SAS, lambda, DLQ)
 
QUALTRICS INTEGRATION
 
C4C
 
* NEw FIELDS ( FORM + COMPLAINT Relachad
 
& TICKET CLOSURE - ConmemoRes
 
*ODATA API-CREATION (Ticket]
 
TICKET LEVEL CONFIS (TRE}
 
* ORS SETUP
 
LL
 
* ROLE CREATION ACLESS CONTROL
 
NOTIFICATIONS TICKET ASSIGNMENT
 
+ Tirer ROUTING
 
*
 
SLA REMINDER [BASED ON HOLIDAY CALENDAR)
## 7. Non-Functional Requirements (Derived)

| ID | Requirement |
|----|-------------|
| NFR-1 | The system shall be a single-page application (SPA) with no full-page reloads during the wizard flow. |
| NFR-2 | The system shall not require user authentication to submit a complaint. |
| NFR-3 | The system shall be accessible (WCAG 2.1 AA) across all steps. **[Note: full WCAG validation requires manual testing with assistive technologies]** |
| NFR-4 | The system shall support the latest two versions of Chrome, Firefox, Safari, and Edge. |
| NFR-5 | The system shall complete submission API calls within a reasonable response time (target < 3 seconds under normal load). |
| NFR-6 | The system shall implement rate limiting appropriate for a public unauthenticated endpoint. |

---


---

*Document generated from AC1–AC11, Validation Message spreadsheet, and supplementary implementation notes. All open questions (Section 6) should be resolved before proceeding to design.md.*
