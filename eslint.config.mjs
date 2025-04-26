// eslint.config.mjs
import antfu from "@antfu/eslint-config";

export default antfu({
  formatters: true,
  rules: { "no-console": "warn" },
  stylistic: {
    indent: 2,
    quotes: "double",
    semi: true,
  },
});
