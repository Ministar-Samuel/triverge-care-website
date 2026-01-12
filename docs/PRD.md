# Product Requirement Document (PRD)

**Project Name:** Triverge Healthcare Digital Platform  
**Version:** 2.0  
**Date:** January 8, 2026  
**Status:** Approved for Development (Architecture Phase)

---

## 1. Executive Summary

Triverge Healthcare is upgrading from a static informational website to a dynamic web application. The platform serves two primary user bases: families seeking elderly care services and individuals seeking caregiver training (HCAP). The system will feature a "Smart" booking engine synchronized with Google Calendar, a custom Admin Dashboard, a unified search index, and an AI-powered 24/7 support assistant.

---

## 2. Technical Stack & Architecture

* **Development Environment:** Google Anti-Gravity (Agentic IDE)
* **AI/LLM Engine (Code):** Gemini 3 (Code Generation & Logic)
* **AI/LLM Engine (Chatbot):** Gemini 2.5 Flash (via Google AI Studio API)
* **Frontend Framework:** Next.js (React) – selected for SEO and dynamic routing
* **Backend & Database:** Supabase (PostgreSQL, Auth, Edge Functions, Storage)
* **Payment Gateway:** PayStack API
* **External Integrations:** Google Calendar API, WhatsApp API (Deep Linking)

---

## 3. User Roles

* **Guest (Public User):** Families seeking care, potential students
* **Student:** Applicants enrolling in the HCAP program
* **Admin (Triverge Staff):** Authorized personnel managing content, appointments, payments, and student data

---

## 4. Functional Requirements

### 4.1. Core Navigation & Page Structure

The platform shall support the following responsive page hierarchy:

#### 1. Homepage (`/`)

* **Hero Section:** Value proposition + "Book Consultation" CTA
* **Services Grid:** Quick links to core services
* **Features:** Why Choose Triverge (Comfort, Dignity, Expertise)
* **Testimonials:** Video carousel (YouTube Embeds)
* **Footer:** Links, Newsletter Signup, Contact Info

#### 2. About Us (`/about`)

* **Mission & Vision:** The Triverge Story
* **Life at the Centre:** Gallery/Description of the Ibadan facility
* **Our Team:** Profiles of key staff

#### 3. Services (`/services`)

* **Main Index:** Overview of all services
* **Sub-pages:**
  * Dementia Care (`/services/dementia`)
  * Physiotherapy (`/services/physiotherapy`)
  * Home Nursing (`/services/home-nursing`)
  * Post-Hospital Rehab (`/services/rehab`)
  * *(Other services follow similar template)*

#### 4. HCAP Training (`/training`)

* **Program Overview:** Curriculum and benefits
* **Enrollment Form:** Collects Student Name, Email, Phone, Address
* **Payment Action:** "Enroll Now" button triggers PayStack for tuition deposit

#### 5. Blog/News (`/blog`)

* **Index:** Grid of recent articles (Title + Image)
* **Post Details (`/blog/[slug]`):** Full article content

#### 6. Contact (`/contact`)

* **Locations:** Map embeds for Ibadan/Lagos
* **General Inquiry Form:** For non-booking questions

---

### 4.2. AI Chatbot (Gemini 2.5 Flash)

* **Objective:** Provide instant, accurate answers to visitor questions 24/7
* **Model:** Google Gemini 2.5 Flash
* **Training/Context:** The model will be initialized with a "System Instruction" containing the full text of the website, service details, and pricing (Context Caching will be used to optimize costs)
* **UI:** A floating icon (bottom-right). Clicking it expands a chat window
* **Behavior:**
  * Answers questions based only on company data
  * Escalates complex queries by suggesting the "Book Consultation" form

---

### 4.3. "Smart" Consultation Booking

* **Objective:** Streamline appointment setting
* **Availability:** Syncs with Google Calendar via Service Account
* **Flow:**
  * User picks Date/Time
  * **Modal Choice:**
    * **Option A:** "Discuss on WhatsApp" (Pre-filled message)
    * **Option B:** "Book on Platform" (Fills Intake Form)
  * **Confirmation:** Saves to Supabase `appointments` table & creates G-Cal Event

---

### 4.4. Floating WhatsApp Action

* **Objective:** Quick, informal communication
* **UI:** Secondary floating icon (distinct from Chatbot)
* **Interaction:** Clicking opens a small input box: "Type your message..."
* **Action:** Clicking "Send" redirects the user to `wa.me/+234...?text=[User Message]`

---

### 4.5. Student Enrollment & Payments

* **Objective:** Capture student data and process fees
* **Flow:** Student fills form → Clicks Pay → PayStack Popup → Success Redirect
* **Data:** Successful transaction saves student info + Payment Ref to `students` table

---

## 5. Admin Dashboard (Private)

**Access:** Secured route (`/admin`) via Supabase Auth

#### 1. Dashboard Home
Quick stats (Total Appointments, Recent Payments)

#### 2. Appointment Manager
Calendar/List view of bookings with patient details

#### 3. Student Manager
* Table view of all enrolled students (Name, Payment Date, Contact)
* Filter by "Payment Status"

#### 4. CMS (Content Management)
* **Blog:** Add/Edit posts
* **Testimonials:** Add YouTube links

#### 5. Newsletter
View/Export subscriber emails

---

## 6. Database Schema (Supabase)

### 6.1. Primary Tables

#### `appointments`
* `id`: UUID
* `client_name`: Text
* `service_type`: Text
* `scheduled_time`: Timestamp
* `status`: Text
* `notes`: Text

#### `students`
* `id`: UUID
* `full_name`: Text
* `email`: Text
* `phone`: Text
* `enrollment_date`: Date
* `payment_ref`: Text
* `amount_paid`: Numeric

#### `blog_posts`
* `id`: UUID
* `title`: Text
* `slug`: Text
* `hero_image`: Text
* `content`: Text
* `published_at`: Timestamp

#### `testimonials`
* `id`: UUID
* `client_name`: Text
* `youtube_id`: Text
* `category`: Text

#### `newsletter_subscribers`
* `email`: Text (PK)
* `subscribed_at`: Timestamp

#### `search_index`
* `title`: Text
* `snippet`: Text
* `url`: Text
* `keywords`: Text (Aggregated for search)

---

## 7. Integrations

* **Google Calendar:** Read/Write events
* **PayStack:** Process payments (NGN)
* **Gemini API:** Chatbot logic
* **WhatsApp:** URL Scheme (`wa.me`)

---

*End of Document*