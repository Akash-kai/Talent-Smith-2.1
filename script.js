// ============================================
// TALENTSMITH - FINAL JAVASCRIPT
// Manual Slider + Dots + Clean Website Functions
// ============================================

let currentCategory = "";
let currentService = "";

// ============================================
// ✅ DOM READY
// ============================================
document.addEventListener("DOMContentLoaded", () => {

  initStickyHeader();
  initThemeToggle();
  initSmoothScroll();
  initScrollAnimations();
  initServiceModalForm();

  // ✅ Manual Sliders Setup
  initManualSliders();

});


// ============================================
// ✅ Sticky Header Effect
// ============================================
function initStickyHeader() {

  const header = document.getElementById("header");

  window.addEventListener("scroll", () => {
    if (window.scrollY > 80) {
      header.classList.add("sticky");
    } else {
      header.classList.remove("sticky");
    }
  });

}


// ============================================
// ✅ Dark / Light Theme Toggle
// ============================================
function initThemeToggle() {

  const toggleBtn = document.getElementById("themeToggle");
  if (!toggleBtn) return;

  toggleBtn.textContent = "🌙";

  toggleBtn.addEventListener("click", () => {

    document.body.classList.toggle("light-mode");

    toggleBtn.textContent =
      document.body.classList.contains("light-mode") ? "☀️" : "🌙";

  });

}


// ============================================
// ✅ Smooth Scroll Navigation
// ============================================
function initSmoothScroll() {

  document.querySelectorAll("a[href^='#']").forEach(link => {

    link.addEventListener("click", (e) => {

      e.preventDefault();

      const targetId = link.getAttribute("href");
      const target = document.querySelector(targetId);

      if (target) {
        window.scrollTo({
          top: target.offsetTop - 90,
          behavior: "smooth"
        });
      }

    });

  });

}


// ✅ Button Scroll Fix (Get Started)
function scrollToSection(id) {

  const section = document.getElementById(id);
  if (!section) return;

  section.scrollIntoView({ behavior: "smooth" });

}


// ============================================
// ✅ Fade In Scroll Animations
// ============================================
function initScrollAnimations() {

  const items = document.querySelectorAll(
    ".why-card, .service-card, .contact-card, .review-card"
  );

  const observer = new IntersectionObserver(entries => {

    entries.forEach(entry => {

      if (entry.isIntersecting) {
        entry.target.style.opacity = "1";
        entry.target.style.transform = "translateY(0)";
      }

    });

  }, { threshold: 0.15 });

  items.forEach((el, index) => {

    el.style.opacity = "0";
    el.style.transform = "translateY(40px)";
    el.style.transition = `all 0.8s ease ${index * 0.07}s`;

    observer.observe(el);

  });

}


// ============================================
// ✅ WhatsApp Apply/Post Buttons
// ============================================
function openWhatsApp(type) {

  let message = "";

  if (type === "jobseeker") {
    message =
      `Hi TalentSmith 👋\n\nI am looking for a job opportunity.\nPlease guide me.\n\nThank you!`;
  }

  if (type === "business") {
    message =
      `Hi TalentSmith 👋\n\nI want to hire candidates.\nPlease support recruitment.\n\nThank you!`;
  }

  window.open(
    `https://wa.me/?text=${encodeURIComponent(message)}`,
    "_blank"
  );

}


// ============================================
// ✅ SERVICE MODAL OPEN/CLOSE
// ============================================
function openServiceModal(category, serviceName) {

  currentCategory = category;
  currentService = serviceName;

  document.getElementById("serviceModal").style.display = "flex";

  document.getElementById("selectedService").value =
    `${category} - ${serviceName}`;

  document.getElementById("modalTitle").innerText =
    `Request: ${serviceName}`;

}

function closeServiceModal() {
  document.getElementById("serviceModal").style.display = "none";
}


// ============================================
// ✅ SERVICE FORM → WHATSAPP SEND
// ============================================
function initServiceModalForm() {

  const form = document.getElementById("serviceForm");
  if (!form) return;

  form.addEventListener("submit", (e) => {

    e.preventDefault();

    const name = document.getElementById("clientName").value.trim();
    const phone = document.getElementById("clientNumber").value.trim();
    const email = document.getElementById("clientEmail").value.trim();
    const note = document.getElementById("clientNote").value.trim();

    if (!name || !phone || !email || !note) {
      alert("Please fill all details before sending.");
      return;
    }

    const businessNumber = "919218570401";

    const message =
      `Hello TalentSmith 👋\n\n` +
      `📌 Service Request:\n` +
      `Category: ${currentCategory}\n` +
      `Service: ${currentService}\n\n` +
      `👤 Name: ${name}\n` +
      `📞 Mobile: ${phone}\n` +
      `📧 Email: ${email}\n\n` +
      `📝 Requirement:\n${note}\n\n` +
      `Please contact me soon. धन्यवाद 🙏`;

    window.open(
      `https://wa.me/${businessNumber}?text=${encodeURIComponent(message)}`,
      "_blank"
    );

    form.reset();
    closeServiceModal();

  });

  // Close modal when clicking outside
  window.addEventListener("click", (e) => {

    const modal = document.getElementById("serviceModal");

    if (e.target === modal) {
      closeServiceModal();
    }

  });

}


// ============================================
// ✅ MANUAL SLIDER SYSTEM (Arrows + Dots)
// ============================================

// Slide Right
function slideRight(id) {

  const slider = document.getElementById(id);
  if (!slider) return;

  const card = slider.querySelector(".service-card");
  if (!card) return;

  const step = card.offsetWidth + 32;

  slider.scrollBy({
    left: step,
    behavior: "smooth"
  });

}

// Slide Left
function slideLeft(id) {

  const slider = document.getElementById(id);
  if (!slider) return;

  const card = slider.querySelector(".service-card");
  if (!card) return;

  const step = card.offsetWidth + 32;

  slider.scrollBy({
    left: -step,
    behavior: "smooth"
  });

}


// ============================================
// ✅ DOTS SETUP
// ============================================
function setupDots(sliderId, dotsId) {

  const slider = document.getElementById(sliderId);
  const dotsBox = document.getElementById(dotsId);

  if (!slider || !dotsBox) return;

  const cards = slider.querySelectorAll(".service-card");
  dotsBox.innerHTML = "";

  cards.forEach((_, index) => {

    const dot = document.createElement("span");

    dot.addEventListener("click", () => {

      const cardWidth = cards[0].offsetWidth + 32;

      slider.scrollTo({
        left: index * cardWidth,
        behavior: "smooth"
      });

    });

    dotsBox.appendChild(dot);

  });

}


// ============================================
// ✅ INIT ALL SLIDERS
// ============================================
function initManualSliders() {

  setupDots("why-carousel", "why-dots");
  setupDots("business-carousel", "business-dots");
  setupDots("jobseekers-carousel", "jobseekers-dots");
  setupDots("reviews-carousel", "reviews-dots");

}
