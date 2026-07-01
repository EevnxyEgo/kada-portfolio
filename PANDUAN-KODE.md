# Panduan Kode (Bahasa Indonesia)

Dokumen ini menjelaskan **setiap file** di project ini: apa kegunaannya, dan
bagaimana fungsi/logika di dalamnya bekerja. Tujuannya supaya kamu bisa memahami
kodenya secara menyeluruh dan menjelaskannya sendiri (misalnya saat wawancara).

Versi bahasa Inggris yang lebih ringkas ada di [`README.md`](README.md).

---

## Daftar isi

1. [Konsep dasar React (baca ini dulu)](#konsep-dasar-react-baca-ini-dulu)
2. [Alur besar: bagaimana aplikasi menyala](#alur-besar-bagaimana-aplikasi-menyala)
3. [Penjelasan per file — JavaScript / JSX](#penjelasan-per-file--javascript--jsx)
4. [Penjelasan per file — CSS](#penjelasan-per-file--css)
5. [File konfigurasi & aset](#file-konfigurasi--aset)

---

## Konsep dasar React (baca ini dulu)

Sebelum masuk per file, ini istilah yang dipakai berulang-ulang:

- **Komponen** = sebuah fungsi JavaScript yang mengembalikan (return) tampilan.
  Contoh: `function Hero() { return (...) }`. Nama komponen selalu diawali huruf
  besar.
- **JSX** = sintaks mirip HTML yang ditulis di dalam JavaScript. `<h1>Arsen</h1>`
  di dalam file `.jsx` itu JSX, bukan string.
- **Props** = cara komponen **induk** mengirim data ke komponen **anak**, ditulis
  seperti atribut HTML: `<Navbar activeSection={...} />`. Data selalu mengalir dari
  atas ke bawah (induk → anak).
- **State** = "ingatan" milik satu komponen. Kalau state berubah, React otomatis
  menggambar ulang (re-render) komponen itu sehingga tampilan ikut berubah. Dibuat
  dengan hook `useState`.
- **Hook** = fungsi khusus React yang namanya diawali `use` (`useState`,
  `useEffect`). Hanya boleh dipanggil di dalam komponen, di baris paling atas.
- **`.map()`** = mengubah sebuah array menjadi daftar elemen JSX. Dipakai untuk
  menampilkan daftar (skill, proyek, link nav).
- **`key`** = penanda unik untuk tiap item hasil `.map()`, supaya React tahu item
  mana yang berubah.
- **IntersectionObserver** = API bawaan browser (bukan React) yang memberi tahu kita
  saat sebuah elemen **masuk atau keluar dari layar**. Dipakai untuk dua hal:
  menyorot menu aktif, dan animasi muncul saat di-scroll.

---

## Alur besar: bagaimana aplikasi menyala

```
index.html  ->  src/main.jsx  ->  src/App.jsx  ->  semua komponen section
```

1. Browser membuka **`index.html`**. Di dalamnya ada `<div id="root"></div>` kosong
   dan `<script src="/src/main.jsx">`.
2. **`main.jsx`** mengambil `<div id="root">` itu, lalu menyuruh React menaruh
   komponen `<App />` di dalamnya.
3. **`App.jsx`** menyusun seluruh halaman: navbar, semua `<section>`, dan footer.

Hanya ada **satu halaman** (Single Page Application). Navigasi memakai link jangkar
(`href="#projects"`) + scroll halus, bukan pindah halaman/route.

---

## Penjelasan per file — JavaScript / JSX

### `index.html`

**Kegunaan:** satu-satunya halaman HTML. Ini kerangka kosong tempat React bekerja.

**Isi pentingnya:**
- `<title>` dan `<meta name="description">` → judul & deskripsi untuk tab browser
  dan hasil pencarian Google.
- Tag `og:...` (Open Graph) → mengatur tampilan saat link dibagikan di sosial media.
- Dua `<link>` font dari Google Fonts: **Space Grotesk** dan **JetBrains Mono**.
- `<div id="root"></div>` → "wadah" kosong; semua tampilan React masuk ke sini.
- `<script type="module" src="/src/main.jsx">` → memuat kode React kita.

---

### `src/main.jsx`

**Kegunaan:** titik masuk (entry point) aplikasi. File terpendek tapi paling penting
karena dia yang "menghidupkan" React.

```jsx
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import './index.css'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
```

**Cara kerja baris per baris:**
- `import './index.css'` → memuat semua style global (warna, font, spasi).
- `document.getElementById('root')` → mengambil `<div id="root">` dari `index.html`.
- `createRoot(...).render(<App />)` → menyuruh React menggambar `<App />` di dalam
  wadah itu.
- `<StrictMode>` → pembungkus khusus mode pengembangan yang membantu memunculkan bug.
  Tidak berpengaruh apa-apa di hasil build final.

---

### `src/App.jsx`

**Kegunaan:** "otak" aplikasi. Ini satu-satunya komponen yang punya state. Tugasnya:
menyimpan **section mana yang sedang dilihat**, menyalakan **dua
IntersectionObserver**, dan menampilkan semua bagian halaman secara berurutan.

**Bagian 1 — daftar link navigasi:**

```jsx
const navLinks = [
  { id: 'about', label: 'About' },
  { id: 'skills', label: 'Skills' },
  { id: 'projects', label: 'Projects' },
  { id: 'contact', label: 'Contact' },
]
```

Sebuah array biasa. Tiap `id` sama persis dengan `id` di `<section>` bawah, supaya
menu bisa "tahu" section mana yang sedang aktif.

**Bagian 2 — state:**

```jsx
const [activeSection, setActiveSection] = useState('hero')
```

`useState('hero')` membuat satu variabel ingatan bernama `activeSection` yang
nilainya diawali `'hero'`, plus fungsi `setActiveSection` untuk mengubahnya. Setiap
kali `setActiveSection('projects')` dipanggil, `App` menggambar ulang dan mengirim
nilai baru ke `Navbar`.

**Bagian 3 — useEffect pertama (scroll-spy / sorot menu aktif):**

```jsx
useEffect(() => {
  const sections = document.querySelectorAll('main section[id]')

  const spy = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) setActiveSection(entry.target.id)
      })
    },
    { rootMargin: '-50% 0px -50% 0px', threshold: 0 },
  )

  sections.forEach((section) => spy.observe(section))
  return () => spy.disconnect()
}, [])
```

Cara kerja:
- `useEffect(() => {...}, [])` → jalankan kode ini **sekali** setelah halaman muncul.
  Array kosong `[]` di akhir artinya "tidak ada pemicu untuk mengulang".
- `document.querySelectorAll('main section[id]')` → ambil semua `<section>` yang
  punya `id`.
- Trik utamanya ada di `rootMargin: '-50% 0px -50% 0px'`. Ini "mempersempit" area
  deteksi observer menjadi **satu garis tipis tepat di tengah layar** (atas dipotong
  50%, bawah dipotong 50%). Jadi sebuah section dianggap "sedang dilihat" hanya saat
  dia melewati garis tengah itu.
- Saat itu terjadi (`entry.isIntersecting` bernilai `true`), `setActiveSection`
  menyimpan `id` section tersebut → menu yang cocok langsung menyala.
- `return () => spy.disconnect()` → fungsi pembersih (cleanup). Kalau komponen
  dilepas, observer dimatikan supaya tidak jalan sia-sia.

**Bagian 4 — useEffect kedua (scroll-reveal / animasi muncul):**

```jsx
useEffect(() => {
  const revealEls = document.querySelectorAll('.reveal')

  const revealer = new IntersectionObserver(
    (entries, observer) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible')
          observer.unobserve(entry.target)
        }
      })
    },
    { threshold: 0.15 },
  )

  revealEls.forEach((el) => revealer.observe(el))
  return () => revealer.disconnect()
}, [])
```

Cara kerja:
- Semua elemen ber-class `reveal` awalnya transparan dan sedikit turun (diatur di
  `index.css`).
- `threshold: 0.15` → begitu **15%** elemen masuk layar, observer menambahkan class
  `is-visible`, yang membuatnya memudar-muncul ke posisi normal.
- `observer.unobserve(entry.target)` → berhenti mengawasi elemen itu, jadi animasinya
  cuma jalan **sekali** lalu diam (tidak hilang-muncul saat scroll bolak-balik).

**Bagian 5 — tampilan (return):**

```jsx
return (
  <>
    <a className="skip-link" href="#main">Skip to content</a>
    <Navbar navLinks={navLinks} activeSection={activeSection} />
    <main id="main">
      <Hero /><About /><Skills /><Projects /><Resume /><Contact />
    </main>
    <Footer />
  </>
)
```

- `<>...</>` = Fragment (pembungkus tanpa menambah tag HTML).
- `<Navbar navLinks={navLinks} activeSection={activeSection} />` → mengirim dua data
  (props) ke Navbar: daftar link + section aktif.
- `skip-link` = link "lompat ke konten" untuk pengguna keyboard/pembaca layar.

---

### `src/data/projects.js`

**Kegunaan:** menyimpan data 3 proyek terpisah dari tampilan. Kalau mau menambah
proyek, cukup tambah satu objek di sini — tidak perlu mengubah JSX.

```js
export const projects = [
  {
    id: 'hangman',                  // penanda unik (dipakai jadi key saat .map())
    tag: 'WEEK 1 · PRE-REACT',      // label mono di kartu
    title: 'Hangman Game',
    status: 'shipped',              // ditampilkan sebagai "✓ shipped"
    description: '...',
    techTags: ['HTML', 'CSS', ...], // jadi daftar teknologi
    liveUrl: 'https://...',         // link tombol "Live demo"
    repoUrl: 'https://...',         // link tombol "Code"
  },
  // ...proyek todo dan reel
]
```

`export const projects` artinya array ini bisa diimpor file lain (`Projects.jsx`
mengimpornya).

---

### `src/data/skills.js`

**Kegunaan:** daftar skill, juga terpisah dari tampilan.

```js
export const skills = ['HTML', 'CSS', 'JavaScript', 'React', 'Tailwind CSS', 'Git', 'VS Code']
```

Cuma array string biasa. `Skills.jsx` akan mengubahnya jadi daftar tag dengan `.map()`.

---

### `src/components/Navbar.jsx`

**Kegunaan:** bilah navigasi yang menempel di atas (sticky). Berisi logo, menu, dan
tombol hamburger untuk layar HP.

```jsx
export default function Navbar({ navLinks, activeSection }) {
  const [isOpen, setIsOpen] = useState(false)
  const solid = activeSection !== 'hero'
  const closeMenu = () => setIsOpen(false)
  ...
}
```

**Cara kerja:**
- `{ navLinks, activeSection }` → menerima dua props dari `App`.
- `const [isOpen, setIsOpen] = useState(false)` → state lokal: apakah menu HP sedang
  terbuka? Diawali `false` (tertutup). Ini state milik Navbar sendiri karena tidak
  ada komponen lain yang perlu tahu.
- `const solid = activeSection !== 'hero'` → nilai turunan (dihitung ulang tiap
  render). Bernilai `true` begitu kita **sudah lewat** section hero. Dipakai untuk
  memberi garis bawah tipis pada navbar setelah di-scroll.
- `const closeMenu = () => setIsOpen(false)` → fungsi kecil untuk menutup menu.

**Bagian tombol hamburger:**

```jsx
<button
  onClick={() => setIsOpen((open) => !open)}
  aria-expanded={isOpen}
  aria-label={isOpen ? 'Close menu' : 'Open menu'}
>
  {isOpen ? <X /> : <Menu />}
</button>
```

- `onClick={() => setIsOpen((open) => !open)}` → saat diklik, balik nilai `isOpen`
  (buka jadi tutup, tutup jadi buka). `(open) => !open` artinya "ambil nilai
  sekarang, kembalikan kebalikannya".
- `{isOpen ? <X /> : <Menu />}` → **rendering kondisional**: kalau terbuka tampilkan
  ikon X, kalau tidak tampilkan ikon garis-tiga.

**Bagian daftar menu:**

```jsx
{navLinks.map((link) => (
  <li key={link.id}>
    <a
      href={`#${link.id}`}
      className={`navbar__link ${activeSection === link.id ? 'is-active' : ''}`}
      aria-current={activeSection === link.id ? 'true' : undefined}
      onClick={closeMenu}
    >
      {link.label}
    </a>
  </li>
))}
```

- `navLinks.map(...)` → ubah array link jadi elemen `<li>`.
- `key={link.id}` → penanda unik tiap item.
- `href={`#${link.id}`}` → link jangkar, misalnya `#projects`.
- `activeSection === link.id ? 'is-active' : ''` → kalau link ini yang aktif, beri
  class `is-active` (warnanya jadi oranye).
- `onClick={closeMenu}` → saat link ditekan di HP, menu otomatis tertutup.

---

### `src/components/Hero.jsx`

**Kegunaan:** layar pertama. Tidak punya state — hanya menampilkan teks perkenalan
dan foto.

**Cara kerja:** dua kolom (grid) di layar lebar:
- Kolom kiri (`hero__intro`): baris log `// 14-day sprint · 3 projects shipped`, nama
  `Arsen`, peran `React Developer`, kalimat pembuka, dan dua link CTA ("View
  Projects" & "Contact").
- Kolom kanan (`hero__portrait`): foto `avatar.png` dalam bingkai bergaris tipis.

Catatan: teks `// 14-day sprint ...` itu **teks yang tampil di layar** (bagian dari
gaya "build log"), bukan komentar kode. Class `reveal` pada elemen membuatnya ikut
animasi muncul saat di-scroll.

---

### `src/components/About.jsx`

**Kegunaan:** bagian "tentang saya". Juga tanpa state.

**Cara kerja:** tata letak asimetris — kolom judul sempit di kiri (menempel/sticky
saat di-scroll di desktop, seperti catatan pinggir) di samping kolom teks yang lebih
lebar berisi tiga paragraf singkat.

---

### `src/components/Skills.jsx`

**Kegunaan:** menampilkan daftar skill sebagai teks sebaris (bukan badge warna-warni).

```jsx
import { skills } from '../data/skills'

<ul className="skills__list">
  {skills.map((skill) => (
    <li key={skill} className="skills__item">{skill}</li>
  ))}
</ul>
```

**Cara kerja:**
- `import { skills }` → ambil array dari `data/skills.js`.
- `skills.map((skill) => <li key={skill}>{skill}</li>)` → ubah tiap string jadi `<li>`.
  Karena isinya unik, `skill` itu sendiri dipakai sebagai `key`.
- Tanda titik pemisah `·` antar item dibuat lewat CSS (`::after`), bukan di JSX, jadi
  datanya tetap bersih.

---

### `src/components/Projects.jsx`

**Kegunaan:** membungkus daftar kartu proyek. Dia yang "menyuapkan" data ke tiap
kartu.

```jsx
import { projects } from '../data/projects'
import ProjectCard from './ProjectCard'

<div className="projects__list">
  {projects.map((project, index) => (
    <ProjectCard key={project.id} project={project} index={index} />
  ))}
</div>
```

**Cara kerja:**
- `projects.map((project, index) => ...)` → untuk tiap objek proyek, buat satu
  `<ProjectCard>`.
- `key={project.id}` → penanda unik.
- `project={project}` → kirim seluruh objek proyek sebagai prop.
- `index={index}` → kirim nomor urut (0, 1, 2). Dipakai kartu untuk membuat animasi
  muncul yang berurutan (bertahap).

---

### `src/components/ProjectCard.jsx`

**Kegunaan:** tampilan **satu** kartu proyek. Ini komponen "presentasional" — dia
tidak tahu data dari mana, hanya menampilkan apa yang dikirim lewat props.

```jsx
export default function ProjectCard({ project, index }) {
  const { tag, title, status, description, techTags, liveUrl, repoUrl } = project

  return (
    <article className="card reveal" style={{ transitionDelay: `${index * 80}ms` }}>
      ...
    </article>
  )
}
```

**Cara kerja:**
- `{ project, index }` → terima dua props dari `Projects`.
- `const { tag, title, ... } = project` → **destructuring**: membongkar objek
  `project` menjadi variabel-variabel terpisah supaya lebih pendek ditulis (daripada
  `project.tag`, `project.title`, dst).
- `style={{ transitionDelay: `${index * 80}ms` }}` → memberi jeda animasi berbeda tiap
  kartu. Kartu ke-0 jeda 0ms, ke-1 jeda 80ms, ke-2 jeda 160ms → efek muncul bertahap.

**Bagian isi kartu:**

```jsx
<p className="card__status">
  <span className="card__check" aria-hidden="true">✓</span>
  {status}
</p>

<ul className="card__tech">
  {techTags.map((tech) => (
    <li key={tech} className="card__tech-item">{tech}</li>
  ))}
</ul>

<div className="card__links">
  <a href={liveUrl} target="_blank" rel="noopener noreferrer">Live demo <ExternalLink /></a>
  <a href={repoUrl} target="_blank" rel="noopener noreferrer">Code <Github /></a>
</div>
```

- `{status}` → menampilkan nilai status (mis. "shipped") di sebelah tanda ✓.
- `techTags.map(...)` → ubah daftar teknologi jadi teks sebaris.
- `href={liveUrl}` / `href={repoUrl}` → link diambil langsung dari data proyek.
- `target="_blank"` → buka di tab baru. `rel="noopener noreferrer"` → pengaman
  standar saat membuka link ke situs lain.
- `aria-hidden="true"` pada ikon → ikon disembunyikan dari pembaca layar karena cuma
  hiasan (teks di sampingnya sudah cukup menjelaskan).

---

### `src/components/Resume.jsx`

**Kegunaan:** tombol unduh CV.

```jsx
<a href="/resume.pdf" download className="btn">
  Download résumé <Download />
</a>
```

**Cara kerja:** atribut **`download`** membuat browser **mengunduh** file, bukan
membukanya sebagai halaman. `/resume.pdf` diambil dari folder `public/` (Vite
menyajikan isi `public/` di alamat root situs).

---

### `src/components/Contact.jsx`

**Kegunaan:** bagian kontak, gaya seperti baris terminal. Tidak pakai form/backend.

```jsx
export default function Contact() {
  const email = "arseniuswahyu@gmail.com";
  const subject = "Portfolio Inquiry";
  const body = "Hi, I saw your portfolio and wanted to reach out regarding...";

  const mailtoUrl = `mailto:${email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  return ( ... );
}
```

**Cara kerja:**
- Tiga variabel (`email`, `subject`, `body`) menyiapkan isi email.
- `mailtoUrl` menggabungkannya jadi satu link `mailto:`. Saat diklik, aplikasi email
  pengguna terbuka **dengan subjek dan isi sudah terisi otomatis**.
- `encodeURIComponent(...)` → mengubah spasi dan karakter khusus menjadi format yang
  aman untuk URL (contoh: spasi jadi `%20`). Tanpa ini, subjek/isi bisa terpotong.
- Template string `` `mailto:${email}?...` `` → cara menyisipkan variabel ke dalam
  teks memakai backtick dan `${...}`.

**Bagian tampilan:** memakai `<dl>` (description list) — pasangan istilah/nilai:
- `<dt>` = kunci (`email`, `whatsapp`), `<dd>` = nilainya (link).
- Link email memakai `mailtoUrl`; link WhatsApp memakai `https://wa.me/62...`.
- Ikon (`Mail`, `MessageCircle`, `ArrowUpRight`) dari lucide-react, sebagai penanda
  kecil.

---

### `src/components/Footer.jsx`

**Kegunaan:** bagian penutup halaman. Tanpa state.

**Cara kerja:** menampilkan baris log penutup (`// end of log · day 14 · still
building`), nama, link sosial utama (GitHub & LinkedIn dengan ikon), link email &
WhatsApp yang lebih redup, lalu baris hak cipta. Semua link keluar memakai
`target="_blank"` + `rel="noopener noreferrer"`.

---

## Penjelasan per file — CSS

Prinsip umum: **kedalaman/tekstur dibuat dari garis tipis 1px (`--color-line`)**,
bukan bayangan. Sudut nyaris kotak (radius 2px). Dua font: Space Grotesk (judul &
teks) dan JetBrains Mono (label/metadata).

### `src/index.css` (paling penting)

File style global. Isinya:
- **Design tokens** di `:root` → semua warna, font, ukuran teks, dan spasi
  didefinisikan sekali sebagai variabel, lalu dipakai dengan `var(...)`. Ganti satu
  variabel, seluruh situs ikut berubah.
  ```css
  --color-paper: #f6f2ea;   /* latar */
  --color-ink: #1f1b16;     /* teks */
  --color-accent: #c2542c;  /* oranye aksen */
  --color-line: #ddd4c5;    /* garis tipis */
  ```
- **Reset** → menyamakan perilaku dasar antar browser (`box-sizing`, margin 0, dll).
- **Class utilitas** yang dipakai banyak komponen: `.container` (batas lebar konten),
  `.section` / `.section--raised` (jarak vertikal + selang-seling warna latar),
  `.mono-label`, `.section-head` (eyebrow + judul), `.link-underline` (garis bawah
  muncul saat hover), `.btn` (tombol garis).
- **Animasi reveal:**
  ```css
  .reveal { opacity: 0; transform: translateY(16px); transition: ... 500ms; }
  .reveal.is-visible { opacity: 1; transform: none; }
  ```
  Elemen mulai transparan & agak turun; saat class `is-visible` ditambahkan (oleh
  observer di `App.jsx`), dia memudar-muncul.
- **Prefers-reduced-motion:** blok `@media (prefers-reduced-motion: reduce)`
  mematikan animasi untuk pengguna yang minta lebih sedikit gerakan (aksesibilitas).

### CSS per komponen

Tiap komponen punya file CSS sendiri agar style dekat dengan markup-nya:

- **`Navbar.css`** → navbar sticky. Mobile-first: menu jadi dropdown, lalu berubah
  jadi baris horizontal pada layar `>=768px`. `.navbar.is-solid` menambah garis bawah
  setelah di-scroll.
- **`Hero.css`** → grid dua kolom (`1.4fr 1fr`) pada layar lebar; `min-height`
  membuat hero mengisi hampir satu layar penuh. `.hero__portrait` bingkai foto;
  `.avatar` membatasi lebar foto.
- **`About.css`** → grid dua kolom; `.about__aside` memakai `position: sticky` supaya
  judul menempel saat di-scroll di desktop.
- **`Skills.css`** → daftar sebaris (`flex-wrap`); titik pemisah `·` dibuat lewat
  `.skills__item:not(:last-child)::after`.
- **`Projects.css`** → daftar kartu ditumpuk vertikal (`flex-direction: column`).
- **`ProjectCard.css`** → kartu dengan grid (rel meta kiri + isi kanan pada desktop).
  Satu-satunya bayangan di situs ini muncul **hanya saat hover** kartu.
- **`Resume.css`** → tata letak tombol unduh (menyamping di desktop, bertumpuk di HP).
- **`Contact.css`** → kotak kontak bergaris; tiap baris dipisah garis tipis.
- **`Footer.css`** → tata letak footer (kiri: tanda tangan log, kanan: link).

---

## File konfigurasi & aset

- **`vite.config.js`** → konfigurasi Vite. Isinya hanya mengaktifkan plugin React
  (agar file `.jsx` bisa diproses).
- **`public/favicon.svg`** → ikon situs (kotak oranye + tanda `>`).
- **`public/resume.pdf`** → file CV yang diunduh tombol Resume.
- **`public/images/avatar.png`** → foto di bagian Hero.
- **`package.json`** → daftar dependensi (react, react-dom, lucide-react, vite) dan
  perintah (`npm run dev`, `npm run build`, `npm run preview`).

> Catatan: apa pun yang ditaruh di folder `public/` akan disalin apa adanya ke root
> situs. Karena itu foto dipanggil dengan `/images/avatar.png` dan CV dengan
> `/resume.pdf`.
