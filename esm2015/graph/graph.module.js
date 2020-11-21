/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzSpinModule } from 'ng-zorro-antd/spin';
import { NzCustomGraphNodeDirective } from './custom-graph-node.directive';
import { NzGraphDefsComponent } from './graph-defs.component';
import { NzGraphEdgeDirective } from './graph-edge.directive';
import { NzGraphMinimapComponent } from './graph-minimap.component';
import { NzGraphNodeDirective } from './graph-node.directive';
import { NzGraphSvgContainerComponent } from './graph-svg-container.component';
import { NzGraphComponent } from './graph.component';
const COMPONENTS = [
    NzGraphComponent,
    NzGraphSvgContainerComponent,
    NzGraphEdgeDirective,
    NzGraphNodeDirective,
    NzGraphMinimapComponent,
    NzGraphDefsComponent,
    NzCustomGraphNodeDirective
];
export class NzGraphModule {
}
NzGraphModule.decorators = [
    { type: NgModule, args: [{
                declarations: [...COMPONENTS],
                imports: [CommonModule, NzIconModule, NzSpinModule],
                exports: [...COMPONENTS]
            },] }
];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZ3JhcGgubW9kdWxlLmpzIiwic291cmNlUm9vdCI6Ii9ob21lL3ZzdHMvd29yay8xL3MvY29tcG9uZW50cy9ncmFwaC8iLCJzb3VyY2VzIjpbImdyYXBoLm1vZHVsZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7O0dBR0c7QUFFSCxPQUFPLEVBQUUsWUFBWSxFQUFFLE1BQU0saUJBQWlCLENBQUM7QUFDL0MsT0FBTyxFQUFFLFFBQVEsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUN6QyxPQUFPLEVBQUUsWUFBWSxFQUFFLE1BQU0sb0JBQW9CLENBQUM7QUFDbEQsT0FBTyxFQUFFLFlBQVksRUFBRSxNQUFNLG9CQUFvQixDQUFDO0FBQ2xELE9BQU8sRUFBRSwwQkFBMEIsRUFBRSxNQUFNLCtCQUErQixDQUFDO0FBQzNFLE9BQU8sRUFBRSxvQkFBb0IsRUFBRSxNQUFNLHdCQUF3QixDQUFDO0FBQzlELE9BQU8sRUFBRSxvQkFBb0IsRUFBRSxNQUFNLHdCQUF3QixDQUFDO0FBQzlELE9BQU8sRUFBRSx1QkFBdUIsRUFBRSxNQUFNLDJCQUEyQixDQUFDO0FBQ3BFLE9BQU8sRUFBRSxvQkFBb0IsRUFBRSxNQUFNLHdCQUF3QixDQUFDO0FBQzlELE9BQU8sRUFBRSw0QkFBNEIsRUFBRSxNQUFNLGlDQUFpQyxDQUFDO0FBQy9FLE9BQU8sRUFBRSxnQkFBZ0IsRUFBRSxNQUFNLG1CQUFtQixDQUFDO0FBRXJELE1BQU0sVUFBVSxHQUFHO0lBQ2pCLGdCQUFnQjtJQUNoQiw0QkFBNEI7SUFDNUIsb0JBQW9CO0lBQ3BCLG9CQUFvQjtJQUNwQix1QkFBdUI7SUFDdkIsb0JBQW9CO0lBQ3BCLDBCQUEwQjtDQUMzQixDQUFDO0FBT0YsTUFBTSxPQUFPLGFBQWE7OztZQUx6QixRQUFRLFNBQUM7Z0JBQ1IsWUFBWSxFQUFFLENBQUMsR0FBRyxVQUFVLENBQUM7Z0JBQzdCLE9BQU8sRUFBRSxDQUFDLFlBQVksRUFBRSxZQUFZLEVBQUUsWUFBWSxDQUFDO2dCQUNuRCxPQUFPLEVBQUUsQ0FBQyxHQUFHLFVBQVUsQ0FBQzthQUN6QiIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxuICogVXNlIG9mIHRoaXMgc291cmNlIGNvZGUgaXMgZ292ZXJuZWQgYnkgYW4gTUlULXN0eWxlIGxpY2Vuc2UgdGhhdCBjYW4gYmVcbiAqIGZvdW5kIGluIHRoZSBMSUNFTlNFIGZpbGUgYXQgaHR0cHM6Ly9naXRodWIuY29tL05HLVpPUlJPL25nLXpvcnJvLWFudGQvYmxvYi9tYXN0ZXIvTElDRU5TRVxuICovXG5cbmltcG9ydCB7IENvbW1vbk1vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbic7XG5pbXBvcnQgeyBOZ01vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgTnpJY29uTW9kdWxlIH0gZnJvbSAnbmctem9ycm8tYW50ZC9pY29uJztcbmltcG9ydCB7IE56U3Bpbk1vZHVsZSB9IGZyb20gJ25nLXpvcnJvLWFudGQvc3Bpbic7XG5pbXBvcnQgeyBOekN1c3RvbUdyYXBoTm9kZURpcmVjdGl2ZSB9IGZyb20gJy4vY3VzdG9tLWdyYXBoLW5vZGUuZGlyZWN0aXZlJztcbmltcG9ydCB7IE56R3JhcGhEZWZzQ29tcG9uZW50IH0gZnJvbSAnLi9ncmFwaC1kZWZzLmNvbXBvbmVudCc7XG5pbXBvcnQgeyBOekdyYXBoRWRnZURpcmVjdGl2ZSB9IGZyb20gJy4vZ3JhcGgtZWRnZS5kaXJlY3RpdmUnO1xuaW1wb3J0IHsgTnpHcmFwaE1pbmltYXBDb21wb25lbnQgfSBmcm9tICcuL2dyYXBoLW1pbmltYXAuY29tcG9uZW50JztcbmltcG9ydCB7IE56R3JhcGhOb2RlRGlyZWN0aXZlIH0gZnJvbSAnLi9ncmFwaC1ub2RlLmRpcmVjdGl2ZSc7XG5pbXBvcnQgeyBOekdyYXBoU3ZnQ29udGFpbmVyQ29tcG9uZW50IH0gZnJvbSAnLi9ncmFwaC1zdmctY29udGFpbmVyLmNvbXBvbmVudCc7XG5pbXBvcnQgeyBOekdyYXBoQ29tcG9uZW50IH0gZnJvbSAnLi9ncmFwaC5jb21wb25lbnQnO1xuXG5jb25zdCBDT01QT05FTlRTID0gW1xuICBOekdyYXBoQ29tcG9uZW50LFxuICBOekdyYXBoU3ZnQ29udGFpbmVyQ29tcG9uZW50LFxuICBOekdyYXBoRWRnZURpcmVjdGl2ZSxcbiAgTnpHcmFwaE5vZGVEaXJlY3RpdmUsXG4gIE56R3JhcGhNaW5pbWFwQ29tcG9uZW50LFxuICBOekdyYXBoRGVmc0NvbXBvbmVudCxcbiAgTnpDdXN0b21HcmFwaE5vZGVEaXJlY3RpdmVcbl07XG5cbkBOZ01vZHVsZSh7XG4gIGRlY2xhcmF0aW9uczogWy4uLkNPTVBPTkVOVFNdLFxuICBpbXBvcnRzOiBbQ29tbW9uTW9kdWxlLCBOekljb25Nb2R1bGUsIE56U3Bpbk1vZHVsZV0sXG4gIGV4cG9ydHM6IFsuLi5DT01QT05FTlRTXVxufSlcbmV4cG9ydCBjbGFzcyBOekdyYXBoTW9kdWxlIHt9XG4iXX0=