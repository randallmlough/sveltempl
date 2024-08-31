import fs, { statSync } from "fs";
import path, { join } from "path";

// Custom plugin to clean and copy files
export default function cleanCopy(relativePath: string) {
  // Directory to be cleaned and copied to
  const targetDir = path.resolve(__dirname, relativePath);
  return {
    name: "clean-and-copy-plugin",
    writeBundle() {
      // Clean the target directory
      fs.rmSync(targetDir, { recursive: true, force: true });
      console.log(`Emptied ${targetDir}`);

      // Ensure the target directory exists
      fs.mkdirSync(targetDir, { recursive: true });

      // Copy files
      const srcDir = path.resolve(__dirname, "./dist");
      fs.readdirSync(srcDir).forEach((file) => {
        const filePath = join(srcDir, file);
        if (statSync(filePath).isDirectory()) {
          return;
        }
        const srcFile = path.resolve(srcDir, file);
        const destFile = path.resolve(targetDir, file);
        fs.copyFileSync(srcFile, destFile);
        console.log(`Copied ${srcFile} to ${destFile}`);
      });
    },
  };
}
