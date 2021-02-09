import { Subscription } from 'rxjs';
import { Message } from './message';
import { SubscribeOptions } from './subscribe-options';
export declare class PubSubService {
    private map;
    private subscriptions;
    subscribe({ message, callback, error, complete, }: SubscribeOptions): Subscription;
    publish(message: Message): void;
    clearAllSubscriptions(): void;
    private addSubscription;
    private getSubject;
    private hasSubject;
    private setNewSubject;
}
