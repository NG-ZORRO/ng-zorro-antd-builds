/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */
import { BidiModule } from '@angular/cdk/bidi';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { NzOutletModule } from 'ng-zorro-antd/core/outlet';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzResultNotFoundComponent } from './partial/not-found';
import { NzResultServerErrorComponent } from './partial/server-error.component';
import { NzResultUnauthorizedComponent } from './partial/unauthorized';
import { NzResultContentDirective, NzResultExtraDirective, NzResultIconDirective, NzResultSubtitleDirective, NzResultTitleDirective } from './result-cells';
import { NzResultComponent } from './result.component';
import * as i0 from "@angular/core";
const partial = [NzResultNotFoundComponent, NzResultServerErrorComponent, NzResultUnauthorizedComponent];
const cellDirectives = [
    NzResultContentDirective,
    NzResultExtraDirective,
    NzResultIconDirective,
    NzResultSubtitleDirective,
    NzResultTitleDirective
];
export class NzResultModule {
}
NzResultModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.1.2", ngImport: i0, type: NzResultModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
NzResultModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "12.0.0", version: "13.1.2", ngImport: i0, type: NzResultModule, declarations: [NzResultComponent, NzResultContentDirective,
        NzResultExtraDirective,
        NzResultIconDirective,
        NzResultSubtitleDirective,
        NzResultTitleDirective, NzResultNotFoundComponent, NzResultServerErrorComponent, NzResultUnauthorizedComponent], imports: [BidiModule, CommonModule, NzOutletModule, NzIconModule], exports: [NzResultComponent, NzResultContentDirective,
        NzResultExtraDirective,
        NzResultIconDirective,
        NzResultSubtitleDirective,
        NzResultTitleDirective] });
NzResultModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "13.1.2", ngImport: i0, type: NzResultModule, imports: [[BidiModule, CommonModule, NzOutletModule, NzIconModule]] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.1.2", ngImport: i0, type: NzResultModule, decorators: [{
            type: NgModule,
            args: [{
                    imports: [BidiModule, CommonModule, NzOutletModule, NzIconModule],
                    declarations: [NzResultComponent, ...cellDirectives, ...partial],
                    exports: [NzResultComponent, ...cellDirectives]
                }]
        }] });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicmVzdWx0Lm1vZHVsZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL2NvbXBvbmVudHMvcmVzdWx0L3Jlc3VsdC5tb2R1bGUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7OztHQUdHO0FBRUgsT0FBTyxFQUFFLFVBQVUsRUFBRSxNQUFNLG1CQUFtQixDQUFDO0FBQy9DLE9BQU8sRUFBRSxZQUFZLEVBQUUsTUFBTSxpQkFBaUIsQ0FBQztBQUMvQyxPQUFPLEVBQUUsUUFBUSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBRXpDLE9BQU8sRUFBRSxjQUFjLEVBQUUsTUFBTSwyQkFBMkIsQ0FBQztBQUMzRCxPQUFPLEVBQUUsWUFBWSxFQUFFLE1BQU0sb0JBQW9CLENBQUM7QUFFbEQsT0FBTyxFQUFFLHlCQUF5QixFQUFFLE1BQU0scUJBQXFCLENBQUM7QUFDaEUsT0FBTyxFQUFFLDRCQUE0QixFQUFFLE1BQU0sa0NBQWtDLENBQUM7QUFDaEYsT0FBTyxFQUFFLDZCQUE2QixFQUFFLE1BQU0sd0JBQXdCLENBQUM7QUFDdkUsT0FBTyxFQUNMLHdCQUF3QixFQUN4QixzQkFBc0IsRUFDdEIscUJBQXFCLEVBQ3JCLHlCQUF5QixFQUN6QixzQkFBc0IsRUFDdkIsTUFBTSxnQkFBZ0IsQ0FBQztBQUN4QixPQUFPLEVBQUUsaUJBQWlCLEVBQUUsTUFBTSxvQkFBb0IsQ0FBQzs7QUFFdkQsTUFBTSxPQUFPLEdBQUcsQ0FBQyx5QkFBeUIsRUFBRSw0QkFBNEIsRUFBRSw2QkFBNkIsQ0FBQyxDQUFDO0FBRXpHLE1BQU0sY0FBYyxHQUFHO0lBQ3JCLHdCQUF3QjtJQUN4QixzQkFBc0I7SUFDdEIscUJBQXFCO0lBQ3JCLHlCQUF5QjtJQUN6QixzQkFBc0I7Q0FDdkIsQ0FBQztBQU9GLE1BQU0sT0FBTyxjQUFjOzsyR0FBZCxjQUFjOzRHQUFkLGNBQWMsaUJBSFYsaUJBQWlCLEVBVGhDLHdCQUF3QjtRQUN4QixzQkFBc0I7UUFDdEIscUJBQXFCO1FBQ3JCLHlCQUF5QjtRQUN6QixzQkFBc0IsRUFQUCx5QkFBeUIsRUFBRSw0QkFBNEIsRUFBRSw2QkFBNkIsYUFXM0YsVUFBVSxFQUFFLFlBQVksRUFBRSxjQUFjLEVBQUUsWUFBWSxhQUV0RCxpQkFBaUIsRUFWM0Isd0JBQXdCO1FBQ3hCLHNCQUFzQjtRQUN0QixxQkFBcUI7UUFDckIseUJBQXlCO1FBQ3pCLHNCQUFzQjs0R0FRWCxjQUFjLFlBSmhCLENBQUMsVUFBVSxFQUFFLFlBQVksRUFBRSxjQUFjLEVBQUUsWUFBWSxDQUFDOzJGQUl0RCxjQUFjO2tCQUwxQixRQUFRO21CQUFDO29CQUNSLE9BQU8sRUFBRSxDQUFDLFVBQVUsRUFBRSxZQUFZLEVBQUUsY0FBYyxFQUFFLFlBQVksQ0FBQztvQkFDakUsWUFBWSxFQUFFLENBQUMsaUJBQWlCLEVBQUUsR0FBRyxjQUFjLEVBQUUsR0FBRyxPQUFPLENBQUM7b0JBQ2hFLE9BQU8sRUFBRSxDQUFDLGlCQUFpQixFQUFFLEdBQUcsY0FBYyxDQUFDO2lCQUNoRCIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxuICogVXNlIG9mIHRoaXMgc291cmNlIGNvZGUgaXMgZ292ZXJuZWQgYnkgYW4gTUlULXN0eWxlIGxpY2Vuc2UgdGhhdCBjYW4gYmVcbiAqIGZvdW5kIGluIHRoZSBMSUNFTlNFIGZpbGUgYXQgaHR0cHM6Ly9naXRodWIuY29tL05HLVpPUlJPL25nLXpvcnJvLWFudGQvYmxvYi9tYXN0ZXIvTElDRU5TRVxuICovXG5cbmltcG9ydCB7IEJpZGlNb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jZGsvYmlkaSc7XG5pbXBvcnQgeyBDb21tb25Nb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jb21tb24nO1xuaW1wb3J0IHsgTmdNb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcblxuaW1wb3J0IHsgTnpPdXRsZXRNb2R1bGUgfSBmcm9tICduZy16b3Jyby1hbnRkL2NvcmUvb3V0bGV0JztcbmltcG9ydCB7IE56SWNvbk1vZHVsZSB9IGZyb20gJ25nLXpvcnJvLWFudGQvaWNvbic7XG5cbmltcG9ydCB7IE56UmVzdWx0Tm90Rm91bmRDb21wb25lbnQgfSBmcm9tICcuL3BhcnRpYWwvbm90LWZvdW5kJztcbmltcG9ydCB7IE56UmVzdWx0U2VydmVyRXJyb3JDb21wb25lbnQgfSBmcm9tICcuL3BhcnRpYWwvc2VydmVyLWVycm9yLmNvbXBvbmVudCc7XG5pbXBvcnQgeyBOelJlc3VsdFVuYXV0aG9yaXplZENvbXBvbmVudCB9IGZyb20gJy4vcGFydGlhbC91bmF1dGhvcml6ZWQnO1xuaW1wb3J0IHtcbiAgTnpSZXN1bHRDb250ZW50RGlyZWN0aXZlLFxuICBOelJlc3VsdEV4dHJhRGlyZWN0aXZlLFxuICBOelJlc3VsdEljb25EaXJlY3RpdmUsXG4gIE56UmVzdWx0U3VidGl0bGVEaXJlY3RpdmUsXG4gIE56UmVzdWx0VGl0bGVEaXJlY3RpdmVcbn0gZnJvbSAnLi9yZXN1bHQtY2VsbHMnO1xuaW1wb3J0IHsgTnpSZXN1bHRDb21wb25lbnQgfSBmcm9tICcuL3Jlc3VsdC5jb21wb25lbnQnO1xuXG5jb25zdCBwYXJ0aWFsID0gW056UmVzdWx0Tm90Rm91bmRDb21wb25lbnQsIE56UmVzdWx0U2VydmVyRXJyb3JDb21wb25lbnQsIE56UmVzdWx0VW5hdXRob3JpemVkQ29tcG9uZW50XTtcblxuY29uc3QgY2VsbERpcmVjdGl2ZXMgPSBbXG4gIE56UmVzdWx0Q29udGVudERpcmVjdGl2ZSxcbiAgTnpSZXN1bHRFeHRyYURpcmVjdGl2ZSxcbiAgTnpSZXN1bHRJY29uRGlyZWN0aXZlLFxuICBOelJlc3VsdFN1YnRpdGxlRGlyZWN0aXZlLFxuICBOelJlc3VsdFRpdGxlRGlyZWN0aXZlXG5dO1xuXG5ATmdNb2R1bGUoe1xuICBpbXBvcnRzOiBbQmlkaU1vZHVsZSwgQ29tbW9uTW9kdWxlLCBOek91dGxldE1vZHVsZSwgTnpJY29uTW9kdWxlXSxcbiAgZGVjbGFyYXRpb25zOiBbTnpSZXN1bHRDb21wb25lbnQsIC4uLmNlbGxEaXJlY3RpdmVzLCAuLi5wYXJ0aWFsXSxcbiAgZXhwb3J0czogW056UmVzdWx0Q29tcG9uZW50LCAuLi5jZWxsRGlyZWN0aXZlc11cbn0pXG5leHBvcnQgY2xhc3MgTnpSZXN1bHRNb2R1bGUge31cbiJdfQ==