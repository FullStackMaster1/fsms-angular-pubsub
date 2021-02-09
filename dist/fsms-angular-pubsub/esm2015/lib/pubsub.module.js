import { NgModule } from '@angular/core';
import { PubSubService } from './pubsub.service';
export class PubSubModule {
    static forRoot() {
        return {
            ngModule: PubSubModule,
            providers: [
                PubSubService
            ]
        };
    }
}
PubSubModule.decorators = [
    { type: NgModule }
];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicHVic3ViLm1vZHVsZS5qcyIsInNvdXJjZVJvb3QiOiJDOi9SdXBlc2gvR2l0aHViL2ZzbXMtYW5ndWxhci1wdWJzdWIvcHJvamVjdHMvZnNtcy1hbmd1bGFyLXB1YnN1Yi9zcmMvIiwic291cmNlcyI6WyJsaWIvcHVic3ViLm1vZHVsZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFDQSxPQUFPLEVBQXVCLFFBQVEsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUM5RCxPQUFPLEVBQUUsYUFBYSxFQUFFLE1BQU0sa0JBQWtCLENBQUM7QUFHakQsTUFBTSxPQUFPLFlBQVk7SUFDaEIsTUFBTSxDQUFDLE9BQU87UUFDbkIsT0FBTztZQUNMLFFBQVEsRUFBRSxZQUFZO1lBQ3RCLFNBQVMsRUFBRTtnQkFDVCxhQUFhO2FBQ2Q7U0FDRixDQUFDO0lBQ0osQ0FBQzs7O1lBVEYsUUFBUSIsInNvdXJjZXNDb250ZW50IjpbIlxyXG5pbXBvcnQgeyBNb2R1bGVXaXRoUHJvdmlkZXJzLCBOZ01vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xyXG5pbXBvcnQgeyBQdWJTdWJTZXJ2aWNlIH0gZnJvbSAnLi9wdWJzdWIuc2VydmljZSc7XHJcblxyXG5ATmdNb2R1bGUoKVxyXG5leHBvcnQgY2xhc3MgUHViU3ViTW9kdWxlIHtcclxuICBwdWJsaWMgc3RhdGljIGZvclJvb3QoKTogTW9kdWxlV2l0aFByb3ZpZGVyczxQdWJTdWJNb2R1bGU+IHtcclxuICAgIHJldHVybiB7XHJcbiAgICAgIG5nTW9kdWxlOiBQdWJTdWJNb2R1bGUsXHJcbiAgICAgIHByb3ZpZGVyczogW1xyXG4gICAgICAgIFB1YlN1YlNlcnZpY2VcclxuICAgICAgXVxyXG4gICAgfTtcclxuICB9XHJcbn1cclxuIl19