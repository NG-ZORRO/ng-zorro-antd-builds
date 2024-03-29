/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */
import { BidiModule } from '@angular/cdk/bidi';
import { OverlayModule } from '@angular/cdk/overlay';
import { PortalModule } from '@angular/cdk/portal';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzNoAnimationModule } from 'ng-zorro-antd/core/no-animation';
import { NzOutletModule } from 'ng-zorro-antd/core/outlet';
import { NzI18nModule } from 'ng-zorro-antd/i18n';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzPipesModule } from 'ng-zorro-antd/pipes';
import { NzModalCloseComponent } from './modal-close.component';
import { NzModalConfirmContainerComponent } from './modal-confirm-container.component';
import { NzModalContainerComponent } from './modal-container.component';
import { NzModalContentDirective } from './modal-content.directive';
import { NzModalFooterComponent } from './modal-footer.component';
import { NzModalFooterDirective } from './modal-footer.directive';
import { NzModalTitleComponent } from './modal-title.component';
import { NzModalTitleDirective } from './modal-title.directive';
import { NzModalComponent } from './modal.component';
import { NzModalService } from './modal.service';
import * as i0 from "@angular/core";
export class NzModalModule {
}
NzModalModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.1.2", ngImport: i0, type: NzModalModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
NzModalModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "12.0.0", version: "13.1.2", ngImport: i0, type: NzModalModule, declarations: [NzModalComponent,
        NzModalFooterDirective,
        NzModalContentDirective,
        NzModalCloseComponent,
        NzModalFooterComponent,
        NzModalTitleComponent,
        NzModalTitleDirective,
        NzModalContainerComponent,
        NzModalConfirmContainerComponent,
        NzModalComponent], imports: [CommonModule,
        BidiModule,
        OverlayModule,
        NzOutletModule,
        PortalModule,
        NzI18nModule,
        NzButtonModule,
        NzIconModule,
        NzPipesModule,
        NzNoAnimationModule,
        NzPipesModule], exports: [NzModalComponent, NzModalFooterDirective, NzModalContentDirective, NzModalTitleDirective] });
NzModalModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "13.1.2", ngImport: i0, type: NzModalModule, providers: [NzModalService], imports: [[
            CommonModule,
            BidiModule,
            OverlayModule,
            NzOutletModule,
            PortalModule,
            NzI18nModule,
            NzButtonModule,
            NzIconModule,
            NzPipesModule,
            NzNoAnimationModule,
            NzPipesModule
        ]] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.1.2", ngImport: i0, type: NzModalModule, decorators: [{
            type: NgModule,
            args: [{
                    imports: [
                        CommonModule,
                        BidiModule,
                        OverlayModule,
                        NzOutletModule,
                        PortalModule,
                        NzI18nModule,
                        NzButtonModule,
                        NzIconModule,
                        NzPipesModule,
                        NzNoAnimationModule,
                        NzPipesModule
                    ],
                    exports: [NzModalComponent, NzModalFooterDirective, NzModalContentDirective, NzModalTitleDirective],
                    providers: [NzModalService],
                    entryComponents: [NzModalContainerComponent, NzModalConfirmContainerComponent],
                    declarations: [
                        NzModalComponent,
                        NzModalFooterDirective,
                        NzModalContentDirective,
                        NzModalCloseComponent,
                        NzModalFooterComponent,
                        NzModalTitleComponent,
                        NzModalTitleDirective,
                        NzModalContainerComponent,
                        NzModalConfirmContainerComponent,
                        NzModalComponent
                    ]
                }]
        }] });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kYWwubW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vY29tcG9uZW50cy9tb2RhbC9tb2RhbC5tb2R1bGUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7OztHQUdHO0FBRUgsT0FBTyxFQUFFLFVBQVUsRUFBRSxNQUFNLG1CQUFtQixDQUFDO0FBQy9DLE9BQU8sRUFBRSxhQUFhLEVBQUUsTUFBTSxzQkFBc0IsQ0FBQztBQUNyRCxPQUFPLEVBQUUsWUFBWSxFQUFFLE1BQU0scUJBQXFCLENBQUM7QUFDbkQsT0FBTyxFQUFFLFlBQVksRUFBRSxNQUFNLGlCQUFpQixDQUFDO0FBQy9DLE9BQU8sRUFBRSxRQUFRLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFFekMsT0FBTyxFQUFFLGNBQWMsRUFBRSxNQUFNLHNCQUFzQixDQUFDO0FBQ3RELE9BQU8sRUFBRSxtQkFBbUIsRUFBRSxNQUFNLGlDQUFpQyxDQUFDO0FBQ3RFLE9BQU8sRUFBRSxjQUFjLEVBQUUsTUFBTSwyQkFBMkIsQ0FBQztBQUMzRCxPQUFPLEVBQUUsWUFBWSxFQUFFLE1BQU0sb0JBQW9CLENBQUM7QUFDbEQsT0FBTyxFQUFFLFlBQVksRUFBRSxNQUFNLG9CQUFvQixDQUFDO0FBQ2xELE9BQU8sRUFBRSxhQUFhLEVBQUUsTUFBTSxxQkFBcUIsQ0FBQztBQUVwRCxPQUFPLEVBQUUscUJBQXFCLEVBQUUsTUFBTSx5QkFBeUIsQ0FBQztBQUNoRSxPQUFPLEVBQUUsZ0NBQWdDLEVBQUUsTUFBTSxxQ0FBcUMsQ0FBQztBQUN2RixPQUFPLEVBQUUseUJBQXlCLEVBQUUsTUFBTSw2QkFBNkIsQ0FBQztBQUN4RSxPQUFPLEVBQUUsdUJBQXVCLEVBQUUsTUFBTSwyQkFBMkIsQ0FBQztBQUNwRSxPQUFPLEVBQUUsc0JBQXNCLEVBQUUsTUFBTSwwQkFBMEIsQ0FBQztBQUNsRSxPQUFPLEVBQUUsc0JBQXNCLEVBQUUsTUFBTSwwQkFBMEIsQ0FBQztBQUNsRSxPQUFPLEVBQUUscUJBQXFCLEVBQUUsTUFBTSx5QkFBeUIsQ0FBQztBQUNoRSxPQUFPLEVBQUUscUJBQXFCLEVBQUUsTUFBTSx5QkFBeUIsQ0FBQztBQUNoRSxPQUFPLEVBQUUsZ0JBQWdCLEVBQUUsTUFBTSxtQkFBbUIsQ0FBQztBQUNyRCxPQUFPLEVBQUUsY0FBYyxFQUFFLE1BQU0saUJBQWlCLENBQUM7O0FBZ0NqRCxNQUFNLE9BQU8sYUFBYTs7MEdBQWIsYUFBYTsyR0FBYixhQUFhLGlCQVp0QixnQkFBZ0I7UUFDaEIsc0JBQXNCO1FBQ3RCLHVCQUF1QjtRQUN2QixxQkFBcUI7UUFDckIsc0JBQXNCO1FBQ3RCLHFCQUFxQjtRQUNyQixxQkFBcUI7UUFDckIseUJBQXlCO1FBQ3pCLGdDQUFnQztRQUNoQyxnQkFBZ0IsYUF6QmhCLFlBQVk7UUFDWixVQUFVO1FBQ1YsYUFBYTtRQUNiLGNBQWM7UUFDZCxZQUFZO1FBQ1osWUFBWTtRQUNaLGNBQWM7UUFDZCxZQUFZO1FBQ1osYUFBYTtRQUNiLG1CQUFtQjtRQUNuQixhQUFhLGFBRUwsZ0JBQWdCLEVBQUUsc0JBQXNCLEVBQUUsdUJBQXVCLEVBQUUscUJBQXFCOzJHQWdCdkYsYUFBYSxhQWZiLENBQUMsY0FBYyxDQUFDLFlBZGxCO1lBQ1AsWUFBWTtZQUNaLFVBQVU7WUFDVixhQUFhO1lBQ2IsY0FBYztZQUNkLFlBQVk7WUFDWixZQUFZO1lBQ1osY0FBYztZQUNkLFlBQVk7WUFDWixhQUFhO1lBQ2IsbUJBQW1CO1lBQ25CLGFBQWE7U0FDZDsyRkFpQlUsYUFBYTtrQkE5QnpCLFFBQVE7bUJBQUM7b0JBQ1IsT0FBTyxFQUFFO3dCQUNQLFlBQVk7d0JBQ1osVUFBVTt3QkFDVixhQUFhO3dCQUNiLGNBQWM7d0JBQ2QsWUFBWTt3QkFDWixZQUFZO3dCQUNaLGNBQWM7d0JBQ2QsWUFBWTt3QkFDWixhQUFhO3dCQUNiLG1CQUFtQjt3QkFDbkIsYUFBYTtxQkFDZDtvQkFDRCxPQUFPLEVBQUUsQ0FBQyxnQkFBZ0IsRUFBRSxzQkFBc0IsRUFBRSx1QkFBdUIsRUFBRSxxQkFBcUIsQ0FBQztvQkFDbkcsU0FBUyxFQUFFLENBQUMsY0FBYyxDQUFDO29CQUMzQixlQUFlLEVBQUUsQ0FBQyx5QkFBeUIsRUFBRSxnQ0FBZ0MsQ0FBQztvQkFDOUUsWUFBWSxFQUFFO3dCQUNaLGdCQUFnQjt3QkFDaEIsc0JBQXNCO3dCQUN0Qix1QkFBdUI7d0JBQ3ZCLHFCQUFxQjt3QkFDckIsc0JBQXNCO3dCQUN0QixxQkFBcUI7d0JBQ3JCLHFCQUFxQjt3QkFDckIseUJBQXlCO3dCQUN6QixnQ0FBZ0M7d0JBQ2hDLGdCQUFnQjtxQkFDakI7aUJBQ0YiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqIFVzZSBvZiB0aGlzIHNvdXJjZSBjb2RlIGlzIGdvdmVybmVkIGJ5IGFuIE1JVC1zdHlsZSBsaWNlbnNlIHRoYXQgY2FuIGJlXG4gKiBmb3VuZCBpbiB0aGUgTElDRU5TRSBmaWxlIGF0IGh0dHBzOi8vZ2l0aHViLmNvbS9ORy1aT1JSTy9uZy16b3Jyby1hbnRkL2Jsb2IvbWFzdGVyL0xJQ0VOU0VcbiAqL1xuXG5pbXBvcnQgeyBCaWRpTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY2RrL2JpZGknO1xuaW1wb3J0IHsgT3ZlcmxheU1vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2Nkay9vdmVybGF5JztcbmltcG9ydCB7IFBvcnRhbE1vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2Nkay9wb3J0YWwnO1xuaW1wb3J0IHsgQ29tbW9uTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uJztcbmltcG9ydCB7IE5nTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5cbmltcG9ydCB7IE56QnV0dG9uTW9kdWxlIH0gZnJvbSAnbmctem9ycm8tYW50ZC9idXR0b24nO1xuaW1wb3J0IHsgTnpOb0FuaW1hdGlvbk1vZHVsZSB9IGZyb20gJ25nLXpvcnJvLWFudGQvY29yZS9uby1hbmltYXRpb24nO1xuaW1wb3J0IHsgTnpPdXRsZXRNb2R1bGUgfSBmcm9tICduZy16b3Jyby1hbnRkL2NvcmUvb3V0bGV0JztcbmltcG9ydCB7IE56STE4bk1vZHVsZSB9IGZyb20gJ25nLXpvcnJvLWFudGQvaTE4bic7XG5pbXBvcnQgeyBOekljb25Nb2R1bGUgfSBmcm9tICduZy16b3Jyby1hbnRkL2ljb24nO1xuaW1wb3J0IHsgTnpQaXBlc01vZHVsZSB9IGZyb20gJ25nLXpvcnJvLWFudGQvcGlwZXMnO1xuXG5pbXBvcnQgeyBOek1vZGFsQ2xvc2VDb21wb25lbnQgfSBmcm9tICcuL21vZGFsLWNsb3NlLmNvbXBvbmVudCc7XG5pbXBvcnQgeyBOek1vZGFsQ29uZmlybUNvbnRhaW5lckNvbXBvbmVudCB9IGZyb20gJy4vbW9kYWwtY29uZmlybS1jb250YWluZXIuY29tcG9uZW50JztcbmltcG9ydCB7IE56TW9kYWxDb250YWluZXJDb21wb25lbnQgfSBmcm9tICcuL21vZGFsLWNvbnRhaW5lci5jb21wb25lbnQnO1xuaW1wb3J0IHsgTnpNb2RhbENvbnRlbnREaXJlY3RpdmUgfSBmcm9tICcuL21vZGFsLWNvbnRlbnQuZGlyZWN0aXZlJztcbmltcG9ydCB7IE56TW9kYWxGb290ZXJDb21wb25lbnQgfSBmcm9tICcuL21vZGFsLWZvb3Rlci5jb21wb25lbnQnO1xuaW1wb3J0IHsgTnpNb2RhbEZvb3RlckRpcmVjdGl2ZSB9IGZyb20gJy4vbW9kYWwtZm9vdGVyLmRpcmVjdGl2ZSc7XG5pbXBvcnQgeyBOek1vZGFsVGl0bGVDb21wb25lbnQgfSBmcm9tICcuL21vZGFsLXRpdGxlLmNvbXBvbmVudCc7XG5pbXBvcnQgeyBOek1vZGFsVGl0bGVEaXJlY3RpdmUgfSBmcm9tICcuL21vZGFsLXRpdGxlLmRpcmVjdGl2ZSc7XG5pbXBvcnQgeyBOek1vZGFsQ29tcG9uZW50IH0gZnJvbSAnLi9tb2RhbC5jb21wb25lbnQnO1xuaW1wb3J0IHsgTnpNb2RhbFNlcnZpY2UgfSBmcm9tICcuL21vZGFsLnNlcnZpY2UnO1xuXG5ATmdNb2R1bGUoe1xuICBpbXBvcnRzOiBbXG4gICAgQ29tbW9uTW9kdWxlLFxuICAgIEJpZGlNb2R1bGUsXG4gICAgT3ZlcmxheU1vZHVsZSxcbiAgICBOek91dGxldE1vZHVsZSxcbiAgICBQb3J0YWxNb2R1bGUsXG4gICAgTnpJMThuTW9kdWxlLFxuICAgIE56QnV0dG9uTW9kdWxlLFxuICAgIE56SWNvbk1vZHVsZSxcbiAgICBOelBpcGVzTW9kdWxlLFxuICAgIE56Tm9BbmltYXRpb25Nb2R1bGUsXG4gICAgTnpQaXBlc01vZHVsZVxuICBdLFxuICBleHBvcnRzOiBbTnpNb2RhbENvbXBvbmVudCwgTnpNb2RhbEZvb3RlckRpcmVjdGl2ZSwgTnpNb2RhbENvbnRlbnREaXJlY3RpdmUsIE56TW9kYWxUaXRsZURpcmVjdGl2ZV0sXG4gIHByb3ZpZGVyczogW056TW9kYWxTZXJ2aWNlXSxcbiAgZW50cnlDb21wb25lbnRzOiBbTnpNb2RhbENvbnRhaW5lckNvbXBvbmVudCwgTnpNb2RhbENvbmZpcm1Db250YWluZXJDb21wb25lbnRdLFxuICBkZWNsYXJhdGlvbnM6IFtcbiAgICBOek1vZGFsQ29tcG9uZW50LFxuICAgIE56TW9kYWxGb290ZXJEaXJlY3RpdmUsXG4gICAgTnpNb2RhbENvbnRlbnREaXJlY3RpdmUsXG4gICAgTnpNb2RhbENsb3NlQ29tcG9uZW50LFxuICAgIE56TW9kYWxGb290ZXJDb21wb25lbnQsXG4gICAgTnpNb2RhbFRpdGxlQ29tcG9uZW50LFxuICAgIE56TW9kYWxUaXRsZURpcmVjdGl2ZSxcbiAgICBOek1vZGFsQ29udGFpbmVyQ29tcG9uZW50LFxuICAgIE56TW9kYWxDb25maXJtQ29udGFpbmVyQ29tcG9uZW50LFxuICAgIE56TW9kYWxDb21wb25lbnRcbiAgXVxufSlcbmV4cG9ydCBjbGFzcyBOek1vZGFsTW9kdWxlIHt9XG4iXX0=