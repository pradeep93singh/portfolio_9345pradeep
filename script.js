// ===== Mobile Menu Toggle =====
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');
const navLinks = document.querySelectorAll('.nav-link');

hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
});

// Close mobile menu when clicking a link
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
    });
});

// ===== Active Navigation on Scroll =====
const sections = document.querySelectorAll('section');
const navItems = document.querySelectorAll('.nav-link');

window.addEventListener('scroll', () => {
    let current = '';
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        
        // use explicit window.scrollY to avoid ambiguity
        if (window.scrollY >= (sectionTop - 200)) {
            current = section.getAttribute('id');
        }
    });

    navItems.forEach(item => {
        item.classList.remove('active');
        if (item.getAttribute('href').slice(1) === current) {
            item.classList.add('active');
        }
    });
});

// ===== Smooth Scrolling for Navigation =====
navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
        const targetId = link.getAttribute('href');
        const targetSection = document.querySelector(targetId);
        
        targetSection.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
        });
    });
});

// ===== Contact Form Handling =====
const contactForm = document.getElementById('contactForm');

if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        // Get form data (needs name attributes on inputs)
        const formData = new FormData(contactForm);
        const name = formData.get('name');
        const email = formData.get('email');
        const subject = formData.get('subject');
        const message = formData.get('message');
        
        // TODO: integrate with backend or email service. For now we just show a notification.
        if (name && email && message) {
            showNotification('Message sent successfully! I will get back to you soon.', 'success');
        } else {
            showNotification('Please fill out all required fields.', 'error');
        }
        
        // Reset form
        contactForm.reset();
    });
}

// ===== Notification System =====
function showNotification(message, type) {
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.innerHTML = `
        <i class="fas ${type === 'success' ? 'fa-check-circle' : 'fa-exclamation-circle'}"></i>
        <p>${message}</p>
    `;
    
    // Style notification
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: ${type === 'success' ? '#10b981' : '#ef4444'};
        color: white;
        padding: 1rem 2rem;
        border-radius: 8px;
        box-shadow: 0 5px 15px rgba(0,0,0,0.2);
        z-index: 9999;
        display: flex;
        align-items: center;
        gap: 10px;
        animation: slideIn 0.3s ease;
    `;
    
    document.body.appendChild(notification);
    
    // Remove notification after 3 seconds
    setTimeout(() => {
        notification.style.animation = 'slideOut 0.3s ease';
        setTimeout(() => {
            notification.remove();
        }, 300);
    }, 3000);
}

// ===== Add animation styles
const style = document.createElement('style');
style.textContent = `
    @keyframes slideIn {
        from {
            transform: translateX(100%);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }
    
    @keyframes slideOut {
        from {
            transform: translateX(0);
            opacity: 1;
        }
        to {
            transform: translateX(100%);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);

// ===== Scroll to Top Button =====
const scrollBtn = document.createElement('button');
scrollBtn.innerHTML = '<i class="fas fa-arrow-up"></i>';
scrollBtn.className = 'scroll-top';
scrollBtn.style.cssText = `
    position: fixed;
    bottom: 30px;
    right: 30px;
    width: 50px;
    height: 50px;
    border-radius: 50%;
    background: var(--primary-color);
    color: white;
    border: none;
    cursor: pointer;
    display: none;
    align-items: center;
    justify-content: center;
    font-size: 1.2rem;
    box-shadow: 0 5px 15px rgba(37, 99, 235, 0.3);
    z-index: 99;
    transition: all 0.3s ease;
`;

document.body.appendChild(scrollBtn);

window.addEventListener('scroll', () => {
    if (window.scrollY > 500) {
        scrollBtn.style.display = 'flex';
    } else {
        scrollBtn.style.display = 'none';
    }
});

scrollBtn.addEventListener('click', () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

scrollBtn.addEventListener('mouseenter', () => {
    scrollBtn.style.transform = 'scale(1.1)';
    scrollBtn.style.background = 'var(--secondary-color)';
});

scrollBtn.addEventListener('mouseleave', () => {
    scrollBtn.style.transform = 'scale(1)';
    scrollBtn.style.background = 'var(--primary-color)';
});

// ===== Animate Progress Bars on Scroll =====
const progressBars = document.querySelectorAll('.progress');

const observerOptions = {
    threshold: 0.5,
    rootMargin: '0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const progressBar = entry.target;
            const width = progressBar.style.width;
            progressBar.style.width = '0';
            
            setTimeout(() => {
                progressBar.style.width = width;
            }, 100);
        }
    });
}, observerOptions);

progressBars.forEach(bar => observer.observe(bar));

// ===== Typewriter Effect for Hero Section (Optional) =====
const heroText = document.querySelector('.hero-content h2');
if (heroText) {
    const text = heroText.textContent;
    heroText.textContent = '';
    
    let i = 0;
    const typeWriter = () => {
        if (i < text.length) {
            heroText.textContent += text.charAt(i);
            i++;
            setTimeout(typeWriter, 100);
        }
    };
    
    // Start typewriter effect after page load
    window.addEventListener('load', typeWriter);
}

// ===== Project Filter (Optional Feature) =====
function createProjectFilters() {
    const projectsSection = document.querySelector('.projects');
    const projectsGrid = document.querySelector('.projects-grid');
    
    const filterContainer = document.createElement('div');
    filterContainer.className = 'project-filters';
    filterContainer.style.cssText = `
        display: flex;
        justify-content: center;
        gap: 1rem;
        margin-bottom: 2rem;
        flex-wrap: wrap;
    `;
    
    const filters = ['All', 'Python', 'Power BI', 'SQL', 'Excel'];
    
    filters.forEach(filter => {
        const btn = document.createElement('button');
        btn.textContent = filter;
        btn.className = 'filter-btn';
        btn.style.cssText = `
            padding: 0.5rem 1.5rem;
            border: 2px solid var(--primary-color);
            background: transparent;
            color: var(--primary-color);
            border-radius: 50px;
            cursor: pointer;
            font-weight: 500;
            transition: all 0.3s ease;
        `;
        
        if (filter === 'All') {
            btn.style.background = 'var(--primary-color)';
            btn.style.color = 'white';
        }
        
        btn.addEventListener('click', () => {
            // Reset all buttons
            document.querySelectorAll('.filter-btn').forEach(b => {
                b.style.background = 'transparent';
                b.style.color = 'var(--primary-color)';
            });
            
            // Style active button
            btn.style.background = 'var(--primary-color)';
            btn.style.color = 'white';
            
            // Filter projects (implement based on your project tech)
            filterProjects(filter);
        });
        
        filterContainer.appendChild(btn);
    });
    
    projectsSection.insertBefore(filterContainer, projectsGrid);
}

function filterProjects(filter) {
    const projects = document.querySelectorAll('.project-card');
    
    projects.forEach(project => {
        const tech = project.querySelector('.project-tech').textContent;
        
        if (filter === 'All' || tech.includes(filter)) {
            project.style.display = 'block';
            setTimeout(() => {
                project.style.opacity = '1';
                project.style.transform = 'scale(1)';
            }, 10);
        } else {
            project.style.opacity = '0';
            project.style.transform = 'scale(0.8)';
            setTimeout(() => {
                project.style.display = 'none';
            }, 300);
        }
    });
}

// Uncomment to enable project filters
// createProjectFilters();

// ===== Initialize on Page Load =====
document.addEventListener('DOMContentLoaded', () => {
    console.log('Portfolio loaded successfully!');
    
    // Add smooth reveal for cards
    const cards = document.querySelectorAll('.project-card, .cert-card, .skill-card');
    
    cards.forEach((card, index) => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(20px)';
        
        setTimeout(() => {
            card.style.transition = 'all 0.5s ease';
            card.style.opacity = '1';
            card.style.transform = 'translateY(0)';
        }, 100 * index);
    });
});