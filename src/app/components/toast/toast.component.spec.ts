import {
  composeStories,
  createMountableStoryComponent,
} from '@storybook/testing-angular';
import { render } from '@testing-library/angular';
import * as stories from './toast.stories';
const { Success, Error } = composeStories(stories);

test('should render success', async () => {
  const { component, ngModule } = createMountableStoryComponent(
    Success({}, {} as any)
  );
  const { getByText } = await render(component, { imports: [ngModule] });
  expect(getByText('You win!')).toBeVisible();
});

test('should render error', async () => {
  const { component, ngModule } = createMountableStoryComponent(
    Error({}, {} as any)
  );
  const { getByText } = await render(component, { imports: [ngModule] });
  expect(getByText('You lose!')).toBeVisible();
});
