import { readFile, writeFile } from "fs/promises";
import { locate } from "../utility/locateCommandsFile.mjs";

export const createCommand = async () => {
  const getCommands = await locate();

  console.log(getCommands);
};
createCommand();
