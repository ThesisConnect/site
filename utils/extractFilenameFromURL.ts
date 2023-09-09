export function extractFilenameFromURL(url: string) {
  // Decode the URL
  const decodedUrl = decodeURIComponent(url);

  // Remove query parameters
  const pathWithoutQuery = decodedUrl.split('?')[0];

  // Split the URL by '/'
  const segments = pathWithoutQuery.split('/');

  // The filename is the last segment
  const filename = segments.pop();

  return filename;
}
