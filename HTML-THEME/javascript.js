/**
 * Pizza Burger Almeirim - JavaScript
 * ===================================
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
 * Menu Data and Functionality
 */
const menuData = {
    pizzas: {
        title: "Pizzas",
        emoji: "🍕",
        items: [
            { name: "Margherita", description: "Molho de tomate, mozzarella, manjericão", prices: [{ size: "P", price: "6,50€" }, { size: "M", price: "9,50€" }, { size: "F", price: "13,50€" }] },
            { name: "Pepperoni", description: "Molho de tomate, mozzarella, pepperoni", prices: [{ size: "P", price: "7,50€" }, { size: "M", price: "10,50€" }, { size: "F", price: "14,50€" }] },
            { name: "4 Queijos", description: "Mozzarella, gorgonzola, parmesão, cheddar", prices: [{ size: "P", price: "8,00€" }, { size: "M", price: "11,00€" }, { size: "F", price: "15,00€" }] },
            { name: "Especial da Casa", description: "Fiambre, cogumelos, bacon, ovo, azeitonas", prices: [{ size: "P", price: "8,50€" }, { size: "M", price: "12,00€" }, { size: "F", price: "16,00€" }], badge: "Popular" },
            { name: "Atum", description: "Molho de tomate, mozzarella, atum, cebola", prices: [{ size: "P", price: "7,50€" }, { size: "M", price: "10,50€" }, { size: "F", price: "14,50€" }] },
            { name: "Vegetariana", description: "Pimentos, cogumelos, cebola, azeitonas, tomate", prices: [{ size: "P", price: "7,00€" }, { size: "M", price: "10,00€" }, { size: "F", price: "14,00€" }] },
            { name: "Frango BBQ", description: "Frango, bacon, cebola caramelizada, molho BBQ", prices: [{ size: "P", price: "8,50€" }, { size: "M", price: "12,00€" }, { size: "F", price: "16,00€" }] },
            { name: "Carbonara", description: "Natas, bacon, cogumelos, cebola", prices: [{ size: "P", price: "8,00€" }, { size: "M", price: "11,50€" }, { size: "F", price: "15,50€" }] }
        ]
    },
    hamburgueres: {
        title: "Hambúrgueres",
        emoji: "🍔",
        items: [
            { name: "Clássico", description: "Hambúrguer 150g, alface, tomate, cebola, pickles", price: "6,50€" },
            { name: "Cheese Burguer", description: "Hambúrguer 150g, queijo cheddar, alface, tomate", price: "7,00€", badge: "Popular" },
            { name: "Bacon Burguer", description: "Hambúrguer 150g, bacon crocante, queijo, cebola caramelizada", price: "8,00€", badge: "Popular" },
            { name: "Duplo Cheese", description: "2x Hambúrguer 150g, queijo cheddar duplo, molho especial", price: "10,50€", badge: "Popular" },
            { name: "Duplo Bacon", description: "2x Hambúrguer 150g, bacon duplo, queijo, cebola frita", price: "11,50€" },
            { name: "Especial da Casa", description: "Hambúrguer 200g, ovo, bacon, queijo, cogumelos", price: "12,00€", badge: "Novo" },
            { name: "BBQ Burguer", description: "Hambúrguer 150g, cebola roxa, queijo, molho BBQ", price: "8,50€" },
            { name: "Frango Grelhado", description: "Peito de frango grelhado, alface, tomate, maionese", price: "7,50€" }
        ]
    },
    kebab: {
        title: "Kebab & Wraps",
        emoji: "🌯",
        items: [
            { name: "Kebab no Pão", description: "Carne de vitela, salada, molho", price: "5,50€" },
            { name: "Kebab no Prato", description: "Carne de vitela, arroz, batata frita, salada", price: "8,50€", badge: "Popular" },
            { name: "Durum Kebab", description: "Wrap com carne, salada, molho picante", price: "6,50€" },
            { name: "Kebab Menu", description: "Kebab + batata frita + bebida", price: "8,00€", badge: "Promo" },
            { name: "Falafel Wrap", description: "Falafel, húmus, salada, molho tahini", price: "6,00€", badge: "Novo" },
            { name: "Mix Kebab", description: "Carne de vitela e frango, salada especial", price: "7,50€" }
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
    massas: {
        title: "Massas & Saladas",
        emoji: "🍝",
        items: [
            { name: "Esparguete Bolonhesa", description: "Massa com molho de carne", price: "7,50€" },
            { name: "Esparguete Carbonara", description: "Massa com natas, bacon e ovo", price: "8,00€", badge: "Popular" },
            { name: "Lasanha da Casa", description: "Lasanha tradicional com bechamel", price: "8,50€" },
            { name: "Salada Caesar", description: "Alface, frango grelhado, croutons, parmesão", price: "7,00€" },
            { name: "Salada Mista", description: "Alface, tomate, cebola, milho, cenoura", price: "4,50€" }
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

    // Initialize with first category
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
