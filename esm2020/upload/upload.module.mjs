/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */
import { BidiModule } from '@angular/cdk/bidi';
import { PlatformModule } from '@angular/cdk/platform';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzI18nModule } from 'ng-zorro-antd/i18n';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzProgressModule } from 'ng-zorro-antd/progress';
import { NzToolTipModule } from 'ng-zorro-antd/tooltip';
import { NzUploadBtnComponent } from './upload-btn.component';
import { NzUploadListComponent } from './upload-list.component';
import { NzUploadComponent } from './upload.component';
import * as i0 from "@angular/core";
export class NzUploadModule {
}
NzUploadModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.1.2", ngImport: i0, type: NzUploadModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
NzUploadModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "12.0.0", version: "13.1.2", ngImport: i0, type: NzUploadModule, declarations: [NzUploadComponent, NzUploadBtnComponent, NzUploadListComponent], imports: [BidiModule,
        CommonModule,
        FormsModule,
        PlatformModule,
        NzToolTipModule,
        NzProgressModule,
        NzI18nModule,
        NzIconModule,
        NzButtonModule], exports: [NzUploadComponent] });
NzUploadModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "13.1.2", ngImport: i0, type: NzUploadModule, imports: [[
            BidiModule,
            CommonModule,
            FormsModule,
            PlatformModule,
            NzToolTipModule,
            NzProgressModule,
            NzI18nModule,
            NzIconModule,
            NzButtonModule
        ]] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.1.2", ngImport: i0, type: NzUploadModule, decorators: [{
            type: NgModule,
            args: [{
                    imports: [
                        BidiModule,
                        CommonModule,
                        FormsModule,
                        PlatformModule,
                        NzToolTipModule,
                        NzProgressModule,
                        NzI18nModule,
                        NzIconModule,
                        NzButtonModule
                    ],
                    declarations: [NzUploadComponent, NzUploadBtnComponent, NzUploadListComponent],
                    exports: [NzUploadComponent]
                }]
        }] });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidXBsb2FkLm1vZHVsZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL2NvbXBvbmVudHMvdXBsb2FkL3VwbG9hZC5tb2R1bGUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7OztHQUdHO0FBRUgsT0FBTyxFQUFFLFVBQVUsRUFBRSxNQUFNLG1CQUFtQixDQUFDO0FBQy9DLE9BQU8sRUFBRSxjQUFjLEVBQUUsTUFBTSx1QkFBdUIsQ0FBQztBQUN2RCxPQUFPLEVBQUUsWUFBWSxFQUFFLE1BQU0saUJBQWlCLENBQUM7QUFDL0MsT0FBTyxFQUFFLFFBQVEsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUN6QyxPQUFPLEVBQUUsV0FBVyxFQUFFLE1BQU0sZ0JBQWdCLENBQUM7QUFFN0MsT0FBTyxFQUFFLGNBQWMsRUFBRSxNQUFNLHNCQUFzQixDQUFDO0FBQ3RELE9BQU8sRUFBRSxZQUFZLEVBQUUsTUFBTSxvQkFBb0IsQ0FBQztBQUNsRCxPQUFPLEVBQUUsWUFBWSxFQUFFLE1BQU0sb0JBQW9CLENBQUM7QUFDbEQsT0FBTyxFQUFFLGdCQUFnQixFQUFFLE1BQU0sd0JBQXdCLENBQUM7QUFDMUQsT0FBTyxFQUFFLGVBQWUsRUFBRSxNQUFNLHVCQUF1QixDQUFDO0FBRXhELE9BQU8sRUFBRSxvQkFBb0IsRUFBRSxNQUFNLHdCQUF3QixDQUFDO0FBQzlELE9BQU8sRUFBRSxxQkFBcUIsRUFBRSxNQUFNLHlCQUF5QixDQUFDO0FBQ2hFLE9BQU8sRUFBRSxpQkFBaUIsRUFBRSxNQUFNLG9CQUFvQixDQUFDOztBQWlCdkQsTUFBTSxPQUFPLGNBQWM7OzJHQUFkLGNBQWM7NEdBQWQsY0FBYyxpQkFIVixpQkFBaUIsRUFBRSxvQkFBb0IsRUFBRSxxQkFBcUIsYUFWM0UsVUFBVTtRQUNWLFlBQVk7UUFDWixXQUFXO1FBQ1gsY0FBYztRQUNkLGVBQWU7UUFDZixnQkFBZ0I7UUFDaEIsWUFBWTtRQUNaLFlBQVk7UUFDWixjQUFjLGFBR04saUJBQWlCOzRHQUVoQixjQUFjLFlBZGhCO1lBQ1AsVUFBVTtZQUNWLFlBQVk7WUFDWixXQUFXO1lBQ1gsY0FBYztZQUNkLGVBQWU7WUFDZixnQkFBZ0I7WUFDaEIsWUFBWTtZQUNaLFlBQVk7WUFDWixjQUFjO1NBQ2Y7MkZBSVUsY0FBYztrQkFmMUIsUUFBUTttQkFBQztvQkFDUixPQUFPLEVBQUU7d0JBQ1AsVUFBVTt3QkFDVixZQUFZO3dCQUNaLFdBQVc7d0JBQ1gsY0FBYzt3QkFDZCxlQUFlO3dCQUNmLGdCQUFnQjt3QkFDaEIsWUFBWTt3QkFDWixZQUFZO3dCQUNaLGNBQWM7cUJBQ2Y7b0JBQ0QsWUFBWSxFQUFFLENBQUMsaUJBQWlCLEVBQUUsb0JBQW9CLEVBQUUscUJBQXFCLENBQUM7b0JBQzlFLE9BQU8sRUFBRSxDQUFDLGlCQUFpQixDQUFDO2lCQUM3QiIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxuICogVXNlIG9mIHRoaXMgc291cmNlIGNvZGUgaXMgZ292ZXJuZWQgYnkgYW4gTUlULXN0eWxlIGxpY2Vuc2UgdGhhdCBjYW4gYmVcbiAqIGZvdW5kIGluIHRoZSBMSUNFTlNFIGZpbGUgYXQgaHR0cHM6Ly9naXRodWIuY29tL05HLVpPUlJPL25nLXpvcnJvLWFudGQvYmxvYi9tYXN0ZXIvTElDRU5TRVxuICovXG5cbmltcG9ydCB7IEJpZGlNb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jZGsvYmlkaSc7XG5pbXBvcnQgeyBQbGF0Zm9ybU1vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2Nkay9wbGF0Zm9ybSc7XG5pbXBvcnQgeyBDb21tb25Nb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jb21tb24nO1xuaW1wb3J0IHsgTmdNb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IEZvcm1zTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvZm9ybXMnO1xuXG5pbXBvcnQgeyBOekJ1dHRvbk1vZHVsZSB9IGZyb20gJ25nLXpvcnJvLWFudGQvYnV0dG9uJztcbmltcG9ydCB7IE56STE4bk1vZHVsZSB9IGZyb20gJ25nLXpvcnJvLWFudGQvaTE4bic7XG5pbXBvcnQgeyBOekljb25Nb2R1bGUgfSBmcm9tICduZy16b3Jyby1hbnRkL2ljb24nO1xuaW1wb3J0IHsgTnpQcm9ncmVzc01vZHVsZSB9IGZyb20gJ25nLXpvcnJvLWFudGQvcHJvZ3Jlc3MnO1xuaW1wb3J0IHsgTnpUb29sVGlwTW9kdWxlIH0gZnJvbSAnbmctem9ycm8tYW50ZC90b29sdGlwJztcblxuaW1wb3J0IHsgTnpVcGxvYWRCdG5Db21wb25lbnQgfSBmcm9tICcuL3VwbG9hZC1idG4uY29tcG9uZW50JztcbmltcG9ydCB7IE56VXBsb2FkTGlzdENvbXBvbmVudCB9IGZyb20gJy4vdXBsb2FkLWxpc3QuY29tcG9uZW50JztcbmltcG9ydCB7IE56VXBsb2FkQ29tcG9uZW50IH0gZnJvbSAnLi91cGxvYWQuY29tcG9uZW50JztcblxuQE5nTW9kdWxlKHtcbiAgaW1wb3J0czogW1xuICAgIEJpZGlNb2R1bGUsXG4gICAgQ29tbW9uTW9kdWxlLFxuICAgIEZvcm1zTW9kdWxlLFxuICAgIFBsYXRmb3JtTW9kdWxlLFxuICAgIE56VG9vbFRpcE1vZHVsZSxcbiAgICBOelByb2dyZXNzTW9kdWxlLFxuICAgIE56STE4bk1vZHVsZSxcbiAgICBOekljb25Nb2R1bGUsXG4gICAgTnpCdXR0b25Nb2R1bGVcbiAgXSxcbiAgZGVjbGFyYXRpb25zOiBbTnpVcGxvYWRDb21wb25lbnQsIE56VXBsb2FkQnRuQ29tcG9uZW50LCBOelVwbG9hZExpc3RDb21wb25lbnRdLFxuICBleHBvcnRzOiBbTnpVcGxvYWRDb21wb25lbnRdXG59KVxuZXhwb3J0IGNsYXNzIE56VXBsb2FkTW9kdWxlIHt9XG4iXX0=