import { __decorate } from "tslib";
import { ChangeDetectionStrategy, Component, ContentChild, ContentChildren, Input, Optional, ViewEncapsulation } from '@angular/core';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { WithConfig } from 'ng-zorro-antd/core/config';
import { InputBoolean } from 'ng-zorro-antd/core/util';
import { NzCardGridDirective } from './card-grid.directive';
import { NzCardTabComponent } from './card-tab.component';
import * as i0 from "@angular/core";
import * as i1 from "ng-zorro-antd/core/config";
import * as i2 from "@angular/cdk/bidi";
import * as i3 from "./card-loading.component";
import * as i4 from "@angular/common";
import * as i5 from "ng-zorro-antd/core/outlet";
const NZ_CONFIG_MODULE_NAME = 'card';
export class NzCardComponent {
    constructor(nzConfigService, cdr, directionality) {
        this.nzConfigService = nzConfigService;
        this.cdr = cdr;
        this.directionality = directionality;
        this._nzModuleName = NZ_CONFIG_MODULE_NAME;
        this.nzBordered = true;
        this.nzBorderless = false;
        this.nzLoading = false;
        this.nzHoverable = false;
        this.nzBodyStyle = null;
        this.nzActions = [];
        this.nzType = null;
        this.nzSize = 'default';
        this.dir = 'ltr';
        this.destroy$ = new Subject();
        this.nzConfigService
            .getConfigChangeEventForComponent(NZ_CONFIG_MODULE_NAME)
            .pipe(takeUntil(this.destroy$))
            .subscribe(() => {
            this.cdr.markForCheck();
        });
    }
    ngOnInit() {
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
}
NzCardComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.1.2", ngImport: i0, type: NzCardComponent, deps: [{ token: i1.NzConfigService }, { token: i0.ChangeDetectorRef }, { token: i2.Directionality, optional: true }], target: i0.ɵɵFactoryTarget.Component });
NzCardComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "13.1.2", type: NzCardComponent, selector: "nz-card", inputs: { nzBordered: "nzBordered", nzBorderless: "nzBorderless", nzLoading: "nzLoading", nzHoverable: "nzHoverable", nzBodyStyle: "nzBodyStyle", nzCover: "nzCover", nzActions: "nzActions", nzType: "nzType", nzSize: "nzSize", nzTitle: "nzTitle", nzExtra: "nzExtra" }, host: { properties: { "class.ant-card-loading": "nzLoading", "class.ant-card-bordered": "nzBorderless === false && nzBordered", "class.ant-card-hoverable": "nzHoverable", "class.ant-card-small": "nzSize === \"small\"", "class.ant-card-contain-grid": "listOfNzCardGridDirective && listOfNzCardGridDirective.length", "class.ant-card-type-inner": "nzType === \"inner\"", "class.ant-card-contain-tabs": "!!listOfNzCardTabComponent", "class.ant-card-rtl": "dir === 'rtl'" }, classAttribute: "ant-card" }, queries: [{ propertyName: "listOfNzCardTabComponent", first: true, predicate: NzCardTabComponent, descendants: true }, { propertyName: "listOfNzCardGridDirective", predicate: NzCardGridDirective }], exportAs: ["nzCard"], ngImport: i0, template: `
    <div class="ant-card-head" *ngIf="nzTitle || nzExtra || listOfNzCardTabComponent">
      <div class="ant-card-head-wrapper">
        <div class="ant-card-head-title" *ngIf="nzTitle">
          <ng-container *nzStringTemplateOutlet="nzTitle">{{ nzTitle }}</ng-container>
        </div>
        <div class="ant-card-extra" *ngIf="nzExtra">
          <ng-container *nzStringTemplateOutlet="nzExtra">{{ nzExtra }}</ng-container>
        </div>
      </div>
      <ng-container *ngIf="listOfNzCardTabComponent">
        <ng-template [ngTemplateOutlet]="listOfNzCardTabComponent.template"></ng-template>
      </ng-container>
    </div>
    <div class="ant-card-cover" *ngIf="nzCover">
      <ng-template [ngTemplateOutlet]="nzCover"></ng-template>
    </div>
    <div class="ant-card-body" [ngStyle]="nzBodyStyle">
      <ng-container *ngIf="!nzLoading; else loadingTemplate">
        <ng-content></ng-content>
      </ng-container>
      <ng-template #loadingTemplate>
        <nz-card-loading></nz-card-loading>
      </ng-template>
    </div>
    <ul class="ant-card-actions" *ngIf="nzActions.length">
      <li *ngFor="let action of nzActions" [style.width.%]="100 / nzActions.length">
        <span><ng-template [ngTemplateOutlet]="action"></ng-template></span>
      </li>
    </ul>
  `, isInline: true, components: [{ type: i3.NzCardLoadingComponent, selector: "nz-card-loading", exportAs: ["nzCardLoading"] }], directives: [{ type: i4.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { type: i5.NzStringTemplateOutletDirective, selector: "[nzStringTemplateOutlet]", inputs: ["nzStringTemplateOutletContext", "nzStringTemplateOutlet"], exportAs: ["nzStringTemplateOutlet"] }, { type: i4.NgTemplateOutlet, selector: "[ngTemplateOutlet]", inputs: ["ngTemplateOutletContext", "ngTemplateOutlet"] }, { type: i4.NgStyle, selector: "[ngStyle]", inputs: ["ngStyle"] }, { type: i4.NgForOf, selector: "[ngFor][ngForOf]", inputs: ["ngForOf", "ngForTrackBy", "ngForTemplate"] }], changeDetection: i0.ChangeDetectionStrategy.OnPush, encapsulation: i0.ViewEncapsulation.None });
__decorate([
    WithConfig(),
    InputBoolean()
], NzCardComponent.prototype, "nzBordered", void 0);
__decorate([
    WithConfig(),
    InputBoolean()
], NzCardComponent.prototype, "nzBorderless", void 0);
__decorate([
    InputBoolean()
], NzCardComponent.prototype, "nzLoading", void 0);
__decorate([
    WithConfig(),
    InputBoolean()
], NzCardComponent.prototype, "nzHoverable", void 0);
__decorate([
    WithConfig()
], NzCardComponent.prototype, "nzSize", void 0);
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.1.2", ngImport: i0, type: NzCardComponent, decorators: [{
            type: Component,
            args: [{
                    selector: 'nz-card',
                    exportAs: 'nzCard',
                    preserveWhitespaces: false,
                    changeDetection: ChangeDetectionStrategy.OnPush,
                    encapsulation: ViewEncapsulation.None,
                    template: `
    <div class="ant-card-head" *ngIf="nzTitle || nzExtra || listOfNzCardTabComponent">
      <div class="ant-card-head-wrapper">
        <div class="ant-card-head-title" *ngIf="nzTitle">
          <ng-container *nzStringTemplateOutlet="nzTitle">{{ nzTitle }}</ng-container>
        </div>
        <div class="ant-card-extra" *ngIf="nzExtra">
          <ng-container *nzStringTemplateOutlet="nzExtra">{{ nzExtra }}</ng-container>
        </div>
      </div>
      <ng-container *ngIf="listOfNzCardTabComponent">
        <ng-template [ngTemplateOutlet]="listOfNzCardTabComponent.template"></ng-template>
      </ng-container>
    </div>
    <div class="ant-card-cover" *ngIf="nzCover">
      <ng-template [ngTemplateOutlet]="nzCover"></ng-template>
    </div>
    <div class="ant-card-body" [ngStyle]="nzBodyStyle">
      <ng-container *ngIf="!nzLoading; else loadingTemplate">
        <ng-content></ng-content>
      </ng-container>
      <ng-template #loadingTemplate>
        <nz-card-loading></nz-card-loading>
      </ng-template>
    </div>
    <ul class="ant-card-actions" *ngIf="nzActions.length">
      <li *ngFor="let action of nzActions" [style.width.%]="100 / nzActions.length">
        <span><ng-template [ngTemplateOutlet]="action"></ng-template></span>
      </li>
    </ul>
  `,
                    host: {
                        class: 'ant-card',
                        '[class.ant-card-loading]': 'nzLoading',
                        '[class.ant-card-bordered]': 'nzBorderless === false && nzBordered',
                        '[class.ant-card-hoverable]': 'nzHoverable',
                        '[class.ant-card-small]': 'nzSize === "small"',
                        '[class.ant-card-contain-grid]': 'listOfNzCardGridDirective && listOfNzCardGridDirective.length',
                        '[class.ant-card-type-inner]': 'nzType === "inner"',
                        '[class.ant-card-contain-tabs]': '!!listOfNzCardTabComponent',
                        '[class.ant-card-rtl]': `dir === 'rtl'`
                    }
                }]
        }], ctorParameters: function () { return [{ type: i1.NzConfigService }, { type: i0.ChangeDetectorRef }, { type: i2.Directionality, decorators: [{
                    type: Optional
                }] }]; }, propDecorators: { nzBordered: [{
                type: Input
            }], nzBorderless: [{
                type: Input
            }], nzLoading: [{
                type: Input
            }], nzHoverable: [{
                type: Input
            }], nzBodyStyle: [{
                type: Input
            }], nzCover: [{
                type: Input
            }], nzActions: [{
                type: Input
            }], nzType: [{
                type: Input
            }], nzSize: [{
                type: Input
            }], nzTitle: [{
                type: Input
            }], nzExtra: [{
                type: Input
            }], listOfNzCardTabComponent: [{
                type: ContentChild,
                args: [NzCardTabComponent, { static: false }]
            }], listOfNzCardGridDirective: [{
                type: ContentChildren,
                args: [NzCardGridDirective]
            }] } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2FyZC5jb21wb25lbnQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9jb21wb25lbnRzL2NhcmQvY2FyZC5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQU1BLE9BQU8sRUFDTCx1QkFBdUIsRUFFdkIsU0FBUyxFQUNULFlBQVksRUFDWixlQUFlLEVBQ2YsS0FBSyxFQUdMLFFBQVEsRUFHUixpQkFBaUIsRUFDbEIsTUFBTSxlQUFlLENBQUM7QUFDdkIsT0FBTyxFQUFFLE9BQU8sRUFBRSxNQUFNLE1BQU0sQ0FBQztBQUMvQixPQUFPLEVBQUUsU0FBUyxFQUFFLE1BQU0sZ0JBQWdCLENBQUM7QUFFM0MsT0FBTyxFQUFnQyxVQUFVLEVBQUUsTUFBTSwyQkFBMkIsQ0FBQztBQUVyRixPQUFPLEVBQUUsWUFBWSxFQUFFLE1BQU0seUJBQXlCLENBQUM7QUFFdkQsT0FBTyxFQUFFLG1CQUFtQixFQUFFLE1BQU0sdUJBQXVCLENBQUM7QUFDNUQsT0FBTyxFQUFFLGtCQUFrQixFQUFFLE1BQU0sc0JBQXNCLENBQUM7Ozs7Ozs7QUFFMUQsTUFBTSxxQkFBcUIsR0FBZ0IsTUFBTSxDQUFDO0FBbURsRCxNQUFNLE9BQU8sZUFBZTtJQXdCMUIsWUFDUyxlQUFnQyxFQUMvQixHQUFzQixFQUNWLGNBQThCO1FBRjNDLG9CQUFlLEdBQWYsZUFBZSxDQUFpQjtRQUMvQixRQUFHLEdBQUgsR0FBRyxDQUFtQjtRQUNWLG1CQUFjLEdBQWQsY0FBYyxDQUFnQjtRQTFCM0Msa0JBQWEsR0FBZ0IscUJBQXFCLENBQUM7UUFNckIsZUFBVSxHQUFZLElBQUksQ0FBQztRQUMzQixpQkFBWSxHQUFZLEtBQUssQ0FBQztRQUM1QyxjQUFTLEdBQUcsS0FBSyxDQUFDO1FBQ0osZ0JBQVcsR0FBWSxLQUFLLENBQUM7UUFDM0QsZ0JBQVcsR0FBNEIsSUFBSSxDQUFDO1FBRTVDLGNBQVMsR0FBNkIsRUFBRSxDQUFDO1FBQ3pDLFdBQU0sR0FBNEIsSUFBSSxDQUFDO1FBQ3pCLFdBQU0sR0FBaUIsU0FBUyxDQUFDO1FBS3hELFFBQUcsR0FBYyxLQUFLLENBQUM7UUFFZixhQUFRLEdBQUcsSUFBSSxPQUFPLEVBQUUsQ0FBQztRQU8vQixJQUFJLENBQUMsZUFBZTthQUNqQixnQ0FBZ0MsQ0FBQyxxQkFBcUIsQ0FBQzthQUN2RCxJQUFJLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsQ0FBQzthQUM5QixTQUFTLENBQUMsR0FBRyxFQUFFO1lBQ2QsSUFBSSxDQUFDLEdBQUcsQ0FBQyxZQUFZLEVBQUUsQ0FBQztRQUMxQixDQUFDLENBQUMsQ0FBQztJQUNQLENBQUM7SUFFRCxRQUFRO1FBQ04sSUFBSSxDQUFDLGNBQWMsQ0FBQyxNQUFNLEVBQUUsSUFBSSxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQyxTQUFTLENBQUMsQ0FBQyxTQUFvQixFQUFFLEVBQUU7WUFDNUYsSUFBSSxDQUFDLEdBQUcsR0FBRyxTQUFTLENBQUM7WUFDckIsSUFBSSxDQUFDLEdBQUcsQ0FBQyxhQUFhLEVBQUUsQ0FBQztRQUMzQixDQUFDLENBQUMsQ0FBQztRQUVILElBQUksQ0FBQyxHQUFHLEdBQUcsSUFBSSxDQUFDLGNBQWMsQ0FBQyxLQUFLLENBQUM7SUFDdkMsQ0FBQztJQUNELFdBQVc7UUFDVCxJQUFJLENBQUMsUUFBUSxDQUFDLElBQUksRUFBRSxDQUFDO1FBQ3JCLElBQUksQ0FBQyxRQUFRLENBQUMsUUFBUSxFQUFFLENBQUM7SUFDM0IsQ0FBQzs7NEdBaERVLGVBQWU7Z0dBQWYsZUFBZSxxMkJBa0JaLGtCQUFrQiwrRUFDZixtQkFBbUIsbURBOUQxQjs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0dBOEJUO0FBb0JzQztJQUE3QixVQUFVLEVBQUU7SUFBRSxZQUFZLEVBQUU7bURBQTRCO0FBQzNCO0lBQTdCLFVBQVUsRUFBRTtJQUFFLFlBQVksRUFBRTtxREFBK0I7QUFDNUM7SUFBZixZQUFZLEVBQUU7a0RBQW1CO0FBQ0o7SUFBN0IsVUFBVSxFQUFFO0lBQUUsWUFBWSxFQUFFO29EQUE4QjtBQUs3QztJQUFiLFVBQVUsRUFBRTsrQ0FBa0M7MkZBZjdDLGVBQWU7a0JBakQzQixTQUFTO21CQUFDO29CQUNULFFBQVEsRUFBRSxTQUFTO29CQUNuQixRQUFRLEVBQUUsUUFBUTtvQkFDbEIsbUJBQW1CLEVBQUUsS0FBSztvQkFDMUIsZUFBZSxFQUFFLHVCQUF1QixDQUFDLE1BQU07b0JBQy9DLGFBQWEsRUFBRSxpQkFBaUIsQ0FBQyxJQUFJO29CQUNyQyxRQUFRLEVBQUU7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztHQThCVDtvQkFDRCxJQUFJLEVBQUU7d0JBQ0osS0FBSyxFQUFFLFVBQVU7d0JBQ2pCLDBCQUEwQixFQUFFLFdBQVc7d0JBQ3ZDLDJCQUEyQixFQUFFLHNDQUFzQzt3QkFDbkUsNEJBQTRCLEVBQUUsYUFBYTt3QkFDM0Msd0JBQXdCLEVBQUUsb0JBQW9CO3dCQUM5QywrQkFBK0IsRUFBRSwrREFBK0Q7d0JBQ2hHLDZCQUE2QixFQUFFLG9CQUFvQjt3QkFDbkQsK0JBQStCLEVBQUUsNEJBQTRCO3dCQUM3RCxzQkFBc0IsRUFBRSxlQUFlO3FCQUN4QztpQkFDRjs7MEJBNEJJLFFBQVE7NENBcEI0QixVQUFVO3NCQUFoRCxLQUFLO2dCQUNpQyxZQUFZO3NCQUFsRCxLQUFLO2dCQUNtQixTQUFTO3NCQUFqQyxLQUFLO2dCQUNpQyxXQUFXO3NCQUFqRCxLQUFLO2dCQUNHLFdBQVc7c0JBQW5CLEtBQUs7Z0JBQ0csT0FBTztzQkFBZixLQUFLO2dCQUNHLFNBQVM7c0JBQWpCLEtBQUs7Z0JBQ0csTUFBTTtzQkFBZCxLQUFLO2dCQUNpQixNQUFNO3NCQUE1QixLQUFLO2dCQUNHLE9BQU87c0JBQWYsS0FBSztnQkFDRyxPQUFPO3NCQUFmLEtBQUs7Z0JBQytDLHdCQUF3QjtzQkFBNUUsWUFBWTt1QkFBQyxrQkFBa0IsRUFBRSxFQUFFLE1BQU0sRUFBRSxLQUFLLEVBQUU7Z0JBQ2IseUJBQXlCO3NCQUE5RCxlQUFlO3VCQUFDLG1CQUFtQiIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxuICogVXNlIG9mIHRoaXMgc291cmNlIGNvZGUgaXMgZ292ZXJuZWQgYnkgYW4gTUlULXN0eWxlIGxpY2Vuc2UgdGhhdCBjYW4gYmVcbiAqIGZvdW5kIGluIHRoZSBMSUNFTlNFIGZpbGUgYXQgaHR0cHM6Ly9naXRodWIuY29tL05HLVpPUlJPL25nLXpvcnJvLWFudGQvYmxvYi9tYXN0ZXIvTElDRU5TRVxuICovXG5cbmltcG9ydCB7IERpcmVjdGlvbiwgRGlyZWN0aW9uYWxpdHkgfSBmcm9tICdAYW5ndWxhci9jZGsvYmlkaSc7XG5pbXBvcnQge1xuICBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneSxcbiAgQ2hhbmdlRGV0ZWN0b3JSZWYsXG4gIENvbXBvbmVudCxcbiAgQ29udGVudENoaWxkLFxuICBDb250ZW50Q2hpbGRyZW4sXG4gIElucHV0LFxuICBPbkRlc3Ryb3ksXG4gIE9uSW5pdCxcbiAgT3B0aW9uYWwsXG4gIFF1ZXJ5TGlzdCxcbiAgVGVtcGxhdGVSZWYsXG4gIFZpZXdFbmNhcHN1bGF0aW9uXG59IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgU3ViamVjdCB9IGZyb20gJ3J4anMnO1xuaW1wb3J0IHsgdGFrZVVudGlsIH0gZnJvbSAncnhqcy9vcGVyYXRvcnMnO1xuXG5pbXBvcnQgeyBOekNvbmZpZ0tleSwgTnpDb25maWdTZXJ2aWNlLCBXaXRoQ29uZmlnIH0gZnJvbSAnbmctem9ycm8tYW50ZC9jb3JlL2NvbmZpZyc7XG5pbXBvcnQgeyBCb29sZWFuSW5wdXQsIE5nU3R5bGVJbnRlcmZhY2UsIE56U2l6ZURTVHlwZSB9IGZyb20gJ25nLXpvcnJvLWFudGQvY29yZS90eXBlcyc7XG5pbXBvcnQgeyBJbnB1dEJvb2xlYW4gfSBmcm9tICduZy16b3Jyby1hbnRkL2NvcmUvdXRpbCc7XG5cbmltcG9ydCB7IE56Q2FyZEdyaWREaXJlY3RpdmUgfSBmcm9tICcuL2NhcmQtZ3JpZC5kaXJlY3RpdmUnO1xuaW1wb3J0IHsgTnpDYXJkVGFiQ29tcG9uZW50IH0gZnJvbSAnLi9jYXJkLXRhYi5jb21wb25lbnQnO1xuXG5jb25zdCBOWl9DT05GSUdfTU9EVUxFX05BTUU6IE56Q29uZmlnS2V5ID0gJ2NhcmQnO1xuXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICduei1jYXJkJyxcbiAgZXhwb3J0QXM6ICduekNhcmQnLFxuICBwcmVzZXJ2ZVdoaXRlc3BhY2VzOiBmYWxzZSxcbiAgY2hhbmdlRGV0ZWN0aW9uOiBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneS5PblB1c2gsXG4gIGVuY2Fwc3VsYXRpb246IFZpZXdFbmNhcHN1bGF0aW9uLk5vbmUsXG4gIHRlbXBsYXRlOiBgXG4gICAgPGRpdiBjbGFzcz1cImFudC1jYXJkLWhlYWRcIiAqbmdJZj1cIm56VGl0bGUgfHwgbnpFeHRyYSB8fCBsaXN0T2ZOekNhcmRUYWJDb21wb25lbnRcIj5cbiAgICAgIDxkaXYgY2xhc3M9XCJhbnQtY2FyZC1oZWFkLXdyYXBwZXJcIj5cbiAgICAgICAgPGRpdiBjbGFzcz1cImFudC1jYXJkLWhlYWQtdGl0bGVcIiAqbmdJZj1cIm56VGl0bGVcIj5cbiAgICAgICAgICA8bmctY29udGFpbmVyICpuelN0cmluZ1RlbXBsYXRlT3V0bGV0PVwibnpUaXRsZVwiPnt7IG56VGl0bGUgfX08L25nLWNvbnRhaW5lcj5cbiAgICAgICAgPC9kaXY+XG4gICAgICAgIDxkaXYgY2xhc3M9XCJhbnQtY2FyZC1leHRyYVwiICpuZ0lmPVwibnpFeHRyYVwiPlxuICAgICAgICAgIDxuZy1jb250YWluZXIgKm56U3RyaW5nVGVtcGxhdGVPdXRsZXQ9XCJuekV4dHJhXCI+e3sgbnpFeHRyYSB9fTwvbmctY29udGFpbmVyPlxuICAgICAgICA8L2Rpdj5cbiAgICAgIDwvZGl2PlxuICAgICAgPG5nLWNvbnRhaW5lciAqbmdJZj1cImxpc3RPZk56Q2FyZFRhYkNvbXBvbmVudFwiPlxuICAgICAgICA8bmctdGVtcGxhdGUgW25nVGVtcGxhdGVPdXRsZXRdPVwibGlzdE9mTnpDYXJkVGFiQ29tcG9uZW50LnRlbXBsYXRlXCI+PC9uZy10ZW1wbGF0ZT5cbiAgICAgIDwvbmctY29udGFpbmVyPlxuICAgIDwvZGl2PlxuICAgIDxkaXYgY2xhc3M9XCJhbnQtY2FyZC1jb3ZlclwiICpuZ0lmPVwibnpDb3ZlclwiPlxuICAgICAgPG5nLXRlbXBsYXRlIFtuZ1RlbXBsYXRlT3V0bGV0XT1cIm56Q292ZXJcIj48L25nLXRlbXBsYXRlPlxuICAgIDwvZGl2PlxuICAgIDxkaXYgY2xhc3M9XCJhbnQtY2FyZC1ib2R5XCIgW25nU3R5bGVdPVwibnpCb2R5U3R5bGVcIj5cbiAgICAgIDxuZy1jb250YWluZXIgKm5nSWY9XCIhbnpMb2FkaW5nOyBlbHNlIGxvYWRpbmdUZW1wbGF0ZVwiPlxuICAgICAgICA8bmctY29udGVudD48L25nLWNvbnRlbnQ+XG4gICAgICA8L25nLWNvbnRhaW5lcj5cbiAgICAgIDxuZy10ZW1wbGF0ZSAjbG9hZGluZ1RlbXBsYXRlPlxuICAgICAgICA8bnotY2FyZC1sb2FkaW5nPjwvbnotY2FyZC1sb2FkaW5nPlxuICAgICAgPC9uZy10ZW1wbGF0ZT5cbiAgICA8L2Rpdj5cbiAgICA8dWwgY2xhc3M9XCJhbnQtY2FyZC1hY3Rpb25zXCIgKm5nSWY9XCJuekFjdGlvbnMubGVuZ3RoXCI+XG4gICAgICA8bGkgKm5nRm9yPVwibGV0IGFjdGlvbiBvZiBuekFjdGlvbnNcIiBbc3R5bGUud2lkdGguJV09XCIxMDAgLyBuekFjdGlvbnMubGVuZ3RoXCI+XG4gICAgICAgIDxzcGFuPjxuZy10ZW1wbGF0ZSBbbmdUZW1wbGF0ZU91dGxldF09XCJhY3Rpb25cIj48L25nLXRlbXBsYXRlPjwvc3Bhbj5cbiAgICAgIDwvbGk+XG4gICAgPC91bD5cbiAgYCxcbiAgaG9zdDoge1xuICAgIGNsYXNzOiAnYW50LWNhcmQnLFxuICAgICdbY2xhc3MuYW50LWNhcmQtbG9hZGluZ10nOiAnbnpMb2FkaW5nJyxcbiAgICAnW2NsYXNzLmFudC1jYXJkLWJvcmRlcmVkXSc6ICduekJvcmRlcmxlc3MgPT09IGZhbHNlICYmIG56Qm9yZGVyZWQnLFxuICAgICdbY2xhc3MuYW50LWNhcmQtaG92ZXJhYmxlXSc6ICduekhvdmVyYWJsZScsXG4gICAgJ1tjbGFzcy5hbnQtY2FyZC1zbWFsbF0nOiAnbnpTaXplID09PSBcInNtYWxsXCInLFxuICAgICdbY2xhc3MuYW50LWNhcmQtY29udGFpbi1ncmlkXSc6ICdsaXN0T2ZOekNhcmRHcmlkRGlyZWN0aXZlICYmIGxpc3RPZk56Q2FyZEdyaWREaXJlY3RpdmUubGVuZ3RoJyxcbiAgICAnW2NsYXNzLmFudC1jYXJkLXR5cGUtaW5uZXJdJzogJ256VHlwZSA9PT0gXCJpbm5lclwiJyxcbiAgICAnW2NsYXNzLmFudC1jYXJkLWNvbnRhaW4tdGFic10nOiAnISFsaXN0T2ZOekNhcmRUYWJDb21wb25lbnQnLFxuICAgICdbY2xhc3MuYW50LWNhcmQtcnRsXSc6IGBkaXIgPT09ICdydGwnYFxuICB9XG59KVxuZXhwb3J0IGNsYXNzIE56Q2FyZENvbXBvbmVudCBpbXBsZW1lbnRzIE9uRGVzdHJveSwgT25Jbml0IHtcbiAgcmVhZG9ubHkgX256TW9kdWxlTmFtZTogTnpDb25maWdLZXkgPSBOWl9DT05GSUdfTU9EVUxFX05BTUU7XG4gIHN0YXRpYyBuZ0FjY2VwdElucHV0VHlwZV9uekJvcmRlcmVkOiBCb29sZWFuSW5wdXQ7XG4gIHN0YXRpYyBuZ0FjY2VwdElucHV0VHlwZV9uekJvcmRlcmxlc3M6IEJvb2xlYW5JbnB1dDtcbiAgc3RhdGljIG5nQWNjZXB0SW5wdXRUeXBlX256TG9hZGluZzogQm9vbGVhbklucHV0O1xuICBzdGF0aWMgbmdBY2NlcHRJbnB1dFR5cGVfbnpIb3ZlcmFibGU6IEJvb2xlYW5JbnB1dDtcblxuICBASW5wdXQoKSBAV2l0aENvbmZpZygpIEBJbnB1dEJvb2xlYW4oKSBuekJvcmRlcmVkOiBib29sZWFuID0gdHJ1ZTtcbiAgQElucHV0KCkgQFdpdGhDb25maWcoKSBASW5wdXRCb29sZWFuKCkgbnpCb3JkZXJsZXNzOiBib29sZWFuID0gZmFsc2U7XG4gIEBJbnB1dCgpIEBJbnB1dEJvb2xlYW4oKSBuekxvYWRpbmcgPSBmYWxzZTtcbiAgQElucHV0KCkgQFdpdGhDb25maWcoKSBASW5wdXRCb29sZWFuKCkgbnpIb3ZlcmFibGU6IGJvb2xlYW4gPSBmYWxzZTtcbiAgQElucHV0KCkgbnpCb2R5U3R5bGU6IE5nU3R5bGVJbnRlcmZhY2UgfCBudWxsID0gbnVsbDtcbiAgQElucHV0KCkgbnpDb3Zlcj86IFRlbXBsYXRlUmVmPHZvaWQ+O1xuICBASW5wdXQoKSBuekFjdGlvbnM6IEFycmF5PFRlbXBsYXRlUmVmPHZvaWQ+PiA9IFtdO1xuICBASW5wdXQoKSBuelR5cGU6IHN0cmluZyB8ICdpbm5lcicgfCBudWxsID0gbnVsbDtcbiAgQElucHV0KCkgQFdpdGhDb25maWcoKSBuelNpemU6IE56U2l6ZURTVHlwZSA9ICdkZWZhdWx0JztcbiAgQElucHV0KCkgbnpUaXRsZT86IHN0cmluZyB8IFRlbXBsYXRlUmVmPHZvaWQ+O1xuICBASW5wdXQoKSBuekV4dHJhPzogc3RyaW5nIHwgVGVtcGxhdGVSZWY8dm9pZD47XG4gIEBDb250ZW50Q2hpbGQoTnpDYXJkVGFiQ29tcG9uZW50LCB7IHN0YXRpYzogZmFsc2UgfSkgbGlzdE9mTnpDYXJkVGFiQ29tcG9uZW50PzogTnpDYXJkVGFiQ29tcG9uZW50O1xuICBAQ29udGVudENoaWxkcmVuKE56Q2FyZEdyaWREaXJlY3RpdmUpIGxpc3RPZk56Q2FyZEdyaWREaXJlY3RpdmUhOiBRdWVyeUxpc3Q8TnpDYXJkR3JpZERpcmVjdGl2ZT47XG4gIGRpcjogRGlyZWN0aW9uID0gJ2x0cic7XG5cbiAgcHJpdmF0ZSBkZXN0cm95JCA9IG5ldyBTdWJqZWN0KCk7XG5cbiAgY29uc3RydWN0b3IoXG4gICAgcHVibGljIG56Q29uZmlnU2VydmljZTogTnpDb25maWdTZXJ2aWNlLFxuICAgIHByaXZhdGUgY2RyOiBDaGFuZ2VEZXRlY3RvclJlZixcbiAgICBAT3B0aW9uYWwoKSBwcml2YXRlIGRpcmVjdGlvbmFsaXR5OiBEaXJlY3Rpb25hbGl0eVxuICApIHtcbiAgICB0aGlzLm56Q29uZmlnU2VydmljZVxuICAgICAgLmdldENvbmZpZ0NoYW5nZUV2ZW50Rm9yQ29tcG9uZW50KE5aX0NPTkZJR19NT0RVTEVfTkFNRSlcbiAgICAgIC5waXBlKHRha2VVbnRpbCh0aGlzLmRlc3Ryb3kkKSlcbiAgICAgIC5zdWJzY3JpYmUoKCkgPT4ge1xuICAgICAgICB0aGlzLmNkci5tYXJrRm9yQ2hlY2soKTtcbiAgICAgIH0pO1xuICB9XG5cbiAgbmdPbkluaXQoKTogdm9pZCB7XG4gICAgdGhpcy5kaXJlY3Rpb25hbGl0eS5jaGFuZ2U/LnBpcGUodGFrZVVudGlsKHRoaXMuZGVzdHJveSQpKS5zdWJzY3JpYmUoKGRpcmVjdGlvbjogRGlyZWN0aW9uKSA9PiB7XG4gICAgICB0aGlzLmRpciA9IGRpcmVjdGlvbjtcbiAgICAgIHRoaXMuY2RyLmRldGVjdENoYW5nZXMoKTtcbiAgICB9KTtcblxuICAgIHRoaXMuZGlyID0gdGhpcy5kaXJlY3Rpb25hbGl0eS52YWx1ZTtcbiAgfVxuICBuZ09uRGVzdHJveSgpOiB2b2lkIHtcbiAgICB0aGlzLmRlc3Ryb3kkLm5leHQoKTtcbiAgICB0aGlzLmRlc3Ryb3kkLmNvbXBsZXRlKCk7XG4gIH1cbn1cbiJdfQ==