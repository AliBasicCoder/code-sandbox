import { existsSync, readFileSync } from "fs";
import { join } from "path";
import { obj, pkgJson } from "../../types";

export function resolveReq(dir: string): string {
  if (!existsSync(join(dir, "package.json")))
    return "{}";
  const pkgJson: pkgJson = JSON.parse(readFileSync(join(dir, "package.json"), "utf8"));
  const obj: obj<string> = {};

  [pkgJson.dependencies, pkgJson.devDependencies]
    .forEach(dev => {
      for (const key in dev) {
        const mPkgJson = JSON.parse(readFileSync(join(dir, "node_modules", key, "package.json"), "utf8"));
        obj[key] = mPkgJson.main || "index.js";
      }
    });

  return JSON.stringify(obj);
}