# Implementation Task List: Triverge Healthcare V2.0 (Design & Tech)

---

## Phase 1: Foundation & Database Setup ✅

**Goal:** Establish the technical environment, install design libraries, and set up data structure.

### Task 1.1: Project Initialization & Dependencies ✅

**Description:** Initialize the Next.js repository in Google Antigravity, configure Tailwind CSS, and install design/backend libraries.

**Requirements:**

* **Core:** `@supabase/supabase-js`, `google-auth-library`, `@google/genai`.
* **Design System:**
  * Install **Magic UI** dependencies: `framer-motion`, `clsx`, `tailwind-merge`.
  * Install **Iconify**: `@iconify/react` (for Solar Icons).
* **Environment:** Configure `.env.local` for Supabase URL/Anon, Google, and PayStack.

**Acceptance Criteria:**

* [x] Next.js app runs locally.
* [x] Supabase client connects successfully (verified by a test query).
* [x] Magic UI `cn` utility helper is correctly configured.
* [x] A test Solar Icon renders on the index page.

---

### Task 1.2: Database Schema & RLS Policies ✅

**Description:** Run SQL scripts to create the necessary tables and set security rules.

**Requirements:**

* Create tables: `appointments`, `students`, `blog_posts`, `testimonials`, `newsletter_subscribers`, `search_index`.
* Enable Row Level Security (RLS):
  * Public can INSERT into `appointments`, `students`, `newsletter`.
  * Public can SELECT from `blog_posts`, `testimonials`.
  * Admin only can UPDATE/DELETE.

**Acceptance Criteria:**

* [x] All tables exist in Supabase Dashboard.
* [x] RLS policies prevent unauthorized deletion of data.

---

## Phase 2: Public Website & Visual Experience ⚠️

**Goal:** Build a highly interactive, engaging frontend using Unicorn Studio and Magic UI.

### Task 2.1: Global Layout & Navigation (Solar Icons) ⚠️ PARTIAL

**Description:** Create the `Layout.js` wrapper with a responsive Navbar and Footer using Solar Icons.

**Requirements:**

* **Icons:** Use `Solar: Home-Smile`, `Solar: Users-Group-Two-Rounded`, etc., from Iconify.
* **Micro-interactions:** Nav items should have a hover state (e.g., underline expansion or background fade) using Framer Motion.
* **Mobile Menu:** Smooth "AnimatePresence" slide-in/out transition.

**Acceptance Criteria:**

* [x] Navbar is responsive.
* [x] Icons are consistent (Solar set).
* [ ] Hovering over links triggers the defined micro-interaction. *(Currently uses standard CSS transitions, not Framer Motion as requested)*

---

### Task 2.2: Homepage Hero Section ❌ NOT COMPLETE

**Description:** Implement the "engaging and highly interactive" Hero section.

**Requirements:**

* **Visuals:** Embed the **Unicorn Studio** WebGL export (or iframe/react component) as the Hero background/canvas.
* **Interaction:** Ensure mouse movement effects (e.g., fluid distortion, particle reaction) from Unicorn Studio are active.
* **CTA:** Overlay "Book Consultation" button using Magic UI `Shimmer Button` or `Border Beam` effect to draw attention.

**Acceptance Criteria:**

* [x] Hero section loads without lag.
* [ ] Unicorn Studio animations react to cursor movement. *(Not implemented — uses custom design instead)*
* [x] CTA button is clearly visible above the canvas.

---

### Task 2.3: Dynamic Service Pages (Magic UI Components) ✅

**Description:** Specific pages for Dementia, Physio, etc., using modular components.

**Requirements:**

* **Structure:** Use Magic UI `Bento Grid` or `Card Hover Effect` for listing service features.
* **Micro-interactions:**
  * Service Cards: Scale up slightly (`scale-105`) and cast a glow shadow on hover.
  * Buttons: "Ripple" click effect.
* **Routing:** Dynamic `/services/[slug]` fetching from Supabase.

**Acceptance Criteria:**

* [x] Service pages render dynamic content.
* [x] Hovering over service cards feels tactile and responsive.

---

### Task 2.4: Video Testimonials (Interactive Carousel) ⚠️ PARTIAL

**Description:** A premium carousel for YouTube success stories.

**Requirements:**

* **Component:** Use Magic UI `Marquee` or a Framer Motion carousel.
* **Interaction:** Pauses on hover. Clicking a thumbnail expands the video with a smooth layout transition (`layoutId` in Framer Motion).

**Acceptance Criteria:**

* [x] Videos load efficiently.
* [x] Videos play within the website modal or frame.
* [ ] No broken links or empty embeds. *(Needs QA verification)*
* [x] Smooth transition between "Thumbnail" and "Playing" states.

---

## Phase 3: Smart Integrations (AI & Logic)

**Goal:** Implement the "Triverge 2.0" features with polished UI triggers.

### Task 3.1: Google Calendar "Smart Booking" System ❌ NOT COMPLETE (UI Only)

**Description:** The custom booking engine interfacing with Google Calendar API.

**Requirements:**

* **UI:** Custom Calendar component (styled to match Magic UI theme).
* **Logic:** Edge Function fetches G-Cal availability.
* **Flow:** Slot Selection → Modal (Magic UI `Dialog` with blur backdrop) → Choice: "WhatsApp" or "Book Here". 
"Book Here" → Writes to `appointments` table + Inserts event to Google Calendar.

**Acceptance Criteria:**

* [ ] Calendar reflects real-time availability. *(Uses Supabase locally — no Google Calendar API integration)*
* [x] Modal animation is smooth (fade in + scale up).
* [x] Booking creates a visible event on the Triverge Admin Calendar.

> **Correction:** The current system uses Supabase only. Google Calendar integration and the "WhatsApp vs Book Here" choice flow are MISSING.

---

### Task 3.2: AI Chatbot (Gemini 2.5 Flash) ❌ NOT STARTED

**Description:** Floating chat widget trained on company data.

**Requirements:**

* **Trigger:** Floating Action Button (FAB) with `Solar: Chat-Round-Dots` icon.
* **Animation:** The button should have a subtle "pulse" animation (CSS keyframes) when idle to draw attention.
* **Chat Window:** Glassmorphism background (blur) using Tailwind backdrop filters.
* **Logic:** Connects to Gemini 2.5 Flash API via Next.js API route or via Google AI Studio API (Use whatever is best suited).
* System Prompt: "You are Triverge Assistant. Answer based on this context: [Insert Company Info]..." (Use Context Caching).

**Acceptance Criteria:**

* [ ] Bot opens with a spring animation.
* [ ] Chat bubbles animate in (`y: 10 → 0`, `opacity: 0 → 1`).
* [ ] Bot correctly answers: "Do you offer dementia care?"
* [ ] Bot falls back gracefully if asked about non-healthcare topics (e.g., "I can only assist with Triverge services").

---

### Task 3.3: Advanced Site-Wide Search ❌ NOT STARTED

**Description:** Global search using a Command Palette style.

**Requirements:**

* **UI:** Use a Command Palette interface (cmd+k style) or Magic UI search input.
* **Icon:** `Solar: Magnifer` icon.
* **Feedback:** As user types, results list animates height changes smoothly.
* PostgreSQL Full Text Search function on Supabase.
* Search Bar Component: Live typing triggers search.


**Acceptance Criteria:**

* [ ] Search results from Blog, Services, and Testimonials appear instantly.

---

### Task 3.4: HCAP Enrollment & PayStack ❌ NOT STARTED

**Description:** High-conversion enrollment form and payment processing.

**Requirements:**

* **Form:** Input fields with floating labels and validation shake effects (micro-interaction for error).
* **Button:** Magic UI `Rainbow Button` or high-contrast button for "Pay & Enroll".
* **Logic:** PayStack API integration (`PaystackPop`).
`onSuccess` callback saves student data to `students` table with `payment_ref`.

**Acceptance Criteria:**

* [ ] Payment flow works.
* [ ] Form validation provides immediate, animated visual feedback.

---

## Phase 4: Admin Dashboard (Internal) ⚠️

**Goal:** A clean, functional control room for Triverge Staff (`/admin`).

### Task 4.1: Dashboard Layout ⚠️ PARTIAL

**Description:** Secure `/admin` layout.

**Requirements:**

* Supabase Auth (Email/Password login).
* Middleware to redirect unauthenticated users to `/login`.
* **Sidebar:** Solar Icons for all menu items (Dashboard, Appointments, Students, Blog, Testimonials).
* **State:** Active tab is highlighted with a background pill animation (`layoutId`).

**Acceptance Criteria:**

* [x] Navigation is intuitive and clearly labeled.
* [x] Public users cannot access `/admin`.
* [ ] Active tab uses sliding pill animation (`layoutId`). *(Currently uses static bg-color change)*

---

### Task 4.2.1: Data Views (Appointments) ✅

**Description:** A dashboard to manage upcoming consultations data table.

**Requirements:**

* Fetch data from `appointments` table.
* Display: Card or Table view showing: Client Name, Service Interest, Date, Intake Notes.
* Action: Button to "Mark as Completed" (updates status).
* **UI:** Clean tables with hover highlighting on rows.

**Acceptance Criteria:**

* [x] Admin can view and filter data easily.
* [x] New web bookings appear here instantly.

---

### Task 4.2.2: Data Views (Student & Payment Manager) ❌ NOT STARTED

**Description:** Database of enrolled HCAP students.

**Requirements:**

* Fetch data from `students` table.
* Display: Table view showing:Name, Email, Phone, Amount Paid, Payment Ref.
* Export Button: "Download CSV" (for Excel).
* **UI:** Clean tables with hover highlighting on rows.
* **Status Tags:** Colored badges (Green for "Paid", Yellow for "Pending") using `clsx`.

**Acceptance Criteria:**

* [ ] Admin can view and filter data easily.
* [ ] New web bookings appear here instantly.
* [ ] Admin can verify if a student has paid their fees.

---

### Task 4.3: CMS Tools ❌ NOT STARTED

**Description:** Tools to update the Blog and Testimonials without code.

**Requirements:**
* Blog Creator: Form with Title, Image Upload (to Storage), and Rich Text Area.
* Testimonial Adder: Simple Input for Client Name + YouTube Link.
* **Inputs:** Clean text areas for content entry.
* **Feedback:** Toast notifications (e.g., "Post Saved Successfully") fly in from the corner upon action.

**Acceptance Criteria:**

* [ ] Admin posts a blog →  Content updates reflect immediately on the public site.
* [ ] Admin adds a YouTube link → It appears on the Homepage carousel.

---

## Phase 5: QA & Deployment

**Goal:** Polish and Launch.

### Task 5.1: Performance & Design QA ❌ NOT STARTED

**Description:** Verify all pages on Mobile and Tablet breakpoints and ensure animations do not hinder performance.

**Checklist:**

* [ ] Navigation menu opens/closes correctly.
* [ ] Tables in Dashboard scroll horizontally if needed.
* [ ] Forms are touch-friendly.

**Requirements:**

* Check CPU usage of Unicorn Studio hero on lower-end devices (disable if necessary).
* Verify mobile responsiveness of Magic UI components.

**Acceptance Criteria:**

* [ ] Lighthouse Performance score > 90.
* [ ] Animations are smooth (60fps).

---

### Task 5.2: Deployment ❌ NOT STARTED

**Description:** Deploy to production (Vercel or Netlify recommended for Next.js).

**Requirements:**

* [ ] Connect GitHub repo.
* [ ] Add Production Environment Variables.
---