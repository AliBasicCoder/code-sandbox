import { writeFileSync, readFileSync } from "fs";
import { makeTemplate } from "./makeTemplate";
import { resolveReq } from "./resolveReq";

export const jsFileRunner = (from: string, to: string, dir: string, file: string) => {
  writeFileSync(
    to,
    makeTemplate(
      readFileSync(from, "utf8"),
      dir,
      file,
      resolveReq(dir)
    )
  );
  return `node ${to}`;
};