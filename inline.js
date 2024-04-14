// inline.js
import fs from "fs";
import path from "path";
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

  files.forEach((file) => {
    if (path.extname(file) === ".html") {
      const srcFilePath = path.join(src, file);
      const dstFilePath = path.join(dst, file);

      fs.readFile(srcFilePath, "utf8", (err, data) => {
        if (err) {
          return console.error(
            `Failed to read file: ${srcFilePath}: ${err.message}`,
          );
        }

        const inlinedHtml = juice(data);

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
