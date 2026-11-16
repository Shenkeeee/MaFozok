# MaFozok

Saját, statikus receptes webapp iPhone-ra (kezdőképernyőre téve appként fut). Cél: főzéskor nulla döntés, megnyitom és csinálom.
Élesben: https://shenkeeee.github.io/MaFozok/ (GitHub Pages, `main` branch, root). Nincs build, nincs framework.

## Fájlok
- `index.html` – minden UI + JS egy fájlban (lista, receptoldal hash routinggal `#<id>`, véletlen gomb, wake lock).
- `recipes.json` – az adatréteg, ezt szerkesztjük.
- `pics/<receptMappa>/` – képek, a JSON-ban teljes relatív úttal hivatkozva.
- `sw.js` – service worker: minden fájl cache-ből azonnal, háttérben revalidál (304). Változás a következő megnyitáskor látszik.
- `icon.png` (180px, apple-touch-icon) / `icon.svg` (forrás + favicon), `manifest.json`.

## Recept séma
```json
{
  "id": "bulgur-csirke",
  "name": "…",
  "time": 30, "portions": 4,
  "images": ["pics/mappa/main.jpg"],
  "ingredients": { "csirkemell": "250–300 g" },
  "spices": ["só", "bors", "curry", "citromlé"],
  "steps": ["sima lépés", ["lépés", "megjegyzés a lépéshez"]],
  "process": [{ "src": "pics/mappa/x.jpg", "step": 4 }]
}
```
`process`: folyamatfotó a recept alján, „N. lépés után” felirattal; a lépésnél kamera ikon görget oda. Ha `label` van (pl. „Mogyorós verzió”), az a felirat, és `step` nélkül nincs kamera ikon a lépésnél.

## Recept beírása (a user beillesztett, pl. Gemini-s szövegéből)
- Magyarul, tegező második személyben („felöntöd”).
- Fűszerek mennyiség nélkül; a citromlé fűszer. Olaj és díszítés (pl. újhagyma) ne kerüljön a hozzávalók közé.
- Kevés, rövid lépés; a user saját tapasztalatai a lépéshez tartozó megjegyzésként mennek.

## Dizájn
Csak light mode. Fehér háttér, piros kiemelés (`#e03131`), szürke másodlagos. Minimal, vékony vonalas inline SVG ikonok, emoji nincs.
Kezdőlap: „Szia, mit főzöl ma?” + jobbra kerek piros véletlen gomb. Receptoldal: bal felül piros „‹ Receptek” gomb. Telefonon egy oszlopos, nagy kártyák.

## Munkamenet
- **Ne commitolj magadtól**, csak ha a user kéri. Pusholni mindig a user pushol.
- Lokális előnézet: `python -m http.server 8000` (a `.claude/launch.json` „mafozok” konfigja), telefonméretben ellenőrizd.
