# AngularCacheable

An angular library for cacheing your method responses using decorators
Compatible with Angular 9+

## Installation

Install it with npm

```bash
npm install angular-cacheable --save
```

### Usage example

1. Add a `Cacheable` decorator to your method that returns an `Observable`.

```ts
  import { Cacheable } from 'angular-cacheable';

  // ...

  /** Return listed items */
  @Cacheable({ key: 'categories', ttl: 1000 })
  public getCategories() {
    return this.restService.get('my-url');
  }
```

Don't worry if your method has parameters, the plugin will handle it internally.

## Decorator parameters

| Function Name               | Description                                         |
| --------------------------- | --------------------------------------------------- |
| **key**                     | (required) A key for cache (must be unique)         |
| **ttl**                     | TTL in milliseconds, default 24 hours               |

## License
MIT © [Evgeny Gushchin](https://github.com/evgushchin)
