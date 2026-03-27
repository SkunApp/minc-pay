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
    submittedAt
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
    submittedAt
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
