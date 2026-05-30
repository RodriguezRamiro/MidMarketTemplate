/* //MidMarketTemplate/script.js */

const navbar = document.querySelector('.navbar');
const navLinks = document.querySelector(".nav-links");
const toggle = document.getElementById("themeToggle");
const hamburger = document.getElementById("hamburger");
const savedTheme = localStorage.getItem("theme");
const reveals = document.querySelectorAll(".reveal");
const form = document.getElementById("contact-form");

// Auto Year Update
document.getElementById("current-year").textContent = new Date().getFullYear();

// Navbar Scroll State
window.addEventListener("scroll", () => {
  if(window.scrollY>40) {
    navbar.classList.add("scrolled");
  } else {
    navbar.classList.remove("scrolled");
  }
});


// Mobile Hamburger Toggle
/* Controls menu open/close
hmaburger animation
slide panel */

hamburger.addEventListener("click", () => {
    navLinks.classList.toggle("active");
    hamburger.classList.toggle("active");

    const expanded = hamburger.getAttribute("aria-expanded") === "true";

    hamburger.setAttribute(
      "aria-expanded",
      !expanded
    );
  });

  // Close mobile menu when link clicked
  document.querySelectorAll(".nav-links a").forEach((link) => {
    link.addEventListener("click", () => {
      navLinks.classList.remove("active");
      hamburger.classList.remove("active");
      hamburger.setAttribute("aria-expanded", "false");
    });
  });

  // Theme Toggle + Persistence
  toggle.addEventListener("click", () => {

    const currentTheme =
      document.body.getAttribute("data-theme");

    if(currentTheme === "light") {
      document.body.removeAttribute("data-theme");
      localStorage.setItem("theme", "dark");
    } else {
      document.body.setAttribute("data-theme", "light");
      localStorage.setItem("theme", "light");
    }
  });

    // Initialize saved theme on page load
    if(savedTheme === "light") {
      // Set dom attribute
      document.body.setAttribute("data-theme", "light");
    }


  // Reveal Animation

  if(!window.matchMedia("(prefers-reduced-motion: reduce)").matches) {


    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if(entry.isIntersecting) {
          entry.target.classList.add("active");
        }
      });
    }, {
      threshold: 0.15
    });

    reveals.forEach((reveal) => {
      observer.observe(reveal);
    });

  } else {
    reveals.forEach((reveal) => {
      reveal.classList.add("active");
    });
  }




  /*
  // Back End Ready Form Handling
  *
  *
  */


  if(form) {
  form.addEventListener("submit", async (e) => {
    e.preventDefault();

    const button = form.querySelector(".contact-submit");
    const originalText = button.textContent;

    button.textContent = "Sending...";
    button.disabled = true;

    try {

      const response = await fetch(form.action, {
        method: "POST",
        body: new FormData(form),
        headers: {
          Accept: "application/json"
        }
      });

      if(response.ok) {
        button.textContent= "Inquiry Sent";

        form.reset();

        setTimeout(() => {
          button.textContent = originalText;
          button.disabled = false;
        }, 3000);

      } else {
        throw new Error("Form submission failed.");
      }

    } catch (error)  {
      button.textContent = "Error - Try Again";

      setTimeout(() => {
        button.textContent = originalText;
        button.disabled = false;
      }, 3000);
    }
  });
  }