import { __decorate } from "tslib";
import { ChangeDetectionStrategy, Component, EventEmitter, Input, Optional, Output, ViewEncapsulation } from '@angular/core';
import { ReplaySubject, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { WithConfig } from 'ng-zorro-antd/core/config';
import { gridResponsiveMap, NzBreakpointEnum } from 'ng-zorro-antd/core/services';
import { InputBoolean, InputNumber } from 'ng-zorro-antd/core/util';
import * as i0 from "@angular/core";
import * as i1 from "ng-zorro-antd/i18n";
import * as i2 from "ng-zorro-antd/core/services";
import * as i3 from "ng-zorro-antd/core/config";
import * as i4 from "@angular/cdk/bidi";
import * as i5 from "./pagination-simple.component";
import * as i6 from "./pagination-default.component";
import * as i7 from "@angular/common";
const NZ_CONFIG_MODULE_NAME = 'pagination';
export class NzPaginationComponent {
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
        this.directionality.change?.pipe(takeUntil(this.destroy$)).subscribe((direction) => {
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
NzPaginationComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.1.2", ngImport: i0, type: NzPaginationComponent, deps: [{ token: i1.NzI18nService }, { token: i0.ChangeDetectorRef }, { token: i2.NzBreakpointService }, { token: i3.NzConfigService }, { token: i4.Directionality, optional: true }], target: i0.ɵɵFactoryTarget.Component });
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
  `, isInline: true, components: [{ type: i5.NzPaginationSimpleComponent, selector: "nz-pagination-simple", inputs: ["itemRender", "disabled", "locale", "total", "pageIndex", "pageSize"], outputs: ["pageIndexChange"] }, { type: i6.NzPaginationDefaultComponent, selector: "nz-pagination-default", inputs: ["nzSize", "itemRender", "showTotal", "disabled", "locale", "showSizeChanger", "showQuickJumper", "total", "pageIndex", "pageSize", "pageSizeOptions"], outputs: ["pageIndexChange", "pageSizeChange"] }], directives: [{ type: i7.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { type: i7.NgTemplateOutlet, selector: "[ngTemplateOutlet]", inputs: ["ngTemplateOutletContext", "ngTemplateOutlet"] }], changeDetection: i0.ChangeDetectionStrategy.OnPush, encapsulation: i0.ViewEncapsulation.None });
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
        }], ctorParameters: function () { return [{ type: i1.NzI18nService }, { type: i0.ChangeDetectorRef }, { type: i2.NzBreakpointService }, { type: i3.NzConfigService }, { type: i4.Directionality, decorators: [{
                    type: Optional
                }] }]; }, propDecorators: { nzPageSizeChange: [{
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicGFnaW5hdGlvbi5jb21wb25lbnQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9jb21wb25lbnRzL3BhZ2luYXRpb24vcGFnaW5hdGlvbi5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQU1BLE9BQU8sRUFDTCx1QkFBdUIsRUFFdkIsU0FBUyxFQUNULFlBQVksRUFDWixLQUFLLEVBSUwsUUFBUSxFQUNSLE1BQU0sRUFHTixpQkFBaUIsRUFDbEIsTUFBTSxlQUFlLENBQUM7QUFDdkIsT0FBTyxFQUFFLGFBQWEsRUFBRSxPQUFPLEVBQUUsTUFBTSxNQUFNLENBQUM7QUFDOUMsT0FBTyxFQUFFLFNBQVMsRUFBRSxNQUFNLGdCQUFnQixDQUFDO0FBRTNDLE9BQU8sRUFBZ0MsVUFBVSxFQUFFLE1BQU0sMkJBQTJCLENBQUM7QUFDckYsT0FBTyxFQUFFLGlCQUFpQixFQUFFLGdCQUFnQixFQUF1QixNQUFNLDZCQUE2QixDQUFDO0FBRXZHLE9BQU8sRUFBRSxZQUFZLEVBQUUsV0FBVyxFQUFFLE1BQU0seUJBQXlCLENBQUM7Ozs7Ozs7OztBQUtwRSxNQUFNLHFCQUFxQixHQUFnQixZQUFZLENBQUM7QUFpRHhELE1BQU0sT0FBTyxxQkFBcUI7SUErRWhDLFlBQ1UsSUFBbUIsRUFDbkIsR0FBc0IsRUFDdEIsaUJBQXNDLEVBQ3BDLGVBQWdDLEVBQ3RCLGNBQThCO1FBSjFDLFNBQUksR0FBSixJQUFJLENBQWU7UUFDbkIsUUFBRyxHQUFILEdBQUcsQ0FBbUI7UUFDdEIsc0JBQWlCLEdBQWpCLGlCQUFpQixDQUFxQjtRQUNwQyxvQkFBZSxHQUFmLGVBQWUsQ0FBaUI7UUFDdEIsbUJBQWMsR0FBZCxjQUFjLENBQWdCO1FBbkYzQyxrQkFBYSxHQUFnQixxQkFBcUIsQ0FBQztRQVl6QyxxQkFBZ0IsR0FBeUIsSUFBSSxZQUFZLEVBQUUsQ0FBQztRQUM1RCxzQkFBaUIsR0FBeUIsSUFBSSxZQUFZLEVBQUUsQ0FBQztRQUN2RSxn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QUFrQjtzQkFBMUMsS0FBSztnQkFDa0IsT0FBTztzQkFBOUIsS0FBSztnQkFDa0IsV0FBVztzQkFBbEMsS0FBSztnQkFDa0IsVUFBVTtzQkFBakMsS0FBSyIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxuICogVXNlIG9mIHRoaXMgc291cmNlIGNvZGUgaXMgZ292ZXJuZWQgYnkgYW4gTUlULXN0eWxlIGxpY2Vuc2UgdGhhdCBjYW4gYmVcbiAqIGZvdW5kIGluIHRoZSBMSUNFTlNFIGZpbGUgYXQgaHR0cHM6Ly9naXRodWIuY29tL05HLVpPUlJPL25nLXpvcnJvLWFudGQvYmxvYi9tYXN0ZXIvTElDRU5TRVxuICovXG5cbmltcG9ydCB7IERpcmVjdGlvbiwgRGlyZWN0aW9uYWxpdHkgfSBmcm9tICdAYW5ndWxhci9jZGsvYmlkaSc7XG5pbXBvcnQge1xuICBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneSxcbiAgQ2hhbmdlRGV0ZWN0b3JSZWYsXG4gIENvbXBvbmVudCxcbiAgRXZlbnRFbWl0dGVyLFxuICBJbnB1dCxcbiAgT25DaGFuZ2VzLFxuICBPbkRlc3Ryb3ksXG4gIE9uSW5pdCxcbiAgT3B0aW9uYWwsXG4gIE91dHB1dCxcbiAgU2ltcGxlQ2hhbmdlcyxcbiAgVGVtcGxhdGVSZWYsXG4gIFZpZXdFbmNhcHN1bGF0aW9uXG59IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgUmVwbGF5U3ViamVjdCwgU3ViamVjdCB9IGZyb20gJ3J4anMnO1xuaW1wb3J0IHsgdGFrZVVudGlsIH0gZnJvbSAncnhqcy9vcGVyYXRvcnMnO1xuXG5pbXBvcnQgeyBOekNvbmZpZ0tleSwgTnpDb25maWdTZXJ2aWNlLCBXaXRoQ29uZmlnIH0gZnJvbSAnbmctem9ycm8tYW50ZC9jb3JlL2NvbmZpZyc7XG5pbXBvcnQgeyBncmlkUmVzcG9uc2l2ZU1hcCwgTnpCcmVha3BvaW50RW51bSwgTnpCcmVha3BvaW50U2VydmljZSB9IGZyb20gJ25nLXpvcnJvLWFudGQvY29yZS9zZXJ2aWNlcyc7XG5pbXBvcnQgeyBCb29sZWFuSW5wdXQsIE51bWJlcklucHV0IH0gZnJvbSAnbmctem9ycm8tYW50ZC9jb3JlL3R5cGVzJztcbmltcG9ydCB7IElucHV0Qm9vbGVhbiwgSW5wdXROdW1iZXIgfSBmcm9tICduZy16b3Jyby1hbnRkL2NvcmUvdXRpbCc7XG5pbXBvcnQgeyBOekkxOG5TZXJ2aWNlLCBOelBhZ2luYXRpb25JMThuSW50ZXJmYWNlIH0gZnJvbSAnbmctem9ycm8tYW50ZC9pMThuJztcblxuaW1wb3J0IHsgUGFnaW5hdGlvbkl0ZW1SZW5kZXJDb250ZXh0IH0gZnJvbSAnLi9wYWdpbmF0aW9uLnR5cGVzJztcblxuY29uc3QgTlpfQ09ORklHX01PRFVMRV9OQU1FOiBOekNvbmZpZ0tleSA9ICdwYWdpbmF0aW9uJztcblxuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAnbnotcGFnaW5hdGlvbicsXG4gIGV4cG9ydEFzOiAnbnpQYWdpbmF0aW9uJyxcbiAgcHJlc2VydmVXaGl0ZXNwYWNlczogZmFsc2UsXG4gIGVuY2Fwc3VsYXRpb246IFZpZXdFbmNhcHN1bGF0aW9uLk5vbmUsXG4gIGNoYW5nZURldGVjdGlvbjogQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3kuT25QdXNoLFxuICB0ZW1wbGF0ZTogYFxuICAgIDxuZy1jb250YWluZXIgKm5nSWY9XCJzaG93UGFnaW5hdGlvblwiPlxuICAgICAgPG5nLWNvbnRhaW5lciAqbmdJZj1cIm56U2ltcGxlOyBlbHNlIGRlZmF1bHRQYWdpbmF0aW9uLnRlbXBsYXRlXCI+XG4gICAgICAgIDxuZy10ZW1wbGF0ZSBbbmdUZW1wbGF0ZU91dGxldF09XCJzaW1wbGVQYWdpbmF0aW9uLnRlbXBsYXRlXCI+PC9uZy10ZW1wbGF0ZT5cbiAgICAgIDwvbmctY29udGFpbmVyPlxuICAgIDwvbmctY29udGFpbmVyPlxuICAgIDxuei1wYWdpbmF0aW9uLXNpbXBsZVxuICAgICAgI3NpbXBsZVBhZ2luYXRpb25cbiAgICAgIFtkaXNhYmxlZF09XCJuekRpc2FibGVkXCJcbiAgICAgIFtpdGVtUmVuZGVyXT1cIm56SXRlbVJlbmRlclwiXG4gICAgICBbbG9jYWxlXT1cImxvY2FsZVwiXG4gICAgICBbcGFnZVNpemVdPVwibnpQYWdlU2l6ZVwiXG4gICAgICBbdG90YWxdPVwibnpUb3RhbFwiXG4gICAgICBbcGFnZUluZGV4XT1cIm56UGFnZUluZGV4XCJcbiAgICAgIChwYWdlSW5kZXhDaGFuZ2UpPVwib25QYWdlSW5kZXhDaGFuZ2UoJGV2ZW50KVwiXG4gICAgPjwvbnotcGFnaW5hdGlvbi1zaW1wbGU+XG4gICAgPG56LXBhZ2luYXRpb24tZGVmYXVsdFxuICAgICAgI2RlZmF1bHRQYWdpbmF0aW9uXG4gICAgICBbbnpTaXplXT1cInNpemVcIlxuICAgICAgW2l0ZW1SZW5kZXJdPVwibnpJdGVtUmVuZGVyXCJcbiAgICAgIFtzaG93VG90YWxdPVwibnpTaG93VG90YWxcIlxuICAgICAgW2Rpc2FibGVkXT1cIm56RGlzYWJsZWRcIlxuICAgICAgW2xvY2FsZV09XCJsb2NhbGVcIlxuICAgICAgW3Nob3dTaXplQ2hhbmdlcl09XCJuelNob3dTaXplQ2hhbmdlclwiXG4gICAgICBbc2hvd1F1aWNrSnVtcGVyXT1cIm56U2hvd1F1aWNrSnVtcGVyXCJcbiAgICAgIFt0b3RhbF09XCJuelRvdGFsXCJcbiAgICAgIFtwYWdlSW5kZXhdPVwibnpQYWdlSW5kZXhcIlxuICAgICAgW3BhZ2VTaXplXT1cIm56UGFnZVNpemVcIlxuICAgICAgW3BhZ2VTaXplT3B0aW9uc109XCJuelBhZ2VTaXplT3B0aW9uc1wiXG4gICAgICAocGFnZUluZGV4Q2hhbmdlKT1cIm9uUGFnZUluZGV4Q2hhbmdlKCRldmVudClcIlxuICAgICAgKHBhZ2VTaXplQ2hhbmdlKT1cIm9uUGFnZVNpemVDaGFuZ2UoJGV2ZW50KVwiXG4gICAgPjwvbnotcGFnaW5hdGlvbi1kZWZhdWx0PlxuICBgLFxuICBob3N0OiB7XG4gICAgY2xhc3M6ICdhbnQtcGFnaW5hdGlvbicsXG4gICAgJ1tjbGFzcy5hbnQtcGFnaW5hdGlvbi1zaW1wbGVdJzogJ256U2ltcGxlJyxcbiAgICAnW2NsYXNzLmFudC1wYWdpbmF0aW9uLWRpc2FibGVkXSc6ICduekRpc2FibGVkJyxcbiAgICAnW2NsYXNzLm1pbmldJzogYCFuelNpbXBsZSAmJiBzaXplID09PSAnc21hbGwnYCxcbiAgICAnW2NsYXNzLmFudC1wYWdpbmF0aW9uLXJ0bF0nOiBgZGlyID09PSAncnRsJ2BcbiAgfVxufSlcbmV4cG9ydCBjbGFzcyBOelBhZ2luYXRpb25Db21wb25lbnQgaW1wbGVtZW50cyBPbkluaXQsIE9uRGVzdHJveSwgT25DaGFuZ2VzIHtcbiAgcmVhZG9ubHkgX256TW9kdWxlTmFtZTogTnpDb25maWdLZXkgPSBOWl9DT05GSUdfTU9EVUxFX05BTUU7XG5cbiAgc3RhdGljIG5nQWNjZXB0SW5wdXRUeXBlX256RGlzYWJsZWQ6IEJvb2xlYW5JbnB1dDtcbiAgc3RhdGljIG5nQWNjZXB0SW5wdXRUeXBlX256U2hvd1NpemVDaGFuZ2VyOiBCb29sZWFuSW5wdXQ7XG4gIHN0YXRpYyBuZ0FjY2VwdElucHV0VHlwZV9uekhpZGVPblNpbmdsZVBhZ2U6IEJvb2xlYW5JbnB1dDtcbiAgc3RhdGljIG5nQWNjZXB0SW5wdXRUeXBlX256U2hvd1F1aWNrSnVtcGVyOiBCb29sZWFuSW5wdXQ7XG4gIHN0YXRpYyBuZ0FjY2VwdElucHV0VHlwZV9uelNpbXBsZTogQm9vbGVhbklucHV0O1xuICBzdGF0aWMgbmdBY2NlcHRJbnB1dFR5cGVfbnpSZXNwb25zaXZlOiBCb29sZWFuSW5wdXQ7XG4gIHN0YXRpYyBuZ0FjY2VwdElucHV0VHlwZV9uelRvdGFsOiBOdW1iZXJJbnB1dDtcbiAgc3RhdGljIG5nQWNjZXB0SW5wdXRUeXBlX256UGFnZUluZGV4OiBOdW1iZXJJbnB1dDtcbiAgc3RhdGljIG5nQWNjZXB0SW5wdXRUeXBlX256UGFnZVNpemU6IE51bWJlcklucHV0O1xuXG4gIEBPdXRwdXQoKSByZWFkb25seSBuelBhZ2VTaXplQ2hhbmdlOiBFdmVudEVtaXR0ZXI8bnVtYmVyPiA9IG5ldyBFdmVudEVtaXR0ZXIoKTtcbiAgQE91dHB1dCgpIHJlYWRvbmx5IG56UGFnZUluZGV4Q2hhbmdlOiBFdmVudEVtaXR0ZXI8bnVtYmVyPiA9IG5ldyBFdmVudEVtaXR0ZXIoKTtcbiAgQElucHV0KCkgbnpTaG93VG90YWw6IFRlbXBsYXRlUmVmPHsgJGltcGxpY2l0OiBudW1iZXI7IHJhbmdlOiBbbnVtYmVyLCBudW1iZXJdIH0+IHwgbnVsbCA9IG51bGw7XG4gIEBJbnB1dCgpIG56SXRlbVJlbmRlcjogVGVtcGxhdGVSZWY8UGFnaW5hdGlvbkl0ZW1SZW5kZXJDb250ZXh0PiB8IG51bGwgPSBudWxsO1xuICBASW5wdXQoKSBAV2l0aENvbmZpZygpIG56U2l6ZTogJ2RlZmF1bHQnIHwgJ3NtYWxsJyA9ICdkZWZhdWx0JztcbiAgQElucHV0KCkgQFdpdGhDb25maWcoKSBuelBhZ2VTaXplT3B0aW9uczogbnVtYmVyW10gPSBbMTAsIDIwLCAzMCwgNDBdO1xuICBASW5wdXQoKSBAV2l0aENvbmZpZygpIEBJbnB1dEJvb2xlYW4oKSBuelNob3dTaXplQ2hhbmdlciA9IGZhbHNlO1xuICBASW5wdXQoKSBAV2l0aENvbmZpZygpIEBJbnB1dEJvb2xlYW4oKSBuelNob3dRdWlja0p1bXBlciA9IGZhbHNlO1xuICBASW5wdXQoKSBAV2l0aENvbmZpZygpIEBJbnB1dEJvb2xlYW4oKSBuelNpbXBsZSA9IGZhbHNlO1xuICBASW5wdXQoKSBASW5wdXRCb29sZWFuKCkgbnpEaXNhYmxlZCA9IGZhbHNlO1xuICBASW5wdXQoKSBASW5wdXRCb29sZWFuKCkgbnpSZXNwb25zaXZlID0gZmFsc2U7XG4gIEBJbnB1dCgpIEBJbnB1dEJvb2xlYW4oKSBuekhpZGVPblNpbmdsZVBhZ2UgPSBmYWxzZTtcbiAgQElucHV0KCkgQElucHV0TnVtYmVyKCkgbnpUb3RhbCA9IDA7XG4gIEBJbnB1dCgpIEBJbnB1dE51bWJlcigpIG56UGFnZUluZGV4ID0gMTtcbiAgQElucHV0KCkgQElucHV0TnVtYmVyKCkgbnpQYWdlU2l6ZSA9IDEwO1xuXG4gIHNob3dQYWdpbmF0aW9uID0gdHJ1ZTtcbiAgbG9jYWxlITogTnpQYWdpbmF0aW9uSTE4bkludGVyZmFjZTtcbiAgc2l6ZTogJ2RlZmF1bHQnIHwgJ3NtYWxsJyA9ICdkZWZhdWx0JztcbiAgZGlyOiBEaXJlY3Rpb24gPSAnbHRyJztcblxuICBwcml2YXRlIGRlc3Ryb3kkID0gbmV3IFN1YmplY3Q8dm9pZD4oKTtcbiAgcHJpdmF0ZSB0b3RhbCQgPSBuZXcgUmVwbGF5U3ViamVjdDxudW1iZXI+KDEpO1xuXG4gIHZhbGlkYXRlUGFnZUluZGV4KHZhbHVlOiBudW1iZXIsIGxhc3RJbmRleDogbnVtYmVyKTogbnVtYmVyIHtcbiAgICBpZiAodmFsdWUgPiBsYXN0SW5kZXgpIHtcbiAgICAgIHJldHVybiBsYXN0SW5kZXg7XG4gICAgfSBlbHNlIGlmICh2YWx1ZSA8IDEpIHtcbiAgICAgIHJldHVybiAxO1xuICAgIH0gZWxzZSB7XG4gICAgICByZXR1cm4gdmFsdWU7XG4gICAgfVxuICB9XG5cbiAgb25QYWdlSW5kZXhDaGFuZ2UoaW5kZXg6IG51bWJlcik6IHZvaWQge1xuICAgIGNvbnN0IGxhc3RJbmRleCA9IHRoaXMuZ2V0TGFzdEluZGV4KHRoaXMubnpUb3RhbCwgdGhpcy5uelBhZ2VTaXplKTtcbiAgICBjb25zdCB2YWxpZEluZGV4ID0gdGhpcy52YWxpZGF0ZVBhZ2VJbmRleChpbmRleCwgbGFzdEluZGV4KTtcbiAgICBpZiAodmFsaWRJbmRleCAhPT0gdGhpcy5uelBhZ2VJbmRleCAmJiAhdGhpcy5uekRpc2FibGVkKSB7XG4gICAgICB0aGlzLm56UGFnZUluZGV4ID0gdmFsaWRJbmRleDtcbiAgICAgIHRoaXMubnpQYWdlSW5kZXhDaGFuZ2UuZW1pdCh0aGlzLm56UGFnZUluZGV4KTtcbiAgICB9XG4gIH1cblxuICBvblBhZ2VTaXplQ2hhbmdlKHNpemU6IG51bWJlcik6IHZvaWQge1xuICAgIHRoaXMubnpQYWdlU2l6ZSA9IHNpemU7XG4gICAgdGhpcy5uelBhZ2VTaXplQ2hhbmdlLmVtaXQoc2l6ZSk7XG4gICAgY29uc3QgbGFzdEluZGV4ID0gdGhpcy5nZXRMYXN0SW5kZXgodGhpcy5uelRvdGFsLCB0aGlzLm56UGFnZVNpemUpO1xuICAgIGlmICh0aGlzLm56UGFnZUluZGV4ID4gbGFzdEluZGV4KSB7XG4gICAgICB0aGlzLm9uUGFnZUluZGV4Q2hhbmdlKGxhc3RJbmRleCk7XG4gICAgfVxuICB9XG5cbiAgb25Ub3RhbENoYW5nZSh0b3RhbDogbnVtYmVyKTogdm9pZCB7XG4gICAgY29uc3QgbGFzdEluZGV4ID0gdGhpcy5nZXRMYXN0SW5kZXgodG90YWwsIHRoaXMubnpQYWdlU2l6ZSk7XG4gICAgaWYgKHRoaXMubnpQYWdlSW5kZXggPiBsYXN0SW5kZXgpIHtcbiAgICAgIFByb21pc2UucmVzb2x2ZSgpLnRoZW4oKCkgPT4ge1xuICAgICAgICB0aGlzLm9uUGFnZUluZGV4Q2hhbmdlKGxhc3RJbmRleCk7XG4gICAgICAgIHRoaXMuY2RyLm1hcmtGb3JDaGVjaygpO1xuICAgICAgfSk7XG4gICAgfVxuICB9XG5cbiAgZ2V0TGFzdEluZGV4KHRvdGFsOiBudW1iZXIsIHBhZ2VTaXplOiBudW1iZXIpOiBudW1iZXIge1xuICAgIHJldHVybiBNYXRoLmNlaWwodG90YWwgLyBwYWdlU2l6ZSk7XG4gIH1cblxuICBjb25zdHJ1Y3RvcihcbiAgICBwcml2YXRlIGkxOG46IE56STE4blNlcnZpY2UsXG4gICAgcHJpdmF0ZSBjZHI6IENoYW5nZURldGVjdG9yUmVmLFxuICAgIHByaXZhdGUgYnJlYWtwb2ludFNlcnZpY2U6IE56QnJlYWtwb2ludFNlcnZpY2UsXG4gICAgcHJvdGVjdGVkIG56Q29uZmlnU2VydmljZTogTnpDb25maWdTZXJ2aWNlLFxuICAgIEBPcHRpb25hbCgpIHByaXZhdGUgZGlyZWN0aW9uYWxpdHk6IERpcmVjdGlvbmFsaXR5XG4gICkge31cblxuICBuZ09uSW5pdCgpOiB2b2lkIHtcbiAgICB0aGlzLmkxOG4ubG9jYWxlQ2hhbmdlLnBpcGUodGFrZVVudGlsKHRoaXMuZGVzdHJveSQpKS5zdWJzY3JpYmUoKCkgPT4ge1xuICAgICAgdGhpcy5sb2NhbGUgPSB0aGlzLmkxOG4uZ2V0TG9jYWxlRGF0YSgnUGFnaW5hdGlvbicpO1xuICAgICAgdGhpcy5jZHIubWFya0ZvckNoZWNrKCk7XG4gICAgfSk7XG5cbiAgICB0aGlzLnRvdGFsJC5waXBlKHRha2VVbnRpbCh0aGlzLmRlc3Ryb3kkKSkuc3Vic2NyaWJlKHRvdGFsID0+IHtcbiAgICAgIHRoaXMub25Ub3RhbENoYW5nZSh0b3RhbCk7XG4gICAgfSk7XG5cbiAgICB0aGlzLmJyZWFrcG9pbnRTZXJ2aWNlXG4gICAgICAuc3Vic2NyaWJlKGdyaWRSZXNwb25zaXZlTWFwKVxuICAgICAgLnBpcGUodGFrZVVudGlsKHRoaXMuZGVzdHJveSQpKVxuICAgICAgLnN1YnNjcmliZShicCA9PiB7XG4gICAgICAgIGlmICh0aGlzLm56UmVzcG9uc2l2ZSkge1xuICAgICAgICAgIHRoaXMuc2l6ZSA9IGJwID09PSBOekJyZWFrcG9pbnRFbnVtLnhzID8gJ3NtYWxsJyA6ICdkZWZhdWx0JztcbiAgICAgICAgICB0aGlzLmNkci5tYXJrRm9yQ2hlY2soKTtcbiAgICAgICAgfVxuICAgICAgfSk7XG5cbiAgICB0aGlzLmRpcmVjdGlvbmFsaXR5LmNoYW5nZT8ucGlwZSh0YWtlVW50aWwodGhpcy5kZXN0cm95JCkpLnN1YnNjcmliZSgoZGlyZWN0aW9uOiBEaXJlY3Rpb24pID0+IHtcbiAgICAgIHRoaXMuZGlyID0gZGlyZWN0aW9uO1xuICAgICAgdGhpcy5jZHIuZGV0ZWN0Q2hhbmdlcygpO1xuICAgIH0pO1xuXG4gICAgdGhpcy5kaXIgPSB0aGlzLmRpcmVjdGlvbmFsaXR5LnZhbHVlO1xuICB9XG5cbiAgbmdPbkRlc3Ryb3koKTogdm9pZCB7XG4gICAgdGhpcy5kZXN0cm95JC5uZXh0KCk7XG4gICAgdGhpcy5kZXN0cm95JC5jb21wbGV0ZSgpO1xuICB9XG5cbiAgbmdPbkNoYW5nZXMoY2hhbmdlczogU2ltcGxlQ2hhbmdlcyk6IHZvaWQge1xuICAgIGNvbnN0IHsgbnpIaWRlT25TaW5nbGVQYWdlLCBuelRvdGFsLCBuelBhZ2VTaXplLCBuelNpemUgfSA9IGNoYW5nZXM7XG4gICAgaWYgKG56VG90YWwpIHtcbiAgICAgIHRoaXMudG90YWwkLm5leHQodGhpcy5uelRvdGFsKTtcbiAgICB9XG4gICAgaWYgKG56SGlkZU9uU2luZ2xlUGFnZSB8fCBuelRvdGFsIHx8IG56UGFnZVNpemUpIHtcbiAgICAgIHRoaXMuc2hvd1BhZ2luYXRpb24gPVxuICAgICAgICAodGhpcy5uekhpZGVPblNpbmdsZVBhZ2UgJiYgdGhpcy5uelRvdGFsID4gdGhpcy5uelBhZ2VTaXplKSB8fCAodGhpcy5uelRvdGFsID4gMCAmJiAhdGhpcy5uekhpZGVPblNpbmdsZVBhZ2UpO1xuICAgIH1cblxuICAgIGlmIChuelNpemUpIHtcbiAgICAgIHRoaXMuc2l6ZSA9IG56U2l6ZS5jdXJyZW50VmFsdWU7XG4gICAgfVxuICB9XG59XG4iXX0=