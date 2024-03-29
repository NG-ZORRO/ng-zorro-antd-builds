/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */
import { Direction } from '@angular/cdk/bidi';
import { ChangeDetectorRef, ElementRef, OnInit, Renderer2, TemplateRef } from '@angular/core';
import { NzCascaderOption } from './typings';
import * as i0 from "@angular/core";
export declare class NzCascaderOptionComponent implements OnInit {
    private cdr;
    optionTemplate: TemplateRef<NzCascaderOption> | null;
    option: NzCascaderOption;
    activated: boolean;
    highlightText: string;
    nzLabelProperty: string;
    columnIndex: number;
    expandIcon: string | TemplateRef<void>;
    dir: Direction;
    readonly nativeElement: HTMLElement;
    constructor(cdr: ChangeDetectorRef, elementRef: ElementRef, renderer: Renderer2);
    ngOnInit(): void;
    get optionLabel(): string;
    markForCheck(): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<NzCascaderOptionComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<NzCascaderOptionComponent, "[nz-cascader-option]", ["nzCascaderOption"], { "optionTemplate": "optionTemplate"; "option": "option"; "activated": "activated"; "highlightText": "highlightText"; "nzLabelProperty": "nzLabelProperty"; "columnIndex": "columnIndex"; "expandIcon": "expandIcon"; "dir": "dir"; }, {}, never, never>;
}
