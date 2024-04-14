// inline.js
import fs from "fs";
import path from "path";
//import inlineCss from "inline-css";
import juice from "juice";

const src = "./src";
const dst = "./dist";

if (!fs.existsSync(dst)) {
  fs.mkdirSync(dst, { recursive: true });
}

fs.readdir(src, (err, files) => {
  if (err) {
    return console.error(`Failed to read directory: ${src}: ${err.message}`);
  }
  const css = fs.readFileSync("./src/output.css", "utf8");

  files.forEach((file) => {
    if (path.extname(file) === ".html") {
      const srcFilePath = path.join(src, file);
      const dstFilePath = path.join(dst, file);

      fs.readFile(srcFilePath, "utf8", async (err, data) => {
        if (err) {
          return console.error(
            `Failed to read file: ${srcFilePath}: ${err.message}`,
          );
        }

        /*        const inlinedHtml = await inlineCss(data, {
          url: " ",
          applyStyleTags: true,
          removeStyleTags: false,
        }); */

        const inlinedHtml = juice.inlineContent(data, css);

        fs.writeFile(dstFilePath, inlinedHtml, "utf8", (err) => {
          if (err) {
            return console.error(
              `Failed to write file: ${dstFilePath}: ${err.message}`,
            );
          } else {
            console.log(`Successfully inlined CSS in: ${dstFilePath}`);
          }
        });
      });
    }
  });
});
