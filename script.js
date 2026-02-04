// ============================================
// TALENTSMITH - FINAL JAVASCRIPT (PREMIUM)
// Auto Slider + Manual Arrows + Dots + Pause + Resume
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

  // ✅ PREMIUM Sliders Setup
  initAllPremiumSliders();

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
// ✅ PREMIUM AUTO + MANUAL SLIDER SYSTEM (FIXED)
// ============================================

function initPremiumSlider(sliderId, dotsId) {
  const slider = document.getElementById(sliderId);
  const dotsBox = document.getElementById(dotsId);

  if (!slider || !dotsBox) return;

  const cards = slider.querySelectorAll(".service-card");
  let index = 0;
  let autoInterval;

  // Step size (Card width + gap)
  function getStep() {
    return cards[0].offsetWidth + 32;
  }

  // ============================================
  // ✅ Create Dots
  // ============================================
  dotsBox.innerHTML = "";

  cards.forEach((_, i) => {
    const dot = document.createElement("span");

    dot.addEventListener("click", () => {
      moveToSlide(i);
      restartAuto();
    });

    dotsBox.appendChild(dot);
  });

  const dots = dotsBox.querySelectorAll("span");

  // ============================================
  // ✅ Update Active Dot
  // ============================================
  function updateDots() {
    dots.forEach(dot => dot.classList.remove("active"));
    if (dots[index]) dots[index].classList.add("active");
  }

  // ============================================
  // ✅ Move Slider Correctly
  // ============================================
  function moveToSlide(i) {
    index = i;

    slider.scrollTo({
      left: index * getStep(),
      behavior: "smooth"
    });

    setTimeout(updateDots, 300);
  }

  // ============================================
  // ✅ Auto Slide Start
  // ============================================
  function startAuto() {
    autoInterval = setInterval(() => {
      index = (index + 1) % cards.length;
      moveToSlide(index);
    }, 3500);
  }

  function stopAuto() {
    clearInterval(autoInterval);
  }

  function restartAuto() {
    stopAuto();
    setTimeout(startAuto, 4000);
  }

  // ============================================
  // ✅ Arrow Controls (No Overwrite Bug)
  // ============================================
  document.querySelectorAll(`[data-left="${sliderId}"]`).forEach(btn => {
    btn.onclick = () => {
      index = index > 0 ? index - 1 : cards.length - 1;
      moveToSlide(index);
      restartAuto();
    };
  });

  document.querySelectorAll(`[data-right="${sliderId}"]`).forEach(btn => {
    btn.onclick = () => {
      index = index < cards.length - 1 ? index + 1 : 0;
      moveToSlide(index);
      restartAuto();
    };
  });

  // ============================================
  // ✅ Sync Dots on Manual Scroll (Mobile Swipe)
  // ============================================
  slider.addEventListener("scroll", () => {
    index = Math.round(slider.scrollLeft / getStep());
    updateDots();
  });

  // Pause on Hover
  slider.addEventListener("mouseenter", stopAuto);
  slider.addEventListener("mouseleave", startAuto);

  // Start Default
  moveToSlide(0);
  startAuto();
}

// ============================================
// ✅ INIT ALL PREMIUM SLIDERS
// ============================================
window.onload = function () {
  initPremiumSlider("why-carousel", "why-dots");
  initPremiumSlider("business-carousel", "business-dots");
  initPremiumSlider("jobseekers-carousel", "jobseekers-dots");
  initPremiumSlider("reviews-carousel", "reviews-dots");
};
