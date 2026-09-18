-- Architecture Dialogue — seed data
-- Populates the prototype content so the site is not empty on first run.

-- Architects ---------------------------------------------------------------
insert into public.architects (id, name, slug, portrait_url, bio, curatorial_statement, era, location, keywords) values
(
  '10000000-0000-0000-0000-000000000001',
  'Louis I. Kahn',
  'louis-i-kahn',
  'https://lh3.googleusercontent.com/aida-public/AB6AXuBnBjnuOqXAF5BCZOfsiVN24L5SddX4geEhRVo4eC4SuTKGcAQKmrS3i9Yws_NpIP6yHjITnm9-uEoKqXrnCBennWWoxkDrhucLgLer9U2JjPnAR56FzX8gwg4F-sRXuXAjK52QtJaFPBEhQdVDWn8Q6R7WgKi0SSbciBu5SpjQk6Z3TQpV1FDl7Wjh1_NwmkyePzlK0bCoA0KtB9tv971ijs4YirPPx16Ee9TVgw95GD62tvMsgUY7',
  'Estonian-born American architect regarded for his monolithic, monumental forms and poetic articulation of light and raw structure.',
  'Kahn created monumental buildings that convey a spiritual reverence for materials, light, and geometry. His work redefined American modernism through archaic solemnity and profound structural candor.',
  '1901–1974',
  'Philadelphia / Yale School of Architecture',
  array['BRICK & POURED CONCRETE','SERVED & SERVANT SPACES','MONUMENTALITY']
),
(
  '10000000-0000-0000-0000-000000000002',
  'Peter Zumthor',
  'peter-zumthor',
  'https://lh3.googleusercontent.com/aida-public/AB6AXuDFEvoxbKIO1XzciNdMdSmwOYtvGajv5JyX8y7EeNOkCH77zAQNvS8-Pl2mfScIkY1AZ2NfBPXDUZFMXO1rRo23Ug2u4aERwR9MSdJc4PUTSh3YOh68tyeuH3keYdgrcYVEMhrhqxsqzcO5zsnU-yfkPZGsfE2uvGEKEUdwUi2vdHJjx_meDZ0cWN-TEzHPC1KhN24FZJiBSXTNXfI_sf84LrwcSSX3K6aqQ7ycS9FUeWG06zdLEGTU',
  'Swiss architect known for meticulously crafted, atmospherically rich environments that engage all senses.',
  'Zumthor''s practice is rooted in the phenomenological experience of space, material, and light — creating architecture that touches the human spirit through pure, unadorned materiality.',
  '1943–',
  'Haldenstein, Switzerland',
  array['PHENOMENOLOGY','MATERIALITY','CRAFT']
),
(
  '10000000-0000-0000-0000-000000000003',
  'Juhani Pallasmaa',
  'juhani-pallasmaa',
  'https://lh3.googleusercontent.com/aida-public/AB6AXuBZDd5bmYVTVazmL98jB67Z7kTHmwPd-_QLb4BmWrP7g6plNLtYxe8CRmjPRvK0raoKoHZbH9wyme-dUr-YPt7-yuVqlyckTvOQjhcPo6pLQBX9-XLNYn4RxturnXFIzDJEkb3Dnu9BxmnhQmjW8xmcj4wHE32z04U4_xBsjQJJyGlJueZxkUL9yQZTAFOBgXkDOvw7B74dqAw2gon4Apr0NtOF_hGYr5clYmVDpSDzS9hY242JCsPS',
  'Finnish architect and educator known for his critiques of ocularcentrism and his theories on embodied, multisensory architectural experience.',
  'Pallasmaa interrogates the primacy of vision in modern architecture, advocating instead for peripheral, haptic, and auditory dimensions of built space.',
  '1936–',
  'Helsinki, Finland',
  array['PHENOMENOLOGY','EMBODIED EXPERIENCE','ANTI-OCULARCENTRISM']
),
(
  '10000000-0000-0000-0000-000000000004',
  'Lina Bo Bardi',
  'lina-bo-bardi',
  'https://lh3.googleusercontent.com/aida-public/AB6AXuBirbsy73X4RpReosCIn7waClggDXVS5PP-7g9UNzMmZgPAgr2zBrMlTbDiJH3G6x6ItG7_leAqxfvvOfQ8ciw_Dr8C0G8BjPTlAXTTxMqmQBWajM2Oz_iAWU7h56SXZ4CLB9C_4ojqbknc_jx5pztIThefn9_nMJjZCjISACgwoHkkiYCVI86Ose4_6MfOLAnxfOYznX4G8R3lx-Eqw8E1W5Fc9jC4dv9hO1sc3VQSb7HKkLJIEb4c',
  'Italian-Brazilian architect whose bold, socially engaged modernism liberated public space in postwar São Paulo.',
  'Bo Bardi suspended mass to liberate public earth, creating radical communal spaces that center collective life and democratic architecture.',
  '1914–1992',
  'São Paulo, Brazil',
  array['MODERNISM','SOCIAL ARCHITECTURE','CIVIC SPACE']
) on conflict (id) do nothing;

-- Posts --------------------------------------------------------------------
insert into public.posts (id, architect_id, title, slug, excerpt, body, category, cover_image_url, read_time, published_at) values
(
  '20000000-0000-0000-0000-000000000001',
  '10000000-0000-0000-0000-000000000001',
  'Order is: What a Brick Wants to Be',
  'order-is-what-a-brick-wants-to-be',
  'You say to a brick, "What do you want, brick?" And brick says to you, "I like an arch." If you say to brick, "Arches are expensive, and I can use a concrete lintel over an opening," brick says, "I like an arch."',
  $$[
    {"type":"paragraph","content":"If you think of Brick, for instance, you say to Brick, \"What do you want, Brick?\" And Brick says to you, \"I like an arch.\" And if you say to Brick, \"Look, arches are expensive, and I can use a concrete lintel over you. What do you think of that, Brick?\" Brick says, \"I like an arch.\""},
    {"type":"paragraph","content":"It is so important to respect the material you use. You can only do it if you honor the order of its nature. You must not treat the brick as an applied veneer or a silent captive of steel framing. Gravity is the architect's eternal companion; it insists that the weight of the masonry be brought down cleanly through compression to the ground, making visible every joint, mortar bed, and thrust."},
    {"type":"figure","image_url":"https:\/\/lh3.googleusercontent.com\/aida-public\/AB6AXuCTFJqpuLHLs62zjNFvcBQt2rf8irx-TGS6OHutSmZSiez5u8hGrBpZCf2R7Lrl24qrMIJc4_B_otcFKcmG_WNv1uaGklh3sm-DAY-8NanDjK-11MMLHexC3wWdo4ZpHboVlnf-X-_aMjXaC6YV69gPdRbU7NnujhqfZOrR5GTNbyLECUO4fGCzUUwVSIEmnt7YvD8tetmdguKzeOVhc4So7Zwgnfdmai3f2SXZzeJE4UiL4iEidpi6","image_alt":"Close-up photograph of weathered red terracotta brickwork forming a monumental semicircular Roman arch, raking sunlight revealing course textures, tactile mortar lines, deep shadow.","figure_caption":"Vaulted compressive joint study, Ahmedabad.","figure_year":"1962"},
    {"type":"pull_quote","quote_text":"Architecture does not exist. Only a work of architecture exists. Architecture exists in the mind.","quote_author":"Louis I. Kahn, Master Class Notes"},
    {"type":"paragraph","content":"A room is not a room without natural light. Natural light gives the time of day and the mood of the seasons to enter and touch the stone. A brick wall yearns for an opening so that its interior shadow can meet the illumination of the exterior sky. To place an opening is not merely to punch a void; it is to create a dialogue between weight and radiance."},
    {"type":"paragraph","content":"When an architect grasps this rhythm, design ceases to be a willful stylistic imposition. Instead, it transforms into an unveiling — a quiet listening to what the room desires to become."}
  ]$$,
  'Tectonics',
  'https://lh3.googleusercontent.com/aida-public/AB6AXuCGWr_zxt1FlcGqoQV_2GvKCPWOG1EhkR-l4KkACae044kABk_31vE9TtrSiBi_kaYx83CQdsKDIOgmfOxqvePPHNwX_Xdb9-b6mLhgC5PPA-aLTSCnu8eIy5wmGZD-lAlgTAxFYrwG_CNuCFVEz6XZR2GmO4U4LPdoqind2rrUqIcU40siRUMf6U-YKAsTPuQn-UZYjxtKzL0LRZidX_DvI6dbmkZBy2YbRpK1y6ew5e0jCH8IX8Wzsw',
  '6 min',
  '1961-10-14'
),
(
  '20000000-0000-0000-0000-000000000002',
  '10000000-0000-0000-0000-000000000003',
  'The Eyes of the Skin: Architecture and Peripheral Sensation',
  'the-eyes-of-the-skin-architecture-and-peripheral-sensation',
  'Architecture is deeply engaged in the existential questions of being in the world. It frames human presence, mediates light and dark, and grounds our fragile somatic memory within tangible tactility.',
  $$[
    {"type":"paragraph","content":"Architecture is deeply engaged in the existential questions of being in the world. It frames human presence, mediates light and dark, and grounds our fragile somatic memory within tangible tactility. The eye dominates modern architectural culture, yet the most profound spatial experiences arise through peripheral vision, tactile reverberations, and the suppression of ocularcentrism."},
    {"type":"paragraph","content":"When we enter a space, our senses register far more than what the eye captures. The coolness of stone beneath our fingertips, the echo of footsteps in a vaulted hall, the scent of rain on concrete — these peripheral sensations constitute the true atmosphere of architecture."}
  ]$$,
  'Phenomenology',
  'https://lh3.googleusercontent.com/aida-public/AB6AXuCCeqH40uW2qYXU-S2aFFpStdvwm_lagFEkqR3MtDz2fmbzAYajpTbLnUf8FpEOX8KZVdpmPMXefsPZEtQ2LCDXPwHVEKi6td6oE5n39nQDvICmFfNl6QL5kxWWqTRGi7vPd45qSaKPYVJJgiOD7YKaC6OYO1mFIWThY7wUAIZnPZ2t64V7rHcWMRKsVdNc-alZGP4fdjMiwnb2F1w5_HOu99UA14g745BN7woAN7PkzPTG1D7FQrdn0Q',
  '7 min',
  '1964-01-01'
),
(
  '20000000-0000-0000-0000-000000000003',
  '10000000-0000-0000-0000-000000000004',
  'Stones Against the Sky: Glass and Concrete in São Paulo',
  'stones-against-the-sky-glass-and-concrete-in-sao-paulo',
  'Linear time is a Western invention; time is not linear, it is a marvelous tangle where, at any moment, points can be chosen and solutions invented, without beginning or end.',
  $$[
    {"type":"paragraph","content":"Linear time is a Western invention; time is not linear, it is a marvelous tangle where, at any moment, points can be chosen and solutions invented, without beginning or end. In the brutal tropical light of São Paulo, concrete performs differently than it does under northern skies — it sweats, weathers, and becomes an organism."},
    {"type":"pull_quote","quote_text":"Suspending mass to liberate public earth: reflections on MASP and the social cadence of collective space.","quote_author":"Lina Bo Bardi"},
    {"type":"paragraph","content":"The MASP floats above the ground on four colossal red-painted pillars, liberating the earth beneath for public life. This suspension is not merely structural bravado — it is a radical act of democratic space-making, a gesture of civic generosity that prioritizes the collective over the monumental."}
  ]$$,
  'Modernism',
  'https://lh3.googleusercontent.com/aida-public/AB6AXuC0BXicV8EK5FgwNNb_1VH_hbeID0IGN5tQqXIM9Txk8YuqtXJIpeOywvSBIECqF2-5gGkNSgKrIpYsJR2GSDLPxLyt41NJyT1p3jMktcF7sp3ow5nYmx6Oj2017j3HzlSOhEmqs-t1c7b2w2XZWVo_M1OH8S-nNkHsrHkbbUb9J-mfgLiHa-uUx_oBkCDf-usyDY9lRMFE_zq7rw-lnkxyFuwPwXzIJUri3j6k6U1F9J8M4PEfhGj7Wg',
  '9 min',
  '1968-05-20'
),
(
  '20000000-0000-0000-0000-000000000004',
  '10000000-0000-0000-0000-000000000002',
  'Atmospheres: Architectural Environments',
  'atmospheres-architectural-environments',
  'Quality architecture to me is when a building moves me. How do people design things with such a presence, with such a physical touch that it grips you immediately upon entering?',
  $$[
    {"type":"paragraph","content":"Quality architecture to me is when a building moves me. How do people design things with such a presence, with such a physical touch that it grips you immediately upon entering? Atmosphere is the total impression that comes from the interplay of light, space, sound, temperature, and the objects within."},
    {"type":"pull_quote","quote_text":"Architecture is not about form or construction alone, but about creating spaces that touch the human spirit through materiality and light.","quote_author":"Peter Zumthor"}
  ]$$,
  'Atmosphere',
  'https://lh3.googleusercontent.com/aida-public/AB6AXuCCeqH40uW2qYXU-S2aFFpStdvwm_lagFEkqR3MtDz2fmbzAYajpTbLnUf8FpEOX8KZVdpmPMXefsPZEtQ2LCDXPwHVEKi6td6oE5n39nQDvICmFfNl6QL5kxWWqTRGi7vPd45qSaKPYVJJgiOD7YKaC6OYO1mFIWThY7wUAIZnPZ2t64V7rHcWMRKsVdNc-alZGP4fdjMiwnb2F1w5_HOu99UA14g745BN7woAN7PkzPTG1D7FQrdn0Q',
  '5 min',
  '1996-08-01'
),
(
  '20000000-0000-0000-0000-000000000005',
  '10000000-0000-0000-0000-000000000003',
  'The Architecture of the Senses',
  'the-architecture-of-the-senses',
  'An inquiry into peripheral vision, tactile reverberations, and the suppression of ocularcentrism in modern spaces.',
  $$[
    {"type":"paragraph","content":"An inquiry into peripheral vision, tactile reverberations, and the suppression of ocularcentrism in modern spaces. Our eyes have been trained to judge architecture by its visual form alone, yet the most memorable buildings communicate through their material presence — through weight, temperature, and silence."}
  ]$$,
  'Phenomenology',
  'https://lh3.googleusercontent.com/aida-public/AB6AXuCCeqH40uW2qYXU-S2aFFpStdvwm_lagFEkqR3MtDz2fmbzAYajpTbLnUf8FpEOX8KZVdpmPMXefsPZEtQ2LCDXPwHVEKi6td6oE5n39nQDvICmFfNl6QL5kxWWqTRGi7vPd45qSaKPYVJJgiOD7YKaC6OYO1mFIWThY7wUAIZnPZ2t64V7rHcWMRKsVdNc-alZGP4fdjMiwnb2F1w5_HOu99UA14g745BN7woAN7PkzPTG1D7FQrdn0Q',
  '5 min',
  '2005-03-15'
),
(
  '20000000-0000-0000-0000-000000000006',
  '10000000-0000-0000-0000-000000000004',
  'Silences in Concrete and Glass',
  'silences-in-concrete-and-glass',
  'Suspending mass to liberate public earth: reflections on MASP and the social cadence of collective space in São Paulo.',
  $$[
    {"type":"paragraph","content":"Suspending mass to liberate public earth: reflections on MASP and the social cadence of collective space in São Paulo. The silence between two columns of concrete is not empty — it is a charged interval, a breath held by the structure before gravity releases it."}
  ]$$,
  'Civic Tectonics',
  'https://lh3.googleusercontent.com/aida-public/AB6AXuC0BXicV8EK5FgwNNb_1VH_hbeID0IGN5tQqXIM9Txk8YuqtXJIpeOywvSBIECqF2-5gGkNSgKrIpYsJR2GSDLPxLyt41NJyT1p3jMktcF7sp3ow5nYmx6Oj2017j3HzlSOhEmqs-t1c7b2w2XZWVo_M1OH8S-nNkHsrHkbbUb9J-mfgLiHa-uUx_oBkCDf-usyDY9lRMFE_zq7rw-lnkxyFuwPwXzIJUri3j6k6U1F9J8M4PEfhGj7Wg',
  '7 min',
  '1977-09-01'
) on conflict (id) do nothing;

-- Annotations --------------------------------------------------------------
insert into public.annotations (id, post_id, user_id, author_name, author_initials, author_affiliation, body, likes, created_at) values
(
  '30000000-0000-0000-0000-000000000001',
  '20000000-0000-0000-0000-000000000001',
  null,
  'Elena Rostova',
  'ER',
  'Tectonics Lab',
  'The insistence on the arch isn''t decorative nostalgia; it is the mathematical consequence of unreinforced masonry. Kahn understood material consciousness far ahead of computational tectonic theory.',
  24,
  now() - interval '2 hours'
),
(
  '30000000-0000-0000-0000-000000000002',
  '20000000-0000-0000-0000-000000000001',
  null,
  'Prof. Julian Thorne',
  'JT',
  'Penn Archives',
  '"A room is not a room without natural light." One is reminded immediately of the Exeter Library central atrium. The monumental circular cutouts are essentially light wells celebrating Kahn''s dialogue with the void.',
  41,
  now() - interval '1 day'
),
(
  '30000000-0000-0000-0000-000000000003',
  '20000000-0000-0000-0000-000000000001',
  null,
  'Sarah K.',
  'SK',
  'Studio Arch',
  'We visited Exeter last autumn and this dialogue with the brick wall feels utterly physical on site. The arch represents the compression of collective will.',
  18,
  now() - interval '1 day'
),
(
  '30000000-0000-0000-0000-000000000004',
  '20000000-0000-0000-0000-000000000001',
  null,
  'Prof. M. Rossi',
  'MR',
  'Penn Archives',
  'Crucial to note that Kahn''s Roman bricks in Exeter were custom-fabricated to achieve a denser, longer horizon line across the interior voids.',
  42,
  now() - interval '3 days'
) on conflict (id) do nothing;