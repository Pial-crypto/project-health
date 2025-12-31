import { uniqueNamesGenerator, adjectives, colors, animals } from 'unique-names-generator';

export const username = uniqueNamesGenerator({
  dictionaries: [adjectives, colors, animals],
  separator: "",
  style: "capital",
});

console.log(username); // e.g., "HappyBlueTiger"
