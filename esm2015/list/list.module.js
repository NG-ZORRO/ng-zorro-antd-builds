/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */
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
NzListModule.decorators = [
    { type: NgModule, args: [{
                imports: [CommonModule, NzSpinModule, NzGridModule, NzAvatarModule, NzOutletModule, NzEmptyModule],
                declarations: [DIRECTIVES],
                exports: [DIRECTIVES]
            },] }
];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibGlzdC5tb2R1bGUuanMiLCJzb3VyY2VSb290IjoiL2hvbWUvdnN0cy93b3JrLzEvcy9jb21wb25lbnRzL2xpc3QvIiwic291cmNlcyI6WyJsaXN0Lm1vZHVsZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7O0dBR0c7QUFFSCxPQUFPLEVBQUUsWUFBWSxFQUFFLE1BQU0saUJBQWlCLENBQUM7QUFDL0MsT0FBTyxFQUFFLFFBQVEsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUV6QyxPQUFPLEVBQUUsY0FBYyxFQUFFLE1BQU0sc0JBQXNCLENBQUM7QUFDdEQsT0FBTyxFQUFFLGNBQWMsRUFBRSxNQUFNLDJCQUEyQixDQUFDO0FBQzNELE9BQU8sRUFBRSxhQUFhLEVBQUUsTUFBTSxxQkFBcUIsQ0FBQztBQUNwRCxPQUFPLEVBQUUsWUFBWSxFQUFFLE1BQU0sb0JBQW9CLENBQUM7QUFDbEQsT0FBTyxFQUFFLFlBQVksRUFBRSxNQUFNLG9CQUFvQixDQUFDO0FBRWxELE9BQU8sRUFDTCxvQkFBb0IsRUFDcEIscUJBQXFCLEVBQ3JCLG1CQUFtQixFQUNuQixxQkFBcUIsRUFDckIsdUJBQXVCLEVBQ3ZCLHlCQUF5QixFQUMxQixNQUFNLGFBQWEsQ0FBQztBQUNyQixPQUFPLEVBQUUseUJBQXlCLEVBQUUsMEJBQTBCLEVBQUUsd0JBQXdCLEVBQUUsTUFBTSxrQkFBa0IsQ0FBQztBQUNuSCxPQUFPLEVBQUUsNkJBQTZCLEVBQUUsa0NBQWtDLEVBQUUsNEJBQTRCLEVBQUUsTUFBTSx1QkFBdUIsQ0FBQztBQUN4SSxPQUFPLEVBQUUsdUJBQXVCLEVBQUUsTUFBTSw0QkFBNEIsQ0FBQztBQUNyRSxPQUFPLEVBQUUsbUJBQW1CLEVBQUUsTUFBTSx1QkFBdUIsQ0FBQztBQUM1RCxPQUFPLEVBQUUsZUFBZSxFQUFFLE1BQU0sa0JBQWtCLENBQUM7QUFFbkQsTUFBTSxVQUFVLEdBQUc7SUFDakIsZUFBZTtJQUNmLHFCQUFxQjtJQUNyQixxQkFBcUI7SUFDckIseUJBQXlCO0lBQ3pCLG9CQUFvQjtJQUNwQixtQkFBbUI7SUFDbkIsdUJBQXVCO0lBQ3ZCLDRCQUE0QjtJQUM1QixrQ0FBa0M7SUFDbEMsNkJBQTZCO0lBQzdCLDBCQUEwQjtJQUMxQix5QkFBeUI7SUFDekIsd0JBQXdCO0lBQ3hCLHVCQUF1QjtJQUN2QixtQkFBbUI7Q0FDcEIsQ0FBQztBQU9GLE1BQU0sT0FBTyxZQUFZOzs7WUFMeEIsUUFBUSxTQUFDO2dCQUNSLE9BQU8sRUFBRSxDQUFDLFlBQVksRUFBRSxZQUFZLEVBQUUsWUFBWSxFQUFFLGNBQWMsRUFBRSxjQUFjLEVBQUUsYUFBYSxDQUFDO2dCQUNsRyxZQUFZLEVBQUUsQ0FBQyxVQUFVLENBQUM7Z0JBQzFCLE9BQU8sRUFBRSxDQUFDLFVBQVUsQ0FBQzthQUN0QiIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxuICogVXNlIG9mIHRoaXMgc291cmNlIGNvZGUgaXMgZ292ZXJuZWQgYnkgYW4gTUlULXN0eWxlIGxpY2Vuc2UgdGhhdCBjYW4gYmVcbiAqIGZvdW5kIGluIHRoZSBMSUNFTlNFIGZpbGUgYXQgaHR0cHM6Ly9naXRodWIuY29tL05HLVpPUlJPL25nLXpvcnJvLWFudGQvYmxvYi9tYXN0ZXIvTElDRU5TRVxuICovXG5cbmltcG9ydCB7IENvbW1vbk1vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbic7XG5pbXBvcnQgeyBOZ01vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuXG5pbXBvcnQgeyBOekF2YXRhck1vZHVsZSB9IGZyb20gJ25nLXpvcnJvLWFudGQvYXZhdGFyJztcbmltcG9ydCB7IE56T3V0bGV0TW9kdWxlIH0gZnJvbSAnbmctem9ycm8tYW50ZC9jb3JlL291dGxldCc7XG5pbXBvcnQgeyBOekVtcHR5TW9kdWxlIH0gZnJvbSAnbmctem9ycm8tYW50ZC9lbXB0eSc7XG5pbXBvcnQgeyBOekdyaWRNb2R1bGUgfSBmcm9tICduZy16b3Jyby1hbnRkL2dyaWQnO1xuaW1wb3J0IHsgTnpTcGluTW9kdWxlIH0gZnJvbSAnbmctem9ycm8tYW50ZC9zcGluJztcblxuaW1wb3J0IHtcbiAgTnpMaXN0RW1wdHlDb21wb25lbnQsXG4gIE56TGlzdEZvb3RlckNvbXBvbmVudCxcbiAgTnpMaXN0R3JpZERpcmVjdGl2ZSxcbiAgTnpMaXN0SGVhZGVyQ29tcG9uZW50LFxuICBOekxpc3RMb2FkTW9yZURpcmVjdGl2ZSxcbiAgTnpMaXN0UGFnaW5hdGlvbkNvbXBvbmVudFxufSBmcm9tICcuL2xpc3QtY2VsbCc7XG5pbXBvcnQgeyBOekxpc3RJdGVtQWN0aW9uQ29tcG9uZW50LCBOekxpc3RJdGVtQWN0aW9uc0NvbXBvbmVudCwgTnpMaXN0SXRlbUV4dHJhQ29tcG9uZW50IH0gZnJvbSAnLi9saXN0LWl0ZW0tY2VsbCc7XG5pbXBvcnQgeyBOekxpc3RJdGVtTWV0YUF2YXRhckNvbXBvbmVudCwgTnpMaXN0SXRlbU1ldGFEZXNjcmlwdGlvbkNvbXBvbmVudCwgTnpMaXN0SXRlbU1ldGFUaXRsZUNvbXBvbmVudCB9IGZyb20gJy4vbGlzdC1pdGVtLW1ldGEtY2VsbCc7XG5pbXBvcnQgeyBOekxpc3RJdGVtTWV0YUNvbXBvbmVudCB9IGZyb20gJy4vbGlzdC1pdGVtLW1ldGEuY29tcG9uZW50JztcbmltcG9ydCB7IE56TGlzdEl0ZW1Db21wb25lbnQgfSBmcm9tICcuL2xpc3QtaXRlbS5jb21wb25lbnQnO1xuaW1wb3J0IHsgTnpMaXN0Q29tcG9uZW50IH0gZnJvbSAnLi9saXN0LmNvbXBvbmVudCc7XG5cbmNvbnN0IERJUkVDVElWRVMgPSBbXG4gIE56TGlzdENvbXBvbmVudCxcbiAgTnpMaXN0SGVhZGVyQ29tcG9uZW50LFxuICBOekxpc3RGb290ZXJDb21wb25lbnQsXG4gIE56TGlzdFBhZ2luYXRpb25Db21wb25lbnQsXG4gIE56TGlzdEVtcHR5Q29tcG9uZW50LFxuICBOekxpc3RJdGVtQ29tcG9uZW50LFxuICBOekxpc3RJdGVtTWV0YUNvbXBvbmVudCxcbiAgTnpMaXN0SXRlbU1ldGFUaXRsZUNvbXBvbmVudCxcbiAgTnpMaXN0SXRlbU1ldGFEZXNjcmlwdGlvbkNvbXBvbmVudCxcbiAgTnpMaXN0SXRlbU1ldGFBdmF0YXJDb21wb25lbnQsXG4gIE56TGlzdEl0ZW1BY3Rpb25zQ29tcG9uZW50LFxuICBOekxpc3RJdGVtQWN0aW9uQ29tcG9uZW50LFxuICBOekxpc3RJdGVtRXh0cmFDb21wb25lbnQsXG4gIE56TGlzdExvYWRNb3JlRGlyZWN0aXZlLFxuICBOekxpc3RHcmlkRGlyZWN0aXZlXG5dO1xuXG5ATmdNb2R1bGUoe1xuICBpbXBvcnRzOiBbQ29tbW9uTW9kdWxlLCBOelNwaW5Nb2R1bGUsIE56R3JpZE1vZHVsZSwgTnpBdmF0YXJNb2R1bGUsIE56T3V0bGV0TW9kdWxlLCBOekVtcHR5TW9kdWxlXSxcbiAgZGVjbGFyYXRpb25zOiBbRElSRUNUSVZFU10sXG4gIGV4cG9ydHM6IFtESVJFQ1RJVkVTXVxufSlcbmV4cG9ydCBjbGFzcyBOekxpc3RNb2R1bGUge31cbiJdfQ==