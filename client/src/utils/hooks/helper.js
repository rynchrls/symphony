export function addEmbedToSpotifyUrl(url) {
  const embedUrl = url.replace(".com/", ".com/embed/");
  return embedUrl;
}
 