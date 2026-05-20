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
      type: 'array',
      of: [
        {
          type: 'block',
          styles: [
            { title: 'Párrafo', value: 'normal' },
            { title: 'Título intermedio', value: 'h2' },
            { title: 'Subtítulo', value: 'h3' },
            { title: 'Cita', value: 'blockquote' },
          ],
          lists: [
            { title: 'Viñetas', value: 'bullet' },
            { title: 'Numerada', value: 'number' },
          ],
          marks: {
            decorators: [
              { title: 'Negrita', value: 'strong' },
              { title: 'Cursiva', value: 'em' },
              { title: 'Subrayado', value: 'underline' },
            ],
            annotations: [
              {
                name: 'link',
                title: 'Enlace',
                type: 'object',
                fields: [
                  defineField({
                    name: 'href',
                    title: 'URL',
                    type: 'url',
                  }),
                ],
              },
            ],
          },
        },
        {
          type: 'image',
          options: {
            hotspot: true,
          },
          fields: [
            defineField({
              name: 'alt',
              title: 'Texto alternativo',
              type: 'string',
              description: 'Describe brevemente la imagen.',
            }),
            defineField({
              name: 'caption',
              title: 'Pie de foto',
              type: 'string',
            }),
          ],
        },
      ],
      description: 'Aquí ya puedes usar negritas, cursivas, listas, subtítulos, enlaces e insertar imágenes dentro del artículo.',
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
