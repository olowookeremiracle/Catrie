# Catrie — Image Credits

Each cake ships 3–4 distinct views plus a smaller card cover, all in
`public/images/cakes/<key>/`:

```
1.webp … N.webp    gallery cuts, 960×1200, ≤115 KB
cover.webp          card cut,     640×800,  ≤58 KB
```

## How the photos are made

The images are **editorial product photography** generated with an AI image
model (Gemini) and dropped into `public/images/uploads/<key>/` as
`1.jpg … N.jpg`. They are then compressed and wired in with:

```bash
# Compress + wire all photos for a cake (keeps your numbering order).
node scripts/process-upload.mjs <cakeKey> [1,2,3,4]

# Add one extra photo to the end of an existing gallery.
node scripts/add-photo.mjs <cakeKey> <uploadFileName>
```

- Gallery cuts are 960×1200, ≤115 KB (quality auto-stepped to fit).
- Card covers are 640×800, ≤58 KB.
- `public/images/uploads/<key>/preview-N.png` is a contact strip of the final
  crops for quick visual review.

## Per-cake counts

Counts live in `src/data/cakePhotos.ts` (the `cakePhotoOverrides` map).
Cakes with 3 photos: chocolate-midnight, lemon-poppy-seed, the-heirloom,
the-first-issue. All others ship 4.
