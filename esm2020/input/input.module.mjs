/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */
import { BidiModule } from '@angular/cdk/bidi';
import { PlatformModule } from '@angular/cdk/platform';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { NzOutletModule } from 'ng-zorro-antd/core/outlet';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzAutosizeDirective } from './autosize.directive';
import { NzInputGroupSlotComponent } from './input-group-slot.component';
import { NzInputGroupComponent, NzInputGroupWhitSuffixOrPrefixDirective } from './input-group.component';
import { NzInputDirective } from './input.directive';
import { NzTextareaCountComponent } from './textarea-count.component';
import * as i0 from "@angular/core";
export class NzInputModule {
}
NzInputModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.1.2", ngImport: i0, type: NzInputModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
NzInputModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "12.0.0", version: "13.1.2", ngImport: i0, type: NzInputModule, declarations: [NzTextareaCountComponent,
        NzInputDirective,
        NzInputGroupComponent,
        NzAutosizeDirective,
        NzInputGroupSlotComponent,
        NzInputGroupWhitSuffixOrPrefixDirective], imports: [BidiModule, CommonModule, NzIconModule, PlatformModule, NzOutletModule], exports: [NzTextareaCountComponent,
        NzInputDirective,
        NzInputGroupComponent,
        NzAutosizeDirective,
        NzInputGroupWhitSuffixOrPrefixDirective] });
NzInputModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "13.1.2", ngImport: i0, type: NzInputModule, imports: [[BidiModule, CommonModule, NzIconModule, PlatformModule, NzOutletModule]] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.1.2", ngImport: i0, type: NzInputModule, decorators: [{
            type: NgModule,
            args: [{
                    declarations: [
                        NzTextareaCountComponent,
                        NzInputDirective,
                        NzInputGroupComponent,
                        NzAutosizeDirective,
                        NzInputGroupSlotComponent,
                        NzInputGroupWhitSuffixOrPrefixDirective
                    ],
                    exports: [
                        NzTextareaCountComponent,
                        NzInputDirective,
                        NzInputGroupComponent,
                        NzAutosizeDirective,
                        NzInputGroupWhitSuffixOrPrefixDirective
                    ],
                    imports: [BidiModule, CommonModule, NzIconModule, PlatformModule, NzOutletModule]
                }]
        }] });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5wdXQubW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vY29tcG9uZW50cy9pbnB1dC9pbnB1dC5tb2R1bGUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7OztHQUdHO0FBRUgsT0FBTyxFQUFFLFVBQVUsRUFBRSxNQUFNLG1CQUFtQixDQUFDO0FBQy9DLE9BQU8sRUFBRSxjQUFjLEVBQUUsTUFBTSx1QkFBdUIsQ0FBQztBQUN2RCxPQUFPLEVBQUUsWUFBWSxFQUFFLE1BQU0saUJBQWlCLENBQUM7QUFDL0MsT0FBTyxFQUFFLFFBQVEsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUV6QyxPQUFPLEVBQUUsY0FBYyxFQUFFLE1BQU0sMkJBQTJCLENBQUM7QUFDM0QsT0FBTyxFQUFFLFlBQVksRUFBRSxNQUFNLG9CQUFvQixDQUFDO0FBRWxELE9BQU8sRUFBRSxtQkFBbUIsRUFBRSxNQUFNLHNCQUFzQixDQUFDO0FBQzNELE9BQU8sRUFBRSx5QkFBeUIsRUFBRSxNQUFNLDhCQUE4QixDQUFDO0FBQ3pFLE9BQU8sRUFBRSxxQkFBcUIsRUFBRSx1Q0FBdUMsRUFBRSxNQUFNLHlCQUF5QixDQUFDO0FBQ3pHLE9BQU8sRUFBRSxnQkFBZ0IsRUFBRSxNQUFNLG1CQUFtQixDQUFDO0FBQ3JELE9BQU8sRUFBRSx3QkFBd0IsRUFBRSxNQUFNLDRCQUE0QixDQUFDOztBQW9CdEUsTUFBTSxPQUFPLGFBQWE7OzBHQUFiLGFBQWE7MkdBQWIsYUFBYSxpQkFoQnRCLHdCQUF3QjtRQUN4QixnQkFBZ0I7UUFDaEIscUJBQXFCO1FBQ3JCLG1CQUFtQjtRQUNuQix5QkFBeUI7UUFDekIsdUNBQXVDLGFBUy9CLFVBQVUsRUFBRSxZQUFZLEVBQUUsWUFBWSxFQUFFLGNBQWMsRUFBRSxjQUFjLGFBTjlFLHdCQUF3QjtRQUN4QixnQkFBZ0I7UUFDaEIscUJBQXFCO1FBQ3JCLG1CQUFtQjtRQUNuQix1Q0FBdUM7MkdBSTlCLGFBQWEsWUFGZixDQUFDLFVBQVUsRUFBRSxZQUFZLEVBQUUsWUFBWSxFQUFFLGNBQWMsRUFBRSxjQUFjLENBQUM7MkZBRXRFLGFBQWE7a0JBbEJ6QixRQUFRO21CQUFDO29CQUNSLFlBQVksRUFBRTt3QkFDWix3QkFBd0I7d0JBQ3hCLGdCQUFnQjt3QkFDaEIscUJBQXFCO3dCQUNyQixtQkFBbUI7d0JBQ25CLHlCQUF5Qjt3QkFDekIsdUNBQXVDO3FCQUN4QztvQkFDRCxPQUFPLEVBQUU7d0JBQ1Asd0JBQXdCO3dCQUN4QixnQkFBZ0I7d0JBQ2hCLHFCQUFxQjt3QkFDckIsbUJBQW1CO3dCQUNuQix1Q0FBdUM7cUJBQ3hDO29CQUNELE9BQU8sRUFBRSxDQUFDLFVBQVUsRUFBRSxZQUFZLEVBQUUsWUFBWSxFQUFFLGNBQWMsRUFBRSxjQUFjLENBQUM7aUJBQ2xGIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKiBVc2Ugb2YgdGhpcyBzb3VyY2UgY29kZSBpcyBnb3Zlcm5lZCBieSBhbiBNSVQtc3R5bGUgbGljZW5zZSB0aGF0IGNhbiBiZVxuICogZm91bmQgaW4gdGhlIExJQ0VOU0UgZmlsZSBhdCBodHRwczovL2dpdGh1Yi5jb20vTkctWk9SUk8vbmctem9ycm8tYW50ZC9ibG9iL21hc3Rlci9MSUNFTlNFXG4gKi9cblxuaW1wb3J0IHsgQmlkaU1vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2Nkay9iaWRpJztcbmltcG9ydCB7IFBsYXRmb3JtTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY2RrL3BsYXRmb3JtJztcbmltcG9ydCB7IENvbW1vbk1vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbic7XG5pbXBvcnQgeyBOZ01vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuXG5pbXBvcnQgeyBOek91dGxldE1vZHVsZSB9IGZyb20gJ25nLXpvcnJvLWFudGQvY29yZS9vdXRsZXQnO1xuaW1wb3J0IHsgTnpJY29uTW9kdWxlIH0gZnJvbSAnbmctem9ycm8tYW50ZC9pY29uJztcblxuaW1wb3J0IHsgTnpBdXRvc2l6ZURpcmVjdGl2ZSB9IGZyb20gJy4vYXV0b3NpemUuZGlyZWN0aXZlJztcbmltcG9ydCB7IE56SW5wdXRHcm91cFNsb3RDb21wb25lbnQgfSBmcm9tICcuL2lucHV0LWdyb3VwLXNsb3QuY29tcG9uZW50JztcbmltcG9ydCB7IE56SW5wdXRHcm91cENvbXBvbmVudCwgTnpJbnB1dEdyb3VwV2hpdFN1ZmZpeE9yUHJlZml4RGlyZWN0aXZlIH0gZnJvbSAnLi9pbnB1dC1ncm91cC5jb21wb25lbnQnO1xuaW1wb3J0IHsgTnpJbnB1dERpcmVjdGl2ZSB9IGZyb20gJy4vaW5wdXQuZGlyZWN0aXZlJztcbmltcG9ydCB7IE56VGV4dGFyZWFDb3VudENvbXBvbmVudCB9IGZyb20gJy4vdGV4dGFyZWEtY291bnQuY29tcG9uZW50JztcblxuQE5nTW9kdWxlKHtcbiAgZGVjbGFyYXRpb25zOiBbXG4gICAgTnpUZXh0YXJlYUNvdW50Q29tcG9uZW50LFxuICAgIE56SW5wdXREaXJlY3RpdmUsXG4gICAgTnpJbnB1dEdyb3VwQ29tcG9uZW50LFxuICAgIE56QXV0b3NpemVEaXJlY3RpdmUsXG4gICAgTnpJbnB1dEdyb3VwU2xvdENvbXBvbmVudCxcbiAgICBOeklucHV0R3JvdXBXaGl0U3VmZml4T3JQcmVmaXhEaXJlY3RpdmVcbiAgXSxcbiAgZXhwb3J0czogW1xuICAgIE56VGV4dGFyZWFDb3VudENvbXBvbmVudCxcbiAgICBOeklucHV0RGlyZWN0aXZlLFxuICAgIE56SW5wdXRHcm91cENvbXBvbmVudCxcbiAgICBOekF1dG9zaXplRGlyZWN0aXZlLFxuICAgIE56SW5wdXRHcm91cFdoaXRTdWZmaXhPclByZWZpeERpcmVjdGl2ZVxuICBdLFxuICBpbXBvcnRzOiBbQmlkaU1vZHVsZSwgQ29tbW9uTW9kdWxlLCBOekljb25Nb2R1bGUsIFBsYXRmb3JtTW9kdWxlLCBOek91dGxldE1vZHVsZV1cbn0pXG5leHBvcnQgY2xhc3MgTnpJbnB1dE1vZHVsZSB7fVxuIl19