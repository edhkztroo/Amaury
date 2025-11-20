import { Award, Book, SectionId } from './types';

export { SectionId };

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