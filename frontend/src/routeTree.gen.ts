/* eslint-disable */

// @ts-nocheck

// noinspection JSUnusedGlobalSymbols

// This file was automatically generated by TanStack Router.
// You should NOT make any changes in this file as it will be overwritten.
// Additionally, you should also exclude this file from your linter and/or formatter to prevent it from being checked or modified.

// Import Routes

import { Route as rootRoute } from './routes/__root'
import { Route as CreateImport } from './routes/create'
import { Route as AuthorsImport } from './routes/authors'
import { Route as IndexImport } from './routes/index'

// Create/Update Routes

const CreateRoute = CreateImport.update({
  id: '/create',
  path: '/create',
  getParentRoute: () => rootRoute,
} as any)

const AuthorsRoute = AuthorsImport.update({
  id: '/authors',
  path: '/authors',
  getParentRoute: () => rootRoute,
} as any)

const IndexRoute = IndexImport.update({
  id: '/',
  path: '/',
  getParentRoute: () => rootRoute,
} as any)

// Populate the FileRoutesByPath interface

declare module '@tanstack/react-router' {
  interface FileRoutesByPath {
    '/': {
      id: '/'
      path: '/'
      fullPath: '/'
      preLoaderRoute: typeof IndexImport
      parentRoute: typeof rootRoute
    }
    '/authors': {
      id: '/authors'
      path: '/authors'
      fullPath: '/authors'
      preLoaderRoute: typeof AuthorsImport
      parentRoute: typeof rootRoute
    }
    '/create': {
      id: '/create'
      path: '/create'
      fullPath: '/create'
      preLoaderRoute: typeof CreateImport
      parentRoute: typeof rootRoute
    }
  }
}

// Create and export the route tree

export interface FileRoutesByFullPath {
  '/': typeof IndexRoute
  '/authors': typeof AuthorsRoute
  '/create': typeof CreateRoute
}

export interface FileRoutesByTo {
  '/': typeof IndexRoute
  '/authors': typeof AuthorsRoute
  '/create': typeof CreateRoute
}

export interface FileRoutesById {
  __root__: typeof rootRoute
  '/': typeof IndexRoute
  '/authors': typeof AuthorsRoute
  '/create': typeof CreateRoute
}

export interface FileRouteTypes {
  fileRoutesByFullPath: FileRoutesByFullPath
  fullPaths: '/' | '/authors' | '/create'
  fileRoutesByTo: FileRoutesByTo
  to: '/' | '/authors' | '/create'
  id: '__root__' | '/' | '/authors' | '/create'
  fileRoutesById: FileRoutesById
}

export interface RootRouteChildren {
  IndexRoute: typeof IndexRoute
  AuthorsRoute: typeof AuthorsRoute
  CreateRoute: typeof CreateRoute
}

const rootRouteChildren: RootRouteChildren = {
  IndexRoute: IndexRoute,
  AuthorsRoute: AuthorsRoute,
  CreateRoute: CreateRoute,
}

export const routeTree = rootRoute
  ._addFileChildren(rootRouteChildren)
  ._addFileTypes<FileRouteTypes>()

/* ROUTE_MANIFEST_START
{
  "routes": {
    "__root__": {
      "filePath": "__root.tsx",
      "children": [
        "/",
        "/authors",
        "/create"
      ]
    },
    "/": {
      "filePath": "index.tsx"
    },
    "/authors": {
      "filePath": "authors.tsx"
    },
    "/create": {
      "filePath": "create.tsx"
    }
  }
}
ROUTE_MANIFEST_END */
