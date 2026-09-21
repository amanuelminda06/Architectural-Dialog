import type { Architect, Post, Annotation } from "./types";

export const demoArchitects: Architect[] = [
  {
    id: "arch-kahn",
    name: "Louis I. Kahn",
    slug: "louis-i-kahn",
    portrait_url: "/plates/kahn-portrait.jpg",
    bio: "Estonian-born American architect regarded for his monolithic, monumental forms and poetic articulation of light and raw structure.",
    curatorial_statement:
      "Kahn created monumental buildings that convey a spiritual reverence for materials, light, and geometry. His work redefined American modernism through archaic solemnity and profound structural candor.",
    era: "1901–1974",
    location: "Philadelphia / Yale School of Architecture",
    keywords: ["BRICK & POURED CONCRETE", "SERVED & SERVANT SPACES", "MONUMENTALITY"],
  },
  {
    id: "arch-zumthor",
    name: "Peter Zumthor",
    slug: "peter-zumthor",
    portrait_url:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuDFEvoxbKIO1XzciNdMdSmwOYtvGajv5JyX8y7EeNOkCH77zAQNvS8-Pl2mfScIkY1AZ2NfBPXDUZFMXO1rRo23Ug2u4aERwR9MSdJc4PUTSh3YOh68tyeuH3keYdgrcYVEMhrhqxsqzcO5zsnU-yfkPZGsfE2uvGEKEUdwUi2vdHJjx_meDZ0cWN-TEzHPC1KhN24FZJiBSXTNXfI_sf84LrwcSSX3K6aqQ7ycS9FUeWG06zdLEGTU",
    bio: "Swiss architect known for meticulously crafted, atmospherically rich environments that engage all senses.",
    curatorial_statement:
      "Zumthor's practice is rooted in the phenomenological experience of space, material, and light — creating architecture that touches the human spirit through pure, unadorned materiality.",
    era: "1943–",
    location: "Haldenstein, Switzerland",
    keywords: ["PHENOMENOLOGY", "MATERIALITY", "CRAFT"],
  },
  {
    id: "arch-pallasmaa",
    name: "Juhani Pallasmaa",
    slug: "juhani-pallasmaa",
    portrait_url:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuBZDd5bmYVTVazmL98jB67Z7kTHmwPd-_QLb4BmWrP7g6plNLtYxe8CRmjPRvK0raoKoHZbH9wyme-dUr-YPt7-yuVqlyckTvOQjhcPo6pLQBX9-XLNYn4RxturnXFIzDJEkb3Dnu9BxmnhQmjW8xmcj4wHE32z04U4_xBsjQJJyGlJueZxkUL9yQZTAFOBgXkDOvw7B74dqAw2gon4Apr0NtOF_hGYr5clYmVDpSDzS9hY242JCsPS",
    bio: "Finnish architect and educator known for his critiques of ocularcentrism and his theories on embodied, multisensory architectural experience.",
    curatorial_statement:
      "Pallasmaa interrogates the primacy of vision in modern architecture, advocating instead for peripheral, haptic, and auditory dimensions of built space.",
    era: "1936–",
    location: "Helsinki, Finland",
    keywords: ["PHENOMENOLOGY", "EMBODIED EXPERIENCE", "ANTI-OCULARCENTRISM"],
  },
  {
    id: "arch-bobardi",
    name: "Lina Bo Bardi",
    slug: "lina-bo-bardi",
    portrait_url:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuBirbsy73X4RpReosCIn7waClggDXVS5PP-7g9UNzMmZgPAgr2zBrMlTbDiJH3G6x6ItG7_leAqxfvvOfQ8ciw_Dr8C0G8BjPTlAXTTxMqmQBWajM2Oz_iAWU7h56SXZ4CLB9C_4ojqbknc_jx5pztIThefn9_nMJjZCjISACgwoHkkiYCVI86Ose4_6MfOLAnxfOYznX4G8R3lx-Eqw8E1W5Fc9jC4dv9hO1sc3VQSb7HKkLJIEb4c",
    bio: "Italian-Brazilian architect whose bold, socially engaged modernism liberated public space in postwar São Paulo.",
    curatorial_statement:
      "Bo Bardi suspended mass to liberate public earth, creating radical communal spaces that center collective life and democratic architecture.",
    era: "1914–1992",
    location: "São Paulo, Brazil",
    keywords: ["MODERNISM", "SOCIAL ARCHITECTURE", "CIVIC SPACE"],
  },
];

const salkPlate = "/plates/salk.png";
const brickFigure = "/plates/brickcoursing.png";
const thermVals = "/plates/vals.png";
const brickPlate = "/plates/brick-band.jpg";

export const demoPosts: Post[] = [
  {
    id: "post-1",
    slug: "order-is-what-a-brick-wants-to-be",
    title: "Order is: What a Brick Wants to Be",
    excerpt:
      'You say to a brick, "What do you want, brick?" And brick says to you, "I like an arch." If you say to brick, "Arches are expensive, and I can use a concrete lintel over an opening," brick says, "I like an arch."',
    body: [
      {
        type: "paragraph",
        content:
          'If you think of Brick, for instance, you say to Brick, "What do you want, Brick?" And Brick says to you, "I like an arch." And if you say to Brick, "Look, arches are expensive, and I can use a concrete lintel over you. What do you think of that, Brick?" Brick says, "I like an arch."',
      },
      {
        type: "paragraph",
        content:
          "It is so important to respect the material you use. You can only do it if you honor the order of its nature. You must not treat the brick as an applied veneer or a silent captive of steel framing. Gravity is the architect's eternal companion; it insists that the weight of the masonry be brought down cleanly through compression to the ground, making visible every joint, mortar bed, and thrust.",
      },
      {
        type: "figure",
        image_url: brickFigure,
        image_alt:
          "Intimate close-up photograph of weathered red terracotta brickwork forming a monumental semicircular Roman arch, raking sunlight revealing course textures, tactile mortar lines, deep shadow, modernist architectural monograph photography.",
        figure_caption:
          "Vaulted compressive joint study, Ahmedabad.",
        figure_year: "1962",
      },
      {
        type: "pull_quote",
        quote_text:
          "Architecture does not exist. Only a work of architecture exists. Architecture exists in the mind.",
        quote_author: "Louis I. Kahn, Master Class Notes",
      },
      {
        type: "paragraph",
        content:
          "A room is not a room without natural light. Natural light gives the time of day and the mood of the seasons to enter and touch the stone. A brick wall yearns for an opening so that its interior shadow can meet the illumination of the exterior sky. To place an opening is not merely to punch a void; it is to create a dialogue between weight and radiance.",
      },
      {
        type: "paragraph",
        content:
          "When an architect grasps this rhythm, design ceases to be a willful stylistic imposition. Instead, it transforms into an unveiling — a quiet listening to what the room desires to become.",
      },
    ],
    category: "Tectonics",
    read_time: "6 min",
    published_at: "October 14, 1961",
    cover_image_url: salkPlate,
    architect_id: "arch-kahn",
  },
  {
    id: "post-2",
    slug: "the-eyes-of-the-skin-architecture-and-peripheral-sensation",
    title: "The Eyes of the Skin: Architecture and Peripheral Sensation",
    excerpt:
      "Architecture is deeply engaged in the existential questions of being in the world. It frames human presence, mediates light and dark, and grounds our fragile somatic memory within tangible tactility.",
    body: [
      {
        type: "paragraph",
        content:
          "Architecture is deeply engaged in the existential questions of being in the world. It frames human presence, mediates light and dark, and grounds our fragile somatic memory within tangible tactility. The eye dominates modern architectural culture, yet the most profound spatial experiences arise through peripheral vision, tactile reverberations, and the suppression of ocularcentrism.",
      },
      {
        type: "paragraph",
        content:
          "When we enter a space, our senses register far more than what the eye captures. The coolness of stone beneath our fingertips, the echo of footsteps in a vaulted hall, the scent of rain on concrete — these peripheral sensations constitute the true atmosphere of architecture.",
      },
    ],
    category: "Phenomenology",
    read_time: "7 min",
    published_at: "1964",
    cover_image_url: thermVals,
    architect_id: "arch-pallasmaa",
  },
  {
    id: "post-3",
    slug: "stones-against-the-sky-glass-and-concrete-in-sao-paulo",
    title: "Stones Against the Sky: Glass and Concrete in São Paulo",
    excerpt:
      "Linear time is a Western invention; time is not linear, it is a marvelous tangle where, at any moment, points can be chosen and solutions invented, without beginning or end.",
    body: [
      {
        type: "paragraph",
        content:
          "Linear time is a Western invention; time is not linear, it is a marvelous tangle where, at any moment, points can be chosen and solutions invented, without beginning or end. In the brutal tropical light of São Paulo, concrete performs differently than it does under northern skies — it sweats, weathers, and becomes an organism.",
      },
      {
        type: "paragraph",
        content:
          "The MASP floats above the ground on four colossal red-painted pillars, liberating the earth beneath for public life. This suspension is not merely structural bravado — it is a radical act of democratic space-making, a gesture of civic generosity that prioritizes the collective over the monumental.",
      },
    ],
    category: "Modernism",
    read_time: "9 min",
    published_at: "1968",
    cover_image_url: brickPlate,
    architect_id: "arch-bobardi",
  },
  {
    id: "post-4",
    slug: "atmospheres-architectural-environments",
    title: "Atmospheres: Architectural Environments",
    excerpt:
      "Quality architecture to me is when a building moves me. How do people design things with such a presence, with such a physical touch that it grips you immediately upon entering?",
    body: [
      {
        type: "paragraph",
        content:
          "Quality architecture to me is when a building moves me. How do people design things with such a presence, with such a physical touch that it grips you immediately upon entering? Atmosphere is the total impression that comes from the interplay of light, space, sound, temperature, and the objects within.",
      },
    ],
    category: "Atmosphere",
    read_time: "5 min",
    published_at: "1996",
    cover_image_url: thermVals,
    architect_id: "arch-zumthor",
  },
  {
    id: "post-5",
    slug: "the-architecture-of-the-senses",
    title: "The Architecture of the Senses",
    excerpt:
      "An inquiry into peripheral vision, tactile reverberations, and the suppression of ocularcentrism in modern spaces.",
    body: [
      {
        type: "paragraph",
        content:
          "An inquiry into peripheral vision, tactile reverberations, and the suppression of ocularcentrism in modern spaces. Our eyes have been trained to judge architecture by its visual form alone, yet the most memorable buildings communicate through their material presence — through weight, temperature, and silence.",
      },
    ],
    category: "Phenomenology",
    read_time: "5 min",
    published_at: "2005",
    cover_image_url: thermVals,
    architect_id: "arch-pallasmaa",
  },
  {
    id: "post-6",
    slug: "silences-in-concrete-and-glass",
    title: "Silences in Concrete and Glass",
    excerpt:
      "Suspending mass to liberate public earth: reflections on MASP and the social cadence of collective space in São Paulo.",
    body: [
      {
        type: "paragraph",
        content:
          "Suspending mass to liberate public earth: reflections on MASP and the social cadence of collective space in São Paulo. The silence between two columns of concrete is not empty — it is a charged interval, a breath held by the structure before gravity releases it.",
      },
    ],
    category: "Civic Tectonics",
    read_time: "7 min",
    published_at: "1977",
    cover_image_url: brickPlate,
    architect_id: "arch-bobardi",
  },
];

export const demoAnnotations: Annotation[] = [
  {
    id: "ann-1",
    post_id: "post-1",
    author_name: "Elena Rostova",
    author_initials: "ER",
    author_affiliation: "Tectonics Lab",
    body: "The insistence on the arch isn't decorative nostalgia; it is the mathematical consequence of unreinforced masonry. Kahn understood material consciousness far ahead of computational tectonic theory.",
    likes: 24,
    created_at: "2026-09-16T10:00:00Z",
    created_date_label: "2h ago",
  },
  {
    id: "ann-2",
    post_id: "post-1",
    author_name: "Prof. Julian Thorne",
    author_initials: "JT",
    author_affiliation: "Penn Archives",
    body: '"A room is not a room without natural light." One is reminded immediately of the Exeter Library central atrium. The monumental circular cutouts are essentially light wells celebrating Kahn\'s dialogue with the void.',
    likes: 41,
    created_at: "2026-09-17T08:30:00Z",
    created_date_label: "Yesterday",
  },
  {
    id: "ann-3",
    post_id: "post-1",
    author_name: "Sarah K.",
    author_initials: "SK",
    author_affiliation: "Studio Arch",
    body: "We visited Exeter last autumn and this dialogue with the brick wall feels utterly physical on site. The arch represents the compression of collective will.",
    likes: 18,
    created_at: "2026-09-17T14:00:00Z",
    created_date_label: "Yesterday",
  },
  {
    id: "ann-4",
    post_id: "post-1",
    author_name: "Prof. M. Rossi",
    author_initials: "MR",
    author_affiliation: "Penn Archives",
    body: "Crucial to note that Kahn's Roman bricks in Exeter were custom-fabricated to achieve a denser, longer horizon line across the interior voids.",
    likes: 42,
    created_at: "2026-09-15T11:00:00Z",
    created_date_label: "3d ago",
  },
];
