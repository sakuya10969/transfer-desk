module.exports = {
  src: ".",
  schema: "./schema.graphql",
  exclude: ["**/node_modules/**", "**/__generated__/**", ".next/**"],
  language: "typescript",
  artifactDirectory: "./__generated__",
};
