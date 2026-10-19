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
│   └── public/           # Fuentes e imágenes (placeholders en images/placeholders/)
└── docker-compose.yml
```

## Rutas

| Ruta | Sección |
| --- | --- |
| `/` | Inicio |
| `/modelos` | Modelos / Quiver (shortboards, funboards, longboards) |
| `/fabrica` | Fábrica (Miramar) |
| `/contacto` | Custom Orders / Contacto (acepta `?modelo=<slug>` para precargar el modelo) |

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
   Las cards, el listado y el selector del formulario se actualizan solos.
3. **Imágenes**: ver la siguiente sección.
4. **Logo**: hoy es un wordmark de texto en `frontend/components/features/logo.tsx`.
5. **Textos de “Fábrica”**: `frontend/app/fabrica/page.tsx` y `frontend/components/features/fabrica-teaser.tsx`.

## Reemplazar las imágenes placeholder

Todas las imágenes son SVG en `frontend/public/images/placeholders/`:

| Archivo | Uso | Formato recomendado |
| --- | --- | --- |
| `hero.svg` | Portada del home | Vertical 4:5 |
| `tabla.svg` | Cards de modelos | Vertical 3:4 |
| `taller.svg` | Fotos del taller / fábrica | Horizontal 4:3 |

1. Copiá la foto real a `frontend/public/images/` (por ejemplo `public/images/modelos/short-clasica.jpg`).
2. Cambiá la ruta:
   - Hero y taller: `frontend/lib/media.ts`.
   - Cada modelo: campo `imagen` en `frontend/lib/modelos.ts`.
3. Cuando ya no uses los SVG, podés borrar la carpeta `placeholders/`.

## Paleta

Los colores viven como variables HSL en `frontend/app/globals.css` y se exponen en `frontend/tailwind.config.js`:

- `primary` / `mar`: azul-verdoso profundo (marca, botones, footer).
- `mar-claro`: agua clara.
- `accent` / `resina`: ámbar de resina.
- `madera` y `arena` / `secondary`: madera clara y arena.
- `background`: blanco hueso.

## Modo “sitio en construcción” (opcional)

Si definís `PREVIEW_SECRET` en `frontend/.env.local`, quien no tenga la cookie ve `/construccion`.
Para entrar: `/?acceso=<valor de PREVIEW_SECRET>`. Sin la variable, el sitio es público.

## Docker

```bash
docker compose up --build -d
docker compose down
```
