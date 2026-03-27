import { defineField, defineType } from "sanity";

export const contactMessageSchema = defineType({
  name: "contactMessage",
  title: "Contact Message",
  type: "document",
  fields: [
    defineField({ name: "name",        title: "Name",        type: "string",   validation: (R) => R.required() }),
    defineField({ name: "email",       title: "Email",       type: "string",   validation: (R) => R.required().email() }),
    defineField({ name: "phone",       title: "Phone",       type: "string" }),
    defineField({ name: "subject",     title: "Subject",     type: "string",   validation: (R) => R.required() }),
    defineField({ name: "message",     title: "Message",     type: "text",     validation: (R) => R.required() }),
    defineField({ name: "submittedAt", title: "Submitted At", type: "datetime", initialValue: () => new Date().toISOString() }),
  ],
  preview: {
    select: { title: "name", subtitle: "subject" },
    prepare({ title, subtitle }) { return { title: `✉️ ${title}`, subtitle }; },
  },
});
