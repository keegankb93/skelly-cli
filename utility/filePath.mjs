export const filePath = (file) => {
  const directory = new URL(`../templates/${file}`, import.meta.url);
  return directory;
};
