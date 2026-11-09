import { site } from "@/content/site";

const paths: Record<string, string> = {
  facebook: "M13.5 21v-7.5h2.5l.4-3h-2.9V8.6c0-.9.3-1.5 1.5-1.5h1.5V4.4c-.3 0-1.2-.1-2.2-.1-2.2 0-3.7 1.3-3.7 3.8v2.4H8v3h2.6V21h2.9z",
  instagram: "M12 7.4A4.6 4.6 0 1 0 12 16.6 4.6 4.6 0 0 0 12 7.4zm0 7.6a3 3 0 1 1 0-6 3 3 0 0 1 0 6zm4.8-8.9a1.1 1.1 0 1 0 0 2.2 1.1 1.1 0 0 0 0-2.2zM21 8.3c0-1.4-.4-2.7-1.4-3.7S17.5 3.1 16 3H8c-1.5.1-2.8.5-3.7 1.5S3 6.9 3 8.3v7.4c0 1.4.4 2.7 1.4 3.7S6.5 20.9 8 21h8c1.4-.1 2.7-.5 3.7-1.5s1.3-2.3 1.4-3.7V8.3zM19 17c-.3.8-.9 1.4-1.7 1.7-1.2.5-4 .4-5.3.4s-4.1.1-5.3-.4A3 3 0 0 1 5 17c-.5-1.2-.4-4-.4-5.3s-.1-4.1.4-5.3c.3-.8.9-1.4 1.7-1.7C7.9 4.2 10.7 4.3 12 4.3s4.1-.1 5.3.4c.8.3 1.4.9 1.7 1.7.5 1.2.4 4 .4 5.3s.1 4.1-.4 5.3z",
  linkedin: "M6.9 8.8H3.8V20h3.1V8.8zM5.4 4a1.8 1.8 0 1 0 0 3.6 1.8 1.8 0 0 0 0-3.6zM20.2 13.9c0-3-1.6-5.4-4.6-5.4-1.5 0-2.5.8-3 1.6V8.8H9.6V20h3.1v-5.6c0-1.5.3-2.9 2.1-2.9s1.9 1.7 1.9 3V20h3.1l.4-6.1z",
  youtube: "M21.6 7.2a2.5 2.5 0 0 0-1.8-1.8C18.2 5 12 5 12 5s-6.2 0-7.8.4A2.5 2.5 0 0 0 2.4 7.2C2 8.8 2 12 2 12s0 3.2.4 4.8a2.5 2.5 0 0 0 1.8 1.8C5.8 19 12 19 12 19s6.2 0 7.8-.4a2.5 2.5 0 0 0 1.8-1.8c.4-1.6.4-4.8.4-4.8s0-3.2-.4-4.8zM10 15V9l5.2 3L10 15z",
};

/** Renders only the social networks configured in site.social. */
export function SocialIcons({ className = "" }: { className?: string }) {
  const entries = Object.entries(site.social).filter(([, url]) => url);
  if (!entries.length) return null;
  return (
    <ul className={`flex gap-3 ${className}`}>
      {entries.map(([name, url]) => (
        <li key={name}>
          <a href={url} target="_blank" rel="noopener noreferrer" aria-label={`${site.name} on ${name}`}
            className="flex h-10 w-10 items-center justify-center rounded-full border border-ivory/20 text-ivory/80 transition-colors hover:border-champagne-300 hover:text-champagne-300">
            <svg viewBox="0 0 24 24" className="h-4 w-4" fill="currentColor" aria-hidden><path d={paths[name]} /></svg>
          </a>
        </li>
      ))}
    </ul>
  );
}
