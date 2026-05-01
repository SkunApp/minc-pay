import { defineField, defineType } from "sanity";
import { UsersIcon } from "@sanity/icons";

export const adminUserSchema = defineType({
  name: "adminUser",
  title: "Admin Users",
  type: "document",
  icon: UsersIcon,
  description:
    "Admin users who can access the /admin dashboard. Passwords are stored as bcrypt hashes — never plain text.",
  fields: [
    defineField({
      name: "username",
      title: "Username",
      type: "string",
      description: "Login username (case-sensitive).",
      validation: (R) =>
        R.required()
          .min(3)
          .max(40)
          .regex(/^[a-zA-Z0-9_.-]+$/, {
            name: "alphanumeric",
            invert: false,
          }),
    }),

    defineField({
      name: "displayName",
      title: "Display Name",
      type: "string",
      description: "Human-friendly name shown in logs / UI.",
      validation: (R) => R.required(),
    }),

    defineField({
      name: "passwordHash",
      title: "Password Hash",
      type: "string",
      description:
        "bcrypt hash of the password. Generate one at https://bcrypt-generator.com (12 rounds) or run: node -e \"require('bcryptjs').hash('yourpassword',12).then(console.log)\"",
      validation: (R) =>
        R.required().regex(/^\$2[aby]\$\d{2}\$.{53}$/, {
          name: "bcrypt",
          invert: false,
        }),
    }),

    defineField({
      name: "isActive",
      title: "Active",
      type: "boolean",
      description: "Deactivate to revoke access without deleting the record.",
      initialValue: true,
    }),

    defineField({
      name: "notes",
      title: "Notes",
      type: "text",
      rows: 2,
      description: "Optional — e.g. role, department.",
    }),
  ],

  preview: {
    select: {
      title: "displayName",
      subtitle: "username",
      active: "isActive",
    },
    prepare({ title, subtitle, active }) {
      return {
        title: `${title}${active === false ? " (inactive)" : ""}`,
        subtitle: `@${subtitle}`,
      };
    },
  },

  orderings: [
    {
      title: "Username A→Z",
      name: "usernameAsc",
      by: [{ field: "username", direction: "asc" }],
    },
  ],
});