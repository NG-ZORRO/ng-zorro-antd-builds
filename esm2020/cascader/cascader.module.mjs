/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */
import { BidiModule } from '@angular/cdk/bidi';
import { OverlayModule } from '@angular/cdk/overlay';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NzHighlightModule } from 'ng-zorro-antd/core/highlight';
import { NzNoAnimationModule } from 'ng-zorro-antd/core/no-animation';
import { NzOutletModule } from 'ng-zorro-antd/core/outlet';
import { NzOverlayModule } from 'ng-zorro-antd/core/overlay';
import { NzEmptyModule } from 'ng-zorro-antd/empty';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzCascaderOptionComponent } from './cascader-li.component';
import { NzCascaderComponent } from './cascader.component';
import * as i0 from "@angular/core";
export class NzCascaderModule {
}
NzCascaderModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.1.2", ngImport: i0, type: NzCascaderModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
NzCascaderModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "12.0.0", version: "13.1.2", ngImport: i0, type: NzCascaderModule, declarations: [NzCascaderComponent, NzCascaderOptionComponent], imports: [BidiModule,
        CommonModule,
        FormsModule,
        OverlayModule,
        NzOutletModule,
        NzEmptyModule,
        NzHighlightModule,
        NzIconModule,
        NzInputModule,
        NzNoAnimationModule,
        NzOverlayModule], exports: [NzCascaderComponent] });
NzCascaderModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "13.1.2", ngImport: i0, type: NzCascaderModule, imports: [[
            BidiModule,
            CommonModule,
            FormsModule,
            OverlayModule,
            NzOutletModule,
            NzEmptyModule,
            NzHighlightModule,
            NzIconModule,
            NzInputModule,
            NzNoAnimationModule,
            NzOverlayModule
        ]] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.1.2", ngImport: i0, type: NzCascaderModule, decorators: [{
            type: NgModule,
            args: [{
                    imports: [
                        BidiModule,
                        CommonModule,
                        FormsModule,
                        OverlayModule,
                        NzOutletModule,
                        NzEmptyModule,
                        NzHighlightModule,
                        NzIconModule,
                        NzInputModule,
                        NzNoAnimationModule,
                        NzOverlayModule
                    ],
                    declarations: [NzCascaderComponent, NzCascaderOptionComponent],
                    exports: [NzCascaderComponent]
                }]
        }] });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2FzY2FkZXIubW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vY29tcG9uZW50cy9jYXNjYWRlci9jYXNjYWRlci5tb2R1bGUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7OztHQUdHO0FBRUgsT0FBTyxFQUFFLFVBQVUsRUFBRSxNQUFNLG1CQUFtQixDQUFDO0FBQy9DLE9BQU8sRUFBRSxhQUFhLEVBQUUsTUFBTSxzQkFBc0IsQ0FBQztBQUNyRCxPQUFPLEVBQUUsWUFBWSxFQUFFLE1BQU0saUJBQWlCLENBQUM7QUFDL0MsT0FBTyxFQUFFLFFBQVEsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUN6QyxPQUFPLEVBQUUsV0FBVyxFQUFFLE1BQU0sZ0JBQWdCLENBQUM7QUFFN0MsT0FBTyxFQUFFLGlCQUFpQixFQUFFLE1BQU0sOEJBQThCLENBQUM7QUFDakUsT0FBTyxFQUFFLG1CQUFtQixFQUFFLE1BQU0saUNBQWlDLENBQUM7QUFDdEUsT0FBTyxFQUFFLGNBQWMsRUFBRSxNQUFNLDJCQUEyQixDQUFDO0FBQzNELE9BQU8sRUFBRSxlQUFlLEVBQUUsTUFBTSw0QkFBNEIsQ0FBQztBQUM3RCxPQUFPLEVBQUUsYUFBYSxFQUFFLE1BQU0scUJBQXFCLENBQUM7QUFDcEQsT0FBTyxFQUFFLFlBQVksRUFBRSxNQUFNLG9CQUFvQixDQUFDO0FBQ2xELE9BQU8sRUFBRSxhQUFhLEVBQUUsTUFBTSxxQkFBcUIsQ0FBQztBQUVwRCxPQUFPLEVBQUUseUJBQXlCLEVBQUUsTUFBTSx5QkFBeUIsQ0FBQztBQUNwRSxPQUFPLEVBQUUsbUJBQW1CLEVBQUUsTUFBTSxzQkFBc0IsQ0FBQzs7QUFtQjNELE1BQU0sT0FBTyxnQkFBZ0I7OzZHQUFoQixnQkFBZ0I7OEdBQWhCLGdCQUFnQixpQkFIWixtQkFBbUIsRUFBRSx5QkFBeUIsYUFaM0QsVUFBVTtRQUNWLFlBQVk7UUFDWixXQUFXO1FBQ1gsYUFBYTtRQUNiLGNBQWM7UUFDZCxhQUFhO1FBQ2IsaUJBQWlCO1FBQ2pCLFlBQVk7UUFDWixhQUFhO1FBQ2IsbUJBQW1CO1FBQ25CLGVBQWUsYUFHUCxtQkFBbUI7OEdBRWxCLGdCQUFnQixZQWhCbEI7WUFDUCxVQUFVO1lBQ1YsWUFBWTtZQUNaLFdBQVc7WUFDWCxhQUFhO1lBQ2IsY0FBYztZQUNkLGFBQWE7WUFDYixpQkFBaUI7WUFDakIsWUFBWTtZQUNaLGFBQWE7WUFDYixtQkFBbUI7WUFDbkIsZUFBZTtTQUNoQjsyRkFJVSxnQkFBZ0I7a0JBakI1QixRQUFRO21CQUFDO29CQUNSLE9BQU8sRUFBRTt3QkFDUCxVQUFVO3dCQUNWLFlBQVk7d0JBQ1osV0FBVzt3QkFDWCxhQUFhO3dCQUNiLGNBQWM7d0JBQ2QsYUFBYTt3QkFDYixpQkFBaUI7d0JBQ2pCLFlBQVk7d0JBQ1osYUFBYTt3QkFDYixtQkFBbUI7d0JBQ25CLGVBQWU7cUJBQ2hCO29CQUNELFlBQVksRUFBRSxDQUFDLG1CQUFtQixFQUFFLHlCQUF5QixDQUFDO29CQUM5RCxPQUFPLEVBQUUsQ0FBQyxtQkFBbUIsQ0FBQztpQkFDL0IiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqIFVzZSBvZiB0aGlzIHNvdXJjZSBjb2RlIGlzIGdvdmVybmVkIGJ5IGFuIE1JVC1zdHlsZSBsaWNlbnNlIHRoYXQgY2FuIGJlXG4gKiBmb3VuZCBpbiB0aGUgTElDRU5TRSBmaWxlIGF0IGh0dHBzOi8vZ2l0aHViLmNvbS9ORy1aT1JSTy9uZy16b3Jyby1hbnRkL2Jsb2IvbWFzdGVyL0xJQ0VOU0VcbiAqL1xuXG5pbXBvcnQgeyBCaWRpTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY2RrL2JpZGknO1xuaW1wb3J0IHsgT3ZlcmxheU1vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2Nkay9vdmVybGF5JztcbmltcG9ydCB7IENvbW1vbk1vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbic7XG5pbXBvcnQgeyBOZ01vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgRm9ybXNNb2R1bGUgfSBmcm9tICdAYW5ndWxhci9mb3Jtcyc7XG5cbmltcG9ydCB7IE56SGlnaGxpZ2h0TW9kdWxlIH0gZnJvbSAnbmctem9ycm8tYW50ZC9jb3JlL2hpZ2hsaWdodCc7XG5pbXBvcnQgeyBOek5vQW5pbWF0aW9uTW9kdWxlIH0gZnJvbSAnbmctem9ycm8tYW50ZC9jb3JlL25vLWFuaW1hdGlvbic7XG5pbXBvcnQgeyBOek91dGxldE1vZHVsZSB9IGZyb20gJ25nLXpvcnJvLWFudGQvY29yZS9vdXRsZXQnO1xuaW1wb3J0IHsgTnpPdmVybGF5TW9kdWxlIH0gZnJvbSAnbmctem9ycm8tYW50ZC9jb3JlL292ZXJsYXknO1xuaW1wb3J0IHsgTnpFbXB0eU1vZHVsZSB9IGZyb20gJ25nLXpvcnJvLWFudGQvZW1wdHknO1xuaW1wb3J0IHsgTnpJY29uTW9kdWxlIH0gZnJvbSAnbmctem9ycm8tYW50ZC9pY29uJztcbmltcG9ydCB7IE56SW5wdXRNb2R1bGUgfSBmcm9tICduZy16b3Jyby1hbnRkL2lucHV0JztcblxuaW1wb3J0IHsgTnpDYXNjYWRlck9wdGlvbkNvbXBvbmVudCB9IGZyb20gJy4vY2FzY2FkZXItbGkuY29tcG9uZW50JztcbmltcG9ydCB7IE56Q2FzY2FkZXJDb21wb25lbnQgfSBmcm9tICcuL2Nhc2NhZGVyLmNvbXBvbmVudCc7XG5cbkBOZ01vZHVsZSh7XG4gIGltcG9ydHM6IFtcbiAgICBCaWRpTW9kdWxlLFxuICAgIENvbW1vbk1vZHVsZSxcbiAgICBGb3Jtc01vZHVsZSxcbiAgICBPdmVybGF5TW9kdWxlLFxuICAgIE56T3V0bGV0TW9kdWxlLFxuICAgIE56RW1wdHlNb2R1bGUsXG4gICAgTnpIaWdobGlnaHRNb2R1bGUsXG4gICAgTnpJY29uTW9kdWxlLFxuICAgIE56SW5wdXRNb2R1bGUsXG4gICAgTnpOb0FuaW1hdGlvbk1vZHVsZSxcbiAgICBOek92ZXJsYXlNb2R1bGVcbiAgXSxcbiAgZGVjbGFyYXRpb25zOiBbTnpDYXNjYWRlckNvbXBvbmVudCwgTnpDYXNjYWRlck9wdGlvbkNvbXBvbmVudF0sXG4gIGV4cG9ydHM6IFtOekNhc2NhZGVyQ29tcG9uZW50XVxufSlcbmV4cG9ydCBjbGFzcyBOekNhc2NhZGVyTW9kdWxlIHt9XG4iXX0=