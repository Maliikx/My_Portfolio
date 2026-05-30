export const selectedWork = [
  {
    slug: "nour-lenses",
    title: "Nour Store lenses",
    imgPath: "/nourLenses/nour0.gif",
    description:
      "Redesigned and optimized the e-commerce homepage, built custom offer funnels, interactive UI components, and ensured fast, responsive, and conversion-focused user experience across all devices.",
    link: "https://q0mir3-yr.myshopify.com/", 
    date: "2025",
    job: "Developed - Designed",
    hue: "920F41",
    mission: "After successfully redesigning the client's wordpress website, the client required a full ground-up Shopify build — not a re-skin, but a new store with its own design system, payment infrastructure, and funnel architecture. The primary business goal was increasing average order value through smart upselling and reducing checkout abandonment by integrating Paymob, a locally trusted payment gateway. The core constraint was that everything — payment flow, funnel pages, UI components — had to be built as custom Liquid sections with no reliance on premium theme features.",

    challenge: "The store needed a complete set of custom funnel pages — built as Liquid sections — to handle single-page purchase flows with embedded upsell and product-bundling logic, none of which existed in any available theme. Designing every page from scratch — product listings, cart, landing sections, and offer funnels — meant establishing a coherent visual system without an existing reference, which I resolved by building reusable Liquid component patterns to enforce consistency across the store. Ensuring full responsiveness across the diverse range of devices common in the Egyptian market required careful testing and iterative CSS refinement on every custom section.",

    results: "The store launched with a fully functional Paymob checkout, custom funnel pages with upsell logic, and a complete page design suite with a mix of custom and theme components. The Liquid-based UI block system is modular and extensible, so the client can add new funnel variants without additional development overhead. This project reinforced a core insight: working within a platform's templating constraints while meaningfully extending them requires understanding both the platform's architecture and the business logic it needs to serve — a balance between engineering discipline and product thinking.",
 
    gallery: [
      {
        src: "/nourLenses/nour1.png",
        alt: "Hero Section",
      },
      {
        src: "/nourLenses/nour2.png",
        alt: "Best Selling",
      },
      {
        src: "/nourLenses/nour3.png",
        alt: "Funnel Page",
      },
      {
        src: "/nourLenses/nour4.png",
        alt: "Social Media Posts",
      },
    ],
  },

  {
    slug: "bedir-home-recliner",
    title: "Bedir Home Recliner",
    imgPath: "/gifs/bedir.gif",
    description:
      "Complete redesign of the whole E-Commerce store and built an animated SEO-friendly landing page compatible across all screen sizes ",
    link: "https://bedireg.com",
    date: "2025",
    job: "Developed - Designed - SEO",
    hue: "007996",
    mission: "The client needed a developer to inherit a partially built, undocumented WooCommerce store and bring it to a launch-ready state — without starting over. The goals were modernizing the visual identity, improving product discoverability through multi-attribute filtering with zero page reloads, and strengthening organic visibility through structured on-site SEO. The binding constraint was working from a broken starting point with design inconsistencies that had to be resolved before any new functionality could be layered on top.",
    challenge: "Taking over mid-project meant auditing an undocumented codebase before writing a single line of new code — mapping existing components, cataloguing design inconsistencies, and flagging performance issues that would have compounded if left unaddressed. The redesign required establishing a unified visual language that felt like a brand evolution rather than an abrupt break, which I achieved by building a lightweight Elementor component system that enforced consistency across every page and cut visual inconsistency to zero across the redesigned site. The custom JavaScript product filter enabled multi-attribute filtering by type, size, and material with no page reloads — significantly reducing browse friction on a catalogue-heavy store where users previously had to scroll through unfiltered listings. On-site SEO work covered heading hierarchy restructuring, meta content optimization, asset compression, and full product data taxonomy — establishing the technical foundation for organic search growth from a site that had none.",
    results: "The store launched with a coherent visual identity, zero-reload multi-attribute product filtering, and a new landing page built around conversion principles — all delivered from a broken handover state. The SEO groundwork restructured the entire site's content and metadata architecture, creating a clean foundation for organic visibility growth. The central learning was that inheriting someone else's incomplete work requires the same analytical rigor as a greenfield build — the audit phase proved as strategically valuable as any implementation phase, and skipping it would have compounded every problem the previous developer left behind.",

    gallery: [
      {
        src: "/bedir/bedir1.jpeg",
        alt: "Hero Section",
      },
      {
        src: "/bedir/bedir3.png",
        alt: "Product Catalogue",
      },
      {
        src: "/bedir/bedir4.png",
        alt: "Single Product Page",
      },
      {
        src: "/bedir/bedir5.png",
        alt: "Cart Page",
      },
    ],
  },

  {
    slug: "zanzibar-heritage-villas",
    title: "Zanzibar Heritage Villas",
    imgPath: "/gifs/zanzibar.gif",
    description:
      "Designed a custom animated hero section and transformed PDF slides into responsive web sections, maintaining brand aesthetics and cross-device performance",
    link: "https://Heritage.Villas",
    date: "2025",
    job: "Developed",
    hue: "d2a250",
    mission: "The client needed an animated hero section that created immediate emotional resonance on page load — translating a luxury heritage villa brand's identity into a cinematic web entrance with GSAP. The section had to be converted from a static design file with pixel-perfect accuracy, remain fully responsive with zero layout shift across all screen sizes, and be delivered within a fixed 10-day deadline in close collaboration with the project lead.",
    challenge: "The core tension was delivering cinematic animation quality without the performance cost that typically accompanies it — luxury hospitality sites carry high visual expectations, but slow load times directly undermine the premium experience they aim to create. I resolved this by profiling and optimizing all assets before writing any animation logic, compressing and converting every media file to modern formats so the visual budget was established before motion was layered on top. The GSAP timeline was structured to stagger element reveals rather than loading everything simultaneously, reducing perceived load time while creating the sequenced, editorial entrance the brand required. Achieving pixel-perfect accuracy demanded iterative comparison against the original design file at every stage, with particular attention to typographic spacing and easing curves that are easy to approximate but hard to get exactly right. Delivering within 10 days required daily checkpoints with the project lead and a strict scope boundary that we agreed on at the start — preventing feature additions from pushing past the deadline.",
    results: "The hero section launched with a 25% improvement in page load speed versus the pre-optimization baseline, while fully preserving the cinematic animation quality the brand required — proving that performance and motion design are not competing priorities when asset optimization precedes animation work. The section was delivered pixel-perfect and on time within the 10-day window with no scope overrun. The defining insight from this project was that motion and performance respond to the same underlying principle: user attention is finite, so both assets and animations must earn their place in a priority-ordered sequence — assets load by weight, animations reveal by narrative importance.",
    gallery: [
      {
        src: "/zanzibar/zan1.jpeg",
        alt: "Scroll animation",
      },
      {
        src: "/zanzibar/zan2.jpeg",
        alt: "Hero Section",
      },
      {
        src: "/zanzibar/zan3.jpeg",
        alt: "Stats Section",
      },
      {
        src: "/zanzibar/zan4.jpeg",
        alt: "Mission Section",
      },
    ],
  },

  {
    slug: "inci-flex-egypt",
    title: "Inci-flex-Egypt",
    imgPath: "/inciFlexHero.png",
    description:
      "Developed a responsive, custom website for the Egyptian branch of INCI-FLEX, a multinational flexographic printing company.",
    link: "https://www.inciflexegypt.com/",
    date: "2024",
    job: "Developed - Designed - SEO",
    hue: "",
    mission: "INCI-FLEX Egypt needed a standalone React.js web presence localized for the Egyptian B2B market, with a direct inquiry channel that automatically routed submissions to the regional team — eliminating manual email handling entirely. The user goal was enabling industrial procurement leads to find product information and submit inquiries with minimal friction, on the mobile-first devices that dominate Egyptian internet access. The constraint was maintaining full alignment with the parent company's international brand guidelines while restructuring content hierarchy and site architecture for a regional audience with different information priorities.",
    challenge: "Building in React.js from Figma designs meant architecting a component system where every element accepted localized text as props — making the site content-agnostic so the regional team could update copy without touching layout code, and reducing future maintenance overhead to near zero. Integrating the form-to-email API required handling submission states, error messaging, and network failures gracefully on mobile connections. Content localization required working directly with the regional team to restructure the information hierarchy for an Egyptian B2B audience — diverging from the international site's architecture in several places — which reinforced that localization is a UX problem, not a translation task.",
    results: "The form-to-email integration reduced inquiry response time by 40% by eliminating manual routing from the team's workflow entirely. Page load time dropped 30% against the pre-optimization baseline, and mobile usability scores improved 25% — metrics that carry direct commercial weight in a market where mobile is the primary access point. Collaborative Git workflow across the regional team kept the codebase clean and conflict-free throughout. The deepest learning was that content architecture is a design decision with the same strategic weight as visual or interaction design — restructuring an information hierarchy for a new audience requires user understanding, not just language skills, and that shift in thinking has carried into every project since.",
    gallery: [
      {
        src: "/inciFlex/inci1.png",
        alt: "Hero Section",
      },
      {
        src: "/inciFlex/inci2.png",
        alt: "Meet The Team",
      },
      {
        src: "/inciFlex/inci3.png",
        alt: "News Section",
      },
      {
        src: "/inciFlex/inci4.png",
        alt: "Contact Section",
      },
    ],
  },
  // {
  //     'title' : 'Malak photograpy',
  //     'imgPath' : './inciFlexHero.png',
  //     'description' : 'Custom built website for the Egyptian branch of the international company INCI-FLEX.',
  //     'link' : 'https://malak-photography.vercel.app/',
  //     'date' : '2024',
  //     'job': 'Developed - Designed - SEO'
  // },
  {
    slug: "soul-support",
    title: "Soul Support",
    imgPath: "/soulSupport/ss0.jpg",
    description:
      "My Graduation project an AI-powered Mental Health Support cross-platform App  which was Awarded #1 in the department",
    link: "https://github.com/Maliikx/soul_support",
    date: "2025",
    job: "Developed - Designed",
    hue: "01709A",
    mission: "Soul Support required a cross-platform Flutter application serving two distinct user groups — patients managing their mental wellbeing daily, and therapists monitoring progress and managing appointments — within a single coherent product. The user value goals were reducing friction in mental health self-management for patients and giving therapists a clear, data-driven view of patient activity between sessions across six core feature modules. The constraint was delivering a production-quality, fully animated application within a fixed academic timeline, with a faculty panel evaluation as the hard delivery deadline.",
    challenge: "Building for two user roles meant designing an information architecture that kept each experience focused and purposeful without duplicating state logic across the widget tree — a structural decision that shaped every implementation choice. I led front-end development across all six core modules — mood tracking, journal, music and exercise recommendations, appointment calendar, and analytics charts — each requiring its own data flow, UI pattern, and state management approach. Designing major screens from scratch required establishing a visual language that felt clinically trustworthy without feeling cold or clinical — a tonal balance that took multiple design iterations to land correctly for a mental health context. Custom animations were a deliberate product decision: in a mental health app, smooth and purposeful transitions directly reduce cognitive friction and communicate safety — so I treated every animation as a micro-interaction with therapeutic intent, not decoration. Widget tree optimization required profiling rebuild cycles, identifying expensive recomposition triggers, and restructuring subtrees to minimize unnecessary rebuilds.",
    results: "Soul Support launched as a fully functional cross-platform application covering the complete patient journey across six feature modules — from daily mood check-ins to therapist-reviewed analytics charts — with custom animations throughout and a 25% improvement in screen load time over the unoptimized baseline. The project was awarded first place by the Alexandria University faculty panel, recognized for both its technical execution and its meaningful application to real-world mental healthcare. The defining learning was that UI in a mental health context carries responsibility beyond aesthetics: every timing decision, color choice, and transition is a micro-communication about safety and calm — and internalizing that raised my standard for what intentional design actually means.",
    gallery: [
      {
        src: "/soulSupport/ss5.gif",
        alt: "Scroll animation",
      },
      {
        src: "/soulSupport/ss6.gif",
        alt: "Hero Section",
      },
    ],
  },
];
