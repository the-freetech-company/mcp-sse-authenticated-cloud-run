import * as path from "path";
import * as fs from "fs";

/**
 * Finds the root directory of the repository by looking for package.json
 * with a name that matches "freetech-portal" or similar
 *
 * @returns The absolute path to the repository root
 */
export function findRepoRoot(): string {
  let currentDir = process.cwd();

  // Traverse up the directory tree
  while (currentDir !== path.parse(currentDir).root) {
    // Check for package.json
    const packageJsonPath = path.join(currentDir, "package.json");

    if (fs.existsSync(packageJsonPath)) {
      try {
        const packageJson = JSON.parse(
          fs.readFileSync(packageJsonPath, "utf8")
        );

        // Check if this is the root package.json
        if (
          packageJson.name === "freetech-portal" ||
          (packageJson.private === true && packageJson.workspaces)
        ) {
          return currentDir;
        }
      } catch (e) {
        // Continue if package.json can't be parsed
      }
    }

    // Move up one directory
    currentDir = path.dirname(currentDir);
  }

  // If we can't find the root, return the current working directory
  console.warn("Could not find repository root, using current directory");
  return process.cwd();
}
