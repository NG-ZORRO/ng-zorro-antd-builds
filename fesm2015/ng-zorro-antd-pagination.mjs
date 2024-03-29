import { __decorate } from 'tslib';
import * as i0 from '@angular/core';
import { EventEmitter, Component, ViewEncapsulation, ChangeDetectionStrategy, Input, Output, Optional, ViewChild, NgModule } from '@angular/core';
import { Subject, ReplaySubject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import * as i3$1 from 'ng-zorro-antd/core/config';
import { WithConfig } from 'ng-zorro-antd/core/config';
import * as i2$1 from 'ng-zorro-antd/core/services';
import { gridResponsiveMap, NzBreakpointEnum } from 'ng-zorro-antd/core/services';
import { toNumber, InputBoolean, InputNumber } from 'ng-zorro-antd/core/util';
import * as i1$3 from 'ng-zorro-antd/i18n';
import { NzI18nModule } from 'ng-zorro-antd/i18n';
import * as i1$1 from '@angular/cdk/bidi';
import { BidiModule } from '@angular/cdk/bidi';
import * as i1 from '@angular/common';
import { CommonModule } from '@angular/common';
import * as i2 from 'ng-zorro-antd/icon';
import { NzIconModule } from 'ng-zorro-antd/icon';
import * as i1$2 from 'ng-zorro-antd/select';
import { NzSelectModule } from 'ng-zorro-antd/select';
import * as i3 from '@angular/forms';
import { FormsModule } from '@angular/forms';

/* eslint-disable */
class NzPaginationItemComponent {
    constructor() {
        this.active = false;
        this.index = null;
        this.disabled = false;
        this.direction = 'ltr';
        this.type = null;
        this.itemRender = null;
        this.diffIndex = new EventEmitter();
        this.gotoIndex = new EventEmitter();
        this.title = null;
    }
    clickItem() {
        if (!this.disabled) {
            if (this.type === 'page') {
                this.gotoIndex.emit(this.index);
            }
            else {
                this.diffIndex.emit({
                    next: 1,
                    prev: -1,
                    prev_5: -5,
                    next_5: 5
                }[this.type]);
            }
        }
    }
    ngOnChanges(changes) {
        var _a, _b, _c, _d;
        const { locale, index, type } = changes;
        if (locale || index || type) {
            this.title = {
                page: `${this.index}`,
                next: (_a = this.locale) === null || _a === void 0 ? void 0 : _a.next_page,
                prev: (_b = this.locale) === null || _b === void 0 ? void 0 : _b.prev_page,
                prev_5: (_c = this.locale) === null || _c === void 0 ? void 0 : _c.prev_5,
                next_5: (_d = this.locale) === null || _d === void 0 ? void 0 : _d.next_5
            }[this.type];
        }
    }
}
NzPaginationItemComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.1.2", ngImport: i0, type: NzPaginationItemComponent, deps: [], target: i0.ɵɵFactoryTarget.Component });
NzPaginationItemComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "13.1.2", type: NzPaginationItemComponent, selector: "li[nz-pagination-item]", inputs: { active: "active", locale: "locale", index: "index", disabled: "disabled", direction: "direction", type: "type", itemRender: "itemRender" }, outputs: { diffIndex: "diffIndex", gotoIndex: "gotoIndex" }, host: { listeners: { "click": "clickItem()" }, properties: { "class.ant-pagination-prev": "type === 'prev'", "class.ant-pagination-next": "type === 'next'", "class.ant-pagination-item": "type === 'page'", "class.ant-pagination-jump-prev": "type === 'prev_5'", "class.ant-pagination-jump-prev-custom-icon": "type === 'prev_5'", "class.ant-pagination-jump-next": "type === 'next_5'", "class.ant-pagination-jump-next-custom-icon": "type === 'next_5'", "class.ant-pagination-disabled": "disabled", "class.ant-pagination-item-active": "active", "attr.title": "title" } }, usesOnChanges: true, ngImport: i0, template: `
    <ng-template #renderItemTemplate let-type let-page="page">
      <ng-container [ngSwitch]="type">
        <a *ngSwitchCase="'page'">{{ page }}</a>
        <button type="button" [disabled]="disabled" class="ant-pagination-item-link" *ngSwitchCase="'prev'">
          <ng-container [ngSwitch]="direction">
            <i *ngSwitchCase="'rtl'" nz-icon nzType="right"></i>
            <i *ngSwitchDefault nz-icon nzType="left"></i>
          </ng-container>
        </button>
        <button type="button" [disabled]="disabled" class="ant-pagination-item-link" *ngSwitchCase="'next'">
          <ng-container [ngSwitch]="direction">
            <i *ngSwitchCase="'rtl'" nz-icon nzType="left"></i>
            <i *ngSwitchDefault nz-icon nzType="right"></i>
          </ng-container>
        </button>
        <ng-container *ngSwitchDefault>
          <a class="ant-pagination-item-link" [ngSwitch]="type">
            <div class="ant-pagination-item-container" *ngSwitchDefault>
              <ng-container [ngSwitch]="type">
                <ng-container *ngSwitchCase="'prev_5'" [ngSwitch]="direction">
                  <i *ngSwitchCase="'rtl'" nz-icon nzType="double-right" class="ant-pagination-item-link-icon"></i>
                  <i *ngSwitchDefault nz-icon nzType="double-left" class="ant-pagination-item-link-icon"></i>
                </ng-container>
                <ng-container *ngSwitchCase="'next_5'" [ngSwitch]="direction">
                  <i *ngSwitchCase="'rtl'" nz-icon nzType="double-left" class="ant-pagination-item-link-icon"></i>
                  <i *ngSwitchDefault nz-icon nzType="double-right" class="ant-pagination-item-link-icon"></i>
                </ng-container>
              </ng-container>
              <span class="ant-pagination-item-ellipsis">•••</span>
            </div>
          </a>
        </ng-container>
      </ng-container>
    </ng-template>
    <ng-template
      [ngTemplateOutlet]="itemRender || renderItemTemplate"
      [ngTemplateOutletContext]="{ $implicit: type, page: index }"
    ></ng-template>
  `, isInline: true, directives: [{ type: i1.NgSwitch, selector: "[ngSwitch]", inputs: ["ngSwitch"] }, { type: i1.NgSwitchCase, selector: "[ngSwitchCase]", inputs: ["ngSwitchCase"] }, { type: i2.NzIconDirective, selector: "[nz-icon]", inputs: ["nzSpin", "nzRotate", "nzType", "nzTheme", "nzTwotoneColor", "nzIconfont"], exportAs: ["nzIcon"] }, { type: i1.NgSwitchDefault, selector: "[ngSwitchDefault]" }, { type: i1.NgTemplateOutlet, selector: "[ngTemplateOutlet]", inputs: ["ngTemplateOutletContext", "ngTemplateOutlet"] }], changeDetection: i0.ChangeDetectionStrategy.OnPush, encapsulation: i0.ViewEncapsulation.None });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.1.2", ngImport: i0, type: NzPaginationItemComponent, decorators: [{
            type: Component,
            args: [{
                    selector: 'li[nz-pagination-item]',
                    preserveWhitespaces: false,
                    encapsulation: ViewEncapsulation.None,
                    changeDetection: ChangeDetectionStrategy.OnPush,
                    template: `
    <ng-template #renderItemTemplate let-type let-page="page">
      <ng-container [ngSwitch]="type">
        <a *ngSwitchCase="'page'">{{ page }}</a>
        <button type="button" [disabled]="disabled" class="ant-pagination-item-link" *ngSwitchCase="'prev'">
          <ng-container [ngSwitch]="direction">
            <i *ngSwitchCase="'rtl'" nz-icon nzType="right"></i>
            <i *ngSwitchDefault nz-icon nzType="left"></i>
          </ng-container>
        </button>
        <button type="button" [disabled]="disabled" class="ant-pagination-item-link" *ngSwitchCase="'next'">
          <ng-container [ngSwitch]="direction">
            <i *ngSwitchCase="'rtl'" nz-icon nzType="left"></i>
            <i *ngSwitchDefault nz-icon nzType="right"></i>
          </ng-container>
        </button>
        <ng-container *ngSwitchDefault>
          <a class="ant-pagination-item-link" [ngSwitch]="type">
            <div class="ant-pagination-item-container" *ngSwitchDefault>
              <ng-container [ngSwitch]="type">
                <ng-container *ngSwitchCase="'prev_5'" [ngSwitch]="direction">
                  <i *ngSwitchCase="'rtl'" nz-icon nzType="double-right" class="ant-pagination-item-link-icon"></i>
                  <i *ngSwitchDefault nz-icon nzType="double-left" class="ant-pagination-item-link-icon"></i>
                </ng-container>
                <ng-container *ngSwitchCase="'next_5'" [ngSwitch]="direction">
                  <i *ngSwitchCase="'rtl'" nz-icon nzType="double-left" class="ant-pagination-item-link-icon"></i>
                  <i *ngSwitchDefault nz-icon nzType="double-right" class="ant-pagination-item-link-icon"></i>
                </ng-container>
              </ng-container>
              <span class="ant-pagination-item-ellipsis">•••</span>
            </div>
          </a>
        </ng-container>
      </ng-container>
    </ng-template>
    <ng-template
      [ngTemplateOutlet]="itemRender || renderItemTemplate"
      [ngTemplateOutletContext]="{ $implicit: type, page: index }"
    ></ng-template>
  `,
                    host: {
                        '[class.ant-pagination-prev]': `type === 'prev'`,
                        '[class.ant-pagination-next]': `type === 'next'`,
                        '[class.ant-pagination-item]': `type === 'page'`,
                        '[class.ant-pagination-jump-prev]': `type === 'prev_5'`,
                        '[class.ant-pagination-jump-prev-custom-icon]': `type === 'prev_5'`,
                        '[class.ant-pagination-jump-next]': `type === 'next_5'`,
                        '[class.ant-pagination-jump-next-custom-icon]': `type === 'next_5'`,
                        '[class.ant-pagination-disabled]': 'disabled',
                        '[class.ant-pagination-item-active]': 'active',
                        '[attr.title]': 'title',
                        '(click)': 'clickItem()'
                    }
                }]
        }], propDecorators: { active: [{
                type: Input
            }], locale: [{
                type: Input
            }], index: [{
                type: Input
            }], disabled: [{
                type: Input
            }], direction: [{
                type: Input
            }], type: [{
                type: Input
            }], itemRender: [{
                type: Input
            }], diffIndex: [{
                type: Output
            }], gotoIndex: [{
                type: Output
            }] } });

class NzPaginationSimpleComponent {
    constructor(cdr, renderer, elementRef, directionality) {
        this.cdr = cdr;
        this.renderer = renderer;
        this.elementRef = elementRef;
        this.directionality = directionality;
        this.itemRender = null;
        this.disabled = false;
        this.total = 0;
        this.pageIndex = 1;
        this.pageSize = 10;
        this.pageIndexChange = new EventEmitter();
        this.lastIndex = 0;
        this.isFirstIndex = false;
        this.isLastIndex = false;
        this.dir = 'ltr';
        this.destroy$ = new Subject();
        renderer.removeChild(renderer.parentNode(elementRef.nativeElement), elementRef.nativeElement);
    }
    ngOnInit() {
        var _a;
        (_a = this.directionality.change) === null || _a === void 0 ? void 0 : _a.pipe(takeUntil(this.destroy$)).subscribe((direction) => {
            this.dir = direction;
            this.updateRtlStyle();
            this.cdr.detectChanges();
        });
        this.dir = this.directionality.value;
        this.updateRtlStyle();
    }
    updateRtlStyle() {
        if (this.dir === 'rtl') {
            this.renderer.addClass(this.elementRef.nativeElement, 'ant-pagination-rtl');
        }
        else {
            this.renderer.removeClass(this.elementRef.nativeElement, 'ant-pagination-rtl');
        }
    }
    ngOnDestroy() {
        this.destroy$.next();
        this.destroy$.complete();
    }
    jumpToPageViaInput($event) {
        const target = $event.target;
        const index = toNumber(target.value, this.pageIndex);
        this.onPageIndexChange(index);
        target.value = `${this.pageIndex}`;
    }
    prePage() {
        this.onPageIndexChange(this.pageIndex - 1);
    }
    nextPage() {
        this.onPageIndexChange(this.pageIndex + 1);
    }
    onPageIndexChange(index) {
        this.pageIndexChange.next(index);
    }
    updateBindingValue() {
        this.lastIndex = Math.ceil(this.total / this.pageSize);
        this.isFirstIndex = this.pageIndex === 1;
        this.isLastIndex = this.pageIndex === this.lastIndex;
    }
    ngOnChanges(changes) {
        const { pageIndex, total, pageSize } = changes;
        if (pageIndex || total || pageSize) {
            this.updateBindingValue();
        }
    }
}
NzPaginationSimpleComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.1.2", ngImport: i0, type: NzPaginationSimpleComponent, deps: [{ token: i0.ChangeDetectorRef }, { token: i0.Renderer2 }, { token: i0.ElementRef }, { token: i1$1.Directionality, optional: true }], target: i0.ɵɵFactoryTarget.Component });
NzPaginationSimpleComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "13.1.2", type: NzPaginationSimpleComponent, selector: "nz-pagination-simple", inputs: { itemRender: "itemRender", disabled: "disabled", locale: "locale", total: "total", pageIndex: "pageIndex", pageSize: "pageSize" }, outputs: { pageIndexChange: "pageIndexChange" }, viewQueries: [{ propertyName: "template", first: true, predicate: ["containerTemplate"], descendants: true, static: true }], usesOnChanges: true, ngImport: i0, template: `
    <ng-template #containerTemplate>
      <li
        nz-pagination-item
        [attr.title]="locale.prev_page"
        [disabled]="isFirstIndex"
        [direction]="dir"
        (click)="prePage()"
        type="prev"
        [itemRender]="itemRender"
      ></li>
      <li [attr.title]="pageIndex + '/' + lastIndex" class="ant-pagination-simple-pager">
        <input [disabled]="disabled" [value]="pageIndex" (keydown.enter)="jumpToPageViaInput($event)" size="3" />
        <span class="ant-pagination-slash">/</span>
        {{ lastIndex }}
      </li>
      <li
        nz-pagination-item
        [attr.title]="locale?.next_page"
        [disabled]="isLastIndex"
        [direction]="dir"
        (click)="nextPage()"
        type="next"
        [itemRender]="itemRender"
      ></li>
    </ng-template>
  `, isInline: true, components: [{ type: NzPaginationItemComponent, selector: "li[nz-pagination-item]", inputs: ["active", "locale", "index", "disabled", "direction", "type", "itemRender"], outputs: ["diffIndex", "gotoIndex"] }], changeDetection: i0.ChangeDetectionStrategy.OnPush, encapsulation: i0.ViewEncapsulation.None });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.1.2", ngImport: i0, type: NzPaginationSimpleComponent, decorators: [{
            type: Component,
            args: [{
                    selector: 'nz-pagination-simple',
                    preserveWhitespaces: false,
                    encapsulation: ViewEncapsulation.None,
                    changeDetection: ChangeDetectionStrategy.OnPush,
                    template: `
    <ng-template #containerTemplate>
      <li
        nz-pagination-item
        [attr.title]="locale.prev_page"
        [disabled]="isFirstIndex"
        [direction]="dir"
        (click)="prePage()"
        type="prev"
        [itemRender]="itemRender"
      ></li>
      <li [attr.title]="pageIndex + '/' + lastIndex" class="ant-pagination-simple-pager">
        <input [disabled]="disabled" [value]="pageIndex" (keydown.enter)="jumpToPageViaInput($event)" size="3" />
        <span class="ant-pagination-slash">/</span>
        {{ lastIndex }}
      </li>
      <li
        nz-pagination-item
        [attr.title]="locale?.next_page"
        [disabled]="isLastIndex"
        [direction]="dir"
        (click)="nextPage()"
        type="next"
        [itemRender]="itemRender"
      ></li>
    </ng-template>
  `
                }]
        }], ctorParameters: function () {
        return [{ type: i0.ChangeDetectorRef }, { type: i0.Renderer2 }, { type: i0.ElementRef }, { type: i1$1.Directionality, decorators: [{
                        type: Optional
                    }] }];
    }, propDecorators: { template: [{
                type: ViewChild,
                args: ['containerTemplate', { static: true }]
            }], itemRender: [{
                type: Input
            }], disabled: [{
                type: Input
            }], locale: [{
                type: Input
            }], total: [{
                type: Input
            }], pageIndex: [{
                type: Input
            }], pageSize: [{
                type: Input
            }], pageIndexChange: [{
                type: Output
            }] } });

/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */
class NzPaginationOptionsComponent {
    constructor() {
        this.nzSize = 'default';
        this.disabled = false;
        this.showSizeChanger = false;
        this.showQuickJumper = false;
        this.total = 0;
        this.pageIndex = 1;
        this.pageSize = 10;
        this.pageSizeOptions = [];
        this.pageIndexChange = new EventEmitter();
        this.pageSizeChange = new EventEmitter();
        this.listOfPageSizeOption = [];
    }
    onPageSizeChange(size) {
        if (this.pageSize !== size) {
            this.pageSizeChange.next(size);
        }
    }
    jumpToPageViaInput($event) {
        const target = $event.target;
        const index = Math.floor(toNumber(target.value, this.pageIndex));
        this.pageIndexChange.next(index);
        target.value = '';
    }
    trackByOption(_, option) {
        return option.value;
    }
    ngOnChanges(changes) {
        const { pageSize, pageSizeOptions, locale } = changes;
        if (pageSize || pageSizeOptions || locale) {
            this.listOfPageSizeOption = [...new Set([...this.pageSizeOptions, this.pageSize])].map(item => ({
                value: item,
                label: `${item} ${this.locale.items_per_page}`
            }));
        }
    }
}
NzPaginationOptionsComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.1.2", ngImport: i0, type: NzPaginationOptionsComponent, deps: [], target: i0.ɵɵFactoryTarget.Component });
NzPaginationOptionsComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "13.1.2", type: NzPaginationOptionsComponent, selector: "div[nz-pagination-options]", inputs: { nzSize: "nzSize", disabled: "disabled", showSizeChanger: "showSizeChanger", showQuickJumper: "showQuickJumper", locale: "locale", total: "total", pageIndex: "pageIndex", pageSize: "pageSize", pageSizeOptions: "pageSizeOptions" }, outputs: { pageIndexChange: "pageIndexChange", pageSizeChange: "pageSizeChange" }, host: { classAttribute: "ant-pagination-options" }, usesOnChanges: true, ngImport: i0, template: `
    <nz-select
      class="ant-pagination-options-size-changer"
      *ngIf="showSizeChanger"
      [nzDisabled]="disabled"
      [nzSize]="nzSize"
      [ngModel]="pageSize"
      (ngModelChange)="onPageSizeChange($event)"
    >
      <nz-option
        *ngFor="let option of listOfPageSizeOption; trackBy: trackByOption"
        [nzLabel]="option.label"
        [nzValue]="option.value"
      ></nz-option>
    </nz-select>
    <div class="ant-pagination-options-quick-jumper" *ngIf="showQuickJumper">
      {{ locale.jump_to }}
      <input [disabled]="disabled" (keydown.enter)="jumpToPageViaInput($event)" />
      {{ locale.page }}
    </div>
  `, isInline: true, components: [{ type: i1$2.NzSelectComponent, selector: "nz-select", inputs: ["nzId", "nzSize", "nzOptionHeightPx", "nzOptionOverflowSize", "nzDropdownClassName", "nzDropdownMatchSelectWidth", "nzDropdownStyle", "nzNotFoundContent", "nzPlaceHolder", "nzMaxTagCount", "nzDropdownRender", "nzCustomTemplate", "nzSuffixIcon", "nzClearIcon", "nzRemoveIcon", "nzMenuItemSelectedIcon", "nzTokenSeparators", "nzMaxTagPlaceholder", "nzMaxMultipleCount", "nzMode", "nzFilterOption", "compareWith", "nzAllowClear", "nzBorderless", "nzShowSearch", "nzLoading", "nzAutoFocus", "nzAutoClearSearchValue", "nzServerSearch", "nzDisabled", "nzOpen", "nzBackdrop", "nzOptions", "nzShowArrow"], outputs: ["nzOnSearch", "nzScrollToBottom", "nzOpenChange", "nzBlur", "nzFocus"], exportAs: ["nzSelect"] }, { type: i1$2.NzOptionComponent, selector: "nz-option", inputs: ["nzLabel", "nzValue", "nzDisabled", "nzHide", "nzCustomContent"], exportAs: ["nzOption"] }], directives: [{ type: i1.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { type: i3.NgControlStatus, selector: "[formControlName],[ngModel],[formControl]" }, { type: i3.NgModel, selector: "[ngModel]:not([formControlName]):not([formControl])", inputs: ["name", "disabled", "ngModel", "ngModelOptions"], outputs: ["ngModelChange"], exportAs: ["ngModel"] }, { type: i1.NgForOf, selector: "[ngFor][ngForOf]", inputs: ["ngForOf", "ngForTrackBy", "ngForTemplate"] }], changeDetection: i0.ChangeDetectionStrategy.OnPush, encapsulation: i0.ViewEncapsulation.None });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.1.2", ngImport: i0, type: NzPaginationOptionsComponent, decorators: [{
            type: Component,
            args: [{
                    selector: 'div[nz-pagination-options]',
                    preserveWhitespaces: false,
                    encapsulation: ViewEncapsulation.None,
                    changeDetection: ChangeDetectionStrategy.OnPush,
                    template: `
    <nz-select
      class="ant-pagination-options-size-changer"
      *ngIf="showSizeChanger"
      [nzDisabled]="disabled"
      [nzSize]="nzSize"
      [ngModel]="pageSize"
      (ngModelChange)="onPageSizeChange($event)"
    >
      <nz-option
        *ngFor="let option of listOfPageSizeOption; trackBy: trackByOption"
        [nzLabel]="option.label"
        [nzValue]="option.value"
      ></nz-option>
    </nz-select>
    <div class="ant-pagination-options-quick-jumper" *ngIf="showQuickJumper">
      {{ locale.jump_to }}
      <input [disabled]="disabled" (keydown.enter)="jumpToPageViaInput($event)" />
      {{ locale.page }}
    </div>
  `,
                    host: { class: 'ant-pagination-options' }
                }]
        }], ctorParameters: function () { return []; }, propDecorators: { nzSize: [{
                type: Input
            }], disabled: [{
                type: Input
            }], showSizeChanger: [{
                type: Input
            }], showQuickJumper: [{
                type: Input
            }], locale: [{
                type: Input
            }], total: [{
                type: Input
            }], pageIndex: [{
                type: Input
            }], pageSize: [{
                type: Input
            }], pageSizeOptions: [{
                type: Input
            }], pageIndexChange: [{
                type: Output
            }], pageSizeChange: [{
                type: Output
            }] } });

class NzPaginationDefaultComponent {
    constructor(cdr, renderer, elementRef, directionality) {
        this.cdr = cdr;
        this.renderer = renderer;
        this.elementRef = elementRef;
        this.directionality = directionality;
        this.nzSize = 'default';
        this.itemRender = null;
        this.showTotal = null;
        this.disabled = false;
        this.showSizeChanger = false;
        this.showQuickJumper = false;
        this.total = 0;
        this.pageIndex = 1;
        this.pageSize = 10;
        this.pageSizeOptions = [10, 20, 30, 40];
        this.pageIndexChange = new EventEmitter();
        this.pageSizeChange = new EventEmitter();
        this.ranges = [0, 0];
        this.listOfPageItem = [];
        this.dir = 'ltr';
        this.destroy$ = new Subject();
        renderer.removeChild(renderer.parentNode(elementRef.nativeElement), elementRef.nativeElement);
    }
    ngOnInit() {
        var _a;
        (_a = this.directionality.change) === null || _a === void 0 ? void 0 : _a.pipe(takeUntil(this.destroy$)).subscribe((direction) => {
            this.dir = direction;
            this.updateRtlStyle();
            this.cdr.detectChanges();
        });
        this.dir = this.directionality.value;
        this.updateRtlStyle();
    }
    updateRtlStyle() {
        if (this.dir === 'rtl') {
            this.renderer.addClass(this.elementRef.nativeElement, 'ant-pagination-rtl');
        }
        else {
            this.renderer.removeClass(this.elementRef.nativeElement, 'ant-pagination-rtl');
        }
    }
    ngOnDestroy() {
        this.destroy$.next();
        this.destroy$.complete();
    }
    jumpPage(index) {
        this.onPageIndexChange(index);
    }
    jumpDiff(diff) {
        this.jumpPage(this.pageIndex + diff);
    }
    trackByPageItem(_, value) {
        return `${value.type}-${value.index}`;
    }
    onPageIndexChange(index) {
        this.pageIndexChange.next(index);
    }
    onPageSizeChange(size) {
        this.pageSizeChange.next(size);
    }
    getLastIndex(total, pageSize) {
        return Math.ceil(total / pageSize);
    }
    buildIndexes() {
        const lastIndex = this.getLastIndex(this.total, this.pageSize);
        this.listOfPageItem = this.getListOfPageItem(this.pageIndex, lastIndex);
    }
    getListOfPageItem(pageIndex, lastIndex) {
        // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
        const concatWithPrevNext = (listOfPage) => {
            const prevItem = {
                type: 'prev',
                disabled: pageIndex === 1
            };
            const nextItem = {
                type: 'next',
                disabled: pageIndex === lastIndex
            };
            return [prevItem, ...listOfPage, nextItem];
        };
        const generatePage = (start, end) => {
            const list = [];
            for (let i = start; i <= end; i++) {
                list.push({
                    index: i,
                    type: 'page'
                });
            }
            return list;
        };
        if (lastIndex <= 9) {
            return concatWithPrevNext(generatePage(1, lastIndex));
        }
        else {
            // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
            const generateRangeItem = (selected, last) => {
                let listOfRange = [];
                const prevFiveItem = {
                    type: 'prev_5'
                };
                const nextFiveItem = {
                    type: 'next_5'
                };
                const firstPageItem = generatePage(1, 1);
                const lastPageItem = generatePage(lastIndex, lastIndex);
                if (selected < 5) {
                    // If the 4th is selected, one more page will be displayed.
                    const maxLeft = selected === 4 ? 6 : 5;
                    listOfRange = [...generatePage(2, maxLeft), nextFiveItem];
                }
                else if (selected < last - 3) {
                    listOfRange = [prevFiveItem, ...generatePage(selected - 2, selected + 2), nextFiveItem];
                }
                else {
                    // If the 4th from last is selected, one more page will be displayed.
                    const minRight = selected === last - 3 ? last - 5 : last - 4;
                    listOfRange = [prevFiveItem, ...generatePage(minRight, last - 1)];
                }
                return [...firstPageItem, ...listOfRange, ...lastPageItem];
            };
            return concatWithPrevNext(generateRangeItem(pageIndex, lastIndex));
        }
    }
    ngOnChanges(changes) {
        const { pageIndex, pageSize, total } = changes;
        if (pageIndex || pageSize || total) {
            this.ranges = [(this.pageIndex - 1) * this.pageSize + 1, Math.min(this.pageIndex * this.pageSize, this.total)];
            this.buildIndexes();
        }
    }
}
NzPaginationDefaultComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.1.2", ngImport: i0, type: NzPaginationDefaultComponent, deps: [{ token: i0.ChangeDetectorRef }, { token: i0.Renderer2 }, { token: i0.ElementRef }, { token: i1$1.Directionality, optional: true }], target: i0.ɵɵFactoryTarget.Component });
NzPaginationDefaultComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "13.1.2", type: NzPaginationDefaultComponent, selector: "nz-pagination-default", inputs: { nzSize: "nzSize", itemRender: "itemRender", showTotal: "showTotal", disabled: "disabled", locale: "locale", showSizeChanger: "showSizeChanger", showQuickJumper: "showQuickJumper", total: "total", pageIndex: "pageIndex", pageSize: "pageSize", pageSizeOptions: "pageSizeOptions" }, outputs: { pageIndexChange: "pageIndexChange", pageSizeChange: "pageSizeChange" }, viewQueries: [{ propertyName: "template", first: true, predicate: ["containerTemplate"], descendants: true, static: true }], usesOnChanges: true, ngImport: i0, template: `
    <ng-template #containerTemplate>
      <li class="ant-pagination-total-text" *ngIf="showTotal">
        <ng-template
          [ngTemplateOutlet]="showTotal"
          [ngTemplateOutletContext]="{ $implicit: total, range: ranges }"
        ></ng-template>
      </li>
      <li
        *ngFor="let page of listOfPageItem; trackBy: trackByPageItem"
        nz-pagination-item
        [locale]="locale"
        [type]="page.type"
        [index]="page.index"
        [disabled]="!!page.disabled"
        [itemRender]="itemRender"
        [active]="pageIndex === page.index"
        (gotoIndex)="jumpPage($event)"
        (diffIndex)="jumpDiff($event)"
        [direction]="dir"
      ></li>
      <div
        nz-pagination-options
        *ngIf="showQuickJumper || showSizeChanger"
        [total]="total"
        [locale]="locale"
        [disabled]="disabled"
        [nzSize]="nzSize"
        [showSizeChanger]="showSizeChanger"
        [showQuickJumper]="showQuickJumper"
        [pageIndex]="pageIndex"
        [pageSize]="pageSize"
        [pageSizeOptions]="pageSizeOptions"
        (pageIndexChange)="onPageIndexChange($event)"
        (pageSizeChange)="onPageSizeChange($event)"
      ></div>
    </ng-template>
  `, isInline: true, components: [{ type: NzPaginationItemComponent, selector: "li[nz-pagination-item]", inputs: ["active", "locale", "index", "disabled", "direction", "type", "itemRender"], outputs: ["diffIndex", "gotoIndex"] }, { type: NzPaginationOptionsComponent, selector: "div[nz-pagination-options]", inputs: ["nzSize", "disabled", "showSizeChanger", "showQuickJumper", "locale", "total", "pageIndex", "pageSize", "pageSizeOptions"], outputs: ["pageIndexChange", "pageSizeChange"] }], directives: [{ type: i1.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { type: i1.NgTemplateOutlet, selector: "[ngTemplateOutlet]", inputs: ["ngTemplateOutletContext", "ngTemplateOutlet"] }, { type: i1.NgForOf, selector: "[ngFor][ngForOf]", inputs: ["ngForOf", "ngForTrackBy", "ngForTemplate"] }], changeDetection: i0.ChangeDetectionStrategy.OnPush, encapsulation: i0.ViewEncapsulation.None });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.1.2", ngImport: i0, type: NzPaginationDefaultComponent, decorators: [{
            type: Component,
            args: [{
                    selector: 'nz-pagination-default',
                    preserveWhitespaces: false,
                    encapsulation: ViewEncapsulation.None,
                    changeDetection: ChangeDetectionStrategy.OnPush,
                    template: `
    <ng-template #containerTemplate>
      <li class="ant-pagination-total-text" *ngIf="showTotal">
        <ng-template
          [ngTemplateOutlet]="showTotal"
          [ngTemplateOutletContext]="{ $implicit: total, range: ranges }"
        ></ng-template>
      </li>
      <li
        *ngFor="let page of listOfPageItem; trackBy: trackByPageItem"
        nz-pagination-item
        [locale]="locale"
        [type]="page.type"
        [index]="page.index"
        [disabled]="!!page.disabled"
        [itemRender]="itemRender"
        [active]="pageIndex === page.index"
        (gotoIndex)="jumpPage($event)"
        (diffIndex)="jumpDiff($event)"
        [direction]="dir"
      ></li>
      <div
        nz-pagination-options
        *ngIf="showQuickJumper || showSizeChanger"
        [total]="total"
        [locale]="locale"
        [disabled]="disabled"
        [nzSize]="nzSize"
        [showSizeChanger]="showSizeChanger"
        [showQuickJumper]="showQuickJumper"
        [pageIndex]="pageIndex"
        [pageSize]="pageSize"
        [pageSizeOptions]="pageSizeOptions"
        (pageIndexChange)="onPageIndexChange($event)"
        (pageSizeChange)="onPageSizeChange($event)"
      ></div>
    </ng-template>
  `
                }]
        }], ctorParameters: function () {
        return [{ type: i0.ChangeDetectorRef }, { type: i0.Renderer2 }, { type: i0.ElementRef }, { type: i1$1.Directionality, decorators: [{
                        type: Optional
                    }] }];
    }, propDecorators: { template: [{
                type: ViewChild,
                args: ['containerTemplate', { static: true }]
            }], nzSize: [{
                type: Input
            }], itemRender: [{
                type: Input
            }], showTotal: [{
                type: Input
            }], disabled: [{
                type: Input
            }], locale: [{
                type: Input
            }], showSizeChanger: [{
                type: Input
            }], showQuickJumper: [{
                type: Input
            }], total: [{
                type: Input
            }], pageIndex: [{
                type: Input
            }], pageSize: [{
                type: Input
            }], pageSizeOptions: [{
                type: Input
            }], pageIndexChange: [{
                type: Output
            }], pageSizeChange: [{
                type: Output
            }] } });

const NZ_CONFIG_MODULE_NAME = 'pagination';
class NzPaginationComponent {
    constructor(i18n, cdr, breakpointService, nzConfigService, directionality) {
        this.i18n = i18n;
        this.cdr = cdr;
        this.breakpointService = breakpointService;
        this.nzConfigService = nzConfigService;
        this.directionality = directionality;
        this._nzModuleName = NZ_CONFIG_MODULE_NAME;
        this.nzPageSizeChange = new EventEmitter();
        this.nzPageIndexChange = new EventEmitter();
        this.nzShowTotal = null;
        this.nzItemRender = null;
        this.nzSize = 'default';
        this.nzPageSizeOptions = [10, 20, 30, 40];
        this.nzShowSizeChanger = false;
        this.nzShowQuickJumper = false;
        this.nzSimple = false;
        this.nzDisabled = false;
        this.nzResponsive = false;
        this.nzHideOnSinglePage = false;
        this.nzTotal = 0;
        this.nzPageIndex = 1;
        this.nzPageSize = 10;
        this.showPagination = true;
        this.size = 'default';
        this.dir = 'ltr';
        this.destroy$ = new Subject();
        this.total$ = new ReplaySubject(1);
    }
    validatePageIndex(value, lastIndex) {
        if (value > lastIndex) {
            return lastIndex;
        }
        else if (value < 1) {
            return 1;
        }
        else {
            return value;
        }
    }
    onPageIndexChange(index) {
        const lastIndex = this.getLastIndex(this.nzTotal, this.nzPageSize);
        const validIndex = this.validatePageIndex(index, lastIndex);
        if (validIndex !== this.nzPageIndex && !this.nzDisabled) {
            this.nzPageIndex = validIndex;
            this.nzPageIndexChange.emit(this.nzPageIndex);
        }
    }
    onPageSizeChange(size) {
        this.nzPageSize = size;
        this.nzPageSizeChange.emit(size);
        const lastIndex = this.getLastIndex(this.nzTotal, this.nzPageSize);
        if (this.nzPageIndex > lastIndex) {
            this.onPageIndexChange(lastIndex);
        }
    }
    onTotalChange(total) {
        const lastIndex = this.getLastIndex(total, this.nzPageSize);
        if (this.nzPageIndex > lastIndex) {
            Promise.resolve().then(() => {
                this.onPageIndexChange(lastIndex);
                this.cdr.markForCheck();
            });
        }
    }
    getLastIndex(total, pageSize) {
        return Math.ceil(total / pageSize);
    }
    ngOnInit() {
        var _a;
        this.i18n.localeChange.pipe(takeUntil(this.destroy$)).subscribe(() => {
            this.locale = this.i18n.getLocaleData('Pagination');
            this.cdr.markForCheck();
        });
        this.total$.pipe(takeUntil(this.destroy$)).subscribe(total => {
            this.onTotalChange(total);
        });
        this.breakpointService
            .subscribe(gridResponsiveMap)
            .pipe(takeUntil(this.destroy$))
            .subscribe(bp => {
            if (this.nzResponsive) {
                this.size = bp === NzBreakpointEnum.xs ? 'small' : 'default';
                this.cdr.markForCheck();
            }
        });
        (_a = this.directionality.change) === null || _a === void 0 ? void 0 : _a.pipe(takeUntil(this.destroy$)).subscribe((direction) => {
            this.dir = direction;
            this.cdr.detectChanges();
        });
        this.dir = this.directionality.value;
    }
    ngOnDestroy() {
        this.destroy$.next();
        this.destroy$.complete();
    }
    ngOnChanges(changes) {
        const { nzHideOnSinglePage, nzTotal, nzPageSize, nzSize } = changes;
        if (nzTotal) {
            this.total$.next(this.nzTotal);
        }
        if (nzHideOnSinglePage || nzTotal || nzPageSize) {
            this.showPagination =
                (this.nzHideOnSinglePage && this.nzTotal > this.nzPageSize) || (this.nzTotal > 0 && !this.nzHideOnSinglePage);
        }
        if (nzSize) {
            this.size = nzSize.currentValue;
        }
    }
}
NzPaginationComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.1.2", ngImport: i0, type: NzPaginationComponent, deps: [{ token: i1$3.NzI18nService }, { token: i0.ChangeDetectorRef }, { token: i2$1.NzBreakpointService }, { token: i3$1.NzConfigService }, { token: i1$1.Directionality, optional: true }], target: i0.ɵɵFactoryTarget.Component });
NzPaginationComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "13.1.2", type: NzPaginationComponent, selector: "nz-pagination", inputs: { nzShowTotal: "nzShowTotal", nzItemRender: "nzItemRender", nzSize: "nzSize", nzPageSizeOptions: "nzPageSizeOptions", nzShowSizeChanger: "nzShowSizeChanger", nzShowQuickJumper: "nzShowQuickJumper", nzSimple: "nzSimple", nzDisabled: "nzDisabled", nzResponsive: "nzResponsive", nzHideOnSinglePage: "nzHideOnSinglePage", nzTotal: "nzTotal", nzPageIndex: "nzPageIndex", nzPageSize: "nzPageSize" }, outputs: { nzPageSizeChange: "nzPageSizeChange", nzPageIndexChange: "nzPageIndexChange" }, host: { properties: { "class.ant-pagination-simple": "nzSimple", "class.ant-pagination-disabled": "nzDisabled", "class.mini": "!nzSimple && size === 'small'", "class.ant-pagination-rtl": "dir === 'rtl'" }, classAttribute: "ant-pagination" }, exportAs: ["nzPagination"], usesOnChanges: true, ngImport: i0, template: `
    <ng-container *ngIf="showPagination">
      <ng-container *ngIf="nzSimple; else defaultPagination.template">
        <ng-template [ngTemplateOutlet]="simplePagination.template"></ng-template>
      </ng-container>
    </ng-container>
    <nz-pagination-simple
      #simplePagination
      [disabled]="nzDisabled"
      [itemRender]="nzItemRender"
      [locale]="locale"
      [pageSize]="nzPageSize"
      [total]="nzTotal"
      [pageIndex]="nzPageIndex"
      (pageIndexChange)="onPageIndexChange($event)"
    ></nz-pagination-simple>
    <nz-pagination-default
      #defaultPagination
      [nzSize]="size"
      [itemRender]="nzItemRender"
      [showTotal]="nzShowTotal"
      [disabled]="nzDisabled"
      [locale]="locale"
      [showSizeChanger]="nzShowSizeChanger"
      [showQuickJumper]="nzShowQuickJumper"
      [total]="nzTotal"
      [pageIndex]="nzPageIndex"
      [pageSize]="nzPageSize"
      [pageSizeOptions]="nzPageSizeOptions"
      (pageIndexChange)="onPageIndexChange($event)"
      (pageSizeChange)="onPageSizeChange($event)"
    ></nz-pagination-default>
  `, isInline: true, components: [{ type: NzPaginationSimpleComponent, selector: "nz-pagination-simple", inputs: ["itemRender", "disabled", "locale", "total", "pageIndex", "pageSize"], outputs: ["pageIndexChange"] }, { type: NzPaginationDefaultComponent, selector: "nz-pagination-default", inputs: ["nzSize", "itemRender", "showTotal", "disabled", "locale", "showSizeChanger", "showQuickJumper", "total", "pageIndex", "pageSize", "pageSizeOptions"], outputs: ["pageIndexChange", "pageSizeChange"] }], directives: [{ type: i1.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { type: i1.NgTemplateOutlet, selector: "[ngTemplateOutlet]", inputs: ["ngTemplateOutletContext", "ngTemplateOutlet"] }], changeDetection: i0.ChangeDetectionStrategy.OnPush, encapsulation: i0.ViewEncapsulation.None });
__decorate([
    WithConfig()
], NzPaginationComponent.prototype, "nzSize", void 0);
__decorate([
    WithConfig()
], NzPaginationComponent.prototype, "nzPageSizeOptions", void 0);
__decorate([
    WithConfig(),
    InputBoolean()
], NzPaginationComponent.prototype, "nzShowSizeChanger", void 0);
__decorate([
    WithConfig(),
    InputBoolean()
], NzPaginationComponent.prototype, "nzShowQuickJumper", void 0);
__decorate([
    WithConfig(),
    InputBoolean()
], NzPaginationComponent.prototype, "nzSimple", void 0);
__decorate([
    InputBoolean()
], NzPaginationComponent.prototype, "nzDisabled", void 0);
__decorate([
    InputBoolean()
], NzPaginationComponent.prototype, "nzResponsive", void 0);
__decorate([
    InputBoolean()
], NzPaginationComponent.prototype, "nzHideOnSinglePage", void 0);
__decorate([
    InputNumber()
], NzPaginationComponent.prototype, "nzTotal", void 0);
__decorate([
    InputNumber()
], NzPaginationComponent.prototype, "nzPageIndex", void 0);
__decorate([
    InputNumber()
], NzPaginationComponent.prototype, "nzPageSize", void 0);
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.1.2", ngImport: i0, type: NzPaginationComponent, decorators: [{
            type: Component,
            args: [{
                    selector: 'nz-pagination',
                    exportAs: 'nzPagination',
                    preserveWhitespaces: false,
                    encapsulation: ViewEncapsulation.None,
                    changeDetection: ChangeDetectionStrategy.OnPush,
                    template: `
    <ng-container *ngIf="showPagination">
      <ng-container *ngIf="nzSimple; else defaultPagination.template">
        <ng-template [ngTemplateOutlet]="simplePagination.template"></ng-template>
      </ng-container>
    </ng-container>
    <nz-pagination-simple
      #simplePagination
      [disabled]="nzDisabled"
      [itemRender]="nzItemRender"
      [locale]="locale"
      [pageSize]="nzPageSize"
      [total]="nzTotal"
      [pageIndex]="nzPageIndex"
      (pageIndexChange)="onPageIndexChange($event)"
    ></nz-pagination-simple>
    <nz-pagination-default
      #defaultPagination
      [nzSize]="size"
      [itemRender]="nzItemRender"
      [showTotal]="nzShowTotal"
      [disabled]="nzDisabled"
      [locale]="locale"
      [showSizeChanger]="nzShowSizeChanger"
      [showQuickJumper]="nzShowQuickJumper"
      [total]="nzTotal"
      [pageIndex]="nzPageIndex"
      [pageSize]="nzPageSize"
      [pageSizeOptions]="nzPageSizeOptions"
      (pageIndexChange)="onPageIndexChange($event)"
      (pageSizeChange)="onPageSizeChange($event)"
    ></nz-pagination-default>
  `,
                    host: {
                        class: 'ant-pagination',
                        '[class.ant-pagination-simple]': 'nzSimple',
                        '[class.ant-pagination-disabled]': 'nzDisabled',
                        '[class.mini]': `!nzSimple && size === 'small'`,
                        '[class.ant-pagination-rtl]': `dir === 'rtl'`
                    }
                }]
        }], ctorParameters: function () {
        return [{ type: i1$3.NzI18nService }, { type: i0.ChangeDetectorRef }, { type: i2$1.NzBreakpointService }, { type: i3$1.NzConfigService }, { type: i1$1.Directionality, decorators: [{
                        type: Optional
                    }] }];
    }, propDecorators: { nzPageSizeChange: [{
                type: Output
            }], nzPageIndexChange: [{
                type: Output
            }], nzShowTotal: [{
                type: Input
            }], nzItemRender: [{
                type: Input
            }], nzSize: [{
                type: Input
            }], nzPageSizeOptions: [{
                type: Input
            }], nzShowSizeChanger: [{
                type: Input
            }], nzShowQuickJumper: [{
                type: Input
            }], nzSimple: [{
                type: Input
            }], nzDisabled: [{
                type: Input
            }], nzResponsive: [{
                type: Input
            }], nzHideOnSinglePage: [{
                type: Input
            }], nzTotal: [{
                type: Input
            }], nzPageIndex: [{
                type: Input
            }], nzPageSize: [{
                type: Input
            }] } });

/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */
class NzPaginationModule {
}
NzPaginationModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.1.2", ngImport: i0, type: NzPaginationModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
NzPaginationModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "12.0.0", version: "13.1.2", ngImport: i0, type: NzPaginationModule, declarations: [NzPaginationComponent,
        NzPaginationSimpleComponent,
        NzPaginationOptionsComponent,
        NzPaginationItemComponent,
        NzPaginationDefaultComponent], imports: [BidiModule, CommonModule, FormsModule, NzSelectModule, NzI18nModule, NzIconModule], exports: [NzPaginationComponent] });
NzPaginationModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "13.1.2", ngImport: i0, type: NzPaginationModule, imports: [[BidiModule, CommonModule, FormsModule, NzSelectModule, NzI18nModule, NzIconModule]] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.1.2", ngImport: i0, type: NzPaginationModule, decorators: [{
            type: NgModule,
            args: [{
                    declarations: [
                        NzPaginationComponent,
                        NzPaginationSimpleComponent,
                        NzPaginationOptionsComponent,
                        NzPaginationItemComponent,
                        NzPaginationDefaultComponent
                    ],
                    exports: [NzPaginationComponent],
                    imports: [BidiModule, CommonModule, FormsModule, NzSelectModule, NzI18nModule, NzIconModule]
                }]
        }] });

/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */

/**
 * Generated bundle index. Do not edit.
 */

export { NzPaginationComponent, NzPaginationDefaultComponent, NzPaginationItemComponent, NzPaginationModule, NzPaginationOptionsComponent, NzPaginationSimpleComponent };
//# sourceMappingURL=ng-zorro-antd-pagination.mjs.map
