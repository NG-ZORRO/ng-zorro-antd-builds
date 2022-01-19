import { __decorate } from "tslib";
import { DOWN_ARROW, ENTER, ESCAPE, SPACE, TAB, UP_ARROW } from '@angular/cdk/keycodes';
import { CdkConnectedOverlay, CdkOverlayOrigin } from '@angular/cdk/overlay';
import { ChangeDetectionStrategy, Component, ContentChildren, ElementRef, EventEmitter, forwardRef, Host, Input, Optional, Output, TemplateRef, ViewChild, ViewEncapsulation } from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
import { BehaviorSubject, combineLatest, merge } from 'rxjs';
import { startWith, switchMap, takeUntil } from 'rxjs/operators';
import { slideMotion } from 'ng-zorro-antd/core/animation';
import { WithConfig } from 'ng-zorro-antd/core/config';
import { cancelRequestAnimationFrame, reqAnimFrame } from 'ng-zorro-antd/core/polyfill';
import { NzDestroyService } from 'ng-zorro-antd/core/services';
import { InputBoolean, isNotNil } from 'ng-zorro-antd/core/util';
import { NzOptionGroupComponent } from './option-group.component';
import { NzOptionComponent } from './option.component';
import { NzSelectTopControlComponent } from './select-top-control.component';
import * as i0 from "@angular/core";
import * as i1 from "ng-zorro-antd/core/services";
import * as i2 from "ng-zorro-antd/core/config";
import * as i3 from "@angular/cdk/platform";
import * as i4 from "@angular/cdk/a11y";
import * as i5 from "@angular/cdk/bidi";
import * as i6 from "ng-zorro-antd/core/no-animation";
import * as i7 from "./select-top-control.component";
import * as i8 from "./select-arrow.component";
import * as i9 from "./select-clear.component";
import * as i10 from "./option-container.component";
import * as i11 from "ng-zorro-antd/core/transition-patch";
import * as i12 from "@angular/cdk/overlay";
import * as i13 from "@angular/common";
import * as i14 from "ng-zorro-antd/core/overlay";
const defaultFilterOption = (searchValue, item) => {
    if (item && item.nzLabel) {
        return item.nzLabel.toString().toLowerCase().indexOf(searchValue.toLowerCase()) > -1;
    }
    else {
        return false;
    }
};
const NZ_CONFIG_MODULE_NAME = 'select';
export class NzSelectComponent {
    constructor(destroy$, nzConfigService, cdr, elementRef, platform, focusMonitor, directionality, noAnimation) {
        this.destroy$ = destroy$;
        this.nzConfigService = nzConfigService;
        this.cdr = cdr;
        this.elementRef = elementRef;
        this.platform = platform;
        this.focusMonitor = focusMonitor;
        this.directionality = directionality;
        this.noAnimation = noAnimation;
        this._nzModuleName = NZ_CONFIG_MODULE_NAME;
        this.nzId = null;
        this.nzSize = 'default';
        this.nzOptionHeightPx = 32;
        this.nzOptionOverflowSize = 8;
        this.nzDropdownClassName = null;
        this.nzDropdownMatchSelectWidth = true;
        this.nzDropdownStyle = null;
        this.nzNotFoundContent = undefined;
        this.nzPlaceHolder = null;
        this.nzMaxTagCount = Infinity;
        this.nzDropdownRender = null;
        this.nzCustomTemplate = null;
        this.nzSuffixIcon = null;
        this.nzClearIcon = null;
        this.nzRemoveIcon = null;
        this.nzMenuItemSelectedIcon = null;
        this.nzTokenSeparators = [];
        this.nzMaxTagPlaceholder = null;
        this.nzMaxMultipleCount = Infinity;
        this.nzMode = 'default';
        this.nzFilterOption = defaultFilterOption;
        this.compareWith = (o1, o2) => o1 === o2;
        this.nzAllowClear = false;
        this.nzBorderless = false;
        this.nzShowSearch = false;
        this.nzLoading = false;
        this.nzAutoFocus = false;
        this.nzAutoClearSearchValue = true;
        this.nzServerSearch = false;
        this.nzDisabled = false;
        this.nzOpen = false;
        this.nzBackdrop = false;
        this.nzOptions = [];
        this.nzOnSearch = new EventEmitter();
        this.nzScrollToBottom = new EventEmitter();
        this.nzOpenChange = new EventEmitter();
        this.nzBlur = new EventEmitter();
        this.nzFocus = new EventEmitter();
        this.listOfValue$ = new BehaviorSubject([]);
        this.listOfTemplateItem$ = new BehaviorSubject([]);
        this.listOfTagAndTemplateItem = [];
        this.searchValue = '';
        this.isReactiveDriven = false;
        this.requestId = -1;
        this.onChange = () => { };
        this.onTouched = () => { };
        this.dropDownPosition = 'bottom';
        this.triggerWidth = null;
        this.listOfContainerItem = [];
        this.listOfTopItem = [];
        this.activatedValue = null;
        this.listOfValue = [];
        this.focused = false;
        this.dir = 'ltr';
    }
    set nzShowArrow(value) {
        this._nzShowArrow = value;
    }
    get nzShowArrow() {
        return this._nzShowArrow === undefined ? this.nzMode === 'default' : this._nzShowArrow;
    }
    generateTagItem(value) {
        return {
            nzValue: value,
            nzLabel: value,
            type: 'item'
        };
    }
    onItemClick(value) {
        this.activatedValue = value;
        if (this.nzMode === 'default') {
            if (this.listOfValue.length === 0 || !this.compareWith(this.listOfValue[0], value)) {
                this.updateListOfValue([value]);
            }
            this.setOpenState(false);
        }
        else {
            const targetIndex = this.listOfValue.findIndex(o => this.compareWith(o, value));
            if (targetIndex !== -1) {
                const listOfValueAfterRemoved = this.listOfValue.filter((_, i) => i !== targetIndex);
                this.updateListOfValue(listOfValueAfterRemoved);
            }
            else if (this.listOfValue.length < this.nzMaxMultipleCount) {
                const listOfValueAfterAdded = [...this.listOfValue, value];
                this.updateListOfValue(listOfValueAfterAdded);
            }
            this.focus();
            if (this.nzAutoClearSearchValue) {
                this.clearInput();
            }
        }
    }
    onItemDelete(item) {
        const listOfSelectedValue = this.listOfValue.filter(v => !this.compareWith(v, item.nzValue));
        this.updateListOfValue(listOfSelectedValue);
        this.clearInput();
    }
    onHostClick() {
        if ((this.nzOpen && this.nzShowSearch) || this.nzDisabled) {
            return;
        }
        this.setOpenState(!this.nzOpen);
    }
    updateListOfContainerItem() {
        let listOfContainerItem = this.listOfTagAndTemplateItem
            .filter(item => !item.nzHide)
            .filter(item => {
            if (!this.nzServerSearch && this.searchValue) {
                return this.nzFilterOption(this.searchValue, item);
            }
            else {
                return true;
            }
        });
        if (this.nzMode === 'tags' && this.searchValue) {
            const matchedItem = this.listOfTagAndTemplateItem.find(item => item.nzLabel === this.searchValue);
            if (!matchedItem) {
                const tagItem = this.generateTagItem(this.searchValue);
                listOfContainerItem = [tagItem, ...listOfContainerItem];
                this.activatedValue = tagItem.nzValue;
            }
            else {
                this.activatedValue = matchedItem.nzValue;
            }
        }
        const activatedItem = listOfContainerItem.find(item => this.compareWith(item.nzValue, this.listOfValue[0])) || listOfContainerItem[0];
        this.activatedValue = (activatedItem && activatedItem.nzValue) || null;
        let listOfGroupLabel = [];
        if (this.isReactiveDriven) {
            listOfGroupLabel = [...new Set(this.nzOptions.filter(o => o.groupLabel).map(o => o.groupLabel))];
        }
        else {
            if (this.listOfNzOptionGroupComponent) {
                listOfGroupLabel = this.listOfNzOptionGroupComponent.map(o => o.nzLabel);
            }
        }
        /** insert group item **/
        listOfGroupLabel.forEach(label => {
            const index = listOfContainerItem.findIndex(item => label === item.groupLabel);
            if (index > -1) {
                const groupItem = { groupLabel: label, type: 'group', key: label };
                listOfContainerItem.splice(index, 0, groupItem);
            }
        });
        this.listOfContainerItem = [...listOfContainerItem];
        this.updateCdkConnectedOverlayPositions();
    }
    clearInput() {
        this.nzSelectTopControlComponent.clearInputValue();
    }
    updateListOfValue(listOfValue) {
        const covertListToModel = (list, mode) => {
            if (mode === 'default') {
                if (list.length > 0) {
                    return list[0];
                }
                else {
                    return null;
                }
            }
            else {
                return list;
            }
        };
        const model = covertListToModel(listOfValue, this.nzMode);
        if (this.value !== model) {
            this.listOfValue = listOfValue;
            this.listOfValue$.next(listOfValue);
            this.value = model;
            this.onChange(this.value);
        }
    }
    onTokenSeparate(listOfLabel) {
        const listOfMatchedValue = this.listOfTagAndTemplateItem
            .filter(item => listOfLabel.findIndex(label => label === item.nzLabel) !== -1)
            .map(item => item.nzValue)
            .filter(item => this.listOfValue.findIndex(v => this.compareWith(v, item)) === -1);
        if (this.nzMode === 'multiple') {
            this.updateListOfValue([...this.listOfValue, ...listOfMatchedValue]);
        }
        else if (this.nzMode === 'tags') {
            const listOfUnMatchedLabel = listOfLabel.filter(label => this.listOfTagAndTemplateItem.findIndex(item => item.nzLabel === label) === -1);
            this.updateListOfValue([...this.listOfValue, ...listOfMatchedValue, ...listOfUnMatchedLabel]);
        }
        this.clearInput();
    }
    onOverlayKeyDown(e) {
        if (e.keyCode === ESCAPE) {
            this.setOpenState(false);
        }
    }
    onKeyDown(e) {
        if (this.nzDisabled) {
            return;
        }
        const listOfFilteredOptionNotDisabled = this.listOfContainerItem
            .filter(item => item.type === 'item')
            .filter(item => !item.nzDisabled);
        const activatedIndex = listOfFilteredOptionNotDisabled.findIndex(item => this.compareWith(item.nzValue, this.activatedValue));
        switch (e.keyCode) {
            case UP_ARROW:
                e.preventDefault();
                if (this.nzOpen) {
                    const preIndex = activatedIndex > 0 ? activatedIndex - 1 : listOfFilteredOptionNotDisabled.length - 1;
                    this.activatedValue = listOfFilteredOptionNotDisabled[preIndex].nzValue;
                }
                break;
            case DOWN_ARROW:
                e.preventDefault();
                if (this.nzOpen) {
                    const nextIndex = activatedIndex < listOfFilteredOptionNotDisabled.length - 1 ? activatedIndex + 1 : 0;
                    this.activatedValue = listOfFilteredOptionNotDisabled[nextIndex].nzValue;
                }
                else {
                    this.setOpenState(true);
                }
                break;
            case ENTER:
                e.preventDefault();
                if (this.nzOpen) {
                    if (isNotNil(this.activatedValue)) {
                        this.onItemClick(this.activatedValue);
                    }
                }
                else {
                    this.setOpenState(true);
                }
                break;
            case SPACE:
                if (!this.nzOpen) {
                    this.setOpenState(true);
                    e.preventDefault();
                }
                break;
            case TAB:
                this.setOpenState(false);
                break;
            case ESCAPE:
                /**
                 * Skip the ESCAPE processing, it will be handled in {@link onOverlayKeyDown}.
                 */
                break;
            default:
                if (!this.nzOpen) {
                    this.setOpenState(true);
                }
        }
    }
    setOpenState(value) {
        if (this.nzOpen !== value) {
            this.nzOpen = value;
            this.nzOpenChange.emit(value);
            this.onOpenChange();
            this.cdr.markForCheck();
        }
    }
    onOpenChange() {
        this.updateCdkConnectedOverlayStatus();
        this.clearInput();
    }
    onInputValueChange(value) {
        this.searchValue = value;
        this.updateListOfContainerItem();
        this.nzOnSearch.emit(value);
        this.updateCdkConnectedOverlayPositions();
    }
    onClearSelection() {
        this.updateListOfValue([]);
    }
    onClickOutside(event) {
        if (!this.elementRef.nativeElement.contains(event.target)) {
            this.setOpenState(false);
        }
    }
    focus() {
        this.nzSelectTopControlComponent.focus();
    }
    blur() {
        this.nzSelectTopControlComponent.blur();
    }
    onPositionChange(position) {
        this.dropDownPosition = position.connectionPair.originY;
    }
    updateCdkConnectedOverlayStatus() {
        if (this.platform.isBrowser && this.originElement.nativeElement) {
            const triggerWidth = this.triggerWidth;
            cancelRequestAnimationFrame(this.requestId);
            this.requestId = reqAnimFrame(() => {
                // Blink triggers style and layout pipelines anytime the `getBoundingClientRect()` is called, which may cause a
                // frame drop. That's why it's scheduled through the `requestAnimationFrame` to unload the composite thread.
                this.triggerWidth = this.originElement.nativeElement.getBoundingClientRect().width;
                if (triggerWidth !== this.triggerWidth) {
                    // The `requestAnimationFrame` will trigger change detection, but we're inside an `OnPush` component which won't have
                    // the `ChecksEnabled` state. Calling `markForCheck()` will allow Angular to run the change detection from the root component
                    // down to the `nz-select`. But we'll trigger only local change detection if the `triggerWidth` has been changed.
                    this.cdr.detectChanges();
                }
            });
        }
    }
    updateCdkConnectedOverlayPositions() {
        reqAnimFrame(() => {
            this.cdkConnectedOverlay?.overlayRef?.updatePosition();
        });
    }
    writeValue(modelValue) {
        /** https://github.com/angular/angular/issues/14988 **/
        if (this.value !== modelValue) {
            this.value = modelValue;
            const covertModelToList = (model, mode) => {
                if (model === null || model === undefined) {
                    return [];
                }
                else if (mode === 'default') {
                    return [model];
                }
                else {
                    return model;
                }
            };
            const listOfValue = covertModelToList(modelValue, this.nzMode);
            this.listOfValue = listOfValue;
            this.listOfValue$.next(listOfValue);
            this.cdr.markForCheck();
        }
    }
    registerOnChange(fn) {
        this.onChange = fn;
    }
    registerOnTouched(fn) {
        this.onTouched = fn;
    }
    setDisabledState(disabled) {
        this.nzDisabled = disabled;
        if (disabled) {
            this.setOpenState(false);
        }
        this.cdr.markForCheck();
    }
    ngOnChanges(changes) {
        const { nzOpen, nzDisabled, nzOptions } = changes;
        if (nzOpen) {
            this.onOpenChange();
        }
        if (nzDisabled && this.nzDisabled) {
            this.setOpenState(false);
        }
        if (nzOptions) {
            this.isReactiveDriven = true;
            const listOfOptions = this.nzOptions || [];
            const listOfTransformedItem = listOfOptions.map(item => {
                return {
                    template: item.label instanceof TemplateRef ? item.label : null,
                    nzLabel: typeof item.label === 'string' || typeof item.label === 'number' ? item.label : null,
                    nzValue: item.value,
                    nzDisabled: item.disabled || false,
                    nzHide: item.hide || false,
                    nzCustomContent: item.label instanceof TemplateRef,
                    groupLabel: item.groupLabel || null,
                    type: 'item',
                    key: item.value
                };
            });
            this.listOfTemplateItem$.next(listOfTransformedItem);
        }
    }
    ngOnInit() {
        this.focusMonitor
            .monitor(this.elementRef, true)
            .pipe(takeUntil(this.destroy$))
            .subscribe(focusOrigin => {
            if (!focusOrigin) {
                this.focused = false;
                this.cdr.markForCheck();
                this.nzBlur.emit();
                Promise.resolve().then(() => {
                    this.onTouched();
                });
            }
            else {
                this.focused = true;
                this.cdr.markForCheck();
                this.nzFocus.emit();
            }
        });
        combineLatest([this.listOfValue$, this.listOfTemplateItem$])
            .pipe(takeUntil(this.destroy$))
            .subscribe(([listOfSelectedValue, listOfTemplateItem]) => {
            const listOfTagItem = listOfSelectedValue
                .filter(() => this.nzMode === 'tags')
                .filter(value => listOfTemplateItem.findIndex(o => this.compareWith(o.nzValue, value)) === -1)
                .map(value => this.listOfTopItem.find(o => this.compareWith(o.nzValue, value)) || this.generateTagItem(value));
            this.listOfTagAndTemplateItem = [...listOfTemplateItem, ...listOfTagItem];
            this.listOfTopItem = this.listOfValue
                .map(v => [...this.listOfTagAndTemplateItem, ...this.listOfTopItem].find(item => this.compareWith(v, item.nzValue)))
                .filter(item => !!item);
            this.updateListOfContainerItem();
        });
        this.directionality.change?.pipe(takeUntil(this.destroy$)).subscribe((direction) => {
            this.dir = direction;
            this.cdr.detectChanges();
        });
        this.nzConfigService
            .getConfigChangeEventForComponent('select')
            .pipe(takeUntil(this.destroy$))
            .subscribe(() => {
            this.cdr.markForCheck();
        });
        this.dir = this.directionality.value;
    }
    ngAfterContentInit() {
        if (!this.isReactiveDriven) {
            merge(this.listOfNzOptionGroupComponent.changes, this.listOfNzOptionComponent.changes)
                .pipe(startWith(true), switchMap(() => merge(...[
                this.listOfNzOptionComponent.changes,
                this.listOfNzOptionGroupComponent.changes,
                ...this.listOfNzOptionComponent.map(option => option.changes),
                ...this.listOfNzOptionGroupComponent.map(option => option.changes)
            ]).pipe(startWith(true))), takeUntil(this.destroy$))
                .subscribe(() => {
                const listOfOptionInterface = this.listOfNzOptionComponent.toArray().map(item => {
                    const { template, nzLabel, nzValue, nzDisabled, nzHide, nzCustomContent, groupLabel } = item;
                    return {
                        template,
                        nzLabel,
                        nzValue,
                        nzDisabled,
                        nzHide,
                        nzCustomContent,
                        groupLabel,
                        type: 'item',
                        key: nzValue
                    };
                });
                this.listOfTemplateItem$.next(listOfOptionInterface);
                this.cdr.markForCheck();
            });
        }
    }
    ngOnDestroy() {
        cancelRequestAnimationFrame(this.requestId);
        this.focusMonitor.stopMonitoring(this.elementRef);
    }
}
NzSelectComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.1.2", ngImport: i0, type: NzSelectComponent, deps: [{ token: i1.NzDestroyService }, { token: i2.NzConfigService }, { token: i0.ChangeDetectorRef }, { token: i0.ElementRef }, { token: i3.Platform }, { token: i4.FocusMonitor }, { token: i5.Directionality, optional: true }, { token: i6.NzNoAnimationDirective, host: true, optional: true }], target: i0.ɵɵFactoryTarget.Component });
NzSelectComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "13.1.2", type: NzSelectComponent, selector: "nz-select", inputs: { nzId: "nzId", nzSize: "nzSize", nzOptionHeightPx: "nzOptionHeightPx", nzOptionOverflowSize: "nzOptionOverflowSize", nzDropdownClassName: "nzDropdownClassName", nzDropdownMatchSelectWidth: "nzDropdownMatchSelectWidth", nzDropdownStyle: "nzDropdownStyle", nzNotFoundContent: "nzNotFoundContent", nzPlaceHolder: "nzPlaceHolder", nzMaxTagCount: "nzMaxTagCount", nzDropdownRender: "nzDropdownRender", nzCustomTemplate: "nzCustomTemplate", nzSuffixIcon: "nzSuffixIcon", nzClearIcon: "nzClearIcon", nzRemoveIcon: "nzRemoveIcon", nzMenuItemSelectedIcon: "nzMenuItemSelectedIcon", nzTokenSeparators: "nzTokenSeparators", nzMaxTagPlaceholder: "nzMaxTagPlaceholder", nzMaxMultipleCount: "nzMaxMultipleCount", nzMode: "nzMode", nzFilterOption: "nzFilterOption", compareWith: "compareWith", nzAllowClear: "nzAllowClear", nzBorderless: "nzBorderless", nzShowSearch: "nzShowSearch", nzLoading: "nzLoading", nzAutoFocus: "nzAutoFocus", nzAutoClearSearchValue: "nzAutoClearSearchValue", nzServerSearch: "nzServerSearch", nzDisabled: "nzDisabled", nzOpen: "nzOpen", nzBackdrop: "nzBackdrop", nzOptions: "nzOptions", nzShowArrow: "nzShowArrow" }, outputs: { nzOnSearch: "nzOnSearch", nzScrollToBottom: "nzScrollToBottom", nzOpenChange: "nzOpenChange", nzBlur: "nzBlur", nzFocus: "nzFocus" }, host: { listeners: { "click": "onHostClick()" }, properties: { "class.ant-select-lg": "nzSize === \"large\"", "class.ant-select-sm": "nzSize === \"small\"", "class.ant-select-show-arrow": "nzShowArrow", "class.ant-select-disabled": "nzDisabled", "class.ant-select-show-search": "(nzShowSearch || nzMode !== 'default') && !nzDisabled", "class.ant-select-allow-clear": "nzAllowClear", "class.ant-select-borderless": "nzBorderless", "class.ant-select-open": "nzOpen", "class.ant-select-focused": "nzOpen || focused", "class.ant-select-single": "nzMode === 'default'", "class.ant-select-multiple": "nzMode !== 'default'", "class.ant-select-rtl": "dir === 'rtl'" }, classAttribute: "ant-select" }, providers: [
        NzDestroyService,
        {
            provide: NG_VALUE_ACCESSOR,
            useExisting: forwardRef(() => NzSelectComponent),
            multi: true
        }
    ], queries: [{ propertyName: "listOfNzOptionComponent", predicate: NzOptionComponent, descendants: true }, { propertyName: "listOfNzOptionGroupComponent", predicate: NzOptionGroupComponent, descendants: true }], viewQueries: [{ propertyName: "originElement", first: true, predicate: CdkOverlayOrigin, descendants: true, read: ElementRef, static: true }, { propertyName: "cdkConnectedOverlay", first: true, predicate: CdkConnectedOverlay, descendants: true, static: true }, { propertyName: "nzSelectTopControlComponent", first: true, predicate: NzSelectTopControlComponent, descendants: true, static: true }, { propertyName: "nzOptionGroupComponentElement", first: true, predicate: NzOptionGroupComponent, descendants: true, read: ElementRef, static: true }, { propertyName: "nzSelectTopControlComponentElement", first: true, predicate: NzSelectTopControlComponent, descendants: true, read: ElementRef, static: true }], exportAs: ["nzSelect"], usesOnChanges: true, ngImport: i0, template: `
    <nz-select-top-control
      cdkOverlayOrigin
      #origin="cdkOverlayOrigin"
      [nzId]="nzId"
      [open]="nzOpen"
      [disabled]="nzDisabled"
      [mode]="nzMode"
      [@.disabled]="noAnimation?.nzNoAnimation"
      [nzNoAnimation]="noAnimation?.nzNoAnimation"
      [maxTagPlaceholder]="nzMaxTagPlaceholder"
      [removeIcon]="nzRemoveIcon"
      [placeHolder]="nzPlaceHolder"
      [maxTagCount]="nzMaxTagCount"
      [customTemplate]="nzCustomTemplate"
      [tokenSeparators]="nzTokenSeparators"
      [showSearch]="nzShowSearch"
      [autofocus]="nzAutoFocus"
      [listOfTopItem]="listOfTopItem"
      (inputValueChange)="onInputValueChange($event)"
      (tokenize)="onTokenSeparate($event)"
      (deleteItem)="onItemDelete($event)"
      (keydown)="onKeyDown($event)"
    ></nz-select-top-control>
    <nz-select-arrow
      *ngIf="nzShowArrow"
      [loading]="nzLoading"
      [search]="nzOpen && nzShowSearch"
      [suffixIcon]="nzSuffixIcon"
    ></nz-select-arrow>
    <nz-select-clear
      *ngIf="nzAllowClear && !nzDisabled && listOfValue.length"
      [clearIcon]="nzClearIcon"
      (clear)="onClearSelection()"
    ></nz-select-clear>
    <ng-template
      cdkConnectedOverlay
      nzConnectedOverlay
      [cdkConnectedOverlayHasBackdrop]="nzBackdrop"
      [cdkConnectedOverlayMinWidth]="$any(nzDropdownMatchSelectWidth ? null : triggerWidth)"
      [cdkConnectedOverlayWidth]="$any(nzDropdownMatchSelectWidth ? triggerWidth : null)"
      [cdkConnectedOverlayOrigin]="origin"
      [cdkConnectedOverlayTransformOriginOn]="'.ant-select-dropdown'"
      [cdkConnectedOverlayPanelClass]="nzDropdownClassName!"
      [cdkConnectedOverlayOpen]="nzOpen"
      (overlayKeydown)="onOverlayKeyDown($event)"
      (overlayOutsideClick)="onClickOutside($event)"
      (detach)="setOpenState(false)"
      (positionChange)="onPositionChange($event)"
    >
      <nz-option-container
        [ngStyle]="nzDropdownStyle"
        [itemSize]="nzOptionHeightPx"
        [maxItemLength]="nzOptionOverflowSize"
        [matchWidth]="nzDropdownMatchSelectWidth"
        [class.ant-select-dropdown-placement-bottomLeft]="dropDownPosition === 'bottom'"
        [class.ant-select-dropdown-placement-topLeft]="dropDownPosition === 'top'"
        [@slideMotion]="'enter'"
        [@.disabled]="noAnimation?.nzNoAnimation"
        [nzNoAnimation]="noAnimation?.nzNoAnimation"
        [listOfContainerItem]="listOfContainerItem"
        [menuItemSelectedIcon]="nzMenuItemSelectedIcon"
        [notFoundContent]="nzNotFoundContent"
        [activatedValue]="activatedValue"
        [listOfSelectedValue]="listOfValue"
        [dropdownRender]="nzDropdownRender"
        [compareWith]="compareWith"
        [mode]="nzMode"
        (keydown)="onKeyDown($event)"
        (itemClick)="onItemClick($event)"
        (scrollToBottom)="nzScrollToBottom.emit()"
      ></nz-option-container>
    </ng-template>
  `, isInline: true, components: [{ type: i7.NzSelectTopControlComponent, selector: "nz-select-top-control", inputs: ["nzId", "showSearch", "placeHolder", "open", "maxTagCount", "autofocus", "disabled", "mode", "customTemplate", "maxTagPlaceholder", "removeIcon", "listOfTopItem", "tokenSeparators"], outputs: ["tokenize", "inputValueChange", "deleteItem"], exportAs: ["nzSelectTopControl"] }, { type: i8.NzSelectArrowComponent, selector: "nz-select-arrow", inputs: ["loading", "search", "suffixIcon"] }, { type: i9.NzSelectClearComponent, selector: "nz-select-clear", inputs: ["clearIcon"], outputs: ["clear"] }, { type: i10.NzOptionContainerComponent, selector: "nz-option-container", inputs: ["notFoundContent", "menuItemSelectedIcon", "dropdownRender", "activatedValue", "listOfSelectedValue", "compareWith", "mode", "matchWidth", "itemSize", "maxItemLength", "listOfContainerItem"], outputs: ["itemClick", "scrollToBottom"], exportAs: ["nzOptionContainer"] }], directives: [{ type: i11.ɵNzTransitionPatchDirective, selector: "[nz-button], nz-button-group, [nz-icon], [nz-menu-item], [nz-submenu], nz-select-top-control, nz-select-placeholder, nz-input-group", inputs: ["hidden"] }, { type: i12.CdkOverlayOrigin, selector: "[cdk-overlay-origin], [overlay-origin], [cdkOverlayOrigin]", exportAs: ["cdkOverlayOrigin"] }, { type: i6.NzNoAnimationDirective, selector: "[nzNoAnimation]", inputs: ["nzNoAnimation"], exportAs: ["nzNoAnimation"] }, { type: i13.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { type: i12.CdkConnectedOverlay, selector: "[cdk-connected-overlay], [connected-overlay], [cdkConnectedOverlay]", inputs: ["cdkConnectedOverlayOrigin", "cdkConnectedOverlayPositions", "cdkConnectedOverlayPositionStrategy", "cdkConnectedOverlayOffsetX", "cdkConnectedOverlayOffsetY", "cdkConnectedOverlayWidth", "cdkConnectedOverlayHeight", "cdkConnectedOverlayMinWidth", "cdkConnectedOverlayMinHeight", "cdkConnectedOverlayBackdropClass", "cdkConnectedOverlayPanelClass", "cdkConnectedOverlayViewportMargin", "cdkConnectedOverlayScrollStrategy", "cdkConnectedOverlayOpen", "cdkConnectedOverlayDisableClose", "cdkConnectedOverlayTransformOriginOn", "cdkConnectedOverlayHasBackdrop", "cdkConnectedOverlayLockPosition", "cdkConnectedOverlayFlexibleDimensions", "cdkConnectedOverlayGrowAfterOpen", "cdkConnectedOverlayPush"], outputs: ["backdropClick", "positionChange", "attach", "detach", "overlayKeydown", "overlayOutsideClick"], exportAs: ["cdkConnectedOverlay"] }, { type: i14.NzConnectedOverlayDirective, selector: "[cdkConnectedOverlay][nzConnectedOverlay]", inputs: ["nzArrowPointAtCenter"], exportAs: ["nzConnectedOverlay"] }, { type: i13.NgStyle, selector: "[ngStyle]", inputs: ["ngStyle"] }], animations: [slideMotion], changeDetection: i0.ChangeDetectionStrategy.OnPush, encapsulation: i0.ViewEncapsulation.None });
__decorate([
    WithConfig()
], NzSelectComponent.prototype, "nzSuffixIcon", void 0);
__decorate([
    InputBoolean()
], NzSelectComponent.prototype, "nzAllowClear", void 0);
__decorate([
    WithConfig(),
    InputBoolean()
], NzSelectComponent.prototype, "nzBorderless", void 0);
__decorate([
    InputBoolean()
], NzSelectComponent.prototype, "nzShowSearch", void 0);
__decorate([
    InputBoolean()
], NzSelectComponent.prototype, "nzLoading", void 0);
__decorate([
    InputBoolean()
], NzSelectComponent.prototype, "nzAutoFocus", void 0);
__decorate([
    InputBoolean()
], NzSelectComponent.prototype, "nzAutoClearSearchValue", void 0);
__decorate([
    InputBoolean()
], NzSelectComponent.prototype, "nzServerSearch", void 0);
__decorate([
    InputBoolean()
], NzSelectComponent.prototype, "nzDisabled", void 0);
__decorate([
    InputBoolean()
], NzSelectComponent.prototype, "nzOpen", void 0);
__decorate([
    WithConfig(),
    InputBoolean()
], NzSelectComponent.prototype, "nzBackdrop", void 0);
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.1.2", ngImport: i0, type: NzSelectComponent, decorators: [{
            type: Component,
            args: [{
                    selector: 'nz-select',
                    exportAs: 'nzSelect',
                    preserveWhitespaces: false,
                    providers: [
                        NzDestroyService,
                        {
                            provide: NG_VALUE_ACCESSOR,
                            useExisting: forwardRef(() => NzSelectComponent),
                            multi: true
                        }
                    ],
                    changeDetection: ChangeDetectionStrategy.OnPush,
                    encapsulation: ViewEncapsulation.None,
                    animations: [slideMotion],
                    template: `
    <nz-select-top-control
      cdkOverlayOrigin
      #origin="cdkOverlayOrigin"
      [nzId]="nzId"
      [open]="nzOpen"
      [disabled]="nzDisabled"
      [mode]="nzMode"
      [@.disabled]="noAnimation?.nzNoAnimation"
      [nzNoAnimation]="noAnimation?.nzNoAnimation"
      [maxTagPlaceholder]="nzMaxTagPlaceholder"
      [removeIcon]="nzRemoveIcon"
      [placeHolder]="nzPlaceHolder"
      [maxTagCount]="nzMaxTagCount"
      [customTemplate]="nzCustomTemplate"
      [tokenSeparators]="nzTokenSeparators"
      [showSearch]="nzShowSearch"
      [autofocus]="nzAutoFocus"
      [listOfTopItem]="listOfTopItem"
      (inputValueChange)="onInputValueChange($event)"
      (tokenize)="onTokenSeparate($event)"
      (deleteItem)="onItemDelete($event)"
      (keydown)="onKeyDown($event)"
    ></nz-select-top-control>
    <nz-select-arrow
      *ngIf="nzShowArrow"
      [loading]="nzLoading"
      [search]="nzOpen && nzShowSearch"
      [suffixIcon]="nzSuffixIcon"
    ></nz-select-arrow>
    <nz-select-clear
      *ngIf="nzAllowClear && !nzDisabled && listOfValue.length"
      [clearIcon]="nzClearIcon"
      (clear)="onClearSelection()"
    ></nz-select-clear>
    <ng-template
      cdkConnectedOverlay
      nzConnectedOverlay
      [cdkConnectedOverlayHasBackdrop]="nzBackdrop"
      [cdkConnectedOverlayMinWidth]="$any(nzDropdownMatchSelectWidth ? null : triggerWidth)"
      [cdkConnectedOverlayWidth]="$any(nzDropdownMatchSelectWidth ? triggerWidth : null)"
      [cdkConnectedOverlayOrigin]="origin"
      [cdkConnectedOverlayTransformOriginOn]="'.ant-select-dropdown'"
      [cdkConnectedOverlayPanelClass]="nzDropdownClassName!"
      [cdkConnectedOverlayOpen]="nzOpen"
      (overlayKeydown)="onOverlayKeyDown($event)"
      (overlayOutsideClick)="onClickOutside($event)"
      (detach)="setOpenState(false)"
      (positionChange)="onPositionChange($event)"
    >
      <nz-option-container
        [ngStyle]="nzDropdownStyle"
        [itemSize]="nzOptionHeightPx"
        [maxItemLength]="nzOptionOverflowSize"
        [matchWidth]="nzDropdownMatchSelectWidth"
        [class.ant-select-dropdown-placement-bottomLeft]="dropDownPosition === 'bottom'"
        [class.ant-select-dropdown-placement-topLeft]="dropDownPosition === 'top'"
        [@slideMotion]="'enter'"
        [@.disabled]="noAnimation?.nzNoAnimation"
        [nzNoAnimation]="noAnimation?.nzNoAnimation"
        [listOfContainerItem]="listOfContainerItem"
        [menuItemSelectedIcon]="nzMenuItemSelectedIcon"
        [notFoundContent]="nzNotFoundContent"
        [activatedValue]="activatedValue"
        [listOfSelectedValue]="listOfValue"
        [dropdownRender]="nzDropdownRender"
        [compareWith]="compareWith"
        [mode]="nzMode"
        (keydown)="onKeyDown($event)"
        (itemClick)="onItemClick($event)"
        (scrollToBottom)="nzScrollToBottom.emit()"
      ></nz-option-container>
    </ng-template>
  `,
                    host: {
                        class: 'ant-select',
                        '[class.ant-select-lg]': 'nzSize === "large"',
                        '[class.ant-select-sm]': 'nzSize === "small"',
                        '[class.ant-select-show-arrow]': `nzShowArrow`,
                        '[class.ant-select-disabled]': 'nzDisabled',
                        '[class.ant-select-show-search]': `(nzShowSearch || nzMode !== 'default') && !nzDisabled`,
                        '[class.ant-select-allow-clear]': 'nzAllowClear',
                        '[class.ant-select-borderless]': 'nzBorderless',
                        '[class.ant-select-open]': 'nzOpen',
                        '[class.ant-select-focused]': 'nzOpen || focused',
                        '[class.ant-select-single]': `nzMode === 'default'`,
                        '[class.ant-select-multiple]': `nzMode !== 'default'`,
                        '[class.ant-select-rtl]': `dir === 'rtl'`,
                        '(click)': 'onHostClick()'
                    }
                }]
        }], ctorParameters: function () { return [{ type: i1.NzDestroyService }, { type: i2.NzConfigService }, { type: i0.ChangeDetectorRef }, { type: i0.ElementRef }, { type: i3.Platform }, { type: i4.FocusMonitor }, { type: i5.Directionality, decorators: [{
                    type: Optional
                }] }, { type: i6.NzNoAnimationDirective, decorators: [{
                    type: Host
                }, {
                    type: Optional
                }] }]; }, propDecorators: { nzId: [{
                type: Input
            }], nzSize: [{
                type: Input
            }], nzOptionHeightPx: [{
                type: Input
            }], nzOptionOverflowSize: [{
                type: Input
            }], nzDropdownClassName: [{
                type: Input
            }], nzDropdownMatchSelectWidth: [{
                type: Input
            }], nzDropdownStyle: [{
                type: Input
            }], nzNotFoundContent: [{
                type: Input
            }], nzPlaceHolder: [{
                type: Input
            }], nzMaxTagCount: [{
                type: Input
            }], nzDropdownRender: [{
                type: Input
            }], nzCustomTemplate: [{
                type: Input
            }], nzSuffixIcon: [{
                type: Input
            }], nzClearIcon: [{
                type: Input
            }], nzRemoveIcon: [{
                type: Input
            }], nzMenuItemSelectedIcon: [{
                type: Input
            }], nzTokenSeparators: [{
                type: Input
            }], nzMaxTagPlaceholder: [{
                type: Input
            }], nzMaxMultipleCount: [{
                type: Input
            }], nzMode: [{
                type: Input
            }], nzFilterOption: [{
                type: Input
            }], compareWith: [{
                type: Input
            }], nzAllowClear: [{
                type: Input
            }], nzBorderless: [{
                type: Input
            }], nzShowSearch: [{
                type: Input
            }], nzLoading: [{
                type: Input
            }], nzAutoFocus: [{
                type: Input
            }], nzAutoClearSearchValue: [{
                type: Input
            }], nzServerSearch: [{
                type: Input
            }], nzDisabled: [{
                type: Input
            }], nzOpen: [{
                type: Input
            }], nzBackdrop: [{
                type: Input
            }], nzOptions: [{
                type: Input
            }], nzShowArrow: [{
                type: Input
            }], nzOnSearch: [{
                type: Output
            }], nzScrollToBottom: [{
                type: Output
            }], nzOpenChange: [{
                type: Output
            }], nzBlur: [{
                type: Output
            }], nzFocus: [{
                type: Output
            }], originElement: [{
                type: ViewChild,
                args: [CdkOverlayOrigin, { static: true, read: ElementRef }]
            }], cdkConnectedOverlay: [{
                type: ViewChild,
                args: [CdkConnectedOverlay, { static: true }]
            }], nzSelectTopControlComponent: [{
                type: ViewChild,
                args: [NzSelectTopControlComponent, { static: true }]
            }], listOfNzOptionComponent: [{
                type: ContentChildren,
                args: [NzOptionComponent, { descendants: true }]
            }], listOfNzOptionGroupComponent: [{
                type: ContentChildren,
                args: [NzOptionGroupComponent, { descendants: true }]
            }], nzOptionGroupComponentElement: [{
                type: ViewChild,
                args: [NzOptionGroupComponent, { static: true, read: ElementRef }]
            }], nzSelectTopControlComponentElement: [{
                type: ViewChild,
                args: [NzSelectTopControlComponent, { static: true, read: ElementRef }]
            }] } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2VsZWN0LmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL2NvbXBvbmVudHMvc2VsZWN0L3NlbGVjdC5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQU9BLE9BQU8sRUFBRSxVQUFVLEVBQUUsS0FBSyxFQUFFLE1BQU0sRUFBRSxLQUFLLEVBQUUsR0FBRyxFQUFFLFFBQVEsRUFBRSxNQUFNLHVCQUF1QixDQUFDO0FBQ3hGLE9BQU8sRUFBRSxtQkFBbUIsRUFBRSxnQkFBZ0IsRUFBa0MsTUFBTSxzQkFBc0IsQ0FBQztBQUU3RyxPQUFPLEVBRUwsdUJBQXVCLEVBRXZCLFNBQVMsRUFDVCxlQUFlLEVBQ2YsVUFBVSxFQUNWLFlBQVksRUFDWixVQUFVLEVBQ1YsSUFBSSxFQUNKLEtBQUssRUFJTCxRQUFRLEVBQ1IsTUFBTSxFQUdOLFdBQVcsRUFDWCxTQUFTLEVBQ1QsaUJBQWlCLEVBQ2xCLE1BQU0sZUFBZSxDQUFDO0FBQ3ZCLE9BQU8sRUFBd0IsaUJBQWlCLEVBQUUsTUFBTSxnQkFBZ0IsQ0FBQztBQUN6RSxPQUFPLEVBQUUsZUFBZSxFQUFFLGFBQWEsRUFBRSxLQUFLLEVBQUUsTUFBTSxNQUFNLENBQUM7QUFDN0QsT0FBTyxFQUFFLFNBQVMsRUFBRSxTQUFTLEVBQUUsU0FBUyxFQUFFLE1BQU0sZ0JBQWdCLENBQUM7QUFFakUsT0FBTyxFQUFFLFdBQVcsRUFBRSxNQUFNLDhCQUE4QixDQUFDO0FBQzNELE9BQU8sRUFBZ0MsVUFBVSxFQUFFLE1BQU0sMkJBQTJCLENBQUM7QUFFckYsT0FBTyxFQUFFLDJCQUEyQixFQUFFLFlBQVksRUFBRSxNQUFNLDZCQUE2QixDQUFDO0FBQ3hGLE9BQU8sRUFBRSxnQkFBZ0IsRUFBRSxNQUFNLDZCQUE2QixDQUFDO0FBRS9ELE9BQU8sRUFBRSxZQUFZLEVBQUUsUUFBUSxFQUFFLE1BQU0seUJBQXlCLENBQUM7QUFFakUsT0FBTyxFQUFFLHNCQUFzQixFQUFFLE1B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LEVBQUUsRUFBRSxNQUFNLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRSxVQUFVLEVBQUU7Z0JBRXJFLGtDQUFrQztzQkFEakMsU0FBUzt1QkFBQywyQkFBMkIsRUFBRSxFQUFFLE1BQU0sRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFLFVBQVUsRUFBRSIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxuICogVXNlIG9mIHRoaXMgc291cmNlIGNvZGUgaXMgZ292ZXJuZWQgYnkgYW4gTUlULXN0eWxlIGxpY2Vuc2UgdGhhdCBjYW4gYmVcbiAqIGZvdW5kIGluIHRoZSBMSUNFTlNFIGZpbGUgYXQgaHR0cHM6Ly9naXRodWIuY29tL05HLVpPUlJPL25nLXpvcnJvLWFudGQvYmxvYi9tYXN0ZXIvTElDRU5TRVxuICovXG5cbmltcG9ydCB7IEZvY3VzTW9uaXRvciB9IGZyb20gJ0Bhbmd1bGFyL2Nkay9hMTF5JztcbmltcG9ydCB7IERpcmVjdGlvbiwgRGlyZWN0aW9uYWxpdHkgfSBmcm9tICdAYW5ndWxhci9jZGsvYmlkaSc7XG5pbXBvcnQgeyBET1dOX0FSUk9XLCBFTlRFUiwgRVNDQVBFLCBTUEFDRSwgVEFCLCBVUF9BUlJPVyB9IGZyb20gJ0Bhbmd1bGFyL2Nkay9rZXljb2Rlcyc7XG5pbXBvcnQgeyBDZGtDb25uZWN0ZWRPdmVybGF5LCBDZGtPdmVybGF5T3JpZ2luLCBDb25uZWN0ZWRPdmVybGF5UG9zaXRpb25DaGFuZ2UgfSBmcm9tICdAYW5ndWxhci9jZGsvb3ZlcmxheSc7XG5pbXBvcnQgeyBQbGF0Zm9ybSB9IGZyb20gJ0Bhbmd1bGFyL2Nkay9wbGF0Zm9ybSc7XG5pbXBvcnQge1xuICBBZnRlckNvbnRlbnRJbml0LFxuICBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneSxcbiAgQ2hhbmdlRGV0ZWN0b3JSZWYsXG4gIENvbXBvbmVudCxcbiAgQ29udGVudENoaWxkcmVuLFxuICBFbGVtZW50UmVmLFxuICBFdmVudEVtaXR0ZXIsXG4gIGZvcndhcmRSZWYsXG4gIEhvc3QsXG4gIElucHV0LFxuICBPbkNoYW5nZXMsXG4gIE9uRGVzdHJveSxcbiAgT25Jbml0LFxuICBPcHRpb25hbCxcbiAgT3V0cHV0LFxuICBRdWVyeUxpc3QsXG4gIFNpbXBsZUNoYW5nZXMsXG4gIFRlbXBsYXRlUmVmLFxuICBWaWV3Q2hpbGQsXG4gIFZpZXdFbmNhcHN1bGF0aW9uXG59IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgQ29udHJvbFZhbHVlQWNjZXNzb3IsIE5HX1ZBTFVFX0FDQ0VTU09SIH0gZnJvbSAnQGFuZ3VsYXIvZm9ybXMnO1xuaW1wb3J0IHsgQmVoYXZpb3JTdWJqZWN0LCBjb21iaW5lTGF0ZXN0LCBtZXJnZSB9IGZyb20gJ3J4anMnO1xuaW1wb3J0IHsgc3RhcnRXaXRoLCBzd2l0Y2hNYXAsIHRha2VVbnRpbCB9IGZyb20gJ3J4anMvb3BlcmF0b3JzJztcblxuaW1wb3J0IHsgc2xpZGVNb3Rpb24gfSBmcm9tICduZy16b3Jyby1hbnRkL2NvcmUvYW5pbWF0aW9uJztcbmltcG9ydCB7IE56Q29uZmlnS2V5LCBOekNvbmZpZ1NlcnZpY2UsIFdpdGhDb25maWcgfSBmcm9tICduZy16b3Jyby1hbnRkL2NvcmUvY29uZmlnJztcbmltcG9ydCB7IE56Tm9BbmltYXRpb25EaXJlY3RpdmUgfSBmcm9tICduZy16b3Jyby1hbnRkL2NvcmUvbm8tYW5pbWF0aW9uJztcbmltcG9ydCB7IGNhbmNlbFJlcXVlc3RBbmltYXRpb25GcmFtZSwgcmVxQW5pbUZyYW1lIH0gZnJvbSAnbmctem9ycm8tYW50ZC9jb3JlL3BvbHlmaWxsJztcbmltcG9ydCB7IE56RGVzdHJveVNlcnZpY2UgfSBmcm9tICduZy16b3Jyby1hbnRkL2NvcmUvc2VydmljZXMnO1xuaW1wb3J0IHsgQm9vbGVhbklucHV0LCBOelNhZmVBbnksIE9uQ2hhbmdlVHlwZSwgT25Ub3VjaGVkVHlwZSB9IGZyb20gJ25nLXpvcnJvLWFudGQvY29yZS90eXBlcyc7XG5pbXBvcnQgeyBJbnB1dEJvb2xlYW4sIGlzTm90TmlsIH0gZnJvbSAnbmctem9ycm8tYW50ZC9jb3JlL3V0aWwnO1xuXG5pbXBvcnQgeyBOek9wdGlvbkdyb3VwQ29tcG9uZW50IH0gZnJvbSAnLi9vcHRpb24tZ3JvdXAuY29tcG9uZW50JztcbmltcG9ydCB7IE56T3B0aW9uQ29tcG9uZW50IH0gZnJvbSAnLi9vcHRpb24uY29tcG9uZW50JztcbmltcG9ydCB7IE56U2VsZWN0VG9wQ29udHJvbENvbXBvbmVudCB9IGZyb20gJy4vc2VsZWN0LXRvcC1jb250cm9sLmNvbXBvbmVudCc7XG5pbXBvcnQgeyBOekZpbHRlck9wdGlvblR5cGUsIE56U2VsZWN0SXRlbUludGVyZmFjZSwgTnpTZWxlY3RNb2RlVHlwZSwgTnpTZWxlY3RPcHRpb25JbnRlcmZhY2UgfSBmcm9tICcuL3NlbGVjdC50eXBlcyc7XG5cbmNvbnN0IGRlZmF1bHRGaWx0ZXJPcHRpb246IE56RmlsdGVyT3B0aW9uVHlwZSA9IChzZWFyY2hWYWx1ZTogc3RyaW5nLCBpdGVtOiBOelNlbGVjdEl0ZW1JbnRlcmZhY2UpOiBib29sZWFuID0+IHtcbiAgaWYgKGl0ZW0gJiYgaXRlbS5uekxhYmVsKSB7XG4gICAgcmV0dXJuIGl0ZW0ubnpMYWJlbC50b1N0cmluZygpLnRvTG93ZXJDYXNlKCkuaW5kZXhPZihzZWFyY2hWYWx1ZS50b0xvd2VyQ2FzZSgpKSA+IC0xO1xuICB9IGVsc2Uge1xuICAgIHJldHVybiBmYWxzZTtcbiAgfVxufTtcblxuY29uc3QgTlpfQ09ORklHX01PRFVMRV9OQU1FOiBOekNvbmZpZ0tleSA9ICdzZWxlY3QnO1xuXG5leHBvcnQgdHlwZSBOelNlbGVjdFNpemVUeXBlID0gJ2xhcmdlJyB8ICdkZWZhdWx0JyB8ICdzbWFsbCc7XG5cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogJ256LXNlbGVjdCcsXG4gIGV4cG9ydEFzOiAnbnpTZWxlY3QnLFxuICBwcmVzZXJ2ZVdoaXRlc3BhY2VzOiBmYWxzZSxcbiAgcHJvdmlkZXJzOiBbXG4gICAgTnpEZXN0cm95U2VydmljZSxcbiAgICB7XG4gICAgICBwcm92aWRlOiBOR19WQUxVRV9BQ0NFU1NPUixcbiAgICAgIHVzZUV4aXN0aW5nOiBmb3J3YXJkUmVmKCgpID0+IE56U2VsZWN0Q29tcG9uZW50KSxcbiAgICAgIG11bHRpOiB0cnVlXG4gICAgfVxuICBdLFxuICBjaGFuZ2VEZXRlY3Rpb246IENoYW5nZURldGVjdGlvblN0cmF0ZWd5Lk9uUHVzaCxcbiAgZW5jYXBzdWxhdGlvbjogVmlld0VuY2Fwc3VsYXRpb24uTm9uZSxcbiAgYW5pbWF0aW9uczogW3NsaWRlTW90aW9uXSxcbiAgdGVtcGxhdGU6IGBcbiAgICA8bnotc2VsZWN0LXRvcC1jb250cm9sXG4gICAgICBjZGtPdmVybGF5T3JpZ2luXG4gICAgICAjb3JpZ2luPVwiY2RrT3ZlcmxheU9yaWdpblwiXG4gICAgICBbbnpJZF09XCJueklkXCJcbiAgICAgIFtvcGVuXT1cIm56T3BlblwiXG4gICAgICBbZGlzYWJsZWRdPVwibnpEaXNhYmxlZFwiXG4gICAgICBbbW9kZV09XCJuek1vZGVcIlxuICAgICAgW0AuZGlzYWJsZWRdPVwibm9BbmltYXRpb24/Lm56Tm9BbmltYXRpb25cIlxuICAgICAgW256Tm9BbmltYXRpb25dPVwibm9BbmltYXRpb24/Lm56Tm9BbmltYXRpb25cIlxuICAgICAgW21heFRhZ1BsYWNlaG9sZGVyXT1cIm56TWF4VGFnUGxhY2Vob2xkZXJcIlxuICAgICAgW3JlbW92ZUljb25dPVwibnpSZW1vdmVJY29uXCJcbiAgICAgIFtwbGFjZUhvbGRlcl09XCJuelBsYWNlSG9sZGVyXCJcbiAgICAgIFttYXhUYWdDb3VudF09XCJuek1heFRhZ0NvdW50XCJcbiAgICAgIFtjdXN0b21UZW1wbGF0ZV09XCJuekN1c3RvbVRlbXBsYXRlXCJcbiAgICAgIFt0b2tlblNlcGFyYXRvcnNdPVwibnpUb2tlblNlcGFyYXRvcnNcIlxuICAgICAgW3Nob3dTZWFyY2hdPVwibnpTaG93U2VhcmNoXCJcbiAgICAgIFthdXRvZm9jdXNdPVwibnpBdXRvRm9jdXNcIlxuICAgICAgW2xpc3RPZlRvcEl0ZW1dPVwibGlzdE9mVG9wSXRlbVwiXG4gICAgICAoaW5wdXRWYWx1ZUNoYW5nZSk9XCJvbklucHV0VmFsdWVDaGFuZ2UoJGV2ZW50KVwiXG4gICAgICAodG9rZW5pemUpPVwib25Ub2tlblNlcGFyYXRlKCRldmVudClcIlxuICAgICAgKGRlbGV0ZUl0ZW0pPVwib25JdGVtRGVsZXRlKCRldmVudClcIlxuICAgICAgKGtleWRvd24pPVwib25LZXlEb3duKCRldmVudClcIlxuICAgID48L256LXNlbGVjdC10b3AtY29udHJvbD5cbiAgICA8bnotc2VsZWN0LWFycm93XG4gICAgICAqbmdJZj1cIm56U2hvd0Fycm93XCJcbiAgICAgIFtsb2FkaW5nXT1cIm56TG9hZGluZ1wiXG4gICAgICBbc2VhcmNoXT1cIm56T3BlbiAmJiBuelNob3dTZWFyY2hcIlxuICAgICAgW3N1ZmZpeEljb25dPVwibnpTdWZmaXhJY29uXCJcbiAgICA+PC9uei1zZWxlY3QtYXJyb3c+XG4gICAgPG56LXNlbGVjdC1jbGVhclxuICAgICAgKm5nSWY9XCJuekFsbG93Q2xlYXIgJiYgIW56RGlzYWJsZWQgJiYgbGlzdE9mVmFsdWUubGVuZ3RoXCJcbiAgICAgIFtjbGVhckljb25dPVwibnpDbGVhckljb25cIlxuICAgICAgKGNsZWFyKT1cIm9uQ2xlYXJTZWxlY3Rpb24oKVwiXG4gICAgPjwvbnotc2VsZWN0LWNsZWFyPlxuICAgIDxuZy10ZW1wbGF0ZVxuICAgICAgY2RrQ29ubmVjdGVkT3ZlcmxheVxuICAgICAgbnpDb25uZWN0ZWRPdmVybGF5XG4gICAgICBbY2RrQ29ubmVjdGVkT3ZlcmxheUhhc0JhY2tkcm9wXT1cIm56QmFja2Ryb3BcIlxuICAgICAgW2Nka0Nvbm5lY3RlZE92ZXJsYXlNaW5XaWR0aF09XCIkYW55KG56RHJvcGRvd25NYXRjaFNlbGVjdFdpZHRoID8gbnVsbCA6IHRyaWdnZXJXaWR0aClcIlxuICAgICAgW2Nka0Nvbm5lY3RlZE92ZXJsYXlXaWR0aF09XCIkYW55KG56RHJvcGRvd25NYXRjaFNlbGVjdFdpZHRoID8gdHJpZ2dlcldpZHRoIDogbnVsbClcIlxuICAgICAgW2Nka0Nvbm5lY3RlZE92ZXJsYXlPcmlnaW5dPVwib3JpZ2luXCJcbiAgICAgIFtjZGtDb25uZWN0ZWRPdmVybGF5VHJhbnNmb3JtT3JpZ2luT25dPVwiJy5hbnQtc2VsZWN0LWRyb3Bkb3duJ1wiXG4gICAgICBbY2RrQ29ubmVjdGVkT3ZlcmxheVBhbmVsQ2xhc3NdPVwibnpEcm9wZG93bkNsYXNzTmFtZSFcIlxuICAgICAgW2Nka0Nvbm5lY3RlZE92ZXJsYXlPcGVuXT1cIm56T3BlblwiXG4gICAgICAob3ZlcmxheUtleWRvd24pPVwib25PdmVybGF5S2V5RG93bigkZXZlbnQpXCJcbiAgICAgIChvdmVybGF5T3V0c2lkZUNsaWNrKT1cIm9uQ2xpY2tPdXRzaWRlKCRldmVudClcIlxuICAgICAgKGRldGFjaCk9XCJzZXRPcGVuU3RhdGUoZmFsc2UpXCJcbiAgICAgIChwb3NpdGlvbkNoYW5nZSk9XCJvblBvc2l0aW9uQ2hhbmdlKCRldmVudClcIlxuICAgID5cbiAgICAgIDxuei1vcHRpb24tY29udGFpbmVyXG4gICAgICAgIFtuZ1N0eWxlXT1cIm56RHJvcGRvd25TdHlsZVwiXG4gICAgICAgIFtpdGVtU2l6ZV09XCJuek9wdGlvbkhlaWdodFB4XCJcbiAgICAgICAgW21heEl0ZW1MZW5ndGhdPVwibnpPcHRpb25PdmVyZmxvd1NpemVcIlxuICAgICAgICBbbWF0Y2hXaWR0aF09XCJuekRyb3Bkb3duTWF0Y2hTZWxlY3RXaWR0aFwiXG4gICAgICAgIFtjbGFzcy5hbnQtc2VsZWN0LWRyb3Bkb3duLXBsYWNlbWVudC1ib3R0b21MZWZ0XT1cImRyb3BEb3duUG9zaXRpb24gPT09ICdib3R0b20nXCJcbiAgICAgICAgW2NsYXNzLmFudC1zZWxlY3QtZHJvcGRvd24tcGxhY2VtZW50LXRvcExlZnRdPVwiZHJvcERvd25Qb3NpdGlvbiA9PT0gJ3RvcCdcIlxuICAgICAgICBbQHNsaWRlTW90aW9uXT1cIidlbnRlcidcIlxuICAgICAgICBbQC5kaXNhYmxlZF09XCJub0FuaW1hdGlvbj8ubnpOb0FuaW1hdGlvblwiXG4gICAgICAgIFtuek5vQW5pbWF0aW9uXT1cIm5vQW5pbWF0aW9uPy5uek5vQW5pbWF0aW9uXCJcbiAgICAgICAgW2xpc3RPZkNvbnRhaW5lckl0ZW1dPVwibGlzdE9mQ29udGFpbmVySXRlbVwiXG4gICAgICAgIFttZW51SXRlbVNlbGVjdGVkSWNvbl09XCJuek1lbnVJdGVtU2VsZWN0ZWRJY29uXCJcbiAgICAgICAgW25vdEZvdW5kQ29udGVudF09XCJuek5vdEZvdW5kQ29udGVudFwiXG4gICAgICAgIFthY3RpdmF0ZWRWYWx1ZV09XCJhY3RpdmF0ZWRWYWx1ZVwiXG4gICAgICAgIFtsaXN0T2ZTZWxlY3RlZFZhbHVlXT1cImxpc3RPZlZhbHVlXCJcbiAgICAgICAgW2Ryb3Bkb3duUmVuZGVyXT1cIm56RHJvcGRvd25SZW5kZXJcIlxuICAgICAgICBbY29tcGFyZVdpdGhdPVwiY29tcGFyZVdpdGhcIlxuICAgICAgICBbbW9kZV09XCJuek1vZGVcIlxuICAgICAgICAoa2V5ZG93bik9XCJvbktleURvd24oJGV2ZW50KVwiXG4gICAgICAgIChpdGVtQ2xpY2spPVwib25JdGVtQ2xpY2soJGV2ZW50KVwiXG4gICAgICAgIChzY3JvbGxUb0JvdHRvbSk9XCJuelNjcm9sbFRvQm90dG9tLmVtaXQoKVwiXG4gICAgICA+PC9uei1vcHRpb24tY29udGFpbmVyPlxuICAgIDwvbmctdGVtcGxhdGU+XG4gIGAsXG4gIGhvc3Q6IHtcbiAgICBjbGFzczogJ2FudC1zZWxlY3QnLFxuICAgICdbY2xhc3MuYW50LXNlbGVjdC1sZ10nOiAnbnpTaXplID09PSBcImxhcmdlXCInLFxuICAgICdbY2xhc3MuYW50LXNlbGVjdC1zbV0nOiAnbnpTaXplID09PSBcInNtYWxsXCInLFxuICAgICdbY2xhc3MuYW50LXNlbGVjdC1zaG93LWFycm93XSc6IGBuelNob3dBcnJvd2AsXG4gICAgJ1tjbGFzcy5hbnQtc2VsZWN0LWRpc2FibGVkXSc6ICduekRpc2FibGVkJyxcbiAgICAnW2NsYXNzLmFudC1zZWxlY3Qtc2hvdy1zZWFyY2hdJzogYChuelNob3dTZWFyY2ggfHwgbnpNb2RlICE9PSAnZGVmYXVsdCcpICYmICFuekRpc2FibGVkYCxcbiAgICAnW2NsYXNzLmFudC1zZWxlY3QtYWxsb3ctY2xlYXJdJzogJ256QWxsb3dDbGVhcicsXG4gICAgJ1tjbGFzcy5hbnQtc2VsZWN0LWJvcmRlcmxlc3NdJzogJ256Qm9yZGVybGVzcycsXG4gICAgJ1tjbGFzcy5hbnQtc2VsZWN0LW9wZW5dJzogJ256T3BlbicsXG4gICAgJ1tjbGFzcy5hbnQtc2VsZWN0LWZvY3VzZWRdJzogJ256T3BlbiB8fCBmb2N1c2VkJyxcbiAgICAnW2NsYXNzLmFudC1zZWxlY3Qtc2luZ2xlXSc6IGBuek1vZGUgPT09ICdkZWZhdWx0J2AsXG4gICAgJ1tjbGFzcy5hbnQtc2VsZWN0LW11bHRpcGxlXSc6IGBuek1vZGUgIT09ICdkZWZhdWx0J2AsXG4gICAgJ1tjbGFzcy5hbnQtc2VsZWN0LXJ0bF0nOiBgZGlyID09PSAncnRsJ2AsXG4gICAgJyhjbGljayknOiAnb25Ib3N0Q2xpY2soKSdcbiAgfVxufSlcbmV4cG9ydCBjbGFzcyBOelNlbGVjdENvbXBvbmVudCBpbXBsZW1lbnRzIENvbnRyb2xWYWx1ZUFjY2Vzc29yLCBPbkluaXQsIEFmdGVyQ29udGVudEluaXQsIE9uQ2hhbmdlcywgT25EZXN0cm95IHtcbiAgcmVhZG9ubHkgX256TW9kdWxlTmFtZTogTnpDb25maWdLZXkgPSBOWl9DT05GSUdfTU9EVUxFX05BTUU7XG5cbiAgc3RhdGljIG5nQWNjZXB0SW5wdXRUeXBlX256QWxsb3dDbGVhcjogQm9vbGVhbklucHV0O1xuICBzdGF0aWMgbmdBY2NlcHRJbnB1dFR5cGVfbnpCb3JkZXJsZXNzOiBCb29sZWFuSW5wdXQ7XG4gIHN0YXRpYyBuZ0FjY2VwdElucHV0VHlwZV9uelNob3dTZWFyY2g6IEJvb2xlYW5JbnB1dDtcbiAgc3RhdGljIG5nQWNjZXB0SW5wdXRUeXBlX256TG9hZGluZzogQm9vbGVhbklucHV0O1xuICBzdGF0aWMgbmdBY2NlcHRJbnB1dFR5cGVfbnpBdXRvRm9jdXM6IEJvb2xlYW5JbnB1dDtcbiAgc3RhdGljIG5nQWNjZXB0SW5wdXRUeXBlX256QXV0b0NsZWFyU2VhcmNoVmFsdWU6IEJvb2xlYW5JbnB1dDtcbiAgc3RhdGljIG5nQWNjZXB0SW5wdXRUeXBlX256U2VydmVyU2VhcmNoOiBCb29sZWFuSW5wdXQ7XG4gIHN0YXRpYyBuZ0FjY2VwdElucHV0VHlwZV9uekRpc2FibGVkOiBCb29sZWFuSW5wdXQ7XG4gIHN0YXRpYyBuZ0FjY2VwdElucHV0VHlwZV9uek9wZW46IEJvb2xlYW5JbnB1dDtcblxuICBASW5wdXQoKSBueklkOiBzdHJpbmcgfCBudWxsID0gbnVsbDtcbiAgQElucHV0KCkgbnpTaXplOiBOelNlbGVjdFNpemVUeXBlID0gJ2RlZmF1bHQnO1xuICBASW5wdXQoKSBuek9wdGlvbkhlaWdodFB4ID0gMzI7XG4gIEBJbnB1dCgpIG56T3B0aW9uT3ZlcmZsb3dTaXplID0gODtcbiAgQElucHV0KCkgbnpEcm9wZG93bkNsYXNzTmFtZTogc3RyaW5nIHwgbnVsbCA9IG51bGw7XG4gIEBJbnB1dCgpIG56RHJvcGRvd25NYXRjaFNlbGVjdFdpZHRoID0gdHJ1ZTtcbiAgQElucHV0KCkgbnpEcm9wZG93blN0eWxlOiB7IFtrZXk6IHN0cmluZ106IHN0cmluZyB9IHwgbnVsbCA9IG51bGw7XG4gIEBJbnB1dCgpIG56Tm90Rm91bmRDb250ZW50OiBzdHJpbmcgfCBUZW1wbGF0ZVJlZjxOelNhZmVBbnk+IHwgdW5kZWZpbmVkID0gdW5kZWZpbmVkO1xuICBASW5wdXQoKSBuelBsYWNlSG9sZGVyOiBzdHJpbmcgfCBUZW1wbGF0ZVJlZjxOelNhZmVBbnk+IHwgbnVsbCA9IG51bGw7XG4gIEBJbnB1dCgpIG56TWF4VGFnQ291bnQgPSBJbmZpbml0eTtcbiAgQElucHV0KCkgbnpEcm9wZG93blJlbmRlcjogVGVtcGxhdGVSZWY8TnpTYWZlQW55PiB8IG51bGwgPSBudWxsO1xuICBASW5wdXQoKSBuekN1c3RvbVRlbXBsYXRlOiBUZW1wbGF0ZVJlZjx7ICRpbXBsaWNpdDogTnpTZWxlY3RJdGVtSW50ZXJmYWNlIH0+IHwgbnVsbCA9IG51bGw7XG4gIEBJbnB1dCgpXG4gIEBXaXRoQ29uZmlnPFRlbXBsYXRlUmVmPE56U2FmZUFueT4gfCBzdHJpbmcgfCBudWxsPigpXG4gIG56U3VmZml4SWNvbjogVGVtcGxhdGVSZWY8TnpTYWZlQW55PiB8IHN0cmluZyB8IG51bGwgPSBudWxsO1xuICBASW5wdXQoKSBuekNsZWFySWNvbjogVGVtcGxhdGVSZWY8TnpTYWZlQW55PiB8IG51bGwgPSBudWxsO1xuICBASW5wdXQoKSBuelJlbW92ZUljb246IFRlbXBsYXRlUmVmPE56U2FmZUFueT4gfCBudWxsID0gbnVsbDtcbiAgQElucHV0KCkgbnpNZW51SXRlbVNlbGVjdGVkSWNvbjogVGVtcGxhdGVSZWY8TnpTYWZlQW55PiB8IG51bGwgPSBudWxsO1xuICBASW5wdXQoKSBuelRva2VuU2VwYXJhdG9yczogc3RyaW5nW10gPSBbXTtcbiAgQElucHV0KCkgbnpNYXhUYWdQbGFjZWhvbGRlcjogVGVtcGxhdGVSZWY8eyAkaW1wbGljaXQ6IE56U2FmZUFueVtdIH0+IHwgbnVsbCA9IG51bGw7XG4gIEBJbnB1dCgpIG56TWF4TXVsdGlwbGVDb3VudCA9IEluZmluaXR5O1xuICBASW5wdXQoKSBuek1vZGU6IE56U2VsZWN0TW9kZVR5cGUgPSAnZGVmYXVsdCc7XG4gIEBJbnB1dCgpIG56RmlsdGVyT3B0aW9uOiBOekZpbHRlck9wdGlvblR5cGUgPSBkZWZhdWx0RmlsdGVyT3B0aW9uO1xuICBASW5wdXQoKSBjb21wYXJlV2l0aDogKG8xOiBOelNhZmVBbnksIG8yOiBOelNhZmVBbnkpID0+IGJvb2xlYW4gPSAobzE6IE56U2FmZUFueSwgbzI6IE56U2FmZUFueSkgPT4gbzEgPT09IG8yO1xuICBASW5wdXQoKSBASW5wdXRCb29sZWFuKCkgbnpBbGxvd0NsZWFyID0gZmFsc2U7XG4gIEBJbnB1dCgpIEBXaXRoQ29uZmlnPGJvb2xlYW4+KCkgQElucHV0Qm9vbGVhbigpIG56Qm9yZGVybGVzcyA9IGZhbHNlO1xuICBASW5wdXQoKSBASW5wdXRCb29sZWFuKCkgbnpTaG93U2VhcmNoID0gZmFsc2U7XG4gIEBJbnB1dCgpIEBJbnB1dEJvb2xlYW4oKSBuekxvYWRpbmcgPSBmYWxzZTtcbiAgQElucHV0KCkgQElucHV0Qm9vbGVhbigpIG56QXV0b0ZvY3VzID0gZmFsc2U7XG4gIEBJbnB1dCgpIEBJbnB1dEJvb2xlYW4oKSBuekF1dG9DbGVhclNlYXJjaFZhbHVlID0gdHJ1ZTtcbiAgQElucHV0KCkgQElucHV0Qm9vbGVhbigpIG56U2VydmVyU2VhcmNoID0gZmFsc2U7XG4gIEBJbnB1dCgpIEBJbnB1dEJvb2xlYW4oKSBuekRpc2FibGVkID0gZmFsc2U7XG4gIEBJbnB1dCgpIEBJbnB1dEJvb2xlYW4oKSBuek9wZW4gPSBmYWxzZTtcbiAgQElucHV0KCkgQFdpdGhDb25maWc8Ym9vbGVhbj4oKSBASW5wdXRCb29sZWFuKCkgbnpCYWNrZHJvcCA9IGZhbHNlO1xuICBASW5wdXQoKSBuek9wdGlvbnM6IE56U2VsZWN0T3B0aW9uSW50ZXJmYWNlW10gPSBbXTtcblxuICBASW5wdXQoKVxuICBzZXQgbnpTaG93QXJyb3codmFsdWU6IGJvb2xlYW4pIHtcbiAgICB0aGlzLl9uelNob3dBcnJvdyA9IHZhbHVlO1xuICB9XG4gIGdldCBuelNob3dBcnJvdygpOiBib29sZWFuIHtcbiAgICByZXR1cm4gdGhpcy5fbnpTaG93QXJyb3cgPT09IHVuZGVmaW5lZCA/IHRoaXMubnpNb2RlID09PSAnZGVmYXVsdCcgOiB0aGlzLl9uelNob3dBcnJvdztcbiAgfVxuXG4gIEBPdXRwdXQoKSByZWFkb25seSBuek9uU2VhcmNoID0gbmV3IEV2ZW50RW1pdHRlcjxzdHJpbmc+KCk7XG4gIEBPdXRwdXQoKSByZWFkb25seSBuelNjcm9sbFRvQm90dG9tID0gbmV3IEV2ZW50RW1pdHRlcjx2b2lkPigpO1xuICBAT3V0cHV0KCkgcmVhZG9ubHkgbnpPcGVuQ2hhbmdlID0gbmV3IEV2ZW50RW1pdHRlcjxib29sZWFuPigpO1xuICBAT3V0cHV0KCkgcmVhZG9ubHkgbnpCbHVyID0gbmV3IEV2ZW50RW1pdHRlcjx2b2lkPigpO1xuICBAT3V0cHV0KCkgcmVhZG9ubHkgbnpGb2N1cyA9IG5ldyBFdmVudEVtaXR0ZXI8dm9pZD4oKTtcbiAgQFZpZXdDaGlsZChDZGtPdmVybGF5T3JpZ2luLCB7IHN0YXRpYzogdHJ1ZSwgcmVhZDogRWxlbWVudFJlZiB9KSBvcmlnaW5FbGVtZW50ITogRWxlbWVudFJlZjtcbiAgQFZpZXdDaGlsZChDZGtDb25uZWN0ZWRPdmVybGF5LCB7IHN0YXRpYzogdHJ1ZSB9KSBjZGtDb25uZWN0ZWRPdmVybGF5ITogQ2RrQ29ubmVjdGVkT3ZlcmxheTtcbiAgQFZpZXdDaGlsZChOelNlbGVjdFRvcENvbnRyb2xDb21wb25lbnQsIHsgc3RhdGljOiB0cnVlIH0pIG56U2VsZWN0VG9wQ29udHJvbENvbXBvbmVudCE6IE56U2VsZWN0VG9wQ29udHJvbENvbXBvbmVudDtcbiAgQENvbnRlbnRDaGlsZHJlbihOek9wdGlvbkNvbXBvbmVudCwgeyBkZXNjZW5kYW50czogdHJ1ZSB9KSBsaXN0T2ZOek9wdGlvbkNvbXBvbmVudCE6IFF1ZXJ5TGlzdDxOek9wdGlvbkNvbXBvbmVudD47XG4gIEBDb250ZW50Q2hpbGRyZW4oTnpPcHRpb25Hcm91cENvbXBvbmVudCwgeyBkZXNjZW5kYW50czogdHJ1ZSB9KVxuICBsaXN0T2ZOek9wdGlvbkdyb3VwQ29tcG9uZW50ITogUXVlcnlMaXN0PE56T3B0aW9uR3JvdXBDb21wb25lbnQ+O1xuICBAVmlld0NoaWxkKE56T3B0aW9uR3JvdXBDb21wb25lbnQsIHsgc3RhdGljOiB0cnVlLCByZWFkOiBFbGVtZW50UmVmIH0pIG56T3B0aW9uR3JvdXBDb21wb25lbnRFbGVtZW50ITogRWxlbWVudFJlZjtcbiAgQFZpZXdDaGlsZChOelNlbGVjdFRvcENvbnRyb2xDb21wb25lbnQsIHsgc3RhdGljOiB0cnVlLCByZWFkOiBFbGVtZW50UmVmIH0pXG4gIG56U2VsZWN0VG9wQ29udHJvbENvbXBvbmVudEVsZW1lbnQhOiBFbGVtZW50UmVmO1xuICBwcml2YXRlIGxpc3RPZlZhbHVlJCA9IG5ldyBCZWhhdmlvclN1YmplY3Q8TnpTYWZlQW55W10+KFtdKTtcbiAgcHJpdmF0ZSBsaXN0T2ZUZW1wbGF0ZUl0ZW0kID0gbmV3IEJlaGF2aW9yU3ViamVjdDxOelNlbGVjdEl0ZW1JbnRlcmZhY2VbXT4oW10pO1xuICBwcml2YXRlIGxpc3RPZlRhZ0FuZFRlbXBsYXRlSXRlbTogTnpTZWxlY3RJdGVtSW50ZXJmYWNlW10gPSBbXTtcbiAgcHJpdmF0ZSBzZWFyY2hWYWx1ZTogc3RyaW5nID0gJyc7XG4gIHByaXZhdGUgaXNSZWFjdGl2ZURyaXZlbiA9IGZhbHNlO1xuICBwcml2YXRlIHZhbHVlOiBOelNhZmVBbnkgfCBOelNhZmVBbnlbXTtcbiAgcHJpdmF0ZSBfbnpTaG93QXJyb3c6IGJvb2xlYW4gfCB1bmRlZmluZWQ7XG4gIHByaXZhdGUgcmVxdWVzdElkOiBudW1iZXIgPSAtMTtcbiAgb25DaGFuZ2U6IE9uQ2hhbmdlVHlwZSA9ICgpID0+IHt9O1xuICBvblRvdWNoZWQ6IE9uVG91Y2hlZFR5cGUgPSAoKSA9PiB7fTtcbiAgZHJvcERvd25Qb3NpdGlvbjogJ3RvcCcgfCAnY2VudGVyJyB8ICdib3R0b20nID0gJ2JvdHRvbSc7XG4gIHRyaWdnZXJXaWR0aDogbnVtYmVyIHwgbnVsbCA9IG51bGw7XG4gIGxpc3RPZkNvbnRhaW5lckl0ZW06IE56U2VsZWN0SXRlbUludGVyZmFjZVtdID0gW107XG4gIGxpc3RPZlRvcEl0ZW06IE56U2VsZWN0SXRlbUludGVyZmFjZVtdID0gW107XG4gIGFjdGl2YXRlZFZhbHVlOiBOelNhZmVBbnkgfCBudWxsID0gbnVsbDtcbiAgbGlzdE9mVmFsdWU6IE56U2FmZUFueVtdID0gW107XG4gIGZvY3VzZWQgPSBmYWxzZTtcbiAgZGlyOiBEaXJlY3Rpb24gPSAnbHRyJztcblxuICBnZW5lcmF0ZVRhZ0l0ZW0odmFsdWU6IHN0cmluZyk6IE56U2VsZWN0SXRlbUludGVyZmFjZSB7XG4gICAgcmV0dXJuIHtcbiAgICAgIG56VmFsdWU6IHZhbHVlLFxuICAgICAgbnpMYWJlbDogdmFsdWUsXG4gICAgICB0eXBlOiAnaXRlbSdcbiAgICB9O1xuICB9XG5cbiAgb25JdGVtQ2xpY2sodmFsdWU6IE56U2FmZUFueSk6IHZvaWQge1xuICAgIHRoaXMuYWN0aXZhdGVkVmFsdWUgPSB2YWx1ZTtcbiAgICBpZiAodGhpcy5uek1vZGUgPT09ICdkZWZhdWx0Jykge1xuICAgICAgaWYgKHRoaXMubGlzdE9mVmFsdWUubGVuZ3RoID09PSAwIHx8ICF0aGlzLmNvbXBhcmVXaXRoKHRoaXMubGlzdE9mVmFsdWVbMF0sIHZhbHVlKSkge1xuICAgICAgICB0aGlzLnVwZGF0ZUxpc3RPZlZhbHVlKFt2YWx1ZV0pO1xuICAgICAgfVxuICAgICAgdGhpcy5zZXRPcGVuU3RhdGUoZmFsc2UpO1xuICAgIH0gZWxzZSB7XG4gICAgICBjb25zdCB0YXJnZXRJbmRleCA9IHRoaXMubGlzdE9mVmFsdWUuZmluZEluZGV4KG8gPT4gdGhpcy5jb21wYXJlV2l0aChvLCB2YWx1ZSkpO1xuICAgICAgaWYgKHRhcmdldEluZGV4ICE9PSAtMSkge1xuICAgICAgICBjb25zdCBsaXN0T2ZWYWx1ZUFmdGVyUmVtb3ZlZCA9IHRoaXMubGlzdE9mVmFsdWUuZmlsdGVyKChfLCBpKSA9PiBpICE9PSB0YXJnZXRJbmRleCk7XG4gICAgICAgIHRoaXMudXBkYXRlTGlzdE9mVmFsdWUobGlzdE9mVmFsdWVBZnRlclJlbW92ZWQpO1xuICAgICAgfSBlbHNlIGlmICh0aGlzLmxpc3RPZlZhbHVlLmxlbmd0aCA8IHRoaXMubnpNYXhNdWx0aXBsZUNvdW50KSB7XG4gICAgICAgIGNvbnN0IGxpc3RPZlZhbHVlQWZ0ZXJBZGRlZCA9IFsuLi50aGlzLmxpc3RPZlZhbHVlLCB2YWx1ZV07XG4gICAgICAgIHRoaXMudXBkYXRlTGlzdE9mVmFsdWUobGlzdE9mVmFsdWVBZnRlckFkZGVkKTtcbiAgICAgIH1cbiAgICAgIHRoaXMuZm9jdXMoKTtcbiAgICAgIGlmICh0aGlzLm56QXV0b0NsZWFyU2VhcmNoVmFsdWUpIHtcbiAgICAgICAgdGhpcy5jbGVhcklucHV0KCk7XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgb25JdGVtRGVsZXRlKGl0ZW06IE56U2VsZWN0SXRlbUludGVyZmFjZSk6IHZvaWQge1xuICAgIGNvbnN0IGxpc3RPZlNlbGVjdGVkVmFsdWUgPSB0aGlzLmxpc3RPZlZhbHVlLmZpbHRlcih2ID0+ICF0aGlzLmNvbXBhcmVXaXRoKHYsIGl0ZW0ubnpWYWx1ZSkpO1xuICAgIHRoaXMudXBkYXRlTGlzdE9mVmFsdWUobGlzdE9mU2VsZWN0ZWRWYWx1ZSk7XG4gICAgdGhpcy5jbGVhcklucHV0KCk7XG4gIH1cblxuICBvbkhvc3RDbGljaygpOiB2b2lkIHtcbiAgICBpZiAoKHRoaXMubnpPcGVuICYmIHRoaXMubnpTaG93U2VhcmNoKSB8fCB0aGlzLm56RGlzYWJsZWQpIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICB0aGlzLnNldE9wZW5TdGF0ZSghdGhpcy5uek9wZW4pO1xuICB9XG5cbiAgdXBkYXRlTGlzdE9mQ29udGFpbmVySXRlbSgpOiB2b2lkIHtcbiAgICBsZXQgbGlzdE9mQ29udGFpbmVySXRlbSA9IHRoaXMubGlzdE9mVGFnQW5kVGVtcGxhdGVJdGVtXG4gICAgICAuZmlsdGVyKGl0ZW0gPT4gIWl0ZW0ubnpIaWRlKVxuICAgICAgLmZpbHRlcihpdGVtID0+IHtcbiAgICAgICAgaWYgKCF0aGlzLm56U2VydmVyU2VhcmNoICYmIHRoaXMuc2VhcmNoVmFsdWUpIHtcbiAgICAgICAgICByZXR1cm4gdGhpcy5uekZpbHRlck9wdGlvbih0aGlzLnNlYXJjaFZhbHVlLCBpdGVtKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgfVxuICAgICAgfSk7XG4gICAgaWYgKHRoaXMubnpNb2RlID09PSAndGFncycgJiYgdGhpcy5zZWFyY2hWYWx1ZSkge1xuICAgICAgY29uc3QgbWF0Y2hlZEl0ZW0gPSB0aGlzLmxpc3RPZlRhZ0FuZFRlbXBsYXRlSXRlbS5maW5kKGl0ZW0gPT4gaXRlbS5uekxhYmVsID09PSB0aGlzLnNlYXJjaFZhbHVlKTtcbiAgICAgIGlmICghbWF0Y2hlZEl0ZW0pIHtcbiAgICAgICAgY29uc3QgdGFnSXRlbSA9IHRoaXMuZ2VuZXJhdGVUYWdJdGVtKHRoaXMuc2VhcmNoVmFsdWUpO1xuICAgICAgICBsaXN0T2ZDb250YWluZXJJdGVtID0gW3RhZ0l0ZW0sIC4uLmxpc3RPZkNvbnRhaW5lckl0ZW1dO1xuICAgICAgICB0aGlzLmFjdGl2YXRlZFZhbHVlID0gdGFnSXRlbS5uelZhbHVlO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgdGhpcy5hY3RpdmF0ZWRWYWx1ZSA9IG1hdGNoZWRJdGVtLm56VmFsdWU7XG4gICAgICB9XG4gICAgfVxuICAgIGNvbnN0IGFjdGl2YXRlZEl0ZW0gPVxuICAgICAgbGlzdE9mQ29udGFpbmVySXRlbS5maW5kKGl0ZW0gPT4gdGhpcy5jb21wYXJlV2l0aChpdGVtLm56VmFsdWUsIHRoaXMubGlzdE9mVmFsdWVbMF0pKSB8fCBsaXN0T2ZDb250YWluZXJJdGVtWzBdO1xuICAgIHRoaXMuYWN0aXZhdGVkVmFsdWUgPSAoYWN0aXZhdGVkSXRlbSAmJiBhY3RpdmF0ZWRJdGVtLm56VmFsdWUpIHx8IG51bGw7XG4gICAgbGV0IGxpc3RPZkdyb3VwTGFiZWw6IEFycmF5PHN0cmluZyB8IG51bWJlciB8IFRlbXBsYXRlUmVmPE56U2FmZUFueT4gfCBudWxsPiA9IFtdO1xuICAgIGlmICh0aGlzLmlzUmVhY3RpdmVEcml2ZW4pIHtcbiAgICAgIGxpc3RPZkdyb3VwTGFiZWwgPSBbLi4ubmV3IFNldCh0aGlzLm56T3B0aW9ucy5maWx0ZXIobyA9PiBvLmdyb3VwTGFiZWwpLm1hcChvID0+IG8uZ3JvdXBMYWJlbCEpKV07XG4gICAgfSBlbHNlIHtcbiAgICAgIGlmICh0aGlzLmxpc3RPZk56T3B0aW9uR3JvdXBDb21wb25lbnQpIHtcbiAgICAgICAgbGlzdE9mR3JvdXBMYWJlbCA9IHRoaXMubGlzdE9mTnpPcHRpb25Hcm91cENvbXBvbmVudC5tYXAobyA9PiBvLm56TGFiZWwpO1xuICAgICAgfVxuICAgIH1cbiAgICAvKiogaW5zZXJ0IGdyb3VwIGl0ZW0gKiovXG4gICAgbGlzdE9mR3JvdXBMYWJlbC5mb3JFYWNoKGxhYmVsID0+IHtcbiAgICAgIGNvbnN0IGluZGV4ID0gbGlzdE9mQ29udGFpbmVySXRlbS5maW5kSW5kZXgoaXRlbSA9PiBsYWJlbCA9PT0gaXRlbS5ncm91cExhYmVsKTtcbiAgICAgIGlmIChpbmRleCA+IC0xKSB7XG4gICAgICAgIGNvbnN0IGdyb3VwSXRlbSA9IHsgZ3JvdXBMYWJlbDogbGFiZWwsIHR5cGU6ICdncm91cCcsIGtleTogbGFiZWwgfSBhcyBOelNlbGVjdEl0ZW1JbnRlcmZhY2U7XG4gICAgICAgIGxpc3RPZkNvbnRhaW5lckl0ZW0uc3BsaWNlKGluZGV4LCAwLCBncm91cEl0ZW0pO1xuICAgICAgfVxuICAgIH0pO1xuICAgIHRoaXMubGlzdE9mQ29udGFpbmVySXRlbSA9IFsuLi5saXN0T2ZDb250YWluZXJJdGVtXTtcbiAgICB0aGlzLnVwZGF0ZUNka0Nvbm5lY3RlZE92ZXJsYXlQb3NpdGlvbnMoKTtcbiAgfVxuXG4gIGNsZWFySW5wdXQoKTogdm9pZCB7XG4gICAgdGhpcy5uelNlbGVjdFRvcENvbnRyb2xDb21wb25lbnQuY2xlYXJJbnB1dFZhbHVlKCk7XG4gIH1cblxuICB1cGRhdGVMaXN0T2ZWYWx1ZShsaXN0T2ZWYWx1ZTogTnpTYWZlQW55W10pOiB2b2lkIHtcbiAgICBjb25zdCBjb3ZlcnRMaXN0VG9Nb2RlbCA9IChsaXN0OiBOelNhZmVBbnlbXSwgbW9kZTogTnpTZWxlY3RNb2RlVHlwZSk6IE56U2FmZUFueVtdIHwgTnpTYWZlQW55ID0+IHtcbiAgICAgIGlmIChtb2RlID09PSAnZGVmYXVsdCcpIHtcbiAgICAgICAgaWYgKGxpc3QubGVuZ3RoID4gMCkge1xuICAgICAgICAgIHJldHVybiBsaXN0WzBdO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIHJldHVybiBudWxsO1xuICAgICAgICB9XG4gICAgICB9IGVsc2Uge1xuICAgICAgICByZXR1cm4gbGlzdDtcbiAgICAgIH1cbiAgICB9O1xuICAgIGNvbnN0IG1vZGVsID0gY292ZXJ0TGlzdFRvTW9kZWwobGlzdE9mVmFsdWUsIHRoaXMubnpNb2RlKTtcbiAgICBpZiAodGhpcy52YWx1ZSAhPT0gbW9kZWwpIHtcbiAgICAgIHRoaXMubGlzdE9mVmFsdWUgPSBsaXN0T2ZWYWx1ZTtcbiAgICAgIHRoaXMubGlzdE9mVmFsdWUkLm5leHQobGlzdE9mVmFsdWUpO1xuICAgICAgdGhpcy52YWx1ZSA9IG1vZGVsO1xuICAgICAgdGhpcy5vbkNoYW5nZSh0aGlzLnZhbHVlKTtcbiAgICB9XG4gIH1cblxuICBvblRva2VuU2VwYXJhdGUobGlzdE9mTGFiZWw6IHN0cmluZ1tdKTogdm9pZCB7XG4gICAgY29uc3QgbGlzdE9mTWF0Y2hlZFZhbHVlID0gdGhpcy5saXN0T2ZUYWdBbmRUZW1wbGF0ZUl0ZW1cbiAgICAgIC5maWx0ZXIoaXRlbSA9PiBsaXN0T2ZMYWJlbC5maW5kSW5kZXgobGFiZWwgPT4gbGFiZWwgPT09IGl0ZW0ubnpMYWJlbCkgIT09IC0xKVxuICAgICAgLm1hcChpdGVtID0+IGl0ZW0ubnpWYWx1ZSlcbiAgICAgIC5maWx0ZXIoaXRlbSA9PiB0aGlzLmxpc3RPZlZhbHVlLmZpbmRJbmRleCh2ID0+IHRoaXMuY29tcGFyZVdpdGgodiwgaXRlbSkpID09PSAtMSk7XG4gICAgaWYgKHRoaXMubnpNb2RlID09PSAnbXVsdGlwbGUnKSB7XG4gICAgICB0aGlzLnVwZGF0ZUxpc3RPZlZhbHVlKFsuLi50aGlzLmxpc3RPZlZhbHVlLCAuLi5saXN0T2ZNYXRjaGVkVmFsdWVdKTtcbiAgICB9IGVsc2UgaWYgKHRoaXMubnpNb2RlID09PSAndGFncycpIHtcbiAgICAgIGNvbnN0IGxpc3RPZlVuTWF0Y2hlZExhYmVsID0gbGlzdE9mTGFiZWwuZmlsdGVyKFxuICAgICAgICBsYWJlbCA9PiB0aGlzLmxpc3RPZlRhZ0FuZFRlbXBsYXRlSXRlbS5maW5kSW5kZXgoaXRlbSA9PiBpdGVtLm56TGFiZWwgPT09IGxhYmVsKSA9PT0gLTFcbiAgICAgICk7XG4gICAgICB0aGlzLnVwZGF0ZUxpc3RPZlZhbHVlKFsuLi50aGlzLmxpc3RPZlZhbHVlLCAuLi5saXN0T2ZNYXRjaGVkVmFsdWUsIC4uLmxpc3RPZlVuTWF0Y2hlZExhYmVsXSk7XG4gICAgfVxuICAgIHRoaXMuY2xlYXJJbnB1dCgpO1xuICB9XG5cbiAgb25PdmVybGF5S2V5RG93bihlOiBLZXlib2FyZEV2ZW50KTogdm9pZCB7XG4gICAgaWYgKGUua2V5Q29kZSA9PT0gRVNDQVBFKSB7XG4gICAgICB0aGlzLnNldE9wZW5TdGF0ZShmYWxzZSk7XG4gICAgfVxuICB9XG5cbiAgb25LZXlEb3duKGU6IEtleWJvYXJkRXZlbnQpOiB2b2lkIHtcbiAgICBpZiAodGhpcy5uekRpc2FibGVkKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuICAgIGNvbnN0IGxpc3RPZkZpbHRlcmVkT3B0aW9uTm90RGlzYWJsZWQgPSB0aGlzLmxpc3RPZkNvbnRhaW5lckl0ZW1cbiAgICAgIC5maWx0ZXIoaXRlbSA9PiBpdGVtLnR5cGUgPT09ICdpdGVtJylcbiAgICAgIC5maWx0ZXIoaXRlbSA9PiAhaXRlbS5uekRpc2FibGVkKTtcbiAgICBjb25zdCBhY3RpdmF0ZWRJbmRleCA9IGxpc3RPZkZpbHRlcmVkT3B0aW9uTm90RGlzYWJsZWQuZmluZEluZGV4KGl0ZW0gPT5cbiAgICAgIHRoaXMuY29tcGFyZVdpdGgoaXRlbS5uelZhbHVlLCB0aGlzLmFjdGl2YXRlZFZhbHVlKVxuICAgICk7XG4gICAgc3dpdGNoIChlLmtleUNvZGUpIHtcbiAgICAgIGNhc2UgVVBfQVJST1c6XG4gICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgaWYgKHRoaXMubnpPcGVuKSB7XG4gICAgICAgICAgY29uc3QgcHJlSW5kZXggPSBhY3RpdmF0ZWRJbmRleCA+IDAgPyBhY3RpdmF0ZWRJbmRleCAtIDEgOiBsaXN0T2ZGaWx0ZXJlZE9wdGlvbk5vdERpc2FibGVkLmxlbmd0aCAtIDE7XG4gICAgICAgICAgdGhpcy5hY3RpdmF0ZWRWYWx1ZSA9IGxpc3RPZkZpbHRlcmVkT3B0aW9uTm90RGlzYWJsZWRbcHJlSW5kZXhdLm56VmFsdWU7XG4gICAgICAgIH1cbiAgICAgICAgYnJlYWs7XG4gICAgICBjYXNlIERPV05fQVJST1c6XG4gICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgaWYgKHRoaXMubnpPcGVuKSB7XG4gICAgICAgICAgY29uc3QgbmV4dEluZGV4ID0gYWN0aXZhdGVkSW5kZXggPCBsaXN0T2ZGaWx0ZXJlZE9wdGlvbk5vdERpc2FibGVkLmxlbmd0aCAtIDEgPyBhY3RpdmF0ZWRJbmRleCArIDEgOiAwO1xuICAgICAgICAgIHRoaXMuYWN0aXZhdGVkVmFsdWUgPSBsaXN0T2ZGaWx0ZXJlZE9wdGlvbk5vdERpc2FibGVkW25leHRJbmRleF0ubnpWYWx1ZTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICB0aGlzLnNldE9wZW5TdGF0ZSh0cnVlKTtcbiAgICAgICAgfVxuICAgICAgICBicmVhaztcbiAgICAgIGNhc2UgRU5URVI6XG4gICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgaWYgKHRoaXMubnpPcGVuKSB7XG4gICAgICAgICAgaWYgKGlzTm90TmlsKHRoaXMuYWN0aXZhdGVkVmFsdWUpKSB7XG4gICAgICAgICAgICB0aGlzLm9uSXRlbUNsaWNrKHRoaXMuYWN0aXZhdGVkVmFsdWUpO1xuICAgICAgICAgIH1cbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICB0aGlzLnNldE9wZW5TdGF0ZSh0cnVlKTtcbiAgICAgICAgfVxuICAgICAgICBicmVhaztcbiAgICAgIGNhc2UgU1BBQ0U6XG4gICAgICAgIGlmICghdGhpcy5uek9wZW4pIHtcbiAgICAgICAgICB0aGlzLnNldE9wZW5TdGF0ZSh0cnVlKTtcbiAgICAgICAgICBlLnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgIH1cbiAgICAgICAgYnJlYWs7XG4gICAgICBjYXNlIFRBQjpcbiAgICAgICAgdGhpcy5zZXRPcGVuU3RhdGUoZmFsc2UpO1xuICAgICAgICBicmVhaztcbiAgICAgIGNhc2UgRVNDQVBFOlxuICAgICAgICAvKipcbiAgICAgICAgICogU2tpcCB0aGUgRVNDQVBFIHByb2Nlc3NpbmcsIGl0IHdpbGwgYmUgaGFuZGxlZCBpbiB7QGxpbmsgb25PdmVybGF5S2V5RG93bn0uXG4gICAgICAgICAqL1xuICAgICAgICBicmVhaztcbiAgICAgIGRlZmF1bHQ6XG4gICAgICAgIGlmICghdGhpcy5uek9wZW4pIHtcbiAgICAgICAgICB0aGlzLnNldE9wZW5TdGF0ZSh0cnVlKTtcbiAgICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIHNldE9wZW5TdGF0ZSh2YWx1ZTogYm9vbGVhbik6IHZvaWQge1xuICAgIGlmICh0aGlzLm56T3BlbiAhPT0gdmFsdWUpIHtcbiAgICAgIHRoaXMubnpPcGVuID0gdmFsdWU7XG4gICAgICB0aGlzLm56T3BlbkNoYW5nZS5lbWl0KHZhbHVlKTtcbiAgICAgIHRoaXMub25PcGVuQ2hhbmdlKCk7XG4gICAgICB0aGlzLmNkci5tYXJrRm9yQ2hlY2soKTtcbiAgICB9XG4gIH1cblxuICBvbk9wZW5DaGFuZ2UoKTogdm9pZCB7XG4gICAgdGhpcy51cGRhdGVDZGtDb25uZWN0ZWRPdmVybGF5U3RhdHVzKCk7XG4gICAgdGhpcy5jbGVhcklucHV0KCk7XG4gIH1cblxuICBvbklucHV0VmFsdWVDaGFuZ2UodmFsdWU6IHN0cmluZyk6IHZvaWQge1xuICAgIHRoaXMuc2VhcmNoVmFsdWUgPSB2YWx1ZTtcbiAgICB0aGlzLnVwZGF0ZUxpc3RPZkNvbnRhaW5lckl0ZW0oKTtcbiAgICB0aGlzLm56T25TZWFyY2guZW1pdCh2YWx1ZSk7XG4gICAgdGhpcy51cGRhdGVDZGtDb25uZWN0ZWRPdmVybGF5UG9zaXRpb25zKCk7XG4gIH1cblxuICBvbkNsZWFyU2VsZWN0aW9uKCk6IHZvaWQge1xuICAgIHRoaXMudXBkYXRlTGlzdE9mVmFsdWUoW10pO1xuICB9XG5cbiAgb25DbGlja091dHNpZGUoZXZlbnQ6IE1vdXNlRXZlbnQpOiB2b2lkIHtcbiAgICBpZiAoIXRoaXMuZWxlbWVudFJlZi5uYXRpdmVFbGVtZW50LmNvbnRhaW5zKGV2ZW50LnRhcmdldCkpIHtcbiAgICAgIHRoaXMuc2V0T3BlblN0YXRlKGZhbHNlKTtcbiAgICB9XG4gIH1cblxuICBmb2N1cygpOiB2b2lkIHtcbiAgICB0aGlzLm56U2VsZWN0VG9wQ29udHJvbENvbXBvbmVudC5mb2N1cygpO1xuICB9XG5cbiAgYmx1cigpOiB2b2lkIHtcbiAgICB0aGlzLm56U2VsZWN0VG9wQ29udHJvbENvbXBvbmVudC5ibHVyKCk7XG4gIH1cblxuICBvblBvc2l0aW9uQ2hhbmdlKHBvc2l0aW9uOiBDb25uZWN0ZWRPdmVybGF5UG9zaXRpb25DaGFuZ2UpOiB2b2lkIHtcbiAgICB0aGlzLmRyb3BEb3duUG9zaXRpb24gPSBwb3NpdGlvbi5jb25uZWN0aW9uUGFpci5vcmlnaW5ZO1xuICB9XG5cbiAgdXBkYXRlQ2RrQ29ubmVjdGVkT3ZlcmxheVN0YXR1cygpOiB2b2lkIHtcbiAgICBpZiAodGhpcy5wbGF0Zm9ybS5pc0Jyb3dzZXIgJiYgdGhpcy5vcmlnaW5FbGVtZW50Lm5hdGl2ZUVsZW1lbnQpIHtcbiAgICAgIGNvbnN0IHRyaWdnZXJXaWR0aCA9IHRoaXMudHJpZ2dlcldpZHRoO1xuICAgICAgY2FuY2VsUmVxdWVzdEFuaW1hdGlvbkZyYW1lKHRoaXMucmVxdWVzdElkKTtcbiAgICAgIHRoaXMucmVxdWVzdElkID0gcmVxQW5pbUZyYW1lKCgpID0+IHtcbiAgICAgICAgLy8gQmxpbmsgdHJpZ2dlcnMgc3R5bGUgYW5kIGxheW91dCBwaXBlbGluZXMgYW55dGltZSB0aGUgYGdldEJvdW5kaW5nQ2xpZW50UmVjdCgpYCBpcyBjYWxsZWQsIHdoaWNoIG1heSBjYXVzZSBhXG4gICAgICAgIC8vIGZyYW1lIGRyb3AuIFRoYXQncyB3aHkgaXQncyBzY2hlZHVsZWQgdGhyb3VnaCB0aGUgYHJlcXVlc3RBbmltYXRpb25GcmFtZWAgdG8gdW5sb2FkIHRoZSBjb21wb3NpdGUgdGhyZWFkLlxuICAgICAgICB0aGlzLnRyaWdnZXJXaWR0aCA9IHRoaXMub3JpZ2luRWxlbWVudC5uYXRpdmVFbGVtZW50LmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpLndpZHRoO1xuICAgICAgICBpZiAodHJpZ2dlcldpZHRoICE9PSB0aGlzLnRyaWdnZXJXaWR0aCkge1xuICAgICAgICAgIC8vIFRoZSBgcmVxdWVzdEFuaW1hdGlvbkZyYW1lYCB3aWxsIHRyaWdnZXIgY2hhbmdlIGRldGVjdGlvbiwgYnV0IHdlJ3JlIGluc2lkZSBhbiBgT25QdXNoYCBjb21wb25lbnQgd2hpY2ggd29uJ3QgaGF2ZVxuICAgICAgICAgIC8vIHRoZSBgQ2hlY2tzRW5hYmxlZGAgc3RhdGUuIENhbGxpbmcgYG1hcmtGb3JDaGVjaygpYCB3aWxsIGFsbG93IEFuZ3VsYXIgdG8gcnVuIHRoZSBjaGFuZ2UgZGV0ZWN0aW9uIGZyb20gdGhlIHJvb3QgY29tcG9uZW50XG4gICAgICAgICAgLy8gZG93biB0byB0aGUgYG56LXNlbGVjdGAuIEJ1dCB3ZSdsbCB0cmlnZ2VyIG9ubHkgbG9jYWwgY2hhbmdlIGRldGVjdGlvbiBpZiB0aGUgYHRyaWdnZXJXaWR0aGAgaGFzIGJlZW4gY2hhbmdlZC5cbiAgICAgICAgICB0aGlzLmNkci5kZXRlY3RDaGFuZ2VzKCk7XG4gICAgICAgIH1cbiAgICAgIH0pO1xuICAgIH1cbiAgfVxuXG4gIHVwZGF0ZUNka0Nvbm5lY3RlZE92ZXJsYXlQb3NpdGlvbnMoKTogdm9pZCB7XG4gICAgcmVxQW5pbUZyYW1lKCgpID0+IHtcbiAgICAgIHRoaXMuY2RrQ29ubmVjdGVkT3ZlcmxheT8ub3ZlcmxheVJlZj8udXBkYXRlUG9zaXRpb24oKTtcbiAgICB9KTtcbiAgfVxuXG4gIGNvbnN0cnVjdG9yKFxuICAgIHByaXZhdGUgZGVzdHJveSQ6IE56RGVzdHJveVNlcnZpY2UsXG4gICAgcHVibGljIG56Q29uZmlnU2VydmljZTogTnpDb25maWdTZXJ2aWNlLFxuICAgIHByaXZhdGUgY2RyOiBDaGFuZ2VEZXRlY3RvclJlZixcbiAgICBwcml2YXRlIGVsZW1lbnRSZWY6IEVsZW1lbnRSZWYsXG4gICAgcHJpdmF0ZSBwbGF0Zm9ybTogUGxhdGZvcm0sXG4gICAgcHJpdmF0ZSBmb2N1c01vbml0b3I6IEZvY3VzTW9uaXRvcixcbiAgICBAT3B0aW9uYWwoKSBwcml2YXRlIGRpcmVjdGlvbmFsaXR5OiBEaXJlY3Rpb25hbGl0eSxcbiAgICBASG9zdCgpIEBPcHRpb25hbCgpIHB1YmxpYyBub0FuaW1hdGlvbj86IE56Tm9BbmltYXRpb25EaXJlY3RpdmVcbiAgKSB7fVxuXG4gIHdyaXRlVmFsdWUobW9kZWxWYWx1ZTogTnpTYWZlQW55IHwgTnpTYWZlQW55W10pOiB2b2lkIHtcbiAgICAvKiogaHR0cHM6Ly9naXRodWIuY29tL2FuZ3VsYXIvYW5ndWxhci9pc3N1ZXMvMTQ5ODggKiovXG4gICAgaWYgKHRoaXMudmFsdWUgIT09IG1vZGVsVmFsdWUpIHtcbiAgICAgIHRoaXMudmFsdWUgPSBtb2RlbFZhbHVlO1xuICAgICAgY29uc3QgY292ZXJ0TW9kZWxUb0xpc3QgPSAobW9kZWw6IE56U2FmZUFueVtdIHwgTnpTYWZlQW55LCBtb2RlOiBOelNlbGVjdE1vZGVUeXBlKTogTnpTYWZlQW55W10gPT4ge1xuICAgICAgICBpZiAobW9kZWwgPT09IG51bGwgfHwgbW9kZWwgPT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgIHJldHVybiBbXTtcbiAgICAgICAgfSBlbHNlIGlmIChtb2RlID09PSAnZGVmYXVsdCcpIHtcbiAgICAgICAgICByZXR1cm4gW21vZGVsXTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICByZXR1cm4gbW9kZWw7XG4gICAgICAgIH1cbiAgICAgIH07XG4gICAgICBjb25zdCBsaXN0T2ZWYWx1ZSA9IGNvdmVydE1vZGVsVG9MaXN0KG1vZGVsVmFsdWUsIHRoaXMubnpNb2RlKTtcbiAgICAgIHRoaXMubGlzdE9mVmFsdWUgPSBsaXN0T2ZWYWx1ZTtcbiAgICAgIHRoaXMubGlzdE9mVmFsdWUkLm5leHQobGlzdE9mVmFsdWUpO1xuICAgICAgdGhpcy5jZHIubWFya0ZvckNoZWNrKCk7XG4gICAgfVxuICB9XG5cbiAgcmVnaXN0ZXJPbkNoYW5nZShmbjogT25DaGFuZ2VUeXBlKTogdm9pZCB7XG4gICAgdGhpcy5vbkNoYW5nZSA9IGZuO1xuICB9XG5cbiAgcmVnaXN0ZXJPblRvdWNoZWQoZm46IE9uVG91Y2hlZFR5cGUpOiB2b2lkIHtcbiAgICB0aGlzLm9uVG91Y2hlZCA9IGZuO1xuICB9XG5cbiAgc2V0RGlzYWJsZWRTdGF0ZShkaXNhYmxlZDogYm9vbGVhbik6IHZvaWQge1xuICAgIHRoaXMubnpEaXNhYmxlZCA9IGRpc2FibGVkO1xuICAgIGlmIChkaXNhYmxlZCkge1xuICAgICAgdGhpcy5zZXRPcGVuU3RhdGUoZmFsc2UpO1xuICAgIH1cbiAgICB0aGlzLmNkci5tYXJrRm9yQ2hlY2soKTtcbiAgfVxuXG4gIG5nT25DaGFuZ2VzKGNoYW5nZXM6IFNpbXBsZUNoYW5nZXMpOiB2b2lkIHtcbiAgICBjb25zdCB7IG56T3BlbiwgbnpEaXNhYmxlZCwgbnpPcHRpb25zIH0gPSBjaGFuZ2VzO1xuICAgIGlmIChuek9wZW4pIHtcbiAgICAgIHRoaXMub25PcGVuQ2hhbmdlKCk7XG4gICAgfVxuICAgIGlmIChuekRpc2FibGVkICYmIHRoaXMubnpEaXNhYmxlZCkge1xuICAgICAgdGhpcy5zZXRPcGVuU3RhdGUoZmFsc2UpO1xuICAgIH1cbiAgICBpZiAobnpPcHRpb25zKSB7XG4gICAgICB0aGlzLmlzUmVhY3RpdmVEcml2ZW4gPSB0cnVlO1xuICAgICAgY29uc3QgbGlzdE9mT3B0aW9ucyA9IHRoaXMubnpPcHRpb25zIHx8IFtdO1xuICAgICAgY29uc3QgbGlzdE9mVHJhbnNmb3JtZWRJdGVtID0gbGlzdE9mT3B0aW9ucy5tYXAoaXRlbSA9PiB7XG4gICAgICAgIHJldHVybiB7XG4gICAgICAgICAgdGVtcGxhdGU6IGl0ZW0ubGFiZWwgaW5zdGFuY2VvZiBUZW1wbGF0ZVJlZiA/IGl0ZW0ubGFiZWwgOiBudWxsLFxuICAgICAgICAgIG56TGFiZWw6IHR5cGVvZiBpdGVtLmxhYmVsID09PSAnc3RyaW5nJyB8fCB0eXBlb2YgaXRlbS5sYWJlbCA9PT0gJ251bWJlcicgPyBpdGVtLmxhYmVsIDogbnVsbCxcbiAgICAgICAgICBuelZhbHVlOiBpdGVtLnZhbHVlLFxuICAgICAgICAgIG56RGlzYWJsZWQ6IGl0ZW0uZGlzYWJsZWQgfHwgZmFsc2UsXG4gICAgICAgICAgbnpIaWRlOiBpdGVtLmhpZGUgfHwgZmFsc2UsXG4gICAgICAgICAgbnpDdXN0b21Db250ZW50OiBpdGVtLmxhYmVsIGluc3RhbmNlb2YgVGVtcGxhdGVSZWYsXG4gICAgICAgICAgZ3JvdXBMYWJlbDogaXRlbS5ncm91cExhYmVsIHx8IG51bGwsXG4gICAgICAgICAgdHlwZTogJ2l0ZW0nLFxuICAgICAgICAgIGtleTogaXRlbS52YWx1ZVxuICAgICAgICB9O1xuICAgICAgfSk7XG4gICAgICB0aGlzLmxpc3RPZlRlbXBsYXRlSXRlbSQubmV4dChsaXN0T2ZUcmFuc2Zvcm1lZEl0ZW0pO1xuICAgIH1cbiAgfVxuXG4gIG5nT25Jbml0KCk6IHZvaWQge1xuICAgIHRoaXMuZm9jdXNNb25pdG9yXG4gICAgICAubW9uaXRvcih0aGlzLmVsZW1lbnRSZWYsIHRydWUpXG4gICAgICAucGlwZSh0YWtlVW50aWwodGhpcy5kZXN0cm95JCkpXG4gICAgICAuc3Vic2NyaWJlKGZvY3VzT3JpZ2luID0+IHtcbiAgICAgICAgaWYgKCFmb2N1c09yaWdpbikge1xuICAgICAgICAgIHRoaXMuZm9jdXNlZCA9IGZhbHNlO1xuICAgICAgICAgIHRoaXMuY2RyLm1hcmtGb3JDaGVjaygpO1xuICAgICAgICAgIHRoaXMubnpCbHVyLmVtaXQoKTtcbiAgICAgICAgICBQcm9taXNlLnJlc29sdmUoKS50aGVuKCgpID0+IHtcbiAgICAgICAgICAgIHRoaXMub25Ub3VjaGVkKCk7XG4gICAgICAgICAgfSk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgdGhpcy5mb2N1c2VkID0gdHJ1ZTtcbiAgICAgICAgICB0aGlzLmNkci5tYXJrRm9yQ2hlY2soKTtcbiAgICAgICAgICB0aGlzLm56Rm9jdXMuZW1pdCgpO1xuICAgICAgICB9XG4gICAgICB9KTtcbiAgICBjb21iaW5lTGF0ZXN0KFt0aGlzLmxpc3RPZlZhbHVlJCwgdGhpcy5saXN0T2ZUZW1wbGF0ZUl0ZW0kXSlcbiAgICAgIC5waXBlKHRha2VVbnRpbCh0aGlzLmRlc3Ryb3kkKSlcbiAgICAgIC5zdWJzY3JpYmUoKFtsaXN0T2ZTZWxlY3RlZFZhbHVlLCBsaXN0T2ZUZW1wbGF0ZUl0ZW1dKSA9PiB7XG4gICAgICAgIGNvbnN0IGxpc3RPZlRhZ0l0ZW0gPSBsaXN0T2ZTZWxlY3RlZFZhbHVlXG4gICAgICAgICAgLmZpbHRlcigoKSA9PiB0aGlzLm56TW9kZSA9PT0gJ3RhZ3MnKVxuICAgICAgICAgIC5maWx0ZXIodmFsdWUgPT4gbGlzdE9mVGVtcGxhdGVJdGVtLmZpbmRJbmRleChvID0+IHRoaXMuY29tcGFyZVdpdGgoby5uelZhbHVlLCB2YWx1ZSkpID09PSAtMSlcbiAgICAgICAgICAubWFwKFxuICAgICAgICAgICAgdmFsdWUgPT4gdGhpcy5saXN0T2ZUb3BJdGVtLmZpbmQobyA9PiB0aGlzLmNvbXBhcmVXaXRoKG8ubnpWYWx1ZSwgdmFsdWUpKSB8fCB0aGlzLmdlbmVyYXRlVGFnSXRlbSh2YWx1ZSlcbiAgICAgICAgICApO1xuICAgICAgICB0aGlzLmxpc3RPZlRhZ0FuZFRlbXBsYXRlSXRlbSA9IFsuLi5saXN0T2ZUZW1wbGF0ZUl0ZW0sIC4uLmxpc3RPZlRhZ0l0ZW1dO1xuICAgICAgICB0aGlzLmxpc3RPZlRvcEl0ZW0gPSB0aGlzLmxpc3RPZlZhbHVlXG4gICAgICAgICAgLm1hcChcbiAgICAgICAgICAgIHYgPT5cbiAgICAgICAgICAgICAgWy4uLnRoaXMubGlzdE9mVGFnQW5kVGVtcGxhdGVJdGVtLCAuLi50aGlzLmxpc3RPZlRvcEl0ZW1dLmZpbmQoaXRlbSA9PiB0aGlzLmNvbXBhcmVXaXRoKHYsIGl0ZW0ubnpWYWx1ZSkpIVxuICAgICAgICAgIClcbiAgICAgICAgICAuZmlsdGVyKGl0ZW0gPT4gISFpdGVtKTtcbiAgICAgICAgdGhpcy51cGRhdGVMaXN0T2ZDb250YWluZXJJdGVtKCk7XG4gICAgICB9KTtcblxuICAgIHRoaXMuZGlyZWN0aW9uYWxpdHkuY2hhbmdlPy5waXBlKHRha2VVbnRpbCh0aGlzLmRlc3Ryb3kkKSkuc3Vic2NyaWJlKChkaXJlY3Rpb246IERpcmVjdGlvbikgPT4ge1xuICAgICAgdGhpcy5kaXIgPSBkaXJlY3Rpb247XG4gICAgICB0aGlzLmNkci5kZXRlY3RDaGFuZ2VzKCk7XG4gICAgfSk7XG5cbiAgICB0aGlzLm56Q29uZmlnU2VydmljZVxuICAgICAgLmdldENvbmZpZ0NoYW5nZUV2ZW50Rm9yQ29tcG9uZW50KCdzZWxlY3QnKVxuICAgICAgLnBpcGUodGFrZVVudGlsKHRoaXMuZGVzdHJveSQpKVxuICAgICAgLnN1YnNjcmliZSgoKSA9PiB7XG4gICAgICAgIHRoaXMuY2RyLm1hcmtGb3JDaGVjaygpO1xuICAgICAgfSk7XG5cbiAgICB0aGlzLmRpciA9IHRoaXMuZGlyZWN0aW9uYWxpdHkudmFsdWU7XG4gIH1cblxuICBuZ0FmdGVyQ29udGVudEluaXQoKTogdm9pZCB7XG4gICAgaWYgKCF0aGlzLmlzUmVhY3RpdmVEcml2ZW4pIHtcbiAgICAgIG1lcmdlKHRoaXMubGlzdE9mTnpPcHRpb25Hcm91cENvbXBvbmVudC5jaGFuZ2VzLCB0aGlzLmxpc3RPZk56T3B0aW9uQ29tcG9uZW50LmNoYW5nZXMpXG4gICAgICAgIC5waXBlKFxuICAgICAgICAgIHN0YXJ0V2l0aCh0cnVlKSxcbiAgICAgICAgICBzd2l0Y2hNYXAoKCkgPT5cbiAgICAgICAgICAgIG1lcmdlKFxuICAgICAgICAgICAgICAuLi5bXG4gICAgICAgICAgICAgICAgdGhpcy5saXN0T2ZOek9wdGlvbkNvbXBvbmVudC5jaGFuZ2VzLFxuICAgICAgICAgICAgICAgIHRoaXMubGlzdE9mTnpPcHRpb25Hcm91cENvbXBvbmVudC5jaGFuZ2VzLFxuICAgICAgICAgICAgICAgIC4uLnRoaXMubGlzdE9mTnpPcHRpb25Db21wb25lbnQubWFwKG9wdGlvbiA9PiBvcHRpb24uY2hhbmdlcyksXG4gICAgICAgICAgICAgICAgLi4udGhpcy5saXN0T2ZOek9wdGlvbkdyb3VwQ29tcG9uZW50Lm1hcChvcHRpb24gPT4gb3B0aW9uLmNoYW5nZXMpXG4gICAgICAgICAgICAgIF1cbiAgICAgICAgICAgICkucGlwZShzdGFydFdpdGgodHJ1ZSkpXG4gICAgICAgICAgKSxcbiAgICAgICAgICB0YWtlVW50aWwodGhpcy5kZXN0cm95JClcbiAgICAgICAgKVxuICAgICAgICAuc3Vic2NyaWJlKCgpID0+IHtcbiAgICAgICAgICBjb25zdCBsaXN0T2ZPcHRpb25JbnRlcmZhY2UgPSB0aGlzLmxpc3RPZk56T3B0aW9uQ29tcG9uZW50LnRvQXJyYXkoKS5tYXAoaXRlbSA9PiB7XG4gICAgICAgICAgICBjb25zdCB7IHRlbXBsYXRlLCBuekxhYmVsLCBuelZhbHVlLCBuekRpc2FibGVkLCBuekhpZGUsIG56Q3VzdG9tQ29udGVudCwgZ3JvdXBMYWJlbCB9ID0gaXRlbTtcbiAgICAgICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICAgIHRlbXBsYXRlLFxuICAgICAgICAgICAgICBuekxhYmVsLFxuICAgICAgICAgICAgICBuelZhbHVlLFxuICAgICAgICAgICAgICBuekRpc2FibGVkLFxuICAgICAgICAgICAgICBuekhpZGUsXG4gICAgICAgICAgICAgIG56Q3VzdG9tQ29udGVudCxcbiAgICAgICAgICAgICAgZ3JvdXBMYWJlbCxcbiAgICAgICAgICAgICAgdHlwZTogJ2l0ZW0nLFxuICAgICAgICAgICAgICBrZXk6IG56VmFsdWVcbiAgICAgICAgICAgIH07XG4gICAgICAgICAgfSk7XG4gICAgICAgICAgdGhpcy5saXN0T2ZUZW1wbGF0ZUl0ZW0kLm5leHQobGlzdE9mT3B0aW9uSW50ZXJmYWNlKTtcbiAgICAgICAgICB0aGlzLmNkci5tYXJrRm9yQ2hlY2soKTtcbiAgICAgICAgfSk7XG4gICAgfVxuICB9XG4gIG5nT25EZXN0cm95KCk6IHZvaWQge1xuICAgIGNhbmNlbFJlcXVlc3RBbmltYXRpb25GcmFtZSh0aGlzLnJlcXVlc3RJZCk7XG4gICAgdGhpcy5mb2N1c01vbml0b3Iuc3RvcE1vbml0b3JpbmcodGhpcy5lbGVtZW50UmVmKTtcbiAgfVxufVxuIl19