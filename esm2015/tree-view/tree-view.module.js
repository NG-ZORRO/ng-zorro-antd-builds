/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */
import { BidiModule } from '@angular/cdk/bidi';
import { ScrollingModule } from '@angular/cdk/scrolling';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { NzNoAnimationModule } from 'ng-zorro-antd/core/no-animation';
import { NzTreeNodeCheckboxComponent } from './checkbox';
import { NzTreeNodeIndentLineDirective, NzTreeNodeIndentsComponent } from './indent';
import { NzTreeNodeComponent, NzTreeNodeDefDirective, NzTreeVirtualScrollNodeOutletDirective } from './node';
import { NzTreeNodeOptionComponent } from './option';
import { NzTreeNodeOutletDirective } from './outlet';
import { NzTreeNodePaddingDirective } from './padding';
import { NzTreeNodeNoopToggleDirective, NzTreeNodeToggleActiveIconDirective, NzTreeNodeToggleDirective, NzTreeNodeToggleRotateIconDirective } from './toggle';
import { NzTreeView } from './tree';
import { NzTreeViewComponent } from './tree-view';
import { NzTreeVirtualScrollViewComponent } from './tree-virtual-scroll-view';
const treeWithControlComponents = [
    NzTreeView,
    NzTreeNodeOutletDirective,
    NzTreeViewComponent,
    NzTreeNodeDefDirective,
    NzTreeNodeComponent,
    NzTreeNodeToggleDirective,
    NzTreeNodePaddingDirective,
    NzTreeNodeToggleRotateIconDirective,
    NzTreeNodeToggleActiveIconDirective,
    NzTreeNodeOptionComponent,
    NzTreeNodeNoopToggleDirective,
    NzTreeNodeCheckboxComponent,
    NzTreeNodeIndentsComponent,
    NzTreeVirtualScrollViewComponent,
    NzTreeVirtualScrollNodeOutletDirective,
    NzTreeNodeIndentLineDirective
];
export class NzTreeViewModule {
}
NzTreeViewModule.decorators = [
    { type: NgModule, args: [{
                imports: [BidiModule, CommonModule, NzNoAnimationModule, ScrollingModule],
                declarations: [treeWithControlComponents],
                exports: [treeWithControlComponents]
            },] }
];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidHJlZS12aWV3Lm1vZHVsZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL2NvbXBvbmVudHMvdHJlZS12aWV3L3RyZWUtdmlldy5tb2R1bGUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7OztHQUdHO0FBRUgsT0FBTyxFQUFFLFVBQVUsRUFBRSxNQUFNLG1CQUFtQixDQUFDO0FBQy9DLE9BQU8sRUFBRSxlQUFlLEVBQUUsTUFBTSx3QkFBd0IsQ0FBQztBQUN6RCxPQUFPLEVBQUUsWUFBWSxFQUFFLE1BQU0saUJBQWlCLENBQUM7QUFDL0MsT0FBTyxFQUFFLFFBQVEsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUV6QyxPQUFPLEVBQUUsbUJBQW1CLEVBQUUsTUFBTSxpQ0FBaUMsQ0FBQztBQUV0RSxPQUFPLEVBQUUsMkJBQTJCLEVBQUUsTUFBTSxZQUFZLENBQUM7QUFDekQsT0FBTyxFQUFFLDZCQUE2QixFQUFFLDBCQUEwQixFQUFFLE1BQU0sVUFBVSxDQUFDO0FBQ3JGLE9BQU8sRUFBRSxtQkFBbUIsRUFBRSxzQkFBc0IsRUFBRSxzQ0FBc0MsRUFBRSxNQUFNLFFBQVEsQ0FBQztBQUM3RyxPQUFPLEVBQUUseUJBQXlCLEVBQUUsTUFBTSxVQUFVLENBQUM7QUFDckQsT0FBTyxFQUFFLHlCQUF5QixFQUFFLE1BQU0sVUFBVSxDQUFDO0FBQ3JELE9BQU8sRUFBRSwwQkFBMEIsRUFBRSxNQUFNLFdBQVcsQ0FBQztBQUN2RCxPQUFPLEVBQ0wsNkJBQTZCLEVBQzdCLG1DQUFtQyxFQUNuQyx5QkFBeUIsRUFDekIsbUNBQW1DLEVBQ3BDLE1BQU0sVUFBVSxDQUFDO0FBQ2xCLE9BQU8sRUFBRSxVQUFVLEVBQUUsTUFBTSxRQUFRLENBQUM7QUFDcEMsT0FBTyxFQUFFLG1CQUFtQixFQUFFLE1BQU0sYUFBYSxDQUFDO0FBQ2xELE9BQU8sRUFBRSxnQ0FBZ0MsRUFBRSxNQUFNLDRCQUE0QixDQUFDO0FBRTlFLE1BQU0seUJBQXlCLEdBQUc7SUFDaEMsVUFBVTtJQUNWLHlCQUF5QjtJQUN6QixtQkFBbUI7SUFDbkIsc0JBQXNCO0lBQ3RCLG1CQUFtQjtJQUNuQix5QkFBeUI7SUFDekIsMEJBQTBCO0lBQzFCLG1DQUFtQztJQUNuQyxtQ0FBbUM7SUFDbkMseUJBQXlCO0lBQ3pCLDZCQUE2QjtJQUM3QiwyQkFBMkI7SUFDM0IsMEJBQTBCO0lBQzFCLGdDQUFnQztJQUNoQyxzQ0FBc0M7SUFDdEMsNkJBQTZCO0NBQzlCLENBQUM7QUFPRixNQUFNLE9BQU8sZ0JBQWdCOzs7WUFMNUIsUUFBUSxTQUFDO2dCQUNSLE9BQU8sRUFBRSxDQUFDLFVBQVUsRUFBRSxZQUFZLEVBQUUsbUJBQW1CLEVBQUUsZUFBZSxDQUFDO2dCQUN6RSxZQUFZLEVBQUUsQ0FBQyx5QkFBeUIsQ0FBQztnQkFDekMsT0FBTyxFQUFFLENBQUMseUJBQXlCLENBQUM7YUFDckMiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqIFVzZSBvZiB0aGlzIHNvdXJjZSBjb2RlIGlzIGdvdmVybmVkIGJ5IGFuIE1JVC1zdHlsZSBsaWNlbnNlIHRoYXQgY2FuIGJlXG4gKiBmb3VuZCBpbiB0aGUgTElDRU5TRSBmaWxlIGF0IGh0dHBzOi8vZ2l0aHViLmNvbS9ORy1aT1JSTy9uZy16b3Jyby1hbnRkL2Jsb2IvbWFzdGVyL0xJQ0VOU0VcbiAqL1xuXG5pbXBvcnQgeyBCaWRpTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY2RrL2JpZGknO1xuaW1wb3J0IHsgU2Nyb2xsaW5nTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY2RrL3Njcm9sbGluZyc7XG5pbXBvcnQgeyBDb21tb25Nb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jb21tb24nO1xuaW1wb3J0IHsgTmdNb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcblxuaW1wb3J0IHsgTnpOb0FuaW1hdGlvbk1vZHVsZSB9IGZyb20gJ25nLXpvcnJvLWFudGQvY29yZS9uby1hbmltYXRpb24nO1xuXG5pbXBvcnQgeyBOelRyZWVOb2RlQ2hlY2tib3hDb21wb25lbnQgfSBmcm9tICcuL2NoZWNrYm94JztcbmltcG9ydCB7IE56VHJlZU5vZGVJbmRlbnRMaW5lRGlyZWN0aXZlLCBOelRyZWVOb2RlSW5kZW50c0NvbXBvbmVudCB9IGZyb20gJy4vaW5kZW50JztcbmltcG9ydCB7IE56VHJlZU5vZGVDb21wb25lbnQsIE56VHJlZU5vZGVEZWZEaXJlY3RpdmUsIE56VHJlZVZpcnR1YWxTY3JvbGxOb2RlT3V0bGV0RGlyZWN0aXZlIH0gZnJvbSAnLi9ub2RlJztcbmltcG9ydCB7IE56VHJlZU5vZGVPcHRpb25Db21wb25lbnQgfSBmcm9tICcuL29wdGlvbic7XG5pbXBvcnQgeyBOelRyZWVOb2RlT3V0bGV0RGlyZWN0aXZlIH0gZnJvbSAnLi9vdXRsZXQnO1xuaW1wb3J0IHsgTnpUcmVlTm9kZVBhZGRpbmdEaXJlY3RpdmUgfSBmcm9tICcuL3BhZGRpbmcnO1xuaW1wb3J0IHtcbiAgTnpUcmVlTm9kZU5vb3BUb2dnbGVEaXJlY3RpdmUsXG4gIE56VHJlZU5vZGVUb2dnbGVBY3RpdmVJY29uRGlyZWN0aXZlLFxuICBOelRyZWVOb2RlVG9nZ2xlRGlyZWN0aXZlLFxuICBOelRyZWVOb2RlVG9nZ2xlUm90YXRlSWNvbkRpcmVjdGl2ZVxufSBmcm9tICcuL3RvZ2dsZSc7XG5pbXBvcnQgeyBOelRyZWVWaWV3IH0gZnJvbSAnLi90cmVlJztcbmltcG9ydCB7IE56VHJlZVZpZXdDb21wb25lbnQgfSBmcm9tICcuL3RyZWUtdmlldyc7XG5pbXBvcnQgeyBOelRyZWVWaXJ0dWFsU2Nyb2xsVmlld0NvbXBvbmVudCB9IGZyb20gJy4vdHJlZS12aXJ0dWFsLXNjcm9sbC12aWV3JztcblxuY29uc3QgdHJlZVdpdGhDb250cm9sQ29tcG9uZW50cyA9IFtcbiAgTnpUcmVlVmlldyxcbiAgTnpUcmVlTm9kZU91dGxldERpcmVjdGl2ZSxcbiAgTnpUcmVlVmlld0NvbXBvbmVudCxcbiAgTnpUcmVlTm9kZURlZkRpcmVjdGl2ZSxcbiAgTnpUcmVlTm9kZUNvbXBvbmVudCxcbiAgTnpUcmVlTm9kZVRvZ2dsZURpcmVjdGl2ZSxcbiAgTnpUcmVlTm9kZVBhZGRpbmdEaXJlY3RpdmUsXG4gIE56VHJlZU5vZGVUb2dnbGVSb3RhdGVJY29uRGlyZWN0aXZlLFxuICBOelRyZWVOb2RlVG9nZ2xlQWN0aXZlSWNvbkRpcmVjdGl2ZSxcbiAgTnpUcmVlTm9kZU9wdGlvbkNvbXBvbmVudCxcbiAgTnpUcmVlTm9kZU5vb3BUb2dnbGVEaXJlY3RpdmUsXG4gIE56VHJlZU5vZGVDaGVja2JveENvbXBvbmVudCxcbiAgTnpUcmVlTm9kZUluZGVudHNDb21wb25lbnQsXG4gIE56VHJlZVZpcnR1YWxTY3JvbGxWaWV3Q29tcG9uZW50LFxuICBOelRyZWVWaXJ0dWFsU2Nyb2xsTm9kZU91dGxldERpcmVjdGl2ZSxcbiAgTnpUcmVlTm9kZUluZGVudExpbmVEaXJlY3RpdmVcbl07XG5cbkBOZ01vZHVsZSh7XG4gIGltcG9ydHM6IFtCaWRpTW9kdWxlLCBDb21tb25Nb2R1bGUsIE56Tm9BbmltYXRpb25Nb2R1bGUsIFNjcm9sbGluZ01vZHVsZV0sXG4gIGRlY2xhcmF0aW9uczogW3RyZWVXaXRoQ29udHJvbENvbXBvbmVudHNdLFxuICBleHBvcnRzOiBbdHJlZVdpdGhDb250cm9sQ29tcG9uZW50c11cbn0pXG5leHBvcnQgY2xhc3MgTnpUcmVlVmlld01vZHVsZSB7fVxuIl19