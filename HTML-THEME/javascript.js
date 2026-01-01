/**
 * Pizza Burguer Almeirim - JavaScript
 * ===================================
 * Website: pizzaburguer.pt
 * 
 * REGRAS ABSOLUTAS:
 * - NÃO alterar estrutura HTML
 * - NÃO criar ou remover elementos (exceto carrinho)
 * - Só alterar textContent, classList, href
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
    initBusinessHours();
    initCart();
    
    // Update business hours every second for countdown
    setInterval(updateWhatsAppButtons, 1000);
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

            // Add to cart button
            const addBtnHTML = `<button class="btn-add-cart" data-name="${item.name}" data-price="${item.price || item.prices[1].price}" data-category="${category}">+</button>`;

            itemEl.innerHTML = `
                <div class="menu-item-content">
                    <div class="menu-item-header">
                        <span class="menu-item-name">${item.name}</span>
                        ${badgeHTML}
                    </div>
                    ${item.description ? `<p class="menu-item-description">${item.description}</p>` : ''}
                </div>
                <div class="menu-item-actions">
                    ${priceHTML}
                    ${addBtnHTML}
                </div>
            `;

            menuItemsContainer.appendChild(itemEl);
        });

        // Re-attach cart listeners
        attachCartListeners();
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
 * Footer Year - Auto update
 */
function initCurrentYear() {
    const yearEl = document.getElementById('currentYear');
    if (yearEl) {
        yearEl.textContent = new Date().getFullYear();
    }
}

/**
 * ========================================
 * Business Hours & WhatsApp Button Logic
 * ========================================
 * HORÁRIOS DEFINITIVOS:
 * 🟢 Aberto: 19:00 → 22:59
 * 🟠 A encerrar: 23:00 → 23:30
 * 🔴 Fechado: 23:30 → 18:59
 * 
 * Botões SEMPRE clicáveis, apenas mudam texto/cor
 */

// Feriados portugueses fixos (dia-mês)
const feriadosPT = [
    "01-01", // Ano Novo
    "25-04", // Dia da Liberdade
    "01-05", // Dia do Trabalhador
    "10-06", // Dia de Portugal
    "15-08", // Assunção
    "05-10", // República
    "01-11", // Todos os Santos
    "01-12", // Restauração
    "08-12", // Imaculada Conceição
    "25-12"  // Natal
];

// Calcular Páscoa (Computus)
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

// Verificar se hoje é feriado
function isHoliday() {
    const now = new Date();
    const day = String(now.getDate()).padStart(2, '0');
    const month = String(now.getMonth() + 1).padStart(2, '0');
    const dmStr = `${day}-${month}`;
    
    // Feriados fixos
    if (feriadosPT.includes(dmStr)) return true;
    
    // Feriados móveis (Páscoa, Sexta-Santa, Corpo de Deus)
    const year = now.getFullYear();
    const easter = getEasterDate(year);
    
    // Sexta-feira Santa (2 dias antes)
    const goodFriday = new Date(easter);
    goodFriday.setDate(easter.getDate() - 2);
    
    // Corpo de Deus (60 dias depois)
    const corpusChristi = new Date(easter);
    corpusChristi.setDate(easter.getDate() + 60);
    
    const today = now.toDateString();
    if (easter.toDateString() === today) return true;
    if (goodFriday.toDateString() === today) return true;
    if (corpusChristi.toDateString() === today) return true;
    
    return false;
}

/**
 * Obter estado do horário com countdown
 */
function getBusinessState() {
    const now = new Date();
    const hours = now.getHours();
    const minutes = now.getMinutes();
    const seconds = now.getSeconds();
    const totalMinutes = hours * 60 + minutes;
    
    // Limites em minutos desde meia-noite
    const OPEN_START = 19 * 60;       // 19:00
    const WARNING_START = 23 * 60;    // 23:00
    const CLOSED_START = 23 * 60 + 30; // 23:30
    
    // Estado base
    let state = 'closed';
    let statusMessage = '⛔ Fechado · Abrimos às 19:00';
    let cssClass = 'closed';
    let countdownText = '';
    
    // Verificar feriado primeiro
    if (isHoliday()) {
        return {
            state: 'holiday',
            statusMessage: '🎉 Feriado · Horário especial',
            cssClass: 'warning',
            countdownText: '',
            closedMessage: 'Olá 👋 Vi que hoje é feriado. Podem confirmar o horário?'
        };
    }
    
    if (totalMinutes >= OPEN_START && totalMinutes < WARNING_START) {
        // 🟢 ABERTO (19:00-22:59)
        state = 'open';
        statusMessage = '🟢 Estamos abertos · Encomende agora';
        cssClass = 'open';
    } else if (totalMinutes >= WARNING_START && totalMinutes < CLOSED_START) {
        // 🟠 A ENCERRAR (23:00-23:30) - Countdown
        state = 'warning';
        cssClass = 'warning';
        
        // Calcular tempo restante até 23:30
        const remainingMinutes = CLOSED_START - totalMinutes;
        const remainingSeconds = 60 - seconds;
        const displayMinutes = remainingSeconds === 60 ? remainingMinutes : remainingMinutes - 1;
        const displaySeconds = remainingSeconds === 60 ? 0 : remainingSeconds;
        
        if (displayMinutes > 0) {
            countdownText = `${displayMinutes}m ${String(displaySeconds).padStart(2, '0')}s`;
        } else {
            countdownText = `${displaySeconds}s`;
        }
        
        statusMessage = `⏰ A encerrar · fecha em ${countdownText}`;
    } else {
        // 🔴 FECHADO (23:30-18:59)
        state = 'closed';
        cssClass = 'closed';
        statusMessage = '⛔ Fechado · Abrimos às 19:00';
    }
    
    return {
        state,
        statusMessage,
        cssClass,
        countdownText,
        closedMessage: 'Olá 👋 Vi que estão fechados agora. Podem confirmar disponibilidade amanhã?'
    };
}

/**
 * Atualizar botões WhatsApp
 * - Apenas altera textContent, classList, href
 * - NUNCA bloqueia o botão
 */
function updateWhatsAppButtons() {
    const businessState = getBusinessState();
    const buttons = document.querySelectorAll('.btn-whatsapp');
    const stickyButton = document.querySelector('.sticky-whatsapp');
    const phoneButtons = document.querySelectorAll('.btn-phone');
    
    // WhatsApp URL base
    const baseUrl = 'https://wa.me/351243592058';
    let whatsappMessage = 'Olá 👋 Gostava de fazer um pedido.';
    
    // Se fechado, usar mensagem especial
    if (businessState.state === 'closed') {
        whatsappMessage = businessState.closedMessage;
    } else if (businessState.state === 'holiday') {
        whatsappMessage = businessState.closedMessage;
    }
    
    const whatsappUrl = `${baseUrl}?text=${encodeURIComponent(whatsappMessage)}`;
    
    buttons.forEach(btn => {
        // Atualizar href
        btn.href = whatsappUrl;
        
        // Atualizar texto (apenas span com .whatsapp-status)
        const textEl = btn.querySelector('.whatsapp-status');
        if (textEl) {
            textEl.textContent = businessState.statusMessage;
        }
        
        // Atualizar classes
        btn.classList.remove('open', 'warning', 'closed');
        btn.classList.add(businessState.cssClass);
    });
    
    // Botão sticky
    if (stickyButton) {
        stickyButton.href = whatsappUrl;
        stickyButton.classList.remove('open', 'warning', 'closed');
        stickyButton.classList.add(businessState.cssClass);
    }
    
    // Botões de telefone - mesmas classes
    phoneButtons.forEach(btn => {
        btn.classList.remove('open', 'warning', 'closed');
        btn.classList.add(businessState.cssClass);
    });
}

function initBusinessHours() {
    updateWhatsAppButtons();
}

/**
 * ========================================
 * Shopping Cart System
 * ========================================
 * Permite adicionar/remover itens antes de enviar para WhatsApp
 */

let cart = [];

function initCart() {
    // Create cart UI (only element we create - modal overlay)
    createCartUI();
    attachCartListeners();
}

function createCartUI() {
    // Cart modal - injected once
    const cartModal = document.createElement('div');
    cartModal.id = 'cartModal';
    cartModal.className = 'cart-modal';
    cartModal.innerHTML = `
        <div class="cart-modal-content">
            <div class="cart-header">
                <h3>🛒 O seu pedido</h3>
                <button class="cart-close" id="cartClose">✕</button>
            </div>
            <div class="cart-items" id="cartItems">
                <p class="cart-empty">O carrinho está vazio</p>
            </div>
            <div class="cart-footer">
                <div class="cart-total">
                    <span>Total:</span>
                    <span id="cartTotal">0,00€</span>
                </div>
                <button class="btn btn-whatsapp btn-lg btn-full" id="cartSendWhatsapp">
                    <i data-lucide="message-circle"></i>
                    Enviar pedido via WhatsApp
                </button>
                <button class="btn btn-menu btn-lg btn-full" id="cartClear">
                    Limpar carrinho
                </button>
            </div>
        </div>
    `;
    document.body.appendChild(cartModal);
    
    // Cart floating button
    const cartFloat = document.createElement('button');
    cartFloat.id = 'cartFloat';
    cartFloat.className = 'cart-float';
    cartFloat.innerHTML = `
        <i data-lucide="shopping-cart"></i>
        <span class="cart-count" id="cartCount">0</span>
    `;
    document.body.appendChild(cartFloat);
    
    // Reinitialize icons
    lucide.createIcons();
    
    // Event listeners
    cartFloat.addEventListener('click', toggleCart);
    document.getElementById('cartClose').addEventListener('click', toggleCart);
    document.getElementById('cartClear').addEventListener('click', clearCart);
    document.getElementById('cartSendWhatsapp').addEventListener('click', sendToWhatsApp);
    
    // Close on overlay click
    cartModal.addEventListener('click', (e) => {
        if (e.target === cartModal) toggleCart();
    });
}

function attachCartListeners() {
    document.querySelectorAll('.btn-add-cart').forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.preventDefault();
            const name = btn.dataset.name;
            const price = btn.dataset.price;
            addToCart(name, price);
        });
    });
}

function addToCart(name, price) {
    const existing = cart.find(item => item.name === name);
    if (existing) {
        existing.qty++;
    } else {
        cart.push({ name, price, qty: 1 });
    }
    updateCartUI();
    showCartNotification(`${name} adicionado!`);
}

function removeFromCart(index) {
    cart.splice(index, 1);
    updateCartUI();
}

function updateQty(index, delta) {
    cart[index].qty += delta;
    if (cart[index].qty <= 0) {
        removeFromCart(index);
    } else {
        updateCartUI();
    }
}

function clearCart() {
    cart = [];
    updateCartUI();
}

function updateCartUI() {
    const cartItems = document.getElementById('cartItems');
    const cartTotal = document.getElementById('cartTotal');
    const cartCount = document.getElementById('cartCount');
    const cartFloat = document.getElementById('cartFloat');
    
    const totalItems = cart.reduce((sum, item) => sum + item.qty, 0);
    cartCount.textContent = totalItems;
    
    // Show/hide cart button
    if (totalItems > 0) {
        cartFloat.classList.add('visible');
    } else {
        cartFloat.classList.remove('visible');
    }
    
    if (cart.length === 0) {
        cartItems.innerHTML = '<p class="cart-empty">O carrinho está vazio</p>';
        cartTotal.textContent = '0,00€';
        return;
    }
    
    let total = 0;
    cartItems.innerHTML = cart.map((item, index) => {
        const priceNum = parseFloat(item.price.replace(',', '.').replace('€', ''));
        const itemTotal = priceNum * item.qty;
        total += itemTotal;
        
        return `
            <div class="cart-item">
                <div class="cart-item-info">
                    <span class="cart-item-name">${item.name}</span>
                    <span class="cart-item-price">${item.price}</span>
                </div>
                <div class="cart-item-controls">
                    <button class="cart-qty-btn" onclick="updateQty(${index}, -1)">−</button>
                    <span class="cart-qty">${item.qty}</span>
                    <button class="cart-qty-btn" onclick="updateQty(${index}, 1)">+</button>
                    <button class="cart-remove" onclick="removeFromCart(${index})">🗑️</button>
                </div>
            </div>
        `;
    }).join('');
    
    cartTotal.textContent = total.toFixed(2).replace('.', ',') + '€';
}

function toggleCart() {
    const modal = document.getElementById('cartModal');
    modal.classList.toggle('visible');
}

function showCartNotification(message) {
    // Simple visual feedback
    const btn = document.getElementById('cartFloat');
    btn.classList.add('pulse');
    setTimeout(() => btn.classList.remove('pulse'), 300);
}

function sendToWhatsApp() {
    if (cart.length === 0) return;
    
    let message = 'Olá 👋 Gostava de fazer o seguinte pedido:\n\n';
    
    cart.forEach(item => {
        message += `• ${item.qty}x ${item.name} (${item.price})\n`;
    });
    
    const total = cart.reduce((sum, item) => {
        const priceNum = parseFloat(item.price.replace(',', '.').replace('€', ''));
        return sum + (priceNum * item.qty);
    }, 0);
    
    message += `\n💰 Total: ${total.toFixed(2).replace('.', ',')}€`;
    message += '\n\nObrigado!';
    
    const whatsappUrl = `https://wa.me/351243592058?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
    
    // Clear cart after sending
    clearCart();
    toggleCart();
}

// Expose functions globally for onclick
window.updateQty = updateQty;
window.removeFromCart = removeFromCart;
