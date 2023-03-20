# 🗺️ RouteConfig

Static route configuration helper

## Installation
[NPM](https://www.npmjs.com/):
```
$ npm install --save route-config
```

[Yarn](https://yarnpkg.com/lang/en/):
```
yarn add route-config
```

## Import
In ES6:
`import { Config, RouteConfig } from 'route-config'`

## Use
__Basic__
```js
import { RouteConfig } from 'route-config'
const routeConfig = new RouteConfig({
  namespaces: {
    posts: {
      path: '/posts',
      routes: {
        index: {},
        show: {
          path: '/:postId'
        }
      }
    }
  },
  routes: {
    home: { path: '/home' }
  }
})

routeConfig.url('home')
//=> "/home"

routeConfig.url('posts.show')
//=> "/posts/:postId"
```

## API
#### `new RouteConfig(map, options)`
__Params__:
  - [`map={ namespaces: {}, routes: {} }`] (Object): Map of your routes
    - [`config`] (Object): config to applied on sub namspaces and sub routes
    - [`fullPath=''`] (String): if set then it's used to prefix all sub namespace and sub route path.
    - [`id=''`] (String): id is used internally to create normalized map.
    - [`key=''`] (String): if set prefix all sub keys with `key`
    - [`namespaces={}`] (Object): sub namespaces
    - [`path=''`] (String): root path
    - [`routes={}`] (Object): sub routes
  - [`options={}`] (Object):
    - [`configs`] (Object): options passed to `ConfigManager` constructor

_Ex_
```js
const routeConfig = new RouteConfig({
  namespaces: {
    posts: {
      path: '/posts',
      routes: {
        show: { path: '/:postId' }
      }
    }
  },
  routes: {
    home: { path: '/' }
  }
})
```

#### `routeConfig.getMap(options)`
Return map
__Params__:
  - [`options={}`] (Object):
    - [`filter`] (Function): used to filter namespaces and routes returned in map
    - [`formatRoute=identity`] (Function): used to format route returned in map

_Ex_
```js
routeConfig.getMap()
//=>
// {
//   namespaces: {
//     posts: {
//       config: {},
//       fullPath: '/posts',
//       id: 'posts',
//       key: 'posts',
//       path: '/posts',
//       routes: {
//         show: {
//           config: {},
//           fullPath: '/posts/:postId',
//           id: 'posts.show',
//           key: 'show',
//           path: '/:postId'
//         }
//       }
//     }
//   },
//   routes: {
//     home: {
//       config: {},
//       fullPath: '/',
//       id: 'home',
//       key: 'home',
//       path: '/'
//     }
//   }
// }
```

#### `routeConfig.getNormalizedMap(options)`
Return normalized map. For more info see [`normalizr`](https://github.com/paularmstrong/normalizr)

__Params__:
  - [`options={}`] (Object):
    - [`filter`] (Function): used to filter namespaces and routes returned in map
    - [`formatRoute=identity`] (Function): used to format route returned in map

```js
routeConfig.getNormalisedMap()
//=>
// {
//   entities: {
//     namespaces: {
//       posts: {
//         config: {},
//         fullPath: '/posts',
//         id: 'posts',
//         key: 'posts',
//         path: '/posts',
//         routes: ['posts.show']
//       }
//     },
//     routes: {
//       home: {
//         config: {},
//         fullPath: '/',
//         id: 'home',
//         key: 'home',
//         path: '/'
//       },
//       'posts.show': {
//         config: {},
//         fullPath: '/posts/:postId',
//         id: 'posts.show',
//         key: 'show',
//         path: '/:postId'
//       }
//     }
//   },
//   result: {
//     namespaces: ['posts'],
//     routes: ['home']
//   }
// }
```

#### `routeConfig.getRoute(key)`
Return route object

__Params__:
  - `key` (String): a string or dot notation string to find route or nested route

_Ex_
```js
routeConfig.getRoute('home')
//=>
// {
//   config: {},
//   fullPath: '/',
//   id: 'home',
//   key: 'home',
//   path: '/'
// }

routeConfig.getRoute('posts.show') // nested route
//=>
// {
//   config: {},
//   fullPath: '/posts/:postId',
//   id: 'posts.show',
//   key: 'show',
//   path: '/:postId'
// }
```

#### `routeConfig.merge(...maps)`
Merge route config map with maps (modify map)

_Ex_
```js
routeConfig.merge({
  routes: {
    contact: { path: '/contact' }
  }
})

routeConfig.getMap()
//=>
// {
//   namespaces: {
//     posts: {
//       config: {},
//       fullPath: '/posts',
//       id: 'posts',
//       key: 'posts',
//       path: '/posts',
//       routes: {
//         show: {
//           config: {},
//           fullPath: '/posts/:postId',
//           id: 'posts.show',
//           key: 'show',
//           path: '/:postId'
//         }
//       }
//     }
//   },
//   routes: {
//     contact: {
//       config: {},
//       fullPath: '/contact',
//       id: 'contact',
//       key: 'contact',
//       path: '/contact'
//     },
//     home: {
//       config: {},
//       fullPath: '/',
//       id: 'home',
//       key: 'home',
//       path: '/'
//     }
//   }
// }
```

#### `routeConfig.namespace(namespace)`
Returns the new namespace that is a instance of `RouteConfig`.

__Params__:
  - `namespace` (Object):
    - [`config`] (Object): config to applied on sub namspaces and sub routes
    - [`fullPath`] (String): if set then it's used to prefix all sub namespace and sub route path. Else sub namespace and sub route path are prefixed with parent full path and `namespace` path
    - [`id`] (String): id is used internally to create normalized map
    - `key` (String): namespace name used to get route inside namespace
    - [`namespaces={}`] (Object): sub namespaces
    - `path` (String): namespace path
    - [`routes={}`] (Object): sub routes

_Ex_
```js
const namespace = routeConfig.namespace({ key: 'authors', path: '/authors' })
namespace.route({ key: 'show', path: '/:authorId' })
namespace.getMap()
//=>
// {
//   config: {},
//   fullPath: '/authors',
//   id: 'authors',
//   key: 'authors',
//   namespaces: {},
//   path: '/authors',
//   routes: {
//     show: {
//       config: {},
//       fullPath: '/authors/:authorId',
//       id: 'authors.show',
//       key: 'show',
//       path: '/:authorId'
//     }
//   }
// }

routeConfig.getMap()
//=>
// {
//   namespaces: {
//     authors: {
//       config: {},
//       fullPath: '/authors',
//       id: 'authors',
//       key: 'authors',
//       namespaces: {},
//       path: '/authors',
//       routes: {
//         show: {
//           config: {},
//           fullPath: '/authors/:authorId',
//           id: 'authors.show',
//           key: 'show',
//           path: '/:authorId'
//         }
//       }
//     },
//     posts: {
//       config: {},
//       fullPath: '/posts',
//       id: 'posts',
//       key: 'posts',
//       path: '/posts',
//       routes: {
//         show: {
//           config: {},
//           fullPath: '/posts/:postId',
//           id: 'posts.show',
//           key: 'show',
//           path: '/:postId'
//         }
//       }
//     }
//   },
//   routes: {
//     contact: {
//       config: {},
//       fullPath: '/contact',
//       id: 'contact',
//       key: 'contact',
//       path: '/contact'
//     },
//     home: {
//       config: {},
//       fullPath: '/',
//       id: 'home',
//       key: 'home',
//       path: '/'
//     }
//   }
// }
```

#### `routeConfig.route(route)`
Returns routeConfig instance so you can chain call.

__Params__:
  - `namespace` (Object):
    - [`config`] (Object): route config
    - [`fullPath`] (String): route full path
    - [`id`] (String): id is used internally to create normalized map
    - `key` (String): route name
    - `path` (String): route path

_Ex_
```js
routeConfig.route({ key: 'about', path: '/about' }).getMap()
//=>
// {
//   namespaces: {
//     authors: {
//       config: {},
//       fullPath: '/authors',
//       id: 'authors',
//       key: 'authors',
//       namespaces: {},
//       path: '/authors',
//       routes: {
//         show: {
//           config: {},
//           fullPath: '/authors/:authorId',
//           id: 'authors.show',
//           key: 'show',
//           path: '/:authorId'
//         }
//       }
//     },
//     posts: {
//       config: {},
//       fullPath: '/posts',
//       id: 'posts',
//       key: 'posts',
//       path: '/posts',
//       routes: {
//         show: {
//           config: {},
//           fullPath: '/posts/:postId',
//           id: 'posts.show',
//           key: 'show',
//           path: '/:postId'
//         }
//       }
//     }
//   },
//   routes: {
//     about: {
//       config: {},
//       fullPath: '/about',
//       id: 'about',
//       key: 'about',
//       path: '/about'
//     },
//     contact: {
//       config: {},
//       fullPath: '/contact',
//       id: 'contact',
//       key: 'contact',
//       path: '/contact'
//     },
//     home: {
//       config: {},
//       fullPath: '/',
//       id: 'home',
//       key: 'home',
//       path: '/'
//     }
// }
```

#### `routeConfig.url(key, params, options)`
Returns route url or null.

__Params__:
  - `key` (String): route key. You can use dot notation to get route url inside namspace
  - [`params=undefined`] (Object): params passed to [`path-to-regexp`](https://github.com/pillarjs/path-to-regexp)
  - [`options=undefined`] (Object): options passed to [`path-to-regexp`](https://github.com/pillarjs/path-to-regexp)

_Ex_
```js
routeConfig.url('home')
//=> '/'

routeConfig.url('posts.show')
//=> /posts/:postId

routeConfig.url('posts.show', { postId: 1 })
//=> /posts/1
```

#### `static RouteConfig.fromNormalizedMap(normalizedMap)`
Returns new RouteConfig instance created from normalized map.

__Params__:
  - `normalizedMap` (Object): for the object format see `getNormalizedMap`
  - [`options`] (Object): options passed to RouteConfig constructor

_Ex_
```js
const routeConfig = RouteConfig.fromNormalizedMap({
  entities: {
    namespaces: {
      posts: {
        config: {},
        fullPath: '/posts',
        id: 'posts',
        key: 'posts',
        path: '/posts',
        routes: ['posts.show']
      }
    },
    routes: {
      home: {
        config: {},
        fullPath: '/',
        id: 'home',
        key: 'home',
        path: '/'
      },
      'posts.show': {
        config: {},
        fullPath: '/posts/:postId',
        id: 'posts.show',
        key: 'show',
        path: '/:postId'
      }
    }
  },
  result: {
    namespaces: ['posts'],
    routes: ['home']
  }
})

routeConfig.getMap()
//=>
// {
//   namespaces: {
//     posts: {
//       config: {},
//       fullPath: '/posts',
//       id: 'posts',
//       key: 'posts',
//       path: '/posts',
//       routes: {
//         show: {
//           config: {},
//           fullPath: '/posts/:postId',
//           id: 'posts.show',
//           key: 'show',
//           path: '/:postId'
//         }
//       }
//     }
//   },
//   routes: {
//     home: {
//       config: {},
//       fullPath: '/',
//       id: 'home',
//       key: 'home',
//       path: '/'
//     }
//   }
// }
```
