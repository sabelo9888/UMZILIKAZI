import fs from 'fs';
import path from 'path';

// The application routes specified for indexing in Google Search Console
export const ROUTES = [
  { path: '', changefreq: 'daily', priority: '1.0' },
  { path: 'about', changefreq: 'weekly', priority: '0.8' },
  { path: 'academics', changefreq: 'weekly', priority: '0.9' },
  { path: 'admissions', changefreq: 'weekly', priority: '0.9' },
  { path: 'gallery', changefreq: 'weekly', priority: '0.7' },
  { path: 'uniforms', changefreq: 'monthly', priority: '0.6' },
  { path: 'success-portal', changefreq: 'weekly', priority: '0.8' },
  { path: 'contact', changefreq: 'monthly', priority: '0.7' },
  { path: 'news', changefreq: 'daily', priority: '0.8' },
  { path: 'alumni', changefreq: 'weekly', priority: '0.7' }
];

/**
 * Generates sitemap.xml content dynamically based on the current base URL.
 * This ensures that if the site is accessed via dev URL or custom domain,
 * all indexed URLs in the sitemap remain consistent.
 */
export function generateSitemapXml(baseUrl: string): string {
  const normalizedBase = baseUrl.replace(/\/$/, '');
  const currentDate = new Date().toISOString().split('T')[0];

  let xml = '<?xml version="1.0" encoding="UTF-8"?>\n';
  xml += '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n';

  ROUTES.forEach((route) => {
    const fullUrl = route.path ? `${normalizedBase}/${route.path}` : normalizedBase;
    xml += '  <url>\n';
    xml += `    <loc>${fullUrl}</loc>\n`;
    xml += `    <lastmod>${currentDate}</lastmod>\n`;
    xml += `    <changefreq>${route.changefreq}</changefreq>\n`;
    xml += `    <priority>${route.priority}</priority>\n`;
    xml += '  </url>\n';
  });

  xml += '</urlset>';
  return xml;
}

// Standalone CLI execution block
try {
  const fileUrl = import.meta.url;
  const isDirectRun = process.argv[1] && (
    process.argv[1].includes('sitemapGenerator') || 
    process.argv[1].includes('sitemap')
  );

  if (isDirectRun) {
    const defaultBaseUrl = 'https://umzilikazissschool.co.za';
    console.log('[Sitemap Generator] Running CLI script with base URL:', defaultBaseUrl);
    const xmlContent = generateSitemapXml(defaultBaseUrl);
    
    // Save to root, and to dist/ (if it exists)
    const rootPath = path.join(process.cwd(), 'sitemap.xml');
    const distPath = path.join(process.cwd(), 'dist', 'sitemap.xml');

    fs.writeFileSync(rootPath, xmlContent, 'utf-8');
    console.log(`[Sitemap Generator] Static sitemap written successfully to: ${rootPath}`);

    if (fs.existsSync(path.join(process.cwd(), 'dist'))) {
      fs.writeFileSync(distPath, xmlContent, 'utf-8');
      console.log(`[Sitemap Generator] Static sitemap copied to compiled build at: ${distPath}`);
    }
  }
} catch (e) {
  // Gracefully handle environments without import.meta.url or run-time script checks
}
