/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */
import { ElementRef, TemplateRef } from '@angular/core';
import { RouterLink, RouterLinkWithHref } from '@angular/router';
import { TabTemplateContext } from './interfaces';
import * as i0 from "@angular/core";
/**
 * Fix https://github.com/angular/angular/issues/8563
 */
export declare class NzTabLinkTemplateDirective {
    templateRef: TemplateRef<TabTemplateContext>;
    constructor(templateRef: TemplateRef<TabTemplateContext>);
    static ɵfac: i0.ɵɵFactoryDeclaration<NzTabLinkTemplateDirective, [{ host: true; }]>;
    static ɵdir: i0.ɵɵDirectiveDeclaration<NzTabLinkTemplateDirective, "ng-template[nzTabLink]", ["nzTabLinkTemplate"], {}, {}, never>;
}
/**
 * This component is for catching `routerLink` directive.
 */
export declare class NzTabLinkDirective {
    elementRef: ElementRef<HTMLAnchorElement>;
    routerLink?: RouterLink | undefined;
    routerLinkWithHref?: RouterLinkWithHref | undefined;
    constructor(elementRef: ElementRef<HTMLAnchorElement>, routerLink?: RouterLink | undefined, routerLinkWithHref?: RouterLinkWithHref | undefined);
    static ɵfac: i0.ɵɵFactoryDeclaration<NzTabLinkDirective, [null, { optional: true; self: true; }, { optional: true; self: true; }]>;
    static ɵdir: i0.ɵɵDirectiveDeclaration<NzTabLinkDirective, "a[nz-tab-link]", ["nzTabLink"], {}, {}, never>;
}
