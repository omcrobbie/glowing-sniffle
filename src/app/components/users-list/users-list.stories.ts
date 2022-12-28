import { Meta, Story } from '@storybook/angular';
import { UserService } from 'src/app/services/user.service';
import { OcticonDirective } from 'src/app/utils/octicon.directive';
import { UsersListComponent } from './users-list.component';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientModule } from '@angular/common/http';
import { of } from 'rxjs';

export default {
  title: 'UsersList',
  component: UsersListComponent,
} as Meta;

const Template: Story<UsersListComponent> = (args: UsersListComponent) => ({
  props: args,
  moduleMetadata: {
    declarations: [OcticonDirective],
    imports: [RouterTestingModule, HttpClientModule],
    providers: [UserService],
  },
});
export const withData = Template.bind({});
withData.args = {
  users$: of([
    { name: 'shit', email: 'shit@test.com', id: '1' },
    { name: 'turd', email: 'turd@test.com', id: '2' },
    { name: 'drop', email: 'drop@test.com', id: '3' },
  ]),
};

export const interactive = Template.bind({});
interactive.parameters = {
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
