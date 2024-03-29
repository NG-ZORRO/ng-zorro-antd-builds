import { __decorate } from 'tslib';
import * as i0 from '@angular/core';
import { Injectable, Inject, EventEmitter, forwardRef, Component, ChangeDetectionStrategy, ViewEncapsulation, Input, Output, NgModule } from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
import { ReplaySubject, BehaviorSubject, of, Subject, combineLatest, fromEvent } from 'rxjs';
import { tap, map, takeUntil, debounceTime, filter, distinctUntilChanged } from 'rxjs/operators';
import { warn, PREFIX } from 'ng-zorro-antd/core/logger';
import { inNextTick, InputBoolean } from 'ng-zorro-antd/core/util';
import * as i4 from '@angular/common';
import { DOCUMENT, CommonModule } from '@angular/common';
import * as i1 from 'ng-zorro-antd/core/config';
import * as i2 from '@angular/cdk/platform';
import * as i3 from 'ng-zorro-antd/spin';
import { NzSpinModule } from 'ng-zorro-antd/spin';
import { NzIconModule } from 'ng-zorro-antd/icon';

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
// Caretaker note: previously, these were `NzCodeEditorService` properties.
// They're kept as static variables because this will allow loading Monaco only once.
// This applies to micro frontend apps with multiple Angular apps or a single Angular app
// that can be bootstrapped and destroyed multiple times (e.g. using Webpack module federation).
// Root providers are re-initialized each time the app is bootstrapped. Platform providers aren't.
// We can't make the `NzCodeEditorService` to be a platform provider (`@Injectable({ providedIn: 'platform' })`)
// since it depends on other root providers.
const loaded$ = new ReplaySubject(1);
let loadingStatus = "unload" /* UNLOAD */;
class NzCodeEditorService {
    constructor(nzConfigService, _document) {
        this.nzConfigService = nzConfigService;
        this.firstEditorInitialized = false;
        this.option = {};
        this.option$ = new BehaviorSubject(this.option);
        const globalConfig = this.nzConfigService.getConfigForComponent(NZ_CONFIG_MODULE_NAME);
        this.document = _document;
        this.config = Object.assign({}, globalConfig);
        this.option = this.config.defaultEditorOption || {};
        this.subscription = this.nzConfigService.getConfigChangeEventForComponent(NZ_CONFIG_MODULE_NAME).subscribe(() => {
            const newGlobalConfig = this.nzConfigService.getConfigForComponent(NZ_CONFIG_MODULE_NAME);
            if (newGlobalConfig) {
                this._updateDefaultOption(newGlobalConfig.defaultEditorOption);
            }
        });
    }
    ngOnDestroy() {
        this.subscription.unsubscribe();
        this.subscription = null;
    }
    _updateDefaultOption(option) {
        this.option = Object.assign(Object.assign({}, this.option), option);
        this.option$.next(this.option);
        if (option.theme) {
            monaco.editor.setTheme(option.theme);
        }
    }
    requestToInit() {
        if (loadingStatus === "LOADED" /* LOADED */) {
            this.onInit();
            return of(this.getLatestOption());
        }
        if (loadingStatus === "unload" /* UNLOAD */) {
            if (this.config.useStaticLoading && typeof monaco === 'undefined') {
                warn('You choose to use static loading but it seems that you forget ' +
                    'to config webpack plugin correctly. Please refer to our official website' +
                    'for more details about static loading.');
            }
            else {
                this.loadMonacoScript();
            }
        }
        return loaded$.pipe(tap(() => this.onInit()), map(() => this.getLatestOption()));
    }
    loadMonacoScript() {
        if (this.config.useStaticLoading) {
            Promise.resolve().then(() => this.onLoad());
            return;
        }
        if (loadingStatus === "loading" /* LOADING */) {
            return;
        }
        loadingStatus = "loading" /* LOADING */;
        const assetsRoot = this.config.assetsRoot;
        const vs = assetsRoot ? `${assetsRoot}/vs` : 'assets/vs';
        const windowAsAny = window;
        const loadScript = this.document.createElement('script');
        loadScript.type = 'text/javascript';
        loadScript.src = `${vs}/loader.js`;
        const onLoad = () => {
            cleanup();
            windowAsAny.require.config({
                paths: { vs }
            });
            windowAsAny.require(['vs/editor/editor.main'], () => {
                this.onLoad();
            });
        };
        const onError = () => {
            cleanup();
            throw new Error(`${PREFIX} cannot load assets of monaco editor from source "${vs}".`);
        };
        const cleanup = () => {
            // Caretaker note: we have to remove these listeners once the `<script>` is loaded successfully
            // or not since the `onLoad` listener captures `this`, which will prevent the `NzCodeEditorService`
            // from being garbage collected.
            loadScript.removeEventListener('load', onLoad);
            loadScript.removeEventListener('error', onError);
            // We don't need to keep the `<script>` element within the `<body>` since JavaScript has
            // been executed and Monaco is available globally. E.g. Webpack, always removes `<script>`
            // elements after loading chunks (see its `LoadScriptRuntimeModule`).
            this.document.documentElement.removeChild(loadScript);
        };
        loadScript.addEventListener('load', onLoad);
        loadScript.addEventListener('error', onError);
        this.document.documentElement.appendChild(loadScript);
    }
    onLoad() {
        loadingStatus = "LOADED" /* LOADED */;
        loaded$.next(true);
        loaded$.complete();
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
NzCodeEditorService.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.1.2", ngImport: i0, type: NzCodeEditorService, deps: [{ token: i1.NzConfigService }, { token: DOCUMENT }], target: i0.ɵɵFactoryTarget.Injectable });
NzCodeEditorService.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "13.1.2", ngImport: i0, type: NzCodeEditorService, providedIn: 'root' });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.1.2", ngImport: i0, type: NzCodeEditorService, decorators: [{
            type: Injectable,
            args: [{
                    providedIn: 'root'
                }]
        }], ctorParameters: function () {
        return [{ type: i1.NzConfigService }, { type: undefined, decorators: [{
                        type: Inject,
                        args: [DOCUMENT]
                    }] }];
    } });

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
        this.editorInstance = null;
        this.value = '';
        this.modelSet = false;
        this.onDidChangeContentDisposable = null;
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
        this.nzCodeEditorService
            .requestToInit()
            .pipe(takeUntil(this.destroy$))
            .subscribe(option => this.setup(option));
    }
    ngOnDestroy() {
        if (this.onDidChangeContentDisposable) {
            this.onDidChangeContentDisposable.dispose();
            this.onDidChangeContentDisposable = null;
        }
        if (this.editorInstance) {
            this.editorInstance.dispose();
            this.editorInstance = null;
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
        // The `setup()` is invoked when the Monaco editor is loaded. This may happen asynchronously for the first
        // time, and it'll always happen synchronously afterwards. The first `setup()` invokation is outside the Angular
        // zone, but further invokations will happen within the Angular zone. We call the `setModel()` on the editor
        // instance, which tells Monaco to add event listeners lazily internally (`mousemove`, `mouseout`, etc.).
        // We should avoid adding them within the Angular zone since this will drastically affect the performance.
        this.ngZone.runOutsideAngular(() => inNextTick()
            .pipe(takeUntil(this.destroy$))
            .subscribe(() => {
            this.editorOptionCached = option;
            this.registerOptionChanges();
            this.initMonacoEditorInstance();
            this.registerResizeChange();
            this.setValue();
            if (!this.nzFullControl) {
                this.setValueEmitter();
            }
            if (this.nzEditorInitialized.observers.length) {
                this.ngZone.run(() => this.nzEditorInitialized.emit(this.editorInstance));
            }
        }));
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
        // The `onDidChangeContent` returns a disposable object (an object with `dispose()` method) which will cleanup
        // the listener. The callback, that we pass to `onDidChangeContent`, captures `this`. This leads to a circular reference
        // (`nz-code-editor -> monaco -> nz-code-editor`) and prevents the `nz-code-editor` from being GC'd.
        this.onDidChangeContentDisposable = model.onDidChangeContent(() => {
            this.emitValue(model.getValue());
        });
    }
    emitValue(value) {
        if (this.value === value) {
            // If the value didn't change there's no reason to send an update.
            // Specifically this may happen during an update from the model (writeValue) where sending an update to the model would actually be incorrect.
            return;
        }
        this.value = value;
        // We're re-entering the Angular zone only if the value has been changed since there's a `return` expression previously.
        // This won't cause "dead" change detections (basically when the `tick()` has been run, but there's nothing to update).
        this.ngZone.run(() => {
            this.onChange(value);
        });
    }
    updateOptionToMonaco() {
        if (this.editorInstance) {
            this.editorInstance.updateOptions(Object.assign({}, this.editorOptionCached));
        }
    }
}
NzCodeEditorComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.1.2", ngImport: i0, type: NzCodeEditorComponent, deps: [{ token: NzCodeEditorService }, { token: i0.NgZone }, { token: i0.ElementRef }, { token: i2.Platform }], target: i0.ɵɵFactoryTarget.Component });
NzCodeEditorComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "13.1.2", type: NzCodeEditorComponent, selector: "nz-code-editor", inputs: { nzEditorMode: "nzEditorMode", nzOriginalText: "nzOriginalText", nzLoading: "nzLoading", nzFullControl: "nzFullControl", nzToolkit: "nzToolkit", nzEditorOption: "nzEditorOption" }, outputs: { nzEditorInitialized: "nzEditorInitialized" }, providers: [
        {
            provide: NG_VALUE_ACCESSOR,
            useExisting: forwardRef(() => NzCodeEditorComponent),
            multi: true
        }
    ], exportAs: ["nzCodeEditor"], ngImport: i0, template: `
    <div class="ant-code-editor-loading" *ngIf="nzLoading">
      <nz-spin></nz-spin>
    </div>

    <div class="ant-code-editor-toolkit" *ngIf="nzToolkit">
      <ng-template [ngTemplateOutlet]="nzToolkit"></ng-template>
    </div>
  `, isInline: true, components: [{ type: i3.NzSpinComponent, selector: "nz-spin", inputs: ["nzIndicator", "nzSize", "nzTip", "nzDelay", "nzSimple", "nzSpinning"], exportAs: ["nzSpin"] }], directives: [{ type: i4.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { type: i4.NgTemplateOutlet, selector: "[ngTemplateOutlet]", inputs: ["ngTemplateOutletContext", "ngTemplateOutlet"] }], changeDetection: i0.ChangeDetectionStrategy.OnPush, encapsulation: i0.ViewEncapsulation.None });
__decorate([
    InputBoolean()
], NzCodeEditorComponent.prototype, "nzLoading", void 0);
__decorate([
    InputBoolean()
], NzCodeEditorComponent.prototype, "nzFullControl", void 0);
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.1.2", ngImport: i0, type: NzCodeEditorComponent, decorators: [{
            type: Component,
            args: [{
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
                }]
        }], ctorParameters: function () { return [{ type: NzCodeEditorService }, { type: i0.NgZone }, { type: i0.ElementRef }, { type: i2.Platform }]; }, propDecorators: { nzEditorMode: [{
                type: Input
            }], nzOriginalText: [{
                type: Input
            }], nzLoading: [{
                type: Input
            }], nzFullControl: [{
                type: Input
            }], nzToolkit: [{
                type: Input
            }], nzEditorOption: [{
                type: Input
            }], nzEditorInitialized: [{
                type: Output
            }] } });

/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */
class NzCodeEditorModule {
}
NzCodeEditorModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.1.2", ngImport: i0, type: NzCodeEditorModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
NzCodeEditorModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "12.0.0", version: "13.1.2", ngImport: i0, type: NzCodeEditorModule, declarations: [NzCodeEditorComponent], imports: [CommonModule, NzIconModule, NzSpinModule], exports: [NzCodeEditorComponent] });
NzCodeEditorModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "13.1.2", ngImport: i0, type: NzCodeEditorModule, imports: [[CommonModule, NzIconModule, NzSpinModule]] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.1.2", ngImport: i0, type: NzCodeEditorModule, decorators: [{
            type: NgModule,
            args: [{
                    declarations: [NzCodeEditorComponent],
                    imports: [CommonModule, NzIconModule, NzSpinModule],
                    exports: [NzCodeEditorComponent]
                }]
        }] });

/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */

/**
 * Generated bundle index. Do not edit.
 */

export { NzCodeEditorComponent, NzCodeEditorModule, NzCodeEditorService };
//# sourceMappingURL=ng-zorro-antd-code-editor.mjs.map
