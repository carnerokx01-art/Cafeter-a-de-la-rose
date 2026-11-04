// Base de Datos Oficial Completa con Variantes, Temperaturas y Proteínas - De La Rose
const menuItems = [
    // ================= PARA EL DÍA (DESAYUNOS Y BAGUETTES) =================
    {
        id: 1,
        title: "Chilaquiles Tradicionales",
        category: "dia",
        price: 85,
        tag: "Desayuno",
        badgeColor: "bg-amber-600",
        description: "Con salsa verde o roja, acompañados con frijoles puercos y ensalada.",
        optionsLabel: "Elige la Salsa",
        options: ["Salsa Verde", "Salsa Roja"],
        image: "./Fotos DelaRose/platillos/chilaquiles tradicionales.jpg"
    },
    {
        id: 2,
        title: "Chilaquiles Especiales",
        category: "dia",
        price: 120,
        tag: "Especialidad",
        badgeColor: "bg-roseblue-500",
        description: "Acompañados de frijoles puercos, ensalada y proteína a elegir.",
        optionsLabel: "Elige tu Proteína",
        options: ["Tocino", "Huevo", "Arrachera", "Pollo"],
        image: "./Fotos DelaRose/platillos/chilaquiles especiales.jpeg"
    },
    {
        id: 3,
        title: "Desayuno Americano",
        category: "dia",
        price: 110,
        tag: "Popular",
        badgeColor: "bg-rosecoffee-800",
        description: "3 piezas de hotcakes, huevo revuelto o estrellado y 4 tiras de tocino.",
        optionsLabel: "Preparación del Huevo",
        options: ["Huevo Revuelto", "Huevo Estrellado"],
        image: "./Fotos DelaRose/platillos/desayuno americano.jpeg"
    },
    {
        id: 4,
        title: "Huevos al Gusto",
        category: "dia",
        price: 90,
        tag: "Desayuno",
        badgeColor: "bg-roseblue-400",
        description: "Preparados al gusto, acompañados con frijoles puercos y ensalada.",
        image: ""
    },
    {
        id: 5,
        title: "Club Sándwich",
        category: "dia",
        price: 120,
        tag: "Clásico",
        badgeColor: "bg-rosecoffee-800",
        description: "Incluye pollo, jamón, tocino, queso amarillo y acompañamiento de papas a la francesa.",
        image: "./Fotos DelaRose/platillos/Club sandwich.jpeg"
    },
    {
        id: 6,
        title: "Sándwich de Pollo",
        category: "dia",
        price: 40,
        tag: "Sándwich",
        badgeColor: "bg-slate-600",
        description: "Sándwich clásico de pollo.",
        optionsLabel: "Elige tu Acompañamiento",
        optionsWithPrice: [
            { name: "Sencillo", price: 40 },
            { name: "Con Ensalada", price: 55 },
            { name: "Con Papas a la Francesa", price: 80 }
        ],
        image: "./Fotos DelaRose/platillos/sandwich de pollo.jpeg"
    },
    {
        id: 7,
        title: "Sándwich de Jamón",
        category: "dia",
        price: 30,
        tag: "Sándwich",
        badgeColor: "bg-slate-600",
        description: "Sándwich clásico de jamón.",
        optionsLabel: "Elige tu Acompañamiento",
        optionsWithPrice: [
            { name: "Sencillo", price: 30 },
            { name: "Con Ensalada", price: 45 },
            { name: "Con Papas a la Francesa", price: 60 }
        ],
        image: ""
    },
    {
        id: 8,
        title: "Bowl de Yogurth",
        category: "dia",
        price: 65,
        tag: "Saludable",
        badgeColor: "bg-emerald-600",
        description: "Arándano, pasa, almendra, granola, fresa, zarzamora, plátano y yogurth natural.",
        image: "./Fotos DelaRose/platillos/bowl de yogurth.jpeg"
    },
    {
        id: 9,
        title: "Molletes Tradicionales",
        category: "dia",
        price: 70,
        tag: "Molletes",
        badgeColor: "bg-rosecoffee-800",
        description: "Molletes tradicionales con queso gratinado y frijoles.",
        image: ""
    },
    {
        id: 10,
        title: "Molletes Con Carne",
        category: "dia",
        price: 90,
        tag: "Especial",
        badgeColor: "bg-amber-600",
        description: "Molletes con queso gratinado, frijoles y proteína a elegir. Incluye salsa mexicana.",
        optionsLabel: "Elige tu Proteína",
        options: ["Arrachera", "Carne Molida"],
        image: "./Fotos DelaRose/platillos/molletes con carne.jpg"
    },
    {
        id: 11,
        title: "Molletes Dulces",
        category: "dia",
        price: 40,
        tag: "Dulce",
        badgeColor: "bg-roseblue-400",
        description: "Molletes dulces con cobertura a elegir.",
        optionsLabel: "Elige el Sabor",
        options: ["Cajeta", "Mermelada", "Azúcar"],
        image: ""
    },
    {
        id: 12,
        title: "Hotcakes",
        category: "dia",
        price: 70,
        tag: "Dulce",
        badgeColor: "bg-roseblue-400",
        description: "Esponjosos hotcakes tradicionales servidos calientitos.",
        image: "./Fotos DelaRose/platillos/hotcakes.jpg"
    },
    {
        id: 13,
        title: "Pan Francés",
        category: "dia",
        price: 60,
        tag: "Dulce",
        badgeColor: "bg-roseblue-400",
        description: "Delicioso pan francés dorado con toque de canela y azúcar.",
        image: "./Fotos DelaRose/platillos/pan frances.jpg"
    },
    {
        id: 14,
        title: "Baguette Carnes Frías",
        category: "dia",
        price: 90,
        tag: "Baguette",
        badgeColor: "bg-rosecoffee-800",
        description: "Baguette con carnes frías y queso gratinado, acompañado de papas gajo.",
        image: "./Fotos DelaRose/platillos/baguette carnes frias.jpeg"
    },
    {
        id: 15,
        title: "Baguette Pollo",
        category: "dia",
        price: 115,
        tag: "Baguette",
        badgeColor: "bg-rosecoffee-800",
        description: "Baguette con pollo y queso gratinado, acompañado de papas gajo.",
        image: "./Fotos DelaRose/platillos/baguette de pollo.jpeg"
    },
    {
        id: 16,
        title: "Baguette Arrachera",
        category: "dia",
        price: 110,
        tag: "Baguette",
        badgeColor: "bg-rosecoffee-800",
        description: "Baguette con arrachera y queso gratinado, acompañado de papas gajo.",
        image: "./Fotos DelaRose/platillos/baguette arrachera.jpg"
    },
    {
        id: 17,
        title: "Baguette Camarón-Champiñones",
        category: "dia",
        price: 110,
        tag: "Especialidad",
        badgeColor: "bg-roseblue-500",
        description: "Baguette con camarón, champiñones y queso gratinado, acompañado con papas gajo.",
        image: "./Fotos DelaRose/platillos/baguette camaron con champiñones.jpg"
    },

    // ================= ENSALADAS =================
    {
        id: 18,
        title: "Ensalada De La Rose",
        category: "ensaladas",
        price: 80,
        tag: "Firma",
        badgeColor: "bg-roseblue-400",
        description: "Lechuga, Pepino, Arándanos, Manzana, Pollo, Crotones y Vinagreta de limón.",
        image: "./Fotos DelaRose/platillos/ensalada de la Roe.jpeg"
    },
    {
        id: 19,
        title: "Ensalada Pollo",
        category: "ensaladas",
        price: 80,
        tag: "Ensalada",
        badgeColor: "bg-emerald-600",
        description: "Lechuga, Jitomate, Zanahoria, Pepino, Crotones, Aliñado de una vinagreta de limón.",
        image: ""
    },
    {
        id: 20,
        title: "Ensalada Frutos Secos",
        category: "ensaladas",
        price: 80,
        tag: "Ensalada",
        badgeColor: "bg-emerald-600",
        description: "Lechuga, Jitomate, Zanahoria, Pepino, Crotones, Jamón, Almendra, Arándanos, Pasas, Nuez, Aliñado de vinagreta de limón y miel.",
        image: "./Fotos DelaRose/platillos/ensalada frutos secos.jpeg"
    },
    {
        id: 21,
        title: "Ensalada Dulce",
        category: "ensaladas",
        price: 80,
        tag: "Ensalada",
        badgeColor: "bg-emerald-600",
        description: "Lechuga, Pepino, Fresa, Crotones, Manzana, Arándanos, Pasas, Nuez, Aliñado de vinagreta de limón y miel.",
        image: ""
    },

    // ================= PARA LA NOCHE =================
    {
        id: 22,
        title: "Fetuccini Alfredo",
        category: "noche",
        price: 100,
        tag: "Pasta",
        badgeColor: "bg-amber-700",
        description: "Pasta Fetuccini en salsa cremosa Alfredo.",
        optionsLabel: "Elige tu Proteína / Ingrediente",
        options: ["Pollo", "Camarón", "Tocino", "Champiñones"],
        image: "./Fotos DelaRose/platillos/pasta alfredo.jpeg"
    },
    {
        id: 23,
        title: "Pasta Boloñesa",
        category: "noche",
        price: 100,
        tag: "Pasta",
        badgeColor: "bg-amber-700",
        description: "Sabor tradicional con salsa boloñesa de la casa y queso.",
        image: ""
    },

    // ================= CREPAS =================
    {
        id: 24,
        title: "Crepa Cajeta",
        category: "crepas",
        price: 60,
        tag: "Crepa Dulce",
        badgeColor: "bg-amber-600",
        description: "Rellena de cajeta, decorada con nuez, plátano y dulce de leche.",
        image: ""
    },
    {
        id: 25,
        title: "Crepa Dulce",
        category: "crepas",
        price: 70,
        tag: "Crepa Dulce",
        badgeColor: "bg-amber-600",
        description: "Rellena de queso crema con mermelada de fresa, decorada con fresas y crema de avellanas.",
        image: "./Fotos DelaRose/platillos/crepa dulce.jpeg"
    },
    {
        id: 26,
        title: "Crepa Suave",
        category: "crepas",
        price: 70,
        tag: "Crepa Dulce",
        badgeColor: "bg-amber-600",
        description: "Rellena de leche condensada, decorada con frutos rojos, fresa y chispas de chocolate blanco.",
        image: "./Fotos DelaRose/platillos/crepa suave.jpg"
    },
    {
        id: 27,
        title: "Crepa Chocolatosa",
        category: "crepas",
        price: 75,
        tag: "Crepa Dulce",
        badgeColor: "bg-amber-600",
        description: "Rellena de Nutella, decorada con fresa, galleta Oreo y chispas de chocolate.",
        image: "./Fotos DelaRose/platillos/crepa chocolatosa.jpeg"
    },
    {
        id: 28,
        title: "Crepa Salada Jamón",
        category: "crepas",
        price: 75,
        tag: "Crepa Salada",
        badgeColor: "bg-rosecoffee-800",
        description: "Rellena de queso cheddar y jamón, decorada con salsa de tomate y un toque de espinaca.",
        image: "./Fotos DelaRose/platillos/crepa jamon.jpeg"
    },
    {
        id: 29,
        title: "Crepa Salada Champiñón",
        category: "crepas",
        price: 65,
        tag: "Crepa Salada",
        badgeColor: "bg-rosecoffee-800",
        description: "Rellena de champiñón y queso cheddar, decorada con aderezo de chipotle y toque de espinaca.",
        image: "./Fotos DelaRose/platillos/crepa champiñones.jpg"
    },
    {
        id: 30,
        title: "Crepa Salada Pizza",
        category: "crepas",
        price: 80,
        tag: "Crepa Salada",
        badgeColor: "bg-rosecoffee-800",
        description: "Rellena de pepperoni y queso cheddar, decorada con salsa de tomate, queso parmesano y espinaca.",
        image: ""
    },

    // ================= WAFFLES =================
    {
        id: 31,
        title: "Waffle Churro Cheesecake",
        category: "waffles",
        price: 80,
        tag: "Especial Waffle",
        badgeColor: "bg-roseblue-500",
        description: "Fresa, plátano, queso crema, 1 bola de nieve de vainilla espolvoreado con azúcar y canela.",
        image: "./Fotos DelaRose/platillos/waffle churrocheesecake.jpeg"
    },
    {
        id: 32,
        title: "Waffle Plátano",
        category: "waffles",
        price: 55,
        tag: "Waffle",
        badgeColor: "bg-amber-600",
        description: "Acompañado con plátano, cajeta y nuez.",
        image: "./Fotos DelaRose/platillos/waffle de plátano.jpg"
    },
    {
        id: 33,
        title: "Waffle Fresa",
        category: "waffles",
        price: 60,
        tag: "Waffle",
        badgeColor: "bg-amber-600",
        description: "Mermelada de fresa, fresas frescas y chispas de chocolate blanco.",
        image: "./Fotos DelaRose/platillos/waffle de fresa.jpg"
    },
    {
        id: 34,
        title: "Waffle Chocochips",
        category: "waffles",
        price: 65,
        tag: "Waffle",
        badgeColor: "bg-amber-600",
        description: "Crema de avellanas, chispas de chocolate, plátano y fresas.",
        image: "./Fotos DelaRose/platillos/waffle de chocochips.jpg"
    },
    {
        id: 35,
        title: "Waffle Frutos Rojos",
        category: "waffles",
        price: 70,
        tag: "Waffle",
        badgeColor: "bg-amber-600",
        description: "Frutos rojos, leche condensada y chispas de chocolate blanco.",
        image: "./Fotos DelaRose/platillos/waffle frutos rojos.jpeg"
    },

    // ================= SNACKS Y TABLAS =================
    {
        id: 36,
        title: "Tabla de Carnes Frías",
        category: "snacks",
        price: 120,
        tag: "Para Compartir",
        badgeColor: "bg-rosecoffee-800",
        description: "Pepperoni, salami, salchicha, jamón, queso crema, frutos secos, frutos rojos y mermelada especial.",
        image: "./Fotos DelaRose/platillos/Tabla de carnes Frias.jpeg"
    },
    {
        id: 37,
        title: "Pizza Baguette",
        category: "snacks",
        price: 80,
        tag: "Snack",
        badgeColor: "bg-amber-600",
        description: "Piña, jamón, salami, pepperoni y salchicha en crujiente pan baguette.",
        image: "./Fotos DelaRose/platillos/Pizza baguette.jpg"
    },
    {
        id: 38,
        title: "Nachos Con Carne",
        category: "snacks",
        price: 80,
        tag: "Snack",
        badgeColor: "bg-amber-600",
        description: "Totopos con queso derretido y carne a elegir.",
        optionsLabel: "Elige tu Proteína",
        options: ["Arrachera", "Carne Molida Preparada"],
        image: "./Fotos DelaRose/platillos/nachos carne.jpg"
    },
    {
        id: 39,
        title: "Nachos Sencillos",
        category: "snacks",
        price: 60,
        tag: "Snack",
        badgeColor: "bg-slate-600",
        description: "Crujientes totopos acompañados con quesito amarillo calentito y chilitos.",
        image: "./Fotos DelaRose/platillos/nachos sencillos.jpeg"
    },
    {
        id: 40,
        title: "Papas Gajo",
        category: "snacks",
        price: 55,
        tag: "Snack",
        badgeColor: "bg-slate-600",
        description: "Sazonadas al estilo de la casa, doraditas y crujientes.",
        image: "./Fotos DelaRose/platillos/Papas gajo.jpeg"
    },
    {
        id: 41,
        title: "Papas a la Francesa",
        category: "snacks",
        price: 45,
        tag: "Snack",
        badgeColor: "bg-slate-600",
        description: "Clásicas papitas a la francesa crujientes con cátsup.",
        image: "./Fotos DelaRose/platillos/papas francesas.jpeg"
    },

    // ================= BEBIDAS CALIENTES Y CAFÉS CON FRÍO/CALIENTE =================
    {
        id: 42,
        title: "Café de Olla",
        category: "calientes",
        price: 40,
        tag: "1 Refil Incluido",
        badgeColor: "bg-rosecoffee-800",
        description: "Infusionado tradicionalmente con piloncillo y canela. Incluye 1 refil gratis.",
        image: ""
    },
    {
        id: 43,
        title: "Café Americano",
        category: "calientes",
        price: 45,
        tag: "Café",
        badgeColor: "bg-roseblue-500",
        description: "Café recién elaborado.",
        temperatures: [
            { name: "Caliente", price: 45 },
            { name: "Frío", price: 50 }
        ],
        image: ""
    },
    {
        id: 44,
        title: "Americano de Sabor",
        category: "calientes",
        price: 60,
        tag: "Especial",
        badgeColor: "bg-roseblue-400",
        description: "Americano infundido con jarabes artesanales.",
        temperatures: [
            { name: "Caliente", price: 60 },
            { name: "Frío", price: 70 }
        ],
        flavorsLabel: "Elige el Sabor",
        flavors: ["Moka", "Kahlúa", "Caramelo", "Vainilla"],
        image: ""
    },
    {
        id: 45,
        title: "Cappuccino Tradicional",
        category: "calientes",
        price: 50,
        tag: "Clásico",
        badgeColor: "bg-roseblue-400",
        description: "Espresso intenso con leche vaporizada y espuma sedosa.",
        temperatures: [
            { name: "Caliente", price: 50 },
            { name: "Frío", price: 50 }
        ],
        image: "./Fotos DelaRose/bebidas/cappuccino.jpeg"
    },
    {
        id: 46,
        title: "Cappuccino de Sabor",
        category: "calientes",
        price: 60,
        tag: "Especial",
        badgeColor: "bg-roseblue-400",
        description: "Cappuccino cremoso con el sabor que prefieras.",
        temperatures: [
            { name: "Caliente", price: 60 },
            { name: "Frío", price: 65 }
        ],
        flavorsLabel: "Elige el Sabor",
        flavors: ["Moka", "Kahlúa", "Caramelo", "Rompope", "Cajeta", "Vainilla"],
        image: "./Fotos DelaRose/bebidas/cappuccino sabor.jpg"
    },
    {
        id: 47,
        title: "Café Latte",
        category: "calientes",
        price: 50,
        tag: "Clásico",
        badgeColor: "bg-roseblue-400",
        description: "Suave mezcla de espresso con bastante leche cremada.",
        temperatures: [
            { name: "Caliente", price: 50 },
            { name: "Frío", price: 55 }
        ],
        image: "./Fotos DelaRose/bebidas/Latte.jpeg"
    },
    {
        id: 48,
        title: "Latte de Sabor",
        category: "calientes",
        price: 65,
        tag: "Especial",
        badgeColor: "bg-roseblue-400",
        description: "Latte suave infundido con el sabor de tu elección.",
        temperatures: [
            { name: "Caliente", price: 65 },
            { name: "Frío", price: 70 }
        ],
        flavorsLabel: "Elige el Sabor",
        flavors: ["Moka", "Kahlúa", "Caramelo", "Rompope", "Cajeta", "Vainilla", "Afogatto"],
        image: "./Fotos DelaRose/bebidas/latte sabor.jpg"
    },
    {
        id: 49,
        title: "Espresso",
        category: "calientes",
        price: 30,
        tag: "Intenso",
        badgeColor: "bg-rosecoffee-800",
        description: "Extracción pura de café espresso.",
        optionsLabel: "Variedad de Espresso",
        optionsWithPrice: [
            { name: "Sencillo", price: 30 },
            { name: "Doble", price: 40 },
            { name: "Afogatto", price: 50 }
        ],
        image: ""
    },
    {
        id: 50,
        title: "Chocolate De La Rose",
        category: "calientes",
        price: 50,
        tag: "Caliente",
        badgeColor: "bg-amber-800",
        description: "Rico chocolate espeso de la casa reconfortante.",
        image: "./Fotos DelaRose/bebidas/chocolate de la rose.jpeg"
    },
    {
        id: 51,
        title: "Té Chai",
        category: "calientes",
        price: 66,
        tag: "Té",
        badgeColor: "bg-emerald-600",
        description: "Infusión de té chai aromatizada con especias.",
        temperatures: [
            { name: "Caliente", price: 66 },
            { name: "Frío", price: 85 },
            { name: "Frapeado", price: 85 }
        ],
        flavorsLabel: "Elige el Sabor",
        flavors: ["Coco", "Guayaba", "Vainilla"],
        image: "./Fotos DelaRose/bebidas/chai.jpg"
    },
    {
        id: 52,
        title: "Tizana Frutal",
        category: "calientes",
        price: 75,
        tag: "Tizana",
        badgeColor: "bg-emerald-600",
        description: "Mezcla de frutas deshidratadas seleccionadas.",
        temperatures: [
            { name: "Caliente", price: 75 },
            { name: "Frío", price: 85 }
        ],
        flavorsLabel: "Elige la Mezcla",
        flavors: ["Frutos Rojos", "Fresa-Kiwi", "Frutas Tropicales"],
        image: "./Fotos DelaRose/bebidas/tizana.jpeg"
    },
    {
        id: 53,
        title: "Té Tradicional",
        category: "calientes",
        price: 26,
        tag: "Té",
        badgeColor: "bg-emerald-600",
        description: "Infusión herbal reconfortante en variados sabores y mezclas naturales.",
        temperatures: [
            { name: "Caliente", price: 26 },
            { name: "Frío", price: 30 }
        ],
        flavorsLabel: "Elige el Sabor de Té",
        flavors: [
            "Manzanilla, Hinojo y Aloe Vera",
            "Jengibre y Limón",
            "Manzanilla y Lavanda",
            "Té Negro Durazno",
            "Manzanilla",
            "Limón / Hinojo",
            "Canela / Manzana",
            "Té Frutos Rojos"
        ],
        image: ""
    },

    // ================= FRAPPÉS, MALTEADAS Y BEBIDAS FRÍAS =================
    {
        id: 54,
        title: "Frappé Especial",
        category: "frias",
        price: 55,
        tag: "Frappé",
        badgeColor: "bg-roseblue-400",
        description: "Frappé helado y cremoso decorado con crema batida.",
        optionsLabel: "Elige el Sabor",
        optionsWithPrice: [
            { name: "Clásico", price: 55 },
            { name: "Cajeta", price: 60 },
            { name: "Caramelo", price: 65 },
            { name: "Moka", price: 65 },
            { name: "Oreo", price: 70 },
            { name: "Vainilla", price: 77 },
            { name: "Nutella", price: 77 },
            { name: "Kínder", price: 77 },
            { name: "Gansito", price: 80 },
            { name: "Kahlúa", price: 80 },
            { name: "Rompope", price: 80 },
            { name: "Baileys", price: 80 },
            { name: "Ferrero", price: 80 }
        ],
        image: "./Fotos DelaRose/bebidas/frappes.jpeg"
    },
    {
        id: 55,
        title: "Malteada Cremosa",
        category: "frias",
        price: 60,
        tag: "Malteada",
        badgeColor: "bg-roseblue-400",
        description: "Cremosa malteada preparada al instante.",
        optionsLabel: "Elige el Sabor",
        optionsWithPrice: [
            { name: "Fresa", price: 60 },
            { name: "Chocolate", price: 60 },
            { name: "Vainilla", price: 60 },
            { name: "Oreo", price: 61 },
            { name: "Mazapán", price: 66 },
            { name: "Plátano", price: 67 },
            { name: "Kinder", price: 70 },
            { name: "Frutos Rojos", price: 70 },
            { name: "Chocoretas", price: 70 },
            { name: "Afogatto", price: 75 },
            { name: "Gansito", price: 77 }
        ],
        image: "./Fotos DelaRose/bebidas/malteadda affogato 2.jpeg"
    },
    {
        id: 56,
        title: "Smoothie de Fruta",
        category: "smoothies",
        price: 70,
        tag: "Smoothie",
        badgeColor: "bg-roseblue-400",
        description: "Refrescante smoothie de fruta natural.",
        optionsLabel: "Elige la Fruta",
        options: ["Fresa", "Frutos Rojos", "Cereza", "Mango (Temporada)"],
        image: "./Fotos DelaRose/bebidas/smothiesss.jpeg"
    },
    {
        id: 57,
        title: "Soda Italiana",
        category: "frias",
        price: 55,
        tag: "Refrescante",
        badgeColor: "bg-roseblue-400",
        description: "Bebida burbujeante servida con hielo.",
        optionsLabel: "Elige el Sabor",
        options: ["Fresa", "Mango", "Moras", "Frambuesa", "Kiwi"],
        image: "./Fotos DelaRose/bebidas/Soda italiana.jpeg"
    },
    {
        id: 58,
        title: "Limonada",
        category: "frias",
        price: 35,
        tag: "Bebida Fría",
        badgeColor: "bg-slate-600",
        description: "Limonada recién exprimida.",
        optionsLabel: "Elige la Variante",
        optionsWithPrice: [
            { name: "Natural", price: 35 },
            { name: "Mineral", price: 35 },
            { name: "Rosa", price: 45 },
            { name: "Fresa", price: 50 }
        ],
        image: "./Fotos DelaRose/bebidas/limonadas.jpeg"
    },
    {
        id: 59,
        title: "Naranjada",
        category: "frias",
        price: 45,
        tag: "Bebida Fría",
        badgeColor: "bg-slate-600",
        description: "Naranjada con jugo 100% natural.",
        optionsLabel: "Elige la Variante",
        options: ["Natural", "Mineral"],
        image: "./Fotos DelaRose/bebidas/naranjada.jpeg"
    },
    {
        id: 60,
        title: "Jugo Natural",
        category: "frias",
        price: 50,
        tag: "Natural",
        badgeColor: "bg-emerald-600",
        description: "Jugo fresco preparado al momento.",
        optionsLabel: "Elige la Receta",
        options: ["Zanahoria", "Naranja", "Jugo Verde"],
        image: "./Fotos DelaRose/bebidas/jugo de naranja.jpg"
    },
    {
        id: 61,
        title: "Licuado de Frutas",
        category: "frias",
        price: 50,
        tag: "Natural",
        badgeColor: "bg-emerald-600",
        description: "Licuado nutritivo con leche.",
        optionsLabel: "Elige la Fruta/Ingrediente",
        options: ["Avena", "Fresa", "Plátano", "Manzana"],
        image: "./Fotos DelaRose/bebidas/licuado.jpeg"
    },
    {
        id: 62,
        title: "Chocomilk",
        category: "frias",
        price: 33,
        tag: "Frío",
        badgeColor: "bg-slate-600",
        description: "Clásico Chocomilk frío batido con leche.",
        image: "./Fotos DelaRose/bebidas/chocomilk.jpeg"
    },
    {
        id: 63,
        title: "Refrescos",
        category: "frias",
        price: 20,
        tag: "Refresco",
        badgeColor: "bg-slate-600",
        description: "Refrescos embotellados helados.",
        optionsLabel: "Presentación",
        options: ["Lata ($20)", "Vidrio ($20)"],
        image: ""
    },
    {
        id: 64,
        title: "Botella de Agua",
        category: "frias",
        price: 20,
        tag: "Agua",
        badgeColor: "bg-slate-600",
        description: "Agua purificada embotellada.",
        image: ""
    },
    {
        id: 65,
        title: "Vaso de Leche",
        category: "frias",
        price: 15,
        tag: "Bebida",
        badgeColor: "bg-slate-600",
        description: "Vaso de leche fresca fría o caliente.",
        image: ""
    }
];

