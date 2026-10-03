import { site } from '../site.config';

export function GET() {
  // In der Vorschau (GitHub Pages) alles sperren, auf der echten Domain alles erlauben
  const text =
    import.meta.env.PUBLIC_VORSCHAU === '1'
      ? 'User-agent: *\nDisallow: /\n'
      : `User-agent: *\nAllow: /\n\nSitemap: ${site.domain}/sitemap-index.xml\n`;
  return new Response(text, { headers: { 'Content-Type': 'text/plain; charset=utf-8' } });
}
