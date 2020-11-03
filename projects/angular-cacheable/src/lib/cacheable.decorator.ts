import { CacheableService } from './cacheable.service';

export type KeyMakerFunction = (args: any[]) => string;

// tslint:disable-next-line: no-bitwise
const hashCode = (s: string) => s.split('').reduce((a: number, b: string) => { a = ((a << 5) - a) + b.charCodeAt(0); return a & a; }, 0);

export function Cacheable(config: { key?: string | KeyMakerFunction; ttl?: number; }) {
  // tslint:disable-next-line: space-before-function-paren only-arrow-functions
  return function (target: any, propertyKey: string, descriptor: PropertyDescriptor) {
    const oldFunc = descriptor.value;
    // tslint:disable-next-line: space-before-function-paren only-arrow-functions
    descriptor.value = function () {
      const args = Array.from(arguments);

      let hashKey = '';
      if (config.key === undefined || config.key === null || (typeof config.key !== 'string' && typeof config.key !== 'function')) {
        hashKey = propertyKey + '-' + hashCode(JSON.stringify(args));
      } else if (typeof config.key === 'string') {
        hashKey = config.key.toString();
      } else {
        hashKey = (config.key as KeyMakerFunction)(args);
      }

      return CacheableService.getInstance()
        .get(hashKey, oldFunc.apply(this, arguments), config.ttl);
    };
  };
}
