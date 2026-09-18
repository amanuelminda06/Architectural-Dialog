export interface Architect {
  id: string;
  name: string;
  slug: string;
  portrait_url: string;
  bio: string;
  curatorial_statement: string;
  era: string;
  location: string;
  keywords: string[];
}

export interface PostBlock {
  type: "paragraph" | "pull_quote" | "figure" | "subheading";
  content?: string;
  quote_text?: string;
  quote_author?: string;
  image_url?: string;
  image_alt?: string;
  figure_caption?: string;
  figure_location?: string;
  figure_year?: string;
  heading?: string;
}

export interface Post {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  body: PostBlock[];
  category: string;
  read_time: string;
  published_at: string;
  cover_image_url: string;
  architect_id: string;
  architect?: Architect;
}

export interface Annotation {
  id: string;
  post_id: string;
  author_name: string;
  author_initials: string;
  author_affiliation?: string;
  body: string;
  likes: number;
  created_at: string;
  created_date_label?: string;
  liked?: boolean;
}
