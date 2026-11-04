// ==========================================================
// CARTA DIGITAL - De La Rose
// Réplica exacta de la carta impresa con imágenes y zoom.
// ==========================================================

const cartaData = {
    comida: [
        {
            title: "Para el día", icon: "fa-sun",
            items: [
                { 
                    name: "Chilaquiles Tradicionales", 
                    price: 85, 
                    desc: "Con salsa verde o roja, acompañados con frijoles puercos y ensalada.",
                    img: "./Fotos DelaRose/platillos/chilaquiles tradicionales.jpg"
                },
                { 
                    name: "Chilaquiles Especiales", 
                    price: 120, 
                    desc: "Con salsa verde o roja, frijoles puercos, ensalada y proteína de su elección.", 
                    options: ["Tocino", "Huevo", "Arrachera", "Pollo"],
                    img: "./Fotos DelaRose/platillos/chilaquiles especiales.jpeg"
                },
                { 
                    name: "Desayuno Americano", 
                    price: 110, 
                    desc: "3 piezas de hotcakes, huevo revuelto o estrellado y 4 tiras de tocino.",
                    img: "./Fotos DelaRose/platillos/desayuno americano.jpeg"
                },
                { name: "Huevos al Gusto", price: 90 },
                { 
                    name: "Club Sándwich", 
                    price: 120, 
                    desc: "Incluye pollo, jamón, tocino, queso amarillo, acompañado de papa francesa.",
                    img: "./Fotos DelaRose/platillos/Club sandwich.jpeg"
                },
                { name: "Sándwich de Pollo", prices: [{ label: "Sencillo", price: 40 }, { label: "Con ensalada", price: 55 }, { label: "Con papas a la francesa", price: 80 }],
                    img: "./Fotos DelaRose/platillos/sandwich de pollo.jpeg"
                },
                { name: "Sándwich de Jamón", prices: [{ label: "Sencillo", price: 30 }, { label: "Con ensalada", price: 45 }, { label: "Con papas a la francesa", price: 60 }] },
                { name: "Bowl de Yogurth", price: 65, desc: "Arándano, pasa, almendra, granola, fresa, zarzamora, plátano y yogurth natural.",
                    img: "./Fotos DelaRose/platillos/bowl de yogurth.jpeg"
                },
                { name: "Molletes Tradicionales", price: 70 },
                { name: "Molletes con Carne", price: 90, desc: "Incluye salsa mexicana.", options: ["Arrachera", "Carne molida"],
                    img: "./Fotos DelaRose/platillos/molletes con carne.jpg"
                },
                { name: "Molletes Dulces", price: 40, options: ["Cajeta", "Mermelada", "Azúcar"] },
                { name: "Hotcakes", price: 70, img: "./Fotos DelaRose/platillos/hotcakes.jpg" },
                { name: "Pan Francés", price: 60 , img: "./Fotos DelaRose/platillos/pan frances.jpg" }
            ],
            note: "Proteína extra $30"
        },
        {
            title: "Baguettes", icon: "fa-bread-slice",
            items: [
                { 
                    name: "Baguette Carnes Frías", 
                    price: 90, 
                    desc: "Con carnes frías y queso gratinado, acompañado de papas gajo.",
                    img: "./Fotos DelaRose/platillos/baguette carnes frias.jpeg"
                },
                { 
                    name: "Baguette Pollo", 
                    price: 115, 
                    desc: "Con pollo y queso gratinado, acompañado de papas gajo.",
                    img: "./Fotos DelaRose/platillos/baguette de pollo.jpeg"
                },
                { name: "Baguette Arrachera", 
                  price: 110, 
                  desc: "Con arrachera y queso gratinado, acompañado de papas gajo.", 
                  img: "./Fotos DelaRose/platillos/baguette arrachera.jpg"
                },
                { name: "Baguette Camarón-Champiñones", price: 110, desc: "Con camarón, champiñones y queso gratinado, acompañado de papas gajo.",
                    img: "./Fotos DelaRose/platillos/baguette camaron con champiñones.jpg"
                }
            ]
        },
        {
            title: "Ensaladas", icon: "fa-leaf",
            items: [
                { 
                    name: "De La Rose", 
                    price: 80, 
                    desc: "Lechuga, pepino, arándanos, manzana, pollo, crotones y vinagreta de limón.",
                    img: "./Fotos DelaRose/platillos/ensalada de la Roe.jpeg"
                },
                { name: "Pollo", price: 80, desc: "Lechuga, jitomate, zanahoria, pepino, crotones, aliñado de una vinagreta de limón." },
                { name: "Frutos Secos", price: 80, desc: "Lechuga, jitomate, zanahoria, pepino, crotones, jamón, almendra, arándanos, pasas, aliñado de vinagreta de limón y miel.", img: "./Fotos DelaRose/platillos/ensalada frutos secos.jpeg" },
                { name: "Dulce", price: 80, desc: "Lechuga, pepino, fresa, crotones, manzana, arándanos, pasas, nuez, aliñado de vinagreta de limón y miel." }
            ]
        },
        {
            title: "Para la noche", icon: "fa-moon",
            items: [
                { 
                    name: "Fetuccini Alfredo", 
                    price: 100, 
                    options: ["Pollo", "Camarón", "Tocino", "Champiñones"],
                    img: "./Fotos DelaRose/platillos/pasta alfredo.jpeg"
                },
                { name: "Pasta Boloñesa", price: 100 }
            ]
        },
        {
            title: "Crepas dulces", icon: "fa-cookie-bite",
            items: [
                { name: "Cajeta", price: 60, desc: "Rellena de cajeta, decorada con nuez, plátano y dulce de leche." },
                { name: "Dulce", price: 70, desc: "Rellena de queso crema con mermelada de fresa, decorada con fresas y crema de avellanas.",
                    img: "./Fotos DelaRose/platillos/crepa dulce.jpeg"
                },
                { name: "Suave", price: 70, desc: "Rellena de leche condensada, decorada con frutos rojos, fresa y chispas de chocolate blanco.",
                    img: "./Fotos DelaRose/platillos/crepa suave.jpg"
                },
                { 
                    name: "Chocolatosa", 
                    price: 75, 
                    desc: "Rellena de nutella, decorada con fresa, galleta Oreo y chispas de chocolate.",
                    img: "./Fotos DelaRose/platillos/crepa chocolatosa.jpeg"
                }
            ]
        },
        {
            title: "Crepas saladas", icon: "fa-cheese",
            items: [
                { name: "Jamón", price: 75, desc: "Rellena de queso cheddar y jamón, con salsa de tomate y un toque de espinaca.", img: "./Fotos DelaRose/platillos/crepa jamon.jpeg" },
                { name: "Champiñón", price: 65, desc: "Rellena de champiñón y queso cheddar, con aderezo de chipotle y un toque de espinaca.", img: "./Fotos DelaRose/platillos/crepa champiñones.jpg" },
                { name: "Pizza", price: 80, desc: "Rellena de pepperoni y queso cheddar, con salsa de tomate, queso parmesano y un toque de espinaca." }
            ],
            note: "Ingrediente extra $15"
        },
        {
            title: "Waffles", icon: "fa-stroopwafel",
            items: [
                { 
                    name: "Churro Cheesecake", 
                    price: 80, 
                    desc: "Fresa, plátano, queso crema, 1 bola de nieve de vainilla espolvoreado con azúcar y canela.",
                    img: "./Fotos DelaRose/platillos/waffle churrocheesecake.jpeg"
                },
                { name: "Plátano", price: 55, desc: "Plátano, cajeta y nuez.", img: "./Fotos DelaRose/platillos/waffle de plátano.jpg" },
                { name: "Fresa", price: 60, desc: "Mermelada de fresa, fresas y chispas de chocolate blanco.", img: "./Fotos DelaRose/platillos/waffle de fresa.jpg" },
                { name: "Chocochips", price: 65, desc: "Crema de avellanas, chispas de chocolate, plátano y fresas.", img: "./Fotos DelaRose/platillos/waffle de chocochips.jpg" },
                { name: "Frutos Rojos", price: 70, desc: "Frutos rojos, leche condensada y chispas de chocolate blanco.", img: "./Fotos DelaRose/platillos/waffle frutos rojos.jpeg" }
            ]
        },
        {
            title: "Snacks", icon: "fa-pizza-slice",
            items: [
                { 
                    name: "Tabla de Carnes Frías", 
                    price: 120, 
                    desc: "Pepperoni, salami, salchicha, jamón, queso crema, frutos secos, frutos rojos y mermelada especial.",
                    img: "./Fotos DelaRose/platillos/Tabla de carnes Frias.jpeg"
                },
                { name: "Pizza Baguette", price: 80, desc: "Piña, jamón, salami, pepperoni, salchicha.", img: "./Fotos DelaRose/platillos/Pizza baguette.jpg" },
                { name: "Nachos con Carne", price: 80, desc: "Arrachera o molida preparada.", img: "./Fotos DelaRose/platillos/nachos carne.jpg" },
                { name: "Nachos Sencillos", price: 60, img: "./Fotos DelaRose/platillos/nachos sencillos.jpeg" },
                { name: "Papas Gajo", price: 55, img: "./Fotos DelaRose/platillos/Papas gajo.jpeg" },
                { name: "Papas a la Francesa", price: 45, img: "./Fotos DelaRose/platillos/papas francesas.jpeg" }
            ]
        },
        {
            title: "Para endulzarte", icon: "fa-cake-candles",
            items: [{ name: "Pregunta por el pastel del día" }]
        }
    ],

    bebidas: [
        {
            title: "Bebidas", icon: "fa-glass-water",
            items: [
                { 
                    name: "Café de Olla", 
                    price: 40, 
                    desc: "1 refil.",
                    img: "https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?w=400&auto=format&fit=crop&q=80"
                },
                { name: "Limonada Natural / Mineral", price: 35, desc: "Rosa $45 · Fresa $50.", img: "./Fotos DelaRose/bebidas/limonadas.jpeg" },
                { name: "Naranjada Natural / Mineral", price: 45, img: "./Fotos DelaRose/bebidas/naranjada.jpeg" },
                { name: "Chocolate De La Rose", price: 50 , img: "./Fotos DelaRose/bebidas/chocolate de la rose.jpeg"},
                { name: "Chocomilk", price: 33 , img: "./Fotos DelaRose/bebidas/chocomilk.jpeg"},
                { name: "Jugo de Zanahoria", price: 50, img: "./Fotos DelaRose/bebidas/jugo de zanahoria.jpg" },
                { name: "Jugo de Naranja", price: 50, img: "./Fotos DelaRose/bebidas/jugo de naranja.jpg" },
                { name: "Jugo Verde", price: 50 },
                { name: "Licuado de Frutas", price: 50, desc: "Avena, fresa, plátano o manzana.",img: "./Fotos DelaRose/bebidas/licuado.jpeg" },
                { name: "Botella de Agua", price: 20 },
                { name: "Vaso de Leche", price: 15 }
            ]
        },
        {
            title: "Café", icon: "fa-mug-hot",
            items: [
                { name: "Espresso", prices: [{ label: "Sencillo", price: 30 }, { label: "Doble", price: 40 }, { label: "Afogatto", price: 50 }] },
                { name: "Americano", prices: [{ label: "Caliente", price: 45 }, { label: "Frío", price: 50 }] },
                { name: "Americano de sabor", options: ["Moka", "Kahlúa", "Caramelo", "Vainilla"], prices: [{ label: "Caliente", price: 60 }, { label: "Frío", price: 70 }] },
                { 
                    name: "Cappuccino", 
                    prices: [{ label: "Caliente", price: 50 }, { label: "Frío", price: 50 }],
                    img: "./Fotos DelaRose/bebidas/cappuccino.jpeg"
                },
                { name: "Cappuccino de sabor", options: ["Moka", "Kahlúa", "Caramelo", "Rompope", "Cajeta", "Vainilla"], prices: [{ label: "Caliente", price: 60 }, { label: "Frío", price: 65 }], img: "./Fotos DelaRose/bebidas/cappuccino sabor.jpg" },
                { name: "Latte", prices: [{ label: "Caliente", price: 50 }, { label: "Frío", price: 55 }],img: "./Fotos DelaRose/bebidas/Latte.jpeg" },
                { name: "Latte de sabor", options: ["Moka", "Kahlúa", "Caramelo", "Rompope", "Cajeta", "Vainilla", "Afogatto"], prices: [{ label: "Caliente", price: 65 }, { label: "Frío", price: 70 }], img: "./Fotos DelaRose/bebidas/latte sabor.jpg" }
            ],
            note: "Shot de sabor extra $30"
        },
        {
            title: "Té y tizanas", icon: "fa-mug-saucer",
            items: [
                { name: "Té", prices: [{ label: "Caliente", price: 26 }, { label: "Frío", price: 30 }] },
                { name: "Té Chai", options: ["Coco", "Guayaba", "Vainilla"], prices: [{ label: "Caliente", price: 66 }, { label: "Frío", price: 85 }, { label: "Frapeado", price: 85 }] ,img: "./Fotos DelaRose/bebidas/chai.jpg"},
                { name: "Tizanas", options: ["Frutos rojos", "Fresa-Kiwi", "Frutas tropicales"], prices: [{ label: "Caliente", price: 75 }, { label: "Frío", price: 85 }], img: "./Fotos DelaRose/bebidas/tizana.jpeg" }
            ]
        },
        {
            title: "Malteadas", icon: "fa-ice-cream", layout: "grid",img: "./Fotos DelaRose/bebidas/malteadda affogato 2.jpeg",
            items: [
                { name: "Oreo", price: 61 }, { name: "Fresa", price: 60 }, { name: "Chocolate", price: 60 },
                { name: "Kinder", price: 70 }, { name: "Vainilla", price: 60 }, { name: "Plátano", price: 67 },
                { name: "Gansito", price: 77 }, { name: "Frutos Rojos", price: 70 }, { name: "Chocoretas", price: 70 },
                { name: "Mazapán", price: 66 }, { name: "Afogatto", price: 75 }
            ]
        },
        {
            title: "Frappés", icon: "fa-blender", layout: "grid", img: "./Fotos DelaRose/bebidas/frappes.jpeg",
            items: [
                { name: "Clásico", price: 55 }, 
                { name: "Cajeta", price: 60 }, { name: "Oreo", price: 70 },
                { name: "Moka", price: 65 }, { name: "Caramelo", price: 65 }, { name: "Kahlúa", price: 80 },
                { name: "Rompope", price: 80 }, { name: "Gansito", price: 80 }, { name: "Baileys", price: 80 },
                { name: "Ferrero", price: 80 }, { name: "Kinder", price: 77 }, { name: "Nutella", price: 77 },
                { name: "Vainilla", price: 77 }
            ]
        },
        {
            title: "Smoothies", icon: "fa-lemon", layout: "grid",
            categoryImg: "./Fotos DelaRose/bebidas/smothiesss.jpeg",
            items: [
                { name: "Fresa", price: 70 },
                { name: "Frutos Rojos", price: 70 },
                { name: "Mango (por temporada)", price: 70 },
                { name: "Cereza", price: 70 }
            ]
        },
        {
            title: "Refrescos", icon: "fa-bottle-water",
            items: [
                { name: "Refresco de lata", price: 20 },
                { name: "Refresco de vidrio", price: 20 },
                { name: "Soda Italiana", price: 55, desc: "Fresa, mango, moras, frambuesa o kiwi." ,img: "./Fotos DelaRose/bebidas/Soda italiana.jpeg"}
            ]
        }
    ]
};

let cartaTabActual = 'comida';

function cartaFila(label, price, clases = '') {
    return `
    <div class="flex items-baseline gap-1.5 min-w-0 ${clases}">
        <span class="truncate min-w-0">${label}</span>
        <span class="flex-1 border-b border-dotted border-[#D7C4B7] dark:border-[#5D4037] shrink translate-y-[-3px]"></span>
        <span class="font-bold text-[#8C603F] dark:text-[#E0A96D] whitespace-nowrap shrink-0">$${price}</span>
    </div>`;
}

function cartaItemHTML(item) {
    const foto = item.img
        ? `<img src="${item.img}" alt="${item.name}" data-foto="${item.img}" data-titulo="${item.name}" class="w-12 h-12 rounded-xl object-cover shrink-0 cursor-zoom-in shadow-sm border border-[#E8D5C4]" loading="lazy" onerror="this.remove()">`
        : '';

    const cabecera = item.price != null
        ? cartaFila(item.name, item.price, 'font-semibold text-sm text-[#3E2723] dark:text-[#F5EBE0]')
        : `<div class="font-semibold text-sm text-[#3E2723] dark:text-[#F5EBE0]">${item.name}</div>`;

    const desc = item.desc
        ? `<p class="text-[11px] leading-snug text-[#6D4C41] dark:text-[#D7CCC8]">${item.desc}</p>` : '';

    const opciones = item.options
        ? `<p class="text-[11px] italic text-[#8C603F] dark:text-[#E0A96D]">${item.options.join(' · ')}</p>` : '';

    const variantes = (item.prices || [])
        .map(p => cartaFila(p.label, p.price, 'text-xs pl-3 text-[#5D4037] dark:text-[#D7CCC8]'))
        .join('');

    return `
    <div class="flex gap-3 items-start">
        ${foto}
        <div class="flex-1 min-w-0 space-y-0.5">${cabecera}${desc}${opciones}${variantes}</div>
    </div>`;
}

function cartaSeccionHTML(sec) {
    const rutaBanner = sec.categoryImg || sec.img;
    // Se cambia 'mb-3' por 'mt-3' para darle espacio respecto a los productos de arriba
    const bannerHTML = rutaBanner
        ? `<img src="${rutaBanner}" alt="${sec.title}" data-foto="${rutaBanner}" data-titulo="${sec.title}" class="w-1/2 mx-auto h-24 object-cover rounded-2xl mt-3 shadow-sm border border-[#E8D5C4] cursor-zoom-in block" loading="lazy" onerror="this.remove()">`
        : '';

    const cuerpo = sec.layout === 'grid'
        ? `<div class="grid grid-cols-2 gap-x-3 gap-y-2 leading-tight">${sec.items.map(i => cartaItemHTML(i)).join('')}</div>`
        : `<div class="space-y-3.5 leading-normal">${sec.items.map(cartaItemHTML).join('')}</div>`;

    const nota = sec.note
        ? `<p class="mt-4 text-xs font-bold text-[#6F472E] dark:text-[#E0A96D] bg-[#F5EBE0] dark:bg-[#3E2B20] rounded-lg px-3 py-1.5 inline-block">${sec.note}</p>` : '';

    return `
    <article class="break-inside-avoid mb-5 rounded-3xl bg-[#FFFDF9] dark:bg-[#231710] border border-[#E8D5C4] dark:border-[#4A3525] shadow-sm p-5 sm:p-6">
        <h3 class="font-serif text-xl font-bold text-[#5C3A21] dark:text-[#E0A96D] mb-4 flex items-center gap-2.5">
            <span class="w-8 h-8 rounded-full bg-[#F5EBE0] dark:bg-[#3E2B20] flex items-center justify-center text-sm text-[#8C603F] dark:text-[#E0A96D]"><i class="fa-solid ${sec.icon}"></i></span>
            ${sec.title}
        </h3>
        ${cuerpo}
        ${bannerHTML}
        ${nota}
    </article>`;
}

function renderCarta() {
    const cont = document.getElementById('carta-contenido');
    if (!cont) return;

    cont.innerHTML = cartaData[cartaTabActual].map(cartaSeccionHTML).join('');

    document.querySelectorAll('[data-carta-tab]').forEach(btn => {
        const activo = btn.dataset.cartaTab === cartaTabActual;
        btn.className = 'px-6 py-2.5 rounded-full text-sm font-bold transition-all ' + (activo
            ? 'bg-[#8C603F] text-white shadow-md'
            : 'bg-[#FFFDF9] dark:bg-[#231710] text-[#5D4037] dark:text-[#D7CCC8] border border-[#E8D5C4] dark:border-[#4A3525] hover:bg-[#F5EBE0] dark:hover:bg-[#3E2B20]');
    });

    requestAnimationFrame(escalarCartaParaMovil);
}

function cambiarCartaTab(tab) {
    cartaTabActual = tab;
    renderCarta();
}

function escalarCartaParaMovil() {
    const wrapper = document.getElementById('carta-scaler-wrapper');
    const canvas = document.getElementById('carta-pc-canvas');
    if (!wrapper || !canvas) return;

    canvas.style.transform = 'none';
    wrapper.style.height = 'auto';

    const availableWidth = wrapper.clientWidth;
    const targetWidth = 850;

    if (availableWidth < targetWidth && availableWidth > 0) {
        const scale = availableWidth / targetWidth;
        canvas.style.transformOrigin = 'top center';
        canvas.style.transform = `scale(${scale})`;
        
        const unscaledHeight = canvas.offsetHeight;
        wrapper.style.height = `${unscaledHeight * scale}px`;
    } else {
        canvas.style.transform = 'none';
        wrapper.style.height = 'auto';
    }
}

function abrirFotoCarta(src, titulo) {
    const visor = document.createElement('div');
    visor.className = 'fixed inset-0 z-[100] bg-black/80 flex flex-col items-center justify-center p-4 gap-3 cursor-zoom-out';
    visor.innerHTML = `<img src="${src}" alt="${titulo}" class="max-h-[80vh] max-w-full rounded-2xl shadow-2xl object-contain"><p class="text-white font-serif text-lg">${titulo}</p>`;
    visor.addEventListener('click', () => visor.remove());
    document.body.appendChild(visor);
}

document.addEventListener('DOMContentLoaded', () => {
    renderCarta();
    
    const cont = document.getElementById('carta-contenido');
    if (cont) {
        cont.addEventListener('click', e => {
            const img = e.target.closest('[data-foto]');
            if (img) abrirFotoCarta(img.dataset.foto, img.dataset.titulo);
        });
    }

    window.addEventListener('resize', escalarCartaParaMovil);
});