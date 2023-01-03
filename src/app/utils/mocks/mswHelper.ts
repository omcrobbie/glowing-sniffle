import { Story } from '@storybook/angular';
import {
  DefaultBodyType,
  MockedRequest,
  PathParams,
  ResponseComposition,
  rest,
  RestContext,
  RestHandler,
  RestRequest,
} from 'msw';
import { setupServer, SetupServerApi } from 'msw/node';

export function initMocks(...storyFns: Story[]): SetupServerApi {
  const mswHandlers: RestHandler<MockedRequest<DefaultBodyType>>[] = [];
  storyFns.forEach((storyFn) => {
    if (storyFn.parameters) {
      const { mockData } = storyFn.parameters;
      (mockData as any[]).forEach(
        ({
          url,
          method,
          status,
          response,
        }: {
          url: string;
          method: string;
          status: number;
          response: any;
        }) => {
          const m = method.toLowerCase();
          mswHandlers.push(
            (rest as any)[m](
              url,
              (
                req: RestRequest<never, PathParams<string>>,
                res: ResponseComposition<DefaultBodyType>,
                ctx: RestContext
              ) => res(ctx.status(status), ctx.json(response))
            )
          );
        }
      );
    }
  });
  return setupServer(...mswHandlers);
}
