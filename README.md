# Sito M1nd

Sito statico (HTML/CSS/JS, nessuna build). Anteprima locale: `python3 -m http.server 8080`.

## Pubblicazione gratuita
- **GitHub Pages**: carica la cartella su un repository → Settings → Pages → branch `main`, cartella `/`.
- **Netlify / Cloudflare Pages**: trascina la cartella (nessun comando di build, directory di output `.`).
Per usare `m1nd.it`, configura il dominio nel pannello dell'hosting e aggiorna `siteUrl` in `js/config.js`.

## Commenti (Disqus)
Crea un sito su disqus.com, copia lo *shortname* in `js/config.js` (`disqusShortname`). Nei file degli articoli aggiorna `data-url` del blocco `#disqus_thread` con l'URL definitivo.

## Nuovo articolo
Copia `blog/benvenuti.html` in `blog/<nome>.html`, cambia titolo, data, testo e `data-id` e `data-url` di `#disqus_thread`, poi aggiungi una card in `blog.html`.

## Da completare
Date degli incontri successivi al primo (pagine `eventi.html`).
