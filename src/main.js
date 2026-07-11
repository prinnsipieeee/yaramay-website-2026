import { animate, inView, stagger } from "motion";
import emailjs from '@emailjs/browser';
import Swal from 'sweetalert2';

animate(
  ".hero-item",
  { opacity: [0, 1], y: [40, 0] },
  { duration: 0.8, delay: stagger(0.15), easing: "ease-out" }
);

const hiddenElements = document.querySelectorAll(".reveal-on-scroll");

hiddenElements.forEach((element) => {
  element.style.opacity = 0;
  element.style.transform = "translateY(50px)";
  inView(element, () => {
    animate(
      element,
      { opacity: [0, 1], y: [50, 0] },
      { duration: 0.8, easing: "ease-out" }
    );
    return () => {
      element.style.opacity = 0;
      element.style.transform = "translateY(50px)";
    };
  }, { amount: 0.2 }); 
});

emailjs.init("B_3lp8WOCcfxWsu0w");

// --- MODAL LOGIC ---
const modal = document.getElementById('inquiry-modal');
const modalContent = document.getElementById('modal-content');
const closeBtn = document.getElementById('close-modal');
const buyButtons = document.querySelectorAll('.buy-btn');
const planNameSpan = document.getElementById('selected-plan-name');
const hiddenPlanInput = document.getElementById('hidden-plan-input');

buyButtons.forEach(btn => {
  btn.addEventListener('click', () => {
    const planName = btn.getAttribute('data-plan'); 
    planNameSpan.textContent = planName.toUpperCase();
    hiddenPlanInput.value = planName; 
    
    modal.classList.remove('hidden');
    modal.classList.add('flex');
    setTimeout(() => {
      modal.classList.remove('opacity-0');
      modalContent.classList.remove('scale-95');
    }, 10);
  });
});

function closeModal() {
  modal.classList.add('opacity-0');
  modalContent.classList.add('scale-95');
  setTimeout(() => {
    modal.classList.add('hidden');
    modal.classList.remove('flex');
  }, 300);
}

closeBtn.addEventListener('click', closeModal);
modal.addEventListener('click', (e) => {
  if (e.target === modal) closeModal(); 
});

// --- EMAILJS SUBMISSION LOGIC ---
const form = document.getElementById('inquiry-form');
const submitBtn = document.getElementById('submit-btn');

form.addEventListener('submit', function(e) {
  e.preventDefault();

  const originalText = submitBtn.innerText;
  submitBtn.innerText = 'Sending...';
  submitBtn.disabled = true;


  emailjs.sendForm('service_yyrwoin', 'template_av2lpax', this)
    .then(() => {
      Swal.fire({
        title: "Success!",
        text: "Inquiry sent successfully! We will get back to you soon.",
        icon: "success",
        confirmButtonColor: "#3b82f6" 
      });
      
      form.reset();
      closeModal();
    })
    .catch((error) => {
      console.error('EmailJS Error:', error);
      Swal.fire({
        title: "Oops!",
        text: "Failed to send inquiry. Please try again later.",
        icon: "error",
      });
    })
    .finally(() => {
      submitBtn.innerText = originalText;
      submitBtn.disabled = false;
    });
});

// --- MAIN CONTACT FORM EMAILJS LOGIC ---
const mainContactForm = document.getElementById('main-contact-form');
const mainSubmitBtn = document.getElementById('main-submit-btn');

if (mainContactForm) {
  mainContactForm.addEventListener('submit', function(e) {
    e.preventDefault();
    
    const originalText = mainSubmitBtn.innerText;
    mainSubmitBtn.innerText = 'Sending Message...';
    mainSubmitBtn.disabled = true;
    mainSubmitBtn.classList.add('opacity-75', 'cursor-not-allowed');

    emailjs.sendForm('service_yyrwoin', 'template_natr9qc', this)
      .then(() => {
        Swal.fire({
          title: "Success!",
          text: "Thank you for reaching out. Our team will get back to you shortly.",
          icon: "success",
          confirmButtonColor: "#3b82f6" 
        });
        
        form.reset();
        closeModal();
      })
      .catch((error) => {
        console.error('EmailJS Error:', error);
        Swal.fire({
          title: "Oops!",
          text: "Failed to send inquiry. Please try again later.",
          icon: "error",
        });
      })
      .finally(() => {
        submitBtn.innerText = originalText;
        submitBtn.disabled = false;
      });
  });
}

const menuBtn = document.getElementById('mobile-menu-btn');
const sidebar = document.getElementById('mobile-sidebar');
const sidebarContent = document.getElementById('sidebar-content');
const closebtn = document.getElementById('close-menu-btn');
const links = document.querySelectorAll('.menu-link');

function openSidebar() {
  sidebar.classList.remove('hidden');
  setTimeout(() => {
    sidebar.classList.remove('opacity-0');
    sidebarContent.classList.remove('translate-x-full');
  }, 10);
}

function closeSidebar() {
  sidebar.classList.add('opacity-0');
  sidebarContent.classList.add('translate-x-full');
  setTimeout(() => {
    sidebar.classList.add('hidden');
  }, 300);
}

// Event Listeners
menuBtn.addEventListener('click', openSidebar);
closebtn.addEventListener('click', closeSidebar);
sidebar.addEventListener('click', (e) => { if(e.target === sidebar) closeSidebar(); });

links.forEach(link => {
  link.addEventListener('click', closeSidebar);
});