/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */
import { ChangeDetectionStrategy, Component, ElementRef, EventEmitter, Input, Output, ViewChildren, ViewEncapsulation } from '@angular/core';
import { fromEvent, merge, Observable } from 'rxjs';
import { startWith, switchMap } from 'rxjs/operators';
import * as i0 from "@angular/core";
import * as i1 from "ng-zorro-antd/checkbox";
import * as i2 from "ng-zorro-antd/empty";
import * as i3 from "./transfer-search.component";
import * as i4 from "@angular/common";
export class NzTransferListComponent {
    // #endregion
    constructor(ngZone, cdr) {
        this.ngZone = ngZone;
        this.cdr = cdr;
        // #region fields
        this.direction = 'left';
        this.titleText = '';
        this.showSelectAll = true;
        this.dataSource = [];
        this.itemUnit = '';
        this.itemsUnit = '';
        this.filter = '';
        this.disabled = false;
        this.renderList = null;
        this.render = null;
        this.footer = null;
        // events
        this.handleSelectAll = new EventEmitter();
        this.handleSelect = new EventEmitter();
        this.filterChange = new EventEmitter();
        this.stat = {
            checkAll: false,
            checkHalf: false,
            checkCount: 0,
            shownCount: 0
        };
        this.onItemSelect = (item) => {
            if (this.disabled || item.disabled) {
                return;
            }
            item.checked = !item.checked;
            this.updateCheckStatus();
            this.handleSelect.emit(item);
        };
        this.onItemSelectAll = (status) => {
            this.dataSource.forEach(item => {
                if (!item.disabled && !item.hide) {
                    item.checked = status;
                }
            });
            this.updateCheckStatus();
            this.handleSelectAll.emit(status);
        };
    }
    get validData() {
        return this.dataSource.filter(w => !w.hide);
    }
    updateCheckStatus() {
        const validCount = this.dataSource.filter(w => !w.disabled).length;
        this.stat.checkCount = this.dataSource.filter(w => w.checked && !w.disabled).length;
        this.stat.shownCount = this.validData.length;
        this.stat.checkAll = validCount > 0 && validCount === this.stat.checkCount;
        this.stat.checkHalf = this.stat.checkCount > 0 && !this.stat.checkAll;
    }
    // #endregion
    // #region search
    handleFilter(value) {
        this.filter = value;
        this.dataSource.forEach(item => {
            item.hide = value.length > 0 && !this.matchFilter(value, item);
        });
        this.stat.shownCount = this.validData.length;
        this.filterChange.emit({ direction: this.direction, value });
    }
    handleClear() {
        this.handleFilter('');
    }
    matchFilter(text, item) {
        if (this.filterOption) {
            return this.filterOption(text, item);
        }
        return item.title.includes(text);
    }
    markForCheck() {
        this.updateCheckStatus();
        this.cdr.markForCheck();
    }
    ngAfterViewInit() {
        this.checkboxes.changes
            .pipe(startWith(this.checkboxes), switchMap(() => {
            const checkboxes = this.checkboxes.toArray();
            // Caretaker note: we explicitly should call `subscribe()` within the root zone.
            // `runOutsideAngular(() => fromEvent(...))` will just create an observable within the root zone,
            // but `addEventListener` is called when the `fromEvent` is subscribed.
            return new Observable(subscriber => this.ngZone.runOutsideAngular(() => merge(...checkboxes.map(checkbox => fromEvent(checkbox.nativeElement, 'click'))).subscribe(subscriber)));
        }))
            .subscribe(event => {
            event.stopPropagation();
        });
    }
}
NzTransferListComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.1.2", ngImport: i0, type: NzTransferListComponent, deps: [{ token: i0.NgZone }, { token: i0.ChangeDetectorRef }], target: i0.ɵɵFactoryTarget.Component });
NzTransferListComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "13.1.2", type: NzTransferListComponent, selector: "nz-transfer-list", inputs: { direction: "direction", titleText: "titleText", showSelectAll: "showSelectAll", dataSource: "dataSource", itemUnit: "itemUnit", itemsUnit: "itemsUnit", filter: "filter", disabled: "disabled", showSearch: "showSearch", searchPlaceholder: "searchPlaceholder", notFoundContent: "notFoundContent", filterOption: "filterOption", renderList: "renderList", render: "render", footer: "footer" }, outputs: { handleSelectAll: "handleSelectAll", handleSelect: "handleSelect", filterChange: "filterChange" }, host: { properties: { "class.ant-transfer-list-with-footer": "!!footer" }, classAttribute: "ant-transfer-list" }, viewQueries: [{ propertyName: "checkboxes", predicate: ["checkboxes"], descendants: true, read: ElementRef }], exportAs: ["nzTransferList"], ngImport: i0, template: `
    <ng-template #defaultRenderList>
      <ul *ngIf="stat.shownCount > 0" class="ant-transfer-list-content">
        <li
          *ngFor="let item of validData"
          (click)="onItemSelect(item)"
          class="ant-transfer-list-content-item"
          [ngClass]="{ 'ant-transfer-list-content-item-disabled': disabled || item.disabled }"
        >
          <label
            #checkboxes
            nz-checkbox
            [nzChecked]="item.checked"
            (nzCheckedChange)="onItemSelect(item)"
            [nzDisabled]="disabled || item.disabled"
          >
            <ng-container *ngIf="!render; else renderContainer">{{ item.title }}</ng-container>
            <ng-template
              #renderContainer
              [ngTemplateOutlet]="render"
              [ngTemplateOutletContext]="{ $implicit: item }"
            ></ng-template>
          </label>
        </li>
      </ul>
      <div *ngIf="stat.shownCount === 0" class="ant-transfer-list-body-not-found">
        <nz-embed-empty [nzComponentName]="'transfer'" [specificContent]="notFoundContent"></nz-embed-empty>
      </div>
    </ng-template>
    <div class="ant-transfer-list-header">
      <label
        *ngIf="showSelectAll"
        class="ant-transfer-list-checkbox"
        nz-checkbox
        [nzChecked]="stat.checkAll"
        (nzCheckedChange)="onItemSelectAll($event)"
        [nzIndeterminate]="stat.checkHalf"
        [nzDisabled]="stat.shownCount === 0 || disabled"
      ></label>
      <span class="ant-transfer-list-header-selected">
        <span>
          {{ (stat.checkCount > 0 ? stat.checkCount + '/' : '') + stat.shownCount }}
          {{ validData.length > 1 ? itemsUnit : itemUnit }}
        </span>
      </span>
      <span *ngIf="titleText" class="ant-transfer-list-header-title">{{ titleText }}</span>
    </div>
    <div
      class="{{ showSearch ? 'ant-transfer-list-body ant-transfer-list-body-with-search' : 'ant-transfer-list-body' }}"
      [ngClass]="{ 'ant-transfer__nodata': stat.shownCount === 0 }"
    >
      <div *ngIf="showSearch" class="ant-transfer-list-body-search-wrapper">
        <span
          nz-transfer-search
          class="ant-input-affix-wrapper ant-transfer-list-search"
          (valueChanged)="handleFilter($event)"
          (valueClear)="handleClear()"
          [placeholder]="searchPlaceholder"
          [disabled]="disabled"
          [value]="filter"
        ></span>
      </div>
      <ng-container *ngIf="renderList; else defaultRenderList">
        <div class="ant-transfer-list-body-customize-wrapper">
          <ng-container
            *ngTemplateOutlet="
              renderList;
              context: {
                $implicit: validData,
                direction: direction,
                disabled: disabled,
                onItemSelectAll: onItemSelectAll,
                onItemSelect: onItemSelect,
                stat: stat
              }
            "
          ></ng-container>
        </div>
      </ng-container>
    </div>
    <div *ngIf="footer" class="ant-transfer-list-footer">
      <ng-template [ngTemplateOutlet]="footer" [ngTemplateOutletContext]="{ $implicit: direction }"></ng-template>
    </div>
  `, isInline: true, components: [{ type: i1.NzCheckboxComponent, selector: "[nz-checkbox]", inputs: ["nzValue", "nzAutoFocus", "nzDisabled", "nzIndeterminate", "nzChecked", "nzId"], outputs: ["nzCheckedChange"], exportAs: ["nzCheckbox"] }, { type: i2.NzEmbedEmptyComponent, selector: "nz-embed-empty", inputs: ["nzComponentName", "specificContent"], exportAs: ["nzEmbedEmpty"] }, { type: i3.NzTransferSearchComponent, selector: "[nz-transfer-search]", inputs: ["placeholder", "value", "disabled"], outputs: ["valueChanged", "valueClear"], exportAs: ["nzTransferSearch"] }], directives: [{ type: i4.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { type: i4.NgForOf, selector: "[ngFor][ngForOf]", inputs: ["ngForOf", "ngForTrackBy", "ngForTemplate"] }, { type: i4.NgClass, selector: "[ngClass]", inputs: ["class", "ngClass"] }, { type: i4.NgTemplateOutlet, selector: "[ngTemplateOutlet]", inputs: ["ngTemplateOutletContext", "ngTemplateOutlet"] }], changeDetection: i0.ChangeDetectionStrategy.OnPush, encapsulation: i0.ViewEncapsulation.None });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.1.2", ngImport: i0, type: NzTransferListComponent, decorators: [{
            type: Component,
            args: [{
                    selector: 'nz-transfer-list',
                    exportAs: 'nzTransferList',
                    preserveWhitespaces: false,
                    template: `
    <ng-template #defaultRenderList>
      <ul *ngIf="stat.shownCount > 0" class="ant-transfer-list-content">
        <li
          *ngFor="let item of validData"
          (click)="onItemSelect(item)"
          class="ant-transfer-list-content-item"
          [ngClass]="{ 'ant-transfer-list-content-item-disabled': disabled || item.disabled }"
        >
          <label
            #checkboxes
            nz-checkbox
            [nzChecked]="item.checked"
            (nzCheckedChange)="onItemSelect(item)"
            [nzDisabled]="disabled || item.disabled"
          >
            <ng-container *ngIf="!render; else renderContainer">{{ item.title }}</ng-container>
            <ng-template
              #renderContainer
              [ngTemplateOutlet]="render"
              [ngTemplateOutletContext]="{ $implicit: item }"
            ></ng-template>
          </label>
        </li>
      </ul>
      <div *ngIf="stat.shownCount === 0" class="ant-transfer-list-body-not-found">
        <nz-embed-empty [nzComponentName]="'transfer'" [specificContent]="notFoundContent"></nz-embed-empty>
      </div>
    </ng-template>
    <div class="ant-transfer-list-header">
      <label
        *ngIf="showSelectAll"
        class="ant-transfer-list-checkbox"
        nz-checkbox
        [nzChecked]="stat.checkAll"
        (nzCheckedChange)="onItemSelectAll($event)"
        [nzIndeterminate]="stat.checkHalf"
        [nzDisabled]="stat.shownCount === 0 || disabled"
      ></label>
      <span class="ant-transfer-list-header-selected">
        <span>
          {{ (stat.checkCount > 0 ? stat.checkCount + '/' : '') + stat.shownCount }}
          {{ validData.length > 1 ? itemsUnit : itemUnit }}
        </span>
      </span>
      <span *ngIf="titleText" class="ant-transfer-list-header-title">{{ titleText }}</span>
    </div>
    <div
      class="{{ showSearch ? 'ant-transfer-list-body ant-transfer-list-body-with-search' : 'ant-transfer-list-body' }}"
      [ngClass]="{ 'ant-transfer__nodata': stat.shownCount === 0 }"
    >
      <div *ngIf="showSearch" class="ant-transfer-list-body-search-wrapper">
        <span
          nz-transfer-search
          class="ant-input-affix-wrapper ant-transfer-list-search"
          (valueChanged)="handleFilter($event)"
          (valueClear)="handleClear()"
          [placeholder]="searchPlaceholder"
          [disabled]="disabled"
          [value]="filter"
        ></span>
      </div>
      <ng-container *ngIf="renderList; else defaultRenderList">
        <div class="ant-transfer-list-body-customize-wrapper">
          <ng-container
            *ngTemplateOutlet="
              renderList;
              context: {
                $implicit: validData,
                direction: direction,
                disabled: disabled,
                onItemSelectAll: onItemSelectAll,
                onItemSelect: onItemSelect,
                stat: stat
              }
            "
          ></ng-container>
        </div>
      </ng-container>
    </div>
    <div *ngIf="footer" class="ant-transfer-list-footer">
      <ng-template [ngTemplateOutlet]="footer" [ngTemplateOutletContext]="{ $implicit: direction }"></ng-template>
    </div>
  `,
                    encapsulation: ViewEncapsulation.None,
                    changeDetection: ChangeDetectionStrategy.OnPush,
                    host: {
                        class: 'ant-transfer-list',
                        '[class.ant-transfer-list-with-footer]': '!!footer'
                    }
                }]
        }], ctorParameters: function () { return [{ type: i0.NgZone }, { type: i0.ChangeDetectorRef }]; }, propDecorators: { direction: [{
                type: Input
            }], titleText: [{
                type: Input
            }], showSelectAll: [{
                type: Input
            }], dataSource: [{
                type: Input
            }], itemUnit: [{
                type: Input
            }], itemsUnit: [{
                type: Input
            }], filter: [{
                type: Input
            }], disabled: [{
                type: Input
            }], showSearch: [{
                type: Input
            }], searchPlaceholder: [{
                type: Input
            }], notFoundContent: [{
                type: Input
            }], filterOption: [{
                type: Input
            }], renderList: [{
                type: Input
            }], render: [{
                type: Input
            }], footer: [{
                type: Input
            }], handleSelectAll: [{
                type: Output
            }], handleSelect: [{
                type: Output
            }], filterChange: [{
                type: Output
            }], checkboxes: [{
                type: ViewChildren,
                args: ['checkboxes', { read: ElementRef }]
            }] } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidHJhbnNmZXItbGlzdC5jb21wb25lbnQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9jb21wb25lbnRzL3RyYW5zZmVyL3RyYW5zZmVyLWxpc3QuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7R0FHRztBQUVILE9BQU8sRUFFTCx1QkFBdUIsRUFFdkIsU0FBUyxFQUNULFVBQVUsRUFDVixZQUFZLEVBQ1osS0FBSyxFQUVMLE1BQU0sRUFHTixZQUFZLEVBQ1osaUJBQWlCLEVBQ2xCLE1BQU0sZUFBZSxDQUFDO0FBQ3ZCLE9BQU8sRUFBRSxTQUFTLEVBQUUsS0FBSyxFQUFFLFVBQVUsRUFBRSxNQUFNLE1BQU0sQ0FBQztBQUNwRCxPQUFPLEVBQUUsU0FBUyxFQUFFLFNBQVMsRUFBRSxNQUFNLGdCQUFnQixDQUFDOzs7Ozs7QUFtR3RELE1BQU0sT0FBTyx1QkFBdUI7SUE0RmxDLGFBQWE7SUFFYixZQUFvQixNQUFjLEVBQVUsR0FBc0I7UUFBOUMsV0FBTSxHQUFOLE1BQU0sQ0FBUTtRQUFVLFFBQUcsR0FBSCxHQUFHLENBQW1CO1FBN0ZsRSxpQkFBaUI7UUFFUixjQUFTLEdBQXNCLE1BQU0sQ0FBQztRQUN0QyxjQUFTLEdBQUcsRUFBRSxDQUFDO1FBQ2Ysa0JBQWEsR0FBRyxJQUFJLENBQUM7UUFFckIsZUFBVSxHQUFtQixFQUFFLENBQUM7UUFFaEMsYUFBUSxHQUF1QixFQUFFLENBQUM7UUFDbEMsY0FBUyxHQUF1QixFQUFFLENBQUM7UUFDbkMsV0FBTSxHQUFHLEVBQUUsQ0FBQztRQUNaLGFBQVEsR0FBWSxLQUFLLENBQUM7UUFNMUIsZUFBVSxHQUE2QixJQUFJLENBQUM7UUFDNUMsV0FBTSxHQUE2QixJQUFJLENBQUM7UUFDeEMsV0FBTSxHQUE2QixJQUFJLENBQUM7UUFFakQsU0FBUztRQUNVLG9CQUFlLEdBQTBCLElBQUksWUFBWSxFQUFXLENBQUM7UUFDckUsaUJBQVksR0FBK0IsSUFBSSxZQUFZ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QVk7c0JBQTlCLE1BQU07Z0JBQ1ksWUFBWTtzQkFBOUIsTUFBTTtnQkFFMkMsVUFBVTtzQkFBM0QsWUFBWTt1QkFBQyxZQUFZLEVBQUUsRUFBRSxJQUFJLEVBQUUsVUFBVSxFQUFFIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKiBVc2Ugb2YgdGhpcyBzb3VyY2UgY29kZSBpcyBnb3Zlcm5lZCBieSBhbiBNSVQtc3R5bGUgbGljZW5zZSB0aGF0IGNhbiBiZVxuICogZm91bmQgaW4gdGhlIExJQ0VOU0UgZmlsZSBhdCBodHRwczovL2dpdGh1Yi5jb20vTkctWk9SUk8vbmctem9ycm8tYW50ZC9ibG9iL21hc3Rlci9MSUNFTlNFXG4gKi9cblxuaW1wb3J0IHtcbiAgQWZ0ZXJWaWV3SW5pdCxcbiAgQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3ksXG4gIENoYW5nZURldGVjdG9yUmVmLFxuICBDb21wb25lbnQsXG4gIEVsZW1lbnRSZWYsXG4gIEV2ZW50RW1pdHRlcixcbiAgSW5wdXQsXG4gIE5nWm9uZSxcbiAgT3V0cHV0LFxuICBRdWVyeUxpc3QsXG4gIFRlbXBsYXRlUmVmLFxuICBWaWV3Q2hpbGRyZW4sXG4gIFZpZXdFbmNhcHN1bGF0aW9uXG59IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgZnJvbUV2ZW50LCBtZXJnZSwgT2JzZXJ2YWJsZSB9IGZyb20gJ3J4anMnO1xuaW1wb3J0IHsgc3RhcnRXaXRoLCBzd2l0Y2hNYXAgfSBmcm9tICdyeGpzL29wZXJhdG9ycyc7XG5cbmltcG9ydCB7IFRyYW5zZmVyRGlyZWN0aW9uLCBUcmFuc2Zlckl0ZW0gfSBmcm9tICcuL2ludGVyZmFjZSc7XG5cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogJ256LXRyYW5zZmVyLWxpc3QnLFxuICBleHBvcnRBczogJ256VHJhbnNmZXJMaXN0JyxcbiAgcHJlc2VydmVXaGl0ZXNwYWNlczogZmFsc2UsXG4gIHRlbXBsYXRlOiBgXG4gICAgPG5nLXRlbXBsYXRlICNkZWZhdWx0UmVuZGVyTGlzdD5cbiAgICAgIDx1bCAqbmdJZj1cInN0YXQuc2hvd25Db3VudCA+IDBcIiBjbGFzcz1cImFudC10cmFuc2Zlci1saXN0LWNvbnRlbnRcIj5cbiAgICAgICAgPGxpXG4gICAgICAgICAgKm5nRm9yPVwibGV0IGl0ZW0gb2YgdmFsaWREYXRhXCJcbiAgICAgICAgICAoY2xpY2spPVwib25JdGVtU2VsZWN0KGl0ZW0pXCJcbiAgICAgICAgICBjbGFzcz1cImFudC10cmFuc2Zlci1saXN0LWNvbnRlbnQtaXRlbVwiXG4gICAgICAgICAgW25nQ2xhc3NdPVwieyAnYW50LXRyYW5zZmVyLWxpc3QtY29udGVudC1pdGVtLWRpc2FibGVkJzogZGlzYWJsZWQgfHwgaXRlbS5kaXNhYmxlZCB9XCJcbiAgICAgICAgPlxuICAgICAgICAgIDxsYWJlbFxuICAgICAgICAgICAgI2NoZWNrYm94ZXNcbiAgICAgICAgICAgIG56LWNoZWNrYm94XG4gICAgICAgICAgICBbbnpDaGVja2VkXT1cIml0ZW0uY2hlY2tlZFwiXG4gICAgICAgICAgICAobnpDaGVja2VkQ2hhbmdlKT1cIm9uSXRlbVNlbGVjdChpdGVtKVwiXG4gICAgICAgICAgICBbbnpEaXNhYmxlZF09XCJkaXNhYmxlZCB8fCBpdGVtLmRpc2FibGVkXCJcbiAgICAgICAgICA+XG4gICAgICAgICAgICA8bmctY29udGFpbmVyICpuZ0lmPVwiIXJlbmRlcjsgZWxzZSByZW5kZXJDb250YWluZXJcIj57eyBpdGVtLnRpdGxlIH19PC9uZy1jb250YWluZXI+XG4gICAgICAgICAgICA8bmctdGVtcGxhdGVcbiAgICAgICAgICAgICAgI3JlbmRlckNvbnRhaW5lclxuICAgICAgICAgICAgICBbbmdUZW1wbGF0ZU91dGxldF09XCJyZW5kZXJcIlxuICAgICAgICAgICAgICBbbmdUZW1wbGF0ZU91dGxldENvbnRleHRdPVwieyAkaW1wbGljaXQ6IGl0ZW0gfVwiXG4gICAgICAgICAgICA+PC9uZy10ZW1wbGF0ZT5cbiAgICAgICAgICA8L2xhYmVsPlxuICAgICAgICA8L2xpPlxuICAgICAgPC91bD5cbiAgICAgIDxkaXYgKm5nSWY9XCJzdGF0LnNob3duQ291bnQgPT09IDBcIiBjbGFzcz1cImFudC10cmFuc2Zlci1saXN0LWJvZHktbm90LWZvdW5kXCI+XG4gICAgICAgIDxuei1lbWJlZC1lbXB0eSBbbnpDb21wb25lbnROYW1lXT1cIid0cmFuc2ZlcidcIiBbc3BlY2lmaWNDb250ZW50XT1cIm5vdEZvdW5kQ29udGVudFwiPjwvbnotZW1iZWQtZW1wdHk+XG4gICAgICA8L2Rpdj5cbiAgICA8L25nLXRlbXBsYXRlPlxuICAgIDxkaXYgY2xhc3M9XCJhbnQtdHJhbnNmZXItbGlzdC1oZWFkZXJcIj5cbiAgICAgIDxsYWJlbFxuICAgICAgICAqbmdJZj1cInNob3dTZWxlY3RBbGxcIlxuICAgICAgICBjbGFzcz1cImFudC10cmFuc2Zlci1saXN0LWNoZWNrYm94XCJcbiAgICAgICAgbnotY2hlY2tib3hcbiAgICAgICAgW256Q2hlY2tlZF09XCJzdGF0LmNoZWNrQWxsXCJcbiAgICAgICAgKG56Q2hlY2tlZENoYW5nZSk9XCJvbkl0ZW1TZWxlY3RBbGwoJGV2ZW50KVwiXG4gICAgICAgIFtuekluZGV0ZXJtaW5hdGVdPVwic3RhdC5jaGVja0hhbGZcIlxuICAgICAgICBbbnpEaXNhYmxlZF09XCJzdGF0LnNob3duQ291bnQgPT09IDAgfHwgZGlzYWJsZWRcIlxuICAgICAgPjwvbGFiZWw+XG4gICAgICA8c3BhbiBjbGFzcz1cImFudC10cmFuc2Zlci1saXN0LWhlYWRlci1zZWxlY3RlZFwiPlxuICAgICAgICA8c3Bhbj5cbiAgICAgICAgICB7eyAoc3RhdC5jaGVja0NvdW50ID4gMCA/IHN0YXQuY2hlY2tDb3VudCArICcvJyA6ICcnKSArIHN0YXQuc2hvd25Db3VudCB9fVxuICAgICAgICAgIHt7IHZhbGlkRGF0YS5sZW5ndGggPiAxID8gaXRlbXNVbml0IDogaXRlbVVuaXQgfX1cbiAgICAgICAgPC9zcGFuPlxuICAgICAgPC9zcGFuPlxuICAgICAgPHNwYW4gKm5nSWY9XCJ0aXRsZVRleHRcIiBjbGFzcz1cImFudC10cmFuc2Zlci1saXN0LWhlYWRlci10aXRsZVwiPnt7IHRpdGxlVGV4dCB9fTwvc3Bhbj5cbiAgICA8L2Rpdj5cbiAgICA8ZGl2XG4gICAgICBjbGFzcz1cInt7IHNob3dTZWFyY2ggPyAnYW50LXRyYW5zZmVyLWxpc3QtYm9keSBhbnQtdHJhbnNmZXItbGlzdC1ib2R5LXdpdGgtc2VhcmNoJyA6ICdhbnQtdHJhbnNmZXItbGlzdC1ib2R5JyB9fVwiXG4gICAgICBbbmdDbGFzc109XCJ7ICdhbnQtdHJhbnNmZXJfX25vZGF0YSc6IHN0YXQuc2hvd25Db3VudCA9PT0gMCB9XCJcbiAgICA+XG4gICAgICA8ZGl2ICpuZ0lmPVwic2hvd1NlYXJjaFwiIGNsYXNzPVwiYW50LXRyYW5zZmVyLWxpc3QtYm9keS1zZWFyY2gtd3JhcHBlclwiPlxuICAgICAgICA8c3BhblxuICAgICAgICAgIG56LXRyYW5zZmVyLXNlYXJjaFxuICAgICAgICAgIGNsYXNzPVwiYW50LWlucHV0LWFmZml4LXdyYXBwZXIgYW50LXRyYW5zZmVyLWxpc3Qtc2VhcmNoXCJcbiAgICAgICAgICAodmFsdWVDaGFuZ2VkKT1cImhhbmRsZUZpbHRlcigkZXZlbnQpXCJcbiAgICAgICAgICAodmFsdWVDbGVhcik9XCJoYW5kbGVDbGVhcigpXCJcbiAgICAgICAgICBbcGxhY2Vob2xkZXJdPVwic2VhcmNoUGxhY2Vob2xkZXJcIlxuICAgICAgICAgIFtkaXNhYmxlZF09XCJkaXNhYmxlZFwiXG4gICAgICAgICAgW3ZhbHVlXT1cImZpbHRlclwiXG4gICAgICAgID48L3NwYW4+XG4gICAgICA8L2Rpdj5cbiAgICAgIDxuZy1jb250YWluZXIgKm5nSWY9XCJyZW5kZXJMaXN0OyBlbHNlIGRlZmF1bHRSZW5kZXJMaXN0XCI+XG4gICAgICAgIDxkaXYgY2xhc3M9XCJhbnQtdHJhbnNmZXItbGlzdC1ib2R5LWN1c3RvbWl6ZS13cmFwcGVyXCI+XG4gICAgICAgICAgPG5nLWNvbnRhaW5lclxuICAgICAgICAgICAgKm5nVGVtcGxhdGVPdXRsZXQ9XCJcbiAgICAgICAgICAgICAgcmVuZGVyTGlzdDtcbiAgICAgICAgICAgICAgY29udGV4dDoge1xuICAgICAgICAgICAgICAgICRpbXBsaWNpdDogdmFsaWREYXRhLFxuICAgICAgICAgICAgICAgIGRpcmVjdGlvbjogZGlyZWN0aW9uLFxuICAgICAgICAgICAgICAgIGRpc2FibGVkOiBkaXNhYmxlZCxcbiAgICAgICAgICAgICAgICBvbkl0ZW1TZWxlY3RBbGw6IG9uSXRlbVNlbGVjdEFsbCxcbiAgICAgICAgICAgICAgICBvbkl0ZW1TZWxlY3Q6IG9uSXRlbVNlbGVjdCxcbiAgICAgICAgICAgICAgICBzdGF0OiBzdGF0XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIFwiXG4gICAgICAgICAgPjwvbmctY29udGFpbmVyPlxuICAgICAgICA8L2Rpdj5cbiAgICAgIDwvbmctY29udGFpbmVyPlxuICAgIDwvZGl2PlxuICAgIDxkaXYgKm5nSWY9XCJmb290ZXJcIiBjbGFzcz1cImFudC10cmFuc2Zlci1saXN0LWZvb3RlclwiPlxuICAgICAgPG5nLXRlbXBsYXRlIFtuZ1RlbXBsYXRlT3V0bGV0XT1cImZvb3RlclwiIFtuZ1RlbXBsYXRlT3V0bGV0Q29udGV4dF09XCJ7ICRpbXBsaWNpdDogZGlyZWN0aW9uIH1cIj48L25nLXRlbXBsYXRlPlxuICAgIDwvZGl2PlxuICBgLFxuICBlbmNhcHN1bGF0aW9uOiBWaWV3RW5jYXBzdWxhdGlvbi5Ob25lLFxuICBjaGFuZ2VEZXRlY3Rpb246IENoYW5nZURldGVjdGlvblN0cmF0ZWd5Lk9uUHVzaCxcbiAgaG9zdDoge1xuICAgIGNsYXNzOiAnYW50LXRyYW5zZmVyLWxpc3QnLFxuICAgICdbY2xhc3MuYW50LXRyYW5zZmVyLWxpc3Qtd2l0aC1mb290ZXJdJzogJyEhZm9vdGVyJ1xuICB9XG59KVxuZXhwb3J0IGNsYXNzIE56VHJhbnNmZXJMaXN0Q29tcG9uZW50IGltcGxlbWVudHMgQWZ0ZXJWaWV3SW5pdCB7XG4gIC8vICNyZWdpb24gZmllbGRzXG5cbiAgQElucHV0KCkgZGlyZWN0aW9uOiBUcmFuc2ZlckRpcmVjdGlvbiA9ICdsZWZ0JztcbiAgQElucHV0KCkgdGl0bGVUZXh0ID0gJyc7XG4gIEBJbnB1dCgpIHNob3dTZWxlY3RBbGwgPSB0cnVlO1xuXG4gIEBJbnB1dCgpIGRhdGFTb3VyY2U6IFRyYW5zZmVySXRlbVtdID0gW107XG5cbiAgQElucHV0KCkgaXRlbVVuaXQ6IHN0cmluZyB8IHVuZGVmaW5lZCA9ICcnO1xuICBASW5wdXQoKSBpdGVtc1VuaXQ6IHN0cmluZyB8IHVuZGVmaW5lZCA9ICcnO1xuICBASW5wdXQoKSBmaWx0ZXIgPSAnJztcbiAgQElucHV0KCkgZGlzYWJsZWQ6IGJvb2xlYW4gPSBmYWxzZTtcbiAgQElucHV0KCkgc2hvd1NlYXJjaD86IGJvb2xlYW47XG4gIEBJbnB1dCgpIHNlYXJjaFBsYWNlaG9sZGVyPzogc3RyaW5nO1xuICBASW5wdXQoKSBub3RGb3VuZENvbnRlbnQ/OiBzdHJpbmc7XG4gIEBJbnB1dCgpIGZpbHRlck9wdGlvbj86IChpbnB1dFZhbHVlOiBzdHJpbmcsIGl0ZW06IFRyYW5zZmVySXRlbSkgPT4gYm9vbGVhbjtcblxuICBASW5wdXQoKSByZW5kZXJMaXN0OiBUZW1wbGF0ZVJlZjx2b2lkPiB8IG51bGwgPSBudWxsO1xuICBASW5wdXQoKSByZW5kZXI6IFRlbXBsYXRlUmVmPHZvaWQ+IHwgbnVsbCA9IG51bGw7XG4gIEBJbnB1dCgpIGZvb3RlcjogVGVtcGxhdGVSZWY8dm9pZD4gfCBudWxsID0gbnVsbDtcblxuICAvLyBldmVudHNcbiAgQE91dHB1dCgpIHJlYWRvbmx5IGhhbmRsZVNlbGVjdEFsbDogRXZlbnRFbWl0dGVyPGJvb2xlYW4+ID0gbmV3IEV2ZW50RW1pdHRlcjxib29sZWFuPigpO1xuICBAT3V0cHV0KCkgcmVhZG9ubHkgaGFuZGxlU2VsZWN0OiBFdmVudEVtaXR0ZXI8VHJhbnNmZXJJdGVtPiA9IG5ldyBFdmVudEVtaXR0ZXIoKTtcbiAgQE91dHB1dCgpIHJlYWRvbmx5IGZpbHRlckNoYW5nZTogRXZlbnRFbWl0dGVyPHsgZGlyZWN0aW9uOiBUcmFuc2ZlckRpcmVjdGlvbjsgdmFsdWU6IHN0cmluZyB9PiA9IG5ldyBFdmVudEVtaXR0ZXIoKTtcblxuICBAVmlld0NoaWxkcmVuKCdjaGVja2JveGVzJywgeyByZWFkOiBFbGVtZW50UmVmIH0pIGNoZWNrYm94ZXMhOiBRdWVyeUxpc3Q8RWxlbWVudFJlZjxIVE1MTGFiZWxFbGVtZW50Pj47XG5cbiAgc3RhdCA9IHtcbiAgICBjaGVja0FsbDogZmFsc2UsXG4gICAgY2hlY2tIYWxmOiBmYWxzZSxcbiAgICBjaGVja0NvdW50OiAwLFxuICAgIHNob3duQ291bnQ6IDBcbiAgfTtcblxuICBnZXQgdmFsaWREYXRhKCk6IFRyYW5zZmVySXRlbVtdIHtcbiAgICByZXR1cm4gdGhpcy5kYXRhU291cmNlLmZpbHRlcih3ID0+ICF3LmhpZGUpO1xuICB9XG5cbiAgb25JdGVtU2VsZWN0ID0gKGl0ZW06IFRyYW5zZmVySXRlbSk6IHZvaWQgPT4ge1xuICAgIGlmICh0aGlzLmRpc2FibGVkIHx8IGl0ZW0uZGlzYWJsZWQpIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG4gICAgaXRlbS5jaGVja2VkID0gIWl0ZW0uY2hlY2tlZDtcbiAgICB0aGlzLnVwZGF0ZUNoZWNrU3RhdHVzKCk7XG4gICAgdGhpcy5oYW5kbGVTZWxlY3QuZW1pdChpdGVtKTtcbiAgfTtcblxuICBvbkl0ZW1TZWxlY3RBbGwgPSAoc3RhdHVzOiBib29sZWFuKTogdm9pZCA9PiB7XG4gICAgdGhpcy5kYXRhU291cmNlLmZvckVhY2goaXRlbSA9PiB7XG4gICAgICBpZiAoIWl0ZW0uZGlzYWJsZWQgJiYgIWl0ZW0uaGlkZSkge1xuICAgICAgICBpdGVtLmNoZWNrZWQgPSBzdGF0dXM7XG4gICAgICB9XG4gICAgfSk7XG5cbiAgICB0aGlzLnVwZGF0ZUNoZWNrU3RhdHVzKCk7XG4gICAgdGhpcy5oYW5kbGVTZWxlY3RBbGwuZW1pdChzdGF0dXMpO1xuICB9O1xuXG4gIHByaXZhdGUgdXBkYXRlQ2hlY2tTdGF0dXMoKTogdm9pZCB7XG4gICAgY29uc3QgdmFsaWRDb3VudCA9IHRoaXMuZGF0YVNvdXJjZS5maWx0ZXIodyA9PiAhdy5kaXNhYmxlZCkubGVuZ3RoO1xuICAgIHRoaXMuc3RhdC5jaGVja0NvdW50ID0gdGhpcy5kYXRhU291cmNlLmZpbHRlcih3ID0+IHcuY2hlY2tlZCAmJiAhdy5kaXNhYmxlZCkubGVuZ3RoO1xuICAgIHRoaXMuc3RhdC5zaG93bkNvdW50ID0gdGhpcy52YWxpZERhdGEubGVuZ3RoO1xuICAgIHRoaXMuc3RhdC5jaGVja0FsbCA9IHZhbGlkQ291bnQgPiAwICYmIHZhbGlkQ291bnQgPT09IHRoaXMuc3RhdC5jaGVja0NvdW50O1xuICAgIHRoaXMuc3RhdC5jaGVja0hhbGYgPSB0aGlzLnN0YXQuY2hlY2tDb3VudCA+IDAgJiYgIXRoaXMuc3RhdC5jaGVja0FsbDtcbiAgfVxuXG4gIC8vICNlbmRyZWdpb25cblxuICAvLyAjcmVnaW9uIHNlYXJjaFxuXG4gIGhhbmRsZUZpbHRlcih2YWx1ZTogc3RyaW5nKTogdm9pZCB7XG4gICAgdGhpcy5maWx0ZXIgPSB2YWx1ZTtcbiAgICB0aGlzLmRhdGFTb3VyY2UuZm9yRWFjaChpdGVtID0+IHtcbiAgICAgIGl0ZW0uaGlkZSA9IHZhbHVlLmxlbmd0aCA+IDAgJiYgIXRoaXMubWF0Y2hGaWx0ZXIodmFsdWUsIGl0ZW0pO1xuICAgIH0pO1xuICAgIHRoaXMuc3RhdC5zaG93bkNvdW50ID0gdGhpcy52YWxpZERhdGEubGVuZ3RoO1xuICAgIHRoaXMuZmlsdGVyQ2hhbmdlLmVtaXQoeyBkaXJlY3Rpb246IHRoaXMuZGlyZWN0aW9uLCB2YWx1ZSB9KTtcbiAgfVxuXG4gIGhhbmRsZUNsZWFyKCk6IHZvaWQge1xuICAgIHRoaXMuaGFuZGxlRmlsdGVyKCcnKTtcbiAgfVxuXG4gIHByaXZhdGUgbWF0Y2hGaWx0ZXIodGV4dDogc3RyaW5nLCBpdGVtOiBUcmFuc2Zlckl0ZW0pOiBib29sZWFuIHtcbiAgICBpZiAodGhpcy5maWx0ZXJPcHRpb24pIHtcbiAgICAgIHJldHVybiB0aGlzLmZpbHRlck9wdGlvbih0ZXh0LCBpdGVtKTtcbiAgICB9XG4gICAgcmV0dXJuIGl0ZW0udGl0bGUuaW5jbHVkZXModGV4dCk7XG4gIH1cblxuICAvLyAjZW5kcmVnaW9uXG5cbiAgY29uc3RydWN0b3IocHJpdmF0ZSBuZ1pvbmU6IE5nWm9uZSwgcHJpdmF0ZSBjZHI6IENoYW5nZURldGVjdG9yUmVmKSB7fVxuXG4gIG1hcmtGb3JDaGVjaygpOiB2b2lkIHtcbiAgICB0aGlzLnVwZGF0ZUNoZWNrU3RhdHVzKCk7XG4gICAgdGhpcy5jZHIubWFya0ZvckNoZWNrKCk7XG4gIH1cblxuICBuZ0FmdGVyVmlld0luaXQoKTogdm9pZCB7XG4gICAgdGhpcy5jaGVja2JveGVzLmNoYW5nZXNcbiAgICAgIC5waXBlKFxuICAgICAgICBzdGFydFdpdGgodGhpcy5jaGVja2JveGVzKSxcbiAgICAgICAgc3dpdGNoTWFwKCgpID0+IHtcbiAgICAgICAgICBjb25zdCBjaGVja2JveGVzID0gdGhpcy5jaGVja2JveGVzLnRvQXJyYXkoKTtcbiAgICAgICAgICAvLyBDYXJldGFrZXIgbm90ZTogd2UgZXhwbGljaXRseSBzaG91bGQgY2FsbCBgc3Vic2NyaWJlKClgIHdpdGhpbiB0aGUgcm9vdCB6b25lLlxuICAgICAgICAgIC8vIGBydW5PdXRzaWRlQW5ndWxhcigoKSA9PiBmcm9tRXZlbnQoLi4uKSlgIHdpbGwganVzdCBjcmVhdGUgYW4gb2JzZXJ2YWJsZSB3aXRoaW4gdGhlIHJvb3Qgem9uZSxcbiAgICAgICAgICAvLyBidXQgYGFkZEV2ZW50TGlzdGVuZXJgIGlzIGNhbGxlZCB3aGVuIHRoZSBgZnJvbUV2ZW50YCBpcyBzdWJzY3JpYmVkLlxuICAgICAgICAgIHJldHVybiBuZXcgT2JzZXJ2YWJsZTxNb3VzZUV2ZW50PihzdWJzY3JpYmVyID0+XG4gICAgICAgICAgICB0aGlzLm5nWm9uZS5ydW5PdXRzaWRlQW5ndWxhcigoKSA9PlxuICAgICAgICAgICAgICBtZXJnZSguLi5jaGVja2JveGVzLm1hcChjaGVja2JveCA9PiBmcm9tRXZlbnQ8TW91c2VFdmVudD4oY2hlY2tib3gubmF0aXZlRWxlbWVudCwgJ2NsaWNrJykpKS5zdWJzY3JpYmUoXG4gICAgICAgICAgICAgICAgc3Vic2NyaWJlclxuICAgICAgICAgICAgICApXG4gICAgICAgICAgICApXG4gICAgICAgICAgKTtcbiAgICAgICAgfSlcbiAgICAgIClcbiAgICAgIC5zdWJzY3JpYmUoZXZlbnQgPT4ge1xuICAgICAgICBldmVudC5zdG9wUHJvcGFnYXRpb24oKTtcbiAgICAgIH0pO1xuICB9XG59XG4iXX0=