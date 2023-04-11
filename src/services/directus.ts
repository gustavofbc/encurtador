import { Directus, TypeMap } from "@directus/sdk";

const password = process.env.DIRECTUS_PASSWORD!;
const email = process.env.DIRECTUS_EMAIL!;
const url = process.env.DIRECTUS_URL!;

const directusPublic = new Directus(url);
export default directusPublic;

// create a directus instance with credentials
export const directusAuth = async () => {
  const directus = new Directus<TypeMap>(url);
  await directus.auth.login({
    email,
    password,
  });
  return directus;
};
