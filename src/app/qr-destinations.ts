export function createRsvpUrl(phone: string, message: string): string | null {
  if (!/^[1-9]\d{7,14}$/.test(phone)) return null;

  const url = new URL(`https://wa.me/${phone}`);
  url.searchParams.set('text', message);
  return url.href;
}

export function createMapUrl(value: string): string | null {
  let url: URL;
  try {
    url = new URL(value);
  } catch {
    return null;
  }

  if (url.protocol !== 'https:' || url.username || url.password || url.port) return null;

  const trustedShortLink = url.hostname === 'maps.app.goo.gl';
  const trustedMapsPage = url.hostname === 'www.google.com' && /^\/maps(?:\/|$)/.test(url.pathname);
  if (!trustedShortLink && !trustedMapsPage) return null;

  return url.href;
}
