import { __decorate } from "tslib";
import { ChangeDetectionStrategy, Component, EventEmitter, forwardRef, Input, Output, ViewEncapsulation } from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
import { BehaviorSubject, combineLatest, fromEvent, Subject } from 'rxjs';
import { debounceTime, distinctUntilChanged, filter, map, takeUntil } from 'rxjs/operators';
import { warn } from 'ng-zorro-antd/core/logger';
import { inNextTick, InputBoolean } from 'ng-zorro-antd/core/util';
import * as i0 from "@angular/core";
import * as i1 from "./code-editor.service";
import * as i2 from "@angular/cdk/platform";
import * as i3 from "ng-zorro-antd/spin";
import * as i4 from "@angular/common";
export class NzCodeEditorComponent {
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
            this.editorOptionCached = {
                ...this.editorOptionCached,
                ...defaultOpt,
                ...selfOpt
            };
            this.updateOptionToMonaco();
        });
    }
    initMonacoEditorInstance() {
        this.ngZone.runOutsideAngular(() => {
            this.editorInstance =
                this.nzEditorMode === 'normal'
                    ? monaco.editor.create(this.el, { ...this.editorOptionCached })
                    : monaco.editor.createDiffEditor(this.el, {
                        ...this.editorOptionCached
                    });
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
            this.editorInstance.updateOptions({ ...this.editorOptionCached });
        }
    }
}
NzCodeEditorComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.1.2", ngImport: i0, type: NzCodeEditorComponent, deps: [{ token: i1.NzCodeEditorService }, { token: i0.NgZone }, { token: i0.ElementRef }, { token: i2.Platform }], target: i0.ɵɵFactoryTarget.Component });
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
        }], ctorParameters: function () { return [{ type: i1.NzCodeEditorService }, { type: i0.NgZone }, { type: i0.ElementRef }, { type: i2.Platform }]; }, propDecorators: { nzEditorMode: [{
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29kZS1lZGl0b3IuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vY29tcG9uZW50cy9jb2RlLWVkaXRvci9jb2RlLWVkaXRvci5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQU1BLE9BQU8sRUFFTCx1QkFBdUIsRUFDdkIsU0FBUyxFQUVULFlBQVksRUFDWixVQUFVLEVBQ1YsS0FBSyxFQUdMLE1BQU0sRUFFTixpQkFBaUIsRUFDbEIsTUFBTSxlQUFlLENBQUM7QUFDdkIsT0FBTyxFQUFFLGlCQUFpQixFQUFFLE1BQU0sZ0JBQWdCLENBQUM7QUFDbkQsT0FBTyxFQUFFLGVBQWUsRUFBRSxhQUFhLEVBQUUsU0FBUyxFQUFFLE9BQU8sRUFBRSxNQUFNLE1BQU0sQ0FBQztBQUMxRSxPQUFPLEVBQUUsWUFBWSxFQUFFLG9CQUFvQixFQUFFLE1BQU0sRUFBRSxHQUFHLEVBQUUsU0FBUyxFQUFFLE1BQU0sZ0JBQWdCLENBQUM7QUFJNUYsT0FBTyxFQUFFLElBQUksRUFBRSxNQUFNLDJCQUEyQixDQUFDO0FBRWpELE9BQU8sRUFBRSxVQUFVLEVBQUUsWUFBWSxFQUFFLE1BQU0seUJBQXlCLENBQUM7Ozs7OztBQWtDbkUsTUFBTSxPQUFPLHFCQUFxQjtJQTJCaEMsWUFDVSxtQkFBd0MsRUFDeEMsTUFBYyxFQUN0QixVQUFzQixFQUNkLFFBQWtCO1FBSGxCLHdCQUFtQixHQUFuQixtQkFBbUIsQ0FBcUI7UUFDeEMsV0FBTSxHQUFOLE1BQU0sQ0FBUTtRQUVkLGFBQVEsR0FBUixRQUFRLENBQVU7UUEzQm5CLGlCQUFZLEdBQWlCLFFBQVEsQ0FBQztRQUN0QyxtQkFBYyxHQUFHLEVBQUUsQ0FBQztRQUNKLGNBQVMsR0FBRyxLQUFLLENBQUM7UUFDbEIsa0JBQWEsR0FBRyxLQUFLLENBQUM7UUFPNUIsd0JBQW1CLEdBQUcsSUFBSSxZQUFZLEVBQWlELENBQUM7UUFFM0csdUJBQWtCLEdBQXdCLEVBQUUsQ0FB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QUk7b0JBQ3JDLFFBQVEsRUFBRSxnQkFBZ0I7b0JBQzFCLFFBQVEsRUFBRSxjQUFjO29CQUN4QixRQUFRLEVBQUU7Ozs7Ozs7O0dBUVQ7b0JBQ0QsU0FBUyxFQUFFO3dCQUNUOzRCQUNFLE9BQU8sRUFBRSxpQkFBaUI7NEJBQzFCLFdBQVcsRUFBRSxVQUFVLENBQUMsR0FBRyxFQUFFLHNCQUFzQixDQUFDOzRCQUNwRCxLQUFLLEVBQUUsSUFBSTt5QkFDWjtxQkFDRjtpQkFDRjsrS0FLVSxZQUFZO3NCQUFwQixLQUFLO2dCQUNHLGNBQWM7c0JBQXRCLEtBQUs7Z0JBQ21CLFNBQVM7c0JBQWpDLEtBQUs7Z0JBQ21CLGFBQWE7c0JBQXJDLEtBQUs7Z0JBQ0csU0FBUztzQkFBakIsS0FBSztnQkFFTyxjQUFjO3NCQUExQixLQUFLO2dCQUlhLG1CQUFtQjtzQkFBckMsTUFBTSIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxuICogVXNlIG9mIHRoaXMgc291cmNlIGNvZGUgaXMgZ292ZXJuZWQgYnkgYW4gTUlULXN0eWxlIGxpY2Vuc2UgdGhhdCBjYW4gYmVcbiAqIGZvdW5kIGluIHRoZSBMSUNFTlNFIGZpbGUgYXQgaHR0cHM6Ly9naXRodWIuY29tL05HLVpPUlJPL25nLXpvcnJvLWFudGQvYmxvYi9tYXN0ZXIvTElDRU5TRVxuICovXG5cbmltcG9ydCB7IFBsYXRmb3JtIH0gZnJvbSAnQGFuZ3VsYXIvY2RrL3BsYXRmb3JtJztcbmltcG9ydCB7XG4gIEFmdGVyVmlld0luaXQsXG4gIENoYW5nZURldGVjdGlvblN0cmF0ZWd5LFxuICBDb21wb25lbnQsXG4gIEVsZW1lbnRSZWYsXG4gIEV2ZW50RW1pdHRlcixcbiAgZm9yd2FyZFJlZixcbiAgSW5wdXQsXG4gIE5nWm9uZSxcbiAgT25EZXN0cm95LFxuICBPdXRwdXQsXG4gIFRlbXBsYXRlUmVmLFxuICBWaWV3RW5jYXBzdWxhdGlvblxufSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IE5HX1ZBTFVFX0FDQ0VTU09SIH0gZnJvbSAnQGFuZ3VsYXIvZm9ybXMnO1xuaW1wb3J0IHsgQmVoYXZpb3JTdWJqZWN0LCBjb21iaW5lTGF0ZXN0LCBmcm9tRXZlbnQsIFN1YmplY3QgfSBmcm9tICdyeGpzJztcbmltcG9ydCB7IGRlYm91bmNlVGltZSwgZGlzdGluY3RVbnRpbENoYW5nZWQsIGZpbHRlciwgbWFwLCB0YWtlVW50aWwgfSBmcm9tICdyeGpzL29wZXJhdG9ycyc7XG5cbmltcG9ydCB7IGVkaXRvciwgSURpc3Bvc2FibGUgfSBmcm9tICdtb25hY28tZWRpdG9yJztcblxuaW1wb3J0IHsgd2FybiB9IGZyb20gJ25nLXpvcnJvLWFudGQvY29yZS9sb2dnZXInO1xuaW1wb3J0IHsgQm9vbGVhbklucHV0LCBOelNhZmVBbnksIE9uQ2hhbmdlVHlwZSwgT25Ub3VjaGVkVHlwZSB9IGZyb20gJ25nLXpvcnJvLWFudGQvY29yZS90eXBlcyc7XG5pbXBvcnQgeyBpbk5leHRUaWNrLCBJbnB1dEJvb2xlYW4gfSBmcm9tICduZy16b3Jyby1hbnRkL2NvcmUvdXRpbCc7XG5cbmltcG9ydCB7IE56Q29kZUVkaXRvclNlcnZpY2UgfSBmcm9tICcuL2NvZGUtZWRpdG9yLnNlcnZpY2UnO1xuaW1wb3J0IHsgRGlmZkVkaXRvck9wdGlvbnMsIEVkaXRvck9wdGlvbnMsIEpvaW5lZEVkaXRvck9wdGlvbnMsIE56RWRpdG9yTW9kZSB9IGZyb20gJy4vdHlwaW5ncyc7XG5cbi8vIEltcG9ydCB0eXBlcyBmcm9tIG1vbmFjbyBlZGl0b3IuXG5pbXBvcnQgSVRleHRNb2RlbCA9IGVkaXRvci5JVGV4dE1vZGVsO1xuaW1wb3J0IElTdGFuZGFsb25lQ29kZUVkaXRvciA9IGVkaXRvci5JU3RhbmRhbG9uZUNvZGVFZGl0b3I7XG5pbXBvcnQgSVN0YW5kYWxvbmVEaWZmRWRpdG9yID0gZWRpdG9yLklTdGFuZGFsb25lRGlmZkVkaXRvcjtcblxuZGVjbGFyZSBjb25zdCBtb25hY286IE56U2FmZUFueTtcblxuQENvbXBvbmVudCh7XG4gIGNoYW5nZURldGVjdGlvbjogQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3kuT25QdXNoLFxuICBlbmNhcHN1bGF0aW9uOiBWaWV3RW5jYXBzdWxhdGlvbi5Ob25lLFxuICBzZWxlY3RvcjogJ256LWNvZGUtZWRpdG9yJyxcbiAgZXhwb3J0QXM6ICduekNvZGVFZGl0b3InLFxuICB0ZW1wbGF0ZTogYFxuICAgIDxkaXYgY2xhc3M9XCJhbnQtY29kZS1lZGl0b3ItbG9hZGluZ1wiICpuZ0lmPVwibnpMb2FkaW5nXCI+XG4gICAgICA8bnotc3Bpbj48L256LXNwaW4+XG4gICAgPC9kaXY+XG5cbiAgICA8ZGl2IGNsYXNzPVwiYW50LWNvZGUtZWRpdG9yLXRvb2xraXRcIiAqbmdJZj1cIm56VG9vbGtpdFwiPlxuICAgICAgPG5nLXRlbXBsYXRlIFtuZ1RlbXBsYXRlT3V0bGV0XT1cIm56VG9vbGtpdFwiPjwvbmctdGVtcGxhdGU+XG4gICAgPC9kaXY+XG4gIGAsXG4gIHByb3ZpZGVyczogW1xuICAgIHtcbiAgICAgIHByb3ZpZGU6IE5HX1ZBTFVFX0FDQ0VTU09SLFxuICAgICAgdXNlRXhpc3Rpbmc6IGZvcndhcmRSZWYoKCkgPT4gTnpDb2RlRWRpdG9yQ29tcG9uZW50KSxcbiAgICAgIG11bHRpOiB0cnVlXG4gICAgfVxuICBdXG59KVxuZXhwb3J0IGNsYXNzIE56Q29kZUVkaXRvckNvbXBvbmVudCBpbXBsZW1lbnRzIE9uRGVzdHJveSwgQWZ0ZXJWaWV3SW5pdCB7XG4gIHN0YXRpYyBuZ0FjY2VwdElucHV0VHlwZV9uekxvYWRpbmc6IEJvb2xlYW5JbnB1dDtcbiAgc3RhdGljIG5nQWNjZXB0SW5wdXRUeXBlX256RnVsbENvbnRyb2w6IEJvb2xlYW5JbnB1dDtcblxuICBASW5wdXQoKSBuekVkaXRvck1vZGU6IE56RWRpdG9yTW9kZSA9ICdub3JtYWwnO1xuICBASW5wdXQoKSBuek9yaWdpbmFsVGV4dCA9ICcnO1xuICBASW5wdXQoKSBASW5wdXRCb29sZWFuKCkgbnpMb2FkaW5nID0gZmFsc2U7XG4gIEBJbnB1dCgpIEBJbnB1dEJvb2xlYW4oKSBuekZ1bGxDb250cm9sID0gZmFsc2U7XG4gIEBJbnB1dCgpIG56VG9vbGtpdD86IFRlbXBsYXRlUmVmPHZvaWQ+O1xuXG4gIEBJbnB1dCgpIHNldCBuekVkaXRvck9wdGlvbih2YWx1ZTogSm9pbmVkRWRpdG9yT3B0aW9ucykge1xuICAgIHRoaXMuZWRpdG9yT3B0aW9uJC5uZXh0KHZhbHVlKTtcbiAgfVxuXG4gIEBPdXRwdXQoKSByZWFkb25seSBuekVkaXRvckluaXRpYWxpemVkID0gbmV3IEV2ZW50RW1pdHRlcjxJU3RhbmRhbG9uZUNvZGVFZGl0b3IgfCBJU3RhbmRhbG9uZURpZmZFZGl0b3I+KCk7XG5cbiAgZWRpdG9yT3B0aW9uQ2FjaGVkOiBKb2luZWRFZGl0b3JPcHRpb25zID0ge307XG5cbiAgcHJpdmF0ZSByZWFkb25seSBlbDogSFRNTEVsZW1lbnQ7XG4gIHByaXZhdGUgZGVzdHJveSQgPSBuZXcgU3ViamVjdDx2b2lkPigpO1xuICBwcml2YXRlIHJlc2l6ZSQgPSBuZXcgU3ViamVjdDx2b2lkPigpO1xuICBwcml2YXRlIGVkaXRvck9wdGlvbiQgPSBuZXcgQmVoYXZpb3JTdWJqZWN0PEpvaW5lZEVkaXRvck9wdGlvbnM+KHt9KTtcbiAgcHJpdmF0ZSBlZGl0b3JJbnN0YW5jZTogSVN0YW5kYWxvbmVDb2RlRWRpdG9yIHwgSVN0YW5kYWxvbmVEaWZmRWRpdG9yIHwgbnVsbCA9IG51bGw7XG4gIHByaXZhdGUgdmFsdWUgPSAnJztcbiAgcHJpdmF0ZSBtb2RlbFNldCA9IGZhbHNlO1xuICBwcml2YXRlIG9uRGlkQ2hhbmdlQ29udGVudERpc3Bvc2FibGU6IElEaXNwb3NhYmxlIHwgbnVsbCA9IG51bGw7XG5cbiAgY29uc3RydWN0b3IoXG4gICAgcHJpdmF0ZSBuekNvZGVFZGl0b3JTZXJ2aWNlOiBOekNvZGVFZGl0b3JTZXJ2aWNlLFxuICAgIHByaXZhdGUgbmdab25lOiBOZ1pvbmUsXG4gICAgZWxlbWVudFJlZjogRWxlbWVudFJlZixcbiAgICBwcml2YXRlIHBsYXRmb3JtOiBQbGF0Zm9ybVxuICApIHtcbiAgICB0aGlzLmVsID0gZWxlbWVudFJlZi5uYXRpdmVFbGVtZW50O1xuICAgIHRoaXMuZWwuY2xhc3NMaXN0LmFkZCgnYW50LWNvZGUtZWRpdG9yJyk7XG4gIH1cblxuICAvKipcbiAgICogSW5pdGlhbGl6ZSBhIG1vbmFjbyBlZGl0b3IgaW5zdGFuY2UuXG4gICAqL1xuICBuZ0FmdGVyVmlld0luaXQoKTogdm9pZCB7XG4gICAgaWYgKCF0aGlzLnBsYXRmb3JtLmlzQnJvd3Nlcikge1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIHRoaXMubnpDb2RlRWRpdG9yU2VydmljZVxuICAgICAgLnJlcXVlc3RUb0luaXQoKVxuICAgICAgLnBpcGUodGFrZVVudGlsKHRoaXMuZGVzdHJveSQpKVxuICAgICAgLnN1YnNjcmliZShvcHRpb24gPT4gdGhpcy5zZXR1cChvcHRpb24pKTtcbiAgfVxuXG4gIG5nT25EZXN0cm95KCk6IHZvaWQge1xuICAgIGlmICh0aGlzLm9uRGlkQ2hhbmdlQ29udGVudERpc3Bvc2FibGUpIHtcbiAgICAgIHRoaXMub25EaWRDaGFuZ2VDb250ZW50RGlzcG9zYWJsZS5kaXNwb3NlKCk7XG4gICAgICB0aGlzLm9uRGlkQ2hhbmdlQ29udGVudERpc3Bvc2FibGUgPSBudWxsO1xuICAgIH1cblxuICAgIGlmICh0aGlzLmVkaXRvckluc3RhbmNlKSB7XG4gICAgICB0aGlzLmVkaXRvckluc3RhbmNlLmRpc3Bvc2UoKTtcbiAgICAgIHRoaXMuZWRpdG9ySW5zdGFuY2UgPSBudWxsO1xuICAgIH1cblxuICAgIHRoaXMuZGVzdHJveSQubmV4dCgpO1xuICAgIHRoaXMuZGVzdHJveSQuY29tcGxldGUoKTtcbiAgfVxuXG4gIHdyaXRlVmFsdWUodmFsdWU6IHN0cmluZyk6IHZvaWQge1xuICAgIHRoaXMudmFsdWUgPSB2YWx1ZTtcbiAgICB0aGlzLnNldFZhbHVlKCk7XG4gIH1cblxuICByZWdpc3Rlck9uQ2hhbmdlKGZuOiBPbkNoYW5nZVR5cGUpOiBOelNhZmVBbnkge1xuICAgIHRoaXMub25DaGFuZ2UgPSBmbjtcbiAgfVxuXG4gIHJlZ2lzdGVyT25Ub3VjaGVkKGZuOiBPblRvdWNoZWRUeXBlKTogdm9pZCB7XG4gICAgdGhpcy5vblRvdWNoID0gZm47XG4gIH1cblxuICBvbkNoYW5nZTogT25DaGFuZ2VUeXBlID0gKF92YWx1ZTogc3RyaW5nKSA9PiB7fTtcblxuICBvblRvdWNoOiBPblRvdWNoZWRUeXBlID0gKCkgPT4ge307XG5cbiAgbGF5b3V0KCk6IHZvaWQge1xuICAgIHRoaXMucmVzaXplJC5uZXh0KCk7XG4gIH1cblxuICBwcml2YXRlIHNldHVwKG9wdGlvbjogSm9pbmVkRWRpdG9yT3B0aW9ucyk6IHZvaWQge1xuICAgIC8vIFRoZSBgc2V0dXAoKWAgaXMgaW52b2tlZCB3aGVuIHRoZSBNb25hY28gZWRpdG9yIGlzIGxvYWRlZC4gVGhpcyBtYXkgaGFwcGVuIGFzeW5jaHJvbm91c2x5IGZvciB0aGUgZmlyc3RcbiAgICAvLyB0aW1lLCBhbmQgaXQnbGwgYWx3YXlzIGhhcHBlbiBzeW5jaHJvbm91c2x5IGFmdGVyd2FyZHMuIFRoZSBmaXJzdCBgc2V0dXAoKWAgaW52b2thdGlvbiBpcyBvdXRzaWRlIHRoZSBBbmd1bGFyXG4gICAgLy8gem9uZSwgYnV0IGZ1cnRoZXIgaW52b2thdGlvbnMgd2lsbCBoYXBwZW4gd2l0aGluIHRoZSBBbmd1bGFyIHpvbmUuIFdlIGNhbGwgdGhlIGBzZXRNb2RlbCgpYCBvbiB0aGUgZWRpdG9yXG4gICAgLy8gaW5zdGFuY2UsIHdoaWNoIHRlbGxzIE1vbmFjbyB0byBhZGQgZXZlbnQgbGlzdGVuZXJzIGxhemlseSBpbnRlcm5hbGx5IChgbW91c2Vtb3ZlYCwgYG1vdXNlb3V0YCwgZXRjLikuXG4gICAgLy8gV2Ugc2hvdWxkIGF2b2lkIGFkZGluZyB0aGVtIHdpdGhpbiB0aGUgQW5ndWxhciB6b25lIHNpbmNlIHRoaXMgd2lsbCBkcmFzdGljYWxseSBhZmZlY3QgdGhlIHBlcmZvcm1hbmNlLlxuICAgIHRoaXMubmdab25lLnJ1bk91dHNpZGVBbmd1bGFyKCgpID0+XG4gICAgICBpbk5leHRUaWNrKClcbiAgICAgICAgLnBpcGUodGFrZVVudGlsKHRoaXMuZGVzdHJveSQpKVxuICAgICAgICAuc3Vic2NyaWJlKCgpID0+IHtcbiAgICAgICAgICB0aGlzLmVkaXRvck9wdGlvbkNhY2hlZCA9IG9wdGlvbjtcbiAgICAgICAgICB0aGlzLnJlZ2lzdGVyT3B0aW9uQ2hhbmdlcygpO1xuICAgICAgICAgIHRoaXMuaW5pdE1vbmFjb0VkaXRvckluc3RhbmNlKCk7XG4gICAgICAgICAgdGhpcy5yZWdpc3RlclJlc2l6ZUNoYW5nZSgpO1xuICAgICAgICAgIHRoaXMuc2V0VmFsdWUoKTtcblxuICAgICAgICAgIGlmICghdGhpcy5uekZ1bGxDb250cm9sKSB7XG4gICAgICAgICAgICB0aGlzLnNldFZhbHVlRW1pdHRlcigpO1xuICAgICAgICAgIH1cblxuICAgICAgICAgIGlmICh0aGlzLm56RWRpdG9ySW5pdGlhbGl6ZWQub2JzZXJ2ZXJzLmxlbmd0aCkge1xuICAgICAgICAgICAgdGhpcy5uZ1pvbmUucnVuKCgpID0+IHRoaXMubnpFZGl0b3JJbml0aWFsaXplZC5lbWl0KHRoaXMuZWRpdG9ySW5zdGFuY2UhKSk7XG4gICAgICAgICAgfVxuICAgICAgICB9KVxuICAgICk7XG4gIH1cblxuICBwcml2YXRlIHJlZ2lzdGVyT3B0aW9uQ2hhbmdlcygpOiB2b2lkIHtcbiAgICBjb21iaW5lTGF0ZXN0KFt0aGlzLmVkaXRvck9wdGlvbiQsIHRoaXMubnpDb2RlRWRpdG9yU2VydmljZS5vcHRpb24kXSlcbiAgICAgIC5waXBlKHRha2VVbnRpbCh0aGlzLmRlc3Ryb3kkKSlcbiAgICAgIC5zdWJzY3JpYmUoKFtzZWxmT3B0LCBkZWZhdWx0T3B0XSkgPT4ge1xuICAgICAgICB0aGlzLmVkaXRvck9wdGlvbkNhY2hlZCA9IHtcbiAgICAgICAgICAuLi50aGlzLmVkaXRvck9wdGlvbkNhY2hlZCxcbiAgICAgICAgICAuLi5kZWZhdWx0T3B0LFxuICAgICAgICAgIC4uLnNlbGZPcHRcbiAgICAgICAgfTtcbiAgICAgICAgdGhpcy51cGRhdGVPcHRpb25Ub01vbmFjbygpO1xuICAgICAgfSk7XG4gIH1cblxuICBwcml2YXRlIGluaXRNb25hY29FZGl0b3JJbnN0YW5jZSgpOiB2b2lkIHtcbiAgICB0aGlzLm5nWm9uZS5ydW5PdXRzaWRlQW5ndWxhcigoKSA9PiB7XG4gICAgICB0aGlzLmVkaXRvckluc3RhbmNlID1cbiAgICAgICAgdGhpcy5uekVkaXRvck1vZGUgPT09ICdub3JtYWwnXG4gICAgICAgICAgPyBtb25hY28uZWRpdG9yLmNyZWF0ZSh0aGlzLmVsLCB7IC4uLnRoaXMuZWRpdG9yT3B0aW9uQ2FjaGVkIH0pXG4gICAgICAgICAgOiBtb25hY28uZWRpdG9yLmNyZWF0ZURpZmZFZGl0b3IodGhpcy5lbCwge1xuICAgICAgICAgICAgICAuLi4odGhpcy5lZGl0b3JPcHRpb25DYWNoZWQgYXMgRGlmZkVkaXRvck9wdGlvbnMpXG4gICAgICAgICAgICB9KTtcbiAgICB9KTtcbiAgfVxuXG4gIHByaXZhdGUgcmVnaXN0ZXJSZXNpemVDaGFuZ2UoKTogdm9pZCB7XG4gICAgdGhpcy5uZ1pvbmUucnVuT3V0c2lkZUFuZ3VsYXIoKCkgPT4ge1xuICAgICAgZnJvbUV2ZW50KHdpbmRvdywgJ3Jlc2l6ZScpXG4gICAgICAgIC5waXBlKGRlYm91bmNlVGltZSgzMDApLCB0YWtlVW50aWwodGhpcy5kZXN0cm95JCkpXG4gICAgICAgIC5zdWJzY3JpYmUoKCkgPT4ge1xuICAgICAgICAgIHRoaXMubGF5b3V0KCk7XG4gICAgICAgIH0pO1xuXG4gICAgICB0aGlzLnJlc2l6ZSRcbiAgICAgICAgLnBpcGUoXG4gICAgICAgICAgdGFrZVVudGlsKHRoaXMuZGVzdHJveSQpLFxuICAgICAgICAgIGZpbHRlcigoKSA9PiAhIXRoaXMuZWRpdG9ySW5zdGFuY2UpLFxuICAgICAgICAgIG1hcCgoKSA9PiAoe1xuICAgICAgICAgICAgd2lkdGg6IHRoaXMuZWwuY2xpZW50V2lkdGgsXG4gICAgICAgICAgICBoZWlnaHQ6IHRoaXMuZWwuY2xpZW50SGVpZ2h0XG4gICAgICAgICAgfSkpLFxuICAgICAgICAgIGRpc3RpbmN0VW50aWxDaGFuZ2VkKChhLCBiKSA9PiBhLndpZHRoID09PSBiLndpZHRoICYmIGEuaGVpZ2h0ID09PSBiLmhlaWdodCksXG4gICAgICAgICAgZGVib3VuY2VUaW1lKDUwKVxuICAgICAgICApXG4gICAgICAgIC5zdWJzY3JpYmUoKCkgPT4ge1xuICAgICAgICAgIHRoaXMuZWRpdG9ySW5zdGFuY2UhLmxheW91dCgpO1xuICAgICAgICB9KTtcbiAgICB9KTtcbiAgfVxuXG4gIHByaXZhdGUgc2V0VmFsdWUoKTogdm9pZCB7XG4gICAgaWYgKCF0aGlzLmVkaXRvckluc3RhbmNlKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgaWYgKHRoaXMubnpGdWxsQ29udHJvbCAmJiB0aGlzLnZhbHVlKSB7XG4gICAgICB3YXJuKGBzaG91bGQgbm90IHNldCB2YWx1ZSB3aGVuIHlvdSBhcmUgdXNpbmcgZnVsbCBjb250cm9sIG1vZGUhIEl0IHdvdWxkIHJlc3VsdCBpbiBhbWJpZ3VvdXMgZGF0YSBmbG93IWApO1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIGlmICh0aGlzLm56RWRpdG9yTW9kZSA9PT0gJ25vcm1hbCcpIHtcbiAgICAgIGlmICh0aGlzLm1vZGVsU2V0KSB7XG4gICAgICAgIGNvbnN0IG1vZGVsID0gdGhpcy5lZGl0b3JJbnN0YW5jZS5nZXRNb2RlbCgpIGFzIElUZXh0TW9kZWw7XG4gICAgICAgIHRoaXMucHJlc2VydmVQb3NpdGlvbkFuZFNlbGVjdGlvbnMoKCkgPT4gbW9kZWwuc2V0VmFsdWUodGhpcy52YWx1ZSkpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgKHRoaXMuZWRpdG9ySW5zdGFuY2UgYXMgSVN0YW5kYWxvbmVDb2RlRWRpdG9yKS5zZXRNb2RlbChcbiAgICAgICAgICBtb25hY28uZWRpdG9yLmNyZWF0ZU1vZGVsKHRoaXMudmFsdWUsICh0aGlzLmVkaXRvck9wdGlvbkNhY2hlZCBhcyBFZGl0b3JPcHRpb25zKS5sYW5ndWFnZSlcbiAgICAgICAgKTtcbiAgICAgICAgdGhpcy5tb2RlbFNldCA9IHRydWU7XG4gICAgICB9XG4gICAgfSBlbHNlIHtcbiAgICAgIGlmICh0aGlzLm1vZGVsU2V0KSB7XG4gICAgICAgIGNvbnN0IG1vZGVsID0gKHRoaXMuZWRpdG9ySW5zdGFuY2UgYXMgSVN0YW5kYWxvbmVEaWZmRWRpdG9yKS5nZXRNb2RlbCgpITtcbiAgICAgICAgdGhpcy5wcmVzZXJ2ZVBvc2l0aW9uQW5kU2VsZWN0aW9ucygoKSA9PiB7XG4gICAgICAgICAgbW9kZWwubW9kaWZpZWQuc2V0VmFsdWUodGhpcy52YWx1ZSk7XG4gICAgICAgICAgbW9kZWwub3JpZ2luYWwuc2V0VmFsdWUodGhpcy5uek9yaWdpbmFsVGV4dCk7XG4gICAgICAgIH0pO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgY29uc3QgbGFuZ3VhZ2UgPSAodGhpcy5lZGl0b3JPcHRpb25DYWNoZWQgYXMgRWRpdG9yT3B0aW9ucykubGFuZ3VhZ2U7XG4gICAgICAgICh0aGlzLmVkaXRvckluc3RhbmNlIGFzIElTdGFuZGFsb25lRGlmZkVkaXRvcikuc2V0TW9kZWwoe1xuICAgICAgICAgIG9yaWdpbmFsOiBtb25hY28uZWRpdG9yLmNyZWF0ZU1vZGVsKHRoaXMubnpPcmlnaW5hbFRleHQsIGxhbmd1YWdlKSxcbiAgICAgICAgICBtb2RpZmllZDogbW9uYWNvLmVkaXRvci5jcmVhdGVNb2RlbCh0aGlzLnZhbHVlLCBsYW5ndWFnZSlcbiAgICAgICAgfSk7XG4gICAgICAgIHRoaXMubW9kZWxTZXQgPSB0cnVlO1xuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiB7QGxpbmsgZWRpdG9yLklDb2RlRWRpdG9yfSNzZXRWYWx1ZSByZXNldHMgdGhlIGN1cnNvciBwb3NpdGlvbiB0byB0aGUgc3RhcnQgb2YgdGhlIGRvY3VtZW50LlxuICAgKiBUaGlzIGhlbHBlciBtZW1vcml6ZXMgdGhlIGN1cnNvciBwb3NpdGlvbiBhbmQgc2VsZWN0aW9ucyBhbmQgcmVzdG9yZXMgdGhlbSBhZnRlciB0aGUgZ2l2ZW5cbiAgICogZnVuY3Rpb24gaGFzIGJlZW4gY2FsbGVkLlxuICAgKi9cbiAgcHJpdmF0ZSBwcmVzZXJ2ZVBvc2l0aW9uQW5kU2VsZWN0aW9ucyhmbjogKCkgPT4gdW5rbm93bik6IHZvaWQge1xuICAgIGlmICghdGhpcy5lZGl0b3JJbnN0YW5jZSkge1xuICAgICAgZm4oKTtcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICBjb25zdCBwb3NpdGlvbiA9IHRoaXMuZWRpdG9ySW5zdGFuY2UuZ2V0UG9zaXRpb24oKTtcbiAgICBjb25zdCBzZWxlY3Rpb25zID0gdGhpcy5lZGl0b3JJbnN0YW5jZS5nZXRTZWxlY3Rpb25zKCk7XG5cbiAgICBmbigpO1xuXG4gICAgaWYgKHBvc2l0aW9uKSB7XG4gICAgICB0aGlzLmVkaXRvckluc3RhbmNlLnNldFBvc2l0aW9uKHBvc2l0aW9uKTtcbiAgICB9XG4gICAgaWYgKHNlbGVjdGlvbnMpIHtcbiAgICAgIHRoaXMuZWRpdG9ySW5zdGFuY2Uuc2V0U2VsZWN0aW9ucyhzZWxlY3Rpb25zKTtcbiAgICB9XG4gIH1cblxuICBwcml2YXRlIHNldFZhbHVlRW1pdHRlcigpOiB2b2lkIHtcbiAgICBjb25zdCBtb2RlbCA9IChcbiAgICAgIHRoaXMubnpFZGl0b3JNb2RlID09PSAnbm9ybWFsJ1xuICAgICAgICA/ICh0aGlzLmVkaXRvckluc3RhbmNlIGFzIElTdGFuZGFsb25lQ29kZUVkaXRvcikuZ2V0TW9kZWwoKVxuICAgICAgICA6ICh0aGlzLmVkaXRvckluc3RhbmNlIGFzIElTdGFuZGFsb25lRGlmZkVkaXRvcikuZ2V0TW9kZWwoKSEubW9kaWZpZWRcbiAgICApIGFzIElUZXh0TW9kZWw7XG5cbiAgICAvLyBUaGUgYG9uRGlkQ2hhbmdlQ29udGVudGAgcmV0dXJucyBhIGRpc3Bvc2FibGUgb2JqZWN0IChhbiBvYmplY3Qgd2l0aCBgZGlzcG9zZSgpYCBtZXRob2QpIHdoaWNoIHdpbGwgY2xlYW51cFxuICAgIC8vIHRoZSBsaXN0ZW5lci4gVGhlIGNhbGxiYWNrLCB0aGF0IHdlIHBhc3MgdG8gYG9uRGlkQ2hhbmdlQ29udGVudGAsIGNhcHR1cmVzIGB0aGlzYC4gVGhpcyBsZWFkcyB0byBhIGNpcmN1bGFyIHJlZmVyZW5jZVxuICAgIC8vIChgbnotY29kZS1lZGl0b3IgLT4gbW9uYWNvIC0+IG56LWNvZGUtZWRpdG9yYCkgYW5kIHByZXZlbnRzIHRoZSBgbnotY29kZS1lZGl0b3JgIGZyb20gYmVpbmcgR0MnZC5cbiAgICB0aGlzLm9uRGlkQ2hhbmdlQ29udGVudERpc3Bvc2FibGUgPSBtb2RlbC5vbkRpZENoYW5nZUNvbnRlbnQoKCkgPT4ge1xuICAgICAgdGhpcy5lbWl0VmFsdWUobW9kZWwuZ2V0VmFsdWUoKSk7XG4gICAgfSk7XG4gIH1cblxuICBwcml2YXRlIGVtaXRWYWx1ZSh2YWx1ZTogc3RyaW5nKTogdm9pZCB7XG4gICAgaWYgKHRoaXMudmFsdWUgPT09IHZhbHVlKSB7XG4gICAgICAvLyBJZiB0aGUgdmFsdWUgZGlkbid0IGNoYW5nZSB0aGVyZSdzIG5vIHJlYXNvbiB0byBzZW5kIGFuIHVwZGF0ZS5cbiAgICAgIC8vIFNwZWNpZmljYWxseSB0aGlzIG1heSBoYXBwZW4gZHVyaW5nIGFuIHVwZGF0ZSBmcm9tIHRoZSBtb2RlbCAod3JpdGVWYWx1ZSkgd2hlcmUgc2VuZGluZyBhbiB1cGRhdGUgdG8gdGhlIG1vZGVsIHdvdWxkIGFjdHVhbGx5IGJlIGluY29ycmVjdC5cbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICB0aGlzLnZhbHVlID0gdmFsdWU7XG4gICAgLy8gV2UncmUgcmUtZW50ZXJpbmcgdGhlIEFuZ3VsYXIgem9uZSBvbmx5IGlmIHRoZSB2YWx1ZSBoYXMgYmVlbiBjaGFuZ2VkIHNpbmNlIHRoZXJlJ3MgYSBgcmV0dXJuYCBleHByZXNzaW9uIHByZXZpb3VzbHkuXG4gICAgLy8gVGhpcyB3b24ndCBjYXVzZSBcImRlYWRcIiBjaGFuZ2UgZGV0ZWN0aW9ucyAoYmFzaWNhbGx5IHdoZW4gdGhlIGB0aWNrKClgIGhhcyBiZWVuIHJ1biwgYnV0IHRoZXJlJ3Mgbm90aGluZyB0byB1cGRhdGUpLlxuICAgIHRoaXMubmdab25lLnJ1bigoKSA9PiB7XG4gICAgICB0aGlzLm9uQ2hhbmdlKHZhbHVlKTtcbiAgICB9KTtcbiAgfVxuXG4gIHByaXZhdGUgdXBkYXRlT3B0aW9uVG9Nb25hY28oKTogdm9pZCB7XG4gICAgaWYgKHRoaXMuZWRpdG9ySW5zdGFuY2UpIHtcbiAgICAgIHRoaXMuZWRpdG9ySW5zdGFuY2UudXBkYXRlT3B0aW9ucyh7IC4uLnRoaXMuZWRpdG9yT3B0aW9uQ2FjaGVkIH0pO1xuICAgIH1cbiAgfVxufVxuIl19