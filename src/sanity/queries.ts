export const ALL_APPLICATIONS_QUERY = `
  *[_type == "application"] | order(submittedAt desc) {
    "id": _id,
    businessName,
    ownerFirstName,
    ownerLastName,
    email,
    phone,
    businessType,
    monthlyVolume,
    message,
    status,
    submittedAt,
    applicantType,
    companyRegistrationDoc,
    directorIdDoc,
    proofOfBankDoc
  }
`;

export const APPLICATION_BY_ID_QUERY = `
  *[_type == "application" && _id == $id][0] {
    "id": _id,
    businessName,
    ownerFirstName,
    ownerLastName,
    email,
    phone,
    businessType,
    monthlyVolume,
    message,
    status,
    submittedAt,
    applicantType,
    companyRegistrationDoc,
    directorIdDoc,
    proofOfBankDoc
  }
`;

export const ALL_CONTACT_MESSAGES_QUERY = `
  *[_type == "contactMessage"] | order(submittedAt desc) {
    "id": _id,
    name,
    email,
    phone,
    subject,
    message,
    submittedAt
  }
`;

export const SITE_SETTINGS_QUERY = `
  *[_type == "siteSettings"][0] {
    brandName,
    supportEmail,
    supportPhoneDisplay,
    supportPhoneE164,
    whatsAppNumberE164,
    supportHours,
    addressLine1,
    addressLine2,
    city,
    region,
    postalCode,
    country,
    socialLinks[]{ label, url },
    legalLinks[]{ label, href }
  }
`;

export const ADMIN_USERS_QUERY = `
  *[_type == "adminUser" && isActive == true] {
    username,
    passwordHash
  }
`;
