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
import * as i0 from "@angular/core";
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
NzTreeViewModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.1.2", ngImport: i0, type: NzTreeViewModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
NzTreeViewModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "12.0.0", version: "13.1.2", ngImport: i0, type: NzTreeViewModule, declarations: [NzTreeView,
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
        NzTreeNodeIndentLineDirective], imports: [BidiModule, CommonModule, NzNoAnimationModule, ScrollingModule], exports: [NzTreeView,
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
        NzTreeNodeIndentLineDirective] });
NzTreeViewModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "13.1.2", ngImport: i0, type: NzTreeViewModule, imports: [[BidiModule, CommonModule, NzNoAnimationModule, ScrollingModule]] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.1.2", ngImport: i0, type: NzTreeViewModule, decorators: [{
            type: NgModule,
            args: [{
                    imports: [BidiModule, CommonModule, NzNoAnimationModule, ScrollingModule],
                    declarations: [treeWithControlComponents],
                    exports: [treeWithControlComponents]
                }]
        }] });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidHJlZS12aWV3Lm1vZHVsZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL2NvbXBvbmVudHMvdHJlZS12aWV3L3RyZWUtdmlldy5tb2R1bGUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7OztHQUdHO0FBRUgsT0FBTyxFQUFFLFVBQVUsRUFBRSxNQUFNLG1CQUFtQixDQUFDO0FBQy9DLE9BQU8sRUFBRSxlQUFlLEVBQUUsTUFBTSx3QkFBd0IsQ0FBQztBQUN6RCxPQUFPLEVBQUUsWUFBWSxFQUFFLE1BQU0saUJBQWlCLENBQUM7QUFDL0MsT0FBTyxFQUFFLFFBQVEsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUV6QyxPQUFPLEVBQUUsbUJBQW1CLEVBQUUsTUFBTSxpQ0FBaUMsQ0FBQztBQUV0RSxPQUFPLEVBQUUsMkJBQTJCLEVBQUUsTUFBTSxZQUFZLENBQUM7QUFDekQsT0FBTyxFQUFFLDZCQUE2QixFQUFFLDBCQUEwQixFQUFFLE1BQU0sVUFBVSxDQUFDO0FBQ3JGLE9BQU8sRUFBRSxtQkFBbUIsRUFBRSxzQkFBc0IsRUFBRSxzQ0FBc0MsRUFBRSxNQUFNLFFBQVEsQ0FBQztBQUM3RyxPQUFPLEVBQUUseUJBQXlCLEVBQUUsTUFBTSxVQUFVLENBQUM7QUFDckQsT0FBTyxFQUFFLHlCQUF5QixFQUFFLE1BQU0sVUFBVSxDQUFDO0FBQ3JELE9BQU8sRUFBRSwwQkFBMEIsRUFBRSxNQUFNLFdBQVcsQ0FBQztBQUN2RCxPQUFPLEVBQ0wsNkJBQTZCLEVBQzdCLG1DQUFtQyxFQUNuQyx5QkFBeUIsRUFDekIsbUNBQW1DLEVBQ3BDLE1BQU0sVUFBVSxDQUFDO0FBQ2xCLE9BQU8sRUFBRSxVQUFVLEVBQUUsTUFBTSxRQUFRLENBQUM7QUFDcEMsT0FBTyxFQUFFLG1CQUFtQixFQUFFLE1BQU0sYUFBYSxDQUFDO0FBQ2xELE9BQU8sRUFBRSxnQ0FBZ0MsRUFBRSxNQUFNLDRCQUE0QixDQUFDOztBQUU5RSxNQUFNLHlCQUF5QixHQUFHO0lBQ2hDLFVBQVU7SUFDVix5QkFBeUI7SUFDekIsbUJBQW1CO0lBQ25CLHNCQUFzQjtJQUN0QixtQkFBbUI7SUFDbkIseUJBQXlCO0lBQ3pCLDBCQUEwQjtJQUMxQixtQ0FBbUM7SUFDbkMsbUNBQW1DO0lBQ25DLHlCQUF5QjtJQUN6Qiw2QkFBNkI7SUFDN0IsMkJBQTJCO0lBQzNCLDBCQUEwQjtJQUMxQixnQ0FBZ0M7SUFDaEMsc0NBQXNDO0lBQ3RDLDZCQUE2QjtDQUM5QixDQUFDO0FBT0YsTUFBTSxPQUFPLGdCQUFnQjs7NkdBQWhCLGdCQUFnQjs4R0FBaEIsZ0JBQWdCLGlCQXZCM0IsVUFBVTtRQUNWLHlCQUF5QjtRQUN6QixtQkFBbUI7UUFDbkIsc0JBQXNCO1FBQ3RCLG1CQUFtQjtRQUNuQix5QkFBeUI7UUFDekIsMEJBQTBCO1FBQzFCLG1DQUFtQztRQUNuQyxtQ0FBbUM7UUFDbkMseUJBQXlCO1FBQ3pCLDZCQUE2QjtRQUM3QiwyQkFBMkI7UUFDM0IsMEJBQTBCO1FBQzFCLGdDQUFnQztRQUNoQyxzQ0FBc0M7UUFDdEMsNkJBQTZCLGFBSW5CLFVBQVUsRUFBRSxZQUFZLEVBQUUsbUJBQW1CLEVBQUUsZUFBZSxhQW5CeEUsVUFBVTtRQUNWLHlCQUF5QjtRQUN6QixtQkFBbUI7UUFDbkIsc0JBQXNCO1FBQ3RCLG1CQUFtQjtRQUNuQix5QkFBeUI7UUFDekIsMEJBQTBCO1FBQzFCLG1DQUFtQztRQUNuQyxtQ0FBbUM7UUFDbkMseUJBQXlCO1FBQ3pCLDZCQUE2QjtRQUM3QiwyQkFBMkI7UUFDM0IsMEJBQTBCO1FBQzFCLGdDQUFnQztRQUNoQyxzQ0FBc0M7UUFDdEMsNkJBQTZCOzhHQVFsQixnQkFBZ0IsWUFKbEIsQ0FBQyxVQUFVLEVBQUUsWUFBWSxFQUFFLG1CQUFtQixFQUFFLGVBQWUsQ0FBQzsyRkFJOUQsZ0JBQWdCO2tCQUw1QixRQUFRO21CQUFDO29CQUNSLE9BQU8sRUFBRSxDQUFDLFVBQVUsRUFBRSxZQUFZLEVBQUUsbUJBQW1CLEVBQUUsZUFBZSxDQUFDO29CQUN6RSxZQUFZLEVBQUUsQ0FBQyx5QkFBeUIsQ0FBQztvQkFDekMsT0FBTyxFQUFFLENBQUMseUJBQXlCLENBQUM7aUJBQ3JDIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKiBVc2Ugb2YgdGhpcyBzb3VyY2UgY29kZSBpcyBnb3Zlcm5lZCBieSBhbiBNSVQtc3R5bGUgbGljZW5zZSB0aGF0IGNhbiBiZVxuICogZm91bmQgaW4gdGhlIExJQ0VOU0UgZmlsZSBhdCBodHRwczovL2dpdGh1Yi5jb20vTkctWk9SUk8vbmctem9ycm8tYW50ZC9ibG9iL21hc3Rlci9MSUNFTlNFXG4gKi9cblxuaW1wb3J0IHsgQmlkaU1vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2Nkay9iaWRpJztcbmltcG9ydCB7IFNjcm9sbGluZ01vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2Nkay9zY3JvbGxpbmcnO1xuaW1wb3J0IHsgQ29tbW9uTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uJztcbmltcG9ydCB7IE5nTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5cbmltcG9ydCB7IE56Tm9BbmltYXRpb25Nb2R1bGUgfSBmcm9tICduZy16b3Jyby1hbnRkL2NvcmUvbm8tYW5pbWF0aW9uJztcblxuaW1wb3J0IHsgTnpUcmVlTm9kZUNoZWNrYm94Q29tcG9uZW50IH0gZnJvbSAnLi9jaGVja2JveCc7XG5pbXBvcnQgeyBOelRyZWVOb2RlSW5kZW50TGluZURpcmVjdGl2ZSwgTnpUcmVlTm9kZUluZGVudHNDb21wb25lbnQgfSBmcm9tICcuL2luZGVudCc7XG5pbXBvcnQgeyBOelRyZWVOb2RlQ29tcG9uZW50LCBOelRyZWVOb2RlRGVmRGlyZWN0aXZlLCBOelRyZWVWaXJ0dWFsU2Nyb2xsTm9kZU91dGxldERpcmVjdGl2ZSB9IGZyb20gJy4vbm9kZSc7XG5pbXBvcnQgeyBOelRyZWVOb2RlT3B0aW9uQ29tcG9uZW50IH0gZnJvbSAnLi9vcHRpb24nO1xuaW1wb3J0IHsgTnpUcmVlTm9kZU91dGxldERpcmVjdGl2ZSB9IGZyb20gJy4vb3V0bGV0JztcbmltcG9ydCB7IE56VHJlZU5vZGVQYWRkaW5nRGlyZWN0aXZlIH0gZnJvbSAnLi9wYWRkaW5nJztcbmltcG9ydCB7XG4gIE56VHJlZU5vZGVOb29wVG9nZ2xlRGlyZWN0aXZlLFxuICBOelRyZWVOb2RlVG9nZ2xlQWN0aXZlSWNvbkRpcmVjdGl2ZSxcbiAgTnpUcmVlTm9kZVRvZ2dsZURpcmVjdGl2ZSxcbiAgTnpUcmVlTm9kZVRvZ2dsZVJvdGF0ZUljb25EaXJlY3RpdmVcbn0gZnJvbSAnLi90b2dnbGUnO1xuaW1wb3J0IHsgTnpUcmVlVmlldyB9IGZyb20gJy4vdHJlZSc7XG5pbXBvcnQgeyBOelRyZWVWaWV3Q29tcG9uZW50IH0gZnJvbSAnLi90cmVlLXZpZXcnO1xuaW1wb3J0IHsgTnpUcmVlVmlydHVhbFNjcm9sbFZpZXdDb21wb25lbnQgfSBmcm9tICcuL3RyZWUtdmlydHVhbC1zY3JvbGwtdmlldyc7XG5cbmNvbnN0IHRyZWVXaXRoQ29udHJvbENvbXBvbmVudHMgPSBbXG4gIE56VHJlZVZpZXcsXG4gIE56VHJlZU5vZGVPdXRsZXREaXJlY3RpdmUsXG4gIE56VHJlZVZpZXdDb21wb25lbnQsXG4gIE56VHJlZU5vZGVEZWZEaXJlY3RpdmUsXG4gIE56VHJlZU5vZGVDb21wb25lbnQsXG4gIE56VHJlZU5vZGVUb2dnbGVEaXJlY3RpdmUsXG4gIE56VHJlZU5vZGVQYWRkaW5nRGlyZWN0aXZlLFxuICBOelRyZWVOb2RlVG9nZ2xlUm90YXRlSWNvbkRpcmVjdGl2ZSxcbiAgTnpUcmVlTm9kZVRvZ2dsZUFjdGl2ZUljb25EaXJlY3RpdmUsXG4gIE56VHJlZU5vZGVPcHRpb25Db21wb25lbnQsXG4gIE56VHJlZU5vZGVOb29wVG9nZ2xlRGlyZWN0aXZlLFxuICBOelRyZWVOb2RlQ2hlY2tib3hDb21wb25lbnQsXG4gIE56VHJlZU5vZGVJbmRlbnRzQ29tcG9uZW50LFxuICBOelRyZWVWaXJ0dWFsU2Nyb2xsVmlld0NvbXBvbmVudCxcbiAgTnpUcmVlVmlydHVhbFNjcm9sbE5vZGVPdXRsZXREaXJlY3RpdmUsXG4gIE56VHJlZU5vZGVJbmRlbnRMaW5lRGlyZWN0aXZlXG5dO1xuXG5ATmdNb2R1bGUoe1xuICBpbXBvcnRzOiBbQmlkaU1vZHVsZSwgQ29tbW9uTW9kdWxlLCBOek5vQW5pbWF0aW9uTW9kdWxlLCBTY3JvbGxpbmdNb2R1bGVdLFxuICBkZWNsYXJhdGlvbnM6IFt0cmVlV2l0aENvbnRyb2xDb21wb25lbnRzXSxcbiAgZXhwb3J0czogW3RyZWVXaXRoQ29udHJvbENvbXBvbmVudHNdXG59KVxuZXhwb3J0IGNsYXNzIE56VHJlZVZpZXdNb2R1bGUge31cbiJdfQ==