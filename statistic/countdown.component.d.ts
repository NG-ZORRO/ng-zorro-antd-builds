/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */
import { Directionality } from '@angular/cdk/bidi';
import { Platform } from '@angular/cdk/platform';
import { ChangeDetectorRef, EventEmitter, NgZone, OnChanges, OnDestroy, OnInit, SimpleChanges } from '@angular/core';
import { NzStatisticComponent } from './statistic.component';
import * as i0 from "@angular/core";
export declare class NzCountdownComponent extends NzStatisticComponent implements OnInit, OnChanges, OnDestroy {
    private ngZone;
    private platform;
    nzFormat: string;
    readonly nzCountdownFinish: EventEmitter<void>;
    diff: number;
    private target;
    private updater_?;
    constructor(cdr: ChangeDetectorRef, ngZone: NgZone, platform: Platform, directionality: Directionality);
    ngOnChanges(changes: SimpleChanges): void;
    ngOnInit(): void;
    ngOnDestroy(): void;
    syncTimer(): void;
    startTimer(): void;
    stopTimer(): void;
    /**
     * Update time that should be displayed on the screen.
     */
    protected updateValue(): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<NzCountdownComponent, [null, null, null, { optional: true; }]>;
    static ɵcmp: i0.ɵɵComponentDeclaration<NzCountdownComponent, "nz-countdown", ["nzCountdown"], { "nzFormat": "nzFormat"; }, { "nzCountdownFinish": "nzCountdownFinish"; }, never, never>;
}
