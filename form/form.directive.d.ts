/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */
import { Direction, Directionality } from '@angular/cdk/bidi';
import { ElementRef, OnChanges, OnDestroy, Renderer2, SimpleChange, SimpleChanges } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { ThemeType } from '@ant-design/icons-angular';
import { NzConfigKey, NzConfigService } from 'ng-zorro-antd/core/config';
import { BooleanInput, InputObservable } from 'ng-zorro-antd/core/types';
import * as i0 from "@angular/core";
export declare type NzFormLayoutType = 'horizontal' | 'vertical' | 'inline';
export declare const DefaultTooltipIcon: {
    readonly type: "question-circle";
    readonly theme: "outline";
};
export declare class NzFormDirective implements OnChanges, OnDestroy, InputObservable {
    nzConfigService: NzConfigService;
    private renderer;
    private directionality;
    readonly _nzModuleName: NzConfigKey;
    static ngAcceptInputType_nzNoColon: BooleanInput;
    static ngAcceptInputType_nzDisableAutoTips: BooleanInput;
    nzLayout: NzFormLayoutType;
    nzNoColon: boolean;
    nzAutoTips: Record<string, Record<string, string>>;
    nzDisableAutoTips: boolean;
    nzTooltipIcon: string | {
        type: string;
        theme: ThemeType;
    };
    dir: Direction;
    destroy$: Subject<unknown>;
    private inputChanges$;
    getInputObservable<K extends keyof this>(changeType: K): Observable<SimpleChange>;
    constructor(nzConfigService: NzConfigService, elementRef: ElementRef, renderer: Renderer2, directionality: Directionality);
    ngOnChanges(changes: SimpleChanges): void;
    ngOnDestroy(): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<NzFormDirective, [null, null, null, { optional: true; }]>;
    static ɵdir: i0.ɵɵDirectiveDeclaration<NzFormDirective, "[nz-form]", ["nzForm"], { "nzLayout": "nzLayout"; "nzNoColon": "nzNoColon"; "nzAutoTips": "nzAutoTips"; "nzDisableAutoTips": "nzDisableAutoTips"; "nzTooltipIcon": "nzTooltipIcon"; }, {}, never>;
}
