import { __decorate } from "tslib";
import { ChangeDetectionStrategy, Component, ContentChild, EventEmitter, Input, Optional, Output, ViewEncapsulation } from '@angular/core';
import { Subject } from 'rxjs';
import { map, takeUntil } from 'rxjs/operators';
import { WithConfig } from 'ng-zorro-antd/core/config';
import { PREFIX } from 'ng-zorro-antd/core/logger';
import { NzPageHeaderBreadcrumbDirective, NzPageHeaderFooterDirective } from './page-header-cells';
import * as i0 from "@angular/core";
import * as i1 from "@angular/common";
import * as i2 from "ng-zorro-antd/core/config";
import * as i3 from "ng-zorro-antd/cdk/resize-observer";
import * as i4 from "@angular/cdk/bidi";
import * as i5 from "ng-zorro-antd/core/outlet";
import * as i6 from "ng-zorro-antd/icon";
const NZ_CONFIG_MODULE_NAME = 'pageHeader';
export class NzPageHeaderComponent {
    constructor(location, nzConfigService, elementRef, nzResizeObserver, cdr, directionality) {
        this.location = location;
        this.nzConfigService = nzConfigService;
        this.elementRef = elementRef;
        this.nzResizeObserver = nzResizeObserver;
        this.cdr = cdr;
        this.directionality = directionality;
        this._nzModuleName = NZ_CONFIG_MODULE_NAME;
        this.nzBackIcon = null;
        this.nzGhost = true;
        this.nzBack = new EventEmitter();
        this.compact = false;
        this.destroy$ = new Subject();
        this.dir = 'ltr';
    }
    ngOnInit() {
        this.directionality.change?.pipe(takeUntil(this.destroy$)).subscribe((direction) => {
            this.dir = direction;
            this.cdr.detectChanges();
        });
        this.dir = this.directionality.value;
    }
    ngAfterViewInit() {
        this.nzResizeObserver
            .observe(this.elementRef)
            .pipe(map(([entry]) => entry.contentRect.width), takeUntil(this.destroy$))
            .subscribe((width) => {
            this.compact = width < 768;
            this.cdr.markForCheck();
        });
    }
    onBack() {
        if (this.nzBack.observers.length) {
            this.nzBack.emit();
        }
        else {
            if (!this.location) {
                throw new Error(`${PREFIX} you should import 'RouterModule' or register 'Location' if you want to use 'nzBack' default event!`);
            }
            this.location.back();
        }
    }
    ngOnDestroy() {
        this.destroy$.next();
        this.destroy$.complete();
    }
    getBackIcon() {
        if (this.dir === 'rtl') {
            return 'arrow-right';
        }
        return 'arrow-left';
    }
}
NzPageHeaderComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.1.2", ngImport: i0, type: NzPageHeaderComponent, deps: [{ token: i1.Location, optional: true }, { token: i2.NzConfigService }, { token: i0.ElementRef }, { token: i3.NzResizeObserver }, { token: i0.ChangeDetectorRef }, { token: i4.Directionality, optional: true }], target: i0.ɵɵFactoryTarget.Component });
NzPageHeaderComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "13.1.2", type: NzPageHeaderComponent, selector: "nz-page-header", inputs: { nzBackIcon: "nzBackIcon", nzTitle: "nzTitle", nzSubtitle: "nzSubtitle", nzGhost: "nzGhost" }, outputs: { nzBack: "nzBack" }, host: { properties: { "class.has-footer": "nzPageHeaderFooter", "class.ant-page-header-ghost": "nzGhost", "class.has-breadcrumb": "nzPageHeaderBreadcrumb", "class.ant-page-header-compact": "compact", "class.ant-page-header-rtl": "dir === 'rtl'" }, classAttribute: "ant-page-header" }, queries: [{ propertyName: "nzPageHeaderFooter", first: true, predicate: NzPageHeaderFooterDirective, descendants: true }, { propertyName: "nzPageHeaderBreadcrumb", first: true, predicate: NzPageHeaderBreadcrumbDirective, descendants: true }], exportAs: ["nzPageHeader"], ngImport: i0, template: `
    <ng-content select="nz-breadcrumb[nz-page-header-breadcrumb]"></ng-content>

    <div class="ant-page-header-heading">
      <div class="ant-page-header-heading-left">
        <!--back-->
        <div *ngIf="nzBackIcon !== null" (click)="onBack()" class="ant-page-header-back">
          <div role="button" tabindex="0" class="ant-page-header-back-button">
            <ng-container *nzStringTemplateOutlet="nzBackIcon; let backIcon">
              <i nz-icon [nzType]="backIcon || getBackIcon()" nzTheme="outline"></i>
            </ng-container>
          </div>
        </div>
        <!--avatar-->
        <ng-content select="nz-avatar[nz-page-header-avatar]"></ng-content>
        <!--title-->
        <span class="ant-page-header-heading-title" *ngIf="nzTitle">
          <ng-container *nzStringTemplateOutlet="nzTitle">{{ nzTitle }}</ng-container>
        </span>
        <ng-content *ngIf="!nzTitle" select="nz-page-header-title, [nz-page-header-title]"></ng-content>
        <!--subtitle-->
        <span class="ant-page-header-heading-sub-title" *ngIf="nzSubtitle">
          <ng-container *nzStringTemplateOutlet="nzSubtitle">{{ nzSubtitle }}</ng-container>
        </span>
        <ng-content *ngIf="!nzSubtitle" select="nz-page-header-subtitle, [nz-page-header-subtitle]"></ng-content>
        <ng-content select="nz-page-header-tags, [nz-page-header-tags]"></ng-content>
      </div>

      <ng-content select="nz-page-header-extra, [nz-page-header-extra]"></ng-content>
    </div>

    <ng-content select="nz-page-header-content, [nz-page-header-content]"></ng-content>
    <ng-content select="nz-page-header-footer, [nz-page-header-footer]"></ng-content>
  `, isInline: true, directives: [{ type: i1.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { type: i5.NzStringTemplateOutletDirective, selector: "[nzStringTemplateOutlet]", inputs: ["nzStringTemplateOutletContext", "nzStringTemplateOutlet"], exportAs: ["nzStringTemplateOutlet"] }, { type: i6.NzIconDirective, selector: "[nz-icon]", inputs: ["nzSpin", "nzRotate", "nzType", "nzTheme", "nzTwotoneColor", "nzIconfont"], exportAs: ["nzIcon"] }], changeDetection: i0.ChangeDetectionStrategy.OnPush, encapsulation: i0.ViewEncapsulation.None });
__decorate([
    WithConfig()
], NzPageHeaderComponent.prototype, "nzGhost", void 0);
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.1.2", ngImport: i0, type: NzPageHeaderComponent, decorators: [{
            type: Component,
            args: [{
                    selector: 'nz-page-header',
                    exportAs: 'nzPageHeader',
                    template: `
    <ng-content select="nz-breadcrumb[nz-page-header-breadcrumb]"></ng-content>

    <div class="ant-page-header-heading">
      <div class="ant-page-header-heading-left">
        <!--back-->
        <div *ngIf="nzBackIcon !== null" (click)="onBack()" class="ant-page-header-back">
          <div role="button" tabindex="0" class="ant-page-header-back-button">
            <ng-container *nzStringTemplateOutlet="nzBackIcon; let backIcon">
              <i nz-icon [nzType]="backIcon || getBackIcon()" nzTheme="outline"></i>
            </ng-container>
          </div>
        </div>
        <!--avatar-->
        <ng-content select="nz-avatar[nz-page-header-avatar]"></ng-content>
        <!--title-->
        <span class="ant-page-header-heading-title" *ngIf="nzTitle">
          <ng-container *nzStringTemplateOutlet="nzTitle">{{ nzTitle }}</ng-container>
        </span>
        <ng-content *ngIf="!nzTitle" select="nz-page-header-title, [nz-page-header-title]"></ng-content>
        <!--subtitle-->
        <span class="ant-page-header-heading-sub-title" *ngIf="nzSubtitle">
          <ng-container *nzStringTemplateOutlet="nzSubtitle">{{ nzSubtitle }}</ng-container>
        </span>
        <ng-content *ngIf="!nzSubtitle" select="nz-page-header-subtitle, [nz-page-header-subtitle]"></ng-content>
        <ng-content select="nz-page-header-tags, [nz-page-header-tags]"></ng-content>
      </div>

      <ng-content select="nz-page-header-extra, [nz-page-header-extra]"></ng-content>
    </div>

    <ng-content select="nz-page-header-content, [nz-page-header-content]"></ng-content>
    <ng-content select="nz-page-header-footer, [nz-page-header-footer]"></ng-content>
  `,
                    changeDetection: ChangeDetectionStrategy.OnPush,
                    encapsulation: ViewEncapsulation.None,
                    host: {
                        class: 'ant-page-header',
                        '[class.has-footer]': 'nzPageHeaderFooter',
                        '[class.ant-page-header-ghost]': 'nzGhost',
                        '[class.has-breadcrumb]': 'nzPageHeaderBreadcrumb',
                        '[class.ant-page-header-compact]': 'compact',
                        '[class.ant-page-header-rtl]': `dir === 'rtl'`
                    }
                }]
        }], ctorParameters: function () { return [{ type: i1.Location, decorators: [{
                    type: Optional
                }] }, { type: i2.NzConfigService }, { type: i0.ElementRef }, { type: i3.NzResizeObserver }, { type: i0.ChangeDetectorRef }, { type: i4.Directionality, decorators: [{
                    type: Optional
                }] }]; }, propDecorators: { nzBackIcon: [{
                type: Input
            }], nzTitle: [{
                type: Input
            }], nzSubtitle: [{
                type: Input
            }], nzGhost: [{
                type: Input
            }], nzBack: [{
                type: Output
            }], nzPageHeaderFooter: [{
                type: ContentChild,
                args: [NzPageHeaderFooterDirective, { static: false }]
            }], nzPageHeaderBreadcrumb: [{
                type: ContentChild,
                args: [NzPageHeaderBreadcrumbDirective, { static: false }]
            }] } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicGFnZS1oZWFkZXIuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vY29tcG9uZW50cy9wYWdlLWhlYWRlci9wYWdlLWhlYWRlci5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQU9BLE9BQU8sRUFFTCx1QkFBdUIsRUFFdkIsU0FBUyxFQUNULFlBQVksRUFFWixZQUFZLEVBQ1osS0FBSyxFQUdMLFFBQVEsRUFDUixNQUFNLEVBRU4saUJBQWlCLEVBQ2xCLE1BQU0sZUFBZSxDQUFDO0FBQ3ZCLE9BQU8sRUFBRSxPQUFPLEVBQUUsTUFBTSxNQUFNLENBQUM7QUFDL0IsT0FBTyxFQUFFLEdBQUcsRUFBRSxTQUFTLEVBQUUsTUFBTSxnQkFBZ0IsQ0FBQztBQUdoRCxPQUFPLEVBQWdDLFVBQVUsRUFBRSxNQUFNLDJCQUEyQixDQUFDO0FBQ3JGLE9BQU8sRUFBRSxNQUFNLEVBQUUsTUFBTSwyQkFBMkIsQ0FBQztBQUVuRCxPQUFPLEVBQUUsK0JBQStCLEVBQUUsMkJBQTJCLEVBQUUsTUFBTSxxQkFBcUIsQ0FBQzs7Ozs7Ozs7QUFFbkcsTUFBTSxxQkFBcUIsR0FBZ0IsWUFBWSxDQUFDO0FBa0R4RCxNQUFNLE9BQU8scUJBQXFCO0lBa0JoQyxZQUNzQixRQUFrQixFQUMvQixlQUFnQyxFQUMvQixVQUFzQixFQUN0QixnQkFBa0MsRUFDbEMsR0FBc0IsRUFDVixjQUE4QjtRQUw5QixhQUFRLEdBQVIsUUFBUSxDQUFVO1FBQy9CLG9CQUFlLEdBQWYsZUFBZSxDQUFpQjtRQUMvQixlQUFVLEdBQVYsVUFBVSxDQUFZO1FBQ3RCLHFCQUFnQixHQUFoQixnQkFBZ0IsQ0FBa0I7UUFDbEMsUUFBRyxHQUFILEdBQUcsQ0FBbUI7UUFDVixtQkFBYyxHQUFkLGNBQWMsQ0FBZ0I7UUF2QjNDLGtCQUFhLEdBQWdCLHFCQUFxQixDQUFDO1FBRW5ELGVBQVUsR0FBc0MsSUFBSSxDQUFDO1FBR3ZDLFlBQU8sR0FBWSxJQUFJ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VUFBVTtzQkFBbEIsS0FBSztnQkFDRyxPQUFPO3NCQUFmLEtBQUs7Z0JBQ0csVUFBVTtzQkFBbEIsS0FBSztnQkFDaUIsT0FBTztzQkFBN0IsS0FBSztnQkFDYSxNQUFNO3NCQUF4QixNQUFNO2dCQUdQLGtCQUFrQjtzQkFEakIsWUFBWTt1QkFBQywyQkFBMkIsRUFBRSxFQUFFLE1BQU0sRUFBRSxLQUFLLEVBQUU7Z0JBRzVELHNCQUFzQjtzQkFEckIsWUFBWTt1QkFBQywrQkFBK0IsRUFBRSxFQUFFLE1BQU0sRUFBRSxLQUFLLEVBQUUiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqIFVzZSBvZiB0aGlzIHNvdXJjZSBjb2RlIGlzIGdvdmVybmVkIGJ5IGFuIE1JVC1zdHlsZSBsaWNlbnNlIHRoYXQgY2FuIGJlXG4gKiBmb3VuZCBpbiB0aGUgTElDRU5TRSBmaWxlIGF0IGh0dHBzOi8vZ2l0aHViLmNvbS9ORy1aT1JSTy9uZy16b3Jyby1hbnRkL2Jsb2IvbWFzdGVyL0xJQ0VOU0VcbiAqL1xuXG5pbXBvcnQgeyBEaXJlY3Rpb24sIERpcmVjdGlvbmFsaXR5IH0gZnJvbSAnQGFuZ3VsYXIvY2RrL2JpZGknO1xuaW1wb3J0IHsgTG9jYXRpb24gfSBmcm9tICdAYW5ndWxhci9jb21tb24nO1xuaW1wb3J0IHtcbiAgQWZ0ZXJWaWV3SW5pdCxcbiAgQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3ksXG4gIENoYW5nZURldGVjdG9yUmVmLFxuICBDb21wb25lbnQsXG4gIENvbnRlbnRDaGlsZCxcbiAgRWxlbWVudFJlZixcbiAgRXZlbnRFbWl0dGVyLFxuICBJbnB1dCxcbiAgT25EZXN0cm95LFxuICBPbkluaXQsXG4gIE9wdGlvbmFsLFxuICBPdXRwdXQsXG4gIFRlbXBsYXRlUmVmLFxuICBWaWV3RW5jYXBzdWxhdGlvblxufSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IFN1YmplY3QgfSBmcm9tICdyeGpzJztcbmltcG9ydCB7IG1hcCwgdGFrZVVudGlsIH0gZnJvbSAncnhqcy9vcGVyYXRvcnMnO1xuXG5pbXBvcnQgeyBOelJlc2l6ZU9ic2VydmVyIH0gZnJvbSAnbmctem9ycm8tYW50ZC9jZGsvcmVzaXplLW9ic2VydmVyJztcbmltcG9ydCB7IE56Q29uZmlnS2V5LCBOekNvbmZpZ1NlcnZpY2UsIFdpdGhDb25maWcgfSBmcm9tICduZy16b3Jyby1hbnRkL2NvcmUvY29uZmlnJztcbmltcG9ydCB7IFBSRUZJWCB9IGZyb20gJ25nLXpvcnJvLWFudGQvY29yZS9sb2dnZXInO1xuXG5pbXBvcnQgeyBOelBhZ2VIZWFkZXJCcmVhZGNydW1iRGlyZWN0aXZlLCBOelBhZ2VIZWFkZXJGb290ZXJEaXJlY3RpdmUgfSBmcm9tICcuL3BhZ2UtaGVhZGVyLWNlbGxzJztcblxuY29uc3QgTlpfQ09ORklHX01PRFVMRV9OQU1FOiBOekNvbmZpZ0tleSA9ICdwYWdlSGVhZGVyJztcblxuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAnbnotcGFnZS1oZWFkZXInLFxuICBleHBvcnRBczogJ256UGFnZUhlYWRlcicsXG4gIHRlbXBsYXRlOiBgXG4gICAgPG5nLWNvbnRlbnQgc2VsZWN0PVwibnotYnJlYWRjcnVtYltuei1wYWdlLWhlYWRlci1icmVhZGNydW1iXVwiPjwvbmctY29udGVudD5cblxuICAgIDxkaXYgY2xhc3M9XCJhbnQtcGFnZS1oZWFkZXItaGVhZGluZ1wiPlxuICAgICAgPGRpdiBjbGFzcz1cImFudC1wYWdlLWhlYWRlci1oZWFkaW5nLWxlZnRcIj5cbiAgICAgICAgPCEtLWJhY2stLT5cbiAgICAgICAgPGRpdiAqbmdJZj1cIm56QmFja0ljb24gIT09IG51bGxcIiAoY2xpY2spPVwib25CYWNrKClcIiBjbGFzcz1cImFudC1wYWdlLWhlYWRlci1iYWNrXCI+XG4gICAgICAgICAgPGRpdiByb2xlPVwiYnV0dG9uXCIgdGFiaW5kZXg9XCIwXCIgY2xhc3M9XCJhbnQtcGFnZS1oZWFkZXItYmFjay1idXR0b25cIj5cbiAgICAgICAgICAgIDxuZy1jb250YWluZXIgKm56U3RyaW5nVGVtcGxhdGVPdXRsZXQ9XCJuekJhY2tJY29uOyBsZXQgYmFja0ljb25cIj5cbiAgICAgICAgICAgICAgPGkgbnotaWNvbiBbbnpUeXBlXT1cImJhY2tJY29uIHx8IGdldEJhY2tJY29uKClcIiBuelRoZW1lPVwib3V0bGluZVwiPjwvaT5cbiAgICAgICAgICAgIDwvbmctY29udGFpbmVyPlxuICAgICAgICAgIDwvZGl2PlxuICAgICAgICA8L2Rpdj5cbiAgICAgICAgPCEtLWF2YXRhci0tPlxuICAgICAgICA8bmctY29udGVudCBzZWxlY3Q9XCJuei1hdmF0YXJbbnotcGFnZS1oZWFkZXItYXZhdGFyXVwiPjwvbmctY29udGVudD5cbiAgICAgICAgPCEtLXRpdGxlLS0+XG4gICAgICAgIDxzcGFuIGNsYXNzPVwiYW50LXBhZ2UtaGVhZGVyLWhlYWRpbmctdGl0bGVcIiAqbmdJZj1cIm56VGl0bGVcIj5cbiAgICAgICAgICA8bmctY29udGFpbmVyICpuelN0cmluZ1RlbXBsYXRlT3V0bGV0PVwibnpUaXRsZVwiPnt7IG56VGl0bGUgfX08L25nLWNvbnRhaW5lcj5cbiAgICAgICAgPC9zcGFuPlxuICAgICAgICA8bmctY29udGVudCAqbmdJZj1cIiFuelRpdGxlXCIgc2VsZWN0PVwibnotcGFnZS1oZWFkZXItdGl0bGUsIFtuei1wYWdlLWhlYWRlci10aXRsZV1cIj48L25nLWNvbnRlbnQ+XG4gICAgICAgIDwhLS1zdWJ0aXRsZS0tPlxuICAgICAgICA8c3BhbiBjbGFzcz1cImFudC1wYWdlLWhlYWRlci1oZWFkaW5nLXN1Yi10aXRsZVwiICpuZ0lmPVwibnpTdWJ0aXRsZVwiPlxuICAgICAgICAgIDxuZy1jb250YWluZXIgKm56U3RyaW5nVGVtcGxhdGVPdXRsZXQ9XCJuelN1YnRpdGxlXCI+e3sgbnpTdWJ0aXRsZSB9fTwvbmctY29udGFpbmVyPlxuICAgICAgICA8L3NwYW4+XG4gICAgICAgIDxuZy1jb250ZW50ICpuZ0lmPVwiIW56U3VidGl0bGVcIiBzZWxlY3Q9XCJuei1wYWdlLWhlYWRlci1zdWJ0aXRsZSwgW256LXBhZ2UtaGVhZGVyLXN1YnRpdGxlXVwiPjwvbmctY29udGVudD5cbiAgICAgICAgPG5nLWNvbnRlbnQgc2VsZWN0PVwibnotcGFnZS1oZWFkZXItdGFncywgW256LXBhZ2UtaGVhZGVyLXRhZ3NdXCI+PC9uZy1jb250ZW50PlxuICAgICAgPC9kaXY+XG5cbiAgICAgIDxuZy1jb250ZW50IHNlbGVjdD1cIm56LXBhZ2UtaGVhZGVyLWV4dHJhLCBbbnotcGFnZS1oZWFkZXItZXh0cmFdXCI+PC9uZy1jb250ZW50PlxuICAgIDwvZGl2PlxuXG4gICAgPG5nLWNvbnRlbnQgc2VsZWN0PVwibnotcGFnZS1oZWFkZXItY29udGVudCwgW256LXBhZ2UtaGVhZGVyLWNvbnRlbnRdXCI+PC9uZy1jb250ZW50PlxuICAgIDxuZy1jb250ZW50IHNlbGVjdD1cIm56LXBhZ2UtaGVhZGVyLWZvb3RlciwgW256LXBhZ2UtaGVhZGVyLWZvb3Rlcl1cIj48L25nLWNvbnRlbnQ+XG4gIGAsXG4gIGNoYW5nZURldGVjdGlvbjogQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3kuT25QdXNoLFxuICBlbmNhcHN1bGF0aW9uOiBWaWV3RW5jYXBzdWxhdGlvbi5Ob25lLFxuICBob3N0OiB7XG4gICAgY2xhc3M6ICdhbnQtcGFnZS1oZWFkZXInLFxuICAgICdbY2xhc3MuaGFzLWZvb3Rlcl0nOiAnbnpQYWdlSGVhZGVyRm9vdGVyJyxcbiAgICAnW2NsYXNzLmFudC1wYWdlLWhlYWRlci1naG9zdF0nOiAnbnpHaG9zdCcsXG4gICAgJ1tjbGFzcy5oYXMtYnJlYWRjcnVtYl0nOiAnbnpQYWdlSGVhZGVyQnJlYWRjcnVtYicsXG4gICAgJ1tjbGFzcy5hbnQtcGFnZS1oZWFkZXItY29tcGFjdF0nOiAnY29tcGFjdCcsXG4gICAgJ1tjbGFzcy5hbnQtcGFnZS1oZWFkZXItcnRsXSc6IGBkaXIgPT09ICdydGwnYFxuICB9XG59KVxuZXhwb3J0IGNsYXNzIE56UGFnZUhlYWRlckNvbXBvbmVudCBpbXBsZW1lbnRzIEFmdGVyVmlld0luaXQsIE9uRGVzdHJveSwgT25Jbml0IHtcbiAgcmVhZG9ubHkgX256TW9kdWxlTmFtZTogTnpDb25maWdLZXkgPSBOWl9DT05GSUdfTU9EVUxFX05BTUU7XG5cbiAgQElucHV0KCkgbnpCYWNrSWNvbjogc3RyaW5nIHwgVGVtcGxhdGVSZWY8dm9pZD4gfCBudWxsID0gbnVsbDtcbiAgQElucHV0KCkgbnpUaXRsZT86IHN0cmluZyB8IFRlbXBsYXRlUmVmPHZvaWQ+O1xuICBASW5wdXQoKSBuelN1YnRpdGxlPzogc3RyaW5nIHwgVGVtcGxhdGVSZWY8dm9pZD47XG4gIEBJbnB1dCgpIEBXaXRoQ29uZmlnKCkgbnpHaG9zdDogYm9vbGVhbiA9IHRydWU7XG4gIEBPdXRwdXQoKSByZWFkb25seSBuekJhY2sgPSBuZXcgRXZlbnRFbWl0dGVyPHZvaWQ+KCk7XG5cbiAgQENvbnRlbnRDaGlsZChOelBhZ2VIZWFkZXJGb290ZXJEaXJlY3RpdmUsIHsgc3RhdGljOiBmYWxzZSB9KVxuICBuelBhZ2VIZWFkZXJGb290ZXI/OiBFbGVtZW50UmVmPE56UGFnZUhlYWRlckZvb3RlckRpcmVjdGl2ZT47XG4gIEBDb250ZW50Q2hpbGQoTnpQYWdlSGVhZGVyQnJlYWRjcnVtYkRpcmVjdGl2ZSwgeyBzdGF0aWM6IGZhbHNlIH0pXG4gIG56UGFnZUhlYWRlckJyZWFkY3J1bWI/OiBFbGVtZW50UmVmPE56UGFnZUhlYWRlckJyZWFkY3J1bWJEaXJlY3RpdmU+O1xuXG4gIGNvbXBhY3QgPSBmYWxzZTtcbiAgZGVzdHJveSQgPSBuZXcgU3ViamVjdDx2b2lkPigpO1xuICBkaXI6IERpcmVjdGlvbiA9ICdsdHInO1xuXG4gIGNvbnN0cnVjdG9yKFxuICAgIEBPcHRpb25hbCgpIHByaXZhdGUgbG9jYXRpb246IExvY2F0aW9uLFxuICAgIHB1YmxpYyBuekNvbmZpZ1NlcnZpY2U6IE56Q29uZmlnU2VydmljZSxcbiAgICBwcml2YXRlIGVsZW1lbnRSZWY6IEVsZW1lbnRSZWYsXG4gICAgcHJpdmF0ZSBuelJlc2l6ZU9ic2VydmVyOiBOelJlc2l6ZU9ic2VydmVyLFxuICAgIHByaXZhdGUgY2RyOiBDaGFuZ2VEZXRlY3RvclJlZixcbiAgICBAT3B0aW9uYWwoKSBwcml2YXRlIGRpcmVjdGlvbmFsaXR5OiBEaXJlY3Rpb25hbGl0eVxuICApIHt9XG5cbiAgbmdPbkluaXQoKTogdm9pZCB7XG4gICAgdGhpcy5kaXJlY3Rpb25hbGl0eS5jaGFuZ2U/LnBpcGUodGFrZVVudGlsKHRoaXMuZGVzdHJveSQpKS5zdWJzY3JpYmUoKGRpcmVjdGlvbjogRGlyZWN0aW9uKSA9PiB7XG4gICAgICB0aGlzLmRpciA9IGRpcmVjdGlvbjtcbiAgICAgIHRoaXMuY2RyLmRldGVjdENoYW5nZXMoKTtcbiAgICB9KTtcblxuICAgIHRoaXMuZGlyID0gdGhpcy5kaXJlY3Rpb25hbGl0eS52YWx1ZTtcbiAgfVxuXG4gIG5nQWZ0ZXJWaWV3SW5pdCgpOiB2b2lkIHtcbiAgICB0aGlzLm56UmVzaXplT2JzZXJ2ZXJcbiAgICAgIC5vYnNlcnZlKHRoaXMuZWxlbWVudFJlZilcbiAgICAgIC5waXBlKFxuICAgICAgICBtYXAoKFtlbnRyeV0pID0+IGVudHJ5LmNvbnRlbnRSZWN0LndpZHRoKSxcbiAgICAgICAgdGFrZVVudGlsKHRoaXMuZGVzdHJveSQpXG4gICAgICApXG4gICAgICAuc3Vic2NyaWJlKCh3aWR0aDogbnVtYmVyKSA9PiB7XG4gICAgICAgIHRoaXMuY29tcGFjdCA9IHdpZHRoIDwgNzY4O1xuICAgICAgICB0aGlzLmNkci5tYXJrRm9yQ2hlY2soKTtcbiAgICAgIH0pO1xuICB9XG5cbiAgb25CYWNrKCk6IHZvaWQge1xuICAgIGlmICh0aGlzLm56QmFjay5vYnNlcnZlcnMubGVuZ3RoKSB7XG4gICAgICB0aGlzLm56QmFjay5lbWl0KCk7XG4gICAgfSBlbHNlIHtcbiAgICAgIGlmICghdGhpcy5sb2NhdGlvbikge1xuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoXG4gICAgICAgICAgYCR7UFJFRklYfSB5b3Ugc2hvdWxkIGltcG9ydCAnUm91dGVyTW9kdWxlJyBvciByZWdpc3RlciAnTG9jYXRpb24nIGlmIHlvdSB3YW50IHRvIHVzZSAnbnpCYWNrJyBkZWZhdWx0IGV2ZW50IWBcbiAgICAgICAgKTtcbiAgICAgIH1cbiAgICAgIHRoaXMubG9jYXRpb24uYmFjaygpO1xuICAgIH1cbiAgfVxuXG4gIG5nT25EZXN0cm95KCk6IHZvaWQge1xuICAgIHRoaXMuZGVzdHJveSQubmV4dCgpO1xuICAgIHRoaXMuZGVzdHJveSQuY29tcGxldGUoKTtcbiAgfVxuXG4gIGdldEJhY2tJY29uKCk6IHN0cmluZyB7XG4gICAgaWYgKHRoaXMuZGlyID09PSAncnRsJykge1xuICAgICAgcmV0dXJuICdhcnJvdy1yaWdodCc7XG4gICAgfVxuICAgIHJldHVybiAnYXJyb3ctbGVmdCc7XG4gIH1cbn1cbiJdfQ==