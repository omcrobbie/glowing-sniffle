import {
  composeStories,
  createMountableStoryComponent,
} from '@storybook/testing-angular';
import { fireEvent, render, waitFor } from '@testing-library/angular';
import { initMocks } from 'src/app/utils/mocks/mswHelper';
import * as stories from './users-list.stories';

const { Interactive } = composeStories(stories);
const server = initMocks(Interactive);

beforeAll(() => server.listen());
afterAll(() => server.close());

test('should delete', async () => {
  const { component, ngModule } = createMountableStoryComponent(
    Interactive({}, {} as any)
  );
  const c = await render(component, {
    imports: [ngModule],
  });
  await waitFor(() => expect(c.getByText('shit')).toBeTruthy());
  fireEvent.click(c.getAllByTitle('Delete')[0]);
  await waitFor(() => expect(c.getByText('Successfully deleted id 1')));
});
