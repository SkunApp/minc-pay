import { defineField, defineType } from "sanity";

export const applicationSchema = defineType({
  name: "application",
  title: "Merchant Application",
  type: "document",
  fields: [
    defineField({ name: "businessName",   title: "Business Name",       type: "string",   validation: (R) => R.required() }),
    defineField({ name: "ownerFirstName", title: "Owner First Name",    type: "string",   validation: (R) => R.required() }),
    defineField({ name: "ownerLastName",  title: "Owner Last Name",     type: "string",   validation: (R) => R.required() }),
    defineField({ name: "email",          title: "Email",               type: "string",   validation: (R) => R.required().email() }),
    defineField({ name: "phone",          title: "Phone",               type: "string",   validation: (R) => R.required() }),
    defineField({
      name: "businessType", title: "Business Type", type: "string",
      options: { list: [
        { title: "Retail",          value: "retail" },
        { title: "Food & Beverage", value: "food_beverage" },
        { title: "Services",        value: "services" },
        { title: "Automotive",      value: "automotive" },
        { title: "Health & Beauty", value: "health_beauty" },
        { title: "Hospitality",     value: "hospitality" },
        { title: "Other",           value: "other" },
      ]},
      validation: (R) => R.required(),
    }),
    defineField({
      name: "monthlyVolume", title: "Estimated Monthly Volume", type: "string",
      options: { list: [
        { title: "Under R10,000",       value: "under_10k" },
        { title: "R10,000 – R50,000",   value: "10k_50k" },
        { title: "R50,000 – R200,000",  value: "50k_200k" },
        { title: "R200,000 – R500,000", value: "200k_500k" },
        { title: "R500,000+",           value: "500k_plus" },
      ]},
      validation: (R) => R.required(),
    }),
    defineField({ name: "message",     title: "Additional Notes",  type: "text" }),
    defineField({
      name: "status", title: "Status", type: "string", initialValue: "pending",
      options: { list: [
        { title: "⏳ Pending",  value: "pending" },
        { title: "✅ Approved", value: "approved" },
        { title: "❌ Rejected", value: "rejected" },
      ], layout: "radio" },
      validation: (R) => R.required(),
    }),
    defineField({ name: "submittedAt", title: "Submitted At", type: "datetime", initialValue: () => new Date().toISOString() }),
  ],
  preview: {
    select: { title: "businessName", subtitle: "status", name: "ownerFirstName" },
    prepare({ title, subtitle, name }) {
      const emoji = subtitle === "approved" ? "✅" : subtitle === "rejected" ? "❌" : "⏳";
      return { title: `${emoji} ${title}`, subtitle: `${subtitle} · ${name}` };
    },
  },
});
