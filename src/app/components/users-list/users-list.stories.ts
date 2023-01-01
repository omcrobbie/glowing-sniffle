import { HttpClientModule } from '@angular/common/http';
import { RouterTestingModule } from '@angular/router/testing';
import { Meta, moduleMetadata, Story } from '@storybook/angular';
import { UserService } from 'src/app/services/user.service';
import { OcticonDirective } from 'src/app/utils/octicon.directive';
import { ToastComponent } from '../toast/toast.component';
import { UsersListComponent } from './users-list.component';

export default {
  title: 'UsersList',
  component: UsersListComponent,
  decorators: [
    moduleMetadata({
      declarations: [OcticonDirective, ToastComponent],
      imports: [RouterTestingModule, HttpClientModule],
      providers: [UserService],
    }),
  ],
} as Meta;

const Template: Story<UsersListComponent> = (args: UsersListComponent) => ({
  props: args,
  template: `
    <app-users-list></app-users-list>
    <app-toast></app-toast>
  `,
});
export const WithData = Template.bind({});
WithData.args = {
  users: [
    { name: 'shit', email: 'shit@test.com', id: '1' },
    { name: 'turd', email: 'turd@test.com', id: '2' },
    { name: 'drop', email: 'drop@test.com', id: '3' },
  ],
};

export const Interactive = Template.bind({});
Interactive.parameters = {
  mockData: [
    {
      url: 'http://localhost:8080/users',
      method: 'GET',
      status: 200,
      response: [
        { name: 'shit', email: 'shit@test.com', id: '1' },
        { name: 'turd', email: 'turd@test.com', id: '2' },
        { name: 'drop', email: 'drop@test.com', id: '3' },
      ],
    },
    {
      url: 'http://localhost:8080/users/:id',
      method: 'DELETE',
      status: 200,
      response: {},
    },
  ],
  storyshots: {
    disable: true,
  },
};
