import { Directionality, BidiModule } from '@angular/cdk/bidi';
import { Platform, PlatformModule } from '@angular/cdk/platform';
import { CdkVirtualScrollViewport, ScrollingModule } from '@angular/cdk/scrolling';
import { CommonModule } from '@angular/common';
import { EventEmitter, Component, ChangeDetectionStrategy, ViewEncapsulation, ChangeDetectorRef, ElementRef, Input, Output, Directive, Renderer2, Injectable, Optional, ViewChild, NgZone, TemplateRef, ContentChild, ContentChildren, ViewChildren, NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzCheckboxModule } from 'ng-zorro-antd/checkbox';
import { NzOutletModule } from 'ng-zorro-antd/core/outlet';
import { NzResizeObserver, NzResizeObserversModule } from 'ng-zorro-antd/core/resize-observers';
import { NzDropDownModule } from 'ng-zorro-antd/dropdown';
import { NzEmptyModule } from 'ng-zorro-antd/empty';
import { NzI18nService, NzI18nModule } from 'ng-zorro-antd/i18n';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzMenuModule } from 'ng-zorro-antd/menu';
import { NzPaginationModule } from 'ng-zorro-antd/pagination';
import { NzRadioModule } from 'ng-zorro-antd/radio';
import { NzSpinModule } from 'ng-zorro-antd/spin';
import { arraysEqual, InputBoolean, isNil, measureScrollbar } from 'ng-zorro-antd/core/util';
import { Subject, ReplaySubject, BehaviorSubject, combineLatest, merge, fromEvent, EMPTY, of } from 'rxjs';
import { takeUntil, map, startWith, delay, switchMap, filter, distinctUntilChanged, debounceTime, skip, mergeMap } from 'rxjs/operators';
import { __decorate, __metadata } from 'tslib';
import { NzResizeService } from 'ng-zorro-antd/core/services';
import { NzConfigService, WithConfig } from 'ng-zorro-antd/core/config';

/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */
class NzFilterTriggerComponent {
    constructor(cdr, elementRef) {
        this.cdr = cdr;
        this.elementRef = elementRef;
        this.nzActive = false;
        this.nzVisible = false;
        this.nzHasBackdrop = false;
        this.nzVisibleChange = new EventEmitter();
        // TODO: move to host after View Engine deprecation
        this.elementRef.nativeElement.classList.add('ant-table-filter-trigger-container');
    }
    onVisibleChange(visible) {
        this.nzVisible = visible;
        this.nzVisibleChange.next(visible);
    }
    onFilterClick($event) {
        $event.stopPropagation();
    }
    hide() {
        this.nzVisible = false;
        this.cdr.markForCheck();
    }
    show() {
        this.nzVisible = true;
        this.cdr.markForCheck();
    }
}
NzFilterTriggerComponent.decorators = [
    { type: Component, args: [{
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
      [nzHasBackdrop]="nzHasBackdrop"
      [nzClickHide]="false"
      [nzDropdownMenu]="nzDropdownMenu"
      [class.active]="nzActive"
      [class.ant-table-filter-open]="nzVisible"
      [nzVisible]="nzVisible"
      (nzVisibleChange)="onVisibleChange($event)"
      (click)="onFilterClick($event)"
    >
      <ng-content></ng-content>
    </span>
  `,
                host: {
                    '[class.ant-table-filter-trigger-container-open]': 'nzVisible'
                }
            },] }
];
NzFilterTriggerComponent.ctorParameters = () => [
    { type: ChangeDetectorRef },
    { type: ElementRef }
];
NzFilterTriggerComponent.propDecorators = {
    nzActive: [{ type: Input }],
    nzDropdownMenu: [{ type: Input }],
    nzVisible: [{ type: Input }],
    nzHasBackdrop: [{ type: Input }],
    nzVisibleChange: [{ type: Output }]
};

/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */
class NzTableFilterComponent {
    constructor(cdr, i18n, elementRef) {
        this.cdr = cdr;
        this.i18n = i18n;
        this.elementRef = elementRef;
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
        // TODO: move to host after View Engine deprecation
        this.elementRef.nativeElement.classList.add('ant-table-filter-column');
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
            this.listOfParsedFilter = this.listOfParsedFilter.map(item => {
                return Object.assign(Object.assign({}, item), { checked: item === filter });
            });
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
NzTableFilterComponent.decorators = [
    { type: Component, args: [{
                selector: 'nz-table-filter',
                preserveWhitespaces: false,
                changeDetection: ChangeDetectionStrategy.OnPush,
                encapsulation: ViewEncapsulation.None,
                template: `
    <span class="ant-table-filter-column-title">
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
            <li nz-menu-item [nzSelected]="f.checked" *ngFor="let f of listOfParsedFilter; trackBy: trackByValue" (click)="check(f)">
              <label nz-radio *ngIf="!filterMultiple" [ngModel]="f.checked" (ngModelChange)="check(f)"></label>
              <label nz-checkbox *ngIf="filterMultiple" [ngModel]="f.checked" (ngModelChange)="check(f)"></label>
              <span>{{ f.text }}</span>
            </li>
          </ul>
          <div class="ant-table-filter-dropdown-btns">
            <button nz-button nzType="link" nzSize="small" (click)="reset()" [disabled]="!isChecked">{{ locale.filterReset }}</button>
            <button nz-button nzType="primary" nzSize="small" (click)="confirm()">{{ locale.filterConfirm }}</button>
          </div>
        </div>
      </nz-dropdown-menu>
    </ng-container>
  `
            },] }
];
NzTableFilterComponent.ctorParameters = () => [
    { type: ChangeDetectorRef },
    { type: NzI18nService },
    { type: ElementRef }
];
NzTableFilterComponent.propDecorators = {
    contentTemplate: [{ type: Input }],
    customFilter: [{ type: Input }],
    extraTemplate: [{ type: Input }],
    filterMultiple: [{ type: Input }],
    listOfFilter: [{ type: Input }],
    filterChange: [{ type: Output }]
};

/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */
class NzRowExpandButtonDirective {
    constructor(elementRef) {
        this.elementRef = elementRef;
        this.expand = false;
        this.spaceMode = false;
        this.expandChange = new EventEmitter();
        // TODO: move to host after View Engine deprecation
        this.elementRef.nativeElement.classList.add('ant-table-row-expand-icon');
    }
    onHostClick() {
        if (!this.spaceMode) {
            this.expand = !this.expand;
            this.expandChange.next(this.expand);
        }
    }
}
NzRowExpandButtonDirective.decorators = [
    { type: Directive, args: [{
                selector: 'button[nz-row-expand-button]',
                host: {
                    '[type]': `'button'`,
                    '[class.ant-table-row-expand-icon-expanded]': `!spaceMode && expand === true`,
                    '[class.ant-table-row-expand-icon-collapsed]': `!spaceMode && expand === false`,
                    '[class.ant-table-row-expand-icon-spaced]': 'spaceMode',
                    '(click)': 'onHostClick()'
                }
            },] }
];
NzRowExpandButtonDirective.ctorParameters = () => [
    { type: ElementRef }
];
NzRowExpandButtonDirective.propDecorators = {
    expand: [{ type: Input }],
    spaceMode: [{ type: Input }],
    expandChange: [{ type: Output }]
};

/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */
class NzRowIndentDirective {
    constructor(elementRef) {
        this.elementRef = elementRef;
        this.indentSize = 0;
        // TODO: move to host after View Engine deprecation
        this.elementRef.nativeElement.classList.add('ant-table-row-indent');
    }
}
NzRowIndentDirective.decorators = [
    { type: Directive, args: [{
                selector: 'nz-row-indent',
                host: {
                    '[style.padding-left.px]': 'indentSize'
                }
            },] }
];
NzRowIndentDirective.ctorParameters = () => [
    { type: ElementRef }
];
NzRowIndentDirective.propDecorators = {
    indentSize: [{ type: Input }]
};

/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */
class NzTableSelectionComponent {
    constructor(elementRef) {
        this.elementRef = elementRef;
        this.listOfSelections = [];
        this.checked = false;
        this.disabled = false;
        this.indeterminate = false;
        this.showCheckbox = false;
        this.showRowSelection = false;
        this.checkedChange = new EventEmitter();
        // TODO: move to host after View Engine deprecation
        this.elementRef.nativeElement.classList.add('ant-table-selection');
    }
    onCheckedChange(checked) {
        this.checked = checked;
        this.checkedChange.emit(checked);
    }
}
NzTableSelectionComponent.decorators = [
    { type: Component, args: [{
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
  `
            },] }
];
NzTableSelectionComponent.ctorParameters = () => [
    { type: ElementRef }
];
NzTableSelectionComponent.propDecorators = {
    listOfSelections: [{ type: Input }],
    checked: [{ type: Input }],
    disabled: [{ type: Input }],
    indeterminate: [{ type: Input }],
    showCheckbox: [{ type: Input }],
    showRowSelection: [{ type: Input }],
    checkedChange: [{ type: Output }]
};

/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */
class NzTableSortersComponent {
    constructor(elementRef) {
        this.elementRef = elementRef;
        this.sortDirections = ['ascend', 'descend', null];
        this.sortOrder = null;
        this.contentTemplate = null;
        this.isUp = false;
        this.isDown = false;
        // TODO: move to host after View Engine deprecation
        this.elementRef.nativeElement.classList.add('ant-table-column-sorters');
    }
    ngOnChanges(changes) {
        const { sortDirections } = changes;
        if (sortDirections) {
            this.isUp = this.sortDirections.indexOf('ascend') !== -1;
            this.isDown = this.sortDirections.indexOf('descend') !== -1;
        }
    }
}
NzTableSortersComponent.decorators = [
    { type: Component, args: [{
                selector: 'nz-table-sorters',
                preserveWhitespaces: false,
                changeDetection: ChangeDetectionStrategy.OnPush,
                encapsulation: ViewEncapsulation.None,
                template: `
    <span><ng-template [ngTemplateOutlet]="contentTemplate"></ng-template></span>
    <span class="ant-table-column-sorter" [class.ant-table-column-sorter-full]="isDown && isUp">
      <span class="ant-table-column-sorter-inner">
        <i nz-icon nzType="caret-up" *ngIf="isUp" class="ant-table-column-sorter-up" [class.active]="sortOrder == 'ascend'"></i>
        <i nz-icon nzType="caret-down" *ngIf="isDown" class="ant-table-column-sorter-down" [class.active]="sortOrder == 'descend'"></i>
      </span>
    </span>
  `
            },] }
];
NzTableSortersComponent.ctorParameters = () => [
    { type: ElementRef }
];
NzTableSortersComponent.propDecorators = {
    sortDirections: [{ type: Input }],
    sortOrder: [{ type: Input }],
    contentTemplate: [{ type: Input }]
};

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
NzCellFixedDirective.decorators = [
    { type: Directive, args: [{
                selector: 'td[nzRight],th[nzRight],td[nzLeft],th[nzLeft]',
                host: {
                    '[class.ant-table-cell-fix-right]': `isFixedRight`,
                    '[class.ant-table-cell-fix-left]': `isFixedLeft`,
                    '[style.position]': `isFixed? 'sticky' : null`
                }
            },] }
];
NzCellFixedDirective.ctorParameters = () => [
    { type: Renderer2 },
    { type: ElementRef }
];
NzCellFixedDirective.propDecorators = {
    nzRight: [{ type: Input }],
    nzLeft: [{ type: Input }],
    colspan: [{ type: Input }],
    colSpan: [{ type: Input }]
};

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
NzTableStyleService.decorators = [
    { type: Injectable }
];
NzTableStyleService.ctorParameters = () => [];

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
NzTableCellDirective.decorators = [
    { type: Directive, args: [{
                selector: 'th:not(.nz-disable-th):not([mat-cell]), td:not(.nz-disable-td):not([mat-cell])',
                host: {
                    '[class.ant-table-cell]': 'isInsideTable'
                }
            },] }
];
NzTableCellDirective.ctorParameters = () => [
    { type: NzTableStyleService, decorators: [{ type: Optional }] }
];

/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */
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
NzTdAddOnComponent.decorators = [
    { type: Component, args: [{
                selector: 'td[nzChecked], td[nzDisabled], td[nzIndeterminate], td[nzIndentSize], td[nzExpand], td[nzShowExpand], td[nzShowCheckbox]',
                changeDetection: ChangeDetectionStrategy.OnPush,
                preserveWhitespaces: false,
                encapsulation: ViewEncapsulation.None,
                template: `
    <ng-container *ngIf="nzShowExpand || nzIndentSize > 0">
      <nz-row-indent [indentSize]="nzIndentSize"></nz-row-indent>
      <button nz-row-expand-button [expand]="nzExpand" (expandChange)="onExpandChange($event)" [spaceMode]="!nzShowExpand"></button>
    </ng-container>
    <label
      nz-checkbox
      *ngIf="nzShowCheckbox"
      [nzDisabled]="nzDisabled"
      [ngModel]="nzChecked"
      [nzIndeterminate]="nzIndeterminate"
      (ngModelChange)="onCheckedChange($event)"
    >
    </label>
    <ng-content></ng-content>
  `,
                host: {
                    '[class.ant-table-cell-with-append]': `nzShowExpand || nzIndentSize > 0`,
                    '[class.ant-table-selection-column]': `nzShowCheckbox`
                }
            },] }
];
NzTdAddOnComponent.propDecorators = {
    nzChecked: [{ type: Input }],
    nzDisabled: [{ type: Input }],
    nzIndeterminate: [{ type: Input }],
    nzIndentSize: [{ type: Input }],
    nzShowExpand: [{ type: Input }],
    nzShowCheckbox: [{ type: Input }],
    nzExpand: [{ type: Input }],
    nzCheckedChange: [{ type: Output }],
    nzExpandChange: [{ type: Output }]
};
__decorate([
    InputBoolean(),
    __metadata("design:type", Object)
], NzTdAddOnComponent.prototype, "nzShowExpand", void 0);
__decorate([
    InputBoolean(),
    __metadata("design:type", Object)
], NzTdAddOnComponent.prototype, "nzShowCheckbox", void 0);
__decorate([
    InputBoolean(),
    __metadata("design:type", Object)
], NzTdAddOnComponent.prototype, "nzExpand", void 0);

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
NzThAddOnComponent.decorators = [
    { type: Component, args: [{
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
      <nz-table-sorters [sortOrder]="sortOrder" [sortDirections]="sortDirections" [contentTemplate]="contentTemplate"></nz-table-sorters>
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
            },] }
];
NzThAddOnComponent.ctorParameters = () => [
    { type: ChangeDetectorRef }
];
NzThAddOnComponent.propDecorators = {
    nzColumnKey: [{ type: Input }],
    nzFilterMultiple: [{ type: Input }],
    nzSortOrder: [{ type: Input }],
    nzSortPriority: [{ type: Input }],
    nzSortDirections: [{ type: Input }],
    nzFilters: [{ type: Input }],
    nzSortFn: [{ type: Input }],
    nzFilterFn: [{ type: Input }],
    nzShowSort: [{ type: Input }],
    nzShowFilter: [{ type: Input }],
    nzCustomFilter: [{ type: Input }],
    nzCheckedChange: [{ type: Output }],
    nzSortOrderChange: [{ type: Output }],
    nzFilterChange: [{ type: Output }]
};
__decorate([
    InputBoolean(),
    __metadata("design:type", Object)
], NzThAddOnComponent.prototype, "nzShowSort", void 0);
__decorate([
    InputBoolean(),
    __metadata("design:type", Object)
], NzThAddOnComponent.prototype, "nzShowFilter", void 0);
__decorate([
    InputBoolean(),
    __metadata("design:type", Object)
], NzThAddOnComponent.prototype, "nzCustomFilter", void 0);

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
NzThMeasureDirective.decorators = [
    { type: Directive, args: [{
                selector: 'th'
            },] }
];
NzThMeasureDirective.ctorParameters = () => [
    { type: Renderer2 },
    { type: ElementRef }
];
NzThMeasureDirective.propDecorators = {
    nzWidth: [{ type: Input }],
    colspan: [{ type: Input }],
    colSpan: [{ type: Input }],
    rowspan: [{ type: Input }],
    rowSpan: [{ type: Input }]
};

class NzThSelectionComponent {
    constructor(elementRef) {
        this.elementRef = elementRef;
        this.nzSelections = [];
        this.nzChecked = false;
        this.nzDisabled = false;
        this.nzIndeterminate = false;
        this.nzShowCheckbox = false;
        this.nzShowRowSelection = false;
        this.nzCheckedChange = new EventEmitter();
        this.isNzShowExpandChanged = false;
        this.isNzShowCheckboxChanged = false;
        // TODO: move to host after View Engine deprecation
        this.elementRef.nativeElement.classList.add('ant-table-selection-column');
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
NzThSelectionComponent.decorators = [
    { type: Component, args: [{
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
  `
            },] }
];
NzThSelectionComponent.ctorParameters = () => [
    { type: ElementRef }
];
NzThSelectionComponent.propDecorators = {
    nzSelections: [{ type: Input }],
    nzChecked: [{ type: Input }],
    nzDisabled: [{ type: Input }],
    nzIndeterminate: [{ type: Input }],
    nzShowCheckbox: [{ type: Input }],
    nzShowRowSelection: [{ type: Input }],
    nzCheckedChange: [{ type: Output }]
};
__decorate([
    InputBoolean(),
    __metadata("design:type", Object)
], NzThSelectionComponent.prototype, "nzShowCheckbox", void 0);
__decorate([
    InputBoolean(),
    __metadata("design:type", Object)
], NzThSelectionComponent.prototype, "nzShowRowSelection", void 0);

/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */
class NzCellAlignDirective {
    constructor() {
        this.nzAlign = null;
    }
}
NzCellAlignDirective.decorators = [
    { type: Directive, args: [{
                selector: 'th[nzAlign],td[nzAlign]',
                host: {
                    '[style.text-align]': 'nzAlign'
                }
            },] }
];
NzCellAlignDirective.propDecorators = {
    nzAlign: [{ type: Input }]
};

/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */
class NzCellEllipsisDirective {
    constructor() {
        this.nzEllipsis = true;
    }
}
NzCellEllipsisDirective.decorators = [
    { type: Directive, args: [{
                selector: 'th[nzEllipsis],td[nzEllipsis]',
                host: {
                    '[class.ant-table-cell-ellipsis]': 'nzEllipsis'
                }
            },] }
];
NzCellEllipsisDirective.propDecorators = {
    nzEllipsis: [{ type: Input }]
};
__decorate([
    InputBoolean(),
    __metadata("design:type", Object)
], NzCellEllipsisDirective.prototype, "nzEllipsis", void 0);

/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */
class NzCellBreakWordDirective {
    constructor() {
        this.nzBreakWord = true;
    }
}
NzCellBreakWordDirective.decorators = [
    { type: Directive, args: [{
                selector: 'th[nzBreakWord],td[nzBreakWord]',
                host: {
                    '[style.word-break]': `nzBreakWord ? 'break-all' : ''`
                }
            },] }
];
NzCellBreakWordDirective.propDecorators = {
    nzBreakWord: [{ type: Input }]
};
__decorate([
    InputBoolean(),
    __metadata("design:type", Object)
], NzCellBreakWordDirective.prototype, "nzBreakWord", void 0);

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
NzTableContentComponent.decorators = [
    { type: Component, args: [{
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
            },] }
];
NzTableContentComponent.propDecorators = {
    tableLayout: [{ type: Input }],
    theadTemplate: [{ type: Input }],
    contentTemplate: [{ type: Input }],
    listOfColWidth: [{ type: Input }],
    scrollX: [{ type: Input }]
};

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
            hostWidth$.subscribe(this.hostWidth$);
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
NzTableFixedRowComponent.decorators = [
    { type: Component, args: [{
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
            },] }
];
NzTableFixedRowComponent.ctorParameters = () => [
    { type: NzTableStyleService },
    { type: Renderer2 }
];
NzTableFixedRowComponent.propDecorators = {
    tdElement: [{ type: ViewChild, args: ['tdElement',] }]
};

/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */
class NzTableInnerDefaultComponent {
    constructor(elementRef) {
        this.elementRef = elementRef;
        this.tableLayout = 'auto';
        this.listOfColWidth = [];
        this.theadTemplate = null;
        this.contentTemplate = null;
        // TODO: move to host after View Engine deprecation
        this.elementRef.nativeElement.classList.add('ant-table-container');
    }
}
NzTableInnerDefaultComponent.decorators = [
    { type: Component, args: [{
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
  `
            },] }
];
NzTableInnerDefaultComponent.ctorParameters = () => [
    { type: ElementRef }
];
NzTableInnerDefaultComponent.propDecorators = {
    tableLayout: [{ type: Input }],
    listOfColWidth: [{ type: Input }],
    theadTemplate: [{ type: Input }],
    contentTemplate: [{ type: Input }]
};

/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */
class NzTableInnerScrollComponent {
    constructor(renderer, ngZone, platform, resizeService, elementRef) {
        this.renderer = renderer;
        this.ngZone = ngZone;
        this.platform = platform;
        this.resizeService = resizeService;
        this.elementRef = elementRef;
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
        // TODO: move to host after View Engine deprecation
        this.elementRef.nativeElement.classList.add('ant-table-container');
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
NzTableInnerScrollComponent.decorators = [
    { type: Component, args: [{
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
              <ng-template [ngTemplateOutlet]="virtualTemplate" [ngTemplateOutletContext]="{ $implicit: item, index: i }"></ng-template>
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
  `
            },] }
];
NzTableInnerScrollComponent.ctorParameters = () => [
    { type: Renderer2 },
    { type: NgZone },
    { type: Platform },
    { type: NzResizeService },
    { type: ElementRef }
];
NzTableInnerScrollComponent.propDecorators = {
    data: [{ type: Input }],
    scrollX: [{ type: Input }],
    scrollY: [{ type: Input }],
    contentTemplate: [{ type: Input }],
    widthConfig: [{ type: Input }],
    listOfColWidth: [{ type: Input }],
    theadTemplate: [{ type: Input }],
    virtualTemplate: [{ type: Input }],
    virtualItemSize: [{ type: Input }],
    virtualMaxBufferPx: [{ type: Input }],
    virtualMinBufferPx: [{ type: Input }],
    tableMainElement: [{ type: Input }],
    virtualForTrackBy: [{ type: Input }],
    tableHeaderElement: [{ type: ViewChild, args: ['tableHeaderElement', { read: ElementRef },] }],
    tableBodyElement: [{ type: ViewChild, args: ['tableBodyElement', { read: ElementRef },] }],
    cdkVirtualScrollViewport: [{ type: ViewChild, args: [CdkVirtualScrollViewport, { read: CdkVirtualScrollViewport },] }],
    verticalScrollBarWidth: [{ type: Input }]
};

/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */
class NzTableVirtualScrollDirective {
    constructor(templateRef) {
        this.templateRef = templateRef;
    }
}
NzTableVirtualScrollDirective.decorators = [
    { type: Directive, args: [{
                selector: '[nz-virtual-scroll]',
                exportAs: 'nzVirtualScroll'
            },] }
];
NzTableVirtualScrollDirective.ctorParameters = () => [
    { type: TemplateRef }
];

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
        ]).pipe(debounceTime(0), skip(1), map(([pageIndex, pageSize, listOfCalc]) => {
            return {
                pageIndex,
                pageSize,
                sort: listOfCalc
                    .filter(item => item.sortFn)
                    .map(item => {
                    return {
                        key: item.key,
                        value: item.sortOrder
                    };
                }),
                filter: listOfCalc
                    .filter(item => item.filterFn)
                    .map(item => {
                    return {
                        key: item.key,
                        value: item.filterValue
                    };
                })
            };
        }));
        this.listOfDataAfterCalc$ = combineLatest([this.listOfData$, this.listOfCalcOperator$]).pipe(map(([listOfData, listOfCalcOperator]) => {
            let listOfDataAfterCalc = [...listOfData];
            const listOfFilterOperator = listOfCalcOperator.filter(item => {
                const { filterValue, filterFn } = item;
                const isReset = filterValue === null || filterValue === undefined || (Array.isArray(filterValue) && filterValue.length === 0);
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
        this.listOfFrontEndCurrentPageData$ = combineLatest([this.pageIndexDistinct$, this.pageSizeDistinct$, this.listOfDataAfterCalc$]).pipe(takeUntil(this.destroy$), filter(value => {
            const [pageIndex, pageSize, listOfData] = value;
            const maxPageIndex = Math.ceil(listOfData.length / pageSize) || 1;
            return pageIndex <= maxPageIndex;
        }), map(([pageIndex, pageSize, listOfData]) => {
            return listOfData.slice((pageIndex - 1) * pageSize, pageIndex * pageSize);
        }));
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
NzTableDataService.decorators = [
    { type: Injectable }
];
NzTableDataService.ctorParameters = () => [];

/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */
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
        this.loading$ = new BehaviorSubject(false);
        this.templateMode$ = new BehaviorSubject(false);
        this.dir = 'ltr';
        this.verticalScrollBarWidth = 0;
        // TODO: move to host after View Engine deprecation
        this.elementRef.nativeElement.classList.add('ant-table-wrapper');
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
        combineLatest([total$, this.loading$, this.templateMode$])
            .pipe(map(([total, loading, templateMode]) => total === 0 && !loading && !templateMode), takeUntil(this.destroy$))
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
        const { nzScroll, nzPageIndex, nzPageSize, nzFrontPagination, nzData, nzWidthConfig, nzNoResult, nzLoading, nzTemplateMode } = changes;
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
        if (nzLoading) {
            this.loading$.next(this.nzLoading);
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
NzTableComponent.decorators = [
    { type: Component, args: [{
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
                    '[class.ant-table-wrapper-rtl]': 'dir === "rtl"'
                }
            },] }
];
NzTableComponent.ctorParameters = () => [
    { type: ElementRef },
    { type: NzResizeObserver },
    { type: NzConfigService },
    { type: ChangeDetectorRef },
    { type: NzTableStyleService },
    { type: NzTableDataService },
    { type: Directionality, decorators: [{ type: Optional }] }
];
NzTableComponent.propDecorators = {
    nzTableLayout: [{ type: Input }],
    nzShowTotal: [{ type: Input }],
    nzItemRender: [{ type: Input }],
    nzTitle: [{ type: Input }],
    nzFooter: [{ type: Input }],
    nzNoResult: [{ type: Input }],
    nzPageSizeOptions: [{ type: Input }],
    nzVirtualItemSize: [{ type: Input }],
    nzVirtualMaxBufferPx: [{ type: Input }],
    nzVirtualMinBufferPx: [{ type: Input }],
    nzVirtualForTrackBy: [{ type: Input }],
    nzLoadingDelay: [{ type: Input }],
    nzPageIndex: [{ type: Input }],
    nzPageSize: [{ type: Input }],
    nzTotal: [{ type: Input }],
    nzWidthConfig: [{ type: Input }],
    nzData: [{ type: Input }],
    nzPaginationPosition: [{ type: Input }],
    nzScroll: [{ type: Input }],
    nzPaginationType: [{ type: Input }],
    nzFrontPagination: [{ type: Input }],
    nzTemplateMode: [{ type: Input }],
    nzShowPagination: [{ type: Input }],
    nzLoading: [{ type: Input }],
    nzOuterBordered: [{ type: Input }],
    nzLoadingIndicator: [{ type: Input }],
    nzBordered: [{ type: Input }],
    nzSize: [{ type: Input }],
    nzShowSizeChanger: [{ type: Input }],
    nzHideOnSinglePage: [{ type: Input }],
    nzShowQuickJumper: [{ type: Input }],
    nzSimple: [{ type: Input }],
    nzPageSizeChange: [{ type: Output }],
    nzPageIndexChange: [{ type: Output }],
    nzQueryParams: [{ type: Output }],
    nzCurrentPageDataChange: [{ type: Output }],
    nzVirtualScrollDirective: [{ type: ContentChild, args: [NzTableVirtualScrollDirective, { static: false },] }],
    nzTableInnerScrollComponent: [{ type: ViewChild, args: [NzTableInnerScrollComponent,] }]
};
__decorate([
    InputBoolean(),
    __metadata("design:type", Object)
], NzTableComponent.prototype, "nzFrontPagination", void 0);
__decorate([
    InputBoolean(),
    __metadata("design:type", Object)
], NzTableComponent.prototype, "nzTemplateMode", void 0);
__decorate([
    InputBoolean(),
    __metadata("design:type", Object)
], NzTableComponent.prototype, "nzShowPagination", void 0);
__decorate([
    InputBoolean(),
    __metadata("design:type", Object)
], NzTableComponent.prototype, "nzLoading", void 0);
__decorate([
    InputBoolean(),
    __metadata("design:type", Object)
], NzTableComponent.prototype, "nzOuterBordered", void 0);
__decorate([
    WithConfig(),
    __metadata("design:type", Object)
], NzTableComponent.prototype, "nzLoadingIndicator", void 0);
__decorate([
    WithConfig(),
    InputBoolean(),
    __metadata("design:type", Boolean)
], NzTableComponent.prototype, "nzBordered", void 0);
__decorate([
    WithConfig(),
    __metadata("design:type", String)
], NzTableComponent.prototype, "nzSize", void 0);
__decorate([
    WithConfig(),
    InputBoolean(),
    __metadata("design:type", Boolean)
], NzTableComponent.prototype, "nzShowSizeChanger", void 0);
__decorate([
    WithConfig(),
    InputBoolean(),
    __metadata("design:type", Boolean)
], NzTableComponent.prototype, "nzHideOnSinglePage", void 0);
__decorate([
    WithConfig(),
    InputBoolean(),
    __metadata("design:type", Boolean)
], NzTableComponent.prototype, "nzShowQuickJumper", void 0);
__decorate([
    WithConfig(),
    InputBoolean(),
    __metadata("design:type", Boolean)
], NzTableComponent.prototype, "nzSimple", void 0);

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
NzTbodyComponent.decorators = [
    { type: Component, args: [{
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
            },] }
];
NzTbodyComponent.ctorParameters = () => [
    { type: NzTableStyleService, decorators: [{ type: Optional }] }
];

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
            this.listOfNzThDirective.changes.pipe(startWith(this.listOfNzThDirective), takeUntil(this.destroy$)).subscribe(this.listOfColumns$);
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
NzTrDirective.decorators = [
    { type: Directive, args: [{
                selector: 'tr:not([mat-row]):not([mat-header-row]):not([nz-table-measure-row]):not([nzExpand]):not([nz-table-fixed-row])',
                host: {
                    '[class.ant-table-row]': 'isInsideTable'
                }
            },] }
];
NzTrDirective.ctorParameters = () => [
    { type: NzTableStyleService, decorators: [{ type: Optional }] }
];
NzTrDirective.propDecorators = {
    listOfNzThDirective: [{ type: ContentChildren, args: [NzThMeasureDirective,] }],
    listOfCellFixedDirective: [{ type: ContentChildren, args: [NzCellFixedDirective,] }]
};

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
NzTheadComponent.decorators = [
    { type: Component, args: [{
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
            },] }
];
NzTheadComponent.ctorParameters = () => [
    { type: ElementRef },
    { type: Renderer2 },
    { type: NzTableStyleService, decorators: [{ type: Optional }] },
    { type: NzTableDataService, decorators: [{ type: Optional }] }
];
NzTheadComponent.propDecorators = {
    templateRef: [{ type: ViewChild, args: ['contentTemplate', { static: true },] }],
    listOfNzTrDirective: [{ type: ContentChildren, args: [NzTrDirective, { descendants: true },] }],
    listOfNzThAddOnComponent: [{ type: ContentChildren, args: [NzThAddOnComponent, { descendants: true },] }],
    nzSortOrderChange: [{ type: Output }]
};

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
NzTableTitleFooterComponent.decorators = [
    { type: Component, args: [{
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
            },] }
];
NzTableTitleFooterComponent.propDecorators = {
    title: [{ type: Input }],
    footer: [{ type: Input }]
};

/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */
class NzTrExpandDirective {
    constructor(elementRef) {
        this.elementRef = elementRef;
        this.nzExpand = true;
        // TODO: move to host after View Engine deprecation
        this.elementRef.nativeElement.classList.add('ant-table-expanded-row');
    }
}
NzTrExpandDirective.decorators = [
    { type: Directive, args: [{
                selector: 'tr[nzExpand]',
                host: {
                    '[hidden]': `!nzExpand`
                }
            },] }
];
NzTrExpandDirective.ctorParameters = () => [
    { type: ElementRef }
];
NzTrExpandDirective.propDecorators = {
    nzExpand: [{ type: Input }]
};

/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */
class NzTrMeasureComponent {
    constructor(nzResizeObserver, ngZone, elementRef) {
        this.nzResizeObserver = nzResizeObserver;
        this.ngZone = ngZone;
        this.elementRef = elementRef;
        this.listOfMeasureColumn = [];
        this.listOfAutoWidth = new EventEmitter();
        this.destroy$ = new Subject();
        // TODO: move to host after View Engine deprecation
        this.elementRef.nativeElement.classList.add('ant-table-measure-now');
    }
    trackByFunc(_, key) {
        return key;
    }
    ngAfterViewInit() {
        this.listOfTdElement.changes
            .pipe(startWith(this.listOfTdElement))
            .pipe(switchMap(list => {
            return combineLatest(list.toArray().map((item) => {
                return this.nzResizeObserver.observe(item).pipe(map(([entry]) => {
                    const { width } = entry.target.getBoundingClientRect();
                    return Math.floor(width);
                }));
            }));
        }), debounceTime(16), takeUntil(this.destroy$))
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
NzTrMeasureComponent.decorators = [
    { type: Component, args: [{
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
  `
            },] }
];
NzTrMeasureComponent.ctorParameters = () => [
    { type: NzResizeObserver },
    { type: NgZone },
    { type: ElementRef }
];
NzTrMeasureComponent.propDecorators = {
    listOfMeasureColumn: [{ type: Input }],
    listOfAutoWidth: [{ type: Output }],
    listOfTdElement: [{ type: ViewChildren, args: ['tdElement',] }]
};

/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */
class NzTableModule {
}
NzTableModule.decorators = [
    { type: NgModule, args: [{
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
                    NzResizeObserversModule,
                    NzSpinModule,
                    NzI18nModule,
                    NzIconModule,
                    NzEmptyModule,
                    ScrollingModule
                ]
            },] }
];

/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */

/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */

/**
 * Generated bundle index. Do not edit.
 */

export { NzCellAlignDirective, NzCellBreakWordDirective, NzCellEllipsisDirective, NzCellFixedDirective, NzFilterTriggerComponent, NzRowExpandButtonDirective, NzRowIndentDirective, NzTableCellDirective, NzTableComponent, NzTableContentComponent, NzTableDataService, NzTableFilterComponent, NzTableFixedRowComponent, NzTableInnerDefaultComponent, NzTableInnerScrollComponent, NzTableModule, NzTableSelectionComponent, NzTableSortersComponent, NzTableStyleService, NzTableTitleFooterComponent, NzTableVirtualScrollDirective, NzTbodyComponent, NzTdAddOnComponent, NzThAddOnComponent, NzThMeasureDirective, NzThSelectionComponent, NzTheadComponent, NzTrDirective, NzTrExpandDirective, NzTrMeasureComponent };
//# sourceMappingURL=ng-zorro-antd-table.js.map
