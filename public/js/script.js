// ============================================
// Minang Karya Baru - Rumah Makan Padang
// JavaScript Functionality
// ============================================

// ========== MENU DATA ========== 
import { getProducts } from "./api.js";

let menuData = [];

console.log(menuData);

// ========== STATE MANAGEMENT ==========
let cart = JSON.parse(localStorage.getItem('bravaBellyCart')) || [];
let currentCategory = 'all';
let currentTestimonial = 0;
let isScrolling = false;

// ========== INITIALIZE APP ==========
document.addEventListener('DOMContentLoaded', () => {
    console.log('%c🍽️ Karya Minang Baru ', 'color: #ff6b35; font-size: 28px; font-weight: bold; text-shadow: 2px 2px 4px rgba(0,0,0,0.3);');
    console.log('%c✨ Selamat datang di Rumah Makan Padang Authentic!', 'color: #f7931e; font-size: 16px; font-weight: bold;');
    console.log('%c🛒 Website by Karya Minang Baru Team', 'color: #b8b8c7; font-size: 12px;');
    
    initializeApp();
    initializeMenu();
    initializeNavigation();
    initializeCart();
    initializeTestimonials();
    initializeForms();
    initializeScrollEffects();
    initializeAnimations();
    initializeBackToTop();
    
});


async function initializeApp() {

    console.log('%c🍽️ Karya Minang Baru ', 'color: #D62828; font-size: 28px; font-weight: bold;');
    console.log('%c✨ Selamat datang di Rumah Makan Padang!', 'color: #F4B400; font-size: 16px;');

    menuData = await getProducts();

    console.log(menuData);

    initializeMenu();
    initializeNavigation();
    initializeCart();
    initializeTestimonials();
    initializeForms();
    initializeScrollEffects();
    initializeAnimations();
    initializeBackToTop();
}





// ========== MENU FUNCTIONALITY ==========
function initializeMenu() {
    renderMenu(menuData);
    
    const filterButtons = document.querySelectorAll('.filter-btn');
    filterButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            // Update active state
            filterButtons.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            
            // Filter menu
            const category = btn.dataset.category;
            currentCategory = category;
            
            const filteredData = category === 'all' 
                ? menuData 
                : menuData.filter(item => item.category === category);
            
            // Add animation
            const menuGrid = document.getElementById('menuGrid');
            menuGrid.style.opacity = '0';
            menuGrid.style.transform = 'translateY(20px)';
            
            setTimeout(() => {
                renderMenu(filteredData);
                menuGrid.style.opacity = '1';
                menuGrid.style.transform = 'translateY(0)';
            }, 300);
            
            // Show notification
            const categoryNames = {
                'all': 'Semua Menu',
                'makanan': 'Makanan',
                'minuman': 'Minuman',
                'dessert': 'Dessert'
            };
        });
    });
}

function renderMenu(items) {
    const menuGrid = document.getElementById('menuGrid');
    menuGrid.innerHTML = '';
    
    if (items.length === 0) {
        menuGrid.innerHTML = `
            <div style="grid-column: 1/-1; text-align: center; padding: 80px 20px; color: var(--text-secondary);">
                <i class="fas fa-search" style="font-size: 48px; margin-bottom: 20px; opacity: 0.5;"></i>
                <p style="font-size: 18px;">Tidak ada menu yang ditemukan</p>
            </div>
        `;
        return;
    }
    
    items.forEach((item, index) => {
        const menuCard = createMenuCard(item);
        menuCard.style.animationDelay = `${index * 0.05}s`;
        menuGrid.appendChild(menuCard);
    });
}

function createMenuCard(item) {
    console.log("Create Card:", item);
    const card = document.createElement('div');
    card.className = 'menu-card fade-in';

    // Tentukan harga & unit
    let priceHTML = '';
    if (item.variants && item.variants.length > 0) {
        // Kalau ada variants, tampilkan semua
        priceHTML = item.variants.map(v => 
            `<span class="menu-price">Rp ${formatPrice(v.price)}</span><span class="menu-unit">/${v.unit}</span>`
        ).join(' | ');
    } else {
        // Kalau cuma satu harga/unit
        priceHTML = `<span class="menu-price">Rp ${formatPrice(item.price)}</span>${item.unit ? `<span class="menu-unit">/${item.unit}</span>` : ''}`;
    }

    card.innerHTML = `
        <div class="menu-image">
            <img src="${item.image}" alt="${item.name}" loading="lazy">
            <span class="menu-badge">${item.badge || ''}</span>
        </div>
        <div class="menu-content">
            <div class="menu-header">
                <h3 class="menu-title">${item.name}</h3>
                <div class="menu-price-wrapper">
                    ${priceHTML}
                </div>
            </div>
            <p class="menu-description">${item.description}</p>
            <div class="menu-footer">
                <div class="rating">
                    ${generateStars(item.rating)}
                    <span>(${item.rating})</span>
                </div>
                <button class="add-to-cart" data-id="${item.id}">
                    <i class="fas fa-cart-plus"></i> Tambah
                </button>
            </div>
        </div>
    `;

    const addButton = card.querySelector('.add-to-cart');
    addButton.addEventListener('click', (e) => {
        e.stopPropagation();
        addToCart(item);

        // Animasi tombol
        addButton.style.transform = 'scale(0.9)';
        setTimeout(() => {
            addButton.style.transform = 'scale(1)';
        }, 200);
    });

    card.addEventListener('click', () => {
        showProductDetail(item);
    });

    return card;
}


function generateStars(rating) {
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;
    let stars = '';
    
    for (let i = 0; i < fullStars; i++) {
        stars += '<i class="fas fa-star"></i>';
    }
    
    if (hasHalfStar) {
        stars += '<i class="fas fa-star-half-alt"></i>';
    }
    
    const emptyStars = 5 - Math.ceil(rating);
    for (let i = 0; i < emptyStars; i++) {
        stars += '<i class="far fa-star"></i>';
    }
    
    return stars;
}

function formatPrice(price) {
    return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
}

function showProductDetail(item) {
    // Simple alert for now, can be expanded to modal
    const message = `
        <strong>${item.name}</strong><br>
        <small>${item.description}</small><br>
        <strong style="color: var(--primary-color);">Rp ${formatPrice(item.price)}</strong>
    `;
    showNotification(message, 'info', 5000);
}

// ========== CART FUNCTIONALITY ==========
function initializeCart() {
    const cartBtn = document.getElementById('cartBtn');
    const cartModal = document.getElementById('cartModal');
    const closeCart = document.getElementById('closeCart');
    const checkoutBtn = document.getElementById('checkoutBtn');
    
    cartBtn.addEventListener('click', () => {
        cartModal.classList.add('active');
        document.body.style.overflow = 'hidden';
    });
    
    closeCart.addEventListener('click', () => {
        closeCartModal();
    });
    
    cartModal.addEventListener('click', (e) => {
        if (e.target === cartModal) {
            closeCartModal();
        }
    });
    
    checkoutBtn.addEventListener('click', checkout);
    
    // Keyboard shortcut ESC to close
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && cartModal.classList.contains('active')) {
            closeCartModal();
        }
    });
    
    updateCartUI();
}

function closeCartModal() {
    const cartModal = document.getElementById('cartModal');
    cartModal.classList.remove('active');
    document.body.style.overflow = 'auto';
}

function addToCart(item) {
    const existingItem = cart.find(cartItem => cartItem.id === item.id);
    
    if (existingItem) {
        existingItem.quantity++;
        showNotification(`${item.name} ditambahkan! (${existingItem.quantity}x)`, 'success');
    } else {
        cart.push({ ...item, quantity: 1 });
        showNotification(`${item.name} ditambahkan ke keranjang!`, 'success');
    }
    
    updateCartUI();
    saveCart();
    
    // Animate cart badge
    const cartBadge = document.getElementById('cartBadge');
    cartBadge.style.animation = 'none';
    setTimeout(() => {
        cartBadge.style.animation = 'pulse 2s infinite';
    }, 10);
}

function removeFromCart(itemId) {
    const item = cart.find(cartItem => cartItem.id === itemId);
    const itemName = item ? item.name : 'Item';
    
    cart = cart.filter(cartItem => cartItem.id !== itemId);
    updateCartUI();
    saveCart();
    
    showNotification(`${itemName} dihapus dari keranjang`, 'info');
}

function updateQuantity(itemId, change) {
    const item = cart.find(cartItem => cartItem.id === itemId);
    
    if (item) {
        item.quantity += change;
        
        if (item.quantity <= 0) {
            removeFromCart(itemId);
        } else {
            updateCartUI();
            saveCart();
        }
    }
}

function updateCartUI() {
    const cartBadge = document.getElementById('cartBadge');
    const cartItems = document.getElementById('cartItems');
    const cartTotal = document.getElementById('cartTotal');
    
    const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
    const totalPrice = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    
    cartBadge.textContent = totalItems;
    cartTotal.textContent = `Rp ${formatPrice(totalPrice)}`;
    
    if (cart.length === 0) {
        cartItems.innerHTML = `
            <div class="empty-cart">
                <i class="fas fa-shopping-cart" style="font-size: 64px; opacity: 0.3; margin-bottom: 20px;"></i>
                <p style="font-size: 18px; margin-bottom: 10px;">Keranjang Anda masih kosong</p>
                <p style="font-size: 14px; opacity: 0.7;">Yuk, mulai belanja sekarang!</p>
            </div>
        `;
    } else {
        cartItems.innerHTML = cart.map(item => `
            <div class="cart-item" data-id="${item.id}">
                <div class="cart-item-image">
                    <img src="${item.image}" alt="${item.name}">
                </div>
                <div class="cart-item-info">
                    <h4 class="cart-item-title">${item.name}</h4>
                    <p class="cart-item-price">Rp ${formatPrice(item.price)}</p>
                    <div class="cart-item-controls">
                        <button class="qty-btn" onclick="updateQuantity(${item.id}, -1)">
                            <i class="fas fa-minus"></i>
                        </button>
                        <span class="cart-item-qty">${item.quantity}</span>
                        <button class="qty-btn" onclick="updateQuantity(${item.id}, 1)">
                            <i class="fas fa-plus"></i>
                        </button>
                        <i class="fas fa-trash remove-btn" onclick="removeFromCart(${item.id})" title="Hapus item"></i>
                    </div>
                </div>
            </div>
        `).join('');
    }
}

function saveCart() {
    localStorage.setItem('bravaBellyCart', JSON.stringify(cart));
}

function checkout() {
    if (cart.length === 0) {
        showNotification('Keranjang Anda masih kosong!', 'error');
        return;
    }
    
    const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
    const items = cart.map(item => `${item.name} (${item.quantity}x)`).join(', ');
    
    // Create WhatsApp message
    const phoneNumber = '6281234567890'; // Ganti dengan nomor WhatsApp toko
    const message = `Halo Karya Minang Baru! 👋\n\nSaya ingin memesan:\n\n${cart.map(item => 
        `• ${item.name}\n  ${item.quantity}x @ Rp ${formatPrice(item.price)} = Rp ${formatPrice(item.price * item.quantity)}`
    ).join('\n\n')}\n\n*Total: Rp ${formatPrice(total)}* (${totalItems} item)\n\nTerima kasih! 🙏`;
    
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
    
    // Show confirmation
    showNotification(
        `Checkout berhasil!<br><br>Total: <strong>Rp ${formatPrice(total)}</strong><br>Item: ${totalItems} produk<br><br>Anda akan diarahkan ke WhatsApp...`, 
        'success', 
        3000
    );
    
    // Redirect to WhatsApp after delay
    setTimeout(() => {
        window.open(whatsappUrl, '_blank');
        
        // Clear cart
        cart = [];
        updateCartUI();
        saveCart();
        closeCartModal();
    }, 3000);
}

// ========== NAVIGATION ==========
function initializeNavigation() {
    const navbar = document.getElementById('navbar');
    const hamburger = document.getElementById('hamburger');
    const navMenu = document.getElementById('navMenu');
    const navLinks = document.querySelectorAll('.nav-link');
    
    // Scroll effect dengan auto-show di section
    let lastScroll = 0;
    let ticking = false;
    
    window.addEventListener('scroll', () => {
        if (!ticking) {
            window.requestAnimationFrame(() => {
                const currentScroll = window.pageYOffset;
                
                // Add scrolled class
                if (currentScroll > 50) {
                    navbar.classList.add('scrolled');
                } else {
                    navbar.classList.remove('scrolled');
                }
                
                // Check if near any section
                let nearSection = false;
                const sections = document.querySelectorAll('section[id]');
                
                sections.forEach(section => {
                    const sectionTop = section.offsetTop;
                    const sectionBottom = sectionTop + section.offsetHeight;
                    const threshold = 150; // Jarak untuk trigger navbar muncul
                    
                    // Jika scroll mendekati top section (dalam range threshold)
                    if (currentScroll >= (sectionTop - threshold) && 
                        currentScroll <= (sectionTop + threshold)) {
                        nearSection = true;
                    }
                });
                
                // Logic: Hide on scroll down, Show on scroll up OR near section
                if (currentScroll > lastScroll && currentScroll > 500 && !nearSection) {
                    // Scrolling DOWN & not near section = HIDE
                    navbar.style.transform = 'translateY(-100%)';
                } else {
                    // Scrolling UP OR near section = SHOW
                    navbar.style.transform = 'translateY(0)';
                }
                
                lastScroll = currentScroll;
                ticking = false;
            });
            
            ticking = true;
        }
    });
    
    // Function to close menu
    function closeMenu() {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
        document.body.style.overflow = 'auto';
        document.body.style.position = 'static';
    }
    
    // Function to open menu
    function openMenu() {
        hamburger.classList.add('active');
        navMenu.classList.add('active');
        document.body.style.overflow = 'hidden';
        document.body.style.position = 'fixed';
        document.body.style.width = '100%';
    }
    
    // Mobile menu toggle
    hamburger.addEventListener('click', (e) => {
        e.stopPropagation();
        
        if (navMenu.classList.contains('active')) {
            closeMenu();
        } else {
            openMenu();
        }
    });
    
    // Close menu when clicking outside
    document.addEventListener('click', (e) => {
        if (navMenu.classList.contains('active') && 
            !navMenu.contains(e.target) && 
            !hamburger.contains(e.target)) {
            closeMenu();
        }
    });
    
    // Active link on click
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            // Update active state
            navLinks.forEach(l => l.classList.remove('active'));
            link.classList.add('active');
            
            // Show navbar when link clicked
            navbar.style.transform = 'translateY(0)';
            
            // Close mobile menu
            closeMenu();
        });
    });
    
    // Smooth scroll
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            
            if (target) {
                const offsetTop = target.offsetTop - 80;
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // Active section highlighting on scroll
    const sections = document.querySelectorAll('section[id]');
    window.addEventListener('scroll', () => {
        const scrollY = window.pageYOffset;
        
        sections.forEach(section => {
            const sectionHeight = section.offsetHeight;
            const sectionTop = section.offsetTop - 150;
            const sectionId = section.getAttribute('id');
            
            if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
                navLinks.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === `#${sectionId}`) {
                        link.classList.add('active');
                    }
                });
            }
        });
    });
    
    // Scroll indicator click
    const scrollIndicator = document.querySelector('.scroll-indicator');
    if (scrollIndicator) {
        scrollIndicator.addEventListener('click', () => {
            document.querySelector('#about').scrollIntoView({ behavior: 'smooth' });
        });
    }
    
    // Close menu on ESC key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && navMenu.classList.contains('active')) {
            closeMenu();
        }
    });
}

// ========== TESTIMONIALS SLIDER ==========

let testimonialCards, dots;
function showTestimonial(index) {
    testimonialCards.forEach(card => card.classList.remove('active'));
    dots.forEach(dot => dot.classList.remove('active'));

    testimonialCards[index].classList.add('active');
    dots[index].classList.add('active');
    currentTestimonial = index;
}

function initializeTestimonials() {
    testimonialCards = document.querySelectorAll('.testimonial-card');
    const sliderDots = document.getElementById('sliderDots');

    dots = [];
    testimonialCards.forEach((_, index) => {
        const dot = document.createElement('span');
        dot.className = 'dot';
        if (index === 0) dot.classList.add('active');
        dot.addEventListener('click', () => showTestimonial(index));
        sliderDots.appendChild(dot);
        dots.push(dot);
    });

    // Tampilkan testimonial pertama langsung
    showTestimonial(0);

    // Auto slide
    setInterval(() => {
        currentTestimonial = (currentTestimonial + 1) % testimonialCards.length;
        showTestimonial(currentTestimonial);
    }, 5000);
    
    // Swipe support for mobile
    let touchStartX = 0;
    let touchEndX = 0;
    
    const slider = document.getElementById('testimonialsSlider');
    slider.addEventListener('touchstart', e => {
        touchStartX = e.changedTouches[0].screenX;
    });
    
    slider.addEventListener('touchend', e => {
        touchEndX = e.changedTouches[0].screenX;
        handleSwipe();
    });
    
    function handleSwipe() {
        if (touchEndX < touchStartX - 50) {
            // Swipe left - next
            currentTestimonial = (currentTestimonial + 1) % testimonialCards.length;
            showTestimonial(currentTestimonial);
        }
        if (touchEndX > touchStartX + 50) {
            // Swipe right - previous
            currentTestimonial = (currentTestimonial - 1 + testimonialCards.length) % testimonialCards.length;
            showTestimonial(currentTestimonial);
        }
    }
}

// ========== FORMS ==========
function initializeForms() {
    const contactForm = document.getElementById('contactForm');
    
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        const formData = new FormData(contactForm);
        const name = contactForm.querySelector('input[type="text"]').value;
        const email = contactForm.querySelector('input[type="email"]').value;
        const phone = contactForm.querySelector('input[type="tel"]').value;
        const message = contactForm.querySelector('textarea').value;
        
        // Create WhatsApp message
        const phoneNumber = '6281234567890'; // Ganti dengan nomor WhatsApp toko
        const whatsappMessage = `Halo Karya Minang Baru! 👋\n\n*Pesan dari Website:*\n\nNama: ${name}\nEmail: ${email}\nTelepon: ${phone}\n\nPesan:\n${message}`;
        const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(whatsappMessage)}`;
        
        showNotification('Pesan Anda telah terkirim! Kami akan segera menghubungi Anda.<br>Anda akan diarahkan ke WhatsApp...', 'success', 3000);
        
        setTimeout(() => {
            window.open(whatsappUrl, '_blank');
            contactForm.reset();
        }, 3000);
    });
    
    const newsletterForms = document.querySelectorAll('.newsletter-form');
    newsletterForms.forEach(form => {
        form.addEventListener('submit', (e) => {
            e.preventDefault();
            const email = form.querySelector('input[type="email"]').value;
            
            showNotification(`Terima kasih telah berlangganan!<br>Email <strong>${email}</strong> telah terdaftar untuk newsletter kami.`, 'success');
            form.reset();
        });
    });
}

// ========== SCROLL EFFECTS ==========
function initializeScrollEffects() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -100px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('slide-up');
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);
    
    // Observe elements
    document.querySelectorAll('.about-card, .testimonial-card, .contact-item').forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'all 0.6s ease';
        observer.observe(el);
    });
    
    // Parallax effect for hero
    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        const heroBackground = document.querySelector('.hero-background');
        
        if (heroBackground && scrolled < window.innerHeight) {
            heroBackground.style.transform = `translateY(${scrolled * 0.5}px)`;
        }
    });
}

// ========== ANIMATIONS ==========
function initializeAnimations() {
    // Counter animation for stats
    const animateValue = (element, start, end, duration, suffix = '') => {
        let startTimestamp = null;
        
        const step = (timestamp) => {
            if (!startTimestamp) startTimestamp = timestamp;
            const progress = Math.min((timestamp - startTimestamp) / duration, 1);
            
            if (suffix === '/5') {
                // Untuk rating 4.9/5
                const currentValue = (progress * (end - start) + start).toFixed(1);
                element.textContent = currentValue + suffix;
            } else if (suffix === '+') {
                // Untuk angka dengan +
                const currentValue = Math.floor(progress * (end - start) + start);
                element.textContent = currentValue.toLocaleString('id-ID') + suffix;
            } else {
                // Untuk angka biasa
                const currentValue = Math.floor(progress * (end - start) + start);
                element.textContent = currentValue.toLocaleString('id-ID') + suffix;
            }
            
            if (progress < 1) {
                window.requestAnimationFrame(step);
            }
        };
        
        window.requestAnimationFrame(step);
    };
    
    // Observe stats dengan intersection observer
    const statsObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const statItems = entry.target.querySelectorAll('.stat-item');
                
                statItems.forEach((statItem, index) => {
                    const h3 = statItem.querySelector('h3');
                    const originalText = h3.textContent;
                    
                    setTimeout(() => {
                        // Parse the text to get number and suffix
                        if (originalText.includes('/5')) {
                            // Rating: 4.9/5
                            h3.textContent = '0.0/5';
                            animateValue(h3, 0, 4.9, 2000, '/5');
                        } else if (originalText.includes('+')) {
                            // Number with +: 10,000+ or 150+
                            const num = parseInt(originalText.replace(/[^0-9]/g, ''));
                            h3.textContent = '0+';
                            animateValue(h3, 0, num, 2000, '+');
                        } else {
                            // Plain number
                            const num = parseInt(originalText.replace(/[^0-9]/g, ''));
                            h3.textContent = '0';
                            animateValue(h3, 0, num, 2000);
                        }
                    }, index * 200);
                });
                
                // Unobserve after animation
                statsObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });
    
    // Observe hero stats
    const heroStats = document.querySelector('.hero-stats');
    if (heroStats) {
        statsObserver.observe(heroStats);
    }
}

// ========== NOTIFICATION SYSTEM ==========
let notificationQueue = [];
let isShowingNotification = false;

function showNotification(message, type = 'success', duration = 3500) {
    notificationQueue.push({ message, type, duration });
    
    if (!isShowingNotification) {
        displayNextNotification();
    }
}

function displayNextNotification() {
    if (notificationQueue.length === 0) {
        isShowingNotification = false;
        return;
    }
    
    isShowingNotification = true;
    const { message, type, duration } = notificationQueue.shift();
    
    const notification = document.createElement('div');
    notification.className = 'notification';
    
    const icons = {
        success: 'check-circle',
        error: 'exclamation-circle',
        info: 'info-circle',
        warning: 'exclamation-triangle'
    };
    
    const colors = {
        success: 'linear-gradient(135deg, #28a745, #20c997)',
        error: 'linear-gradient(135deg, #dc3545, #c82333)',
        info: 'linear-gradient(135deg, #17a2b8, #138496)',
        warning: 'linear-gradient(135deg, #ffc107, #ff9800)'
    };
    
    notification.style.cssText = `
        position: fixed;
        top: 100px;
        right: -400px;
        background: ${colors[type]};
        color: white;
        padding: 20px 25px;
        border-radius: 12px;
        box-shadow: 0 10px 40px rgba(0, 0, 0, 0.4);
        z-index: 10000;
        max-width: 400px;
        min-width: 300px;
        transition: all 0.4s cubic-bezier(0.68, -0.55, 0.265, 1.55);
        font-size: 15px;
        line-height: 1.6;
    `;
    
    notification.innerHTML = `
        <div style="display: flex; align-items: flex-start; gap: 15px;">
            <i class="fas fa-${icons[type]}" style="font-size: 24px; flex-shrink: 0; margin-top: 2px;"></i>
            <div style="flex: 1;">
                ${message}
            </div>
            <button onclick="this.parentElement.parentElement.remove()" style="background: none; border: none; color: white; font-size: 20px; cursor: pointer; padding: 0; margin-left: 10px; opacity: 0.8; transition: opacity 0.3s;">
                <i class="fas fa-times"></i>
            </button>
        </div>
    `;
    
    document.body.appendChild(notification);
    
    // Animate in
    setTimeout(() => {
        notification.style.right = '20px';
    }, 10);
    
    // Animate out
    setTimeout(() => {
        notification.style.right = '-400px';
        notification.style.opacity = '0';
        
        setTimeout(() => {
            notification.remove();
            displayNextNotification();
        }, 400);
    }, duration);
}

// ========== BACK TO TOP BUTTON ==========
function initializeBackToTop() {
    const backToTopBtn = document.getElementById('backToTop');
    
    // Show/hide button on scroll
    window.addEventListener('scroll', () => {
        if (window.pageYOffset > 300) {
            backToTopBtn.classList.add('show');
        } else {
            backToTopBtn.classList.remove('show');
        }
    });
    
    // Scroll to top on click
    backToTopBtn.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
    
    // Keyboard shortcut: Press "Home" key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Home') {
            e.preventDefault();
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        }
    });
}

// ========== UTILITY FUNCTIONS ==========
// Make functions globally accessible
window.updateQuantity = updateQuantity;
window.removeFromCart = removeFromCart;

// Loading animation
window.addEventListener('load', () => {
    document.body.classList.add('loaded');
});

// Prevent right-click on images (optional, for protection)
document.addEventListener('contextmenu', (e) => {
    if (e.target.tagName === 'IMG') {
        e.preventDefault();
        showNotification('Gambar dilindungi', 'warning', 2000);
    }
});

// Easter egg - Konami code
let konamiCode = [];
const konamiSequence = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'b', 'a'];

document.addEventListener('keydown', (e) => {
    konamiCode.push(e.key);
    konamiCode = konamiCode.slice(-10);
    
    if (konamiCode.join(',') === konamiSequence.join(',')) {
        showNotification('Selamat! Anda menemukan Easter Egg! Kode promo: BRAVABELLY50 untuk diskon 50%!', 'success', 8000);
        konamiCode = [];
    }
});

// Performance monitoring
if ('performance' in window) {
    window.addEventListener('load', () => {
        setTimeout(() => {
            const perfData = performance.timing;
            const pageLoadTime = perfData.loadEventEnd - perfData.navigationStart;
            console.log(`%c⚡ Page loaded in ${pageLoadTime}ms`, 'color: #28a745; font-weight: bold;');
        }, 0);
    });
}


// Console art
console.log(`
%c
╔══════════════════════════════════════╗
║                                      ║
║        🍽️  Karya Minang Baru  🍽️          ║
║                                      ║
║    Rumah Makan Padang Authentic      ║
║                                      ║
╚══════════════════════════════════════╝
`, 'color: #ff6b35; font-weight: bold; font-size: 12px; font-family: monospace;');

console.log('%c💡 Tips: Tekan Ctrl+Shift+I untuk membuka Developer Tools', 'color: #b8b8c7; font-size: 11px;');