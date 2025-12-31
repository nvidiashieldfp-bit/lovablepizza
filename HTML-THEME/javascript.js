/**
 * Pizza Burguer Almeirim - JavaScript
 * ===================================
 * Website: pizzaburguer.pt
 */

// Wait for DOM to be ready
document.addEventListener('DOMContentLoaded', function() {
    // Initialize Lucide icons
    lucide.createIcons();
    
    // Initialize all components
    initHeroSlider();
    initScrollReveal();
    initMenu();
    initReviewsCarousel();
    initCurrentYear();
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

    // Auto-advance every 5 seconds
    function startAutoAdvance() {
        interval = setInterval(nextSlide, 5000);
    }

    // Click on indicators
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
 * Menu Data - Based on pizzaburguer.pt
 */
const menuData = {
    pizzas: {
        title: "Pizzas",
        emoji: "🍕",
        items: [
            { name: "Pizza Clássica", description: "Fiambre", prices: [{ size: "P", price: "6,00€" }, { size: "M", price: "9,00€" }, { size: "F", price: "13,00€" }], badge: "Popular" },
            { name: "Pizza Bacon", description: "Bacon crocante", prices: [{ size: "P", price: "6,50€" }, { size: "M", price: "9,50€" }, { size: "F", price: "13,50€" }], badge: "Popular" },
            { name: "Pizza Margarita", description: "Queijo mozzarella", prices: [{ size: "P", price: "5,50€" }, { size: "M", price: "8,50€" }, { size: "F", price: "12,50€" }] },
            { name: "Pizza Pepperoni", description: "Pepperoni picante", prices: [{ size: "P", price: "6,50€" }, { size: "M", price: "9,50€" }, { size: "F", price: "13,50€" }] },
            { name: "Pizza 4 Queijos", description: "Mozzarella, gorgonzola, parmesão, cheddar", prices: [{ size: "P", price: "7,00€" }, { size: "M", price: "10,00€" }, { size: "F", price: "14,00€" }] },
            { name: "Pizza Atum", description: "Atum, cebola, azeitonas", prices: [{ size: "P", price: "6,50€" }, { size: "M", price: "9,50€" }, { size: "F", price: "13,50€" }] },
            { name: "Pizza Vegetariana", description: "Pimentos, cogumelos, cebola, azeitonas", prices: [{ size: "P", price: "6,00€" }, { size: "M", price: "9,00€" }, { size: "F", price: "13,00€" }] },
            { name: "Pizza Especial", description: "Fiambre, cogumelos, bacon, ovo", prices: [{ size: "P", price: "7,50€" }, { size: "M", price: "10,50€" }, { size: "F", price: "14,50€" }], badge: "Especial" }
        ]
    },
    hamburgueres: {
        title: "Hambúrgueres",
        emoji: "🍔",
        items: [
            { name: "Hambúrguer Simples", description: "Hambúrguer, alface, tomate", price: "4,50€" },
            { name: "Hambúrguer c/ Queijo", description: "Hambúrguer, queijo cheddar", price: "5,00€", badge: "Popular" },
            { name: "Hambúrguer c/ Bacon", description: "Hambúrguer, bacon, queijo", price: "5,50€", badge: "Popular" },
            { name: "Hambúrguer Duplo", description: "2x Hambúrguer, queijo duplo", price: "7,00€" },
            { name: "Hambúrguer Especial", description: "Hambúrguer, ovo, bacon, queijo, cogumelos", price: "7,50€", badge: "Especial" },
            { name: "Hambúrguer Frango", description: "Peito de frango grelhado", price: "5,50€" }
        ]
    },
    massas: {
        title: "Massas",
        emoji: "🍝",
        items: [
            { name: "Esparguete Bolonhesa", description: "Massa com molho de carne", price: "6,50€" },
            { name: "Esparguete Carbonara", description: "Massa com natas, bacon e ovo", price: "7,00€", badge: "Popular" },
            { name: "Lasanha", description: "Lasanha tradicional com bechamel", price: "7,50€" },
            { name: "Massa c/ 2 Ingredientes", description: "Escolha 2 ingredientes", price: "6,00€" },
            { name: "Cannelloni", description: "Cannelloni recheado", price: "7,00€" }
        ]
    },
    extras: {
        title: "Extras & Bebidas",
        emoji: "🥤",
        items: [
            { name: "Batata Frita Pequena", price: "2,00€" },
            { name: "Batata Frita Grande", price: "3,00€" },
            { name: "Nuggets (6 unid.)", price: "3,50€" },
            { name: "Pepsi / Sumol / Frutea 0,33cl", price: "1,50€" },
            { name: "Água 0,50L", price: "1,00€" },
            { name: "Bongo 200ml", price: "1,00€" }
        ]
    },
    sobremesas: {
        title: "Sobremesas",
        emoji: "🍰",
        items: [
            { name: "Gelado (2 bolas)", price: "2,50€" },
            { name: "Brownie com Gelado", price: "4,00€", badge: "Popular" },
            { name: "Cheesecake", price: "3,50€" },
            { name: "Mousse de Chocolate", price: "3,00€" }
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

        // Show/hide size legend for pizzas
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
                                   item.badge === 'Especial' ? 'especial' : 'promo';
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

    // Initialize with first category
    renderMenuItems('pizzas');
}

/**
 * Reviews Data
 */
const reviews = [
    { text: "Pizzas excelentes! Muito saborosas e fresquinhas.", author: "Maria S.", rating: 5 },
    { text: "Os hambúrgueres são fantásticos, suculentos e bem servidos.", author: "João P.", rating: 5 },
    { text: "Menu infantil perfeito para as crianças. Adoraram o brinquedo!", author: "Ana R.", rating: 5 },
    { text: "Entrega super rápida e comida sempre quentinha. Top!", author: "Carlos M.", rating: 5 },
    { text: "A Pizza Clássica é a minha favorita. Sempre boa!", author: "Sofia L.", rating: 5 },
    { text: "Preços justos e qualidade excelente. Recomendo!", author: "Pedro F.", rating: 5 },
    { text: "As massas são deliciosas. A carbonara é divinal!", author: "Rita C.", rating: 5 },
    { text: "Descobri há pouco e já sou cliente fiel. Tudo muito bom!", author: "Miguel A.", rating: 5 },
    { text: "O Menu 1 é perfeito - pizza + bebida por 7€!", author: "Teresa B.", rating: 5 },
    { text: "Serviço impecável via WhatsApp. Muito prático!", author: "António G.", rating: 5 }
];

function initReviewsCarousel() {
    const track = document.getElementById('reviewsTrack');
    const dotsContainer = document.getElementById('carouselDots');
    
    // Render reviews
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

    // Reinitialize Lucide icons for stars
    lucide.createIcons();

    // Calculate slides based on screen size
    function getSlidesPerView() {
        if (window.innerWidth >= 768) return 3;
        if (window.innerWidth >= 640) return 2;
        return 1;
    }

    let currentSlide = 0;
    let slidesPerView = getSlidesPerView();
    let totalSlides = Math.ceil(reviews.length / slidesPerView);
    let autoplayInterval;

    // Render dots
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
        
        // Update dots
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

    // Initialize
    renderDots();
    updateCarousel();
    startAutoplay();

    // Handle resize
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
 * Footer Year
 */
function initCurrentYear() {
    const yearEl = document.getElementById('currentYear');
    if (yearEl) {
        yearEl.textContent = new Date().getFullYear();
    }
}
