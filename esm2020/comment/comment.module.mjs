/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */
import { BidiModule } from '@angular/cdk/bidi';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { NzOutletModule } from 'ng-zorro-antd/core/outlet';
import { NzCommentActionComponent, NzCommentActionHostDirective, NzCommentAvatarDirective, NzCommentContentDirective } from './comment-cells';
import { NzCommentComponent } from './comment.component';
import * as i0 from "@angular/core";
const NZ_COMMENT_CELLS = [
    NzCommentAvatarDirective,
    NzCommentContentDirective,
    NzCommentActionComponent,
    NzCommentActionHostDirective
];
export class NzCommentModule {
}
NzCommentModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.1.2", ngImport: i0, type: NzCommentModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
NzCommentModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "12.0.0", version: "13.1.2", ngImport: i0, type: NzCommentModule, declarations: [NzCommentComponent, NzCommentAvatarDirective,
        NzCommentContentDirective,
        NzCommentActionComponent,
        NzCommentActionHostDirective], imports: [BidiModule, CommonModule, NzOutletModule], exports: [NzCommentComponent, NzCommentAvatarDirective,
        NzCommentContentDirective,
        NzCommentActionComponent,
        NzCommentActionHostDirective] });
NzCommentModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "13.1.2", ngImport: i0, type: NzCommentModule, imports: [[BidiModule, CommonModule, NzOutletModule]] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.1.2", ngImport: i0, type: NzCommentModule, decorators: [{
            type: NgModule,
            args: [{
                    imports: [BidiModule, CommonModule, NzOutletModule],
                    exports: [NzCommentComponent, ...NZ_COMMENT_CELLS],
                    declarations: [NzCommentComponent, ...NZ_COMMENT_CELLS]
                }]
        }] });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29tbWVudC5tb2R1bGUuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9jb21wb25lbnRzL2NvbW1lbnQvY29tbWVudC5tb2R1bGUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7OztHQUdHO0FBRUgsT0FBTyxFQUFFLFVBQVUsRUFBRSxNQUFNLG1CQUFtQixDQUFDO0FBQy9DLE9BQU8sRUFBRSxZQUFZLEVBQUUsTUFBTSxpQkFBaUIsQ0FBQztBQUMvQyxPQUFPLEVBQUUsUUFBUSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBRXpDLE9BQU8sRUFBRSxjQUFjLEVBQUUsTUFBTSwyQkFBMkIsQ0FBQztBQUUzRCxPQUFPLEVBQ0wsd0JBQXdCLEVBQ3hCLDRCQUE0QixFQUM1Qix3QkFBd0IsRUFDeEIseUJBQXlCLEVBQzFCLE1BQU0saUJBQWlCLENBQUM7QUFDekIsT0FBTyxFQUFFLGtCQUFrQixFQUFFLE1BQU0scUJBQXFCLENBQUM7O0FBRXpELE1BQU0sZ0JBQWdCLEdBQUc7SUFDdkIsd0JBQXdCO0lBQ3hCLHlCQUF5QjtJQUN6Qix3QkFBd0I7SUFDeEIsNEJBQTRCO0NBQzdCLENBQUM7QUFPRixNQUFNLE9BQU8sZUFBZTs7NEdBQWYsZUFBZTs2R0FBZixlQUFlLGlCQUZYLGtCQUFrQixFQVRqQyx3QkFBd0I7UUFDeEIseUJBQXlCO1FBQ3pCLHdCQUF3QjtRQUN4Qiw0QkFBNEIsYUFJbEIsVUFBVSxFQUFFLFlBQVksRUFBRSxjQUFjLGFBQ3hDLGtCQUFrQixFQVI1Qix3QkFBd0I7UUFDeEIseUJBQXlCO1FBQ3pCLHdCQUF3QjtRQUN4Qiw0QkFBNEI7NkdBUWpCLGVBQWUsWUFKakIsQ0FBQyxVQUFVLEVBQUUsWUFBWSxFQUFFLGNBQWMsQ0FBQzsyRkFJeEMsZUFBZTtrQkFMM0IsUUFBUTttQkFBQztvQkFDUixPQUFPLEVBQUUsQ0FBQyxVQUFVLEVBQUUsWUFBWSxFQUFFLGNBQWMsQ0FBQztvQkFDbkQsT0FBTyxFQUFFLENBQUMsa0JBQWtCLEVBQUUsR0FBRyxnQkFBZ0IsQ0FBQztvQkFDbEQsWUFBWSxFQUFFLENBQUMsa0JBQWtCLEVBQUUsR0FBRyxnQkFBZ0IsQ0FBQztpQkFDeEQiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqIFVzZSBvZiB0aGlzIHNvdXJjZSBjb2RlIGlzIGdvdmVybmVkIGJ5IGFuIE1JVC1zdHlsZSBsaWNlbnNlIHRoYXQgY2FuIGJlXG4gKiBmb3VuZCBpbiB0aGUgTElDRU5TRSBmaWxlIGF0IGh0dHBzOi8vZ2l0aHViLmNvbS9ORy1aT1JSTy9uZy16b3Jyby1hbnRkL2Jsb2IvbWFzdGVyL0xJQ0VOU0VcbiAqL1xuXG5pbXBvcnQgeyBCaWRpTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY2RrL2JpZGknO1xuaW1wb3J0IHsgQ29tbW9uTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uJztcbmltcG9ydCB7IE5nTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5cbmltcG9ydCB7IE56T3V0bGV0TW9kdWxlIH0gZnJvbSAnbmctem9ycm8tYW50ZC9jb3JlL291dGxldCc7XG5cbmltcG9ydCB7XG4gIE56Q29tbWVudEFjdGlvbkNvbXBvbmVudCxcbiAgTnpDb21tZW50QWN0aW9uSG9zdERpcmVjdGl2ZSxcbiAgTnpDb21tZW50QXZhdGFyRGlyZWN0aXZlLFxuICBOekNvbW1lbnRDb250ZW50RGlyZWN0aXZlXG59IGZyb20gJy4vY29tbWVudC1jZWxscyc7XG5pbXBvcnQgeyBOekNvbW1lbnRDb21wb25lbnQgfSBmcm9tICcuL2NvbW1lbnQuY29tcG9uZW50JztcblxuY29uc3QgTlpfQ09NTUVOVF9DRUxMUyA9IFtcbiAgTnpDb21tZW50QXZhdGFyRGlyZWN0aXZlLFxuICBOekNvbW1lbnRDb250ZW50RGlyZWN0aXZlLFxuICBOekNvbW1lbnRBY3Rpb25Db21wb25lbnQsXG4gIE56Q29tbWVudEFjdGlvbkhvc3REaXJlY3RpdmVcbl07XG5cbkBOZ01vZHVsZSh7XG4gIGltcG9ydHM6IFtCaWRpTW9kdWxlLCBDb21tb25Nb2R1bGUsIE56T3V0bGV0TW9kdWxlXSxcbiAgZXhwb3J0czogW056Q29tbWVudENvbXBvbmVudCwgLi4uTlpfQ09NTUVOVF9DRUxMU10sXG4gIGRlY2xhcmF0aW9uczogW056Q29tbWVudENvbXBvbmVudCwgLi4uTlpfQ09NTUVOVF9DRUxMU11cbn0pXG5leHBvcnQgY2xhc3MgTnpDb21tZW50TW9kdWxlIHt9XG4iXX0=