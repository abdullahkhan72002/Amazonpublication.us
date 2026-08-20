export const contactHeroContent = {
  title: "Contact Us",
  highlight: "Us",
  description:
    "Have questions about publishing, editing, marketing, or bringing your manuscript to life? Our team at Amazon Publication is here to guide you every step of the way. Reach out today and let's turn your publishing goals into reality.",
};

export const contactFormContent = {
  form: {
    formSource: "contact-page",
    submitLabel: "Get Started",
    fields: [
      { name: "contact-name", label: "Name", placeholder: "Name" },
      {
        name: "contact-email",
        label: "Email",
        type: "email" as const,
        placeholder: "Email",
        halfWidth: true,
      },
      {
        name: "contact-phone",
        label: "Phone",
        type: "tel" as const,
        placeholder: "Phone",
        halfWidth: true,
      },
      {
        name: "contact-message",
        label: "Message",
        placeholder: "Message",
        multiline: true,
      },
    ],
  },
};
