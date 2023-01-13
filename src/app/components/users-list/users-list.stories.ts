import { HttpClientModule } from '@angular/common/http';
import { RouterTestingModule } from '@angular/router/testing';
import { Meta, moduleMetadata, Story } from '@storybook/angular';
import { expect } from '@storybook/jest';
import { fireEvent, waitFor, within } from '@storybook/testing-library';
import { CustomReactComponentWrapperComponent } from 'src/app/components/wrapper/wrapper.component';
import { UserService } from 'src/app/services/user.service';
import { OcticonDirective } from 'src/app/utils/octicon.directive';
import { ToastComponent } from '../toast/toast.component';
import { UsersListComponent } from './users-list.component';

export default {
  title: 'UsersList',
  component: UsersListComponent,
  decorators: [
    moduleMetadata({
      declarations: [
        OcticonDirective,
        ToastComponent,
        CustomReactComponentWrapperComponent,
      ],
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
    { name: 'test', email: 'test@test.com', id: '1' },
    { name: 'test2', email: 'test2@test.com', id: '2' },
    { name: 'test3', email: 'test3@test.com', id: '3' },
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
        { name: 'test', email: 'test@test.com', id: '1' },
        { name: 'test2', email: 'test2@test.com', id: '2' },
        { name: 'test3', email: 'test3@test.com', id: '3' },
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
Interactive.args = {
  debug: true,
};
Interactive.play = async ({ canvasElement }) => {
  const c = within(canvasElement);
  await waitFor(() => expect(c.getByText('test')).toBeTruthy());
  fireEvent.click(c.getAllByTitle('Delete')[0]);
  await waitFor(() =>
    expect(c.getByText('Successfully deleted id 1')).toBeTruthy()
  );
};

export const ReactComponentInteractive = Template.bind({});
ReactComponentInteractive.args = {
  useReact: true,
};
ReactComponentInteractive.parameters = {
  ...Interactive.parameters,
};
