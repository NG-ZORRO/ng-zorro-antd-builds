/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */
import { Direction, Directionality } from '@angular/cdk/bidi';
import { ChangeDetectorRef, ElementRef, OnChanges, OnDestroy, OnInit, SimpleChanges } from '@angular/core';
import { NzConfigKey, NzConfigService } from 'ng-zorro-antd/core/config';
import { BooleanInput } from 'ng-zorro-antd/core/types';
import { NzImageGroupComponent } from './image-group.component';
import { NzImageService } from './image.service';
export declare type ImageStatusType = 'error' | 'loading' | 'normal';
export declare class NzImageDirective implements OnInit, OnChanges, OnDestroy {
    nzConfigService: NzConfigService;
    private elementRef;
    private nzImageService;
    protected cdr: ChangeDetectorRef;
    private parentGroup;
    private directionality;
    readonly _nzModuleName: NzConfigKey;
    static ngAcceptInputType_nzDisablePreview: BooleanInput;
    nzSrc: string;
    nzDisablePreview: boolean;
    nzFallback: string | null;
    nzPlaceholder: string | null;
    dir?: Direction;
    backLoadImage: HTMLImageElement;
    private status;
    private destroy$;
    get previewable(): boolean;
    constructor(nzConfigService: NzConfigService, elementRef: ElementRef, nzImageService: NzImageService, cdr: ChangeDetectorRef, parentGroup: NzImageGroupComponent, directionality: Directionality);
    ngOnInit(): void;
    ngOnDestroy(): void;
    onPreview(): void;
    getElement(): ElementRef<HTMLImageElement>;
    ngOnChanges(changes: SimpleChanges): void;
    /**
     * use internal Image object handle fallback & placeholder
     * @private
     */
    private backLoad;
}
