import { join, parse } from "path";
import { mkdirSync, existsSync, writeFileSync, appendFileSync, readFileSync } from "fs";
import { langSupported } from "./globalVars";
import { homedir as getHomeDir } from "os";

const extName = "sandbox-vscode-extension";
const homedir = getHomeDir();

export const createIfNotExits = (path: string, dir: boolean, defaultContent?: string | Buffer) => {
  if (!existsSync(path)) {
    if (dir)
      mkdirSync(path);
    else
      writeFileSync(path, defaultContent);
  }
};

export const makeDefault = () => {
  createIfNotExits(join(homedir, extName), true);

  createIfNotExits(
    join(homedir, extName, "data.json"),
    false,
    JSON.stringify(langSupported.map(ln => ({ [ln]: [] })))
  );

  ["actual", "cache"].forEach(
    dir => {
      createIfNotExits(join(homedir, extName, dir), true);
      langSupported.forEach(
        lang =>
          createIfNotExits(join(homedir, extName, dir, lang), true)
      );
    }
  );
};

export const parsePath = (file: string) => {
  const arr = file.split(process.platform === "win32" ? "\\" : "/");
  const index = arr.indexOf(extName);
  console.log(index);
  if (index === -1)
    throw new Error("file is not sandbox");
  return {
    dir: arr[index + 1],
    lang: arr[index + 2],
    fileName: parse(arr[index + 3]).name
  };
};

export const createBase = (dir: string) =>
  (fileName: string, lang: string) =>
    join(homedir, extName, dir, lang, `${fileName}.${lang}`);

export const createInActual = createBase("actual");
export const createInCache = createBase("cache");