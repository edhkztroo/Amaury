import { Article, Award, Book, SectionId } from './types';

export { SectionId };

export const ARTICLES_ROUTE = '#/articulos';
export const getArticleRoute = (slug: string) => `#/articulos/${slug}`;

export const BRAND_NAME = "AMAURY MOGOLLÓN";
export const BRAND_ROLE = "Consultor Político";

export const SOCIAL_LINKS = {
  twitter: "@amaury_mogollon",
  instagram: "@amaurymogollon",
  web: "amaurymogollon.com"
};

export const NAV_ITEMS = [
  { label: "Biografía", href: `#${SectionId.BIO}` },
  { label: "Premios", href: `#${SectionId.AWARDS}` },
  { label: "Libros", href: `#${SectionId.BOOKS}` },
  { label: "Artículos", href: ARTICLES_ROUTE },
  { label: "Consultoría", href: `#${SectionId.CONSULTING}` },
  { label: "Cine", href: `#${SectionId.FILM}` },
  { label: "Contacto", href: `#${SectionId.CONTACT}` },
];

export const AWARDS: Award[] = [
  {
    id: '1',
    organization: 'ALACOP',
    title: 'MEJOR CAMPAÑA ELECTORAL DE LATINOAMÉRICA',
    year: 'GANADOR',
  },
  {
    id: '2',
    organization: 'NAPOLITAN VICTORY AWARDS',
    title: 'MEJOR INNOVACIÓN POLÍTICA',
    year: 'GANADOR',
  },
  {
    id: '3',
    organization: 'REED LATINO',
    title: 'CONSULTOR REVELACIÓN DEL AÑO',
    year: 'GANADOR',
  },
  {
    id: '4',
    organization: 'REED LATINO',
    title: 'MEJOR CAMPAÑA DE IDENTIDAD PARTIDISTA',
    year: 'GANADOR',
  },
  {
    id: '5',
    organization: 'PREMIOS ALACOP',
    title: 'MEJOR PUBLICACIÓN IMPRESA',
    year: '2018',
  },
  {
    id: '6',
    organization: 'NAPOLITAN VICTORY AWARDS',
    title: 'MEJOR JINGLE ELECTORAL',
    year: 'GANADOR',
  },
];

export const BOOKS: Book[] = [
  {
    id: '1',
    title: 'SOY MILLENNIAL',
    subtitle: 'DESCIFRANDO EL CEREBRO DEL VOTO MILLENNIAL',
    date: '2017',
    description: 'Un análisis profundo sobre la cohorte poblacional que tiene la responsabilidad de transformar el mundo. El libro explora cómo piensan, sienten y votan los millennials en el contexto político actual.',
    coverImage: '/cover-soy-millennial.png'
  },
  {
    id: '2',
    title: 'LA EVOLUCIÓN DE LA IZQUIERDA',
    subtitle: 'EN AMÉRICA LATINA',
    date: '2021',
    description: 'Un recorrido histórico y político por los movimientos de izquierda en la región.',
    coverImage: '/cover-izquierda.png'
  }
];

export const ARTICLES: Article[] = [
  {
    id: '1',
    slug: 'narrativa-politica-votante-joven',
    title: 'Cómo construir una narrativa política que conecte con el votante joven',
    category: 'Estrategia',
    date: 'Mayo 2026',
    readTime: '5 min',
    excerpt: 'Una mirada práctica a los códigos culturales, emociones y formatos que hoy convierten interés en movilización política real.',
    coverImage: '/amaury-hero.png',
    href: getArticleRoute('narrativa-politica-votante-joven'),
    featured: true,
    content: [
      'La conversación política con audiencias jóvenes ya no se gana con solemnidad ni con discursos cerrados. Se gana entendiendo sus códigos culturales, sus preocupaciones materiales y la forma en que construyen confianza en entornos saturados de estímulos.',
      'Una narrativa eficaz no empieza diciendo qué quiere el candidato decir. Empieza descubriendo qué tensión vive hoy ese votante: incertidumbre, falta de representación, precariedad, deseo de movilidad o cansancio frente al lenguaje político tradicional.',
      'Cuando esa tensión está clara, el mensaje debe simplificarse sin volverse superficial. La claridad emocional, la consistencia estética y la repetición inteligente son más poderosas que el exceso de promesas o tecnicismos.',
      'La narrativa también necesita prueba social. Testimonios, escenas cotidianas, voceros creíbles y formatos nativos para cada plataforma ayudan a que el mensaje parezca parte de la conversación y no una interrupción publicitaria.',
    ],
  },
  {
    id: '2',
    slug: 'campanas-territoriales-digital',
    title: 'Campañas territoriales: lo digital funciona mejor cuando nace del territorio',
    category: 'Campañas',
    date: 'Abril 2026',
    readTime: '4 min',
    excerpt: 'Ideas para alinear estructura de calle, liderazgo local y contenido digital sin perder autenticidad ni dirección estratégica.',
    coverImage: '/bio.jpg',
    href: getArticleRoute('campanas-territoriales-digital'),
    content: [
      'Muchas campañas separan artificialmente el territorio y lo digital. El resultado suele ser una operación desalineada: la calle dice una cosa, las redes dicen otra y el electorado percibe una marca política poco orgánica.',
      'Lo digital funciona mejor cuando documenta, amplifica y ordena lo que realmente ocurre en el territorio. Esa lógica convierte cada recorrido, reunión, activación o conversación ciudadana en insumo narrativo con valor político.',
      'Para lograrlo, hace falta una estructura simple: mensajes prioritarios, responsables claros por zona, captura constante de contenido y criterio editorial para transformar actividad territorial en piezas útiles para cada canal.',
      'La autenticidad no aparece por accidente. Se diseña cuando el equipo entiende que la mejor comunicación no siempre es la más producida, sino la que transmite presencia, escucha y capacidad real de organización.',
    ],
  },
  {
    id: '3',
    slug: 'comunicacion-gobierno-atencion-fragmentada',
    title: 'Comunicación de gobierno en tiempos de atención fragmentada',
    category: 'Gobierno',
    date: 'Marzo 2026',
    readTime: '6 min',
    excerpt: 'Claves para explicar gestión pública con claridad, ritmo y sentido ciudadano en un entorno dominado por la inmediatez.',
    coverImage: '/amaury-hero.png',
    href: getArticleRoute('comunicacion-gobierno-atencion-fragmentada'),
    content: [
      'Gobernar y comunicar no son tareas separadas. En contextos de atención fragmentada, la gestión que no se explica con claridad pierde valor político incluso cuando produce resultados concretos.',
      'La ciudadanía no procesa informes extensos ni cronologías administrativas. Procesa señales simples: qué cambió, por qué importa, quién se beneficia y cómo esa acción mejora la vida cotidiana.',
      'Por eso, la comunicación de gobierno necesita ritmo. No se trata de publicar más, sino de construir una secuencia narrativa que combine avances, contexto, evidencia y tono humano.',
      'Una buena estrategia también evita el triunfalismo. Explicar dificultades, mostrar proceso y sostener consistencia entre anuncio y ejecución fortalece la credibilidad mucho más que la propaganda vacía.',
    ],
  },
];

export const TEXT_CONTENT = {
  hero: {
    title: "AMAURY MOGOLLÓN",
    role: "Consultor Político",
    cta: "Contactar"
  },
  bio: {
    title: "Biografía",
    text: "Venezolano. Máster en Asesoramiento de Imagen y Consultoría Política (MAICOP) por la Universidad Pontificia de Salamanca (España); Postgrado en Publicidad y Marketing en la UCAB (Venezuela); y Programa Internacional en Liderazgo Político por el IESA (Venezuela).\n\nDirector General de Acción Política, consultora en Estrategia Política, Campañas Electorales y Comunicación de Gobiernos Iberoamericanos con presencia en México, Colombia y Venezuela. También es Director General de AP Films, productora especializada en contenidos políticos latinoamericanos.\n\nAutor de 'Soy Millennial: descifrando el cerebro del voto millennial' (2017) y 'La evolución de la izquierda en América Latina' (2021). Docente invitado en universidades de Venezuela, España, Colombia, México y Paraguay.\n\nEn 2022 recibió el título honorífico de Doctor Honoris Causa de la Secretaría de Educación Pública de México por su aporte a la formación de líderes en América Latina. Es miembro activo de IAPC, ACOP y ALICE. Director para Venezuela de ALACOP y Vicepresidente de AVENCOPOL."
  },
  consulting: {
    name: "ACCIÓN POLÍTICA",
    subtitle: "Estrategia Política & Comunicación",
    description: "Fundada en 2014, Acción Política es una firma de consultoría conformada por un equipo multidisciplinario. Especializada en el diseño, desarrollo e implementación de estrategias innovadoras para el asesoramiento integral de precandidatos, candidatos, gobernantes y partidos políticos.\n\nCon una trayectoria consolidada en América Latina y El Caribe, la firma combina análisis de datos, creatividad y estrategia territorial para construir narrativas ganadoras.",
    cta: "Conoce más de AP"
  },
  film: {
    title: "HIJOS DE LA REVOLUCIÓN",
    role: "PRODUCTOR DE CINE",
    description: "Amaury Mogollón ha emprendido una gira en distintos festivales de Cine de los Estados Unidos, Latinoamérica y Europa, donde su Ópera Prima “Hijos de la Revolución” ha logrado representar a Venezuela. Al mes de agosto de 2024 cuenta con 19 lauros internacionales.\n\nActualmente, el film se encuentra censurado por el gobierno de Nicolás Maduro y no ha podido ser proyectado en los cines de su natal país, Venezuela.",
    cta: "más info"
  }
};
