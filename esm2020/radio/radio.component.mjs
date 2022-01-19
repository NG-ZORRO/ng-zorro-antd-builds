import { __decorate } from "tslib";
import { ChangeDetectionStrategy, Component, forwardRef, Input, Optional, ViewChild, ViewEncapsulation } from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
import { fromEvent, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { InputBoolean } from 'ng-zorro-antd/core/util';
import * as i0 from "@angular/core";
import * as i1 from "@angular/cdk/a11y";
import * as i2 from "@angular/cdk/bidi";
import * as i3 from "./radio.service";
import * as i4 from "./radio-button.directive";
export class NzRadioComponent {
    constructor(ngZone, elementRef, cdr, focusMonitor, directionality, nzRadioService, nzRadioButtonDirective) {
        this.ngZone = ngZone;
        this.elementRef = elementRef;
        this.cdr = cdr;
        this.focusMonitor = focusMonitor;
        this.directionality = directionality;
        this.nzRadioService = nzRadioService;
        this.nzRadioButtonDirective = nzRadioButtonDirective;
        this.isNgModel = false;
        this.destroy$ = new Subject();
        this.isChecked = false;
        this.name = null;
        this.isRadioButton = !!this.nzRadioButtonDirective;
        this.onChange = () => { };
        this.onTouched = () => { };
        this.nzValue = null;
        this.nzDisabled = false;
        this.nzAutoFocus = false;
        this.dir = 'ltr';
    }
    focus() {
        this.focusMonitor.focusVia(this.inputElement, 'keyboard');
    }
    blur() {
        this.inputElement.nativeElement.blur();
    }
    setDisabledState(disabled) {
        this.nzDisabled = disabled;
        this.cdr.markForCheck();
    }
    writeValue(value) {
        this.isChecked = value;
        this.cdr.markForCheck();
    }
    registerOnChange(fn) {
        this.isNgModel = true;
        this.onChange = fn;
    }
    registerOnTouched(fn) {
        this.onTouched = fn;
    }
    ngOnInit() {
        if (this.nzRadioService) {
            this.nzRadioService.name$.pipe(takeUntil(this.destroy$)).subscribe(name => {
                this.name = name;
                this.cdr.markForCheck();
            });
            this.nzRadioService.disabled$.pipe(takeUntil(this.destroy$)).subscribe(disabled => {
                this.nzDisabled = disabled;
                this.cdr.markForCheck();
            });
            this.nzRadioService.selected$.pipe(takeUntil(this.destroy$)).subscribe(value => {
                this.isChecked = this.nzValue === value;
                this.cdr.markForCheck();
            });
        }
        this.focusMonitor
            .monitor(this.elementRef, true)
            .pipe(takeUntil(this.destroy$))
            .subscribe(focusOrigin => {
            if (!focusOrigin) {
                Promise.resolve().then(() => this.onTouched());
                if (this.nzRadioService) {
                    this.nzRadioService.touch();
                }
            }
        });
        this.directionality.change.pipe(takeUntil(this.destroy$)).subscribe((direction) => {
            this.dir = direction;
            this.cdr.detectChanges();
        });
        this.dir = this.directionality.value;
        this.setupClickListener();
    }
    ngAfterViewInit() {
        if (this.nzAutoFocus) {
            this.focus();
        }
    }
    ngOnDestroy() {
        this.destroy$.next();
        this.destroy$.complete();
        this.focusMonitor.stopMonitoring(this.elementRef);
    }
    setupClickListener() {
        this.ngZone.runOutsideAngular(() => {
            fromEvent(this.elementRef.nativeElement, 'click')
                .pipe(takeUntil(this.destroy$))
                .subscribe(event => {
                /** prevent label click triggered twice. **/
                event.stopPropagation();
                event.preventDefault();
                if (this.nzDisabled || this.isChecked) {
                    return;
                }
                this.ngZone.run(() => {
                    if (this.nzRadioService) {
                        this.nzRadioService.select(this.nzValue);
                    }
                    if (this.isNgModel) {
                        this.isChecked = true;
                        this.onChange(true);
                    }
                    this.cdr.markForCheck();
                });
            });
        });
    }
}
NzRadioComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.1.2", ngImport: i0, type: NzRadioComponent, deps: [{ token: i0.NgZone }, { token: i0.ElementRef }, { token: i0.ChangeDetectorRef }, { token: i1.FocusMonitor }, { token: i2.Directionality, optional: true }, { token: i3.NzRadioService, optional: true }, { token: i4.NzRadioButtonDirective, optional: true }], target: i0.ɵɵFactoryTarget.Component });
NzRadioComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "13.1.2", type: NzRadioComponent, selector: "[nz-radio],[nz-radio-button]", inputs: { nzValue: "nzValue", nzDisabled: "nzDisabled", nzAutoFocus: "nzAutoFocus" }, host: { properties: { "class.ant-radio-wrapper": "!isRadioButton", "class.ant-radio-button-wrapper": "isRadioButton", "class.ant-radio-wrapper-checked": "isChecked && !isRadioButton", "class.ant-radio-button-wrapper-checked": "isChecked && isRadioButton", "class.ant-radio-wrapper-disabled": "nzDisabled && !isRadioButton", "class.ant-radio-button-wrapper-disabled": "nzDisabled && isRadioButton", "class.ant-radio-wrapper-rtl": "!isRadioButton && dir === 'rtl'", "class.ant-radio-button-wrapper-rtl": "isRadioButton && dir === 'rtl'" } }, providers: [
        {
            provide: NG_VALUE_ACCESSOR,
            useExisting: forwardRef(() => NzRadioComponent),
            multi: true
        }
    ], viewQueries: [{ propertyName: "inputElement", first: true, predicate: ["inputElement"], descendants: true }], exportAs: ["nzRadio"], ngImport: i0, template: `
    <span
      [class.ant-radio]="!isRadioButton"
      [class.ant-radio-checked]="isChecked && !isRadioButton"
      [class.ant-radio-disabled]="nzDisabled && !isRadioButton"
      [class.ant-radio-button]="isRadioButton"
      [class.ant-radio-button-checked]="isChecked && isRadioButton"
      [class.ant-radio-button-disabled]="nzDisabled && isRadioButton"
    >
      <input
        #inputElement
        type="radio"
        [attr.autofocus]="nzAutoFocus ? 'autofocus' : null"
        [class.ant-radio-input]="!isRadioButton"
        [class.ant-radio-button-input]="isRadioButton"
        [disabled]="nzDisabled"
        [checked]="isChecked"
        [attr.name]="name"
      />
      <span [class.ant-radio-inner]="!isRadioButton" [class.ant-radio-button-inner]="isRadioButton"></span>
    </span>
    <span><ng-content></ng-content></span>
  `, isInline: true, changeDetection: i0.ChangeDetectionStrategy.OnPush, encapsulation: i0.ViewEncapsulation.None });
__decorate([
    InputBoolean()
], NzRadioComponent.prototype, "nzDisabled", void 0);
__decorate([
    InputBoolean()
], NzRadioComponent.prototype, "nzAutoFocus", void 0);
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.1.2", ngImport: i0, type: NzRadioComponent, decorators: [{
            type: Component,
            args: [{
                    selector: '[nz-radio],[nz-radio-button]',
                    exportAs: 'nzRadio',
                    preserveWhitespaces: false,
                    template: `
    <span
      [class.ant-radio]="!isRadioButton"
      [class.ant-radio-checked]="isChecked && !isRadioButton"
      [class.ant-radio-disabled]="nzDisabled && !isRadioButton"
      [class.ant-radio-button]="isRadioButton"
      [class.ant-radio-button-checked]="isChecked && isRadioButton"
      [class.ant-radio-button-disabled]="nzDisabled && isRadioButton"
    >
      <input
        #inputElement
        type="radio"
        [attr.autofocus]="nzAutoFocus ? 'autofocus' : null"
        [class.ant-radio-input]="!isRadioButton"
        [class.ant-radio-button-input]="isRadioButton"
        [disabled]="nzDisabled"
        [checked]="isChecked"
        [attr.name]="name"
      />
      <span [class.ant-radio-inner]="!isRadioButton" [class.ant-radio-button-inner]="isRadioButton"></span>
    </span>
    <span><ng-content></ng-content></span>
  `,
                    encapsulation: ViewEncapsulation.None,
                    changeDetection: ChangeDetectionStrategy.OnPush,
                    providers: [
                        {
                            provide: NG_VALUE_ACCESSOR,
                            useExisting: forwardRef(() => NzRadioComponent),
                            multi: true
                        }
                    ],
                    host: {
                        '[class.ant-radio-wrapper]': '!isRadioButton',
                        '[class.ant-radio-button-wrapper]': 'isRadioButton',
                        '[class.ant-radio-wrapper-checked]': 'isChecked && !isRadioButton',
                        '[class.ant-radio-button-wrapper-checked]': 'isChecked && isRadioButton',
                        '[class.ant-radio-wrapper-disabled]': 'nzDisabled && !isRadioButton',
                        '[class.ant-radio-button-wrapper-disabled]': 'nzDisabled && isRadioButton',
                        '[class.ant-radio-wrapper-rtl]': `!isRadioButton && dir === 'rtl'`,
                        '[class.ant-radio-button-wrapper-rtl]': `isRadioButton && dir === 'rtl'`
                    }
                }]
        }], ctorParameters: function () { return [{ type: i0.NgZone }, { type: i0.ElementRef }, { type: i0.ChangeDetectorRef }, { type: i1.FocusMonitor }, { type: i2.Directionality, decorators: [{
                    type: Optional
                }] }, { type: i3.NzRadioService, decorators: [{
                    type: Optional
                }] }, { type: i4.NzRadioButtonDirective, decorators: [{
                    type: Optional
                }] }]; }, propDecorators: { inputElement: [{
                type: ViewChild,
                args: ['inputElement', { static: false }]
            }], nzValue: [{
                type: Input
            }], nzDisabled: [{
                type: Input
            }], nzAutoFocus: [{
                type: Input
            }] } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicmFkaW8uY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vY29tcG9uZW50cy9yYWRpby9yYWRpby5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQU9BLE9BQU8sRUFFTCx1QkFBdUIsRUFFdkIsU0FBUyxFQUVULFVBQVUsRUFDVixLQUFLLEVBSUwsUUFBUSxFQUNSLFNBQVMsRUFDVCxpQkFBaUIsRUFDbEIsTUFBTSxlQUFlLENBQUM7QUFDdkIsT0FBTyxFQUF3QixpQkFBaUIsRUFBRSxNQUFNLGdCQUFnQixDQUFDO0FBQ3pFLE9BQU8sRUFBRSxTQUFTLEVBQUUsT0FBTyxFQUFFLE1BQU0sTUFBTSxDQUFDO0FBQzFDLE9BQU8sRUFBRSxTQUFTLEVBQUUsTUFBTSxnQkFBZ0IsQ0FBQztBQUczQyxPQUFPLEVBQUUsWUFBWSxFQUFFLE1BQU0seUJBQXlCLENBQUM7Ozs7OztBQW9EdkQsTUFBTSxPQUFPLGdCQUFnQjtJQTBCM0IsWUFDVSxNQUFjLEVBQ2QsVUFBc0IsRUFDdEIsR0FBc0IsRUFDdEIsWUFBMEIsRUFDZCxjQUE4QixFQUM5QixjQUE4QixFQUM5QixzQkFBOEM7UUFOMUQsV0FBTSxHQUFOLE1BQU0sQ0FBUTtRQUNkLGVBQVUsR0FBVixVQUFVLENBQVk7UUFDdEIsUUFBRyxHQUFILEdBQUcsQ0FBbUI7UUFDdEIsaUJBQVksR0FBWixZQUFZLENBQWM7UUFDZCxtQkFBYyxHQUFkLGNBQWMsQ0FBZ0I7UUFDOUIsbUJBQWMsR0FBZCxjQUFjLENBQWdCO1FBQzlCLDJCQUFzQixHQUF0QixzQkFBc0IsQ0FBd0I7UUE3QjVELGNBQVMsR0FBRyxLQUFLLENBQUM7UUFDbEIsYUFBUSxHQUFHLElBQUksT0FBTyxFQUFRLENBQUM7UUFDdkMsY0FBUyxHQUFHLEtBQUssQ0FBQztRQUNsQixTQUFJLEdBQWtCLElBQUksQ0FBQztRQUMzQixrQkFBYSxHQUFHLENBQUMsQ0FBQyxJQUFJLENBQUMsc0JBQXNCLENB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QUFFLGlCQUFpQjs0QkFDMUIsV0FBVyxFQUFFLFVBQVUsQ0FBQyxHQUFHLEVBQUUsaUJBQWlCLENBQUM7NEJBQy9DLEtBQUssRUFBRSxJQUFJO3lCQUNaO3FCQUNGO29CQUNELElBQUksRUFBRTt3QkFDSiwyQkFBMkIsRUFBRSxnQkFBZ0I7d0JBQzdDLGtDQUFrQyxFQUFFLGVBQWU7d0JBQ25ELG1DQUFtQyxFQUFFLDZCQUE2Qjt3QkFDbEUsMENBQTBDLEVBQUUsNEJBQTRCO3dCQUN4RSxvQ0FBb0MsRUFBRSw4QkFBOEI7d0JBQ3BFLDJDQUEyQyxFQUFFLDZCQUE2Qjt3QkFDMUUsK0JBQStCLEVBQUUsaUNBQWlDO3dCQUNsRSxzQ0FBc0MsRUFBRSxnQ0FBZ0M7cUJBQ3pFO2lCQUNGOzswQkFnQ0ksUUFBUTs7MEJBQ1IsUUFBUTs7MEJBQ1IsUUFBUTs0Q0F0Qm1DLFlBQVk7c0JBQXpELFNBQVM7dUJBQUMsY0FBYyxFQUFFLEVBQUUsTUFBTSxFQUFFLEtBQUssRUFBRTtnQkFDbkMsT0FBTztzQkFBZixLQUFLO2dCQUNtQixVQUFVO3NCQUFsQyxLQUFLO2dCQUNtQixXQUFXO3NCQUFuQyxLQUFLIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKiBVc2Ugb2YgdGhpcyBzb3VyY2UgY29kZSBpcyBnb3Zlcm5lZCBieSBhbiBNSVQtc3R5bGUgbGljZW5zZSB0aGF0IGNhbiBiZVxuICogZm91bmQgaW4gdGhlIExJQ0VOU0UgZmlsZSBhdCBodHRwczovL2dpdGh1Yi5jb20vTkctWk9SUk8vbmctem9ycm8tYW50ZC9ibG9iL21hc3Rlci9MSUNFTlNFXG4gKi9cblxuaW1wb3J0IHsgRm9jdXNNb25pdG9yIH0gZnJvbSAnQGFuZ3VsYXIvY2RrL2ExMXknO1xuaW1wb3J0IHsgRGlyZWN0aW9uLCBEaXJlY3Rpb25hbGl0eSB9IGZyb20gJ0Bhbmd1bGFyL2Nkay9iaWRpJztcbmltcG9ydCB7XG4gIEFmdGVyVmlld0luaXQsXG4gIENoYW5nZURldGVjdGlvblN0cmF0ZWd5LFxuICBDaGFuZ2VEZXRlY3RvclJlZixcbiAgQ29tcG9uZW50LFxuICBFbGVtZW50UmVmLFxuICBmb3J3YXJkUmVmLFxuICBJbnB1dCxcbiAgTmdab25lLFxuICBPbkRlc3Ryb3ksXG4gIE9uSW5pdCxcbiAgT3B0aW9uYWwsXG4gIFZpZXdDaGlsZCxcbiAgVmlld0VuY2Fwc3VsYXRpb25cbn0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBDb250cm9sVmFsdWVBY2Nlc3NvciwgTkdfVkFMVUVfQUNDRVNTT1IgfSBmcm9tICdAYW5ndWxhci9mb3Jtcyc7XG5pbXBvcnQgeyBmcm9tRXZlbnQsIFN1YmplY3QgfSBmcm9tICdyeGpzJztcbmltcG9ydCB7IHRha2VVbnRpbCB9IGZyb20gJ3J4anMvb3BlcmF0b3JzJztcblxuaW1wb3J0IHsgQm9vbGVhbklucHV0LCBOelNhZmVBbnksIE9uQ2hhbmdlVHlwZSwgT25Ub3VjaGVkVHlwZSB9IGZyb20gJ25nLXpvcnJvLWFudGQvY29yZS90eXBlcyc7XG5pbXBvcnQgeyBJbnB1dEJvb2xlYW4gfSBmcm9tICduZy16b3Jyby1hbnRkL2NvcmUvdXRpbCc7XG5cbmltcG9ydCB7IE56UmFkaW9CdXR0b25EaXJlY3RpdmUgfSBmcm9tICcuL3JhZGlvLWJ1dHRvbi5kaXJlY3RpdmUnO1xuaW1wb3J0IHsgTnpSYWRpb1NlcnZpY2UgfSBmcm9tICcuL3JhZGlvLnNlcnZpY2UnO1xuXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICdbbnotcmFkaW9dLFtuei1yYWRpby1idXR0b25dJyxcbiAgZXhwb3J0QXM6ICduelJhZGlvJyxcbiAgcHJlc2VydmVXaGl0ZXNwYWNlczogZmFsc2UsXG4gIHRlbXBsYXRlOiBgXG4gICAgPHNwYW5cbiAgICAgIFtjbGFzcy5hbnQtcmFkaW9dPVwiIWlzUmFkaW9CdXR0b25cIlxuICAgICAgW2NsYXNzLmFudC1yYWRpby1jaGVja2VkXT1cImlzQ2hlY2tlZCAmJiAhaXNSYWRpb0J1dHRvblwiXG4gICAgICBbY2xhc3MuYW50LXJhZGlvLWRpc2FibGVkXT1cIm56RGlzYWJsZWQgJiYgIWlzUmFkaW9CdXR0b25cIlxuICAgICAgW2NsYXNzLmFudC1yYWRpby1idXR0b25dPVwiaXNSYWRpb0J1dHRvblwiXG4gICAgICBbY2xhc3MuYW50LXJhZGlvLWJ1dHRvbi1jaGVja2VkXT1cImlzQ2hlY2tlZCAmJiBpc1JhZGlvQnV0dG9uXCJcbiAgICAgIFtjbGFzcy5hbnQtcmFkaW8tYnV0dG9uLWRpc2FibGVkXT1cIm56RGlzYWJsZWQgJiYgaXNSYWRpb0J1dHRvblwiXG4gICAgPlxuICAgICAgPGlucHV0XG4gICAgICAgICNpbnB1dEVsZW1lbnRcbiAgICAgICAgdHlwZT1cInJhZGlvXCJcbiAgICAgICAgW2F0dHIuYXV0b2ZvY3VzXT1cIm56QXV0b0ZvY3VzID8gJ2F1dG9mb2N1cycgOiBudWxsXCJcbiAgICAgICAgW2NsYXNzLmFudC1yYWRpby1pbnB1dF09XCIhaXNSYWRpb0J1dHRvblwiXG4gICAgICAgIFtjbGFzcy5hbnQtcmFkaW8tYnV0dG9uLWlucHV0XT1cImlzUmFkaW9CdXR0b25cIlxuICAgICAgICBbZGlzYWJsZWRdPVwibnpEaXNhYmxlZFwiXG4gICAgICAgIFtjaGVja2VkXT1cImlzQ2hlY2tlZFwiXG4gICAgICAgIFthdHRyLm5hbWVdPVwibmFtZVwiXG4gICAgICAvPlxuICAgICAgPHNwYW4gW2NsYXNzLmFudC1yYWRpby1pbm5lcl09XCIhaXNSYWRpb0J1dHRvblwiIFtjbGFzcy5hbnQtcmFkaW8tYnV0dG9uLWlubmVyXT1cImlzUmFkaW9CdXR0b25cIj48L3NwYW4+XG4gICAgPC9zcGFuPlxuICAgIDxzcGFuPjxuZy1jb250ZW50PjwvbmctY29udGVudD48L3NwYW4+XG4gIGAsXG4gIGVuY2Fwc3VsYXRpb246IFZpZXdFbmNhcHN1bGF0aW9uLk5vbmUsXG4gIGNoYW5nZURldGVjdGlvbjogQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3kuT25QdXNoLFxuICBwcm92aWRlcnM6IFtcbiAgICB7XG4gICAgICBwcm92aWRlOiBOR19WQUxVRV9BQ0NFU1NPUixcbiAgICAgIHVzZUV4aXN0aW5nOiBmb3J3YXJkUmVmKCgpID0+IE56UmFkaW9Db21wb25lbnQpLFxuICAgICAgbXVsdGk6IHRydWVcbiAgICB9XG4gIF0sXG4gIGhvc3Q6IHtcbiAgICAnW2NsYXNzLmFudC1yYWRpby13cmFwcGVyXSc6ICchaXNSYWRpb0J1dHRvbicsXG4gICAgJ1tjbGFzcy5hbnQtcmFkaW8tYnV0dG9uLXdyYXBwZXJdJzogJ2lzUmFkaW9CdXR0b24nLFxuICAgICdbY2xhc3MuYW50LXJhZGlvLXdyYXBwZXItY2hlY2tlZF0nOiAnaXNDaGVja2VkICYmICFpc1JhZGlvQnV0dG9uJyxcbiAgICAnW2NsYXNzLmFudC1yYWRpby1idXR0b24td3JhcHBlci1jaGVja2VkXSc6ICdpc0NoZWNrZWQgJiYgaXNSYWRpb0J1dHRvbicsXG4gICAgJ1tjbGFzcy5hbnQtcmFkaW8td3JhcHBlci1kaXNhYmxlZF0nOiAnbnpEaXNhYmxlZCAmJiAhaXNSYWRpb0J1dHRvbicsXG4gICAgJ1tjbGFzcy5hbnQtcmFkaW8tYnV0dG9uLXdyYXBwZXItZGlzYWJsZWRdJzogJ256RGlzYWJsZWQgJiYgaXNSYWRpb0J1dHRvbicsXG4gICAgJ1tjbGFzcy5hbnQtcmFkaW8td3JhcHBlci1ydGxdJzogYCFpc1JhZGlvQnV0dG9uICYmIGRpciA9PT0gJ3J0bCdgLFxuICAgICdbY2xhc3MuYW50LXJhZGlvLWJ1dHRvbi13cmFwcGVyLXJ0bF0nOiBgaXNSYWRpb0J1dHRvbiAmJiBkaXIgPT09ICdydGwnYFxuICB9XG59KVxuZXhwb3J0IGNsYXNzIE56UmFkaW9Db21wb25lbnQgaW1wbGVtZW50cyBDb250cm9sVmFsdWVBY2Nlc3NvciwgQWZ0ZXJWaWV3SW5pdCwgT25EZXN0cm95LCBPbkluaXQge1xuICBzdGF0aWMgbmdBY2NlcHRJbnB1dFR5cGVfbnpEaXNhYmxlZDogQm9vbGVhbklucHV0O1xuICBzdGF0aWMgbmdBY2NlcHRJbnB1dFR5cGVfbnpBdXRvRm9jdXM6IEJvb2xlYW5JbnB1dDtcblxuICBwcml2YXRlIGlzTmdNb2RlbCA9IGZhbHNlO1xuICBwcml2YXRlIGRlc3Ryb3kkID0gbmV3IFN1YmplY3Q8dm9pZD4oKTtcbiAgaXNDaGVja2VkID0gZmFsc2U7XG4gIG5hbWU6IHN0cmluZyB8IG51bGwgPSBudWxsO1xuICBpc1JhZGlvQnV0dG9uID0gISF0aGlzLm56UmFkaW9CdXR0b25EaXJlY3RpdmU7XG4gIG9uQ2hhbmdlOiBPbkNoYW5nZVR5cGUgPSAoKSA9PiB7fTtcbiAgb25Ub3VjaGVkOiBPblRvdWNoZWRUeXBlID0gKCkgPT4ge307XG4gIEBWaWV3Q2hpbGQoJ2lucHV0RWxlbWVudCcsIHsgc3RhdGljOiBmYWxzZSB9KSBpbnB1dEVsZW1lbnQ/OiBFbGVtZW50UmVmO1xuICBASW5wdXQoKSBuelZhbHVlOiBOelNhZmVBbnkgfCBudWxsID0gbnVsbDtcbiAgQElucHV0KCkgQElucHV0Qm9vbGVhbigpIG56RGlzYWJsZWQgPSBmYWxzZTtcbiAgQElucHV0KCkgQElucHV0Qm9vbGVhbigpIG56QXV0b0ZvY3VzID0gZmFsc2U7XG5cbiAgZGlyOiBEaXJlY3Rpb24gPSAnbHRyJztcblxuICBmb2N1cygpOiB2b2lkIHtcbiAgICB0aGlzLmZvY3VzTW9uaXRvci5mb2N1c1ZpYSh0aGlzLmlucHV0RWxlbWVudCEsICdrZXlib2FyZCcpO1xuICB9XG5cbiAgYmx1cigpOiB2b2lkIHtcbiAgICB0aGlzLmlucHV0RWxlbWVudCEubmF0aXZlRWxlbWVudC5ibHVyKCk7XG4gIH1cblxuICBjb25zdHJ1Y3RvcihcbiAgICBwcml2YXRlIG5nWm9uZTogTmdab25lLFxuICAgIHByaXZhdGUgZWxlbWVudFJlZjogRWxlbWVudFJlZixcbiAgICBwcml2YXRlIGNkcjogQ2hhbmdlRGV0ZWN0b3JSZWYsXG4gICAgcHJpdmF0ZSBmb2N1c01vbml0b3I6IEZvY3VzTW9uaXRvcixcbiAgICBAT3B0aW9uYWwoKSBwcml2YXRlIGRpcmVjdGlvbmFsaXR5OiBEaXJlY3Rpb25hbGl0eSxcbiAgICBAT3B0aW9uYWwoKSBwcml2YXRlIG56UmFkaW9TZXJ2aWNlOiBOelJhZGlvU2VydmljZSxcbiAgICBAT3B0aW9uYWwoKSBwcml2YXRlIG56UmFkaW9CdXR0b25EaXJlY3RpdmU6IE56UmFkaW9CdXR0b25EaXJlY3RpdmVcbiAgKSB7fVxuXG4gIHNldERpc2FibGVkU3RhdGUoZGlzYWJsZWQ6IGJvb2xlYW4pOiB2b2lkIHtcbiAgICB0aGlzLm56RGlzYWJsZWQgPSBkaXNhYmxlZDtcbiAgICB0aGlzLmNkci5tYXJrRm9yQ2hlY2soKTtcbiAgfVxuXG4gIHdyaXRlVmFsdWUodmFsdWU6IGJvb2xlYW4pOiB2b2lkIHtcbiAgICB0aGlzLmlzQ2hlY2tlZCA9IHZhbHVlO1xuICAgIHRoaXMuY2RyLm1hcmtGb3JDaGVjaygpO1xuICB9XG5cbiAgcmVnaXN0ZXJPbkNoYW5nZShmbjogT25DaGFuZ2VUeXBlKTogdm9pZCB7XG4gICAgdGhpcy5pc05nTW9kZWwgPSB0cnVlO1xuICAgIHRoaXMub25DaGFuZ2UgPSBmbjtcbiAgfVxuXG4gIHJlZ2lzdGVyT25Ub3VjaGVkKGZuOiBPblRvdWNoZWRUeXBlKTogdm9pZCB7XG4gICAgdGhpcy5vblRvdWNoZWQgPSBmbjtcbiAgfVxuXG4gIG5nT25Jbml0KCk6IHZvaWQge1xuICAgIGlmICh0aGlzLm56UmFkaW9TZXJ2aWNlKSB7XG4gICAgICB0aGlzLm56UmFkaW9TZXJ2aWNlLm5hbWUkLnBpcGUodGFrZVVudGlsKHRoaXMuZGVzdHJveSQpKS5zdWJzY3JpYmUobmFtZSA9PiB7XG4gICAgICAgIHRoaXMubmFtZSA9IG5hbWU7XG4gICAgICAgIHRoaXMuY2RyLm1hcmtGb3JDaGVjaygpO1xuICAgICAgfSk7XG4gICAgICB0aGlzLm56UmFkaW9TZXJ2aWNlLmRpc2FibGVkJC5waXBlKHRha2VVbnRpbCh0aGlzLmRlc3Ryb3kkKSkuc3Vic2NyaWJlKGRpc2FibGVkID0+IHtcbiAgICAgICAgdGhpcy5uekRpc2FibGVkID0gZGlzYWJsZWQ7XG4gICAgICAgIHRoaXMuY2RyLm1hcmtGb3JDaGVjaygpO1xuICAgICAgfSk7XG4gICAgICB0aGlzLm56UmFkaW9TZXJ2aWNlLnNlbGVjdGVkJC5waXBlKHRha2VVbnRpbCh0aGlzLmRlc3Ryb3kkKSkuc3Vic2NyaWJlKHZhbHVlID0+IHtcbiAgICAgICAgdGhpcy5pc0NoZWNrZWQgPSB0aGlzLm56VmFsdWUgPT09IHZhbHVlO1xuICAgICAgICB0aGlzLmNkci5tYXJrRm9yQ2hlY2soKTtcbiAgICAgIH0pO1xuICAgIH1cbiAgICB0aGlzLmZvY3VzTW9uaXRvclxuICAgICAgLm1vbml0b3IodGhpcy5lbGVtZW50UmVmLCB0cnVlKVxuICAgICAgLnBpcGUodGFrZVVudGlsKHRoaXMuZGVzdHJveSQpKVxuICAgICAgLnN1YnNjcmliZShmb2N1c09yaWdpbiA9PiB7XG4gICAgICAgIGlmICghZm9jdXNPcmlnaW4pIHtcbiAgICAgICAgICBQcm9taXNlLnJlc29sdmUoKS50aGVuKCgpID0+IHRoaXMub25Ub3VjaGVkKCkpO1xuICAgICAgICAgIGlmICh0aGlzLm56UmFkaW9TZXJ2aWNlKSB7XG4gICAgICAgICAgICB0aGlzLm56UmFkaW9TZXJ2aWNlLnRvdWNoKCk7XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9KTtcblxuICAgIHRoaXMuZGlyZWN0aW9uYWxpdHkuY2hhbmdlLnBpcGUodGFrZVVudGlsKHRoaXMuZGVzdHJveSQpKS5zdWJzY3JpYmUoKGRpcmVjdGlvbjogRGlyZWN0aW9uKSA9PiB7XG4gICAgICB0aGlzLmRpciA9IGRpcmVjdGlvbjtcbiAgICAgIHRoaXMuY2RyLmRldGVjdENoYW5nZXMoKTtcbiAgICB9KTtcblxuICAgIHRoaXMuZGlyID0gdGhpcy5kaXJlY3Rpb25hbGl0eS52YWx1ZTtcblxuICAgIHRoaXMuc2V0dXBDbGlja0xpc3RlbmVyKCk7XG4gIH1cblxuICBuZ0FmdGVyVmlld0luaXQoKTogdm9pZCB7XG4gICAgaWYgKHRoaXMubnpBdXRvRm9jdXMpIHtcbiAgICAgIHRoaXMuZm9jdXMoKTtcbiAgICB9XG4gIH1cblxuICBuZ09uRGVzdHJveSgpOiB2b2lkIHtcbiAgICB0aGlzLmRlc3Ryb3kkLm5leHQoKTtcbiAgICB0aGlzLmRlc3Ryb3kkLmNvbXBsZXRlKCk7XG4gICAgdGhpcy5mb2N1c01vbml0b3Iuc3RvcE1vbml0b3JpbmcodGhpcy5lbGVtZW50UmVmKTtcbiAgfVxuXG4gIHByaXZhdGUgc2V0dXBDbGlja0xpc3RlbmVyKCk6IHZvaWQge1xuICAgIHRoaXMubmdab25lLnJ1bk91dHNpZGVBbmd1bGFyKCgpID0+IHtcbiAgICAgIGZyb21FdmVudDxNb3VzZUV2ZW50Pih0aGlzLmVsZW1lbnRSZWYubmF0aXZlRWxlbWVudCwgJ2NsaWNrJylcbiAgICAgICAgLnBpcGUodGFrZVVudGlsKHRoaXMuZGVzdHJveSQpKVxuICAgICAgICAuc3Vic2NyaWJlKGV2ZW50ID0+IHtcbiAgICAgICAgICAvKiogcHJldmVudCBsYWJlbCBjbGljayB0cmlnZ2VyZWQgdHdpY2UuICoqL1xuICAgICAgICAgIGV2ZW50LnN0b3BQcm9wYWdhdGlvbigpO1xuICAgICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgICAgaWYgKHRoaXMubnpEaXNhYmxlZCB8fCB0aGlzLmlzQ2hlY2tlZCkge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgIH1cbiAgICAgICAgICB0aGlzLm5nWm9uZS5ydW4oKCkgPT4ge1xuICAgICAgICAgICAgaWYgKHRoaXMubnpSYWRpb1NlcnZpY2UpIHtcbiAgICAgICAgICAgICAgdGhpcy5uelJhZGlvU2VydmljZS5zZWxlY3QodGhpcy5uelZhbHVlKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmICh0aGlzLmlzTmdNb2RlbCkge1xuICAgICAgICAgICAgICB0aGlzLmlzQ2hlY2tlZCA9IHRydWU7XG4gICAgICAgICAgICAgIHRoaXMub25DaGFuZ2UodHJ1ZSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICB0aGlzLmNkci5tYXJrRm9yQ2hlY2soKTtcbiAgICAgICAgICB9KTtcbiAgICAgICAgfSk7XG4gICAgfSk7XG4gIH1cbn1cbiJdfQ==