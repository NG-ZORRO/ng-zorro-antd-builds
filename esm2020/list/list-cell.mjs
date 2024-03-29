/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */
import { ChangeDetectionStrategy, Component, Directive, Input } from '@angular/core';
import * as i0 from "@angular/core";
import * as i1 from "ng-zorro-antd/empty";
export class NzListEmptyComponent {
}
NzListEmptyComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.1.2", ngImport: i0, type: NzListEmptyComponent, deps: [], target: i0.ɵɵFactoryTarget.Component });
NzListEmptyComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "13.1.2", type: NzListEmptyComponent, selector: "nz-list-empty", inputs: { nzNoResult: "nzNoResult" }, host: { classAttribute: "ant-list-empty-text" }, exportAs: ["nzListHeader"], ngImport: i0, template: ` <nz-embed-empty [nzComponentName]="'list'" [specificContent]="nzNoResult"></nz-embed-empty> `, isInline: true, components: [{ type: i1.NzEmbedEmptyComponent, selector: "nz-embed-empty", inputs: ["nzComponentName", "specificContent"], exportAs: ["nzEmbedEmpty"] }], changeDetection: i0.ChangeDetectionStrategy.OnPush });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.1.2", ngImport: i0, type: NzListEmptyComponent, decorators: [{
            type: Component,
            args: [{
                    selector: 'nz-list-empty',
                    exportAs: 'nzListHeader',
                    changeDetection: ChangeDetectionStrategy.OnPush,
                    template: ` <nz-embed-empty [nzComponentName]="'list'" [specificContent]="nzNoResult"></nz-embed-empty> `,
                    host: {
                        class: 'ant-list-empty-text'
                    }
                }]
        }], propDecorators: { nzNoResult: [{
                type: Input
            }] } });
export class NzListHeaderComponent {
}
NzListHeaderComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.1.2", ngImport: i0, type: NzListHeaderComponent, deps: [], target: i0.ɵɵFactoryTarget.Component });
NzListHeaderComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "13.1.2", type: NzListHeaderComponent, selector: "nz-list-header", host: { classAttribute: "ant-list-header" }, exportAs: ["nzListHeader"], ngImport: i0, template: ` <ng-content></ng-content> `, isInline: true, changeDetection: i0.ChangeDetectionStrategy.OnPush });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.1.2", ngImport: i0, type: NzListHeaderComponent, decorators: [{
            type: Component,
            args: [{
                    selector: 'nz-list-header',
                    exportAs: 'nzListHeader',
                    changeDetection: ChangeDetectionStrategy.OnPush,
                    template: ` <ng-content></ng-content> `,
                    host: {
                        class: 'ant-list-header'
                    }
                }]
        }] });
export class NzListFooterComponent {
}
NzListFooterComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.1.2", ngImport: i0, type: NzListFooterComponent, deps: [], target: i0.ɵɵFactoryTarget.Component });
NzListFooterComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "13.1.2", type: NzListFooterComponent, selector: "nz-list-footer", host: { classAttribute: "ant-list-footer" }, exportAs: ["nzListFooter"], ngImport: i0, template: ` <ng-content></ng-content> `, isInline: true, changeDetection: i0.ChangeDetectionStrategy.OnPush });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.1.2", ngImport: i0, type: NzListFooterComponent, decorators: [{
            type: Component,
            args: [{
                    selector: 'nz-list-footer',
                    exportAs: 'nzListFooter',
                    changeDetection: ChangeDetectionStrategy.OnPush,
                    template: ` <ng-content></ng-content> `,
                    host: {
                        class: 'ant-list-footer'
                    }
                }]
        }] });
export class NzListPaginationComponent {
}
NzListPaginationComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.1.2", ngImport: i0, type: NzListPaginationComponent, deps: [], target: i0.ɵɵFactoryTarget.Component });
NzListPaginationComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "13.1.2", type: NzListPaginationComponent, selector: "nz-list-pagination", host: { classAttribute: "ant-list-pagination" }, exportAs: ["nzListPagination"], ngImport: i0, template: ` <ng-content></ng-content> `, isInline: true, changeDetection: i0.ChangeDetectionStrategy.OnPush });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.1.2", ngImport: i0, type: NzListPaginationComponent, decorators: [{
            type: Component,
            args: [{
                    selector: 'nz-list-pagination',
                    exportAs: 'nzListPagination',
                    changeDetection: ChangeDetectionStrategy.OnPush,
                    template: ` <ng-content></ng-content> `,
                    host: {
                        class: 'ant-list-pagination'
                    }
                }]
        }] });
export class NzListLoadMoreDirective {
}
NzListLoadMoreDirective.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.1.2", ngImport: i0, type: NzListLoadMoreDirective, deps: [], target: i0.ɵɵFactoryTarget.Directive });
NzListLoadMoreDirective.ɵdir = i0.ɵɵngDeclareDirective({ minVersion: "12.0.0", version: "13.1.2", type: NzListLoadMoreDirective, selector: "nz-list-load-more", exportAs: ["nzListLoadMoreDirective"], ngImport: i0 });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.1.2", ngImport: i0, type: NzListLoadMoreDirective, decorators: [{
            type: Directive,
            args: [{
                    selector: 'nz-list-load-more',
                    exportAs: 'nzListLoadMoreDirective'
                }]
        }] });
export class NzListGridDirective {
}
NzListGridDirective.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.1.2", ngImport: i0, type: NzListGridDirective, deps: [], target: i0.ɵɵFactoryTarget.Directive });
NzListGridDirective.ɵdir = i0.ɵɵngDeclareDirective({ minVersion: "12.0.0", version: "13.1.2", type: NzListGridDirective, selector: "nz-list[nzGrid]", host: { classAttribute: "ant-list-grid" }, ngImport: i0 });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.1.2", ngImport: i0, type: NzListGridDirective, decorators: [{
            type: Directive,
            args: [{
                    selector: 'nz-list[nzGrid]',
                    host: {
                        class: 'ant-list-grid'
                    }
                }]
        }] });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibGlzdC1jZWxsLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vY29tcG9uZW50cy9saXN0L2xpc3QtY2VsbC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7O0dBR0c7QUFFSCxPQUFPLEVBQUUsdUJBQXVCLEVBQUUsU0FBUyxFQUFFLFNBQVMsRUFBRSxLQUFLLEVBQWUsTUFBTSxlQUFlLENBQUM7OztBQVdsRyxNQUFNLE9BQU8sb0JBQW9COztpSEFBcEIsb0JBQW9CO3FHQUFwQixvQkFBb0Isd0tBTHJCLCtGQUErRjsyRkFLOUYsb0JBQW9CO2tCQVRoQyxTQUFTO21CQUFDO29CQUNULFFBQVEsRUFBRSxlQUFlO29CQUN6QixRQUFRLEVBQUUsY0FBYztvQkFDeEIsZUFBZSxFQUFFLHVCQUF1QixDQUFDLE1BQU07b0JBQy9DLFFBQVEsRUFBRSwrRkFBK0Y7b0JBQ3pHLElBQUksRUFBRTt3QkFDSixLQUFLLEVBQUUscUJBQXFCO3FCQUM3QjtpQkFDRjs4QkFFVSxVQUFVO3NCQUFsQixLQUFLOztBQVlSLE1BQU0sT0FBTyxxQkFBcUI7O2tIQUFyQixxQkFBcUI7c0dBQXJCLHFCQUFxQiwrSEFMdEIsNkJBQTZCOzJGQUs1QixxQkFBcUI7a0JBVGpDLFNBQVM7bUJBQUM7b0JBQ1QsUUFBUSxFQUFFLGdCQUFnQjtvQkFDMUIsUUFBUSxFQUFFLGNBQWM7b0JBQ3hCLGVBQWUsRUFBRSx1QkFBdUIsQ0FBQyxNQUFNO29CQUMvQyxRQUFRLEVBQUUsNkJBQTZCO29CQUN2QyxJQUFJLEVBQUU7d0JBQ0osS0FBSyxFQUFFLGlCQUFpQjtxQkFDekI7aUJBQ0Y7O0FBWUQsTUFBTSxPQUFPLHFCQUFxQjs7a0hBQXJCLHFCQUFxQjtzR0FBckIscUJBQXFCLCtIQUx0Qiw2QkFBNkI7MkZBSzVCLHFCQUFxQjtrQkFUakMsU0FBUzttQkFBQztvQkFDVCxRQUFRLEVBQUUsZ0JBQWdCO29CQUMxQixRQUFRLEVBQUUsY0FBYztvQkFDeEIsZUFBZSxFQUFFLHVCQUF1QixDQUFDLE1BQU07b0JBQy9DLFFBQVEsRUFBRSw2QkFBNkI7b0JBQ3ZDLElBQUksRUFBRTt3QkFDSixLQUFLLEVBQUUsaUJBQWlCO3FCQUN6QjtpQkFDRjs7QUFZRCxNQUFNLE9BQU8seUJBQXlCOztzSEFBekIseUJBQXlCOzBHQUF6Qix5QkFBeUIsMklBTDFCLDZCQUE2QjsyRkFLNUIseUJBQXlCO2tCQVRyQyxTQUFTO21CQUFDO29CQUNULFFBQVEsRUFBRSxvQkFBb0I7b0JBQzlCLFFBQVEsRUFBRSxrQkFBa0I7b0JBQzVCLGVBQWUsRUFBRSx1QkFBdUIsQ0FBQyxNQUFNO29CQUMvQyxRQUFRLEVBQUUsNkJBQTZCO29CQUN2QyxJQUFJLEVBQUU7d0JBQ0osS0FBSyxFQUFFLHFCQUFxQjtxQkFDN0I7aUJBQ0Y7O0FBT0QsTUFBTSxPQUFPLHVCQUF1Qjs7b0hBQXZCLHVCQUF1Qjt3R0FBdkIsdUJBQXVCOzJGQUF2Qix1QkFBdUI7a0JBSm5DLFNBQVM7bUJBQUM7b0JBQ1QsUUFBUSxFQUFFLG1CQUFtQjtvQkFDN0IsUUFBUSxFQUFFLHlCQUF5QjtpQkFDcEM7O0FBU0QsTUFBTSxPQUFPLG1CQUFtQjs7Z0hBQW5CLG1CQUFtQjtvR0FBbkIsbUJBQW1COzJGQUFuQixtQkFBbUI7a0JBTi9CLFNBQVM7bUJBQUM7b0JBQ1QsUUFBUSxFQUFFLGlCQUFpQjtvQkFDM0IsSUFBSSxFQUFFO3dCQUNKLEtBQUssRUFBRSxlQUFlO3FCQUN2QjtpQkFDRiIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxuICogVXNlIG9mIHRoaXMgc291cmNlIGNvZGUgaXMgZ292ZXJuZWQgYnkgYW4gTUlULXN0eWxlIGxpY2Vuc2UgdGhhdCBjYW4gYmVcbiAqIGZvdW5kIGluIHRoZSBMSUNFTlNFIGZpbGUgYXQgaHR0cHM6Ly9naXRodWIuY29tL05HLVpPUlJPL25nLXpvcnJvLWFudGQvYmxvYi9tYXN0ZXIvTElDRU5TRVxuICovXG5cbmltcG9ydCB7IENoYW5nZURldGVjdGlvblN0cmF0ZWd5LCBDb21wb25lbnQsIERpcmVjdGl2ZSwgSW5wdXQsIFRlbXBsYXRlUmVmIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogJ256LWxpc3QtZW1wdHknLFxuICBleHBvcnRBczogJ256TGlzdEhlYWRlcicsXG4gIGNoYW5nZURldGVjdGlvbjogQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3kuT25QdXNoLFxuICB0ZW1wbGF0ZTogYCA8bnotZW1iZWQtZW1wdHkgW256Q29tcG9uZW50TmFtZV09XCInbGlzdCdcIiBbc3BlY2lmaWNDb250ZW50XT1cIm56Tm9SZXN1bHRcIj48L256LWVtYmVkLWVtcHR5PiBgLFxuICBob3N0OiB7XG4gICAgY2xhc3M6ICdhbnQtbGlzdC1lbXB0eS10ZXh0J1xuICB9XG59KVxuZXhwb3J0IGNsYXNzIE56TGlzdEVtcHR5Q29tcG9uZW50IHtcbiAgQElucHV0KCkgbnpOb1Jlc3VsdD86IHN0cmluZyB8IFRlbXBsYXRlUmVmPHZvaWQ+O1xufVxuXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICduei1saXN0LWhlYWRlcicsXG4gIGV4cG9ydEFzOiAnbnpMaXN0SGVhZGVyJyxcbiAgY2hhbmdlRGV0ZWN0aW9uOiBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneS5PblB1c2gsXG4gIHRlbXBsYXRlOiBgIDxuZy1jb250ZW50PjwvbmctY29udGVudD4gYCxcbiAgaG9zdDoge1xuICAgIGNsYXNzOiAnYW50LWxpc3QtaGVhZGVyJ1xuICB9XG59KVxuZXhwb3J0IGNsYXNzIE56TGlzdEhlYWRlckNvbXBvbmVudCB7fVxuXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICduei1saXN0LWZvb3RlcicsXG4gIGV4cG9ydEFzOiAnbnpMaXN0Rm9vdGVyJyxcbiAgY2hhbmdlRGV0ZWN0aW9uOiBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneS5PblB1c2gsXG4gIHRlbXBsYXRlOiBgIDxuZy1jb250ZW50PjwvbmctY29udGVudD4gYCxcbiAgaG9zdDoge1xuICAgIGNsYXNzOiAnYW50LWxpc3QtZm9vdGVyJ1xuICB9XG59KVxuZXhwb3J0IGNsYXNzIE56TGlzdEZvb3RlckNvbXBvbmVudCB7fVxuXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICduei1saXN0LXBhZ2luYXRpb24nLFxuICBleHBvcnRBczogJ256TGlzdFBhZ2luYXRpb24nLFxuICBjaGFuZ2VEZXRlY3Rpb246IENoYW5nZURldGVjdGlvblN0cmF0ZWd5Lk9uUHVzaCxcbiAgdGVtcGxhdGU6IGAgPG5nLWNvbnRlbnQ+PC9uZy1jb250ZW50PiBgLFxuICBob3N0OiB7XG4gICAgY2xhc3M6ICdhbnQtbGlzdC1wYWdpbmF0aW9uJ1xuICB9XG59KVxuZXhwb3J0IGNsYXNzIE56TGlzdFBhZ2luYXRpb25Db21wb25lbnQge31cblxuQERpcmVjdGl2ZSh7XG4gIHNlbGVjdG9yOiAnbnotbGlzdC1sb2FkLW1vcmUnLFxuICBleHBvcnRBczogJ256TGlzdExvYWRNb3JlRGlyZWN0aXZlJ1xufSlcbmV4cG9ydCBjbGFzcyBOekxpc3RMb2FkTW9yZURpcmVjdGl2ZSB7fVxuXG5ARGlyZWN0aXZlKHtcbiAgc2VsZWN0b3I6ICduei1saXN0W256R3JpZF0nLFxuICBob3N0OiB7XG4gICAgY2xhc3M6ICdhbnQtbGlzdC1ncmlkJ1xuICB9XG59KVxuZXhwb3J0IGNsYXNzIE56TGlzdEdyaWREaXJlY3RpdmUge31cbiJdfQ==