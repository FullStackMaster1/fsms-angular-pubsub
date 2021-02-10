import { TestBed } from '@angular/core/testing';
import { Observable, Subscriber } from 'rxjs';
import { PubSubModule } from '../public-api';
import { PubsubService } from './pubsub.service';

describe('PubSubService', () => {
  let service: PubsubService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [PubSubModule.forRoot()],
    });
    service = TestBed.inject(PubsubService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('subscribe', (): void => {
    it('should throw an error when event is falsy', (): void => {
      expect(() => service.subscribe(undefined)).toThrow();
    });

    it('should return a subscriber when there is a callback specified', (): void => {
      const result: any = service.subscribe({
        messageType: 'orderplaced',
        callback: () => {},
      });
      expect(result instanceof Subscriber).toBeTruthy();
    });
  });

  describe('clearAllSubscriptions', () => {
    beforeEach(() => {
      service.clearAllSubscriptions();
      service.subscribe({
        messageType: 'orderplaced',
        callback: () => {},
      });
      service.subscribe({
        messageType: 'orderplaced',
        callback: () => {},
      });
      service.subscribe({
        messageType: 'ordercancelled',
        callback: () => {},
      });
    });

    it('should have one subcription', () => {
      expect((service as any).map.size).toBe(2);
    });

    describe('if I clear all subscriptions', () => {
      beforeEach(() => {
        service.clearAllSubscriptions();
      });
      it('no subscriptions', () => {
        expect((service as any).map.size).toBe(0);
        expect((service as any).subscriptions.length).toBe(0);
      });
    });
  });
});
