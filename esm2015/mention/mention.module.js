/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */
import { BidiModule } from '@angular/cdk/bidi';
import { OverlayModule } from '@angular/cdk/overlay';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzMentionSuggestionDirective } from './mention-suggestions';
import { NzMentionTriggerDirective } from './mention-trigger';
import { NzMentionComponent } from './mention.component';
const COMPONENTS = [NzMentionComponent, NzMentionTriggerDirective, NzMentionSuggestionDirective];
export class NzMentionModule {
}
NzMentionModule.decorators = [
    { type: NgModule, args: [{
                imports: [BidiModule, CommonModule, FormsModule, OverlayModule, NzIconModule],
                declarations: [...COMPONENTS],
                exports: [...COMPONENTS]
            },] }
];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWVudGlvbi5tb2R1bGUuanMiLCJzb3VyY2VSb290IjoiLi4vLi4vLi4vY29tcG9uZW50cy9tZW50aW9uLyIsInNvdXJjZXMiOlsibWVudGlvbi5tb2R1bGUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7OztHQUdHO0FBRUgsT0FBTyxFQUFFLFVBQVUsRUFBRSxNQUFNLG1CQUFtQixDQUFDO0FBQy9DLE9BQU8sRUFBRSxhQUFhLEVBQUUsTUFBTSxzQkFBc0IsQ0FBQztBQUNyRCxPQUFPLEVBQUUsWUFBWSxFQUFFLE1BQU0saUJBQWlCLENBQUM7QUFDL0MsT0FBTyxFQUFFLFFBQVEsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUN6QyxPQUFPLEVBQUUsV0FBVyxFQUFFLE1BQU0sZ0JBQWdCLENBQUM7QUFDN0MsT0FBTyxFQUFFLFlBQVksRUFBRSxNQUFNLG9CQUFvQixDQUFDO0FBQ2xELE9BQU8sRUFBRSw0QkFBNEIsRUFBRSxNQUFNLHVCQUF1QixDQUFDO0FBQ3JFLE9BQU8sRUFBRSx5QkFBeUIsRUFBRSxNQUFNLG1CQUFtQixDQUFDO0FBQzlELE9BQU8sRUFBRSxrQkFBa0IsRUFBRSxNQUFNLHFCQUFxQixDQUFDO0FBRXpELE1BQU0sVUFBVSxHQUFHLENBQUMsa0JBQWtCLEVBQUUseUJBQXlCLEVBQUUsNEJBQTRCLENBQUMsQ0FBQztBQU9qRyxNQUFNLE9BQU8sZUFBZTs7O1lBTDNCLFFBQVEsU0FBQztnQkFDUixPQUFPLEVBQUUsQ0FBQyxVQUFVLEVBQUUsWUFBWSxFQUFFLFdBQVcsRUFBRSxhQUFhLEVBQUUsWUFBWSxDQUFDO2dCQUM3RSxZQUFZLEVBQUUsQ0FBQyxHQUFHLFVBQVUsQ0FBQztnQkFDN0IsT0FBTyxFQUFFLENBQUMsR0FBRyxVQUFVLENBQUM7YUFDekIiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqIFVzZSBvZiB0aGlzIHNvdXJjZSBjb2RlIGlzIGdvdmVybmVkIGJ5IGFuIE1JVC1zdHlsZSBsaWNlbnNlIHRoYXQgY2FuIGJlXG4gKiBmb3VuZCBpbiB0aGUgTElDRU5TRSBmaWxlIGF0IGh0dHBzOi8vZ2l0aHViLmNvbS9ORy1aT1JSTy9uZy16b3Jyby1hbnRkL2Jsb2IvbWFzdGVyL0xJQ0VOU0VcbiAqL1xuXG5pbXBvcnQgeyBCaWRpTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY2RrL2JpZGknO1xuaW1wb3J0IHsgT3ZlcmxheU1vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2Nkay9vdmVybGF5JztcbmltcG9ydCB7IENvbW1vbk1vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbic7XG5pbXBvcnQgeyBOZ01vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgRm9ybXNNb2R1bGUgfSBmcm9tICdAYW5ndWxhci9mb3Jtcyc7XG5pbXBvcnQgeyBOekljb25Nb2R1bGUgfSBmcm9tICduZy16b3Jyby1hbnRkL2ljb24nO1xuaW1wb3J0IHsgTnpNZW50aW9uU3VnZ2VzdGlvbkRpcmVjdGl2ZSB9IGZyb20gJy4vbWVudGlvbi1zdWdnZXN0aW9ucyc7XG5pbXBvcnQgeyBOek1lbnRpb25UcmlnZ2VyRGlyZWN0aXZlIH0gZnJvbSAnLi9tZW50aW9uLXRyaWdnZXInO1xuaW1wb3J0IHsgTnpNZW50aW9uQ29tcG9uZW50IH0gZnJvbSAnLi9tZW50aW9uLmNvbXBvbmVudCc7XG5cbmNvbnN0IENPTVBPTkVOVFMgPSBbTnpNZW50aW9uQ29tcG9uZW50LCBOek1lbnRpb25UcmlnZ2VyRGlyZWN0aXZlLCBOek1lbnRpb25TdWdnZXN0aW9uRGlyZWN0aXZlXTtcblxuQE5nTW9kdWxlKHtcbiAgaW1wb3J0czogW0JpZGlNb2R1bGUsIENvbW1vbk1vZHVsZSwgRm9ybXNNb2R1bGUsIE92ZXJsYXlNb2R1bGUsIE56SWNvbk1vZHVsZV0sXG4gIGRlY2xhcmF0aW9uczogWy4uLkNPTVBPTkVOVFNdLFxuICBleHBvcnRzOiBbLi4uQ09NUE9ORU5UU11cbn0pXG5leHBvcnQgY2xhc3MgTnpNZW50aW9uTW9kdWxlIHt9XG4iXX0=