/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */
import { AfterViewInit, ElementRef, Renderer2 } from '@angular/core';
import { NzButtonGroupComponent } from 'ng-zorro-antd/button';
import * as i0 from "@angular/core";
export declare class NzDropdownButtonDirective implements AfterViewInit {
    private renderer;
    private nzButtonGroupComponent;
    private elementRef;
    constructor(renderer: Renderer2, nzButtonGroupComponent: NzButtonGroupComponent, elementRef: ElementRef);
    ngAfterViewInit(): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<NzDropdownButtonDirective, [null, { optional: true; host: true; }, null]>;
    static ɵdir: i0.ɵɵDirectiveDeclaration<NzDropdownButtonDirective, "[nz-button][nz-dropdown]", never, {}, {}, never>;
}
