import { readFile, writeFile, mkdir } from "fs/promises";
import { filePath } from "../utility/filePath.mjs";
import inquirer from "inquirer";

export const basic = async () => {
  const newIndex = await readFile(filePath(`index.html`), "utf-8");

  const questions = [
    {
      type: "input",
      name: "name",
      message: "Website working title:",
    },
  ];

  const answers = await inquirer.prompt(questions);

  const updatedIndex = newIndex
    .replace(/{title}/g, `${answers.name}`)
    .replace(
      `{description}`,
      `This is a quick test of a static website skeleton structure`
    );

  writeFile("./index.html", updatedIndex);
  await mkdir("./css", { recursive: true });
  writeFile("./css/main.css", "");
  await mkdir("./js", { recursive: true });
  writeFile("./js/index.js", "");
  mkdir("./images", { recursive: true });
};
