import { __decorate } from "tslib";
/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */
import { ChangeDetectionStrategy, Component, EventEmitter, Input, Optional, Output, ViewEncapsulation } from '@angular/core';
import { fromEvent, Subject } from 'rxjs';
import { filter, takeUntil } from 'rxjs/operators';
import { InputBoolean, scrollIntoView } from 'ng-zorro-antd/core/util';
import * as i0 from "@angular/core";
import * as i1 from "./autocomplete-optgroup.component";
export class NzOptionSelectionChange {
    constructor(source, isUserInput = false) {
        this.source = source;
        this.isUserInput = isUserInput;
    }
}
export class NzAutocompleteOptionComponent {
    constructor(ngZone, changeDetectorRef, element, nzAutocompleteOptgroupComponent) {
        this.ngZone = ngZone;
        this.changeDetectorRef = changeDetectorRef;
        this.element = element;
        this.nzAutocompleteOptgroupComponent = nzAutocompleteOptgroupComponent;
        this.nzDisabled = false;
        this.selectionChange = new EventEmitter();
        this.mouseEntered = new EventEmitter();
        this.active = false;
        this.selected = false;
        this.destroy$ = new Subject();
    }
    ngOnInit() {
        this.ngZone.runOutsideAngular(() => {
            fromEvent(this.element.nativeElement, 'mouseenter')
                .pipe(filter(() => this.mouseEntered.observers.length > 0), takeUntil(this.destroy$))
                .subscribe(() => {
                this.ngZone.run(() => this.mouseEntered.emit(this));
            });
            fromEvent(this.element.nativeElement, 'mousedown')
                .pipe(takeUntil(this.destroy$))
                .subscribe(event => event.preventDefault());
        });
    }
    ngOnDestroy() {
        this.destroy$.next();
    }
    select(emit = true) {
        this.selected = true;
        this.changeDetectorRef.markForCheck();
        if (emit) {
            this.emitSelectionChangeEvent();
        }
    }
    deselect() {
        this.selected = false;
        this.changeDetectorRef.markForCheck();
        this.emitSelectionChangeEvent();
    }
    /** Git display label */
    getLabel() {
        return this.nzLabel || this.nzValue.toString();
    }
    /** Set active (only styles) */
    setActiveStyles() {
        if (!this.active) {
            this.active = true;
            this.changeDetectorRef.markForCheck();
        }
    }
    /** Unset active (only styles) */
    setInactiveStyles() {
        if (this.active) {
            this.active = false;
            this.changeDetectorRef.markForCheck();
        }
    }
    scrollIntoViewIfNeeded() {
        scrollIntoView(this.element.nativeElement);
    }
    selectViaInteraction() {
        if (!this.nzDisabled) {
            this.selected = !this.selected;
            if (this.selected) {
                this.setActiveStyles();
            }
            else {
                this.setInactiveStyles();
            }
            this.emitSelectionChangeEvent(true);
            this.changeDetectorRef.markForCheck();
        }
    }
    emitSelectionChangeEvent(isUserInput = false) {
        this.selectionChange.emit(new NzOptionSelectionChange(this, isUserInput));
    }
}
NzAutocompleteOptionComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.1.2", ngImport: i0, type: NzAutocompleteOptionComponent, deps: [{ token: i0.NgZone }, { token: i0.ChangeDetectorRef }, { token: i0.ElementRef }, { token: i1.NzAutocompleteOptgroupComponent, optional: true }], target: i0.ɵɵFactoryTarget.Component });
NzAutocompleteOptionComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "13.1.2", type: NzAutocompleteOptionComponent, selector: "nz-auto-option", inputs: { nzValue: "nzValue", nzLabel: "nzLabel", nzDisabled: "nzDisabled" }, outputs: { selectionChange: "selectionChange", mouseEntered: "mouseEntered" }, host: { attributes: { "role": "menuitem" }, listeners: { "click": "selectViaInteraction()" }, properties: { "class.ant-select-item-option-grouped": "nzAutocompleteOptgroupComponent", "class.ant-select-item-option-selected": "selected", "class.ant-select-item-option-active": "active", "class.ant-select-item-option-disabled": "nzDisabled", "attr.aria-selected": "selected.toString()", "attr.aria-disabled": "nzDisabled.toString()" }, classAttribute: "ant-select-item ant-select-item-option" }, exportAs: ["nzAutoOption"], ngImport: i0, template: `
    <div class="ant-select-item-option-content">
      <ng-content></ng-content>
    </div>
  `, isInline: true, changeDetection: i0.ChangeDetectionStrategy.OnPush, encapsulation: i0.ViewEncapsulation.None });
__decorate([
    InputBoolean()
], NzAutocompleteOptionComponent.prototype, "nzDisabled", void 0);
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.1.2", ngImport: i0, type: NzAutocompleteOptionComponent, decorators: [{
            type: Component,
            args: [{
                    selector: 'nz-auto-option',
                    exportAs: 'nzAutoOption',
                    preserveWhitespaces: false,
                    changeDetection: ChangeDetectionStrategy.OnPush,
                    encapsulation: ViewEncapsulation.None,
                    template: `
    <div class="ant-select-item-option-content">
      <ng-content></ng-content>
    </div>
  `,
                    host: {
                        role: 'menuitem',
                        class: 'ant-select-item ant-select-item-option',
                        '[class.ant-select-item-option-grouped]': 'nzAutocompleteOptgroupComponent',
                        '[class.ant-select-item-option-selected]': 'selected',
                        '[class.ant-select-item-option-active]': 'active',
                        '[class.ant-select-item-option-disabled]': 'nzDisabled',
                        '[attr.aria-selected]': 'selected.toString()',
                        '[attr.aria-disabled]': 'nzDisabled.toString()',
                        '(click)': 'selectViaInteraction()'
                    }
                }]
        }], ctorParameters: function () { return [{ type: i0.NgZone }, { type: i0.ChangeDetectorRef }, { type: i0.ElementRef }, { type: i1.NzAutocompleteOptgroupComponent, decorators: [{
                    type: Optional
                }] }]; }, propDecorators: { nzValue: [{
                type: Input
            }], nzLabel: [{
                type: Input
            }], nzDisabled: [{
                type: Input
            }], selectionChange: [{
                type: Output
            }], mouseEntered: [{
                type: Output
            }] } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXV0b2NvbXBsZXRlLW9wdGlvbi5jb21wb25lbnQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9jb21wb25lbnRzL2F1dG8tY29tcGxldGUvYXV0b2NvbXBsZXRlLW9wdGlvbi5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBOzs7R0FHRztBQUVILE9BQU8sRUFDTCx1QkFBdUIsRUFFdkIsU0FBUyxFQUVULFlBQVksRUFDWixLQUFLLEVBSUwsUUFBUSxFQUNSLE1BQU0sRUFDTixpQkFBaUIsRUFDbEIsTUFBTSxlQUFlLENBQUM7QUFDdkIsT0FBTyxFQUFFLFNBQVMsRUFBRSxPQUFPLEVBQUUsTUFBTSxNQUFNLENBQUM7QUFDMUMsT0FBTyxFQUFFLE1BQU0sRUFBRSxTQUFTLEVBQUUsTUFBTSxnQkFBZ0IsQ0FBQztBQUduRCxPQUFPLEVBQUUsWUFBWSxFQUFFLGNBQWMsRUFBRSxNQUFNLHlCQUF5QixDQUFDOzs7QUFJdkUsTUFBTSxPQUFPLHVCQUF1QjtJQUNsQyxZQUFtQixNQUFxQyxFQUFTLGNBQXVCLEtBQUs7UUFBMUUsV0FBTSxHQUFOLE1BQU0sQ0FBK0I7UUFBUyxnQkFBVyxHQUFYLFdBQVcsQ0FBaUI7SUFBRyxDQUFDO0NBQ2xHO0FBeUJELE1BQU0sT0FBTyw2QkFBNkI7SUFjeEMsWUFDVSxNQUFjLEVBQ2QsaUJBQW9DLEVBQ3BDLE9BQWdDLEVBRWpDLCtCQUFnRTtRQUovRCxXQUFNLEdBQU4sTUFBTSxDQUFRO1FBQ2Qsc0JBQWlCLEdBQWpCLGlCQUFpQixDQUFtQjtRQUNwQyxZQUFPLEdBQVAsT0FBTyxDQUF5QjtRQUVqQyxvQ0FBK0IsR0FBL0IsK0JBQStCLENBQWlDO1FBZGhELGVBQVUsR0FBRyxLQUFLLENBQUM7UUFDekIsb0JBQWUsR0FBRyxJQUFJLFlBQVksRUFBMkIsQ0FBQztRQUM5RCxpQkFBWSxHQUFHLElBQUksWUFBWSxFQUFpQyxDQUFDO1FBRXBGLFdBQU0sR0FBRyxLQUFLLENBQUM7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LEVBQUUsQ0FBQztTQUN2QztJQUNILENBQUM7SUFFTyx3QkFBd0IsQ0FBQyxjQUF1QixLQUFLO1FBQzNELElBQUksQ0FBQyxlQUFlLENBQUMsSUFBSSxDQUFDLElBQUksdUJBQXVCLENBQUMsSUFBSSxFQUFFLFdBQVcsQ0FBQyxDQUFDLENBQUM7SUFDNUUsQ0FBQzs7MEhBakdVLDZCQUE2Qjs4R0FBN0IsNkJBQTZCLDZ0QkFqQjlCOzs7O0dBSVQ7QUFrQndCO0lBQWYsWUFBWSxFQUFFO2lFQUFvQjsyRkFMakMsNkJBQTZCO2tCQXZCekMsU0FBUzttQkFBQztvQkFDVCxRQUFRLEVBQUUsZ0JBQWdCO29CQUMxQixRQUFRLEVBQUUsY0FBYztvQkFDeEIsbUJBQW1CLEVBQUUsS0FBSztvQkFDMUIsZUFBZSxFQUFFLHVCQUF1QixDQUFDLE1BQU07b0JBQy9DLGFBQWEsRUFBRSxpQkFBaUIsQ0FBQyxJQUFJO29CQUNyQyxRQUFRLEVBQUU7Ozs7R0FJVDtvQkFDRCxJQUFJLEVBQUU7d0JBQ0osSUFBSSxFQUFFLFVBQVU7d0JBQ2hCLEtBQUssRUFBRSx3Q0FBd0M7d0JBQy9DLHdDQUF3QyxFQUFFLGlDQUFpQzt3QkFDM0UseUNBQXlDLEVBQUUsVUFBVTt3QkFDckQsdUNBQXVDLEVBQUUsUUFBUTt3QkFDakQseUNBQXlDLEVBQUUsWUFBWTt3QkFDdkQsc0JBQXNCLEVBQUUscUJBQXFCO3dCQUM3QyxzQkFBc0IsRUFBRSx1QkFBdUI7d0JBQy9DLFNBQVMsRUFBRSx3QkFBd0I7cUJBQ3BDO2lCQUNGOzswQkFtQkksUUFBUTs0Q0FmRixPQUFPO3NCQUFmLEtBQUs7Z0JBQ0csT0FBTztzQkFBZixLQUFLO2dCQUNtQixVQUFVO3NCQUFsQyxLQUFLO2dCQUNhLGVBQWU7c0JBQWpDLE1BQU07Z0JBQ1ksWUFBWTtzQkFBOUIsTUFBTSIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxuICogVXNlIG9mIHRoaXMgc291cmNlIGNvZGUgaXMgZ292ZXJuZWQgYnkgYW4gTUlULXN0eWxlIGxpY2Vuc2UgdGhhdCBjYW4gYmVcbiAqIGZvdW5kIGluIHRoZSBMSUNFTlNFIGZpbGUgYXQgaHR0cHM6Ly9naXRodWIuY29tL05HLVpPUlJPL25nLXpvcnJvLWFudGQvYmxvYi9tYXN0ZXIvTElDRU5TRVxuICovXG5cbmltcG9ydCB7XG4gIENoYW5nZURldGVjdGlvblN0cmF0ZWd5LFxuICBDaGFuZ2VEZXRlY3RvclJlZixcbiAgQ29tcG9uZW50LFxuICBFbGVtZW50UmVmLFxuICBFdmVudEVtaXR0ZXIsXG4gIElucHV0LFxuICBOZ1pvbmUsXG4gIE9uRGVzdHJveSxcbiAgT25Jbml0LFxuICBPcHRpb25hbCxcbiAgT3V0cHV0LFxuICBWaWV3RW5jYXBzdWxhdGlvblxufSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IGZyb21FdmVudCwgU3ViamVjdCB9IGZyb20gJ3J4anMnO1xuaW1wb3J0IHsgZmlsdGVyLCB0YWtlVW50aWwgfSBmcm9tICdyeGpzL29wZXJhdG9ycyc7XG5cbmltcG9ydCB7IEJvb2xlYW5JbnB1dCwgTnpTYWZlQW55IH0gZnJvbSAnbmctem9ycm8tYW50ZC9jb3JlL3R5cGVzJztcbmltcG9ydCB7IElucHV0Qm9vbGVhbiwgc2Nyb2xsSW50b1ZpZXcgfSBmcm9tICduZy16b3Jyby1hbnRkL2NvcmUvdXRpbCc7XG5cbmltcG9ydCB7IE56QXV0b2NvbXBsZXRlT3B0Z3JvdXBDb21wb25lbnQgfSBmcm9tICcuL2F1dG9jb21wbGV0ZS1vcHRncm91cC5jb21wb25lbnQnO1xuXG5leHBvcnQgY2xhc3MgTnpPcHRpb25TZWxlY3Rpb25DaGFuZ2Uge1xuICBjb25zdHJ1Y3RvcihwdWJsaWMgc291cmNlOiBOekF1dG9jb21wbGV0ZU9wdGlvbkNvbXBvbmVudCwgcHVibGljIGlzVXNlcklucHV0OiBib29sZWFuID0gZmFsc2UpIHt9XG59XG5cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogJ256LWF1dG8tb3B0aW9uJyxcbiAgZXhwb3J0QXM6ICduekF1dG9PcHRpb24nLFxuICBwcmVzZXJ2ZVdoaXRlc3BhY2VzOiBmYWxzZSxcbiAgY2hhbmdlRGV0ZWN0aW9uOiBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneS5PblB1c2gsXG4gIGVuY2Fwc3VsYXRpb246IFZpZXdFbmNhcHN1bGF0aW9uLk5vbmUsXG4gIHRlbXBsYXRlOiBgXG4gICAgPGRpdiBjbGFzcz1cImFudC1zZWxlY3QtaXRlbS1vcHRpb24tY29udGVudFwiPlxuICAgICAgPG5nLWNvbnRlbnQ+PC9uZy1jb250ZW50PlxuICAgIDwvZGl2PlxuICBgLFxuICBob3N0OiB7XG4gICAgcm9sZTogJ21lbnVpdGVtJyxcbiAgICBjbGFzczogJ2FudC1zZWxlY3QtaXRlbSBhbnQtc2VsZWN0LWl0ZW0tb3B0aW9uJyxcbiAgICAnW2NsYXNzLmFudC1zZWxlY3QtaXRlbS1vcHRpb24tZ3JvdXBlZF0nOiAnbnpBdXRvY29tcGxldGVPcHRncm91cENvbXBvbmVudCcsXG4gICAgJ1tjbGFzcy5hbnQtc2VsZWN0LWl0ZW0tb3B0aW9uLXNlbGVjdGVkXSc6ICdzZWxlY3RlZCcsXG4gICAgJ1tjbGFzcy5hbnQtc2VsZWN0LWl0ZW0tb3B0aW9uLWFjdGl2ZV0nOiAnYWN0aXZlJyxcbiAgICAnW2NsYXNzLmFudC1zZWxlY3QtaXRlbS1vcHRpb24tZGlzYWJsZWRdJzogJ256RGlzYWJsZWQnLFxuICAgICdbYXR0ci5hcmlhLXNlbGVjdGVkXSc6ICdzZWxlY3RlZC50b1N0cmluZygpJyxcbiAgICAnW2F0dHIuYXJpYS1kaXNhYmxlZF0nOiAnbnpEaXNhYmxlZC50b1N0cmluZygpJyxcbiAgICAnKGNsaWNrKSc6ICdzZWxlY3RWaWFJbnRlcmFjdGlvbigpJ1xuICB9XG59KVxuZXhwb3J0IGNsYXNzIE56QXV0b2NvbXBsZXRlT3B0aW9uQ29tcG9uZW50IGltcGxlbWVudHMgT25Jbml0LCBPbkRlc3Ryb3kge1xuICBzdGF0aWMgbmdBY2NlcHRJbnB1dFR5cGVfbnpEaXNhYmxlZDogQm9vbGVhbklucHV0O1xuXG4gIEBJbnB1dCgpIG56VmFsdWU6IE56U2FmZUFueTtcbiAgQElucHV0KCkgbnpMYWJlbD86IHN0cmluZztcbiAgQElucHV0KCkgQElucHV0Qm9vbGVhbigpIG56RGlzYWJsZWQgPSBmYWxzZTtcbiAgQE91dHB1dCgpIHJlYWRvbmx5IHNlbGVjdGlvbkNoYW5nZSA9IG5ldyBFdmVudEVtaXR0ZXI8TnpPcHRpb25TZWxlY3Rpb25DaGFuZ2U+KCk7XG4gIEBPdXRwdXQoKSByZWFkb25seSBtb3VzZUVudGVyZWQgPSBuZXcgRXZlbnRFbWl0dGVyPE56QXV0b2NvbXBsZXRlT3B0aW9uQ29tcG9uZW50PigpO1xuXG4gIGFjdGl2ZSA9IGZhbHNlO1xuICBzZWxlY3RlZCA9IGZhbHNlO1xuXG4gIHByaXZhdGUgZGVzdHJveSQgPSBuZXcgU3ViamVjdDx2b2lkPigpO1xuXG4gIGNvbnN0cnVjdG9yKFxuICAgIHByaXZhdGUgbmdab25lOiBOZ1pvbmUsXG4gICAgcHJpdmF0ZSBjaGFuZ2VEZXRlY3RvclJlZjogQ2hhbmdlRGV0ZWN0b3JSZWYsXG4gICAgcHJpdmF0ZSBlbGVtZW50OiBFbGVtZW50UmVmPEhUTUxFbGVtZW50PixcbiAgICBAT3B0aW9uYWwoKVxuICAgIHB1YmxpYyBuekF1dG9jb21wbGV0ZU9wdGdyb3VwQ29tcG9uZW50OiBOekF1dG9jb21wbGV0ZU9wdGdyb3VwQ29tcG9uZW50XG4gICkge31cblxuICBuZ09uSW5pdCgpOiB2b2lkIHtcbiAgICB0aGlzLm5nWm9uZS5ydW5PdXRzaWRlQW5ndWxhcigoKSA9PiB7XG4gICAgICBmcm9tRXZlbnQodGhpcy5lbGVtZW50Lm5hdGl2ZUVsZW1lbnQsICdtb3VzZWVudGVyJylcbiAgICAgICAgLnBpcGUoXG4gICAgICAgICAgZmlsdGVyKCgpID0+IHRoaXMubW91c2VFbnRlcmVkLm9ic2VydmVycy5sZW5ndGggPiAwKSxcbiAgICAgICAgICB0YWtlVW50aWwodGhpcy5kZXN0cm95JClcbiAgICAgICAgKVxuICAgICAgICAuc3Vic2NyaWJlKCgpID0+IHtcbiAgICAgICAgICB0aGlzLm5nWm9uZS5ydW4oKCkgPT4gdGhpcy5tb3VzZUVudGVyZWQuZW1pdCh0aGlzKSk7XG4gICAgICAgIH0pO1xuXG4gICAgICBmcm9tRXZlbnQodGhpcy5lbGVtZW50Lm5hdGl2ZUVsZW1lbnQsICdtb3VzZWRvd24nKVxuICAgICAgICAucGlwZSh0YWtlVW50aWwodGhpcy5kZXN0cm95JCkpXG4gICAgICAgIC5zdWJzY3JpYmUoZXZlbnQgPT4gZXZlbnQucHJldmVudERlZmF1bHQoKSk7XG4gICAgfSk7XG4gIH1cblxuICBuZ09uRGVzdHJveSgpOiB2b2lkIHtcbiAgICB0aGlzLmRlc3Ryb3kkLm5leHQoKTtcbiAgfVxuXG4gIHNlbGVjdChlbWl0OiBib29sZWFuID0gdHJ1ZSk6IHZvaWQge1xuICAgIHRoaXMuc2VsZWN0ZWQgPSB0cnVlO1xuICAgIHRoaXMuY2hhbmdlRGV0ZWN0b3JSZWYubWFya0ZvckNoZWNrKCk7XG4gICAgaWYgKGVtaXQpIHtcbiAgICAgIHRoaXMuZW1pdFNlbGVjdGlvbkNoYW5nZUV2ZW50KCk7XG4gICAgfVxuICB9XG5cbiAgZGVzZWxlY3QoKTogdm9pZCB7XG4gICAgdGhpcy5zZWxlY3RlZCA9IGZhbHNlO1xuICAgIHRoaXMuY2hhbmdlRGV0ZWN0b3JSZWYubWFya0ZvckNoZWNrKCk7XG4gICAgdGhpcy5lbWl0U2VsZWN0aW9uQ2hhbmdlRXZlbnQoKTtcbiAgfVxuXG4gIC8qKiBHaXQgZGlzcGxheSBsYWJlbCAqL1xuICBnZXRMYWJlbCgpOiBzdHJpbmcge1xuICAgIHJldHVybiB0aGlzLm56TGFiZWwgfHwgdGhpcy5uelZhbHVlLnRvU3RyaW5nKCk7XG4gIH1cblxuICAvKiogU2V0IGFjdGl2ZSAob25seSBzdHlsZXMpICovXG4gIHNldEFjdGl2ZVN0eWxlcygpOiB2b2lkIHtcbiAgICBpZiAoIXRoaXMuYWN0aXZlKSB7XG4gICAgICB0aGlzLmFjdGl2ZSA9IHRydWU7XG4gICAgICB0aGlzLmNoYW5nZURldGVjdG9yUmVmLm1hcmtGb3JDaGVjaygpO1xuICAgIH1cbiAgfVxuXG4gIC8qKiBVbnNldCBhY3RpdmUgKG9ubHkgc3R5bGVzKSAqL1xuICBzZXRJbmFjdGl2ZVN0eWxlcygpOiB2b2lkIHtcbiAgICBpZiAodGhpcy5hY3RpdmUpIHtcbiAgICAgIHRoaXMuYWN0aXZlID0gZmFsc2U7XG4gICAgICB0aGlzLmNoYW5nZURldGVjdG9yUmVmLm1hcmtGb3JDaGVjaygpO1xuICAgIH1cbiAgfVxuXG4gIHNjcm9sbEludG9WaWV3SWZOZWVkZWQoKTogdm9pZCB7XG4gICAgc2Nyb2xsSW50b1ZpZXcodGhpcy5lbGVtZW50Lm5hdGl2ZUVsZW1lbnQpO1xuICB9XG5cbiAgc2VsZWN0VmlhSW50ZXJhY3Rpb24oKTogdm9pZCB7XG4gICAgaWYgKCF0aGlzLm56RGlzYWJsZWQpIHtcbiAgICAgIHRoaXMuc2VsZWN0ZWQgPSAhdGhpcy5zZWxlY3RlZDtcbiAgICAgIGlmICh0aGlzLnNlbGVjdGVkKSB7XG4gICAgICAgIHRoaXMuc2V0QWN0aXZlU3R5bGVzKCk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICB0aGlzLnNldEluYWN0aXZlU3R5bGVzKCk7XG4gICAgICB9XG4gICAgICB0aGlzLmVtaXRTZWxlY3Rpb25DaGFuZ2VFdmVudCh0cnVlKTtcbiAgICAgIHRoaXMuY2hhbmdlRGV0ZWN0b3JSZWYubWFya0ZvckNoZWNrKCk7XG4gICAgfVxuICB9XG5cbiAgcHJpdmF0ZSBlbWl0U2VsZWN0aW9uQ2hhbmdlRXZlbnQoaXNVc2VySW5wdXQ6IGJvb2xlYW4gPSBmYWxzZSk6IHZvaWQge1xuICAgIHRoaXMuc2VsZWN0aW9uQ2hhbmdlLmVtaXQobmV3IE56T3B0aW9uU2VsZWN0aW9uQ2hhbmdlKHRoaXMsIGlzVXNlcklucHV0KSk7XG4gIH1cbn1cbiJdfQ==