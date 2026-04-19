import type { PagesPath } from './$path';

interface RouteValue {
  pathname: string;
  path: string;
}

type RouteValuesFromNode<TNode> = TNode extends {
  $url: (...args: never[]) => infer TResult;
}
  ? TResult | RouteValuesFromChildren<TNode>
  : RouteValuesFromChildren<TNode>;

type RouteValuesFromChildren<TNode> = TNode extends object
  ? {
      [K in keyof TNode]: K extends '$url'
        ? never
        : TNode[K] extends (...args: never[]) => infer TResult
          ? RouteValuesFromNode<TResult>
          : RouteValuesFromNode<TNode[K]>;
    }[keyof TNode]
  : never;

type AppRouteValue = Extract<RouteValuesFromNode<PagesPath>, RouteValue>;

export type AppPathname = AppRouteValue['pathname'];
export type AppPath = AppRouteValue['path'];
