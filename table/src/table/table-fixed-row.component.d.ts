/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */
import { AfterViewInit, ElementRef, OnDestroy, OnInit, Renderer2 } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { NzTableStyleService } from '../table-style.service';
import * as i0 from "@angular/core";
export declare class NzTableFixedRowComponent implements OnInit, OnDestroy, AfterViewInit {
    private nzTableStyleService;
    private renderer;
    tdElement: ElementRef;
    hostWidth$: BehaviorSubject<number | null>;
    enableAutoMeasure$: BehaviorSubject<boolean>;
    private destroy$;
    constructor(nzTableStyleService: NzTableStyleService, renderer: Renderer2);
    ngOnInit(): void;
    ngAfterViewInit(): void;
    ngOnDestroy(): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<NzTableFixedRowComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<NzTableFixedRowComponent, "tr[nz-table-fixed-row], tr[nzExpand]", never, {}, {}, never, ["*"]>;
}
