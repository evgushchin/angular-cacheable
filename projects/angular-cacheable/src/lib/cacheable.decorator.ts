import { CacheableService } from './cacheable.service';

export function Cacheable(config: { key: string; ttl?: number; }) {
  // tslint:disable-next-line: no-bitwise
  const hashCode = (s: string) => s.split('').reduce((a: number, b: string) => { a = ((a << 5) - a) + b.charCodeAt(0); return a & a; }, 0);

  // tslint:disable-next-line: space-before-function-paren only-arrow-functions
  return function (target: any, propertyKey: string, descriptor: PropertyDescriptor) {
    const oldFunc = descriptor.value;
    // tslint:disable-next-line: space-before-function-paren only-arrow-functions
    descriptor.value = function () {
      const args = [];
      // tslint:disable-next-line: prefer-for-of
      for (let i = 0; i < arguments.length; i++) {
        args.push(arguments[i]);
      }

      return CacheableService.getInstance()
        .get(config.key + '-' + hashCode(JSON.stringify(args)), oldFunc.apply(this, arguments), config.ttl);
    };
  };
}
