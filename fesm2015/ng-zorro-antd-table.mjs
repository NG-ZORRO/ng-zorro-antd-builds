import * as i5 from '@angular/cdk/bidi';
import { BidiModule } from '@angular/cdk/bidi';
import * as i1$4 from '@angular/cdk/platform';
import { PlatformModule } from '@angular/cdk/platform';
import * as i4$2 from '@angular/cdk/scrolling';
import { CdkVirtualScrollViewport, ScrollingModule } from '@angular/cdk/scrolling';
import * as i3$1 from '@angular/common';
import { CommonModule } from '@angular/common';
import * as i0 from '@angular/core';
import { EventEmitter, ElementRef, Component, ChangeDetectionStrategy, ViewEncapsulation, Input, Output, ViewChild, Directive, Injectable, Optional, ViewChildren, ContentChild, ContentChildren, NgModule } from '@angular/core';
import * as i11 from '@angular/forms';
import { FormsModule } from '@angular/forms';
import * as i6 from 'ng-zorro-antd/button';
import { NzButtonModule } from 'ng-zorro-antd/button';
import * as i1$3 from 'ng-zorro-antd/cdk/resize-observer';
import { NzResizeObserverModule } from 'ng-zorro-antd/cdk/resize-observer';
import * as i1$2 from 'ng-zorro-antd/checkbox';
import { NzCheckboxModule } from 'ng-zorro-antd/checkbox';
import * as i1$5 from 'ng-zorro-antd/core/outlet';
import { NzOutletModule } from 'ng-zorro-antd/core/outlet';
import * as i3 from 'ng-zorro-antd/dropdown';
import { NzDropDownDirective, NzDropDownModule } from 'ng-zorro-antd/dropdown';
import * as i4$1 from 'ng-zorro-antd/empty';
import { NzEmptyModule } from 'ng-zorro-antd/empty';
import * as i1$1 from 'ng-zorro-antd/i18n';
import { NzI18nModule } from 'ng-zorro-antd/i18n';
import * as i9 from 'ng-zorro-antd/icon';
import { NzIconModule } from 'ng-zorro-antd/icon';
import * as i10 from 'ng-zorro-antd/menu';
import { NzMenuModule } from 'ng-zorro-antd/menu';
import * as i10$1 from 'ng-zorro-antd/pagination';
import { NzPaginationModule } from 'ng-zorro-antd/pagination';
import * as i4 from 'ng-zorro-antd/radio';
import { NzRadioModule } from 'ng-zorro-antd/radio';
import * as i6$1 from 'ng-zorro-antd/spin';
import { NzSpinModule } from 'ng-zorro-antd/spin';
import { __decorate } from 'tslib';
import { fromEvent, Subject, ReplaySubject, BehaviorSubject, combineLatest, merge, EMPTY, of } from 'rxjs';
import { takeUntil, map, startWith, switchMap, debounceTime, delay, filter, distinctUntilChanged, skip, mergeMap } from 'rxjs/operators';
import * as i1 from 'ng-zorro-antd/core/config';
import { WithConfig } from 'ng-zorro-antd/core/config';
import * as i2 from 'ng-zorro-antd/core/services';
import { NzDestroyService } from 'ng-zorro-antd/core/services';
import { InputBoolean, arraysEqual, isNil, measureScrollbar } from 'ng-zorro-antd/core/util';
import * as i8 from 'ng-zorro-antd/core/transition-patch';
import * as i12 from 'ng-zorro-antd/core/wave';

const NZ_CONFIG_MODULE_NAME$1 = 'filterTrigger';
class NzFilterTriggerComponent {
    constructor(nzConfigService, ngZone, cdr, destroy$) {
        this.nzConfigService = nzConfigService;
        this.ngZone = ngZone;
        this.cdr = cdr;
        this.destroy$ = destroy$;
        this._nzModuleName = NZ_CONFIG_MODULE_NAME$1;
        this.nzActive = false;
        this.nzVisible = false;
        this.nzBackdrop = false;
        this.nzVisibleChange = new EventEmitter();
    }
    onVisibleChange(visible) {
        this.nzVisible = visible;
        this.nzVisibleChange.next(visible);
    }
    hide() {
        this.nzVisible = false;
        this.cdr.markForCheck();
    }
    show() {
        this.nzVisible = true;
        this.cdr.markForCheck();
    }
    ngOnInit() {
        this.ngZone.runOutsideAngular(() => {
            fromEvent(this.nzDropdown.nativeElement, 'click')
                .pipe(takeUntil(this.destroy$))
                .subscribe(event => {
                event.stopPropagation();
            });
        });
    }
}
NzFilterTriggerComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.1.2", ngImport: i0, type: NzFilterTriggerComponent, deps: [{ token: i1.NzConfigService }, { token: i0.NgZone }, { token: i0.ChangeDetectorRef }, { token: i2.NzDestroyService }], target: i0.ɵɵFactoryTarget.Component });
NzFilterTriggerComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "13.1.2", type: NzFilterTriggerComponent, selector: "nz-filter-trigger", inputs: { nzActive: "nzActive", nzDropdownMenu: "nzDropdownMenu", nzVisible: "nzVisible", nzBackdrop: "nzBackdrop" }, outputs: { nzVisibleChange: "nzVisibleChange" }, providers: [NzDestroyService], viewQueries: [{ propertyName: "nzDropdown", first: true, predicate: NzDropDownDirective, descendants: true, read: ElementRef, static: true }], exportAs: ["nzFilterTrigger"], ngImport: i0, template: `
    <span
      nz-dropdown
      class="ant-table-filter-trigger"
      nzTrigger="click"
      nzPlacement="bottomRight"
      [nzBackdrop]="nzBackdrop"
      [nzClickHide]="false"
      [nzDropdownMenu]="nzDropdownMenu"
      [class.active]="nzActive"
      [class.ant-table-filter-open]="nzVisible"
      [nzVisible]="nzVisible"
      (nzVisibleChange)="onVisibleChange($event)"
    >
      <ng-content></ng-content>
    </span>
  `, isInline: true, directives: [{ type: i3.NzDropDownDirective, selector: "[nz-dropdown]", inputs: ["nzDropdownMenu", "nzTrigger", "nzMatchWidthElement", "nzBackdrop", "nzClickHide", "nzDisabled", "nzVisible", "nzOverlayClassName", "nzOverlayStyle", "nzPlacement"], outputs: ["nzVisibleChange"], exportAs: ["nzDropdown"] }], changeDetection: i0.ChangeDetectionStrategy.OnPush, encapsulation: i0.ViewEncapsulation.None });
__decorate([
    WithConfig(),
    InputBoolean()
], NzFilterTriggerComponent.prototype, "nzBackdrop", void 0);
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.1.2", ngImport: i0, type: NzFilterTriggerComponent, decorators: [{
            type: Component,
            args: [{
                    selector: 'nz-filter-trigger',
                    exportAs: `nzFilterTrigger`,
                    changeDetection: ChangeDetectionStrategy.OnPush,
                    preserveWhitespaces: false,
                    encapsulation: ViewEncapsulation.None,
                    template: `
    <span
      nz-dropdown
      class="ant-table-filter-trigger"
      nzTrigger="click"
      nzPlacement="bottomRight"
      [nzBackdrop]="nzBackdrop"
      [nzClickHide]="false"
      [nzDropdownMenu]="nzDropdownMenu"
      [class.active]="nzActive"
      [class.ant-table-filter-open]="nzVisible"
      [nzVisible]="nzVisible"
      (nzVisibleChange)="onVisibleChange($event)"
    >
      <ng-content></ng-content>
    </span>
  `,
                    providers: [NzDestroyService]
                }]
        }], ctorParameters: function () { return [{ type: i1.NzConfigService }, { type: i0.NgZone }, { type: i0.ChangeDetectorRef }, { type: i2.NzDestroyService }]; }, propDecorators: { nzActive: [{
                type: Input
            }], nzDropdownMenu: [{
                type: Input
            }], nzVisible: [{
                type: Input
            }], nzBackdrop: [{
                type: Input
            }], nzVisibleChange: [{
                type: Output
            }], nzDropdown: [{
                type: ViewChild,
                args: [NzDropDownDirective, { static: true, read: ElementRef }]
            }] } });

/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */
class NzTableFilterComponent {
    constructor(cdr, i18n) {
        this.cdr = cdr;
        this.i18n = i18n;
        this.contentTemplate = null;
        this.customFilter = false;
        this.extraTemplate = null;
        this.filterMultiple = true;
        this.listOfFilter = [];
        this.filterChange = new EventEmitter();
        this.destroy$ = new Subject();
        this.isChecked = false;
        this.isVisible = false;
        this.listOfParsedFilter = [];
        this.listOfChecked = [];
    }
    trackByValue(_, item) {
        return item.value;
    }
    check(filter) {
        if (this.filterMultiple) {
            this.listOfParsedFilter = this.listOfParsedFilter.map(item => {
                if (item === filter) {
                    return Object.assign(Object.assign({}, item), { checked: !filter.checked });
                }
                else {
                    return item;
                }
            });
            filter.checked = !filter.checked;
        }
        else {
            this.listOfParsedFilter = this.listOfParsedFilter.map(item => (Object.assign(Object.assign({}, item), { checked: item === filter })));
        }
        this.isChecked = this.getCheckedStatus(this.listOfParsedFilter);
    }
    confirm() {
        this.isVisible = false;
        this.emitFilterData();
    }
    reset() {
        this.isVisible = false;
        this.listOfParsedFilter = this.parseListOfFilter(this.listOfFilter, true);
        this.isChecked = this.getCheckedStatus(this.listOfParsedFilter);
        this.emitFilterData();
    }
    onVisibleChange(value) {
        this.isVisible = value;
        if (!value) {
            this.emitFilterData();
        }
        else {
            this.listOfChecked = this.listOfParsedFilter.filter(item => item.checked).map(item => item.value);
        }
    }
    emitFilterData() {
        const listOfChecked = this.listOfParsedFilter.filter(item => item.checked).map(item => item.value);
        if (!arraysEqual(this.listOfChecked, listOfChecked)) {
            if (this.filterMultiple) {
                this.filterChange.emit(listOfChecked);
            }
            else {
                this.filterChange.emit(listOfChecked.length > 0 ? listOfChecked[0] : null);
            }
        }
    }
    parseListOfFilter(listOfFilter, reset) {
        return listOfFilter.map(item => {
            const checked = reset ? false : !!item.byDefault;
            return { text: item.text, value: item.value, checked };
        });
    }
    getCheckedStatus(listOfParsedFilter) {
        return listOfParsedFilter.some(item => item.checked);
    }
    ngOnInit() {
        this.i18n.localeChange.pipe(takeUntil(this.destroy$)).subscribe(() => {
            this.locale = this.i18n.getLocaleData('Table');
            this.cdr.markForCheck();
        });
    }
    ngOnChanges(changes) {
        const { listOfFilter } = changes;
        if (listOfFilter && this.listOfFilter && this.listOfFilter.length) {
            this.listOfParsedFilter = this.parseListOfFilter(this.listOfFilter);
            this.isChecked = this.getCheckedStatus(this.listOfParsedFilter);
        }
    }
    ngOnDestroy() {
        this.destroy$.next();
        this.destroy$.complete();
    }
}
NzTableFilterComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.1.2", ngImport: i0, type: NzTableFilterComponent, deps: [{ token: i0.ChangeDetectorRef }, { token: i1$1.NzI18nService }], target: i0.ɵɵFactoryTarget.Component });
NzTableFilterComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "13.1.2", type: NzTableFilterComponent, selector: "nz-table-filter", inputs: { contentTemplate: "contentTemplate", customFilter: "customFilter", extraTemplate: "extraTemplate", filterMultiple: "filterMultiple", listOfFilter: "listOfFilter" }, outputs: { filterChange: "filterChange" }, host: { classAttribute: "ant-table-filter-column" }, usesOnChanges: true, ngImport: i0, template: `
    <span class="ant-table-column-title">
      <ng-template [ngTemplateOutlet]="contentTemplate"></ng-template>
    </span>
    <ng-container *ngIf="!customFilter; else extraTemplate">
      <nz-filter-trigger
        [nzVisible]="isVisible"
        [nzActive]="isChecked"
        [nzDropdownMenu]="filterMenu"
        (nzVisibleChange)="onVisibleChange($event)"
      >
        <i nz-icon nzType="filter" nzTheme="fill"></i>
      </nz-filter-trigger>
      <nz-dropdown-menu #filterMenu="nzDropdownMenu">
        <div class="ant-table-filter-dropdown">
          <ul nz-menu>
            <li
              nz-menu-item
              [nzSelected]="f.checked"
              *ngFor="let f of listOfParsedFilter; trackBy: trackByValue"
              (click)="check(f)"
            >
              <label nz-radio *ngIf="!filterMultiple" [ngModel]="f.checked" (ngModelChange)="check(f)"></label>
              <label nz-checkbox *ngIf="filterMultiple" [ngModel]="f.checked" (ngModelChange)="check(f)"></label>
              <span>{{ f.text }}</span>
            </li>
          </ul>
          <div class="ant-table-filter-dropdown-btns">
            <button nz-button nzType="link" nzSize="small" (click)="reset()" [disabled]="!isChecked">
              {{ locale.filterReset }}
            </button>
            <button nz-button nzType="primary" nzSize="small" (click)="confirm()">{{ locale.filterConfirm }}</button>
          </div>
        </div>
      </nz-dropdown-menu>
    </ng-container>
  `, isInline: true, components: [{ type: NzFilterTriggerComponent, selector: "nz-filter-trigger", inputs: ["nzActive", "nzDropdownMenu", "nzVisible", "nzBackdrop"], outputs: ["nzVisibleChange"], exportAs: ["nzFilterTrigger"] }, { type: i3.NzDropdownMenuComponent, selector: "nz-dropdown-menu", exportAs: ["nzDropdownMenu"] }, { type: i4.NzRadioComponent, selector: "[nz-radio],[nz-radio-button]", inputs: ["nzValue", "nzDisabled", "nzAutoFocus"], exportAs: ["nzRadio"] }, { type: i1$2.NzCheckboxComponent, selector: "[nz-checkbox]", inputs: ["nzValue", "nzAutoFocus", "nzDisabled", "nzIndeterminate", "nzChecked", "nzId"], outputs: ["nzCheckedChange"], exportAs: ["nzCheckbox"] }, { type: i6.NzButtonComponent, selector: "button[nz-button], a[nz-button]", inputs: ["nzBlock", "nzGhost", "nzSearch", "nzLoading", "nzDanger", "disabled", "tabIndex", "nzType", "nzShape", "nzSize"], exportAs: ["nzButton"] }], directives: [{ type: i3$1.NgTemplateOutlet, selector: "[ngTemplateOutlet]", inputs: ["ngTemplateOutletContext", "ngTemplateOutlet"] }, { type: i3$1.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { type: i8.ɵNzTransitionPatchDirective, selector: "[nz-button], nz-button-group, [nz-icon], [nz-menu-item], [nz-submenu], nz-select-top-control, nz-select-placeholder, nz-input-group", inputs: ["hidden"] }, { type: i9.NzIconDirective, selector: "[nz-icon]", inputs: ["nzSpin", "nzRotate", "nzType", "nzTheme", "nzTwotoneColor", "nzIconfont"], exportAs: ["nzIcon"] }, { type: i10.NzMenuDirective, selector: "[nz-menu]", inputs: ["nzInlineIndent", "nzTheme", "nzMode", "nzInlineCollapsed", "nzSelectable"], outputs: ["nzClick"], exportAs: ["nzMenu"] }, { type: i3$1.NgForOf, selector: "[ngFor][ngForOf]", inputs: ["ngForOf", "ngForTrackBy", "ngForTemplate"] }, { type: i10.NzMenuItemDirective, selector: "[nz-menu-item]", inputs: ["nzPaddingLeft", "nzDisabled", "nzSelected", "nzDanger", "nzMatchRouterExact", "nzMatchRouter"], exportAs: ["nzMenuItem"] }, { type: i11.NgControlStatus, selector: "[formControlName],[ngModel],[formControl]" }, { type: i11.NgModel, selector: "[ngModel]:not([formControlName]):not([formControl])", inputs: ["name", "disabled", "ngModel", "ngModelOptions"], outputs: ["ngModelChange"], exportAs: ["ngModel"] }, { type: i12.NzWaveDirective, selector: "[nz-wave],button[nz-button]:not([nzType=\"link\"]):not([nzType=\"text\"])", inputs: ["nzWaveExtraNode"], exportAs: ["nzWave"] }], changeDetection: i0.ChangeDetectionStrategy.OnPush, encapsulation: i0.ViewEncapsulation.None });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.1.2", ngImport: i0, type: NzTableFilterComponent, decorators: [{
            type: Component,
            args: [{
                    selector: 'nz-table-filter',
                    preserveWhitespaces: false,
                    changeDetection: ChangeDetectionStrategy.OnPush,
                    encapsulation: ViewEncapsulation.None,
                    template: `
    <span class="ant-table-column-title">
      <ng-template [ngTemplateOutlet]="contentTemplate"></ng-template>
    </span>
    <ng-container *ngIf="!customFilter; else extraTemplate">
      <nz-filter-trigger
        [nzVisible]="isVisible"
        [nzActive]="isChecked"
        [nzDropdownMenu]="filterMenu"
        (nzVisibleChange)="onVisibleChange($event)"
      >
        <i nz-icon nzType="filter" nzTheme="fill"></i>
      </nz-filter-trigger>
      <nz-dropdown-menu #filterMenu="nzDropdownMenu">
        <div class="ant-table-filter-dropdown">
          <ul nz-menu>
            <li
              nz-menu-item
              [nzSelected]="f.checked"
              *ngFor="let f of listOfParsedFilter; trackBy: trackByValue"
              (click)="check(f)"
            >
              <label nz-radio *ngIf="!filterMultiple" [ngModel]="f.checked" (ngModelChange)="check(f)"></label>
              <label nz-checkbox *ngIf="filterMultiple" [ngModel]="f.checked" (ngModelChange)="check(f)"></label>
              <span>{{ f.text }}</span>
            </li>
          </ul>
          <div class="ant-table-filter-dropdown-btns">
            <button nz-button nzType="link" nzSize="small" (click)="reset()" [disabled]="!isChecked">
              {{ locale.filterReset }}
            </button>
            <button nz-button nzType="primary" nzSize="small" (click)="confirm()">{{ locale.filterConfirm }}</button>
          </div>
        </div>
      </nz-dropdown-menu>
    </ng-container>
  `,
                    host: { class: 'ant-table-filter-column' }
                }]
        }], ctorParameters: function () { return [{ type: i0.ChangeDetectorRef }, { type: i1$1.NzI18nService }]; }, propDecorators: { contentTemplate: [{
                type: Input
            }], customFilter: [{
                type: Input
            }], extraTemplate: [{
                type: Input
            }], filterMultiple: [{
                type: Input
            }], listOfFilter: [{
                type: Input
            }], filterChange: [{
                type: Output
            }] } });

/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */
class NzRowExpandButtonDirective {
    constructor() {
        this.expand = false;
        this.spaceMode = false;
        this.expandChange = new EventEmitter();
    }
    onHostClick() {
        if (!this.spaceMode) {
            this.expand = !this.expand;
            this.expandChange.next(this.expand);
        }
    }
}
NzRowExpandButtonDirective.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.1.2", ngImport: i0, type: NzRowExpandButtonDirective, deps: [], target: i0.ɵɵFactoryTarget.Directive });
NzRowExpandButtonDirective.ɵdir = i0.ɵɵngDeclareDirective({ minVersion: "12.0.0", version: "13.1.2", type: NzRowExpandButtonDirective, selector: "button[nz-row-expand-button]", inputs: { expand: "expand", spaceMode: "spaceMode" }, outputs: { expandChange: "expandChange" }, host: { listeners: { "click": "onHostClick()" }, properties: { "type": "'button'", "class.ant-table-row-expand-icon-expanded": "!spaceMode && expand === true", "class.ant-table-row-expand-icon-collapsed": "!spaceMode && expand === false", "class.ant-table-row-expand-icon-spaced": "spaceMode" }, classAttribute: "ant-table-row-expand-icon" }, ngImport: i0 });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.1.2", ngImport: i0, type: NzRowExpandButtonDirective, decorators: [{
            type: Directive,
            args: [{
                    selector: 'button[nz-row-expand-button]',
                    host: {
                        class: 'ant-table-row-expand-icon',
                        '[type]': `'button'`,
                        '[class.ant-table-row-expand-icon-expanded]': `!spaceMode && expand === true`,
                        '[class.ant-table-row-expand-icon-collapsed]': `!spaceMode && expand === false`,
                        '[class.ant-table-row-expand-icon-spaced]': 'spaceMode',
                        '(click)': 'onHostClick()'
                    }
                }]
        }], ctorParameters: function () { return []; }, propDecorators: { expand: [{
                type: Input
            }], spaceMode: [{
                type: Input
            }], expandChange: [{
                type: Output
            }] } });

/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */
class NzRowIndentDirective {
    constructor() {
        this.indentSize = 0;
    }
}
NzRowIndentDirective.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.1.2", ngImport: i0, type: NzRowIndentDirective, deps: [], target: i0.ɵɵFactoryTarget.Directive });
NzRowIndentDirective.ɵdir = i0.ɵɵngDeclareDirective({ minVersion: "12.0.0", version: "13.1.2", type: NzRowIndentDirective, selector: "nz-row-indent", inputs: { indentSize: "indentSize" }, host: { properties: { "style.padding-left.px": "indentSize" }, classAttribute: "ant-table-row-indent" }, ngImport: i0 });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.1.2", ngImport: i0, type: NzRowIndentDirective, decorators: [{
            type: Directive,
            args: [{
                    selector: 'nz-row-indent',
                    host: {
                        class: 'ant-table-row-indent',
                        '[style.padding-left.px]': 'indentSize'
                    }
                }]
        }], ctorParameters: function () { return []; }, propDecorators: { indentSize: [{
                type: Input
            }] } });

/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */
class NzTableSelectionComponent {
    constructor() {
        this.listOfSelections = [];
        this.checked = false;
        this.disabled = false;
        this.indeterminate = false;
        this.showCheckbox = false;
        this.showRowSelection = false;
        this.checkedChange = new EventEmitter();
    }
    onCheckedChange(checked) {
        this.checked = checked;
        this.checkedChange.emit(checked);
    }
}
NzTableSelectionComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.1.2", ngImport: i0, type: NzTableSelectionComponent, deps: [], target: i0.ɵɵFactoryTarget.Component });
NzTableSelectionComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "13.1.2", type: NzTableSelectionComponent, selector: "nz-table-selection", inputs: { listOfSelections: "listOfSelections", checked: "checked", disabled: "disabled", indeterminate: "indeterminate", showCheckbox: "showCheckbox", showRowSelection: "showRowSelection" }, outputs: { checkedChange: "checkedChange" }, host: { classAttribute: "ant-table-selection" }, ngImport: i0, template: `
    <label
      *ngIf="showCheckbox"
      nz-checkbox
      [class.ant-table-selection-select-all-custom]="showRowSelection"
      [ngModel]="checked"
      [nzDisabled]="disabled"
      [nzIndeterminate]="indeterminate"
      (ngModelChange)="onCheckedChange($event)"
    ></label>
    <div class="ant-table-selection-extra" *ngIf="showRowSelection">
      <span nz-dropdown class="ant-table-selection-down" nzPlacement="bottomLeft" [nzDropdownMenu]="selectionMenu">
        <i nz-icon nzType="down"></i>
      </span>
      <nz-dropdown-menu #selectionMenu="nzDropdownMenu">
        <ul nz-menu class="ant-table-selection-menu">
          <li nz-menu-item *ngFor="let selection of listOfSelections" (click)="selection.onSelect()">
            {{ selection.text }}
          </li>
        </ul>
      </nz-dropdown-menu>
    </div>
  `, isInline: true, components: [{ type: i1$2.NzCheckboxComponent, selector: "[nz-checkbox]", inputs: ["nzValue", "nzAutoFocus", "nzDisabled", "nzIndeterminate", "nzChecked", "nzId"], outputs: ["nzCheckedChange"], exportAs: ["nzCheckbox"] }, { type: i3.NzDropdownMenuComponent, selector: "nz-dropdown-menu", exportAs: ["nzDropdownMenu"] }], directives: [{ type: i3$1.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { type: i11.NgControlStatus, selector: "[formControlName],[ngModel],[formControl]" }, { type: i11.NgModel, selector: "[ngModel]:not([formControlName]):not([formControl])", inputs: ["name", "disabled", "ngModel", "ngModelOptions"], outputs: ["ngModelChange"], exportAs: ["ngModel"] }, { type: i3.NzDropDownDirective, selector: "[nz-dropdown]", inputs: ["nzDropdownMenu", "nzTrigger", "nzMatchWidthElement", "nzBackdrop", "nzClickHide", "nzDisabled", "nzVisible", "nzOverlayClassName", "nzOverlayStyle", "nzPlacement"], outputs: ["nzVisibleChange"], exportAs: ["nzDropdown"] }, { type: i8.ɵNzTransitionPatchDirective, selector: "[nz-button], nz-button-group, [nz-icon], [nz-menu-item], [nz-submenu], nz-select-top-control, nz-select-placeholder, nz-input-group", inputs: ["hidden"] }, { type: i9.NzIconDirective, selector: "[nz-icon]", inputs: ["nzSpin", "nzRotate", "nzType", "nzTheme", "nzTwotoneColor", "nzIconfont"], exportAs: ["nzIcon"] }, { type: i10.NzMenuDirective, selector: "[nz-menu]", inputs: ["nzInlineIndent", "nzTheme", "nzMode", "nzInlineCollapsed", "nzSelectable"], outputs: ["nzClick"], exportAs: ["nzMenu"] }, { type: i3$1.NgForOf, selector: "[ngFor][ngForOf]", inputs: ["ngForOf", "ngForTrackBy", "ngForTemplate"] }, { type: i10.NzMenuItemDirective, selector: "[nz-menu-item]", inputs: ["nzPaddingLeft", "nzDisabled", "nzSelected", "nzDanger", "nzMatchRouterExact", "nzMatchRouter"], exportAs: ["nzMenuItem"] }], changeDetection: i0.ChangeDetectionStrategy.OnPush, encapsulation: i0.ViewEncapsulation.None });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.1.2", ngImport: i0, type: NzTableSelectionComponent, decorators: [{
            type: Component,
            args: [{
                    selector: 'nz-table-selection',
                    preserveWhitespaces: false,
                    changeDetection: ChangeDetectionStrategy.OnPush,
                    encapsulation: ViewEncapsulation.None,
                    template: `
    <label
      *ngIf="showCheckbox"
      nz-checkbox
      [class.ant-table-selection-select-all-custom]="showRowSelection"
      [ngModel]="checked"
      [nzDisabled]="disabled"
      [nzIndeterminate]="indeterminate"
      (ngModelChange)="onCheckedChange($event)"
    ></label>
    <div class="ant-table-selection-extra" *ngIf="showRowSelection">
      <span nz-dropdown class="ant-table-selection-down" nzPlacement="bottomLeft" [nzDropdownMenu]="selectionMenu">
        <i nz-icon nzType="down"></i>
      </span>
      <nz-dropdown-menu #selectionMenu="nzDropdownMenu">
        <ul nz-menu class="ant-table-selection-menu">
          <li nz-menu-item *ngFor="let selection of listOfSelections" (click)="selection.onSelect()">
            {{ selection.text }}
          </li>
        </ul>
      </nz-dropdown-menu>
    </div>
  `,
                    host: { class: 'ant-table-selection' }
                }]
        }], ctorParameters: function () { return []; }, propDecorators: { listOfSelections: [{
                type: Input
            }], checked: [{
                type: Input
            }], disabled: [{
                type: Input
            }], indeterminate: [{
                type: Input
            }], showCheckbox: [{
                type: Input
            }], showRowSelection: [{
                type: Input
            }], checkedChange: [{
                type: Output
            }] } });

/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */
class NzTableSortersComponent {
    constructor() {
        this.sortDirections = ['ascend', 'descend', null];
        this.sortOrder = null;
        this.contentTemplate = null;
        this.isUp = false;
        this.isDown = false;
    }
    ngOnChanges(changes) {
        const { sortDirections } = changes;
        if (sortDirections) {
            this.isUp = this.sortDirections.indexOf('ascend') !== -1;
            this.isDown = this.sortDirections.indexOf('descend') !== -1;
        }
    }
}
NzTableSortersComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.1.2", ngImport: i0, type: NzTableSortersComponent, deps: [], target: i0.ɵɵFactoryTarget.Component });
NzTableSortersComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "13.1.2", type: NzTableSortersComponent, selector: "nz-table-sorters", inputs: { sortDirections: "sortDirections", sortOrder: "sortOrder", contentTemplate: "contentTemplate" }, host: { classAttribute: "ant-table-column-sorters" }, usesOnChanges: true, ngImport: i0, template: `
    <span class="ant-table-column-title"><ng-template [ngTemplateOutlet]="contentTemplate"></ng-template></span>
    <span class="ant-table-column-sorter" [class.ant-table-column-sorter-full]="isDown && isUp">
      <span class="ant-table-column-sorter-inner">
        <i
          nz-icon
          nzType="caret-up"
          *ngIf="isUp"
          class="ant-table-column-sorter-up"
          [class.active]="sortOrder === 'ascend'"
        ></i>
        <i
          nz-icon
          nzType="caret-down"
          *ngIf="isDown"
          class="ant-table-column-sorter-down"
          [class.active]="sortOrder === 'descend'"
        ></i>
      </span>
    </span>
  `, isInline: true, directives: [{ type: i3$1.NgTemplateOutlet, selector: "[ngTemplateOutlet]", inputs: ["ngTemplateOutletContext", "ngTemplateOutlet"] }, { type: i3$1.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { type: i8.ɵNzTransitionPatchDirective, selector: "[nz-button], nz-button-group, [nz-icon], [nz-menu-item], [nz-submenu], nz-select-top-control, nz-select-placeholder, nz-input-group", inputs: ["hidden"] }, { type: i9.NzIconDirective, selector: "[nz-icon]", inputs: ["nzSpin", "nzRotate", "nzType", "nzTheme", "nzTwotoneColor", "nzIconfont"], exportAs: ["nzIcon"] }], changeDetection: i0.ChangeDetectionStrategy.OnPush, encapsulation: i0.ViewEncapsulation.None });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.1.2", ngImport: i0, type: NzTableSortersComponent, decorators: [{
            type: Component,
            args: [{
                    selector: 'nz-table-sorters',
                    preserveWhitespaces: false,
                    changeDetection: ChangeDetectionStrategy.OnPush,
                    encapsulation: ViewEncapsulation.None,
                    template: `
    <span class="ant-table-column-title"><ng-template [ngTemplateOutlet]="contentTemplate"></ng-template></span>
    <span class="ant-table-column-sorter" [class.ant-table-column-sorter-full]="isDown && isUp">
      <span class="ant-table-column-sorter-inner">
        <i
          nz-icon
          nzType="caret-up"
          *ngIf="isUp"
          class="ant-table-column-sorter-up"
          [class.active]="sortOrder === 'ascend'"
        ></i>
        <i
          nz-icon
          nzType="caret-down"
          *ngIf="isDown"
          class="ant-table-column-sorter-down"
          [class.active]="sortOrder === 'descend'"
        ></i>
      </span>
    </span>
  `,
                    host: { class: 'ant-table-column-sorters' }
                }]
        }], ctorParameters: function () { return []; }, propDecorators: { sortDirections: [{
                type: Input
            }], sortOrder: [{
                type: Input
            }], contentTemplate: [{
                type: Input
            }] } });

/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */
class NzCellFixedDirective {
    constructor(renderer, elementRef) {
        this.renderer = renderer;
        this.elementRef = elementRef;
        this.nzRight = false;
        this.nzLeft = false;
        this.colspan = null;
        this.colSpan = null;
        this.changes$ = new Subject();
        this.isAutoLeft = false;
        this.isAutoRight = false;
        this.isFixedLeft = false;
        this.isFixedRight = false;
        this.isFixed = false;
    }
    setAutoLeftWidth(autoLeft) {
        this.renderer.setStyle(this.elementRef.nativeElement, 'left', autoLeft);
    }
    setAutoRightWidth(autoRight) {
        this.renderer.setStyle(this.elementRef.nativeElement, 'right', autoRight);
    }
    setIsFirstRight(isFirstRight) {
        this.setFixClass(isFirstRight, 'ant-table-cell-fix-right-first');
    }
    setIsLastLeft(isLastLeft) {
        this.setFixClass(isLastLeft, 'ant-table-cell-fix-left-last');
    }
    setFixClass(flag, className) {
        // the setFixClass function may call many times, so remove it first.
        this.renderer.removeClass(this.elementRef.nativeElement, className);
        if (flag) {
            this.renderer.addClass(this.elementRef.nativeElement, className);
        }
    }
    ngOnChanges() {
        this.setIsFirstRight(false);
        this.setIsLastLeft(false);
        this.isAutoLeft = this.nzLeft === '' || this.nzLeft === true;
        this.isAutoRight = this.nzRight === '' || this.nzRight === true;
        this.isFixedLeft = this.nzLeft !== false;
        this.isFixedRight = this.nzRight !== false;
        this.isFixed = this.isFixedLeft || this.isFixedRight;
        const validatePx = (value) => {
            if (typeof value === 'string' && value !== '') {
                return value;
            }
            else {
                return null;
            }
        };
        this.setAutoLeftWidth(validatePx(this.nzLeft));
        this.setAutoRightWidth(validatePx(this.nzRight));
        this.changes$.next();
    }
}
NzCellFixedDirective.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.1.2", ngImport: i0, type: NzCellFixedDirective, deps: [{ token: i0.Renderer2 }, { token: i0.ElementRef }], target: i0.ɵɵFactoryTarget.Directive });
NzCellFixedDirective.ɵdir = i0.ɵɵngDeclareDirective({ minVersion: "12.0.0", version: "13.1.2", type: NzCellFixedDirective, selector: "td[nzRight],th[nzRight],td[nzLeft],th[nzLeft]", inputs: { nzRight: "nzRight", nzLeft: "nzLeft", colspan: "colspan", colSpan: "colSpan" }, host: { properties: { "class.ant-table-cell-fix-right": "isFixedRight", "class.ant-table-cell-fix-left": "isFixedLeft", "style.position": "isFixed? 'sticky' : null" } }, usesOnChanges: true, ngImport: i0 });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.1.2", ngImport: i0, type: NzCellFixedDirective, decorators: [{
            type: Directive,
            args: [{
                    selector: 'td[nzRight],th[nzRight],td[nzLeft],th[nzLeft]',
                    host: {
                        '[class.ant-table-cell-fix-right]': `isFixedRight`,
                        '[class.ant-table-cell-fix-left]': `isFixedLeft`,
                        '[style.position]': `isFixed? 'sticky' : null`
                    }
                }]
        }], ctorParameters: function () { return [{ type: i0.Renderer2 }, { type: i0.ElementRef }]; }, propDecorators: { nzRight: [{
                type: Input
            }], nzLeft: [{
                type: Input
            }], colspan: [{
                type: Input
            }], colSpan: [{
                type: Input
            }] } });

/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */
class NzTableStyleService {
    constructor() {
        this.theadTemplate$ = new ReplaySubject(1);
        this.hasFixLeft$ = new ReplaySubject(1);
        this.hasFixRight$ = new ReplaySubject(1);
        this.hostWidth$ = new ReplaySubject(1);
        this.columnCount$ = new ReplaySubject(1);
        this.showEmpty$ = new ReplaySubject(1);
        this.noResult$ = new ReplaySubject(1);
        this.listOfThWidthConfigPx$ = new BehaviorSubject([]);
        this.tableWidthConfigPx$ = new BehaviorSubject([]);
        this.manualWidthConfigPx$ = combineLatest([this.tableWidthConfigPx$, this.listOfThWidthConfigPx$]).pipe(map(([widthConfig, listOfWidth]) => (widthConfig.length ? widthConfig : listOfWidth)));
        this.listOfAutoWidthPx$ = new ReplaySubject(1);
        this.listOfListOfThWidthPx$ = merge(
        /** init with manual width **/
        this.manualWidthConfigPx$, combineLatest([this.listOfAutoWidthPx$, this.manualWidthConfigPx$]).pipe(map(([autoWidth, manualWidth]) => {
            /** use autoWidth until column length match **/
            if (autoWidth.length === manualWidth.length) {
                return autoWidth.map((width, index) => {
                    if (width === '0px') {
                        return manualWidth[index] || null;
                    }
                    else {
                        return manualWidth[index] || width;
                    }
                });
            }
            else {
                return manualWidth;
            }
        })));
        this.listOfMeasureColumn$ = new ReplaySubject(1);
        this.listOfListOfThWidth$ = this.listOfAutoWidthPx$.pipe(map(list => list.map(width => parseInt(width, 10))));
        this.enableAutoMeasure$ = new ReplaySubject(1);
    }
    setTheadTemplate(template) {
        this.theadTemplate$.next(template);
    }
    setHasFixLeft(hasFixLeft) {
        this.hasFixLeft$.next(hasFixLeft);
    }
    setHasFixRight(hasFixRight) {
        this.hasFixRight$.next(hasFixRight);
    }
    setTableWidthConfig(widthConfig) {
        this.tableWidthConfigPx$.next(widthConfig);
    }
    setListOfTh(listOfTh) {
        let columnCount = 0;
        listOfTh.forEach(th => {
            columnCount += (th.colspan && +th.colspan) || (th.colSpan && +th.colSpan) || 1;
        });
        const listOfThPx = listOfTh.map(item => item.nzWidth);
        this.columnCount$.next(columnCount);
        this.listOfThWidthConfigPx$.next(listOfThPx);
    }
    setListOfMeasureColumn(listOfTh) {
        const listOfKeys = [];
        listOfTh.forEach(th => {
            const length = (th.colspan && +th.colspan) || (th.colSpan && +th.colSpan) || 1;
            for (let i = 0; i < length; i++) {
                listOfKeys.push(`measure_key_${i}`);
            }
        });
        this.listOfMeasureColumn$.next(listOfKeys);
    }
    setListOfAutoWidth(listOfAutoWidth) {
        this.listOfAutoWidthPx$.next(listOfAutoWidth.map(width => `${width}px`));
    }
    setShowEmpty(showEmpty) {
        this.showEmpty$.next(showEmpty);
    }
    setNoResult(noResult) {
        this.noResult$.next(noResult);
    }
    setScroll(scrollX, scrollY) {
        const enableAutoMeasure = !!(scrollX || scrollY);
        if (!enableAutoMeasure) {
            this.setListOfAutoWidth([]);
        }
        this.enableAutoMeasure$.next(enableAutoMeasure);
    }
}
NzTableStyleService.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.1.2", ngImport: i0, type: NzTableStyleService, deps: [], target: i0.ɵɵFactoryTarget.Injectable });
NzTableStyleService.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "13.1.2", ngImport: i0, type: NzTableStyleService });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.1.2", ngImport: i0, type: NzTableStyleService, decorators: [{
            type: Injectable
        }], ctorParameters: function () { return []; } });

/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */
class NzTableCellDirective {
    constructor(nzTableStyleService) {
        this.isInsideTable = false;
        this.isInsideTable = !!nzTableStyleService;
    }
}
NzTableCellDirective.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.1.2", ngImport: i0, type: NzTableCellDirective, deps: [{ token: NzTableStyleService, optional: true }], target: i0.ɵɵFactoryTarget.Directive });
NzTableCellDirective.ɵdir = i0.ɵɵngDeclareDirective({ minVersion: "12.0.0", version: "13.1.2", type: NzTableCellDirective, selector: "th:not(.nz-disable-th):not([mat-cell]), td:not(.nz-disable-td):not([mat-cell])", host: { properties: { "class.ant-table-cell": "isInsideTable" } }, ngImport: i0 });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.1.2", ngImport: i0, type: NzTableCellDirective, decorators: [{
            type: Directive,
            args: [{
                    selector: 'th:not(.nz-disable-th):not([mat-cell]), td:not(.nz-disable-td):not([mat-cell])',
                    host: {
                        '[class.ant-table-cell]': 'isInsideTable'
                    }
                }]
        }], ctorParameters: function () {
        return [{ type: NzTableStyleService, decorators: [{
                        type: Optional
                    }] }];
    } });

class NzTdAddOnComponent {
    constructor() {
        this.nzChecked = false;
        this.nzDisabled = false;
        this.nzIndeterminate = false;
        this.nzIndentSize = 0;
        this.nzShowExpand = false;
        this.nzShowCheckbox = false;
        this.nzExpand = false;
        this.nzCheckedChange = new EventEmitter();
        this.nzExpandChange = new EventEmitter();
        this.isNzShowExpandChanged = false;
        this.isNzShowCheckboxChanged = false;
    }
    onCheckedChange(checked) {
        this.nzChecked = checked;
        this.nzCheckedChange.emit(checked);
    }
    onExpandChange(expand) {
        this.nzExpand = expand;
        this.nzExpandChange.emit(expand);
    }
    ngOnChanges(changes) {
        const isFirstChange = (value) => value && value.firstChange && value.currentValue !== undefined;
        const { nzExpand, nzChecked, nzShowExpand, nzShowCheckbox } = changes;
        if (nzShowExpand) {
            this.isNzShowExpandChanged = true;
        }
        if (nzShowCheckbox) {
            this.isNzShowCheckboxChanged = true;
        }
        if (isFirstChange(nzExpand) && !this.isNzShowExpandChanged) {
            this.nzShowExpand = true;
        }
        if (isFirstChange(nzChecked) && !this.isNzShowCheckboxChanged) {
            this.nzShowCheckbox = true;
        }
    }
}
NzTdAddOnComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.1.2", ngImport: i0, type: NzTdAddOnComponent, deps: [], target: i0.ɵɵFactoryTarget.Component });
NzTdAddOnComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "13.1.2", type: NzTdAddOnComponent, selector: "td[nzChecked], td[nzDisabled], td[nzIndeterminate], td[nzIndentSize], td[nzExpand], td[nzShowExpand], td[nzShowCheckbox]", inputs: { nzChecked: "nzChecked", nzDisabled: "nzDisabled", nzIndeterminate: "nzIndeterminate", nzIndentSize: "nzIndentSize", nzShowExpand: "nzShowExpand", nzShowCheckbox: "nzShowCheckbox", nzExpand: "nzExpand" }, outputs: { nzCheckedChange: "nzCheckedChange", nzExpandChange: "nzExpandChange" }, host: { properties: { "class.ant-table-cell-with-append": "nzShowExpand || nzIndentSize > 0", "class.ant-table-selection-column": "nzShowCheckbox" } }, usesOnChanges: true, ngImport: i0, template: `
    <ng-container *ngIf="nzShowExpand || nzIndentSize > 0">
      <nz-row-indent [indentSize]="nzIndentSize"></nz-row-indent>
      <button
        nz-row-expand-button
        [expand]="nzExpand"
        (expandChange)="onExpandChange($event)"
        [spaceMode]="!nzShowExpand"
      ></button>
    </ng-container>
    <label
      nz-checkbox
      *ngIf="nzShowCheckbox"
      [nzDisabled]="nzDisabled"
      [ngModel]="nzChecked"
      [nzIndeterminate]="nzIndeterminate"
      (ngModelChange)="onCheckedChange($event)"
    ></label>
    <ng-content></ng-content>
  `, isInline: true, components: [{ type: i1$2.NzCheckboxComponent, selector: "[nz-checkbox]", inputs: ["nzValue", "nzAutoFocus", "nzDisabled", "nzIndeterminate", "nzChecked", "nzId"], outputs: ["nzCheckedChange"], exportAs: ["nzCheckbox"] }], directives: [{ type: i3$1.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { type: NzRowIndentDirective, selector: "nz-row-indent", inputs: ["indentSize"] }, { type: NzRowExpandButtonDirective, selector: "button[nz-row-expand-button]", inputs: ["expand", "spaceMode"], outputs: ["expandChange"] }, { type: i11.NgControlStatus, selector: "[formControlName],[ngModel],[formControl]" }, { type: i11.NgModel, selector: "[ngModel]:not([formControlName]):not([formControl])", inputs: ["name", "disabled", "ngModel", "ngModelOptions"], outputs: ["ngModelChange"], exportAs: ["ngModel"] }], changeDetection: i0.ChangeDetectionStrategy.OnPush, encapsulation: i0.ViewEncapsulation.None });
__decorate([
    InputBoolean()
], NzTdAddOnComponent.prototype, "nzShowExpand", void 0);
__decorate([
    InputBoolean()
], NzTdAddOnComponent.prototype, "nzShowCheckbox", void 0);
__decorate([
    InputBoolean()
], NzTdAddOnComponent.prototype, "nzExpand", void 0);
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.1.2", ngImport: i0, type: NzTdAddOnComponent, decorators: [{
            type: Component,
            args: [{
                    selector: 'td[nzChecked], td[nzDisabled], td[nzIndeterminate], td[nzIndentSize], td[nzExpand], td[nzShowExpand], td[nzShowCheckbox]',
                    changeDetection: ChangeDetectionStrategy.OnPush,
                    preserveWhitespaces: false,
                    encapsulation: ViewEncapsulation.None,
                    template: `
    <ng-container *ngIf="nzShowExpand || nzIndentSize > 0">
      <nz-row-indent [indentSize]="nzIndentSize"></nz-row-indent>
      <button
        nz-row-expand-button
        [expand]="nzExpand"
        (expandChange)="onExpandChange($event)"
        [spaceMode]="!nzShowExpand"
      ></button>
    </ng-container>
    <label
      nz-checkbox
      *ngIf="nzShowCheckbox"
      [nzDisabled]="nzDisabled"
      [ngModel]="nzChecked"
      [nzIndeterminate]="nzIndeterminate"
      (ngModelChange)="onCheckedChange($event)"
    ></label>
    <ng-content></ng-content>
  `,
                    host: {
                        '[class.ant-table-cell-with-append]': `nzShowExpand || nzIndentSize > 0`,
                        '[class.ant-table-selection-column]': `nzShowCheckbox`
                    }
                }]
        }], propDecorators: { nzChecked: [{
                type: Input
            }], nzDisabled: [{
                type: Input
            }], nzIndeterminate: [{
                type: Input
            }], nzIndentSize: [{
                type: Input
            }], nzShowExpand: [{
                type: Input
            }], nzShowCheckbox: [{
                type: Input
            }], nzExpand: [{
                type: Input
            }], nzCheckedChange: [{
                type: Output
            }], nzExpandChange: [{
                type: Output
            }] } });

class NzThAddOnComponent {
    constructor(cdr) {
        this.cdr = cdr;
        this.manualClickOrder$ = new Subject();
        this.calcOperatorChange$ = new Subject();
        this.nzFilterValue = null;
        this.sortOrder = null;
        this.sortDirections = ['ascend', 'descend', null];
        this.sortOrderChange$ = new Subject();
        this.destroy$ = new Subject();
        this.isNzShowSortChanged = false;
        this.isNzShowFilterChanged = false;
        this.nzFilterMultiple = true;
        this.nzSortOrder = null;
        this.nzSortPriority = false;
        this.nzSortDirections = ['ascend', 'descend', null];
        this.nzFilters = [];
        this.nzSortFn = null;
        this.nzFilterFn = null;
        this.nzShowSort = false;
        this.nzShowFilter = false;
        this.nzCustomFilter = false;
        this.nzCheckedChange = new EventEmitter();
        this.nzSortOrderChange = new EventEmitter();
        this.nzFilterChange = new EventEmitter();
    }
    getNextSortDirection(sortDirections, current) {
        const index = sortDirections.indexOf(current);
        if (index === sortDirections.length - 1) {
            return sortDirections[0];
        }
        else {
            return sortDirections[index + 1];
        }
    }
    emitNextSortValue() {
        if (this.nzShowSort) {
            const nextOrder = this.getNextSortDirection(this.sortDirections, this.sortOrder);
            this.setSortOrder(nextOrder);
            this.manualClickOrder$.next(this);
        }
    }
    setSortOrder(order) {
        this.sortOrderChange$.next(order);
    }
    clearSortOrder() {
        if (this.sortOrder !== null) {
            this.setSortOrder(null);
        }
    }
    onFilterValueChange(value) {
        this.nzFilterChange.emit(value);
        this.nzFilterValue = value;
        this.updateCalcOperator();
    }
    updateCalcOperator() {
        this.calcOperatorChange$.next();
    }
    ngOnInit() {
        this.sortOrderChange$.pipe(takeUntil(this.destroy$)).subscribe(order => {
            if (this.sortOrder !== order) {
                this.sortOrder = order;
                this.nzSortOrderChange.emit(order);
            }
            this.updateCalcOperator();
            this.cdr.markForCheck();
        });
    }
    ngOnChanges(changes) {
        const { nzSortDirections, nzFilters, nzSortOrder, nzSortFn, nzFilterFn, nzSortPriority, nzFilterMultiple, nzShowSort, nzShowFilter } = changes;
        if (nzSortDirections) {
            if (this.nzSortDirections && this.nzSortDirections.length) {
                this.sortDirections = this.nzSortDirections;
            }
        }
        if (nzSortOrder) {
            this.sortOrder = this.nzSortOrder;
            this.setSortOrder(this.nzSortOrder);
        }
        if (nzShowSort) {
            this.isNzShowSortChanged = true;
        }
        if (nzShowFilter) {
            this.isNzShowFilterChanged = true;
        }
        const isFirstChange = (value) => value && value.firstChange && value.currentValue !== undefined;
        if ((isFirstChange(nzSortOrder) || isFirstChange(nzSortFn)) && !this.isNzShowSortChanged) {
            this.nzShowSort = true;
        }
        if (isFirstChange(nzFilters) && !this.isNzShowFilterChanged) {
            this.nzShowFilter = true;
        }
        if ((nzFilters || nzFilterMultiple) && this.nzShowFilter) {
            const listOfValue = this.nzFilters.filter(item => item.byDefault).map(item => item.value);
            this.nzFilterValue = this.nzFilterMultiple ? listOfValue : listOfValue[0] || null;
        }
        if (nzSortFn || nzFilterFn || nzSortPriority || nzFilters) {
            this.updateCalcOperator();
        }
    }
    ngOnDestroy() {
        this.destroy$.next();
        this.destroy$.complete();
    }
}
NzThAddOnComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.1.2", ngImport: i0, type: NzThAddOnComponent, deps: [{ token: i0.ChangeDetectorRef }], target: i0.ɵɵFactoryTarget.Component });
NzThAddOnComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "13.1.2", type: NzThAddOnComponent, selector: "th[nzColumnKey], th[nzSortFn], th[nzSortOrder], th[nzFilters], th[nzShowSort], th[nzShowFilter], th[nzCustomFilter]", inputs: { nzColumnKey: "nzColumnKey", nzFilterMultiple: "nzFilterMultiple", nzSortOrder: "nzSortOrder", nzSortPriority: "nzSortPriority", nzSortDirections: "nzSortDirections", nzFilters: "nzFilters", nzSortFn: "nzSortFn", nzFilterFn: "nzFilterFn", nzShowSort: "nzShowSort", nzShowFilter: "nzShowFilter", nzCustomFilter: "nzCustomFilter" }, outputs: { nzCheckedChange: "nzCheckedChange", nzSortOrderChange: "nzSortOrderChange", nzFilterChange: "nzFilterChange" }, host: { listeners: { "click": "emitNextSortValue()" }, properties: { "class.ant-table-column-has-sorters": "nzShowSort", "class.ant-table-column-sort": "sortOrder === 'descend' || sortOrder === 'ascend'" } }, usesOnChanges: true, ngImport: i0, template: `
    <nz-table-filter
      *ngIf="nzShowFilter || nzCustomFilter; else notFilterTemplate"
      [contentTemplate]="notFilterTemplate"
      [extraTemplate]="extraTemplate"
      [customFilter]="nzCustomFilter"
      [filterMultiple]="nzFilterMultiple"
      [listOfFilter]="nzFilters"
      (filterChange)="onFilterValueChange($event)"
    ></nz-table-filter>
    <ng-template #notFilterTemplate>
      <ng-template [ngTemplateOutlet]="nzShowSort ? sortTemplate : contentTemplate"></ng-template>
    </ng-template>
    <ng-template #extraTemplate>
      <ng-content select="[nz-th-extra]"></ng-content>
      <ng-content select="nz-filter-trigger"></ng-content>
    </ng-template>
    <ng-template #sortTemplate>
      <nz-table-sorters
        [sortOrder]="sortOrder"
        [sortDirections]="sortDirections"
        [contentTemplate]="contentTemplate"
      ></nz-table-sorters>
    </ng-template>
    <ng-template #contentTemplate>
      <ng-content></ng-content>
    </ng-template>
  `, isInline: true, components: [{ type: NzTableFilterComponent, selector: "nz-table-filter", inputs: ["contentTemplate", "customFilter", "extraTemplate", "filterMultiple", "listOfFilter"], outputs: ["filterChange"] }, { type: NzTableSortersComponent, selector: "nz-table-sorters", inputs: ["sortDirections", "sortOrder", "contentTemplate"] }], directives: [{ type: i3$1.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { type: i3$1.NgTemplateOutlet, selector: "[ngTemplateOutlet]", inputs: ["ngTemplateOutletContext", "ngTemplateOutlet"] }], changeDetection: i0.ChangeDetectionStrategy.OnPush, encapsulation: i0.ViewEncapsulation.None });
__decorate([
    InputBoolean()
], NzThAddOnComponent.prototype, "nzShowSort", void 0);
__decorate([
    InputBoolean()
], NzThAddOnComponent.prototype, "nzShowFilter", void 0);
__decorate([
    InputBoolean()
], NzThAddOnComponent.prototype, "nzCustomFilter", void 0);
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.1.2", ngImport: i0, type: NzThAddOnComponent, decorators: [{
            type: Component,
            args: [{
                    selector: 'th[nzColumnKey], th[nzSortFn], th[nzSortOrder], th[nzFilters], th[nzShowSort], th[nzShowFilter], th[nzCustomFilter]',
                    preserveWhitespaces: false,
                    encapsulation: ViewEncapsulation.None,
                    changeDetection: ChangeDetectionStrategy.OnPush,
                    template: `
    <nz-table-filter
      *ngIf="nzShowFilter || nzCustomFilter; else notFilterTemplate"
      [contentTemplate]="notFilterTemplate"
      [extraTemplate]="extraTemplate"
      [customFilter]="nzCustomFilter"
      [filterMultiple]="nzFilterMultiple"
      [listOfFilter]="nzFilters"
      (filterChange)="onFilterValueChange($event)"
    ></nz-table-filter>
    <ng-template #notFilterTemplate>
      <ng-template [ngTemplateOutlet]="nzShowSort ? sortTemplate : contentTemplate"></ng-template>
    </ng-template>
    <ng-template #extraTemplate>
      <ng-content select="[nz-th-extra]"></ng-content>
      <ng-content select="nz-filter-trigger"></ng-content>
    </ng-template>
    <ng-template #sortTemplate>
      <nz-table-sorters
        [sortOrder]="sortOrder"
        [sortDirections]="sortDirections"
        [contentTemplate]="contentTemplate"
      ></nz-table-sorters>
    </ng-template>
    <ng-template #contentTemplate>
      <ng-content></ng-content>
    </ng-template>
  `,
                    host: {
                        '[class.ant-table-column-has-sorters]': 'nzShowSort',
                        '[class.ant-table-column-sort]': `sortOrder === 'descend' || sortOrder === 'ascend'`,
                        '(click)': 'emitNextSortValue()'
                    }
                }]
        }], ctorParameters: function () { return [{ type: i0.ChangeDetectorRef }]; }, propDecorators: { nzColumnKey: [{
                type: Input
            }], nzFilterMultiple: [{
                type: Input
            }], nzSortOrder: [{
                type: Input
            }], nzSortPriority: [{
                type: Input
            }], nzSortDirections: [{
                type: Input
            }], nzFilters: [{
                type: Input
            }], nzSortFn: [{
                type: Input
            }], nzFilterFn: [{
                type: Input
            }], nzShowSort: [{
                type: Input
            }], nzShowFilter: [{
                type: Input
            }], nzCustomFilter: [{
                type: Input
            }], nzCheckedChange: [{
                type: Output
            }], nzSortOrderChange: [{
                type: Output
            }], nzFilterChange: [{
                type: Output
            }] } });

/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */
class NzThMeasureDirective {
    constructor(renderer, elementRef) {
        this.renderer = renderer;
        this.elementRef = elementRef;
        this.changes$ = new Subject();
        this.nzWidth = null;
        this.colspan = null;
        this.colSpan = null;
        this.rowspan = null;
        this.rowSpan = null;
    }
    ngOnChanges(changes) {
        const { nzWidth, colspan, rowspan, colSpan, rowSpan } = changes;
        if (colspan || colSpan) {
            const col = this.colspan || this.colSpan;
            if (!isNil(col)) {
                this.renderer.setAttribute(this.elementRef.nativeElement, 'colspan', `${col}`);
            }
            else {
                this.renderer.removeAttribute(this.elementRef.nativeElement, 'colspan');
            }
        }
        if (rowspan || rowSpan) {
            const row = this.rowspan || this.rowSpan;
            if (!isNil(row)) {
                this.renderer.setAttribute(this.elementRef.nativeElement, 'rowspan', `${row}`);
            }
            else {
                this.renderer.removeAttribute(this.elementRef.nativeElement, 'rowspan');
            }
        }
        if (nzWidth || colspan) {
            this.changes$.next();
        }
    }
}
NzThMeasureDirective.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.1.2", ngImport: i0, type: NzThMeasureDirective, deps: [{ token: i0.Renderer2 }, { token: i0.ElementRef }], target: i0.ɵɵFactoryTarget.Directive });
NzThMeasureDirective.ɵdir = i0.ɵɵngDeclareDirective({ minVersion: "12.0.0", version: "13.1.2", type: NzThMeasureDirective, selector: "th", inputs: { nzWidth: "nzWidth", colspan: "colspan", colSpan: "colSpan", rowspan: "rowspan", rowSpan: "rowSpan" }, usesOnChanges: true, ngImport: i0 });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.1.2", ngImport: i0, type: NzThMeasureDirective, decorators: [{
            type: Directive,
            args: [{
                    selector: 'th'
                }]
        }], ctorParameters: function () { return [{ type: i0.Renderer2 }, { type: i0.ElementRef }]; }, propDecorators: { nzWidth: [{
                type: Input
            }], colspan: [{
                type: Input
            }], colSpan: [{
                type: Input
            }], rowspan: [{
                type: Input
            }], rowSpan: [{
                type: Input
            }] } });

class NzThSelectionComponent {
    constructor() {
        this.nzSelections = [];
        this.nzChecked = false;
        this.nzDisabled = false;
        this.nzIndeterminate = false;
        this.nzShowCheckbox = false;
        this.nzShowRowSelection = false;
        this.nzCheckedChange = new EventEmitter();
        this.isNzShowExpandChanged = false;
        this.isNzShowCheckboxChanged = false;
    }
    onCheckedChange(checked) {
        this.nzChecked = checked;
        this.nzCheckedChange.emit(checked);
    }
    ngOnChanges(changes) {
        const isFirstChange = (value) => value && value.firstChange && value.currentValue !== undefined;
        const { nzChecked, nzSelections, nzShowExpand, nzShowCheckbox } = changes;
        if (nzShowExpand) {
            this.isNzShowExpandChanged = true;
        }
        if (nzShowCheckbox) {
            this.isNzShowCheckboxChanged = true;
        }
        if (isFirstChange(nzSelections) && !this.isNzShowExpandChanged) {
            this.nzShowRowSelection = true;
        }
        if (isFirstChange(nzChecked) && !this.isNzShowCheckboxChanged) {
            this.nzShowCheckbox = true;
        }
    }
}
NzThSelectionComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.1.2", ngImport: i0, type: NzThSelectionComponent, deps: [], target: i0.ɵɵFactoryTarget.Component });
NzThSelectionComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "13.1.2", type: NzThSelectionComponent, selector: "th[nzSelections],th[nzChecked],th[nzShowCheckbox],th[nzShowRowSelection]", inputs: { nzSelections: "nzSelections", nzChecked: "nzChecked", nzDisabled: "nzDisabled", nzIndeterminate: "nzIndeterminate", nzShowCheckbox: "nzShowCheckbox", nzShowRowSelection: "nzShowRowSelection" }, outputs: { nzCheckedChange: "nzCheckedChange" }, host: { classAttribute: "ant-table-selection-column" }, usesOnChanges: true, ngImport: i0, template: `
    <nz-table-selection
      [checked]="nzChecked"
      [disabled]="nzDisabled"
      [indeterminate]="nzIndeterminate"
      [listOfSelections]="nzSelections"
      [showCheckbox]="nzShowCheckbox"
      [showRowSelection]="nzShowRowSelection"
      (checkedChange)="onCheckedChange($event)"
    ></nz-table-selection>
    <ng-content></ng-content>
  `, isInline: true, components: [{ type: NzTableSelectionComponent, selector: "nz-table-selection", inputs: ["listOfSelections", "checked", "disabled", "indeterminate", "showCheckbox", "showRowSelection"], outputs: ["checkedChange"] }], changeDetection: i0.ChangeDetectionStrategy.OnPush, encapsulation: i0.ViewEncapsulation.None });
__decorate([
    InputBoolean()
], NzThSelectionComponent.prototype, "nzShowCheckbox", void 0);
__decorate([
    InputBoolean()
], NzThSelectionComponent.prototype, "nzShowRowSelection", void 0);
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.1.2", ngImport: i0, type: NzThSelectionComponent, decorators: [{
            type: Component,
            args: [{
                    selector: 'th[nzSelections],th[nzChecked],th[nzShowCheckbox],th[nzShowRowSelection]',
                    preserveWhitespaces: false,
                    encapsulation: ViewEncapsulation.None,
                    changeDetection: ChangeDetectionStrategy.OnPush,
                    template: `
    <nz-table-selection
      [checked]="nzChecked"
      [disabled]="nzDisabled"
      [indeterminate]="nzIndeterminate"
      [listOfSelections]="nzSelections"
      [showCheckbox]="nzShowCheckbox"
      [showRowSelection]="nzShowRowSelection"
      (checkedChange)="onCheckedChange($event)"
    ></nz-table-selection>
    <ng-content></ng-content>
  `,
                    host: { class: 'ant-table-selection-column' }
                }]
        }], ctorParameters: function () { return []; }, propDecorators: { nzSelections: [{
                type: Input
            }], nzChecked: [{
                type: Input
            }], nzDisabled: [{
                type: Input
            }], nzIndeterminate: [{
                type: Input
            }], nzShowCheckbox: [{
                type: Input
            }], nzShowRowSelection: [{
                type: Input
            }], nzCheckedChange: [{
                type: Output
            }] } });

/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */
class NzCellAlignDirective {
    constructor() {
        this.nzAlign = null;
    }
}
NzCellAlignDirective.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.1.2", ngImport: i0, type: NzCellAlignDirective, deps: [], target: i0.ɵɵFactoryTarget.Directive });
NzCellAlignDirective.ɵdir = i0.ɵɵngDeclareDirective({ minVersion: "12.0.0", version: "13.1.2", type: NzCellAlignDirective, selector: "th[nzAlign],td[nzAlign]", inputs: { nzAlign: "nzAlign" }, host: { properties: { "style.text-align": "nzAlign" } }, ngImport: i0 });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.1.2", ngImport: i0, type: NzCellAlignDirective, decorators: [{
            type: Directive,
            args: [{
                    selector: 'th[nzAlign],td[nzAlign]',
                    host: {
                        '[style.text-align]': 'nzAlign'
                    }
                }]
        }], propDecorators: { nzAlign: [{
                type: Input
            }] } });

class NzCellEllipsisDirective {
    constructor() {
        this.nzEllipsis = true;
    }
}
NzCellEllipsisDirective.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.1.2", ngImport: i0, type: NzCellEllipsisDirective, deps: [], target: i0.ɵɵFactoryTarget.Directive });
NzCellEllipsisDirective.ɵdir = i0.ɵɵngDeclareDirective({ minVersion: "12.0.0", version: "13.1.2", type: NzCellEllipsisDirective, selector: "th[nzEllipsis],td[nzEllipsis]", inputs: { nzEllipsis: "nzEllipsis" }, host: { properties: { "class.ant-table-cell-ellipsis": "nzEllipsis" } }, ngImport: i0 });
__decorate([
    InputBoolean()
], NzCellEllipsisDirective.prototype, "nzEllipsis", void 0);
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.1.2", ngImport: i0, type: NzCellEllipsisDirective, decorators: [{
            type: Directive,
            args: [{
                    selector: 'th[nzEllipsis],td[nzEllipsis]',
                    host: {
                        '[class.ant-table-cell-ellipsis]': 'nzEllipsis'
                    }
                }]
        }], propDecorators: { nzEllipsis: [{
                type: Input
            }] } });

class NzCellBreakWordDirective {
    constructor() {
        this.nzBreakWord = true;
    }
}
NzCellBreakWordDirective.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.1.2", ngImport: i0, type: NzCellBreakWordDirective, deps: [], target: i0.ɵɵFactoryTarget.Directive });
NzCellBreakWordDirective.ɵdir = i0.ɵɵngDeclareDirective({ minVersion: "12.0.0", version: "13.1.2", type: NzCellBreakWordDirective, selector: "th[nzBreakWord],td[nzBreakWord]", inputs: { nzBreakWord: "nzBreakWord" }, host: { properties: { "style.word-break": "nzBreakWord ? 'break-all' : ''" } }, ngImport: i0 });
__decorate([
    InputBoolean()
], NzCellBreakWordDirective.prototype, "nzBreakWord", void 0);
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.1.2", ngImport: i0, type: NzCellBreakWordDirective, decorators: [{
            type: Directive,
            args: [{
                    selector: 'th[nzBreakWord],td[nzBreakWord]',
                    host: {
                        '[style.word-break]': `nzBreakWord ? 'break-all' : ''`
                    }
                }]
        }], propDecorators: { nzBreakWord: [{
                type: Input
            }] } });

/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */
class NzTableContentComponent {
    constructor() {
        this.tableLayout = 'auto';
        this.theadTemplate = null;
        this.contentTemplate = null;
        this.listOfColWidth = [];
        this.scrollX = null;
    }
}
NzTableContentComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.1.2", ngImport: i0, type: NzTableContentComponent, deps: [], target: i0.ɵɵFactoryTarget.Component });
NzTableContentComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "13.1.2", type: NzTableContentComponent, selector: "table[nz-table-content]", inputs: { tableLayout: "tableLayout", theadTemplate: "theadTemplate", contentTemplate: "contentTemplate", listOfColWidth: "listOfColWidth", scrollX: "scrollX" }, host: { properties: { "style.table-layout": "tableLayout", "class.ant-table-fixed": "scrollX", "style.width": "scrollX", "style.min-width": "scrollX ? '100%': null" } }, ngImport: i0, template: `
    <col [style.width]="width" [style.minWidth]="width" *ngFor="let width of listOfColWidth" />
    <thead class="ant-table-thead" *ngIf="theadTemplate">
      <ng-template [ngTemplateOutlet]="theadTemplate"></ng-template>
    </thead>
    <ng-template [ngTemplateOutlet]="contentTemplate"></ng-template>
    <ng-content></ng-content>
  `, isInline: true, directives: [{ type: i3$1.NgForOf, selector: "[ngFor][ngForOf]", inputs: ["ngForOf", "ngForTrackBy", "ngForTemplate"] }, { type: i3$1.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { type: i3$1.NgTemplateOutlet, selector: "[ngTemplateOutlet]", inputs: ["ngTemplateOutletContext", "ngTemplateOutlet"] }], changeDetection: i0.ChangeDetectionStrategy.OnPush, encapsulation: i0.ViewEncapsulation.None });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.1.2", ngImport: i0, type: NzTableContentComponent, decorators: [{
            type: Component,
            args: [{
                    selector: 'table[nz-table-content]',
                    changeDetection: ChangeDetectionStrategy.OnPush,
                    encapsulation: ViewEncapsulation.None,
                    template: `
    <col [style.width]="width" [style.minWidth]="width" *ngFor="let width of listOfColWidth" />
    <thead class="ant-table-thead" *ngIf="theadTemplate">
      <ng-template [ngTemplateOutlet]="theadTemplate"></ng-template>
    </thead>
    <ng-template [ngTemplateOutlet]="contentTemplate"></ng-template>
    <ng-content></ng-content>
  `,
                    host: {
                        '[style.table-layout]': 'tableLayout',
                        '[class.ant-table-fixed]': 'scrollX',
                        '[style.width]': 'scrollX',
                        '[style.min-width]': `scrollX ? '100%': null`
                    }
                }]
        }], propDecorators: { tableLayout: [{
                type: Input
            }], theadTemplate: [{
                type: Input
            }], contentTemplate: [{
                type: Input
            }], listOfColWidth: [{
                type: Input
            }], scrollX: [{
                type: Input
            }] } });

/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */
class NzTableFixedRowComponent {
    constructor(nzTableStyleService, renderer) {
        this.nzTableStyleService = nzTableStyleService;
        this.renderer = renderer;
        this.hostWidth$ = new BehaviorSubject(null);
        this.enableAutoMeasure$ = new BehaviorSubject(false);
        this.destroy$ = new Subject();
    }
    ngOnInit() {
        if (this.nzTableStyleService) {
            const { enableAutoMeasure$, hostWidth$ } = this.nzTableStyleService;
            enableAutoMeasure$.pipe(takeUntil(this.destroy$)).subscribe(this.enableAutoMeasure$);
            hostWidth$.pipe(takeUntil(this.destroy$)).subscribe(this.hostWidth$);
        }
    }
    ngAfterViewInit() {
        this.nzTableStyleService.columnCount$.pipe(takeUntil(this.destroy$)).subscribe(count => {
            this.renderer.setAttribute(this.tdElement.nativeElement, 'colspan', `${count}`);
        });
    }
    ngOnDestroy() {
        this.destroy$.next();
        this.destroy$.complete();
    }
}
NzTableFixedRowComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.1.2", ngImport: i0, type: NzTableFixedRowComponent, deps: [{ token: NzTableStyleService }, { token: i0.Renderer2 }], target: i0.ɵɵFactoryTarget.Component });
NzTableFixedRowComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "13.1.2", type: NzTableFixedRowComponent, selector: "tr[nz-table-fixed-row], tr[nzExpand]", viewQueries: [{ propertyName: "tdElement", first: true, predicate: ["tdElement"], descendants: true, static: true }], ngImport: i0, template: `
    <td class="nz-disable-td ant-table-cell" #tdElement>
      <div
        class="ant-table-expanded-row-fixed"
        *ngIf="enableAutoMeasure$ | async; else contentTemplate"
        style="position: sticky; left: 0px; overflow: hidden;"
        [style.width.px]="hostWidth$ | async"
      >
        <ng-template [ngTemplateOutlet]="contentTemplate"></ng-template>
      </div>
    </td>
    <ng-template #contentTemplate><ng-content></ng-content></ng-template>
  `, isInline: true, directives: [{ type: i3$1.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { type: i3$1.NgTemplateOutlet, selector: "[ngTemplateOutlet]", inputs: ["ngTemplateOutletContext", "ngTemplateOutlet"] }], pipes: { "async": i3$1.AsyncPipe }, changeDetection: i0.ChangeDetectionStrategy.OnPush, encapsulation: i0.ViewEncapsulation.None });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.1.2", ngImport: i0, type: NzTableFixedRowComponent, decorators: [{
            type: Component,
            args: [{
                    selector: 'tr[nz-table-fixed-row], tr[nzExpand]',
                    changeDetection: ChangeDetectionStrategy.OnPush,
                    encapsulation: ViewEncapsulation.None,
                    template: `
    <td class="nz-disable-td ant-table-cell" #tdElement>
      <div
        class="ant-table-expanded-row-fixed"
        *ngIf="enableAutoMeasure$ | async; else contentTemplate"
        style="position: sticky; left: 0px; overflow: hidden;"
        [style.width.px]="hostWidth$ | async"
      >
        <ng-template [ngTemplateOutlet]="contentTemplate"></ng-template>
      </div>
    </td>
    <ng-template #contentTemplate><ng-content></ng-content></ng-template>
  `
                }]
        }], ctorParameters: function () { return [{ type: NzTableStyleService }, { type: i0.Renderer2 }]; }, propDecorators: { tdElement: [{
                type: ViewChild,
                args: ['tdElement', { static: true }]
            }] } });

/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */
class NzTableInnerDefaultComponent {
    constructor() {
        this.tableLayout = 'auto';
        this.listOfColWidth = [];
        this.theadTemplate = null;
        this.contentTemplate = null;
    }
}
NzTableInnerDefaultComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.1.2", ngImport: i0, type: NzTableInnerDefaultComponent, deps: [], target: i0.ɵɵFactoryTarget.Component });
NzTableInnerDefaultComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "13.1.2", type: NzTableInnerDefaultComponent, selector: "nz-table-inner-default", inputs: { tableLayout: "tableLayout", listOfColWidth: "listOfColWidth", theadTemplate: "theadTemplate", contentTemplate: "contentTemplate" }, host: { classAttribute: "ant-table-container" }, ngImport: i0, template: `
    <div class="ant-table-content">
      <table
        nz-table-content
        [contentTemplate]="contentTemplate"
        [tableLayout]="tableLayout"
        [listOfColWidth]="listOfColWidth"
        [theadTemplate]="theadTemplate"
      ></table>
    </div>
  `, isInline: true, components: [{ type: NzTableContentComponent, selector: "table[nz-table-content]", inputs: ["tableLayout", "theadTemplate", "contentTemplate", "listOfColWidth", "scrollX"] }], changeDetection: i0.ChangeDetectionStrategy.OnPush, encapsulation: i0.ViewEncapsulation.None });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.1.2", ngImport: i0, type: NzTableInnerDefaultComponent, decorators: [{
            type: Component,
            args: [{
                    selector: 'nz-table-inner-default',
                    changeDetection: ChangeDetectionStrategy.OnPush,
                    encapsulation: ViewEncapsulation.None,
                    template: `
    <div class="ant-table-content">
      <table
        nz-table-content
        [contentTemplate]="contentTemplate"
        [tableLayout]="tableLayout"
        [listOfColWidth]="listOfColWidth"
        [theadTemplate]="theadTemplate"
      ></table>
    </div>
  `,
                    host: { class: 'ant-table-container' }
                }]
        }], ctorParameters: function () { return []; }, propDecorators: { tableLayout: [{
                type: Input
            }], listOfColWidth: [{
                type: Input
            }], theadTemplate: [{
                type: Input
            }], contentTemplate: [{
                type: Input
            }] } });

/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */
class NzTrMeasureComponent {
    constructor(nzResizeObserver, ngZone) {
        this.nzResizeObserver = nzResizeObserver;
        this.ngZone = ngZone;
        this.listOfMeasureColumn = [];
        this.listOfAutoWidth = new EventEmitter();
        this.destroy$ = new Subject();
    }
    trackByFunc(_, key) {
        return key;
    }
    ngAfterViewInit() {
        this.listOfTdElement.changes
            .pipe(startWith(this.listOfTdElement))
            .pipe(switchMap(list => combineLatest(list.toArray().map((item) => this.nzResizeObserver.observe(item).pipe(map(([entry]) => {
            const { width } = entry.target.getBoundingClientRect();
            return Math.floor(width);
        }))))), debounceTime(16), takeUntil(this.destroy$))
            .subscribe(data => {
            this.ngZone.run(() => {
                this.listOfAutoWidth.next(data);
            });
        });
    }
    ngOnDestroy() {
        this.destroy$.next();
        this.destroy$.complete();
    }
}
NzTrMeasureComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.1.2", ngImport: i0, type: NzTrMeasureComponent, deps: [{ token: i1$3.NzResizeObserver }, { token: i0.NgZone }], target: i0.ɵɵFactoryTarget.Component });
NzTrMeasureComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "13.1.2", type: NzTrMeasureComponent, selector: "tr[nz-table-measure-row]", inputs: { listOfMeasureColumn: "listOfMeasureColumn" }, outputs: { listOfAutoWidth: "listOfAutoWidth" }, host: { classAttribute: "ant-table-measure-now" }, viewQueries: [{ propertyName: "listOfTdElement", predicate: ["tdElement"], descendants: true }], ngImport: i0, template: `
    <td
      #tdElement
      class="nz-disable-td"
      style="padding: 0px; border: 0px; height: 0px;"
      *ngFor="let th of listOfMeasureColumn; trackBy: trackByFunc"
    ></td>
  `, isInline: true, directives: [{ type: i3$1.NgForOf, selector: "[ngFor][ngForOf]", inputs: ["ngForOf", "ngForTrackBy", "ngForTemplate"] }], changeDetection: i0.ChangeDetectionStrategy.OnPush, encapsulation: i0.ViewEncapsulation.None });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.1.2", ngImport: i0, type: NzTrMeasureComponent, decorators: [{
            type: Component,
            args: [{
                    selector: 'tr[nz-table-measure-row]',
                    preserveWhitespaces: false,
                    changeDetection: ChangeDetectionStrategy.OnPush,
                    encapsulation: ViewEncapsulation.None,
                    template: `
    <td
      #tdElement
      class="nz-disable-td"
      style="padding: 0px; border: 0px; height: 0px;"
      *ngFor="let th of listOfMeasureColumn; trackBy: trackByFunc"
    ></td>
  `,
                    host: { class: 'ant-table-measure-now' }
                }]
        }], ctorParameters: function () { return [{ type: i1$3.NzResizeObserver }, { type: i0.NgZone }]; }, propDecorators: { listOfMeasureColumn: [{
                type: Input
            }], listOfAutoWidth: [{
                type: Output
            }], listOfTdElement: [{
                type: ViewChildren,
                args: ['tdElement']
            }] } });

/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */
class NzTbodyComponent {
    constructor(nzTableStyleService) {
        this.nzTableStyleService = nzTableStyleService;
        this.isInsideTable = false;
        this.showEmpty$ = new BehaviorSubject(false);
        this.noResult$ = new BehaviorSubject(undefined);
        this.listOfMeasureColumn$ = new BehaviorSubject([]);
        this.destroy$ = new Subject();
        this.isInsideTable = !!this.nzTableStyleService;
        if (this.nzTableStyleService) {
            const { showEmpty$, noResult$, listOfMeasureColumn$ } = this.nzTableStyleService;
            noResult$.pipe(takeUntil(this.destroy$)).subscribe(this.noResult$);
            listOfMeasureColumn$.pipe(takeUntil(this.destroy$)).subscribe(this.listOfMeasureColumn$);
            showEmpty$.pipe(takeUntil(this.destroy$)).subscribe(this.showEmpty$);
        }
    }
    onListOfAutoWidthChange(listOfAutoWidth) {
        this.nzTableStyleService.setListOfAutoWidth(listOfAutoWidth);
    }
    ngOnDestroy() {
        this.destroy$.next();
        this.destroy$.complete();
    }
}
NzTbodyComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.1.2", ngImport: i0, type: NzTbodyComponent, deps: [{ token: NzTableStyleService, optional: true }], target: i0.ɵɵFactoryTarget.Component });
NzTbodyComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "13.1.2", type: NzTbodyComponent, selector: "tbody", host: { properties: { "class.ant-table-tbody": "isInsideTable" } }, ngImport: i0, template: `
    <ng-container *ngIf="listOfMeasureColumn$ | async as listOfMeasureColumn">
      <tr
        nz-table-measure-row
        *ngIf="isInsideTable && listOfMeasureColumn.length"
        [listOfMeasureColumn]="listOfMeasureColumn"
        (listOfAutoWidth)="onListOfAutoWidthChange($event)"
      ></tr>
    </ng-container>
    <ng-content></ng-content>
    <tr class="ant-table-placeholder" nz-table-fixed-row *ngIf="showEmpty$ | async">
      <nz-embed-empty nzComponentName="table" [specificContent]="(noResult$ | async)!"></nz-embed-empty>
    </tr>
  `, isInline: true, components: [{ type: NzTrMeasureComponent, selector: "tr[nz-table-measure-row]", inputs: ["listOfMeasureColumn"], outputs: ["listOfAutoWidth"] }, { type: NzTableFixedRowComponent, selector: "tr[nz-table-fixed-row], tr[nzExpand]" }, { type: i4$1.NzEmbedEmptyComponent, selector: "nz-embed-empty", inputs: ["nzComponentName", "specificContent"], exportAs: ["nzEmbedEmpty"] }], directives: [{ type: i3$1.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }], pipes: { "async": i3$1.AsyncPipe }, changeDetection: i0.ChangeDetectionStrategy.OnPush, encapsulation: i0.ViewEncapsulation.None });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.1.2", ngImport: i0, type: NzTbodyComponent, decorators: [{
            type: Component,
            args: [{
                    selector: 'tbody',
                    preserveWhitespaces: false,
                    changeDetection: ChangeDetectionStrategy.OnPush,
                    encapsulation: ViewEncapsulation.None,
                    template: `
    <ng-container *ngIf="listOfMeasureColumn$ | async as listOfMeasureColumn">
      <tr
        nz-table-measure-row
        *ngIf="isInsideTable && listOfMeasureColumn.length"
        [listOfMeasureColumn]="listOfMeasureColumn"
        (listOfAutoWidth)="onListOfAutoWidthChange($event)"
      ></tr>
    </ng-container>
    <ng-content></ng-content>
    <tr class="ant-table-placeholder" nz-table-fixed-row *ngIf="showEmpty$ | async">
      <nz-embed-empty nzComponentName="table" [specificContent]="(noResult$ | async)!"></nz-embed-empty>
    </tr>
  `,
                    host: {
                        '[class.ant-table-tbody]': 'isInsideTable'
                    }
                }]
        }], ctorParameters: function () {
        return [{ type: NzTableStyleService, decorators: [{
                        type: Optional
                    }] }];
    } });

class NzTableInnerScrollComponent {
    constructor(renderer, ngZone, platform, resizeService) {
        this.renderer = renderer;
        this.ngZone = ngZone;
        this.platform = platform;
        this.resizeService = resizeService;
        this.data = [];
        this.scrollX = null;
        this.scrollY = null;
        this.contentTemplate = null;
        this.widthConfig = [];
        this.listOfColWidth = [];
        this.theadTemplate = null;
        this.virtualTemplate = null;
        this.virtualItemSize = 0;
        this.virtualMaxBufferPx = 200;
        this.virtualMinBufferPx = 100;
        this.virtualForTrackBy = index => index;
        this.headerStyleMap = {};
        this.bodyStyleMap = {};
        this.verticalScrollBarWidth = 0;
        this.noDateVirtualHeight = '182px';
        this.data$ = new Subject();
        this.scroll$ = new Subject();
        this.destroy$ = new Subject();
    }
    setScrollPositionClassName(clear = false) {
        const { scrollWidth, scrollLeft, clientWidth } = this.tableBodyElement.nativeElement;
        const leftClassName = 'ant-table-ping-left';
        const rightClassName = 'ant-table-ping-right';
        if ((scrollWidth === clientWidth && scrollWidth !== 0) || clear) {
            this.renderer.removeClass(this.tableMainElement, leftClassName);
            this.renderer.removeClass(this.tableMainElement, rightClassName);
        }
        else if (scrollLeft === 0) {
            this.renderer.removeClass(this.tableMainElement, leftClassName);
            this.renderer.addClass(this.tableMainElement, rightClassName);
        }
        else if (scrollWidth === scrollLeft + clientWidth) {
            this.renderer.removeClass(this.tableMainElement, rightClassName);
            this.renderer.addClass(this.tableMainElement, leftClassName);
        }
        else {
            this.renderer.addClass(this.tableMainElement, leftClassName);
            this.renderer.addClass(this.tableMainElement, rightClassName);
        }
    }
    ngOnChanges(changes) {
        const { scrollX, scrollY, data } = changes;
        if (scrollX || scrollY) {
            const hasVerticalScrollBar = this.verticalScrollBarWidth !== 0;
            this.headerStyleMap = {
                overflowX: 'hidden',
                overflowY: this.scrollY && hasVerticalScrollBar ? 'scroll' : 'hidden'
            };
            this.bodyStyleMap = {
                overflowY: this.scrollY ? 'scroll' : 'hidden',
                overflowX: this.scrollX ? 'auto' : null,
                maxHeight: this.scrollY
            };
            this.scroll$.next();
        }
        if (data) {
            this.data$.next();
        }
    }
    ngAfterViewInit() {
        if (this.platform.isBrowser) {
            this.ngZone.runOutsideAngular(() => {
                const scrollEvent$ = this.scroll$.pipe(startWith(null), delay(0), switchMap(() => fromEvent(this.tableBodyElement.nativeElement, 'scroll').pipe(startWith(true))), takeUntil(this.destroy$));
                const resize$ = this.resizeService.subscribe().pipe(takeUntil(this.destroy$));
                const data$ = this.data$.pipe(takeUntil(this.destroy$));
                const setClassName$ = merge(scrollEvent$, resize$, data$, this.scroll$).pipe(startWith(true), delay(0), takeUntil(this.destroy$));
                setClassName$.subscribe(() => this.setScrollPositionClassName());
                scrollEvent$
                    .pipe(filter(() => !!this.scrollY))
                    .subscribe(() => (this.tableHeaderElement.nativeElement.scrollLeft = this.tableBodyElement.nativeElement.scrollLeft));
            });
        }
    }
    ngOnDestroy() {
        this.setScrollPositionClassName(true);
        this.destroy$.next();
        this.destroy$.complete();
    }
}
NzTableInnerScrollComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.1.2", ngImport: i0, type: NzTableInnerScrollComponent, deps: [{ token: i0.Renderer2 }, { token: i0.NgZone }, { token: i1$4.Platform }, { token: i2.NzResizeService }], target: i0.ɵɵFactoryTarget.Component });
NzTableInnerScrollComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "13.1.2", type: NzTableInnerScrollComponent, selector: "nz-table-inner-scroll", inputs: { data: "data", scrollX: "scrollX", scrollY: "scrollY", contentTemplate: "contentTemplate", widthConfig: "widthConfig", listOfColWidth: "listOfColWidth", theadTemplate: "theadTemplate", virtualTemplate: "virtualTemplate", virtualItemSize: "virtualItemSize", virtualMaxBufferPx: "virtualMaxBufferPx", virtualMinBufferPx: "virtualMinBufferPx", tableMainElement: "tableMainElement", virtualForTrackBy: "virtualForTrackBy", verticalScrollBarWidth: "verticalScrollBarWidth" }, host: { classAttribute: "ant-table-container" }, viewQueries: [{ propertyName: "tableHeaderElement", first: true, predicate: ["tableHeaderElement"], descendants: true, read: ElementRef }, { propertyName: "tableBodyElement", first: true, predicate: ["tableBodyElement"], descendants: true, read: ElementRef }, { propertyName: "cdkVirtualScrollViewport", first: true, predicate: CdkVirtualScrollViewport, descendants: true, read: CdkVirtualScrollViewport }], usesOnChanges: true, ngImport: i0, template: `
    <ng-container *ngIf="scrollY">
      <div #tableHeaderElement [ngStyle]="headerStyleMap" class="ant-table-header nz-table-hide-scrollbar">
        <table
          nz-table-content
          tableLayout="fixed"
          [scrollX]="scrollX"
          [listOfColWidth]="listOfColWidth"
          [theadTemplate]="theadTemplate"
        ></table>
      </div>
      <div #tableBodyElement *ngIf="!virtualTemplate" class="ant-table-body" [ngStyle]="bodyStyleMap">
        <table
          nz-table-content
          tableLayout="fixed"
          [scrollX]="scrollX"
          [listOfColWidth]="listOfColWidth"
          [contentTemplate]="contentTemplate"
        ></table>
      </div>
      <cdk-virtual-scroll-viewport
        #tableBodyElement
        *ngIf="virtualTemplate"
        [itemSize]="virtualItemSize"
        [maxBufferPx]="virtualMaxBufferPx"
        [minBufferPx]="virtualMinBufferPx"
        [style.height]="data.length ? scrollY : noDateVirtualHeight"
      >
        <table nz-table-content tableLayout="fixed" [scrollX]="scrollX" [listOfColWidth]="listOfColWidth">
          <tbody>
            <ng-container *cdkVirtualFor="let item of data; let i = index; trackBy: virtualForTrackBy">
              <ng-template
                [ngTemplateOutlet]="virtualTemplate"
                [ngTemplateOutletContext]="{ $implicit: item, index: i }"
              ></ng-template>
            </ng-container>
          </tbody>
        </table>
      </cdk-virtual-scroll-viewport>
    </ng-container>
    <div class="ant-table-content" #tableBodyElement *ngIf="!scrollY" [ngStyle]="bodyStyleMap">
      <table
        nz-table-content
        tableLayout="fixed"
        [scrollX]="scrollX"
        [listOfColWidth]="listOfColWidth"
        [theadTemplate]="theadTemplate"
        [contentTemplate]="contentTemplate"
      ></table>
    </div>
  `, isInline: true, components: [{ type: NzTableContentComponent, selector: "table[nz-table-content]", inputs: ["tableLayout", "theadTemplate", "contentTemplate", "listOfColWidth", "scrollX"] }, { type: i4$2.CdkVirtualScrollViewport, selector: "cdk-virtual-scroll-viewport", inputs: ["orientation", "appendOnly"], outputs: ["scrolledIndexChange"] }, { type: NzTbodyComponent, selector: "tbody" }], directives: [{ type: i3$1.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { type: i3$1.NgStyle, selector: "[ngStyle]", inputs: ["ngStyle"] }, { type: i4$2.CdkFixedSizeVirtualScroll, selector: "cdk-virtual-scroll-viewport[itemSize]", inputs: ["itemSize", "minBufferPx", "maxBufferPx"] }, { type: i4$2.CdkVirtualForOf, selector: "[cdkVirtualFor][cdkVirtualForOf]", inputs: ["cdkVirtualForOf", "cdkVirtualForTrackBy", "cdkVirtualForTemplate", "cdkVirtualForTemplateCacheSize"] }, { type: i3$1.NgTemplateOutlet, selector: "[ngTemplateOutlet]", inputs: ["ngTemplateOutletContext", "ngTemplateOutlet"] }], changeDetection: i0.ChangeDetectionStrategy.OnPush, encapsulation: i0.ViewEncapsulation.None });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.1.2", ngImport: i0, type: NzTableInnerScrollComponent, decorators: [{
            type: Component,
            args: [{
                    selector: 'nz-table-inner-scroll',
                    changeDetection: ChangeDetectionStrategy.OnPush,
                    encapsulation: ViewEncapsulation.None,
                    template: `
    <ng-container *ngIf="scrollY">
      <div #tableHeaderElement [ngStyle]="headerStyleMap" class="ant-table-header nz-table-hide-scrollbar">
        <table
          nz-table-content
          tableLayout="fixed"
          [scrollX]="scrollX"
          [listOfColWidth]="listOfColWidth"
          [theadTemplate]="theadTemplate"
        ></table>
      </div>
      <div #tableBodyElement *ngIf="!virtualTemplate" class="ant-table-body" [ngStyle]="bodyStyleMap">
        <table
          nz-table-content
          tableLayout="fixed"
          [scrollX]="scrollX"
          [listOfColWidth]="listOfColWidth"
          [contentTemplate]="contentTemplate"
        ></table>
      </div>
      <cdk-virtual-scroll-viewport
        #tableBodyElement
        *ngIf="virtualTemplate"
        [itemSize]="virtualItemSize"
        [maxBufferPx]="virtualMaxBufferPx"
        [minBufferPx]="virtualMinBufferPx"
        [style.height]="data.length ? scrollY : noDateVirtualHeight"
      >
        <table nz-table-content tableLayout="fixed" [scrollX]="scrollX" [listOfColWidth]="listOfColWidth">
          <tbody>
            <ng-container *cdkVirtualFor="let item of data; let i = index; trackBy: virtualForTrackBy">
              <ng-template
                [ngTemplateOutlet]="virtualTemplate"
                [ngTemplateOutletContext]="{ $implicit: item, index: i }"
              ></ng-template>
            </ng-container>
          </tbody>
        </table>
      </cdk-virtual-scroll-viewport>
    </ng-container>
    <div class="ant-table-content" #tableBodyElement *ngIf="!scrollY" [ngStyle]="bodyStyleMap">
      <table
        nz-table-content
        tableLayout="fixed"
        [scrollX]="scrollX"
        [listOfColWidth]="listOfColWidth"
        [theadTemplate]="theadTemplate"
        [contentTemplate]="contentTemplate"
      ></table>
    </div>
  `,
                    host: { class: 'ant-table-container' }
                }]
        }], ctorParameters: function () { return [{ type: i0.Renderer2 }, { type: i0.NgZone }, { type: i1$4.Platform }, { type: i2.NzResizeService }]; }, propDecorators: { data: [{
                type: Input
            }], scrollX: [{
                type: Input
            }], scrollY: [{
                type: Input
            }], contentTemplate: [{
                type: Input
            }], widthConfig: [{
                type: Input
            }], listOfColWidth: [{
                type: Input
            }], theadTemplate: [{
                type: Input
            }], virtualTemplate: [{
                type: Input
            }], virtualItemSize: [{
                type: Input
            }], virtualMaxBufferPx: [{
                type: Input
            }], virtualMinBufferPx: [{
                type: Input
            }], tableMainElement: [{
                type: Input
            }], virtualForTrackBy: [{
                type: Input
            }], tableHeaderElement: [{
                type: ViewChild,
                args: ['tableHeaderElement', { read: ElementRef }]
            }], tableBodyElement: [{
                type: ViewChild,
                args: ['tableBodyElement', { read: ElementRef }]
            }], cdkVirtualScrollViewport: [{
                type: ViewChild,
                args: [CdkVirtualScrollViewport, { read: CdkVirtualScrollViewport }]
            }], verticalScrollBarWidth: [{
                type: Input
            }] } });

/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */
class NzTableVirtualScrollDirective {
    constructor(templateRef) {
        this.templateRef = templateRef;
    }
    static ngTemplateContextGuard(_dir, _ctx) {
        return true;
    }
}
NzTableVirtualScrollDirective.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.1.2", ngImport: i0, type: NzTableVirtualScrollDirective, deps: [{ token: i0.TemplateRef }], target: i0.ɵɵFactoryTarget.Directive });
NzTableVirtualScrollDirective.ɵdir = i0.ɵɵngDeclareDirective({ minVersion: "12.0.0", version: "13.1.2", type: NzTableVirtualScrollDirective, selector: "[nz-virtual-scroll]", exportAs: ["nzVirtualScroll"], ngImport: i0 });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.1.2", ngImport: i0, type: NzTableVirtualScrollDirective, decorators: [{
            type: Directive,
            args: [{
                    selector: '[nz-virtual-scroll]',
                    exportAs: 'nzVirtualScroll'
                }]
        }], ctorParameters: function () { return [{ type: i0.TemplateRef }]; } });

/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */
class NzTableDataService {
    constructor() {
        this.destroy$ = new Subject();
        this.pageIndex$ = new BehaviorSubject(1);
        this.frontPagination$ = new BehaviorSubject(true);
        this.pageSize$ = new BehaviorSubject(10);
        this.listOfData$ = new BehaviorSubject([]);
        this.pageIndexDistinct$ = this.pageIndex$.pipe(distinctUntilChanged());
        this.pageSizeDistinct$ = this.pageSize$.pipe(distinctUntilChanged());
        this.listOfCalcOperator$ = new BehaviorSubject([]);
        this.queryParams$ = combineLatest([
            this.pageIndexDistinct$,
            this.pageSizeDistinct$,
            this.listOfCalcOperator$
        ]).pipe(debounceTime(0), skip(1), map(([pageIndex, pageSize, listOfCalc]) => ({
            pageIndex,
            pageSize,
            sort: listOfCalc
                .filter(item => item.sortFn)
                .map(item => ({
                key: item.key,
                value: item.sortOrder
            })),
            filter: listOfCalc
                .filter(item => item.filterFn)
                .map(item => ({
                key: item.key,
                value: item.filterValue
            }))
        })));
        this.listOfDataAfterCalc$ = combineLatest([this.listOfData$, this.listOfCalcOperator$]).pipe(map(([listOfData, listOfCalcOperator]) => {
            let listOfDataAfterCalc = [...listOfData];
            const listOfFilterOperator = listOfCalcOperator.filter(item => {
                const { filterValue, filterFn } = item;
                const isReset = filterValue === null ||
                    filterValue === undefined ||
                    (Array.isArray(filterValue) && filterValue.length === 0);
                return !isReset && typeof filterFn === 'function';
            });
            for (const item of listOfFilterOperator) {
                const { filterFn, filterValue } = item;
                listOfDataAfterCalc = listOfDataAfterCalc.filter(data => filterFn(filterValue, data));
            }
            const listOfSortOperator = listOfCalcOperator
                .filter(item => item.sortOrder !== null && typeof item.sortFn === 'function')
                .sort((a, b) => +b.sortPriority - +a.sortPriority);
            if (listOfCalcOperator.length) {
                listOfDataAfterCalc.sort((record1, record2) => {
                    for (const item of listOfSortOperator) {
                        const { sortFn, sortOrder } = item;
                        if (sortFn && sortOrder) {
                            const compareResult = sortFn(record1, record2, sortOrder);
                            if (compareResult !== 0) {
                                return sortOrder === 'ascend' ? compareResult : -compareResult;
                            }
                        }
                    }
                    return 0;
                });
            }
            return listOfDataAfterCalc;
        }));
        this.listOfFrontEndCurrentPageData$ = combineLatest([
            this.pageIndexDistinct$,
            this.pageSizeDistinct$,
            this.listOfDataAfterCalc$
        ]).pipe(takeUntil(this.destroy$), filter(value => {
            const [pageIndex, pageSize, listOfData] = value;
            const maxPageIndex = Math.ceil(listOfData.length / pageSize) || 1;
            return pageIndex <= maxPageIndex;
        }), map(([pageIndex, pageSize, listOfData]) => listOfData.slice((pageIndex - 1) * pageSize, pageIndex * pageSize)));
        this.listOfCurrentPageData$ = this.frontPagination$.pipe(switchMap(pagination => (pagination ? this.listOfFrontEndCurrentPageData$ : this.listOfDataAfterCalc$)));
        this.total$ = this.frontPagination$.pipe(switchMap(pagination => (pagination ? this.listOfDataAfterCalc$ : this.listOfData$)), map(list => list.length), distinctUntilChanged());
    }
    updatePageSize(size) {
        this.pageSize$.next(size);
    }
    updateFrontPagination(pagination) {
        this.frontPagination$.next(pagination);
    }
    updatePageIndex(index) {
        this.pageIndex$.next(index);
    }
    updateListOfData(list) {
        this.listOfData$.next(list);
    }
    ngOnDestroy() {
        this.destroy$.next();
        this.destroy$.complete();
    }
}
NzTableDataService.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.1.2", ngImport: i0, type: NzTableDataService, deps: [], target: i0.ɵɵFactoryTarget.Injectable });
NzTableDataService.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "13.1.2", ngImport: i0, type: NzTableDataService });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.1.2", ngImport: i0, type: NzTableDataService, decorators: [{
            type: Injectable
        }], ctorParameters: function () { return []; } });

/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */
class NzTableTitleFooterComponent {
    constructor() {
        this.title = null;
        this.footer = null;
    }
}
NzTableTitleFooterComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.1.2", ngImport: i0, type: NzTableTitleFooterComponent, deps: [], target: i0.ɵɵFactoryTarget.Component });
NzTableTitleFooterComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "13.1.2", type: NzTableTitleFooterComponent, selector: "nz-table-title-footer", inputs: { title: "title", footer: "footer" }, host: { properties: { "class.ant-table-title": "title !== null", "class.ant-table-footer": "footer !== null" } }, ngImport: i0, template: `
    <ng-container *nzStringTemplateOutlet="title">{{ title }}</ng-container>
    <ng-container *nzStringTemplateOutlet="footer">{{ footer }}</ng-container>
  `, isInline: true, directives: [{ type: i1$5.NzStringTemplateOutletDirective, selector: "[nzStringTemplateOutlet]", inputs: ["nzStringTemplateOutletContext", "nzStringTemplateOutlet"], exportAs: ["nzStringTemplateOutlet"] }], changeDetection: i0.ChangeDetectionStrategy.OnPush, encapsulation: i0.ViewEncapsulation.None });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.1.2", ngImport: i0, type: NzTableTitleFooterComponent, decorators: [{
            type: Component,
            args: [{
                    selector: 'nz-table-title-footer',
                    changeDetection: ChangeDetectionStrategy.OnPush,
                    encapsulation: ViewEncapsulation.None,
                    template: `
    <ng-container *nzStringTemplateOutlet="title">{{ title }}</ng-container>
    <ng-container *nzStringTemplateOutlet="footer">{{ footer }}</ng-container>
  `,
                    host: {
                        '[class.ant-table-title]': `title !== null`,
                        '[class.ant-table-footer]': `footer !== null`
                    }
                }]
        }], propDecorators: { title: [{
                type: Input
            }], footer: [{
                type: Input
            }] } });

const NZ_CONFIG_MODULE_NAME = 'table';
class NzTableComponent {
    constructor(elementRef, nzResizeObserver, nzConfigService, cdr, nzTableStyleService, nzTableDataService, directionality) {
        this.elementRef = elementRef;
        this.nzResizeObserver = nzResizeObserver;
        this.nzConfigService = nzConfigService;
        this.cdr = cdr;
        this.nzTableStyleService = nzTableStyleService;
        this.nzTableDataService = nzTableDataService;
        this.directionality = directionality;
        this._nzModuleName = NZ_CONFIG_MODULE_NAME;
        this.nzTableLayout = 'auto';
        this.nzShowTotal = null;
        this.nzItemRender = null;
        this.nzTitle = null;
        this.nzFooter = null;
        this.nzNoResult = undefined;
        this.nzPageSizeOptions = [10, 20, 30, 40, 50];
        this.nzVirtualItemSize = 0;
        this.nzVirtualMaxBufferPx = 200;
        this.nzVirtualMinBufferPx = 100;
        this.nzVirtualForTrackBy = index => index;
        this.nzLoadingDelay = 0;
        this.nzPageIndex = 1;
        this.nzPageSize = 10;
        this.nzTotal = 0;
        this.nzWidthConfig = [];
        this.nzData = [];
        this.nzPaginationPosition = 'bottom';
        this.nzScroll = { x: null, y: null };
        this.nzPaginationType = 'default';
        this.nzFrontPagination = true;
        this.nzTemplateMode = false;
        this.nzShowPagination = true;
        this.nzLoading = false;
        this.nzOuterBordered = false;
        this.nzLoadingIndicator = null;
        this.nzBordered = false;
        this.nzSize = 'default';
        this.nzShowSizeChanger = false;
        this.nzHideOnSinglePage = false;
        this.nzShowQuickJumper = false;
        this.nzSimple = false;
        this.nzPageSizeChange = new EventEmitter();
        this.nzPageIndexChange = new EventEmitter();
        this.nzQueryParams = new EventEmitter();
        this.nzCurrentPageDataChange = new EventEmitter();
        /** public data for ngFor tr */
        this.data = [];
        this.scrollX = null;
        this.scrollY = null;
        this.theadTemplate = null;
        this.listOfAutoColWidth = [];
        this.listOfManualColWidth = [];
        this.hasFixLeft = false;
        this.hasFixRight = false;
        this.showPagination = true;
        this.destroy$ = new Subject();
        this.templateMode$ = new BehaviorSubject(false);
        this.dir = 'ltr';
        this.verticalScrollBarWidth = 0;
        this.nzConfigService
            .getConfigChangeEventForComponent(NZ_CONFIG_MODULE_NAME)
            .pipe(takeUntil(this.destroy$))
            .subscribe(() => {
            this.cdr.markForCheck();
        });
    }
    onPageSizeChange(size) {
        this.nzTableDataService.updatePageSize(size);
    }
    onPageIndexChange(index) {
        this.nzTableDataService.updatePageIndex(index);
    }
    ngOnInit() {
        var _a;
        const { pageIndexDistinct$, pageSizeDistinct$, listOfCurrentPageData$, total$, queryParams$ } = this.nzTableDataService;
        const { theadTemplate$, hasFixLeft$, hasFixRight$ } = this.nzTableStyleService;
        this.dir = this.directionality.value;
        (_a = this.directionality.change) === null || _a === void 0 ? void 0 : _a.pipe(takeUntil(this.destroy$)).subscribe((direction) => {
            this.dir = direction;
            this.cdr.detectChanges();
        });
        queryParams$.pipe(takeUntil(this.destroy$)).subscribe(this.nzQueryParams);
        pageIndexDistinct$.pipe(takeUntil(this.destroy$)).subscribe(pageIndex => {
            if (pageIndex !== this.nzPageIndex) {
                this.nzPageIndex = pageIndex;
                this.nzPageIndexChange.next(pageIndex);
            }
        });
        pageSizeDistinct$.pipe(takeUntil(this.destroy$)).subscribe(pageSize => {
            if (pageSize !== this.nzPageSize) {
                this.nzPageSize = pageSize;
                this.nzPageSizeChange.next(pageSize);
            }
        });
        total$
            .pipe(takeUntil(this.destroy$), filter(() => this.nzFrontPagination))
            .subscribe(total => {
            if (total !== this.nzTotal) {
                this.nzTotal = total;
                this.cdr.markForCheck();
            }
        });
        listOfCurrentPageData$.pipe(takeUntil(this.destroy$)).subscribe(data => {
            this.data = data;
            this.nzCurrentPageDataChange.next(data);
            this.cdr.markForCheck();
        });
        theadTemplate$.pipe(takeUntil(this.destroy$)).subscribe(theadTemplate => {
            this.theadTemplate = theadTemplate;
            this.cdr.markForCheck();
        });
        hasFixLeft$.pipe(takeUntil(this.destroy$)).subscribe(hasFixLeft => {
            this.hasFixLeft = hasFixLeft;
            this.cdr.markForCheck();
        });
        hasFixRight$.pipe(takeUntil(this.destroy$)).subscribe(hasFixRight => {
            this.hasFixRight = hasFixRight;
            this.cdr.markForCheck();
        });
        combineLatest([total$, this.templateMode$])
            .pipe(map(([total, templateMode]) => total === 0 && !templateMode), takeUntil(this.destroy$))
            .subscribe(empty => {
            this.nzTableStyleService.setShowEmpty(empty);
        });
        this.verticalScrollBarWidth = measureScrollbar('vertical');
        this.nzTableStyleService.listOfListOfThWidthPx$.pipe(takeUntil(this.destroy$)).subscribe(listOfWidth => {
            this.listOfAutoColWidth = listOfWidth;
            this.cdr.markForCheck();
        });
        this.nzTableStyleService.manualWidthConfigPx$.pipe(takeUntil(this.destroy$)).subscribe(listOfWidth => {
            this.listOfManualColWidth = listOfWidth;
            this.cdr.markForCheck();
        });
    }
    ngOnChanges(changes) {
        const { nzScroll, nzPageIndex, nzPageSize, nzFrontPagination, nzData, nzWidthConfig, nzNoResult, nzTemplateMode } = changes;
        if (nzPageIndex) {
            this.nzTableDataService.updatePageIndex(this.nzPageIndex);
        }
        if (nzPageSize) {
            this.nzTableDataService.updatePageSize(this.nzPageSize);
        }
        if (nzData) {
            this.nzData = this.nzData || [];
            this.nzTableDataService.updateListOfData(this.nzData);
        }
        if (nzFrontPagination) {
            this.nzTableDataService.updateFrontPagination(this.nzFrontPagination);
        }
        if (nzScroll) {
            this.setScrollOnChanges();
        }
        if (nzWidthConfig) {
            this.nzTableStyleService.setTableWidthConfig(this.nzWidthConfig);
        }
        if (nzTemplateMode) {
            this.templateMode$.next(this.nzTemplateMode);
        }
        if (nzNoResult) {
            this.nzTableStyleService.setNoResult(this.nzNoResult);
        }
        this.updateShowPagination();
    }
    ngAfterViewInit() {
        this.nzResizeObserver
            .observe(this.elementRef)
            .pipe(map(([entry]) => {
            const { width } = entry.target.getBoundingClientRect();
            const scrollBarWidth = this.scrollY ? this.verticalScrollBarWidth : 0;
            return Math.floor(width - scrollBarWidth);
        }), takeUntil(this.destroy$))
            .subscribe(this.nzTableStyleService.hostWidth$);
        if (this.nzTableInnerScrollComponent && this.nzTableInnerScrollComponent.cdkVirtualScrollViewport) {
            this.cdkVirtualScrollViewport = this.nzTableInnerScrollComponent.cdkVirtualScrollViewport;
        }
    }
    ngOnDestroy() {
        this.destroy$.next();
        this.destroy$.complete();
    }
    setScrollOnChanges() {
        this.scrollX = (this.nzScroll && this.nzScroll.x) || null;
        this.scrollY = (this.nzScroll && this.nzScroll.y) || null;
        this.nzTableStyleService.setScroll(this.scrollX, this.scrollY);
    }
    updateShowPagination() {
        this.showPagination =
            (this.nzHideOnSinglePage && this.nzData.length > this.nzPageSize) ||
                (this.nzData.length > 0 && !this.nzHideOnSinglePage) ||
                (!this.nzFrontPagination && this.nzTotal > this.nzPageSize);
    }
}
NzTableComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.1.2", ngImport: i0, type: NzTableComponent, deps: [{ token: i0.ElementRef }, { token: i1$3.NzResizeObserver }, { token: i1.NzConfigService }, { token: i0.ChangeDetectorRef }, { token: NzTableStyleService }, { token: NzTableDataService }, { token: i5.Directionality, optional: true }], target: i0.ɵɵFactoryTarget.Component });
NzTableComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "13.1.2", type: NzTableComponent, selector: "nz-table", inputs: { nzTableLayout: "nzTableLayout", nzShowTotal: "nzShowTotal", nzItemRender: "nzItemRender", nzTitle: "nzTitle", nzFooter: "nzFooter", nzNoResult: "nzNoResult", nzPageSizeOptions: "nzPageSizeOptions", nzVirtualItemSize: "nzVirtualItemSize", nzVirtualMaxBufferPx: "nzVirtualMaxBufferPx", nzVirtualMinBufferPx: "nzVirtualMinBufferPx", nzVirtualForTrackBy: "nzVirtualForTrackBy", nzLoadingDelay: "nzLoadingDelay", nzPageIndex: "nzPageIndex", nzPageSize: "nzPageSize", nzTotal: "nzTotal", nzWidthConfig: "nzWidthConfig", nzData: "nzData", nzPaginationPosition: "nzPaginationPosition", nzScroll: "nzScroll", nzPaginationType: "nzPaginationType", nzFrontPagination: "nzFrontPagination", nzTemplateMode: "nzTemplateMode", nzShowPagination: "nzShowPagination", nzLoading: "nzLoading", nzOuterBordered: "nzOuterBordered", nzLoadingIndicator: "nzLoadingIndicator", nzBordered: "nzBordered", nzSize: "nzSize", nzShowSizeChanger: "nzShowSizeChanger", nzHideOnSinglePage: "nzHideOnSinglePage", nzShowQuickJumper: "nzShowQuickJumper", nzSimple: "nzSimple" }, outputs: { nzPageSizeChange: "nzPageSizeChange", nzPageIndexChange: "nzPageIndexChange", nzQueryParams: "nzQueryParams", nzCurrentPageDataChange: "nzCurrentPageDataChange" }, host: { properties: { "class.ant-table-wrapper-rtl": "dir === \"rtl\"" }, classAttribute: "ant-table-wrapper" }, providers: [NzTableStyleService, NzTableDataService], queries: [{ propertyName: "nzVirtualScrollDirective", first: true, predicate: NzTableVirtualScrollDirective, descendants: true }], viewQueries: [{ propertyName: "nzTableInnerScrollComponent", first: true, predicate: NzTableInnerScrollComponent, descendants: true }], exportAs: ["nzTable"], usesOnChanges: true, ngImport: i0, template: `
    <nz-spin [nzDelay]="nzLoadingDelay" [nzSpinning]="nzLoading" [nzIndicator]="nzLoadingIndicator">
      <ng-container *ngIf="nzPaginationPosition === 'both' || nzPaginationPosition === 'top'">
        <ng-template [ngTemplateOutlet]="paginationTemplate"></ng-template>
      </ng-container>
      <div
        #tableMainElement
        class="ant-table"
        [class.ant-table-rtl]="dir === 'rtl'"
        [class.ant-table-fixed-header]="nzData.length && scrollY"
        [class.ant-table-fixed-column]="scrollX"
        [class.ant-table-has-fix-left]="hasFixLeft"
        [class.ant-table-has-fix-right]="hasFixRight"
        [class.ant-table-bordered]="nzBordered"
        [class.nz-table-out-bordered]="nzOuterBordered && !nzBordered"
        [class.ant-table-middle]="nzSize === 'middle'"
        [class.ant-table-small]="nzSize === 'small'"
      >
        <nz-table-title-footer [title]="nzTitle" *ngIf="nzTitle"></nz-table-title-footer>
        <nz-table-inner-scroll
          *ngIf="scrollY || scrollX; else defaultTemplate"
          [data]="data"
          [scrollX]="scrollX"
          [scrollY]="scrollY"
          [contentTemplate]="contentTemplate"
          [listOfColWidth]="listOfAutoColWidth"
          [theadTemplate]="theadTemplate"
          [verticalScrollBarWidth]="verticalScrollBarWidth"
          [virtualTemplate]="nzVirtualScrollDirective ? nzVirtualScrollDirective.templateRef : null"
          [virtualItemSize]="nzVirtualItemSize"
          [virtualMaxBufferPx]="nzVirtualMaxBufferPx"
          [virtualMinBufferPx]="nzVirtualMinBufferPx"
          [tableMainElement]="tableMainElement"
          [virtualForTrackBy]="nzVirtualForTrackBy"
        ></nz-table-inner-scroll>
        <ng-template #defaultTemplate>
          <nz-table-inner-default
            [tableLayout]="nzTableLayout"
            [listOfColWidth]="listOfManualColWidth"
            [theadTemplate]="theadTemplate"
            [contentTemplate]="contentTemplate"
          ></nz-table-inner-default>
        </ng-template>
        <nz-table-title-footer [footer]="nzFooter" *ngIf="nzFooter"></nz-table-title-footer>
      </div>
      <ng-container *ngIf="nzPaginationPosition === 'both' || nzPaginationPosition === 'bottom'">
        <ng-template [ngTemplateOutlet]="paginationTemplate"></ng-template>
      </ng-container>
    </nz-spin>
    <ng-template #paginationTemplate>
      <nz-pagination
        *ngIf="nzShowPagination && data.length"
        [hidden]="!showPagination"
        class="ant-table-pagination ant-table-pagination-right"
        [nzShowSizeChanger]="nzShowSizeChanger"
        [nzPageSizeOptions]="nzPageSizeOptions"
        [nzItemRender]="nzItemRender!"
        [nzShowQuickJumper]="nzShowQuickJumper"
        [nzHideOnSinglePage]="nzHideOnSinglePage"
        [nzShowTotal]="nzShowTotal"
        [nzSize]="nzPaginationType === 'small' ? 'small' : nzSize === 'default' ? 'default' : 'small'"
        [nzPageSize]="nzPageSize"
        [nzTotal]="nzTotal"
        [nzSimple]="nzSimple"
        [nzPageIndex]="nzPageIndex"
        (nzPageSizeChange)="onPageSizeChange($event)"
        (nzPageIndexChange)="onPageIndexChange($event)"
      ></nz-pagination>
    </ng-template>
    <ng-template #contentTemplate>
      <ng-content></ng-content>
    </ng-template>
  `, isInline: true, components: [{ type: i6$1.NzSpinComponent, selector: "nz-spin", inputs: ["nzIndicator", "nzSize", "nzTip", "nzDelay", "nzSimple", "nzSpinning"], exportAs: ["nzSpin"] }, { type: NzTableTitleFooterComponent, selector: "nz-table-title-footer", inputs: ["title", "footer"] }, { type: NzTableInnerScrollComponent, selector: "nz-table-inner-scroll", inputs: ["data", "scrollX", "scrollY", "contentTemplate", "widthConfig", "listOfColWidth", "theadTemplate", "virtualTemplate", "virtualItemSize", "virtualMaxBufferPx", "virtualMinBufferPx", "tableMainElement", "virtualForTrackBy", "verticalScrollBarWidth"] }, { type: NzTableInnerDefaultComponent, selector: "nz-table-inner-default", inputs: ["tableLayout", "listOfColWidth", "theadTemplate", "contentTemplate"] }, { type: i10$1.NzPaginationComponent, selector: "nz-pagination", inputs: ["nzShowTotal", "nzItemRender", "nzSize", "nzPageSizeOptions", "nzShowSizeChanger", "nzShowQuickJumper", "nzSimple", "nzDisabled", "nzResponsive", "nzHideOnSinglePage", "nzTotal", "nzPageIndex", "nzPageSize"], outputs: ["nzPageSizeChange", "nzPageIndexChange"], exportAs: ["nzPagination"] }], directives: [{ type: i3$1.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { type: i3$1.NgTemplateOutlet, selector: "[ngTemplateOutlet]", inputs: ["ngTemplateOutletContext", "ngTemplateOutlet"] }], changeDetection: i0.ChangeDetectionStrategy.OnPush, encapsulation: i0.ViewEncapsulation.None });
__decorate([
    InputBoolean()
], NzTableComponent.prototype, "nzFrontPagination", void 0);
__decorate([
    InputBoolean()
], NzTableComponent.prototype, "nzTemplateMode", void 0);
__decorate([
    InputBoolean()
], NzTableComponent.prototype, "nzShowPagination", void 0);
__decorate([
    InputBoolean()
], NzTableComponent.prototype, "nzLoading", void 0);
__decorate([
    InputBoolean()
], NzTableComponent.prototype, "nzOuterBordered", void 0);
__decorate([
    WithConfig()
], NzTableComponent.prototype, "nzLoadingIndicator", void 0);
__decorate([
    WithConfig(),
    InputBoolean()
], NzTableComponent.prototype, "nzBordered", void 0);
__decorate([
    WithConfig()
], NzTableComponent.prototype, "nzSize", void 0);
__decorate([
    WithConfig(),
    InputBoolean()
], NzTableComponent.prototype, "nzShowSizeChanger", void 0);
__decorate([
    WithConfig(),
    InputBoolean()
], NzTableComponent.prototype, "nzHideOnSinglePage", void 0);
__decorate([
    WithConfig(),
    InputBoolean()
], NzTableComponent.prototype, "nzShowQuickJumper", void 0);
__decorate([
    WithConfig(),
    InputBoolean()
], NzTableComponent.prototype, "nzSimple", void 0);
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.1.2", ngImport: i0, type: NzTableComponent, decorators: [{
            type: Component,
            args: [{
                    selector: 'nz-table',
                    exportAs: 'nzTable',
                    providers: [NzTableStyleService, NzTableDataService],
                    preserveWhitespaces: false,
                    changeDetection: ChangeDetectionStrategy.OnPush,
                    encapsulation: ViewEncapsulation.None,
                    template: `
    <nz-spin [nzDelay]="nzLoadingDelay" [nzSpinning]="nzLoading" [nzIndicator]="nzLoadingIndicator">
      <ng-container *ngIf="nzPaginationPosition === 'both' || nzPaginationPosition === 'top'">
        <ng-template [ngTemplateOutlet]="paginationTemplate"></ng-template>
      </ng-container>
      <div
        #tableMainElement
        class="ant-table"
        [class.ant-table-rtl]="dir === 'rtl'"
        [class.ant-table-fixed-header]="nzData.length && scrollY"
        [class.ant-table-fixed-column]="scrollX"
        [class.ant-table-has-fix-left]="hasFixLeft"
        [class.ant-table-has-fix-right]="hasFixRight"
        [class.ant-table-bordered]="nzBordered"
        [class.nz-table-out-bordered]="nzOuterBordered && !nzBordered"
        [class.ant-table-middle]="nzSize === 'middle'"
        [class.ant-table-small]="nzSize === 'small'"
      >
        <nz-table-title-footer [title]="nzTitle" *ngIf="nzTitle"></nz-table-title-footer>
        <nz-table-inner-scroll
          *ngIf="scrollY || scrollX; else defaultTemplate"
          [data]="data"
          [scrollX]="scrollX"
          [scrollY]="scrollY"
          [contentTemplate]="contentTemplate"
          [listOfColWidth]="listOfAutoColWidth"
          [theadTemplate]="theadTemplate"
          [verticalScrollBarWidth]="verticalScrollBarWidth"
          [virtualTemplate]="nzVirtualScrollDirective ? nzVirtualScrollDirective.templateRef : null"
          [virtualItemSize]="nzVirtualItemSize"
          [virtualMaxBufferPx]="nzVirtualMaxBufferPx"
          [virtualMinBufferPx]="nzVirtualMinBufferPx"
          [tableMainElement]="tableMainElement"
          [virtualForTrackBy]="nzVirtualForTrackBy"
        ></nz-table-inner-scroll>
        <ng-template #defaultTemplate>
          <nz-table-inner-default
            [tableLayout]="nzTableLayout"
            [listOfColWidth]="listOfManualColWidth"
            [theadTemplate]="theadTemplate"
            [contentTemplate]="contentTemplate"
          ></nz-table-inner-default>
        </ng-template>
        <nz-table-title-footer [footer]="nzFooter" *ngIf="nzFooter"></nz-table-title-footer>
      </div>
      <ng-container *ngIf="nzPaginationPosition === 'both' || nzPaginationPosition === 'bottom'">
        <ng-template [ngTemplateOutlet]="paginationTemplate"></ng-template>
      </ng-container>
    </nz-spin>
    <ng-template #paginationTemplate>
      <nz-pagination
        *ngIf="nzShowPagination && data.length"
        [hidden]="!showPagination"
        class="ant-table-pagination ant-table-pagination-right"
        [nzShowSizeChanger]="nzShowSizeChanger"
        [nzPageSizeOptions]="nzPageSizeOptions"
        [nzItemRender]="nzItemRender!"
        [nzShowQuickJumper]="nzShowQuickJumper"
        [nzHideOnSinglePage]="nzHideOnSinglePage"
        [nzShowTotal]="nzShowTotal"
        [nzSize]="nzPaginationType === 'small' ? 'small' : nzSize === 'default' ? 'default' : 'small'"
        [nzPageSize]="nzPageSize"
        [nzTotal]="nzTotal"
        [nzSimple]="nzSimple"
        [nzPageIndex]="nzPageIndex"
        (nzPageSizeChange)="onPageSizeChange($event)"
        (nzPageIndexChange)="onPageIndexChange($event)"
      ></nz-pagination>
    </ng-template>
    <ng-template #contentTemplate>
      <ng-content></ng-content>
    </ng-template>
  `,
                    host: {
                        class: 'ant-table-wrapper',
                        '[class.ant-table-wrapper-rtl]': 'dir === "rtl"'
                    }
                }]
        }], ctorParameters: function () {
        return [{ type: i0.ElementRef }, { type: i1$3.NzResizeObserver }, { type: i1.NzConfigService }, { type: i0.ChangeDetectorRef }, { type: NzTableStyleService }, { type: NzTableDataService }, { type: i5.Directionality, decorators: [{
                        type: Optional
                    }] }];
    }, propDecorators: { nzTableLayout: [{
                type: Input
            }], nzShowTotal: [{
                type: Input
            }], nzItemRender: [{
                type: Input
            }], nzTitle: [{
                type: Input
            }], nzFooter: [{
                type: Input
            }], nzNoResult: [{
                type: Input
            }], nzPageSizeOptions: [{
                type: Input
            }], nzVirtualItemSize: [{
                type: Input
            }], nzVirtualMaxBufferPx: [{
                type: Input
            }], nzVirtualMinBufferPx: [{
                type: Input
            }], nzVirtualForTrackBy: [{
                type: Input
            }], nzLoadingDelay: [{
                type: Input
            }], nzPageIndex: [{
                type: Input
            }], nzPageSize: [{
                type: Input
            }], nzTotal: [{
                type: Input
            }], nzWidthConfig: [{
                type: Input
            }], nzData: [{
                type: Input
            }], nzPaginationPosition: [{
                type: Input
            }], nzScroll: [{
                type: Input
            }], nzPaginationType: [{
                type: Input
            }], nzFrontPagination: [{
                type: Input
            }], nzTemplateMode: [{
                type: Input
            }], nzShowPagination: [{
                type: Input
            }], nzLoading: [{
                type: Input
            }], nzOuterBordered: [{
                type: Input
            }], nzLoadingIndicator: [{
                type: Input
            }], nzBordered: [{
                type: Input
            }], nzSize: [{
                type: Input
            }], nzShowSizeChanger: [{
                type: Input
            }], nzHideOnSinglePage: [{
                type: Input
            }], nzShowQuickJumper: [{
                type: Input
            }], nzSimple: [{
                type: Input
            }], nzPageSizeChange: [{
                type: Output
            }], nzPageIndexChange: [{
                type: Output
            }], nzQueryParams: [{
                type: Output
            }], nzCurrentPageDataChange: [{
                type: Output
            }], nzVirtualScrollDirective: [{
                type: ContentChild,
                args: [NzTableVirtualScrollDirective, { static: false }]
            }], nzTableInnerScrollComponent: [{
                type: ViewChild,
                args: [NzTableInnerScrollComponent]
            }] } });

/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */
class NzTrDirective {
    constructor(nzTableStyleService) {
        this.nzTableStyleService = nzTableStyleService;
        this.destroy$ = new Subject();
        this.listOfFixedColumns$ = new ReplaySubject(1);
        this.listOfColumns$ = new ReplaySubject(1);
        this.listOfFixedColumnsChanges$ = this.listOfFixedColumns$.pipe(switchMap(list => merge(...[this.listOfFixedColumns$, ...list.map((c) => c.changes$)]).pipe(mergeMap(() => this.listOfFixedColumns$))), takeUntil(this.destroy$));
        this.listOfFixedLeftColumnChanges$ = this.listOfFixedColumnsChanges$.pipe(map(list => list.filter(item => item.nzLeft !== false)));
        this.listOfFixedRightColumnChanges$ = this.listOfFixedColumnsChanges$.pipe(map(list => list.filter(item => item.nzRight !== false)));
        this.listOfColumnsChanges$ = this.listOfColumns$.pipe(switchMap(list => merge(...[this.listOfColumns$, ...list.map((c) => c.changes$)]).pipe(mergeMap(() => this.listOfColumns$))), takeUntil(this.destroy$));
        this.isInsideTable = false;
        this.isInsideTable = !!nzTableStyleService;
    }
    ngAfterContentInit() {
        if (this.nzTableStyleService) {
            this.listOfCellFixedDirective.changes
                .pipe(startWith(this.listOfCellFixedDirective), takeUntil(this.destroy$))
                .subscribe(this.listOfFixedColumns$);
            this.listOfNzThDirective.changes
                .pipe(startWith(this.listOfNzThDirective), takeUntil(this.destroy$))
                .subscribe(this.listOfColumns$);
            /** set last left and first right **/
            this.listOfFixedLeftColumnChanges$.subscribe(listOfFixedLeft => {
                listOfFixedLeft.forEach(cell => cell.setIsLastLeft(cell === listOfFixedLeft[listOfFixedLeft.length - 1]));
            });
            this.listOfFixedRightColumnChanges$.subscribe(listOfFixedRight => {
                listOfFixedRight.forEach(cell => cell.setIsFirstRight(cell === listOfFixedRight[0]));
            });
            /** calculate fixed nzLeft and nzRight **/
            combineLatest([this.nzTableStyleService.listOfListOfThWidth$, this.listOfFixedLeftColumnChanges$])
                .pipe(takeUntil(this.destroy$))
                .subscribe(([listOfAutoWidth, listOfLeftCell]) => {
                listOfLeftCell.forEach((cell, index) => {
                    if (cell.isAutoLeft) {
                        const currentArray = listOfLeftCell.slice(0, index);
                        const count = currentArray.reduce((pre, cur) => pre + (cur.colspan || cur.colSpan || 1), 0);
                        const width = listOfAutoWidth.slice(0, count).reduce((pre, cur) => pre + cur, 0);
                        cell.setAutoLeftWidth(`${width}px`);
                    }
                });
            });
            combineLatest([this.nzTableStyleService.listOfListOfThWidth$, this.listOfFixedRightColumnChanges$])
                .pipe(takeUntil(this.destroy$))
                .subscribe(([listOfAutoWidth, listOfRightCell]) => {
                listOfRightCell.forEach((_, index) => {
                    const cell = listOfRightCell[listOfRightCell.length - index - 1];
                    if (cell.isAutoRight) {
                        const currentArray = listOfRightCell.slice(listOfRightCell.length - index, listOfRightCell.length);
                        const count = currentArray.reduce((pre, cur) => pre + (cur.colspan || cur.colSpan || 1), 0);
                        const width = listOfAutoWidth
                            .slice(listOfAutoWidth.length - count, listOfAutoWidth.length)
                            .reduce((pre, cur) => pre + cur, 0);
                        cell.setAutoRightWidth(`${width}px`);
                    }
                });
            });
        }
    }
    ngOnDestroy() {
        this.destroy$.next();
        this.destroy$.complete();
    }
}
NzTrDirective.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.1.2", ngImport: i0, type: NzTrDirective, deps: [{ token: NzTableStyleService, optional: true }], target: i0.ɵɵFactoryTarget.Directive });
NzTrDirective.ɵdir = i0.ɵɵngDeclareDirective({ minVersion: "12.0.0", version: "13.1.2", type: NzTrDirective, selector: "tr:not([mat-row]):not([mat-header-row]):not([nz-table-measure-row]):not([nzExpand]):not([nz-table-fixed-row])", host: { properties: { "class.ant-table-row": "isInsideTable" } }, queries: [{ propertyName: "listOfNzThDirective", predicate: NzThMeasureDirective }, { propertyName: "listOfCellFixedDirective", predicate: NzCellFixedDirective }], ngImport: i0 });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.1.2", ngImport: i0, type: NzTrDirective, decorators: [{
            type: Directive,
            args: [{
                    selector: 'tr:not([mat-row]):not([mat-header-row]):not([nz-table-measure-row]):not([nzExpand]):not([nz-table-fixed-row])',
                    host: {
                        '[class.ant-table-row]': 'isInsideTable'
                    }
                }]
        }], ctorParameters: function () {
        return [{ type: NzTableStyleService, decorators: [{
                        type: Optional
                    }] }];
    }, propDecorators: { listOfNzThDirective: [{
                type: ContentChildren,
                args: [NzThMeasureDirective]
            }], listOfCellFixedDirective: [{
                type: ContentChildren,
                args: [NzCellFixedDirective]
            }] } });

/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */
class NzTheadComponent {
    constructor(elementRef, renderer, nzTableStyleService, nzTableDataService) {
        this.elementRef = elementRef;
        this.renderer = renderer;
        this.nzTableStyleService = nzTableStyleService;
        this.nzTableDataService = nzTableDataService;
        this.destroy$ = new Subject();
        this.isInsideTable = false;
        this.nzSortOrderChange = new EventEmitter();
        this.isInsideTable = !!this.nzTableStyleService;
    }
    ngOnInit() {
        if (this.nzTableStyleService) {
            this.nzTableStyleService.setTheadTemplate(this.templateRef);
        }
    }
    ngAfterContentInit() {
        if (this.nzTableStyleService) {
            const firstTableRow$ = this.listOfNzTrDirective.changes.pipe(startWith(this.listOfNzTrDirective), map(item => item && item.first));
            const listOfColumnsChanges$ = firstTableRow$.pipe(switchMap(firstTableRow => (firstTableRow ? firstTableRow.listOfColumnsChanges$ : EMPTY)), takeUntil(this.destroy$));
            listOfColumnsChanges$.subscribe(data => this.nzTableStyleService.setListOfTh(data));
            /** TODO: need reset the measure row when scrollX change **/
            this.nzTableStyleService.enableAutoMeasure$
                .pipe(switchMap(enable => (enable ? listOfColumnsChanges$ : of([]))))
                .pipe(takeUntil(this.destroy$))
                .subscribe(data => this.nzTableStyleService.setListOfMeasureColumn(data));
            const listOfFixedLeftColumnChanges$ = firstTableRow$.pipe(switchMap(firstTr => (firstTr ? firstTr.listOfFixedLeftColumnChanges$ : EMPTY)), takeUntil(this.destroy$));
            const listOfFixedRightColumnChanges$ = firstTableRow$.pipe(switchMap(firstTr => (firstTr ? firstTr.listOfFixedRightColumnChanges$ : EMPTY)), takeUntil(this.destroy$));
            listOfFixedLeftColumnChanges$.subscribe(listOfFixedLeftColumn => {
                this.nzTableStyleService.setHasFixLeft(listOfFixedLeftColumn.length !== 0);
            });
            listOfFixedRightColumnChanges$.subscribe(listOfFixedRightColumn => {
                this.nzTableStyleService.setHasFixRight(listOfFixedRightColumn.length !== 0);
            });
        }
        if (this.nzTableDataService) {
            const listOfColumn$ = this.listOfNzThAddOnComponent.changes.pipe(startWith(this.listOfNzThAddOnComponent));
            const manualSort$ = listOfColumn$.pipe(switchMap(() => merge(...this.listOfNzThAddOnComponent.map(th => th.manualClickOrder$))), takeUntil(this.destroy$));
            manualSort$.subscribe((data) => {
                const emitValue = { key: data.nzColumnKey, value: data.sortOrder };
                this.nzSortOrderChange.emit(emitValue);
                if (data.nzSortFn && data.nzSortPriority === false) {
                    this.listOfNzThAddOnComponent.filter(th => th !== data).forEach(th => th.clearSortOrder());
                }
            });
            const listOfCalcOperator$ = listOfColumn$.pipe(switchMap(list => merge(...[listOfColumn$, ...list.map((c) => c.calcOperatorChange$)]).pipe(mergeMap(() => listOfColumn$))), map(list => list
                .filter(item => !!item.nzSortFn || !!item.nzFilterFn)
                .map(item => {
                const { nzSortFn, sortOrder, nzFilterFn, nzFilterValue, nzSortPriority, nzColumnKey } = item;
                return {
                    key: nzColumnKey,
                    sortFn: nzSortFn,
                    sortPriority: nzSortPriority,
                    sortOrder: sortOrder,
                    filterFn: nzFilterFn,
                    filterValue: nzFilterValue
                };
            })), 
            // TODO: after checked error here
            delay(0), takeUntil(this.destroy$));
            listOfCalcOperator$.subscribe(list => {
                this.nzTableDataService.listOfCalcOperator$.next(list);
            });
        }
    }
    ngAfterViewInit() {
        if (this.nzTableStyleService) {
            this.renderer.removeChild(this.renderer.parentNode(this.elementRef.nativeElement), this.elementRef.nativeElement);
        }
    }
    ngOnDestroy() {
        this.destroy$.next();
        this.destroy$.complete();
    }
}
NzTheadComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.1.2", ngImport: i0, type: NzTheadComponent, deps: [{ token: i0.ElementRef }, { token: i0.Renderer2 }, { token: NzTableStyleService, optional: true }, { token: NzTableDataService, optional: true }], target: i0.ɵɵFactoryTarget.Component });
NzTheadComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "13.1.2", type: NzTheadComponent, selector: "thead:not(.ant-table-thead)", outputs: { nzSortOrderChange: "nzSortOrderChange" }, queries: [{ propertyName: "listOfNzTrDirective", predicate: NzTrDirective, descendants: true }, { propertyName: "listOfNzThAddOnComponent", predicate: NzThAddOnComponent, descendants: true }], viewQueries: [{ propertyName: "templateRef", first: true, predicate: ["contentTemplate"], descendants: true, static: true }], ngImport: i0, template: `
    <ng-template #contentTemplate>
      <ng-content></ng-content>
    </ng-template>
    <ng-container *ngIf="!isInsideTable">
      <ng-template [ngTemplateOutlet]="contentTemplate"></ng-template>
    </ng-container>
  `, isInline: true, directives: [{ type: i3$1.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { type: i3$1.NgTemplateOutlet, selector: "[ngTemplateOutlet]", inputs: ["ngTemplateOutletContext", "ngTemplateOutlet"] }], changeDetection: i0.ChangeDetectionStrategy.OnPush, encapsulation: i0.ViewEncapsulation.None });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.1.2", ngImport: i0, type: NzTheadComponent, decorators: [{
            type: Component,
            args: [{
                    selector: 'thead:not(.ant-table-thead)',
                    changeDetection: ChangeDetectionStrategy.OnPush,
                    encapsulation: ViewEncapsulation.None,
                    template: `
    <ng-template #contentTemplate>
      <ng-content></ng-content>
    </ng-template>
    <ng-container *ngIf="!isInsideTable">
      <ng-template [ngTemplateOutlet]="contentTemplate"></ng-template>
    </ng-container>
  `
                }]
        }], ctorParameters: function () {
        return [{ type: i0.ElementRef }, { type: i0.Renderer2 }, { type: NzTableStyleService, decorators: [{
                        type: Optional
                    }] }, { type: NzTableDataService, decorators: [{
                        type: Optional
                    }] }];
    }, propDecorators: { templateRef: [{
                type: ViewChild,
                args: ['contentTemplate', { static: true }]
            }], listOfNzTrDirective: [{
                type: ContentChildren,
                args: [NzTrDirective, { descendants: true }]
            }], listOfNzThAddOnComponent: [{
                type: ContentChildren,
                args: [NzThAddOnComponent, { descendants: true }]
            }], nzSortOrderChange: [{
                type: Output
            }] } });

/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */
class NzTrExpandDirective {
    constructor() {
        this.nzExpand = true;
    }
}
NzTrExpandDirective.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.1.2", ngImport: i0, type: NzTrExpandDirective, deps: [], target: i0.ɵɵFactoryTarget.Directive });
NzTrExpandDirective.ɵdir = i0.ɵɵngDeclareDirective({ minVersion: "12.0.0", version: "13.1.2", type: NzTrExpandDirective, selector: "tr[nzExpand]", inputs: { nzExpand: "nzExpand" }, host: { properties: { "hidden": "!nzExpand" }, classAttribute: "ant-table-expanded-row" }, ngImport: i0 });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.1.2", ngImport: i0, type: NzTrExpandDirective, decorators: [{
            type: Directive,
            args: [{
                    selector: 'tr[nzExpand]',
                    host: {
                        class: 'ant-table-expanded-row',
                        '[hidden]': `!nzExpand`
                    }
                }]
        }], ctorParameters: function () { return []; }, propDecorators: { nzExpand: [{
                type: Input
            }] } });

/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */
class NzTableModule {
}
NzTableModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.1.2", ngImport: i0, type: NzTableModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
NzTableModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "12.0.0", version: "13.1.2", ngImport: i0, type: NzTableModule, declarations: [NzTableComponent,
        NzThAddOnComponent,
        NzTableCellDirective,
        NzThMeasureDirective,
        NzTdAddOnComponent,
        NzTheadComponent,
        NzTbodyComponent,
        NzTrDirective,
        NzTrExpandDirective,
        NzTableVirtualScrollDirective,
        NzCellFixedDirective,
        NzTableContentComponent,
        NzTableTitleFooterComponent,
        NzTableInnerDefaultComponent,
        NzTableInnerScrollComponent,
        NzTrMeasureComponent,
        NzRowIndentDirective,
        NzRowExpandButtonDirective,
        NzCellBreakWordDirective,
        NzCellAlignDirective,
        NzTableSortersComponent,
        NzTableFilterComponent,
        NzTableSelectionComponent,
        NzCellEllipsisDirective,
        NzFilterTriggerComponent,
        NzTableFixedRowComponent,
        NzThSelectionComponent], imports: [BidiModule,
        NzMenuModule,
        FormsModule,
        NzOutletModule,
        NzRadioModule,
        NzCheckboxModule,
        NzDropDownModule,
        NzButtonModule,
        CommonModule,
        PlatformModule,
        NzPaginationModule,
        NzResizeObserverModule,
        NzSpinModule,
        NzI18nModule,
        NzIconModule,
        NzEmptyModule,
        ScrollingModule], exports: [NzTableComponent,
        NzThAddOnComponent,
        NzTableCellDirective,
        NzThMeasureDirective,
        NzTdAddOnComponent,
        NzTheadComponent,
        NzTbodyComponent,
        NzTrDirective,
        NzTableVirtualScrollDirective,
        NzCellFixedDirective,
        NzFilterTriggerComponent,
        NzTrExpandDirective,
        NzCellBreakWordDirective,
        NzCellAlignDirective,
        NzCellEllipsisDirective,
        NzTableFixedRowComponent,
        NzThSelectionComponent] });
NzTableModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "13.1.2", ngImport: i0, type: NzTableModule, imports: [[
            BidiModule,
            NzMenuModule,
            FormsModule,
            NzOutletModule,
            NzRadioModule,
            NzCheckboxModule,
            NzDropDownModule,
            NzButtonModule,
            CommonModule,
            PlatformModule,
            NzPaginationModule,
            NzResizeObserverModule,
            NzSpinModule,
            NzI18nModule,
            NzIconModule,
            NzEmptyModule,
            ScrollingModule
        ]] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.1.2", ngImport: i0, type: NzTableModule, decorators: [{
            type: NgModule,
            args: [{
                    declarations: [
                        NzTableComponent,
                        NzThAddOnComponent,
                        NzTableCellDirective,
                        NzThMeasureDirective,
                        NzTdAddOnComponent,
                        NzTheadComponent,
                        NzTbodyComponent,
                        NzTrDirective,
                        NzTrExpandDirective,
                        NzTableVirtualScrollDirective,
                        NzCellFixedDirective,
                        NzTableContentComponent,
                        NzTableTitleFooterComponent,
                        NzTableInnerDefaultComponent,
                        NzTableInnerScrollComponent,
                        NzTrMeasureComponent,
                        NzRowIndentDirective,
                        NzRowExpandButtonDirective,
                        NzCellBreakWordDirective,
                        NzCellAlignDirective,
                        NzTableSortersComponent,
                        NzTableFilterComponent,
                        NzTableSelectionComponent,
                        NzCellEllipsisDirective,
                        NzFilterTriggerComponent,
                        NzTableFixedRowComponent,
                        NzThSelectionComponent
                    ],
                    exports: [
                        NzTableComponent,
                        NzThAddOnComponent,
                        NzTableCellDirective,
                        NzThMeasureDirective,
                        NzTdAddOnComponent,
                        NzTheadComponent,
                        NzTbodyComponent,
                        NzTrDirective,
                        NzTableVirtualScrollDirective,
                        NzCellFixedDirective,
                        NzFilterTriggerComponent,
                        NzTrExpandDirective,
                        NzCellBreakWordDirective,
                        NzCellAlignDirective,
                        NzCellEllipsisDirective,
                        NzTableFixedRowComponent,
                        NzThSelectionComponent
                    ],
                    imports: [
                        BidiModule,
                        NzMenuModule,
                        FormsModule,
                        NzOutletModule,
                        NzRadioModule,
                        NzCheckboxModule,
                        NzDropDownModule,
                        NzButtonModule,
                        CommonModule,
                        PlatformModule,
                        NzPaginationModule,
                        NzResizeObserverModule,
                        NzSpinModule,
                        NzI18nModule,
                        NzIconModule,
                        NzEmptyModule,
                        ScrollingModule
                    ]
                }]
        }] });

/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */

/**
 * Generated bundle index. Do not edit.
 */

export { NzCellAlignDirective, NzCellBreakWordDirective, NzCellEllipsisDirective, NzCellFixedDirective, NzFilterTriggerComponent, NzRowExpandButtonDirective, NzRowIndentDirective, NzTableCellDirective, NzTableComponent, NzTableContentComponent, NzTableDataService, NzTableFilterComponent, NzTableFixedRowComponent, NzTableInnerDefaultComponent, NzTableInnerScrollComponent, NzTableModule, NzTableSelectionComponent, NzTableSortersComponent, NzTableStyleService, NzTableTitleFooterComponent, NzTableVirtualScrollDirective, NzTbodyComponent, NzTdAddOnComponent, NzThAddOnComponent, NzThMeasureDirective, NzThSelectionComponent, NzTheadComponent, NzTrDirective, NzTrExpandDirective, NzTrMeasureComponent };
//# sourceMappingURL=ng-zorro-antd-table.mjs.map
