import fs from 'fs';
import path from 'path';
import zlib from 'zlib';
import { promisify } from 'util';

const gzip = promisify(zlib.gzip);
const brotli = promisify(zlib.brotliCompress);

const distDir = path.join(process.cwd(), 'dist');

async function compressFile(filePath) {
  // Ignorar archivos que ya son comprimidos
  if (filePath.endsWith('.gz') || filePath.endsWith('.br')) return;

  const content = await fs.promises.readFile(filePath);
  
  // Comprimir solo si el tamaño es mayor a 1024 bytes
  if (content.length <= 1024) return;

  const relativePath = path.relative(distDir, filePath);

  try {
    // Gzip
    const gzContent = await gzip(content, { level: 9 });
    await fs.promises.writeFile(`${filePath}.gz`, gzContent);

    // Brotli
    const brContent = await brotli(content, {
      params: {
        [zlib.constants.BROTLI_PARAM_MODE]: zlib.constants.BROTLI_MODE_TEXT,
        [zlib.constants.BROTLI_PARAM_QUALITY]: 11,
      },
    });
    await fs.promises.writeFile(`${filePath}.br`, brContent);

    // console.log(`⚡ Comprimido: ${relativePath} (${content.length} B) -> .gz (${gzContent.length} B), .br (${brContent.length} B)`);
  } catch (err) {
    console.error(`❌ Error al comprimir ${relativePath}:`, err);
  }
}

async function walk(dir) {
  const files = await fs.promises.readdir(dir, { withFileTypes: true });
  for (const file of files) {
    const res = path.resolve(dir, file.name);
    if (file.isDirectory()) {
      await walk(res);
    } else {
      const ext = path.extname(res);
      if (['.js', '.css', '.html', '.svg', '.json', '.xml'].includes(ext)) {
        await compressFile(res);
      }
    }
  }
}

async function run() {
  console.log('🏁 Iniciando compresión post-build (Gzip + Brotli)...');
  try {
    await walk(distDir);
    console.log('🎉 ¡Compresión de todos los recursos completada con éxito!');
  } catch (error) {
    console.error('❌ Error durante la compresión:', error);
  }
}

run();
