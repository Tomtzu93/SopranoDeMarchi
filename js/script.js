document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Add animation to elements when they come into view
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            // Usa una classe diversa per evitare conflitti
            entry.target.classList.add('animate-in');
            // Rimuovi l'elemento dall'observer una volta animato
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

// Observe all cards and sections (esclude l'hero che ha già fade-in statico)
document.querySelectorAll('.card-elegant, section:not(.hero-bg)').forEach(el => {
    // Inizialmente nascosto
    el.style.opacity = '0';
    el.style.transform = 'translateY(30px)';
    el.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
    observer.observe(el);
});

// Button click animations
document.querySelectorAll('.btn-primary').forEach(button => {
    button.addEventListener('click', function(e) {
        // Create ripple effect
        const ripple = document.createElement('span');
        const rect = this.getBoundingClientRect();
        const size = Math.max(rect.width, rect.height);
        const x = e.clientX - rect.left - size / 2;
        const y = e.clientY - rect.top - size / 2;
        
        ripple.style.width = ripple.style.height = size + 'px';
        ripple.style.left = x + 'px';
        ripple.style.top = y + 'px';
        ripple.classList.add('ripple');
        
        this.appendChild(ripple);
        
        setTimeout(() => {
            ripple.remove();
        }, 600);

        // Simulate ticket purchase (placeholder)
        setTimeout(() => {
            window.location.href = 'https://forms.gle/9kPXi2oGBeVmLr3Z8';
        }, 50);
    });
});

// Program item hover effects
document.querySelectorAll('.program-item').forEach(item => {
    item.addEventListener('mouseenter', function() {
        this.style.transform = 'translateX(10px)';
    });
    
    item.addEventListener('mouseleave', function() {
        this.style.transform = 'translateX(0)';
    });
});

// Add some interactive elements
const heroTitle = document.querySelector('.hero-bg h1');
if (heroTitle) {
    heroTitle.addEventListener('mouseover', function() {
        this.style.textShadow = '0 0 20px rgba(212, 175, 55, 0.5)';
    });
    
    heroTitle.addEventListener('mouseout', function() {
        this.style.textShadow = 'none';
    });
}

fetch("https://docs.google.com/spreadsheets/d/e/2PACX-1vTfn7sDoH5SOtySOzdSlIsfhufmJ6vUVNnCHmuO6qJBEro2DPIo1s3kpieAWphWKdkKjbRpeFJxsSkH/pub?gid=1180804499&single=true&output=csv")
.then(response => response.text())
.then(text => {
    document.getElementById("posti-rimanenti").innerText = text.trim();
})
.catch(error => {
    console.error("Errore nel caricamento dei dati:", error);
    document.getElementById("posti-rimanenti").innerText = "N/D";
});
