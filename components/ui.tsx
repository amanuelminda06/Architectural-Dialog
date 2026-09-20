"use client";

// ---- consolidated external imports (single source) ----
import type { ReactNode } from "react";
import { createContext, useCallback, useContext, useRef, useState, useTransition } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
  createAnnotation,
  createArchitectProfile,
  createPost,
  deletePost,
  followArchitect,
  signInWithPassword,
  signOut,
  signUp,
  toggleAnnotationLike,
  unfollowArchitect,
  updateArchitectProfile,
  updatePost,
} from "@/lib/actions";
import type { Annotation, Architect, Post, PostBlock } from "@/lib/types";
import { Icon } from "./icon";

// ---- merged component definitions ----
// ================= icon.tsx =================
export function Icon({
  name,
  className = "text-[20px]",
  filled = false,
}: {
  name: string;
  className?: string;
  filled?: boolean;
}) {
  return (
    <span
      className={`material-symbols-outlined leading-none select-none ${className}`}
      style={filled ? { fontVariationSettings: "'FILL' 1" } : undefined}
      aria-hidden
    >
      {name}
    </span>
  );
}


// ================= toast.tsx =================
createContext,
  useCallback,
  useContext,
  useState,
  type ReactNode,
} from "react";

interface ToastContextValue {
  showToast: (message: string) => void;
}

const ToastContext = createContext<ToastContextValue>({
  showToast: () => {},
});

export function useToast() {
  return useContext(ToastContext);
}

export function ToastProvider({ children }: { children: ReactNode }) {
  const [message, setMessage] = useState<string | null>(null);
  const [visible, setVisible] = useState(false);
  const [timer, setTimer] = useState<NodeJS.Timeout | null>(null);

  const showToast = useCallback((msg: string) => {
    setMessage(msg);
    setVisible(true);
    if (timer) clearTimeout(timer);
    setTimer(
      setTimeout(() => {
        setVisible(false);
      }, 2400)
    );
  }, [timer]);

  return (
    <ToastContext.Provider value={{ showToast }}>
      {children}
      <div
        className={`fixed bottom-6 left-1/2 -translate-x-1/2 bg-inverse-surface text-inverse-on-surface px-4 py-2 rounded-lg shadow-xl font-label-sm text-label-sm transition-opacity duration-300 flex items-center gap-2 z-[60] ${
          visible ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
        aria-live="polite"
      >
        <Icon name="check_circle" className="text-tertiary-fixed text-[18px]" />
        <span>{message}</span>
      </div>
    </ToastContext.Provider>
  );
}


// ================= bottom-tab-bar.tsx =================
const TABS = [
  { path: "/", label: "Index", icon: "menu_book" },
  { path: "/architects", label: "Architects", icon: "architecture" },
  { path: "/library", label: "Library", icon: "bookmark" },
  { path: "/colophon", label: "Colophon", icon: "newspaper" },
] as const;

export function BottomTabBar() {
  const pathname = usePathname();

  return (
    <nav className="fixed bottom-0 w-full z-50 pb-safe bg-surface/90 backdrop-blur-xl shadow-[0_-1px_8px_rgba(0,0,0,0.03)]">
      <div className="flex items-center justify-around h-16 px-space-sm">
        {TABS.map((tab) => {
          const active =
            tab.path === "/"
              ? pathname === "/"
              : pathname.startsWith(tab.path);
          return (
            <Link
              key={tab.path}
              href={tab.path}
              className={`flex flex-col items-center justify-center min-w-[56px] min-h-[44px] gap-0.5 transition-colors ${
                active ? "text-primary font-medium" : "text-secondary"
              }`}
            >
              <Icon name={tab.icon} className="text-[20px]" />
              <span className="font-label-sm text-label-sm tracking-wide">
                {tab.label}
              </span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}


// ================= top-bar.tsx =================
export function ArticleTopBar({
  title,
  category,
  backHref,
}: {
  title: string;
  category: string;
  backHref?: string;
}) {
  return (
    <header className="fixed top-0 w-full z-50 pt-safe bg-surface/90 backdrop-blur-xl shadow-[0_1px_8px_rgba(0,0,0,0.03)]">
      <div className="h-14 px-margin flex items-center justify-between gap-space-sm">
        <Link
          href={backHref || "/reader"}
          aria-label="Back to reader"
          className="flex items-center gap-1 text-secondary min-w-[44px] min-h-[44px] -ml-2 px-2 transition-colors"
        >
          <Icon name="arrow_back" className="text-[20px]" />
        </Link>
        <div className="flex flex-col items-center text-center flex-1 min-w-0">
          <span className="font-meta-mono text-meta-mono uppercase tracking-widest text-primary font-semibold truncate max-w-full">
            {category}
          </span>
          <span className="font-meta-mono text-meta-mono text-secondary uppercase tracking-wider text-[10px]">
            {title}
          </span>
        </div>
        <span className="min-w-[44px]" />
      </div>
    </header>
  );
}

export function ArchitectTopBar({ name }: { name: string }) {
  return (
    <header className="fixed top-0 w-full z-50 pt-safe bg-surface/90 backdrop-blur-xl shadow-[0_1px_8px_rgba(0,0,0,0.03)]">
      <div className="h-14 px-margin flex items-center justify-between gap-space-sm">
        <Link
          href="/architects"
          aria-label="Back to architects"
          className="flex items-center gap-1 text-secondary min-w-[44px] min-h-[44px] -ml-2 px-2 transition-colors"
        >
          <Icon name="arrow_back" className="text-[20px]" />
        </Link>
        <div className="flex flex-col items-center text-center flex-1 min-w-0">
          <span className="font-meta-mono text-meta-mono uppercase tracking-widest text-primary font-semibold truncate max-w-full">
            ARCHIVE DOSSIER
          </span>
          <span className="font-meta-mono text-meta-mono text-secondary uppercase tracking-wider text-[10px] truncate max-w-full">
            {name}
          </span>
        </div>
        <span className="min-w-[44px]" />
      </div>
    </header>
  );
}

export function SimpleTopBar({ title }: { title: string }) {
  return (
    <header className="fixed top-0 w-full z-50 pt-safe bg-surface/90 backdrop-blur-xl shadow-[0_1px_8px_rgba(0,0,0,0.03)]">
      <div className="h-14 px-margin flex items-center justify-between gap-space-sm">
        <Link
          href="/"
          className="flex items-center gap-1 text-secondary min-w-[44px] min-h-[44px] -ml-2 px-2 transition-colors"
        >
          <Icon name="arrow_back" className="text-[20px]" />
        </Link>
        <span className="font-meta-mono text-meta-mono uppercase tracking-widest text-on-surface font-semibold">
          {title}
        </span>
        <span className="min-w-[44px]" />
      </div>
    </header>
  );
}


// ================= portal-nav.tsx =================
const LINKS = [
  { href: "/architect-portal", label: "Overview", icon: "space_dashboard" },
  { href: "/architect-portal/posts/new", label: "New Post", icon: "edit_note" },
  { href: "/architect-portal/profile", label: "Profile", icon: "person" },
] as const;

export function PortalNav({
  name,
  compact = false,
}: {
  name: string;
  compact?: boolean;
}) {
  const pathname = usePathname();

  return (
    <header className="fixed top-0 w-full z-50 pt-safe bg-surface/90 backdrop-blur-xl shadow-[0_1px_8px_rgba(0,0,0,0.03)]">
      <div className={`${compact ? "h-14" : "h-auto"} px-margin flex flex-col`}>
        <div className="h-14 flex items-center justify-between gap-space-sm">
          <div className="flex items-center gap-2 min-w-0">
            <Icon name="architecture" className="text-[20px] text-primary" />
            <span className="font-headline-md text-subhead text-on-surface italic font-normal leading-none truncate">
              Architect Portal
            </span>
          </div>
          <span className="font-meta-mono text-meta-mono text-secondary uppercase tracking-wider hidden sm:block">
            {name}
          </span>
          <form action={signOut}>
            <button
              className="flex items-center gap-1 text-secondary hover:text-primary font-label-sm text-label-sm min-h-[44px] px-2 transition-colors"
              aria-label="Sign out"
            >
              <Icon name="logout" className="text-[18px]" />
              <span className="hidden sm:inline">Sign out</span>
            </button>
          </form>
        </div>
        {!compact && (
          <div className="flex items-center gap-1 pb-2 overflow-x-auto no-scrollbar">
            {LINKS.map((link) => {
              const active =
                link.href === "/architect-portal"
                  ? pathname === link.href
                  : pathname.startsWith(link.href);
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded transition-colors font-label-sm text-label-sm font-medium ${
                    active
                      ? "bg-primary text-on-primary"
                      : "text-secondary hover:text-on-surface"
                  }`}
                >
                  <Icon name={link.icon} className="text-[16px]" />
                  {link.label}
                </Link>
              );
            })}
          </div>
        )}
      </div>
    </header>
  );
}


// ================= masthead.tsx =================
const PROFILE_AVATAR =
  "https://lh3.googleusercontent.com/aida-public/AB6AXuCBEUwyFKQY3sVWWfE3mOvbgCrJ0ld8DL_MxMYRV8I0U32CpiuyZ9YgCqthRSRuCgRFfpu_4Po3NmpRd09E8VFHpIlcjp6IpHytePKr9M7zwTK5PXjd9vBpn_RSb8qR1XOKv0h24gsHQGRMosYd5-TXO02F0bcHtxHfpYrrHR85_r0gVulyktlhEwLWnuN3-NUSYPbdRCXxNySzLRFN-BMF6Cr0d66oUVvASzkGF2CeFVdlP4vo3t7J";

export function Masthead() {
  return (
    <header className="fixed top-0 w-full z-50 pt-safe bg-surface/90 backdrop-blur-xl shadow-[0_1px_8px_rgba(0,0,0,0.03)]">
      <div className="h-20 px-margin flex items-center justify-between gap-space-sm">
        <div className="flex items-center min-w-[44px] min-h-[44px] justify-start">
          <span className="font-meta-mono text-meta-mono uppercase text-secondary tracking-widest">
            Vol. IV
          </span>
        </div>
        <Link
          href="/"
          className="flex flex-col items-center justify-center text-center flex-1"
        >
          <span className="font-headline-md text-subhead tracking-tight text-on-surface italic font-normal leading-none">
            Architecture Dialogue
          </span>
          <span className="font-meta-mono text-meta-mono uppercase text-secondary tracking-wider mt-space-xs">
            Autumn • Index / Feed
          </span>
        </Link>
        <div className="flex items-center justify-end min-w-[44px] min-h-[44px]">
          <img
            alt="Profile"
            className="w-8 h-8 rounded-full object-cover"
            src={PROFILE_AVATAR}
          />
        </div>
      </div>
    </header>
  );
}


// ================= footer.tsx =================
export function FooterColophon() {
  return (
    <footer className="p-margin my-space-lg text-center flex flex-col items-center">
      <div className="w-8 h-8 flex items-center justify-center text-secondary mb-space-xs">
        <Icon name="architecture" className="text-[20px]" />
      </div>
      <p className="font-meta-mono text-meta-mono uppercase tracking-widest text-secondary">
        End of Issue № 42
      </p>
      <p className="font-caption text-caption text-secondary mt-1">
        Published fortnightly under archival preservation standards.{" "}
        <Link href="/colophon" className="underline decoration-primary underline-offset-4 decoration-1 text-on-surface-variant hover:text-primary transition-colors">
          Read the colophon
        </Link>
        .
      </p>
    </footer>
  );
}


// ================= bookmark-button.tsx =================
export function BookmarkButton({
  label = true,
  size = "md",
}: {
  label?: boolean;
  size?: "sm" | "md";
}) {
  const [saved, setSaved] = useState(false);

  if (size === "sm") {
    return (
      <button
        aria-label={saved ? "Saved Post" : "Save Post"}
        onClick={() => setSaved((s) => !s)}
        className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded transition-colors duration-150 ${
          saved
            ? "bg-primary text-on-primary"
            : "bg-surface-container text-primary hover:bg-primary hover:text-on-primary"
        }`}
      >
        <Icon
          name={saved ? "bookmark" : "bookmark_border"}
          filled={saved}
          className="text-[16px] leading-none"
        />
        {label && (
          <span className="font-label-sm text-label-sm tracking-normal">
            {saved ? "Saved" : "Save"}
          </span>
        )}
      </button>
    );
  }

  return (
    <button
      aria-label="Save Monograph"
      onClick={() => setSaved((s) => !s)}
      className={`p-2 -mr-2 flex items-center justify-center transition-colors ${
        saved ? "text-primary" : "text-secondary hover:text-primary"
      }`}
    >
      <Icon name={saved ? "bookmark" : "bookmark_border"} filled={saved} className="text-[22px]" />
    </button>
  );
}


// ================= citation-button.tsx =================
export function CitationButton({ citation }: { citation: string }) {
  const { showToast } = useToast();
  const [copied, setCopied] = useState(false);
  const timer = useRef<NodeJS.Timeout | null>(null);

  return (
    <button
      aria-label="Copy quote citation"
      onClick={async () => {
        try {
          await navigator.clipboard.writeText(citation);
        } catch {
          /* clipboard unavailable */
        }
        setCopied(true);
        showToast("Citation copied to clipboard");
        if (timer.current) clearTimeout(timer.current);
        timer.current = setTimeout(() => setCopied(false), 1800);
      }}
      className="flex items-center gap-1.5 font-meta-mono text-label-sm text-primary hover:text-on-primary-container transition-colors"
    >
      <Icon name={copied ? "check" : "content_copy"} className="text-[15px]" filled={copied} />
      <span>{copied ? "Copied" : "Cite"}</span>
    </button>
  );
}


// ================= follow-button.tsx =================
export function FollowButton({ className = "" }: { className?: string }) {
  const [following, setFollowing] = useState(true);

  return (
    <button
      onClick={() => setFollowing((f) => !f)}
      className={`flex-1 min-h-[44px] px-space-md py-2.5 rounded flex items-center justify-center space-x-space-xs transition-all active:scale-[0.98] ${
        following
          ? "bg-primary-container text-on-primary-container shadow-sm"
          : "bg-surface-container-high text-on-surface hover:bg-surface-container-highest"
      } ${className}`}
    >
      <Icon name={following ? "check" : "add"} className="text-[18px]" />
      <span className="font-label-md text-label-md font-semibold tracking-wide">
        {following ? "Following" : "Follow Architect"}
      </span>
    </button>
  );
}


// ================= article-controls.tsx =================
export function ArticleControls({
  durationLabel = "14m",
}: {
  durationLabel?: string;
}) {
  const [saved, setSaved] = useState(false);
  const [audioOpen, setAudioOpen] = useState(false);
  const [playing, setPlaying] = useState(false);
  const [scale, setScale] = useState<"standard" | "comfortable">("standard");
  const { showToast } = useToast();

  return (
    <div className="flex flex-col">
      <div className="bg-surface-container-low rounded-lg p-space-xs px-space-sm flex items-center justify-between shadow-sm">
        <button
          aria-label="Save Article"
          onClick={() => setSaved((s) => !s)}
          className={`flex items-center gap-1.5 py-1.5 px-2 rounded active:bg-surface-container transition-colors ${
            saved ? "text-primary" : "text-on-surface-variant"
          }`}
        >
          <Icon name={saved ? "bookmark" : "bookmark_border"} filled={saved} className="text-[18px]" />
          <span className="font-label-sm text-label-sm font-medium">
            {saved ? "Saved" : "Save"}
          </span>
        </button>

        <button
          aria-label="Listen to Audio Essay"
          onClick={() => {
            setAudioOpen((o) => !o);
            showToast(audioOpen ? "Audio tray closed" : "Archival tape queued");
          }}
          className={`flex items-center gap-1.5 py-1.5 px-2 rounded active:bg-surface-container transition-colors ${
            audioOpen ? "text-primary" : "text-on-surface-variant"
          }`}
        >
          <Icon name="headphones" className="text-[18px]" />
          <span className="font-label-sm text-label-sm font-medium">
            Audio Essay{" "}
            <span className="text-secondary font-normal">({durationLabel})</span>
          </span>
        </button>

        <div className="flex items-center gap-1 bg-surface rounded px-1.5 py-1 shadow-sm">
          <button
            aria-label="Standard font scale"
            onClick={() => {
              setScale("standard");
              showToast("Type scale set to standard");
            }}
            className={`font-meta-mono text-[11px] px-1.5 py-0.5 rounded font-semibold transition-colors ${
              scale === "standard"
                ? "text-primary"
                : "text-secondary hover:text-on-surface"
            }`}
          >
            A
          </button>
          <span className="text-secondary-fixed-dim text-[10px]">|</span>
          <button
            aria-label="Comfortable font scale"
            onClick={() => {
              setScale("comfortable");
              showToast("Type scale set to comfortable");
            }}
            className={`font-meta-mono text-[13px] px-1.5 py-0.5 rounded font-semibold transition-colors ${
              scale === "comfortable"
                ? "text-primary"
                : "text-secondary hover:text-on-surface"
            }`}
          >
            A+
          </button>
        </div>
      </div>

      {audioOpen && (
        <div className="mt-space-xs bg-surface-container-high rounded-lg p-space-sm shadow-sm transition-all duration-300">
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-2">
              <Icon name="graphic_eq" className="text-primary text-[20px]" />
              <span className="font-meta-mono text-meta-mono uppercase text-on-surface font-medium">
                Archival Tape • Kahn Lecture Series
              </span>
            </div>
            <span className="font-meta-mono text-meta-mono text-secondary">
              04:18 / 14:02
            </span>
          </div>
          <div className="w-full bg-surface-container rounded-full h-1.5 overflow-hidden">
            <div className="bg-primary h-1.5 rounded-full w-[31%]" />
          </div>
          <div className="flex items-center justify-center gap-6 mt-2">
            <button aria-label="Rewind 10 seconds" className="text-secondary hover:text-on-surface active:scale-95 flex items-center">
              <Icon name="replay_10" className="text-[20px]" />
            </button>
            <button
              aria-label="Play or pause audio"
              onClick={() => setPlaying((p) => !p)}
              className="w-8 h-8 rounded-full bg-primary text-on-primary flex items-center justify-center active:scale-90 shadow-sm"
            >
              <Icon name={playing ? "pause" : "play_arrow"} filled className="text-[18px]" />
            </button>
            <button aria-label="Forward 10 seconds" className="text-secondary hover:text-on-surface active:scale-95 flex items-center">
              <Icon name="forward_10" className="text-[20px]" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
}


// ================= annotations.tsx =================
export function Annotations({
  postId,
  initial,
}: {
  postId: string;
  initial: Annotation[];
}) {
  const [items, setItems] = useState<Annotation[]>(initial);
  const [draft, setDraft] = useState("");
  const [isPending, startTransition] = useTransition();
  const { showToast } = useToast();

  const submitNote = () => {
    if (draft.trim().length === 0) {
      showToast("Please type an annotation first");
      return;
    }
    startTransition(async () => {
      const result = await createAnnotation(postId, draft.trim());
      if (result.error) {
        showToast(result.error);
        return;
      }
      setDraft("");
      showToast("Note published to archival dialogue");
    });
  };

  const like = (id: string) => {
    setItems((prev) =>
      prev.map((a) =>
        a.id === id
          ? { ...a, likes: a.likes + 1, liked: true }
          : a
      )
    );
    toggleAnnotationLike(id);
  };

  return (
    <>
      <div className="space-y-space-sm pt-space-xs">
        {items.map((a) => (
          <div key={a.id} className="bg-surface-container-low rounded-lg p-space-sm">
            <div className="flex items-center justify-between pb-1">
              <div className="flex items-center gap-2">
                <span className="font-label-sm text-label-sm font-semibold text-on-surface">
                  {a.author_name}
                </span>
                {a.author_affiliation && (
                  <span className="bg-surface-variant text-on-surface-variant text-[10px] font-meta-mono uppercase px-1.5 py-0.5 rounded">
                    {a.author_affiliation}
                  </span>
                )}
              </div>
              <span className="font-meta-mono text-meta-mono text-secondary">
                {a.created_date_label || "Just now"}
              </span>
            </div>
            <p className="font-body-base text-body-base text-on-surface-variant pt-0.5">
              {a.body}
            </p>
            <div className="flex items-center gap-4 pt-2 text-secondary">
              <button
                onClick={() => like(a.id)}
                className={`flex items-center gap-1 font-label-sm text-label-sm active:scale-95 transition-colors ${
                  a.liked ? "text-primary" : "hover:text-primary"
                }`}
              >
                <Icon
                  name={a.liked ? "thumb_up" : "thumb_up_off_alt"}
                  filled={a.liked}
                  className="text-[16px]"
                />
                <span>{a.likes}</span>
              </button>
              <button className="flex items-center gap-1 font-label-sm text-label-sm hover:text-primary transition-colors">
                <Icon name="reply" className="text-[16px]" />
                <span>Reply</span>
              </button>
            </div>
          </div>
        ))}
      </div>

      <div className="pt-space-md">
        <label
          className="block font-label-sm text-label-sm text-secondary pb-1 font-medium"
          htmlFor="marginaliaInput"
        >
          Contribute to the Marginalia
        </label>
        <div className="bg-surface-container-low rounded-lg p-space-xs shadow-inner">
          <textarea
            className="w-full bg-transparent p-space-xs text-on-surface placeholder:text-secondary font-body-base text-body-base outline-none resize-none"
            id="marginaliaInput"
            placeholder="Annotate Kahn’s thesis or cite relevant structural precedent..."
            rows={3}
            value={draft}
            onChange={(e) => setDraft(e.target.value)}
          />
          <div className="flex items-center justify-between pt-space-xs px-space-xs">
            <div className="flex items-center gap-2 text-secondary">
              <button aria-label="Attach drawing or citation" className="p-1 hover:text-primary transition-colors" title="Attach Archival Reference">
                <Icon name="attachment" className="text-[18px]" />
              </button>
              <button aria-label="Format quote" className="p-1 hover:text-primary transition-colors" title="Format Serif Quote">
                <Icon name="format_quote" className="text-[18px]" />
              </button>
            </div>
            <button
              onClick={submitNote}
              disabled={isPending}
              className="bg-primary text-on-primary hover:bg-primary-container px-space-md py-1.5 rounded font-label-md text-label-md font-medium active:scale-95 transition-all shadow-sm flex items-center gap-1.5 disabled:opacity-60"
            >
              <Icon name="send" className="text-[18px]" />
              <span>{isPending ? "Posting…" : "Submit Note"}</span>
            </button>
          </div>
        </div>
      </div>
    </>
  );
}


// ================= feed.tsx =================
export function FeedPostCard({ post }: { post: Post }) {
  return (
    <article className="p-margin transition-colors duration-150 hover:bg-surface-container-low/60 flex flex-col">
      <div className="flex items-center justify-between mb-space-sm">
        <div className="flex items-center gap-space-sm">
          <img
            className="w-7 h-7 rounded-full object-cover"
            alt={post.architect?.name || ""}
            src={post.architect?.portrait_url || ""}
          />
          <Link
            href={`/architects/${post.architect?.slug}`}
            className="font-label-md text-label-md text-on-surface font-medium hover:text-primary transition-colors"
          >
            {post.architect?.name}
          </Link>
        </div>
        <span className="font-meta-mono text-meta-mono text-secondary tracking-wide">
          {post.category} · {post.read_time}
        </span>
      </div>
      <Link className="group block mb-space-sm" href={`/articles/${post.slug}`}>
        <h3 className="font-headline-md text-headline-md text-on-surface group-hover:text-primary transition-colors leading-snug">
          {post.title}
        </h3>
        <p className="font-body-base text-body-base text-on-surface-variant mt-space-xs line-clamp-3">
          {post.excerpt}
        </p>
      </Link>
      <div className="flex items-center justify-between mt-space-xs pt-space-xs">
        <div className="flex items-center gap-2">
          <span className="font-meta-mono text-meta-mono text-secondary">
            {post.published_at}
          </span>
          <span className="text-secondary/50 text-[10px]">•</span>
          <span className="font-meta-mono text-meta-mono text-secondary">
            {post.read_time} read
          </span>
        </div>
        <BookmarkButton />
      </div>
    </article>
  );
}

export function IssueHeader({
  label,
  title,
}: {
  label: string;
  title: string;
}) {
  return (
    <section className="px-margin pt-space-md pb-space-lg">
      <div className="flex items-center justify-between">
        <div className="flex flex-col">
          <span className="font-meta-mono text-meta-mono tracking-widest uppercase text-secondary">
            {label}
          </span>
          <h2 className="font-headline-md text-headline-md text-on-surface tracking-tight mt-space-xs italic font-normal">
            {title}
          </h2>
        </div>
        <div
          className="w-10 h-10 rounded-full bg-surface-container-high flex items-center justify-center text-primary"
          title="Curated Edition"
        >
          <Icon name="auto_stories" className="text-[20px]" />
        </div>
      </div>
      <div className="mt-space-md flex items-center gap-space-xs overflow-x-auto no-scrollbar py-space-xs">
        <span className="px-3 py-1 bg-primary text-on-primary font-label-sm text-label-sm rounded-full transition-colors shrink-0">
          All Essays
        </span>
        <span className="px-3 py-1 bg-surface-container text-secondary font-label-sm text-label-sm rounded-full transition-colors shrink-0">
          Phenomenology
        </span>
        <span className="px-3 py-1 bg-surface-container text-secondary font-label-sm text-label-sm rounded-full transition-colors shrink-0">
          Tectonics
        </span>
        <span className="px-3 py-1 bg-surface-container text-secondary font-label-sm text-label-sm rounded-full transition-colors shrink-0">
          Materiality
        </span>
      </div>
    </section>
  );
}


// ================= reading-body.tsx =================
export function ReadingBody({
  blocks,
  category,
}: {
  blocks: PostBlock[];
  category: string;
}) {
  if (blocks.length === 0) {
    return (
      <p className="font-body-lg text-body-lg leading-relaxed text-on-surface text-secondary">
        Full text forthcoming in the folio edition.
      </p>
    );
  }

  return (
    <div
      className="flex flex-col gap-space-md text-on-surface font-body-lg text-body-lg leading-relaxed"
    >
      {blocks.map((block, i) => {
        if (block.type === "figure") {
          return (
            <figure
              key={i}
              className="my-space-md bg-surface-container-low rounded-lg p-space-xs"
            >
              <img
                className="w-full h-64 object-cover rounded shadow-sm"
                alt={block.image_alt || block.figure_caption || category}
                src={block.image_url}
              />
              <div className="pt-space-xs px-1 flex justify-between items-baseline">
                <span className="font-caption text-caption text-secondary">
                  {block.figure_caption}
                </span>
                {block.figure_year && (
                  <span className="font-meta-mono text-meta-mono text-secondary">
                    {block.figure_year}
                  </span>
                )}
              </div>
            </figure>
          );
        }

        if (block.type === "pull_quote") {
          return (
            <div
              key={i}
              className="-mx-2 sm:-mx-6 my-space-lg bg-surface-container rounded-xl p-space-lg relative shadow-sm"
            >
              <div className="absolute -top-3 left-6 bg-primary text-on-primary w-7 h-7 rounded-full flex items-center justify-center font-subhead text-subhead shadow-sm select-none">
                &ldquo;
              </div>
              <blockquote className="font-headline-md text-[24px] sm:text-headline-md italic leading-snug text-on-surface pt-1">
                {block.quote_text}
              </blockquote>
              <div className="pt-space-sm flex items-center justify-between">
                <cite className="font-caption text-caption text-secondary not-italic flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-primary inline-block" />
                  {block.quote_author}
                </cite>
                <CitationButton
                  citation={`"${block.quote_text}" — ${block.quote_author}`}
                />
              </div>
            </div>
          );
        }

        if (block.type === "subheading") {
          return (
            <h3
              key={i}
              className="font-headline-md text-headline-md text-on-surface font-medium leading-snug pt-2"
            >
              {block.heading}
            </h3>
          );
        }

        const isFirstParagraph =
          block.type === "paragraph" &&
          i === 0 &&
          (block.content || "")?.length > 0;

        return (
          <p key={i} className="font-body-lg text-body-lg leading-relaxed text-on-surface">
            {isFirstParagraph && (
              <span className="float-left text-headline-lg font-headline-lg text-primary leading-none pr-space-xs pt-1 font-normal select-none">
                {(block.content || "").charAt(0)}
              </span>
            )}
            {(block.content || "").slice(isFirstParagraph ? 1 : 0)}
          </p>
        );
      })}
    </div>
  );
}


// ================= architect-cards.tsx =================
export function ArchitectAvatar({ architect }: { architect: Architect }) {
  return (
    <div className="relative w-20 h-24 bg-surface-container-highest shrink-0 overflow-hidden rounded">
      <img
        className="w-full h-full object-cover grayscale contrast-110"
        alt={architect.name}
        src={architect.portrait_url}
      />
      <div className="absolute inset-0 bg-primary/5 mix-blend-multiply pointer-events-none" />
    </div>
  );
}

export function WritingCard({ post }: { post: Post }) {
  return (
    <Link
      href={`/articles/${post.slug}`}
      className="bg-surface-container-low p-space-md rounded flex flex-col gap-space-xs hover:bg-surface-container transition-colors active:scale-[0.99]"
    >
      <div className="flex items-center justify-between">
        <span className="font-meta-mono text-meta-mono uppercase tracking-widest text-primary">
          {post.published_at} · Monograph Essay
        </span>
        <span className="font-caption text-caption text-secondary flex items-center gap-1">
          <Icon name="schedule" className="text-[14px]" /> {post.read_time}
        </span>
      </div>
      <h4 className="font-subhead text-subhead text-on-surface font-medium">
        {post.title}
      </h4>
      <p className="font-caption text-caption text-on-surface-variant line-clamp-2">
        {post.excerpt}
      </p>
      <div className="flex items-center gap-1 text-primary pt-1">
        <span className="font-label-sm text-label-sm">Read Monograph Transcript</span>
        <Icon name="arrow_forward" className="text-[16px]" />
      </div>
    </Link>
  );
}

export function ArchitectRowCard({ architect }: { architect: Architect }) {
  return (
    <Link
      href={`/architects/${architect.slug}`}
      className="bg-surface-container-low p-space-md rounded flex items-start gap-space-md hover:bg-surface-container transition-colors active:scale-[0.99]"
    >
      <div className="relative w-16 h-20 bg-surface-container-highest shrink-0 overflow-hidden rounded">
        <img
          className="w-full h-full object-cover grayscale contrast-110"
          alt={architect.name}
          src={architect.portrait_url}
        />
      </div>
      <div className="flex flex-col min-w-0">
        <span className="font-meta-mono text-meta-mono uppercase tracking-[0.08em] text-secondary">
          {architect.era}
        </span>
        <h3 className="font-headline-md text-headline-md text-on-surface tracking-tight">
          {architect.name}
        </h3>
        <p className="font-caption text-caption text-secondary italic line-clamp-1">
          {architect.location}
        </p>
        <p className="font-caption text-caption text-on-surface-variant line-clamp-2 mt-1">
          {architect.bio}
        </p>
      </div>
    </Link>
  );
}


// ================= reader-cards.tsx =================
export function ReaderFeaturedCard({ post }: { post: Post }) {
  return (
    <article className="flex flex-col bg-surface-container-low rounded overflow-hidden">
      <div className="relative w-full aspect-[16/10] overflow-hidden bg-surface-container">
        <img
          alt={post.title}
          className="w-full h-full object-cover"
          src={post.cover_image_url}
        />
        <div className="absolute top-space-sm left-space-sm bg-surface/90 backdrop-blur-md px-2 py-1 rounded">
          <span className="font-meta-mono text-meta-mono uppercase tracking-wider text-on-surface">
            Plate 01
          </span>
        </div>
        <div className="absolute bottom-2 right-2 bg-inverse-surface/85 backdrop-blur-sm px-2 py-0.5 rounded">
          <span className="font-meta-mono text-meta-mono text-inverse-on-surface">
            {post.category}
          </span>
        </div>
      </div>
      <div className="p-space-md flex flex-col">
        <div className="flex items-center justify-between text-secondary mb-space-xs">
          <span className="font-meta-mono text-meta-mono tracking-wider uppercase text-primary font-medium">
            Monograph Focus
          </span>
          <span className="font-label-sm text-label-sm">{post.read_time} read</span>
        </div>
        <h2 className="font-headline-md text-headline-md text-on-surface mt-1 leading-snug">
          {post.title}
        </h2>
        <p className="font-caption text-caption text-secondary mt-1">
          By{" "}
          <Link
            href={`/architects/${post.architect?.slug}`}
            className="text-on-surface font-medium hover:text-primary transition-colors"
          >
            {post.architect?.name}
          </Link>
        </p>
        <p className="font-body-base text-body-base text-on-surface-variant mt-space-sm leading-relaxed line-clamp-2">
          {post.excerpt}
        </p>
        <div className="mt-space-md pt-space-sm flex items-center justify-between">
          <Link
            href={`/articles/${post.slug}`}
            className="inline-flex items-center gap-1 text-primary font-label-md text-label-md group"
          >
            <span className="underline decoration-primary underline-offset-4 decoration-1 font-medium">
              Read Monograph
            </span>
            <Icon
              name="arrow_forward"
              className="text-[18px] group-hover:translate-x-0.5 transition-transform"
            />
          </Link>
          <BookmarkButton />
        </div>
      </div>
    </article>
  );
}

export function ReaderCard({ post }: { post: Post }) {
  const excerptQuote = post.excerpt;

  return (
    <article className="bg-surface-container-low p-space-md rounded flex flex-col gap-space-sm">
      <div className="relative w-full aspect-[16/9] overflow-hidden rounded bg-surface-container">
        <img
          alt={post.title}
          className="w-full h-full object-cover"
          src={post.cover_image_url}
        />
        <div className="absolute bottom-2 right-2 bg-inverse-surface/85 backdrop-blur-sm px-2 py-0.5 rounded">
          <span className="font-meta-mono text-meta-mono text-inverse-on-surface">
            {post.published_at}
          </span>
        </div>
      </div>
      <div className="flex items-center justify-between text-secondary pt-1">
        <span className="font-meta-mono text-meta-mono uppercase tracking-wider text-primary">
          {post.category}
        </span>
        <span className="font-label-sm text-label-sm">{post.read_time} read</span>
      </div>
      <h4 className="font-headline-md text-headline-md text-on-surface text-[22px] leading-tight">
        {post.title}
      </h4>
      <p className="font-caption text-caption text-secondary">
        By{" "}
        <Link
          href={`/architects/${post.architect?.slug}`}
          className="text-on-surface font-medium hover:text-primary transition-colors"
        >
          {post.architect?.name}
        </Link>
      </p>
      <blockquote className="font-body-base text-body-base text-on-surface-variant italic pl-space-sm bg-surface-container-high/40 py-2 pr-2 rounded line-clamp-2">
        {excerptQuote}
      </blockquote>
      <div className="flex items-center justify-between pt-space-xs">
        <Link
          href={`/articles/${post.slug}`}
          className="inline-flex items-center gap-1 text-primary font-label-md text-label-md group"
        >
          <span className="underline decoration-primary underline-offset-4 decoration-1 font-medium">
            Examine Record
          </span>
          <Icon
            name="arrow_forward"
            className="text-[16px] group-hover:translate-x-0.5 transition-transform"
          />
        </Link>
        <BookmarkButton />
      </div>
    </article>
  );
}


// ================= auth-form.tsx =================
export default function AuthForm() {
  const [mode, setMode] = useState<"signin" | "signup">("signin");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [pending, startTransition] = useTransition();
  const router = useRouter();

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    startTransition(async () => {
      if (mode === "signin") {
        const res = await signInWithPassword(email, password);
        if (res.error) setError(res.error);
        else router.push("/architect-portal");
      } else {
        const res = await signUp({ email, password, name });
        if (res.error) setError(res.error);
        else {
          setMode("signin");
          setError(null);
        }
      }
    });
  };

  return (
    <div className="min-h-screen bg-surface flex items-center justify-center px-margin">
      <div className="w-full max-w-sm bg-surface-container-low rounded-lg p-space-lg shadow-sm flex flex-col gap-space-md">
        <div className="flex flex-col items-center gap-space-sm">
          <div className="w-12 h-12 rounded-full bg-surface-container-highest flex items-center justify-center text-primary">
            <Icon name="architecture" className="text-[24px]" />
          </div>
          <h1 className="font-headline-md text-headline-md text-on-surface text-center">
            Architect Portal
          </h1>
          <p className="font-caption text-caption text-secondary text-center">
            {mode === "signin"
              ? "Sign in to manage your dossiers and writings."
              : "Create an account to begin publishing monographs."}
          </p>
        </div>

        {error && (
          <div className="bg-error-container text-on-error-container rounded p-space-sm font-caption text-caption">
            {error}
          </div>
        )}

        <form onSubmit={submit} className="flex flex-col gap-space-sm">
          {mode === "signup" && (
            <label className="flex flex-col gap-1">
              <span className="font-label-sm text-label-sm text-secondary font-medium">
                Full Name
              </span>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                placeholder="Louis I. Kahn"
                className="w-full bg-surface text-on-surface placeholder:text-secondary border border-outline-variant rounded p-2.5 font-body-base text-body-base outline-none focus:border-primary transition-colors"
              />
            </label>
          )}

          <label className="flex flex-col gap-1">
            <span className="font-label-sm text-label-sm text-secondary font-medium">
              Email
            </span>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              placeholder="architect@example.com"
              className="w-full bg-surface text-on-surface placeholder:text-secondary border border-outline-variant rounded p-2.5 font-body-base text-body-base outline-none focus:border-primary transition-colors"
            />
          </label>

          <label className="flex flex-col gap-1">
            <span className="font-label-sm text-label-sm text-secondary font-medium">
              Password
            </span>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              minLength={6}
              placeholder="••••••••"
              className="w-full bg-surface text-on-surface placeholder:text-secondary border border-outline-variant rounded p-2.5 font-body-base text-body-base outline-none focus:border-primary transition-colors"
            />
          </label>

          <button
            type="submit"
            disabled={pending}
            className="mt-1 w-full bg-primary-container text-on-primary font-label-md text-label-md py-3 rounded shadow-sm active:scale-[0.99] transition-all disabled:opacity-60"
          >
            {pending
              ? "Processing…"
              : mode === "signin"
              ? "Sign In"
              : "Create Account"}
          </button>
        </form>

        <button
          onClick={() => {
            setMode((m) => (m === "signin" ? "signup" : "signin"));
            setError(null);
          }}
          className="text-center font-label-sm text-label-sm text-primary hover:text-on-primary-container transition-colors"
        >
          {mode === "signin"
            ? "New architect? Create an account"
            : "Already an architect? Sign in"}
        </button>

        <div className="text-center">
          <a
            href="/"
            className="font-label-sm text-label-sm text-secondary hover:text-on-surface transition-colors"
          >
            ← Return to public folio
          </a>
        </div>
      </div>
    </div>
  );
}


// ================= post-editor.tsx =================
const CATEGORIES = [
  "Monograph",
  "Phenomenology",
  "Tectonics",
  "Materiality",
  "Modernism",
  "Atmosphere",
  "Civic Tectonics",
];

interface PostEditorProps {
  architectId: string;
  initial?: {
    id: string;
    slug: string;
    title: string;
    excerpt: string;
    category: string;
    cover_image_url: string;
    read_time: string;
    body: PostBlock[];
  };
}

const inputCls =
  "w-full bg-surface text-on-surface placeholder:text-secondary border border-outline-variant rounded p-2.5 font-body-base text-body-base outline-none focus:border-primary transition-colors";

export function PostEditor({ architectId, initial }: PostEditorProps) {
  const editing = Boolean(initial);
  const [title, setTitle] = useState(initial?.title || "");
  const [slug, setSlug] = useState(initial?.slug || "");
  const [excerpt, setExcerpt] = useState(initial?.excerpt || "");
  const [category, setCategory] = useState(initial?.category || "Monograph");
  const [cover, setCover] = useState(initial?.cover_image_url || "");
  const [readTime, setReadTime] = useState(initial?.read_time || "5 min");
  const [body, setBody] = useState(
    initial?.body?.find((b) => b.type === "paragraph")?.content || ""
  );
  const [error, setError] = useState<string | null>(null);
  const [pending, startTransition] = useTransition();
  const router = useRouter();

  const bodyBlocks: PostBlock[] = body.trim()
    ? [{ type: "paragraph", content: body.trim() }]
    : [];

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!title.trim()) {
      setError("Title is required.");
      return;
    }

    startTransition(async () => {
      let res;
      if (initial) {
        res = await updatePost(initial.id, {
          title: title.trim(),
          excerpt: excerpt.trim(),
          body: bodyBlocks,
          category,
          cover_image_url: cover.trim(),
          read_time: readTime.trim(),
        });
      } else {
        const autoSlug =
          slug.trim() ||
          title
            .toLowerCase()
            .trim()
            .replace(/[^a-z0-9]+/g, "-")
            .replace(/(^-|-$)/g, "");
        if (!autoSlug) {
          setError("A slug is required.");
          return;
        }
        res = await createPost({
          architect_id: architectId,
          title: title.trim(),
          slug: autoSlug,
          excerpt: excerpt.trim(),
          body: bodyBlocks,
          category,
          cover_image_url: cover.trim(),
          read_time: readTime.trim(),
        });
      }

      if (res.error) {
        setError(res.error);
        return;
      }
      router.push("/architect-portal");
      router.refresh();
    });
  };

  return (
    <div className="max-w-2xl mx-auto flex flex-col gap-space-md">
      <div className="flex flex-col gap-space-xs pt-space-sm">
        <span className="font-meta-mono text-meta-mono uppercase tracking-widest text-primary">
          {editing ? "Edit Monograph" : "New Monograph"}
        </span>
        <h1 className="font-headline-lg-mobile text-headline-lg-mobile text-on-surface tracking-tight">
          {editing ? "Revise your writing" : "Publish to the folio"}
        </h1>
      </div>

      {error && (
        <div className="bg-error-container text-on-error-container rounded p-space-sm font-caption text-caption">
          {error}
        </div>
      )}

      <form onSubmit={submit} className="bg-surface-container-low rounded-lg p-space-md flex flex-col gap-space-sm">
        <Field label="Title">
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Order is: What a Brick Wants to Be"
            className={inputCls}
          />
        </Field>

        {!editing && (
          <Field
            label="Slug (optional — generated from title if blank)"
            hint="Lowercase, hyphenated; appears in /articles/[slug]."
          >
            <input
              type="text"
              value={slug}
              onChange={(e) => setSlug(e.target.value)}
              placeholder="order-is-what-a-brick-wants-to-be"
              className={inputCls}
            />
          </Field>
        )}

        <div className="grid grid-cols-2 gap-space-sm">
          <Field label="Category">
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className={`${inputCls} appearance-none`}
            >
              {CATEGORIES.map((c) => (
                <option key={c} value={c}>
                  {c}
                </option>
              ))}
            </select>
          </Field>
          <Field label="Read time">
            <input
              type="text"
              value={readTime}
              onChange={(e) => setReadTime(e.target.value)}
              placeholder="6 min"
              className={inputCls}
            />
          </Field>
        </div>

        <Field label="Cover image URL">
          <input
            type="url"
            value={cover}
            onChange={(e) => setCover(e.target.value)}
            placeholder="https://…"
            className={inputCls}
          />
        </Field>

        <Field label="Excerpt">
          <textarea
            value={excerpt}
            onChange={(e) => setExcerpt(e.target.value)}
            rows={3}
            placeholder="A short pull for the index and reader."
            className={`${inputCls} resize-none`}
          />
        </Field>

        <Field label="Body" hint="Rendered as running essay prose on the reading view.">
          <textarea
            value={body}
            onChange={(e) => setBody(e.target.value)}
            rows={12}
            placeholder="The full monograph text…"
            className={`${inputCls} resize-none`}
          />
        </Field>

        <div className="flex items-center gap-space-sm pt-1">
          <button
            type="submit"
            disabled={pending}
            className="flex-1 bg-primary-container text-on-primary font-label-md text-label-md py-3 rounded shadow-sm active:scale-[0.99] transition-all disabled:opacity-60"
          >
            {pending ? "Saving…" : editing ? "Save Changes" : "Publish Post"}
          </button>
          <a
            href="/architect-portal"
            className="font-label-md text-label-md text-secondary hover:text-on-surface py-3 px-4 transition-colors"
          >
            Cancel
          </a>
        </div>
      </form>
    </div>
  );
}

function Field({
  label,
  hint,
  children,
}: {
  label: string;
  hint?: string;
  children: React.ReactNode;
}) {
  return (
    <label className="flex flex-col gap-1">
      <span className="font-label-sm text-label-sm text-secondary font-medium">
        {label}
      </span>
      {children}
      {hint && (
        <span className="font-meta-mono text-meta-mono text-secondary text-[11px]">
          {hint}
        </span>
      )}
    </label>
  );
}


// ================= post-row.tsx =================
export function PostRow({
  post,
  publishedSlugs,
}: {
  post: {
    id: string;
    slug: string;
    title: string;
    category: string;
    read_time: string;
    published_at: string;
    excerpt: string;
  };
  publishedSlugs: string[];
}) {
  const router = useRouter();
  const [pending, startTransition] = useTransition();
  const live = publishedSlugs.includes(post.slug);

  return (
    <div className="bg-surface-container-low rounded-lg p-space-md flex flex-col gap-space-sm">
      <div className="flex items-center justify-between">
        <span className="font-meta-mono text-meta-mono uppercase tracking-widest text-primary">
          {post.category} · {post.read_time}
        </span>
        <span
          className={`font-meta-mono text-meta-mono uppercase tracking-wider px-2 py-0.5 rounded ${
            live ? "bg-primary-fixed text-on-primary-fixed" : "bg-surface-variant text-on-surface-variant"
          }`}
        >
          {live ? "Published" : "Draft"}
        </span>
      </div>
      <h3 className="font-subhead text-subhead text-on-surface font-medium leading-snug">
        {post.title}
      </h3>
      <p className="font-caption text-caption text-secondary line-clamp-2">
        {post.excerpt}
      </p>
      <div className="flex items-center gap-space-sm pt-1">
        <Link
          href={`/architect-portal/posts/${post.id}/edit`}
          className="inline-flex items-center gap-1 text-primary font-label-sm text-label-sm"
        >
          <Icon name="edit" className="text-[16px]" />
          Edit
        </Link>
        {live && (
          <Link
            href={`/articles/${post.slug}`}
            className="inline-flex items-center gap-1 text-secondary font-label-sm text-label-sm"
          >
            <Icon name="open_in_new" className="text-[16px]" />
            View
          </Link>
        )}
        <button
          onClick={() => {
            if (!confirm("Delete this post permanently?")) return;
            startTransition(async () => {
              const res = await deletePost(post.id);
              if (!res.error) router.refresh();
            });
          }}
          disabled={pending}
          className="inline-flex items-center gap-1 text-secondary hover:text-error font-label-sm text-label-sm ml-auto disabled:opacity-50"
        >
          <Icon name="delete" className="text-[16px]" />
          Delete
        </button>
      </div>
    </div>
  );
}


// ================= profile-form.tsx =================
const profileInputCls =
  "w-full bg-surface text-on-surface placeholder:text-secondary border border-outline-variant rounded p-2.5 font-body-base text-body-base outline-none focus:border-primary transition-colors";

export function ProfileForm({
  architect,
}: {
  architect: {
    name: string;
    bio: string;
    curatorial_statement: string;
    era: string;
    location: string;
    portrait_url: string;
  };
}) {
  const [name, setName] = useState(architect.name);
  const [bio, setBio] = useState(architect.bio);
  const [curatorial, setCuratorial] = useState(architect.curatorial_statement);
  const [era, setEra] = useState(architect.era);
  const [location, setLocation] = useState(architect.location);
  const [portrait, setPortrait] = useState(architect.portrait_url);
  const [error, setError] = useState<string | null>(null);
  const [saved, setSaved] = useState(false);
  const [pending, startTransition] = useTransition();
  const router = useRouter();

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setSaved(false);
    startTransition(async () => {
      const res = await updateArchitectProfile({
        name: name.trim(),
        bio: bio.trim(),
        curatorial_statement: curatorial.trim(),
        era: era.trim(),
        location: location.trim(),
      });
      if (res.error) {
        setError(res.error);
        return;
      }
      setSaved(true);
      router.refresh();
    });
  };

  return (
    <div className="max-w-2xl mx-auto flex flex-col gap-space-md">
      <div className="flex flex-col gap-space-xs pt-space-sm">
        <span className="font-meta-mono text-meta-mono uppercase tracking-widest text-primary">
          Profile
        </span>
        <h1 className="font-headline-lg-mobile text-headline-lg-mobile text-on-surface tracking-tight">
          Edit your dossier
        </h1>
        <p className="font-caption text-caption text-secondary">
          This content appears on your public architect page.
        </p>
      </div>

      {error && (
        <div className="bg-error-container text-on-error-container rounded p-space-sm font-caption text-caption">
          {error}
        </div>
      )}
      {saved && (
        <div className="bg-primary-fixed text-on-primary-fixed rounded p-space-sm font-caption text-caption">
          Dossier updated.
        </div>
      )}

      <form onSubmit={submit} className="bg-surface-container-low rounded-lg p-space-md flex flex-col gap-space-sm">
        <label className="flex flex-col gap-1">
          <span className="font-label-sm text-label-sm text-secondary font-medium">Name</span>
          <input type="text" value={name} onChange={(e) => setName(e.target.value)} className={profileInputCls} />
        </label>
        <label className="flex flex-col gap-1">
          <span className="font-label-sm text-label-sm text-secondary font-medium">Portrait URL</span>
          <input type="url" value={portrait} onChange={(e) => setPortrait(e.target.value)} placeholder="https://…" className={profileInputCls} />
        </label>
        <div className="grid grid-cols-2 gap-space-sm">
          <label className="flex flex-col gap-1">
            <span className="font-label-sm text-label-sm text-secondary font-medium">Era</span>
            <input type="text" value={era} onChange={(e) => setEra(e.target.value)} className={profileInputCls} />
          </label>
          <label className="flex flex-col gap-1">
            <span className="font-label-sm text-label-sm text-secondary font-medium">Location</span>
            <input type="text" value={location} onChange={(e) => setLocation(e.target.value)} className={profileInputCls} />
          </label>
        </div>
        <label className="flex flex-col gap-1">
          <span className="font-label-sm text-label-sm text-secondary font-medium">Bio</span>
          <textarea value={bio} onChange={(e) => setBio(e.target.value)} rows={3} className={`${profileInputCls} resize-none`} />
        </label>
        <label className="flex flex-col gap-1">
          <span className="font-label-sm text-label-sm text-secondary font-medium">Curatorial statement</span>
          <textarea value={curatorial} onChange={(e) => setCuratorial(e.target.value)} rows={3} className={`${profileInputCls} resize-none`} />
        </label>
        <button
          type="submit"
          disabled={pending}
          className="mt-1 w-full bg-primary-container text-on-primary font-label-md text-label-md py-3 rounded shadow-sm active:scale-[0.99] transition-all disabled:opacity-60"
        >
          {pending ? "Saving…" : "Save Profile"}
        </button>
      </form>
    </div>
  );
}


// ================= profile-setup.tsx =================
export function ProfileSetup({ defaultName }: { defaultName: string }) {
  const [name, setName] = useState(defaultName || "");
  const [bio, setBio] = useState("");
  const [curatorial, setCuratorial] = useState("");
  const [era, setEra] = useState("");
  const [location, setLocation] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [pending, startTransition] = useTransition();
  const router = useRouter();

  const slug = name
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!slug) {
      setError("Please provide a name to generate a slug.");
      return;
    }
    setError(null);
    startTransition(async () => {
      const res = await createArchitectProfile({
        name,
        slug,
        bio,
        curatorial_statement: curatorial,
        era,
        location,
      });
      if (res.error) setError(res.error);
      else router.refresh();
    });
  };

  return (
    <div className="max-w-lg mx-auto flex flex-col gap-space-md">
      <div className="flex flex-col gap-space-xs">
        <span className="font-meta-mono text-meta-mono uppercase tracking-widest text-primary">
          Welcome, Architect
        </span>
        <h1 className="font-headline-lg-mobile text-headline-lg-mobile text-on-surface">
          Complete your dossier
        </h1>
        <p className="font-caption text-caption text-secondary">
          Your portal profile is also your public architect page. It is the
          first thing readers encounter before your monographs.
        </p>
      </div>

      {error && (
        <div className="bg-error-container text-on-error-container rounded p-space-sm font-caption text-caption">
          {error}
        </div>
      )}

      <form onSubmit={submit} className="bg-surface-container-low rounded-lg p-space-md flex flex-col gap-space-sm">
        <Label text="Full name">
          <Input value={name} onChange={setName} placeholder="Louis I. Kahn" required />
        </Label>
        <div className="flex flex-col gap-1">
          <span className="font-label-sm text-label-sm text-secondary font-medium">
            Slug
          </span>
          <div className="bg-surface rounded p-2.5 border border-outline-variant font-meta-mono text-meta-mono text-secondary">
            /architects/{slug || "…"}
          </div>
        </div>
        <Label text="Era">
          <Input value={era} onChange={setEra} placeholder="1901–1974" />
        </Label>
        <Label text="Location">
          <Input value={location} onChange={setLocation} placeholder="Philadelphia, USA" />
        </Label>
        <Label text="Bio">
          <Textarea value={bio} onChange={setBio} placeholder="A short biography for the architects index." rows={3} />
        </Label>
        <Label text="Curatorial statement">
          <Textarea value={curatorial} onChange={setCuratorial} placeholder="A sentence or two on the soul of your practice." rows={3} />
        </Label>
        <button
          type="submit"
          disabled={pending}
          className="mt-1 w-full bg-primary-container text-on-primary font-label-md text-label-md py-3 rounded shadow-sm active:scale-[0.99] transition-all disabled:opacity-60"
        >
          {pending ? "Saving…" : "Create Portfolio"}
        </button>
      </form>
    </div>
  );
}

function Label({ text, children }: { text: string; children: React.ReactNode }) {
  return (
    <label className="flex flex-col gap-1">
      <span className="font-label-sm text-label-sm text-secondary font-medium">
        {text}
      </span>
      {children}
    </label>
  );
}

function Input({
  value,
  onChange,
  placeholder,
  required,
}: {
  value: string;
  onChange: (v: string) => void;
  placeholder?: string;
  required?: boolean;
}) {
  return (
    <input
      type="text"
      value={value}
      onChange={(e) => onChange(e.target.value)}
      placeholder={placeholder}
      required={required}
      className="w-full bg-surface text-on-surface placeholder:text-secondary border border-outline-variant rounded p-2.5 font-body-base text-body-base outline-none focus:border-primary transition-colors"
    />
  );
}

function Textarea({
  value,
  onChange,
  placeholder,
  rows,
}: {
  value: string;
  onChange: (v: string) => void;
  placeholder?: string;
  rows?: number;
}) {
  return (
    <textarea
      value={value}
      onChange={(e) => onChange(e.target.value)}
      placeholder={placeholder}
      rows={rows || 3}
      className="w-full bg-surface text-on-surface placeholder:text-secondary border border-outline-variant rounded p-2.5 font-body-base text-body-base outline-none focus:border-primary transition-colors resize-none"
    />
  );
}
