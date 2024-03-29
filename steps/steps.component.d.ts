/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */
import { Direction, Directionality } from '@angular/cdk/bidi';
import { AfterContentInit, ChangeDetectorRef, ElementRef, EventEmitter, NgZone, OnChanges, OnInit, QueryList, Renderer2, SimpleChanges, TemplateRef } from '@angular/core';
import { NzDestroyService } from 'ng-zorro-antd/core/services';
import { BooleanInput, NgClassType, NzSizeDSType } from 'ng-zorro-antd/core/types';
import { NzStepComponent } from './step.component';
import * as i0 from "@angular/core";
export declare type NzDirectionType = 'horizontal' | 'vertical';
export declare type NzStatusType = 'wait' | 'process' | 'finish' | 'error';
export declare type nzProgressDotTemplate = TemplateRef<{
    $implicit: TemplateRef<void>;
    status: string;
    index: number;
}>;
export declare class NzStepsComponent implements OnChanges, OnInit, AfterContentInit {
    private ngZone;
    private elementRef;
    private renderer;
    private cdr;
    private directionality;
    private destroy$;
    static ngAcceptInputType_nzProgressDot: BooleanInput | nzProgressDotTemplate | undefined | null;
    steps: QueryList<NzStepComponent>;
    nzCurrent: number;
    nzDirection: NzDirectionType;
    nzLabelPlacement: 'horizontal' | 'vertical';
    nzType: 'default' | 'navigation';
    nzSize: NzSizeDSType;
    nzStartIndex: number;
    nzStatus: NzStatusType;
    set nzProgressDot(value: boolean | nzProgressDotTemplate);
    readonly nzIndexChange: EventEmitter<number>;
    private indexChangeSubscription;
    showProcessDot: boolean;
    customProcessDotTemplate?: TemplateRef<{
        $implicit: TemplateRef<void>;
        status: string;
        index: number;
    }>;
    classMap: NgClassType;
    dir: Direction;
    constructor(ngZone: NgZone, elementRef: ElementRef, renderer: Renderer2, cdr: ChangeDetectorRef, directionality: Directionality, destroy$: NzDestroyService);
    ngOnChanges(changes: SimpleChanges): void;
    ngOnInit(): void;
    ngAfterContentInit(): void;
    private updateHostProgressClass;
    private updateChildrenSteps;
    private setClassMap;
    static ɵfac: i0.ɵɵFactoryDeclaration<NzStepsComponent, [null, null, null, null, { optional: true; }, null]>;
    static ɵcmp: i0.ɵɵComponentDeclaration<NzStepsComponent, "nz-steps", ["nzSteps"], { "nzCurrent": "nzCurrent"; "nzDirection": "nzDirection"; "nzLabelPlacement": "nzLabelPlacement"; "nzType": "nzType"; "nzSize": "nzSize"; "nzStartIndex": "nzStartIndex"; "nzStatus": "nzStatus"; "nzProgressDot": "nzProgressDot"; }, { "nzIndexChange": "nzIndexChange"; }, ["steps"], ["*"]>;
}
