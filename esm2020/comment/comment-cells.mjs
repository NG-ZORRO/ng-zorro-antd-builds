/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */
import { CdkPortalOutlet, TemplatePortal } from '@angular/cdk/portal';
import { ChangeDetectionStrategy, Component, Directive, Input, TemplateRef, ViewChild, ViewEncapsulation } from '@angular/core';
import * as i0 from "@angular/core";
export class NzCommentAvatarDirective {
}
NzCommentAvatarDirective.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.1.2", ngImport: i0, type: NzCommentAvatarDirective, deps: [], target: i0.ɵɵFactoryTarget.Directive });
NzCommentAvatarDirective.ɵdir = i0.ɵɵngDeclareDirective({ minVersion: "12.0.0", version: "13.1.2", type: NzCommentAvatarDirective, selector: "nz-avatar[nz-comment-avatar]", exportAs: ["nzCommentAvatar"], ngImport: i0 });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.1.2", ngImport: i0, type: NzCommentAvatarDirective, decorators: [{
            type: Directive,
            args: [{
                    selector: 'nz-avatar[nz-comment-avatar]',
                    exportAs: 'nzCommentAvatar'
                }]
        }] });
export class NzCommentContentDirective {
}
NzCommentContentDirective.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.1.2", ngImport: i0, type: NzCommentContentDirective, deps: [], target: i0.ɵɵFactoryTarget.Directive });
NzCommentContentDirective.ɵdir = i0.ɵɵngDeclareDirective({ minVersion: "12.0.0", version: "13.1.2", type: NzCommentContentDirective, selector: "nz-comment-content, [nz-comment-content]", host: { classAttribute: "ant-comment-content-detail" }, exportAs: ["nzCommentContent"], ngImport: i0 });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.1.2", ngImport: i0, type: NzCommentContentDirective, decorators: [{
            type: Directive,
            args: [{
                    selector: 'nz-comment-content, [nz-comment-content]',
                    exportAs: 'nzCommentContent',
                    host: { class: 'ant-comment-content-detail' }
                }]
        }] });
export class NzCommentActionHostDirective extends CdkPortalOutlet {
    constructor(componentFactoryResolver, viewContainerRef) {
        super(componentFactoryResolver, viewContainerRef);
    }
    ngOnInit() {
        super.ngOnInit();
    }
    ngOnDestroy() {
        super.ngOnDestroy();
    }
    ngAfterViewInit() {
        this.attach(this.nzCommentActionHost);
    }
}
NzCommentActionHostDirective.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.1.2", ngImport: i0, type: NzCommentActionHostDirective, deps: [{ token: i0.ComponentFactoryResolver }, { token: i0.ViewContainerRef }], target: i0.ɵɵFactoryTarget.Directive });
NzCommentActionHostDirective.ɵdir = i0.ɵɵngDeclareDirective({ minVersion: "12.0.0", version: "13.1.2", type: NzCommentActionHostDirective, selector: "[nzCommentActionHost]", inputs: { nzCommentActionHost: "nzCommentActionHost" }, exportAs: ["nzCommentActionHost"], usesInheritance: true, ngImport: i0 });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.1.2", ngImport: i0, type: NzCommentActionHostDirective, decorators: [{
            type: Directive,
            args: [{
                    selector: '[nzCommentActionHost]',
                    exportAs: 'nzCommentActionHost'
                }]
        }], ctorParameters: function () { return [{ type: i0.ComponentFactoryResolver }, { type: i0.ViewContainerRef }]; }, propDecorators: { nzCommentActionHost: [{
                type: Input
            }] } });
export class NzCommentActionComponent {
    constructor(viewContainerRef) {
        this.viewContainerRef = viewContainerRef;
        this.contentPortal = null;
    }
    get content() {
        return this.contentPortal;
    }
    ngOnInit() {
        this.contentPortal = new TemplatePortal(this.implicitContent, this.viewContainerRef);
    }
}
NzCommentActionComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.1.2", ngImport: i0, type: NzCommentActionComponent, deps: [{ token: i0.ViewContainerRef }], target: i0.ɵɵFactoryTarget.Component });
NzCommentActionComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "13.1.2", type: NzCommentActionComponent, selector: "nz-comment-action", viewQueries: [{ propertyName: "implicitContent", first: true, predicate: TemplateRef, descendants: true, static: true }], exportAs: ["nzCommentAction"], ngImport: i0, template: '<ng-template><ng-content></ng-content></ng-template>', isInline: true, changeDetection: i0.ChangeDetectionStrategy.OnPush, encapsulation: i0.ViewEncapsulation.None });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.1.2", ngImport: i0, type: NzCommentActionComponent, decorators: [{
            type: Component,
            args: [{
                    selector: 'nz-comment-action',
                    exportAs: 'nzCommentAction',
                    encapsulation: ViewEncapsulation.None,
                    changeDetection: ChangeDetectionStrategy.OnPush,
                    template: '<ng-template><ng-content></ng-content></ng-template>'
                }]
        }], ctorParameters: function () { return [{ type: i0.ViewContainerRef }]; }, propDecorators: { implicitContent: [{
                type: ViewChild,
                args: [TemplateRef, { static: true }]
            }] } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29tbWVudC1jZWxscy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL2NvbXBvbmVudHMvY29tbWVudC9jb21tZW50LWNlbGxzLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7R0FHRztBQUVILE9BQU8sRUFBRSxlQUFlLEVBQUUsY0FBYyxFQUFFLE1BQU0scUJBQXFCLENBQUM7QUFDdEUsT0FBTyxFQUVMLHVCQUF1QixFQUN2QixTQUFTLEVBRVQsU0FBUyxFQUNULEtBQUssRUFHTCxXQUFXLEVBQ1gsU0FBUyxFQUVULGlCQUFpQixFQUNsQixNQUFNLGVBQWUsQ0FBQzs7QUFNdkIsTUFBTSxPQUFPLHdCQUF3Qjs7cUhBQXhCLHdCQUF3Qjt5R0FBeEIsd0JBQXdCOzJGQUF4Qix3QkFBd0I7a0JBSnBDLFNBQVM7bUJBQUM7b0JBQ1QsUUFBUSxFQUFFLDhCQUE4QjtvQkFDeEMsUUFBUSxFQUFFLGlCQUFpQjtpQkFDNUI7O0FBUUQsTUFBTSxPQUFPLHlCQUF5Qjs7c0hBQXpCLHlCQUF5QjswR0FBekIseUJBQXlCOzJGQUF6Qix5QkFBeUI7a0JBTHJDLFNBQVM7bUJBQUM7b0JBQ1QsUUFBUSxFQUFFLDBDQUEwQztvQkFDcEQsUUFBUSxFQUFFLGtCQUFrQjtvQkFDNUIsSUFBSSxFQUFFLEVBQUUsS0FBSyxFQUFFLDRCQUE0QixFQUFFO2lCQUM5Qzs7QUFPRCxNQUFNLE9BQU8sNEJBQTZCLFNBQVEsZUFBZTtJQUcvRCxZQUFZLHdCQUFrRCxFQUFFLGdCQUFrQztRQUNoRyxLQUFLLENBQUMsd0JBQXdCLEVBQUUsZ0JBQWdCLENBQUMsQ0FBQztJQUNwRCxDQUFDO0lBRVEsUUFBUTtRQUNmLEtBQUssQ0FBQyxRQUFRLEVBQUUsQ0FBQztJQUNuQixDQUFDO0lBRVEsV0FBVztRQUNsQixLQUFLLENBQUMsV0FBVyxFQUFFLENBQUM7SUFDdEIsQ0FBQztJQUVELGVBQWU7UUFDYixJQUFJLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxtQkFBbUIsQ0FBQyxDQUFDO0lBQ3hDLENBQUM7O3lIQWpCVSw0QkFBNEI7NkdBQTVCLDRCQUE0QjsyRkFBNUIsNEJBQTRCO2tCQUp4QyxTQUFTO21CQUFDO29CQUNULFFBQVEsRUFBRSx1QkFBdUI7b0JBQ2pDLFFBQVEsRUFBRSxxQkFBcUI7aUJBQ2hDOzhJQUVVLG1CQUFtQjtzQkFBM0IsS0FBSzs7QUEwQlIsTUFBTSxPQUFPLHdCQUF3QjtJQVFuQyxZQUFvQixnQkFBa0M7UUFBbEMscUJBQWdCLEdBQWhCLGdCQUFnQixDQUFrQjtRQU45QyxrQkFBYSxHQUEwQixJQUFJLENBQUM7SUFNSyxDQUFDO0lBSjFELElBQUksT0FBTztRQUNULE9BQU8sSUFBSSxDQUFDLGFBQWEsQ0FBQztJQUM1QixDQUFDO0lBSUQsUUFBUTtRQUNOLElBQUksQ0FBQyxhQUFhLEdBQUcsSUFBSSxjQUFjLENBQUMsSUFBSSxDQUFDLGVBQWUsRUFBRSxJQUFJLENBQUMsZ0JBQWdCLENBQUMsQ0FBQztJQUN2RixDQUFDOztxSEFaVSx3QkFBd0I7eUdBQXhCLHdCQUF3QiwwR0FDeEIsV0FBVyw2RkFIWixzREFBc0Q7MkZBRXJELHdCQUF3QjtrQkFQcEMsU0FBUzttQkFBQztvQkFDVCxRQUFRLEVBQUUsbUJBQW1CO29CQUM3QixRQUFRLEVBQUUsaUJBQWlCO29CQUMzQixhQUFhLEVBQUUsaUJBQWlCLENBQUMsSUFBSTtvQkFDckMsZUFBZSxFQUFFLHVCQUF1QixDQUFDLE1BQU07b0JBQy9DLFFBQVEsRUFBRSxzREFBc0Q7aUJBQ2pFO3VHQUUyQyxlQUFlO3NCQUF4RCxTQUFTO3VCQUFDLFdBQVcsRUFBRSxFQUFFLE1BQU0sRUFBRSxJQUFJLEVBQUUiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqIFVzZSBvZiB0aGlzIHNvdXJjZSBjb2RlIGlzIGdvdmVybmVkIGJ5IGFuIE1JVC1zdHlsZSBsaWNlbnNlIHRoYXQgY2FuIGJlXG4gKiBmb3VuZCBpbiB0aGUgTElDRU5TRSBmaWxlIGF0IGh0dHBzOi8vZ2l0aHViLmNvbS9ORy1aT1JSTy9uZy16b3Jyby1hbnRkL2Jsb2IvbWFzdGVyL0xJQ0VOU0VcbiAqL1xuXG5pbXBvcnQgeyBDZGtQb3J0YWxPdXRsZXQsIFRlbXBsYXRlUG9ydGFsIH0gZnJvbSAnQGFuZ3VsYXIvY2RrL3BvcnRhbCc7XG5pbXBvcnQge1xuICBBZnRlclZpZXdJbml0LFxuICBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneSxcbiAgQ29tcG9uZW50LFxuICBDb21wb25lbnRGYWN0b3J5UmVzb2x2ZXIsXG4gIERpcmVjdGl2ZSxcbiAgSW5wdXQsXG4gIE9uRGVzdHJveSxcbiAgT25Jbml0LFxuICBUZW1wbGF0ZVJlZixcbiAgVmlld0NoaWxkLFxuICBWaWV3Q29udGFpbmVyUmVmLFxuICBWaWV3RW5jYXBzdWxhdGlvblxufSBmcm9tICdAYW5ndWxhci9jb3JlJztcblxuQERpcmVjdGl2ZSh7XG4gIHNlbGVjdG9yOiAnbnotYXZhdGFyW256LWNvbW1lbnQtYXZhdGFyXScsXG4gIGV4cG9ydEFzOiAnbnpDb21tZW50QXZhdGFyJ1xufSlcbmV4cG9ydCBjbGFzcyBOekNvbW1lbnRBdmF0YXJEaXJlY3RpdmUge31cblxuQERpcmVjdGl2ZSh7XG4gIHNlbGVjdG9yOiAnbnotY29tbWVudC1jb250ZW50LCBbbnotY29tbWVudC1jb250ZW50XScsXG4gIGV4cG9ydEFzOiAnbnpDb21tZW50Q29udGVudCcsXG4gIGhvc3Q6IHsgY2xhc3M6ICdhbnQtY29tbWVudC1jb250ZW50LWRldGFpbCcgfVxufSlcbmV4cG9ydCBjbGFzcyBOekNvbW1lbnRDb250ZW50RGlyZWN0aXZlIHt9XG5cbkBEaXJlY3RpdmUoe1xuICBzZWxlY3RvcjogJ1tuekNvbW1lbnRBY3Rpb25Ib3N0XScsXG4gIGV4cG9ydEFzOiAnbnpDb21tZW50QWN0aW9uSG9zdCdcbn0pXG5leHBvcnQgY2xhc3MgTnpDb21tZW50QWN0aW9uSG9zdERpcmVjdGl2ZSBleHRlbmRzIENka1BvcnRhbE91dGxldCBpbXBsZW1lbnRzIE9uSW5pdCwgT25EZXN0cm95LCBBZnRlclZpZXdJbml0IHtcbiAgQElucHV0KCkgbnpDb21tZW50QWN0aW9uSG9zdD86IFRlbXBsYXRlUG9ydGFsIHwgbnVsbDtcblxuICBjb25zdHJ1Y3Rvcihjb21wb25lbnRGYWN0b3J5UmVzb2x2ZXI6IENvbXBvbmVudEZhY3RvcnlSZXNvbHZlciwgdmlld0NvbnRhaW5lclJlZjogVmlld0NvbnRhaW5lclJlZikge1xuICAgIHN1cGVyKGNvbXBvbmVudEZhY3RvcnlSZXNvbHZlciwgdmlld0NvbnRhaW5lclJlZik7XG4gIH1cblxuICBvdmVycmlkZSBuZ09uSW5pdCgpOiB2b2lkIHtcbiAgICBzdXBlci5uZ09uSW5pdCgpO1xuICB9XG5cbiAgb3ZlcnJpZGUgbmdPbkRlc3Ryb3koKTogdm9pZCB7XG4gICAgc3VwZXIubmdPbkRlc3Ryb3koKTtcbiAgfVxuXG4gIG5nQWZ0ZXJWaWV3SW5pdCgpOiB2b2lkIHtcbiAgICB0aGlzLmF0dGFjaCh0aGlzLm56Q29tbWVudEFjdGlvbkhvc3QpO1xuICB9XG59XG5cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogJ256LWNvbW1lbnQtYWN0aW9uJyxcbiAgZXhwb3J0QXM6ICduekNvbW1lbnRBY3Rpb24nLFxuICBlbmNhcHN1bGF0aW9uOiBWaWV3RW5jYXBzdWxhdGlvbi5Ob25lLFxuICBjaGFuZ2VEZXRlY3Rpb246IENoYW5nZURldGVjdGlvblN0cmF0ZWd5Lk9uUHVzaCxcbiAgdGVtcGxhdGU6ICc8bmctdGVtcGxhdGU+PG5nLWNvbnRlbnQ+PC9uZy1jb250ZW50PjwvbmctdGVtcGxhdGU+J1xufSlcbmV4cG9ydCBjbGFzcyBOekNvbW1lbnRBY3Rpb25Db21wb25lbnQgaW1wbGVtZW50cyBPbkluaXQge1xuICBAVmlld0NoaWxkKFRlbXBsYXRlUmVmLCB7IHN0YXRpYzogdHJ1ZSB9KSBpbXBsaWNpdENvbnRlbnQhOiBUZW1wbGF0ZVJlZjx2b2lkPjtcbiAgcHJpdmF0ZSBjb250ZW50UG9ydGFsOiBUZW1wbGF0ZVBvcnRhbCB8IG51bGwgPSBudWxsO1xuXG4gIGdldCBjb250ZW50KCk6IFRlbXBsYXRlUG9ydGFsIHwgbnVsbCB7XG4gICAgcmV0dXJuIHRoaXMuY29udGVudFBvcnRhbDtcbiAgfVxuXG4gIGNvbnN0cnVjdG9yKHByaXZhdGUgdmlld0NvbnRhaW5lclJlZjogVmlld0NvbnRhaW5lclJlZikge31cblxuICBuZ09uSW5pdCgpOiB2b2lkIHtcbiAgICB0aGlzLmNvbnRlbnRQb3J0YWwgPSBuZXcgVGVtcGxhdGVQb3J0YWwodGhpcy5pbXBsaWNpdENvbnRlbnQsIHRoaXMudmlld0NvbnRhaW5lclJlZik7XG4gIH1cbn1cbiJdfQ==