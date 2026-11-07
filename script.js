/* ============ SETTINGS (edit these) ============ */
const BRAND = "P_MUSIC";
const WHATSAPP = "2347043251583";          // 07043251583 in international format
const WHATSAPP_SHOW = "0704 325 1583";
const EMAIL = "Pm2982986@gmail.com";

// Paste the full links. Empty ones are hidden.
const SOCIALS = { Instagram: "", YouTube: "", TikTok: "", X: "", Facebook: "" };

// Leave empty for DEMO MODE. Fill in after the Supabase project is ready.
const SUPABASE_URL = "";
const SUPABASE_KEY = "";
/* ================================================ */

const DEFAULT_CONTENT = {
  hero_text: "Discover beats, music production resources and professional production services from a serious music brand.",
  about_text:
    "P_MUSIC is a music production brand built on quality, originality and a passion for sound.\n\n" +
    "From crafting beats that artists can record on, to creating melodies, drum kits and production resources for other producers, the mission is simple: go beyond the beats and deliver music that stands out.\n\n" +
    "Whether you are an artist looking for the right instrumental, a producer looking for fresh sounds, or a brand that needs professional production, P_MUSIC is here to help you create something great."
};

const DEMO = {
  licenses: [
    { id: 1, name: "Basic Lease", price: 10000, description: "MP3 file for one project with limited streams.", includes: ["mp3"] },
    { id: 2, name: "Premium Lease", price: 25000, description: "MP3 and WAV files for one project with more streams.", includes: ["mp3", "wav"] },
    { id: 3, name: "Unlimited + Stems", price: 50000, description: "MP3, WAV and track stems with unlimited streams.", includes: ["mp3", "wav", "stems"] },
    { id: 4, name: "Exclusive Rights", price: 150000, description: "All files. The beat is removed from the store after purchase.", includes: ["mp3", "wav", "stems"] }
  ],
  beats: [
    { id: "b1", title: "Lagos Nights", genre: "Afrobeats", bpm: 102, musical_key: "F# min", featured: true },
    { id: "b2", title: "Amapiano Sunrise", genre: "Amapiano", bpm: 112, musical_key: "A min", featured: true },
    { id: "b3", title: "Street Lights", genre: "Trap", bpm: 140, musical_key: "C min", featured: true },
    { id: "b4", title: "Midnight Love", genre: "R&B", bpm: 90, musical_key: "D min", featured: true },
    { id: "b5", title: "Block Party", genre: "Drill", bpm: 144, musical_key: "B min" },
    { id: "b6", title: "Island Vibes", genre: "Afro Fusion", bpm: 98, musical_key: "G maj" }
  ],
  products: [
    { id: "p1", name: "Afro Drum Kit Vol. 1", category: "Drum Kits", description: "Punchy kicks, snares, hats and percussion for Afrobeats and Amapiano.", price: 8000, featured: true },
    { id: "p2", name: "Log Drum Essentials", category: "Sample Packs & Loops", description: "Deep log drum hits and loops ready for your next Amapiano beat.", price: 6500, featured: true },
    { id: "p3", name: "Melody Starter Pack", category: "Melody Packs", description: "Emotional melodies and chord ideas to kick off your beats fast.", price: 7000, featured: true },
    { id: "p4", name: "Afro MIDI Collection", category: "MIDI Packs", description: "Chords, basslines and melodies in MIDI format for any DAW.", price: 9000 },
    { id: "p5", name: "Vocal Chain Preset", category: "Presets", description: "A clean, ready to use vocal chain preset for fast mixing.", price: 5000 },
    { id: "p6", name: "Producer Resource Bundle", category: "Other Resources", description: "A bundle of useful files and templates for music producers.", price: 12000 }
  ],
  portfolio: [
    { id: "w1", title: "Afrobeats Single", description: "Full production, arrangement and mixing.", media_url: "", link_url: "" },
    { id: "w2", title: "Amapiano Project", description: "Beat making and melody creation.", media_url: "", link_url: "" },
    { id: "w3", title: "R&B Instrumental", description: "Instrumental development and sound design.", media_url: "", link_url: "" }
  ],
  services: [
    { id: 1, icon: "🎹", title: "Music Production", description: "Full song production from idea to finished record, tailored to your sound." },
    { id: 2, icon: "🥁", title: "Beat Making", description: "Custom beats in Afrobeats, Amapiano, Trap, R&B, Drill and more." },
    { id: 3, icon: "🎼", title: "Melody Creation & Arrangement", description: "Memorable melodies and arrangements that bring your record to life." },
    { id: 4, icon: "🎚️", title: "Audio Editing & Resampling", description: "Clean editing, chopping and resampling to give your audio a fresh identity." },
    { id: 5, icon: "🎛️", title: "Instrumental Development", description: "Turn rough ideas into complete, polished instrumentals." }
  ]
};

const CATEGORIES = ["MIDI Packs", "Drum Kits", "Sample Packs & Loops", "Melody Packs", "Presets", "Other Resources"];

/* ---------- Helpers ---------- */
function $(id) { return document.getElementById(id); }
function money(n) { return "₦" + Number(n).toLocaleString(); }
function esc(s) {
  return String(s == null ? "" : s).replace(/[&<>"']/g, function (c) {
    return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c];
  });
}
function save(k, v) { try { localStorage.setItem(k, JSON.stringify(v)); } catch (e) {} }
function read(k, d) { try { const v = localStorage.getItem(k); return v ? JSON.parse(v) : d; } catch (e) { return d; } }

const PAL = [["#ff2f8e", "#7b2cbf"], ["#ff7a3c", "#c9184a"], ["#00b4d8", "#7b2cbf"], ["#ffb02e", "#ff2f8e"], ["#7b2cbf", "#240046"], ["#06d6a0", "#118ab2"]];
function hash(s) { let h = 0; for (let i = 0; i < s.length; i++) h = (h * 31 + s.charCodeAt(i)) >>> 0; return h; }
function coverStyle(t) { const p = PAL[hash(String(t)) % PAL.length]; return "background:linear-gradient(135deg," + p[0] + "," + p[1] + ")"; }
function coverInner(item, emoji) {
  return item.cover_url
    ? "<img src='" + esc(item.cover_url) + "' alt='" + esc(item.title || item.name) + " cover' loading='lazy'>"
    : "<span class='ce'>" + emoji + "</span>";
}

let toastTimer;
function toast(t) {
  const el = $("toast");
  el.textContent = t;
  el.classList.add("show");
  clearTimeout(toastTimer);
  toastTimer = setTimeout(function () { el.classList.remove("show"); }, 2600);
}

/* ---------- Data ---------- */
let sb = null;
try { if (SUPABASE_URL && SUPABASE_KEY) sb = window.supabase.createClient(SUPABASE_URL, SUPABASE_KEY); } catch (e) { sb = null; }

const DATA = { licenses: [], beats: [], products: [], portfolio: [], services: [], content: {} };

function useDemo() {
  DATA.licenses = DEMO.licenses;
  DATA.beats = DEMO.beats;
  DATA.products = DEMO.products;
  DATA.portfolio = DEMO.portfolio;
  DATA.services = DEMO.services;
  DATA.content = {};
}

async function loadData() {
  if (!sb) { useDemo(); return; }
  try {
    const r = await Promise.all([
      sb.from("licenses").select("*").eq("active", true).order("sort"),
      sb.from("beats").select("id,title,genre,bpm,musical_key,cover_url,preview_url,featured").eq("active", true).order("created_at", { ascending: false }),
      sb.from("products").select("id,name,category,description,price,cover_url,preview_url,featured").eq("active", true).order("created_at", { ascending: false }),
      sb.from("portfolio").select("*").order("sort"),
      sb.from("services").select("*").order("sort"),
      sb.from("site_content").select("*")
    ]);
    if (r[0].error || r[1].error) throw new Error("load");
    DATA.licenses = r[0].data && r[0].data.length ? r[0].data : DEMO.licenses;
    DATA.beats = r[1].data || [];
    DATA.products = (r[2].data || []);
    DATA.portfolio = r[3].data || [];
    DATA.services = r[4].data && r[4].data.length ? r[4].data : DEMO.services;
    DATA.content = {};
    (r[5].data || []).forEach(function (row) { DATA.content[row.key] = row.value; });
  } catch (e) {
    useDemo();
  }
}

function content(key) { return DATA.content[key] || DEFAULT_CONTENT[key] || ""; }

/* ---------- Scroll reveal ---------- */
const io = new IntersectionObserver(function (entries) {
  entries.forEach(function (e) {
    if (e.isIntersecting) { e.target.classList.add("show"); io.unobserve(e.target); }
  });
}, { threshold: 0.1 });

function reveal(root) {
  (root || document).querySelectorAll(".rv:not(.show)").forEach(function (el) { io.observe(el); });
}

/* ---------- Player ---------- */
const audio = new Audio();
audio.preload = "none";
let playing = { type: null, id: null };

function findItem(type, id) {
  const list = type === "beat" ? DATA.beats : DATA.products;
  return list.filter(function (x) { return String(x.id) === String(id); })[0];
}

function playItem(type, id) {
  const item = findItem(type, id);
  if (!item) return;
  if (!item.preview_url) { toast("Preview coming soon 🎧"); return; }
  if (playing.type === type && String(playing.id) === String(id)) {
    if (audio.paused) audio.play().catch(function () {}); else audio.pause();
    return;
  }
  audio.src = item.preview_url;
  playing = { type: type, id: id };
  audio.play().catch(function () { toast("Could not play this preview."); });
  showMini(item, type);
  refreshPlayer();
}

function showMini(item, type) {
  $("mTitle").textContent = item.title || item.name;
  $("mSub").textContent = type === "beat" ? [item.genre, item.bpm ? item.bpm + " BPM" : ""].filter(Boolean).join(" • ") : (item.category || "");
  const c = $("mCover");
  c.style.cssText = coverStyle(item.title || item.name);
  c.innerHTML = item.cover_url ? "<img src='" + esc(item.cover_url) + "' alt=''>" : (type === "beat" ? "🎧" : "🎹");
  $("mini").classList.add("show");
  document.body.classList.add("playing-on");
}

function miniToggle() { if (audio.src) { if (audio.paused) audio.play().catch(function () {}); else audio.pause(); } }
function miniClose() {
  audio.pause();
  playing = { type: null, id: null };
  $("mini").classList.remove("show");
  document.body.classList.remove("playing-on");
  refreshPlayer();
}

function seek(e, key) {
  const parts = key.split(":");
  if (!(playing.type === parts[0] && String(playing.id) === parts[1]) || !audio.duration) return;
  const rect = e.currentTarget.getBoundingClientRect();
  audio.currentTime = ((e.clientX - rect.left) / rect.width) * audio.duration;
}

function refreshPlayer() {
  const key = playing.type ? playing.type + ":" + playing.id : "";
  const on = !audio.paused && !!key;
  document.querySelectorAll("[data-pk]").forEach(function (b) {
    const active = on && b.getAttribute("data-pk") === key;
    b.textContent = active ? "⏸" : "▶";
    const card = b.closest(".beat, .prod");
    if (card) card.classList.toggle("playing", active);
  });
  document.querySelectorAll("[data-fill]").forEach(function (f) {
    if (f.getAttribute("data-fill") !== key) f.style.width = "0%";
  });
  $("mPlay").textContent = on ? "⏸" : "▶";
}

audio.addEventListener("play", refreshPlayer);
audio.addEventListener("pause", refreshPlayer);
audio.addEventListener("ended", function () { $("mFill").style.width = "0%"; refreshPlayer(); });
audio.addEventListener("timeupdate", function () {
  if (!audio.duration || !playing.type) return;
  const pct = (audio.currentTime / audio.duration) * 100 + "%";
  $("mFill").style.width = pct;
  const key = playing.type + ":" + playing.id;
  document.querySelectorAll("[data-fill]").forEach(function (f) {
    if (f.getAttribute("data-fill") === key) f.style.width = pct;
  });
});

/* ---------- Beat store ---------- */
let beatGenre = "All";
let beatQuery = "";
let beatSort = "new";

function beatCard(b, i) {
  const key = "beat:" + b.id;
  const opts = DATA.licenses.map(function (l) {
    return "<option value='" + l.id + "'>" + esc(l.name) + " - " + money(l.price) + "</option>";
  }).join("");
  const d = document.createElement("div");
  d.className = "beat rv";
  d.style.transitionDelay = (i % 2) * 0.1 + "s";
  d.innerHTML =
    "<div class='cover' style='" + coverStyle(b.title) + "'>" + coverInner(b, "🎧") +
      "<button class='pbtn' data-pk='" + key + "' onclick=\"playItem('beat','" + esc(b.id) + "')\" aria-label='Play preview'>▶</button>" +
      "<div class='bars'><i></i><i></i><i></i><i></i><i></i></div>" +
    "</div>" +
    "<div class='bmeta'>" +
      "<h3>" + esc(b.title) + "</h3>" +
      "<div class='tags'><span>" + esc(b.genre || "Beat") + "</span>" +
        (b.bpm ? "<span>" + b.bpm + " BPM</span>" : "") +
        (b.musical_key ? "<span>" + esc(b.musical_key) + "</span>" : "") + "</div>" +
      "<div class='prog' onclick=\"seek(event,'" + key + "')\"><div class='fill' data-fill='" + key + "'></div></div>" +
      "<select aria-label='Choose licence'>" + opts + "</select>" +
      "<button class='btn sm' onclick=\"addBeat('" + esc(b.id) + "',this)\">Add to Cart</button>" +
    "</div>";
  return d;
}

function renderBeatChips() {
  const genres = ["All"];
  DATA.beats.forEach(function (b) { if (b.genre && genres.indexOf(b.genre) === -1) genres.push(b.genre); });
  const box = $("beatChips");
  box.innerHTML = "";
  genres.forEach(function (g) {
    const c = document.createElement("button");
    c.className = "chip" + (g === beatGenre ? " active" : "");
    c.textContent = g;
    c.onclick = function () { beatGenre = g; renderBeatChips(); renderBeats(); };
    box.appendChild(c);
  });
}

function renderBeats() {
  let list = DATA.beats.slice();
  if (beatGenre !== "All") list = list.filter(function (b) { return b.genre === beatGenre; });
  if (beatQuery) list = list.filter(function (b) { return (b.title + " " + (b.genre || "")).toLowerCase().indexOf(beatQuery) !== -1; });
  if (beatSort === "low") list.sort(function (a, b) { return (a.bpm || 0) - (b.bpm || 0); });
  if (beatSort === "high") list.sort(function (a, b) { return (b.bpm || 0) - (a.bpm || 0); });
  const box = $("beatList");
  box.innerHTML = "";
  list.forEach(function (b, i) { box.appendChild(beatCard(b, i)); });
  $("beatEmpty").classList.toggle("hidden", list.length > 0);
  $("beatEmpty").textContent = DATA.beats.length ? "🎧 No beats found." : "🎧 New beats are coming soon. Check back shortly!";
  reveal(box);
  refreshPlayer();
}

function onBeatSearch(v) { beatQuery = v.trim().toLowerCase(); renderBeats(); }
function onBeatSort(v) { beatSort = v; renderBeats(); }

function renderLicenses() {
  const box = $("licList");
  box.innerHTML = "";
  DATA.licenses.forEach(function (l, i) {
    const d = document.createElement("div");
    d.className = "lic rv";
    d.style.transitionDelay = (i % 4) * 0.08 + "s";
    d.innerHTML =
      "<h4>" + esc(l.name) + "</h4><div class='price'>" + money(l.price) + "</div>" +
      "<p>" + esc(l.description || "") + "</p>" +
      "<div class='inc'>" + esc((l.includes || []).join(" + ")) + "</div>";
    box.appendChild(d);
  });
  reveal(box);
}

/* ---------- Digital store ---------- */
let digCat = "All";
let digQuery = "";

function productCard(p, i) {
  const key = "product:" + p.id;
  const d = document.createElement("div");
  d.className = "prod rv";
  d.style.transitionDelay = (i % 2) * 0.1 + "s";
  d.innerHTML =
    "<div class='pimg' style='" + coverStyle(p.name) + "'>" + coverInner(p, "🎹") +
      "<span class='cat-badge'>" + esc(p.category || "Digital") + "</span>" +
      (p.preview_url ? "<button class='pbtn' data-pk='" + key + "' onclick=\"playItem('product','" + esc(p.id) + "')\" aria-label='Play preview'>▶</button>" : "") +
    "</div>" +
    "<div class='pbody'>" +
      "<h3>" + esc(p.name) + "</h3>" +
      "<p>" + esc(p.description || "") + "</p>" +
      "<div class='prow'><div class='pprice'>" + money(p.price) + "</div>" +
      "<button class='add' onclick=\"addProduct('" + esc(p.id) + "',this)\">Add to Cart</button></div>" +
    "</div>";
  return d;
}

function renderDigChips() {
  const cats = ["All"];
  CATEGORIES.forEach(function (c) { cats.push(c); });
  DATA.products.forEach(function (p) { if (p.category && cats.indexOf(p.category) === -1) cats.push(p.category); });
  const box = $("digChips");
  box.innerHTML = "";
  cats.forEach(function (c) {
    const b = document.createElement("button");
    b.className = "chip" + (c === digCat ? " active" : "");
    b.textContent = c;
    b.onclick = function () { digCat = c; renderDigChips(); renderDigital(); };
    box.appendChild(b);
  });
}

function renderDigital() {
  let list = DATA.products.slice();
  if (digCat !== "All") list = list.filter(function (p) { return p.category === digCat; });
  if (digQuery) list = list.filter(function (p) { return (p.name + " " + (p.description || "")).toLowerCase().indexOf(digQuery) !== -1; });
  const box = $("digGrid");
  box.innerHTML = "";
  list.forEach(function (p, i) { box.appendChild(productCard(p, i)); });
  $("digEmpty").classList.toggle("hidden", list.length > 0);
  $("digEmpty").textContent = DATA.products.length ? "🎹 No products found." : "🎹 New products are coming soon. Check back shortly!";
  reveal(box);
  refreshPlayer();
}

function onDigSearch(v) { digQuery = v.trim().toLowerCase(); renderDigital(); }

/* ---------- Home, services, portfolio, about, contact ---------- */
function renderHome() {
  $("heroText").textContent = content("hero_text");

  const fb = $("featBeats");
  fb.innerHTML = "";
  let beats = DATA.beats.filter(function (b) { return b.featured; });
  if (!beats.length) beats = DATA.beats.slice(0, 4);
  beats.slice(0, 4).forEach(function (b, i) { fb.appendChild(beatCard(b, i)); });
  if (!beats.length) fb.innerHTML = "<p class='empty'>🎧 New beats are coming soon.</p>";

  const fd = $("featDigital");
  fd.innerHTML = "";
  let prods = DATA.products.filter(function (p) { return p.featured; });
  if (!prods.length) prods = DATA.products.slice(0, 3);
  prods.slice(0, 3).forEach(function (p, i) { fd.appendChild(productCard(p, i)); });
  if (!prods.length) fd.innerHTML = "<p class='empty'>🎹 New products are coming soon.</p>";

  const hs = $("homeServices");
  hs.innerHTML = "";
  DATA.services.slice(0, 3).forEach(function (s, i) { hs.appendChild(serviceCard(s, i, false)); });
  reveal();
}

function serviceCard(s, i, withBtn) {
  const d = document.createElement("div");
  d.className = "svc rv";
  d.style.transitionDelay = (i % 3) * 0.1 + "s";
  d.innerHTML =
    "<div class='ic'>" + esc(s.icon || "🎵") + "</div><h3>" + esc(s.title) + "</h3><p>" + esc(s.description || "") + "</p>" +
    (withBtn ? "<button class='btn sm' onclick=\"enquire('" + esc(s.title).replace(/'/g, "") + "')\">Enquire about this</button>" : "");
  return d;
}

function renderServices() {
  const box = $("svcList");
  box.innerHTML = "";
  DATA.services.forEach(function (s, i) { box.appendChild(serviceCard(s, i, true)); });
  const sel = $("qService");
  sel.innerHTML = "<option value=''>What do you need?</option>";
  DATA.services.forEach(function (s) {
    const o = document.createElement("option");
    o.value = s.title;
    o.textContent = s.title;
    sel.appendChild(o);
  });
  const other = document.createElement("option");
  other.value = "Other";
  other.textContent = "Other";
  sel.appendChild(other);
  reveal(box);
}

function enquire(title) {
  $("qService").value = title;
  navigate("contact");
  setTimeout(function () { toast("Service selected: " + title); }, 1500);
}

function renderPortfolio() {
  const box = $("portList");
  box.innerHTML = "";
  if (!DATA.portfolio.length) {
    box.innerHTML = "<p class='empty'>🎼 Projects will be added here soon.</p>";
    return;
  }
  DATA.portfolio.forEach(function (w, i) {
    const d = document.createElement("div");
    d.className = "port rv";
    d.style.transitionDelay = (i % 3) * 0.1 + "s";
    const link = w.link_url ? "<a class='btn sm' href='" + esc(w.link_url) + "' target='_blank' rel='noopener'>Listen / View</a>" : "";
    d.innerHTML =
      "<div class='pimg' style='" + coverStyle(w.title) + "'>" +
        (w.media_url ? "<img src='" + esc(w.media_url) + "' alt='" + esc(w.title) + "' loading='lazy'>" : "<span class='ce'>🎼</span>") +
      "</div><div class='pbody'><h3>" + esc(w.title) + "</h3><p>" + esc(w.description || "") + "</p>" + link + "</div>";
    box.appendChild(d);
  });
  reveal(box);
}

function renderContact() {
  $("aboutText").textContent = content("about_text");
  const wa = "https://wa.me/" + WHATSAPP + "?text=" + encodeURIComponent("Hello P_MUSIC, I would like to make an enquiry.");
  $("waCard").href = wa;
  $("waFloat").href = wa;
  $("waShow").textContent = WHATSAPP_SHOW;
  $("mailCard").href = "mailto:" + EMAIL;
  $("mailShow").textContent = EMAIL;
  const box = $("socials");
  box.innerHTML = "";
  Object.keys(SOCIALS).forEach(function (name) {
    if (!SOCIALS[name]) return;
    const a = document.createElement("a");
    a.href = SOCIALS[name];
    a.target = "_blank";
    a.rel = "noopener";
    a.textContent = name;
    box.appendChild(a);
  });
}

/* ---------- Enquiry ---------- */
function validEmail(e) { return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(e); }

async function sendEnquiry() {
  const name = $("qName").value.trim();
  const email = $("qEmail").value.trim();
  const phone = $("qPhone").value.trim();
  const service = $("qService").value;
  const date = $("qDate").value;
  const msg = $("qMsg").value.trim();

  if (name.length < 2) { toast("Please enter your name."); return; }
  if (!validEmail(email) && phone.length < 8) { toast("Please enter your email or phone number."); return; }
  if (!service) { toast("Please choose a service."); return; }
  if (msg.length < 5) { toast("Please tell me a little about your project."); return; }

  const full = msg + (date ? "\n\nPreferred date: " + date : "");
  const wa =
    "Hello P_MUSIC, I would like to enquire about: " + service + "\n\n" + full +
    "\n\nName: " + name + (phone ? "\nPhone: " + phone : "") + (email ? "\nEmail: " + email : "");
  const waLink = "https://wa.me/" + WHATSAPP + "?text=" + encodeURIComponent(wa);

  const btn = $("qBtn");
  btn.disabled = true;
  btn.textContent = "Sending...";

  if (sb) {
    try {
      const res = await sb.from("enquiries").insert({ name: name, email: email, phone: phone, service: service, message: full });
      if (res.error) throw res.error;
    } catch (e) {
      btn.disabled = false;
      btn.textContent = "Send Enquiry";
      toast("Could not send. Opening WhatsApp instead.");
      window.open(waLink, "_blank");
      return;
    }
  } else {
    window.open(waLink, "_blank");
  }

  btn.classList.add("hidden");
  $("qDone").classList.remove("hidden");
  $("qWa").href = waLink;
  ["qName", "qEmail", "qPhone", "qMsg", "qDate"].forEach(function (id) { $(id).value = ""; });
}

/* ---------- Cart ---------- */
let cart = read("pm_cart", []);

function bump() {
  const b = $("cartCount");
  b.classList.remove("bump");
  void b.offsetWidth;
  b.classList.add("bump");
}

function addBeat(id, btn) {
  const b = findItem("beat", id);
  const sel = btn.closest(".beat").querySelector("select");
  const lic = DATA.licenses.filter(function (l) { return String(l.id) === String(sel.value); })[0];
  if (!b || !lic) return;
  cart = cart.filter(function (c) { return !(c.type === "beat" && String(c.id) === String(id)); });
  cart.push({ type: "beat", id: String(b.id), title: b.title, sub: lic.name, license_id: lic.id, price: lic.price, cover: b.cover_url || "" });
  afterAdd(btn, b.title + " (" + lic.name + ") added ✓");
}

function addProduct(id, btn) {
  const p = findItem("product", id);
  if (!p) return;
  if (cart.some(function (c) { return c.type === "product" && String(c.id) === String(id); })) { toast("Already in your cart."); return; }
  cart.push({ type: "product", id: String(p.id), title: p.name, sub: p.category || "Digital product", price: p.price, cover: p.cover_url || "" });
  afterAdd(btn, p.name + " added ✓");
}

function afterAdd(btn, text) {
  save("pm_cart", cart);
  renderCart();
  bump();
  toast(text);
  const old = btn.textContent;
  btn.classList.add("done");
  btn.textContent = "Added ✓";
  setTimeout(function () { btn.classList.remove("done"); btn.textContent = old; }, 1000);
}

function removeItem(i) {
  cart.splice(i, 1);
  save("pm_cart", cart);
  renderCart();
}

function renderCart() {
  const box = $("cartItems");
  box.innerHTML = "";
  let total = 0;
  cart.forEach(function (c, i) {
    total += c.price;
    const row = document.createElement("div");
    row.className = "ci";
    row.innerHTML =
      "<div class='th' style='" + coverStyle(c.title) + "'>" + (c.type === "beat" ? "🎧" : "🎹") + "</div>" +
      "<div class='ci-info'><h4>" + esc(c.title) + "</h4><span>" + esc(c.sub) + "</span><b>" + money(c.price) + "</b></div>" +
      "<button class='rm' onclick='removeItem(" + i + ")' aria-label='Remove'>✕</button>";
    box.appendChild(row);
  });
  if (!cart.length) {
    box.innerHTML = "<div class='empty-cart'><div class='bag'>🛒</div><p>Your cart is empty</p><button class='btn' onclick=\"navigate('beats')\">Browse Beats</button></div>";
  }
  $("cartFoot").classList.toggle("hidden", cart.length === 0);
  $("cartTotal").textContent = money(total);
  $("cartCount").textContent = cart.length;
}

function openCart() {
  $("drawer").classList.add("open");
  $("overlay").classList.add("show");
  document.body.classList.add("lock");
}
function closeCart() {
  $("drawer").classList.remove("open");
  $("overlay").classList.remove("show");
  if (!document.body.classList.contains("menu-open")) document.body.classList.remove("lock");
}

function whatsappOrder() {
  if (!cart.length) { toast("Your cart is empty."); return; }
  let total = 0;
  let msg = "Hello P_MUSIC, I want to buy:\n\n";
  cart.forEach(function (c, i) {
    total += c.price;
    msg += (i + 1) + ". " + c.title + " (" + c.sub + ") - " + money(c.price) + "\n";
  });
  msg += "\nTotal: " + money(total);
  const n = $("kName").value.trim(), e = $("kEmail").value.trim(), p = $("kPhone").value.trim();
  if (n) msg += "\nName: " + n;
  if (e) msg += "\nEmail: " + e;
  if (p) msg += "\nPhone: " + p;
  window.open("https://wa.me/" + WHATSAPP + "?text=" + encodeURIComponent(msg), "_blank");
}

async function checkout() {
  const name = $("kName").value.trim();
  const email = $("kEmail").value.trim();
  const phone = $("kPhone").value.trim();
  if (!cart.length) { toast("Your cart is empty."); return; }
  if (name.length < 2) { toast("Please enter your name."); return; }
  if (!validEmail(email)) { toast("Enter a valid email. Your downloads are sent there."); return; }

  if (!sb) {
    toast("Online payment is being activated. Opening WhatsApp...");
    whatsappOrder();
    return;
  }

  const btn = $("payBtn");
  btn.disabled = true;
  btn.textContent = "Connecting to secure checkout...";
  try {
    const res = await fetch(SUPABASE_URL + "/functions/v1/create-checkout", {
      method: "POST",
      headers: { "Content-Type": "application/json", apikey: SUPABASE_KEY, Authorization: "Bearer " + SUPABASE_KEY },
      body: JSON.stringify({
        name: name, email: email, phone: phone,
        items: cart.map(function (c) { return { type: c.type, id: c.id, license_id: c.license_id || null }; })
      })
    });
    const out = await res.json();
    if (!res.ok || !out.authorization_url) throw new Error(out.error || "failed");
    window.location.href = out.authorization_url;
  } catch (e) {
    btn.disabled = false;
    btn.textContent = "Pay Securely";
    toast("Secure checkout is not available yet. Use WhatsApp to order.");
  }
}

/* ---------- Navigation, menu and scroll effects ---------- */
let navBusy = false;

function wipeReset() {
  const w = $("wipe");
  w.classList.remove("in", "out");
  w.classList.add("reset");
  void w.offsetWidth;
  w.classList.remove("reset");
}

function navigate(id) {
  const target = $(id);
  if (!target || navBusy) return;
  navBusy = true;
  closeMenu();
  closeCart();
  const w = $("wipe");
  wipeReset();
  w.classList.add("in");
  setTimeout(function () {
    const y = id === "home" ? 0 : target.getBoundingClientRect().top + window.scrollY - 60;
    window.scrollTo(0, y);
    w.classList.remove("in");
    w.classList.add("out");
    setTimeout(function () { wipeReset(); navBusy = false; }, 650);
  }, 650);
}

function toTop() { window.scrollTo({ top: 0, behavior: "smooth" }); }

function toggleMenu() {
  const open = !document.body.classList.contains("menu-open");
  document.body.classList.toggle("menu-open", open);
  document.body.classList.toggle("lock", open);
  $("menu").classList.toggle("open", open);
  $("burger").classList.toggle("open", open);
  $("header").classList.remove("hide");
}
function closeMenu() { if (document.body.classList.contains("menu-open")) toggleMenu(); }

let lastY = 0;
let ticking = false;
const SPY = ["home", "beats", "digital", "services", "portfolio", "about", "contact"];

function onScrollFrame() {
  const y = window.scrollY;
  const h = document.documentElement.scrollHeight - window.innerHeight;
  $("progress").style.width = (h > 0 ? (y / h) * 100 : 0) + "%";
  const hd = $("header");
  hd.classList.toggle("scrolled", y > 40);
  if (!document.body.classList.contains("menu-open")) {
    if (y > 260 && y > lastY + 4) hd.classList.add("hide");
    else if (y < lastY - 4) hd.classList.remove("hide");
  }
  lastY = y;
  $("toTop").classList.toggle("show", y > 600);
  $("glow1").style.transform = "translateY(" + (y * 0.3) + "px)";
  let cur = "home";
  SPY.forEach(function (id) {
    const el = $(id);
    if (el && el.getBoundingClientRect().top <= 150) cur = id;
  });
  document.querySelectorAll(".desk a, #menu > a").forEach(function (a) {
    a.classList.toggle("active", a.getAttribute("data-nav") === cur);
  });
  ticking = false;
}

window.addEventListener("scroll", function () {
  if (!ticking) { ticking = true; requestAnimationFrame(onScrollFrame); }
}, { passive: true });

document.querySelectorAll("[data-nav]").forEach(function (a) {
  a.addEventListener("click", function (e) {
    e.preventDefault();
    navigate(a.getAttribute("data-nav"));
  });
});

document.addEventListener("keydown", function (e) {
  if (e.key === "Escape") { closeMenu(); closeCart(); }
});

/* ---------- Start ---------- */
function runLoader() {
  setTimeout(function () {
    $("loader").classList.add("done");
    document.body.classList.add("ready");
  }, 2300);
  setTimeout(function () { $("loader").style.display = "none"; }, 3400);
}

async function init() {
  runLoader();
  await loadData();
  renderHome();
  renderBeatChips();
  renderBeats();
  renderLicenses();
  renderDigChips();
  renderDigital();
  renderServices();
  renderPortfolio();
  renderContact();
  renderCart();
  reveal();
  onScrollFrame();
}

init();