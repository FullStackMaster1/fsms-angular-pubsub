import { TestBed } from '@angular/core/testing';
import { Observable, Subscriber } from 'rxjs';
import { PubSubModule } from '../public-api';
import { PubSubService } from './pubsub.service';

describe('PubSubService', () => {
  let service: PubSubService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [PubSubModule.forRoot()],
    });
    service = TestBed.inject(PubSubService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('subscribe', (): void => {
    it('should throw an error when event is falsy', (): void => {
      expect(() => service.subscribe(undefined)).toThrow();
    });

    it('should return an observable when there is no callback', (): void => {
      let result: any = service.subscribe({ message: { type: 'orderplaced' } });
      expect(service['map'].size).toBe(1);
      expect(result instanceof Observable).toBeTruthy();
    });

    it('should return a subscriber when there is a callback specified', (): void => {
      let result: any = service.subscribe({
        message: { type: 'orderplaced' },
        callback: () => {},
      });
      expect(result instanceof Subscriber).toBeTruthy();
    });
  });

  describe('clearAllSubscriptions', () => {
    beforeEach(() => {
      service.clearAllSubscriptions();
      service.subscribe({
        message: { type: 'orderready' },
        callback: () => 'order2',
      });
      service.subscribe({
        message: { type: 'orderready' },
        callback: () => 'order1',
      });
    });

    it('should have one subcription', () => {
      expect(service['map'].size).toBe(1);
    });

    describe('if I clear all subscriptions', () => {
      beforeEach(() => {
        service.clearAllSubscriptions();
      });
      it('no subscriptions', () => {
        expect(service['map'].size).toBe(0);
        expect(service['subscriptions'].length).toBe(0);
      });
    });
  });
});
