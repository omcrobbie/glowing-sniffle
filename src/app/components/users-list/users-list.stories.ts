import { Meta, moduleMetadata, Story } from '@storybook/angular';
import { of } from 'rxjs';
import { UserService } from 'src/app/services/user.service';
import { OcticonDirective } from 'src/app/utils/octicon.directive';
import { UsersListComponent } from './users-list.component';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';

export default {
  title: 'UsersList',
  component: UsersListComponent,
} as Meta;

const Template: Story<UsersListComponent> = (args: UsersListComponent) => ({
  props: args,
  moduleMetadata: {
    declarations: [OcticonDirective],
    imports: [RouterTestingModule, HttpClientTestingModule],
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

// withData.parameters = {
//   mockData: [
//     {
//       url: "http://localhost:8080/users",
//       method: "GET",
//       status: 200,
//       response: [
//         { name: "shit", email: "shit@test.com", id: "1" },
//         { name: "turd", email: "turd@test.com", id: "2" },
//         { name: "drop", email: "drop@test.com", id: "3" },
//       ],
//     },
//   ],
// };
// withData.decorators = [
//   moduleMetadata({
//     providers: [
//       {
//         provide: UserService,
//         useValue: () => ({
//           findAll() {
//             return of([
//               { name: 'shit', email: 'shit@test.com', id: '1' },
//               { name: 'turd', email: 'turd@test.com', id: '2' },
//               { name: 'drop', email: 'drop@test.com', id: '3' },
//             ]);
//           },
//         }),
//       },
//     ],
//   }),
// ];
