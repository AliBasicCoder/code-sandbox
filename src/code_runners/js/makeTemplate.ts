
export function makeTemplate(code: string, dirname: string, filename: string) {
  return `
  (function (__dirname, __filename, require) {
    ${code}
  })
  (
    "${dirname}",
    "${filename}",
    function (arg) {
      var dirname = "${dirname}";
      var oRequire = require;
      var path = oRequire("path");
      if (path.isAbsolute(arg)) {
        return oRequire(arg);
      } else if (arg.startsWith(".")) {
        return oRequire(path.join(dirname, arg));
      }
      return oRequire(path.join(dirname, "node_modules", arg));
    }
  )`;
}