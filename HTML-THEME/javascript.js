/**
 * Pizza Burger Almeirim - JavaScript v3.1
 * ========================================
 * Features:
 * - Hero slider with auto-advance
 * - Scroll reveal animations
 * - Interactive menu with categories
 * - Reviews carousel with auto-play
 * - Business hours with holidays system
 * - WhatsApp countdown (23:00-23:30)
 * - Accessibility improvements
 */

'use strict';

/* =========================
   INITIALIZATION
   ========================= */

document.addEventListener('DOMContentLoaded', function () {
    // Initialize Lucide icons
    if (typeof lucide !== 'undefined') {
        lucide.createIcons();
    }
    
    // Initialize all components
    initHeroSlider();
    initScrollReveal();
    initMenu();
    initReviewsCarousel();
    initCurrentYear();
    
    // Initialize business hours system
    updateWhatsApp();
    setInterval(updateWhatsApp, 30000); // Update every 30 seconds for countdown precision
});

/* =========================
   HERO BACKGROUND SLIDER
   ========================= */

function initHeroSlider() {
    const backgrounds = document.querySelectorAll('.hero-bg');
    const indicators = document.querySelectorAll('.indicator');
    
    if (!backgrounds.length || !indicators.length) return;
    
    let currentIndex = 0;
    let interval;

    function goToSlide(index) {
        backgrounds.forEach((bg, i) => {
            bg.classList.toggle('active', i === index);
        });
        indicators.forEach((ind, i) => {
            ind.classList.toggle('active', i === index);
            ind.setAttribute('aria-current', i === index ? 'true' : 'false');
        });
        currentIndex = index;
    }

    function nextSlide() {
        const nextIndex = (currentIndex + 1) % backgrounds.length;
        goToSlide(nextIndex);
    }

    function startAutoAdvance() {
        interval = setInterval(nextSlide, 5000);
    }

    function stopAutoAdvance() {
        clearInterval(interval);
    }

    // Click handlers for indicators
    indicators.forEach((indicator, index) => {
        indicator.addEventListener('click', () => {
            stopAutoAdvance();
            goToSlide(index);
            startAutoAdvance();
        });
        
        // Keyboard support
        indicator.addEventListener('keydown', (e) => {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                stopAutoAdvance();
                goToSlide(index);
                startAutoAdvance();
            }
        });
    });

    // Pause on hover/focus for accessibility
    const heroSection = document.getElementById('hero');
    if (heroSection) {
        heroSection.addEventListener('mouseenter', stopAutoAdvance);
        heroSection.addEventListener('mouseleave', startAutoAdvance);
        heroSection.addEventListener('focusin', stopAutoAdvance);
        heroSection.addEventListener('focusout', startAutoAdvance);
    }

    startAutoAdvance();
}

/* =========================
   SCROLL REVEAL ANIMATION
   ========================= */

function initScrollReveal() {
    const elements = document.querySelectorAll('.scroll-reveal');
    
    if (!elements.length) return;
    
    // Check for reduced motion preference
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    
    if (prefersReducedMotion) {
        elements.forEach(el => el.classList.add('revealed'));
        return;
    }
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const delay = parseInt(entry.target.getAttribute('data-delay')) || 0;
                setTimeout(() => {
                    entry.target.classList.add('revealed');
                }, delay);
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });

    elements.forEach(el => observer.observe(el));
}

/* =========================
   MENU DATA & RENDERING
   ========================= */

const menuData = {
    pizzas: {
        title: "Pizzas",
        emoji: "🍕",
        items: [
            { name: "Clássica", description: "Molho de tomate, mozzarella", prices: [{ size: "P", price: "6,90€" }, { size: "M", price: "8,90€" }, { size: "F", price: "11,90€" }] },
            { name: "Bacon", description: "Molho de tomate, mozzarella, bacon", prices: [{ size: "P", price: "6,90€" }, { size: "M", price: "8,90€" }, { size: "F", price: "11,90€" }] },
            { name: "Margherita", description: "Molho de tomate, mozzarella, manjericão", prices: [{ size: "P", price: "6,90€" }, { size: "M", price: "8,90€" }, { size: "F", price: "11,90€" }] },
            { name: "Pepperoni", description: "Molho de tomate, mozzarella, pepperoni", prices: [{ size: "P", price: "7,50€" }, { size: "M", price: "10,90€" }, { size: "F", price: "13,50€" }], badge: "Popular" },
            { name: "Duas Carnes", description: "Molho de tomate, mozzarella, fiambre, chouriço", prices: [{ size: "P", price: "7,50€" }, { size: "M", price: "10,90€" }, { size: "F", price: "13,50€" }] },
            { name: "Hawaiana", description: "Molho de tomate, mozzarella, fiambre, ananás", prices: [{ size: "P", price: "7,50€" }, { size: "M", price: "11,50€" }, { size: "F", price: "13,90€" }] },
            { name: "Vegetariana", description: "Molho de tomate, mozzarella, pimentos, cogumelos, cebola, azeitonas, tomate", prices: [{ size: "P", price: "7,00€" }, { size: "M", price: "10,00€" }, { size: "F", price: "14,00€" }] },
            { name: "Especial Bacon", description: "Molho de tomate, mozzarella, bacon, ovo, fiambre", prices: [{ size: "P", price: "7,90€" }, { size: "M", price: "12,90€" }, { size: "F", price: "15,90€" }], badge: "Popular" },
            { name: "Casa", description: "Molho de tomate, mozzarella, fiambre, cogumelos, bacon, ovo, azeitonas", prices: [{ size: "P", price: "8,90€" }, { size: "M", price: "13,50€" }, { size: "F", price: "17,50€" }] },
            { name: "3 Carnes", description: "Molho de tomate, mozzarella, fiambre, chouriço, bacon", prices: [{ size: "P", price: "9,50€" }, { size: "M", price: "14,50€" }, { size: "F", price: "18,90€" }] },
            { name: "Kebab Barbecue", description: "Molho de tomate, mozzarella, carne kebab, molho barbecue", prices: [{ size: "P", price: "8,90€" }, { size: "M", price: "13,90€" }, { size: "F", price: "18,90€" }] },
            { name: "Palermo", description: "Molho de tomate, mozzarella, fiambre, cogumelos, natas", prices: [{ size: "P", price: "8,90€" }, { size: "M", price: "13,90€" }, { size: "F", price: "18,50€" }] },
            { name: "Mexicana", description: "Molho de tomate, mozzarella, carne picada, cebola, pimentos, molho picante", prices: [{ size: "P", price: "8,90€" }, { size: "M", price: "13,80€" }, { size: "F", price: "18,90€" }] },
            { name: "Atum", description: "Molho de tomate, mozzarella, atum, cebola", prices: [{ size: "P", price: "8,50€" }, { size: "M", price: "13,50€" }, { size: "F", price: "18,90€" }] },
            { name: "Domar (Marisco)", description: "Molho de tomate, mozzarella, marisco variado", prices: [{ size: "P", price: "8,80€" }, { size: "M", price: "13,90€" }, { size: "F", price: "19,50€" }] },
            { name: "Delícia", description: "Molho de tomate, mozzarella, fiambre, ananás, bacon", prices: [{ size: "P", price: "8,90€" }, { size: "M", price: "13,80€" }, { size: "F", price: "18,90€" }] },
            { name: "Especial Pepperoni", description: "Molho de tomate, mozzarella, pepperoni extra", prices: [{ size: "P", price: "8,90€" }, { size: "M", price: "13,50€" }, { size: "F", price: "17,50€" }] },
            { name: "Strogonoff", description: "Molho de tomate, mozzarella, frango, natas, cogumelos", prices: [{ size: "P", price: "7,50€" }, { size: "M", price: "11,50€" }, { size: "F", price: "15,90€" }] },
            { name: "Tutti-Frutti", description: "Chocolate, banana, ananás", prices: [{ size: "P", price: "7,50€" }, { size: "M", price: "11,90€" }, { size: "F", price: "15,90€" }] }
        ]
    },
    hamburgueres: {
        title: "Hambúrgueres",
        emoji: "🍔",
        items: [
            { name: "Apache", description: "Hambúrguer bovino, bacon, queijo, ovo, molho especial", price: "10,30€", badge: "Popular" },
            { name: "Clássica", description: "Hambúrguer bovino, alface, tomate, cebola", price: "8,50€" },
            { name: "Texana Double", description: "Duplo hambúrguer bovino, bacon, queijo cheddar", price: "12,30€", badge: "Popular" },
            { name: "Hawaiana", description: "Hambúrguer bovino, fiambre, ananás, queijo", price: "9,90€" },
            { name: "Sonora Grilled", description: "Hambúrguer bovino grelhado, queijo, cebola caramelizada", price: "9,60€" },
            { name: "Colorado Grilled", description: "Hambúrguer bovino, bacon, queijo, molho especial", price: "9,80€" },
            { name: "Barbecue", description: "Hambúrguer bovino, bacon, queijo, molho BBQ", price: "8,90€" }
        ]
    },
    kebab: {
        title: "Kebab & Tostas",
        emoji: "🌯",
        items: [
            { name: "Kebab em Pão Pita", description: "Carne kebab, salada, molho", price: "7,20€" },
            { name: "Prato Kebab", description: "Carne kebab, arroz, batata frita, salada", price: "7,90€", badge: "Popular" },
            { name: "Salada Kebab", description: "Carne kebab, salada variada", price: "7,90€" },
            { name: "Massa Kebab", description: "Massa, carne kebab, molho", price: "8,50€" }
        ]
    },
    menus: {
        title: "Menus Completos",
        emoji: "🍟",
        items: [
            { name: "Menu Hambúrguer", description: "Hambúrguer à escolha + batata frita + bebida", price: "9,50€", badge: "Promo" },
            { name: "Menu Duplo", description: "Hambúrguer duplo + batata frita grande + bebida", price: "12,50€", badge: "Popular" },
            { name: "Menu Infantil", description: "Mini hambúrguer + batata + sumo + surpresa", price: "6,50€" },
            { name: "Menu Frango", description: "Tiras de frango + batata frita + bebida", price: "8,50€" },
            { name: "Menu Kebab", description: "Kebab + batata frita + bebida", price: "8,00€" }
        ]
    },
    entradas: {
        title: "Entradas & Diversos",
        emoji: "🥣",
        items: [
            { name: "Pão de Alho Simples", description: "Pão torrado com alho e manteiga", price: "3,90€" },
            { name: "Pão de Alho com Queijo", description: "Pão torrado com alho e queijo", price: "4,90€", badge: "Popular" },
            { name: "Pão de Alho com Bacon", description: "Pão torrado com alho, queijo e bacon", price: "5,50€", badge: "Popular" },
            { name: "Pão de Alho com Kebab", description: "Pão torrado com alho, queijo e carne kebab", price: "6,50€" },
            { name: "Guacamole", description: "Abacate, tomate, cebola e limão", price: "5,50€" },
            { name: "Asas de Frango", description: "Asas de frango temperadas e fritas", price: "4,20€" },
            { name: "Sopa do Dia", description: "Sopa caseira do dia", price: "2,50€" },
            { name: "Francesinha", description: "Sanduíche com carnes, queijo e molho especial", price: "11,90€", badge: "Especial" },
            { name: "6 Nuggets", description: "Nuggets de frango (6 unidades)", price: "2,90€" },
            { name: "12 Nuggets", description: "Nuggets de frango (12 unidades)", price: "4,90€" },
            { name: "Dose de Batatas Fritas", description: "Batatas fritas crocantes", price: "3,50€" },
            { name: "Molho Extra", description: "Molho adicional à escolha", price: "0,30€" }
        ]
    },
    massas: {
        title: "Massas",
        emoji: "🍝",
        items: [
            { name: "Pomodoro", description: "Massa com molho de tomate", price: "7,90€" },
            { name: "Carbonara", description: "Massa com natas, bacon e ovo", price: "8,90€", badge: "Popular" },
            { name: "Bolonhesa", description: "Massa com molho de carne picada", price: "9,50€" },
            { name: "Camponesa", description: "Bróculos, bacon, alho francês, cogumelos, molho de natas", price: "9,90€" },
            { name: "Mascarpone", description: "Massa com frango e queijo mascarpone", price: "9,90€" },
            { name: "Vegetariana", description: "Massa com legumes variados", price: "9,90€" },
            { name: "Gambareti", description: "Massa com camarão", price: "9,90€" },
            { name: "Parmegiana", description: "Massa com frango panado, queijo e molho de tomate", price: "9,90€" },
            { name: "Marana", description: "Massa com carne e molho especial", price: "10,50€" },
            { name: "Capoeira", description: "Massa com frango, bacon e natas", price: "10,50€" },
            { name: "Pizza Burguer", description: "Massa com carne, bacon e queijo", price: "10,50€" },
            { name: "Lasanha de Carne", description: "Lasanha em camadas com carne e molho bechamel", price: "10,50€", badge: "Especial" },
            { name: "Mar", description: "Massa com marisco", price: "10,90€" },
            { name: "Massa Personalizada (4 ingredientes)", description: "Massa com 4 ingredientes à escolha", price: "10,50€" },
            { name: "Ingredientes Extra", description: "Excepto Camarão", price: "1,50€" },
            { name: "Ingredientes Extra Camarão", description: "8 Peças", price: "2,50€" }
        ]
    },
    saladas: {
        title: "Saladas",
        emoji: "🥗",
        items: [
            { name: "Tropical", description: "Alface, frango e ananás", price: "7,50€" },
            { name: "Casa", description: "Alface, tomate, atum e ovo", price: "8,50€" },
            { name: "Mar", description: "Alface e marisco", price: "9,30€" },
            { name: "Pasta", description: "Massa fria com frango e legumes", price: "9,50€" },
            { name: "Personalizada (4 ingredientes)", description: "Salada com 4 ingredientes à escolha", price: "9,50€" }
        ]
    },
    extras: {
        title: "Bebidas",
        emoji: "🥤",
        items: [
            { name: "Água 0,5L", price: "1,00€" },
            { name: "Refrigerante 0,33cl", price: "1,50€" },
            { name: "Refrigerante 1,5L", price: "2,50€" },
            { name: "Sumo Natural", price: "2,50€" },
            { name: "Cerveja", price: "1,50€" },
            { name: "Vinho (copo)", price: "1,50€" }
        ]
    },
    sobremesas: {
        title: "Sobremesas",
        emoji: "🍰",
        items: [
            { name: "Gelado (2 bolas)", price: "2,50€" },
            { name: "Brownie com Gelado", price: "4,00€", badge: "Popular" },
            { name: "Cheesecake", price: "3,50€" },
            { name: "Mousse de Chocolate", price: "3,00€" },
            { name: "Tiramisu", price: "4,00€", badge: "Novo" }
        ]
    }
};

function initMenu() {
    const tabs = document.querySelectorAll('.menu-tab');
    const menuItemsContainer = document.getElementById('menuItems');
    const sizeLegend = document.getElementById('sizeLegend');

    if (!tabs.length || !menuItemsContainer) return;

    function renderMenuItems(category) {
        const data = menuData[category];
        if (!data) return;
        
        menuItemsContainer.innerHTML = '';

        // Show/hide size legend for pizzas
        if (sizeLegend) {
            sizeLegend.classList.toggle('hidden', category !== 'pizzas');
        }

        data.items.forEach((item, index) => {
            const itemEl = document.createElement('article');
            itemEl.className = 'menu-item scroll-reveal revealed';
            itemEl.style.animationDelay = `${index * 40}ms`;

            let priceHTML = '';
            if (item.prices) {
                priceHTML = `
                    <div class="menu-item-prices" aria-label="Preços por tamanho">
                        ${item.prices.map(p => `
                            <div class="price-column">
                                <div class="price-size" aria-label="Tamanho ${p.size === 'P' ? 'Pequena' : p.size === 'M' ? 'Média' : 'Familiar'}">${p.size}</div>
                                <div class="price-value">${p.price}</div>
                            </div>
                        `).join('')}
                    </div>
                `;
            } else {
                priceHTML = `<span class="menu-item-price-single" aria-label="Preço">${item.price}</span>`;
            }

            let badgeHTML = '';
            if (item.badge) {
                const badgeClass = item.badge === 'Popular' ? 'popular' : 
                                   item.badge === 'Novo' ? 'novo' : 'promo';
                badgeHTML = `<span class="menu-item-badge ${badgeClass}" aria-label="${item.badge}">🔥 ${item.badge}</span>`;
            }

            itemEl.innerHTML = `
                <div class="menu-item-content">
                    <div class="menu-item-header">
                        <span class="menu-item-name">${escapeHtml(item.name)}</span>
                        ${badgeHTML}
                    </div>
                    ${item.description ? `<p class="menu-item-description">${escapeHtml(item.description)}</p>` : ''}
                </div>
                ${priceHTML}
            `;

            menuItemsContainer.appendChild(itemEl);
        });
    }

    // Tab click handlers
    tabs.forEach(tab => {
        tab.addEventListener('click', () => {
            tabs.forEach(t => {
                t.classList.remove('active');
                t.setAttribute('aria-selected', 'false');
            });
            tab.classList.add('active');
            tab.setAttribute('aria-selected', 'true');
            renderMenuItems(tab.getAttribute('data-category'));
        });
        
        // Keyboard navigation
        tab.addEventListener('keydown', (e) => {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                tab.click();
            }
        });
    });

    // Initialize with pizzas
    renderMenuItems('pizzas');
}

// Utility function to escape HTML
function escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
}

/* =========================
   REVIEWS CAROUSEL
   ========================= */

const reviews = [
    { text: "Comida excelente e atendimento rápido! Recomendo a todos.", author: "Maria S.", rating: 5 },
    { text: "As melhores pizzas da zona! Sempre fresquinhas e saborosas.", author: "João P.", rating: 5 },
    { text: "Hambúrgueres fantásticos, muito suculentos. Voltarei com certeza!", author: "Ana R.", rating: 5 },
    { text: "O Kebab é simplesmente incrível! Melhor que já comi em Portugal.", author: "Carlos M.", rating: 5 },
    { text: "Entrega super rápida e comida sempre quentinha. Top!", author: "Sofia L.", rating: 5 },
    { text: "Preços justos e qualidade excelente. A pizza 4 queijos é divinal!", author: "Pedro F.", rating: 5 },
    { text: "Ambiente familiar e simpático. A francesinha é das melhores!", author: "Rita C.", rating: 5 },
    { text: "Descobri há pouco e já sou cliente fiel. Tudo muito bom!", author: "Miguel A.", rating: 5 },
    { text: "O menu duplo é perfeito para partilhar. Adoramos!", author: "Teresa B.", rating: 5 },
    { text: "Serviço impecável via WhatsApp. Muito prático e eficiente!", author: "António G.", rating: 5 }
];

function initReviewsCarousel() {
    const track = document.getElementById('reviewsTrack');
    const dotsContainer = document.getElementById('carouselDots');
    
    if (!track || !dotsContainer) return;
    
    // Build review cards
    reviews.forEach((review, index) => {
        const card = document.createElement('article');
        card.className = 'review-card';
        card.setAttribute('role', 'listitem');
        
        const stars = Array(review.rating).fill('').map(() => 
            '<i data-lucide="star" aria-hidden="true"></i>'
        ).join('');
        
        card.innerHTML = `
            <div class="review-card-inner">
                <div class="review-stars" aria-label="${review.rating} estrelas">${stars}</div>
                <blockquote class="review-text">"${escapeHtml(review.text)}"</blockquote>
                <p class="review-author">— ${escapeHtml(review.author)}</p>
            </div>
        `;
        
        track.appendChild(card);
    });

    // Re-initialize icons for stars
    if (typeof lucide !== 'undefined') {
        lucide.createIcons();
    }

    // Carousel state
    let currentSlide = 0;
    let slidesPerView = getSlidesPerView();
    let totalSlides = Math.ceil(reviews.length / slidesPerView);
    let autoplayInterval;

    function getSlidesPerView() {
        if (window.innerWidth >= 768) return 3;
        if (window.innerWidth >= 640) return 2;
        return 1;
    }

    function renderDots() {
        dotsContainer.innerHTML = '';
        totalSlides = Math.ceil(reviews.length / getSlidesPerView());
        
        for (let i = 0; i < totalSlides; i++) {
            const dot = document.createElement('button');
            dot.className = `carousel-dot ${i === currentSlide ? 'active' : ''}`;
            dot.setAttribute('aria-label', `Ir para grupo ${i + 1} de ${totalSlides}`);
            dot.setAttribute('role', 'tab');
            dot.setAttribute('aria-selected', i === currentSlide ? 'true' : 'false');
            dot.addEventListener('click', () => goToSlide(i));
            dotsContainer.appendChild(dot);
        }
    }

    function updateCarousel() {
        slidesPerView = getSlidesPerView();
        const slideWidth = 100 / slidesPerView;
        track.style.transform = `translateX(-${currentSlide * slidesPerView * slideWidth}%)`;
        
        document.querySelectorAll('.carousel-dot').forEach((dot, i) => {
            dot.classList.toggle('active', i === currentSlide);
            dot.setAttribute('aria-selected', i === currentSlide ? 'true' : 'false');
        });
    }

    function goToSlide(index) {
        currentSlide = Math.max(0, Math.min(index, totalSlides - 1));
        updateCarousel();
        resetAutoplay();
    }

    function nextSlide() {
        currentSlide = (currentSlide + 1) % totalSlides;
        updateCarousel();
    }

    function startAutoplay() {
        autoplayInterval = setInterval(nextSlide, 5000);
    }

    function resetAutoplay() {
        clearInterval(autoplayInterval);
        startAutoplay();
    }

    // Initialize
    renderDots();
    updateCarousel();
    startAutoplay();

    // Handle resize
    let resizeTimer;
    window.addEventListener('resize', () => {
        clearTimeout(resizeTimer);
        resizeTimer = setTimeout(() => {
            const newSlidesPerView = getSlidesPerView();
            if (newSlidesPerView !== slidesPerView) {
                slidesPerView = newSlidesPerView;
                totalSlides = Math.ceil(reviews.length / slidesPerView);
                currentSlide = Math.min(currentSlide, totalSlides - 1);
                renderDots();
                updateCarousel();
            }
        }, 150);
    });

    // Pause autoplay on hover for accessibility
    const reviewsSection = track.closest('.reviews-section');
    if (reviewsSection) {
        reviewsSection.addEventListener('mouseenter', () => clearInterval(autoplayInterval));
        reviewsSection.addEventListener('mouseleave', startAutoplay);
    }
}

/* =========================
   FOOTER YEAR AUTO-UPDATE
   ========================= */

function initCurrentYear() {
    const yearEl = document.getElementById('currentYear');
    if (yearEl) {
        yearEl.textContent = new Date().getFullYear();
    }
}

/* =========================
   BUSINESS HOURS SYSTEM
   ========================= */

// Opening hours configuration (0 = Sunday, 6 = Saturday)
const openingHours = {
    0: [{ start: 12, end: 15 }, { start: 19, end: 23.5 }], // Domingo
    1: [{ start: 12, end: 15 }, { start: 19, end: 23.5 }], // Segunda
    2: [{ start: 12, end: 15 }, { start: 19, end: 23.5 }], // Terça
    3: [{ start: 12, end: 15 }, { start: 19, end: 23.5 }], // Quarta
    4: [{ start: 12, end: 15 }, { start: 19, end: 23.5 }], // Quinta
    5: [{ start: 12, end: 15 }, { start: 19, end: 23.5 }], // Sexta
    6: [{ start: 12, end: 15 }, { start: 19, end: 23.5 }]  // Sábado
};

/* =========================
   PORTUGUESE HOLIDAYS SYSTEM
   ========================= */

// Fixed Portuguese holidays (day, month, name, closed flag)
const FIXED_HOLIDAYS = [
    { day: 1, month: 1, name: "Ano Novo", closed: true },
    { day: 25, month: 4, name: "Dia da Liberdade", closed: true },
    { day: 1, month: 5, name: "Dia do Trabalhador", closed: true },
    { day: 10, month: 6, name: "Dia de Portugal", closed: true },
    { day: 15, month: 8, name: "Assunção de Nossa Senhora", closed: true },
    { day: 5, month: 10, name: "Implantação da República", closed: true },
    { day: 1, month: 11, name: "Dia de Todos os Santos", closed: true },
    { day: 1, month: 12, name: "Restauração da Independência", closed: true },
    { day: 8, month: 12, name: "Imaculada Conceição", closed: true },
    { day: 25, month: 12, name: "Natal", closed: true },
    { day: 26, month: 12, name: "Dia seguinte ao Natal", closed: true }
];

/**
 * Calculate Easter date using Gauss algorithm
 * @param {number} year - The year
 * @returns {Date} - Easter Sunday date
 */
function getEasterDate(year) {
    const a = year % 19;
    const b = Math.floor(year / 100);
    const c = year % 100;
    const d = Math.floor(b / 4);
    const e = b % 4;
    const f = Math.floor((b + 8) / 25);
    const g = Math.floor((b - f + 1) / 3);
    const h = (19 * a + b - d - g + 15) % 30;
    const i = Math.floor(c / 4);
    const k = c % 4;
    const l = (32 + 2 * e + 2 * i - h - k) % 7;
    const m = Math.floor((a + 11 * h + 22 * l) / 451);
    const month = Math.floor((h + l - 7 * m + 114) / 31);
    const day = ((h + l - 7 * m + 114) % 31) + 1;
    return new Date(year, month - 1, day);
}

/**
 * Get movable holidays based on Easter
 * @param {number} year - The year
 * @returns {Array} - Array of movable holidays
 */
function getMovableHolidays(year) {
    const easter = getEasterDate(year);
    const holidays = [];
    
    // Good Friday (2 days before Easter)
    const goodFriday = new Date(easter);
    goodFriday.setDate(easter.getDate() - 2);
    holidays.push({ 
        day: goodFriday.getDate(), 
        month: goodFriday.getMonth() + 1, 
        name: "Sexta-feira Santa",
        closed: true 
    });
    
    // Easter Sunday
    holidays.push({ 
        day: easter.getDate(), 
        month: easter.getMonth() + 1, 
        name: "Páscoa",
        closed: true 
    });
    
    // Corpus Christi (60 days after Easter)
    const corpusChristi = new Date(easter);
    corpusChristi.setDate(easter.getDate() + 60);
    holidays.push({ 
        day: corpusChristi.getDate(), 
        month: corpusChristi.getMonth() + 1, 
        name: "Corpo de Deus",
        closed: true 
    });
    
    return holidays;
}

/**
 * Check if a date is a holiday
 * @param {Date} date - The date to check
 * @returns {Object|null} - Holiday info or null
 */
function getHolidayInfo(date) {
    const day = date.getDate();
    const month = date.getMonth() + 1;
    const year = date.getFullYear();
    
    // Check fixed holidays
    const fixedHoliday = FIXED_HOLIDAYS.find(h => h.day === day && h.month === month);
    if (fixedHoliday) return fixedHoliday;
    
    // Check movable holidays
    const movableHolidays = getMovableHolidays(year);
    const movableHoliday = movableHolidays.find(h => h.day === day && h.month === month);
    if (movableHoliday) return movableHoliday;
    
    return null;
}

/**
 * Get current time as decimal hours
 * @returns {number} - Current time as decimal (e.g., 14.5 = 14:30)
 */
function nowDecimal() {
    const d = new Date();
    return d.getHours() + d.getMinutes() / 60;
}

/**
 * Format decimal hours to HH:MM string
 * @param {number} h - Decimal hours
 * @returns {string} - Formatted time string
 */
function formatHour(h) {
    const hours = Math.floor(h);
    const mins = Math.round((h - hours) * 60);
    return String(hours).padStart(2, "0") + ":" + String(mins).padStart(2, "0");
}

/**
 * Find next open slot
 * @returns {Object|null} - Next slot info or null
 */
function nextSlot() {
    const now = new Date();
    const t = nowDecimal();
    const todaySlots = openingHours[now.getDay()] || [];
    
    // Check if today is a closed holiday
    const todayHoliday = getHolidayInfo(now);
    if (!todayHoliday || !todayHoliday.closed) {
        for (const s of todaySlots) {
            if (t < s.start) {
                return { label: "hoje", time: formatHour(s.start) };
            }
        }
    }

    // Find next open day
    for (let i = 1; i <= 14; i++) {
        const d = new Date(now);
        d.setDate(now.getDate() + i);
        
        // Check if it's a closed holiday
        const holiday = getHolidayInfo(d);
        if (holiday && holiday.closed) continue;
        
        const slots = openingHours[d.getDay()] || [];
        if (slots.length) {
            return {
                label: d.toLocaleDateString("pt-PT", { weekday: "long" }),
                time: formatHour(slots[0].start)
            };
        }
    }
    return null;
}

/**
 * Get current business hours state
 * @returns {Object} - Business hours state
 */
function getBusinessHoursState() {
    const now = new Date();
    const t = nowDecimal();
    const todaySlots = openingHours[now.getDay()] || [];
    
    // Check for holiday
    const holiday = getHolidayInfo(now);
    const isHolidayClosed = holiday && holiday.closed;
    
    // Check if currently open
    let isOpen = false;
    let minutesUntilClose = null;
    let isClosingVeryLate = false;
    
    if (!isHolidayClosed) {
        for (const slot of todaySlots) {
            if (t >= slot.start && t < slot.end) {
                isOpen = true;
                minutesUntilClose = Math.round((slot.end - t) * 60);
                
                // Last 30 minutes before closing (23:00-23:30)
                if (slot.end === 23.5 && t >= 23) {
                    isClosingVeryLate = true;
                }
                break;
            }
        }
    }
    
    // Build countdown message
    let countdownMessage = null;
    if (isClosingVeryLate && minutesUntilClose !== null) {
        countdownMessage = `⏱️ Fecha em ${minutesUntilClose} min`;
    }
    
    const next = nextSlot();
    
    return {
        isOpen,
        isClosed: isHolidayClosed || !isOpen,
        isHoliday: !!holiday,
        holidayName: holiday ? holiday.name : null,
        isHolidayClosed,
        isClosingVeryLate,
        minutesUntilClose,
        countdownMessage,
        nextSlot: next
    };
}

/* =========================
   WHATSAPP STATUS UPDATE
   ========================= */

function updateWhatsApp() {
    try {
        const state = getBusinessHoursState();
        const statusEl = document.getElementById('openStatus');

        // Update WhatsApp buttons
        document.querySelectorAll(".btn-whatsapp").forEach(btn => {
            if (!btn.dataset.original) btn.dataset.original = btn.innerHTML;

            if (state.isClosed) {
                // Closed state
                let closedText = "Fechado";
                if (state.isHolidayClosed && state.holidayName) {
                    closedText = `⛔ Fechado (${state.holidayName})`;
                } else if (state.nextSlot) {
                    closedText = `⛔ Fechado · Abre ${state.nextSlot.label} às ${state.nextSlot.time}`;
                }
                btn.innerHTML = `<i data-lucide="message-circle" aria-hidden="true"></i> ${closedText}`;
                btn.style.pointerEvents = "none";
                btn.style.opacity = "0.6";
                btn.classList.add('disabled');
                btn.setAttribute('aria-disabled', 'true');
            } else if (state.isClosingVeryLate && state.countdownMessage) {
                // Closing soon state
                btn.innerHTML = `<i data-lucide="message-circle" aria-hidden="true"></i> Encomendar agora ${state.countdownMessage}`;
                btn.style.pointerEvents = "auto";
                btn.style.opacity = "1";
                btn.classList.remove('disabled');
                btn.classList.add('closing-soon');
                btn.removeAttribute('aria-disabled');
            } else {
                // Normal open state
                btn.innerHTML = btn.dataset.original;
                btn.style.pointerEvents = "auto";
                btn.style.opacity = "1";
                btn.classList.remove('disabled', 'closing-soon');
                btn.removeAttribute('aria-disabled');
            }
        });

        // Re-initialize Lucide icons
        if (typeof lucide !== 'undefined') {
            lucide.createIcons();
        }

        // Update phone buttons
        document.querySelectorAll(".btn-phone").forEach(btn => {
            if (state.isClosed) {
                btn.style.pointerEvents = "none";
                btn.style.opacity = "0.6";
                btn.setAttribute('aria-disabled', 'true');
            } else {
                btn.style.pointerEvents = "auto";
                btn.style.opacity = "1";
                btn.removeAttribute('aria-disabled');
            }
        });

        // Update sticky WhatsApp button
        document.querySelectorAll(".sticky-whatsapp").forEach(btn => {
            // Remove existing countdown badge
            const existingBadge = btn.querySelector('.countdown-badge');
            if (existingBadge) existingBadge.remove();
            
            if (state.isClosed) {
                btn.classList.add('disabled');
                btn.style.display = 'none';
                btn.setAttribute('aria-hidden', 'true');
            } else {
                btn.classList.remove('disabled');
                btn.style.display = 'flex';
                btn.removeAttribute('aria-hidden');
                
                // Add countdown badge if closing soon
                if (state.isClosingVeryLate && state.countdownMessage) {
                    const badge = document.createElement('span');
                    badge.className = 'countdown-badge';
                    badge.textContent = state.countdownMessage;
                    badge.setAttribute('aria-live', 'polite');
                    btn.appendChild(badge);
                }
            }
        });

        // Update status indicator
        if (statusEl) {
            if (state.isHolidayClosed) {
                statusEl.innerHTML = `
                    <span class="status-indicator status-closed" aria-hidden="true">
                        <span class="status-dot"></span>
                    </span>
                    <span class="status-text">Fechado (${escapeHtml(state.holidayName || 'Feriado')})</span>
                `;
                statusEl.className = 'open-status closed';
            } else if (state.isOpen) {
                let statusText = 'Aberto agora';
                if (state.isClosingVeryLate && state.countdownMessage) {
                    statusText = `Aberto · ${state.countdownMessage}`;
                }
                statusEl.innerHTML = `
                    <span class="status-indicator status-open" aria-hidden="true">
                        <span class="status-ping"></span>
                        <span class="status-dot"></span>
                    </span>
                    <span class="status-text">${statusText}</span>
                `;
                statusEl.className = 'open-status open';
            } else {
                let statusText = 'Fechado';
                if (state.nextSlot) {
                    statusText = `Fechado · Abre ${state.nextSlot.label} às ${state.nextSlot.time}`;
                }
                statusEl.innerHTML = `
                    <span class="status-indicator status-closed" aria-hidden="true">
                        <span class="status-dot"></span>
                    </span>
                    <span class="status-text">${statusText}</span>
                `;
                statusEl.className = 'open-status closed';
            }
        }
    } catch (e) {
        console.error('Erro ao atualizar status:', e);
    }
}
