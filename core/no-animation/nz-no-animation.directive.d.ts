import { AfterViewInit, ElementRef, OnChanges, Renderer2 } from '@angular/core';
import { BooleanInput } from 'ng-zorro-antd/core/types';
import * as i0 from "@angular/core";
export declare class NzNoAnimationDirective implements OnChanges, AfterViewInit {
    private element;
    private renderer;
    private animationType;
    static ngAcceptInputType_nzNoAnimation: BooleanInput;
    nzNoAnimation: boolean;
    constructor(element: ElementRef, renderer: Renderer2, animationType: string);
    ngOnChanges(): void;
    ngAfterViewInit(): void;
    private updateClass;
    static ɵfac: i0.ɵɵFactoryDeclaration<NzNoAnimationDirective, [null, null, { optional: true; }]>;
    static ɵdir: i0.ɵɵDirectiveDeclaration<NzNoAnimationDirective, "[nzNoAnimation]", ["nzNoAnimation"], { "nzNoAnimation": "nzNoAnimation"; }, {}, never>;
}
