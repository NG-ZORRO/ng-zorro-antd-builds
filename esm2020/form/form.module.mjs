/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */
import { BidiModule } from '@angular/cdk/bidi';
import { LayoutModule } from '@angular/cdk/layout';
import { PlatformModule } from '@angular/cdk/platform';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { NzOutletModule } from 'ng-zorro-antd/core/outlet';
import { NzGridModule } from 'ng-zorro-antd/grid';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzToolTipModule } from 'ng-zorro-antd/tooltip';
import { NzFormControlComponent } from './form-control.component';
import { NzFormItemComponent } from './form-item.component';
import { NzFormLabelComponent } from './form-label.component';
import { NzFormSplitComponent } from './form-split.component';
import { NzFormTextComponent } from './form-text.component';
import { NzFormDirective } from './form.directive';
import * as i0 from "@angular/core";
export class NzFormModule {
}
NzFormModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.1.2", ngImport: i0, type: NzFormModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
NzFormModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "12.0.0", version: "13.1.2", ngImport: i0, type: NzFormModule, declarations: [NzFormDirective,
        NzFormItemComponent,
        NzFormLabelComponent,
        NzFormControlComponent,
        NzFormTextComponent,
        NzFormSplitComponent], imports: [BidiModule,
        CommonModule,
        NzGridModule,
        NzIconModule,
        NzToolTipModule,
        LayoutModule,
        PlatformModule,
        NzOutletModule], exports: [NzGridModule,
        NzFormDirective,
        NzFormItemComponent,
        NzFormLabelComponent,
        NzFormControlComponent,
        NzFormTextComponent,
        NzFormSplitComponent] });
NzFormModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "13.1.2", ngImport: i0, type: NzFormModule, imports: [[
            BidiModule,
            CommonModule,
            NzGridModule,
            NzIconModule,
            NzToolTipModule,
            LayoutModule,
            PlatformModule,
            NzOutletModule
        ], NzGridModule] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.1.2", ngImport: i0, type: NzFormModule, decorators: [{
            type: NgModule,
            args: [{
                    declarations: [
                        NzFormDirective,
                        NzFormItemComponent,
                        NzFormLabelComponent,
                        NzFormControlComponent,
                        NzFormTextComponent,
                        NzFormSplitComponent
                    ],
                    exports: [
                        NzGridModule,
                        NzFormDirective,
                        NzFormItemComponent,
                        NzFormLabelComponent,
                        NzFormControlComponent,
                        NzFormTextComponent,
                        NzFormSplitComponent
                    ],
                    imports: [
                        BidiModule,
                        CommonModule,
                        NzGridModule,
                        NzIconModule,
                        NzToolTipModule,
                        LayoutModule,
                        PlatformModule,
                        NzOutletModule
                    ]
                }]
        }] });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZm9ybS5tb2R1bGUuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9jb21wb25lbnRzL2Zvcm0vZm9ybS5tb2R1bGUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7OztHQUdHO0FBRUgsT0FBTyxFQUFFLFVBQVUsRUFBRSxNQUFNLG1CQUFtQixDQUFDO0FBQy9DLE9BQU8sRUFBRSxZQUFZLEVBQUUsTUFBTSxxQkFBcUIsQ0FBQztBQUNuRCxPQUFPLEVBQUUsY0FBYyxFQUFFLE1BQU0sdUJBQXVCLENBQUM7QUFDdkQsT0FBTyxFQUFFLFlBQVksRUFBRSxNQUFNLGlCQUFpQixDQUFDO0FBQy9DLE9BQU8sRUFBRSxRQUFRLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFFekMsT0FBTyxFQUFFLGNBQWMsRUFBRSxNQUFNLDJCQUEyQixDQUFDO0FBQzNELE9BQU8sRUFBRSxZQUFZLEVBQUUsTUFBTSxvQkFBb0IsQ0FBQztBQUNsRCxPQUFPLEVBQUUsWUFBWSxFQUFFLE1BQU0sb0JBQW9CLENBQUM7QUFDbEQsT0FBTyxFQUFFLGVBQWUsRUFBRSxNQUFNLHVCQUF1QixDQUFDO0FBRXhELE9BQU8sRUFBRSxzQkFBc0IsRUFBRSxNQUFNLDBCQUEwQixDQUFDO0FBQ2xFLE9BQU8sRUFBRSxtQkFBbUIsRUFBRSxNQUFNLHVCQUF1QixDQUFDO0FBQzVELE9BQU8sRUFBRSxvQkFBb0IsRUFBRSxNQUFNLHdCQUF3QixDQUFDO0FBQzlELE9BQU8sRUFBRSxvQkFBb0IsRUFBRSxNQUFNLHdCQUF3QixDQUFDO0FBQzlELE9BQU8sRUFBRSxtQkFBbUIsRUFBRSxNQUFNLHVCQUF1QixDQUFDO0FBQzVELE9BQU8sRUFBRSxlQUFlLEVBQUUsTUFBTSxrQkFBa0IsQ0FBQzs7QUErQm5ELE1BQU0sT0FBTyxZQUFZOzt5R0FBWixZQUFZOzBHQUFaLFlBQVksaUJBM0JyQixlQUFlO1FBQ2YsbUJBQW1CO1FBQ25CLG9CQUFvQjtRQUNwQixzQkFBc0I7UUFDdEIsbUJBQW1CO1FBQ25CLG9CQUFvQixhQVlwQixVQUFVO1FBQ1YsWUFBWTtRQUNaLFlBQVk7UUFDWixZQUFZO1FBQ1osZUFBZTtRQUNmLFlBQVk7UUFDWixjQUFjO1FBQ2QsY0FBYyxhQWhCZCxZQUFZO1FBQ1osZUFBZTtRQUNmLG1CQUFtQjtRQUNuQixvQkFBb0I7UUFDcEIsc0JBQXNCO1FBQ3RCLG1CQUFtQjtRQUNuQixvQkFBb0I7MEdBYVgsWUFBWSxZQVhkO1lBQ1AsVUFBVTtZQUNWLFlBQVk7WUFDWixZQUFZO1lBQ1osWUFBWTtZQUNaLGVBQWU7WUFDZixZQUFZO1lBQ1osY0FBYztZQUNkLGNBQWM7U0FDZixFQWpCQyxZQUFZOzJGQW1CSCxZQUFZO2tCQTdCeEIsUUFBUTttQkFBQztvQkFDUixZQUFZLEVBQUU7d0JBQ1osZUFBZTt3QkFDZixtQkFBbUI7d0JBQ25CLG9CQUFvQjt3QkFDcEIsc0JBQXNCO3dCQUN0QixtQkFBbUI7d0JBQ25CLG9CQUFvQjtxQkFDckI7b0JBQ0QsT0FBTyxFQUFFO3dCQUNQLFlBQVk7d0JBQ1osZUFBZTt3QkFDZixtQkFBbUI7d0JBQ25CLG9CQUFvQjt3QkFDcEIsc0JBQXNCO3dCQUN0QixtQkFBbUI7d0JBQ25CLG9CQUFvQjtxQkFDckI7b0JBQ0QsT0FBTyxFQUFFO3dCQUNQLFVBQVU7d0JBQ1YsWUFBWTt3QkFDWixZQUFZO3dCQUNaLFlBQVk7d0JBQ1osZUFBZTt3QkFDZixZQUFZO3dCQUNaLGNBQWM7d0JBQ2QsY0FBYztxQkFDZjtpQkFDRiIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxuICogVXNlIG9mIHRoaXMgc291cmNlIGNvZGUgaXMgZ292ZXJuZWQgYnkgYW4gTUlULXN0eWxlIGxpY2Vuc2UgdGhhdCBjYW4gYmVcbiAqIGZvdW5kIGluIHRoZSBMSUNFTlNFIGZpbGUgYXQgaHR0cHM6Ly9naXRodWIuY29tL05HLVpPUlJPL25nLXpvcnJvLWFudGQvYmxvYi9tYXN0ZXIvTElDRU5TRVxuICovXG5cbmltcG9ydCB7IEJpZGlNb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jZGsvYmlkaSc7XG5pbXBvcnQgeyBMYXlvdXRNb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jZGsvbGF5b3V0JztcbmltcG9ydCB7IFBsYXRmb3JtTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY2RrL3BsYXRmb3JtJztcbmltcG9ydCB7IENvbW1vbk1vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbic7XG5pbXBvcnQgeyBOZ01vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuXG5pbXBvcnQgeyBOek91dGxldE1vZHVsZSB9IGZyb20gJ25nLXpvcnJvLWFudGQvY29yZS9vdXRsZXQnO1xuaW1wb3J0IHsgTnpHcmlkTW9kdWxlIH0gZnJvbSAnbmctem9ycm8tYW50ZC9ncmlkJztcbmltcG9ydCB7IE56SWNvbk1vZHVsZSB9IGZyb20gJ25nLXpvcnJvLWFudGQvaWNvbic7XG5pbXBvcnQgeyBOelRvb2xUaXBNb2R1bGUgfSBmcm9tICduZy16b3Jyby1hbnRkL3Rvb2x0aXAnO1xuXG5pbXBvcnQgeyBOekZvcm1Db250cm9sQ29tcG9uZW50IH0gZnJvbSAnLi9mb3JtLWNvbnRyb2wuY29tcG9uZW50JztcbmltcG9ydCB7IE56Rm9ybUl0ZW1Db21wb25lbnQgfSBmcm9tICcuL2Zvcm0taXRlbS5jb21wb25lbnQnO1xuaW1wb3J0IHsgTnpGb3JtTGFiZWxDb21wb25lbnQgfSBmcm9tICcuL2Zvcm0tbGFiZWwuY29tcG9uZW50JztcbmltcG9ydCB7IE56Rm9ybVNwbGl0Q29tcG9uZW50IH0gZnJvbSAnLi9mb3JtLXNwbGl0LmNvbXBvbmVudCc7XG5pbXBvcnQgeyBOekZvcm1UZXh0Q29tcG9uZW50IH0gZnJvbSAnLi9mb3JtLXRleHQuY29tcG9uZW50JztcbmltcG9ydCB7IE56Rm9ybURpcmVjdGl2ZSB9IGZyb20gJy4vZm9ybS5kaXJlY3RpdmUnO1xuXG5ATmdNb2R1bGUoe1xuICBkZWNsYXJhdGlvbnM6IFtcbiAgICBOekZvcm1EaXJlY3RpdmUsXG4gICAgTnpGb3JtSXRlbUNvbXBvbmVudCxcbiAgICBOekZvcm1MYWJlbENvbXBvbmVudCxcbiAgICBOekZvcm1Db250cm9sQ29tcG9uZW50LFxuICAgIE56Rm9ybVRleHRDb21wb25lbnQsXG4gICAgTnpGb3JtU3BsaXRDb21wb25lbnRcbiAgXSxcbiAgZXhwb3J0czogW1xuICAgIE56R3JpZE1vZHVsZSxcbiAgICBOekZvcm1EaXJlY3RpdmUsXG4gICAgTnpGb3JtSXRlbUNvbXBvbmVudCxcbiAgICBOekZvcm1MYWJlbENvbXBvbmVudCxcbiAgICBOekZvcm1Db250cm9sQ29tcG9uZW50LFxuICAgIE56Rm9ybVRleHRDb21wb25lbnQsXG4gICAgTnpGb3JtU3BsaXRDb21wb25lbnRcbiAgXSxcbiAgaW1wb3J0czogW1xuICAgIEJpZGlNb2R1bGUsXG4gICAgQ29tbW9uTW9kdWxlLFxuICAgIE56R3JpZE1vZHVsZSxcbiAgICBOekljb25Nb2R1bGUsXG4gICAgTnpUb29sVGlwTW9kdWxlLFxuICAgIExheW91dE1vZHVsZSxcbiAgICBQbGF0Zm9ybU1vZHVsZSxcbiAgICBOek91dGxldE1vZHVsZVxuICBdXG59KVxuZXhwb3J0IGNsYXNzIE56Rm9ybU1vZHVsZSB7fVxuIl19