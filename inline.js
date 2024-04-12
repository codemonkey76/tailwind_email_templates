// inline.js
import fs from "fs";
import juice from "juice";

const html = fs.readFileSync("./src/template.html", "utf8");
const css = fs.readFileSync("./src/output.css", "utf8");
const inlinedHtml = juice.inlineContent(html, css);

fs.writeFileSync("./public/inlined_template.html", inlinedHtml);
