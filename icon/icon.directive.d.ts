/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */
import { AfterContentChecked, ChangeDetectorRef, ElementRef, NgZone, OnChanges, OnDestroy, OnInit, Renderer2, SimpleChanges } from '@angular/core';
import { IconDirective, ThemeType } from '@ant-design/icons-angular';
import { BooleanInput } from 'ng-zorro-antd/core/types';
import { NzIconPatchService, NzIconService } from './icon.service';
import * as i0 from "@angular/core";
export declare class NzIconDirective extends IconDirective implements OnInit, OnChanges, AfterContentChecked, OnDestroy {
    private readonly ngZone;
    private readonly changeDetectorRef;
    iconService: NzIconService;
    renderer: Renderer2;
    static ngAcceptInputType_nzSpin: BooleanInput;
    cacheClassName: string | null;
    set nzSpin(value: boolean);
    nzRotate: number;
    set nzType(value: string);
    set nzTheme(value: ThemeType);
    set nzTwotoneColor(value: string);
    set nzIconfont(value: string);
    hostClass?: string;
    private readonly el;
    private iconfont?;
    private spin;
    private destroy$;
    constructor(ngZone: NgZone, changeDetectorRef: ChangeDetectorRef, elementRef: ElementRef, iconService: NzIconService, renderer: Renderer2, iconPatch: NzIconPatchService);
    ngOnChanges(changes: SimpleChanges): void;
    ngOnInit(): void;
    /**
     * If custom content is provided, try to normalize SVG elements.
     */
    ngAfterContentChecked(): void;
    ngOnDestroy(): void;
    /**
     * Replacement of `changeIcon` for more modifications.
     */
    private changeIcon2;
    private handleSpin;
    private handleRotate;
    private setClassName;
    private setSVGData;
    static ɵfac: i0.ɵɵFactoryDeclaration<NzIconDirective, [null, null, null, null, null, { optional: true; }]>;
    static ɵdir: i0.ɵɵDirectiveDeclaration<NzIconDirective, "[nz-icon]", ["nzIcon"], { "nzSpin": "nzSpin"; "nzRotate": "nzRotate"; "nzType": "nzType"; "nzTheme": "nzTheme"; "nzTwotoneColor": "nzTwotoneColor"; "nzIconfont": "nzIconfont"; }, {}, never>;
}
