// Business details and static page copy. Product catalog lives in the DB (admin-editable).

// ponytail: images are hotlinked from the current WordPress site; copy them into /public and change this one line before WP is shut down.
export const WP = "https://cloudspaceinteriors.com/wp-content/uploads";

export const site = {
  name: "Cloud Space Interiors",
  phone: "+91 96631 36836",
  whatsapp: "919663136836", // digits only, used for wa.me links
  emails: ["info@cloudspaceinteriors.com", "cloudspaceinteriors@gmail.com"],
  address: "SY NO 127/A1, Velimala, Opp. Prosperiti Homes, Ekam, Hyderabad, Medak, Telangana 502300",
  hours: "Open daily, 8 AM – 8 PM",
  logo: `${WP}/2021/12/l__1_-removebg-preview.png`,
};

// Cloud Space's own photographs (no stock).
const img = {
  kitchenIsland: `${WP}/2025/07/IMG-20250723-WA0032.jpg`,
  marbleTv: `${WP}/2025/07/IMG-20250723-WA0027.jpg`,
  marbleLiving: `${WP}/2025/07/IMG-20250723-WA0028.jpg`,
  bedroomWarm: `${WP}/2025/07/IMG-20250723-WA0029.jpg`,
  bedroomPanel: `${WP}/2025/07/IMG-20250723-WA0031.jpg`,
  kitchenGrey: `${WP}/2025/07/IMG-20250723-WA0030.jpg`,
  livingBright: `${WP}/2025/07/IMG-20250723-WA0026.jpg`,
  diningDark: `${WP}/2025/07/IMG-20250723-WA0025.jpg`,
  lounge: `${WP}/2025/07/1.jpg`,
  kitchenWhite: `${WP}/2025/07/2.jpg`,
  wardrobe: `${WP}/2025/07/3.jpg`,
  dining: `${WP}/2025/07/WhatsApp-Image-2025-07-23-at-14.56.46_a8626df4.jpg`,
  wardrobeSlide: `${WP}/2025/07/WhatsApp-Image-2025-07-23-at-14.56.46_d30c26c7.jpg`,
  office: `${WP}/2025/07/WhatsApp-Image-2025-07-23-at-14.53.18_96d48da6-e1753272028607.jpg`,
  officeLegacy: `${WP}/2025/07/b2-768x431.webp`,
  tvWall: `${WP}/2025/07/WhatsApp-Image-2025-07-23-at-14.53.17_926a5a0f-e1753272077736.jpg`,
  archLiving: `${WP}/2025/07/WhatsApp-Image-2025-07-23-at-14.53.17_38b27096-1.jpg`,
  study: `${WP}/2025/08/WhatsApp-Image-2025-07-23-at-9.59.28-PM_9_11zon.jpg`,
  kitchenRack: `${WP}/2025/08/WhatsApp-Image-2025-07-23-at-9.59.24-PM_7_11zon-scaled.jpeg`,
};

export const heroImage = { src: img.kitchenIsland, caption: "Marble island, brass-lit cabinetry" };

export type Project = {
  slug: string;
  title: string;
  location: string;
  style: string;
  scope: string;
  highlight: string;
  images: string[];
};

// ponytail: photo-to-project grouping is a best guess from the old site's captions; confirm with the studio.
export const projects: Project[] = [
  { slug: "banjara-hills-3bhk", title: "Elegant 3BHK apartment", location: "Banjara Hills", style: "Modern luxe", scope: "Full residential interiors", highlight: "Marble-textured TV unit with gold accents and ambient lighting.", images: [img.marbleTv, img.marbleLiving, img.bedroomWarm, img.dining] },
  { slug: "gachibowli-villa", title: "Luxury villa", location: "Gachibowli", style: "Classic elegance", scope: "Full villa interiors", highlight: "Italian marble, bespoke railings and home automation.", images: [img.archLiving, img.diningDark, img.kitchenIsland, img.livingBright] },
  { slug: "financial-district-office", title: "Corporate office", location: "Financial District", style: "Contemporary minimalist", scope: "Office interiors", highlight: "Acoustic panelling, ergonomic layout and branding zones.", images: [img.office, img.officeLegacy] },
  { slug: "jubilee-hills-hotel", title: "Boutique hotel", location: "Jubilee Hills", style: "Urban chic", scope: "Lobby, guest rooms, café", highlight: "Artistic wall textures and space-maximising furniture.", images: [img.bedroomPanel, img.lounge, img.tvWall] },
];

export type Service = { id: string; title: string; text: string; image: string };

export const homeServices: Service[] = [
  { id: "residential", title: "Residential interiors", text: "Modular kitchens to luxurious bedrooms: warm, elegant, customised living spaces that feel like home.", image: img.marbleLiving },
  { id: "customized", title: "Customised pieces", text: "Wardrobes, TV walls, study units and pooja units, made to your measurements and your story.", image: img.wardrobe },
  { id: "design-build", title: "Design & build", text: "Concept, 3D design, material selection and execution, all handled by one team.", image: img.kitchenRack },
];

export const businessServices: Service[] = [
  { id: "office", title: "Office interiors", text: "Workspaces that balance aesthetics, ergonomics and brand identity.", image: img.office },
  { id: "commercial", title: "Commercial interiors", text: "Brand-aligned interiors for retail, showrooms and restaurants, designed to make an impact.", image: img.tvWall },
  { id: "hospitality", title: "Hospitality interiors", text: "Inviting rooms for hotels, resorts and guest houses that leave lasting impressions.", image: img.bedroomPanel },
];

export const steps = [
  ["Consultation & discovery", "We start with your needs, style, budget and timeline. We listen before we sketch."],
  ["Concept & design", "Mood boards and 2D/3D visualisations, so you see your space before it is built."],
  ["Material selection", "You choose every finish with us, with full transparency on what goes in."],
  ["Quotation", "A detailed quotation, with every material and cost explained before work begins."],
  ["Execution planning", "A precise schedule for smooth work with minimal disruption to your routine."],
  ["Site supervision", "Our team oversees every day on site, with quality checks and real-time updates."],
  ["Quality assurance", "Rigorous checks at every stage. Excellence is in the details."],
  ["Final handover", "Your space handed over after a thorough final inspection."],
  ["After-support", "We stay with you after handover. The relationship continues beyond delivery."],
] as const;

export const promises = [
  ["End-to-end", "Design, materials and execution by one team."],
  ["Transparent", "Every material and process explained clearly."],
  ["Your finishes", "Every material chosen with you, chip by chip."],
  ["After handover", "Support continues once you've moved in."],
] as const;

export const testimonials = [
  { quote: "Our office needed a transformation that was modern yet efficient. They delivered exactly that, from ergonomic furniture to impactful branding.", who: "Office client, Financial District" },
  { quote: "Every corner of our villa reflects elegance and warmth. The team was attentive, flexible, and treated our project like their own.", who: "Villa owners, Gachibowli" },
  { quote: "The interiors for our hotel received countless compliments from guests. A luxurious ambiance without compromising on function.", who: "Hotelier, Jubilee Hills" },
];

// Each product category is shown as a material chip on the board.
const SWATCH: Record<string, string> = { Residential: "sw-marble", Customized: "sw-walnut", Office: "sw-slats", Commercial: "sw-grey-marble", Hospitality: "sw-linen" };
export const swatchFor = (category: string) => SWATCH[category] ?? "sw-brass";

// About copy from the studio's previous website (pricing and 45-day claims left out at the studio's request).
export const about = {
  title: "Crafting spaces that tell your story",
  intro: [
    "At Cloud Space Interiors, we believe that great design is not just about aesthetics — it’s about purpose, personality, and presence. With over a decade of design expertise, we specialize in creating luxurious, functional interiors that capture the unique essence of those who live and work within them.",
    "We’re more than interior designers — we’re storytellers, curators, and collaborators. From private homes to premium commercial spaces, our projects reflect a seamless fusion of style and substance, backed by trust, transparency, and timeless craftsmanship.",
  ],
  whyTitle: "Why Cloud Space Interiors?",
  whyIntro: "Design where every detail matters. Since our inception, we’ve delivered elegant, functional spaces tailored to your vision. Here’s what sets us apart:",
  why: [
    ["End-to-end solutions", "From concept to completion, we handle every detail to bring your vision to life seamlessly."],
    ["Precision execution", "On-site experts ensure flawless alignment between design plans and the finished space."],
    ["Luxury finishes", "Handcrafted details meet cutting-edge materials for timeless quality."],
    ["Adaptive innovation", "Flexible designs evolve with your needs, blending creativity and practicality."],
  ] as const,
};
export const aboutImage = img.marbleTv;
