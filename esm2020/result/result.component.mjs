import { ChangeDetectionStrategy, Component, Input, Optional, ViewEncapsulation } from '@angular/core';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import * as i0 from "@angular/core";
import * as i1 from "@angular/cdk/bidi";
import * as i2 from "./partial/not-found";
import * as i3 from "./partial/server-error.component";
import * as i4 from "./partial/unauthorized";
import * as i5 from "@angular/common";
import * as i6 from "ng-zorro-antd/core/outlet";
import * as i7 from "ng-zorro-antd/icon";
const IconMap = {
    success: 'check-circle',
    error: 'close-circle',
    info: 'exclamation-circle',
    warning: 'warning'
};
const ExceptionStatus = ['404', '500', '403'];
export class NzResultComponent {
    constructor(cdr, directionality) {
        this.cdr = cdr;
        this.directionality = directionality;
        this.nzStatus = 'info';
        this.isException = false;
        this.dir = 'ltr';
        this.destroy$ = new Subject();
    }
    ngOnInit() {
        this.directionality.change?.pipe(takeUntil(this.destroy$)).subscribe((direction) => {
            this.dir = direction;
            this.cdr.detectChanges();
        });
        this.dir = this.directionality.value;
    }
    ngOnChanges() {
        this.setStatusIcon();
    }
    ngOnDestroy() {
        this.destroy$.next();
        this.destroy$.complete();
    }
    setStatusIcon() {
        const icon = this.nzIcon;
        this.isException = ExceptionStatus.indexOf(this.nzStatus) !== -1;
        this.icon = icon
            ? typeof icon === 'string'
                ? IconMap[icon] || icon
                : icon
            : this.isException
                ? undefined
                : IconMap[this.nzStatus];
    }
}
NzResultComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.1.2", ngImport: i0, type: NzResultComponent, deps: [{ token: i0.ChangeDetectorRef }, { token: i1.Directionality, optional: true }], target: i0.ɵɵFactoryTarget.Component });
NzResultComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "13.1.2", type: NzResultComponent, selector: "nz-result", inputs: { nzIcon: "nzIcon", nzTitle: "nzTitle", nzStatus: "nzStatus", nzSubTitle: "nzSubTitle", nzExtra: "nzExtra" }, host: { properties: { "class.ant-result-success": "nzStatus === 'success'", "class.ant-result-error": "nzStatus === 'error'", "class.ant-result-info": "nzStatus === 'info'", "class.ant-result-warning": "nzStatus === 'warning'", "class.ant-result-rtl": "dir === 'rtl'" }, classAttribute: "ant-result" }, exportAs: ["nzResult"], usesOnChanges: true, ngImport: i0, template: `
    <div class="ant-result-icon">
      <ng-container *ngIf="!isException; else exceptionTpl">
        <ng-container *ngIf="icon">
          <ng-container *nzStringTemplateOutlet="icon; let icon">
            <i nz-icon [nzType]="icon" nzTheme="fill"></i>
          </ng-container>
        </ng-container>
        <ng-content *ngIf="!icon" select="[nz-result-icon]"></ng-content>
      </ng-container>
    </div>
    <ng-container *ngIf="nzTitle">
      <div class="ant-result-title" *nzStringTemplateOutlet="nzTitle">
        {{ nzTitle }}
      </div>
    </ng-container>
    <ng-content *ngIf="!nzTitle" select="div[nz-result-title]"></ng-content>
    <ng-container *ngIf="nzSubTitle">
      <div class="ant-result-subtitle" *nzStringTemplateOutlet="nzSubTitle">
        {{ nzSubTitle }}
      </div>
    </ng-container>
    <ng-content *ngIf="!nzSubTitle" select="div[nz-result-subtitle]"></ng-content>
    <ng-content select="nz-result-content, [nz-result-content]"></ng-content>
    <div class="ant-result-extra" *ngIf="nzExtra">
      <ng-container *nzStringTemplateOutlet="nzExtra">
        {{ nzExtra }}
      </ng-container>
    </div>
    <ng-content *ngIf="!nzExtra" select="div[nz-result-extra]"></ng-content>

    <ng-template #exceptionTpl>
      <ng-container [ngSwitch]="nzStatus">
        <nz-result-not-found *ngSwitchCase="'404'"></nz-result-not-found>
        <nz-result-server-error *ngSwitchCase="'500'"></nz-result-server-error>
        <nz-result-unauthorized *ngSwitchCase="'403'"></nz-result-unauthorized>
      </ng-container>
    </ng-template>
  `, isInline: true, components: [{ type: i2.NzResultNotFoundComponent, selector: "nz-result-not-found", exportAs: ["nzResultNotFound"] }, { type: i3.NzResultServerErrorComponent, selector: "nz-result-server-error", exportAs: ["nzResultServerError"] }, { type: i4.NzResultUnauthorizedComponent, selector: "nz-result-unauthorized", exportAs: ["nzResultUnauthorized"] }], directives: [{ type: i5.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { type: i6.NzStringTemplateOutletDirective, selector: "[nzStringTemplateOutlet]", inputs: ["nzStringTemplateOutletContext", "nzStringTemplateOutlet"], exportAs: ["nzStringTemplateOutlet"] }, { type: i7.NzIconDirective, selector: "[nz-icon]", inputs: ["nzSpin", "nzRotate", "nzType", "nzTheme", "nzTwotoneColor", "nzIconfont"], exportAs: ["nzIcon"] }, { type: i5.NgSwitch, selector: "[ngSwitch]", inputs: ["ngSwitch"] }, { type: i5.NgSwitchCase, selector: "[ngSwitchCase]", inputs: ["ngSwitchCase"] }], changeDetection: i0.ChangeDetectionStrategy.OnPush, encapsulation: i0.ViewEncapsulation.None });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.1.2", ngImport: i0, type: NzResultComponent, decorators: [{
            type: Component,
            args: [{
                    changeDetection: ChangeDetectionStrategy.OnPush,
                    encapsulation: ViewEncapsulation.None,
                    selector: 'nz-result',
                    exportAs: 'nzResult',
                    template: `
    <div class="ant-result-icon">
      <ng-container *ngIf="!isException; else exceptionTpl">
        <ng-container *ngIf="icon">
          <ng-container *nzStringTemplateOutlet="icon; let icon">
            <i nz-icon [nzType]="icon" nzTheme="fill"></i>
          </ng-container>
        </ng-container>
        <ng-content *ngIf="!icon" select="[nz-result-icon]"></ng-content>
      </ng-container>
    </div>
    <ng-container *ngIf="nzTitle">
      <div class="ant-result-title" *nzStringTemplateOutlet="nzTitle">
        {{ nzTitle }}
      </div>
    </ng-container>
    <ng-content *ngIf="!nzTitle" select="div[nz-result-title]"></ng-content>
    <ng-container *ngIf="nzSubTitle">
      <div class="ant-result-subtitle" *nzStringTemplateOutlet="nzSubTitle">
        {{ nzSubTitle }}
      </div>
    </ng-container>
    <ng-content *ngIf="!nzSubTitle" select="div[nz-result-subtitle]"></ng-content>
    <ng-content select="nz-result-content, [nz-result-content]"></ng-content>
    <div class="ant-result-extra" *ngIf="nzExtra">
      <ng-container *nzStringTemplateOutlet="nzExtra">
        {{ nzExtra }}
      </ng-container>
    </div>
    <ng-content *ngIf="!nzExtra" select="div[nz-result-extra]"></ng-content>

    <ng-template #exceptionTpl>
      <ng-container [ngSwitch]="nzStatus">
        <nz-result-not-found *ngSwitchCase="'404'"></nz-result-not-found>
        <nz-result-server-error *ngSwitchCase="'500'"></nz-result-server-error>
        <nz-result-unauthorized *ngSwitchCase="'403'"></nz-result-unauthorized>
      </ng-container>
    </ng-template>
  `,
                    host: {
                        class: 'ant-result',
                        '[class.ant-result-success]': `nzStatus === 'success'`,
                        '[class.ant-result-error]': `nzStatus === 'error'`,
                        '[class.ant-result-info]': `nzStatus === 'info'`,
                        '[class.ant-result-warning]': `nzStatus === 'warning'`,
                        '[class.ant-result-rtl]': `dir === 'rtl'`
                    }
                }]
        }], ctorParameters: function () { return [{ type: i0.ChangeDetectorRef }, { type: i1.Directionality, decorators: [{
                    type: Optional
                }] }]; }, propDecorators: { nzIcon: [{
                type: Input
            }], nzTitle: [{
                type: Input
            }], nzStatus: [{
                type: Input
            }], nzSubTitle: [{
                type: Input
            }], nzExtra: [{
                type: Input
            }] } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicmVzdWx0LmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL2NvbXBvbmVudHMvcmVzdWx0L3Jlc3VsdC5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBTUEsT0FBTyxFQUNMLHVCQUF1QixFQUV2QixTQUFTLEVBQ1QsS0FBSyxFQUlMLFFBQVEsRUFFUixpQkFBaUIsRUFDbEIsTUFBTSxlQUFlLENBQUM7QUFDdkIsT0FBTyxFQUFFLE9BQU8sRUFBRSxNQUFNLE1BQU0sQ0FBQztBQUMvQixPQUFPLEVBQUUsU0FBUyxFQUFFLE1BQU0sZ0JBQWdCLENBQUM7Ozs7Ozs7OztBQU0zQyxNQUFNLE9BQU8sR0FBRztJQUNkLE9BQU8sRUFBRSxjQUFjO0lBQ3ZCLEtBQUssRUFBRSxjQUFjO0lBQ3JCLElBQUksRUFBRSxvQkFBb0I7SUFDMUIsT0FBTyxFQUFFLFNBQVM7Q0FDbkIsQ0FBQztBQUNGLE1BQU0sZUFBZSxHQUFHLENBQUMsS0FBSyxFQUFFLEtBQUssRUFBRSxLQUFLLENBQUMsQ0FBQztBQXVEOUMsTUFBTSxPQUFPLGlCQUFpQjtJQWE1QixZQUFvQixHQUFzQixFQUFzQixjQUE4QjtRQUExRSxRQUFHLEdBQUgsR0FBRyxDQUFtQjtRQUFzQixtQkFBYyxHQUFkLGNBQWMsQ0FBZ0I7UUFWckYsYUFBUSxHQUF1QixNQUFNLENBQUM7UUFLL0MsZ0JBQVcsR0FBRyxLQUFLLENBQUM7UUFDcEIsUUFBRyxHQUFjLEtBQUssQ0FBQztRQUVmLGFBQVEsR0FBRyxJQUFJLE9BQU8sRUFBUSxDQUFDO0lBRTBELENBQUM7SUFFbEcsUUFBUTtRQUNOLElBQUksQ0FBQyxjQUFjLENBQUMsTUFBTSxFQUFFLElBQUksQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUMsU0FBUyxDQUFDLENBQUMsU0FBb0IsRUFBRSxFQUFFO1lBQzVGLElBQUksQ0FBQyxHQUFHLEdBQUcsU0FBUyxDQUFDO1lBQ3JCLElBQUksQ0FBQyxHQUFHLENBQUMsYUFBYSxFQUFFLENBQUM7UUFDM0IsQ0FBQyxDQUFDLENBQUM7UUFFSCxJQUFJLENBQUMsR0FBRyxHQUFHLElBQUksQ0FBQyxjQUFjLENBQUMsS0FBSyxDQUFDO0lBQ3ZDLENBQUM7SUFFRCxXQUFXO1FBQ1QsSUFBSSxDQUFDLGFBQWEsRUFBRSxDQUFDO0lBQ3ZCLENBQUM7SUFFRCxXQUFXO1FBQ1QsSUFBSSxDQUFDLFFBQVEsQ0FBQyxJQUFJLEVBQUUsQ0FBQztRQUNyQixJQUFJLENBQUMsUUFBUSxDQUFDLFFBQVEsRUFBRSxDQUFDO0lBQzNCLENBQUM7SUFFTyxhQUFhO1FBQ25CLE1BQU0sSUFBSSxHQUFHLElBQUksQ0FBQyxNQUFNLENBQUM7UUFFekIsSUFBSSxDQUFDLFdBQVcsR0FBRyxlQUFlLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQztRQUNqRSxJQUFJLENBQUMsSUFBSSxHQUFHLElBQUk7WUFDZCxDQUFDLENBQUMsT0FBTyxJQUFJLEtBQUssUUFBUTtnQkFDeEIsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxJQUF3QixDQUFDLElBQUksSUFBSTtnQkFDM0MsQ0FBQyxDQUFDLElBQUk7WUFDUixDQUFDLENBQUMsSUFBSSxDQUFDLFdBQVc7Z0JBQ2xCLENBQUMsQ0FBQyxTQUFTO2dCQUNYLENBQUMsQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLFFBQTRCLENBQUMsQ0FBQztJQUNqRCxDQUFDOzs4R0E1Q1UsaUJBQWlCO2tHQUFqQixpQkFBaUIsbWdCQWhEbEI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0dBc0NUOzJGQVVVLGlCQUFpQjtrQkFyRDdCLFNBQVM7bUJBQUM7b0JBQ1QsZUFBZSxFQUFFLHVCQUF1QixDQUFDLE1BQU07b0JBQy9DLGFBQWEsRUFBRSxpQkFBaUIsQ0FBQyxJQUFJO29CQUNyQyxRQUFRLEVBQUUsV0FBVztvQkFDckIsUUFBUSxFQUFFLFVBQVU7b0JBQ3BCLFFBQVEsRUFBRTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7R0FzQ1Q7b0JBQ0QsSUFBSSxFQUFFO3dCQUNKLEtBQUssRUFBRSxZQUFZO3dCQUNuQiw0QkFBNEIsRUFBRSx3QkFBd0I7d0JBQ3RELDBCQUEwQixFQUFFLHNCQUFzQjt3QkFDbEQseUJBQXlCLEVBQUUscUJBQXFCO3dCQUNoRCw0QkFBNEIsRUFBRSx3QkFBd0I7d0JBQ3RELHdCQUF3QixFQUFFLGVBQWU7cUJBQzFDO2lCQUNGOzswQkFjOEMsUUFBUTs0Q0FaNUMsTUFBTTtzQkFBZCxLQUFLO2dCQUNHLE9BQU87c0JBQWYsS0FBSztnQkFDRyxRQUFRO3NCQUFoQixLQUFLO2dCQUNHLFVBQVU7c0JBQWxCLEtBQUs7Z0JBQ0csT0FBTztzQkFBZixLQUFLIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKiBVc2Ugb2YgdGhpcyBzb3VyY2UgY29kZSBpcyBnb3Zlcm5lZCBieSBhbiBNSVQtc3R5bGUgbGljZW5zZSB0aGF0IGNhbiBiZVxuICogZm91bmQgaW4gdGhlIExJQ0VOU0UgZmlsZSBhdCBodHRwczovL2dpdGh1Yi5jb20vTkctWk9SUk8vbmctem9ycm8tYW50ZC9ibG9iL21hc3Rlci9MSUNFTlNFXG4gKi9cblxuaW1wb3J0IHsgRGlyZWN0aW9uLCBEaXJlY3Rpb25hbGl0eSB9IGZyb20gJ0Bhbmd1bGFyL2Nkay9iaWRpJztcbmltcG9ydCB7XG4gIENoYW5nZURldGVjdGlvblN0cmF0ZWd5LFxuICBDaGFuZ2VEZXRlY3RvclJlZixcbiAgQ29tcG9uZW50LFxuICBJbnB1dCxcbiAgT25DaGFuZ2VzLFxuICBPbkRlc3Ryb3ksXG4gIE9uSW5pdCxcbiAgT3B0aW9uYWwsXG4gIFRlbXBsYXRlUmVmLFxuICBWaWV3RW5jYXBzdWxhdGlvblxufSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IFN1YmplY3QgfSBmcm9tICdyeGpzJztcbmltcG9ydCB7IHRha2VVbnRpbCB9IGZyb20gJ3J4anMvb3BlcmF0b3JzJztcblxuZXhwb3J0IHR5cGUgTnpSZXN1bHRJY29uVHlwZSA9ICdzdWNjZXNzJyB8ICdlcnJvcicgfCAnaW5mbycgfCAnd2FybmluZyc7XG5leHBvcnQgdHlwZSBOekV4Y2VwdGlvblN0YXR1c1R5cGUgPSAnNDA0JyB8ICc1MDAnIHwgJzQwMyc7XG5leHBvcnQgdHlwZSBOelJlc3VsdFN0YXR1c1R5cGUgPSBOekV4Y2VwdGlvblN0YXR1c1R5cGUgfCBOelJlc3VsdEljb25UeXBlO1xuXG5jb25zdCBJY29uTWFwID0ge1xuICBzdWNjZXNzOiAnY2hlY2stY2lyY2xlJyxcbiAgZXJyb3I6ICdjbG9zZS1jaXJjbGUnLFxuICBpbmZvOiAnZXhjbGFtYXRpb24tY2lyY2xlJyxcbiAgd2FybmluZzogJ3dhcm5pbmcnXG59O1xuY29uc3QgRXhjZXB0aW9uU3RhdHVzID0gWyc0MDQnLCAnNTAwJywgJzQwMyddO1xuXG5AQ29tcG9uZW50KHtcbiAgY2hhbmdlRGV0ZWN0aW9uOiBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneS5PblB1c2gsXG4gIGVuY2Fwc3VsYXRpb246IFZpZXdFbmNhcHN1bGF0aW9uLk5vbmUsXG4gIHNlbGVjdG9yOiAnbnotcmVzdWx0JyxcbiAgZXhwb3J0QXM6ICduelJlc3VsdCcsXG4gIHRlbXBsYXRlOiBgXG4gICAgPGRpdiBjbGFzcz1cImFudC1yZXN1bHQtaWNvblwiPlxuICAgICAgPG5nLWNvbnRhaW5lciAqbmdJZj1cIiFpc0V4Y2VwdGlvbjsgZWxzZSBleGNlcHRpb25UcGxcIj5cbiAgICAgICAgPG5nLWNvbnRhaW5lciAqbmdJZj1cImljb25cIj5cbiAgICAgICAgICA8bmctY29udGFpbmVyICpuelN0cmluZ1RlbXBsYXRlT3V0bGV0PVwiaWNvbjsgbGV0IGljb25cIj5cbiAgICAgICAgICAgIDxpIG56LWljb24gW256VHlwZV09XCJpY29uXCIgbnpUaGVtZT1cImZpbGxcIj48L2k+XG4gICAgICAgICAgPC9uZy1jb250YWluZXI+XG4gICAgICAgIDwvbmctY29udGFpbmVyPlxuICAgICAgICA8bmctY29udGVudCAqbmdJZj1cIiFpY29uXCIgc2VsZWN0PVwiW256LXJlc3VsdC1pY29uXVwiPjwvbmctY29udGVudD5cbiAgICAgIDwvbmctY29udGFpbmVyPlxuICAgIDwvZGl2PlxuICAgIDxuZy1jb250YWluZXIgKm5nSWY9XCJuelRpdGxlXCI+XG4gICAgICA8ZGl2IGNsYXNzPVwiYW50LXJlc3VsdC10aXRsZVwiICpuelN0cmluZ1RlbXBsYXRlT3V0bGV0PVwibnpUaXRsZVwiPlxuICAgICAgICB7eyBuelRpdGxlIH19XG4gICAgICA8L2Rpdj5cbiAgICA8L25nLWNvbnRhaW5lcj5cbiAgICA8bmctY29udGVudCAqbmdJZj1cIiFuelRpdGxlXCIgc2VsZWN0PVwiZGl2W256LXJlc3VsdC10aXRsZV1cIj48L25nLWNvbnRlbnQ+XG4gICAgPG5nLWNvbnRhaW5lciAqbmdJZj1cIm56U3ViVGl0bGVcIj5cbiAgICAgIDxkaXYgY2xhc3M9XCJhbnQtcmVzdWx0LXN1YnRpdGxlXCIgKm56U3RyaW5nVGVtcGxhdGVPdXRsZXQ9XCJuelN1YlRpdGxlXCI+XG4gICAgICAgIHt7IG56U3ViVGl0bGUgfX1cbiAgICAgIDwvZGl2PlxuICAgIDwvbmctY29udGFpbmVyPlxuICAgIDxuZy1jb250ZW50ICpuZ0lmPVwiIW56U3ViVGl0bGVcIiBzZWxlY3Q9XCJkaXZbbnotcmVzdWx0LXN1YnRpdGxlXVwiPjwvbmctY29udGVudD5cbiAgICA8bmctY29udGVudCBzZWxlY3Q9XCJuei1yZXN1bHQtY29udGVudCwgW256LXJlc3VsdC1jb250ZW50XVwiPjwvbmctY29udGVudD5cbiAgICA8ZGl2IGNsYXNzPVwiYW50LXJlc3VsdC1leHRyYVwiICpuZ0lmPVwibnpFeHRyYVwiPlxuICAgICAgPG5nLWNvbnRhaW5lciAqbnpTdHJpbmdUZW1wbGF0ZU91dGxldD1cIm56RXh0cmFcIj5cbiAgICAgICAge3sgbnpFeHRyYSB9fVxuICAgICAgPC9uZy1jb250YWluZXI+XG4gICAgPC9kaXY+XG4gICAgPG5nLWNvbnRlbnQgKm5nSWY9XCIhbnpFeHRyYVwiIHNlbGVjdD1cImRpdltuei1yZXN1bHQtZXh0cmFdXCI+PC9uZy1jb250ZW50PlxuXG4gICAgPG5nLXRlbXBsYXRlICNleGNlcHRpb25UcGw+XG4gICAgICA8bmctY29udGFpbmVyIFtuZ1N3aXRjaF09XCJuelN0YXR1c1wiPlxuICAgICAgICA8bnotcmVzdWx0LW5vdC1mb3VuZCAqbmdTd2l0Y2hDYXNlPVwiJzQwNCdcIj48L256LXJlc3VsdC1ub3QtZm91bmQ+XG4gICAgICAgIDxuei1yZXN1bHQtc2VydmVyLWVycm9yICpuZ1N3aXRjaENhc2U9XCInNTAwJ1wiPjwvbnotcmVzdWx0LXNlcnZlci1lcnJvcj5cbiAgICAgICAgPG56LXJlc3VsdC11bmF1dGhvcml6ZWQgKm5nU3dpdGNoQ2FzZT1cIic0MDMnXCI+PC9uei1yZXN1bHQtdW5hdXRob3JpemVkPlxuICAgICAgPC9uZy1jb250YWluZXI+XG4gICAgPC9uZy10ZW1wbGF0ZT5cbiAgYCxcbiAgaG9zdDoge1xuICAgIGNsYXNzOiAnYW50LXJlc3VsdCcsXG4gICAgJ1tjbGFzcy5hbnQtcmVzdWx0LXN1Y2Nlc3NdJzogYG56U3RhdHVzID09PSAnc3VjY2VzcydgLFxuICAgICdbY2xhc3MuYW50LXJlc3VsdC1lcnJvcl0nOiBgbnpTdGF0dXMgPT09ICdlcnJvcidgLFxuICAgICdbY2xhc3MuYW50LXJlc3VsdC1pbmZvXSc6IGBuelN0YXR1cyA9PT0gJ2luZm8nYCxcbiAgICAnW2NsYXNzLmFudC1yZXN1bHQtd2FybmluZ10nOiBgbnpTdGF0dXMgPT09ICd3YXJuaW5nJ2AsXG4gICAgJ1tjbGFzcy5hbnQtcmVzdWx0LXJ0bF0nOiBgZGlyID09PSAncnRsJ2BcbiAgfVxufSlcbmV4cG9ydCBjbGFzcyBOelJlc3VsdENvbXBvbmVudCBpbXBsZW1lbnRzIE9uQ2hhbmdlcywgT25EZXN0cm95LCBPbkluaXQge1xuICBASW5wdXQoKSBuekljb24/OiBzdHJpbmcgfCBUZW1wbGF0ZVJlZjx2b2lkPjtcbiAgQElucHV0KCkgbnpUaXRsZT86IHN0cmluZyB8IFRlbXBsYXRlUmVmPHZvaWQ+O1xuICBASW5wdXQoKSBuelN0YXR1czogTnpSZXN1bHRTdGF0dXNUeXBlID0gJ2luZm8nO1xuICBASW5wdXQoKSBuelN1YlRpdGxlPzogc3RyaW5nIHwgVGVtcGxhdGVSZWY8dm9pZD47XG4gIEBJbnB1dCgpIG56RXh0cmE/OiBzdHJpbmcgfCBUZW1wbGF0ZVJlZjx2b2lkPjtcblxuICBpY29uPzogc3RyaW5nIHwgVGVtcGxhdGVSZWY8dm9pZD47XG4gIGlzRXhjZXB0aW9uID0gZmFsc2U7XG4gIGRpcjogRGlyZWN0aW9uID0gJ2x0cic7XG5cbiAgcHJpdmF0ZSBkZXN0cm95JCA9IG5ldyBTdWJqZWN0PHZvaWQ+KCk7XG5cbiAgY29uc3RydWN0b3IocHJpdmF0ZSBjZHI6IENoYW5nZURldGVjdG9yUmVmLCBAT3B0aW9uYWwoKSBwcml2YXRlIGRpcmVjdGlvbmFsaXR5OiBEaXJlY3Rpb25hbGl0eSkge31cblxuICBuZ09uSW5pdCgpOiB2b2lkIHtcbiAgICB0aGlzLmRpcmVjdGlvbmFsaXR5LmNoYW5nZT8ucGlwZSh0YWtlVW50aWwodGhpcy5kZXN0cm95JCkpLnN1YnNjcmliZSgoZGlyZWN0aW9uOiBEaXJlY3Rpb24pID0+IHtcbiAgICAgIHRoaXMuZGlyID0gZGlyZWN0aW9uO1xuICAgICAgdGhpcy5jZHIuZGV0ZWN0Q2hhbmdlcygpO1xuICAgIH0pO1xuXG4gICAgdGhpcy5kaXIgPSB0aGlzLmRpcmVjdGlvbmFsaXR5LnZhbHVlO1xuICB9XG5cbiAgbmdPbkNoYW5nZXMoKTogdm9pZCB7XG4gICAgdGhpcy5zZXRTdGF0dXNJY29uKCk7XG4gIH1cblxuICBuZ09uRGVzdHJveSgpOiB2b2lkIHtcbiAgICB0aGlzLmRlc3Ryb3kkLm5leHQoKTtcbiAgICB0aGlzLmRlc3Ryb3kkLmNvbXBsZXRlKCk7XG4gIH1cblxuICBwcml2YXRlIHNldFN0YXR1c0ljb24oKTogdm9pZCB7XG4gICAgY29uc3QgaWNvbiA9IHRoaXMubnpJY29uO1xuXG4gICAgdGhpcy5pc0V4Y2VwdGlvbiA9IEV4Y2VwdGlvblN0YXR1cy5pbmRleE9mKHRoaXMubnpTdGF0dXMpICE9PSAtMTtcbiAgICB0aGlzLmljb24gPSBpY29uXG4gICAgICA/IHR5cGVvZiBpY29uID09PSAnc3RyaW5nJ1xuICAgICAgICA/IEljb25NYXBbaWNvbiBhcyBOelJlc3VsdEljb25UeXBlXSB8fCBpY29uXG4gICAgICAgIDogaWNvblxuICAgICAgOiB0aGlzLmlzRXhjZXB0aW9uXG4gICAgICA/IHVuZGVmaW5lZFxuICAgICAgOiBJY29uTWFwW3RoaXMubnpTdGF0dXMgYXMgTnpSZXN1bHRJY29uVHlwZV07XG4gIH1cbn1cbiJdfQ==