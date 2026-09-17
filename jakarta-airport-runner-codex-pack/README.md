# Jakarta Airport Runner — Codex Starter Pack

Paket ini dirancang agar Anda bisa langsung memulai project di Codex Desktop.

## Cara memakai

1. Ekstrak ZIP ke folder project baru.
2. Buka folder tersebut melalui Codex Desktop.
3. Buka `MASTER_PROMPT.md`, salin seluruh isinya, lalu kirim ke Codex.
4. Izinkan Codex menjalankan instalasi dependency, development server, test, dan browser preview.
5. Biarkan Codex menyelesaikan vertical slice lebih dahulu sebelum meminta penambahan fitur.
6. Jika sesi berhenti di tengah jalan, gunakan prompt yang sesuai dari `CODEX_CONTINUATION_PROMPTS.md`.

## Isi paket

- `MASTER_PROMPT.md` — prompt utama siap copy-paste.
- `CODEX_CONTINUATION_PROMPTS.md` — prompt lanjutan per tahap.
- `docs/GAME_DESIGN.md` — aturan gameplay dan balancing.
- `docs/ASSET_MANIFEST.md` — fungsi setiap gambar referensi.
- `docs/LEVEL_MAP.md` — peta level, percabangan, dan checkpoint.
- `assets/reference/` — seluruh gambar acuan karakter, environment, obstacle, dan UI.

## Catatan penting tentang aset

PNG di folder `assets/reference/` adalah **concept and modeling references**, bukan model 3D siap pakai. MVP harus membuat karakter dan environment 3D stylized secara procedural di Three.js. Struktur kode wajib menyediakan jalur penggantian ke model rigged `.glb` di masa depan tanpa menulis ulang gameplay.

Jangan menunggu model `.glb` untuk membuat prototype. Prioritaskan feel permainan, kamera, navigasi, obstacle, dan performa lebih dahulu.
