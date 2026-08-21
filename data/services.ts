export type Service = {
  id: string;
  /** Two-letter reference. Services are a set, not a sequence, so they are
      coded like drawing references rather than numbered like steps. */
  code: string;
  title: string;
  short: string;
  body: string;
  includes: string[];
};

export const services: Service[] = [
  {
    id: "design",
    code: "DS",
    title: "Custom Website Design",
    short: "Designed around your business, not a template.",
    body: "We start from what your business actually sells and who actually buys it, then design the pages around that. No stock layout with your logo dropped in.",
    includes: [
      "Original layout and visual identity",
      "Page structure built around your services",
      "Copy structured for scanning, not reading",
    ],
  },
  {
    id: "mobile",
    code: "MB",
    title: "Mobile-First Development",
    short: "Built for the phone first, because that's where your customers are.",
    body: "Most people will meet your business on a phone. We design the small screen first and scale up, so nothing is an afterthought at the size that matters most.",
    includes: [
      "Designed separately for phone, tablet, and desktop",
      "Tap targets and forms sized for thumbs",
      "Tested on real screen sizes before launch",
    ],
  },
  {
    id: "conversion",
    code: "CV",
    title: "Conversion-Focused Design",
    short: "Clear next steps on every page.",
    body: "A website earns its keep by turning visitors into calls, forms, and bookings. We place the ask where people are ready to act, and keep it visible without nagging.",
    includes: [
      "One clear primary action per page",
      "Contact and quote forms that people finish",
      "Trust signals placed where hesitation happens",
    ],
  },
  {
    id: "seo",
    code: "SE",
    title: "SEO Foundations",
    short: "The technical groundwork search engines need.",
    body: "We handle the foundations: clean markup, correct headings, titles and descriptions, a sitemap, and fast pages. Foundations are not a ranking guarantee — they are the part that has to be right before anything else works.",
    includes: [
      "Semantic HTML and heading structure",
      "Titles, meta descriptions, and social previews",
      "Sitemap, robots, and structured data",
    ],
  },
  {
    id: "launch",
    code: "LN",
    title: "Website Launch",
    short: "Domain, hosting, deployment — handled.",
    body: "We take the site from finished to live. If you already have a domain we move it across; if you don't, we help you get one. Hosting is set up and configured before launch day.",
    includes: [
      "Domain setup or transfer assistance",
      "Hosting configuration and deployment",
      "Post-launch checks across devices",
    ],
  },
  {
    id: "updates",
    code: "UP",
    title: "Ongoing Updates",
    short: "Send changes, we make them.",
    body: "Businesses change. New services, new hours, new photos, a new page. Send what you need changed and we handle it — no dashboard to learn, no plugin to update.",
    includes: [
      "Content, photo, and page updates",
      "New sections and pages as you grow",
      "Ongoing maintenance and monitoring",
    ],
  },
];

export type ProcessStep = {
  title: string;
  body: string;
  detail: string;
};

export const processSteps: ProcessStep[] = [
  {
    title: "Tell Us About Your Business",
    body: "We learn about your business, your goals, your customers, and what you want the website to do.",
    detail:
      "A short conversation, not a questionnaire marathon. What you sell, who buys it, what you want more of, and what your current site gets wrong.",
  },
  {
    title: "We Build",
    body: "Better Built designs and develops the website around your business.",
    detail:
      "Design and build happen together. You get a real, working site to look at — not a flat picture of one.",
  },
  {
    title: "Review",
    body: "You review the website and tell us what you want changed.",
    detail:
      "Walk through it on your own phone and laptop. Send notes in plain language. We make the changes.",
  },
  {
    title: "Launch",
    body: "The website goes live and is ready for customers.",
    detail:
      "Domain, hosting, and deployment are handled. We check it across devices after it's live, not before.",
  },
];

export type Faq = { question: string; answer: string };

export const faqs: Faq[] = [
  {
    question: "Is $800 really the whole price?",
    answer:
      "Yes — one payment for the design, the build, and the launch of your website. Ongoing support is separate and entirely optional. If a project needs something well outside a standard business website, we tell you before we start, not after.",
  },
  {
    question: "How long does it take?",
    answer:
      "Most business websites take two to three weeks from the first conversation to launch. The part that usually sets the pace is how quickly we get your content — photos, services, and anything you want said a particular way.",
  },
  {
    question: "Do I have to sign up for the monthly plan?",
    answer:
      "No. The website is yours after launch whether or not you take ongoing support. The monthly plan exists for businesses that would rather send us a message than manage changes themselves.",
  },
  {
    question: "What do you need from me?",
    answer:
      "A conversation about your business, your logo if you have one, any photos you want used, and a rough idea of the services you want featured. We handle the rest, including writing the structure of the pages.",
  },
  {
    question: "What if I already have a website?",
    answer:
      "We redesign existing sites regularly. We'll keep what already works — your domain, your rankings, any content worth carrying over — and rebuild the rest.",
  },
  {
    question: "Who owns the website?",
    answer:
      "You do. The domain stays in your name, and the site is yours. If you ever stop working with us, the website goes with you.",
  },
];
