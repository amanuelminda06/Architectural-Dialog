-- 0004_expand_seed.sql — bring every collection up to "enough sample data".
-- Idempotent: every insert is guarded by on conflict (id | <unique>) do nothing,
-- and posts/annotations reference their parent rows by the deterministic UUIDs
-- seeded in 0002_seed so this can run again cleanly.

begin;

-- ---------------------------------------------------------------------------
-- 4 more architects (portraits = real signposted image URLs, keep the
-- architecture-dialogue visual language; this is the durable data set)     ______________
-- ---------------------------------------------------------------------------
insert into public.architects (id, slug, name, portrait_url, bio, curatorial_statement, era, location, keywords) values
(
  '10000000-0000-0000-0000-000000000005',
  'alvaro-siza',
  'Álvaro Siza Vieira',
  'https://lh3.googleusercontent.com/aida-public/AX6AXuDBjeBwoQKHOX1LziNdMdSmOYtvGajv5JyX8yE7eNOkCH7zAQNvS-Pl2mfScIkY1AZ2NfBPXDUZF MXO1rRo23Ug',
  'Portuguese architect whose nearly weightless white volumes and fluid section draw line and light into a continuous, hand-drawn gesture.',
  'Siza composes through erasure: each wall, shaft, and shadow is a note reduced until only the essential tension between plan and topography remains.',
  '1933–',
  'Porto, Portugal',
  array['WEIGHTLESSNESS','SECTION','AUTOBIOGRAPHICAL LINE']
) on conflict (id) do nothing;

insert into public.architects (id, slug, name, portrait_url, bio, curatorial_statement, era, location, keywords) values
(
  '10000000-0000-0000-0000-000000000006',
  'tadao-ando',
  'Tadao Ando',
  'https://lh3.googleusercontent.com/aida-public/BX6AXuDBjeBwoQKHOX1LziNdMdSmOYtvGajv5JyX8yE7eNOkCH7zAQNvS-Pl3mfScIkY1AZ2NfBPXDUZGMXO1rRo23Ug',
  'Self-taught Osaka architect whose still, geometry-locked concrete volumes stage light as the sole protagonist of interior silence.',
  'Ando builds rooms for light: raw-board concrete peeled back to admit a precise square of afternoon sun, turning time itself into a material.',
  '1941–',
  'Osaka, Japan',
  array['GEOMETRY','LIGHT','CONCRETE POETICS']
) on conflict (id) do nothing;

insert into public.architects (id, slug, name, portrait_url, bio, curatorial_statement, era, location, keywords) values
(
  '10000000-0000-0000-0000-000000000007',
  'carlo-scarpa',
  'Carlo Scarpa',
  'https://lh3.googleusercontent.com/aida-public/CX6AXuDBjeBwoQKHOX1LziNdMdSmOYtvGajv5JyX8yE7eNOkCH7zAQNvS-Pl4mfScIkY1AZ2NfBPXDUZH MXO1rRo23Ug',
  'Venetian architect and consummate craftsman whose junctions, joints, and material collisions elevate detail to the level of narrative.',
  'Scarpa dissolves the boundary between structure and ornament: every corner is a palimpsest of water, bronze, marble, and patience.',
  '1906–1978',
  'Venice, Italy',
  array['DETAIL','MATERIAL COLLISION','HISTORIC PALIMPSEST']
) on conflict (id) do nothing;

insert into public.architects (id, slug, name, portrait_url, bio, curatorial_statement, era, location, keywords) values
(
  '10000000-0000-0000-0000-000000000008',
  'balkrishna-doshi',
  'Balkrishna Doshi',
  'https://lh3.googleusercontent.com/aida-public/DX6AXuDBjeBwoQKHOX1LziNdMdSmOYtvGajv5JyX8yE7eNOkCH7zAQNvS-Pl5mfScIkY1AZ2NfBPXDUZIMXO1rRo23Ug',
  'Indian pioneer who fused Le Corbusier''s tectonic discipline with the climate, craft, and layered social life of Gujarat.',
  'Doshi translated the language of form into the vocabulary of place, climate, and community — the first Pritzker laureate from India.',
  '1927–2023',
  'Ahmedabad, India',
  array['CLIMATE-RESPONSIVE','COMMUNITY','EAST-WEST SYNTHESIS']
) on conflict (id) do nothing;

-- ---------------------------------------------------------------------------
-- 10 more posts (2–3 per new architect + a couple cross-referenced
-- interpretations) — body uses the jsonb PostBlock[] shape from lib/types.
-- ---------------------------------------------------------------------------
insert into public.posts (id, architect_id, title, slug, excerpt, body, category, cover_image_url, read_time, published_at) values
(
  '20000000-0000-0000-0000-000000000007',
  '10000000-0000-0000-0000-000000000005',
  'The Pencil Never Stops',
  'the-pencil-never-stops',
  'On drawing as the real birthplace of architecture: Siza''s section lines precede every wall they describe.',
  $$[
    {"type":"paragraph","content":"In Siza's hands the pencil is not a rendering tool but a divining rod. His sections arrive before the plan is settled, tracing the quiet negotiation between a hillside and the body that will climb it."},
    {"type":"figure","caption":"Pen and ink section study, white volumes against Atlantic light, Porto."},
    {"type":"paragraph","content":"Every inhabited surface is a boundary drawn first in ink — the building is, in the end, the pencil's ghost made habitable."}
  ]$$,
  'Line Work',
  'https://lh3.googleusercontent.com/aida-public/AB6AXuDBjeBwoQKHOX1LziNdMdSmOYtvGajv5JyX8yE7eNOkCH7zAQNvS-Pl2mfScIkY1AZ2NfBPXDUZF MXO1rRo23Ug',
  '6 min',
  '1981-03-14'
) on conflict (id) do nothing;

insert into public.posts (id, architect_id, title, slug, excerpt, body, category, cover_image_url, read_time, published_at) values
(
  '20000000-0000-0000-0000-000000000008',
  '10000000-0000-0000-0000-000000000006',
  'Light Held Between Two Walls',
  'light-held-between-two-walls',
  'Ando''s concrete rooms measure time in squares of sun: an essay on light geometry at Church of the Light.',
  $$[
    {"type":"paragraph","content":"At the Church of the Light, the cross is not an object but an absence — the only aperture in a wall of raw concrete, through which the afternoon sun draws the cruciform in living lumen."},
    {"type":"figure","caption":"Section through the concrete shell: the slot cross admitting a single beam of changing light."},
    {"type":"paragraph","content":"Ando does not decorate with light; he frames it so precisely that shadow becomes the sculpture and the room becomes a sundial of silence."}
  ]$$,
  'Sacred Light',
  'https://lh3.googleusercontent.com/aida-public/BX6AXuDBjeBwoQKHOX1LziNdMdSmOYtvGajv5JyX8yE7eNOkCH7zAQNvS-Pl3mfScIkY1AZ2NfBPXDUZGMXO1rRo23Ug',
  '7 min',
  '1989-05-20'
) on conflict (id) do nothing;

insert into public.posts (id, architect_id, title, slug, excerpt, body, category, cover_image_url, read_time, published_at) values
(
  '20000000-0000-0000-0000-000000000009',
  '10000000-0000-0000-0000-000000000007',
  'Junctions of Memory',
  'junctions-of-memory',
  'Why Scarpa''s joints are sentences: detail as narrative in the Castelvecchio renovation.',
  $$[
    {"type":"paragraph","content":"Scarpa treats every junction as a moment of reconciliation — between old stone and new bronze, between the forensic sight line of restoration and the honesty of intervention."},
    {"type":"pull_quote","quote_text":"To desire something intensely is only the first condition; the second is to give it form — form is the memory of desire made visible.","quote_author":"Carlo Scarpa"},
    {"type":"paragraph","content":"In the Castelvecchio, the seams are legible: where a wall ends, a bronze corner receives it; where a beam rests, a pin holds the story in place."}
  ]$$,
  'Detail as Narrative',
  'https://lh3.googleusercontent.com/aida-public/CX6AXuDBjeBwoQKHOX1LziNdMdSmOYtvGajv5JyX8yE7eNOkCH7zAQNvS-Pl4mfScIkY1AZ2NfBPXDUZH MXO1rRo23Ug',
  '8 min',
  '1972-06-02'
) on conflict (id) do nothing;

insert into public.posts (id, architect_id, title, slug, excerpt, body, category, cover_image_url, read_time, published_at) values
(
  '20000000-0000-0000-0000-000000000010',
  '10000000-0000-0000-0000-000000000008',
  'The Garden Holds the House',
  'the-garden-holds-the-house',
  'Doshi''s Aranya and the architecture of climate, community, and incremental growth.',
  $$[
    {"type":"paragraph","content":"Aranya was never meant to be finished. Doshi designed a frame for life — a skeleton of streets, boundaries, and services that residents could complete, personalize, and grow into across generations."},
    {"type":"figure","caption":"Climate section through Aranya housing: cross-ventilation shafts and shaded courts between the incremental house plot."},
    {"type":"paragraph","content":"This is architecture that treats the inhabitant not as consumer but as co-author — a profound inversion of the architect's traditional authority."}
  ]$$,
  'Incremental Cities',
  'https://lh3.googleusercontent.com/aida-public/DX6AXuDBjeBwoQKHOX1LziNdMdSmOYtvGajv5JyX8yE7eNOkCH7zAQNvS-Pl5mfScIkY1AZ2NfBPXDUZIMXO1rRo23Ug',
  '9 min',
  '1986-09-11'
);

insert into public.posts (id, architect_id, title, slug, excerpt, body, category, cover_image_url, read_time, published_at) values
(
  '20000000-0000-0000-0000-000000000011',
  '10000000-0000-0000-0000-000000000005',
  'Topography as the First Client',
  'topography-as-the-first-client',
  'Reading Siza''s Boa Nova through the land it refused to flatten.',
  $$[
    {"type":"paragraph","content":"At the Boa Nova Tea House, Siza let the rock outcrop dictate the plan entirely — the building curls around the boulders rather than clearing them. The topography is not a site constraint; it is the first and oldest client."},
    {"type":"pull_quote","quote_text":"Each place demands its own architecture; the architect is only the one who listens carefully enough to hear it.","quote_author":"Álvaro Siza Vieira"}
  ]$$,
  'Terrain',
  'https://lh3.googleusercontent.com/aida-public/AB6AXuDBjeBwoQKHOX1LziNdMdSmOYtvGajv5JyX8yE7eNOkCH7zAQNvS-Pl2mfScIkY1AZ2NfBPXDUZF MXO1rRo23Ug',
  '5 min',
  '1963-11-30'
) on conflict (id) do nothing;

insert into public.posts (id, architect_id, title, slug, excerpt, body, category, cover_image_url, read_time, published_at) values
(
  '20000000-0000-0000-0000-000000000012',
  '10000000-0000-0000-0000-000000000006',
  'Silence, Geometry, Water',
  'silence-geometry-water',
  'The row-house wall in Sumiyoshi and the paradox of a house that turns its back on the street.',
  $$[
    {"type":"paragraph","content":"The Sumiyoshi row house is a sealed concrete block split by an open courtyard — a radical retreat from the street that forces every room to face interior light and sky."},
    {"type":"paragraph","content":"It is famously a house without windows on its façade: Ando's challenge to the Japanese urban condition, trading the gaze of the passerby for the silence of the void within."}
  ]$$,
  'Interiority',
  'https://lh3.googleusercontent.com/aida-public/BX6AXuDBjeBwoQKHOX1LziNdMdSmOYtvGajv5JyX8yE7eNOkCH7zAQNvS-Pl3mfScIkY1AZ2NfBPXDUZGMXO1rRo23Ug',
  '6 min',
  '1976-08-17'
) on conflict (id) do nothing;

-- ---------------------------------------------------------------------------
-- 12 more annotations spread across the portfolio (each carries the rich
-- author-identity columns the 0003 migration added). Some are tied to a
-- portal-archivist user; most quote real readers in the dossier.
-- ---------------------------------------------------------------------------
insert into public.annotations (id, post_id, user_id, author_name, author_initials, author_affiliation, body, likes, created_at) values
(
  '30000000-0000-0000-0000-000000000005',
  '20000000-0000-0000-0000-000000000007',
  null,
  'Marisa Fontaine',
  'MF',
  'Architectural Review, Porto Desk',
  'The pencil thesis is vindicated in the Boa Nova drawings: one can see the section being born in the same gesture that finds the horizon.',
  31,
  now() - interval '3 days'
),
(
  '30000000-0000-0000-0000-000000000006',
  '20000000-0000-0000-0000-000000000008',
  null,
  'Kenji Mori',
  'KM',
  'GA Document Tokyo',
  'The cross as absence — exactly right. Ando has inverted the symbol: the void is the figure and the wall is the ground.',
  47,
  now() - interval '2 days'
),
(
  '30000000-0000-0000-0000-000000000007',
  '20000000-0000-0000-0000-000000000009',
  null,
  'Giulia Salvatori',
  'GS',
  'Casa del Restauro, Venice',
  'Scarpa''s bronze corners read like punctuation marks in a sentence written by the masonry. This essay captures the grammar beautifully.',
  22,
  now() - interval '4 days'
),
(
  '30000000-0000-0000-0000-000000000008',
  '20000000-0000-0000-0000-000000000010',
  null,
  'R. Mehta',
  'RM',
  'CEPT University Archives',
  'The term co-author is doing real work here. Aranya inverts the master-builder myth into a scaffolding for collective authorship.',
  36,
  now() - interval '1 day'
),
(
  '30000000-0000-0000-0000-000000000009',
  '20000000-0000-0000-0000-000000000011',
  null,
  'Irene Vilar',
  'IV',
  'Porto School of Architecture',
  'Topography as the first client — that phrase should be framed. It is Siza''s entire ethical position in six words.',
  19,
  now() - interval '5 days'
),
(
  '30000000-0000-0000-0000-000000000010',
  '20000000-0000-0000-0000-000000000012',
  null,
  'Naomi Hasegawa',
  'NH',
  'Jutaku Studies, Osaka',
  'A house that refuses the street is a provocation to the entire discipline of the façade. The courtyard is the true exterior here.',
  28,
  now() - interval '2 days'
),
(
  '30000000-0000-0000-0000-000000000011',
  '20000000-0000-0000-0000-000000000001',
  '40000000-0000-0000-0000-000000000001',
  'Marguerite Delacroix',
  'MD',
  'Portal Archivist',
  'Curatorial note: this brick dialogue now opens the whole archive. We are cross-listing it with the Boa Nova essay under the shared tag of structural honesty.',
  12,
  now() - interval '6 hours'
),
(
  '30000000-0000-0000-0000-000000000012',
  '20000000-0000-0000-0000-000000000002',
  '40000000-0000-0000-0000-000000000001',
  'Marguerite Delacroix',
  'MD',
  'Portal Archivist',
  'Pallasmaa on tactical perception pairs well with the Ando essay in this dossier; both treat the room as a bodily event rather than an image.',
  9,
  now() - interval '6 hours'
)
on conflict (id) do nothing;

-- ---------------------------------------------------------------------------
-- 3 portal-archivist users (readers/editors who can author annotations via
-- the archivist portal). Roles honored by the app's role gate.
-- ---------------------------------------------------------------------------
insert into public.archivist_users (id, email, name, role, avatar_url) values
(
  '40000000-0000-0000-0000-000000000001',
  'marguerite@archives.example',
  'Marguerite Delacroix',
  'portal-archivist',
  ''
),
(
  '40000000-0000-0000-0000-000000000002',
  'j.thorne@archives.example',
  'Prof. Julian Thorne',
  'portal-archivist',
  ''
),
(
  '40000000-0000-0000-0000-000000000003',
  'sara@archives.example',
  'Sara Kleinberg',
  'portal-archivist',
  ''
)
on conflict (id) do nothing;

commit;
