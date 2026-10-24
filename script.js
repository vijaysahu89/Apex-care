/* ============================================================
   APEX CARE — Multi-Specialty Clinic & Surgical Hospital
   script.js  |  All interactions, animations & logic
   ============================================================ */

// ==================== ANIMATED BACKGROUND ====================
(function initBackground() {
  const canvas = document.getElementById('bg-canvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  let w, h, orbs = [], gridPhase = 0;

  function resize() {
    w = canvas.width = window.innerWidth;
    h = canvas.height = window.innerHeight;
  }
  window.addEventListener('resize', resize);
  resize();

  // Create floating orbs
  for (let i = 0; i < 6; i++) {
    orbs.push({
      x: Math.random() * w,
      y: Math.random() * h,
      r: 60 + Math.random() * 120,
      dx: (Math.random() - 0.5) * 0.3,
      dy: (Math.random() - 0.5) * 0.3,
      hue: Math.random() > 0.5 ? 160 : 200, // emerald or sky
      alpha: 0.03 + Math.random() * 0.04
    });
  }

  function draw() {
    ctx.clearRect(0, 0, w, h);

    // Subtle grid
    gridPhase += 0.002;
    ctx.strokeStyle = 'rgba(16,185,129,0.03)';
    ctx.lineWidth = 0.5;
    const gridSize = 60;
    const offsetX = Math.sin(gridPhase) * 10;
    const offsetY = Math.cos(gridPhase) * 10;
    for (let x = offsetX; x < w; x += gridSize) {
      ctx.beginPath();
      ctx.moveTo(x, 0);
      ctx.lineTo(x, h);
      ctx.stroke();
    }
    for (let y = offsetY; y < h; y += gridSize) {
      ctx.beginPath();
      ctx.moveTo(0, y);
      ctx.lineTo(w, y);
      ctx.stroke();
    }

    // Floating orbs
    orbs.forEach(orb => {
      orb.x += orb.dx;
      orb.y += orb.dy;
      if (orb.x < -orb.r) orb.x = w + orb.r;
      if (orb.x > w + orb.r) orb.x = -orb.r;
      if (orb.y < -orb.r) orb.y = h + orb.r;
      if (orb.y > h + orb.r) orb.y = -orb.r;

      const grad = ctx.createRadialGradient(orb.x, orb.y, 0, orb.x, orb.y, orb.r);
      grad.addColorStop(0, `hsla(${orb.hue},70%,50%,${orb.alpha})`);
      grad.addColorStop(1, `hsla(${orb.hue},70%,50%,0)`);
      ctx.fillStyle = grad;
      ctx.beginPath();
      ctx.arc(orb.x, orb.y, orb.r, 0, Math.PI * 2);
      ctx.fill();
    });

    requestAnimationFrame(draw);
  }
  draw();
})();

// ==================== NAVBAR SCROLL EFFECT ====================
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
  if (window.scrollY > 50) {
    navbar.classList.add('scrolled');
  } else {
    navbar.classList.remove('scrolled');
  }
});

// Active link highlighting
const navLinks = document.querySelectorAll('.nav-links a');
const sections = document.querySelectorAll('section[id]');
window.addEventListener('scroll', () => {
  let current = '';
  sections.forEach(section => {
    const sectionTop = section.offsetTop - 120;
    if (window.scrollY >= sectionTop) {
      current = section.getAttribute('id');
    }
  });
  navLinks.forEach(link => {
    link.classList.remove('active');
    if (link.getAttribute('href') === '#' + current) {
      link.classList.add('active');
    }
  });
});

// ==================== MOBILE MENU ====================
function toggleMobile() {
  document.getElementById('mobileOverlay').classList.toggle('open');
}

// ==================== BRANCH DATA ====================
const branchData = {
  alkapuri: {
    label: 'APEX CARE MAIN CENTER — ALKAPURI',
    address: '2nd Floor, Emerald Square, Near Chakli Circle, RC Dutt Road, Alkapuri, Vadodara, Gujarat 390007',
    mapSrc: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3691.169!2d73.1812!3d22.3119!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x395fc5a7!2sRC+Dutt+Road%2C+Alkapuri%2C+Vadodara!5e0!3m2!1sen!2sin!4v1690000000000!5m2!1sen!2sin',
    directionsUrl: 'https://www.google.com/maps/dir/?api=1&destination=RC+Dutt+Road+Alkapuri+Vadodara'
  },
  manjalpur: {
    label: 'APEX CARE ANNEX — MANJALPUR',
    address: '1st Floor, Embe Opulence, Near Eva Mall, Manjalpur, Vadodara, Gujarat 390011',
    mapSrc: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3692.0!2d73.1900!3d22.2700!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x395fc0000!2sManjalpur%2C+Vadodara!5e0!3m2!1sen!2sin!4v1690000000001!5m2!1sen!2sin',
    directionsUrl: 'https://www.google.com/maps/dir/?api=1&destination=Manjalpur+Vadodara'
  }
};

function switchBranch(branch) {
  // Update buttons
  document.querySelectorAll('.branch-btn').forEach(btn => {
    const isActive = btn.dataset.branch === branch;
    btn.classList.toggle('active', isActive);
    if (isActive) {
      btn.classList.add('active', 'bg-gradient-to-r', 'from-cyan-500', 'to-sky-500', 'text-white', 'font-semibold', 'shadow-md');
      btn.classList.remove('text-slate-300');
    } else {
      btn.classList.remove('active', 'bg-gradient-to-r', 'from-cyan-500', 'to-sky-500', 'text-white', 'font-semibold', 'shadow-md');
      btn.classList.add('text-slate-300');
    }
  });

  // Update map section
  const data = branchData[branch];
  const labelEl = document.getElementById('mapLabel');
  const addressEl = document.getElementById('mapAddress');
  const iframeEl = document.getElementById('mapIframe');

  if (labelEl) labelEl.textContent = data.label;
  if (addressEl) addressEl.textContent = data.address;
  if (iframeEl) iframeEl.src = data.mapSrc;

  // Update directions link
  const dirLink = document.querySelector('.map-btns .btn-primary');
  if (dirLink) dirLink.href = data.directionsUrl;
}

// ==================== LIVE IST STATUS ====================
function updateStatus() {
  // Get IST time
  const now = new Date();
  const istOffset = 5.5 * 60; // IST is UTC+5:30
  const utc = now.getTime() + now.getTimezoneOffset() * 60000;
  const ist = new Date(utc + istOffset * 60000);

  const day = ist.getDay(); // 0=Sun
  const hours = ist.getHours();
  const minutes = ist.getMinutes();
  const totalMinutes = hours * 60 + minutes;

  const dot = document.getElementById('statusDot');
  const label = document.getElementById('statusLabel');
  const ping = document.getElementById('statusPing');

  // Mon-Sat: 9:00-14:00 and 16:30-20:30
  const isMorning = totalMinutes >= 540 && totalMinutes < 840; // 9:00 - 14:00
  const isEvening = totalMinutes >= 990 && totalMinutes < 1230; // 16:30 - 20:30
  const isWeekday = day >= 1 && day <= 6; // Mon-Sat

  const isOpen = isWeekday && (isMorning || isEvening);

  if (label) {
    if (isOpen) {
      label.textContent = 'OPD Open';
      label.className = 'text-emerald-400 font-semibold text-xs';
      if (dot) dot.className = 'relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500';
      if (ping) {
        ping.style.display = 'inline-flex';
        ping.className = 'animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75';
      }
    } else {
      label.className = 'text-amber-400 font-semibold text-xs';
      if (day === 0) {
        label.textContent = 'Closed (Sun)';
      } else if (totalMinutes >= 840 && totalMinutes < 990) {
        label.textContent = 'Opens 4:30 PM';
      } else {
        label.textContent = 'OPD Closed';
      }
      if (dot) dot.className = 'relative inline-flex rounded-full h-2.5 w-2.5 bg-amber-500';
      if (ping) {
        ping.style.display = 'none';
      }
    }
  }
}
updateStatus();
setInterval(updateStatus, 60000);

// ==================== DEPARTMENT TABS ====================
function switchTab(tabId, btn) {
  // Deactivate all tabs and panels
  document.querySelectorAll('.dept-tab').forEach(t => t.classList.remove('active'));
  document.querySelectorAll('.dept-panel').forEach(p => p.classList.remove('active'));

  // Activate selected
  btn.classList.add('active');
  document.getElementById(tabId).classList.add('active');
}

// ==================== TRIAGE WHATSAPP ====================
function sendTriageWhatsApp() {
  const specialty = document.getElementById('triageSpecialty').value;
  const visit = document.getElementById('triageVisit').value;
  const center = document.getElementById('triageCenter').value;
  const shift = document.getElementById('triageShift').value;

  if (!specialty || !visit) {
    alert('Please select a specialty and visit type to continue.');
    return;
  }

  const msg = `Hi Apex Care,\n\nI would like to book an appointment:\n\n` +
    `🏥 Specialty: ${specialty}\n` +
    `📋 Visit Type: ${visit}\n` +
    `📍 Center: ${center}\n` +
    `⏰ Preferred Shift: ${shift}\n\n` +
    `Please confirm available slots. Thank you!`;

  const encoded = encodeURIComponent(msg);
  window.open(`https://wa.me/919999999999?text=${encoded}`, '_blank');
}

// ==================== LIGHTBOX GALLERY ====================
const galleryImages = [
  { src: 'images/clinic1.jpg', caption: 'Reception & Welcome Lounge' },
  { src: 'images/clinic2.jpg', caption: 'Private OPD Consultation Suite' },
  { src: 'images/clinic3.jpg', caption: 'Laser & Diagnostic Treatment Room' },
  { src: 'images/clinic4.jpg', caption: 'Physiotherapy & Rehab Studio' },
  { src: 'images/clinic5.jpg', caption: 'Modular Day-Care OT Suite' },
  { src: 'images/clinic6.jpg', caption: 'Deluxe Recovery & Nursing Room' }
];
let currentLightbox = 0;

function openLightbox(index) {
  currentLightbox = index;
  const lb = document.getElementById('lightbox');
  const img = document.getElementById('lightboxImg');
  img.src = galleryImages[index].src;
  img.alt = galleryImages[index].caption;
  lb.classList.add('open');
  document.body.style.overflow = 'hidden';
}

function closeLightbox() {
  document.getElementById('lightbox').classList.remove('open');
  document.body.style.overflow = '';
}

function navLightbox(dir) {
  currentLightbox = (currentLightbox + dir + galleryImages.length) % galleryImages.length;
  const img = document.getElementById('lightboxImg');
  img.src = galleryImages[currentLightbox].src;
  img.alt = galleryImages[currentLightbox].caption;
}

// Close on Escape
document.addEventListener('keydown', e => {
  if (e.key === 'Escape') {
    closeLightbox();
    closeChatbot();
  }
  if (document.getElementById('lightbox').classList.contains('open')) {
    if (e.key === 'ArrowLeft') navLightbox(-1);
    if (e.key === 'ArrowRight') navLightbox(1);
  }
});

// Close lightbox on backdrop click
document.getElementById('lightbox')?.addEventListener('click', e => {
  if (e.target === document.getElementById('lightbox')) closeLightbox();
});

// ==================== FAQ ACCORDION ====================
function toggleFaq(btn) {
  const item = btn.closest('.faq-item');
  const wasOpen = item.classList.contains('open');

  // Close all
  document.querySelectorAll('.faq-item').forEach(i => i.classList.remove('open'));

  // Toggle current
  if (!wasOpen) item.classList.add('open');
}

// ==================== FLOATING ACTION HUB ====================
function toggleFab() {
  const container = document.getElementById('fabContainer');
  container.classList.toggle('open');
}

// Close FAB when clicking outside
document.addEventListener('click', e => {
  const fab = document.getElementById('fabContainer');
  if (fab && !fab.contains(e.target)) {
    fab.classList.remove('open');
  }
});

// ==================== CHATBOT ====================
const chatResponses = {
  1: {
    msg: "To book a private specialist consultation at Apex Care:\n\n📋 Select your specialty (Skin, Eye, ENT, Ortho, Gyno, General Medicine, etc.)\n⏰ Morning OPD: 9:00 AM – 2:00 PM\n⏰ Evening OPD: 4:30 PM – 8:30 PM\n📍 Available at both RC Dutt Rd & Manjalpur\n\nTap below to confirm your appointment on WhatsApp — our team will send you a confirmed slot within minutes.",
    waText: "Hi Apex Care, I would like to book a Private Specialist Consultation. Please share available slots and doctor details."
  },
  2: {
    msg: "We offer transparent pricing for all treatments and surgical packages:\n\n💊 OPD Consultation: Starting ₹300–₹800\n🔬 Laser Procedures: Customised per session\n🏥 Day-Care Surgery Packages: All-inclusive pricing\n💳 Cashless insurance accepted (30+ TPAs)\n\nTap below to get a detailed cost estimate for your specific treatment on WhatsApp.",
    waText: "Hi Apex Care, I would like to enquire about Treatment / Surgery Package costs. Please share details for my condition."
  },
  3: {
    msg: "Our Skin, Laser & Hair Transplant Center offers:\n\n✨ US-FDA Laser Toning & Scar Revision\n💇 FUE Hair Transplant & PRP Therapy\n🔬 Clinical Dermatology (Acne, Psoriasis, Eczema)\n💎 Cosmetic Procedures (Botox, Fillers, Peels)\n\nAll treatments by certified dermatologists with advanced equipment.\n\nTap below to book your skin/hair consultation on WhatsApp.",
    waText: "Hi Apex Care, I am interested in Skin, Laser or Hair Transplant treatment. Please share consultation details and cost."
  },
  4: {
    msg: "Department Timings at Apex Care:\n\n👁️ Eye / LASIK / Cataract: Mon–Sat, Morning & Evening\n👂 ENT / Sinus: Mon, Wed, Fri (Evening)\n🦴 Orthopedics: Tue, Thu, Sat (Morning)\n🏋️ Physiotherapy: Mon–Sat, All Day\n\nNote: Timings may vary by specialist. Tap below to confirm exact availability on WhatsApp.",
    waText: "Hi Apex Care, I need timings for Eye / ENT / Ortho / Physio department. Please share the current schedule."
  },
  5: {
    msg: "Apex Care Women & Child Care Center:\n\n🩺 Gynaecology & PCOD Management\n🤱 Boutique Maternity Suites & Deliveries\n💝 IVF & Fertility Guidance\n👶 Pediatric & Vaccination Clinic\n\nPrivate maternity rooms with nursing support, lactation counseling, and postnatal care.\n\nTap below to book your consultation on WhatsApp.",
    waText: "Hi Apex Care, I need Maternity / Gynaecology / Child Care consultation. Please share details and available doctors."
  },
  6: {
    msg: "Yes! Apex Care is empanelled with 30+ insurance companies:\n\n✅ Star Health, ICICI Lombard, HDFC Ergo\n✅ New India, United India, Bajaj Allianz\n✅ MediAssist, Paramount, Vidal Health\n✅ Government schemes (PMJAY/Ayushman Bharat)\n\nOur TPA desk handles all cashless pre-authorization.\n\nTap below to verify your specific policy on WhatsApp.",
    waText: "Hi Apex Care, I want to check if my health insurance is accepted for cashless treatment. My insurance company is: [Please specify]."
  },
  7: {
    msg: "Apex Care Diagnostics Services:\n\n🧪 Pathology (Blood, Urine, Thyroid, Sugar, Lipid)\n📊 ECG, X-Ray, Ultrasound\n🏠 Home Sample Collection available\n📱 Reports delivered on WhatsApp within 4–6 hours\n\nTap below to request home sample collection or check report status on WhatsApp.",
    waText: "Hi Apex Care, I would like to request Home Sample Collection / check my Lab Report status. Please assist."
  },
  8: {
    msg: "📍 Apex Care Main Center:\n2nd Floor, Emerald Square, Near Chakli Circle, RC Dutt Road, Alkapuri, Vadodara – 390007\n\n🅿️ Dedicated patient parking available at Emerald Square.\n🚗 Landmark: Near Chakli Circle, RC Dutt Road\n\n📍 Manjalpur Branch:\n1st Floor, Embe Opulence, Near Eva Mall, Manjalpur – 390011\n\nTap below to get Google Maps directions on WhatsApp.",
    waText: "Hi Apex Care, I need directions to your clinic at RC Dutt Road, Alkapuri. Please share the Google Maps link."
  }
};

function openChatbot() {
  document.getElementById('fabContainer').classList.remove('open');
  document.getElementById('chatbotDrawer').classList.add('open');
}

function closeChatbot() {
  document.getElementById('chatbotDrawer').classList.remove('open');
}

function handleChip(chipId) {
  const body = document.getElementById('chatBody');
  const response = chatResponses[chipId];
  if (!response) return;

  // Show user message
  const chipTexts = {
    1: "Book a Private Specialist Consultation",
    2: "Ask Treatment / Surgery Package Cost",
    3: "Skin, Laser & Hair Transplant Enquiry",
    4: "Eye, ENT, Ortho & Physio Timings",
    5: "Maternity, Gyno & Child Care Details",
    6: "Cashless Insurance & TPA Support",
    7: "Request Home Sample Collection / Lab Reports",
    8: "Clinic Address & Parking"
  };

  const userDiv = document.createElement('div');
  userDiv.className = 'chat-msg user';
  userDiv.textContent = chipTexts[chipId];
  body.appendChild(userDiv);

  // Show bot response
  setTimeout(() => {
    const botDiv = document.createElement('div');
    botDiv.className = 'chat-msg bot';
    botDiv.innerHTML = response.msg.replace(/\n/g, '<br>');

    // Add WhatsApp CTA
    const waBtn = document.createElement('a');
    waBtn.href = `https://wa.me/919999999999?text=${encodeURIComponent(response.waText)}`;
    waBtn.target = '_blank';
    waBtn.className = 'chat-wa-btn';
    waBtn.innerHTML = '💬 Continue This Enquiry on WhatsApp →';
    botDiv.appendChild(waBtn);

    body.appendChild(botDiv);
    body.scrollTop = body.scrollHeight;
  }, 400);

  body.scrollTop = body.scrollHeight;
}

function sendChatMsg() {
  const input = document.getElementById('chatInput');
  const msg = input.value.trim();
  if (!msg) return;

  const body = document.getElementById('chatBody');

  // User message
  const userDiv = document.createElement('div');
  userDiv.className = 'chat-msg user';
  userDiv.textContent = msg;
  body.appendChild(userDiv);

  input.value = '';

  // Bot response
  setTimeout(() => {
    const botDiv = document.createElement('div');
    botDiv.className = 'chat-msg bot';
    botDiv.innerHTML = `Thank you for your message! Our specialist team will respond to your query promptly.<br><br>For the fastest response, please tap below to send your question directly to our reception desk on WhatsApp:`;

    const waBtn = document.createElement('a');
    waBtn.href = `https://wa.me/919999999999?text=${encodeURIComponent('Hi Apex Care, ' + msg)}`;
    waBtn.target = '_blank';
    waBtn.className = 'chat-wa-btn';
    waBtn.innerHTML = '💬 Continue This Enquiry on WhatsApp →';
    botDiv.appendChild(waBtn);

    body.appendChild(botDiv);
    body.scrollTop = body.scrollHeight;
  }, 500);

  body.scrollTop = body.scrollHeight;
}

// ==================== SCROLL REVEAL ANIMATION ====================
function revealOnScroll() {
  const reveals = document.querySelectorAll('.reveal');
  reveals.forEach(el => {
    const top = el.getBoundingClientRect().top;
    const windowHeight = window.innerHeight;
    if (top < windowHeight - 80) {
      el.classList.add('visible');
    }
  });
}
window.addEventListener('scroll', revealOnScroll);
window.addEventListener('load', revealOnScroll);

// ==================== SMOOTH SCROLL HELPER ====================
function scrollToSection(selector) {
  const fab = document.getElementById('fabContainer');
  if (fab) fab.classList.remove('open');
  const el = document.querySelector(selector);
  if (el) el.scrollIntoView({ behavior: 'smooth' });
}

// ==================== INIT ====================
document.addEventListener('DOMContentLoaded', () => {
  updateStatus();
  revealOnScroll();
});
