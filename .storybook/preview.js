import { setCompodocJson } from "@storybook/addon-docs/angular";
import docJson from "../documentation.json";

const allFields = docJson.components
  ?.map((c) => [...(c.propertiesClass || []), ...(c.inputsClass || [])])
  .flat();

// https://github.com/storybookjs/storybook/issues/17004
allFields.forEach((p) => {
  if (p.type === "number") {
    p.defaultValue = +p.defaultValue;
  } else {
    delete p.defaultValue;
  }
});
setCompodocJson(docJson);

export const parameters = {
  actions: { argTypesRegex: "^on[A-Z].*" },
  controls: {
    matchers: {
      color: /(background|color)$/i,
      date: /Date$/,
    },
  },
  docs: { inlineStories: true },
};
