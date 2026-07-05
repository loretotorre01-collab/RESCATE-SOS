import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

// Resolve __dirname since we are using ES Modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const distPath = path.join(__dirname, 'dist');
const indexPath = path.join(distPath, 'index.html');
const outputPath = path.join(__dirname, 'google-sites-embed.html');

function bundle() {
  console.log('Iniciando empaquetado para Google Sites...');

  if (!fs.existsSync(indexPath)) {
    console.error('Error: No se encontró dist/index.html. ¿Ejecutaste npm run build primero?');
    process.exit(1);
  }

  let htmlContent = fs.readFileSync(indexPath, 'utf-8');

  // Buscar el archivo CSS
  // Ejemplo: <link rel="stylesheet" crossorigin href="/assets/index-xxx.css">
  const cssRegex = /<link[^>]*rel="stylesheet"[^>]*href="\/([^"]+)"[^>]*>/i;
  const cssMatch = htmlContent.match(cssRegex);

  if (cssMatch) {
    const cssRelativePath = cssMatch[1];
    const cssFullPath = path.join(distPath, cssRelativePath);
    console.log(`Encontrado archivo CSS: ${cssRelativePath}`);

    if (fs.existsSync(cssFullPath)) {
      const cssContent = fs.readFileSync(cssFullPath, 'utf-8');
      // Reemplazar la etiqueta <link> por una etiqueta <style> con el CSS embebido
      htmlContent = htmlContent.replace(cssMatch[0], () => `<style>\n${cssContent}\n</style>`);
      console.log('CSS embebido con éxito.');
    } else {
      console.error(`Error: No se encontró el archivo CSS físico en: ${cssFullPath}`);
    }
  } else {
    console.warn('Advertencia: No se detectó etiqueta de hoja de estilos externa.');
  }

  // Buscar el archivo JS
  // Ejemplo: <script type="module" crossorigin src="/assets/index-xxx.js"></script>
  const jsRegex = /<script[^>]*src="\/([^"]+)"[^>]*><\/script>/i;
  const jsMatch = htmlContent.match(jsRegex);

  if (jsMatch) {
    const jsRelativePath = jsMatch[1];
    const jsFullPath = path.join(distPath, jsRelativePath);
    console.log(`Encontrado archivo JavaScript: ${jsRelativePath}`);

    if (fs.existsSync(jsFullPath)) {
      const jsContent = fs.readFileSync(jsFullPath, 'utf-8');
      // Reemplazar la etiqueta <script> por una etiqueta <script> clásica con el JS embebido
      // Esto elimina el requisito de "type=module" que es bloqueado por las políticas de sandbox de Google Sites
      htmlContent = htmlContent.replace(jsMatch[0], () => `<script>\n${jsContent}\n</script>`);
      console.log('JavaScript embebido con éxito.');
    } else {
      console.error(`Error: No se encontró el archivo JS físico en: ${jsFullPath}`);
    }
  } else {
    console.warn('Advertencia: No se detectó etiqueta de script de entrada externa.');
  }

  // Guardar el archivo final autocontenido
  fs.writeFileSync(outputPath, htmlContent, 'utf-8');
  console.log(`¡Éxito! Tu aplicación autocontenida se ha guardado en: ${outputPath}`);
}

bundle();
