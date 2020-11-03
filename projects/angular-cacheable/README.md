# AngularCacheable

An angular library for cacheing your method responses using decorators
Compatible with Angular 9+

## Installation

Install it with npm

```bash
npm install angular-cacheable --save
```

# Migration from v0.0.4 to v0.1.1

**Breaking changes in v0.1.1**

1. Remove all `key` paramters from `Cacheable`. 
Exmaple: `@Cacheable({ key: 'posts' })` => `@Cacheable()`

2. Default TTL is now 1 hour.

### Usage example

1. Add a `Cacheable` decorator to your method that returns an `Observable`.

```ts
  import { Cacheable } from 'angular-cacheable';

  // ...

  /** Basic usage */
  @Cacheable()
  public getCategories() {
    return this.httpService.get('my-url');
  }

  /** Specifing a TTL: 1 second */
  @Cacheable({ ttl: 1000 })
  public getCategories() {
    return this.httpService.get('my-url');
  }

  /** Custom key */
  @Cacheable({ key: 'categories-list' })
  public getCategories() {
    return this.httpService.get('my-url');
  }

  /** Custom function key */
  @Cacheable({ key: (args: any[]) => {
    return 'categories-page-' + args[0]; // args[0] is the first method argument. Here it is `page`.
  } })
  public getCategories(page: number, other: string) {
    return this.httpService.get('my-url', { page, other });
  }
```

To invalidate cache call 
```ts
CacheableService.getInstance().invalidate( yourCacheKey );
```


## Decorator parameters

| Function Name               | Description                                         |
| --------------------------- | --------------------------------------------------- |
| **key**                     | A key for cache (must be unique) or a function that |
|                             | returns a key. Defaults to method name concatenated |
|                             | with hashed arguments.                              |
| **ttl**                     | TTL in milliseconds, default 1 hour                |

## License
MIT © [Evgeny Gushchin](https://github.com/evgushchin)
