// import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";
import { Button } from "@components/atoms";

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
  title: "Example/Button",
  component: Button,
  // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
  argTypes: {
    buttonProps: {
      colorScheme: {
        options: ["twitter", "facebook"],
        control: { type: "select" },
      },
    },
  },
} as ComponentMeta<typeof Button>;

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template: ComponentStory<typeof Button> = (args) => <Button {...args} />;

export const Primary = Template.bind({});
// More on args: https://storybook.js.org/docs/react/writing-stories/args
Primary.args = {
  text: "submit",
};

export const Secondary = Template.bind({});
Secondary.args = {
  text: "send",
  buttonProps: {
    boxShadow: "md",
  },
};
