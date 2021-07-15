import { mkdir, writeFile, readFile } from "fs/promises";
import inquirer from "inquirer";
import shell from "shelljs";

export const newTempDir = async () => {
  const updatePath = async (currPath, name) => {
    const res = await readFile(`${currPath}/${name}/configs/commands.json`);
    const updateCommandPath = await JSON.parse(res);

    updateCommandPath.commands.forEach((command) => {
      let tempSplit = command.path.split("/");
      let isConfig = (txt) => txt === "configs";
      let cfgIdx = tempSplit.findIndex(isConfig);
      command.path = `${currPath}/${name}/${tempSplit
        .splice(cfgIdx)
        .join("/")}`;
    });
    writeFile(
      `${currPath}/${name}/configs/commands.json`,
      JSON.stringify(updateCommandPath)
    );

    writeFile(
      new URL(`../configs/tempDir.json`, import.meta.url),
      JSON.stringify({
        path: `${currPath}/${name}/configs/commands.json`,
        custom: true,
      })
    );
  };

  const createNewTempDir = async (name) => {
    await mkdir(`./${name}`);
    shell.cp(
      "-R",
      new URL(`../configs`, import.meta.url).toString().slice(7),
      `${name}`
    );
    shell.cp(
      "-R",
      new URL(`../templates`, import.meta.url).toString().slice(7),
      `${name}`
    );
    updatePath(shell.pwd(), name);
  };

  const question = [
    {
      type: "confirm",
      name: "directoryCheck",
      message:
        "Please confirm that you are in the directory you want to create a new template directory in.",
    },
  ];

  const answers = await inquirer.prompt(question);

  if (!answers.directoryCheck) {
    console.log(`\nPlease cd to the correct directory and re-enter skelly -td`);
    process.exit(0);
  }

  const followQuestion = [
    {
      type: "input",
      name: "folderName",
      message: "Input a name for your directory",
    },
  ];

  const followAnswers = await inquirer.prompt(followQuestion);

  createNewTempDir(followAnswers.folderName);
};
