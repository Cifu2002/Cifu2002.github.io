// Navigation functionality
document.addEventListener("DOMContentLoaded", () => {
  const hamburger = document.getElementById("hamburger")
  const navMenu = document.getElementById("nav-menu")
  const navLinks = document.querySelectorAll(".nav-link")

  // Mobile menu toggle
  hamburger.addEventListener("click", () => {
    navMenu.classList.toggle("active")

    // Animate hamburger
    hamburger.classList.toggle("active")
  })

  // Close mobile menu when clicking on a link
  navLinks.forEach((link) => {
    link.addEventListener("click", () => {
      navMenu.classList.remove("active")
      hamburger.classList.remove("active")
    })
  })

  // Active navigation link based on scroll position
  // Update the navigation links array to include skills
  const navLinksData = [
    { id: "home", label: "Inicio" },
    { id: "about", label: "Sobre mí" },
    { id: "skills", label: "Habilidades" },
    { id: "education", label: "Educación" },
    { id: "projects", label: "Proyectos" },
    { id: "contact", label: "Contacto" },
  ]

  // Update the sections array for scroll detection
  function updateActiveNavLink() {
    const sections = ["home", "about", "skills", "education", "projects", "contact"]
    const scrollPosition = window.scrollY + 100

    sections.forEach((sectionId) => {
      const section = document.getElementById(sectionId)
      if (section) {
        const sectionTop = section.offsetTop
        const sectionHeight = section.offsetHeight
        const navLink = document.querySelector(`[data-section="${sectionId}"]`)

        if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
          document.querySelectorAll(".nav-link").forEach((link) => link.classList.remove("active"))
          if (navLink) {
            navLink.classList.add("active")
          }
        }
      }
    })
  }

  // Smooth scrolling for navigation links
  navLinks.forEach((link) => {
    link.addEventListener("click", function (e) {
      e.preventDefault()
      const targetId = this.getAttribute("href").substring(1)
      const targetSection = document.getElementById(targetId)

      if (targetSection) {
        const offsetTop = targetSection.offsetTop - 80
        window.scrollTo({
          top: offsetTop,
          behavior: "smooth",
        })
      }
    })
  })

  // Navbar background on scroll
  function updateNavbarBackground() {
    const navbar = document.getElementById("navbar")
    if (window.scrollY > 50) {
      navbar.style.background = "rgba(0, 0, 0, 0.9)"
    } else {
      navbar.style.background = "rgba(0, 0, 0, 0.2)"
    }
  }

  // Scroll animations
  function animateOnScroll() {
    const animatedElements = document.querySelectorAll(".fade-in, .slide-in-left, .slide-in-right")

    animatedElements.forEach((element) => {
      const elementTop = element.getBoundingClientRect().top
      const elementVisible = 150

      if (elementTop < window.innerHeight - elementVisible) {
        element.classList.add("visible")
      }
    })
  }

  // Add animation classes to elements
  function addAnimationClasses() {
    // Hero section animations
    document.querySelector(".hero-text").classList.add("slide-in-left")
    document.querySelector(".hero-image").classList.add("slide-in-right")

    // About section animations
    document.querySelector(".about-text").classList.add("slide-in-left")
    document.querySelector(".skills-grid").classList.add("slide-in-right")

    // Cards animations
    document.querySelectorAll(".education-card").forEach((card, index) => {
      card.classList.add("fade-in")
      card.style.transitionDelay = `${index * 0.1}s`
    })

    document.querySelectorAll(".project-card").forEach((card, index) => {
      card.classList.add("fade-in")
      card.style.transitionDelay = `${index * 0.1}s`
    })

    // Contact section animations
    document.querySelector(".contact-info").classList.add("slide-in-left")
    document.querySelector(".social-section").classList.add("slide-in-right")
  }

  // Typing animation for hero title
  function typeWriter() {
    const heroName = document.querySelector(".hero-name")
    const text = heroName.textContent
    heroName.textContent = ""
    heroName.style.borderRight = "2px solid #a855f7"

    let i = 0
    function type() {
      if (i < text.length) {
        heroName.textContent += text.charAt(i)
        i++
        setTimeout(type, 100)
      } else {
        setTimeout(() => {
          heroName.style.borderRight = "none"
        }, 1000)
      }
    }

    setTimeout(type, 1000)
  }

  // Parallax effect for hero background
  function parallaxEffect() {
    const heroBackground = document.querySelector(".hero-background")
    const scrolled = window.pageYOffset
    const rate = scrolled * -0.5

    if (heroBackground) {
      heroBackground.style.transform = `translateY(${rate}px)`
    }
  }

  // Project card hover effects
  function initProjectCards() {
    const projectCards = document.querySelectorAll(".project-card")

    projectCards.forEach((card) => {
      card.addEventListener("mouseenter", function () {
        this.style.transform = "translateY(-10px) scale(1.02)"
      })

      card.addEventListener("mouseleave", function () {
        this.style.transform = "translateY(0) scale(1)"
      })
    })
  }

  // Skill cards animation
  function initSkillCards() {
    const skillCards = document.querySelectorAll(".skill-card")

    skillCards.forEach((card, index) => {
      card.style.animationDelay = `${index * 0.1}s`

      card.addEventListener("mouseenter", function () {
        this.style.transform = "translateY(-5px) scale(1.05)"
      })

      card.addEventListener("mouseleave", function () {
        this.style.transform = "translateY(0) scale(1)"
      })
    })
  }

  // Animate skill progress bars
  function animateSkillBars() {
    const skillBars = document.querySelectorAll(".skill-progress")

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const progressBar = entry.target
            const width = progressBar.getAttribute("data-width")

            setTimeout(() => {
              progressBar.style.width = width + "%"
            }, 200)

            observer.unobserve(progressBar)
          }
        })
      },
      {
        threshold: 0.5,
      },
    )

    skillBars.forEach((bar) => {
      observer.observe(bar)
    })
  }

  // Initialize all functions
  addAnimationClasses()
  typeWriter()
  initProjectCards()
  initSkillCards()
  // Initialize skill bars animation
  animateSkillBars()

  // Event listeners
  window.addEventListener("scroll", () => {
    updateActiveNavLink()
    updateNavbarBackground()
    animateOnScroll()
    parallaxEffect()
  })

  // Initial calls
  updateActiveNavLink()
  updateNavbarBackground()
  animateOnScroll()

  // Smooth reveal animation on page load
  setTimeout(() => {
    document.body.style.opacity = "1"
  }, 100)
})

// Add loading animation
document.body.style.opacity = "0"
document.body.style.transition = "opacity 0.5s ease-in-out"

// Contact form functionality (if you want to add a contact form later)
function initContactForm() {
  const contactForm = document.getElementById("contact-form")

  if (contactForm) {
    contactForm.addEventListener("submit", function (e) {
      e.preventDefault()

      // Add your form submission logic here
      const formData = new FormData(this)

      // Show success message
      showNotification("¡Mensaje enviado correctamente!", "success")
    })
  }
}

// Notification system
function showNotification(message, type = "info") {
  const notification = document.createElement("div")
  notification.className = `notification ${type}`
  notification.textContent = message

  notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        padding: 1rem 2rem;
        background: ${type === "success" ? "#10b981" : "#3b82f6"};
        color: white;
        border-radius: 0.5rem;
        z-index: 10000;
        transform: translateX(100%);
        transition: transform 0.3s ease;
    `

  document.body.appendChild(notification)

  setTimeout(() => {
    notification.style.transform = "translateX(0)"
  }, 100)

  setTimeout(() => {
    notification.style.transform = "translateX(100%)"
    setTimeout(() => {
      document.body.removeChild(notification)
    }, 300)
  }, 3000)
}

// Easter egg - Konami code
const konamiCode = []
const konamiSequence = [38, 38, 40, 40, 37, 39, 37, 39, 66, 65]

document.addEventListener("keydown", (e) => {
  konamiCode.push(e.keyCode)

  if (konamiCode.length > konamiSequence.length) {
    konamiCode.shift()
  }

  if (konamiCode.join(",") === konamiSequence.join(",")) {
    showNotification("¡Código Konami activado! 🎮", "success")
    document.body.style.animation = "rainbow 2s infinite"

    setTimeout(() => {
      document.body.style.animation = ""
    }, 5000)
  }
})

// Add rainbow animation for easter egg
const style = document.createElement("style")
style.textContent = `
    @keyframes rainbow {
        0% { filter: hue-rotate(0deg); }
        100% { filter: hue-rotate(360deg); }
    }
`
document.head.appendChild(style)
