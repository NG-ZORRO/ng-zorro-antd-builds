/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */
import { A11yModule } from '@angular/cdk/a11y';
import { BidiModule } from '@angular/cdk/bidi';
import { OverlayModule } from '@angular/cdk/overlay';
import { PlatformModule } from '@angular/cdk/platform';
import { ScrollingModule } from '@angular/cdk/scrolling';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NzNoAnimationModule } from 'ng-zorro-antd/core/no-animation';
import { NzOutletModule } from 'ng-zorro-antd/core/outlet';
import { NzOverlayModule } from 'ng-zorro-antd/core/overlay';
import { ɵNzTransitionPatchModule as NzTransitionPatchModule } from 'ng-zorro-antd/core/transition-patch';
import { NzEmptyModule } from 'ng-zorro-antd/empty';
import { NzI18nModule } from 'ng-zorro-antd/i18n';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzOptionContainerComponent } from './option-container.component';
import { NzOptionGroupComponent } from './option-group.component';
import { NzOptionItemGroupComponent } from './option-item-group.component';
import { NzOptionItemComponent } from './option-item.component';
import { NzOptionComponent } from './option.component';
import { NzSelectArrowComponent } from './select-arrow.component';
import { NzSelectClearComponent } from './select-clear.component';
import { NzSelectItemComponent } from './select-item.component';
import { NzSelectPlaceholderComponent } from './select-placeholder.component';
import { NzSelectSearchComponent } from './select-search.component';
import { NzSelectTopControlComponent } from './select-top-control.component';
import { NzSelectComponent } from './select.component';
import * as i0 from "@angular/core";
export class NzSelectModule {
}
NzSelectModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.1.2", ngImport: i0, type: NzSelectModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
NzSelectModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "12.0.0", version: "13.1.2", ngImport: i0, type: NzSelectModule, declarations: [NzOptionComponent,
        NzSelectComponent,
        NzOptionContainerComponent,
        NzOptionGroupComponent,
        NzOptionItemComponent,
        NzSelectTopControlComponent,
        NzSelectSearchComponent,
        NzSelectItemComponent,
        NzSelectClearComponent,
        NzSelectArrowComponent,
        NzSelectPlaceholderComponent,
        NzOptionItemGroupComponent], imports: [BidiModule,
        CommonModule,
        NzI18nModule,
        FormsModule,
        PlatformModule,
        OverlayModule,
        NzIconModule,
        NzOutletModule,
        NzEmptyModule,
        NzOverlayModule,
        NzNoAnimationModule,
        NzTransitionPatchModule,
        ScrollingModule,
        A11yModule], exports: [NzOptionComponent,
        NzSelectComponent,
        NzOptionGroupComponent,
        NzSelectArrowComponent,
        NzSelectClearComponent,
        NzSelectItemComponent,
        NzSelectPlaceholderComponent,
        NzSelectSearchComponent] });
NzSelectModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "13.1.2", ngImport: i0, type: NzSelectModule, imports: [[
            BidiModule,
            CommonModule,
            NzI18nModule,
            FormsModule,
            PlatformModule,
            OverlayModule,
            NzIconModule,
            NzOutletModule,
            NzEmptyModule,
            NzOverlayModule,
            NzNoAnimationModule,
            NzTransitionPatchModule,
            ScrollingModule,
            A11yModule
        ]] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.1.2", ngImport: i0, type: NzSelectModule, decorators: [{
            type: NgModule,
            args: [{
                    imports: [
                        BidiModule,
                        CommonModule,
                        NzI18nModule,
                        FormsModule,
                        PlatformModule,
                        OverlayModule,
                        NzIconModule,
                        NzOutletModule,
                        NzEmptyModule,
                        NzOverlayModule,
                        NzNoAnimationModule,
                        NzTransitionPatchModule,
                        ScrollingModule,
                        A11yModule
                    ],
                    declarations: [
                        NzOptionComponent,
                        NzSelectComponent,
                        NzOptionContainerComponent,
                        NzOptionGroupComponent,
                        NzOptionItemComponent,
                        NzSelectTopControlComponent,
                        NzSelectSearchComponent,
                        NzSelectItemComponent,
                        NzSelectClearComponent,
                        NzSelectArrowComponent,
                        NzSelectPlaceholderComponent,
                        NzOptionItemGroupComponent
                    ],
                    exports: [
                        NzOptionComponent,
                        NzSelectComponent,
                        NzOptionGroupComponent,
                        NzSelectArrowComponent,
                        NzSelectClearComponent,
                        NzSelectItemComponent,
                        NzSelectPlaceholderComponent,
                        NzSelectSearchComponent
                    ]
                }]
        }] });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2VsZWN0Lm1vZHVsZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL2NvbXBvbmVudHMvc2VsZWN0L3NlbGVjdC5tb2R1bGUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7OztHQUdHO0FBRUgsT0FBTyxFQUFFLFVBQVUsRUFBRSxNQUFNLG1CQUFtQixDQUFDO0FBQy9DLE9BQU8sRUFBRSxVQUFVLEVBQUUsTUFBTSxtQkFBbUIsQ0FBQztBQUMvQyxPQUFPLEVBQUUsYUFBYSxFQUFFLE1BQU0sc0JBQXNCLENBQUM7QUFDckQsT0FBTyxFQUFFLGNBQWMsRUFBRSxNQUFNLHVCQUF1QixDQUFDO0FBQ3ZELE9BQU8sRUFBRSxlQUFlLEVBQUUsTUFBTSx3QkFBd0IsQ0FBQztBQUN6RCxPQUFPLEVBQUUsWUFBWSxFQUFFLE1BQU0saUJBQWlCLENBQUM7QUFDL0MsT0FBTyxFQUFFLFFBQVEsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUN6QyxPQUFPLEVBQUUsV0FBVyxFQUFFLE1BQU0sZ0JBQWdCLENBQUM7QUFFN0MsT0FBTyxFQUFFLG1CQUFtQixFQUFFLE1BQU0saUNBQWlDLENBQUM7QUFDdEUsT0FBTyxFQUFFLGNBQWMsRUFBRSxNQUFNLDJCQUEyQixDQUFDO0FBQzNELE9BQU8sRUFBRSxlQUFlLEVBQUUsTUFBTSw0QkFBNEIsQ0FBQztBQUM3RCxPQUFPLEVBQUUsd0JBQXdCLElBQUksdUJBQXVCLEVBQUUsTUFBTSxxQ0FBcUMsQ0FBQztBQUMxRyxPQUFPLEVBQUUsYUFBYSxFQUFFLE1BQU0scUJBQXFCLENBQUM7QUFDcEQsT0FBTyxFQUFFLFlBQVksRUFBRSxNQUFNLG9CQUFvQixDQUFDO0FBQ2xELE9BQU8sRUFBRSxZQUFZLEVBQUUsTUFBTSxvQkFBb0IsQ0FBQztBQUVsRCxPQUFPLEVBQUUsMEJBQTBCLEVBQUUsTUFBTSw4QkFBOEIsQ0FBQztBQUMxRSxPQUFPLEVBQUUsc0JBQXNCLEVBQUUsTUFBTSwwQkFBMEIsQ0FBQztBQUNsRSxPQUFPLEVBQUUsMEJBQTBCLEVBQUUsTUFBTSwrQkFBK0IsQ0FBQztBQUMzRSxPQUFPLEVBQUUscUJBQXFCLEVBQUUsTUFBTSx5QkFBeUIsQ0FBQztBQUNoRSxPQUFPLEVBQUUsaUJBQWlCLEVBQUUsTUFBTSxvQkFBb0IsQ0FBQztBQUN2RCxPQUFPLEVBQUUsc0JBQXNCLEVBQUUsTUFBTSwwQkFBMEIsQ0FBQztBQUNsRSxPQUFPLEVBQUUsc0JBQXNCLEVBQUUsTUFBTSwwQkFBMEIsQ0FBQztBQUNsRSxPQUFPLEVBQUUscUJBQXFCLEVBQUUsTUFBTSx5QkFBeUIsQ0FBQztBQUNoRSxPQUFPLEVBQUUsNEJBQTRCLEVBQUUsTUFBTSxnQ0FBZ0MsQ0FBQztBQUM5RSxPQUFPLEVBQUUsdUJBQXVCLEVBQUUsTUFBTSwyQkFBMkIsQ0FBQztBQUNwRSxPQUFPLEVBQUUsMkJBQTJCLEVBQUUsTUFBTSxnQ0FBZ0MsQ0FBQztBQUM3RSxPQUFPLEVBQUUsaUJBQWlCLEVBQUUsTUFBTSxvQkFBb0IsQ0FBQzs7QUE0Q3ZELE1BQU0sT0FBTyxjQUFjOzsyR0FBZCxjQUFjOzRHQUFkLGNBQWMsaUJBeEJ2QixpQkFBaUI7UUFDakIsaUJBQWlCO1FBQ2pCLDBCQUEwQjtRQUMxQixzQkFBc0I7UUFDdEIscUJBQXFCO1FBQ3JCLDJCQUEyQjtRQUMzQix1QkFBdUI7UUFDdkIscUJBQXFCO1FBQ3JCLHNCQUFzQjtRQUN0QixzQkFBc0I7UUFDdEIsNEJBQTRCO1FBQzVCLDBCQUEwQixhQTNCMUIsVUFBVTtRQUNWLFlBQVk7UUFDWixZQUFZO1FBQ1osV0FBVztRQUNYLGNBQWM7UUFDZCxhQUFhO1FBQ2IsWUFBWTtRQUNaLGNBQWM7UUFDZCxhQUFhO1FBQ2IsZUFBZTtRQUNmLG1CQUFtQjtRQUNuQix1QkFBdUI7UUFDdkIsZUFBZTtRQUNmLFVBQVUsYUFpQlYsaUJBQWlCO1FBQ2pCLGlCQUFpQjtRQUNqQixzQkFBc0I7UUFDdEIsc0JBQXNCO1FBQ3RCLHNCQUFzQjtRQUN0QixxQkFBcUI7UUFDckIsNEJBQTRCO1FBQzVCLHVCQUF1Qjs0R0FHZCxjQUFjLFlBekNoQjtZQUNQLFVBQVU7WUFDVixZQUFZO1lBQ1osWUFBWTtZQUNaLFdBQVc7WUFDWCxjQUFjO1lBQ2QsYUFBYTtZQUNiLFlBQVk7WUFDWixjQUFjO1lBQ2QsYUFBYTtZQUNiLGVBQWU7WUFDZixtQkFBbUI7WUFDbkIsdUJBQXVCO1lBQ3ZCLGVBQWU7WUFDZixVQUFVO1NBQ1g7MkZBMEJVLGNBQWM7a0JBMUMxQixRQUFRO21CQUFDO29CQUNSLE9BQU8sRUFBRTt3QkFDUCxVQUFVO3dCQUNWLFlBQVk7d0JBQ1osWUFBWTt3QkFDWixXQUFXO3dCQUNYLGNBQWM7d0JBQ2QsYUFBYTt3QkFDYixZQUFZO3dCQUNaLGNBQWM7d0JBQ2QsYUFBYTt3QkFDYixlQUFlO3dCQUNmLG1CQUFtQjt3QkFDbkIsdUJBQXVCO3dCQUN2QixlQUFlO3dCQUNmLFVBQVU7cUJBQ1g7b0JBQ0QsWUFBWSxFQUFFO3dCQUNaLGlCQUFpQjt3QkFDakIsaUJBQWlCO3dCQUNqQiwwQkFBMEI7d0JBQzFCLHNCQUFzQjt3QkFDdEIscUJBQXFCO3dCQUNyQiwyQkFBMkI7d0JBQzNCLHVCQUF1Qjt3QkFDdkIscUJBQXFCO3dCQUNyQixzQkFBc0I7d0JBQ3RCLHNCQUFzQjt3QkFDdEIsNEJBQTRCO3dCQUM1QiwwQkFBMEI7cUJBQzNCO29CQUNELE9BQU8sRUFBRTt3QkFDUCxpQkFBaUI7d0JBQ2pCLGlCQUFpQjt3QkFDakIsc0JBQXNCO3dCQUN0QixzQkFBc0I7d0JBQ3RCLHNCQUFzQjt3QkFDdEIscUJBQXFCO3dCQUNyQiw0QkFBNEI7d0JBQzVCLHVCQUF1QjtxQkFDeEI7aUJBQ0YiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqIFVzZSBvZiB0aGlzIHNvdXJjZSBjb2RlIGlzIGdvdmVybmVkIGJ5IGFuIE1JVC1zdHlsZSBsaWNlbnNlIHRoYXQgY2FuIGJlXG4gKiBmb3VuZCBpbiB0aGUgTElDRU5TRSBmaWxlIGF0IGh0dHBzOi8vZ2l0aHViLmNvbS9ORy1aT1JSTy9uZy16b3Jyby1hbnRkL2Jsb2IvbWFzdGVyL0xJQ0VOU0VcbiAqL1xuXG5pbXBvcnQgeyBBMTF5TW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY2RrL2ExMXknO1xuaW1wb3J0IHsgQmlkaU1vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2Nkay9iaWRpJztcbmltcG9ydCB7IE92ZXJsYXlNb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jZGsvb3ZlcmxheSc7XG5pbXBvcnQgeyBQbGF0Zm9ybU1vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2Nkay9wbGF0Zm9ybSc7XG5pbXBvcnQgeyBTY3JvbGxpbmdNb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jZGsvc2Nyb2xsaW5nJztcbmltcG9ydCB7IENvbW1vbk1vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbic7XG5pbXBvcnQgeyBOZ01vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgRm9ybXNNb2R1bGUgfSBmcm9tICdAYW5ndWxhci9mb3Jtcyc7XG5cbmltcG9ydCB7IE56Tm9BbmltYXRpb25Nb2R1bGUgfSBmcm9tICduZy16b3Jyby1hbnRkL2NvcmUvbm8tYW5pbWF0aW9uJztcbmltcG9ydCB7IE56T3V0bGV0TW9kdWxlIH0gZnJvbSAnbmctem9ycm8tYW50ZC9jb3JlL291dGxldCc7XG5pbXBvcnQgeyBOek92ZXJsYXlNb2R1bGUgfSBmcm9tICduZy16b3Jyby1hbnRkL2NvcmUvb3ZlcmxheSc7XG5pbXBvcnQgeyDJtU56VHJhbnNpdGlvblBhdGNoTW9kdWxlIGFzIE56VHJhbnNpdGlvblBhdGNoTW9kdWxlIH0gZnJvbSAnbmctem9ycm8tYW50ZC9jb3JlL3RyYW5zaXRpb24tcGF0Y2gnO1xuaW1wb3J0IHsgTnpFbXB0eU1vZHVsZSB9IGZyb20gJ25nLXpvcnJvLWFudGQvZW1wdHknO1xuaW1wb3J0IHsgTnpJMThuTW9kdWxlIH0gZnJvbSAnbmctem9ycm8tYW50ZC9pMThuJztcbmltcG9ydCB7IE56SWNvbk1vZHVsZSB9IGZyb20gJ25nLXpvcnJvLWFudGQvaWNvbic7XG5cbmltcG9ydCB7IE56T3B0aW9uQ29udGFpbmVyQ29tcG9uZW50IH0gZnJvbSAnLi9vcHRpb24tY29udGFpbmVyLmNvbXBvbmVudCc7XG5pbXBvcnQgeyBOek9wdGlvbkdyb3VwQ29tcG9uZW50IH0gZnJvbSAnLi9vcHRpb24tZ3JvdXAuY29tcG9uZW50JztcbmltcG9ydCB7IE56T3B0aW9uSXRlbUdyb3VwQ29tcG9uZW50IH0gZnJvbSAnLi9vcHRpb24taXRlbS1ncm91cC5jb21wb25lbnQnO1xuaW1wb3J0IHsgTnpPcHRpb25JdGVtQ29tcG9uZW50IH0gZnJvbSAnLi9vcHRpb24taXRlbS5jb21wb25lbnQnO1xuaW1wb3J0IHsgTnpPcHRpb25Db21wb25lbnQgfSBmcm9tICcuL29wdGlvbi5jb21wb25lbnQnO1xuaW1wb3J0IHsgTnpTZWxlY3RBcnJvd0NvbXBvbmVudCB9IGZyb20gJy4vc2VsZWN0LWFycm93LmNvbXBvbmVudCc7XG5pbXBvcnQgeyBOelNlbGVjdENsZWFyQ29tcG9uZW50IH0gZnJvbSAnLi9zZWxlY3QtY2xlYXIuY29tcG9uZW50JztcbmltcG9ydCB7IE56U2VsZWN0SXRlbUNvbXBvbmVudCB9IGZyb20gJy4vc2VsZWN0LWl0ZW0uY29tcG9uZW50JztcbmltcG9ydCB7IE56U2VsZWN0UGxhY2Vob2xkZXJDb21wb25lbnQgfSBmcm9tICcuL3NlbGVjdC1wbGFjZWhvbGRlci5jb21wb25lbnQnO1xuaW1wb3J0IHsgTnpTZWxlY3RTZWFyY2hDb21wb25lbnQgfSBmcm9tICcuL3NlbGVjdC1zZWFyY2guY29tcG9uZW50JztcbmltcG9ydCB7IE56U2VsZWN0VG9wQ29udHJvbENvbXBvbmVudCB9IGZyb20gJy4vc2VsZWN0LXRvcC1jb250cm9sLmNvbXBvbmVudCc7XG5pbXBvcnQgeyBOelNlbGVjdENvbXBvbmVudCB9IGZyb20gJy4vc2VsZWN0LmNvbXBvbmVudCc7XG5cbkBOZ01vZHVsZSh7XG4gIGltcG9ydHM6IFtcbiAgICBCaWRpTW9kdWxlLFxuICAgIENvbW1vbk1vZHVsZSxcbiAgICBOekkxOG5Nb2R1bGUsXG4gICAgRm9ybXNNb2R1bGUsXG4gICAgUGxhdGZvcm1Nb2R1bGUsXG4gICAgT3ZlcmxheU1vZHVsZSxcbiAgICBOekljb25Nb2R1bGUsXG4gICAgTnpPdXRsZXRNb2R1bGUsXG4gICAgTnpFbXB0eU1vZHVsZSxcbiAgICBOek92ZXJsYXlNb2R1bGUsXG4gICAgTnpOb0FuaW1hdGlvbk1vZHVsZSxcbiAgICBOelRyYW5zaXRpb25QYXRjaE1vZHVsZSxcbiAgICBTY3JvbGxpbmdNb2R1bGUsXG4gICAgQTExeU1vZHVsZVxuICBdLFxuICBkZWNsYXJhdGlvbnM6IFtcbiAgICBOek9wdGlvbkNvbXBvbmVudCxcbiAgICBOelNlbGVjdENvbXBvbmVudCxcbiAgICBOek9wdGlvbkNvbnRhaW5lckNvbXBvbmVudCxcbiAgICBOek9wdGlvbkdyb3VwQ29tcG9uZW50LFxuICAgIE56T3B0aW9uSXRlbUNvbXBvbmVudCxcbiAgICBOelNlbGVjdFRvcENvbnRyb2xDb21wb25lbnQsXG4gICAgTnpTZWxlY3RTZWFyY2hDb21wb25lbnQsXG4gICAgTnpTZWxlY3RJdGVtQ29tcG9uZW50LFxuICAgIE56U2VsZWN0Q2xlYXJDb21wb25lbnQsXG4gICAgTnpTZWxlY3RBcnJvd0NvbXBvbmVudCxcbiAgICBOelNlbGVjdFBsYWNlaG9sZGVyQ29tcG9uZW50LFxuICAgIE56T3B0aW9uSXRlbUdyb3VwQ29tcG9uZW50XG4gIF0sXG4gIGV4cG9ydHM6IFtcbiAgICBOek9wdGlvbkNvbXBvbmVudCxcbiAgICBOelNlbGVjdENvbXBvbmVudCxcbiAgICBOek9wdGlvbkdyb3VwQ29tcG9uZW50LFxuICAgIE56U2VsZWN0QXJyb3dDb21wb25lbnQsXG4gICAgTnpTZWxlY3RDbGVhckNvbXBvbmVudCxcbiAgICBOelNlbGVjdEl0ZW1Db21wb25lbnQsXG4gICAgTnpTZWxlY3RQbGFjZWhvbGRlckNvbXBvbmVudCxcbiAgICBOelNlbGVjdFNlYXJjaENvbXBvbmVudFxuICBdXG59KVxuZXhwb3J0IGNsYXNzIE56U2VsZWN0TW9kdWxlIHt9XG4iXX0=