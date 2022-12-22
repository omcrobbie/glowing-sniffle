import { Story, Meta, moduleMetadata } from '@storybook/angular';
import { of } from 'rxjs';
import { Message } from 'src/app/models/message';
import { ToastService } from 'src/app/services/toast.service';
import { OcticonDirective } from 'src/app/utils/octicon.directive';
import { ToastComponent } from './toast.component';

export default {
  title: 'Toast',
  component: ToastComponent,
  decorators: [
    moduleMetadata({
      declarations: [OcticonDirective],
    }),
  ],
} as Meta;

const Template: Story<ToastComponent> = (args: ToastComponent) => ({
  props: args,
});

export const Success = Template.bind({});
Success.decorators = [
  moduleMetadata({
    providers: [
      {
        provide: ToastService,
        useValue: { messages$: of([new Message('success', 'You win!')]) },
      },
    ],
  }),
];

export const Error = Template.bind({});
Error.decorators = [
  moduleMetadata({
    providers: [
      {
        provide: ToastService,
        useValue: { messages$: of([new Message('error', 'You lose!')]) },
      },
    ],
  }),
];
