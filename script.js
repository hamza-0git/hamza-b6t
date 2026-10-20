document.addEventListener('DOMContentLoaded', () => {

    // ===== Translations =====
    const translations = {
        ar: {
            logo: 'حمزة<span class="logo-dot">.</span>',
            nav_home: 'الرئيسية',
            nav_about: 'عنّي',
            nav_skills: 'المهارات',
            nav_contact: 'تواصل',
            hero_greeting: 'مرحباً، أنا',
            hero_name: 'حمزة',
            hero_role: 'مبرمج أنظمة',
            hero_desc: 'مطور نظم مبتدئ من المغرب، شغوف ببرمجة الأنظمة المنخفضة المستوى واستكشاف عالم لغات البرمجة القوية.',
            hero_btn1: 'استكشف مهاراتي',
            hero_btn2: 'تواصل معي',
            about_title: 'عنّي',
            about_heading: 'حمزة — مبرمج أنظمة من المغرب',
            about_p1: 'أنا حمزة، مبرمج أنظمة مبتدئ من المغرب. شغوف بعالم البرمجة المنخفضة المستوى، أتعلّم وأتطور باستمرار في لغات القوة والأداء العالي.',
            about_p2: 'أؤمن بأن فهم الآلة من الصفر يصنع مبرمجين أفضل، لذلك أركز على لغات مثل Rust و C و C++ و Assembly لبناء أساس قوي في هندسة البرمجيات.',
            stat1: 'لغة برمجة',
            stat2: 'حسابات تواصل',
            stat3: 'بلد — المغرب',
            skills_title: 'لغات البرمجة',
            skills_subtitle: 'اللغات التي أعمل بها وأتعلّمها',
            skill_rust: 'لغة أنظمة حديثة تجمع بين الأداء العالي والأمان الذاهبي بدون جامٍ غارب',
            skill_c: 'لغة الأساس في برمجة الأنظمة والتطبيقات عالية الأداء',
            skill_cpp: 'امتداد قوي لغة C مع دعم البرمجة كائنية التوجّه والقوالب',
            skill_asm: 'لغة المستوى المنخفض للتعامل المباشر مع المعالج والذاكرة',
            skill_bash: 'أتمتة المهام وبرمجة سطر الأوامر في أنظمة لينكس',
            contact_title: 'تواصل معي',
            contact_subtitle: 'يمكنك الوصول إليّ عبر هذه المنصات',
            discord_text: 'انضم إلى الخادم',
            footer: 'حمزة — مبرمج أنظمة. جميع الحقوق محفوظة.',
            title: 'حمزة | مبرمج أنظمة',
            typed_phrases: ['نظام', 'Rust', 'C', 'C++', 'Assembly', 'Bash'],
        },
        en: {
            logo: 'Hamza<span class="logo-dot">.</span>',
            nav_home: 'Home',
            nav_about: 'About',
            nav_skills: 'Skills',
            nav_contact: 'Contact',
            hero_greeting: "Hi, I'm",
            hero_name: 'Hamza',
            hero_role: 'Systems Programmer',
            hero_desc: 'A beginner systems developer from Morocco, passionate about low-level programming and exploring the world of powerful programming languages.',
            hero_btn1: 'Explore My Skills',
            hero_btn2: 'Contact Me',
            about_title: 'About Me',
            about_heading: 'Hamza — Systems Programmer from Morocco',
            about_p1: "I'm Hamza, a beginner systems programmer from Morocco. Passionate about the world of low-level programming, I'm constantly learning and improving in high-performance and powerful languages.",
            about_p2: 'I believe that understanding the machine from scratch makes better programmers, which is why I focus on languages like Rust, C, C++, and Assembly to build a strong foundation in software engineering.',
            stat1: 'Programming Languages',
            stat2: 'Social Accounts',
            stat3: 'Country — Morocco',
            skills_title: 'Programming Languages',
            skills_subtitle: 'The languages I work with and learn',
            skill_rust: 'A modern systems language combining high performance and memory safety without a garbage collector',
            skill_c: 'The foundation of systems programming and high-performance applications',
            skill_cpp: 'A powerful extension of C with object-oriented programming and templates support',
            skill_asm: 'A low-level language for direct interaction with the processor and memory',
            skill_bash: 'Task automation and command-line scripting on Linux systems',
            contact_title: 'Contact Me',
            contact_subtitle: "You can reach me through these platforms",
            discord_text: 'Join the server',
            footer: 'Hamza — Systems Programmer. All rights reserved.',
            title: 'Hamza | Systems Programmer',
            typed_phrases: ['Systems', 'Rust', 'C', 'C++', 'Assembly', 'Bash'],
        }
    };

    let currentLang = localStorage.getItem('lang') || 'en';

    // ===== Elements =====
    const navbar = document.querySelector('.navbar');
    const menuToggle = document.querySelector('.menu-toggle');
    const navLinks = document.querySelector('.nav-links');
    const navAnchors = document.querySelectorAll('.nav-links a');
    const backToTop = document.querySelector('.back-to-top');
    const typedText = document.querySelector('.typed-text');
    const yearEl = document.getElementById('year');
    const langToggle = document.getElementById('langToggle');

    yearEl.textContent = new Date().getFullYear();

    // ===== Language Switch =====
    function setLanguage(lang) {
        currentLang = lang;
        localStorage.setItem('lang', lang);
        const html = document.documentElement;
        html.lang = lang;
        html.dir = lang === 'ar' ? 'rtl' : 'ltr';
        document.title = translations[lang].title;

        document.querySelectorAll('[data-i18n]').forEach(el => {
            const key = el.getAttribute('data-i18n');
            if (translations[lang][key] !== undefined) {
                el.innerHTML = translations[lang][key];
            }
        });

        langToggle.querySelectorAll('.lang-label').forEach(label => {
            label.classList.toggle('active', label.dataset.lang === lang);
        });

        resetTypedText();
    }

    langToggle.addEventListener('click', () => {
        setLanguage(currentLang === 'ar' ? 'en' : 'ar');
    });

    setLanguage(currentLang);

    // ===== Navbar scroll =====
    window.addEventListener('scroll', () => {
        navbar.classList.toggle('scrolled', window.scrollY > 50);
        backToTop.classList.toggle('visible', window.scrollY > 500);
        updateActiveLink();
    });

    // ===== Mobile menu =====
    menuToggle.addEventListener('click', () => {
        menuToggle.classList.toggle('active');
        navLinks.classList.toggle('active');
    });

    navAnchors.forEach(link => {
        link.addEventListener('click', () => {
            menuToggle.classList.remove('active');
            navLinks.classList.remove('active');
        });
    });

    // ===== Active nav link on scroll =====
    const sections = document.querySelectorAll('section, header');

    function updateActiveLink() {
        let current = '';
        sections.forEach(section => {
            const top = section.offsetTop - 120;
            if (window.scrollY >= top) {
                current = section.getAttribute('id');
            }
        });
        navAnchors.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === '#' + current) {
                link.classList.add('active');
            }
        });
    }

    // ===== Back to top =====
    backToTop.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });

    // ===== Typed text effect =====
    let phraseIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    let typeSpeed = 80;
    let typeTimer = null;

    function typeEffect() {
        const phrases = translations[currentLang].typed_phrases;
        const current = phrases[phraseIndex % phrases.length];

        if (isDeleting) {
            typedText.textContent = current.substring(0, charIndex - 1);
            charIndex--;
            typeSpeed = 40;
        } else {
            typedText.textContent = current.substring(0, charIndex + 1);
            charIndex++;
            typeSpeed = 100;
        }

        if (!isDeleting && charIndex === current.length) {
            typeSpeed = 1800;
            isDeleting = true;
        } else if (isDeleting && charIndex === 0) {
            isDeleting = false;
            phraseIndex = (phraseIndex + 1) % phrases.length;
            typeSpeed = 400;
        }

        typeTimer = setTimeout(typeEffect, typeSpeed);
    }

    function resetTypedText() {
        clearTimeout(typeTimer);
        phraseIndex = 0;
        charIndex = 0;
        isDeleting = false;
        typeSpeed = 80;
        typeEffect();
    }

    typeEffect();

    // ===== Reveal on scroll =====
    const revealElements = document.querySelectorAll(
        '.skill-card, .contact-card, .about-text, .about-card, .section-title, .section-subtitle'
    );

    revealElements.forEach(el => el.classList.add('reveal'));

    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                revealObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.15 });

    revealElements.forEach(el => revealObserver.observe(el));

    // ===== Skill bars animation =====
    const skillBars = document.querySelectorAll('.skill-progress');

    const skillObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const level = entry.target.getAttribute('data-level');
                entry.target.style.width = level + '%';
                skillObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });

    skillBars.forEach(bar => skillObserver.observe(bar));

    // ===== Counter animation =====
    const statNumbers = document.querySelectorAll('.stat-number');

    const counterObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateCounter(entry.target);
                counterObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });

    statNumbers.forEach(el => counterObserver.observe(el));

    function animateCounter(el) {
        const target = parseInt(el.getAttribute('data-target'));
        const duration = 1500;
        const start = performance.now();

        function update(now) {
            const elapsed = now - start;
            const progress = Math.min(elapsed / duration, 1);
            const eased = 1 - Math.pow(1 - progress, 3);
            el.textContent = Math.round(eased * target);
            if (progress < 1) requestAnimationFrame(update);
        }

        requestAnimationFrame(update);
    }

    // ===== Particle parallax on mouse move =====
    const particles = document.querySelectorAll('.particle');
    const hero = document.querySelector('.hero');

    hero.addEventListener('mousemove', (e) => {
        const x = e.clientX / window.innerWidth;
        const y = e.clientY / window.innerHeight;
        particles.forEach(p => {
            const speed = parseFloat(p.getAttribute('data-speed'));
            const moveX = (x - 0.5) * 60 * speed * 10;
            const moveY = (y - 0.5) * 60 * speed * 10;
            p.style.transform = `translate(${moveX}px, ${moveY}px)`;
        });
    });

});
