import sanityCient from "@sanity/client";
import imageUrlBuilder from "@sanity/image-url";

export const client = sanityCient({
  projectId: "jha0muzy",
  dataset: "production",
  apiVersion: "2022-10-28",
  useCdn: true,
  token: process.env.NEXT_PUBLIC_SANITY_TOKEN,
});

const builder = imageUrlBuilder(client);
export const urlFor = (source) => builder.image(source);
