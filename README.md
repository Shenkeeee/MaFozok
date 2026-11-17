# MaFozok

Egy receptalkalmazás, ahol a saját receptjeidet tárolhatod képekkel és lépésekkel. Statikus oldal, nincs build és nincs backend, telefonon a kezdőképernyőre téve appként fut.

Élő példa: https://shenkeeee.github.io/MaFozok/

## Saját verzió

1. **Forkold a repót** (jobb felül, a csillag mellett). Így nálad is meglesz a projekt.
2. **Klónozd le a forkodat**, és írd át a `recipes.json`-t és a képeket a sajátjaidra.
   - AI-val egyszerűbb: add oda a `recipes.json` első elemét és egy mappa screenshotját, és a kép alapján megírja neked a receptet.
   - A `steps` egy lista. Ha egy lépés maga is lista, az első eleme a lépés, a többi megjegyzésként jelenik meg alatta.
   - A recepthez tartozó képek külön mappában vannak a `pics/` alatt. A főkép mindig `main.jpg`, a többi bármi lehet.
3. **Commit és push.**
4. **GitHub Pages:** Settings → Pages → Source: Deploy from a branch → `main` / `(root)`.
   - Az oldalad címe: `https://<felhasználónév>.github.io/MaFozok/`

Innentől csak a `recipes.json` és a képek frissítése, commit, push.

iPhone-on: Safari → Megosztás → Hozzáadás a főképernyőhöz.

> A GitHub Pages ingyenes fiókkal csak publikus repóból működik, vagyis a receptjeid és a képeid bárki számára láthatók lesznek.

## Fejlesztés

Ha a projektet szeretnéd fejleszteni, a forkodból nyiss pull requestet az eredeti repóra. A `recipes.json` és a képek a te receptjeid, ezeket PR-nél majd megbeszéljük.

A recept séma és a részletek a [CLAUDE.md](CLAUDE.md)-ben vannak.
