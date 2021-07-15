import { readFile, writeFile } from "fs/promises";
import inquirer from "inquirer";

export const locate = async () => {
  const locateCommandsFile = await readFile(
    new URL("../configs/tempDir.json", import.meta.url)
  );
  const readLocation = await JSON.parse(locateCommandsFile);
  let commandsLocation;
  let getCommands;

  try {
    if (readLocation.custom) {
      commandsLocation = readLocation.path;
      getCommands = await readFile(commandsLocation);
    } else {
      getCommands = await readFile(
        new URL("../configs/commands.json", import.meta.url)
      );
    }
  } catch (e) {
    console.error(e);
    const answers = await inquirer.prompt([
      {
        type: "confirm",
        name: "fix",
        message:
          "It looks like you deleted your directory. Would you like me to fix it? After I'm done, type skelly -td",
      },
    ]);
    if (answers.fix) {
      await writeFile(
        new URL(`../configs/tempDir.json`, import.meta.url),
        JSON.stringify({
          path: "",
          custom: false,
        })
      );
    }
    process.exit(0);
  }
  getCommands = await JSON.parse(getCommands);
  return getCommands;
};
