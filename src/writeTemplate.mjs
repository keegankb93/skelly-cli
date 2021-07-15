import { readFile, writeFile } from "fs/promises";

export const writeTemplate = async (templatePath) => {
  const getDirPath = await readFile(
    new URL(`../configs/tempDir.json`, import.meta.url)
  );

  const readDirPath = await JSON.parse(getDirPath);
  let customPath = readDirPath.path.split("/");
  customPath.splice(-2);
  customPath = customPath.join("/");

  if (readDirPath.custom) {
    const getHTML = await readFile(`${customPath}/${templatePath}`, "utf-8");
    console.log(getHTML);

    return getHTML;
  } else {
    const getHTML = await readFile(
      new URL(`../${templatePath}`, import.meta.url),
      "utf-8"
    );
    console.log(getHTML);
    return getHTML;
  }
};
