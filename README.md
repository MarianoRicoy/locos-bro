# Locos Bro Surfboards

Sitio web de **Locos Bro**, histórica fábrica de tablas de surf de Miramar, Argentina.

Es un sitio de presentación (sin tienda, pagos online ni backend): muestra el quiver, cuenta la historia de la fábrica y recibe consultas y pedidos a medida (*custom orders*) por WhatsApp o email.

## Estructura

```bash
├── frontend/             # Sitio público (Next.js App Router + Tailwind CSS 3 + TypeScript)
│   ├── app/              # Rutas: / · /modelos · /fabrica · /contacto
│   ├── components/       # features/ (secciones del sitio) y ui/ (primitivas shadcn)
│   ├── lib/              # site-config, modelos (quiver), media (imágenes), navigation, seo
│   ├── types/            # Tipos de dominio (Modelo)
│   └── public/           # Imágenes (placeholders en images/placeholders/, modelos en images/modelos/)
└── docker-compose.yml
```

## Rutas

| Ruta | Sección |
| --- | --- |
| `/` | Inicio |
| `/historia` | Historia (capítulos editables en `lib/historia.ts`) |
| `/modelos` | Quiver (shortboards, funboards, longboards) |
| `/fabrica` | La Fábrica |
| `/contacto` | Contacto / Custom Orders (acepta `?modelo=<slug>` para precargar el modelo) |

## Desarrollo

Requisitos: Node.js 20+ y npm 10+.

```bash
cd frontend
npm install
npm run dev        # http://localhost:3000
npm run lint
npm run build
```

Desde la raíz también funcionan `npm run dev`, `npm run build` y `npm run lint`.

## Qué personalizar antes de publicar

1. **Datos de contacto** (teléfono, email, dirección, horarios, redes): `frontend/lib/site-config.ts`.
   Hoy son datos genéricos de ejemplo. El número de WhatsApp va en formato `wa.me` (solo dígitos, con `54`).
2. **Quiver** (modelos, medidas, descripciones): `frontend/lib/modelos.ts`.
   Hoy están los 12 modelos reales del taller. Cada uno usa dos archivos en `frontend/public/images/modelos/`:
   la tabla vista desde arriba (`<slug>.jpg`) y su logo en blanco con fondo transparente (`<slug>-logo.png`).
   El carrusel del home, la grilla de `/modelos`, el modal de cada tabla y el selector del formulario se actualizan solos.
   ⚠️ Las medidas y textos se transcribieron de una imagen chica: revisarlos antes de publicar.
3. **Imágenes**: ver la siguiente sección.
4. **Logo**: archivos `logo-negro.png` (fondos claros) y `logo-blanco.png` (fondos negros) en `frontend/public/images/placeholders/`, referenciados en `LOGOS` de `frontend/lib/media.ts` y usados por `frontend/components/features/logo.tsx`.
5. **Textos de “La Fábrica”**: `frontend/app/fabrica/page.tsx` y `frontend/components/features/fabrica-teaser.tsx`.
6. **Historia real**: `frontend/lib/historia.ts` (hoy es texto base, sin fechas).

## Reemplazar las imágenes placeholder

Todas las imágenes son SVG en `frontend/public/images/placeholders/`:

| Archivo | Uso | Formato recomendado |
| --- | --- | --- |
| `hero.svg` | Portada del home | Vertical 4:5 |
| `taller.svg` | Fotos del taller y de la historia | Horizontal 4:3 |

1. Copiá la foto real a `frontend/public/images/` (por ejemplo `public/images/modelos/short-clasica.jpg`).
2. Cambiá la ruta:
   - Hero, taller e historia: `frontend/lib/media.ts`.
   - Cada modelo: campo `imagen` en `frontend/lib/modelos.ts`.
3. Cuando ya no uses los SVG, podés borrar la carpeta `placeholders/`.

## Identidad visual

Estética cruda y de alto contraste. Los colores viven como variables HSL en `frontend/app/globals.css` y se exponen en `frontend/tailwind.config.js`:

- **Fondo** blanco puro y **texto** negro absoluto (`background` / `foreground`).
- **Secciones oscuras**: negro puro con texto blanco. Se alternan con el componente `components/features/section.tsx` (`tone="claro" | "oscuro"`).
- **Gris asfalto** muy claro (`secondary` / `muted`) para superficies.
- **Sin color**: escala de grises estricta (blanco, negro y grises `neutral`). Hover y énfasis usan gris industrial muy oscuro (`--accent`) o la inversión blanco/negro.
- **Bordes afilados**: todo radio de Tailwind (`sm` a `3xl`) vale 2 px. Los bordes son negros y gruesos (`border-2`).
- **Tipografía**: Poppins para el texto, los botones y el `h1` (bold); ABeeZee para `h2`–`h4`. Se cargan con `next/font/google` en `app/layout.tsx` y se asignan en `globals.css` y `tailwind.config.js` (`font-sans` = Poppins, `font-titulo` = ABeeZee). Los títulos van en minúsculas normales; las mayúsculas quedan solo para etiquetas chicas.

## Modo “sitio en construcción” (opcional)

Si definís `PREVIEW_SECRET` en `frontend/.env.local`, quien no tenga la cookie ve `/construccion`.
Para entrar: `/?acceso=<valor de PREVIEW_SECRET>`. Sin la variable, el sitio es público.

## Docker

```bash
docker compose up --build -d
docker compose down
```
