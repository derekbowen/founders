# Marketplace template library

21 marketplace front ends, one per vertical. Each is a [Magic Patterns](https://magicpatterns.com)
export (React 18, Vite, Tailwind) that follows the Sharetribe web template's page map: search at
`/s`, listings at `/l/:id`, profiles at `/u/:id`, inbox, checkout, account and payouts. They run on
built-in sample data and have **no backend**, so they are design starting points, not working
marketplaces.

10 booking · 7 service · 4 product templates.
`catalog.json` lists every template with its vertical, transaction model, tagline, pages and the
Magic Patterns source design it was exported from.

## Browse them

```sh
npm --prefix templates install     # one shared install for all templates
npm --prefix templates run all     # build every template, capture previews, write the gallery
npx --prefix templates vite preview --outDir templates/dist/gallery   # or any static server on templates/dist/gallery
```

The gallery (`templates/dist/gallery/index.html`) shows each template's home, search, listing and
phone previews, with a link to a live, clickable copy.

## Run one template

```sh
cd templates/<slug>
npm install
npm run dev
```

Each template stays a standalone Vite app. With the shared install above, `npx vite` inside a
template folder also works without a second install.

## Layout

| Path | What it is |
|---|---|
| `<slug>/` | The exported source as delivered, plus the Tailwind fixes listed below |
| `<slug>/preview/` | Home, search and listing at 1280×800, and home at phone width (captured by `tools/screenshots.mjs`) |
| `catalog.json` | The library index |
| `package.json` | The shared install the build tooling and the templates resolve from |
| `tools/build-gallery.mjs` | Builds each template for the gallery (see below) |
| `tools/screenshots.mjs` | Captures previews and checks each page renders (needs Chromium) |
| `tools/gallery-index.mjs` | Writes the gallery page |
| `tools/build-store-previews.mjs` | Builds the previews the founders.click template store serves (see below) |
| `tools/store-thumbnails.mjs` | Captures the store's 960×720 catalog thumbnails and checks those previews render |
| `tools/build-download-zips.mjs` | Builds the zip a buyer downloads from the store (see below) |

The gallery build never edits a template's source. It copies each template and changes the copy
so it runs from a sub-folder: `BrowserRouter` becomes `HashRouter`, absolute paths to files in
`public/` become relative, and Vite builds with base `./`. It also adds an "All templates" link
to each built copy.

## The founders.click template store

The store at founders.click/sharetribe-templates lives in the `kindred-ease-space` app, which
serves each template's preview from `public/template-previews/<slug>/` and its card image from
`public/template-thumbnails/<slug>.jpg`. To rebuild those from this library:

```sh
node templates/tools/build-store-previews.mjs <kindred-ease-space>/public/template-previews [slug...]
node templates/tools/store-thumbnails.mjs <kindred-ease-space>/public [slug...]
```

The store build follows the store's own preview rules: every photo is self-hosted under
`images/`, photos the exports left out are downloaded once from the Magic Patterns CDN (cached in
`templates/.image-cache/`) and shipped with the preview, photos are recompressed, and maps use
OpenStreetMap tiles. The store's catalog entries (name, price, flow, highlights) live in that
app's `src/lib/template-store.ts` and `supabase/functions/_shared/template-catalog.ts`.

### Download zips

```sh
node templates/tools/build-download-zips.mjs [slug...]   # → templates/dist/downloads/<slug>.zip
```

Each zip is a standalone project (`npm install`, `npm run dev`) with the photos the export left
out restored, OpenStreetMap map tiles, pinned dependency versions, a buyer-facing README and no
Magic Patterns project metadata. A template becomes sellable once its zip is in the store's
private `template-downloads` Supabase bucket under the name `<slug>.zip`; until then checkout
refuses it.

## Known issues in the exports

- **Missing photos: CampOut, Harborly, Harvestly, Tutorly; 11 of Craftly's.** They load photos
  from `/generated-images/…` (Craftly from its `public/` root), which Magic Patterns did not include
  in the export, so run locally those photos show as empty. Dressly loads its photos straight from
  `cdn.magicpatterns.com` instead. The files still exist on that CDN; the store previews download
  and ship them (above), but the sources here don't have them yet, so a zip made from these
  folders would not include them.
- **Fixed: Bulkly, Stashly, Harborly, Vowly.** Their `tailwind.config.js` `content` globs did not
  match the source files, so Tailwind generated no utility classes and the pages rendered
  unstyled. In Bulkly and Stashly the globs were pasted into a helper's accumulator instead of the
  exported config. In Harborly and Vowly they pointed at the project root, but the export keeps the
  source under `src/`. Each config now sets `content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}']`
  at the top level. Harborly's and Vowly's paste had also replaced the `maxWidth.content` value
  that `max-w-content` containers use, so their pages stretched on wide screens; it is now
  `1280px`.
- **CARTO map tiles need an API key now.** Most designs use CARTO basemaps
  (`basemaps.cartocdn.com`), which answer every request with an "API key required" tile. Add a
  CARTO key or switch the tile URL (the store previews use OpenStreetMap's standard tiles).

## Templates

| Preview | Template | Model | Tagline | Pages |
|---|---|---|---|---|
| <img src="bulkly/preview/home.jpg" alt="Bulkly home page" width="220"> | **[Bulkly](bulkly/)**<br>Wholesale (B2B) | Product | Wholesale from independent brands | 16 |
| <img src="campout/preview/home.jpg" alt="CampOut home page" width="220"> | **[CampOut](campout/)**<br>Campsites & outdoor stays | Booking | Wake up somewhere wild | 19 |
| <img src="courttime/preview/home.jpg" alt="CourtTime home page" width="220"> | **[CourtTime](courttime/)**<br>Sports court booking | Booking | Book a court in seconds | 15 |
| <img src="craftly/preview/home.jpg" alt="Craftly home page" width="220"> | **[Craftly](craftly/)**<br>Handmade goods | Product | Made by hand, made to last | 21 |
| <img src="deskhop/preview/home.jpg" alt="DeskHop home page" width="220"> | **[DeskHop](deskhop/)**<br>Desks & workspaces by the hour | Booking | Work from anywhere, by the hour | 18 |
| <img src="dressly/preview/home.jpg" alt="Dressly home page" width="220"> | **[Dressly](dressly/)**<br>Designer dress rental | Booking | Designer dress rental, closet to closet | 15 |
| <img src="gigsy/preview/home.jpg" alt="Gigsy home page" width="220"> | **[Gigsy](gigsy/)**<br>Freelance services | Service | Get a quote from top freelancers | 16 |
| <img src="harborly/preview/home.jpg" alt="Harborly home page" width="220"> | **[Harborly](harborly/)**<br>Boat & yacht rental | Booking | Rent boats, yachts & sailboats — with or without a captain | 19 |
| <img src="harvestly/preview/home.jpg" alt="Harvestly home page" width="220"> | **[Harvestly](harvestly/)**<br>Farm produce | Product | Fresh from farms near you | 18 |
| <img src="kitchenhub/preview/home.jpg" alt="KitchenHub home page" width="220"> | **[KitchenHub](kitchenhub/)**<br>Commercial kitchen rental | Booking | Licensed commercial kitchens, by the hour | 16 |
| <img src="parkspot/preview/home.jpg" alt="ParkSpot home page" width="220"> | **[ParkSpot](parkspot/)**<br>Parking spaces | Booking | Park closer for less | 16 |
| <img src="petpal-care/preview/home.jpg" alt="PetPal home page" width="220"> | **[PetPal](petpal-care/)**<br>Pet care | Service | Loving care while you’re away | 16 |
| <img src="petpal-sitters/preview/home.jpg" alt="PetPal home page" width="220"> | **[PetPal](petpal-sitters/)**<br>Pet sitting | Service | Trusted local pet sitters | 17 |
| <img src="roomly/preview/home.jpg" alt="Roomly home page" width="220"> | **[Roomly](roomly/)**<br>Rooms & shared flats (medium/long stays) | Booking | Rooms & shared flats for medium and long stays | 17 |
| <img src="sitterly/preview/home.jpg" alt="Sitterly home page" width="220"> | **[Sitterly](sitterly/)**<br>Babysitters & nannies | Service | Trusted sitters, whenever you need them | 16 |
| <img src="stackd/preview/home.jpg" alt="Stackd home page" width="220"> | **[Stackd](stackd/)**<br>Digital downloads (templates, courses, ebooks) | Product | Buy it once, download it now. | 16 |
| <img src="stashly/preview/home.jpg" alt="Stashly home page" width="220"> | **[Stashly](stashly/)**<br>Neighbourhood storage | Booking | Storage next door | 19 |
| <img src="taskpost/preview/home.jpg" alt="TaskPost home page" width="220"> | **[TaskPost](taskpost/)**<br>Local jobs & tasks | Service | Post a job, get offers from local pros | 17 |
| <img src="tutorly/preview/home.jpg" alt="Tutorly home page" width="220"> | **[Tutorly](tutorly/)**<br>Tutoring | Service | Learn faster with the right tutor | 17 |
| <img src="vowly/preview/home.jpg" alt="Vowly home page" width="220"> | **[Vowly](vowly/)**<br>Wedding vendors | Service | Find your dream wedding team | 17 |
| <img src="wanderly/preview/home.jpg" alt="Wanderly home page" width="220"> | **[Wanderly](wanderly/)**<br>Local experiences & tours | Booking | Experience cities like a local | 20 |
