/* eslint-disable */
import * as Router from 'expo-router';

export * from 'expo-router';

declare module 'expo-router' {
  export namespace ExpoRouter {
    export interface __routes<T extends string | object = string> {
      hrefInputParams: { pathname: Router.RelativePathString, params?: Router.UnknownInputParams } | { pathname: Router.ExternalPathString, params?: Router.UnknownInputParams } | { pathname: `/`; params?: Router.UnknownInputParams; } | { pathname: `/_sitemap`; params?: Router.UnknownInputParams; } | { pathname: `/data/museumArtifacts`; params?: Router.UnknownInputParams; } | { pathname: `/utils/artifactHelpers`; params?: Router.UnknownInputParams; } | { pathname: `/utils/rarity`; params?: Router.UnknownInputParams; } | { pathname: `/utils/storageKeys`; params?: Router.UnknownInputParams; };
      hrefOutputParams: { pathname: Router.RelativePathString, params?: Router.UnknownOutputParams } | { pathname: Router.ExternalPathString, params?: Router.UnknownOutputParams } | { pathname: `/`; params?: Router.UnknownOutputParams; } | { pathname: `/_sitemap`; params?: Router.UnknownOutputParams; } | { pathname: `/data/museumArtifacts`; params?: Router.UnknownOutputParams; } | { pathname: `/utils/artifactHelpers`; params?: Router.UnknownOutputParams; } | { pathname: `/utils/rarity`; params?: Router.UnknownOutputParams; } | { pathname: `/utils/storageKeys`; params?: Router.UnknownOutputParams; };
      href: Router.RelativePathString | Router.ExternalPathString | `/${`?${string}` | `#${string}` | ''}` | `/_sitemap${`?${string}` | `#${string}` | ''}` | `/data/museumArtifacts${`?${string}` | `#${string}` | ''}` | `/utils/artifactHelpers${`?${string}` | `#${string}` | ''}` | `/utils/rarity${`?${string}` | `#${string}` | ''}` | `/utils/storageKeys${`?${string}` | `#${string}` | ''}` | { pathname: Router.RelativePathString, params?: Router.UnknownInputParams } | { pathname: Router.ExternalPathString, params?: Router.UnknownInputParams } | { pathname: `/`; params?: Router.UnknownInputParams; } | { pathname: `/_sitemap`; params?: Router.UnknownInputParams; } | { pathname: `/data/museumArtifacts`; params?: Router.UnknownInputParams; } | { pathname: `/utils/artifactHelpers`; params?: Router.UnknownInputParams; } | { pathname: `/utils/rarity`; params?: Router.UnknownInputParams; } | { pathname: `/utils/storageKeys`; params?: Router.UnknownInputParams; };
    }
  }
}
