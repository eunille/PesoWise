# PesoWise PH
## Project Concept Document

**Working title:** PesoWise PH  
**Project type:** Web-based savings comparison and projection platform  
**Target market:** Filipino netizens, students, first-time savers, and budget-conscious young professionals  
**Suggested stack:** Next.js + Tailwind CSS + shadcn/ui + Supabase (optional, free tier)  
**Version:** Draft 1.0  
**Prepared on:** March 25, 2026

---

## 1. Executive Summary

PesoWise PH is a web platform that helps Filipinos understand where their savings may grow more by comparing publicly available savings rates and rules across selected Philippine platforms such as GoTyme, Maya, GSave/CIMB, and MariBank. Users can enter an amount, choose a time period, optionally add recurring monthly savings, and instantly see projected outcomes.

The platform is designed primarily as an educational and decision-support tool, not as a financial advisory service. Its main value is clarity: many users know they should save, but they do not know where to start, how interest works, or how different platforms compare over time.

The product should be built as a frontend-first application so it can launch quickly with low complexity, while its structure remains flexible enough to support a backend later without requiring major rework.

---

## 2. Problem Statement

Many Filipinos, especially students and beginner savers, face these common problems:

1. They do not understand the difference between e-wallet savings products, digital banks, and promo-based savings rates.
2. They see marketing claims such as “up to X% interest” but do not clearly understand the conditions behind those claims.
3. They do not know how much their money will actually become after one month, six months, or one year.
4. They manually compare apps and promo pages, which is time-consuming and easy to misunderstand.
5. They often make decisions using incomplete or outdated information.

As a result, users may either leave money idle, choose a less suitable platform, or misunderstand how much they can realistically earn.

---

## 3. Proposed Solution

PesoWise PH solves this by providing a simple website where users can:

- compare selected savings platforms in the Philippines
- simulate growth from an initial deposit
- optionally add recurring monthly deposits
- view estimated returns over different time periods
- understand whether a rate is base, promo, or conditional
- read plain-language explanations of how the calculation works
- see important disclaimers so they are not misled by promotional figures

The goal is not to tell users what to do with certainty. The goal is to help them make more informed savings decisions using verified, recent, and clearly explained reference data.

---

## 4. Why This Project Is Strong

This project is strong because it is:

- **practical** — users can immediately test “What happens if I save ₱500?”
- **educational** — helps users understand interest, compounding, and conditions
- **low-friction** — no login is required for the MVP
- **lightweight** — can launch as a frontend-first app
- **expandable** — can later support backend-driven rate management, analytics, and alerts
- **locally relevant** — focused on Philippine digital finance behavior

---

## 5. Primary Users

### 5.1 Students
Users with small but regular savings amounts who want to know where small deposits grow best.

### 5.2 First-time savers
Users choosing between familiar apps such as GCash, Maya, and GoTyme but who are unsure of the trade-offs.

### 5.3 Young professionals
Users who want quick side-by-side savings comparisons without reading multiple bank pages.

### 5.4 Financially curious netizens
Users who want a quick simulator and explanation rather than a full banking product.

---

## 6. Core Product Features

### 6.1 Savings Projection Calculator
The user enters:
- initial amount
- time horizon
- optional recurring monthly contribution

The app returns estimated growth for each supported platform.

### 6.2 Platform Comparison View
The app compares platforms using:
- estimated final amount
- estimated interest earned
- rate type (base, promo, conditional, tiered)
- update date
- notes and conditions

### 6.3 Best Fit Recommendation
The app highlights perspectives such as:
- best estimated return
- simplest base rate
- best for beginners
- best if the platform has conditions the user may not want to meet

### 6.4 Educational Explanations
The app explains:
- what annual interest means
- what compounding means
- why “up to” rates are not the same as guaranteed base rates
- why real earnings can differ from projections

### 6.5 Transparency and Trust Layer
Each platform card should show:
- source link or source label
- verification date
- confidence note
- whether the rate is base or promotional
- whether tax treatment or conditions affect output

---

## 7. Accuracy, Trust, and Anti-Misleading Policy

The platform should aim for **high practical accuracy**, but it should **never claim 100% accuracy**.

### 7.1 Recommended Product Positioning
Use this wording in the product:

> “Projections are estimates based on publicly available rates and rules last verified on a specific date. Actual returns may differ due to promo conditions, taxes, policy updates, account limits, or changes made by the provider.”

### 7.2 Recommended Accuracy Standard
A realistic product standard is:
- use official or first-party sources whenever possible
- store the verification date of every rate
- classify rates as base, promotional, conditional, or tiered
- show confidence labels instead of claiming certainty

### 7.3 Suggested Confidence Labels
- **High confidence** — directly verified from official provider page or official help center
- **Medium confidence** — verified from provider marketing page but conditions require interpretation
- **Low confidence** — unclear, outdated, or incomplete information; should not be used for recommendation emphasis

### 7.4 Important Note for Users
The app should visibly state:
- this is an educational comparison tool
- not financial advice
- not a guarantee of future earnings
- users should verify final details with the provider before depositing significant funds

This is better than claiming “90% accurate” because it is more transparent, legally safer, and more trustworthy.

---

## 8. Data Design Principle

The app should not only store “interest rate”. It should store the context of that rate.

For example:
- a platform may have a **base rate**
- another may advertise an **up to** rate with conditions
- another may have **tiered balances**
- another may compute interest daily but credit monthly

The data model must reflect this or the comparison will be misleading.

---

## 9. Recommended Product Scope

### 9.1 MVP Scope
- no login
- no user account
- no personal financial storage
- no transaction integration
- no direct bank API integration
- no money movement

### 9.2 MVP Inclusions
- calculator
- comparison cards
- educational content
- source and verification labels
- static or semi-static platform data
- responsive website

### 9.3 Post-MVP Possibilities
- admin dashboard for updating rates
- rate history timeline
- push alerts or email alerts
- “save goal” feature
- AI explainer/chat assistant
- CMS-like backend for content and rate updates

---

## 10. Frontend-First Architecture with Future Backend Flexibility

The frontend should be built now in a way that does not force a full restructure later.

### 10.1 Core Principle
The UI should depend on a **stable internal data contract**, not on hardcoded component-specific structures.

That means the app should behave as if the data already comes from an API, even if for MVP it actually comes from local JSON or static files.

### 10.2 Recommended Approach
Use a layered design in the frontend:

1. **Presentation layer**  
   Reusable UI components such as calculator cards, comparison tables, platform detail panels, disclaimer banners, and result summaries.

2. **Application layer**  
   Handles projection logic, filtering, sorting, recommendation rules, and user input state.

3. **Data access layer**  
   A dedicated source module that exposes normalized platform data.

For MVP, the data access layer reads local structured data.
Later, the exact same interface can read from Supabase or another backend.

### 10.3 Why This Matters
If this separation is done early, adding backend later becomes a data-source swap instead of a UI rewrite.

### 10.4 Recommended Rules for Flexibility
- keep platform data normalized
- avoid embedding product rules directly inside UI components
- keep calculators separate from display components
- store timestamps, source types, and confidence labels in data objects
- make recommendation logic provider-agnostic
- avoid naming the UI around a single provider

### 10.5 Backend-Ready Without Backend-Dependent UX
The app should remain fully usable without authentication, but still be prepared for backend additions such as:
- remote rate updates
- content management
- analytics storage
- audit trail of rate changes
- future admin-only dashboard

---

## 11. Why Supabase Still Makes Sense Even If MVP Is Frontend-Only

Supabase is optional for the MVP, but it is still a good strategic choice because:

- it has a free tier suitable for early projects
- it can later hold platform data, historical rate records, and audit logs
- it can act as a lightweight backend without needing a separate full custom server initially
- it supports row-level policies if an admin panel is added later
- it is easy to pair with Next.js

### Recommendation
For MVP:
- launch with static verified data in the frontend

For Phase 2:
- move platform/rate content to Supabase tables and fetch through a thin server-side or API layer

---

## 12. User Experience Principles

The product should feel simple, clear, and safe.

### UX priorities
- plain Filipino/English-friendly wording
- avoid financial jargon when possible
- explain assumptions beside the result, not hidden away
- make promotional conditions visible
- always show “last verified” date
- clearly separate “estimated result” from “actual result may vary”

### Recommended sections on the website
- Hero section
- Calculator section
- Platform comparison section
- How savings works section
- Important disclaimers section
- FAQ section

---

## 13. Functional Requirements

### 13.1 User Inputs
The system should allow the user to input:
- starting amount
- monthly top-up amount (optional)
- projection duration
- comparison mode

### 13.2 Outputs
The system should show:
- projected final amount
- projected gross interest
- estimated net gain if tax is modeled
- best estimated return among visible platforms
- source freshness and confidence labels

### 13.3 Platform Metadata
Each platform entry should support:
- provider name
- category
- rate type
- interest rate value or rule
- compounding basis
- crediting frequency
- balance tiers
- notes/conditions
- source URL or source label
- last verified date
- confidence label

---

## 14. Non-Functional Requirements

### 14.1 Performance
The site should load fast and compute instantly in-browser for normal usage.

### 14.2 Reliability
The app should handle invalid inputs safely and should never silently produce results without clear assumptions.

### 14.3 Maintainability
Data, business rules, and UI should be kept separate so future updates remain low-cost.

### 14.4 Transparency
The app should always show that results are estimated and derived from stored assumptions.

### 14.5 Scalability
The architecture should support moving from local data to Supabase-driven data with minimal UI changes.

---

## 15. Savings Calculation Model

The platform should support at least two projection modes:

### 15.1 Lump-Sum Projection
Used when the user deposits a single amount and lets it stay for a period.

### 15.2 Recurring Contribution Projection
Used when the user adds money monthly.

### 15.3 Important Calculation Notes
The calculator should account for the fact that different providers may:
- quote annual rates
- compute interest daily
- credit interest monthly or daily
- apply tax to interest earnings
- change rates over time
- require promo conditions

Because of this, the app should expose assumptions for each provider rather than pretending every product works exactly the same way.

---

## 16. Data Schema Design

Below is a recommended logical schema. This is not tied to a specific database yet; it is the product data design.

### 16.1 Entity: `platforms`
Purpose: stores the provider or savings platform.

**Fields**
- `id`
- `slug`
- `display_name`
- `provider_type` (digital_bank, ewallet_savings, partner_savings, etc.)
- `short_description`
- `country`
- `is_active`
- `official_website`
- `logo_url`
- `created_at`
- `updated_at`

### 16.2 Entity: `savings_products`
Purpose: stores the actual savings product under a platform.

**Fields**
- `id`
- `platform_id`
- `product_name`
- `product_type` (base_savings, promo_savings, wallet_linked_savings, goals_account)
- `currency`
- `minimum_balance_to_earn`
- `maintaining_balance`
- `maximum_balance_for_primary_rule`
- `notes`
- `is_promotional`
- `is_conditional`
- `is_tiered`
- `is_active`
- `created_at`
- `updated_at`

### 16.3 Entity: `rate_rules`
Purpose: stores how returns should be interpreted and calculated.

**Fields**
- `id`
- `savings_product_id`
- `rate_label` (base, promo, up_to, tier_1, tier_2, conditional_bonus)
- `annual_rate_percent`
- `balance_min`
- `balance_max`
- `compounding_basis` (daily, monthly, annual, simple)
- `interest_crediting_frequency` (daily, monthly, maturity)
- `withholding_tax_percent`
- `requires_conditions`
- `condition_summary`
- `effective_start_date`
- `effective_end_date`
- `is_current`
- `source_id`
- `confidence_level`
- `verified_at`
- `created_at`
- `updated_at`

### 16.4 Entity: `sources`
Purpose: keeps the proof and freshness of every stored financial fact.

**Fields**
- `id`
- `platform_id`
- `source_type` (official_help_center, official_marketing_page, official_fees_page, manual_review)
- `source_title`
- `source_url`
- `captured_summary`
- `last_checked_at`
- `status` (active, outdated, needs_review)
- `notes`

### 16.5 Entity: `projection_profiles`
Purpose: stores calculation presets if backend is added later.

**Fields**
- `id`
- `name`
- `description`
- `projection_mode` (lump_sum, recurring_monthly)
- `duration_unit`
- `duration_value`
- `include_tax`
- `created_at`
- `updated_at`

### 16.6 Entity: `simulation_runs`
Purpose: optional future backend storage of anonymous or admin-reviewed calculations.

**Fields**
- `id`
- `session_id`
- `input_amount`
- `monthly_contribution`
- `duration_months`
- `include_tax`
- `created_at`

### 16.7 Entity: `simulation_results`
Purpose: optional storage of per-platform projected outputs.

**Fields**
- `id`
- `simulation_run_id`
- `savings_product_id`
- `projected_final_amount`
- `projected_gross_interest`
- `projected_net_interest`
- `assumptions_snapshot`
- `created_at`

### 16.8 Entity: `content_pages`
Purpose: optional CMS-style table for FAQs, explanations, and disclaimers.

**Fields**
- `id`
- `slug`
- `title`
- `body`
- `status`
- `updated_at`

---

## 17. Frontend Data Contract Recommendation

Even before backend exists, the frontend should behave as though it receives data in a normalized shape like this conceptually:

- platform information
- product information
- rate rule information
- source information
- calculated projection results

This makes migration easier because the UI only knows one shape of data.

### Example migration path
- **Phase 1:** local structured data files
- **Phase 2:** Supabase tables with the same shape
- **Phase 3:** server-side validation, scheduled checks, or admin content workflows

---

## 18. Suggested Pages

### 18.1 Home Page
Explains the product, trust note, and quick calculator entry.

### 18.2 Compare Page
Main side-by-side projection page.

### 18.3 Platform Details Page
Shows a deeper explanation per platform including rates, source notes, and update dates.

### 18.4 Learn Page
Explains how savings, annual rates, and conditions work.

### 18.5 About / Disclaimer Page
Defines the educational purpose and limitations of the platform.

---

## 19. Future Backend Use Cases

A backend is not required for the MVP, but if it is added later it should support practical needs only.

### Useful future backend features
- admin updates for rates and conditions
- source audit history
- historical rate tracking
- content management for FAQs and advisories
- anonymous analytics
- automated freshness reminders when a source is old

### Features that are not necessary at first
- user login
- personal portfolios
- direct bank integrations
- transaction sync
- KYC or wallet features

---

## 20. Risks and Mitigations

### Risk 1: Rates change frequently
**Mitigation:** store `verified_at`, show freshness badge, and mark stale data for review.

### Risk 2: Promo conditions are misunderstood
**Mitigation:** separate base rates from promo rates and show condition summaries clearly.

### Risk 3: Users interpret estimates as guarantees
**Mitigation:** place disclaimers near output and avoid certainty language.

### Risk 4: Frontend becomes messy when backend is introduced
**Mitigation:** isolate data access and preserve one stable frontend contract from day one.

### Risk 5: Too much financial complexity for beginners
**Mitigation:** keep default mode simple and move advanced details into expandable sections.

---

## 21. Recommended MVP Build Strategy

### Phase 1: Frontend-Only Launch
- Next.js
- Tailwind CSS
- shadcn/ui
- local verified platform data
- projection calculator
- comparison cards
- disclaimers and educational content

### Phase 2: Structured Content Management
- Supabase for rate tables and source tracking
- admin-only update workflow
- better freshness control

### Phase 3: Trust and Growth Features
- rate history
- update alerts
- smarter recommendation logic
- content expansion

---

## 22. Verified Market Data Notes for Initial Supported Platforms

The app should prioritize official or first-party references and store them with verification dates.

### Suggested initial platform notes

#### GoTyme Bank – Go Save
- Official GoTyme help pages indicate a **3.0% annual interest rate** for Go Save, with interest paid monthly and subject to 20% withholding tax.
- GoTyme also states deposits are insured by PDIC up to **₱1,000,000 per depositor per bank**.
- Confidence: High for base rate and PDIC note.

#### Maya Savings / Maya Personal Goals
- Maya public materials indicate **Maya Savings** has a **3.5% p.a. base rate**, while higher rates may depend on activity-based boosts and promo conditions.
- Maya public promo materials for **Personal Goals** indicate rates may range from **4% to 8% p.a.** under specified promo conditions.
- Confidence: High for existence of base/promo distinction; medium for promotional interpretation unless narrowed to a specific date and product rule.

#### GCash GSave (CIMB and others)
- GCash Help Center lists **GSave by CIMB at 2.6% p.a.** and also lists other partner products with separate rates and limits.
- GSave should be modeled as a **partner savings marketplace**, not as a single uniform savings rate.
- Confidence: High for current published CIMB figure from GCash Help Center.

#### MariBank Philippines
- MariBank’s official savings product pages indicate **3.25% p.a.** for balances up to **₱1,000,000** and **3.75% p.a.** for balances above **₱1,000,000**, with interest credited daily.
- Confidence: High for current tiered public rate.

### Important implementation note
The MVP should avoid flattening all products into one “best rate” list. It should compare like-for-like products and make conditions visible.

---

## 23. Compliance and Ethical Product Notes

The site should avoid sounding like a licensed financial advisor unless the team actually has the legal basis to do so.

Recommended safe language:
- “estimate”
- “projection”
- “based on publicly available data”
- “last verified on”
- “for educational and comparison purposes only”

Avoid high-risk wording such as:
- “guaranteed best platform”
- “most profitable for everyone”
- “accurate final earnings”
- “official savings advisor”

---

## 24. Final Recommendation

This project is highly feasible as a frontend-first product.

You do **not** need a backend for the first release, but you should design the frontend as if the data will later come from one. The best strategy is to launch early with verified static data, transparent disclaimers, and a clean calculator experience, then add Supabase only when you need rate management, history, or admin editing.

That gives you:
- low initial complexity
- fast development
- good user value
- better trust through transparency
- minimal rework when backend is introduced later

---

## 25. Recommended Short Product Positioning

**PesoWise PH** is a Philippine savings comparison and projection platform that helps users estimate how their money may grow across selected digital savings products using recent, publicly available data, transparent assumptions, and beginner-friendly explanations.

