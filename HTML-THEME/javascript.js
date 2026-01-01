/**
 * Pizza Burger Almeirim - JavaScript
 * ===================================
 * REGRAS ABSOLUTAS:
 * - NÃO alterar estrutura HTML
 * - NÃO criar ou remover elementos
 * - Só alterar textContent, classList, href
 */

document.addEventListener('DOMContentLoaded', function () {
    lucide.createIcons();
    initHeroSlider();
    initScrollReveal();
    initMenu();
    initReviewsCarousel();
    initCurrentYear();
    
    updateSiteStatus();
    setInterval(updateSiteStatus, 60000);
});

/**
 * Hero Background Slider
 */
function initHeroSlider() {
    const backgrounds = document.querySelectorAll('.hero-bg');
    const indicators = document.querySelectorAll('.indicator');
    let currentIndex = 0;
    let interval;

    function goToSlide(index) {
        backgrounds.forEach((bg, i) => {
            bg.classList.toggle('active', i === index);
        });
        indicators.forEach((ind, i) => {
            ind.classList.toggle('active', i === index);
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

    indicators.forEach((indicator, index) => {
        indicator.addEventListener('click', () => {
            clearInterval(interval);
            goToSlide(index);
            startAutoAdvance();
        });
    });

    startAutoAdvance();
}

/**
 * Scroll Reveal Animation
 */
function initScrollReveal() {
    const elements = document.querySelectorAll('.scroll-reveal');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const delay = entry.target.getAttribute('data-delay') || 0;
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

/**
 * Menu Data
 */
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
            { name: "Pão de Alho Simples", description: "Pão torrado com alho e manteiga", price: "3,90€", badge: "🍞 Entrada" },
            { name: "Pão de Alho com Queijo", description: "Pão torrado com alho e queijo", price: "4,90€", badge: "🔥 Popular" },
            { name: "Pão de Alho com Bacon", description: "Pão torrado com alho, queijo e bacon", price: "5,50€", badge: "🔥 Popular" },
            { name: "Pão de Alho com Kebab", description: "Pão torrado com alho, queijo e carne kebab", price: "6,50€", badge: "⭐ Especial" },
            { name: "Guacamole", description: "Abacate, tomate, cebola e limão", price: "5,50€", badge: "🌮 Mexicano" },
            { name: "Asas de Frango", description: "Asas de frango temperadas e fritas", price: "4,20€", badge: "👑 Top" },
            { name: "Sopa do Dia", description: "Sopa caseira do dia", price: "2,50€", badge: "⏰ Do Dia" },
            { name: "Francesinha", description: "Sanduíche com carnes, queijo e molho especial", price: "11,90€", badge: "⭐ Especial" },
            { name: "6 Nuggets", description: "Nuggets de frango (6 unidades)", price: "2,90€", badge: "🍗 Entrada" },
            { name: "12 Nuggets", description: "Nuggets de frango (12 unidades)", price: "4,90€", badge: "🍗 Entrada" },
            { name: "Dose de Batatas Fritas", description: "Batatas fritas crocantes", price: "3,50€", badge: "➕ Extra" },
            { name: "Molho Extra", description: "Molho adicional à escolha", price: "0,30€", badge: "➕ Extra" }
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
        title: "Extras & Bebidas",
        emoji: "🥤",
        items: [
            { name: "Batata Frita Pequena", price: "2,00€" },
            { name: "Batata Frita Grande", price: "3,00€" },
            { name: "Nuggets (6 unid.)", price: "3,50€" },
            { name: "Aros de Cebola", price: "3,00€" },
            { name: "Refrigerante", price: "1,50€" },
            { name: "Água", price: "1,00€" },
            { name: "Sumo Natural", price: "2,50€" }
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

    function renderMenuItems(category) {
        const data = menuData[category];
        menuItemsContainer.innerHTML = '';

        if (category === 'pizzas') {
            sizeLegend.classList.remove('hidden');
        } else {
            sizeLegend.classList.add('hidden');
        }

        data.items.forEach((item, index) => {
            const itemEl = document.createElement('div');
            itemEl.className = 'menu-item scroll-reveal revealed';
            itemEl.style.animationDelay = `${index * 40}ms`;

            let priceHTML = '';
            if (item.prices) {
                priceHTML = `
                    <div class="menu-item-prices">
                        ${item.prices.map(p => `
                            <div class="price-column">
                                <div class="price-size">${p.size}</div>
                                <div class="price-value">${p.price}</div>
                            </div>
                        `).join('')}
                    </div>
                `;
            } else {
                priceHTML = `<span class="menu-item-price-single">${item.price}</span>`;
            }

            let badgeHTML = '';
            if (item.badge) {
                const badgeClass = item.badge === 'Popular' ? 'popular' : 
                                   item.badge === 'Novo' ? 'novo' : 'promo';
                badgeHTML = `<span class="menu-item-badge ${badgeClass}">🔥 ${item.badge}</span>`;
            }

            itemEl.innerHTML = `
                <div class="menu-item-content">
                    <div class="menu-item-header">
                        <span class="menu-item-name">${item.name}</span>
                        ${badgeHTML}
                    </div>
                    ${item.description ? `<p class="menu-item-description">${item.description}</p>` : ''}
                </div>
                ${priceHTML}
            `;

            menuItemsContainer.appendChild(itemEl);
        });
    }

    tabs.forEach(tab => {
        tab.addEventListener('click', () => {
            tabs.forEach(t => t.classList.remove('active'));
            tab.classList.add('active');
            renderMenuItems(tab.getAttribute('data-category'));
        });
    });

    renderMenuItems('pizzas');
}

/**
 * Reviews Carousel
 */
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
    
    reviews.forEach((review, index) => {
        const card = document.createElement('div');
        card.className = 'review-card';
        
        const stars = Array(review.rating).fill('').map(() => 
            '<i data-lucide="star"></i>'
        ).join('');
        
        card.innerHTML = `
            <div class="review-card-inner">
                <div class="review-stars">${stars}</div>
                <p class="review-text">"${review.text}"</p>
                <p class="review-author">— ${review.author}</p>
            </div>
        `;
        
        track.appendChild(card);
    });

    lucide.createIcons();

    function getSlidesPerView() {
        if (window.innerWidth >= 768) return 3;
        if (window.innerWidth >= 640) return 2;
        return 1;
    }

    let currentSlide = 0;
    let slidesPerView = getSlidesPerView();
    let totalSlides = Math.ceil(reviews.length / slidesPerView);
    let autoplayInterval;

    function renderDots() {
        dotsContainer.innerHTML = '';
        totalSlides = Math.ceil(reviews.length / getSlidesPerView());
        
        for (let i = 0; i < totalSlides; i++) {
            const dot = document.createElement('button');
            dot.className = `carousel-dot ${i === currentSlide ? 'active' : ''}`;
            dot.setAttribute('aria-label', `Ir para grupo ${i + 1}`);
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
        });
    }

    function goToSlide(index) {
        currentSlide = index;
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

    renderDots();
    updateCarousel();
    startAutoplay();

    window.addEventListener('resize', () => {
        const newSlidesPerView = getSlidesPerView();
        if (newSlidesPerView !== slidesPerView) {
            slidesPerView = newSlidesPerView;
            totalSlides = Math.ceil(reviews.length / slidesPerView);
            currentSlide = Math.min(currentSlide, totalSlides - 1);
            renderDots();
            updateCarousel();
        }
    });
}

/**
 * Footer Year - Auto-update
 */
function initCurrentYear() {
    const yearEl = document.getElementById('currentYear');
    if (yearEl) {
        yearEl.textContent = new Date().getFullYear();
    }
}

/* =========================
   HORÁRIOS + FERIADOS + STATUS
   ========================= */

// Feriados fixos portugueses (DD-MM)
const PT_HOLIDAYS_FIXED = [
    "01-01", "25-04", "01-05", "10-06",
    "15-08", "05-10", "01-11",
    "01-12", "08-12", "25-12"
];

// Calcular Páscoa (algoritmo de computus)
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

// Verificar se é feriado
function isHoliday(date) {
    const year = date.getFullYear();
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const dateStr = `${day}-${month}`;
    
    if (PT_HOLIDAYS_FIXED.includes(dateStr)) return true;
    
    const easter = getEasterDate(year);
    const goodFriday = new Date(easter);
    goodFriday.setDate(easter.getDate() - 2);
    const corpusChristi = new Date(easter);
    corpusChristi.setDate(easter.getDate() + 60);
    
    const mobileHolidays = [goodFriday, corpusChristi];
    
    for (const holiday of mobileHolidays) {
        if (date.getDate() === holiday.getDate() && 
            date.getMonth() === holiday.getMonth() && 
            date.getFullYear() === holiday.getFullYear()) {
            return true;
        }
    }
    
    return false;
}

// Determinar estado do botão
function getButtonState(now) {
    const hours = now.getHours();
    const minutes = now.getMinutes();
    const time = hours + minutes / 60;
    
    if (isHoliday(now)) {
        return { state: 'holiday', message: '🎉 Feriado · Horário especial' };
    }
    
    // 🟢 Aberto: 19:00 → 22:59
    if (time >= 19 && time < 23) {
        return { state: 'open', message: '🟢 Estamos abertos · Encomende agora' };
    }
    
    // 🟠 A encerrar: 23:00 → 23:30 (countdown sem segundos)
    if (time >= 23 && time < 23.5) {
        const minutesLeft = Math.ceil((23.5 - time) * 60);
        return { 
            state: 'warning', 
            message: `⏰ A encerrar · fecha em ${minutesLeft} min`
        };
    }
    
    // 🔴 Fechado: 23:30 → 18:59
    return { state: 'closed', message: '⛔ Fechado · Abrimos às 19:00' };
}

// Verificar se está no período não clicável (23:00 → 12:00)
function isNonClickablePeriod(now) {
    const hours = now.getHours();
    return hours >= 23 || hours < 12;
}

// Links WhatsApp
const WA_PHONE = '351243046828';
const WA_LINK_OPEN = `https://wa.me/${WA_PHONE}?text=${encodeURIComponent('Olá 👋 Gostava de fazer um pedido.')}`;
const WA_LINK_CLOSED = `https://wa.me/${WA_PHONE}?text=${encodeURIComponent('Olá 👋 Vi que estão fechados agora.\nPodem confirmar disponibilidade amanhã?')}`;

function updateSiteStatus() {
    try {
        const now = new Date();
        const { state, message } = getButtonState(now);
        const nonClickable = isNonClickablePeriod(now);
        
        const whatsappBtns = document.querySelectorAll('.btn-whatsapp, .sticky-whatsapp');
        const phoneBtns = document.querySelectorAll('.btn-phone');
        const statusEl = document.getElementById('openStatus');
        
        // Atualizar status element
        if (statusEl) {
            if (state === 'open') {
                statusEl.textContent = '🟢 Aberto agora';
                statusEl.className = 'open-status open';
            } else if (state === 'warning') {
                statusEl.textContent = '🟠 A encerrar';
                statusEl.className = 'open-status warning';
            } else if (state === 'holiday') {
                statusEl.textContent = '🎉 Feriado';
                statusEl.className = 'open-status holiday';
            } else {
                statusEl.textContent = '🔴 Fechado agora';
                statusEl.className = 'open-status closed';
            }
        }
        
        // Atualizar botões WhatsApp
        whatsappBtns.forEach(btn => {
            btn.classList.remove('open', 'warning', 'closed', 'holiday', 'non-clickable');
            btn.classList.add(state);
            
            // Atualizar texto (não para sticky)
            if (!btn.classList.contains('sticky-whatsapp')) {
                // Guardar ícone
                const iconEl = btn.querySelector('[data-lucide], svg');
                const iconHTML = iconEl ? iconEl.outerHTML : '<i data-lucide="message-circle"></i>';
                
                // Extrair texto sem emoji
                const textContent = message.replace(/^[🟢⏰⛔🎉]\s*/, '');
                
                // Atualizar conteúdo preservando ícone
                btn.innerHTML = iconHTML + ' ' + textContent;
                lucide.createIcons();
            }
            
            // Clicabilidade e href
            if (nonClickable) {
                btn.classList.add('non-clickable');
                btn.href = WA_LINK_CLOSED;
                btn.style.pointerEvents = 'none';
            } else {
                btn.href = state === 'closed' ? WA_LINK_CLOSED : WA_LINK_OPEN;
                btn.style.pointerEvents = 'auto';
            }
        });
        
        // Atualizar botões de telefone
        phoneBtns.forEach(btn => {
            btn.classList.remove('non-clickable');
            
            if (nonClickable) {
                btn.classList.add('non-clickable');
                btn.style.pointerEvents = 'none';
            } else {
                btn.style.pointerEvents = 'auto';
            }
        });
        
    } catch (e) {
        // Falha silenciosa
    }
}
