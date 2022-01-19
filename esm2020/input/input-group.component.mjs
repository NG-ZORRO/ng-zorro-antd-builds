import { __decorate } from "tslib";
import { ChangeDetectionStrategy, Component, ContentChildren, Directive, Input, Optional, ViewEncapsulation } from '@angular/core';
import { merge, Subject } from 'rxjs';
import { map, mergeMap, startWith, switchMap, takeUntil } from 'rxjs/operators';
import { InputBoolean } from 'ng-zorro-antd/core/util';
import { NzInputDirective } from './input.directive';
import * as i0 from "@angular/core";
import * as i1 from "@angular/cdk/a11y";
import * as i2 from "@angular/cdk/bidi";
import * as i3 from "./input-group-slot.component";
import * as i4 from "@angular/common";
export class NzInputGroupWhitSuffixOrPrefixDirective {
    constructor(elementRef) {
        this.elementRef = elementRef;
    }
}
NzInputGroupWhitSuffixOrPrefixDirective.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.1.2", ngImport: i0, type: NzInputGroupWhitSuffixOrPrefixDirective, deps: [{ token: i0.ElementRef }], target: i0.ɵɵFactoryTarget.Directive });
NzInputGroupWhitSuffixOrPrefixDirective.ɵdir = i0.ɵɵngDeclareDirective({ minVersion: "12.0.0", version: "13.1.2", type: NzInputGroupWhitSuffixOrPrefixDirective, selector: "nz-input-group[nzSuffix], nz-input-group[nzPrefix]", ngImport: i0 });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.1.2", ngImport: i0, type: NzInputGroupWhitSuffixOrPrefixDirective, decorators: [{
            type: Directive,
            args: [{
                    selector: `nz-input-group[nzSuffix], nz-input-group[nzPrefix]`
                }]
        }], ctorParameters: function () { return [{ type: i0.ElementRef }]; } });
export class NzInputGroupComponent {
    constructor(focusMonitor, elementRef, cdr, directionality) {
        this.focusMonitor = focusMonitor;
        this.elementRef = elementRef;
        this.cdr = cdr;
        this.directionality = directionality;
        this.nzAddOnBeforeIcon = null;
        this.nzAddOnAfterIcon = null;
        this.nzPrefixIcon = null;
        this.nzSuffixIcon = null;
        this.nzSize = 'default';
        this.nzSearch = false;
        this.nzCompact = false;
        this.isLarge = false;
        this.isSmall = false;
        this.isAffix = false;
        this.isAddOn = false;
        this.focused = false;
        this.disabled = false;
        this.dir = 'ltr';
        this.destroy$ = new Subject();
    }
    updateChildrenInputSize() {
        if (this.listOfNzInputDirective) {
            this.listOfNzInputDirective.forEach(item => (item.nzSize = this.nzSize));
        }
    }
    ngOnInit() {
        this.focusMonitor
            .monitor(this.elementRef, true)
            .pipe(takeUntil(this.destroy$))
            .subscribe(focusOrigin => {
            this.focused = !!focusOrigin;
            this.cdr.markForCheck();
        });
        this.dir = this.directionality.value;
        this.directionality.change?.pipe(takeUntil(this.destroy$)).subscribe((direction) => {
            this.dir = direction;
        });
    }
    ngAfterContentInit() {
        this.updateChildrenInputSize();
        const listOfInputChange$ = this.listOfNzInputDirective.changes.pipe(startWith(this.listOfNzInputDirective));
        listOfInputChange$
            .pipe(switchMap(list => merge(...[listOfInputChange$, ...list.map((input) => input.disabled$)])), mergeMap(() => listOfInputChange$), map(list => list.some((input) => input.disabled)), takeUntil(this.destroy$))
            .subscribe(disabled => {
            this.disabled = disabled;
            this.cdr.markForCheck();
        });
    }
    ngOnChanges(changes) {
        const { nzSize, nzSuffix, nzPrefix, nzPrefixIcon, nzSuffixIcon, nzAddOnAfter, nzAddOnBefore, nzAddOnAfterIcon, nzAddOnBeforeIcon } = changes;
        if (nzSize) {
            this.updateChildrenInputSize();
            this.isLarge = this.nzSize === 'large';
            this.isSmall = this.nzSize === 'small';
        }
        if (nzSuffix || nzPrefix || nzPrefixIcon || nzSuffixIcon) {
            this.isAffix = !!(this.nzSuffix || this.nzPrefix || this.nzPrefixIcon || this.nzSuffixIcon);
        }
        if (nzAddOnAfter || nzAddOnBefore || nzAddOnAfterIcon || nzAddOnBeforeIcon) {
            this.isAddOn = !!(this.nzAddOnAfter || this.nzAddOnBefore || this.nzAddOnAfterIcon || this.nzAddOnBeforeIcon);
        }
    }
    ngOnDestroy() {
        this.focusMonitor.stopMonitoring(this.elementRef);
        this.destroy$.next();
        this.destroy$.complete();
    }
}
NzInputGroupComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.1.2", ngImport: i0, type: NzInputGroupComponent, deps: [{ token: i1.FocusMonitor }, { token: i0.ElementRef }, { token: i0.ChangeDetectorRef }, { token: i2.Directionality, optional: true }], target: i0.ɵɵFactoryTarget.Component });
NzInputGroupComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "13.1.2", type: NzInputGroupComponent, selector: "nz-input-group", inputs: { nzAddOnBeforeIcon: "nzAddOnBeforeIcon", nzAddOnAfterIcon: "nzAddOnAfterIcon", nzPrefixIcon: "nzPrefixIcon", nzSuffixIcon: "nzSuffixIcon", nzAddOnBefore: "nzAddOnBefore", nzAddOnAfter: "nzAddOnAfter", nzPrefix: "nzPrefix", nzSuffix: "nzSuffix", nzSize: "nzSize", nzSearch: "nzSearch", nzCompact: "nzCompact" }, host: { properties: { "class.ant-input-group-compact": "nzCompact", "class.ant-input-search-enter-button": "nzSearch", "class.ant-input-search": "nzSearch", "class.ant-input-search-rtl": "dir === 'rtl'", "class.ant-input-search-sm": "nzSearch && isSmall", "class.ant-input-search-large": "nzSearch && isLarge", "class.ant-input-group-wrapper": "isAddOn", "class.ant-input-group-wrapper-rtl": "dir === 'rtl'", "class.ant-input-group-wrapper-lg": "isAddOn && isLarge", "class.ant-input-group-wrapper-sm": "isAddOn && isSmall", "class.ant-input-affix-wrapper": "isAffix && !isAddOn", "class.ant-input-affix-wrapper-rtl": "dir === 'rtl'", "class.ant-input-affix-wrapper-focused": "isAffix && focused", "class.ant-input-affix-wrapper-disabled": "isAffix && disabled", "class.ant-input-affix-wrapper-lg": "isAffix && !isAddOn && isLarge", "class.ant-input-affix-wrapper-sm": "isAffix && !isAddOn && isSmall", "class.ant-input-group": "!isAffix && !isAddOn", "class.ant-input-group-rtl": "dir === 'rtl'", "class.ant-input-group-lg": "!isAffix && !isAddOn && isLarge", "class.ant-input-group-sm": "!isAffix && !isAddOn && isSmall" } }, queries: [{ propertyName: "listOfNzInputDirective", predicate: NzInputDirective }], exportAs: ["nzInputGroup"], usesOnChanges: true, ngImport: i0, template: `
    <span class="ant-input-wrapper ant-input-group" *ngIf="isAddOn; else noAddOnTemplate">
      <span
        *ngIf="nzAddOnBefore || nzAddOnBeforeIcon"
        nz-input-group-slot
        type="addon"
        [icon]="nzAddOnBeforeIcon"
        [template]="nzAddOnBefore"
      ></span>
      <span
        *ngIf="isAffix; else contentTemplate"
        class="ant-input-affix-wrapper"
        [class.ant-input-affix-wrapper-sm]="isSmall"
        [class.ant-input-affix-wrapper-lg]="isLarge"
      >
        <ng-template [ngTemplateOutlet]="affixTemplate"></ng-template>
      </span>
      <span
        *ngIf="nzAddOnAfter || nzAddOnAfterIcon"
        nz-input-group-slot
        type="addon"
        [icon]="nzAddOnAfterIcon"
        [template]="nzAddOnAfter"
      ></span>
    </span>
    <ng-template #noAddOnTemplate>
      <ng-template [ngIf]="isAffix" [ngIfElse]="contentTemplate">
        <ng-template [ngTemplateOutlet]="affixTemplate"></ng-template>
      </ng-template>
    </ng-template>
    <ng-template #affixTemplate>
      <span
        *ngIf="nzPrefix || nzPrefixIcon"
        nz-input-group-slot
        type="prefix"
        [icon]="nzPrefixIcon"
        [template]="nzPrefix"
      ></span>
      <ng-template [ngTemplateOutlet]="contentTemplate"></ng-template>
      <span
        *ngIf="nzSuffix || nzSuffixIcon"
        nz-input-group-slot
        type="suffix"
        [icon]="nzSuffixIcon"
        [template]="nzSuffix"
      ></span>
    </ng-template>
    <ng-template #contentTemplate>
      <ng-content></ng-content>
    </ng-template>
  `, isInline: true, components: [{ type: i3.NzInputGroupSlotComponent, selector: "[nz-input-group-slot]", inputs: ["icon", "type", "template"] }], directives: [{ type: i4.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { type: i4.NgTemplateOutlet, selector: "[ngTemplateOutlet]", inputs: ["ngTemplateOutletContext", "ngTemplateOutlet"] }], changeDetection: i0.ChangeDetectionStrategy.OnPush, encapsulation: i0.ViewEncapsulation.None });
__decorate([
    InputBoolean()
], NzInputGroupComponent.prototype, "nzSearch", void 0);
__decorate([
    InputBoolean()
], NzInputGroupComponent.prototype, "nzCompact", void 0);
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.1.2", ngImport: i0, type: NzInputGroupComponent, decorators: [{
            type: Component,
            args: [{
                    selector: 'nz-input-group',
                    exportAs: 'nzInputGroup',
                    preserveWhitespaces: false,
                    encapsulation: ViewEncapsulation.None,
                    changeDetection: ChangeDetectionStrategy.OnPush,
                    template: `
    <span class="ant-input-wrapper ant-input-group" *ngIf="isAddOn; else noAddOnTemplate">
      <span
        *ngIf="nzAddOnBefore || nzAddOnBeforeIcon"
        nz-input-group-slot
        type="addon"
        [icon]="nzAddOnBeforeIcon"
        [template]="nzAddOnBefore"
      ></span>
      <span
        *ngIf="isAffix; else contentTemplate"
        class="ant-input-affix-wrapper"
        [class.ant-input-affix-wrapper-sm]="isSmall"
        [class.ant-input-affix-wrapper-lg]="isLarge"
      >
        <ng-template [ngTemplateOutlet]="affixTemplate"></ng-template>
      </span>
      <span
        *ngIf="nzAddOnAfter || nzAddOnAfterIcon"
        nz-input-group-slot
        type="addon"
        [icon]="nzAddOnAfterIcon"
        [template]="nzAddOnAfter"
      ></span>
    </span>
    <ng-template #noAddOnTemplate>
      <ng-template [ngIf]="isAffix" [ngIfElse]="contentTemplate">
        <ng-template [ngTemplateOutlet]="affixTemplate"></ng-template>
      </ng-template>
    </ng-template>
    <ng-template #affixTemplate>
      <span
        *ngIf="nzPrefix || nzPrefixIcon"
        nz-input-group-slot
        type="prefix"
        [icon]="nzPrefixIcon"
        [template]="nzPrefix"
      ></span>
      <ng-template [ngTemplateOutlet]="contentTemplate"></ng-template>
      <span
        *ngIf="nzSuffix || nzSuffixIcon"
        nz-input-group-slot
        type="suffix"
        [icon]="nzSuffixIcon"
        [template]="nzSuffix"
      ></span>
    </ng-template>
    <ng-template #contentTemplate>
      <ng-content></ng-content>
    </ng-template>
  `,
                    host: {
                        '[class.ant-input-group-compact]': `nzCompact`,
                        '[class.ant-input-search-enter-button]': `nzSearch`,
                        '[class.ant-input-search]': `nzSearch`,
                        '[class.ant-input-search-rtl]': `dir === 'rtl'`,
                        '[class.ant-input-search-sm]': `nzSearch && isSmall`,
                        '[class.ant-input-search-large]': `nzSearch && isLarge`,
                        '[class.ant-input-group-wrapper]': `isAddOn`,
                        '[class.ant-input-group-wrapper-rtl]': `dir === 'rtl'`,
                        '[class.ant-input-group-wrapper-lg]': `isAddOn && isLarge`,
                        '[class.ant-input-group-wrapper-sm]': `isAddOn && isSmall`,
                        '[class.ant-input-affix-wrapper]': `isAffix && !isAddOn`,
                        '[class.ant-input-affix-wrapper-rtl]': `dir === 'rtl'`,
                        '[class.ant-input-affix-wrapper-focused]': `isAffix && focused`,
                        '[class.ant-input-affix-wrapper-disabled]': `isAffix && disabled`,
                        '[class.ant-input-affix-wrapper-lg]': `isAffix && !isAddOn && isLarge`,
                        '[class.ant-input-affix-wrapper-sm]': `isAffix && !isAddOn && isSmall`,
                        '[class.ant-input-group]': `!isAffix && !isAddOn`,
                        '[class.ant-input-group-rtl]': `dir === 'rtl'`,
                        '[class.ant-input-group-lg]': `!isAffix && !isAddOn && isLarge`,
                        '[class.ant-input-group-sm]': `!isAffix && !isAddOn && isSmall`
                    }
                }]
        }], ctorParameters: function () { return [{ type: i1.FocusMonitor }, { type: i0.ElementRef }, { type: i0.ChangeDetectorRef }, { type: i2.Directionality, decorators: [{
                    type: Optional
                }] }]; }, propDecorators: { listOfNzInputDirective: [{
                type: ContentChildren,
                args: [NzInputDirective]
            }], nzAddOnBeforeIcon: [{
                type: Input
            }], nzAddOnAfterIcon: [{
                type: Input
            }], nzPrefixIcon: [{
                type: Input
            }], nzSuffixIcon: [{
                type: Input
            }], nzAddOnBefore: [{
                type: Input
            }], nzAddOnAfter: [{
                type: Input
            }], nzPrefix: [{
                type: Input
            }], nzSuffix: [{
                type: Input
            }], nzSize: [{
                type: Input
            }], nzSearch: [{
                type: Input
            }], nzCompact: [{
                type: Input
            }] } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5wdXQtZ3JvdXAuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vY29tcG9uZW50cy9pbnB1dC9pbnB1dC1ncm91cC5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQU9BLE9BQU8sRUFFTCx1QkFBdUIsRUFFdkIsU0FBUyxFQUNULGVBQWUsRUFDZixTQUFTLEVBRVQsS0FBSyxFQUlMLFFBQVEsRUFJUixpQkFBaUIsRUFDbEIsTUFBTSxlQUFlLENBQUM7QUFDdkIsT0FBTyxFQUFFLEtBQUssRUFBRSxPQUFPLEVBQUUsTUFBTSxNQUFNLENBQUM7QUFDdEMsT0FBTyxFQUFFLEdBQUcsRUFBRSxRQUFRLEVBQUUsU0FBUyxFQUFFLFNBQVMsRUFBRSxTQUFTLEVBQUUsTUFBTSxnQkFBZ0IsQ0FBQztBQUdoRixPQUFPLEVBQUUsWUFBWSxFQUFFLE1BQU0seUJBQXlCLENBQUM7QUFFdkQsT0FBTyxFQUFFLGdCQUFnQixFQUFFLE1BQU0sbUJBQW1CLENBQUM7Ozs7OztBQUtyRCxNQUFNLE9BQU8sdUNBQXVDO0lBQ2xELFlBQW1CLFVBQXNCO1FBQXRCLGVBQVUsR0FBVixVQUFVLENBQVk7SUFBRyxDQUFDOztvSUFEbEMsdUNBQXVDO3dIQUF2Qyx1Q0FBdUM7MkZBQXZDLHVDQUF1QztrQkFIbkQsU0FBUzttQkFBQztvQkFDVCxRQUFRLEVBQUUsb0RBQW9EO2lCQUMvRDs7QUFxRkQsTUFBTSxPQUFPLHFCQUFxQjtJQXlCaEMsWUFDVSxZQUEwQixFQUMxQixVQUFzQixFQUN0QixHQUFzQixFQUNWLGNBQThCO1FBSDFDLGlCQUFZLEdBQVosWUFBWSxDQUFjO1FBQzFCLGVBQVUsR0FBVixVQUFVLENBQVk7UUFDdEIsUUFBRyxHQUFILEdBQUcsQ0FBbUI7UUFDVixtQkFBYyxHQUFkLGNBQWMsQ0FBZ0I7UUF4QjNDLHNCQUFpQixHQUFtQixJQUFJLENBQUM7UUFDekMscUJBQWdCLEdBQW1CLElBQUksQ0FBQztRQUN4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QkFDRyxZQUFZO3NCQUFwQixLQUFLO2dCQUNHLFlBQVk7c0JBQXBCLEtBQUs7Z0JBQ0csYUFBYTtzQkFBckIsS0FBSztnQkFDRyxZQUFZO3NCQUFwQixLQUFLO2dCQUNHLFFBQVE7c0JBQWhCLEtBQUs7Z0JBQ0csUUFBUTtzQkFBaEIsS0FBSztnQkFDRyxNQUFNO3NCQUFkLEtBQUs7Z0JBQ21CLFFBQVE7c0JBQWhDLEtBQUs7Z0JBQ21CLFNBQVM7c0JBQWpDLEtBQUsiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqIFVzZSBvZiB0aGlzIHNvdXJjZSBjb2RlIGlzIGdvdmVybmVkIGJ5IGFuIE1JVC1zdHlsZSBsaWNlbnNlIHRoYXQgY2FuIGJlXG4gKiBmb3VuZCBpbiB0aGUgTElDRU5TRSBmaWxlIGF0IGh0dHBzOi8vZ2l0aHViLmNvbS9ORy1aT1JSTy9uZy16b3Jyby1hbnRkL2Jsb2IvbWFzdGVyL0xJQ0VOU0VcbiAqL1xuXG5pbXBvcnQgeyBGb2N1c01vbml0b3IgfSBmcm9tICdAYW5ndWxhci9jZGsvYTExeSc7XG5pbXBvcnQgeyBEaXJlY3Rpb24sIERpcmVjdGlvbmFsaXR5IH0gZnJvbSAnQGFuZ3VsYXIvY2RrL2JpZGknO1xuaW1wb3J0IHtcbiAgQWZ0ZXJDb250ZW50SW5pdCxcbiAgQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3ksXG4gIENoYW5nZURldGVjdG9yUmVmLFxuICBDb21wb25lbnQsXG4gIENvbnRlbnRDaGlsZHJlbixcbiAgRGlyZWN0aXZlLFxuICBFbGVtZW50UmVmLFxuICBJbnB1dCxcbiAgT25DaGFuZ2VzLFxuICBPbkRlc3Ryb3ksXG4gIE9uSW5pdCxcbiAgT3B0aW9uYWwsXG4gIFF1ZXJ5TGlzdCxcbiAgU2ltcGxlQ2hhbmdlcyxcbiAgVGVtcGxhdGVSZWYsXG4gIFZpZXdFbmNhcHN1bGF0aW9uXG59IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgbWVyZ2UsIFN1YmplY3QgfSBmcm9tICdyeGpzJztcbmltcG9ydCB7IG1hcCwgbWVyZ2VNYXAsIHN0YXJ0V2l0aCwgc3dpdGNoTWFwLCB0YWtlVW50aWwgfSBmcm9tICdyeGpzL29wZXJhdG9ycyc7XG5cbmltcG9ydCB7IEJvb2xlYW5JbnB1dCwgTnpTaXplTERTVHlwZSB9IGZyb20gJ25nLXpvcnJvLWFudGQvY29yZS90eXBlcyc7XG5pbXBvcnQgeyBJbnB1dEJvb2xlYW4gfSBmcm9tICduZy16b3Jyby1hbnRkL2NvcmUvdXRpbCc7XG5cbmltcG9ydCB7IE56SW5wdXREaXJlY3RpdmUgfSBmcm9tICcuL2lucHV0LmRpcmVjdGl2ZSc7XG5cbkBEaXJlY3RpdmUoe1xuICBzZWxlY3RvcjogYG56LWlucHV0LWdyb3VwW256U3VmZml4XSwgbnotaW5wdXQtZ3JvdXBbbnpQcmVmaXhdYFxufSlcbmV4cG9ydCBjbGFzcyBOeklucHV0R3JvdXBXaGl0U3VmZml4T3JQcmVmaXhEaXJlY3RpdmUge1xuICBjb25zdHJ1Y3RvcihwdWJsaWMgZWxlbWVudFJlZjogRWxlbWVudFJlZikge31cbn1cblxuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAnbnotaW5wdXQtZ3JvdXAnLFxuICBleHBvcnRBczogJ256SW5wdXRHcm91cCcsXG4gIHByZXNlcnZlV2hpdGVzcGFjZXM6IGZhbHNlLFxuICBlbmNhcHN1bGF0aW9uOiBWaWV3RW5jYXBzdWxhdGlvbi5Ob25lLFxuICBjaGFuZ2VEZXRlY3Rpb246IENoYW5nZURldGVjdGlvblN0cmF0ZWd5Lk9uUHVzaCxcbiAgdGVtcGxhdGU6IGBcbiAgICA8c3BhbiBjbGFzcz1cImFudC1pbnB1dC13cmFwcGVyIGFudC1pbnB1dC1ncm91cFwiICpuZ0lmPVwiaXNBZGRPbjsgZWxzZSBub0FkZE9uVGVtcGxhdGVcIj5cbiAgICAgIDxzcGFuXG4gICAgICAgICpuZ0lmPVwibnpBZGRPbkJlZm9yZSB8fCBuekFkZE9uQmVmb3JlSWNvblwiXG4gICAgICAgIG56LWlucHV0LWdyb3VwLXNsb3RcbiAgICAgICAgdHlwZT1cImFkZG9uXCJcbiAgICAgICAgW2ljb25dPVwibnpBZGRPbkJlZm9yZUljb25cIlxuICAgICAgICBbdGVtcGxhdGVdPVwibnpBZGRPbkJlZm9yZVwiXG4gICAgICA+PC9zcGFuPlxuICAgICAgPHNwYW5cbiAgICAgICAgKm5nSWY9XCJpc0FmZml4OyBlbHNlIGNvbnRlbnRUZW1wbGF0ZVwiXG4gICAgICAgIGNsYXNzPVwiYW50LWlucHV0LWFmZml4LXdyYXBwZXJcIlxuICAgICAgICBbY2xhc3MuYW50LWlucHV0LWFmZml4LXdyYXBwZXItc21dPVwiaXNTbWFsbFwiXG4gICAgICAgIFtjbGFzcy5hbnQtaW5wdXQtYWZmaXgtd3JhcHBlci1sZ109XCJpc0xhcmdlXCJcbiAgICAgID5cbiAgICAgICAgPG5nLXRlbXBsYXRlIFtuZ1RlbXBsYXRlT3V0bGV0XT1cImFmZml4VGVtcGxhdGVcIj48L25nLXRlbXBsYXRlPlxuICAgICAgPC9zcGFuPlxuICAgICAgPHNwYW5cbiAgICAgICAgKm5nSWY9XCJuekFkZE9uQWZ0ZXIgfHwgbnpBZGRPbkFmdGVySWNvblwiXG4gICAgICAgIG56LWlucHV0LWdyb3VwLXNsb3RcbiAgICAgICAgdHlwZT1cImFkZG9uXCJcbiAgICAgICAgW2ljb25dPVwibnpBZGRPbkFmdGVySWNvblwiXG4gICAgICAgIFt0ZW1wbGF0ZV09XCJuekFkZE9uQWZ0ZXJcIlxuICAgICAgPjwvc3Bhbj5cbiAgICA8L3NwYW4+XG4gICAgPG5nLXRlbXBsYXRlICNub0FkZE9uVGVtcGxhdGU+XG4gICAgICA8bmctdGVtcGxhdGUgW25nSWZdPVwiaXNBZmZpeFwiIFtuZ0lmRWxzZV09XCJjb250ZW50VGVtcGxhdGVcIj5cbiAgICAgICAgPG5nLXRlbXBsYXRlIFtuZ1RlbXBsYXRlT3V0bGV0XT1cImFmZml4VGVtcGxhdGVcIj48L25nLXRlbXBsYXRlPlxuICAgICAgPC9uZy10ZW1wbGF0ZT5cbiAgICA8L25nLXRlbXBsYXRlPlxuICAgIDxuZy10ZW1wbGF0ZSAjYWZmaXhUZW1wbGF0ZT5cbiAgICAgIDxzcGFuXG4gICAgICAgICpuZ0lmPVwibnpQcmVmaXggfHwgbnpQcmVmaXhJY29uXCJcbiAgICAgICAgbnotaW5wdXQtZ3JvdXAtc2xvdFxuICAgICAgICB0eXBlPVwicHJlZml4XCJcbiAgICAgICAgW2ljb25dPVwibnpQcmVmaXhJY29uXCJcbiAgICAgICAgW3RlbXBsYXRlXT1cIm56UHJlZml4XCJcbiAgICAgID48L3NwYW4+XG4gICAgICA8bmctdGVtcGxhdGUgW25nVGVtcGxhdGVPdXRsZXRdPVwiY29udGVudFRlbXBsYXRlXCI+PC9uZy10ZW1wbGF0ZT5cbiAgICAgIDxzcGFuXG4gICAgICAgICpuZ0lmPVwibnpTdWZmaXggfHwgbnpTdWZmaXhJY29uXCJcbiAgICAgICAgbnotaW5wdXQtZ3JvdXAtc2xvdFxuICAgICAgICB0eXBlPVwic3VmZml4XCJcbiAgICAgICAgW2ljb25dPVwibnpTdWZmaXhJY29uXCJcbiAgICAgICAgW3RlbXBsYXRlXT1cIm56U3VmZml4XCJcbiAgICAgID48L3NwYW4+XG4gICAgPC9uZy10ZW1wbGF0ZT5cbiAgICA8bmctdGVtcGxhdGUgI2NvbnRlbnRUZW1wbGF0ZT5cbiAgICAgIDxuZy1jb250ZW50PjwvbmctY29udGVudD5cbiAgICA8L25nLXRlbXBsYXRlPlxuICBgLFxuICBob3N0OiB7XG4gICAgJ1tjbGFzcy5hbnQtaW5wdXQtZ3JvdXAtY29tcGFjdF0nOiBgbnpDb21wYWN0YCxcbiAgICAnW2NsYXNzLmFudC1pbnB1dC1zZWFyY2gtZW50ZXItYnV0dG9uXSc6IGBuelNlYXJjaGAsXG4gICAgJ1tjbGFzcy5hbnQtaW5wdXQtc2VhcmNoXSc6IGBuelNlYXJjaGAsXG4gICAgJ1tjbGFzcy5hbnQtaW5wdXQtc2VhcmNoLXJ0bF0nOiBgZGlyID09PSAncnRsJ2AsXG4gICAgJ1tjbGFzcy5hbnQtaW5wdXQtc2VhcmNoLXNtXSc6IGBuelNlYXJjaCAmJiBpc1NtYWxsYCxcbiAgICAnW2NsYXNzLmFudC1pbnB1dC1zZWFyY2gtbGFyZ2VdJzogYG56U2VhcmNoICYmIGlzTGFyZ2VgLFxuICAgICdbY2xhc3MuYW50LWlucHV0LWdyb3VwLXdyYXBwZXJdJzogYGlzQWRkT25gLFxuICAgICdbY2xhc3MuYW50LWlucHV0LWdyb3VwLXdyYXBwZXItcnRsXSc6IGBkaXIgPT09ICdydGwnYCxcbiAgICAnW2NsYXNzLmFudC1pbnB1dC1ncm91cC13cmFwcGVyLWxnXSc6IGBpc0FkZE9uICYmIGlzTGFyZ2VgLFxuICAgICdbY2xhc3MuYW50LWlucHV0LWdyb3VwLXdyYXBwZXItc21dJzogYGlzQWRkT24gJiYgaXNTbWFsbGAsXG4gICAgJ1tjbGFzcy5hbnQtaW5wdXQtYWZmaXgtd3JhcHBlcl0nOiBgaXNBZmZpeCAmJiAhaXNBZGRPbmAsXG4gICAgJ1tjbGFzcy5hbnQtaW5wdXQtYWZmaXgtd3JhcHBlci1ydGxdJzogYGRpciA9PT0gJ3J0bCdgLFxuICAgICdbY2xhc3MuYW50LWlucHV0LWFmZml4LXdyYXBwZXItZm9jdXNlZF0nOiBgaXNBZmZpeCAmJiBmb2N1c2VkYCxcbiAgICAnW2NsYXNzLmFudC1pbnB1dC1hZmZpeC13cmFwcGVyLWRpc2FibGVkXSc6IGBpc0FmZml4ICYmIGRpc2FibGVkYCxcbiAgICAnW2NsYXNzLmFudC1pbnB1dC1hZmZpeC13cmFwcGVyLWxnXSc6IGBpc0FmZml4ICYmICFpc0FkZE9uICYmIGlzTGFyZ2VgLFxuICAgICdbY2xhc3MuYW50LWlucHV0LWFmZml4LXdyYXBwZXItc21dJzogYGlzQWZmaXggJiYgIWlzQWRkT24gJiYgaXNTbWFsbGAsXG4gICAgJ1tjbGFzcy5hbnQtaW5wdXQtZ3JvdXBdJzogYCFpc0FmZml4ICYmICFpc0FkZE9uYCxcbiAgICAnW2NsYXNzLmFudC1pbnB1dC1ncm91cC1ydGxdJzogYGRpciA9PT0gJ3J0bCdgLFxuICAgICdbY2xhc3MuYW50LWlucHV0LWdyb3VwLWxnXSc6IGAhaXNBZmZpeCAmJiAhaXNBZGRPbiAmJiBpc0xhcmdlYCxcbiAgICAnW2NsYXNzLmFudC1pbnB1dC1ncm91cC1zbV0nOiBgIWlzQWZmaXggJiYgIWlzQWRkT24gJiYgaXNTbWFsbGBcbiAgfVxufSlcbmV4cG9ydCBjbGFzcyBOeklucHV0R3JvdXBDb21wb25lbnQgaW1wbGVtZW50cyBBZnRlckNvbnRlbnRJbml0LCBPbkNoYW5nZXMsIE9uSW5pdCwgT25EZXN0cm95IHtcbiAgc3RhdGljIG5nQWNjZXB0SW5wdXRUeXBlX256U2VhcmNoOiBCb29sZWFuSW5wdXQ7XG4gIHN0YXRpYyBuZ0FjY2VwdElucHV0VHlwZV9uekNvbXBhY3Q6IEJvb2xlYW5JbnB1dDtcblxuICBAQ29udGVudENoaWxkcmVuKE56SW5wdXREaXJlY3RpdmUpIGxpc3RPZk56SW5wdXREaXJlY3RpdmUhOiBRdWVyeUxpc3Q8TnpJbnB1dERpcmVjdGl2ZT47XG4gIEBJbnB1dCgpIG56QWRkT25CZWZvcmVJY29uPzogc3RyaW5nIHwgbnVsbCA9IG51bGw7XG4gIEBJbnB1dCgpIG56QWRkT25BZnRlckljb24/OiBzdHJpbmcgfCBudWxsID0gbnVsbDtcbiAgQElucHV0KCkgbnpQcmVmaXhJY29uPzogc3RyaW5nIHwgbnVsbCA9IG51bGw7XG4gIEBJbnB1dCgpIG56U3VmZml4SWNvbj86IHN0cmluZyB8IG51bGwgPSBudWxsO1xuICBASW5wdXQoKSBuekFkZE9uQmVmb3JlPzogc3RyaW5nIHwgVGVtcGxhdGVSZWY8dm9pZD47XG4gIEBJbnB1dCgpIG56QWRkT25BZnRlcj86IHN0cmluZyB8IFRlbXBsYXRlUmVmPHZvaWQ+O1xuICBASW5wdXQoKSBuelByZWZpeD86IHN0cmluZyB8IFRlbXBsYXRlUmVmPHZvaWQ+O1xuICBASW5wdXQoKSBuelN1ZmZpeD86IHN0cmluZyB8IFRlbXBsYXRlUmVmPHZvaWQ+O1xuICBASW5wdXQoKSBuelNpemU6IE56U2l6ZUxEU1R5cGUgPSAnZGVmYXVsdCc7XG4gIEBJbnB1dCgpIEBJbnB1dEJvb2xlYW4oKSBuelNlYXJjaCA9IGZhbHNlO1xuICBASW5wdXQoKSBASW5wdXRCb29sZWFuKCkgbnpDb21wYWN0ID0gZmFsc2U7XG4gIGlzTGFyZ2UgPSBmYWxzZTtcbiAgaXNTbWFsbCA9IGZhbHNlO1xuICBpc0FmZml4ID0gZmFsc2U7XG4gIGlzQWRkT24gPSBmYWxzZTtcbiAgZm9jdXNlZCA9IGZhbHNlO1xuICBkaXNhYmxlZCA9IGZhbHNlO1xuICBkaXI6IERpcmVjdGlvbiA9ICdsdHInO1xuICBwcml2YXRlIGRlc3Ryb3kkID0gbmV3IFN1YmplY3Q8dm9pZD4oKTtcblxuICBjb25zdHJ1Y3RvcihcbiAgICBwcml2YXRlIGZvY3VzTW9uaXRvcjogRm9jdXNNb25pdG9yLFxuICAgIHByaXZhdGUgZWxlbWVudFJlZjogRWxlbWVudFJlZixcbiAgICBwcml2YXRlIGNkcjogQ2hhbmdlRGV0ZWN0b3JSZWYsXG4gICAgQE9wdGlvbmFsKCkgcHJpdmF0ZSBkaXJlY3Rpb25hbGl0eTogRGlyZWN0aW9uYWxpdHlcbiAgKSB7fVxuXG4gIHVwZGF0ZUNoaWxkcmVuSW5wdXRTaXplKCk6IHZvaWQge1xuICAgIGlmICh0aGlzLmxpc3RPZk56SW5wdXREaXJlY3RpdmUpIHtcbiAgICAgIHRoaXMubGlzdE9mTnpJbnB1dERpcmVjdGl2ZS5mb3JFYWNoKGl0ZW0gPT4gKGl0ZW0ubnpTaXplID0gdGhpcy5uelNpemUpKTtcbiAgICB9XG4gIH1cblxuICBuZ09uSW5pdCgpOiB2b2lkIHtcbiAgICB0aGlzLmZvY3VzTW9uaXRvclxuICAgICAgLm1vbml0b3IodGhpcy5lbGVtZW50UmVmLCB0cnVlKVxuICAgICAgLnBpcGUodGFrZVVudGlsKHRoaXMuZGVzdHJveSQpKVxuICAgICAgLnN1YnNjcmliZShmb2N1c09yaWdpbiA9PiB7XG4gICAgICAgIHRoaXMuZm9jdXNlZCA9ICEhZm9jdXNPcmlnaW47XG4gICAgICAgIHRoaXMuY2RyLm1hcmtGb3JDaGVjaygpO1xuICAgICAgfSk7XG5cbiAgICB0aGlzLmRpciA9IHRoaXMuZGlyZWN0aW9uYWxpdHkudmFsdWU7XG4gICAgdGhpcy5kaXJlY3Rpb25hbGl0eS5jaGFuZ2U/LnBpcGUodGFrZVVudGlsKHRoaXMuZGVzdHJveSQpKS5zdWJzY3JpYmUoKGRpcmVjdGlvbjogRGlyZWN0aW9uKSA9PiB7XG4gICAgICB0aGlzLmRpciA9IGRpcmVjdGlvbjtcbiAgICB9KTtcbiAgfVxuXG4gIG5nQWZ0ZXJDb250ZW50SW5pdCgpOiB2b2lkIHtcbiAgICB0aGlzLnVwZGF0ZUNoaWxkcmVuSW5wdXRTaXplKCk7XG4gICAgY29uc3QgbGlzdE9mSW5wdXRDaGFuZ2UkID0gdGhpcy5saXN0T2ZOeklucHV0RGlyZWN0aXZlLmNoYW5nZXMucGlwZShzdGFydFdpdGgodGhpcy5saXN0T2ZOeklucHV0RGlyZWN0aXZlKSk7XG4gICAgbGlzdE9mSW5wdXRDaGFuZ2UkXG4gICAgICAucGlwZShcbiAgICAgICAgc3dpdGNoTWFwKGxpc3QgPT4gbWVyZ2UoLi4uW2xpc3RPZklucHV0Q2hhbmdlJCwgLi4ubGlzdC5tYXAoKGlucHV0OiBOeklucHV0RGlyZWN0aXZlKSA9PiBpbnB1dC5kaXNhYmxlZCQpXSkpLFxuICAgICAgICBtZXJnZU1hcCgoKSA9PiBsaXN0T2ZJbnB1dENoYW5nZSQpLFxuICAgICAgICBtYXAobGlzdCA9PiBsaXN0LnNvbWUoKGlucHV0OiBOeklucHV0RGlyZWN0aXZlKSA9PiBpbnB1dC5kaXNhYmxlZCkpLFxuICAgICAgICB0YWtlVW50aWwodGhpcy5kZXN0cm95JClcbiAgICAgIClcbiAgICAgIC5zdWJzY3JpYmUoZGlzYWJsZWQgPT4ge1xuICAgICAgICB0aGlzLmRpc2FibGVkID0gZGlzYWJsZWQ7XG4gICAgICAgIHRoaXMuY2RyLm1hcmtGb3JDaGVjaygpO1xuICAgICAgfSk7XG4gIH1cbiAgbmdPbkNoYW5nZXMoY2hhbmdlczogU2ltcGxlQ2hhbmdlcyk6IHZvaWQge1xuICAgIGNvbnN0IHtcbiAgICAgIG56U2l6ZSxcbiAgICAgIG56U3VmZml4LFxuICAgICAgbnpQcmVmaXgsXG4gICAgICBuelByZWZpeEljb24sXG4gICAgICBuelN1ZmZpeEljb24sXG4gICAgICBuekFkZE9uQWZ0ZXIsXG4gICAgICBuekFkZE9uQmVmb3JlLFxuICAgICAgbnpBZGRPbkFmdGVySWNvbixcbiAgICAgIG56QWRkT25CZWZvcmVJY29uXG4gICAgfSA9IGNoYW5nZXM7XG4gICAgaWYgKG56U2l6ZSkge1xuICAgICAgdGhpcy51cGRhdGVDaGlsZHJlbklucHV0U2l6ZSgpO1xuICAgICAgdGhpcy5pc0xhcmdlID0gdGhpcy5uelNpemUgPT09ICdsYXJnZSc7XG4gICAgICB0aGlzLmlzU21hbGwgPSB0aGlzLm56U2l6ZSA9PT0gJ3NtYWxsJztcbiAgICB9XG4gICAgaWYgKG56U3VmZml4IHx8IG56UHJlZml4IHx8IG56UHJlZml4SWNvbiB8fCBuelN1ZmZpeEljb24pIHtcbiAgICAgIHRoaXMuaXNBZmZpeCA9ICEhKHRoaXMubnpTdWZmaXggfHwgdGhpcy5uelByZWZpeCB8fCB0aGlzLm56UHJlZml4SWNvbiB8fCB0aGlzLm56U3VmZml4SWNvbik7XG4gICAgfVxuICAgIGlmIChuekFkZE9uQWZ0ZXIgfHwgbnpBZGRPbkJlZm9yZSB8fCBuekFkZE9uQWZ0ZXJJY29uIHx8IG56QWRkT25CZWZvcmVJY29uKSB7XG4gICAgICB0aGlzLmlzQWRkT24gPSAhISh0aGlzLm56QWRkT25BZnRlciB8fCB0aGlzLm56QWRkT25CZWZvcmUgfHwgdGhpcy5uekFkZE9uQWZ0ZXJJY29uIHx8IHRoaXMubnpBZGRPbkJlZm9yZUljb24pO1xuICAgIH1cbiAgfVxuICBuZ09uRGVzdHJveSgpOiB2b2lkIHtcbiAgICB0aGlzLmZvY3VzTW9uaXRvci5zdG9wTW9uaXRvcmluZyh0aGlzLmVsZW1lbnRSZWYpO1xuICAgIHRoaXMuZGVzdHJveSQubmV4dCgpO1xuICAgIHRoaXMuZGVzdHJveSQuY29tcGxldGUoKTtcbiAgfVxufVxuIl19