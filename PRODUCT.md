# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Users
Two equally important audiences in and around Hyderabad, both evaluating whom to trust with a large, hard-to-reverse spend:
- **Homeowners** furnishing new apartments and villas (e.g. Banjara Hills, Gachibowli, Kokapet). Usually a couple deciding together, comparing several firms, browsing on phone, often sharing the site over WhatsApp.
- **Businesses** — offices, retail/showrooms, restaurants, hotels and guest houses — needing a fit-out delivered on a commercial timeline.

Both want to see real finished work, understand what it will cost, and reach a person quickly.

## Product Purpose
Marketing site + lead engine for Cloud Space Interiors, an end-to-end (design → build → handover) interior firm. Success = qualified quote requests: a visitor picks products/services, sends a quotation request, and the studio receives it by email and WhatsApp. An admin panel lets the studio manage the product catalog and track quote requests.

## Positioning
Premium finishes and end-to-end design + build by one team, with material and process transparency.

**Client decision (2026-10-13):** do NOT promise a fixed price or a fixed time period anywhere on the site; customers read "45 days" as too long. No timeline numbers, no "final price" wording.

## Operating Context
- Leads arrive via the quote form (saved to SQLite, emailed to the studio and a confirmation to the customer) and via WhatsApp (wa.me prefilled chat; optional Cloud API alert).
- Visitors build a "quote list" from the product catalog before submitting.
- Studio staff use `/admin` to manage products (images, price labels, featured/hidden) and move quotes through new → contacted → won/closed.
- Phone/WhatsApp: +91 96631 36836. Emails: info@cloudspaceinteriors.com, cloudspaceinteriors@gmail.com. Office: SY NO 127/A1, Velimala, Opp. Prosperiti Homes, Ekam, Hyderabad, Medak, Telangana 502300. Hours: daily 8 AM – 8 PM.

## Capabilities and Constraints
- Design gallery: admin-managed photo folders by category (Residential: kitchen, TV unit, breakfast counter, bedrooms, wardrobe, crockery, partition, main door, shoe rack, 3 ceiling types, wall designs; Commercial: commercial, office space). Empty folders are hidden publicly.
- About copy is the client's own text from the old site (minus pricing/45-day items).
- Next.js 16 (App Router, Cache Components), Tailwind v4, `node:sqlite`, nodemailer; self-hosted single Node server.
- Services: Residential, Commercial, Hospitality, Office, Customized interiors, Design & Build.
- 9-step process (Consultation → After-Support); steps 4–5 wording unconfirmed.
- Product prices are free-text labels ("From ₹65,000", "On request"); no checkout or online payment.
- Images currently hotlinked from the WordPress uploads folder.

## Brand Commitments
- The deep green + gold brand colours must stay recognisable (user-confirmed, binding).
- Logo sits directly on a light (ivory) header like the old site — not on a tag (client request).
- Background must look clean and sharp — no grain/felt texture (client found it blurry).
- Must never feel cold or stark-minimalist; the work is warm, lived-in homes and hospitality.
- Name: Cloud Space Interiors. Existing tagline: "Designs That Speak. Spaces That Transform." Existing logo (cloud mark) at `${WP}/2021/12/l__1_-removebg-preview.png`.

## Evidence on Hand
- Project photos on the current site are Cloud Space's own work (confirmed), except files named `pexels-*` which are stock by filename.
- Testimonials are real; client names not yet supplied — attribute by project type/location until names are provided.
- Featured projects: 3BHK Banjara Hills (Modern Luxe), Corporate Office Financial District, Boutique Hotel Jubilee Hills, Luxury Villa Gachibowli.
- No awards, project counts, years-in-business or ratings confirmed — do not invent them.

## Product Principles
1. Show the work: real finished spaces are the strongest argument.
2. Explain materials and process clearly wherever cost anxiety appears — without promising a fixed price or timeline.
3. One short path to a person: quote list, form, or WhatsApp, always within reach.
4. Serve homeowners and businesses equally without making either feel like an afterthought.
