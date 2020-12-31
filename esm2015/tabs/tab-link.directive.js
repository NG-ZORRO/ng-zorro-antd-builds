/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */
import { Directive, Host, Optional, Self, TemplateRef } from '@angular/core';
import { RouterLink, RouterLinkWithHref } from '@angular/router';
/**
 * Fix https://github.com/angular/angular/issues/8563
 */
export class NzTabLinkTemplateDirective {
    constructor(templateRef) {
        this.templateRef = templateRef;
    }
}
NzTabLinkTemplateDirective.decorators = [
    { type: Directive, args: [{
                selector: 'ng-template[nzTabLink]',
                exportAs: 'nzTabLinkTemplate'
            },] }
];
NzTabLinkTemplateDirective.ctorParameters = () => [
    { type: TemplateRef, decorators: [{ type: Host }] }
];
/**
 * This component is for catching `routerLink` directive.
 */
export class NzTabLinkDirective {
    constructor(routerLink, routerLinkWithHref) {
        this.routerLink = routerLink;
        this.routerLinkWithHref = routerLinkWithHref;
    }
}
NzTabLinkDirective.decorators = [
    { type: Directive, args: [{
                selector: 'a[nz-tab-link]',
                exportAs: 'nzTabLink'
            },] }
];
NzTabLinkDirective.ctorParameters = () => [
    { type: RouterLink, decorators: [{ type: Optional }, { type: Self }] },
    { type: RouterLinkWithHref, decorators: [{ type: Optional }, { type: Self }] }
];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGFiLWxpbmsuZGlyZWN0aXZlLmpzIiwic291cmNlUm9vdCI6Ii4uLy4uLy4uL2NvbXBvbmVudHMvdGFicy8iLCJzb3VyY2VzIjpbInRhYi1saW5rLmRpcmVjdGl2ZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7O0dBR0c7QUFFSCxPQUFPLEVBQUUsU0FBUyxFQUFFLElBQUksRUFBRSxRQUFRLEVBQUUsSUFBSSxFQUFFLFdBQVcsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUM3RSxPQUFPLEVBQUUsVUFBVSxFQUFFLGtCQUFrQixFQUFFLE1BQU0saUJBQWlCLENBQUM7QUFJakU7O0dBRUc7QUFLSCxNQUFNLE9BQU8sMEJBQTBCO0lBQ3JDLFlBQTJCLFdBQTRDO1FBQTVDLGdCQUFXLEdBQVgsV0FBVyxDQUFpQztJQUFHLENBQUM7OztZQUw1RSxTQUFTLFNBQUM7Z0JBQ1QsUUFBUSxFQUFFLHdCQUF3QjtnQkFDbEMsUUFBUSxFQUFFLG1CQUFtQjthQUM5Qjs7O1lBWHlDLFdBQVcsdUJBYXRDLElBQUk7O0FBR25COztHQUVHO0FBS0gsTUFBTSxPQUFPLGtCQUFrQjtJQUM3QixZQUF1QyxVQUF1QixFQUE2QixrQkFBdUM7UUFBM0YsZUFBVSxHQUFWLFVBQVUsQ0FBYTtRQUE2Qix1QkFBa0IsR0FBbEIsa0JBQWtCLENBQXFCO0lBQUcsQ0FBQzs7O1lBTHZJLFNBQVMsU0FBQztnQkFDVCxRQUFRLEVBQUUsZ0JBQWdCO2dCQUMxQixRQUFRLEVBQUUsV0FBVzthQUN0Qjs7O1lBckJRLFVBQVUsdUJBdUJKLFFBQVEsWUFBSSxJQUFJO1lBdkJWLGtCQUFrQix1QkF1QjRCLFFBQVEsWUFBSSxJQUFJIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKiBVc2Ugb2YgdGhpcyBzb3VyY2UgY29kZSBpcyBnb3Zlcm5lZCBieSBhbiBNSVQtc3R5bGUgbGljZW5zZSB0aGF0IGNhbiBiZVxuICogZm91bmQgaW4gdGhlIExJQ0VOU0UgZmlsZSBhdCBodHRwczovL2dpdGh1Yi5jb20vTkctWk9SUk8vbmctem9ycm8tYW50ZC9ibG9iL21hc3Rlci9MSUNFTlNFXG4gKi9cblxuaW1wb3J0IHsgRGlyZWN0aXZlLCBIb3N0LCBPcHRpb25hbCwgU2VsZiwgVGVtcGxhdGVSZWYgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IFJvdXRlckxpbmssIFJvdXRlckxpbmtXaXRoSHJlZiB9IGZyb20gJ0Bhbmd1bGFyL3JvdXRlcic7XG5cbmltcG9ydCB7IFRhYlRlbXBsYXRlQ29udGV4dCB9IGZyb20gJy4vaW50ZXJmYWNlcyc7XG5cbi8qKlxuICogRml4IGh0dHBzOi8vZ2l0aHViLmNvbS9hbmd1bGFyL2FuZ3VsYXIvaXNzdWVzLzg1NjNcbiAqL1xuQERpcmVjdGl2ZSh7XG4gIHNlbGVjdG9yOiAnbmctdGVtcGxhdGVbbnpUYWJMaW5rXScsXG4gIGV4cG9ydEFzOiAnbnpUYWJMaW5rVGVtcGxhdGUnXG59KVxuZXhwb3J0IGNsYXNzIE56VGFiTGlua1RlbXBsYXRlRGlyZWN0aXZlIHtcbiAgY29uc3RydWN0b3IoQEhvc3QoKSBwdWJsaWMgdGVtcGxhdGVSZWY6IFRlbXBsYXRlUmVmPFRhYlRlbXBsYXRlQ29udGV4dD4pIHt9XG59XG5cbi8qKlxuICogVGhpcyBjb21wb25lbnQgaXMgZm9yIGNhdGNoaW5nIGByb3V0ZXJMaW5rYCBkaXJlY3RpdmUuXG4gKi9cbkBEaXJlY3RpdmUoe1xuICBzZWxlY3RvcjogJ2FbbnotdGFiLWxpbmtdJyxcbiAgZXhwb3J0QXM6ICduelRhYkxpbmsnXG59KVxuZXhwb3J0IGNsYXNzIE56VGFiTGlua0RpcmVjdGl2ZSB7XG4gIGNvbnN0cnVjdG9yKEBPcHRpb25hbCgpIEBTZWxmKCkgcHVibGljIHJvdXRlckxpbms/OiBSb3V0ZXJMaW5rLCBAT3B0aW9uYWwoKSBAU2VsZigpIHB1YmxpYyByb3V0ZXJMaW5rV2l0aEhyZWY/OiBSb3V0ZXJMaW5rV2l0aEhyZWYpIHt9XG59XG4iXX0=