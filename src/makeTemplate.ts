
export function makeTemplate(code: string, dirname: string, filename: string, reqObj: string) {
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
      var join = oRequire("path").join;
      var obj = ${reqObj};
      return oRequire(join(dirname, "node_modules", arg, obj[arg]));
    }
  )`;
}