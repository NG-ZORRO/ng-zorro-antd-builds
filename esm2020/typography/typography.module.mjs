/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */
import { BidiModule } from '@angular/cdk/bidi';
import { ClipboardModule } from '@angular/cdk/clipboard';
import { PlatformModule } from '@angular/cdk/platform';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { NzOutletModule } from 'ng-zorro-antd/core/outlet';
import { NzTransButtonModule } from 'ng-zorro-antd/core/trans-button';
import { NzI18nModule } from 'ng-zorro-antd/i18n';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzToolTipModule } from 'ng-zorro-antd/tooltip';
import { NzTextCopyComponent } from './text-copy.component';
import { NzTextEditComponent } from './text-edit.component';
import { NzTypographyComponent } from './typography.component';
import * as i0 from "@angular/core";
export class NzTypographyModule {
}
NzTypographyModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.1.2", ngImport: i0, type: NzTypographyModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
NzTypographyModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "12.0.0", version: "13.1.2", ngImport: i0, type: NzTypographyModule, declarations: [NzTypographyComponent, NzTextCopyComponent, NzTextEditComponent], imports: [BidiModule,
        CommonModule,
        NzIconModule,
        NzToolTipModule,
        NzInputModule,
        NzI18nModule,
        NzTransButtonModule,
        ClipboardModule,
        NzOutletModule], exports: [NzTypographyComponent, NzTextCopyComponent, NzTextEditComponent, PlatformModule] });
NzTypographyModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "13.1.2", ngImport: i0, type: NzTypographyModule, imports: [[
            BidiModule,
            CommonModule,
            NzIconModule,
            NzToolTipModule,
            NzInputModule,
            NzI18nModule,
            NzTransButtonModule,
            ClipboardModule,
            NzOutletModule
        ], PlatformModule] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.1.2", ngImport: i0, type: NzTypographyModule, decorators: [{
            type: NgModule,
            args: [{
                    imports: [
                        BidiModule,
                        CommonModule,
                        NzIconModule,
                        NzToolTipModule,
                        NzInputModule,
                        NzI18nModule,
                        NzTransButtonModule,
                        ClipboardModule,
                        NzOutletModule
                    ],
                    exports: [NzTypographyComponent, NzTextCopyComponent, NzTextEditComponent, PlatformModule],
                    declarations: [NzTypographyComponent, NzTextCopyComponent, NzTextEditComponent]
                }]
        }] });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidHlwb2dyYXBoeS5tb2R1bGUuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9jb21wb25lbnRzL3R5cG9ncmFwaHkvdHlwb2dyYXBoeS5tb2R1bGUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7OztHQUdHO0FBRUgsT0FBTyxFQUFFLFVBQVUsRUFBRSxNQUFNLG1CQUFtQixDQUFDO0FBQy9DLE9BQU8sRUFBRSxlQUFlLEVBQUUsTUFBTSx3QkFBd0IsQ0FBQztBQUN6RCxPQUFPLEVBQUUsY0FBYyxFQUFFLE1BQU0sdUJBQXVCLENBQUM7QUFDdkQsT0FBTyxFQUFFLFlBQVksRUFBRSxNQUFNLGlCQUFpQixDQUFDO0FBQy9DLE9BQU8sRUFBRSxRQUFRLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFFekMsT0FBTyxFQUFFLGNBQWMsRUFBRSxNQUFNLDJCQUEyQixDQUFDO0FBQzNELE9BQU8sRUFBRSxtQkFBbUIsRUFBRSxNQUFNLGlDQUFpQyxDQUFDO0FBQ3RFLE9BQU8sRUFBRSxZQUFZLEVBQUUsTUFBTSxvQkFBb0IsQ0FBQztBQUNsRCxPQUFPLEVBQUUsWUFBWSxFQUFFLE1BQU0sb0JBQW9CLENBQUM7QUFDbEQsT0FBTyxFQUFFLGFBQWEsRUFBRSxNQUFNLHFCQUFxQixDQUFDO0FBQ3BELE9BQU8sRUFBRSxlQUFlLEVBQUUsTUFBTSx1QkFBdUIsQ0FBQztBQUV4RCxPQUFPLEVBQUUsbUJBQW1CLEVBQUUsTUFBTSx1QkFBdUIsQ0FBQztBQUM1RCxPQUFPLEVBQUUsbUJBQW1CLEVBQUUsTUFBTSx1QkFBdUIsQ0FBQztBQUM1RCxPQUFPLEVBQUUscUJBQXFCLEVBQUUsTUFBTSx3QkFBd0IsQ0FBQzs7QUFpQi9ELE1BQU0sT0FBTyxrQkFBa0I7OytHQUFsQixrQkFBa0I7Z0hBQWxCLGtCQUFrQixpQkFGZCxxQkFBcUIsRUFBRSxtQkFBbUIsRUFBRSxtQkFBbUIsYUFYNUUsVUFBVTtRQUNWLFlBQVk7UUFDWixZQUFZO1FBQ1osZUFBZTtRQUNmLGFBQWE7UUFDYixZQUFZO1FBQ1osbUJBQW1CO1FBQ25CLGVBQWU7UUFDZixjQUFjLGFBRU4scUJBQXFCLEVBQUUsbUJBQW1CLEVBQUUsbUJBQW1CLEVBQUUsY0FBYztnSEFHOUUsa0JBQWtCLFlBZHBCO1lBQ1AsVUFBVTtZQUNWLFlBQVk7WUFDWixZQUFZO1lBQ1osZUFBZTtZQUNmLGFBQWE7WUFDYixZQUFZO1lBQ1osbUJBQW1CO1lBQ25CLGVBQWU7WUFDZixjQUFjO1NBQ2YsRUFDMEUsY0FBYzsyRkFHOUUsa0JBQWtCO2tCQWY5QixRQUFRO21CQUFDO29CQUNSLE9BQU8sRUFBRTt3QkFDUCxVQUFVO3dCQUNWLFlBQVk7d0JBQ1osWUFBWTt3QkFDWixlQUFlO3dCQUNmLGFBQWE7d0JBQ2IsWUFBWTt3QkFDWixtQkFBbUI7d0JBQ25CLGVBQWU7d0JBQ2YsY0FBYztxQkFDZjtvQkFDRCxPQUFPLEVBQUUsQ0FBQyxxQkFBcUIsRUFBRSxtQkFBbUIsRUFBRSxtQkFBbUIsRUFBRSxjQUFjLENBQUM7b0JBQzFGLFlBQVksRUFBRSxDQUFDLHFCQUFxQixFQUFFLG1CQUFtQixFQUFFLG1CQUFtQixDQUFDO2lCQUNoRiIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxuICogVXNlIG9mIHRoaXMgc291cmNlIGNvZGUgaXMgZ292ZXJuZWQgYnkgYW4gTUlULXN0eWxlIGxpY2Vuc2UgdGhhdCBjYW4gYmVcbiAqIGZvdW5kIGluIHRoZSBMSUNFTlNFIGZpbGUgYXQgaHR0cHM6Ly9naXRodWIuY29tL05HLVpPUlJPL25nLXpvcnJvLWFudGQvYmxvYi9tYXN0ZXIvTElDRU5TRVxuICovXG5cbmltcG9ydCB7IEJpZGlNb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jZGsvYmlkaSc7XG5pbXBvcnQgeyBDbGlwYm9hcmRNb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jZGsvY2xpcGJvYXJkJztcbmltcG9ydCB7IFBsYXRmb3JtTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY2RrL3BsYXRmb3JtJztcbmltcG9ydCB7IENvbW1vbk1vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbic7XG5pbXBvcnQgeyBOZ01vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuXG5pbXBvcnQgeyBOek91dGxldE1vZHVsZSB9IGZyb20gJ25nLXpvcnJvLWFudGQvY29yZS9vdXRsZXQnO1xuaW1wb3J0IHsgTnpUcmFuc0J1dHRvbk1vZHVsZSB9IGZyb20gJ25nLXpvcnJvLWFudGQvY29yZS90cmFucy1idXR0b24nO1xuaW1wb3J0IHsgTnpJMThuTW9kdWxlIH0gZnJvbSAnbmctem9ycm8tYW50ZC9pMThuJztcbmltcG9ydCB7IE56SWNvbk1vZHVsZSB9IGZyb20gJ25nLXpvcnJvLWFudGQvaWNvbic7XG5pbXBvcnQgeyBOeklucHV0TW9kdWxlIH0gZnJvbSAnbmctem9ycm8tYW50ZC9pbnB1dCc7XG5pbXBvcnQgeyBOelRvb2xUaXBNb2R1bGUgfSBmcm9tICduZy16b3Jyby1hbnRkL3Rvb2x0aXAnO1xuXG5pbXBvcnQgeyBOelRleHRDb3B5Q29tcG9uZW50IH0gZnJvbSAnLi90ZXh0LWNvcHkuY29tcG9uZW50JztcbmltcG9ydCB7IE56VGV4dEVkaXRDb21wb25lbnQgfSBmcm9tICcuL3RleHQtZWRpdC5jb21wb25lbnQnO1xuaW1wb3J0IHsgTnpUeXBvZ3JhcGh5Q29tcG9uZW50IH0gZnJvbSAnLi90eXBvZ3JhcGh5LmNvbXBvbmVudCc7XG5cbkBOZ01vZHVsZSh7XG4gIGltcG9ydHM6IFtcbiAgICBCaWRpTW9kdWxlLFxuICAgIENvbW1vbk1vZHVsZSxcbiAgICBOekljb25Nb2R1bGUsXG4gICAgTnpUb29sVGlwTW9kdWxlLFxuICAgIE56SW5wdXRNb2R1bGUsXG4gICAgTnpJMThuTW9kdWxlLFxuICAgIE56VHJhbnNCdXR0b25Nb2R1bGUsXG4gICAgQ2xpcGJvYXJkTW9kdWxlLFxuICAgIE56T3V0bGV0TW9kdWxlXG4gIF0sXG4gIGV4cG9ydHM6IFtOelR5cG9ncmFwaHlDb21wb25lbnQsIE56VGV4dENvcHlDb21wb25lbnQsIE56VGV4dEVkaXRDb21wb25lbnQsIFBsYXRmb3JtTW9kdWxlXSxcbiAgZGVjbGFyYXRpb25zOiBbTnpUeXBvZ3JhcGh5Q29tcG9uZW50LCBOelRleHRDb3B5Q29tcG9uZW50LCBOelRleHRFZGl0Q29tcG9uZW50XVxufSlcbmV4cG9ydCBjbGFzcyBOelR5cG9ncmFwaHlNb2R1bGUge31cbiJdfQ==