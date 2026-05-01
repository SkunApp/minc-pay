import { applicationSchema }    from "./application";
import { contactMessageSchema } from "./contactMessage";
import { siteSettingsSchema }   from "./siteSettings";
import { adminUserSchema }      from "./adminUser";

export const schemaTypes = [siteSettingsSchema, adminUserSchema, applicationSchema, contactMessageSchema];