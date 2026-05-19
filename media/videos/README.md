# Video pubblici per Luminare Gallery

Questa cartella è pensata per ospitare file video `.mp4` accessibili direttamente tramite URL pubblico.

## Dove copiare i video
Copia i file `.mp4` direttamente in:

- `media/videos/`

## URL pubblico atteso
Se il sito è pubblicato su `https://www.luminaregallery.com`, il file `media/videos/nome-opera.mp4` sarà raggiungibile tramite:

- `https://www.luminaregallery.com/media/videos/nome-opera.mp4`

## Requisiti
- L’URL deve puntare direttamente al file `.mp4`.
- Il file deve essere servito con `Content-Type: video/mp4`.
- Deve essere accessibile pubblicamente senza login.

## Limiti consigliati
- Se il sito è distribuito come GitHub Pages o su un hosting statico, non caricare file `.mp4` molto grandi nel repo.
- GitHub Pages ha un limite di 100 MB per file e limiti di dimensioni del repository.
- Per file video più grandi o upload automatico, usare uno storage esterno come Cloudflare R2, Amazon S3, Bunny CDN o un bucket compatibile con HTTPS.

## Suggerimento operativo
- Per test manuale, aggiungi un file `media/videos/video-demo.mp4`.
- Per un uso reale, carica i file video nello storage esterno e aggiorna i riferimenti in `products.json` o nel CMS con gli URL corrispondenti.
