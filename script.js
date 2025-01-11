document.addEventListener('DOMContentLoaded', () => {
    // Плавна прокрутка для навігаційних посилань
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth'
                });
            }
        });
    });

    // Додаємо кнопку прокрутки вгору
    const scrollButton = document.createElement('div');
    scrollButton.className = 'scroll-top';
    scrollButton.innerHTML = '<i class="fas fa-arrow-up"></i>';
    document.body.appendChild(scrollButton);

    // Показуємо/приховуємо кнопку прокрутки
    window.addEventListener('scroll', () => {
        if (window.scrollY > 300) {
            scrollButton.classList.add('visible');
        } else {
            scrollButton.classList.remove('visible');
        }
    });

    // Прокрутка вгору при кліку
    scrollButton.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });

    // Мобільне меню
    const menuToggle = document.createElement('div');
    menuToggle.className = 'menu-toggle';
    menuToggle.innerHTML = '<i class="fas fa-bars"></i>';
    document.querySelector('.nav-container').appendChild(menuToggle);

    menuToggle.addEventListener('click', () => {
        const navLinks = document.querySelector('.nav-links');
        navLinks.classList.toggle('active');
        menuToggle.innerHTML = navLinks.classList.contains('active') 
            ? '<i class="fas fa-times"></i>' 
            : '<i class="fas fa-bars"></i>';
    });

    // Анімація появи елементів при прокрутці
    const animateOnScroll = (entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                // Додаємо затримку для послідовної анімації
                const delay = entry.target.dataset.delay || 0;
                entry.target.style.transitionDelay = `${delay}ms`;
            }
        });
    };

    const scrollObserver = new IntersectionObserver(animateOnScroll, {
        threshold: 0.1
    });

    // Додаємо затримку для послідовної анімації карток
    document.querySelectorAll('.feature-card, .category-card').forEach((el, index) => {
        el.dataset.delay = index * 100;
        scrollObserver.observe(el);
    });

    // Додаємо паралакс-ефект для hero-секції
    document.addEventListener('mousemove', (e) => {
        const hero = document.querySelector('.hero');
        const mouseX = e.clientX / window.innerWidth;
        const mouseY = e.clientY / window.innerHeight;
        
        hero.style.backgroundPosition = `${50 + mouseX * 10}% ${50 + mouseY * 10}%`;
    });

    // Анімація для заголовків при прокрутці
    const animateHeaders = () => {
        const headers = document.querySelectorAll('h2');
        headers.forEach(header => {
            const observer = new IntersectionObserver(entries => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        header.style.opacity = '1';
                        header.style.transform = 'translateY(0)';
                    }
                });
            }, { threshold: 0.5 });
            
            observer.observe(header);
        });
    };

    // Ефект паралаксу для карток
    const parallaxCards = () => {
        document.querySelectorAll('.feature-card, .category-card').forEach(card => {
            card.addEventListener('mousemove', (e) => {
                const rect = card.getBoundingClientRect();
                const x = e.clientX - rect.left;
                const y = e.clientY - rect.top;
                
                const centerX = rect.width / 2;
                const centerY = rect.height / 2;
                
                const rotateX = (y - centerY) / 20;
                const rotateY = (centerX - x) / 20;
                
                card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.05, 1.05, 1.05)`;
            });
            
            card.addEventListener('mouseleave', () => {
                card.style.transform = '';
            });
        });
    };

    // Викликаємо нові функції
    animateHeaders();
    parallaxCards();

    // Додаємо ефект розмиття для фону при прокрутці
    window.addEventListener('scroll', () => {
        const header = document.querySelector('.header');
        const scrolled = window.scrollY;
        
        if (scrolled > 50) {
            header.style.backdropFilter = `blur(${Math.min(scrolled / 30, 10)}px)`;
        } else {
            header.style.backdropFilter = 'blur(0px)';
        }
    });
}); 