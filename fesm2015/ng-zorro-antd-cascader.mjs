import { __decorate } from 'tslib';
import { DOWN_ARROW, UP_ARROW, LEFT_ARROW, RIGHT_ARROW, ENTER, BACKSPACE, ESCAPE } from '@angular/cdk/keycodes';
import * as i8 from '@angular/cdk/overlay';
import { CdkConnectedOverlay, OverlayModule } from '@angular/cdk/overlay';
import * as i0 from '@angular/core';
import { Component, ChangeDetectionStrategy, ViewEncapsulation, Input, Injectable, EventEmitter, forwardRef, Optional, Host, ViewChild, ViewChildren, Output, HostListener, NgModule } from '@angular/core';
import * as i10 from '@angular/forms';
import { NG_VALUE_ACCESSOR, FormsModule } from '@angular/forms';
import { BehaviorSubject, Subject, fromEvent } from 'rxjs';
import { takeUntil, startWith } from 'rxjs/operators';
import { slideMotion } from 'ng-zorro-antd/core/animation';
import * as i2$1 from 'ng-zorro-antd/core/config';
import { WithConfig } from 'ng-zorro-antd/core/config';
import * as i12 from 'ng-zorro-antd/core/overlay';
import { DEFAULT_CASCADER_POSITIONS, NzOverlayModule } from 'ng-zorro-antd/core/overlay';
import { isNotNil, arraysEqual, toArray, InputBoolean } from 'ng-zorro-antd/core/util';
import * as i9 from '@angular/common';
import { CommonModule } from '@angular/common';
import * as i2 from 'ng-zorro-antd/icon';
import { NzIconModule } from 'ng-zorro-antd/icon';
import * as i3 from 'ng-zorro-antd/core/outlet';
import { NzOutletModule } from 'ng-zorro-antd/core/outlet';
import * as i4 from 'ng-zorro-antd/core/highlight';
import { NzHighlightModule } from 'ng-zorro-antd/core/highlight';
import * as i3$1 from 'ng-zorro-antd/i18n';
import * as i4$1 from '@angular/cdk/bidi';
import { BidiModule } from '@angular/cdk/bidi';
import * as i5 from 'ng-zorro-antd/core/no-animation';
import { NzNoAnimationModule } from 'ng-zorro-antd/core/no-animation';
import * as i6 from 'ng-zorro-antd/empty';
import { NzEmptyModule } from 'ng-zorro-antd/empty';
import { NzInputModule } from 'ng-zorro-antd/input';

/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */
function isShowSearchObject(options) {
    return typeof options !== 'boolean';
}

/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */
function isChildOption(o) {
    return o.isLeaf || !o.children || !o.children.length;
}
function isParentOption(o) {
    return !!o.children && !!o.children.length && !o.isLeaf;
}

class NzCascaderOptionComponent {
    constructor(cdr, elementRef, renderer) {
        this.cdr = cdr;
        this.optionTemplate = null;
        this.activated = false;
        this.nzLabelProperty = 'label';
        this.expandIcon = '';
        this.dir = 'ltr';
        renderer.addClass(elementRef.nativeElement, 'ant-cascader-menu-item');
        renderer.addClass(elementRef.nativeElement, 'ant-cascader-menu-item-expanded');
        this.nativeElement = elementRef.nativeElement;
    }
    ngOnInit() {
        if (this.expandIcon === '' && this.dir === 'rtl') {
            this.expandIcon = 'left';
        }
        else if (this.expandIcon === '') {
            this.expandIcon = 'right';
        }
    }
    get optionLabel() {
        return this.option[this.nzLabelProperty];
    }
    markForCheck() {
        this.cdr.markForCheck();
    }
}
NzCascaderOptionComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.1.2", ngImport: i0, type: NzCascaderOptionComponent, deps: [{ token: i0.ChangeDetectorRef }, { token: i0.ElementRef }, { token: i0.Renderer2 }], target: i0.ɵɵFactoryTarget.Component });
NzCascaderOptionComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "13.1.2", type: NzCascaderOptionComponent, selector: "[nz-cascader-option]", inputs: { optionTemplate: "optionTemplate", option: "option", activated: "activated", highlightText: "highlightText", nzLabelProperty: "nzLabelProperty", columnIndex: "columnIndex", expandIcon: "expandIcon", dir: "dir" }, host: { properties: { "attr.title": "option.title || optionLabel", "class.ant-cascader-menu-item-active": "activated", "class.ant-cascader-menu-item-expand": "!option.isLeaf", "class.ant-cascader-menu-item-disabled": "option.disabled" } }, exportAs: ["nzCascaderOption"], ngImport: i0, template: `
    <ng-container *ngIf="optionTemplate; else defaultOptionTemplate">
      <ng-template
        [ngTemplateOutlet]="optionTemplate"
        [ngTemplateOutletContext]="{ $implicit: option, index: columnIndex }"
      ></ng-template>
    </ng-container>
    <ng-template #defaultOptionTemplate>
      <div
        class="ant-cascader-menu-item-content"
        [innerHTML]="optionLabel | nzHighlight: highlightText:'g':'ant-cascader-menu-item-keyword'"
      ></div>
    </ng-template>
    <div *ngIf="!option.isLeaf || option.children?.length || option.loading" class="ant-cascader-menu-item-expand-icon">
      <i *ngIf="option.loading; else icon" nz-icon nzType="loading"></i>
      <ng-template #icon>
        <ng-container *nzStringTemplateOutlet="expandIcon">
          <i nz-icon [nzType]="$any(expandIcon)"></i>
        </ng-container>
      </ng-template>
    </div>
  `, isInline: true, directives: [{ type: i9.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { type: i9.NgTemplateOutlet, selector: "[ngTemplateOutlet]", inputs: ["ngTemplateOutletContext", "ngTemplateOutlet"] }, { type: i2.NzIconDirective, selector: "[nz-icon]", inputs: ["nzSpin", "nzRotate", "nzType", "nzTheme", "nzTwotoneColor", "nzIconfont"], exportAs: ["nzIcon"] }, { type: i3.NzStringTemplateOutletDirective, selector: "[nzStringTemplateOutlet]", inputs: ["nzStringTemplateOutletContext", "nzStringTemplateOutlet"], exportAs: ["nzStringTemplateOutlet"] }], pipes: { "nzHighlight": i4.NzHighlightPipe }, changeDetection: i0.ChangeDetectionStrategy.OnPush, encapsulation: i0.ViewEncapsulation.None });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.1.2", ngImport: i0, type: NzCascaderOptionComponent, decorators: [{
            type: Component,
            args: [{
                    changeDetection: ChangeDetectionStrategy.OnPush,
                    encapsulation: ViewEncapsulation.None,
                    selector: '[nz-cascader-option]',
                    exportAs: 'nzCascaderOption',
                    template: `
    <ng-container *ngIf="optionTemplate; else defaultOptionTemplate">
      <ng-template
        [ngTemplateOutlet]="optionTemplate"
        [ngTemplateOutletContext]="{ $implicit: option, index: columnIndex }"
      ></ng-template>
    </ng-container>
    <ng-template #defaultOptionTemplate>
      <div
        class="ant-cascader-menu-item-content"
        [innerHTML]="optionLabel | nzHighlight: highlightText:'g':'ant-cascader-menu-item-keyword'"
      ></div>
    </ng-template>
    <div *ngIf="!option.isLeaf || option.children?.length || option.loading" class="ant-cascader-menu-item-expand-icon">
      <i *ngIf="option.loading; else icon" nz-icon nzType="loading"></i>
      <ng-template #icon>
        <ng-container *nzStringTemplateOutlet="expandIcon">
          <i nz-icon [nzType]="$any(expandIcon)"></i>
        </ng-container>
      </ng-template>
    </div>
  `,
                    host: {
                        '[attr.title]': 'option.title || optionLabel',
                        '[class.ant-cascader-menu-item-active]': 'activated',
                        '[class.ant-cascader-menu-item-expand]': '!option.isLeaf',
                        '[class.ant-cascader-menu-item-disabled]': 'option.disabled'
                    }
                }]
        }], ctorParameters: function () { return [{ type: i0.ChangeDetectorRef }, { type: i0.ElementRef }, { type: i0.Renderer2 }]; }, propDecorators: { optionTemplate: [{
                type: Input
            }], option: [{
                type: Input
            }], activated: [{
                type: Input
            }], highlightText: [{
                type: Input
            }], nzLabelProperty: [{
                type: Input
            }], columnIndex: [{
                type: Input
            }], expandIcon: [{
                type: Input
            }], dir: [{
                type: Input
            }] } });

/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */
/**
 * All data is stored and parsed in NzCascaderService.
 */
class NzCascaderService {
    constructor() {
        /** Activated options in each column. */
        this.activatedOptions = [];
        /** An array to store cascader items arranged in different layers. */
        this.columns = [];
        /** If user has entered searching mode. */
        this.inSearchingMode = false;
        /** Selected options would be output to user. */
        this.selectedOptions = [];
        this.values = [];
        this.$loading = new BehaviorSubject(false);
        /**
         * Emit an event to notify cascader it needs to redraw because activated or
         * selected options are changed.
         */
        this.$redraw = new Subject();
        /**
         * Emit an event when an option gets selected.
         * Emit true if a leaf options is selected.
         */
        this.$optionSelected = new Subject();
        /**
         * Emit an event to notify cascader it needs to quit searching mode.
         * Only emit when user do select a searching option.
         */
        this.$quitSearching = new Subject();
        /** To hold columns before entering searching mode. */
        this.columnsSnapshot = [[]];
        /** To hold activated options before entering searching mode. */
        this.activatedOptionsSnapshot = [];
    }
    /** Return cascader options in the first layer. */
    get nzOptions() {
        return this.columns[0];
    }
    ngOnDestroy() {
        this.$redraw.complete();
        this.$quitSearching.complete();
        this.$optionSelected.complete();
        this.$loading.complete();
    }
    /**
     * Make sure that value matches what is displayed in the dropdown.
     */
    syncOptions(first = false) {
        const values = this.values;
        const hasValue = values && values.length;
        const lastColumnIndex = values.length - 1;
        const initColumnWithIndex = (columnIndex) => {
            const activatedOptionSetter = () => {
                const currentValue = values[columnIndex];
                if (!isNotNil(currentValue)) {
                    this.$redraw.next();
                    return;
                }
                const option = this.findOptionWithValue(columnIndex, values[columnIndex]) ||
                    (typeof currentValue === 'object'
                        ? currentValue
                        : {
                            [`${this.cascaderComponent.nzValueProperty}`]: currentValue,
                            [`${this.cascaderComponent.nzLabelProperty}`]: currentValue
                        });
                this.setOptionActivated(option, columnIndex, false, false);
                if (columnIndex < lastColumnIndex) {
                    initColumnWithIndex(columnIndex + 1);
                }
                else {
                    this.dropBehindColumns(columnIndex);
                    this.selectedOptions = [...this.activatedOptions];
                    this.$redraw.next();
                }
            };
            if (this.isLoaded(columnIndex) || !this.cascaderComponent.nzLoadData) {
                activatedOptionSetter();
            }
            else {
                const option = this.activatedOptions[columnIndex - 1] || {};
                this.loadChildren(option, columnIndex - 1, activatedOptionSetter);
            }
        };
        this.activatedOptions = [];
        this.selectedOptions = [];
        if (first && this.cascaderComponent.nzLoadData && !hasValue) {
            // Should also notify the component that value changes. Fix #3480.
            this.$redraw.next();
            return;
        }
        else {
            initColumnWithIndex(0);
        }
    }
    /**
     * Bind cascader component so this service could use inputs.
     */
    withComponent(cascaderComponent) {
        this.cascaderComponent = cascaderComponent;
    }
    /**
     * Reset all options. Rebuild searching options if in searching mode.
     */
    withOptions(options) {
        this.columnsSnapshot = this.columns = options && options.length ? [options] : [];
        if (this.inSearchingMode) {
            this.prepareSearchOptions(this.cascaderComponent.inputValue);
        }
        else if (this.columns.length) {
            this.syncOptions();
        }
    }
    /**
     * Try to set a option as activated.
     *
     * @param option Cascader option
     * @param columnIndex Of which column this option is in
     * @param performSelect Select
     * @param loadingChildren Try to load children asynchronously.
     */
    setOptionActivated(option, columnIndex, performSelect = false, loadingChildren = true) {
        if (option.disabled) {
            return;
        }
        this.activatedOptions[columnIndex] = option;
        this.trackAncestorActivatedOptions(columnIndex);
        this.dropBehindActivatedOptions(columnIndex);
        const isParent = isParentOption(option);
        if (isParent) {
            // Parent option that has children.
            this.setColumnData(option.children, columnIndex + 1, option);
        }
        else if (!option.isLeaf && loadingChildren) {
            // Parent option that should try to load children asynchronously.
            this.loadChildren(option, columnIndex);
        }
        else if (option.isLeaf) {
            // Leaf option.
            this.dropBehindColumns(columnIndex);
        }
        // Actually perform selection to make an options not only activated but also selected.
        if (performSelect) {
            this.setOptionSelected(option, columnIndex);
        }
        this.$redraw.next();
    }
    setOptionSelected(option, index) {
        const changeOn = this.cascaderComponent.nzChangeOn;
        const shouldPerformSelection = (o, i) => typeof changeOn === 'function' ? changeOn(o, i) : false;
        if (option.isLeaf || this.cascaderComponent.nzChangeOnSelect || shouldPerformSelection(option, index)) {
            this.selectedOptions = [...this.activatedOptions];
            this.prepareEmitValue();
            this.$redraw.next();
            this.$optionSelected.next({ option, index });
        }
    }
    setOptionDeactivatedSinceColumn(column) {
        this.dropBehindActivatedOptions(column - 1);
        this.dropBehindColumns(column);
        this.$redraw.next();
    }
    /**
     * Set a searching option as selected, finishing up things.
     *
     * @param option
     */
    setSearchOptionSelected(option) {
        this.activatedOptions = [option];
        this.selectedOptions = [...option.path];
        this.prepareEmitValue();
        this.$redraw.next();
        this.$optionSelected.next({ option, index: 0 });
        setTimeout(() => {
            // Reset data and tell UI only to remove input and reset dropdown width style.
            this.$quitSearching.next();
            this.$redraw.next();
            this.inSearchingMode = false;
            this.columns = [...this.columnsSnapshot];
            this.activatedOptions = [...this.selectedOptions];
        }, 200);
    }
    /**
     * Filter cascader options to reset `columns`.
     *
     * @param searchValue The string user wants to search.
     */
    prepareSearchOptions(searchValue) {
        const results = []; // Search results only have one layer.
        const path = [];
        const defaultFilter = (i, p) => p.some(o => {
            const label = this.getOptionLabel(o);
            return !!label && label.indexOf(i) !== -1;
        });
        const showSearch = this.cascaderComponent.nzShowSearch;
        const filter = isShowSearchObject(showSearch) && showSearch.filter ? showSearch.filter : defaultFilter;
        const sorter = isShowSearchObject(showSearch) && showSearch.sorter ? showSearch.sorter : null;
        const loopChild = (node, forceDisabled = false) => {
            path.push(node);
            const cPath = Array.from(path);
            if (filter(searchValue, cPath)) {
                const disabled = forceDisabled || node.disabled;
                const option = {
                    disabled,
                    isLeaf: true,
                    path: cPath,
                    [this.cascaderComponent.nzLabelProperty]: cPath.map(p => this.getOptionLabel(p)).join(' / ')
                };
                results.push(option);
            }
            path.pop();
        };
        const loopParent = (node, forceDisabled = false) => {
            const disabled = forceDisabled || node.disabled;
            path.push(node);
            node.children.forEach(sNode => {
                if (!sNode.parent) {
                    sNode.parent = node;
                }
                if (!sNode.isLeaf) {
                    loopParent(sNode, disabled);
                }
                if (sNode.isLeaf || !sNode.children || !sNode.children.length) {
                    loopChild(sNode, disabled);
                }
            });
            path.pop();
        };
        if (!this.columnsSnapshot.length) {
            this.columns = [[]];
            return;
        }
        this.columnsSnapshot[0].forEach(o => (isChildOption(o) ? loopChild(o) : loopParent(o)));
        if (sorter) {
            results.sort((a, b) => sorter(a.path, b.path, searchValue));
        }
        this.columns = [results];
        this.$redraw.next(); // Search results may be empty, so should redraw.
    }
    /**
     * Toggle searching mode by UI. It deals with things not directly related to UI.
     *
     * @param toSearching If this cascader is entering searching mode
     */
    toggleSearchingMode(toSearching) {
        this.inSearchingMode = toSearching;
        if (toSearching) {
            this.activatedOptionsSnapshot = [...this.activatedOptions];
            this.activatedOptions = [];
            this.selectedOptions = [];
            this.$redraw.next();
        }
        else {
            // User quit searching mode without selecting an option.
            this.activatedOptions = [...this.activatedOptionsSnapshot];
            this.selectedOptions = [...this.activatedOptions];
            this.columns = [...this.columnsSnapshot];
            this.syncOptions();
            this.$redraw.next();
        }
    }
    /**
     * Clear selected options.
     */
    clear() {
        this.values = [];
        this.selectedOptions = [];
        this.activatedOptions = [];
        this.dropBehindColumns(0);
        this.$redraw.next();
        this.$optionSelected.next(null);
    }
    getOptionLabel(o) {
        return o[this.cascaderComponent.nzLabelProperty || 'label'];
    }
    getOptionValue(o) {
        return o[this.cascaderComponent.nzValueProperty || 'value'];
    }
    /**
     * Try to insert options into a column.
     *
     * @param options Options to insert
     * @param columnIndex Position
     */
    setColumnData(options, columnIndex, parent) {
        const existingOptions = this.columns[columnIndex];
        if (!arraysEqual(existingOptions, options)) {
            options.forEach(o => (o.parent = parent));
            this.columns[columnIndex] = options;
            this.dropBehindColumns(columnIndex);
        }
    }
    /**
     * Set all ancestor options as activated.
     */
    trackAncestorActivatedOptions(startIndex) {
        for (let i = startIndex - 1; i >= 0; i--) {
            if (!this.activatedOptions[i]) {
                this.activatedOptions[i] = this.activatedOptions[i + 1].parent;
            }
        }
    }
    dropBehindActivatedOptions(lastReserveIndex) {
        this.activatedOptions = this.activatedOptions.splice(0, lastReserveIndex + 1);
    }
    dropBehindColumns(lastReserveIndex) {
        if (lastReserveIndex < this.columns.length - 1) {
            this.columns = this.columns.slice(0, lastReserveIndex + 1);
        }
    }
    /**
     * Load children of an option asynchronously.
     */
    loadChildren(option, columnIndex, success, failure) {
        const loadFn = this.cascaderComponent.nzLoadData;
        if (loadFn) {
            // If there isn't any option in columns.
            this.$loading.next(columnIndex < 0);
            if (typeof option === 'object') {
                option.loading = true;
            }
            loadFn(option, columnIndex).then(() => {
                option.loading = false;
                if (option.children) {
                    this.setColumnData(option.children, columnIndex + 1, option);
                }
                if (success) {
                    success();
                }
                this.$loading.next(false);
                this.$redraw.next();
            }, () => {
                option.loading = false;
                option.isLeaf = true;
                if (failure) {
                    failure();
                }
                this.$redraw.next();
            });
        }
    }
    isLoaded(index) {
        return this.columns[index] && this.columns[index].length > 0;
    }
    /**
     * Find a option that has a given value in a given column.
     */
    findOptionWithValue(columnIndex, value) {
        const targetColumn = this.columns[columnIndex];
        if (targetColumn) {
            const v = typeof value === 'object' ? this.getOptionValue(value) : value;
            return targetColumn.find(o => v === this.getOptionValue(o));
        }
        return null;
    }
    prepareEmitValue() {
        this.values = this.selectedOptions.map(o => this.getOptionValue(o));
    }
}
NzCascaderService.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.1.2", ngImport: i0, type: NzCascaderService, deps: [], target: i0.ɵɵFactoryTarget.Injectable });
NzCascaderService.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "13.1.2", ngImport: i0, type: NzCascaderService });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.1.2", ngImport: i0, type: NzCascaderService, decorators: [{
            type: Injectable
        }] });

const NZ_CONFIG_MODULE_NAME = 'cascader';
const defaultDisplayRender = (labels) => labels.join(' / ');
class NzCascaderComponent {
    constructor(cascaderService, nzConfigService, ngZone, cdr, i18nService, elementRef, renderer, directionality, noAnimation) {
        this.cascaderService = cascaderService;
        this.nzConfigService = nzConfigService;
        this.ngZone = ngZone;
        this.cdr = cdr;
        this.i18nService = i18nService;
        this.directionality = directionality;
        this.noAnimation = noAnimation;
        this._nzModuleName = NZ_CONFIG_MODULE_NAME;
        this.nzOptionRender = null;
        this.nzShowInput = true;
        this.nzShowArrow = true;
        this.nzAllowClear = true;
        this.nzAutoFocus = false;
        this.nzChangeOnSelect = false;
        this.nzDisabled = false;
        this.nzExpandTrigger = 'click';
        this.nzValueProperty = 'value';
        this.nzLabelRender = null;
        this.nzLabelProperty = 'label';
        this.nzSize = 'default';
        this.nzBackdrop = false;
        this.nzShowSearch = false;
        this.nzPlaceHolder = '';
        this.nzMenuStyle = null;
        this.nzMouseEnterDelay = 150; // ms
        this.nzMouseLeaveDelay = 150; // ms
        this.nzTriggerAction = ['click'];
        // TODO: RTL
        this.nzSuffixIcon = 'down';
        this.nzExpandIcon = '';
        this.nzVisibleChange = new EventEmitter();
        this.nzSelectionChange = new EventEmitter();
        this.nzSelect = new EventEmitter();
        this.nzClear = new EventEmitter();
        /**
         * If the dropdown should show the empty content.
         * `true` if there's no options.
         */
        this.shouldShowEmpty = false;
        this.menuVisible = false;
        this.isLoading = false;
        this.labelRenderContext = {};
        this.onChange = Function.prototype;
        this.onTouched = Function.prototype;
        this.positions = [...DEFAULT_CASCADER_POSITIONS];
        this.dropdownHeightStyle = '';
        this.isFocused = false;
        this.dir = 'ltr';
        this.destroy$ = new Subject();
        this.inputString = '';
        this.isOpening = false;
        this.delayMenuTimer = null;
        this.delaySelectTimer = null;
        this.el = elementRef.nativeElement;
        this.cascaderService.withComponent(this);
        renderer.addClass(elementRef.nativeElement, 'ant-select');
        renderer.addClass(elementRef.nativeElement, 'ant-cascader');
    }
    get nzOptions() {
        return this.cascaderService.nzOptions;
    }
    set nzOptions(options) {
        this.cascaderService.withOptions(options);
    }
    get inSearchingMode() {
        return this.cascaderService.inSearchingMode;
    }
    set inputValue(inputValue) {
        this.inputString = inputValue;
        this.toggleSearchingMode(!!inputValue);
    }
    get inputValue() {
        return this.inputString;
    }
    get menuCls() {
        return { [`${this.nzMenuClassName}`]: !!this.nzMenuClassName };
    }
    get menuColumnCls() {
        return { [`${this.nzColumnClassName}`]: !!this.nzColumnClassName };
    }
    get hasInput() {
        return !!this.inputValue;
    }
    get hasValue() {
        return this.cascaderService.values && this.cascaderService.values.length > 0;
    }
    get showLabelRender() {
        return this.hasValue;
    }
    get showPlaceholder() {
        return !(this.hasInput || this.hasValue);
    }
    get clearIconVisible() {
        return this.nzAllowClear && !this.nzDisabled && (this.hasValue || this.hasInput);
    }
    get isLabelRenderTemplate() {
        return !!this.nzLabelRender;
    }
    ngOnInit() {
        const srv = this.cascaderService;
        srv.$redraw.pipe(takeUntil(this.destroy$)).subscribe(() => {
            // These operations would not mutate data.
            this.checkChildren();
            this.setDisplayLabel();
            this.reposition();
            this.setDropdownStyles();
            this.cdr.markForCheck();
        });
        srv.$loading.pipe(takeUntil(this.destroy$)).subscribe(loading => {
            this.isLoading = loading;
        });
        srv.$optionSelected.pipe(takeUntil(this.destroy$)).subscribe(data => {
            if (!data) {
                this.onChange([]);
                this.nzSelect.emit(null);
                this.nzSelectionChange.emit([]);
            }
            else {
                const { option, index } = data;
                const shouldClose = option.isLeaf || (this.nzChangeOnSelect && this.nzExpandTrigger === 'hover');
                if (shouldClose) {
                    this.delaySetMenuVisible(false);
                }
                this.onChange(this.cascaderService.values);
                this.nzSelectionChange.emit(this.cascaderService.selectedOptions);
                this.nzSelect.emit({ option, index });
                this.cdr.markForCheck();
            }
        });
        srv.$quitSearching.pipe(takeUntil(this.destroy$)).subscribe(() => {
            this.inputString = '';
            this.dropdownWidthStyle = '';
        });
        this.i18nService.localeChange.pipe(startWith(), takeUntil(this.destroy$)).subscribe(() => {
            this.setLocale();
        });
        this.nzConfigService
            .getConfigChangeEventForComponent(NZ_CONFIG_MODULE_NAME)
            .pipe(takeUntil(this.destroy$))
            .subscribe(() => {
            this.cdr.markForCheck();
        });
        this.dir = this.directionality.value;
        this.directionality.change.pipe(takeUntil(this.destroy$)).subscribe(() => {
            this.dir = this.directionality.value;
            srv.$redraw.next();
        });
        this.setupKeydownListener();
    }
    ngOnDestroy() {
        this.destroy$.next();
        this.destroy$.complete();
        this.clearDelayMenuTimer();
        this.clearDelaySelectTimer();
    }
    registerOnChange(fn) {
        this.onChange = fn;
    }
    registerOnTouched(fn) {
        this.onTouched = fn;
    }
    writeValue(value) {
        this.cascaderService.values = toArray(value);
        this.cascaderService.syncOptions(true);
    }
    delaySetMenuVisible(visible, delay = 100, setOpening = false) {
        this.clearDelayMenuTimer();
        if (delay) {
            if (visible && setOpening) {
                this.isOpening = true;
            }
            this.delayMenuTimer = setTimeout(() => {
                this.setMenuVisible(visible);
                this.cdr.detectChanges();
                this.clearDelayMenuTimer();
                if (visible) {
                    setTimeout(() => {
                        this.isOpening = false;
                    }, 100);
                }
            }, delay);
        }
        else {
            this.setMenuVisible(visible);
        }
    }
    setMenuVisible(visible) {
        if (this.nzDisabled || this.menuVisible === visible) {
            return;
        }
        if (visible) {
            this.cascaderService.syncOptions();
            this.scrollToActivatedOptions();
        }
        if (!visible) {
            this.inputValue = '';
        }
        this.menuVisible = visible;
        this.nzVisibleChange.emit(visible);
        this.cdr.detectChanges();
    }
    clearDelayMenuTimer() {
        if (this.delayMenuTimer) {
            clearTimeout(this.delayMenuTimer);
            this.delayMenuTimer = null;
        }
    }
    clearSelection(event) {
        if (event) {
            event.preventDefault();
            event.stopPropagation();
        }
        this.labelRenderText = '';
        this.labelRenderContext = {};
        this.inputValue = '';
        this.setMenuVisible(false);
        this.cascaderService.clear();
        this.nzClear.emit();
    }
    getSubmitValue() {
        return this.cascaderService.selectedOptions.map(o => this.cascaderService.getOptionValue(o));
    }
    focus() {
        if (!this.isFocused) {
            (this.input ? this.input.nativeElement : this.el).focus();
            this.isFocused = true;
        }
    }
    blur() {
        if (this.isFocused) {
            (this.input ? this.input.nativeElement : this.el).blur();
            this.isFocused = false;
        }
    }
    handleInputBlur() {
        this.menuVisible ? this.focus() : this.blur();
    }
    handleInputFocus() {
        this.focus();
    }
    onTriggerClick() {
        if (this.nzDisabled) {
            return;
        }
        if (this.nzShowSearch) {
            this.focus();
        }
        if (this.isActionTrigger('click')) {
            this.delaySetMenuVisible(!this.menuVisible, 100);
        }
        this.onTouched();
    }
    onTriggerMouseEnter() {
        if (this.nzDisabled || !this.isActionTrigger('hover')) {
            return;
        }
        this.delaySetMenuVisible(true, this.nzMouseEnterDelay, true);
    }
    onTriggerMouseLeave(event) {
        if (this.nzDisabled || !this.menuVisible || this.isOpening || !this.isActionTrigger('hover')) {
            event.preventDefault();
            return;
        }
        const mouseTarget = event.relatedTarget;
        const hostEl = this.el;
        const menuEl = this.menu && this.menu.nativeElement;
        if (hostEl.contains(mouseTarget) || (menuEl && menuEl.contains(mouseTarget))) {
            return;
        }
        this.delaySetMenuVisible(false, this.nzMouseLeaveDelay);
    }
    onOptionMouseEnter(option, columnIndex, event) {
        event.preventDefault();
        if (this.nzExpandTrigger === 'hover') {
            if (!option.isLeaf) {
                this.delaySetOptionActivated(option, columnIndex, false);
            }
            else {
                this.cascaderService.setOptionDeactivatedSinceColumn(columnIndex);
            }
        }
    }
    onOptionMouseLeave(option, _columnIndex, event) {
        event.preventDefault();
        if (this.nzExpandTrigger === 'hover' && !option.isLeaf) {
            this.clearDelaySelectTimer();
        }
    }
    onOptionClick(option, columnIndex, event) {
        if (event) {
            event.preventDefault();
        }
        if (option && option.disabled) {
            return;
        }
        this.el.focus();
        this.inSearchingMode
            ? this.cascaderService.setSearchOptionSelected(option)
            : this.cascaderService.setOptionActivated(option, columnIndex, true);
    }
    onClickOutside(event) {
        if (!this.el.contains(event.target)) {
            this.closeMenu();
        }
    }
    isActionTrigger(action) {
        return typeof this.nzTriggerAction === 'string'
            ? this.nzTriggerAction === action
            : this.nzTriggerAction.indexOf(action) !== -1;
    }
    onEnter() {
        const columnIndex = Math.max(this.cascaderService.activatedOptions.length - 1, 0);
        const option = this.cascaderService.activatedOptions[columnIndex];
        if (option && !option.disabled) {
            this.inSearchingMode
                ? this.cascaderService.setSearchOptionSelected(option)
                : this.cascaderService.setOptionActivated(option, columnIndex, true);
        }
    }
    moveUpOrDown(isUp) {
        const columnIndex = Math.max(this.cascaderService.activatedOptions.length - 1, 0);
        const activeOption = this.cascaderService.activatedOptions[columnIndex];
        const options = this.cascaderService.columns[columnIndex] || [];
        const length = options.length;
        let nextIndex = -1;
        if (!activeOption) {
            // Not selected options in this column
            nextIndex = isUp ? length : -1;
        }
        else {
            nextIndex = options.indexOf(activeOption);
        }
        while (true) {
            nextIndex = isUp ? nextIndex - 1 : nextIndex + 1;
            if (nextIndex < 0 || nextIndex >= length) {
                break;
            }
            const nextOption = options[nextIndex];
            if (!nextOption || nextOption.disabled) {
                continue;
            }
            this.cascaderService.setOptionActivated(nextOption, columnIndex);
            break;
        }
    }
    moveLeft() {
        const options = this.cascaderService.activatedOptions;
        if (options.length) {
            options.pop(); // Remove the last one
        }
    }
    moveRight() {
        const length = this.cascaderService.activatedOptions.length;
        const options = this.cascaderService.columns[length];
        if (options && options.length) {
            const nextOpt = options.find(o => !o.disabled);
            if (nextOpt) {
                this.cascaderService.setOptionActivated(nextOpt, length);
            }
        }
    }
    clearDelaySelectTimer() {
        if (this.delaySelectTimer) {
            clearTimeout(this.delaySelectTimer);
            this.delaySelectTimer = null;
        }
    }
    delaySetOptionActivated(option, columnIndex, performSelect) {
        this.clearDelaySelectTimer();
        this.delaySelectTimer = setTimeout(() => {
            this.cascaderService.setOptionActivated(option, columnIndex, performSelect);
            this.delaySelectTimer = null;
        }, 150);
    }
    toggleSearchingMode(toSearching) {
        if (this.inSearchingMode !== toSearching) {
            this.cascaderService.toggleSearchingMode(toSearching);
        }
        if (this.inSearchingMode) {
            this.cascaderService.prepareSearchOptions(this.inputValue);
        }
    }
    isOptionActivated(option, index) {
        const activeOpt = this.cascaderService.activatedOptions[index];
        return activeOpt === option;
    }
    setDisabledState(isDisabled) {
        if (isDisabled) {
            this.closeMenu();
        }
        this.nzDisabled = isDisabled;
    }
    closeMenu() {
        this.blur();
        this.clearDelayMenuTimer();
        this.setMenuVisible(false);
    }
    /**
     * Reposition the cascader panel. When a menu opens, the cascader expands
     * and may exceed the boundary of browser's window.
     */
    reposition() {
        if (this.overlay && this.overlay.overlayRef && this.menuVisible) {
            Promise.resolve().then(() => {
                this.overlay.overlayRef.updatePosition();
            });
        }
    }
    /**
     * When a cascader options is changed, a child needs to know that it should re-render.
     */
    checkChildren() {
        if (this.cascaderItems) {
            this.cascaderItems.forEach(item => item.markForCheck());
        }
    }
    setDisplayLabel() {
        const selectedOptions = this.cascaderService.selectedOptions;
        const labels = selectedOptions.map(o => this.cascaderService.getOptionLabel(o));
        if (this.isLabelRenderTemplate) {
            this.labelRenderContext = { labels, selectedOptions };
        }
        else {
            this.labelRenderText = defaultDisplayRender.call(this, labels);
        }
    }
    setDropdownStyles() {
        const firstColumn = this.cascaderService.columns[0];
        this.shouldShowEmpty =
            (this.inSearchingMode && (!firstColumn || !firstColumn.length)) || // Should show empty when there's no searching result
                (!(this.nzOptions && this.nzOptions.length) && !this.nzLoadData); // Should show when there's no options and developer does not use nzLoadData
        this.dropdownHeightStyle = this.shouldShowEmpty ? 'auto' : '';
        if (this.input) {
            this.dropdownWidthStyle =
                this.inSearchingMode || this.shouldShowEmpty ? `${this.selectContainer.nativeElement.offsetWidth}px` : '';
        }
    }
    setLocale() {
        this.locale = this.i18nService.getLocaleData('global');
        this.cdr.markForCheck();
    }
    scrollToActivatedOptions() {
        // The `scrollIntoView` is a native DOM API, which doesn't require Angular to run
        // a change detection when a promise microtask is resolved.
        this.ngZone.runOutsideAngular(() => {
            Promise.resolve().then(() => {
                // scroll only until option menu view is ready
                this.cascaderItems
                    .toArray()
                    .filter(e => e.activated)
                    .forEach(e => {
                    e.nativeElement.scrollIntoView({ block: 'start', inline: 'nearest' });
                });
            });
        });
    }
    setupKeydownListener() {
        this.ngZone.runOutsideAngular(() => {
            fromEvent(this.el, 'keydown')
                .pipe(takeUntil(this.destroy$))
                .subscribe(event => {
                const keyCode = event.keyCode;
                if (keyCode !== DOWN_ARROW &&
                    keyCode !== UP_ARROW &&
                    keyCode !== LEFT_ARROW &&
                    keyCode !== RIGHT_ARROW &&
                    keyCode !== ENTER &&
                    keyCode !== BACKSPACE &&
                    keyCode !== ESCAPE) {
                    return;
                }
                // Press any keys above to reopen menu.
                if (!this.menuVisible && keyCode !== BACKSPACE && keyCode !== ESCAPE) {
                    // The `setMenuVisible` runs `detectChanges()`, so we don't need to run `markForCheck()` additionally.
                    return this.ngZone.run(() => this.setMenuVisible(true));
                }
                // Make these keys work as default in searching mode.
                if (this.inSearchingMode && (keyCode === BACKSPACE || keyCode === LEFT_ARROW || keyCode === RIGHT_ARROW)) {
                    return;
                }
                if (!this.menuVisible) {
                    return;
                }
                event.preventDefault();
                this.ngZone.run(() => {
                    // Interact with the component.
                    if (keyCode === DOWN_ARROW) {
                        this.moveUpOrDown(false);
                    }
                    else if (keyCode === UP_ARROW) {
                        this.moveUpOrDown(true);
                    }
                    else if (keyCode === LEFT_ARROW) {
                        this.moveLeft();
                    }
                    else if (keyCode === RIGHT_ARROW) {
                        this.moveRight();
                    }
                    else if (keyCode === ENTER) {
                        this.onEnter();
                    }
                    // `@HostListener`s run `markForCheck()` internally before calling the actual handler so
                    // we call `markForCheck()` to be backwards-compatible.
                    this.cdr.markForCheck();
                });
            });
        });
    }
}
NzCascaderComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.1.2", ngImport: i0, type: NzCascaderComponent, deps: [{ token: NzCascaderService }, { token: i2$1.NzConfigService }, { token: i0.NgZone }, { token: i0.ChangeDetectorRef }, { token: i3$1.NzI18nService }, { token: i0.ElementRef }, { token: i0.Renderer2 }, { token: i4$1.Directionality, optional: true }, { token: i5.NzNoAnimationDirective, host: true, optional: true }], target: i0.ɵɵFactoryTarget.Component });
NzCascaderComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "13.1.2", type: NzCascaderComponent, selector: "nz-cascader, [nz-cascader]", inputs: { nzOptionRender: "nzOptionRender", nzShowInput: "nzShowInput", nzShowArrow: "nzShowArrow", nzAllowClear: "nzAllowClear", nzAutoFocus: "nzAutoFocus", nzChangeOnSelect: "nzChangeOnSelect", nzDisabled: "nzDisabled", nzColumnClassName: "nzColumnClassName", nzExpandTrigger: "nzExpandTrigger", nzValueProperty: "nzValueProperty", nzLabelRender: "nzLabelRender", nzLabelProperty: "nzLabelProperty", nzNotFoundContent: "nzNotFoundContent", nzSize: "nzSize", nzBackdrop: "nzBackdrop", nzShowSearch: "nzShowSearch", nzPlaceHolder: "nzPlaceHolder", nzMenuClassName: "nzMenuClassName", nzMenuStyle: "nzMenuStyle", nzMouseEnterDelay: "nzMouseEnterDelay", nzMouseLeaveDelay: "nzMouseLeaveDelay", nzTriggerAction: "nzTriggerAction", nzChangeOn: "nzChangeOn", nzLoadData: "nzLoadData", nzSuffixIcon: "nzSuffixIcon", nzExpandIcon: "nzExpandIcon", nzOptions: "nzOptions" }, outputs: { nzVisibleChange: "nzVisibleChange", nzSelectionChange: "nzSelectionChange", nzSelect: "nzSelect", nzClear: "nzClear" }, host: { listeners: { "click": "onTriggerClick()", "mouseenter": "onTriggerMouseEnter()", "mouseleave": "onTriggerMouseLeave($event)" }, properties: { "attr.tabIndex": "\"0\"", "class.ant-select-lg": "nzSize === \"large\"", "class.ant-select-sm": "nzSize === \"small\"", "class.ant-select-allow-clear": "nzAllowClear", "class.ant-select-show-arrow": "nzShowArrow", "class.ant-select-show-search": "!!nzShowSearch", "class.ant-select-disabled": "nzDisabled", "class.ant-select-open": "menuVisible", "class.ant-select-focused": "isFocused", "class.ant-select-single": "true", "class.ant-select-rtl": "dir ==='rtl'" } }, providers: [
        {
            provide: NG_VALUE_ACCESSOR,
            useExisting: forwardRef(() => NzCascaderComponent),
            multi: true
        },
        NzCascaderService
    ], viewQueries: [{ propertyName: "selectContainer", first: true, predicate: ["selectContainer"], descendants: true }, { propertyName: "input", first: true, predicate: ["input"], descendants: true }, { propertyName: "menu", first: true, predicate: ["menu"], descendants: true }, { propertyName: "overlay", first: true, predicate: CdkConnectedOverlay, descendants: true }, { propertyName: "cascaderItems", predicate: NzCascaderOptionComponent, descendants: true }], exportAs: ["nzCascader"], ngImport: i0, template: `
    <div cdkOverlayOrigin #origin="cdkOverlayOrigin" #trigger>
      <ng-container *ngIf="nzShowInput">
        <div #selectContainer class="ant-select-selector">
          <span class="ant-select-selection-search">
            <input
              #input
              type="search"
              class="ant-select-selection-search-input"
              [style.opacity]="nzShowSearch ? '' : '0'"
              [attr.autoComplete]="'off'"
              [attr.expanded]="menuVisible"
              [attr.autofocus]="nzAutoFocus ? 'autofocus' : null"
              [readonly]="!nzShowSearch"
              [disabled]="nzDisabled"
              [(ngModel)]="inputValue"
              (blur)="handleInputBlur()"
              (focus)="handleInputFocus()"
              (change)="$event.stopPropagation()"
            />
          </span>
          <span *ngIf="showLabelRender" class="ant-select-selection-item" [title]="labelRenderText">
            <ng-container *ngIf="!isLabelRenderTemplate; else labelTemplate">{{ labelRenderText }}</ng-container>
            <ng-template #labelTemplate>
              <ng-template
                [ngTemplateOutlet]="nzLabelRender"
                [ngTemplateOutletContext]="labelRenderContext"
              ></ng-template>
            </ng-template>
          </span>
          <span
            *ngIf="!showLabelRender"
            class="ant-select-selection-placeholder"
            [style.visibility]="!inputValue ? 'visible' : 'hidden'"
            >{{ showPlaceholder ? nzPlaceHolder || locale?.placeholder : null }}</span
          >
        </div>
        <span class="ant-select-arrow" [class.ant-select-arrow-loading]="isLoading" *ngIf="nzShowArrow">
          <i
            *ngIf="!isLoading"
            nz-icon
            [nzType]="$any(nzSuffixIcon)"
            [class.ant-cascader-picker-arrow-expand]="menuVisible"
          ></i>
          <i *ngIf="isLoading" nz-icon nzType="loading"></i>
        </span>
        <span class="ant-select-clear" *ngIf="clearIconVisible">
          <i nz-icon nzType="close-circle" nzTheme="fill" (click)="clearSelection($event)"></i>
        </span>
      </ng-container>
      <ng-content></ng-content>
    </div>
    <ng-template
      cdkConnectedOverlay
      nzConnectedOverlay
      [cdkConnectedOverlayHasBackdrop]="nzBackdrop"
      [cdkConnectedOverlayOrigin]="origin"
      [cdkConnectedOverlayPositions]="positions"
      [cdkConnectedOverlayTransformOriginOn]="'.ant-cascader-dropdown'"
      [cdkConnectedOverlayOpen]="menuVisible"
      (overlayOutsideClick)="onClickOutside($event)"
      (detach)="closeMenu()"
    >
      <div
        class="ant-select-dropdown ant-cascader-dropdown ant-select-dropdown-placement-bottomLeft"
        [class.ant-cascader-dropdown-rtl]="dir === 'rtl'"
        [@slideMotion]="'enter'"
        [@.disabled]="noAnimation?.nzNoAnimation"
        [nzNoAnimation]="noAnimation?.nzNoAnimation"
        (mouseleave)="onTriggerMouseLeave($event)"
      >
        <div
          #menu
          class="ant-cascader-menus"
          [class.ant-cascader-rtl]="dir === 'rtl'"
          [class.ant-cascader-menus-hidden]="!menuVisible"
          [class.ant-cascader-menu-empty]="shouldShowEmpty"
          [ngClass]="menuCls"
          [ngStyle]="nzMenuStyle"
        >
          <ul
            *ngIf="shouldShowEmpty; else hasOptionsTemplate"
            class="ant-cascader-menu"
            [style.width]="dropdownWidthStyle"
            [style.height]="dropdownHeightStyle"
          >
            <li class="ant-cascader-menu-item ant-cascader-menu-item-disabled">
              <nz-embed-empty
                class="ant-cascader-menu-item-content"
                [nzComponentName]="'cascader'"
                [specificContent]="nzNotFoundContent"
              ></nz-embed-empty>
            </li>
          </ul>
          <ng-template #hasOptionsTemplate>
            <ul
              *ngFor="let options of cascaderService.columns; let i = index"
              class="ant-cascader-menu"
              role="menuitemcheckbox"
              [ngClass]="menuColumnCls"
              [style.height]="dropdownHeightStyle"
              [style.width]="dropdownWidthStyle"
            >
              <li
                nz-cascader-option
                *ngFor="let option of options"
                [expandIcon]="nzExpandIcon"
                [columnIndex]="i"
                [nzLabelProperty]="nzLabelProperty"
                [optionTemplate]="nzOptionRender"
                [activated]="isOptionActivated(option, i)"
                [highlightText]="inSearchingMode ? inputValue : ''"
                [option]="option"
                [dir]="dir"
                (mouseenter)="onOptionMouseEnter(option, i, $event)"
                (mouseleave)="onOptionMouseLeave(option, i, $event)"
                (click)="onOptionClick(option, i, $event)"
              ></li>
            </ul>
          </ng-template>
        </div>
      </div>
    </ng-template>
  `, isInline: true, components: [{ type: i6.NzEmbedEmptyComponent, selector: "nz-embed-empty", inputs: ["nzComponentName", "specificContent"], exportAs: ["nzEmbedEmpty"] }, { type: NzCascaderOptionComponent, selector: "[nz-cascader-option]", inputs: ["optionTemplate", "option", "activated", "highlightText", "nzLabelProperty", "columnIndex", "expandIcon", "dir"], exportAs: ["nzCascaderOption"] }], directives: [{ type: i8.CdkOverlayOrigin, selector: "[cdk-overlay-origin], [overlay-origin], [cdkOverlayOrigin]", exportAs: ["cdkOverlayOrigin"] }, { type: i9.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { type: i10.DefaultValueAccessor, selector: "input:not([type=checkbox])[formControlName],textarea[formControlName],input:not([type=checkbox])[formControl],textarea[formControl],input:not([type=checkbox])[ngModel],textarea[ngModel],[ngDefaultControl]" }, { type: i10.NgControlStatus, selector: "[formControlName],[ngModel],[formControl]" }, { type: i10.NgModel, selector: "[ngModel]:not([formControlName]):not([formControl])", inputs: ["name", "disabled", "ngModel", "ngModelOptions"], outputs: ["ngModelChange"], exportAs: ["ngModel"] }, { type: i9.NgTemplateOutlet, selector: "[ngTemplateOutlet]", inputs: ["ngTemplateOutletContext", "ngTemplateOutlet"] }, { type: i2.NzIconDirective, selector: "[nz-icon]", inputs: ["nzSpin", "nzRotate", "nzType", "nzTheme", "nzTwotoneColor", "nzIconfont"], exportAs: ["nzIcon"] }, { type: i8.CdkConnectedOverlay, selector: "[cdk-connected-overlay], [connected-overlay], [cdkConnectedOverlay]", inputs: ["cdkConnectedOverlayOrigin", "cdkConnectedOverlayPositions", "cdkConnectedOverlayPositionStrategy", "cdkConnectedOverlayOffsetX", "cdkConnectedOverlayOffsetY", "cdkConnectedOverlayWidth", "cdkConnectedOverlayHeight", "cdkConnectedOverlayMinWidth", "cdkConnectedOverlayMinHeight", "cdkConnectedOverlayBackdropClass", "cdkConnectedOverlayPanelClass", "cdkConnectedOverlayViewportMargin", "cdkConnectedOverlayScrollStrategy", "cdkConnectedOverlayOpen", "cdkConnectedOverlayDisableClose", "cdkConnectedOverlayTransformOriginOn", "cdkConnectedOverlayHasBackdrop", "cdkConnectedOverlayLockPosition", "cdkConnectedOverlayFlexibleDimensions", "cdkConnectedOverlayGrowAfterOpen", "cdkConnectedOverlayPush"], outputs: ["backdropClick", "positionChange", "attach", "detach", "overlayKeydown", "overlayOutsideClick"], exportAs: ["cdkConnectedOverlay"] }, { type: i12.NzConnectedOverlayDirective, selector: "[cdkConnectedOverlay][nzConnectedOverlay]", inputs: ["nzArrowPointAtCenter"], exportAs: ["nzConnectedOverlay"] }, { type: i5.NzNoAnimationDirective, selector: "[nzNoAnimation]", inputs: ["nzNoAnimation"], exportAs: ["nzNoAnimation"] }, { type: i9.NgClass, selector: "[ngClass]", inputs: ["class", "ngClass"] }, { type: i9.NgStyle, selector: "[ngStyle]", inputs: ["ngStyle"] }, { type: i9.NgForOf, selector: "[ngFor][ngForOf]", inputs: ["ngForOf", "ngForTrackBy", "ngForTemplate"] }, { type: i4$1.Dir, selector: "[dir]", inputs: ["dir"], outputs: ["dirChange"], exportAs: ["dir"] }], animations: [slideMotion], changeDetection: i0.ChangeDetectionStrategy.OnPush, encapsulation: i0.ViewEncapsulation.None });
__decorate([
    InputBoolean()
], NzCascaderComponent.prototype, "nzShowInput", void 0);
__decorate([
    InputBoolean()
], NzCascaderComponent.prototype, "nzShowArrow", void 0);
__decorate([
    InputBoolean()
], NzCascaderComponent.prototype, "nzAllowClear", void 0);
__decorate([
    InputBoolean()
], NzCascaderComponent.prototype, "nzAutoFocus", void 0);
__decorate([
    InputBoolean()
], NzCascaderComponent.prototype, "nzChangeOnSelect", void 0);
__decorate([
    InputBoolean()
], NzCascaderComponent.prototype, "nzDisabled", void 0);
__decorate([
    WithConfig()
], NzCascaderComponent.prototype, "nzSize", void 0);
__decorate([
    WithConfig()
], NzCascaderComponent.prototype, "nzBackdrop", void 0);
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.1.2", ngImport: i0, type: NzCascaderComponent, decorators: [{
            type: Component,
            args: [{
                    changeDetection: ChangeDetectionStrategy.OnPush,
                    encapsulation: ViewEncapsulation.None,
                    selector: 'nz-cascader, [nz-cascader]',
                    exportAs: 'nzCascader',
                    preserveWhitespaces: false,
                    template: `
    <div cdkOverlayOrigin #origin="cdkOverlayOrigin" #trigger>
      <ng-container *ngIf="nzShowInput">
        <div #selectContainer class="ant-select-selector">
          <span class="ant-select-selection-search">
            <input
              #input
              type="search"
              class="ant-select-selection-search-input"
              [style.opacity]="nzShowSearch ? '' : '0'"
              [attr.autoComplete]="'off'"
              [attr.expanded]="menuVisible"
              [attr.autofocus]="nzAutoFocus ? 'autofocus' : null"
              [readonly]="!nzShowSearch"
              [disabled]="nzDisabled"
              [(ngModel)]="inputValue"
              (blur)="handleInputBlur()"
              (focus)="handleInputFocus()"
              (change)="$event.stopPropagation()"
            />
          </span>
          <span *ngIf="showLabelRender" class="ant-select-selection-item" [title]="labelRenderText">
            <ng-container *ngIf="!isLabelRenderTemplate; else labelTemplate">{{ labelRenderText }}</ng-container>
            <ng-template #labelTemplate>
              <ng-template
                [ngTemplateOutlet]="nzLabelRender"
                [ngTemplateOutletContext]="labelRenderContext"
              ></ng-template>
            </ng-template>
          </span>
          <span
            *ngIf="!showLabelRender"
            class="ant-select-selection-placeholder"
            [style.visibility]="!inputValue ? 'visible' : 'hidden'"
            >{{ showPlaceholder ? nzPlaceHolder || locale?.placeholder : null }}</span
          >
        </div>
        <span class="ant-select-arrow" [class.ant-select-arrow-loading]="isLoading" *ngIf="nzShowArrow">
          <i
            *ngIf="!isLoading"
            nz-icon
            [nzType]="$any(nzSuffixIcon)"
            [class.ant-cascader-picker-arrow-expand]="menuVisible"
          ></i>
          <i *ngIf="isLoading" nz-icon nzType="loading"></i>
        </span>
        <span class="ant-select-clear" *ngIf="clearIconVisible">
          <i nz-icon nzType="close-circle" nzTheme="fill" (click)="clearSelection($event)"></i>
        </span>
      </ng-container>
      <ng-content></ng-content>
    </div>
    <ng-template
      cdkConnectedOverlay
      nzConnectedOverlay
      [cdkConnectedOverlayHasBackdrop]="nzBackdrop"
      [cdkConnectedOverlayOrigin]="origin"
      [cdkConnectedOverlayPositions]="positions"
      [cdkConnectedOverlayTransformOriginOn]="'.ant-cascader-dropdown'"
      [cdkConnectedOverlayOpen]="menuVisible"
      (overlayOutsideClick)="onClickOutside($event)"
      (detach)="closeMenu()"
    >
      <div
        class="ant-select-dropdown ant-cascader-dropdown ant-select-dropdown-placement-bottomLeft"
        [class.ant-cascader-dropdown-rtl]="dir === 'rtl'"
        [@slideMotion]="'enter'"
        [@.disabled]="noAnimation?.nzNoAnimation"
        [nzNoAnimation]="noAnimation?.nzNoAnimation"
        (mouseleave)="onTriggerMouseLeave($event)"
      >
        <div
          #menu
          class="ant-cascader-menus"
          [class.ant-cascader-rtl]="dir === 'rtl'"
          [class.ant-cascader-menus-hidden]="!menuVisible"
          [class.ant-cascader-menu-empty]="shouldShowEmpty"
          [ngClass]="menuCls"
          [ngStyle]="nzMenuStyle"
        >
          <ul
            *ngIf="shouldShowEmpty; else hasOptionsTemplate"
            class="ant-cascader-menu"
            [style.width]="dropdownWidthStyle"
            [style.height]="dropdownHeightStyle"
          >
            <li class="ant-cascader-menu-item ant-cascader-menu-item-disabled">
              <nz-embed-empty
                class="ant-cascader-menu-item-content"
                [nzComponentName]="'cascader'"
                [specificContent]="nzNotFoundContent"
              ></nz-embed-empty>
            </li>
          </ul>
          <ng-template #hasOptionsTemplate>
            <ul
              *ngFor="let options of cascaderService.columns; let i = index"
              class="ant-cascader-menu"
              role="menuitemcheckbox"
              [ngClass]="menuColumnCls"
              [style.height]="dropdownHeightStyle"
              [style.width]="dropdownWidthStyle"
            >
              <li
                nz-cascader-option
                *ngFor="let option of options"
                [expandIcon]="nzExpandIcon"
                [columnIndex]="i"
                [nzLabelProperty]="nzLabelProperty"
                [optionTemplate]="nzOptionRender"
                [activated]="isOptionActivated(option, i)"
                [highlightText]="inSearchingMode ? inputValue : ''"
                [option]="option"
                [dir]="dir"
                (mouseenter)="onOptionMouseEnter(option, i, $event)"
                (mouseleave)="onOptionMouseLeave(option, i, $event)"
                (click)="onOptionClick(option, i, $event)"
              ></li>
            </ul>
          </ng-template>
        </div>
      </div>
    </ng-template>
  `,
                    animations: [slideMotion],
                    providers: [
                        {
                            provide: NG_VALUE_ACCESSOR,
                            useExisting: forwardRef(() => NzCascaderComponent),
                            multi: true
                        },
                        NzCascaderService
                    ],
                    host: {
                        '[attr.tabIndex]': '"0"',
                        '[class.ant-select-lg]': 'nzSize === "large"',
                        '[class.ant-select-sm]': 'nzSize === "small"',
                        '[class.ant-select-allow-clear]': 'nzAllowClear',
                        '[class.ant-select-show-arrow]': 'nzShowArrow',
                        '[class.ant-select-show-search]': '!!nzShowSearch',
                        '[class.ant-select-disabled]': 'nzDisabled',
                        '[class.ant-select-open]': 'menuVisible',
                        '[class.ant-select-focused]': 'isFocused',
                        '[class.ant-select-single]': 'true',
                        '[class.ant-select-rtl]': `dir ==='rtl'`
                    }
                }]
        }], ctorParameters: function () {
        return [{ type: NzCascaderService }, { type: i2$1.NzConfigService }, { type: i0.NgZone }, { type: i0.ChangeDetectorRef }, { type: i3$1.NzI18nService }, { type: i0.ElementRef }, { type: i0.Renderer2 }, { type: i4$1.Directionality, decorators: [{
                        type: Optional
                    }] }, { type: i5.NzNoAnimationDirective, decorators: [{
                        type: Host
                    }, {
                        type: Optional
                    }] }];
    }, propDecorators: { selectContainer: [{
                type: ViewChild,
                args: ['selectContainer', { static: false }]
            }], input: [{
                type: ViewChild,
                args: ['input', { static: false }]
            }], menu: [{
                type: ViewChild,
                args: ['menu', { static: false }]
            }], overlay: [{
                type: ViewChild,
                args: [CdkConnectedOverlay, { static: false }]
            }], cascaderItems: [{
                type: ViewChildren,
                args: [NzCascaderOptionComponent]
            }], nzOptionRender: [{
                type: Input
            }], nzShowInput: [{
                type: Input
            }], nzShowArrow: [{
                type: Input
            }], nzAllowClear: [{
                type: Input
            }], nzAutoFocus: [{
                type: Input
            }], nzChangeOnSelect: [{
                type: Input
            }], nzDisabled: [{
                type: Input
            }], nzColumnClassName: [{
                type: Input
            }], nzExpandTrigger: [{
                type: Input
            }], nzValueProperty: [{
                type: Input
            }], nzLabelRender: [{
                type: Input
            }], nzLabelProperty: [{
                type: Input
            }], nzNotFoundContent: [{
                type: Input
            }], nzSize: [{
                type: Input
            }], nzBackdrop: [{
                type: Input
            }], nzShowSearch: [{
                type: Input
            }], nzPlaceHolder: [{
                type: Input
            }], nzMenuClassName: [{
                type: Input
            }], nzMenuStyle: [{
                type: Input
            }], nzMouseEnterDelay: [{
                type: Input
            }], nzMouseLeaveDelay: [{
                type: Input
            }], nzTriggerAction: [{
                type: Input
            }], nzChangeOn: [{
                type: Input
            }], nzLoadData: [{
                type: Input
            }], nzSuffixIcon: [{
                type: Input
            }], nzExpandIcon: [{
                type: Input
            }], nzOptions: [{
                type: Input
            }], nzVisibleChange: [{
                type: Output
            }], nzSelectionChange: [{
                type: Output
            }], nzSelect: [{
                type: Output
            }], nzClear: [{
                type: Output
            }], onTriggerClick: [{
                type: HostListener,
                args: ['click']
            }], onTriggerMouseEnter: [{
                type: HostListener,
                args: ['mouseenter']
            }], onTriggerMouseLeave: [{
                type: HostListener,
                args: ['mouseleave', ['$event']]
            }] } });

/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */
class NzCascaderModule {
}
NzCascaderModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.1.2", ngImport: i0, type: NzCascaderModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
NzCascaderModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "12.0.0", version: "13.1.2", ngImport: i0, type: NzCascaderModule, declarations: [NzCascaderComponent, NzCascaderOptionComponent], imports: [BidiModule,
        CommonModule,
        FormsModule,
        OverlayModule,
        NzOutletModule,
        NzEmptyModule,
        NzHighlightModule,
        NzIconModule,
        NzInputModule,
        NzNoAnimationModule,
        NzOverlayModule], exports: [NzCascaderComponent] });
NzCascaderModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "13.1.2", ngImport: i0, type: NzCascaderModule, imports: [[
            BidiModule,
            CommonModule,
            FormsModule,
            OverlayModule,
            NzOutletModule,
            NzEmptyModule,
            NzHighlightModule,
            NzIconModule,
            NzInputModule,
            NzNoAnimationModule,
            NzOverlayModule
        ]] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.1.2", ngImport: i0, type: NzCascaderModule, decorators: [{
            type: NgModule,
            args: [{
                    imports: [
                        BidiModule,
                        CommonModule,
                        FormsModule,
                        OverlayModule,
                        NzOutletModule,
                        NzEmptyModule,
                        NzHighlightModule,
                        NzIconModule,
                        NzInputModule,
                        NzNoAnimationModule,
                        NzOverlayModule
                    ],
                    declarations: [NzCascaderComponent, NzCascaderOptionComponent],
                    exports: [NzCascaderComponent]
                }]
        }] });

/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */

/**
 * Generated bundle index. Do not edit.
 */

export { NzCascaderComponent, NzCascaderModule, NzCascaderOptionComponent, NzCascaderService, isChildOption, isParentOption, isShowSearchObject };
//# sourceMappingURL=ng-zorro-antd-cascader.mjs.map
