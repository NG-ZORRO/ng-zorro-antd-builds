/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */
import { Direction, Directionality } from '@angular/cdk/bidi';
import { ChangeDetectorRef, OnChanges, OnDestroy, OnInit, SimpleChanges } from '@angular/core';
import { NzConfigKey, NzConfigService } from 'ng-zorro-antd/core/config';
import { NgStyleInterface, NumberInput } from 'ng-zorro-antd/core/types';
import { NzProgressCirclePath, NzProgressFormatter, NzProgressGapPositionType, NzProgressStatusType, NzProgressStepItem, NzProgressStrokeColorType, NzProgressStrokeLinecapType, NzProgressTypeType } from './typings';
import * as i0 from "@angular/core";
export declare class NzProgressComponent implements OnChanges, OnInit, OnDestroy {
    private cdr;
    nzConfigService: NzConfigService;
    private directionality;
    readonly _nzModuleName: NzConfigKey;
    static ngAcceptInputType_nzSuccessPercent: NumberInput;
    static ngAcceptInputType_nzPercent: NumberInput;
    static ngAcceptInputType_nzStrokeWidth: NumberInput;
    static ngAcceptInputType_nzGapDegree: NumberInput;
    static ngAcceptInputType_nzSteps: NumberInput;
    nzShowInfo: boolean;
    nzWidth: number;
    nzStrokeColor?: NzProgressStrokeColorType;
    nzSize: 'default' | 'small';
    nzFormat?: NzProgressFormatter;
    nzSuccessPercent?: number;
    nzPercent: number;
    nzStrokeWidth?: number;
    nzGapDegree?: number;
    nzStatus?: NzProgressStatusType;
    nzType: NzProgressTypeType;
    nzGapPosition: NzProgressGapPositionType;
    nzStrokeLinecap: NzProgressStrokeLinecapType;
    nzSteps: number;
    steps: NzProgressStepItem[];
    /** Gradient style when `nzType` is `line`. */
    lineGradient: string | null;
    /** If user uses gradient color. */
    isGradient: boolean;
    /** If the linear progress is a step progress. */
    isSteps: boolean;
    /**
     * Each progress whose `nzType` is circle or dashboard should have unique id to
     * define `<linearGradient>`.
     */
    gradientId: number;
    /** Paths to rendered in the template. */
    progressCirclePath: NzProgressCirclePath[];
    circleGradient?: Array<{
        offset: string;
        color: string;
    }>;
    trailPathStyle: NgStyleInterface | null;
    pathString?: string;
    icon: string;
    dir: Direction;
    trackByFn: (index: number) => string;
    get formatter(): NzProgressFormatter;
    get status(): NzProgressStatusType;
    get strokeWidth(): number;
    get isCircleStyle(): boolean;
    private cachedStatus;
    private inferredStatus;
    private destroy$;
    constructor(cdr: ChangeDetectorRef, nzConfigService: NzConfigService, directionality: Directionality);
    ngOnChanges(changes: SimpleChanges): void;
    ngOnInit(): void;
    ngOnDestroy(): void;
    private updateIcon;
    /**
     * Calculate step render configs.
     */
    private getSteps;
    /**
     * Calculate paths when the type is circle or dashboard.
     */
    private getCirclePaths;
    private setStrokeColor;
    static ɵfac: i0.ɵɵFactoryDeclaration<NzProgressComponent, [null, null, { optional: true; }]>;
    static ɵcmp: i0.ɵɵComponentDeclaration<NzProgressComponent, "nz-progress", ["nzProgress"], { "nzShowInfo": "nzShowInfo"; "nzWidth": "nzWidth"; "nzStrokeColor": "nzStrokeColor"; "nzSize": "nzSize"; "nzFormat": "nzFormat"; "nzSuccessPercent": "nzSuccessPercent"; "nzPercent": "nzPercent"; "nzStrokeWidth": "nzStrokeWidth"; "nzGapDegree": "nzGapDegree"; "nzStatus": "nzStatus"; "nzType": "nzType"; "nzGapPosition": "nzGapPosition"; "nzStrokeLinecap": "nzStrokeLinecap"; "nzSteps": "nzSteps"; }, {}, never, never>;
}
