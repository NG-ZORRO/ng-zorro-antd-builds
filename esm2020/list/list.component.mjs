import { __decorate } from "tslib";
import { ChangeDetectionStrategy, Component, ContentChild, Input, Optional, ViewEncapsulation } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { InputBoolean } from 'ng-zorro-antd/core/util';
import { NzListFooterComponent, NzListLoadMoreDirective, NzListPaginationComponent } from './list-cell';
import * as i0 from "@angular/core";
import * as i1 from "@angular/cdk/bidi";
import * as i2 from "./list-cell";
import * as i3 from "ng-zorro-antd/spin";
import * as i4 from "@angular/common";
import * as i5 from "ng-zorro-antd/core/outlet";
import * as i6 from "ng-zorro-antd/grid";
export class NzListComponent {
    constructor(directionality) {
        this.directionality = directionality;
        this.nzBordered = false;
        this.nzGrid = '';
        this.nzItemLayout = 'horizontal';
        this.nzRenderItem = null;
        this.nzLoading = false;
        this.nzLoadMore = null;
        this.nzSize = 'default';
        this.nzSplit = true;
        this.hasSomethingAfterLastItem = false;
        this.dir = 'ltr';
        this.itemLayoutNotifySource = new BehaviorSubject(this.nzItemLayout);
        this.destroy$ = new Subject();
    }
    get itemLayoutNotify$() {
        return this.itemLayoutNotifySource.asObservable();
    }
    ngOnInit() {
        this.dir = this.directionality.value;
        this.directionality.change?.pipe(takeUntil(this.destroy$)).subscribe((direction) => {
            this.dir = direction;
        });
    }
    getSomethingAfterLastItem() {
        return !!(this.nzLoadMore ||
            this.nzPagination ||
            this.nzFooter ||
            this.nzListFooterComponent ||
            this.nzListPaginationComponent ||
            this.nzListLoadMoreDirective);
    }
    ngOnChanges(changes) {
        if (changes.nzItemLayout) {
            this.itemLayoutNotifySource.next(this.nzItemLayout);
        }
    }
    ngOnDestroy() {
        this.itemLayoutNotifySource.unsubscribe();
        this.destroy$.next();
        this.destroy$.complete();
    }
    ngAfterContentInit() {
        this.hasSomethingAfterLastItem = this.getSomethingAfterLastItem();
    }
}
NzListComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.1.2", ngImport: i0, type: NzListComponent, deps: [{ token: i1.Directionality, optional: true }], target: i0.ɵɵFactoryTarget.Component });
NzListComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "13.1.2", type: NzListComponent, selector: "nz-list, [nz-list]", inputs: { nzDataSource: "nzDataSource", nzBordered: "nzBordered", nzGrid: "nzGrid", nzHeader: "nzHeader", nzFooter: "nzFooter", nzItemLayout: "nzItemLayout", nzRenderItem: "nzRenderItem", nzLoading: "nzLoading", nzLoadMore: "nzLoadMore", nzPagination: "nzPagination", nzSize: "nzSize", nzSplit: "nzSplit", nzNoResult: "nzNoResult" }, host: { properties: { "class.ant-list-rtl": "dir === 'rtl'", "class.ant-list-vertical": "nzItemLayout === \"vertical\"", "class.ant-list-lg": "nzSize === \"large\"", "class.ant-list-sm": "nzSize === \"small\"", "class.ant-list-split": "nzSplit", "class.ant-list-bordered": "nzBordered", "class.ant-list-loading": "nzLoading", "class.ant-list-something-after-last-item": "hasSomethingAfterLastItem" }, classAttribute: "ant-list" }, queries: [{ propertyName: "nzListFooterComponent", first: true, predicate: NzListFooterComponent, descendants: true }, { propertyName: "nzListPaginationComponent", first: true, predicate: NzListPaginationComponent, descendants: true }, { propertyName: "nzListLoadMoreDirective", first: true, predicate: NzListLoadMoreDirective, descendants: true }], exportAs: ["nzList"], usesOnChanges: true, ngImport: i0, template: `
    <ng-template #itemsTpl>
      <div class="ant-list-items">
        <ng-container *ngFor="let item of nzDataSource; let index = index">
          <ng-template
            [ngTemplateOutlet]="nzRenderItem"
            [ngTemplateOutletContext]="{ $implicit: item, index: index }"
          ></ng-template>
        </ng-container>
        <ng-content></ng-content>
      </div>
    </ng-template>

    <nz-list-header *ngIf="nzHeader">
      <ng-container *nzStringTemplateOutlet="nzHeader">{{ nzHeader }}</ng-container>
    </nz-list-header>
    <ng-content select="nz-list-header"></ng-content>

    <nz-spin [nzSpinning]="nzLoading">
      <ng-container>
        <div *ngIf="nzLoading && nzDataSource && nzDataSource.length === 0" [style.min-height.px]="53"></div>
        <div *ngIf="nzGrid && nzDataSource; else itemsTpl" nz-row [nzGutter]="nzGrid.gutter || null">
          <div
            nz-col
            [nzSpan]="nzGrid.span || null"
            [nzXs]="nzGrid.xs || null"
            [nzSm]="nzGrid.sm || null"
            [nzMd]="nzGrid.md || null"
            [nzLg]="nzGrid.lg || null"
            [nzXl]="nzGrid.xl || null"
            [nzXXl]="nzGrid.xxl || null"
            *ngFor="let item of nzDataSource; let index = index"
          >
            <ng-template
              [ngTemplateOutlet]="nzRenderItem"
              [ngTemplateOutletContext]="{ $implicit: item, index: index }"
            ></ng-template>
          </div>
        </div>
        <nz-list-empty
          *ngIf="!nzLoading && nzDataSource && nzDataSource.length === 0"
          [nzNoResult]="nzNoResult"
        ></nz-list-empty>
      </ng-container>
    </nz-spin>

    <nz-list-footer *ngIf="nzFooter">
      <ng-container *nzStringTemplateOutlet="nzFooter">{{ nzFooter }}</ng-container>
    </nz-list-footer>
    <ng-content select="nz-list-footer, [nz-list-footer]"></ng-content>

    <ng-template [ngTemplateOutlet]="nzLoadMore"></ng-template>
    <ng-content select="nz-list-load-more, [nz-list-load-more]"></ng-content>

    <nz-list-pagination *ngIf="nzPagination">
      <ng-template [ngTemplateOutlet]="nzPagination"></ng-template>
    </nz-list-pagination>
    <ng-content select="nz-list-pagination, [nz-list-pagination]"></ng-content>
  `, isInline: true, components: [{ type: i2.NzListHeaderComponent, selector: "nz-list-header", exportAs: ["nzListHeader"] }, { type: i3.NzSpinComponent, selector: "nz-spin", inputs: ["nzIndicator", "nzSize", "nzTip", "nzDelay", "nzSimple", "nzSpinning"], exportAs: ["nzSpin"] }, { type: i2.NzListEmptyComponent, selector: "nz-list-empty", inputs: ["nzNoResult"], exportAs: ["nzListHeader"] }, { type: i2.NzListFooterComponent, selector: "nz-list-footer", exportAs: ["nzListFooter"] }, { type: i2.NzListPaginationComponent, selector: "nz-list-pagination", exportAs: ["nzListPagination"] }], directives: [{ type: i4.NgForOf, selector: "[ngFor][ngForOf]", inputs: ["ngForOf", "ngForTrackBy", "ngForTemplate"] }, { type: i4.NgTemplateOutlet, selector: "[ngTemplateOutlet]", inputs: ["ngTemplateOutletContext", "ngTemplateOutlet"] }, { type: i4.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { type: i5.NzStringTemplateOutletDirective, selector: "[nzStringTemplateOutlet]", inputs: ["nzStringTemplateOutletContext", "nzStringTemplateOutlet"], exportAs: ["nzStringTemplateOutlet"] }, { type: i6.NzRowDirective, selector: "[nz-row],nz-row,nz-form-item", inputs: ["nzAlign", "nzJustify", "nzGutter"], exportAs: ["nzRow"] }, { type: i6.NzColDirective, selector: "[nz-col],nz-col,nz-form-control,nz-form-label", inputs: ["nzFlex", "nzSpan", "nzOrder", "nzOffset", "nzPush", "nzPull", "nzXs", "nzSm", "nzMd", "nzLg", "nzXl", "nzXXl"], exportAs: ["nzCol"] }], changeDetection: i0.ChangeDetectionStrategy.OnPush, encapsulation: i0.ViewEncapsulation.None });
__decorate([
    InputBoolean()
], NzListComponent.prototype, "nzBordered", void 0);
__decorate([
    InputBoolean()
], NzListComponent.prototype, "nzLoading", void 0);
__decorate([
    InputBoolean()
], NzListComponent.prototype, "nzSplit", void 0);
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.1.2", ngImport: i0, type: NzListComponent, decorators: [{
            type: Component,
            args: [{
                    selector: 'nz-list, [nz-list]',
                    exportAs: 'nzList',
                    template: `
    <ng-template #itemsTpl>
      <div class="ant-list-items">
        <ng-container *ngFor="let item of nzDataSource; let index = index">
          <ng-template
            [ngTemplateOutlet]="nzRenderItem"
            [ngTemplateOutletContext]="{ $implicit: item, index: index }"
          ></ng-template>
        </ng-container>
        <ng-content></ng-content>
      </div>
    </ng-template>

    <nz-list-header *ngIf="nzHeader">
      <ng-container *nzStringTemplateOutlet="nzHeader">{{ nzHeader }}</ng-container>
    </nz-list-header>
    <ng-content select="nz-list-header"></ng-content>

    <nz-spin [nzSpinning]="nzLoading">
      <ng-container>
        <div *ngIf="nzLoading && nzDataSource && nzDataSource.length === 0" [style.min-height.px]="53"></div>
        <div *ngIf="nzGrid && nzDataSource; else itemsTpl" nz-row [nzGutter]="nzGrid.gutter || null">
          <div
            nz-col
            [nzSpan]="nzGrid.span || null"
            [nzXs]="nzGrid.xs || null"
            [nzSm]="nzGrid.sm || null"
            [nzMd]="nzGrid.md || null"
            [nzLg]="nzGrid.lg || null"
            [nzXl]="nzGrid.xl || null"
            [nzXXl]="nzGrid.xxl || null"
            *ngFor="let item of nzDataSource; let index = index"
          >
            <ng-template
              [ngTemplateOutlet]="nzRenderItem"
              [ngTemplateOutletContext]="{ $implicit: item, index: index }"
            ></ng-template>
          </div>
        </div>
        <nz-list-empty
          *ngIf="!nzLoading && nzDataSource && nzDataSource.length === 0"
          [nzNoResult]="nzNoResult"
        ></nz-list-empty>
      </ng-container>
    </nz-spin>

    <nz-list-footer *ngIf="nzFooter">
      <ng-container *nzStringTemplateOutlet="nzFooter">{{ nzFooter }}</ng-container>
    </nz-list-footer>
    <ng-content select="nz-list-footer, [nz-list-footer]"></ng-content>

    <ng-template [ngTemplateOutlet]="nzLoadMore"></ng-template>
    <ng-content select="nz-list-load-more, [nz-list-load-more]"></ng-content>

    <nz-list-pagination *ngIf="nzPagination">
      <ng-template [ngTemplateOutlet]="nzPagination"></ng-template>
    </nz-list-pagination>
    <ng-content select="nz-list-pagination, [nz-list-pagination]"></ng-content>
  `,
                    preserveWhitespaces: false,
                    encapsulation: ViewEncapsulation.None,
                    changeDetection: ChangeDetectionStrategy.OnPush,
                    host: {
                        class: 'ant-list',
                        '[class.ant-list-rtl]': `dir === 'rtl'`,
                        '[class.ant-list-vertical]': 'nzItemLayout === "vertical"',
                        '[class.ant-list-lg]': 'nzSize === "large"',
                        '[class.ant-list-sm]': 'nzSize === "small"',
                        '[class.ant-list-split]': 'nzSplit',
                        '[class.ant-list-bordered]': 'nzBordered',
                        '[class.ant-list-loading]': 'nzLoading',
                        '[class.ant-list-something-after-last-item]': 'hasSomethingAfterLastItem'
                    }
                }]
        }], ctorParameters: function () { return [{ type: i1.Directionality, decorators: [{
                    type: Optional
                }] }]; }, propDecorators: { nzDataSource: [{
                type: Input
            }], nzBordered: [{
                type: Input
            }], nzGrid: [{
                type: Input
            }], nzHeader: [{
                type: Input
            }], nzFooter: [{
                type: Input
            }], nzItemLayout: [{
                type: Input
            }], nzRenderItem: [{
                type: Input
            }], nzLoading: [{
                type: Input
            }], nzLoadMore: [{
                type: Input
            }], nzPagination: [{
                type: Input
            }], nzSize: [{
                type: Input
            }], nzSplit: [{
                type: Input
            }], nzNoResult: [{
                type: Input
            }], nzListFooterComponent: [{
                type: ContentChild,
                args: [NzListFooterComponent]
            }], nzListPaginationComponent: [{
                type: ContentChild,
                args: [NzListPaginationComponent]
            }], nzListLoadMoreDirective: [{
                type: ContentChild,
                args: [NzListLoadMoreDirective]
            }] } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibGlzdC5jb21wb25lbnQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9jb21wb25lbnRzL2xpc3QvbGlzdC5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQU1BLE9BQU8sRUFFTCx1QkFBdUIsRUFDdkIsU0FBUyxFQUNULFlBQVksRUFDWixLQUFLLEVBSUwsUUFBUSxFQUdSLGlCQUFpQixFQUNsQixNQUFNLGVBQWUsQ0FBQztBQUN2QixPQUFPLEVBQUUsZUFBZSxFQUFjLE9BQU8sRUFBRSxNQUFNLE1BQU0sQ0FBQztBQUM1RCxPQUFPLEVBQUUsU0FBUyxFQUFFLE1BQU0sZ0JBQWdCLENBQUM7QUFHM0MsT0FBTyxFQUFFLFlBQVksRUFBRSxNQUFNLHlCQUF5QixDQUFDO0FBR3ZELE9BQU8sRUFBRSxxQkFBcUIsRUFBRSx1QkFBdUIsRUFBRSx5QkFBeUIsRUFBRSxNQUFNLGFBQWEsQ0FBQzs7Ozs7Ozs7QUErRXhHLE1BQU0sT0FBTyxlQUFlO0lBaUMxQixZQUFnQyxjQUE4QjtRQUE5QixtQkFBYyxHQUFkLGNBQWMsQ0FBZ0I7UUExQnJDLGVBQVUsR0FBRyxLQUFLLENBQUM7UUFDbkMsV0FBTSxHQUFxQixFQUFFLENBQUM7UUFHOUIsaUJBQVksR0FBc0IsWUFBWSxDQUFDO1FBQy9DLGlCQUFZLEdBQTZCLElBQUksQ0FBQztRQUM5QixjQUFTLEdBQUcsS0FBSyxDQUFDO1FBQ2xDLGVBQVUsR0FBNkIsSUFBSSxDQUFDO1FBRTVDLFdBQU0sR0FBa0IsU0FBUyxDQUFDO1FBQ2xCLFlBQU8sR0FBRyxJQUFJLENBQUM7UUFPeEMsOEJBQXlCLEdBQUcsS0FBSyxDQUFDO1FBQ2xDLFFBQUcsR0FBYyxLQUFLLENBQUM7UUFDZiwyQkFBc0IsR0FBRyxJQUFJLGVBQWUsQ0FBb0IsSUFBSSxDQUFDLFlBQVksQ0FBQyxDQUFDO1FBQ25GLGFBQVEsR0FBRyxJQUFJLE9BQU8sRUFBUSxDQUFDO0lBTTBCLENBQUM7SUFKbEUsSUFBSSxp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LFlBQVk7c0JBQXBCLEtBQUs7Z0JBQ0csTUFBTTtzQkFBZCxLQUFLO2dCQUNtQixPQUFPO3NCQUEvQixLQUFLO2dCQUNHLFVBQVU7c0JBQWxCLEtBQUs7Z0JBRStCLHFCQUFxQjtzQkFBekQsWUFBWTt1QkFBQyxxQkFBcUI7Z0JBQ00seUJBQXlCO3NCQUFqRSxZQUFZO3VCQUFDLHlCQUF5QjtnQkFDQSx1QkFBdUI7c0JBQTdELFlBQVk7dUJBQUMsdUJBQXVCIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKiBVc2Ugb2YgdGhpcyBzb3VyY2UgY29kZSBpcyBnb3Zlcm5lZCBieSBhbiBNSVQtc3R5bGUgbGljZW5zZSB0aGF0IGNhbiBiZVxuICogZm91bmQgaW4gdGhlIExJQ0VOU0UgZmlsZSBhdCBodHRwczovL2dpdGh1Yi5jb20vTkctWk9SUk8vbmctem9ycm8tYW50ZC9ibG9iL21hc3Rlci9MSUNFTlNFXG4gKi9cblxuaW1wb3J0IHsgRGlyZWN0aW9uLCBEaXJlY3Rpb25hbGl0eSB9IGZyb20gJ0Bhbmd1bGFyL2Nkay9iaWRpJztcbmltcG9ydCB7XG4gIEFmdGVyQ29udGVudEluaXQsXG4gIENoYW5nZURldGVjdGlvblN0cmF0ZWd5LFxuICBDb21wb25lbnQsXG4gIENvbnRlbnRDaGlsZCxcbiAgSW5wdXQsXG4gIE9uQ2hhbmdlcyxcbiAgT25EZXN0cm95LFxuICBPbkluaXQsXG4gIE9wdGlvbmFsLFxuICBTaW1wbGVDaGFuZ2VzLFxuICBUZW1wbGF0ZVJlZixcbiAgVmlld0VuY2Fwc3VsYXRpb25cbn0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBCZWhhdmlvclN1YmplY3QsIE9ic2VydmFibGUsIFN1YmplY3QgfSBmcm9tICdyeGpzJztcbmltcG9ydCB7IHRha2VVbnRpbCB9IGZyb20gJ3J4anMvb3BlcmF0b3JzJztcblxuaW1wb3J0IHsgQm9vbGVhbklucHV0LCBOekRpcmVjdGlvblZIVHlwZSwgTnpTYWZlQW55LCBOelNpemVMRFNUeXBlIH0gZnJvbSAnbmctem9ycm8tYW50ZC9jb3JlL3R5cGVzJztcbmltcG9ydCB7IElucHV0Qm9vbGVhbiB9IGZyb20gJ25nLXpvcnJvLWFudGQvY29yZS91dGlsJztcblxuaW1wb3J0IHsgTnpMaXN0R3JpZCB9IGZyb20gJy4vaW50ZXJmYWNlJztcbmltcG9ydCB7IE56TGlzdEZvb3RlckNvbXBvbmVudCwgTnpMaXN0TG9hZE1vcmVEaXJlY3RpdmUsIE56TGlzdFBhZ2luYXRpb25Db21wb25lbnQgfSBmcm9tICcuL2xpc3QtY2VsbCc7XG5cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogJ256LWxpc3QsIFtuei1saXN0XScsXG4gIGV4cG9ydEFzOiAnbnpMaXN0JyxcbiAgdGVtcGxhdGU6IGBcbiAgICA8bmctdGVtcGxhdGUgI2l0ZW1zVHBsPlxuICAgICAgPGRpdiBjbGFzcz1cImFudC1saXN0LWl0ZW1zXCI+XG4gICAgICAgIDxuZy1jb250YWluZXIgKm5nRm9yPVwibGV0IGl0ZW0gb2YgbnpEYXRhU291cmNlOyBsZXQgaW5kZXggPSBpbmRleFwiPlxuICAgICAgICAgIDxuZy10ZW1wbGF0ZVxuICAgICAgICAgICAgW25nVGVtcGxhdGVPdXRsZXRdPVwibnpSZW5kZXJJdGVtXCJcbiAgICAgICAgICAgIFtuZ1RlbXBsYXRlT3V0bGV0Q29udGV4dF09XCJ7ICRpbXBsaWNpdDogaXRlbSwgaW5kZXg6IGluZGV4IH1cIlxuICAgICAgICAgID48L25nLXRlbXBsYXRlPlxuICAgICAgICA8L25nLWNvbnRhaW5lcj5cbiAgICAgICAgPG5nLWNvbnRlbnQ+PC9uZy1jb250ZW50PlxuICAgICAgPC9kaXY+XG4gICAgPC9uZy10ZW1wbGF0ZT5cblxuICAgIDxuei1saXN0LWhlYWRlciAqbmdJZj1cIm56SGVhZGVyXCI+XG4gICAgICA8bmctY29udGFpbmVyICpuelN0cmluZ1RlbXBsYXRlT3V0bGV0PVwibnpIZWFkZXJcIj57eyBuekhlYWRlciB9fTwvbmctY29udGFpbmVyPlxuICAgIDwvbnotbGlzdC1oZWFkZXI+XG4gICAgPG5nLWNvbnRlbnQgc2VsZWN0PVwibnotbGlzdC1oZWFkZXJcIj48L25nLWNvbnRlbnQ+XG5cbiAgICA8bnotc3BpbiBbbnpTcGlubmluZ109XCJuekxvYWRpbmdcIj5cbiAgICAgIDxuZy1jb250YWluZXI+XG4gICAgICAgIDxkaXYgKm5nSWY9XCJuekxvYWRpbmcgJiYgbnpEYXRhU291cmNlICYmIG56RGF0YVNvdXJjZS5sZW5ndGggPT09IDBcIiBbc3R5bGUubWluLWhlaWdodC5weF09XCI1M1wiPjwvZGl2PlxuICAgICAgICA8ZGl2ICpuZ0lmPVwibnpHcmlkICYmIG56RGF0YVNvdXJjZTsgZWxzZSBpdGVtc1RwbFwiIG56LXJvdyBbbnpHdXR0ZXJdPVwibnpHcmlkLmd1dHRlciB8fCBudWxsXCI+XG4gICAgICAgICAgPGRpdlxuICAgICAgICAgICAgbnotY29sXG4gICAgICAgICAgICBbbnpTcGFuXT1cIm56R3JpZC5zcGFuIHx8IG51bGxcIlxuICAgICAgICAgICAgW256WHNdPVwibnpHcmlkLnhzIHx8IG51bGxcIlxuICAgICAgICAgICAgW256U21dPVwibnpHcmlkLnNtIHx8IG51bGxcIlxuICAgICAgICAgICAgW256TWRdPVwibnpHcmlkLm1kIHx8IG51bGxcIlxuICAgICAgICAgICAgW256TGddPVwibnpHcmlkLmxnIHx8IG51bGxcIlxuICAgICAgICAgICAgW256WGxdPVwibnpHcmlkLnhsIHx8IG51bGxcIlxuICAgICAgICAgICAgW256WFhsXT1cIm56R3JpZC54eGwgfHwgbnVsbFwiXG4gICAgICAgICAgICAqbmdGb3I9XCJsZXQgaXRlbSBvZiBuekRhdGFTb3VyY2U7IGxldCBpbmRleCA9IGluZGV4XCJcbiAgICAgICAgICA+XG4gICAgICAgICAgICA8bmctdGVtcGxhdGVcbiAgICAgICAgICAgICAgW25nVGVtcGxhdGVPdXRsZXRdPVwibnpSZW5kZXJJdGVtXCJcbiAgICAgICAgICAgICAgW25nVGVtcGxhdGVPdXRsZXRDb250ZXh0XT1cInsgJGltcGxpY2l0OiBpdGVtLCBpbmRleDogaW5kZXggfVwiXG4gICAgICAgICAgICA+PC9uZy10ZW1wbGF0ZT5cbiAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgPC9kaXY+XG4gICAgICAgIDxuei1saXN0LWVtcHR5XG4gICAgICAgICAgKm5nSWY9XCIhbnpMb2FkaW5nICYmIG56RGF0YVNvdXJjZSAmJiBuekRhdGFTb3VyY2UubGVuZ3RoID09PSAwXCJcbiAgICAgICAgICBbbnpOb1Jlc3VsdF09XCJuek5vUmVzdWx0XCJcbiAgICAgICAgPjwvbnotbGlzdC1lbXB0eT5cbiAgICAgIDwvbmctY29udGFpbmVyPlxuICAgIDwvbnotc3Bpbj5cblxuICAgIDxuei1saXN0LWZvb3RlciAqbmdJZj1cIm56Rm9vdGVyXCI+XG4gICAgICA8bmctY29udGFpbmVyICpuelN0cmluZ1RlbXBsYXRlT3V0bGV0PVwibnpGb290ZXJcIj57eyBuekZvb3RlciB9fTwvbmctY29udGFpbmVyPlxuICAgIDwvbnotbGlzdC1mb290ZXI+XG4gICAgPG5nLWNvbnRlbnQgc2VsZWN0PVwibnotbGlzdC1mb290ZXIsIFtuei1saXN0LWZvb3Rlcl1cIj48L25nLWNvbnRlbnQ+XG5cbiAgICA8bmctdGVtcGxhdGUgW25nVGVtcGxhdGVPdXRsZXRdPVwibnpMb2FkTW9yZVwiPjwvbmctdGVtcGxhdGU+XG4gICAgPG5nLWNvbnRlbnQgc2VsZWN0PVwibnotbGlzdC1sb2FkLW1vcmUsIFtuei1saXN0LWxvYWQtbW9yZV1cIj48L25nLWNvbnRlbnQ+XG5cbiAgICA8bnotbGlzdC1wYWdpbmF0aW9uICpuZ0lmPVwibnpQYWdpbmF0aW9uXCI+XG4gICAgICA8bmctdGVtcGxhdGUgW25nVGVtcGxhdGVPdXRsZXRdPVwibnpQYWdpbmF0aW9uXCI+PC9uZy10ZW1wbGF0ZT5cbiAgICA8L256LWxpc3QtcGFnaW5hdGlvbj5cbiAgICA8bmctY29udGVudCBzZWxlY3Q9XCJuei1saXN0LXBhZ2luYXRpb24sIFtuei1saXN0LXBhZ2luYXRpb25dXCI+PC9uZy1jb250ZW50PlxuICBgLFxuICBwcmVzZXJ2ZVdoaXRlc3BhY2VzOiBmYWxzZSxcbiAgZW5jYXBzdWxhdGlvbjogVmlld0VuY2Fwc3VsYXRpb24uTm9uZSxcbiAgY2hhbmdlRGV0ZWN0aW9uOiBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneS5PblB1c2gsXG4gIGhvc3Q6IHtcbiAgICBjbGFzczogJ2FudC1saXN0JyxcbiAgICAnW2NsYXNzLmFudC1saXN0LXJ0bF0nOiBgZGlyID09PSAncnRsJ2AsXG4gICAgJ1tjbGFzcy5hbnQtbGlzdC12ZXJ0aWNhbF0nOiAnbnpJdGVtTGF5b3V0ID09PSBcInZlcnRpY2FsXCInLFxuICAgICdbY2xhc3MuYW50LWxpc3QtbGddJzogJ256U2l6ZSA9PT0gXCJsYXJnZVwiJyxcbiAgICAnW2NsYXNzLmFudC1saXN0LXNtXSc6ICduelNpemUgPT09IFwic21hbGxcIicsXG4gICAgJ1tjbGFzcy5hbnQtbGlzdC1zcGxpdF0nOiAnbnpTcGxpdCcsXG4gICAgJ1tjbGFzcy5hbnQtbGlzdC1ib3JkZXJlZF0nOiAnbnpCb3JkZXJlZCcsXG4gICAgJ1tjbGFzcy5hbnQtbGlzdC1sb2FkaW5nXSc6ICduekxvYWRpbmcnLFxuICAgICdbY2xhc3MuYW50LWxpc3Qtc29tZXRoaW5nLWFmdGVyLWxhc3QtaXRlbV0nOiAnaGFzU29tZXRoaW5nQWZ0ZXJMYXN0SXRlbSdcbiAgfVxufSlcbmV4cG9ydCBjbGFzcyBOekxpc3RDb21wb25lbnQgaW1wbGVtZW50cyBBZnRlckNvbnRlbnRJbml0LCBPbkNoYW5nZXMsIE9uRGVzdHJveSwgT25Jbml0IHtcbiAgc3RhdGljIG5nQWNjZXB0SW5wdXRUeXBlX256Qm9yZGVyZWQ6IEJvb2xlYW5JbnB1dDtcbiAgc3RhdGljIG5nQWNjZXB0SW5wdXRUeXBlX256TG9hZGluZzogQm9vbGVhbklucHV0O1xuICBzdGF0aWMgbmdBY2NlcHRJbnB1dFR5cGVfbnpTcGxpdDogQm9vbGVhbklucHV0O1xuICBzdGF0aWMgbmdBY2NlcHRJbnB1dFR5cGVfbnpHcmlkOiAnJyB8IE56TGlzdEdyaWQgfCBudWxsIHwgdW5kZWZpbmVkO1xuXG4gIEBJbnB1dCgpIG56RGF0YVNvdXJjZT86IE56U2FmZUFueVtdO1xuICBASW5wdXQoKSBASW5wdXRCb29sZWFuKCkgbnpCb3JkZXJlZCA9IGZhbHNlO1xuICBASW5wdXQoKSBuekdyaWQ/OiBOekxpc3RHcmlkIHwgJycgPSAnJztcbiAgQElucHV0KCkgbnpIZWFkZXI/OiBzdHJpbmcgfCBUZW1wbGF0ZVJlZjx2b2lkPjtcbiAgQElucHV0KCkgbnpGb290ZXI/OiBzdHJpbmcgfCBUZW1wbGF0ZVJlZjx2b2lkPjtcbiAgQElucHV0KCkgbnpJdGVtTGF5b3V0OiBOekRpcmVjdGlvblZIVHlwZSA9ICdob3Jpem9udGFsJztcbiAgQElucHV0KCkgbnpSZW5kZXJJdGVtOiBUZW1wbGF0ZVJlZjx2b2lkPiB8IG51bGwgPSBudWxsO1xuICBASW5wdXQoKSBASW5wdXRCb29sZWFuKCkgbnpMb2FkaW5nID0gZmFsc2U7XG4gIEBJbnB1dCgpIG56TG9hZE1vcmU6IFRlbXBsYXRlUmVmPHZvaWQ+IHwgbnVsbCA9IG51bGw7XG4gIEBJbnB1dCgpIG56UGFnaW5hdGlvbj86IFRlbXBsYXRlUmVmPHZvaWQ+O1xuICBASW5wdXQoKSBuelNpemU6IE56U2l6ZUxEU1R5cGUgPSAnZGVmYXVsdCc7XG4gIEBJbnB1dCgpIEBJbnB1dEJvb2xlYW4oKSBuelNwbGl0ID0gdHJ1ZTtcbiAgQElucHV0KCkgbnpOb1Jlc3VsdD86IHN0cmluZyB8IFRlbXBsYXRlUmVmPHZvaWQ+O1xuXG4gIEBDb250ZW50Q2hpbGQoTnpMaXN0Rm9vdGVyQ29tcG9uZW50KSBuekxpc3RGb290ZXJDb21wb25lbnQhOiBOekxpc3RGb290ZXJDb21wb25lbnQ7XG4gIEBDb250ZW50Q2hpbGQoTnpMaXN0UGFnaW5hdGlvbkNvbXBvbmVudCkgbnpMaXN0UGFnaW5hdGlvbkNvbXBvbmVudCE6IE56TGlzdFBhZ2luYXRpb25Db21wb25lbnQ7XG4gIEBDb250ZW50Q2hpbGQoTnpMaXN0TG9hZE1vcmVEaXJlY3RpdmUpIG56TGlzdExvYWRNb3JlRGlyZWN0aXZlITogTnpMaXN0TG9hZE1vcmVEaXJlY3RpdmU7XG5cbiAgaGFzU29tZXRoaW5nQWZ0ZXJMYXN0SXRlbSA9IGZhbHNlO1xuICBkaXI6IERpcmVjdGlvbiA9ICdsdHInO1xuICBwcml2YXRlIGl0ZW1MYXlvdXROb3RpZnlTb3VyY2UgPSBuZXcgQmVoYXZpb3JTdWJqZWN0PE56RGlyZWN0aW9uVkhUeXBlPih0aGlzLm56SXRlbUxheW91dCk7XG4gIHByaXZhdGUgZGVzdHJveSQgPSBuZXcgU3ViamVjdDx2b2lkPigpO1xuXG4gIGdldCBpdGVtTGF5b3V0Tm90aWZ5JCgpOiBPYnNlcnZhYmxlPE56RGlyZWN0aW9uVkhUeXBlPiB7XG4gICAgcmV0dXJuIHRoaXMuaXRlbUxheW91dE5vdGlmeVNvdXJjZS5hc09ic2VydmFibGUoKTtcbiAgfVxuXG4gIGNvbnN0cnVjdG9yKEBPcHRpb25hbCgpIHByaXZhdGUgZGlyZWN0aW9uYWxpdHk6IERpcmVjdGlvbmFsaXR5KSB7fVxuICBuZ09uSW5pdCgpOiB2b2lkIHtcbiAgICB0aGlzLmRpciA9IHRoaXMuZGlyZWN0aW9uYWxpdHkudmFsdWU7XG4gICAgdGhpcy5kaXJlY3Rpb25hbGl0eS5jaGFuZ2U/LnBpcGUodGFrZVVudGlsKHRoaXMuZGVzdHJveSQpKS5zdWJzY3JpYmUoKGRpcmVjdGlvbjogRGlyZWN0aW9uKSA9PiB7XG4gICAgICB0aGlzLmRpciA9IGRpcmVjdGlvbjtcbiAgICB9KTtcbiAgfVxuXG4gIGdldFNvbWV0aGluZ0FmdGVyTGFzdEl0ZW0oKTogYm9vbGVhbiB7XG4gICAgcmV0dXJuICEhKFxuICAgICAgdGhpcy5uekxvYWRNb3JlIHx8XG4gICAgICB0aGlzLm56UGFnaW5hdGlvbiB8fFxuICAgICAgdGhpcy5uekZvb3RlciB8fFxuICAgICAgdGhpcy5uekxpc3RGb290ZXJDb21wb25lbnQgfHxcbiAgICAgIHRoaXMubnpMaXN0UGFnaW5hdGlvbkNvbXBvbmVudCB8fFxuICAgICAgdGhpcy5uekxpc3RMb2FkTW9yZURpcmVjdGl2ZVxuICAgICk7XG4gIH1cbiAgbmdPbkNoYW5nZXMoY2hhbmdlczogU2ltcGxlQ2hhbmdlcyk6IHZvaWQge1xuICAgIGlmIChjaGFuZ2VzLm56SXRlbUxheW91dCkge1xuICAgICAgdGhpcy5pdGVtTGF5b3V0Tm90aWZ5U291cmNlLm5leHQodGhpcy5uekl0ZW1MYXlvdXQpO1xuICAgIH1cbiAgfVxuXG4gIG5nT25EZXN0cm95KCk6IHZvaWQge1xuICAgIHRoaXMuaXRlbUxheW91dE5vdGlmeVNvdXJjZS51bnN1YnNjcmliZSgpO1xuICAgIHRoaXMuZGVzdHJveSQubmV4dCgpO1xuICAgIHRoaXMuZGVzdHJveSQuY29tcGxldGUoKTtcbiAgfVxuXG4gIG5nQWZ0ZXJDb250ZW50SW5pdCgpOiB2b2lkIHtcbiAgICB0aGlzLmhhc1NvbWV0aGluZ0FmdGVyTGFzdEl0ZW0gPSB0aGlzLmdldFNvbWV0aGluZ0FmdGVyTGFzdEl0ZW0oKTtcbiAgfVxufVxuIl19