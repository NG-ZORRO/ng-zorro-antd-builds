import { __decorate } from "tslib";
import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output, ViewChild, ViewEncapsulation } from '@angular/core';
import { WithConfig } from 'ng-zorro-antd/core/config';
import { InputNumber } from 'ng-zorro-antd/core/util';
import * as i0 from "@angular/core";
import * as i1 from "ng-zorro-antd/core/config";
import * as i2 from "@angular/cdk/platform";
import * as i3 from "@angular/common";
import * as i4 from "ng-zorro-antd/icon";
const NZ_CONFIG_MODULE_NAME = 'avatar';
export class NzAvatarComponent {
    constructor(nzConfigService, elementRef, cdr, platform) {
        this.nzConfigService = nzConfigService;
        this.elementRef = elementRef;
        this.cdr = cdr;
        this.platform = platform;
        this._nzModuleName = NZ_CONFIG_MODULE_NAME;
        this.nzShape = 'circle';
        this.nzSize = 'default';
        this.nzGap = 4;
        this.nzError = new EventEmitter();
        this.hasText = false;
        this.hasSrc = true;
        this.hasIcon = false;
        this.textStyles = {};
        this.classMap = {};
        this.customSize = null;
        this.el = this.elementRef.nativeElement;
    }
    imgError($event) {
        this.nzError.emit($event);
        if (!$event.defaultPrevented) {
            this.hasSrc = false;
            this.hasIcon = false;
            this.hasText = false;
            if (this.nzIcon) {
                this.hasIcon = true;
            }
            else if (this.nzText) {
                this.hasText = true;
            }
            this.cdr.detectChanges();
            this.setSizeStyle();
            this.notifyCalc();
        }
    }
    ngOnChanges() {
        this.hasText = !this.nzSrc && !!this.nzText;
        this.hasIcon = !this.nzSrc && !!this.nzIcon;
        this.hasSrc = !!this.nzSrc;
        this.setSizeStyle();
        this.notifyCalc();
    }
    calcStringSize() {
        if (!this.hasText) {
            return;
        }
        const childrenWidth = this.textEl.nativeElement.offsetWidth;
        const avatarWidth = this.el.getBoundingClientRect().width;
        const offset = this.nzGap * 2 < avatarWidth ? this.nzGap * 2 : 8;
        const scale = avatarWidth - offset < childrenWidth ? (avatarWidth - offset) / childrenWidth : 1;
        this.textStyles = {
            transform: `scale(${scale}) translateX(-50%)`
        };
        if (this.customSize) {
            Object.assign(this.textStyles, {
                lineHeight: this.customSize
            });
        }
        this.cdr.detectChanges();
    }
    notifyCalc() {
        // If use ngAfterViewChecked, always demands more computations, so......
        if (this.platform.isBrowser) {
            setTimeout(() => {
                this.calcStringSize();
            });
        }
    }
    setSizeStyle() {
        if (typeof this.nzSize === 'number') {
            this.customSize = `${this.nzSize}px`;
        }
        else {
            this.customSize = null;
        }
        this.cdr.markForCheck();
    }
}
NzAvatarComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.1.2", ngImport: i0, type: NzAvatarComponent, deps: [{ token: i1.NzConfigService }, { token: i0.ElementRef }, { token: i0.ChangeDetectorRef }, { token: i2.Platform }], target: i0.ɵɵFactoryTarget.Component });
NzAvatarComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "13.1.2", type: NzAvatarComponent, selector: "nz-avatar", inputs: { nzShape: "nzShape", nzSize: "nzSize", nzGap: "nzGap", nzText: "nzText", nzSrc: "nzSrc", nzSrcSet: "nzSrcSet", nzAlt: "nzAlt", nzIcon: "nzIcon" }, outputs: { nzError: "nzError" }, host: { properties: { "class.ant-avatar-lg": "nzSize === 'large'", "class.ant-avatar-sm": "nzSize === 'small'", "class.ant-avatar-square": "nzShape === 'square'", "class.ant-avatar-circle": "nzShape === 'circle'", "class.ant-avatar-icon": "nzIcon", "class.ant-avatar-image": "hasSrc ", "style.width": "customSize", "style.height": "customSize", "style.line-height": "customSize", "style.font-size.px": "(hasIcon && customSize) ? $any(nzSize) / 2 : null" }, classAttribute: "ant-avatar" }, viewQueries: [{ propertyName: "textEl", first: true, predicate: ["textEl"], descendants: true }], exportAs: ["nzAvatar"], usesOnChanges: true, ngImport: i0, template: `
    <i nz-icon *ngIf="nzIcon && hasIcon" [nzType]="nzIcon"></i>
    <img *ngIf="nzSrc && hasSrc" [src]="nzSrc" [attr.srcset]="nzSrcSet" [attr.alt]="nzAlt" (error)="imgError($event)" />
    <span class="ant-avatar-string" #textEl [ngStyle]="textStyles" *ngIf="nzText && hasText">{{ nzText }}</span>
  `, isInline: true, directives: [{ type: i3.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { type: i4.NzIconDirective, selector: "[nz-icon]", inputs: ["nzSpin", "nzRotate", "nzType", "nzTheme", "nzTwotoneColor", "nzIconfont"], exportAs: ["nzIcon"] }, { type: i3.NgStyle, selector: "[ngStyle]", inputs: ["ngStyle"] }], changeDetection: i0.ChangeDetectionStrategy.OnPush, encapsulation: i0.ViewEncapsulation.None });
__decorate([
    WithConfig()
], NzAvatarComponent.prototype, "nzShape", void 0);
__decorate([
    WithConfig()
], NzAvatarComponent.prototype, "nzSize", void 0);
__decorate([
    WithConfig(),
    InputNumber()
], NzAvatarComponent.prototype, "nzGap", void 0);
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.1.2", ngImport: i0, type: NzAvatarComponent, decorators: [{
            type: Component,
            args: [{
                    selector: 'nz-avatar',
                    exportAs: 'nzAvatar',
                    template: `
    <i nz-icon *ngIf="nzIcon && hasIcon" [nzType]="nzIcon"></i>
    <img *ngIf="nzSrc && hasSrc" [src]="nzSrc" [attr.srcset]="nzSrcSet" [attr.alt]="nzAlt" (error)="imgError($event)" />
    <span class="ant-avatar-string" #textEl [ngStyle]="textStyles" *ngIf="nzText && hasText">{{ nzText }}</span>
  `,
                    host: {
                        class: 'ant-avatar',
                        '[class.ant-avatar-lg]': `nzSize === 'large'`,
                        '[class.ant-avatar-sm]': `nzSize === 'small'`,
                        '[class.ant-avatar-square]': `nzShape === 'square'`,
                        '[class.ant-avatar-circle]': `nzShape === 'circle'`,
                        '[class.ant-avatar-icon]': `nzIcon`,
                        '[class.ant-avatar-image]': `hasSrc `,
                        '[style.width]': 'customSize',
                        '[style.height]': 'customSize',
                        '[style.line-height]': 'customSize',
                        // nzSize type is number when customSize is true
                        '[style.font-size.px]': '(hasIcon && customSize) ? $any(nzSize) / 2 : null'
                    },
                    preserveWhitespaces: false,
                    changeDetection: ChangeDetectionStrategy.OnPush,
                    encapsulation: ViewEncapsulation.None
                }]
        }], ctorParameters: function () { return [{ type: i1.NzConfigService }, { type: i0.ElementRef }, { type: i0.ChangeDetectorRef }, { type: i2.Platform }]; }, propDecorators: { nzShape: [{
                type: Input
            }], nzSize: [{
                type: Input
            }], nzGap: [{
                type: Input
            }], nzText: [{
                type: Input
            }], nzSrc: [{
                type: Input
            }], nzSrcSet: [{
                type: Input
            }], nzAlt: [{
                type: Input
            }], nzIcon: [{
                type: Input
            }], nzError: [{
                type: Output
            }], textEl: [{
                type: ViewChild,
                args: ['textEl', { static: false }]
            }] } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXZhdGFyLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL2NvbXBvbmVudHMvYXZhdGFyL2F2YXRhci5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQU1BLE9BQU8sRUFDTCx1QkFBdUIsRUFFdkIsU0FBUyxFQUVULFlBQVksRUFDWixLQUFLLEVBRUwsTUFBTSxFQUNOLFNBQVMsRUFDVCxpQkFBaUIsRUFDbEIsTUFBTSxlQUFlLENBQUM7QUFFdkIsT0FBTyxFQUFnQyxVQUFVLEVBQUUsTUFBTSwyQkFBMkIsQ0FBQztBQVFyRixPQUFPLEVBQUUsV0FBVyxFQUFFLE1BQU0seUJBQXlCLENBQUM7Ozs7OztBQUV0RCxNQUFNLHFCQUFxQixHQUFnQixRQUFRLENBQUM7QUE0QnBELE1BQU0sT0FBTyxpQkFBaUI7SUF5QjVCLFlBQ1MsZUFBZ0MsRUFDL0IsVUFBc0IsRUFDdEIsR0FBc0IsRUFDdEIsUUFBa0I7UUFIbkIsb0JBQWUsR0FBZixlQUFlLENBQWlCO1FBQy9CLGVBQVUsR0FBVixVQUFVLENBQVk7UUFDdEIsUUFBRyxHQUFILEdBQUcsQ0FBbUI7UUFDdEIsYUFBUSxHQUFSLFFBQVEsQ0FBVTtRQTFCbkIsa0JBQWEsR0FBZ0IscUJBQXFCLENBQUM7UUFDckMsWUFBTyxHQUFrQixRQUFRLENBQUM7UUFDbEMsV0FBTSxHQUEyQixTQUFTLENBQUM7UUFDNUIsVUFBSyxHQUFHLENBQUMsQ0FBQztRQU03QixZQUFPLEdBQUcsSUFBSSxZQUFZLEVBQVMsQ0FBQztRQUV2RCxZQUFPLEdBQVksS0FBSyxDQUFDO1FBQ3pCLFdBQU0sR0FBWSxJQUFJLENBQUM7UUFDdkIsWUFBTyxHQUFZLEtBQUssQ0FBQztRQUN6QixlQUFVLEdBQXFCLEVBQUUsQ0FBQztRQUNsQyxhQUFRLEdBQXFCLEVBQUUsQ0FBQztRQUNoQyxlQUFVLEdBQWtCLElBQUksQ0FBQztRQUl6QixPQUFFLEdBQWdCLElBQUksQ0FBQyxVQUFVLENB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T0FBTztzQkFBekIsTUFBTTtnQkFTaUMsTUFBTTtzQkFBN0MsU0FBUzt1QkFBQyxRQUFRLEVBQUUsRUFBRSxNQUFNLEVBQUUsS0FBSyxFQUFFIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKiBVc2Ugb2YgdGhpcyBzb3VyY2UgY29kZSBpcyBnb3Zlcm5lZCBieSBhbiBNSVQtc3R5bGUgbGljZW5zZSB0aGF0IGNhbiBiZVxuICogZm91bmQgaW4gdGhlIExJQ0VOU0UgZmlsZSBhdCBodHRwczovL2dpdGh1Yi5jb20vTkctWk9SUk8vbmctem9ycm8tYW50ZC9ibG9iL21hc3Rlci9MSUNFTlNFXG4gKi9cblxuaW1wb3J0IHsgUGxhdGZvcm0gfSBmcm9tICdAYW5ndWxhci9jZGsvcGxhdGZvcm0nO1xuaW1wb3J0IHtcbiAgQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3ksXG4gIENoYW5nZURldGVjdG9yUmVmLFxuICBDb21wb25lbnQsXG4gIEVsZW1lbnRSZWYsXG4gIEV2ZW50RW1pdHRlcixcbiAgSW5wdXQsXG4gIE9uQ2hhbmdlcyxcbiAgT3V0cHV0LFxuICBWaWV3Q2hpbGQsXG4gIFZpZXdFbmNhcHN1bGF0aW9uXG59IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuXG5pbXBvcnQgeyBOekNvbmZpZ0tleSwgTnpDb25maWdTZXJ2aWNlLCBXaXRoQ29uZmlnIH0gZnJvbSAnbmctem9ycm8tYW50ZC9jb3JlL2NvbmZpZyc7XG5pbXBvcnQge1xuICBOZ0NsYXNzSW50ZXJmYWNlLFxuICBOZ1N0eWxlSW50ZXJmYWNlLFxuICBOdW1iZXJJbnB1dCxcbiAgTnpTaGFwZVNDVHlwZSxcbiAgTnpTaXplTERTVHlwZVxufSBmcm9tICduZy16b3Jyby1hbnRkL2NvcmUvdHlwZXMnO1xuaW1wb3J0IHsgSW5wdXROdW1iZXIgfSBmcm9tICduZy16b3Jyby1hbnRkL2NvcmUvdXRpbCc7XG5cbmNvbnN0IE5aX0NPTkZJR19NT0RVTEVfTkFNRTogTnpDb25maWdLZXkgPSAnYXZhdGFyJztcblxuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAnbnotYXZhdGFyJyxcbiAgZXhwb3J0QXM6ICduekF2YXRhcicsXG4gIHRlbXBsYXRlOiBgXG4gICAgPGkgbnotaWNvbiAqbmdJZj1cIm56SWNvbiAmJiBoYXNJY29uXCIgW256VHlwZV09XCJuekljb25cIj48L2k+XG4gICAgPGltZyAqbmdJZj1cIm56U3JjICYmIGhhc1NyY1wiIFtzcmNdPVwibnpTcmNcIiBbYXR0ci5zcmNzZXRdPVwibnpTcmNTZXRcIiBbYXR0ci5hbHRdPVwibnpBbHRcIiAoZXJyb3IpPVwiaW1nRXJyb3IoJGV2ZW50KVwiIC8+XG4gICAgPHNwYW4gY2xhc3M9XCJhbnQtYXZhdGFyLXN0cmluZ1wiICN0ZXh0RWwgW25nU3R5bGVdPVwidGV4dFN0eWxlc1wiICpuZ0lmPVwibnpUZXh0ICYmIGhhc1RleHRcIj57eyBuelRleHQgfX08L3NwYW4+XG4gIGAsXG4gIGhvc3Q6IHtcbiAgICBjbGFzczogJ2FudC1hdmF0YXInLFxuICAgICdbY2xhc3MuYW50LWF2YXRhci1sZ10nOiBgbnpTaXplID09PSAnbGFyZ2UnYCxcbiAgICAnW2NsYXNzLmFudC1hdmF0YXItc21dJzogYG56U2l6ZSA9PT0gJ3NtYWxsJ2AsXG4gICAgJ1tjbGFzcy5hbnQtYXZhdGFyLXNxdWFyZV0nOiBgbnpTaGFwZSA9PT0gJ3NxdWFyZSdgLFxuICAgICdbY2xhc3MuYW50LWF2YXRhci1jaXJjbGVdJzogYG56U2hhcGUgPT09ICdjaXJjbGUnYCxcbiAgICAnW2NsYXNzLmFudC1hdmF0YXItaWNvbl0nOiBgbnpJY29uYCxcbiAgICAnW2NsYXNzLmFudC1hdmF0YXItaW1hZ2VdJzogYGhhc1NyYyBgLFxuICAgICdbc3R5bGUud2lkdGhdJzogJ2N1c3RvbVNpemUnLFxuICAgICdbc3R5bGUuaGVpZ2h0XSc6ICdjdXN0b21TaXplJyxcbiAgICAnW3N0eWxlLmxpbmUtaGVpZ2h0XSc6ICdjdXN0b21TaXplJyxcbiAgICAvLyBuelNpemUgdHlwZSBpcyBudW1iZXIgd2hlbiBjdXN0b21TaXplIGlzIHRydWVcbiAgICAnW3N0eWxlLmZvbnQtc2l6ZS5weF0nOiAnKGhhc0ljb24gJiYgY3VzdG9tU2l6ZSkgPyAkYW55KG56U2l6ZSkgLyAyIDogbnVsbCdcbiAgfSxcbiAgcHJlc2VydmVXaGl0ZXNwYWNlczogZmFsc2UsXG4gIGNoYW5nZURldGVjdGlvbjogQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3kuT25QdXNoLFxuICBlbmNhcHN1bGF0aW9uOiBWaWV3RW5jYXBzdWxhdGlvbi5Ob25lXG59KVxuZXhwb3J0IGNsYXNzIE56QXZhdGFyQ29tcG9uZW50IGltcGxlbWVudHMgT25DaGFuZ2VzIHtcbiAgc3RhdGljIG5nQWNjZXB0SW5wdXRUeXBlX256R2FwOiBOdW1iZXJJbnB1dDtcblxuICByZWFkb25seSBfbnpNb2R1bGVOYW1lOiBOekNvbmZpZ0tleSA9IE5aX0NPTkZJR19NT0RVTEVfTkFNRTtcbiAgQElucHV0KCkgQFdpdGhDb25maWcoKSBuelNoYXBlOiBOelNoYXBlU0NUeXBlID0gJ2NpcmNsZSc7XG4gIEBJbnB1dCgpIEBXaXRoQ29uZmlnKCkgbnpTaXplOiBOelNpemVMRFNUeXBlIHwgbnVtYmVyID0gJ2RlZmF1bHQnO1xuICBASW5wdXQoKSBAV2l0aENvbmZpZygpIEBJbnB1dE51bWJlcigpIG56R2FwID0gNDtcbiAgQElucHV0KCkgbnpUZXh0Pzogc3RyaW5nO1xuICBASW5wdXQoKSBuelNyYz86IHN0cmluZztcbiAgQElucHV0KCkgbnpTcmNTZXQ/OiBzdHJpbmc7XG4gIEBJbnB1dCgpIG56QWx0Pzogc3RyaW5nO1xuICBASW5wdXQoKSBuekljb24/OiBzdHJpbmc7XG4gIEBPdXRwdXQoKSByZWFkb25seSBuekVycm9yID0gbmV3IEV2ZW50RW1pdHRlcjxFdmVudD4oKTtcblxuICBoYXNUZXh0OiBib29sZWFuID0gZmFsc2U7XG4gIGhhc1NyYzogYm9vbGVhbiA9IHRydWU7XG4gIGhhc0ljb246IGJvb2xlYW4gPSBmYWxzZTtcbiAgdGV4dFN0eWxlczogTmdTdHlsZUludGVyZmFjZSA9IHt9O1xuICBjbGFzc01hcDogTmdDbGFzc0ludGVyZmFjZSA9IHt9O1xuICBjdXN0b21TaXplOiBzdHJpbmcgfCBudWxsID0gbnVsbDtcblxuICBAVmlld0NoaWxkKCd0ZXh0RWwnLCB7IHN0YXRpYzogZmFsc2UgfSkgdGV4dEVsPzogRWxlbWVudFJlZjtcblxuICBwcml2YXRlIGVsOiBIVE1MRWxlbWVudCA9IHRoaXMuZWxlbWVudFJlZi5uYXRpdmVFbGVtZW50O1xuXG4gIGNvbnN0cnVjdG9yKFxuICAgIHB1YmxpYyBuekNvbmZpZ1NlcnZpY2U6IE56Q29uZmlnU2VydmljZSxcbiAgICBwcml2YXRlIGVsZW1lbnRSZWY6IEVsZW1lbnRSZWYsXG4gICAgcHJpdmF0ZSBjZHI6IENoYW5nZURldGVjdG9yUmVmLFxuICAgIHByaXZhdGUgcGxhdGZvcm06IFBsYXRmb3JtXG4gICkge31cblxuICBpbWdFcnJvcigkZXZlbnQ6IEV2ZW50KTogdm9pZCB7XG4gICAgdGhpcy5uekVycm9yLmVtaXQoJGV2ZW50KTtcbiAgICBpZiAoISRldmVudC5kZWZhdWx0UHJldmVudGVkKSB7XG4gICAgICB0aGlzLmhhc1NyYyA9IGZhbHNlO1xuICAgICAgdGhpcy5oYXNJY29uID0gZmFsc2U7XG4gICAgICB0aGlzLmhhc1RleHQgPSBmYWxzZTtcbiAgICAgIGlmICh0aGlzLm56SWNvbikge1xuICAgICAgICB0aGlzLmhhc0ljb24gPSB0cnVlO1xuICAgICAgfSBlbHNlIGlmICh0aGlzLm56VGV4dCkge1xuICAgICAgICB0aGlzLmhhc1RleHQgPSB0cnVlO1xuICAgICAgfVxuICAgICAgdGhpcy5jZHIuZGV0ZWN0Q2hhbmdlcygpO1xuICAgICAgdGhpcy5zZXRTaXplU3R5bGUoKTtcbiAgICAgIHRoaXMubm90aWZ5Q2FsYygpO1xuICAgIH1cbiAgfVxuXG4gIG5nT25DaGFuZ2VzKCk6IHZvaWQge1xuICAgIHRoaXMuaGFzVGV4dCA9ICF0aGlzLm56U3JjICYmICEhdGhpcy5uelRleHQ7XG4gICAgdGhpcy5oYXNJY29uID0gIXRoaXMubnpTcmMgJiYgISF0aGlzLm56SWNvbjtcbiAgICB0aGlzLmhhc1NyYyA9ICEhdGhpcy5uelNyYztcblxuICAgIHRoaXMuc2V0U2l6ZVN0eWxlKCk7XG4gICAgdGhpcy5ub3RpZnlDYWxjKCk7XG4gIH1cblxuICBwcml2YXRlIGNhbGNTdHJpbmdTaXplKCk6IHZvaWQge1xuICAgIGlmICghdGhpcy5oYXNUZXh0KSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgY29uc3QgY2hpbGRyZW5XaWR0aCA9IHRoaXMudGV4dEVsIS5uYXRpdmVFbGVtZW50Lm9mZnNldFdpZHRoO1xuICAgIGNvbnN0IGF2YXRhcldpZHRoID0gdGhpcy5lbC5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKS53aWR0aDtcbiAgICBjb25zdCBvZmZzZXQgPSB0aGlzLm56R2FwICogMiA8IGF2YXRhcldpZHRoID8gdGhpcy5uekdhcCAqIDIgOiA4O1xuICAgIGNvbnN0IHNjYWxlID0gYXZhdGFyV2lkdGggLSBvZmZzZXQgPCBjaGlsZHJlbldpZHRoID8gKGF2YXRhcldpZHRoIC0gb2Zmc2V0KSAvIGNoaWxkcmVuV2lkdGggOiAxO1xuXG4gICAgdGhpcy50ZXh0U3R5bGVzID0ge1xuICAgICAgdHJhbnNmb3JtOiBgc2NhbGUoJHtzY2FsZX0pIHRyYW5zbGF0ZVgoLTUwJSlgXG4gICAgfTtcbiAgICBpZiAodGhpcy5jdXN0b21TaXplKSB7XG4gICAgICBPYmplY3QuYXNzaWduKHRoaXMudGV4dFN0eWxlcywge1xuICAgICAgICBsaW5lSGVpZ2h0OiB0aGlzLmN1c3RvbVNpemVcbiAgICAgIH0pO1xuICAgIH1cbiAgICB0aGlzLmNkci5kZXRlY3RDaGFuZ2VzKCk7XG4gIH1cblxuICBwcml2YXRlIG5vdGlmeUNhbGMoKTogdm9pZCB7XG4gICAgLy8gSWYgdXNlIG5nQWZ0ZXJWaWV3Q2hlY2tlZCwgYWx3YXlzIGRlbWFuZHMgbW9yZSBjb21wdXRhdGlvbnMsIHNvLi4uLi4uXG4gICAgaWYgKHRoaXMucGxhdGZvcm0uaXNCcm93c2VyKSB7XG4gICAgICBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgICAgdGhpcy5jYWxjU3RyaW5nU2l6ZSgpO1xuICAgICAgfSk7XG4gICAgfVxuICB9XG5cbiAgcHJpdmF0ZSBzZXRTaXplU3R5bGUoKTogdm9pZCB7XG4gICAgaWYgKHR5cGVvZiB0aGlzLm56U2l6ZSA9PT0gJ251bWJlcicpIHtcbiAgICAgIHRoaXMuY3VzdG9tU2l6ZSA9IGAke3RoaXMubnpTaXplfXB4YDtcbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy5jdXN0b21TaXplID0gbnVsbDtcbiAgICB9XG4gICAgdGhpcy5jZHIubWFya0ZvckNoZWNrKCk7XG4gIH1cbn1cbiJdfQ==