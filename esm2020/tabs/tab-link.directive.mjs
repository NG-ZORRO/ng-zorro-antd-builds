/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */
import { Directive, Host, Optional, Self } from '@angular/core';
import * as i0 from "@angular/core";
import * as i1 from "@angular/router";
/**
 * Fix https://github.com/angular/angular/issues/8563
 */
export class NzTabLinkTemplateDirective {
    constructor(templateRef) {
        this.templateRef = templateRef;
    }
}
NzTabLinkTemplateDirective.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.1.2", ngImport: i0, type: NzTabLinkTemplateDirective, deps: [{ token: i0.TemplateRef, host: true }], target: i0.ɵɵFactoryTarget.Directive });
NzTabLinkTemplateDirective.ɵdir = i0.ɵɵngDeclareDirective({ minVersion: "12.0.0", version: "13.1.2", type: NzTabLinkTemplateDirective, selector: "ng-template[nzTabLink]", exportAs: ["nzTabLinkTemplate"], ngImport: i0 });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.1.2", ngImport: i0, type: NzTabLinkTemplateDirective, decorators: [{
            type: Directive,
            args: [{
                    selector: 'ng-template[nzTabLink]',
                    exportAs: 'nzTabLinkTemplate'
                }]
        }], ctorParameters: function () { return [{ type: i0.TemplateRef, decorators: [{
                    type: Host
                }] }]; } });
/**
 * This component is for catching `routerLink` directive.
 */
export class NzTabLinkDirective {
    constructor(elementRef, routerLink, routerLinkWithHref) {
        this.elementRef = elementRef;
        this.routerLink = routerLink;
        this.routerLinkWithHref = routerLinkWithHref;
    }
}
NzTabLinkDirective.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.1.2", ngImport: i0, type: NzTabLinkDirective, deps: [{ token: i0.ElementRef }, { token: i1.RouterLink, optional: true, self: true }, { token: i1.RouterLinkWithHref, optional: true, self: true }], target: i0.ɵɵFactoryTarget.Directive });
NzTabLinkDirective.ɵdir = i0.ɵɵngDeclareDirective({ minVersion: "12.0.0", version: "13.1.2", type: NzTabLinkDirective, selector: "a[nz-tab-link]", exportAs: ["nzTabLink"], ngImport: i0 });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.1.2", ngImport: i0, type: NzTabLinkDirective, decorators: [{
            type: Directive,
            args: [{
                    selector: 'a[nz-tab-link]',
                    exportAs: 'nzTabLink'
                }]
        }], ctorParameters: function () { return [{ type: i0.ElementRef }, { type: i1.RouterLink, decorators: [{
                    type: Optional
                }, {
                    type: Self
                }] }, { type: i1.RouterLinkWithHref, decorators: [{
                    type: Optional
                }, {
                    type: Self
                }] }]; } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGFiLWxpbmsuZGlyZWN0aXZlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vY29tcG9uZW50cy90YWJzL3RhYi1saW5rLmRpcmVjdGl2ZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7O0dBR0c7QUFFSCxPQUFPLEVBQUUsU0FBUyxFQUFjLElBQUksRUFBRSxRQUFRLEVBQUUsSUFBSSxFQUFlLE1BQU0sZUFBZSxDQUFDOzs7QUFLekY7O0dBRUc7QUFLSCxNQUFNLE9BQU8sMEJBQTBCO0lBQ3JDLFlBQTJCLFdBQTRDO1FBQTVDLGdCQUFXLEdBQVgsV0FBVyxDQUFpQztJQUFHLENBQUM7O3VIQURoRSwwQkFBMEI7MkdBQTFCLDBCQUEwQjsyRkFBMUIsMEJBQTBCO2tCQUp0QyxTQUFTO21CQUFDO29CQUNULFFBQVEsRUFBRSx3QkFBd0I7b0JBQ2xDLFFBQVEsRUFBRSxtQkFBbUI7aUJBQzlCOzswQkFFYyxJQUFJOztBQUduQjs7R0FFRztBQUtILE1BQU0sT0FBTyxrQkFBa0I7SUFDN0IsWUFDUyxVQUF5QyxFQUNyQixVQUF1QixFQUN2QixrQkFBdUM7UUFGM0QsZUFBVSxHQUFWLFVBQVUsQ0FBK0I7UUFDckIsZUFBVSxHQUFWLFVBQVUsQ0FBYTtRQUN2Qix1QkFBa0IsR0FBbEIsa0JBQWtCLENBQXFCO0lBQ2pFLENBQUM7OytHQUxPLGtCQUFrQjttR0FBbEIsa0JBQWtCOzJGQUFsQixrQkFBa0I7a0JBSjlCLFNBQVM7bUJBQUM7b0JBQ1QsUUFBUSxFQUFFLGdCQUFnQjtvQkFDMUIsUUFBUSxFQUFFLFdBQVc7aUJBQ3RCOzswQkFJSSxRQUFROzswQkFBSSxJQUFJOzswQkFDaEIsUUFBUTs7MEJBQUksSUFBSSIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxuICogVXNlIG9mIHRoaXMgc291cmNlIGNvZGUgaXMgZ292ZXJuZWQgYnkgYW4gTUlULXN0eWxlIGxpY2Vuc2UgdGhhdCBjYW4gYmVcbiAqIGZvdW5kIGluIHRoZSBMSUNFTlNFIGZpbGUgYXQgaHR0cHM6Ly9naXRodWIuY29tL05HLVpPUlJPL25nLXpvcnJvLWFudGQvYmxvYi9tYXN0ZXIvTElDRU5TRVxuICovXG5cbmltcG9ydCB7IERpcmVjdGl2ZSwgRWxlbWVudFJlZiwgSG9zdCwgT3B0aW9uYWwsIFNlbGYsIFRlbXBsYXRlUmVmIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBSb3V0ZXJMaW5rLCBSb3V0ZXJMaW5rV2l0aEhyZWYgfSBmcm9tICdAYW5ndWxhci9yb3V0ZXInO1xuXG5pbXBvcnQgeyBUYWJUZW1wbGF0ZUNvbnRleHQgfSBmcm9tICcuL2ludGVyZmFjZXMnO1xuXG4vKipcbiAqIEZpeCBodHRwczovL2dpdGh1Yi5jb20vYW5ndWxhci9hbmd1bGFyL2lzc3Vlcy84NTYzXG4gKi9cbkBEaXJlY3RpdmUoe1xuICBzZWxlY3RvcjogJ25nLXRlbXBsYXRlW256VGFiTGlua10nLFxuICBleHBvcnRBczogJ256VGFiTGlua1RlbXBsYXRlJ1xufSlcbmV4cG9ydCBjbGFzcyBOelRhYkxpbmtUZW1wbGF0ZURpcmVjdGl2ZSB7XG4gIGNvbnN0cnVjdG9yKEBIb3N0KCkgcHVibGljIHRlbXBsYXRlUmVmOiBUZW1wbGF0ZVJlZjxUYWJUZW1wbGF0ZUNvbnRleHQ+KSB7fVxufVxuXG4vKipcbiAqIFRoaXMgY29tcG9uZW50IGlzIGZvciBjYXRjaGluZyBgcm91dGVyTGlua2AgZGlyZWN0aXZlLlxuICovXG5ARGlyZWN0aXZlKHtcbiAgc2VsZWN0b3I6ICdhW256LXRhYi1saW5rXScsXG4gIGV4cG9ydEFzOiAnbnpUYWJMaW5rJ1xufSlcbmV4cG9ydCBjbGFzcyBOelRhYkxpbmtEaXJlY3RpdmUge1xuICBjb25zdHJ1Y3RvcihcbiAgICBwdWJsaWMgZWxlbWVudFJlZjogRWxlbWVudFJlZjxIVE1MQW5jaG9yRWxlbWVudD4sXG4gICAgQE9wdGlvbmFsKCkgQFNlbGYoKSBwdWJsaWMgcm91dGVyTGluaz86IFJvdXRlckxpbmssXG4gICAgQE9wdGlvbmFsKCkgQFNlbGYoKSBwdWJsaWMgcm91dGVyTGlua1dpdGhIcmVmPzogUm91dGVyTGlua1dpdGhIcmVmXG4gICkge31cbn1cbiJdfQ==