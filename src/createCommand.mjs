import { writeFile, readFile } from "fs/promises";
import { locate } from "../utility/locateCommandsFile.mjs";
import inquirer from "inquirer";

export const createCommand = async () => {
  const getCommands = await locate();
  console.log(
    `To create a command enter in a name, short name, and description. I'll do the rest!\n`
  );
  const questions = [
    {
      type: `input`,
      name: `name`,
      message: `Enter a name (must be the same name as your template file with no extension): `,
    },
    {
      type: `input`,
      name: `shortName`,
      message: `Enter in a short name/single letter (ex: c): `,
    },
    {
      type: `input`,
      name: `description`,
      message: `Enter in a short description: `,
    },
  ];
  const answers = await inquirer.prompt(questions);
  const checkName = getCommands.commands.filter(
    (command) => command.name === answers.name
  );
  const checkShortName = getCommands.commands.filter(
    (command) => command.shortName === answers.shortName
  );

  if (checkName.length !== 0 || checkShortName.length !== 0) {
    throw new Error(
      "A command with that name or shortname already exists! Please try again.\n"
    );
  }

  let savePath = await readFile(
    new URL("../configs/tempDir.json", import.meta.url)
  );

  savePath = await JSON.parse(savePath);
  let splitPath = savePath.path.split("/");
  splitPath.pop();
  splitPath = splitPath.join("/");

  splitPath = savePath.custom ? splitPath : "../configs";

  const newCommand = {
    path: `${splitPath}/template-configs/${answers.name}.json`,
    name: `${answers.name}`,
    shortName: `${answers.shortName}`,
    description: `${answers.description}`,
  };

  getCommands.commands.push(newCommand);
  if (savePath.custom) {
    writeFile(`${savePath.path}`, JSON.stringify(getCommands));
  } else {
    writeFile(
      new URL(`../configs/commands.json`, import.meta.url),
      JSON.stringify(getCommands)
    );
  }
};
