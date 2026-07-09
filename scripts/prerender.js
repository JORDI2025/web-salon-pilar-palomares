import fs from 'fs';
import path from 'path';
import http from 'http';
import os from 'os';
import puppeteer from 'puppeteer-core';

const baseRoutes = [
  '/',
  '/nuestra-esencia',
  '/calendario-biodinamico',
  '/equipo',
  '/cultura-de-color',
  '/peluqueria',
  '/bioterapias',
  '/bioterapia-capilar',
  '/bioterapia-facial',
  '/bioterapia-corporal',
  '/bioterapia-facial-corporal',
  '/bioterapia-manos-pies',
  '/cultura-de-la-forma',
  '/estetica',
  '/eventos',
  '/reserva',
  '/contacto',
  '/aviso-legal',
  '/politica-privacidad',
  '/cookies',
  '/condiciones-venta'
];

// Idiomas del sitio: sin prefijo = español; /en, /de, /fr para el resto.
// Debe coincidir con LANG_PREFIXES de src/App.jsx.
const langPrefixes = ['', '/en', '/de', '/fr'];
const routes = langPrefixes.flatMap((prefix) =>
  baseRoutes.map((r) => (r === '/' ? (prefix || '/') : `${prefix}${r}`))
);

function getChromePath() {
  const paths = [
    'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe',
    'C:\\Program Files (x86)\\Google\\Chrome\\Application\\chrome.exe',
    path.join(os.homedir(), 'AppData', 'Local', 'Google', 'Chrome', 'Application', 'chrome.exe')
  ];
  for (const p of paths) {
    if (fs.existsSync(p)) return p;
  }
  throw new Error('No se pudo encontrar Google Chrome en este equipo. Por favor, asegúrate de tenerlo instalado.');
}

function startServer(port = 9000) {
  const mimeTypes = {
    '.html': 'text/html',
    '.css': 'text/css',
    '.js': 'application/javascript',
    '.mjs': 'application/javascript',
    '.png': 'image/png',
    '.jpg': 'image/jpeg',
    '.jpeg': 'image/jpeg',
    '.webp': 'image/webp',
    '.svg': 'image/svg+xml',
    '.woff2': 'font/woff2',
    '.woff': 'font/woff',
    '.ico': 'image/x-icon',
    '.json': 'application/json'
  };

  const server = http.createServer((req, res) => {
    let urlPath = req.url.split('?')[0];
    if (urlPath === '/') urlPath = '/index-spa.html';

    const hasExtension = path.extname(urlPath) !== '';
    // Serve index-spa.html as fallback for any route (no extension) to use the original SPA bundle
    let filePath = path.join(process.cwd(), 'dist', hasExtension ? urlPath : 'index-spa.html');

    if (!fs.existsSync(filePath)) {
      filePath = path.join(process.cwd(), 'dist', 'index-spa.html');
    }

    const ext = path.extname(filePath);
    const contentType = mimeTypes[ext] || 'application/octet-stream';

    fs.readFile(filePath, (err, content) => {
      if (err) {
        res.writeHead(500);
        res.end(`Error de Servidor: ${err.code}`);
      } else {
        res.writeHead(200, { 'Content-Type': contentType });
        res.end(content, 'utf-8');
      }
    });
  });

  return new Promise((resolve) => {
    server.listen(port, () => {
      resolve(server);
    });
  });
}

async function runPrerender() {
  console.log('🏁 Iniciando proceso de pre-renderizado estático (SSG)...');
  const distPath = path.join(process.cwd(), 'dist');
  const indexPath = path.join(distPath, 'index.html');
  const spaIndexPath = path.join(distPath, 'index-spa.html');

  if (!fs.existsSync(indexPath)) {
    console.error('❌ Error: No se encontró dist/index.html. Debes ejecutar npm run build primero.');
    process.exit(1);
  }

  // 1. Crear una copia temporal de index.html original para servirla en el rastreo
  fs.copyFileSync(indexPath, spaIndexPath);

  // 2. Iniciar el servidor local
  const port = 9050;
  const server = await startServer(port);
  console.log(`📡 Servidor de pre-renderizado iniciado en http://localhost:${port}`);

  let browser;
  try {
    const chromePath = getChromePath();
    console.log(`🚀 Iniciando navegador Chrome desde: ${chromePath}`);

    browser = await puppeteer.launch({
      executablePath: chromePath,
      headless: true,
      args: ['--no-sandbox', '--disable-setuid-sandbox']
    });

    for (const route of routes) {
      console.log(`🔍 Pre-renderizando ruta: ${route}`);
      const page = await browser.newPage();
      await page.setViewport({ width: 1280, height: 720 });
      
      // Navegar a la ruta
      await page.goto(`http://localhost:${port}${route}`, { waitUntil: 'networkidle0', timeout: 30000 });
      
      // Espera extra para dar tiempo a que se resuelva la hidratación, Suspense y animaciones iniciales
      await new Promise(resolve => setTimeout(resolve, 1000));

      // Extraer HTML completo
      const html = await page.evaluate(() => document.documentElement.outerHTML);
      const fullHtml = `<!DOCTYPE html>\n${html}`;

      // Determinar directorio de salida
      const outDir = route === '/' ? distPath : path.join(distPath, route.slice(1));
      if (!fs.existsSync(outDir)) {
        fs.mkdirSync(outDir, { recursive: true });
      }

      const outPath = path.join(outDir, 'index.html');
      fs.writeFileSync(outPath, fullHtml, 'utf-8');
      console.log(`✅ Escrito: ${outPath}`);
      
      await page.close();
    }

    console.log('🎉 ¡Pre-renderizado de todas las rutas completado con éxito!');

  } catch (error) {
    console.error('❌ Error durante el pre-renderizado:', error);
  } finally {
    if (browser) await browser.close();
    server.close();
    // Eliminar index-spa.html temporal
    if (fs.existsSync(spaIndexPath)) {
      fs.unlinkSync(spaIndexPath);
    }
    console.log('🛑 Servidor local detenido. Proceso finalizado.');
  }
}

runPrerender();
