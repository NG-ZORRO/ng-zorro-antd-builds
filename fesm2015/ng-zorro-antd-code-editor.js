import { __decorate, __metadata } from 'tslib';
import { Platform } from '@angular/cdk/platform';
import { ɵɵdefineInjectable, ɵɵinject, Injectable, Inject, EventEmitter, Component, ChangeDetectionStrategy, ViewEncapsulation, forwardRef, NgZone, ElementRef, Input, Output, NgModule } from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
import { warn, PREFIX } from 'ng-zorro-antd/core/logger';
import { inNextTick, InputBoolean } from 'ng-zorro-antd/core/util';
import { Subject, BehaviorSubject, of, combineLatest, fromEvent } from 'rxjs';
import { tap, map, takeUntil, debounceTime, filter, distinctUntilChanged } from 'rxjs/operators';
import { DOCUMENT, CommonModule } from '@angular/common';
import { NzConfigService } from 'ng-zorro-antd/core/config';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzSpinModule } from 'ng-zorro-antd/spin';

/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */
var NzCodeEditorLoadingStatus;
(function (NzCodeEditorLoadingStatus) {
    NzCodeEditorLoadingStatus["UNLOAD"] = "unload";
    NzCodeEditorLoadingStatus["LOADING"] = "loading";
    NzCodeEditorLoadingStatus["LOADED"] = "LOADED";
})(NzCodeEditorLoadingStatus || (NzCodeEditorLoadingStatus = {}));

/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */
const NZ_CONFIG_MODULE_NAME = 'codeEditor';
function tryTriggerFunc(fn) {
    return (...args) => {
        if (fn) {
            fn(...args);
        }
    };
}
class NzCodeEditorService {
    constructor(nzConfigService, _document) {
        this.nzConfigService = nzConfigService;
        this.firstEditorInitialized = false;
        this.loaded$ = new Subject();
        this.loadingStatus = NzCodeEditorLoadingStatus.UNLOAD;
        this.option = {};
        this.option$ = new BehaviorSubject(this.option);
        const globalConfig = this.nzConfigService.getConfigForComponent(NZ_CONFIG_MODULE_NAME);
        this.document = _document;
        this.config = Object.assign({}, globalConfig);
        this.option = this.config.defaultEditorOption || {};
        this.nzConfigService.getConfigChangeEventForComponent(NZ_CONFIG_MODULE_NAME).subscribe(() => {
            const newGlobalConfig = this.nzConfigService.getConfigForComponent(NZ_CONFIG_MODULE_NAME);
            if (newGlobalConfig) {
                this._updateDefaultOption(newGlobalConfig.defaultEditorOption);
            }
        });
    }
    _updateDefaultOption(option) {
        this.option = Object.assign(Object.assign({}, this.option), option);
        this.option$.next(this.option);
        if (option.theme) {
            monaco.editor.setTheme(option.theme);
        }
    }
    requestToInit() {
        if (this.loadingStatus === NzCodeEditorLoadingStatus.LOADED) {
            this.onInit();
            return of(this.getLatestOption());
        }
        if (this.loadingStatus === NzCodeEditorLoadingStatus.UNLOAD) {
            if (this.config.useStaticLoading && typeof monaco === 'undefined') {
                warn('You choose to use static loading but it seems that you forget ' +
                    'to config webpack plugin correctly. Please refer to our official website' +
                    'for more details about static loading.');
            }
            else {
                this.loadMonacoScript();
            }
        }
        return this.loaded$.asObservable().pipe(tap(() => this.onInit()), map(() => this.getLatestOption()));
    }
    loadMonacoScript() {
        if (this.config.useStaticLoading) {
            Promise.resolve().then(() => this.onLoad());
            return;
        }
        if (this.loadingStatus === NzCodeEditorLoadingStatus.LOADING) {
            return;
        }
        this.loadingStatus = NzCodeEditorLoadingStatus.LOADING;
        const assetsRoot = this.config.assetsRoot;
        const vs = assetsRoot ? `${assetsRoot}/vs` : 'assets/vs';
        const windowAsAny = window;
        const loadScript = this.document.createElement('script');
        loadScript.type = 'text/javascript';
        loadScript.src = `${vs}/loader.js`;
        loadScript.onload = () => {
            windowAsAny.require.config({
                paths: { vs }
            });
            windowAsAny.require(['vs/editor/editor.main'], () => {
                this.onLoad();
            });
        };
        loadScript.onerror = () => {
            throw new Error(`${PREFIX} cannot load assets of monaco editor from source "${vs}".`);
        };
        this.document.documentElement.appendChild(loadScript);
    }
    onLoad() {
        this.loadingStatus = NzCodeEditorLoadingStatus.LOADED;
        this.loaded$.next(true);
        this.loaded$.complete();
        tryTriggerFunc(this.config.onLoad)();
    }
    onInit() {
        if (!this.firstEditorInitialized) {
            this.firstEditorInitialized = true;
            tryTriggerFunc(this.config.onFirstEditorInit)();
        }
        tryTriggerFunc(this.config.onInit)();
    }
    getLatestOption() {
        return Object.assign({}, this.option);
    }
}
NzCodeEditorService.ɵprov = ɵɵdefineInjectable({ factory: function NzCodeEditorService_Factory() { return new NzCodeEditorService(ɵɵinject(NzConfigService), ɵɵinject(DOCUMENT)); }, token: NzCodeEditorService, providedIn: "root" });
NzCodeEditorService.decorators = [
    { type: Injectable, args: [{
                providedIn: 'root'
            },] }
];
NzCodeEditorService.ctorParameters = () => [
    { type: NzConfigService },
    { type: undefined, decorators: [{ type: Inject, args: [DOCUMENT,] }] }
];

/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */
class NzCodeEditorComponent {
    constructor(nzCodeEditorService, ngZone, elementRef, platform) {
        this.nzCodeEditorService = nzCodeEditorService;
        this.ngZone = ngZone;
        this.platform = platform;
        this.nzEditorMode = 'normal';
        this.nzOriginalText = '';
        this.nzLoading = false;
        this.nzFullControl = false;
        this.nzEditorInitialized = new EventEmitter();
        this.editorOptionCached = {};
        this.destroy$ = new Subject();
        this.resize$ = new Subject();
        this.editorOption$ = new BehaviorSubject({});
        this.value = '';
        this.modelSet = false;
        this.onChange = (_value) => { };
        this.onTouch = () => { };
        this.el = elementRef.nativeElement;
        this.el.classList.add('ant-code-editor');
    }
    set nzEditorOption(value) {
        this.editorOption$.next(value);
    }
    /**
     * Initialize a monaco editor instance.
     */
    ngAfterViewInit() {
        if (!this.platform.isBrowser) {
            return;
        }
        this.nzCodeEditorService.requestToInit().subscribe(option => this.setup(option));
    }
    ngOnDestroy() {
        if (this.editorInstance) {
            this.editorInstance.dispose();
        }
        this.destroy$.next();
        this.destroy$.complete();
    }
    writeValue(value) {
        this.value = value;
        this.setValue();
    }
    registerOnChange(fn) {
        this.onChange = fn;
    }
    registerOnTouched(fn) {
        this.onTouch = fn;
    }
    layout() {
        this.resize$.next();
    }
    setup(option) {
        inNextTick().subscribe(() => {
            this.editorOptionCached = option;
            this.registerOptionChanges();
            this.initMonacoEditorInstance();
            this.registerResizeChange();
            this.setValue();
            if (!this.nzFullControl) {
                this.setValueEmitter();
            }
            this.nzEditorInitialized.emit(this.editorInstance);
        });
    }
    registerOptionChanges() {
        combineLatest([this.editorOption$, this.nzCodeEditorService.option$])
            .pipe(takeUntil(this.destroy$))
            .subscribe(([selfOpt, defaultOpt]) => {
            this.editorOptionCached = Object.assign(Object.assign(Object.assign({}, this.editorOptionCached), defaultOpt), selfOpt);
            this.updateOptionToMonaco();
        });
    }
    initMonacoEditorInstance() {
        this.ngZone.runOutsideAngular(() => {
            this.editorInstance =
                this.nzEditorMode === 'normal'
                    ? monaco.editor.create(this.el, Object.assign({}, this.editorOptionCached))
                    : monaco.editor.createDiffEditor(this.el, Object.assign({}, this.editorOptionCached));
        });
    }
    registerResizeChange() {
        this.ngZone.runOutsideAngular(() => {
            fromEvent(window, 'resize')
                .pipe(debounceTime(300), takeUntil(this.destroy$))
                .subscribe(() => {
                this.layout();
            });
            this.resize$
                .pipe(takeUntil(this.destroy$), filter(() => !!this.editorInstance), map(() => ({
                width: this.el.clientWidth,
                height: this.el.clientHeight
            })), distinctUntilChanged((a, b) => a.width === b.width && a.height === b.height), debounceTime(50))
                .subscribe(() => {
                this.editorInstance.layout();
            });
        });
    }
    setValue() {
        if (!this.editorInstance) {
            return;
        }
        if (this.nzFullControl && this.value) {
            warn(`should not set value when you are using full control mode! It would result in ambiguous data flow!`);
            return;
        }
        if (this.nzEditorMode === 'normal') {
            if (this.modelSet) {
                const model = this.editorInstance.getModel();
                this.preservePositionAndSelections(() => model.setValue(this.value));
            }
            else {
                this.editorInstance.setModel(monaco.editor.createModel(this.value, this.editorOptionCached.language));
                this.modelSet = true;
            }
        }
        else {
            if (this.modelSet) {
                const model = this.editorInstance.getModel();
                this.preservePositionAndSelections(() => {
                    model.modified.setValue(this.value);
                    model.original.setValue(this.nzOriginalText);
                });
            }
            else {
                const language = this.editorOptionCached.language;
                this.editorInstance.setModel({
                    original: monaco.editor.createModel(this.nzOriginalText, language),
                    modified: monaco.editor.createModel(this.value, language)
                });
                this.modelSet = true;
            }
        }
    }
    /**
     * {@link editor.ICodeEditor}#setValue resets the cursor position to the start of the document.
     * This helper memorizes the cursor position and selections and restores them after the given
     * function has been called.
     */
    preservePositionAndSelections(fn) {
        if (!this.editorInstance) {
            fn();
            return;
        }
        const position = this.editorInstance.getPosition();
        const selections = this.editorInstance.getSelections();
        fn();
        if (position) {
            this.editorInstance.setPosition(position);
        }
        if (selections) {
            this.editorInstance.setSelections(selections);
        }
    }
    setValueEmitter() {
        const model = (this.nzEditorMode === 'normal'
            ? this.editorInstance.getModel()
            : this.editorInstance.getModel().modified);
        model.onDidChangeContent(() => {
            this.ngZone.run(() => {
                this.emitValue(model.getValue());
            });
        });
    }
    emitValue(value) {
        if (this.value === value) {
            // If the value didn't change there's no reason to send an update.
            // Specifically this may happen during an update from the model (writeValue) where sending an update to the model would actually be incorrect.
            return;
        }
        this.value = value;
        this.onChange(value);
    }
    updateOptionToMonaco() {
        if (this.editorInstance) {
            this.editorInstance.updateOptions(Object.assign({}, this.editorOptionCached));
        }
    }
}
NzCodeEditorComponent.decorators = [
    { type: Component, args: [{
                changeDetection: ChangeDetectionStrategy.OnPush,
                encapsulation: ViewEncapsulation.None,
                selector: 'nz-code-editor',
                exportAs: 'nzCodeEditor',
                template: `
    <div class="ant-code-editor-loading" *ngIf="nzLoading">
      <nz-spin></nz-spin>
    </div>

    <div class="ant-code-editor-toolkit" *ngIf="nzToolkit">
      <ng-template [ngTemplateOutlet]="nzToolkit"></ng-template>
    </div>
  `,
                providers: [
                    {
                        provide: NG_VALUE_ACCESSOR,
                        useExisting: forwardRef(() => NzCodeEditorComponent),
                        multi: true
                    }
                ]
            },] }
];
NzCodeEditorComponent.ctorParameters = () => [
    { type: NzCodeEditorService },
    { type: NgZone },
    { type: ElementRef },
    { type: Platform }
];
NzCodeEditorComponent.propDecorators = {
    nzEditorMode: [{ type: Input }],
    nzOriginalText: [{ type: Input }],
    nzLoading: [{ type: Input }],
    nzFullControl: [{ type: Input }],
    nzToolkit: [{ type: Input }],
    nzEditorOption: [{ type: Input }],
    nzEditorInitialized: [{ type: Output }]
};
__decorate([
    InputBoolean(),
    __metadata("design:type", Object)
], NzCodeEditorComponent.prototype, "nzLoading", void 0);
__decorate([
    InputBoolean(),
    __metadata("design:type", Object)
], NzCodeEditorComponent.prototype, "nzFullControl", void 0);

/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */
class NzCodeEditorModule {
}
NzCodeEditorModule.decorators = [
    { type: NgModule, args: [{
                declarations: [NzCodeEditorComponent],
                imports: [CommonModule, NzIconModule, NzSpinModule],
                exports: [NzCodeEditorComponent]
            },] }
];

/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */

/**
 * Generated bundle index. Do not edit.
 */

export { NzCodeEditorComponent, NzCodeEditorLoadingStatus, NzCodeEditorModule, NzCodeEditorService };
//# sourceMappingURL=ng-zorro-antd-code-editor.js.map
