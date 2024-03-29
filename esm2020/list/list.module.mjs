/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */
import { BidiModule } from '@angular/cdk/bidi';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { NzAvatarModule } from 'ng-zorro-antd/avatar';
import { NzOutletModule } from 'ng-zorro-antd/core/outlet';
import { NzEmptyModule } from 'ng-zorro-antd/empty';
import { NzGridModule } from 'ng-zorro-antd/grid';
import { NzSpinModule } from 'ng-zorro-antd/spin';
import { NzListEmptyComponent, NzListFooterComponent, NzListGridDirective, NzListHeaderComponent, NzListLoadMoreDirective, NzListPaginationComponent } from './list-cell';
import { NzListItemActionComponent, NzListItemActionsComponent, NzListItemExtraComponent } from './list-item-cell';
import { NzListItemMetaAvatarComponent, NzListItemMetaDescriptionComponent, NzListItemMetaTitleComponent } from './list-item-meta-cell';
import { NzListItemMetaComponent } from './list-item-meta.component';
import { NzListItemComponent } from './list-item.component';
import { NzListComponent } from './list.component';
import * as i0 from "@angular/core";
const DIRECTIVES = [
    NzListComponent,
    NzListHeaderComponent,
    NzListFooterComponent,
    NzListPaginationComponent,
    NzListEmptyComponent,
    NzListItemComponent,
    NzListItemMetaComponent,
    NzListItemMetaTitleComponent,
    NzListItemMetaDescriptionComponent,
    NzListItemMetaAvatarComponent,
    NzListItemActionsComponent,
    NzListItemActionComponent,
    NzListItemExtraComponent,
    NzListLoadMoreDirective,
    NzListGridDirective
];
export class NzListModule {
}
NzListModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.1.2", ngImport: i0, type: NzListModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
NzListModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "12.0.0", version: "13.1.2", ngImport: i0, type: NzListModule, declarations: [NzListComponent,
        NzListHeaderComponent,
        NzListFooterComponent,
        NzListPaginationComponent,
        NzListEmptyComponent,
        NzListItemComponent,
        NzListItemMetaComponent,
        NzListItemMetaTitleComponent,
        NzListItemMetaDescriptionComponent,
        NzListItemMetaAvatarComponent,
        NzListItemActionsComponent,
        NzListItemActionComponent,
        NzListItemExtraComponent,
        NzListLoadMoreDirective,
        NzListGridDirective], imports: [BidiModule, CommonModule, NzSpinModule, NzGridModule, NzAvatarModule, NzOutletModule, NzEmptyModule], exports: [NzListComponent,
        NzListHeaderComponent,
        NzListFooterComponent,
        NzListPaginationComponent,
        NzListEmptyComponent,
        NzListItemComponent,
        NzListItemMetaComponent,
        NzListItemMetaTitleComponent,
        NzListItemMetaDescriptionComponent,
        NzListItemMetaAvatarComponent,
        NzListItemActionsComponent,
        NzListItemActionComponent,
        NzListItemExtraComponent,
        NzListLoadMoreDirective,
        NzListGridDirective] });
NzListModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "13.1.2", ngImport: i0, type: NzListModule, imports: [[BidiModule, CommonModule, NzSpinModule, NzGridModule, NzAvatarModule, NzOutletModule, NzEmptyModule]] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.1.2", ngImport: i0, type: NzListModule, decorators: [{
            type: NgModule,
            args: [{
                    imports: [BidiModule, CommonModule, NzSpinModule, NzGridModule, NzAvatarModule, NzOutletModule, NzEmptyModule],
                    declarations: [DIRECTIVES],
                    exports: [DIRECTIVES]
                }]
        }] });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibGlzdC5tb2R1bGUuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9jb21wb25lbnRzL2xpc3QvbGlzdC5tb2R1bGUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7OztHQUdHO0FBRUgsT0FBTyxFQUFFLFVBQVUsRUFBRSxNQUFNLG1CQUFtQixDQUFDO0FBQy9DLE9BQU8sRUFBRSxZQUFZLEVBQUUsTUFBTSxpQkFBaUIsQ0FBQztBQUMvQyxPQUFPLEVBQUUsUUFBUSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBRXpDLE9BQU8sRUFBRSxjQUFjLEVBQUUsTUFBTSxzQkFBc0IsQ0FBQztBQUN0RCxPQUFPLEVBQUUsY0FBYyxFQUFFLE1BQU0sMkJBQTJCLENBQUM7QUFDM0QsT0FBTyxFQUFFLGFBQWEsRUFBRSxNQUFNLHFCQUFxQixDQUFDO0FBQ3BELE9BQU8sRUFBRSxZQUFZLEVBQUUsTUFBTSxvQkFBb0IsQ0FBQztBQUNsRCxPQUFPLEVBQUUsWUFBWSxFQUFFLE1BQU0sb0JBQW9CLENBQUM7QUFFbEQsT0FBTyxFQUNMLG9CQUFvQixFQUNwQixxQkFBcUIsRUFDckIsbUJBQW1CLEVBQ25CLHFCQUFxQixFQUNyQix1QkFBdUIsRUFDdkIseUJBQXlCLEVBQzFCLE1BQU0sYUFBYSxDQUFDO0FBQ3JCLE9BQU8sRUFBRSx5QkFBeUIsRUFBRSwwQkFBMEIsRUFBRSx3QkFBd0IsRUFBRSxNQUFNLGtCQUFrQixDQUFDO0FBQ25ILE9BQU8sRUFDTCw2QkFBNkIsRUFDN0Isa0NBQWtDLEVBQ2xDLDRCQUE0QixFQUM3QixNQUFNLHVCQUF1QixDQUFDO0FBQy9CLE9BQU8sRUFBRSx1QkFBdUIsRUFBRSxNQUFNLDRCQUE0QixDQUFDO0FBQ3JFLE9BQU8sRUFBRSxtQkFBbUIsRUFBRSxNQUFNLHVCQUF1QixDQUFDO0FBQzVELE9BQU8sRUFBRSxlQUFlLEVBQUUsTUFBTSxrQkFBa0IsQ0FBQzs7QUFFbkQsTUFBTSxVQUFVLEdBQUc7SUFDakIsZUFBZTtJQUNmLHFCQUFxQjtJQUNyQixxQkFBcUI7SUFDckIseUJBQXlCO0lBQ3pCLG9CQUFvQjtJQUNwQixtQkFBbUI7SUFDbkIsdUJBQXVCO0lBQ3ZCLDRCQUE0QjtJQUM1QixrQ0FBa0M7SUFDbEMsNkJBQTZCO0lBQzdCLDBCQUEwQjtJQUMxQix5QkFBeUI7SUFDekIsd0JBQXdCO0lBQ3hCLHVCQUF1QjtJQUN2QixtQkFBbUI7Q0FDcEIsQ0FBQztBQU9GLE1BQU0sT0FBTyxZQUFZOzt5R0FBWixZQUFZOzBHQUFaLFlBQVksaUJBdEJ2QixlQUFlO1FBQ2YscUJBQXFCO1FBQ3JCLHFCQUFxQjtRQUNyQix5QkFBeUI7UUFDekIsb0JBQW9CO1FBQ3BCLG1CQUFtQjtRQUNuQix1QkFBdUI7UUFDdkIsNEJBQTRCO1FBQzVCLGtDQUFrQztRQUNsQyw2QkFBNkI7UUFDN0IsMEJBQTBCO1FBQzFCLHlCQUF5QjtRQUN6Qix3QkFBd0I7UUFDeEIsdUJBQXVCO1FBQ3ZCLG1CQUFtQixhQUlULFVBQVUsRUFBRSxZQUFZLEVBQUUsWUFBWSxFQUFFLFlBQVksRUFBRSxjQUFjLEVBQUUsY0FBYyxFQUFFLGFBQWEsYUFsQjdHLGVBQWU7UUFDZixxQkFBcUI7UUFDckIscUJBQXFCO1FBQ3JCLHlCQUF5QjtRQUN6QixvQkFBb0I7UUFDcEIsbUJBQW1CO1FBQ25CLHVCQUF1QjtRQUN2Qiw0QkFBNEI7UUFDNUIsa0NBQWtDO1FBQ2xDLDZCQUE2QjtRQUM3QiwwQkFBMEI7UUFDMUIseUJBQXlCO1FBQ3pCLHdCQUF3QjtRQUN4Qix1QkFBdUI7UUFDdkIsbUJBQW1COzBHQVFSLFlBQVksWUFKZCxDQUFDLFVBQVUsRUFBRSxZQUFZLEVBQUUsWUFBWSxFQUFFLFlBQVksRUFBRSxjQUFjLEVBQUUsY0FBYyxFQUFFLGFBQWEsQ0FBQzsyRkFJbkcsWUFBWTtrQkFMeEIsUUFBUTttQkFBQztvQkFDUixPQUFPLEVBQUUsQ0FBQyxVQUFVLEVBQUUsWUFBWSxFQUFFLFlBQVksRUFBRSxZQUFZLEVBQUUsY0FBYyxFQUFFLGNBQWMsRUFBRSxhQUFhLENBQUM7b0JBQzlHLFlBQVksRUFBRSxDQUFDLFVBQVUsQ0FBQztvQkFDMUIsT0FBTyxFQUFFLENBQUMsVUFBVSxDQUFDO2lCQUN0QiIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxuICogVXNlIG9mIHRoaXMgc291cmNlIGNvZGUgaXMgZ292ZXJuZWQgYnkgYW4gTUlULXN0eWxlIGxpY2Vuc2UgdGhhdCBjYW4gYmVcbiAqIGZvdW5kIGluIHRoZSBMSUNFTlNFIGZpbGUgYXQgaHR0cHM6Ly9naXRodWIuY29tL05HLVpPUlJPL25nLXpvcnJvLWFudGQvYmxvYi9tYXN0ZXIvTElDRU5TRVxuICovXG5cbmltcG9ydCB7IEJpZGlNb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jZGsvYmlkaSc7XG5pbXBvcnQgeyBDb21tb25Nb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jb21tb24nO1xuaW1wb3J0IHsgTmdNb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcblxuaW1wb3J0IHsgTnpBdmF0YXJNb2R1bGUgfSBmcm9tICduZy16b3Jyby1hbnRkL2F2YXRhcic7XG5pbXBvcnQgeyBOek91dGxldE1vZHVsZSB9IGZyb20gJ25nLXpvcnJvLWFudGQvY29yZS9vdXRsZXQnO1xuaW1wb3J0IHsgTnpFbXB0eU1vZHVsZSB9IGZyb20gJ25nLXpvcnJvLWFudGQvZW1wdHknO1xuaW1wb3J0IHsgTnpHcmlkTW9kdWxlIH0gZnJvbSAnbmctem9ycm8tYW50ZC9ncmlkJztcbmltcG9ydCB7IE56U3Bpbk1vZHVsZSB9IGZyb20gJ25nLXpvcnJvLWFudGQvc3Bpbic7XG5cbmltcG9ydCB7XG4gIE56TGlzdEVtcHR5Q29tcG9uZW50LFxuICBOekxpc3RGb290ZXJDb21wb25lbnQsXG4gIE56TGlzdEdyaWREaXJlY3RpdmUsXG4gIE56TGlzdEhlYWRlckNvbXBvbmVudCxcbiAgTnpMaXN0TG9hZE1vcmVEaXJlY3RpdmUsXG4gIE56TGlzdFBhZ2luYXRpb25Db21wb25lbnRcbn0gZnJvbSAnLi9saXN0LWNlbGwnO1xuaW1wb3J0IHsgTnpMaXN0SXRlbUFjdGlvbkNvbXBvbmVudCwgTnpMaXN0SXRlbUFjdGlvbnNDb21wb25lbnQsIE56TGlzdEl0ZW1FeHRyYUNvbXBvbmVudCB9IGZyb20gJy4vbGlzdC1pdGVtLWNlbGwnO1xuaW1wb3J0IHtcbiAgTnpMaXN0SXRlbU1ldGFBdmF0YXJDb21wb25lbnQsXG4gIE56TGlzdEl0ZW1NZXRhRGVzY3JpcHRpb25Db21wb25lbnQsXG4gIE56TGlzdEl0ZW1NZXRhVGl0bGVDb21wb25lbnRcbn0gZnJvbSAnLi9saXN0LWl0ZW0tbWV0YS1jZWxsJztcbmltcG9ydCB7IE56TGlzdEl0ZW1NZXRhQ29tcG9uZW50IH0gZnJvbSAnLi9saXN0LWl0ZW0tbWV0YS5jb21wb25lbnQnO1xuaW1wb3J0IHsgTnpMaXN0SXRlbUNvbXBvbmVudCB9IGZyb20gJy4vbGlzdC1pdGVtLmNvbXBvbmVudCc7XG5pbXBvcnQgeyBOekxpc3RDb21wb25lbnQgfSBmcm9tICcuL2xpc3QuY29tcG9uZW50JztcblxuY29uc3QgRElSRUNUSVZFUyA9IFtcbiAgTnpMaXN0Q29tcG9uZW50LFxuICBOekxpc3RIZWFkZXJDb21wb25lbnQsXG4gIE56TGlzdEZvb3RlckNvbXBvbmVudCxcbiAgTnpMaXN0UGFnaW5hdGlvbkNvbXBvbmVudCxcbiAgTnpMaXN0RW1wdHlDb21wb25lbnQsXG4gIE56TGlzdEl0ZW1Db21wb25lbnQsXG4gIE56TGlzdEl0ZW1NZXRhQ29tcG9uZW50LFxuICBOekxpc3RJdGVtTWV0YVRpdGxlQ29tcG9uZW50LFxuICBOekxpc3RJdGVtTWV0YURlc2NyaXB0aW9uQ29tcG9uZW50LFxuICBOekxpc3RJdGVtTWV0YUF2YXRhckNvbXBvbmVudCxcbiAgTnpMaXN0SXRlbUFjdGlvbnNDb21wb25lbnQsXG4gIE56TGlzdEl0ZW1BY3Rpb25Db21wb25lbnQsXG4gIE56TGlzdEl0ZW1FeHRyYUNvbXBvbmVudCxcbiAgTnpMaXN0TG9hZE1vcmVEaXJlY3RpdmUsXG4gIE56TGlzdEdyaWREaXJlY3RpdmVcbl07XG5cbkBOZ01vZHVsZSh7XG4gIGltcG9ydHM6IFtCaWRpTW9kdWxlLCBDb21tb25Nb2R1bGUsIE56U3Bpbk1vZHVsZSwgTnpHcmlkTW9kdWxlLCBOekF2YXRhck1vZHVsZSwgTnpPdXRsZXRNb2R1bGUsIE56RW1wdHlNb2R1bGVdLFxuICBkZWNsYXJhdGlvbnM6IFtESVJFQ1RJVkVTXSxcbiAgZXhwb3J0czogW0RJUkVDVElWRVNdXG59KVxuZXhwb3J0IGNsYXNzIE56TGlzdE1vZHVsZSB7fVxuIl19