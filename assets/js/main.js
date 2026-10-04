/* =========================================================
   أزرق الأردن — إعدادات عامة (عدّل هون بس)
   ========================================================= */
const AZRAQ = {
  // رقم واتساب الأردن بدون + وبدون أصفار بالأول
  whatsapp: "962790710945",
  phoneDisplay: "+962790710945",
  email: "info@azzrk.com",

  // Meta Pixel ID (اتركه فاضي إذا لسا ما في)
  pixelId: "",

  // رابط استقبال الليدز (Google Apps Script / Make / Zapier / Formspree)
  // إذا فاضي، الفورم بيبعت الطلب على واتساب بس
  formEndpoint: "",

  socials: {
    instagram: "https://www.instagram.com/azzrkmarketingagency",
    facebook: "https://www.facebook.com/azzrk.platform",
    linkedin: "https://www.linkedin.com/company/azzrkplatform",
  },
};

/* ---------- أدوات ---------- */
const $ = (s, r = document) => r.querySelector(s);
const $$ = (s, r = document) => [...r.querySelectorAll(s)];
const PAGE = document.body.dataset.page || "home";
const NO_WA = document.body.hasAttribute("data-no-wa");
const CTA_HREF = document.body.dataset.mobileHref || "#form";
const WA_DEFAULT = document.body.dataset.wa || "مرحبا أزرق، بدي أستفسر عن خدماتكم";

const WA_ICON = '<svg viewBox="0 0 32 32" aria-hidden="true"><path d="M16 3C9 3 3.3 8.6 3.3 15.6c0 2.4.7 4.7 1.9 6.7L3 29l6.9-2.2c1.9 1 4 1.6 6.1 1.6 7 0 12.7-5.6 12.7-12.6S23 3 16 3zm0 23.1c-1.9 0-3.8-.5-5.4-1.5l-.4-.2-4.1 1.3 1.3-4-.3-.4c-1.1-1.7-1.7-3.6-1.7-5.6C5.4 9.8 10.2 5.1 16 5.1s10.6 4.7 10.6 10.5S21.8 26.1 16 26.1zm5.8-7.8c-.3-.2-1.9-.9-2.2-1-.3-.1-.5-.2-.7.2-.2.3-.8 1-1 1.2-.2.2-.4.2-.7.1-.3-.2-1.4-.5-2.6-1.6-1-.9-1.6-1.9-1.8-2.3-.2-.3 0-.5.1-.7l.5-.6c.2-.2.2-.3.3-.6.1-.2 0-.4 0-.6l-1-2.4c-.3-.6-.5-.5-.7-.5h-.6c-.2 0-.6.1-.9.4-.3.3-1.2 1.1-1.2 2.8s1.2 3.2 1.4 3.5c.2.2 2.4 3.6 5.8 5 .8.3 1.4.5 1.9.7.8.3 1.5.2 2.1.1.6-.1 1.9-.8 2.2-1.5.3-.7.3-1.4.2-1.5-.1-.2-.3-.3-.6-.4z"/></svg>';

/* UTM: بنحفظها عشان نعرف أي إعلان جاب الليد */
const UTM = (() => {
  const p = new URLSearchParams(location.search);
  const keys = ["utm_source", "utm_medium", "utm_campaign", "utm_content", "utm_term", "fbclid"];
  const fresh = {};
  keys.forEach((k) => p.get(k) && (fresh[k] = p.get(k)));
  try {
    if (Object.keys(fresh).length) sessionStorage.setItem("azraq_utm", JSON.stringify(fresh));
    return Object.keys(fresh).length ? fresh : JSON.parse(sessionStorage.getItem("azraq_utm") || "{}");
  } catch (e) { return fresh; }
})();

const waLink = (msg) => {
  const ref = UTM.utm_content || UTM.utm_campaign;
  const full = ref ? `${msg}\n\n(مرجع: ${PAGE} / ${ref})` : msg;
  return `https://wa.me/${AZRAQ.whatsapp}?text=${encodeURIComponent(full)}`;
};

/* ---------- Meta Pixel ---------- */
function track(event, data = {}) {
  if (window.fbq) fbq("track", event, { content_category: PAGE, ...data });
}
if (AZRAQ.pixelId) {
  !function(f,b,e,v,n,t,s){if(f.fbq)return;n=f.fbq=function(){n.callMethod?n.callMethod.apply(n,arguments):n.queue.push(arguments)};if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';n.queue=[];t=b.createElement(e);t.async=!0;t.src=v;s=b.getElementsByTagName(e)[0];s.parentNode.insertBefore(t,s)}(window,document,'script','https://connect.facebook.net/en_US/fbevents.js');
  fbq("init", AZRAQ.pixelId);
  fbq("track", "PageView");
}


/* ---------- أيقونات خطية (بدل الإيموجي) ---------- */
const ICONS = {
  phone:'<rect x="7" y="2" width="10" height="20" rx="2"/><path d="M11 18h2"/>',
  clock:'<circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/>',
  map:'<path d="M9 4 3 6v14l6-2 6 2 6-2V4l-6 2-6-2z"/><path d="M9 4v14M15 6v14"/>',
  utensils:'<path d="M7 2v20M4 2v6a3 3 0 0 0 6 0V2M17 2c-2 2-3 5-3 8h3v12"/>',
  ticket:'<path d="M3 8a2 2 0 0 0 0 4v4h18v-4a2 2 0 0 1 0-4V4H3z"/><path d="M13 4v16" stroke-dasharray="2 2"/>',
  chart:'<path d="M3 3v18h18"/><path d="m7 15 4-4 3 3 5-6"/>',
  stethoscope:'<path d="M5 3v6a5 5 0 0 0 10 0V3"/><path d="M10 14v2a5 5 0 0 0 10 0v-2"/><circle cx="20" cy="12" r="2"/>',
  calendar:'<rect x="3" y="5" width="18" height="16" rx="2"/><path d="M3 10h18M8 3v4M16 3v4"/>',
  sparkle:'<path d="M12 3l2.2 5.8L20 11l-5.8 2.2L12 19l-2.2-5.8L4 11l5.8-2.2z"/>',
  message:'<path d="M21 12a8 8 0 0 1-11.6 7.1L4 20l1-4.6A8 8 0 1 1 21 12z"/>',
  target:'<circle cx="12" cy="12" r="9"/><circle cx="12" cy="12" r="5"/><circle cx="12" cy="12" r="1"/>',
  cash:'<rect x="2" y="6" width="20" height="12" rx="2"/><circle cx="12" cy="12" r="3"/><path d="M6 10v4M18 10v4"/>',
  truck:'<path d="M2 6h12v10H2zM14 9h4l4 4v3h-8"/><circle cx="6" cy="18" r="2"/><circle cx="18" cy="18" r="2"/>',
  pin:'<path d="M12 22s7-6.5 7-12a7 7 0 0 0-14 0c0 5.5 7 12 7 12z"/><circle cx="12" cy="10" r="2.5"/>',
  users:'<circle cx="9" cy="8" r="3.5"/><path d="M2 20c0-3.5 3-6 7-6s7 2.5 7 6"/><path d="M16 4.5a3.5 3.5 0 0 1 0 7M22 20c0-3-2-5.2-5-5.8"/>',
  growth:'<path d="M3 17l6-6 4 4 8-8"/><path d="M15 7h6v6"/>',
  building:'<path d="M4 21V5l8-3 8 3v16"/><path d="M9 9h1M14 9h1M9 13h1M14 13h1M10 21v-4h4v4"/>',
};
const svgIcon = (n) => `<svg viewBox="0 0 24 24" aria-hidden="true">${ICONS[n] || ""}</svg>`;

/* ---------- الهيدر والفوتر والخريطة (مشتركين بكل اللاندات) ---------- */
function renderShared() {
  const head = $("#site-head");
  if (head) {
    head.outerHTML = `
    <header class="site-head">
      <div class="wrap">
        <a class="brand" href="/" aria-label="أزرق الأردن">
          <img src="/assets/img/logo.webp" alt="لوجو أزرق" width="40" height="50">
          <span>أزرق</span>
        </a>
        <div class="head-cta">
          <a class="btn btn-ghost btn-sm" href="${CTA_HREF}">${document.body.dataset.cta || "احجز استشارة"}</a>
          ${NO_WA ? "" : `<a class="btn btn-wa btn-sm" data-wa href="#">${WA_ICON}واتساب</a>`}
        </div>
      </div>
    </header>`;
  }

  const map = $("#map-section");
  if (map) {
    map.outerHTML = `
    <section class="map-sec" id="locations" aria-labelledby="map-title">
      <div class="wrap">
        <div class="reveal">
          <span class="kicker">وين موجودين؟</span>
          <h2 id="map-title">مقرّنا بعمّان… <span style="color:var(--sky)">وظهرنا قوي</span></h2>
          <p class="lead">إحنا فريق أردني قاعد بعمّان، بتقدر تمرق علينا وتشرب قهوة معنا. وورانا فريق أكبر بالسعودية بيخدم مشروعك بنفس الوقت.</p>
          <div class="map-stats">
            <div><span class="ic">${svgIcon("pin")}</span><p><b class="num">2</b><span>الأردن والسعودية</span></p></div>
            <div><span class="ic">${svgIcon("users")}</span><p><b class="num">+1000</b><span>عميل شغّالين معنا</span></p></div>
            <div><span class="ic">${svgIcon("growth")}</span><p><b class="num">+150</b><span>عميل جديد كل شهر</span></p></div>
            <div><span class="ic">${svgIcon("building")}</span><p><b>مقر أزرق</b><span>الأردن - عمان - الرابية</span></p></div>
          </div>
        </div>
        <div class="map-box reveal">
          <img src="/assets/img/map.svg" alt="خريطة أزرق: الأردن والسعودية" width="800" height="640" loading="lazy">
          <div class="pin main" style="left:23.7%;top:27.6%"><span class="tag">مقر أزرق<small>الأردن - عمان - الرابية</small></span><span class="dot"></span></div>
          <div class="pin" style="left:55%;top:57.5%"><span class="tag">السعودية</span><span class="dot"></span></div>
        </div>
      </div>
    </section>`;
  }

  const foot = $("#site-foot");
  if (foot) {
    foot.outerHTML = `
    <footer class="site-foot">
      <div class="wrap">
        <div>© ${new Date().getFullYear()} أزرق — مقر أزرق: الأردن - عمان - الرابية · <a href="tel:+${AZRAQ.whatsapp}" dir="ltr">${AZRAQ.phoneDisplay}</a> · <a href="mailto:${AZRAQ.email}">${AZRAQ.email}</a></div>
        <div class="socials">
          <a href="${AZRAQ.socials.instagram}" target="_blank" rel="noopener">إنستغرام</a>
          <a href="${AZRAQ.socials.facebook}" target="_blank" rel="noopener">فيسبوك</a>
          <a href="${AZRAQ.socials.linkedin}" target="_blank" rel="noopener">لينكدإن</a>
        </div>
      </div>
    </footer>`;
  }

  // واتساب عائم + شريط موبايل
  // لاندينج "زيادة الدخل" ما فيها واتساب مباشر: الفلترة بالاختبار أول
  document.body.insertAdjacentHTML("beforeend", `
    ${NO_WA ? "" : `<a class="wa-float" data-wa href="#" aria-label="راسلنا واتساب">${WA_ICON}</a>
    <span class="wa-bubble">بتحب تحكي معنا هلأ؟</span>`}
    <div class="mobile-cta">
      ${NO_WA ? "" : `<a class="btn btn-wa" data-wa href="#">${WA_ICON}واتساب</a>`}
      <a class="btn btn-primary" href="${CTA_HREF}">${document.body.dataset.cta || "احجز استشارة"}</a>
    </div>`);

  $$("[data-i]").forEach((el) => (el.innerHTML = svgIcon(el.dataset.i)));

  $$("[data-wa]").forEach((a) => {
    a.href = waLink(a.dataset.waMsg || WA_DEFAULT);
    a.target = "_blank";
    a.rel = "noopener";
    a.addEventListener("click", () => track("Contact", { method: "whatsapp" }));
  });

}

/* ---------- الفورم ---------- */
function initForms() {
  $$(".lead-form").forEach((box) => {
    const form = $("form", box);
    if (!form) return;

    form.addEventListener("submit", async (e) => {
      e.preventDefault();
      let ok = true;

      $$("[data-required]", form).forEach((f) => {
        const input = $("input,select,textarea", f);
        const checked = f.querySelector("input:checked");
        const isGroup = f.classList.contains("chips-field");
        const val = isGroup ? (checked ? checked.value : "") : input.value.trim();
        let valid = !!val;
        if (input && input.type === "tel") valid = /^(\+?962|0)?7[789]\d{7}$/.test(val.replace(/[\s-]/g, ""));
        f.classList.toggle("invalid", !valid);
        if (!valid) ok = false;
      });
      if (!ok) { $(".invalid input, .invalid select", form)?.focus(); return; }

      const data = Object.fromEntries(new FormData(form).entries());
      const payload = { ...data, page: PAGE, ...UTM, submitted_at: new Date().toISOString() };

      track("Lead", { value: 0, currency: "JOD" });

      if (AZRAQ.formEndpoint) {
        try {
          await fetch(AZRAQ.formEndpoint, { method: "POST", mode: "no-cors", headers: { "Content-Type": "text/plain" }, body: JSON.stringify(payload) });
        } catch (err) { /* ما بنوقّف العميل إذا السيرفر وقع */ }
      }

      const labels = { name: "الاسم", phone: "الرقم", service: "الخدمة", budget: "الميزانية", link: "الرابط", sector: "القطاع", area: "المنطقة", shop: "نوع المحل", score: "نتيجة الاختبار", notes: "ملاحظات" };
      const lines = Object.entries(data).filter(([, v]) => v).map(([k, v]) => `${labels[k] || k}: ${v}`);
      const msg = `${form.dataset.waIntro || "مرحبا أزرق، عبّيت الفورم:"}\n${lines.join("\n")}`;

      box.classList.add("done");
      const waBtn = $(".thanks [data-wa-final]", box);
      if (waBtn) waBtn.href = waLink(msg);
      box.scrollIntoView({ behavior: "smooth", block: "center" });
    });

    $$("input,select", form).forEach((i) => i.addEventListener("input", () => i.closest(".field")?.classList.remove("invalid")));
  });
}

/* ---------- تابات القطاعات (لاندينج المشاهير) ---------- */
function initTabs() {
  $$("[data-tabs]").forEach((wrap) => {
    const btns = $$("[role=tab]", wrap);
    btns.forEach((b) => b.addEventListener("click", () => {
      btns.forEach((x) => x.setAttribute("aria-selected", x === b));
      $$(".tab-panel", wrap).forEach((p) => p.classList.toggle("active", p.id === b.getAttribute("aria-controls")));
      const sel = $(`#form input[name=sector][value="${b.dataset.sector}"]`);
      if (sel) sel.checked = true;
    }));
  });
}

/* ---------- اختبار الجاهزية (لاندينج زيادة الدخل) ---------- */
function initQuiz() {
  const quiz = $("#quiz");
  if (!quiz) return;
  const qs = $$(".q", quiz);
  const bar = $(".quiz-progress i", quiz);
  let i = 0, score = 0;
  const max = qs.length * 2;

  qs.forEach((q) => $$("button", q).forEach((b) => b.addEventListener("click", () => {
    score += +b.dataset.score;
    q.classList.remove("active");
    i++;
    bar.style.width = `${(i / qs.length) * 100}%`;
    if (i < qs.length) qs[i].classList.add("active");
    else finish();
  })));

  function finish() {
    const pct = Math.round((score / max) * 100);
    const level = pct >= 70 ? "ready" : pct >= 40 ? "almost" : "not";
    $(`.quiz-result[data-level=${level}]`, quiz).classList.add("show");
    $$(".quiz-result .score", quiz).forEach((s) => (s.textContent = `${pct}%`));
    const hidden = $("#form input[name=score]");
    if (hidden) hidden.value = `${pct}% (${level})`;
    track("CompleteRegistration", { status: level });
    // الفورم بيفتح بس للجاهز أو القريب
    const form = $("#form");
    if (form && level !== "not") {
      form.hidden = false;
      $$(".reveal", form).forEach((el) => el.classList.add("in"));
    }
  }
}

/* ---------- ظهور تدريجي ---------- */
function initReveal() {
  const io = new IntersectionObserver((es) => es.forEach((e) => e.isIntersecting && (e.target.classList.add("in"), io.unobserve(e.target))), { threshold: 0.12 });
  $$(".reveal").forEach((el) => io.observe(el));
}

renderShared();
initForms();
initTabs();
initQuiz();
initReveal();
