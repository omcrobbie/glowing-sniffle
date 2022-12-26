import { HttpClientTestingModule } from '@angular/common/http/testing';
import { FormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { Meta, Story } from '@storybook/angular';
import { User } from 'src/app/models/user';
import { UserFormComponent } from './user-form.component';

export default {
  title: 'UserForm',
  component: UserFormComponent,
} as Meta;

const Template: Story<UserFormComponent> = (props: UserFormComponent) => ({
  props,
  moduleMetadata: {
    imports: [RouterTestingModule, HttpClientTestingModule, FormsModule],
  },
});

export const Create = Template.bind({});

export const Update = Template.bind({});
const userDefault = new User('shit', 'shit@test.com');
Update.args = {
  userDefault,
  user: userDefault,
};
