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
// ✅ PREMIUM AUTO + MANUAL SLIDER SYSTEM
// ============================================

function initPremiumSlider(sliderId, dotsId) {

  const slider = document.getElementById(sliderId);
  const dotsBox = document.getElementById(dotsId);

  if (!slider || !dotsBox) return;

  const cards = slider.querySelectorAll(".service-card");

  let autoInterval;
  let userPaused = false;

  // Step size
  function getStep() {
    return cards[0].offsetWidth + 32;
  }

  // ============================================
  // ✅ Create Dots
  // ============================================
  dotsBox.innerHTML = "";

  cards.forEach((_, index) => {

    const dot = document.createElement("span");

    dot.addEventListener("click", () => {

      pauseAuto();

      slider.scrollTo({
        left: index * getStep(),
        behavior: "smooth"
      });

      setTimeout(updateDots, 400);

    });

    dotsBox.appendChild(dot);

  });

  // ============================================
  // ✅ Update Active Dot
  // ============================================
  function updateDots() {

    const dots = dotsBox.querySelectorAll("span");
    const index = Math.round(slider.scrollLeft / getStep());

    dots.forEach(dot => dot.classList.remove("active"));

    if (dots[index]) dots[index].classList.add("active");
  }

  // ============================================
  // ✅ Auto Slide Start
  // ============================================
  function startAuto() {

    autoInterval = setInterval(() => {

      if (userPaused) return;

      const maxScroll = slider.scrollWidth - slider.clientWidth;
      const nextScroll = slider.scrollLeft + getStep();

      if (nextScroll >= maxScroll - 5) {
        slider.scrollTo({ left: 0, behavior: "smooth" });
      } else {
        slider.scrollBy({ left: getStep(), behavior: "smooth" });
      }

      updateDots();

    }, 3000);

  }

  function stopAuto() {
    clearInterval(autoInterval);
  }

  // ============================================
  // ✅ Pause + Resume After Interaction
  // ============================================
  function pauseAuto() {

    userPaused = true;
    stopAuto();

    setTimeout(() => {
      userPaused = false;
      startAuto();
    }, 4000);

  }

  // ============================================
  // ✅ Global Arrow Functions
  // ============================================
  window.slideLeft = function (id, dotsId) {

    if (id !== sliderId) return;

    pauseAuto();

    slider.scrollBy({
      left: -getStep(),
      behavior: "smooth"
    });

    setTimeout(updateDots, 400);

  };

  window.slideRight = function (id, dotsId) {

    if (id !== sliderId) return;

    pauseAuto();

    slider.scrollBy({
      left: getStep(),
      behavior: "smooth"
    });

    setTimeout(updateDots, 400);

  };

  // Pause on Hover
  slider.addEventListener("mouseenter", stopAuto);
  slider.addEventListener("mouseleave", startAuto);

  // Pause on Touch / Scroll
  slider.addEventListener("touchstart", pauseAuto);
  slider.addEventListener("mousedown", pauseAuto);
  slider.addEventListener("wheel", pauseAuto);

  slider.addEventListener("scroll", updateDots);

  // Start slider
  updateDots();
  startAuto();
}


// ============================================
// ✅ INIT ALL PREMIUM SLIDERS
// ============================================
function initAllPremiumSliders() {

  initPremiumSlider("why-carousel", "why-dots");
  initPremiumSlider("business-carousel", "business-dots");
  initPremiumSlider("jobseekers-carousel", "jobseekers-dots");
  initPremiumSlider("reviews-carousel", "reviews-dots");

}
