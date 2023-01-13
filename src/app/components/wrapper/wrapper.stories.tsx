import { Meta, Story } from "@storybook/angular";
import { UserForm } from "src/react/components/UserForm";
import { UsersList } from "src/react/components/UsersList";
import { CustomReactComponentWrapperComponent } from "./wrapper.component";

export default {
  title: "Wrapper",
  component: CustomReactComponentWrapperComponent,
} as Meta;

const Template: Story<CustomReactComponentWrapperComponent> = (args) => ({
  props: args,
  template: `<app-wrapper [Component]="Component" [props]="props"></app-wrapper>`,
});

export const ReactUserList = Template.bind({});
ReactUserList.args = {
  Component: UsersList,
  props: {
    users: [
      { name: "test", email: "test@test.com", id: "1" },
      { name: "test2", email: "test2@test.com", id: "2" },
      { name: "test3", email: "test3@test.com", id: "3" },
    ],
  },
};

export const ReactUpdateForm = Template.bind({});
ReactUpdateForm.args = {
  Component: UserForm,
  props: {
    user: { name: "test", email: "test@test.com", id: "1" },
  },
};

export const ReactAddForm = Template.bind({});
ReactAddForm.args = {
  ...ReactUpdateForm.args,
  props: {},
};
