/* ==========================================================================
   DE LA ROSE - CAFETERÍA & RESTAURANTE
   Lógica Principal JavaScript (js/main.js)
   ========================================================================== */

// ==========================================
// ESTADO GLOBAL
// ==========================================
let currentCategory = 'all';
let searchQuery = '';
let cart = [];

// Opciones de Entrega y Envío
let currentOrderType = 'pickup'; // 'pickup' | 'delivery'
const DELIVERY_FEE = 35.00;

// Estado temporal del Modal de Producto
let activeModalState = {
    product: null,
    currentPrice: 0,
    selectedTemp: null,
    selectedFlavor: null,
    selectedOption: null
};

// Variable para almacenar la mesa seleccionada en el croquis
let selectedTableCode = '';

// ==========================================
// INICIALIZACIÓN DE EVENTOS
// ==========================================
document.addEventListener('DOMContentLoaded', () => {
    renderMenu();
    setupSearchAndFilters();
    setupThemeToggle();
    setupMobileMenu();
    setupReservationMinDate();
    updateCartUI();

    updateStoreStatus();
    setInterval(updateStoreStatus, 60000); // Revisa el estado cada minuto
});

// ==========================================
// RESTRICCIONES DE HORARIO Y REGLAS DE NEGOCIO
// ==========================================

// 1. Verificar si el negocio está fuera de horario de atención para pedidos (10:30 PM a 8:00 AM)
function isStoreClosed() {
    const now = new Date();
    const currentMinutes = now.getHours() * 60 + now.getMinutes();
    
    const closeTime = 22 * 60 + 30; // 10:30 PM (1350 min)
    const openTime = 8 * 60;        // 8:00 AM (480 min)

    // Es verdadero si son las 10:30 PM o más tarde, O si es antes de las 8:00 AM
    return currentMinutes >= closeTime || currentMinutes < openTime;
}

// 2. Verificar si un platillo está restringido por horario (después de la 1:00 PM)
function isBreakfastRestricted(title) {
    const currentHour = new Date().getHours(); // Hora en formato 0-23
    
    // Si son las 13:00 (1:00 PM) o más tarde
    if (currentHour >= 13) {
        const restrictedItems = ['chilaquiles', 'desayuno americano', 'huevos al gusto', 'desayuno'];
        const lowerTitle = title.toLowerCase();
        return restrictedItems.some(item => lowerTitle.includes(item));
    }
    
    return false;
}

// 3. Configura la fecha mínima permitida en el calendario de reservaciones (hoy en adelante)
function setupReservationMinDate() {
    const dateInput = document.getElementById('res-date');
    if (dateInput) {
        const todayStr = new Date().toLocaleDateString('en-CA'); // Formato YYYY-MM-DD local
        dateInput.min = todayStr;
    }
}

// ==========================================
// RENDERIZADO DEL MENÚ
// ==========================================
function renderMenu() {
    const grid = document.getElementById('menu-grid');
    const noResults = document.getElementById('no-results');
    
    const itemsList = (typeof menuItems !== 'undefined') ? menuItems : [];
    if (!grid) return;

    const filtered = itemsList.filter(item => {
        const matchesCategory = currentCategory === 'all' || item.category === currentCategory;
        const matchesSearch = item.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                              item.description.toLowerCase().includes(searchQuery.toLowerCase());
        return matchesCategory && matchesSearch;
    });

    if (filtered.length === 0) {
        grid.innerHTML = '';
        if (noResults) noResults.classList.remove('hidden');
        return;
    }

    if (noResults) noResults.classList.add('hidden');

    grid.innerHTML = filtered.map(item => {
        const hasVariants = item.temperatures || item.flavors || item.options || item.optionsWithPrice;
        const isRestricted = isBreakfastRestricted(item.title);
        const badgeTag = isRestricted ? 'Horario Finalizado' : (item.tag || item.category || 'Especialidad');
        const badgeBg = isRestricted ? 'bg-rose-600' : (item.badgeColor || 'bg-roseblue-400');
        
        return `
        <div class="bg-white dark:bg-roseblue-900 rounded-2xl sm:rounded-3xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 border border-slate-200/70 dark:border-roseblue-800 flex flex-col justify-between group ${isRestricted ? 'opacity-75' : ''}">
            <div>
                <div class="relative h-32 sm:h-48 overflow-hidden bg-roseblue-100 dark:bg-roseblue-950 cursor-pointer" onclick="openProductModal(${item.id})">
                    <img src="${item.image}" alt="${item.title}" class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" onerror="this.src='https://placehold.co/600x400/009dff/ffffff?text=De+La+Rose'">
                    <span class="absolute top-2 left-2 sm:top-3 sm:left-3 px-2 py-0.5 sm:px-2.5 sm:py-1 rounded-full text-[9px] sm:text-[10px] font-bold text-white uppercase tracking-wider ${badgeBg} shadow-md">
                        ${badgeTag}
                    </span>
                </div>

                <div class="p-3 sm:p-5 space-y-1 sm:space-y-2">
                    <div class="flex flex-col sm:flex-row sm:justify-between sm:items-baseline gap-0.5">
                        <h3 class="font-bold text-xs sm:text-base text-slate-900 dark:text-white group-hover:text-roseblue-400 transition-colors line-clamp-1 cursor-pointer" onclick="openProductModal(${item.id})">${item.title}</h3>
                        <span class="font-extrabold text-roseblue-500 dark:text-roseblue-400 text-xs sm:text-base">$${item.price} MXN</span>
                    </div>
                    <p class="text-[10px] sm:text-xs text-slate-600 dark:text-slate-300 line-clamp-2 leading-relaxed">${item.description}</p>
                    ${hasVariants && !isRestricted ? `<span class="inline-block text-[9px] sm:text-[10px] text-roseblue-500 font-bold bg-roseblue-50 dark:bg-roseblue-950 px-1.5 py-0.5 rounded-md">Opciones disponibles</span>` : ''}
                </div>
            </div>

            <div class="p-3 sm:p-5 pt-0 flex gap-1.5 sm:gap-2">
                ${isRestricted ? `
                    <button onclick="showToast('⚠️ Este platillo solo se sirve de 8:00 AM a 1:00 PM.')" class="w-full py-2 px-1.5 sm:py-2.5 sm:px-3 rounded-xl bg-slate-200 dark:bg-roseblue-800/80 text-slate-500 dark:text-slate-400 text-[9px] sm:text-xs font-bold cursor-not-allowed">
                        <span class="sm:hidden">🚫 No disponible</span>
                        <span class="hidden sm:inline">🚫 No disponible después de la 1:00 PM</span>
                    </button>
                ` : `
                    <button onclick="openProductModal(${item.id})" class="flex-1 py-1.5 px-2 sm:py-2 sm:px-3 rounded-xl border border-slate-200 dark:border-roseblue-700 hover:bg-slate-50 dark:hover:bg-roseblue-800 text-slate-700 dark:text-slate-200 text-[10px] sm:text-xs font-bold transition-colors">
                        <span class="sm:hidden">Detalle</span>
                        <span class="hidden sm:inline">Ver Detalle / Opciones</span>
                    </button>
                    <button onclick="${hasVariants ? `openProductModal(${item.id})` : `addToCartDirect(${item.id})`}" class="py-1.5 px-2.5 sm:py-2 sm:px-3.5 rounded-xl bg-roseblue-400 hover:bg-roseblue-500 text-white text-[10px] sm:text-xs font-bold transition-all shadow-sm active:scale-95">
                        <i class="fa-solid fa-plus"></i>
                    </button>
                `}
            </div>
        </div>
    `}).join('');
}

// ==========================================
// MOSTRAR U OCULTAR SECCIÓN DEL MENÚ
// ==========================================
function toggleMenuVisibility() {
    const container = document.getElementById('menu-content-container');
    const btnText = document.getElementById('toggle-menu-text');
    const btnIcon = document.getElementById('toggle-menu-icon');

    if (!container || !btnText || !btnIcon) return;

    const isHidden = container.classList.contains('hidden');

    if (isHidden) {
        container.classList.remove('hidden');
        btnText.textContent = 'Ocultar Menú';
        btnIcon.className = 'fa-solid fa-eye text-roseblue-400';
        showToast("Menú visible");
    } else {
        container.classList.add('hidden');
        btnText.textContent = 'Mostrar Menú';
        btnIcon.className = 'fa-solid fa-eye-slash text-slate-400';
        showToast("Menú oculto");
    }
}

// ==========================================
// FILTROS Y BÚSQUEDA
// ==========================================
function setupSearchAndFilters() {
    const tabs = document.querySelectorAll('.menu-tab, #category-tabs button');
    const searchInput = document.getElementById('menu-search');

    tabs.forEach(tab => {
        tab.addEventListener('click', (e) => {
            tabs.forEach(t => {
                t.classList.remove('active', 'bg-roseblue-400', 'text-white', 'shadow-md');
                t.classList.add('bg-white', 'dark:bg-roseblue-900', 'text-slate-700', 'dark:text-slate-200');
            });
            
            tab.classList.remove('bg-white', 'dark:bg-roseblue-900', 'text-slate-700', 'dark:text-slate-200');
            tab.classList.add('active', 'bg-roseblue-400', 'text-white', 'shadow-md');

            searchQuery = '';
            if (searchInput) searchInput.value = '';

            currentCategory = tab.getAttribute('data-category') || 'all';
            renderMenu();
        });
    });

    if (searchInput) {
        searchInput.addEventListener('input', (e) => {
            searchQuery = e.target.value.trim();
            renderMenu();
        });
    }
}

function resetMenuFilters() {
    currentCategory = 'all';
    searchQuery = '';
    const searchInput = document.getElementById('menu-search');
    if (searchInput) searchInput.value = '';
    
    const tabs = document.querySelectorAll('.menu-tab, #category-tabs button');
    tabs.forEach(t => {
        if(t.getAttribute('data-category') === 'all') {
            t.click();
        }
    });
}

// ==========================================
// MODAL DE PRODUCTO Y OPCIONES
// ==========================================
function openProductModal(productId) {
    if (isStoreClosed()) {
        showToast("⚠️ El servicio está cerrado. Tomamos pedidos de 8:00 AM a 10:30 PM.");
        return;
    }

    const itemsList = (typeof menuItems !== 'undefined') ? menuItems : [];
    const product = itemsList.find(p => p.id === productId);
    if (!product) return;

    if (isBreakfastRestricted(product.title)) {
        showToast("⚠️ Este platillo solo está disponible antes de la 1:00 PM.");
        return;
    }

    activeModalState = {
        product: product,
        currentPrice: product.price,
        selectedTemp: null,
        selectedFlavor: null,
        selectedOption: null
    };

    const modalImg = document.getElementById('modal-img');
    const modalCategory = document.getElementById('modal-category');
    const modalTitle = document.getElementById('modal-title');
    const modalDescription = document.getElementById('modal-description');
    const modalNotes = document.getElementById('modal-notes');

    if (modalImg) modalImg.src = product.image;
    if (modalTitle) modalTitle.textContent = product.title;
    if (modalCategory) modalCategory.textContent = product.category || product.tag || '';
    if (modalDescription) modalDescription.textContent = product.description;
    if (modalNotes) modalNotes.value = '';

    const optionsContainer = document.getElementById('modal-options-container');
    if (optionsContainer) {
        optionsContainer.innerHTML = '';

        if (product.temperatures && product.temperatures.length > 0) {
            activeModalState.selectedTemp = product.temperatures[0];
            activeModalState.currentPrice = product.temperatures[0].price;

            const tempHtml = `
                <div class="space-y-1.5">
                    <label class="block text-xs font-bold text-slate-800 dark:text-slate-200">1. Temperatura / Presentación:</label>
                    <div class="flex flex-wrap gap-2">
                        ${product.temperatures.map((t, idx) => `
                            <button type="button" onclick="selectModalTemp(${idx})" id="temp-btn-${idx}" class="modal-temp-btn px-4 py-2 rounded-xl text-xs font-bold transition-all border ${idx === 0 ? 'bg-roseblue-400 text-white border-roseblue-400 shadow-sm' : 'bg-slate-100 dark:bg-roseblue-950 text-slate-700 dark:text-slate-200 border-slate-200 dark:border-roseblue-800 hover:border-roseblue-400'}">
                                ${t.name === 'Caliente' ? '🔥' : t.name === 'Frío' ? '🧊' : '🥤'} ${t.name} ($${t.price})
                            </button>
                        `).join('')}
                    </div>
                </div>
            `;
            optionsContainer.innerHTML += tempHtml;
        }

        if (product.flavors && product.flavors.length > 0) {
            activeModalState.selectedFlavor = product.flavors[0];

            const flavorHtml = `
                <div class="space-y-1.5 pt-2">
                    <label class="block text-xs font-bold text-slate-800 dark:text-slate-200">${product.flavorsLabel || 'Elige el sabor'}:</label>
                    <div class="flex flex-wrap gap-2">
                        ${product.flavors.map((f, idx) => `
                            <button type="button" onclick="selectModalFlavor(${idx})" id="flavor-btn-${idx}" class="modal-flavor-btn px-3 py-1.5 rounded-xl text-xs font-bold transition-all border ${idx === 0 ? 'bg-roseblue-400 text-white border-roseblue-400 shadow-sm' : 'bg-slate-100 dark:bg-roseblue-950 text-slate-700 dark:text-slate-200 border-slate-200 dark:border-roseblue-800 hover:border-roseblue-400'}">
                                ${f}
                            </button>
                        `).join('')}
                    </div>
                </div>
            `;
            optionsContainer.innerHTML += flavorHtml;
        }

        if (product.optionsWithPrice && product.optionsWithPrice.length > 0) {
            activeModalState.selectedOption = product.optionsWithPrice[0].name;
            activeModalState.currentPrice = product.optionsWithPrice[0].price;

            const optPriceHtml = `
                <div class="space-y-1.5">
                    <label class="block text-xs font-bold text-slate-800 dark:text-slate-200">${product.optionsLabel || 'Elige una opción'}:</label>
                    <div class="flex flex-wrap gap-2">
                        ${product.optionsWithPrice.map((opt, idx) => `
                            <button type="button" onclick="selectModalOptionWithPrice(${idx})" id="optprice-btn-${idx}" class="modal-optprice-btn px-3 py-2 rounded-xl text-xs font-bold transition-all border ${idx === 0 ? 'bg-roseblue-400 text-white border-roseblue-400 shadow-sm' : 'bg-slate-100 dark:bg-roseblue-950 text-slate-700 dark:text-slate-200 border-slate-200 dark:border-roseblue-800 hover:border-roseblue-400'}">
                                ${opt.name} ($${opt.price})
                            </button>
                        `).join('')}
                    </div>
                </div>
            `;
            optionsContainer.innerHTML += optPriceHtml;
        }

        if (product.options && product.options.length > 0) {
            activeModalState.selectedOption = product.options[0];

            const optHtml = `
                <div class="space-y-1.5">
                    <label class="block text-xs font-bold text-slate-800 dark:text-slate-200">${product.optionsLabel || 'Elige una opción'}:</label>
                    <div class="flex flex-wrap gap-2">
                        ${product.options.map((opt, idx) => `
                            <button type="button" onclick="selectModalOption(${idx})" id="option-btn-${idx}" class="modal-option-btn px-3 py-2 rounded-xl text-xs font-bold transition-all border ${idx === 0 ? 'bg-roseblue-400 text-white border-roseblue-400 shadow-sm' : 'bg-slate-100 dark:bg-roseblue-950 text-slate-700 dark:text-slate-200 border-slate-200 dark:border-roseblue-800 hover:border-roseblue-400'}">
                                ${opt}
                            </button>
                        `).join('')}
                    </div>
                </div>
            `;
            optionsContainer.innerHTML += optHtml;
        }

        if (optionsContainer.innerHTML.trim() !== '') {
            optionsContainer.classList.remove('hidden');
        } else {
            optionsContainer.classList.add('hidden');
        }
    }

    updateModalPriceDisplay();

    const addBtn = document.getElementById('modal-add-btn');
    if (addBtn) {
        addBtn.onclick = () => {
            const notes = document.getElementById('modal-notes')?.value.trim() || '';
            confirmModalAddToCart(notes);
            closeModal('product-modal');
        };
    }

    openModal('product-modal');
}

function selectModalTemp(index) {
    const temps = activeModalState.product.temperatures;
    if (!temps || !temps[index]) return;

    activeModalState.selectedTemp = temps[index];
    activeModalState.currentPrice = temps[index].price;

    document.querySelectorAll('.modal-temp-btn').forEach((btn, idx) => {
        btn.className = idx === index 
            ? "modal-temp-btn px-4 py-2 rounded-xl text-xs font-bold transition-all border bg-roseblue-400 text-white border-roseblue-400 shadow-sm"
            : "modal-temp-btn px-4 py-2 rounded-xl text-xs font-bold transition-all border bg-slate-100 dark:bg-roseblue-950 text-slate-700 dark:text-slate-200 border-slate-200 dark:border-roseblue-800 hover:border-roseblue-400";
    });

    updateModalPriceDisplay();
}

function selectModalFlavor(index) {
    const flavors = activeModalState.product.flavors;
    if (!flavors || !flavors[index]) return;

    activeModalState.selectedFlavor = flavors[index];

    document.querySelectorAll('.modal-flavor-btn').forEach((btn, idx) => {
        btn.className = idx === index 
            ? "modal-flavor-btn px-3 py-1.5 rounded-xl text-xs font-bold transition-all border bg-roseblue-400 text-white border-roseblue-400 shadow-sm"
            : "modal-flavor-btn px-3 py-1.5 rounded-xl text-xs font-bold transition-all border bg-slate-100 dark:bg-roseblue-950 text-slate-700 dark:text-slate-200 border-slate-200 dark:border-roseblue-800 hover:border-roseblue-400";
    });
}

function selectModalOptionWithPrice(index) {
    const opts = activeModalState.product.optionsWithPrice;
    if (!opts || !opts[index]) return;

    activeModalState.selectedOption = opts[index].name;
    activeModalState.currentPrice = opts[index].price;

    document.querySelectorAll('.modal-optprice-btn').forEach((btn, idx) => {
        btn.className = idx === index 
            ? "modal-optprice-btn px-3 py-2 rounded-xl text-xs font-bold transition-all border bg-roseblue-400 text-white border-roseblue-400 shadow-sm"
            : "modal-optprice-btn px-3 py-2 rounded-xl text-xs font-bold transition-all border bg-slate-100 dark:bg-roseblue-950 text-slate-700 dark:text-slate-200 border-slate-200 dark:border-roseblue-800 hover:border-roseblue-400";
    });

    updateModalPriceDisplay();
}

function selectModalOption(index) {
    const opts = activeModalState.product.options;
    if (!opts || !opts[index]) return;

    activeModalState.selectedOption = opts[index];

    document.querySelectorAll('.modal-option-btn').forEach((btn, idx) => {
        btn.className = idx === index 
            ? "modal-option-btn px-3 py-2 rounded-xl text-xs font-bold transition-all border bg-roseblue-400 text-white border-roseblue-400 shadow-sm"
            : "modal-option-btn px-3 py-2 rounded-xl text-xs font-bold transition-all border bg-slate-100 dark:bg-roseblue-950 text-slate-700 dark:text-slate-200 border-slate-200 dark:border-roseblue-800 hover:border-roseblue-400";
    });
}

function updateModalPriceDisplay() {
    const priceElem = document.getElementById('modal-price');
    if (priceElem) {
        priceElem.textContent = `$${activeModalState.currentPrice} MXN`;
    }
}

function confirmModalAddToCart(notes) {
    const p = activeModalState.product;
    let variantParts = [];

    if (activeModalState.selectedTemp) variantParts.push(activeModalState.selectedTemp.name);
    if (activeModalState.selectedFlavor) variantParts.push(activeModalState.selectedFlavor);
    if (activeModalState.selectedOption) variantParts.push(activeModalState.selectedOption);

    const variantString = variantParts.join(' - ');
    const finalPrice = activeModalState.currentPrice;

    addToCartProcess(p, finalPrice, notes, variantString);
}

// ==========================================
// CARRITO DE COMPRAS Y OPCIONES DE ENVÍO
// ==========================================
function addToCartDirect(productId) {
    if (isStoreClosed()) {
        showToast("⚠️ El servicio está cerrado. Tomamos pedidos de 8:00 AM a 10:30 PM.");
        return;
    }

    const itemsList = (typeof menuItems !== 'undefined') ? menuItems : [];
    const product = itemsList.find(p => p.id === productId);
    if (!product) return;

    if (isBreakfastRestricted(product.title)) {
        showToast("⚠️ Este platillo solo está disponible antes de la 1:00 PM.");
        return;
    }

    addToCartProcess(product, product.price, '', '');
}

function addToCartProcess(product, price, notes, variantString) {
    const existingIndex = cart.findIndex(ci => ci.id === product.id && ci.notes === notes && ci.variantString === variantString);

    if (existingIndex > -1) {
        cart[existingIndex].quantity += 1;
    } else {
        cart.push({
            id: product.id,
            title: product.title,
            price: price,
            image: product.image,
            quantity: 1,
            notes: notes,
            variantString: variantString
        });
    }

    updateCartUI();
    const tagTxt = variantString ? ` (${variantString})` : '';
    showToast(`¡"${product.title}${tagTxt}" agregado al pedido!`);
}

function updateCartQuantity(index, change) {
    if (cart[index]) {
        cart[index].quantity += change;
        if (cart[index].quantity <= 0) {
            cart.splice(index, 1);
        }
        updateCartUI();
    }
}

function setOrderType(type) {
    currentOrderType = type;
    const btnPickup = document.getElementById('btn-order-pickup');
    const btnDelivery = document.getElementById('btn-order-delivery');
    const deliveryFields = document.getElementById('delivery-fields-container');
    const shippingRow = document.getElementById('cart-shipping-row');

    if (type === 'delivery') {
        if (btnDelivery) btnDelivery.className = 'order-type-btn py-2 px-3 rounded-xl border text-[11px] font-bold transition-all bg-roseblue-400 text-white border-roseblue-400 shadow-sm';
        if (btnPickup) btnPickup.className = 'order-type-btn py-2 px-3 rounded-xl border text-[11px] font-bold transition-all bg-white dark:bg-roseblue-950 text-slate-700 dark:text-slate-200 border-slate-200 dark:border-roseblue-800';
        if (deliveryFields) deliveryFields.classList.remove('hidden');
        if (shippingRow) shippingRow.classList.remove('hidden');
    } else {
        if (btnPickup) btnPickup.className = 'order-type-btn py-2 px-3 rounded-xl border text-[11px] font-bold transition-all bg-roseblue-400 text-white border-roseblue-400 shadow-sm';
        if (btnDelivery) btnDelivery.className = 'order-type-btn py-2 px-3 rounded-xl border text-[11px] font-bold transition-all bg-white dark:bg-roseblue-950 text-slate-700 dark:text-slate-200 border-slate-200 dark:border-roseblue-800';
        if (deliveryFields) deliveryFields.classList.add('hidden');
        if (shippingRow) shippingRow.classList.add('hidden');
    }

    updateCartUI();
}

function updateCartUI() {
    const container = document.getElementById('cart-items-container');
    const badge = document.getElementById('cart-badge');
    const subtotalPriceEl = document.getElementById('cart-subtotal-price');
    const totalPriceEl = document.getElementById('cart-total-price');

    const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
    const subtotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    const shippingCost = (currentOrderType === 'delivery') ? DELIVERY_FEE : 0;
    const finalTotal = subtotal + shippingCost;

    if (badge) {
        if (totalItems > 0) {
            badge.textContent = totalItems;
            badge.classList.remove('hidden');
        } else {
            badge.classList.add('hidden');
        }
    }

    if (subtotalPriceEl) subtotalPriceEl.textContent = `$${subtotal.toFixed(2)} MXN`;
    if (totalPriceEl) totalPriceEl.textContent = `$${finalTotal.toFixed(2)} MXN`;

    if (!container) return;

    if (cart.length === 0) {
        container.innerHTML = `
            <div class="text-center py-12 space-y-3">
                <i class="fa-solid fa-utensils text-3xl text-slate-300 dark:text-roseblue-800"></i>
                <p class="text-xs text-slate-500 dark:text-slate-400 font-medium">Tu lista está vacía. Selecciona platillos o bebidas del menú.</p>
            </div>
        `;
        return;
    }

    container.innerHTML = cart.map((item, index) => `
        <div class="flex items-center space-x-3 p-3 rounded-2xl bg-slate-100 dark:bg-roseblue-900/60 border border-slate-200/60 dark:border-roseblue-800">
            <img src="${item.image}" class="w-12 h-12 rounded-xl object-cover shrink-0" onerror="this.src='https://placehold.co/100x100/009dff/ffffff?text=Food'">
            <div class="flex-grow min-w-0">
                <h4 class="font-bold text-xs text-slate-900 dark:text-white truncate">${item.title}</h4>
                ${item.variantString ? `<span class="inline-block px-2 py-0.5 rounded bg-roseblue-100 dark:bg-roseblue-800 text-roseblue-800 dark:text-roseblue-200 text-[10px] font-bold my-0.5">${item.variantString}</span>` : ''}
                <div class="text-xs font-extrabold text-roseblue-500 dark:text-roseblue-400">$${item.price * item.quantity} MXN</div>
                ${item.notes ? `<p class="text-[10px] text-slate-500 dark:text-slate-400 italic truncate">Nota: ${item.notes}</p>` : ''}
            </div>
            <div class="flex items-center space-x-1.5 bg-white dark:bg-roseblue-950 p-1 rounded-xl border border-slate-200 dark:border-roseblue-800 shrink-0">
                <button onclick="updateCartQuantity(${index}, -1)" class="w-6 h-6 rounded-lg text-xs font-bold hover:bg-slate-100 dark:hover:bg-roseblue-800 text-slate-700 dark:text-slate-200">-</button>
                <span class="text-xs font-bold px-1 text-slate-900 dark:text-white w-4 text-center">${item.quantity}</span>
                <button onclick="updateCartQuantity(${index}, 1)" class="w-6 h-6 rounded-lg text-xs font-bold hover:bg-slate-100 dark:hover:bg-roseblue-800 text-slate-700 dark:text-slate-200">+</button>
            </div>
        </div>
    `).join('');
}

function toggleCartDrawer() {
    const drawer = document.getElementById('cart-drawer');
    const overlay = document.getElementById('cart-drawer-overlay');
    if (!drawer || !overlay) return;

    const isOpen = !drawer.classList.contains('translate-x-full');

    if (isOpen) {
        drawer.classList.add('translate-x-full');
        overlay.classList.add('opacity-0', 'pointer-events-none');
        overlay.classList.remove('opacity-100', 'pointer-events-auto');
    } else {
        drawer.classList.remove('translate-x-full');
        overlay.classList.remove('opacity-0', 'pointer-events-none');
        overlay.classList.add('opacity-100', 'pointer-events-auto');
    }
}

// Envío de Pedido por WhatsApp
function sendWhatsAppOrder() {
    if (isStoreClosed()) {
        showToast("⚠️ En este momento el servicio está cerrado. Te atendemos con gusto de 8:00 AM a 10:30 PM.");
        return;
    }

    if (cart.length === 0) {
        showToast("⚠️ Agrega al menos un producto a tu lista para ordenar.");
        return;
    }

    let city = '';
    let address = '';

    // Validaciones exclusivas para Motomandado
    if (currentOrderType === 'delivery') {
        const citySelect = document.getElementById('delivery-city');
        const addressInput = document.getElementById('delivery-address');

        city = citySelect ? citySelect.value : '';
        address = addressInput ? addressInput.value.trim() : '';

        if (city !== 'Jala' && city !== 'Jomulco') {
            showToast("❌ Solo realizamos envíos a Jala y Jomulco");
            return;
        }

        if (!address) {
            showToast("⚠️ Ingresa la dirección completa para el envío");
            if (addressInput) addressInput.focus();
            return;
        }
    }

    let message = "👋 *¡Hola De La Rose! Quisiera realizar el siguiente pedido:*\n\n";
    let subtotal = 0;

    cart.forEach((item, index) => {
        const itemTotal = item.price * item.quantity;
        subtotal += itemTotal;
        const optText = item.variantString ? ` [${item.variantString}]` : '';
        message += `*${index + 1}. ${item.title}* (x${item.quantity})${optText}\n`;
        if (item.notes) message += `   ▫️ _Notas:_ ${item.notes}\n`;
        message += `    *$${itemTotal.toFixed(2)} MXN*\n\n`;
    });

    message += `------------------------------\n`;
    message += ` *Subtotal productos:* $${subtotal.toFixed(2)} MXN\n`;

    if (currentOrderType === 'delivery') {
        const totalFinal = subtotal + DELIVERY_FEE;
        message += `*Tipo de Entrega:* Envío por Motomandado\n`;
        message += `*Localidad:* ${city}, Nayarit\n`;
        message += `*Dirección:* ${address}\n`;
        message += `*Costo de envío:* $35.00 MXN\n`;
        message += `------------------------------\n`;
        message += `*TOTAL A PAGAR:* *$${totalFinal.toFixed(2)} MXN*\n`;
    } else {
        message += ` *Tipo de Entrega:* Pasar a recoger al local\n`;
        message += `------------------------------\n`;
        message += `*TOTAL A PAGAR:* *$${subtotal.toFixed(2)} MXN*\n`;
    }

    message += `\nQuedo a la espera de su confirmación. ¡Muchas gracias!`;

    const encodedMessage = encodeURIComponent(message);
    const phoneNumber = "523241143686"; 
    window.open(`https://wa.me/${phoneNumber}?text=${encodedMessage}`, '_blank');

    cart = [];
    updateCartUI();
    toggleCartDrawer();
    showToast("¡Pedido enviado por WhatsApp!");
}

// ==========================================
// CONTROL DE MODALES GENERALES
// ==========================================
function openModal(id) {
    const modal = document.getElementById(id);
    if (!modal) return;
    
    modal.classList.remove('opacity-0', 'pointer-events-none');
    if (modal.children[0]) {
        modal.children[0].classList.remove('scale-95');
        modal.children[0].classList.add('scale-100');
    }

    if (id === 'reservation-modal') {
        setupReservationMinDate();
    }
}

function closeModal(id) {
    const modal = document.getElementById(id);
    if (!modal) return;

    if (modal.children[0]) {
        modal.children[0].classList.remove('scale-100');
        modal.children[0].classList.add('scale-95');
    }
    modal.classList.add('opacity-0', 'pointer-events-none');
}

// ==========================================
// VALIDACIÓN Y ENVÍO DE RESERVACIONES
// ==========================================
function handleReservationSubmit(e) {
    e.preventDefault();

    const name = document.getElementById('res-name')?.value.trim();
    const dateStr = document.getElementById('res-date')?.value;
    const timeStr = document.getElementById('res-time')?.value;
    const people = document.getElementById('res-people')?.value;
    const phone = document.getElementById('res-phone')?.value.trim();
    const tableInput = document.getElementById('res-selected-table-input')?.value;

    if (!tableInput) {
        showToast("⚠️ Por favor selecciona una mesa en el mapa antes de continuar.");
        return;
    }

    if (!name || !dateStr || !timeStr || !phone) {
        showToast("⚠️ Completa todos los campos del formulario.");
        return;
    }

    const today = new Date();
    const todayStr = today.toLocaleDateString('en-CA');
    
    if (dateStr < todayStr) {
        showToast("⚠️ Solo puedes hacer reservaciones desde el día de hoy en adelante.");
        return;
    }

    const [hours, minutes] = timeStr.split(':').map(Number);
    const timeInMinutes = hours * 60 + minutes;

    const morningStart = 9 * 60 + 30;   // 09:30 AM
    const morningEnd = 13 * 60 + 30;    // 01:30 PM
    const eveningStart = 16 * 60;       // 04:00 PM
    const eveningEnd = 21 * 60 + 30;    // 09:30 PM

    const isMorningSlot = timeInMinutes >= morningStart && timeInMinutes <= morningEnd;
    const isEveningSlot = timeInMinutes >= eveningStart && timeInMinutes <= eveningEnd;

    if (!isMorningSlot && !isEveningSlot) {
        showToast("⚠️ El horario de atención es de 9:30 AM a 1:30 PM y de 4:00 PM a 9:30 PM.");
        return;
    }

    if (dateStr === todayStr) {
        const currentMinutes = today.getHours() * 60 + today.getMinutes();
        if (timeInMinutes <= currentMinutes) {
            showToast("⚠️ Para el día de hoy, debes seleccionar una hora posterior a la actual.");
            return;
        }
    }

    let message = `👋 *¡Hola De La Rose! Solicitud de Reservación de Mesa:*\n\n`;
    message += `*Mesa Seleccionada:* ${tableInput}\n`;
    message += `*Nombre:* ${name}\n`;
    message += `*Fecha:* ${dateStr}\n`;
    message += `*Hora:* ${timeStr}\n`;
    message += `*Personas:* ${people}\n`;
    message += `*Teléfono de contacto:* ${phone}\n\n`;
    message += `Quedo a la espera de su confirmación sobre la disponibilidad. ¡Muchas gracias!`;

    const encodedMessage = encodeURIComponent(message);
    const phoneNumber = "523241143686"; 
    
    closeModal('reservation-modal');
    showToast("¡Redirigiendo a WhatsApp para enviar tu solicitud de reserva!");
    e.target.reset();
    
    // Resetear mapa de mesas
    selectedTableCode = '';
    const hiddenTableInput = document.getElementById('res-selected-table-input');
    if (hiddenTableInput) hiddenTableInput.value = '';
    const label = document.getElementById('selected-table-label');
    if (label) label.textContent = 'Ninguna mesa seleccionada';

    window.open(`https://wa.me/${phoneNumber}?text=${encodedMessage}`, '_blank');
}

function subscribeNewsletter(e) {
    e.preventDefault();
    showToast("¡Gracias por suscribirte a De La Rose!");
    e.target.reset();
}

// ==========================================
// TEMA CLARO / OSCURO
// ==========================================
function setupThemeToggle() {
    const toggleBtn = document.getElementById('theme-toggle');
    applyAutoTheme();

    if (toggleBtn) {
        toggleBtn.addEventListener('click', () => {
            document.documentElement.classList.toggle('dark');
        });
    }
}

function applyAutoTheme() {
    const currentHour = new Date().getHours();
    if (currentHour >= 7 && currentHour < 19) {
        document.documentElement.classList.remove('dark');
    } else {
        document.documentElement.classList.add('dark');
    }
}

// ==========================================
// MENÚ MÓVIL (HAMBURGUESA)
// ==========================================
function setupMobileMenu() {
    const btn = document.getElementById('mobile-menu-btn');
    const menu = document.getElementById('mobile-menu');
    const links = document.querySelectorAll('.mobile-nav-link');

    if (btn && menu) {
        btn.addEventListener('click', () => {
            menu.classList.toggle('hidden');
        });

        links.forEach(l => {
            l.addEventListener('click', () => menu.classList.add('hidden'));
        });
    }
}

// ==========================================
// NOTIFICACIONES TOAST (z-[60])
// ==========================================
function showToast(message) {
    const container = document.getElementById('toast-container');
    if (!container) return;
    
    const toast = document.createElement('div');
    toast.className = 'px-4 py-3 rounded-2xl bg-slate-900/95 dark:bg-roseblue-950/95 text-white shadow-2xl text-xs font-bold border border-roseblue-400/40 flex items-center space-x-2 transition-all transform translate-y-4 opacity-0 pointer-events-auto z-[60]';
    toast.innerHTML = `
        <i class="fa-solid fa-circle-info text-roseblue-400"></i>
        <span>${message}</span>
    `;

    container.appendChild(toast);

    setTimeout(() => {
        toast.classList.remove('translate-y-4', 'opacity-0');
    }, 10);

    setTimeout(() => {
        toast.classList.add('opacity-0', 'translate-y-2');
        setTimeout(() => toast.remove(), 300);
    }, 3500);
}

// ==========================================
// INDICADOR DINÁMICO (SERVICIO ABIERTO/CERRADO)
// ==========================================
function updateStoreStatus() {
    const statusBadges = document.querySelectorAll('#store-status, .store-status-badge');
    if (!statusBadges.length) return;

    const isOpen = !isStoreClosed();

    statusBadges.forEach(badge => {
        if (isOpen) {
            badge.textContent = 'Servicio Abierto';
            badge.className = 'store-status-badge inline-block text-[10px] font-bold px-2.5 py-1 rounded-full bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300 border border-emerald-300/50 dark:border-emerald-800/50 transition-colors';
        } else {
            badge.textContent = 'Servicio Cerrado';
            badge.className = 'store-status-badge inline-block text-[10px] font-bold px-2.5 py-1 rounded-full bg-rose-900/90 text-rose-200 border border-rose-700/60 dark:bg-rose-950 dark:text-rose-300 transition-colors';
        }
    });
}

// ==========================================
// SELECCIÓN DE MESAS EN CROQUIS
// ==========================================
function selectTable(tableId, capacityInfo) {
    selectedTableCode = tableId;
    
    const hiddenInput = document.getElementById('res-selected-table-input');
    if (hiddenInput) hiddenInput.value = tableId;

    const label = document.getElementById('selected-table-label');
    if (label) {
        label.textContent = `Mesa Elegida: ${tableId} (${capacityInfo})`;
    }

    document.querySelectorAll('.table-btn').forEach(btn => {
btn.classList.remove('bg-roseblue-500', 'text-white', 'ring-4', 'ring-roseblue-300', 'dark:ring-roseblue-600', 'scale-110', 'z-20');

if (btn.id === 'table-especial') {
    btn.classList.add('bg-slate-300', 'text-slate-800', 'dark:bg-neutral-800', 'dark:text-slate-100', 'dark:border', 'dark:border-neutral-600');
} else {
    btn.classList.add('bg-slate-900', 'text-white', 'dark:bg-neutral-800', 'dark:border', 'dark:border-neutral-600');
}
    });

    let targetId = 'table-' + (tableId.startsWith('Mesa Especial') ? 'especial' : tableId.toLowerCase());
    const selectedBtn = document.getElementById(targetId);
    
    if (selectedBtn) {
        selectedBtn.classList.remove('bg-slate-900', 'bg-slate-300', 'dark:bg-black', 'dark:bg-slate-700');
        selectedBtn.classList.add('bg-roseblue-500', 'text-white', 'ring-4', 'ring-roseblue-300', 'dark:ring-roseblue-600', 'scale-110', 'z-20');
    }

    showToast(`📍 Seleccionaste la mesa ${tableId}`);
}
function toggleMenu() {
    // Busca el contenedor que envuelve el buscador, categorías y productos del menú
    const menuWrapper = document.getElementById('menu-interactive-wrapper') || document.getElementById('menu-grid');
    const btnText = document.getElementById('toggle-menu-text');
    const btnIcon = document.getElementById('toggle-menu-icon');

    if (!menuWrapper) return;

    const estaOculto = menuWrapper.classList.contains('hidden');

    if (estaOculto) {
        // MOSTRAR MENÚ
        menuWrapper.classList.remove('hidden');
        if (btnText) btnText.textContent = 'Ocultar Menú';
        if (btnIcon) {
            btnIcon.classList.remove('fa-eye');
            btnIcon.classList.add('fa-eye-slash');
        }
    } else {
        // OCULTAR MENÚ
        menuWrapper.classList.add('hidden');
        if (btnText) btnText.textContent = 'Mostrar Menú';
        if (btnIcon) {
            btnIcon.classList.remove('fa-eye-slash');
            btnIcon.classList.add('fa-eye');
        }
    }
}