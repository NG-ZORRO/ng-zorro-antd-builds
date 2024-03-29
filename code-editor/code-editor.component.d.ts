/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */
import { Platform } from '@angular/cdk/platform';
import { AfterViewInit, ElementRef, EventEmitter, NgZone, OnDestroy, TemplateRef } from '@angular/core';
import { editor } from 'monaco-editor';
import { BooleanInput, NzSafeAny, OnChangeType, OnTouchedType } from 'ng-zorro-antd/core/types';
import { NzCodeEditorService } from './code-editor.service';
import { JoinedEditorOptions, NzEditorMode } from './typings';
import * as i0 from "@angular/core";
export declare class NzCodeEditorComponent implements OnDestroy, AfterViewInit {
    private nzCodeEditorService;
    private ngZone;
    private platform;
    static ngAcceptInputType_nzLoading: BooleanInput;
    static ngAcceptInputType_nzFullControl: BooleanInput;
    nzEditorMode: NzEditorMode;
    nzOriginalText: string;
    nzLoading: boolean;
    nzFullControl: boolean;
    nzToolkit?: TemplateRef<void>;
    set nzEditorOption(value: JoinedEditorOptions);
    readonly nzEditorInitialized: EventEmitter<editor.IStandaloneCodeEditor | editor.IStandaloneDiffEditor>;
    editorOptionCached: JoinedEditorOptions;
    private readonly el;
    private destroy$;
    private resize$;
    private editorOption$;
    private editorInstance;
    private value;
    private modelSet;
    private onDidChangeContentDisposable;
    constructor(nzCodeEditorService: NzCodeEditorService, ngZone: NgZone, elementRef: ElementRef, platform: Platform);
    /**
     * Initialize a monaco editor instance.
     */
    ngAfterViewInit(): void;
    ngOnDestroy(): void;
    writeValue(value: string): void;
    registerOnChange(fn: OnChangeType): NzSafeAny;
    registerOnTouched(fn: OnTouchedType): void;
    onChange: OnChangeType;
    onTouch: OnTouchedType;
    layout(): void;
    private setup;
    private registerOptionChanges;
    private initMonacoEditorInstance;
    private registerResizeChange;
    private setValue;
    /**
     * {@link editor.ICodeEditor}#setValue resets the cursor position to the start of the document.
     * This helper memorizes the cursor position and selections and restores them after the given
     * function has been called.
     */
    private preservePositionAndSelections;
    private setValueEmitter;
    private emitValue;
    private updateOptionToMonaco;
    static ɵfac: i0.ɵɵFactoryDeclaration<NzCodeEditorComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<NzCodeEditorComponent, "nz-code-editor", ["nzCodeEditor"], { "nzEditorMode": "nzEditorMode"; "nzOriginalText": "nzOriginalText"; "nzLoading": "nzLoading"; "nzFullControl": "nzFullControl"; "nzToolkit": "nzToolkit"; "nzEditorOption": "nzEditorOption"; }, { "nzEditorInitialized": "nzEditorInitialized"; }, never, never>;
}
