# MaFozok

Saját, statikus receptes webapp iPhone-ra (kezdőképernyőre téve appként fut). Cél: főzéskor nulla döntés, megnyitom és csinálom.
Élesben: https://shenkeeee.github.io/MaFozok/ (GitHub Pages, `main` branch, root). Nincs framework, nincs build lépés; egyetlen segédszkript van (`make-share-pages.mjs`).

## Fájlok
- `index.html` – minden UI + JS egy fájlban (lista, keresés, receptoldal hash routinggal `#<id>`, véletlen gomb, wake lock).
  - Keresés a kezdőlapon: név, hozzávalók, fűszerek, lépések és megjegyzések (és az opcionális `tags` mező) között. Kis/nagybetű- és ékezetfüggetlen, fzf-szerű: a beírt betűk sorrendben legyenek benne egy szóban („cske” → csirke). Több szó ÉS kapcsolattal. A név szerinti találat előre kerül. A „Mit főzök ma?” gomb a szűrt találatokból sorsol.
  - Megosztás: a receptoldalon jobb felül a megosztás gomb a recept megosztó oldalának linkjét (`content/<receptMappa>/`) másolja a vágólapra, „Link másolva” üzenettel. Kép nélküli recept sima `#id` linket másol.
- `make-share-pages.mjs` – minden recept saját mappájába (az első kép mappájába) egy `index.html` megosztó oldalt ír (Open Graph: kép + név, hogy Messengerben/chatben látszódjon), ami utána átirányít az appra. Erre azért kell, mert a link-előnézetet készítő robotok a `#id`-t nem veszik figyelembe és JS-t sem futtatnak. **Minden `recipes.json` vagy `images` változás után futtasd: `node make-share-pages.mjs`**, és a keletkezett `content/*/index.html` fájlok is kerüljenek a commitba. Két recept nem használhatja ugyanazt a mappát. A site címét a git `origin` remote-ból veszi.
- `recipes.json` – az adatréteg, ezt szerkesztjük.
- `content/<receptMappa>/` – a recept képei (és a generált `index.html` megosztó oldala), a JSON-ban teljes relatív úttal hivatkozva. A főkép `main.jpg`.
- `sw.js` – service worker: minden fájl cache-ből azonnal, háttérben revalidál (304). Változás a következő megnyitáskor látszik.
- `icon.png` (180px, apple-touch-icon) / `icon.svg` (forrás + favicon), `manifest.json`.

## Recept séma
```json
{
  "id": "bulgur-csirke",
  "name": "…",
  "time": 30, "portions": 4,
  "images": ["content/mappa/main.jpg"],
  "ingredients": { "csirkemell": "250–300 g" },
  "spices": ["só", "bors", "curry", "citromlé"],
  "steps": ["sima lépés", ["lépés", "megjegyzés a lépéshez"]],
  "process": [{ "src": "content/mappa/x.jpg", "step": 4 }]
}
```
`process`: folyamatfotó a recept alján, „N. lépés után” felirattal; a lépésnél kamera ikon görget oda. Ha `label` van (pl. „Mogyorós verzió”), az a felirat, és `step` nélkül nincs kamera ikon a lépésnél.

## Recept beírása (a user beillesztett, pl. Gemini-s szövegéből)
- Magyarul, tegező második személyben („felöntöd”).
- Fűszerek mennyiség nélkül; a citromlé fűszer. Olaj és díszítés (pl. újhagyma) ne kerüljön a hozzávalók közé.
- Kevés, rövid lépés; a user saját tapasztalatai a lépéshez tartozó megjegyzésként mennek.

## Dizájn
Csak light mode. Fehér háttér, piros kiemelés (`#e03131`), szürke másodlagos. Minimal, vékony vonalas inline SVG ikonok, emoji nincs.
Kezdőlap: „Szia, mit főzöl ma?” + jobbra kerek piros véletlen gomb. Receptoldal: bal felül piros „‹ Receptek” gomb, jobb felül piros „Megosztás” gomb (a gomb szövege `text-box: trim-both cap alphabetic`-kal van az ikonra középre igazítva). Telefonon egy oszlopos, nagy kártyák.

## Munkamenet
- **Ne commitolj magadtól**, csak ha a user kéri. Pusholni mindig a user pushol.
- Lokális előnézet: `python -m http.server 8000` (a `.claude/launch.json` „mafozok” konfigja), telefonméretben ellenőrizd.
