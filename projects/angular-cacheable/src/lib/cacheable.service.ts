import { Injectable } from '@angular/core';
import { Observable, of, Subject, throwError } from 'rxjs';
import { tap } from 'rxjs/operators';

import { ICacheContent } from './cache-content.interface';

@Injectable({
  providedIn: 'root'
})
export class CacheableService {
  /** Singleton implementaion: it's need to access from a decorator */
  private static instance: CacheableService = null;

  /** Default TTL: 1 hour */
  public readonly DEFAULT_TTL = 3600000;

  /** Cache container */
  private cache = new Map<string, ICacheContent>();
  private inFlightObservables = new Map<string, Subject<any>>();


  // Return the instance of the service
  public static getInstance(): CacheableService {
    if (CacheableService.instance === null) {
      CacheableService.instance = new CacheableService();
    }
    return CacheableService.instance;
  }

  /**
   * Gets the value from cache if the key is provided.
   *
   * @param key A cache key
   * @param fallback An observeable to be returned if there's no cache record
   * @param ttl Cache TTL in milliseconds
   * @returns An observable
   */
  public get(key: string, fallback?: Observable<any>, ttl: number = this.DEFAULT_TTL): Observable<any> | Subject<any> {

    if (this.hasValidCachedValue(key)) {
      console.log(`%cGetting from cache ${key}`, 'color: green');
      return of(this.cache.get(key).value);
    }

    if (this.inFlightObservables.has(key)) {
      return this.inFlightObservables.get(key);

    } else if (fallback && fallback instanceof Observable) {
      this.inFlightObservables.set(key, new Subject());
      console.log(`%cCalling api for ${key}`, 'color: purple');
      return fallback.pipe(tap((value) => { this.set(key, value, ttl); }));

    } else {
      return throwError('Requested key is not available in cache');
    }
  }

  /**
   * Sets the value with key in the cache
   * Notifies all observers of the new value
   */
  public set(key: string, value: any, ttl: number = this.DEFAULT_TTL): void {
    this.cache.set(key, { value, expiry: Date.now() + ttl });
    this.notifyInFlightObservers(key, value);
  }

  /**
   * Checks if the the key exists in cache
   *
   * @param key The cache key
   */
  public has(key: string): boolean {
    return this.cache.has(key);
  }

  /**
   * Publishes the value to all observers of the given
   * in progress observables if observers exist.
   */
  private notifyInFlightObservers(key: string, value: any): void {
    if (this.inFlightObservables.has(key)) {
      const inFlight = this.inFlightObservables.get(key);
      const observersCount = inFlight.observers.length;
      if (observersCount) {
        console.log(`%cNotifying ${inFlight.observers.length} flight subscribers for ${key}`, 'color: green');
        inFlight.next(value);
      }
      inFlight.complete();
      this.inFlightObservables.delete(key);
    }
  }

  /**
   * Checks if the key exists and has not expired.
   */
  private hasValidCachedValue(key: string): boolean {
    if (this.cache.has(key)) {
      if (this.cache.get(key).expiry < Date.now()) {
        this.cache.delete(key);
        return false;
      }
      return true;
    } else {
      return false;
    }
  }
}
