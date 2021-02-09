(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('@angular/core'), require('rxjs')) :
    typeof define === 'function' && define.amd ? define('fsms-angular-pubsub', ['exports', '@angular/core', 'rxjs'], factory) :
    (global = typeof globalThis !== 'undefined' ? globalThis : global || self, factory(global['fsms-angular-pubsub'] = {}, global.ng.core, global.rxjs));
}(this, (function (exports, core, rxjs) { 'use strict';

    var ServiceName = 'PubSub Service';
    var PubSubService = /** @class */ (function () {
        function PubSubService() {
            this.map = new Map();
            this.subscriptions = [];
        }
        PubSubService.prototype.subscribe = function (_a) {
            var message = _a.message, callback = _a.callback, error = _a.error, complete = _a.complete;
            if (!message) {
                throw new Error("[" + ServiceName + "] => Subscription method must get event name.");
            }
            var messageType = message.type;
            if (!this.hasSubject(messageType)) {
                this.setNewSubject(messageType);
            }
            var subject = this.getSubject(messageType);
            if (typeof callback !== 'function') {
                return subject.asObservable();
            }
            else {
                var subscription = subject
                    .asObservable()
                    .subscribe(callback, error, complete);
                this.addSubscription(subscription);
                return subscription;
            }
        };
        PubSubService.prototype.publish = function (message) {
            if (!message) {
                throw new Error("[" + ServiceName + "] => Publish method must get event name.");
            }
            else if (!this.hasSubject(message.type)) {
                return;
            }
            this.getSubject(message.type).next(message);
        };
        PubSubService.prototype.clearAllSubscriptions = function () {
            this.subscriptions.forEach(function (s) { return s && s.unsubscribe(); });
            this.subscriptions.length = 0;
            this.map.clear();
        };
        PubSubService.prototype.addSubscription = function (sub) {
            this.subscriptions.push(sub);
        };
        PubSubService.prototype.getSubject = function (messageType) {
            return this.map.get(messageType);
        };
        PubSubService.prototype.hasSubject = function (messageType) {
            return this.map.has(messageType);
        };
        PubSubService.prototype.setNewSubject = function (messageType) {
            this.map.set(messageType, new rxjs.ReplaySubject());
        };
        return PubSubService;
    }());
    PubSubService.decorators = [
        { type: core.Injectable }
    ];

    var PubSubModule = /** @class */ (function () {
        function PubSubModule() {
        }
        PubSubModule.forRoot = function () {
            return {
                ngModule: PubSubModule,
                providers: [
                    PubSubService
                ]
            };
        };
        return PubSubModule;
    }());
    PubSubModule.decorators = [
        { type: core.NgModule }
    ];

    var SubscribeOptions = /** @class */ (function () {
        function SubscribeOptions() {
        }
        return SubscribeOptions;
    }());

    var Message = /** @class */ (function () {
        function Message() {
        }
        return Message;
    }());

    /*
     * Public API Surface of fsms-angular-pubsub
     */

    /**
     * Generated bundle index. Do not edit.
     */

    exports.Message = Message;
    exports.PubSubModule = PubSubModule;
    exports.PubSubService = PubSubService;
    exports.SubscribeOptions = SubscribeOptions;

    Object.defineProperty(exports, '__esModule', { value: true });

})));
//# sourceMappingURL=fsms-angular-pubsub.umd.js.map
