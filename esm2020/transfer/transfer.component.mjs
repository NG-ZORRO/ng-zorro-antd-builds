import { __decorate } from "tslib";
import { ChangeDetectionStrategy, Component, EventEmitter, Input, Optional, Output, ViewChildren, ViewEncapsulation } from '@angular/core';
import { of, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { InputBoolean, toArray } from 'ng-zorro-antd/core/util';
import { NzTransferListComponent } from './transfer-list.component';
import * as i0 from "@angular/core";
import * as i1 from "ng-zorro-antd/i18n";
import * as i2 from "@angular/cdk/bidi";
import * as i3 from "./transfer-list.component";
import * as i4 from "ng-zorro-antd/button";
import * as i5 from "@angular/common";
import * as i6 from "ng-zorro-antd/core/wave";
import * as i7 from "ng-zorro-antd/core/transition-patch";
import * as i8 from "ng-zorro-antd/icon";
export class NzTransferComponent {
    // #endregion
    constructor(cdr, i18n, directionality) {
        this.cdr = cdr;
        this.i18n = i18n;
        this.directionality = directionality;
        this.unsubscribe$ = new Subject();
        this.leftFilter = '';
        this.rightFilter = '';
        this.dir = 'ltr';
        // #region fields
        this.nzDisabled = false;
        this.nzDataSource = [];
        this.nzTitles = ['', ''];
        this.nzOperations = [];
        this.nzListStyle = {};
        this.nzShowSelectAll = true;
        this.nzCanMove = (arg) => of(arg.list);
        this.nzRenderList = null;
        this.nzRender = null;
        this.nzFooter = null;
        this.nzShowSearch = false;
        this.nzTargetKeys = [];
        this.nzSelectedKeys = [];
        // events
        this.nzChange = new EventEmitter();
        this.nzSearchChange = new EventEmitter();
        this.nzSelectChange = new EventEmitter();
        // #endregion
        // #region process data
        // left
        this.leftDataSource = [];
        // right
        this.rightDataSource = [];
        this.handleLeftSelectAll = (checked) => this.handleSelect('left', checked);
        this.handleRightSelectAll = (checked) => this.handleSelect('right', checked);
        this.handleLeftSelect = (item) => this.handleSelect('left', !!item.checked, item);
        this.handleRightSelect = (item) => this.handleSelect('right', !!item.checked, item);
        // #endregion
        // #region operation
        this.leftActive = false;
        this.rightActive = false;
        this.moveToLeft = () => this.moveTo('left');
        this.moveToRight = () => this.moveTo('right');
    }
    splitDataSource() {
        this.leftDataSource = [];
        this.rightDataSource = [];
        this.nzDataSource.forEach(record => {
            if (record.direction === 'right') {
                record.direction = 'right';
                this.rightDataSource.push(record);
            }
            else {
                record.direction = 'left';
                this.leftDataSource.push(record);
            }
        });
    }
    getCheckedData(direction) {
        return this[direction === 'left' ? 'leftDataSource' : 'rightDataSource'].filter(w => w.checked);
    }
    handleSelect(direction, checked, item) {
        const list = this.getCheckedData(direction);
        this.updateOperationStatus(direction, list.length);
        this.nzSelectChange.emit({ direction, checked, list, item });
    }
    handleFilterChange(ret) {
        this.nzSearchChange.emit(ret);
    }
    updateOperationStatus(direction, count) {
        this[direction === 'right' ? 'leftActive' : 'rightActive'] =
            (typeof count === 'undefined' ? this.getCheckedData(direction).filter(w => !w.disabled).length : count) > 0;
    }
    moveTo(direction) {
        const oppositeDirection = direction === 'left' ? 'right' : 'left';
        this.updateOperationStatus(oppositeDirection, 0);
        const datasource = direction === 'left' ? this.rightDataSource : this.leftDataSource;
        const moveList = datasource.filter(item => item.checked === true && !item.disabled);
        this.nzCanMove({ direction, list: moveList }).subscribe(newMoveList => this.truthMoveTo(direction, newMoveList.filter(i => !!i)), () => moveList.forEach(i => (i.checked = false)));
    }
    truthMoveTo(direction, list) {
        const oppositeDirection = direction === 'left' ? 'right' : 'left';
        const datasource = direction === 'left' ? this.rightDataSource : this.leftDataSource;
        const targetDatasource = direction === 'left' ? this.leftDataSource : this.rightDataSource;
        for (const item of list) {
            item.checked = false;
            item.hide = false;
            item.direction = direction;
            datasource.splice(datasource.indexOf(item), 1);
        }
        targetDatasource.splice(0, 0, ...list);
        this.updateOperationStatus(oppositeDirection);
        this.nzChange.emit({
            from: oppositeDirection,
            to: direction,
            list
        });
        this.markForCheckAllList();
    }
    markForCheckAllList() {
        if (!this.lists) {
            return;
        }
        this.lists.forEach(i => i.markForCheck());
    }
    handleNzTargetKeys() {
        const keys = toArray(this.nzTargetKeys);
        const hasOwnKey = (e) => e.hasOwnProperty('key');
        this.leftDataSource.forEach(e => {
            if (hasOwnKey(e) && keys.indexOf(e.key) !== -1 && !e.disabled) {
                e.checked = true;
            }
        });
        this.moveToRight();
    }
    handleNzSelectedKeys() {
        const keys = toArray(this.nzSelectedKeys);
        this.nzDataSource.forEach(e => {
            if (keys.indexOf(e.key) !== -1) {
                e.checked = true;
            }
        });
        const term = (ld) => ld.disabled === false && ld.checked === true;
        this.rightActive = this.leftDataSource.some(term);
        this.leftActive = this.rightDataSource.some(term);
    }
    ngOnInit() {
        this.i18n.localeChange.pipe(takeUntil(this.unsubscribe$)).subscribe(() => {
            this.locale = this.i18n.getLocaleData('Transfer');
            this.markForCheckAllList();
        });
        this.dir = this.directionality.value;
        this.directionality.change?.pipe(takeUntil(this.unsubscribe$)).subscribe((direction) => {
            this.dir = direction;
            this.cdr.detectChanges();
        });
    }
    ngOnChanges(changes) {
        if (changes.nzDataSource) {
            this.splitDataSource();
            this.updateOperationStatus('left');
            this.updateOperationStatus('right');
            this.cdr.detectChanges();
            this.markForCheckAllList();
        }
        if (changes.nzTargetKeys) {
            this.handleNzTargetKeys();
        }
        if (changes.nzSelectedKeys) {
            this.handleNzSelectedKeys();
        }
    }
    ngOnDestroy() {
        this.unsubscribe$.next();
        this.unsubscribe$.complete();
    }
}
NzTransferComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.1.2", ngImport: i0, type: NzTransferComponent, deps: [{ token: i0.ChangeDetectorRef }, { token: i1.NzI18nService }, { token: i2.Directionality, optional: true }], target: i0.ɵɵFactoryTarget.Component });
NzTransferComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "13.1.2", type: NzTransferComponent, selector: "nz-transfer", inputs: { nzDisabled: "nzDisabled", nzDataSource: "nzDataSource", nzTitles: "nzTitles", nzOperations: "nzOperations", nzListStyle: "nzListStyle", nzShowSelectAll: "nzShowSelectAll", nzItemUnit: "nzItemUnit", nzItemsUnit: "nzItemsUnit", nzCanMove: "nzCanMove", nzRenderList: "nzRenderList", nzRender: "nzRender", nzFooter: "nzFooter", nzShowSearch: "nzShowSearch", nzFilterOption: "nzFilterOption", nzSearchPlaceholder: "nzSearchPlaceholder", nzNotFoundContent: "nzNotFoundContent", nzTargetKeys: "nzTargetKeys", nzSelectedKeys: "nzSelectedKeys" }, outputs: { nzChange: "nzChange", nzSearchChange: "nzSearchChange", nzSelectChange: "nzSelectChange" }, host: { properties: { "class.ant-transfer-rtl": "dir === 'rtl'", "class.ant-transfer-disabled": "nzDisabled", "class.ant-transfer-customize-list": "nzRenderList" }, classAttribute: "ant-transfer" }, viewQueries: [{ propertyName: "lists", predicate: NzTransferListComponent, descendants: true }], exportAs: ["nzTransfer"], usesOnChanges: true, ngImport: i0, template: `
    <nz-transfer-list
      class="ant-transfer-list"
      [ngStyle]="nzListStyle"
      data-direction="left"
      direction="left"
      [titleText]="nzTitles[0]"
      [showSelectAll]="nzShowSelectAll"
      [dataSource]="leftDataSource"
      [filter]="leftFilter"
      [filterOption]="nzFilterOption"
      (filterChange)="handleFilterChange($event)"
      [renderList]="nzRenderList && nzRenderList[0]"
      [render]="nzRender"
      [disabled]="nzDisabled"
      [showSearch]="nzShowSearch"
      [searchPlaceholder]="nzSearchPlaceholder || locale?.searchPlaceholder"
      [notFoundContent]="nzNotFoundContent"
      [itemUnit]="nzItemUnit || locale?.itemUnit"
      [itemsUnit]="nzItemsUnit || locale?.itemsUnit"
      [footer]="nzFooter"
      (handleSelect)="handleLeftSelect($event)"
      (handleSelectAll)="handleLeftSelectAll($event)"
    ></nz-transfer-list>
    <div *ngIf="dir !== 'rtl'" class="ant-transfer-operation">
      <button
        nz-button
        (click)="moveToLeft()"
        [disabled]="nzDisabled || !leftActive"
        [nzType]="'primary'"
        [nzSize]="'small'"
      >
        <i nz-icon nzType="left"></i>
        <span *ngIf="nzOperations[1]">{{ nzOperations[1] }}</span>
      </button>
      <button
        nz-button
        (click)="moveToRight()"
        [disabled]="nzDisabled || !rightActive"
        [nzType]="'primary'"
        [nzSize]="'small'"
      >
        <i nz-icon nzType="right"></i>
        <span *ngIf="nzOperations[0]">{{ nzOperations[0] }}</span>
      </button>
    </div>
    <div *ngIf="dir === 'rtl'" class="ant-transfer-operation">
      <button
        nz-button
        (click)="moveToRight()"
        [disabled]="nzDisabled || !rightActive"
        [nzType]="'primary'"
        [nzSize]="'small'"
      >
        <i nz-icon nzType="left"></i>
        <span *ngIf="nzOperations[0]">{{ nzOperations[0] }}</span>
      </button>
      <button
        nz-button
        (click)="moveToLeft()"
        [disabled]="nzDisabled || !leftActive"
        [nzType]="'primary'"
        [nzSize]="'small'"
      >
        <i nz-icon nzType="right"></i>
        <span *ngIf="nzOperations[1]">{{ nzOperations[1] }}</span>
      </button>
    </div>
    <nz-transfer-list
      class="ant-transfer-list"
      [ngStyle]="nzListStyle"
      data-direction="right"
      direction="right"
      [titleText]="nzTitles[1]"
      [showSelectAll]="nzShowSelectAll"
      [dataSource]="rightDataSource"
      [filter]="rightFilter"
      [filterOption]="nzFilterOption"
      (filterChange)="handleFilterChange($event)"
      [renderList]="nzRenderList && nzRenderList[1]"
      [render]="nzRender"
      [disabled]="nzDisabled"
      [showSearch]="nzShowSearch"
      [searchPlaceholder]="nzSearchPlaceholder || locale?.searchPlaceholder"
      [notFoundContent]="nzNotFoundContent"
      [itemUnit]="nzItemUnit || locale?.itemUnit"
      [itemsUnit]="nzItemsUnit || locale?.itemsUnit"
      [footer]="nzFooter"
      (handleSelect)="handleRightSelect($event)"
      (handleSelectAll)="handleRightSelectAll($event)"
    ></nz-transfer-list>
  `, isInline: true, components: [{ type: i3.NzTransferListComponent, selector: "nz-transfer-list", inputs: ["direction", "titleText", "showSelectAll", "dataSource", "itemUnit", "itemsUnit", "filter", "disabled", "showSearch", "searchPlaceholder", "notFoundContent", "filterOption", "renderList", "render", "footer"], outputs: ["handleSelectAll", "handleSelect", "filterChange"], exportAs: ["nzTransferList"] }, { type: i4.NzButtonComponent, selector: "button[nz-button], a[nz-button]", inputs: ["nzBlock", "nzGhost", "nzSearch", "nzLoading", "nzDanger", "disabled", "tabIndex", "nzType", "nzShape", "nzSize"], exportAs: ["nzButton"] }], directives: [{ type: i5.NgStyle, selector: "[ngStyle]", inputs: ["ngStyle"] }, { type: i5.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { type: i6.NzWaveDirective, selector: "[nz-wave],button[nz-button]:not([nzType=\"link\"]):not([nzType=\"text\"])", inputs: ["nzWaveExtraNode"], exportAs: ["nzWave"] }, { type: i7.ɵNzTransitionPatchDirective, selector: "[nz-button], nz-button-group, [nz-icon], [nz-menu-item], [nz-submenu], nz-select-top-control, nz-select-placeholder, nz-input-group", inputs: ["hidden"] }, { type: i8.NzIconDirective, selector: "[nz-icon]", inputs: ["nzSpin", "nzRotate", "nzType", "nzTheme", "nzTwotoneColor", "nzIconfont"], exportAs: ["nzIcon"] }], changeDetection: i0.ChangeDetectionStrategy.OnPush, encapsulation: i0.ViewEncapsulation.None });
__decorate([
    InputBoolean()
], NzTransferComponent.prototype, "nzDisabled", void 0);
__decorate([
    InputBoolean()
], NzTransferComponent.prototype, "nzShowSelectAll", void 0);
__decorate([
    InputBoolean()
], NzTransferComponent.prototype, "nzShowSearch", void 0);
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.1.2", ngImport: i0, type: NzTransferComponent, decorators: [{
            type: Component,
            args: [{
                    selector: 'nz-transfer',
                    exportAs: 'nzTransfer',
                    preserveWhitespaces: false,
                    template: `
    <nz-transfer-list
      class="ant-transfer-list"
      [ngStyle]="nzListStyle"
      data-direction="left"
      direction="left"
      [titleText]="nzTitles[0]"
      [showSelectAll]="nzShowSelectAll"
      [dataSource]="leftDataSource"
      [filter]="leftFilter"
      [filterOption]="nzFilterOption"
      (filterChange)="handleFilterChange($event)"
      [renderList]="nzRenderList && nzRenderList[0]"
      [render]="nzRender"
      [disabled]="nzDisabled"
      [showSearch]="nzShowSearch"
      [searchPlaceholder]="nzSearchPlaceholder || locale?.searchPlaceholder"
      [notFoundContent]="nzNotFoundContent"
      [itemUnit]="nzItemUnit || locale?.itemUnit"
      [itemsUnit]="nzItemsUnit || locale?.itemsUnit"
      [footer]="nzFooter"
      (handleSelect)="handleLeftSelect($event)"
      (handleSelectAll)="handleLeftSelectAll($event)"
    ></nz-transfer-list>
    <div *ngIf="dir !== 'rtl'" class="ant-transfer-operation">
      <button
        nz-button
        (click)="moveToLeft()"
        [disabled]="nzDisabled || !leftActive"
        [nzType]="'primary'"
        [nzSize]="'small'"
      >
        <i nz-icon nzType="left"></i>
        <span *ngIf="nzOperations[1]">{{ nzOperations[1] }}</span>
      </button>
      <button
        nz-button
        (click)="moveToRight()"
        [disabled]="nzDisabled || !rightActive"
        [nzType]="'primary'"
        [nzSize]="'small'"
      >
        <i nz-icon nzType="right"></i>
        <span *ngIf="nzOperations[0]">{{ nzOperations[0] }}</span>
      </button>
    </div>
    <div *ngIf="dir === 'rtl'" class="ant-transfer-operation">
      <button
        nz-button
        (click)="moveToRight()"
        [disabled]="nzDisabled || !rightActive"
        [nzType]="'primary'"
        [nzSize]="'small'"
      >
        <i nz-icon nzType="left"></i>
        <span *ngIf="nzOperations[0]">{{ nzOperations[0] }}</span>
      </button>
      <button
        nz-button
        (click)="moveToLeft()"
        [disabled]="nzDisabled || !leftActive"
        [nzType]="'primary'"
        [nzSize]="'small'"
      >
        <i nz-icon nzType="right"></i>
        <span *ngIf="nzOperations[1]">{{ nzOperations[1] }}</span>
      </button>
    </div>
    <nz-transfer-list
      class="ant-transfer-list"
      [ngStyle]="nzListStyle"
      data-direction="right"
      direction="right"
      [titleText]="nzTitles[1]"
      [showSelectAll]="nzShowSelectAll"
      [dataSource]="rightDataSource"
      [filter]="rightFilter"
      [filterOption]="nzFilterOption"
      (filterChange)="handleFilterChange($event)"
      [renderList]="nzRenderList && nzRenderList[1]"
      [render]="nzRender"
      [disabled]="nzDisabled"
      [showSearch]="nzShowSearch"
      [searchPlaceholder]="nzSearchPlaceholder || locale?.searchPlaceholder"
      [notFoundContent]="nzNotFoundContent"
      [itemUnit]="nzItemUnit || locale?.itemUnit"
      [itemsUnit]="nzItemsUnit || locale?.itemsUnit"
      [footer]="nzFooter"
      (handleSelect)="handleRightSelect($event)"
      (handleSelectAll)="handleRightSelectAll($event)"
    ></nz-transfer-list>
  `,
                    host: {
                        class: 'ant-transfer',
                        '[class.ant-transfer-rtl]': `dir === 'rtl'`,
                        '[class.ant-transfer-disabled]': `nzDisabled`,
                        '[class.ant-transfer-customize-list]': `nzRenderList`
                    },
                    encapsulation: ViewEncapsulation.None,
                    changeDetection: ChangeDetectionStrategy.OnPush
                }]
        }], ctorParameters: function () { return [{ type: i0.ChangeDetectorRef }, { type: i1.NzI18nService }, { type: i2.Directionality, decorators: [{
                    type: Optional
                }] }]; }, propDecorators: { lists: [{
                type: ViewChildren,
                args: [NzTransferListComponent]
            }], nzDisabled: [{
                type: Input
            }], nzDataSource: [{
                type: Input
            }], nzTitles: [{
                type: Input
            }], nzOperations: [{
                type: Input
            }], nzListStyle: [{
                type: Input
            }], nzShowSelectAll: [{
                type: Input
            }], nzItemUnit: [{
                type: Input
            }], nzItemsUnit: [{
                type: Input
            }], nzCanMove: [{
                type: Input
            }], nzRenderList: [{
                type: Input
            }], nzRender: [{
                type: Input
            }], nzFooter: [{
                type: Input
            }], nzShowSearch: [{
                type: Input
            }], nzFilterOption: [{
                type: Input
            }], nzSearchPlaceholder: [{
                type: Input
            }], nzNotFoundContent: [{
                type: Input
            }], nzTargetKeys: [{
                type: Input
            }], nzSelectedKeys: [{
                type: Input
            }], nzChange: [{
                type: Output
            }], nzSearchChange: [{
                type: Output
            }], nzSelectChange: [{
                type: Output
            }] } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidHJhbnNmZXIuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vY29tcG9uZW50cy90cmFuc2Zlci90cmFuc2Zlci5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQU1BLE9BQU8sRUFDTCx1QkFBdUIsRUFFdkIsU0FBUyxFQUNULFlBQVksRUFDWixLQUFLLEVBSUwsUUFBUSxFQUNSLE1BQU0sRUFJTixZQUFZLEVBQ1osaUJBQWlCLEVBQ2xCLE1BQU0sZUFBZSxDQUFDO0FBQ3ZCLE9BQU8sRUFBYyxFQUFFLEVBQUUsT0FBTyxFQUFFLE1BQU0sTUFBTSxDQUFDO0FBQy9DLE9BQU8sRUFBRSxTQUFTLEVBQUUsTUFBTSxnQkFBZ0IsQ0FBQztBQUczQyxPQUFPLEVBQUUsWUFBWSxFQUFFLE9BQU8sRUFBRSxNQUFNLHlCQUF5QixDQUFDO0FBV2hFLE9BQU8sRUFBRSx1QkFBdUIsRUFBRSxNQUFNLDJCQUEyQixDQUFDOzs7Ozs7Ozs7O0FBMkdwRSxNQUFNLE9BQU8sbUJBQW1CO0lBc0k5QixhQUFhO0lBRWIsWUFDVSxHQUFzQixFQUN0QixJQUFtQixFQUNQLGNBQThCO1FBRjFDLFFBQUcsR0FBSCxHQUFHLENBQW1CO1FBQ3RCLFNBQUksR0FBSixJQUFJLENBQWU7UUFDUCxtQkFBYyxHQUFkLGNBQWMsQ0FBZ0I7UUF0STVDLGlCQUFZLEdBQUcsSUFBSSxPQUFPLEVBQVEsQ0FBQztRQUszQyxlQUFVLEdBQUcsRUFBRSxDQUFDO1FBQ2hCLGdCQUFXLEdBQUcsRUFBRSxDQUFDO1FBQ2pCLFFBQUcsR0FBYyxLQUFLLENBQUM7UUFFdkIsaUJBQWlCO1FBRVEsZUFBVSxHQUFHLEtBQUssQ0FBQztRQUNuQyxpQkFBWSxHQUFtQixFQUFFLENBQUM7UUFDbEMsYUFBUSxHQUFhLENBQUMsRUFBRSxFQUFFLEVBQUUsQ0FBQyxDQUFDO1FBQzlCLGlCQUFZLEdBQWEsRUFBRSxDQUFDO1FBQzVCLGdCQUFXLEdBQXFCLEVBQUUsQ0FBQztRQUNuQixvQkFBZSxHQUFHLElBQUksQ0FBQztRQUd2QyxjQUFTLEdBQXlELENBQUMsR0FBb0IsRUFBRSxFQUFFLENBQUMsRUFBRSxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsQ0FBQztRQUN6RyxpQkFBWSxHQUFnRCxJQUFJLENBQUM7UUFDakUsYUFBUSxHQUFrQyxJQUFJLENBQUM7UUFDL0MsYUFBUSxHQUFrQyxJQUFJLENBQUM7UUFDL0IsaUJBQVksR0FBRyxLQUFLLENBQUM7UUFJckMsaUJBQVksR0FBYSxFQUFFLENBQUM7UUFDNUIsbUJBQWMsR0FBYSxFQUFFLENBQUM7UUFFdkMsU0FBUztRQUNVLGFBQVEsR0FBRyxJQUFJLFlBQVksRUFBa0IsQ0FBQztRQUM5QyxtQkFBYyxHQUFHLElBQUksWUFBWSxFQUF3QixDQUFDO1FBQzFELG1CQUFjLEdBQUcsSUFBSSxZQUFZLEVBQXdCLENBQUM7UUFFN0UsYUFBYTtRQUViLHVCQUF1QjtRQUV2QixPQUFPO1FBQ1AsbUJBQWMsR0FBbUIsRUFBRSxDQUFDO1FBRXBDLFFBQVE7UUFDUixvQkFBZSxHQUFtQixFQUFFLENBQUM7UUFvQnJDLHdCQUFtQixHQUFHLENBQUMsT0FBZ0IsRUFBUSxFQUFFLENBQUMsSUFBSSxDQUFDLFlBQVksQ0FBQyxNQUFNLEVBQUUsT0FBTyxDQUFDLENBQUM7UUFDckYseUJBQW9CLEdBQUcsQ0FBQyxPQUFnQixFQUFRLEVBQUUsQ0FBQyxJQUFJLENBQUMsWUFBWSxDQUFDLE9BQU8sRUFBRSxPQUFPLENBQUMsQ0FBQztRQUV2RixxQkFBZ0IsR0FBRyxDQUFDLElBQWtCLEVBQVEsRUFBRSxDQUFDLElBQUksQ0FBQyxZQUFZLENBQUMsTUFBTSxFQUFFLENBQUMsQ0FBQyxJQUFJLENBQUMsT0FBTyxFQUFFLElBQUksQ0FBQyxDQUFDO1FBQ2pHLHNCQUFpQixHQUFHLENBQUMsSUFBa0IsRUFBUSxFQUFFLENBQUMsSUFBSSxDQUFDLFlBQVksQ0FBQyxPQUFPLEVBQUUsQ0FBQyxDQUFDLElBQUksQ0FBQyxPQUFPLEVBQUUsSUFBSSxDQUFDLENBQUM7UUFZbkcsYUFBYTtRQUViLG9CQUFvQjtRQUVwQixlQUFVLEdBQUcsS0FBSyxDQUFDO1FBQ25CLGdCQUFXLEdBQUcsS0FBSyxDQUFDO1FBT3BCLGVBQVUsR0FBRyxHQUFTLEVBQUUsQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLE1BQU0sQ0FBQyxDQUFDO1FBQzdDLGdCQUFXLEdBQUcsR0FBUyxFQUFFLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxPQUFPLENBQUMsQ0FBQztJQTJDNUMsQ0FBQztJQTFGSSxlQUFlO1FBQ3JCLElBQUksQ0FBQyxjQUFjLEdBQUcsRUFBRSxDQUFDO1FBQ3pCLElBQUksQ0FBQyxlQUFlLEdBQUcsRUFBRSxDQUFDO1FBQzFCLElBQUksQ0FBQyxZQUFZLENBQUMsT0FBTyxDQUFDLE1BQU0sQ0FBQyxFQUFFO1lBQ2pDLElBQUksTUFBTSxDQUFDLFNBQVMsS0FBSyxPQUFPLEVBQUU7Z0JBQ2hDLE1BQU0sQ0FBQyxTQUFTLEdBQUcsT0FBTyxDQUFDO2dCQUMzQixJQUFJLENBQUMsZUFBZSxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQzthQUNuQztpQkFBTTtnQkFDTCxNQUFNLENBQUMsU0FBUyxHQUFHLE1BQU0sQ0FBQztnQkFDMUIsSUFBSSxDQUFDLGNBQWMsQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUM7YUFDbEM7UUFDSCxDQUFDLENBQUMsQ0FBQztJQUNMLENBQUM7SUFFTyxjQUFjLENBQUMsU0FBNEI7UUFDakQsT0FBTyxJQUFJLENBQUMsU0FBUyxLQUFLLE1BQU0sQ0FBQyxDQUFDLENBQUMsZ0JBQWdCLENBQUMsQ0FBQyxDQUFDLGlCQUFpQixDQUFDLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxDQUFDO0lBQ2xHLENBQUM7SUFRRCxZQUFZLENBQUMsU0FBNEIsRUFBRSxPQUFnQixFQUFFLElBQW1CO1FBQzlFLE1BQU0sSUFBSSxHQUFHLElBQUksQ0FBQyxjQUFjLENBQUMsU0FBUyxDQUFDLENBQUM7UUFDNUMsSUFBSSxDQUFDLHFCQUFxQixDQUFDLFNBQVMsRUFBRSxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUM7UUFDbkQsSUFBSSxDQUFDLGNBQWMsQ0FBQyxJQUFJLENBQUMsRUFBRSxTQUFTLEVBQUUsT0FBTyxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsQ0FBQyxDQUFDO0lBQy9ELENBQUM7SUFFRCxrQkFBa0IsQ0FBQyxHQUFvRDtRQUNyRSxJQUFJLENBQUMsY0FBYyxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQztJQUNoQyxDQUFDO0lBU08scUJBQXFCLENBQUMsU0FBNEIsRUFBRSxLQUFjO1FBQ3hFLElBQUksQ0FBQyxTQUFTLEtBQUssT0FBTyxDQUFDLENBQUMsQ0FBQyxZQUFZLENBQUMsQ0FBQyxDQUFDLGFBQWEsQ0FBQztZQUN4RCxDQUFDLE9BQU8sS0FBSyxLQUFLLFdBQVcsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLGNBQWMsQ0FBQyxTQUFTLENBQUMsQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxRQUFRLENBQUMsQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsQ0FBQztJQUNoSCxDQUFDO0lBS0QsTUFBTSxDQUFDLFNBQTRCO1FBQ2pDLE1BQU0saUJBQWlCLEdBQUcsU0FBUyxLQUFLLE1BQU0sQ0FBQyxDQUFDLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxNQUFNLENBQUM7UUFDbEUsSUFBSSxDQUFDLHFCQUFxQixDQUFDLGlCQUFpQixFQUFFLENBQUMsQ0FBQyxDQUFDO1FBQ2pELE1BQU0sVUFBVSxHQUFHLFNBQVMsS0FBSyxNQUFNLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxlQUFlLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxjQUFjLENBQUM7UUFDckYsTUFBTSxRQUFRLEdBQUcsVUFBVSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsRUFBRSxDQUFDLElBQUksQ0FBQyxPQUFPLEtBQUssSUFBSSxJQUFJLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxDQUFDO1FBQ3BGLElBQUksQ0FBQyxTQUFTLENBQUMsRUFBRSxTQUFTLEVBQUUsSUFBSSxFQUFFLFFBQVEsRUFBRSxDQUFDLENBQUMsU0FBUyxDQUNyRCxXQUFXLENBQUMsRUFBRSxDQUNaLElBQUksQ0FBQyxXQUFXLENBQ2QsU0FBUyxFQUNULFdBQVcsQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQzdCLEVBQ0gsR0FBRyxFQUFFLENBQUMsUUFBUSxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDLE9BQU8sR0FBRyxLQUFLLENBQUMsQ0FBQyxDQUNqRCxDQUFDO0lBQ0osQ0FBQztJQUVPLFdBQVcsQ0FBQyxTQUE0QixFQUFFLElBQW9CO1FBQ3BFLE1BQU0saUJBQWlCLEdBQUcsU0FBUyxLQUFLLE1BQU0sQ0FBQyxDQUFDLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxNQUFNLENBQUM7UUFDbEUsTUFBTSxVQUFVLEdBQUcsU0FBUyxLQUFLLE1BQU0sQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLGVBQWUsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLGNBQWMsQ0FBQztRQUNyRixNQUFNLGdCQUFnQixHQUFHLFNBQVMsS0FBSyxNQUFNLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxjQUFjLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxlQUFlLENBQUM7UUFDM0YsS0FBSyxNQUFNLElBQUksSUFBSSxJQUFJLEVBQUU7WUFDdkIsSUFBSSxDQUFDLE9BQU8sR0FBRyxLQUFLLENBQUM7WUFDckIsSUFBSSxDQUFDLElBQUksR0FBRyxLQUFLLENBQUM7WUFDbEIsSUFBSSxDQUFDLFNBQVMsR0FBRyxTQUFTLENBQUM7WUFDM0IsVUFBVSxDQUFDLE1BQU0sQ0FBQyxVQUFVLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDO1NBQ2hEO1FBQ0QsZ0JBQWdCLENBQUMsTUFBTSxDQUFDLENBQUMsRUFBRSxDQUFDLEVBQUUsR0FBRyxJQUFJLENBQUMsQ0FBQztRQUN2QyxJQUFJLENBQUMscUJBQXFCLENBQUMsaUJBQWlCLENBQUMsQ0FBQztRQUM5QyxJQUFJLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQztZQUNqQixJQUFJLEVBQUUsaUJBQWlCO1lBQ3ZCLEVBQUUsRUFBRSxTQUFTO1lBQ2IsSUFBSTtTQUNMLENBQUMsQ0FBQztRQUNILElBQUksQ0FBQyxtQkFBbUIsRUFBRSxDQUFDO0lBQzdCLENBQUM7SUFVTyxtQkFBbUI7UUFDekIsSUFBSSxDQUFDLElBQUksQ0FBQyxLQUFLLEVBQUU7WUFDZixPQUFPO1NBQ1I7UUFDRCxJQUFJLENBQUMsS0FBSyxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxZQUFZLEVBQUUsQ0FBQyxDQUFDO0lBQzVDLENBQUM7SUFFTyxrQkFBa0I7UUFDeEIsTUFBTSxJQUFJLEdBQUcsT0FBTyxDQUFDLElBQUksQ0FBQyxZQUFZLENBQUMsQ0FBQztRQUN4QyxNQUFNLFNBQVMsR0FBRyxDQUFDLENBQWUsRUFBVyxFQUFFLENBQUMsQ0FBQyxDQUFDLGNBQWMsQ0FBQyxLQUFLLENBQUMsQ0FBQztRQUN4RSxJQUFJLENBQUMsY0FBYyxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsRUFBRTtZQUM5QixJQUFJLFNBQVMsQ0FBQyxDQUFDLENBQUMsSUFBSSxJQUFJLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsS0FBSyxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxRQUFRLEVBQUU7Z0JBQzdELENBQUMsQ0FBQyxPQUFPLEdBQUcsSUFBSSxDQUFDO2FBQ2xCO1FBQ0gsQ0FBQyxDQUFDLENBQUM7UUFDSCxJQUFJLENBQUMsV0FBVyxFQUFFLENBQUM7SUFDckIsQ0FBQztJQUVPLG9CQUFvQjtRQUMxQixNQUFNLElBQUksR0FBRyxPQUFPLENBQUMsSUFBSSxDQUFDLGNBQWMsQ0FBQyxDQUFDO1FBQzFDLElBQUksQ0FBQyxZQUFZLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxFQUFFO1lBQzVCLElBQUksSUFBSSxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLEtBQUssQ0FBQyxDQUFDLEVBQUU7Z0JBQzlCLENBQUMsQ0FBQyxPQUFPLEdBQUcsSUFBSSxDQUFDO2FBQ2xCO1FBQ0gsQ0FBQyxDQUFDLENBQUM7UUFDSCxNQUFNLElBQUksR0FBRyxDQUFDLEVBQWdCLEVBQVcsRUFBRSxDQUFDLEVBQUUsQ0FBQyxRQUFRLEtBQUssS0FBSyxJQUFJLEVBQUUsQ0FBQyxPQUFPLEtBQUssSUFBSSxDQUFDO1FBQ3pGLElBQUksQ0FBQyxXQUFXLEdBQUcsSUFBSSxDQUFDLGNBQWMsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUM7UUFDbEQsSUFBSSxDQUFDLFVBQVUsR0FBRyxJQUFJLENBQUMsZUFBZSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQztJQUNwRCxDQUFDO0lBRUQsUUFBUTtRQUNOLElBQUksQ0FBQyxJQUFJLENBQUMsWUFBWSxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLFlBQVksQ0FBQyxDQUFDLENBQUMsU0FBUyxDQUFDLEdBQUcsRUFBRTtZQUN2RSxJQUFJLENBQUMsTUFBTSxHQUFHLElBQUksQ0FBQyxJQUFJLENBQUMsYUFBYSxDQUFDLFVBQVUsQ0FBQyxDQUFDO1lBQ2xELElBQUksQ0FBQyxtQkFBbUIsRUFBRSxDQUFDO1FBQzdCLENBQUMsQ0FBQyxDQUFDO1FBRUgsSUFBSSxDQUFDLEdBQUcsR0FBRyxJQUFJLENBQUMsY0FBYyxDQUFDLEtBQUssQ0FBQztRQUNyQyxJQUFJLENBQUMsY0FBYyxDQUFDLE1BQU0sRUFBRSxJQUFJLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxZQUFZLENBQUMsQ0FBQyxDQUFDLFNBQVMsQ0FBQyxDQUFDLFNBQW9CLEVBQUUsRUFBRTtZQUNoRyxJQUFJLENBQUMsR0FBRyxHQUFHLFNBQVMsQ0FBQztZQUNyQixJQUFJLENBQUMsR0FBRyxDQUFDLGFBQWEsRUFBRSxDQUFDO1FBQzNCLENBQUMsQ0FBQyxDQUFDO0lBQ0wsQ0FBQztJQUVELFdBQVcsQ0FBQyxPQUFzQjtRQUNoQyxJQUFJLE9BQU8sQ0FBQyxZQUFZLEVBQUU7WUFDeEIsSUFBSSxDQUFDLGVBQWUsRUFBRSxDQUFDO1lBQ3ZCLElBQUksQ0FBQyxxQkFBcUIsQ0FBQyxNQUFNLENBQUMsQ0FBQztZQUNuQyxJQUFJLENBQUMscUJBQXFCLENBQUMsT0FBTyxDQUFDLENBQUM7WUFDcEMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxhQUFhLEVBQUUsQ0FBQztZQUN6QixJQUFJLENBQUMsbUJBQW1CLEVBQUUsQ0FBQztTQUM1QjtRQUNELElBQUksT0FBTyxDQUFDLFlBQVksRUFBRTtZQUN4QixJQUFJLENBQUMsa0JBQWtCLEVBQUUsQ0FBQztTQUMzQjtRQUNELElBQUksT0FBTyxDQUFDLGNBQWMsRUFBRTtZQUMxQixJQUFJLENBQUMsb0JBQW9CLEVBQUUsQ0FBQztTQUM3QjtJQUNILENBQUM7SUFFRCxXQUFXO1FBQ1QsSUFBSSxDQUFDLFlBQVksQ0FBQyxJQUFJLEVBQUUsQ0FBQztRQUN6QixJQUFJLENBQUMsWUFBWSxDQUFDLFFBQVEsRUFBRSxDQUFDO0lBQy9CLENBQUM7O2dIQTVNVSxtQkFBbUI7b0dBQW5CLG1CQUFtQiwrNUJBT2hCLHVCQUF1QiwrRkE1RzNCOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0dBMkZUO0FBMEJ3QjtJQUFmLFlBQVksRUFBRTt1REFBb0I7QUFLbkI7SUFBZixZQUFZLEVBQUU7NERBQXdCO0FBT3ZCO0lBQWYsWUFBWSxFQUFFO3lEQUFzQjsyRkE1Qm5DLG1CQUFtQjtrQkF6Ry9CLFNBQVM7bUJBQUM7b0JBQ1QsUUFBUSxFQUFFLGFBQWE7b0JBQ3ZCLFFBQVEsRUFBRSxZQUFZO29CQUN0QixtQkFBbUIsRUFBRSxLQUFLO29CQUMxQixRQUFRLEVBQUU7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7R0EyRlQ7b0JBQ0QsSUFBSSxFQUFFO3dCQUNKLEtBQUssRUFBRSxjQUFjO3dCQUNyQiwwQkFBMEIsRUFBRSxlQUFlO3dCQUMzQywrQkFBK0IsRUFBRSxZQUFZO3dCQUM3QyxxQ0FBcUMsRUFBRSxjQUFjO3FCQUN0RDtvQkFDRCxhQUFhLEVBQUUsaUJBQWlCLENBQUMsSUFBSTtvQkFDckMsZUFBZSxFQUFFLHVCQUF1QixDQUFDLE1BQU07aUJBQ2hEOzswQkE0SUksUUFBUTs0Q0FwSTRCLEtBQUs7c0JBQTNDLFlBQVk7dUJBQUMsdUJBQXVCO2dCQVNaLFVBQVU7c0JBQWxDLEtBQUs7Z0JBQ0csWUFBWTtzQkFBcEIsS0FBSztnQkFDRyxRQUFRO3NCQUFoQixLQUFLO2dCQUNHLFlBQVk7c0JBQXBCLEtBQUs7Z0JBQ0csV0FBVztzQkFBbkIsS0FBSztnQkFDbUIsZUFBZTtzQkFBdkMsS0FBSztnQkFDRyxVQUFVO3NCQUFsQixLQUFLO2dCQUNHLFdBQVc7c0JBQW5CLEtBQUs7Z0JBQ0csU0FBUztzQkFBakIsS0FBSztnQkFDRyxZQUFZO3NCQUFwQixLQUFLO2dCQUNHLFFBQVE7c0JBQWhCLEtBQUs7Z0JBQ0csUUFBUTtzQkFBaEIsS0FBSztnQkFDbUIsWUFBWTtzQkFBcEMsS0FBSztnQkFDRyxjQUFjO3NCQUF0QixLQUFLO2dCQUNHLG1CQUFtQjtzQkFBM0IsS0FBSztnQkFDRyxpQkFBaUI7c0JBQXpCLEtBQUs7Z0JBQ0csWUFBWTtzQkFBcEIsS0FBSztnQkFDRyxjQUFjO3NCQUF0QixLQUFLO2dCQUdhLFFBQVE7c0JBQTFCLE1BQU07Z0JBQ1ksY0FBYztzQkFBaEMsTUFBTTtnQkFDWSxjQUFjO3NCQUFoQyxNQUFNIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKiBVc2Ugb2YgdGhpcyBzb3VyY2UgY29kZSBpcyBnb3Zlcm5lZCBieSBhbiBNSVQtc3R5bGUgbGljZW5zZSB0aGF0IGNhbiBiZVxuICogZm91bmQgaW4gdGhlIExJQ0VOU0UgZmlsZSBhdCBodHRwczovL2dpdGh1Yi5jb20vTkctWk9SUk8vbmctem9ycm8tYW50ZC9ibG9iL21hc3Rlci9MSUNFTlNFXG4gKi9cblxuaW1wb3J0IHsgRGlyZWN0aW9uLCBEaXJlY3Rpb25hbGl0eSB9IGZyb20gJ0Bhbmd1bGFyL2Nkay9iaWRpJztcbmltcG9ydCB7XG4gIENoYW5nZURldGVjdGlvblN0cmF0ZWd5LFxuICBDaGFuZ2VEZXRlY3RvclJlZixcbiAgQ29tcG9uZW50LFxuICBFdmVudEVtaXR0ZXIsXG4gIElucHV0LFxuICBPbkNoYW5nZXMsXG4gIE9uRGVzdHJveSxcbiAgT25Jbml0LFxuICBPcHRpb25hbCxcbiAgT3V0cHV0LFxuICBRdWVyeUxpc3QsXG4gIFNpbXBsZUNoYW5nZXMsXG4gIFRlbXBsYXRlUmVmLFxuICBWaWV3Q2hpbGRyZW4sXG4gIFZpZXdFbmNhcHN1bGF0aW9uXG59IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgT2JzZXJ2YWJsZSwgb2YsIFN1YmplY3QgfSBmcm9tICdyeGpzJztcbmltcG9ydCB7IHRha2VVbnRpbCB9IGZyb20gJ3J4anMvb3BlcmF0b3JzJztcblxuaW1wb3J0IHsgQm9vbGVhbklucHV0LCBOZ1N0eWxlSW50ZXJmYWNlLCBOelNhZmVBbnkgfSBmcm9tICduZy16b3Jyby1hbnRkL2NvcmUvdHlwZXMnO1xuaW1wb3J0IHsgSW5wdXRCb29sZWFuLCB0b0FycmF5IH0gZnJvbSAnbmctem9ycm8tYW50ZC9jb3JlL3V0aWwnO1xuaW1wb3J0IHsgTnpJMThuU2VydmljZSwgTnpUcmFuc2ZlckkxOG5JbnRlcmZhY2UgfSBmcm9tICduZy16b3Jyby1hbnRkL2kxOG4nO1xuXG5pbXBvcnQge1xuICBUcmFuc2ZlckNhbk1vdmUsXG4gIFRyYW5zZmVyQ2hhbmdlLFxuICBUcmFuc2ZlckRpcmVjdGlvbixcbiAgVHJhbnNmZXJJdGVtLFxuICBUcmFuc2ZlclNlYXJjaENoYW5nZSxcbiAgVHJhbnNmZXJTZWxlY3RDaGFuZ2Vcbn0gZnJvbSAnLi9pbnRlcmZhY2UnO1xuaW1wb3J0IHsgTnpUcmFuc2Zlckxpc3RDb21wb25lbnQgfSBmcm9tICcuL3RyYW5zZmVyLWxpc3QuY29tcG9uZW50JztcblxuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAnbnotdHJhbnNmZXInLFxuICBleHBvcnRBczogJ256VHJhbnNmZXInLFxuICBwcmVzZXJ2ZVdoaXRlc3BhY2VzOiBmYWxzZSxcbiAgdGVtcGxhdGU6IGBcbiAgICA8bnotdHJhbnNmZXItbGlzdFxuICAgICAgY2xhc3M9XCJhbnQtdHJhbnNmZXItbGlzdFwiXG4gICAgICBbbmdTdHlsZV09XCJuekxpc3RTdHlsZVwiXG4gICAgICBkYXRhLWRpcmVjdGlvbj1cImxlZnRcIlxuICAgICAgZGlyZWN0aW9uPVwibGVmdFwiXG4gICAgICBbdGl0bGVUZXh0XT1cIm56VGl0bGVzWzBdXCJcbiAgICAgIFtzaG93U2VsZWN0QWxsXT1cIm56U2hvd1NlbGVjdEFsbFwiXG4gICAgICBbZGF0YVNvdXJjZV09XCJsZWZ0RGF0YVNvdXJjZVwiXG4gICAgICBbZmlsdGVyXT1cImxlZnRGaWx0ZXJcIlxuICAgICAgW2ZpbHRlck9wdGlvbl09XCJuekZpbHRlck9wdGlvblwiXG4gICAgICAoZmlsdGVyQ2hhbmdlKT1cImhhbmRsZUZpbHRlckNoYW5nZSgkZXZlbnQpXCJcbiAgICAgIFtyZW5kZXJMaXN0XT1cIm56UmVuZGVyTGlzdCAmJiBuelJlbmRlckxpc3RbMF1cIlxuICAgICAgW3JlbmRlcl09XCJuelJlbmRlclwiXG4gICAgICBbZGlzYWJsZWRdPVwibnpEaXNhYmxlZFwiXG4gICAgICBbc2hvd1NlYXJjaF09XCJuelNob3dTZWFyY2hcIlxuICAgICAgW3NlYXJjaFBsYWNlaG9sZGVyXT1cIm56U2VhcmNoUGxhY2Vob2xkZXIgfHwgbG9jYWxlPy5zZWFyY2hQbGFjZWhvbGRlclwiXG4gICAgICBbbm90Rm91bmRDb250ZW50XT1cIm56Tm90Rm91bmRDb250ZW50XCJcbiAgICAgIFtpdGVtVW5pdF09XCJuekl0ZW1Vbml0IHx8IGxvY2FsZT8uaXRlbVVuaXRcIlxuICAgICAgW2l0ZW1zVW5pdF09XCJuekl0ZW1zVW5pdCB8fCBsb2NhbGU/Lml0ZW1zVW5pdFwiXG4gICAgICBbZm9vdGVyXT1cIm56Rm9vdGVyXCJcbiAgICAgIChoYW5kbGVTZWxlY3QpPVwiaGFuZGxlTGVmdFNlbGVjdCgkZXZlbnQpXCJcbiAgICAgIChoYW5kbGVTZWxlY3RBbGwpPVwiaGFuZGxlTGVmdFNlbGVjdEFsbCgkZXZlbnQpXCJcbiAgICA+PC9uei10cmFuc2Zlci1saXN0PlxuICAgIDxkaXYgKm5nSWY9XCJkaXIgIT09ICdydGwnXCIgY2xhc3M9XCJhbnQtdHJhbnNmZXItb3BlcmF0aW9uXCI+XG4gICAgICA8YnV0dG9uXG4gICAgICAgIG56LWJ1dHRvblxuICAgICAgICAoY2xpY2spPVwibW92ZVRvTGVmdCgpXCJcbiAgICAgICAgW2Rpc2FibGVkXT1cIm56RGlzYWJsZWQgfHwgIWxlZnRBY3RpdmVcIlxuICAgICAgICBbbnpUeXBlXT1cIidwcmltYXJ5J1wiXG4gICAgICAgIFtuelNpemVdPVwiJ3NtYWxsJ1wiXG4gICAgICA+XG4gICAgICAgIDxpIG56LWljb24gbnpUeXBlPVwibGVmdFwiPjwvaT5cbiAgICAgICAgPHNwYW4gKm5nSWY9XCJuek9wZXJhdGlvbnNbMV1cIj57eyBuek9wZXJhdGlvbnNbMV0gfX08L3NwYW4+XG4gICAgICA8L2J1dHRvbj5cbiAgICAgIDxidXR0b25cbiAgICAgICAgbnotYnV0dG9uXG4gICAgICAgIChjbGljayk9XCJtb3ZlVG9SaWdodCgpXCJcbiAgICAgICAgW2Rpc2FibGVkXT1cIm56RGlzYWJsZWQgfHwgIXJpZ2h0QWN0aXZlXCJcbiAgICAgICAgW256VHlwZV09XCIncHJpbWFyeSdcIlxuICAgICAgICBbbnpTaXplXT1cIidzbWFsbCdcIlxuICAgICAgPlxuICAgICAgICA8aSBuei1pY29uIG56VHlwZT1cInJpZ2h0XCI+PC9pPlxuICAgICAgICA8c3BhbiAqbmdJZj1cIm56T3BlcmF0aW9uc1swXVwiPnt7IG56T3BlcmF0aW9uc1swXSB9fTwvc3Bhbj5cbiAgICAgIDwvYnV0dG9uPlxuICAgIDwvZGl2PlxuICAgIDxkaXYgKm5nSWY9XCJkaXIgPT09ICdydGwnXCIgY2xhc3M9XCJhbnQtdHJhbnNmZXItb3BlcmF0aW9uXCI+XG4gICAgICA8YnV0dG9uXG4gICAgICAgIG56LWJ1dHRvblxuICAgICAgICAoY2xpY2spPVwibW92ZVRvUmlnaHQoKVwiXG4gICAgICAgIFtkaXNhYmxlZF09XCJuekRpc2FibGVkIHx8ICFyaWdodEFjdGl2ZVwiXG4gICAgICAgIFtuelR5cGVdPVwiJ3ByaW1hcnknXCJcbiAgICAgICAgW256U2l6ZV09XCInc21hbGwnXCJcbiAgICAgID5cbiAgICAgICAgPGkgbnotaWNvbiBuelR5cGU9XCJsZWZ0XCI+PC9pPlxuICAgICAgICA8c3BhbiAqbmdJZj1cIm56T3BlcmF0aW9uc1swXVwiPnt7IG56T3BlcmF0aW9uc1swXSB9fTwvc3Bhbj5cbiAgICAgIDwvYnV0dG9uPlxuICAgICAgPGJ1dHRvblxuICAgICAgICBuei1idXR0b25cbiAgICAgICAgKGNsaWNrKT1cIm1vdmVUb0xlZnQoKVwiXG4gICAgICAgIFtkaXNhYmxlZF09XCJuekRpc2FibGVkIHx8ICFsZWZ0QWN0aXZlXCJcbiAgICAgICAgW256VHlwZV09XCIncHJpbWFyeSdcIlxuICAgICAgICBbbnpTaXplXT1cIidzbWFsbCdcIlxuICAgICAgPlxuICAgICAgICA8aSBuei1pY29uIG56VHlwZT1cInJpZ2h0XCI+PC9pPlxuICAgICAgICA8c3BhbiAqbmdJZj1cIm56T3BlcmF0aW9uc1sxXVwiPnt7IG56T3BlcmF0aW9uc1sxXSB9fTwvc3Bhbj5cbiAgICAgIDwvYnV0dG9uPlxuICAgIDwvZGl2PlxuICAgIDxuei10cmFuc2Zlci1saXN0XG4gICAgICBjbGFzcz1cImFudC10cmFuc2Zlci1saXN0XCJcbiAgICAgIFtuZ1N0eWxlXT1cIm56TGlzdFN0eWxlXCJcbiAgICAgIGRhdGEtZGlyZWN0aW9uPVwicmlnaHRcIlxuICAgICAgZGlyZWN0aW9uPVwicmlnaHRcIlxuICAgICAgW3RpdGxlVGV4dF09XCJuelRpdGxlc1sxXVwiXG4gICAgICBbc2hvd1NlbGVjdEFsbF09XCJuelNob3dTZWxlY3RBbGxcIlxuICAgICAgW2RhdGFTb3VyY2VdPVwicmlnaHREYXRhU291cmNlXCJcbiAgICAgIFtmaWx0ZXJdPVwicmlnaHRGaWx0ZXJcIlxuICAgICAgW2ZpbHRlck9wdGlvbl09XCJuekZpbHRlck9wdGlvblwiXG4gICAgICAoZmlsdGVyQ2hhbmdlKT1cImhhbmRsZUZpbHRlckNoYW5nZSgkZXZlbnQpXCJcbiAgICAgIFtyZW5kZXJMaXN0XT1cIm56UmVuZGVyTGlzdCAmJiBuelJlbmRlckxpc3RbMV1cIlxuICAgICAgW3JlbmRlcl09XCJuelJlbmRlclwiXG4gICAgICBbZGlzYWJsZWRdPVwibnpEaXNhYmxlZFwiXG4gICAgICBbc2hvd1NlYXJjaF09XCJuelNob3dTZWFyY2hcIlxuICAgICAgW3NlYXJjaFBsYWNlaG9sZGVyXT1cIm56U2VhcmNoUGxhY2Vob2xkZXIgfHwgbG9jYWxlPy5zZWFyY2hQbGFjZWhvbGRlclwiXG4gICAgICBbbm90Rm91bmRDb250ZW50XT1cIm56Tm90Rm91bmRDb250ZW50XCJcbiAgICAgIFtpdGVtVW5pdF09XCJuekl0ZW1Vbml0IHx8IGxvY2FsZT8uaXRlbVVuaXRcIlxuICAgICAgW2l0ZW1zVW5pdF09XCJuekl0ZW1zVW5pdCB8fCBsb2NhbGU/Lml0ZW1zVW5pdFwiXG4gICAgICBbZm9vdGVyXT1cIm56Rm9vdGVyXCJcbiAgICAgIChoYW5kbGVTZWxlY3QpPVwiaGFuZGxlUmlnaHRTZWxlY3QoJGV2ZW50KVwiXG4gICAgICAoaGFuZGxlU2VsZWN0QWxsKT1cImhhbmRsZVJpZ2h0U2VsZWN0QWxsKCRldmVudClcIlxuICAgID48L256LXRyYW5zZmVyLWxpc3Q+XG4gIGAsXG4gIGhvc3Q6IHtcbiAgICBjbGFzczogJ2FudC10cmFuc2ZlcicsXG4gICAgJ1tjbGFzcy5hbnQtdHJhbnNmZXItcnRsXSc6IGBkaXIgPT09ICdydGwnYCxcbiAgICAnW2NsYXNzLmFudC10cmFuc2Zlci1kaXNhYmxlZF0nOiBgbnpEaXNhYmxlZGAsXG4gICAgJ1tjbGFzcy5hbnQtdHJhbnNmZXItY3VzdG9taXplLWxpc3RdJzogYG56UmVuZGVyTGlzdGBcbiAgfSxcbiAgZW5jYXBzdWxhdGlvbjogVmlld0VuY2Fwc3VsYXRpb24uTm9uZSxcbiAgY2hhbmdlRGV0ZWN0aW9uOiBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneS5PblB1c2hcbn0pXG5leHBvcnQgY2xhc3MgTnpUcmFuc2ZlckNvbXBvbmVudCBpbXBsZW1lbnRzIE9uSW5pdCwgT25DaGFuZ2VzLCBPbkRlc3Ryb3kge1xuICBzdGF0aWMgbmdBY2NlcHRJbnB1dFR5cGVfbnpEaXNhYmxlZDogQm9vbGVhbklucHV0O1xuICBzdGF0aWMgbmdBY2NlcHRJbnB1dFR5cGVfbnpTaG93U2VsZWN0QWxsOiBCb29sZWFuSW5wdXQ7XG4gIHN0YXRpYyBuZ0FjY2VwdElucHV0VHlwZV9uelNob3dTZWFyY2g6IEJvb2xlYW5JbnB1dDtcblxuICBwcml2YXRlIHVuc3Vic2NyaWJlJCA9IG5ldyBTdWJqZWN0PHZvaWQ+KCk7XG5cbiAgQFZpZXdDaGlsZHJlbihOelRyYW5zZmVyTGlzdENvbXBvbmVudCkgbGlzdHMhOiBRdWVyeUxpc3Q8TnpUcmFuc2Zlckxpc3RDb21wb25lbnQ+O1xuICBsb2NhbGUhOiBOelRyYW5zZmVySTE4bkludGVyZmFjZTtcblxuICBsZWZ0RmlsdGVyID0gJyc7XG4gIHJpZ2h0RmlsdGVyID0gJyc7XG4gIGRpcjogRGlyZWN0aW9uID0gJ2x0cic7XG5cbiAgLy8gI3JlZ2lvbiBmaWVsZHNcblxuICBASW5wdXQoKSBASW5wdXRCb29sZWFuKCkgbnpEaXNhYmxlZCA9IGZhbHNlO1xuICBASW5wdXQoKSBuekRhdGFTb3VyY2U6IFRyYW5zZmVySXRlbVtdID0gW107XG4gIEBJbnB1dCgpIG56VGl0bGVzOiBzdHJpbmdbXSA9IFsnJywgJyddO1xuICBASW5wdXQoKSBuek9wZXJhdGlvbnM6IHN0cmluZ1tdID0gW107XG4gIEBJbnB1dCgpIG56TGlzdFN0eWxlOiBOZ1N0eWxlSW50ZXJmYWNlID0ge307XG4gIEBJbnB1dCgpIEBJbnB1dEJvb2xlYW4oKSBuelNob3dTZWxlY3RBbGwgPSB0cnVlO1xuICBASW5wdXQoKSBuekl0ZW1Vbml0Pzogc3RyaW5nO1xuICBASW5wdXQoKSBuekl0ZW1zVW5pdD86IHN0cmluZztcbiAgQElucHV0KCkgbnpDYW5Nb3ZlOiAoYXJnOiBUcmFuc2ZlckNhbk1vdmUpID0+IE9ic2VydmFibGU8VHJhbnNmZXJJdGVtW10+ID0gKGFyZzogVHJhbnNmZXJDYW5Nb3ZlKSA9PiBvZihhcmcubGlzdCk7XG4gIEBJbnB1dCgpIG56UmVuZGVyTGlzdDogQXJyYXk8VGVtcGxhdGVSZWY8TnpTYWZlQW55PiB8IG51bGw+IHwgbnVsbCA9IG51bGw7XG4gIEBJbnB1dCgpIG56UmVuZGVyOiBUZW1wbGF0ZVJlZjxOelNhZmVBbnk+IHwgbnVsbCA9IG51bGw7XG4gIEBJbnB1dCgpIG56Rm9vdGVyOiBUZW1wbGF0ZVJlZjxOelNhZmVBbnk+IHwgbnVsbCA9IG51bGw7XG4gIEBJbnB1dCgpIEBJbnB1dEJvb2xlYW4oKSBuelNob3dTZWFyY2ggPSBmYWxzZTtcbiAgQElucHV0KCkgbnpGaWx0ZXJPcHRpb24/OiAoaW5wdXRWYWx1ZTogc3RyaW5nLCBpdGVtOiBUcmFuc2Zlckl0ZW0pID0+IGJvb2xlYW47XG4gIEBJbnB1dCgpIG56U2VhcmNoUGxhY2Vob2xkZXI/OiBzdHJpbmc7XG4gIEBJbnB1dCgpIG56Tm90Rm91bmRDb250ZW50Pzogc3RyaW5nO1xuICBASW5wdXQoKSBuelRhcmdldEtleXM6IHN0cmluZ1tdID0gW107XG4gIEBJbnB1dCgpIG56U2VsZWN0ZWRLZXlzOiBzdHJpbmdbXSA9IFtdO1xuXG4gIC8vIGV2ZW50c1xuICBAT3V0cHV0KCkgcmVhZG9ubHkgbnpDaGFuZ2UgPSBuZXcgRXZlbnRFbWl0dGVyPFRyYW5zZmVyQ2hhbmdlPigpO1xuICBAT3V0cHV0KCkgcmVhZG9ubHkgbnpTZWFyY2hDaGFuZ2UgPSBuZXcgRXZlbnRFbWl0dGVyPFRyYW5zZmVyU2VhcmNoQ2hhbmdlPigpO1xuICBAT3V0cHV0KCkgcmVhZG9ubHkgbnpTZWxlY3RDaGFuZ2UgPSBuZXcgRXZlbnRFbWl0dGVyPFRyYW5zZmVyU2VsZWN0Q2hhbmdlPigpO1xuXG4gIC8vICNlbmRyZWdpb25cblxuICAvLyAjcmVnaW9uIHByb2Nlc3MgZGF0YVxuXG4gIC8vIGxlZnRcbiAgbGVmdERhdGFTb3VyY2U6IFRyYW5zZmVySXRlbVtdID0gW107XG5cbiAgLy8gcmlnaHRcbiAgcmlnaHREYXRhU291cmNlOiBUcmFuc2Zlckl0ZW1bXSA9IFtdO1xuXG4gIHByaXZhdGUgc3BsaXREYXRhU291cmNlKCk6IHZvaWQge1xuICAgIHRoaXMubGVmdERhdGFTb3VyY2UgPSBbXTtcbiAgICB0aGlzLnJpZ2h0RGF0YVNvdXJjZSA9IFtdO1xuICAgIHRoaXMubnpEYXRhU291cmNlLmZvckVhY2gocmVjb3JkID0+IHtcbiAgICAgIGlmIChyZWNvcmQuZGlyZWN0aW9uID09PSAncmlnaHQnKSB7XG4gICAgICAgIHJlY29yZC5kaXJlY3Rpb24gPSAncmlnaHQnO1xuICAgICAgICB0aGlzLnJpZ2h0RGF0YVNvdXJjZS5wdXNoKHJlY29yZCk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICByZWNvcmQuZGlyZWN0aW9uID0gJ2xlZnQnO1xuICAgICAgICB0aGlzLmxlZnREYXRhU291cmNlLnB1c2gocmVjb3JkKTtcbiAgICAgIH1cbiAgICB9KTtcbiAgfVxuXG4gIHByaXZhdGUgZ2V0Q2hlY2tlZERhdGEoZGlyZWN0aW9uOiBUcmFuc2ZlckRpcmVjdGlvbik6IFRyYW5zZmVySXRlbVtdIHtcbiAgICByZXR1cm4gdGhpc1tkaXJlY3Rpb24gPT09ICdsZWZ0JyA/ICdsZWZ0RGF0YVNvdXJjZScgOiAncmlnaHREYXRhU291cmNlJ10uZmlsdGVyKHcgPT4gdy5jaGVja2VkKTtcbiAgfVxuXG4gIGhhbmRsZUxlZnRTZWxlY3RBbGwgPSAoY2hlY2tlZDogYm9vbGVhbik6IHZvaWQgPT4gdGhpcy5oYW5kbGVTZWxlY3QoJ2xlZnQnLCBjaGVja2VkKTtcbiAgaGFuZGxlUmlnaHRTZWxlY3RBbGwgPSAoY2hlY2tlZDogYm9vbGVhbik6IHZvaWQgPT4gdGhpcy5oYW5kbGVTZWxlY3QoJ3JpZ2h0JywgY2hlY2tlZCk7XG5cbiAgaGFuZGxlTGVmdFNlbGVjdCA9IChpdGVtOiBUcmFuc2Zlckl0ZW0pOiB2b2lkID0+IHRoaXMuaGFuZGxlU2VsZWN0KCdsZWZ0JywgISFpdGVtLmNoZWNrZWQsIGl0ZW0pO1xuICBoYW5kbGVSaWdodFNlbGVjdCA9IChpdGVtOiBUcmFuc2Zlckl0ZW0pOiB2b2lkID0+IHRoaXMuaGFuZGxlU2VsZWN0KCdyaWdodCcsICEhaXRlbS5jaGVja2VkLCBpdGVtKTtcblxuICBoYW5kbGVTZWxlY3QoZGlyZWN0aW9uOiBUcmFuc2ZlckRpcmVjdGlvbiwgY2hlY2tlZDogYm9vbGVhbiwgaXRlbT86IFRyYW5zZmVySXRlbSk6IHZvaWQge1xuICAgIGNvbnN0IGxpc3QgPSB0aGlzLmdldENoZWNrZWREYXRhKGRpcmVjdGlvbik7XG4gICAgdGhpcy51cGRhdGVPcGVyYXRpb25TdGF0dXMoZGlyZWN0aW9uLCBsaXN0Lmxlbmd0aCk7XG4gICAgdGhpcy5uelNlbGVjdENoYW5nZS5lbWl0KHsgZGlyZWN0aW9uLCBjaGVja2VkLCBsaXN0LCBpdGVtIH0pO1xuICB9XG5cbiAgaGFuZGxlRmlsdGVyQ2hhbmdlKHJldDogeyBkaXJlY3Rpb246IFRyYW5zZmVyRGlyZWN0aW9uOyB2YWx1ZTogc3RyaW5nIH0pOiB2b2lkIHtcbiAgICB0aGlzLm56U2VhcmNoQ2hhbmdlLmVtaXQocmV0KTtcbiAgfVxuXG4gIC8vICNlbmRyZWdpb25cblxuICAvLyAjcmVnaW9uIG9wZXJhdGlvblxuXG4gIGxlZnRBY3RpdmUgPSBmYWxzZTtcbiAgcmlnaHRBY3RpdmUgPSBmYWxzZTtcblxuICBwcml2YXRlIHVwZGF0ZU9wZXJhdGlvblN0YXR1cyhkaXJlY3Rpb246IFRyYW5zZmVyRGlyZWN0aW9uLCBjb3VudD86IG51bWJlcik6IHZvaWQge1xuICAgIHRoaXNbZGlyZWN0aW9uID09PSAncmlnaHQnID8gJ2xlZnRBY3RpdmUnIDogJ3JpZ2h0QWN0aXZlJ10gPVxuICAgICAgKHR5cGVvZiBjb3VudCA9PT0gJ3VuZGVmaW5lZCcgPyB0aGlzLmdldENoZWNrZWREYXRhKGRpcmVjdGlvbikuZmlsdGVyKHcgPT4gIXcuZGlzYWJsZWQpLmxlbmd0aCA6IGNvdW50KSA+IDA7XG4gIH1cblxuICBtb3ZlVG9MZWZ0ID0gKCk6IHZvaWQgPT4gdGhpcy5tb3ZlVG8oJ2xlZnQnKTtcbiAgbW92ZVRvUmlnaHQgPSAoKTogdm9pZCA9PiB0aGlzLm1vdmVUbygncmlnaHQnKTtcblxuICBtb3ZlVG8oZGlyZWN0aW9uOiBUcmFuc2ZlckRpcmVjdGlvbik6IHZvaWQge1xuICAgIGNvbnN0IG9wcG9zaXRlRGlyZWN0aW9uID0gZGlyZWN0aW9uID09PSAnbGVmdCcgPyAncmlnaHQnIDogJ2xlZnQnO1xuICAgIHRoaXMudXBkYXRlT3BlcmF0aW9uU3RhdHVzKG9wcG9zaXRlRGlyZWN0aW9uLCAwKTtcbiAgICBjb25zdCBkYXRhc291cmNlID0gZGlyZWN0aW9uID09PSAnbGVmdCcgPyB0aGlzLnJpZ2h0RGF0YVNvdXJjZSA6IHRoaXMubGVmdERhdGFTb3VyY2U7XG4gICAgY29uc3QgbW92ZUxpc3QgPSBkYXRhc291cmNlLmZpbHRlcihpdGVtID0+IGl0ZW0uY2hlY2tlZCA9PT0gdHJ1ZSAmJiAhaXRlbS5kaXNhYmxlZCk7XG4gICAgdGhpcy5uekNhbk1vdmUoeyBkaXJlY3Rpb24sIGxpc3Q6IG1vdmVMaXN0IH0pLnN1YnNjcmliZShcbiAgICAgIG5ld01vdmVMaXN0ID0+XG4gICAgICAgIHRoaXMudHJ1dGhNb3ZlVG8oXG4gICAgICAgICAgZGlyZWN0aW9uLFxuICAgICAgICAgIG5ld01vdmVMaXN0LmZpbHRlcihpID0+ICEhaSlcbiAgICAgICAgKSxcbiAgICAgICgpID0+IG1vdmVMaXN0LmZvckVhY2goaSA9PiAoaS5jaGVja2VkID0gZmFsc2UpKVxuICAgICk7XG4gIH1cblxuICBwcml2YXRlIHRydXRoTW92ZVRvKGRpcmVjdGlvbjogVHJhbnNmZXJEaXJlY3Rpb24sIGxpc3Q6IFRyYW5zZmVySXRlbVtdKTogdm9pZCB7XG4gICAgY29uc3Qgb3Bwb3NpdGVEaXJlY3Rpb24gPSBkaXJlY3Rpb24gPT09ICdsZWZ0JyA/ICdyaWdodCcgOiAnbGVmdCc7XG4gICAgY29uc3QgZGF0YXNvdXJjZSA9IGRpcmVjdGlvbiA9PT0gJ2xlZnQnID8gdGhpcy5yaWdodERhdGFTb3VyY2UgOiB0aGlzLmxlZnREYXRhU291cmNlO1xuICAgIGNvbnN0IHRhcmdldERhdGFzb3VyY2UgPSBkaXJlY3Rpb24gPT09ICdsZWZ0JyA/IHRoaXMubGVmdERhdGFTb3VyY2UgOiB0aGlzLnJpZ2h0RGF0YVNvdXJjZTtcbiAgICBmb3IgKGNvbnN0IGl0ZW0gb2YgbGlzdCkge1xuICAgICAgaXRlbS5jaGVja2VkID0gZmFsc2U7XG4gICAgICBpdGVtLmhpZGUgPSBmYWxzZTtcbiAgICAgIGl0ZW0uZGlyZWN0aW9uID0gZGlyZWN0aW9uO1xuICAgICAgZGF0YXNvdXJjZS5zcGxpY2UoZGF0YXNvdXJjZS5pbmRleE9mKGl0ZW0pLCAxKTtcbiAgICB9XG4gICAgdGFyZ2V0RGF0YXNvdXJjZS5zcGxpY2UoMCwgMCwgLi4ubGlzdCk7XG4gICAgdGhpcy51cGRhdGVPcGVyYXRpb25TdGF0dXMob3Bwb3NpdGVEaXJlY3Rpb24pO1xuICAgIHRoaXMubnpDaGFuZ2UuZW1pdCh7XG4gICAgICBmcm9tOiBvcHBvc2l0ZURpcmVjdGlvbixcbiAgICAgIHRvOiBkaXJlY3Rpb24sXG4gICAgICBsaXN0XG4gICAgfSk7XG4gICAgdGhpcy5tYXJrRm9yQ2hlY2tBbGxMaXN0KCk7XG4gIH1cblxuICAvLyAjZW5kcmVnaW9uXG5cbiAgY29uc3RydWN0b3IoXG4gICAgcHJpdmF0ZSBjZHI6IENoYW5nZURldGVjdG9yUmVmLFxuICAgIHByaXZhdGUgaTE4bjogTnpJMThuU2VydmljZSxcbiAgICBAT3B0aW9uYWwoKSBwcml2YXRlIGRpcmVjdGlvbmFsaXR5OiBEaXJlY3Rpb25hbGl0eVxuICApIHt9XG5cbiAgcHJpdmF0ZSBtYXJrRm9yQ2hlY2tBbGxMaXN0KCk6IHZvaWQge1xuICAgIGlmICghdGhpcy5saXN0cykge1xuICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICB0aGlzLmxpc3RzLmZvckVhY2goaSA9PiBpLm1hcmtGb3JDaGVjaygpKTtcbiAgfVxuXG4gIHByaXZhdGUgaGFuZGxlTnpUYXJnZXRLZXlzKCk6IHZvaWQge1xuICAgIGNvbnN0IGtleXMgPSB0b0FycmF5KHRoaXMubnpUYXJnZXRLZXlzKTtcbiAgICBjb25zdCBoYXNPd25LZXkgPSAoZTogVHJhbnNmZXJJdGVtKTogYm9vbGVhbiA9PiBlLmhhc093blByb3BlcnR5KCdrZXknKTtcbiAgICB0aGlzLmxlZnREYXRhU291cmNlLmZvckVhY2goZSA9PiB7XG4gICAgICBpZiAoaGFzT3duS2V5KGUpICYmIGtleXMuaW5kZXhPZihlLmtleSkgIT09IC0xICYmICFlLmRpc2FibGVkKSB7XG4gICAgICAgIGUuY2hlY2tlZCA9IHRydWU7XG4gICAgICB9XG4gICAgfSk7XG4gICAgdGhpcy5tb3ZlVG9SaWdodCgpO1xuICB9XG5cbiAgcHJpdmF0ZSBoYW5kbGVOelNlbGVjdGVkS2V5cygpOiB2b2lkIHtcbiAgICBjb25zdCBrZXlzID0gdG9BcnJheSh0aGlzLm56U2VsZWN0ZWRLZXlzKTtcbiAgICB0aGlzLm56RGF0YVNvdXJjZS5mb3JFYWNoKGUgPT4ge1xuICAgICAgaWYgKGtleXMuaW5kZXhPZihlLmtleSkgIT09IC0xKSB7XG4gICAgICAgIGUuY2hlY2tlZCA9IHRydWU7XG4gICAgICB9XG4gICAgfSk7XG4gICAgY29uc3QgdGVybSA9IChsZDogVHJhbnNmZXJJdGVtKTogYm9vbGVhbiA9PiBsZC5kaXNhYmxlZCA9PT0gZmFsc2UgJiYgbGQuY2hlY2tlZCA9PT0gdHJ1ZTtcbiAgICB0aGlzLnJpZ2h0QWN0aXZlID0gdGhpcy5sZWZ0RGF0YVNvdXJjZS5zb21lKHRlcm0pO1xuICAgIHRoaXMubGVmdEFjdGl2ZSA9IHRoaXMucmlnaHREYXRhU291cmNlLnNvbWUodGVybSk7XG4gIH1cblxuICBuZ09uSW5pdCgpOiB2b2lkIHtcbiAgICB0aGlzLmkxOG4ubG9jYWxlQ2hhbmdlLnBpcGUodGFrZVVudGlsKHRoaXMudW5zdWJzY3JpYmUkKSkuc3Vic2NyaWJlKCgpID0+IHtcbiAgICAgIHRoaXMubG9jYWxlID0gdGhpcy5pMThuLmdldExvY2FsZURhdGEoJ1RyYW5zZmVyJyk7XG4gICAgICB0aGlzLm1hcmtGb3JDaGVja0FsbExpc3QoKTtcbiAgICB9KTtcblxuICAgIHRoaXMuZGlyID0gdGhpcy5kaXJlY3Rpb25hbGl0eS52YWx1ZTtcbiAgICB0aGlzLmRpcmVjdGlvbmFsaXR5LmNoYW5nZT8ucGlwZSh0YWtlVW50aWwodGhpcy51bnN1YnNjcmliZSQpKS5zdWJzY3JpYmUoKGRpcmVjdGlvbjogRGlyZWN0aW9uKSA9PiB7XG4gICAgICB0aGlzLmRpciA9IGRpcmVjdGlvbjtcbiAgICAgIHRoaXMuY2RyLmRldGVjdENoYW5nZXMoKTtcbiAgICB9KTtcbiAgfVxuXG4gIG5nT25DaGFuZ2VzKGNoYW5nZXM6IFNpbXBsZUNoYW5nZXMpOiB2b2lkIHtcbiAgICBpZiAoY2hhbmdlcy5uekRhdGFTb3VyY2UpIHtcbiAgICAgIHRoaXMuc3BsaXREYXRhU291cmNlKCk7XG4gICAgICB0aGlzLnVwZGF0ZU9wZXJhdGlvblN0YXR1cygnbGVmdCcpO1xuICAgICAgdGhpcy51cGRhdGVPcGVyYXRpb25TdGF0dXMoJ3JpZ2h0Jyk7XG4gICAgICB0aGlzLmNkci5kZXRlY3RDaGFuZ2VzKCk7XG4gICAgICB0aGlzLm1hcmtGb3JDaGVja0FsbExpc3QoKTtcbiAgICB9XG4gICAgaWYgKGNoYW5nZXMubnpUYXJnZXRLZXlzKSB7XG4gICAgICB0aGlzLmhhbmRsZU56VGFyZ2V0S2V5cygpO1xuICAgIH1cbiAgICBpZiAoY2hhbmdlcy5uelNlbGVjdGVkS2V5cykge1xuICAgICAgdGhpcy5oYW5kbGVOelNlbGVjdGVkS2V5cygpO1xuICAgIH1cbiAgfVxuXG4gIG5nT25EZXN0cm95KCk6IHZvaWQge1xuICAgIHRoaXMudW5zdWJzY3JpYmUkLm5leHQoKTtcbiAgICB0aGlzLnVuc3Vic2NyaWJlJC5jb21wbGV0ZSgpO1xuICB9XG59XG4iXX0=