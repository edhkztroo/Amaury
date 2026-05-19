import { defineField, defineType } from 'sanity';

export const articleType = defineType({
  name: 'article',
  title: 'Artículos',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Título',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'title',
        maxLength: 96,
      },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'category',
      title: 'Categoría',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'publishedAt',
      title: 'Fecha de publicación',
      type: 'datetime',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'readTime',
      title: 'Tiempo de lectura',
      type: 'string',
      description: 'Ejemplo: 5 min',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'excerpt',
      title: 'Extracto',
      type: 'text',
      rows: 4,
      validation: (rule) => rule.required().max(260),
    }),
    defineField({
      name: 'coverImage',
      title: 'Imagen de portada',
      type: 'image',
      options: {
        hotspot: true,
      },
    }),
    defineField({
      name: 'featured',
      title: 'Artículo destacado',
      type: 'boolean',
      initialValue: false,
    }),
    defineField({
      name: 'content',
      title: 'Contenido',
      type: 'text',
      rows: 18,
      description: 'Separa párrafos dejando una línea en blanco entre ellos.',
      validation: (rule) => rule.required(),
    }),
  ],
  preview: {
    select: {
      title: 'title',
      subtitle: 'category',
      media: 'coverImage',
    },
    prepare(selection) {
      return {
        title: selection.title,
        subtitle: selection.subtitle,
        media: selection.media,
      };
    },
  },
});

