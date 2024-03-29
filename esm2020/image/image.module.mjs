/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */
import { BidiModule } from '@angular/cdk/bidi';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { OverlayModule } from '@angular/cdk/overlay';
import { PortalModule } from '@angular/cdk/portal';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzPipesModule } from 'ng-zorro-antd/pipes';
import { NzImageGroupComponent } from './image-group.component';
import { NzImagePreviewComponent } from './image-preview.component';
import { NzImageDirective } from './image.directive';
import { NzImageService } from './image.service';
import * as i0 from "@angular/core";
export class NzImageModule {
}
NzImageModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.1.2", ngImport: i0, type: NzImageModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
NzImageModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "12.0.0", version: "13.1.2", ngImport: i0, type: NzImageModule, declarations: [NzImageDirective, NzImagePreviewComponent, NzImageGroupComponent], imports: [BidiModule, OverlayModule, PortalModule, DragDropModule, CommonModule, NzIconModule, NzPipesModule], exports: [NzImageDirective, NzImagePreviewComponent, NzImageGroupComponent] });
NzImageModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "13.1.2", ngImport: i0, type: NzImageModule, providers: [NzImageService], imports: [[BidiModule, OverlayModule, PortalModule, DragDropModule, CommonModule, NzIconModule, NzPipesModule]] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.1.2", ngImport: i0, type: NzImageModule, decorators: [{
            type: NgModule,
            args: [{
                    imports: [BidiModule, OverlayModule, PortalModule, DragDropModule, CommonModule, NzIconModule, NzPipesModule],
                    exports: [NzImageDirective, NzImagePreviewComponent, NzImageGroupComponent],
                    providers: [NzImageService],
                    entryComponents: [NzImagePreviewComponent],
                    declarations: [NzImageDirective, NzImagePreviewComponent, NzImageGroupComponent]
                }]
        }] });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW1hZ2UubW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vY29tcG9uZW50cy9pbWFnZS9pbWFnZS5tb2R1bGUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7OztHQUdHO0FBRUgsT0FBTyxFQUFFLFVBQVUsRUFBRSxNQUFNLG1CQUFtQixDQUFDO0FBQy9DLE9BQU8sRUFBRSxjQUFjLEVBQUUsTUFBTSx3QkFBd0IsQ0FBQztBQUN4RCxPQUFPLEVBQUUsYUFBYSxFQUFFLE1BQU0sc0JBQXNCLENBQUM7QUFDckQsT0FBTyxFQUFFLFlBQVksRUFBRSxNQUFNLHFCQUFxQixDQUFDO0FBQ25ELE9BQU8sRUFBRSxZQUFZLEVBQUUsTUFBTSxpQkFBaUIsQ0FBQztBQUMvQyxPQUFPLEVBQUUsUUFBUSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBRXpDLE9BQU8sRUFBRSxZQUFZLEVBQUUsTUFBTSxvQkFBb0IsQ0FBQztBQUNsRCxPQUFPLEVBQUUsYUFBYSxFQUFFLE1BQU0scUJBQXFCLENBQUM7QUFFcEQsT0FBTyxFQUFFLHFCQUFxQixFQUFFLE1BQU0seUJBQXlCLENBQUM7QUFDaEUsT0FBTyxFQUFFLHVCQUF1QixFQUFFLE1BQU0sMkJBQTJCLENBQUM7QUFDcEUsT0FBTyxFQUFFLGdCQUFnQixFQUFFLE1BQU0sbUJBQW1CLENBQUM7QUFDckQsT0FBTyxFQUFFLGNBQWMsRUFBRSxNQUFNLGlCQUFpQixDQUFDOztBQVNqRCxNQUFNLE9BQU8sYUFBYTs7MEdBQWIsYUFBYTsyR0FBYixhQUFhLGlCQUZULGdCQUFnQixFQUFFLHVCQUF1QixFQUFFLHFCQUFxQixhQUpyRSxVQUFVLEVBQUUsYUFBYSxFQUFFLFlBQVksRUFBRSxjQUFjLEVBQUUsWUFBWSxFQUFFLFlBQVksRUFBRSxhQUFhLGFBQ2xHLGdCQUFnQixFQUFFLHVCQUF1QixFQUFFLHFCQUFxQjsyR0FLL0QsYUFBYSxhQUpiLENBQUMsY0FBYyxDQUFDLFlBRmxCLENBQUMsVUFBVSxFQUFFLGFBQWEsRUFBRSxZQUFZLEVBQUUsY0FBYyxFQUFFLFlBQVksRUFBRSxZQUFZLEVBQUUsYUFBYSxDQUFDOzJGQU1sRyxhQUFhO2tCQVB6QixRQUFRO21CQUFDO29CQUNSLE9BQU8sRUFBRSxDQUFDLFVBQVUsRUFBRSxhQUFhLEVBQUUsWUFBWSxFQUFFLGNBQWMsRUFBRSxZQUFZLEVBQUUsWUFBWSxFQUFFLGFBQWEsQ0FBQztvQkFDN0csT0FBTyxFQUFFLENBQUMsZ0JBQWdCLEVBQUUsdUJBQXVCLEVBQUUscUJBQXFCLENBQUM7b0JBQzNFLFNBQVMsRUFBRSxDQUFDLGNBQWMsQ0FBQztvQkFDM0IsZUFBZSxFQUFFLENBQUMsdUJBQXVCLENBQUM7b0JBQzFDLFlBQVksRUFBRSxDQUFDLGdCQUFnQixFQUFFLHVCQUF1QixFQUFFLHFCQUFxQixDQUFDO2lCQUNqRiIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxuICogVXNlIG9mIHRoaXMgc291cmNlIGNvZGUgaXMgZ292ZXJuZWQgYnkgYW4gTUlULXN0eWxlIGxpY2Vuc2UgdGhhdCBjYW4gYmVcbiAqIGZvdW5kIGluIHRoZSBMSUNFTlNFIGZpbGUgYXQgaHR0cHM6Ly9naXRodWIuY29tL05HLVpPUlJPL25nLXpvcnJvLWFudGQvYmxvYi9tYXN0ZXIvTElDRU5TRVxuICovXG5cbmltcG9ydCB7IEJpZGlNb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jZGsvYmlkaSc7XG5pbXBvcnQgeyBEcmFnRHJvcE1vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2Nkay9kcmFnLWRyb3AnO1xuaW1wb3J0IHsgT3ZlcmxheU1vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2Nkay9vdmVybGF5JztcbmltcG9ydCB7IFBvcnRhbE1vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2Nkay9wb3J0YWwnO1xuaW1wb3J0IHsgQ29tbW9uTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uJztcbmltcG9ydCB7IE5nTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5cbmltcG9ydCB7IE56SWNvbk1vZHVsZSB9IGZyb20gJ25nLXpvcnJvLWFudGQvaWNvbic7XG5pbXBvcnQgeyBOelBpcGVzTW9kdWxlIH0gZnJvbSAnbmctem9ycm8tYW50ZC9waXBlcyc7XG5cbmltcG9ydCB7IE56SW1hZ2VHcm91cENvbXBvbmVudCB9IGZyb20gJy4vaW1hZ2UtZ3JvdXAuY29tcG9uZW50JztcbmltcG9ydCB7IE56SW1hZ2VQcmV2aWV3Q29tcG9uZW50IH0gZnJvbSAnLi9pbWFnZS1wcmV2aWV3LmNvbXBvbmVudCc7XG5pbXBvcnQgeyBOekltYWdlRGlyZWN0aXZlIH0gZnJvbSAnLi9pbWFnZS5kaXJlY3RpdmUnO1xuaW1wb3J0IHsgTnpJbWFnZVNlcnZpY2UgfSBmcm9tICcuL2ltYWdlLnNlcnZpY2UnO1xuXG5ATmdNb2R1bGUoe1xuICBpbXBvcnRzOiBbQmlkaU1vZHVsZSwgT3ZlcmxheU1vZHVsZSwgUG9ydGFsTW9kdWxlLCBEcmFnRHJvcE1vZHVsZSwgQ29tbW9uTW9kdWxlLCBOekljb25Nb2R1bGUsIE56UGlwZXNNb2R1bGVdLFxuICBleHBvcnRzOiBbTnpJbWFnZURpcmVjdGl2ZSwgTnpJbWFnZVByZXZpZXdDb21wb25lbnQsIE56SW1hZ2VHcm91cENvbXBvbmVudF0sXG4gIHByb3ZpZGVyczogW056SW1hZ2VTZXJ2aWNlXSxcbiAgZW50cnlDb21wb25lbnRzOiBbTnpJbWFnZVByZXZpZXdDb21wb25lbnRdLFxuICBkZWNsYXJhdGlvbnM6IFtOekltYWdlRGlyZWN0aXZlLCBOekltYWdlUHJldmlld0NvbXBvbmVudCwgTnpJbWFnZUdyb3VwQ29tcG9uZW50XVxufSlcbmV4cG9ydCBjbGFzcyBOekltYWdlTW9kdWxlIHt9XG4iXX0=