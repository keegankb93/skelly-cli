import { readFile, writeFile, appendFile, mkdir } from "fs/promises";

const makeDir = async (name, dirPath) => {
  await mkdir(`${dirPath}${name}`);
};

const createFile = async (name, dirPath) => {
  writeFile(`${dirPath}${name}`, "");
};

const handleStructure = async (obj) => {
  if (obj.type === "file") {
    createFile(obj.name, obj.path);
  }
  if (obj.type === "folder") {
    await makeDir(obj.name, obj.path);
  }
  if (obj.children) {
    obj.children.forEach((childObj) => {
      handleStructure(childObj);
    });
  }
};

export const createSkeleton = async (fileStructureCfg) => {
  console.log(fileStructureCfg);
  const res = await readFile(new URL(`${fileStructureCfg}`, import.meta.url));

  const loadCfg = await JSON.parse(res);

  loadCfg.fileTree.forEach((obj) => {
    handleStructure(obj);
  });
};
