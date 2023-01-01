import {
  composeStories,
  createMountableStoryComponent,
} from '@storybook/testing-angular';
import { render } from '@testing-library/angular';
import * as stories from './users-list.stories';

const { WithData } = composeStories(stories);

test('basic render', async () => {
  const { component, ngModule } = createMountableStoryComponent(
    WithData({}, {} as any)
  );
  const { getByText } = await render(component, {
    imports: [ngModule],
  });
  expect(getByText('shit')).toBeTruthy();
});
