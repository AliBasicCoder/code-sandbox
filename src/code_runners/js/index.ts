import { writeFileSync, readFileSync } from "fs";
import { makeTemplate } from "./makeTemplate";

export const jsFileRunner = (
  filePathInActual: string,
  filePathInCache: string,
  dirWhereSandboxRunIn: string,
  fileWhereLikeItWas: string
) => {
  writeFileSync(
    filePathInCache,
    makeTemplate(
      readFileSync(filePathInActual, "utf8"),
      dirWhereSandboxRunIn,
      fileWhereLikeItWas
    )
  );
  return `node ${filePathInCache}`;
};