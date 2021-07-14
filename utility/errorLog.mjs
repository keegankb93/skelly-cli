import { appendFile } from "fs/promises";

export const errorLog = (file, error) => {
  let date = new Date().toLocaleString();
  let debugFilePath = new URL("../debug.txt", import.meta.url);

  appendFile(debugFilePath, `${date}   ${file}   ${error}\n`);
};
