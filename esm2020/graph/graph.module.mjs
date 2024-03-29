/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { NzNoAnimationModule } from 'ng-zorro-antd/core/no-animation';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzSpinModule } from 'ng-zorro-antd/spin';
import { NzGraphDefsComponent } from './graph-defs.component';
import { NzGraphEdgeComponent } from './graph-edge.component';
import { NzGraphEdgeDirective } from './graph-edge.directive';
import { NzGraphGroupNodeDirective } from './graph-group-node.directive';
import { NzGraphMinimapComponent } from './graph-minimap.component';
import { NzGraphNodeComponent } from './graph-node.component';
import { NzGraphNodeDirective } from './graph-node.directive';
import { NzGraphZoomDirective } from './graph-zoom.directive';
import { NzGraphComponent } from './graph.component';
import * as i0 from "@angular/core";
const COMPONENTS = [
    NzGraphComponent,
    NzGraphMinimapComponent,
    NzGraphDefsComponent,
    NzGraphNodeDirective,
    NzGraphGroupNodeDirective,
    NzGraphZoomDirective,
    NzGraphNodeComponent,
    NzGraphEdgeComponent,
    NzGraphEdgeDirective
];
export class NzGraphModule {
}
NzGraphModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.1.2", ngImport: i0, type: NzGraphModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
NzGraphModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "12.0.0", version: "13.1.2", ngImport: i0, type: NzGraphModule, declarations: [NzGraphComponent,
        NzGraphMinimapComponent,
        NzGraphDefsComponent,
        NzGraphNodeDirective,
        NzGraphGroupNodeDirective,
        NzGraphZoomDirective,
        NzGraphNodeComponent,
        NzGraphEdgeComponent,
        NzGraphEdgeDirective], imports: [CommonModule, NzIconModule, NzSpinModule, NzNoAnimationModule], exports: [NzGraphComponent,
        NzGraphMinimapComponent,
        NzGraphDefsComponent,
        NzGraphNodeDirective,
        NzGraphGroupNodeDirective,
        NzGraphZoomDirective,
        NzGraphNodeComponent,
        NzGraphEdgeComponent,
        NzGraphEdgeDirective] });
NzGraphModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "13.1.2", ngImport: i0, type: NzGraphModule, imports: [[CommonModule, NzIconModule, NzSpinModule, NzNoAnimationModule]] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.1.2", ngImport: i0, type: NzGraphModule, decorators: [{
            type: NgModule,
            args: [{
                    declarations: [...COMPONENTS],
                    imports: [CommonModule, NzIconModule, NzSpinModule, NzNoAnimationModule],
                    exports: [...COMPONENTS]
                }]
        }] });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZ3JhcGgubW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vY29tcG9uZW50cy9ncmFwaC9ncmFwaC5tb2R1bGUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7OztHQUdHO0FBRUgsT0FBTyxFQUFFLFlBQVksRUFBRSxNQUFNLGlCQUFpQixDQUFDO0FBQy9DLE9BQU8sRUFBRSxRQUFRLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFFekMsT0FBTyxFQUFFLG1CQUFtQixFQUFFLE1BQU0saUNBQWlDLENBQUM7QUFDdEUsT0FBTyxFQUFFLFlBQVksRUFBRSxNQUFNLG9CQUFvQixDQUFDO0FBQ2xELE9BQU8sRUFBRSxZQUFZLEVBQUUsTUFBTSxvQkFBb0IsQ0FBQztBQUVsRCxPQUFPLEVBQUUsb0JBQW9CLEVBQUUsTUFBTSx3QkFBd0IsQ0FBQztBQUM5RCxPQUFPLEVBQUUsb0JBQW9CLEVBQUUsTUFBTSx3QkFBd0IsQ0FBQztBQUM5RCxPQUFPLEVBQUUsb0JBQW9CLEVBQUUsTUFBTSx3QkFBd0IsQ0FBQztBQUM5RCxPQUFPLEVBQUUseUJBQXlCLEVBQUUsTUFBTSw4QkFBOEIsQ0FBQztBQUN6RSxPQUFPLEVBQUUsdUJBQXVCLEVBQUUsTUFBTSwyQkFBMkIsQ0FBQztBQUNwRSxPQUFPLEVBQUUsb0JBQW9CLEVBQUUsTUFBTSx3QkFBd0IsQ0FBQztBQUM5RCxPQUFPLEVBQUUsb0JBQW9CLEVBQUUsTUFBTSx3QkFBd0IsQ0FBQztBQUM5RCxPQUFPLEVBQUUsb0JBQW9CLEVBQUUsTUFBTSx3QkFBd0IsQ0FBQztBQUM5RCxPQUFPLEVBQUUsZ0JBQWdCLEVBQUUsTUFBTSxtQkFBbUIsQ0FBQzs7QUFFckQsTUFBTSxVQUFVLEdBQUc7SUFDakIsZ0JBQWdCO0lBQ2hCLHVCQUF1QjtJQUN2QixvQkFBb0I7SUFDcEIsb0JBQW9CO0lBQ3BCLHlCQUF5QjtJQUN6QixvQkFBb0I7SUFDcEIsb0JBQW9CO0lBQ3BCLG9CQUFvQjtJQUNwQixvQkFBb0I7Q0FDckIsQ0FBQztBQU9GLE1BQU0sT0FBTyxhQUFhOzswR0FBYixhQUFhOzJHQUFiLGFBQWEsaUJBaEJ4QixnQkFBZ0I7UUFDaEIsdUJBQXVCO1FBQ3ZCLG9CQUFvQjtRQUNwQixvQkFBb0I7UUFDcEIseUJBQXlCO1FBQ3pCLG9CQUFvQjtRQUNwQixvQkFBb0I7UUFDcEIsb0JBQW9CO1FBQ3BCLG9CQUFvQixhQUtWLFlBQVksRUFBRSxZQUFZLEVBQUUsWUFBWSxFQUFFLG1CQUFtQixhQWJ2RSxnQkFBZ0I7UUFDaEIsdUJBQXVCO1FBQ3ZCLG9CQUFvQjtRQUNwQixvQkFBb0I7UUFDcEIseUJBQXlCO1FBQ3pCLG9CQUFvQjtRQUNwQixvQkFBb0I7UUFDcEIsb0JBQW9CO1FBQ3BCLG9CQUFvQjsyR0FRVCxhQUFhLFlBSGYsQ0FBQyxZQUFZLEVBQUUsWUFBWSxFQUFFLFlBQVksRUFBRSxtQkFBbUIsQ0FBQzsyRkFHN0QsYUFBYTtrQkFMekIsUUFBUTttQkFBQztvQkFDUixZQUFZLEVBQUUsQ0FBQyxHQUFHLFVBQVUsQ0FBQztvQkFDN0IsT0FBTyxFQUFFLENBQUMsWUFBWSxFQUFFLFlBQVksRUFBRSxZQUFZLEVBQUUsbUJBQW1CLENBQUM7b0JBQ3hFLE9BQU8sRUFBRSxDQUFDLEdBQUcsVUFBVSxDQUFDO2lCQUN6QiIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxuICogVXNlIG9mIHRoaXMgc291cmNlIGNvZGUgaXMgZ292ZXJuZWQgYnkgYW4gTUlULXN0eWxlIGxpY2Vuc2UgdGhhdCBjYW4gYmVcbiAqIGZvdW5kIGluIHRoZSBMSUNFTlNFIGZpbGUgYXQgaHR0cHM6Ly9naXRodWIuY29tL05HLVpPUlJPL25nLXpvcnJvLWFudGQvYmxvYi9tYXN0ZXIvTElDRU5TRVxuICovXG5cbmltcG9ydCB7IENvbW1vbk1vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbic7XG5pbXBvcnQgeyBOZ01vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuXG5pbXBvcnQgeyBOek5vQW5pbWF0aW9uTW9kdWxlIH0gZnJvbSAnbmctem9ycm8tYW50ZC9jb3JlL25vLWFuaW1hdGlvbic7XG5pbXBvcnQgeyBOekljb25Nb2R1bGUgfSBmcm9tICduZy16b3Jyby1hbnRkL2ljb24nO1xuaW1wb3J0IHsgTnpTcGluTW9kdWxlIH0gZnJvbSAnbmctem9ycm8tYW50ZC9zcGluJztcblxuaW1wb3J0IHsgTnpHcmFwaERlZnNDb21wb25lbnQgfSBmcm9tICcuL2dyYXBoLWRlZnMuY29tcG9uZW50JztcbmltcG9ydCB7IE56R3JhcGhFZGdlQ29tcG9uZW50IH0gZnJvbSAnLi9ncmFwaC1lZGdlLmNvbXBvbmVudCc7XG5pbXBvcnQgeyBOekdyYXBoRWRnZURpcmVjdGl2ZSB9IGZyb20gJy4vZ3JhcGgtZWRnZS5kaXJlY3RpdmUnO1xuaW1wb3J0IHsgTnpHcmFwaEdyb3VwTm9kZURpcmVjdGl2ZSB9IGZyb20gJy4vZ3JhcGgtZ3JvdXAtbm9kZS5kaXJlY3RpdmUnO1xuaW1wb3J0IHsgTnpHcmFwaE1pbmltYXBDb21wb25lbnQgfSBmcm9tICcuL2dyYXBoLW1pbmltYXAuY29tcG9uZW50JztcbmltcG9ydCB7IE56R3JhcGhOb2RlQ29tcG9uZW50IH0gZnJvbSAnLi9ncmFwaC1ub2RlLmNvbXBvbmVudCc7XG5pbXBvcnQgeyBOekdyYXBoTm9kZURpcmVjdGl2ZSB9IGZyb20gJy4vZ3JhcGgtbm9kZS5kaXJlY3RpdmUnO1xuaW1wb3J0IHsgTnpHcmFwaFpvb21EaXJlY3RpdmUgfSBmcm9tICcuL2dyYXBoLXpvb20uZGlyZWN0aXZlJztcbmltcG9ydCB7IE56R3JhcGhDb21wb25lbnQgfSBmcm9tICcuL2dyYXBoLmNvbXBvbmVudCc7XG5cbmNvbnN0IENPTVBPTkVOVFMgPSBbXG4gIE56R3JhcGhDb21wb25lbnQsXG4gIE56R3JhcGhNaW5pbWFwQ29tcG9uZW50LFxuICBOekdyYXBoRGVmc0NvbXBvbmVudCxcbiAgTnpHcmFwaE5vZGVEaXJlY3RpdmUsXG4gIE56R3JhcGhHcm91cE5vZGVEaXJlY3RpdmUsXG4gIE56R3JhcGhab29tRGlyZWN0aXZlLFxuICBOekdyYXBoTm9kZUNvbXBvbmVudCxcbiAgTnpHcmFwaEVkZ2VDb21wb25lbnQsXG4gIE56R3JhcGhFZGdlRGlyZWN0aXZlXG5dO1xuXG5ATmdNb2R1bGUoe1xuICBkZWNsYXJhdGlvbnM6IFsuLi5DT01QT05FTlRTXSxcbiAgaW1wb3J0czogW0NvbW1vbk1vZHVsZSwgTnpJY29uTW9kdWxlLCBOelNwaW5Nb2R1bGUsIE56Tm9BbmltYXRpb25Nb2R1bGVdLFxuICBleHBvcnRzOiBbLi4uQ09NUE9ORU5UU11cbn0pXG5leHBvcnQgY2xhc3MgTnpHcmFwaE1vZHVsZSB7fVxuIl19