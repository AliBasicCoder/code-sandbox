import { writeFileSync, readFileSync } from "fs";
import { makeTemplate } from "./makeTemplate";
import { resolveReq } from "./resolveReq";

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
      fileWhereLikeItWas,
      resolveReq(dirWhereSandboxRunIn)
    )
  );
  return `node ${filePathInCache}`;
};