import { __decorate } from "tslib";
/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */
import { ChangeDetectionStrategy, Component, Input, ViewChild, ViewEncapsulation } from '@angular/core';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { WithConfig } from 'ng-zorro-antd/core/config';
import { warn } from 'ng-zorro-antd/core/logger';
import { InputBoolean } from 'ng-zorro-antd/core/util';
import { defaultImageSrcLoader } from './image-loader';
import { isFixedSize } from './utils';
import * as i0 from "@angular/core";
import * as i1 from "ng-zorro-antd/core/config";
import * as i2 from "ng-zorro-antd/core/services";
import * as i3 from "ng-zorro-antd/image";
export const NZ_CONFIG_MODULE_NAME = 'imageExperimental';
const sizeBreakpoints = [16, 32, 48, 64, 96, 128, 256, 384, 640, 750, 828, 1080, 1200, 1920, 2048, 3840];
export class NzImageViewComponent {
    constructor(cdr, nzConfigService, imagePreloadService) {
        this.cdr = cdr;
        this.nzConfigService = nzConfigService;
        this.imagePreloadService = imagePreloadService;
        this._nzModuleName = NZ_CONFIG_MODULE_NAME;
        this.nzSrc = '';
        this.nzAlt = '';
        this.nzWidth = 'auto';
        this.nzHeight = 'auto';
        this.nzSrcLoader = defaultImageSrcLoader;
        this.nzAutoSrcset = false;
        this.nzPriority = false;
        this.nzFallback = null;
        this.nzPlaceholder = null;
        this.nzDisablePreview = false;
        this.src = '';
        this.width = 'auto';
        this.height = 'auto';
        this.srcset = '';
        this.destroy$ = new Subject();
        this.reloadDisposeHandler = () => void 0;
        this.nzConfigService
            .getConfigChangeEventForComponent(NZ_CONFIG_MODULE_NAME)
            .pipe(takeUntil(this.destroy$))
            .subscribe(() => {
            this.composeImageAttrs();
            this.cdr.markForCheck();
        });
    }
    ngOnInit() {
        if (this.nzPriority) {
            this.preload();
        }
    }
    ngOnChanges(changes) {
        const { nzLoader, nzSrc, nzOptimize } = changes;
        if (nzSrc || nzLoader || nzOptimize) {
            this.composeImageAttrs();
        }
    }
    ngOnDestroy() {
        this.reloadDisposeHandler();
        this.destroy$.next();
        this.destroy$.complete();
    }
    preload() {
        this.reloadDisposeHandler = this.imagePreloadService.addPreload({
            src: this.src,
            srcset: this.srcset
        });
    }
    optimizable() {
        if (this.nzAutoSrcset) {
            if (!isFixedSize(this.nzWidth) || !isFixedSize(this.nzHeight)) {
                warn(`When using "nzAutoSrcset" you should use a fixed size width and height, for more information please refer to CLS (https://web.dev/cls/) performance metrics`);
                return false;
            }
            if (this.nzSrc.endsWith('.svg')) {
                warn(`SVG does not need to be optimized`);
                return false;
            }
            if (this.nzSrc.startsWith('data:')) {
                warn(`Data URLs cannot be optimized`);
                return false;
            }
            return true;
        }
        return false;
    }
    composeImageAttrs() {
        const loader = this.getLoader();
        if (!this.optimizable()) {
            this.src = loader({ src: this.nzSrc });
            this.width = this.nzWidth;
            this.height = this.nzHeight;
            return;
        }
        this.width = typeof this.nzWidth === 'number' ? this.nzWidth : parseInt(this.nzWidth, 10);
        this.height = typeof this.nzHeight === 'number' ? this.nzHeight : parseInt(this.nzHeight, 10);
        const widths = this.convertWidths(this.width, sizeBreakpoints);
        this.src = loader({ src: this.nzSrc, width: widths[0] });
        this.srcset = widths
            .map((w, i) => `${loader({
            src: this.nzSrc,
            width: w
        })} ${i + 1}x`)
            .join(', ');
    }
    getLoader() {
        return this.nzSrcLoader || defaultImageSrcLoader;
    }
    convertWidths(width, optimizeSizes) {
        const allSizes = [...optimizeSizes].sort((a, b) => a - b);
        return [
            ...new Set(
            // 2x scale is sufficient
            // https://blog.twitter.com/engineering/en_us/topics/infrastructure/2019/capping-image-fidelity-on-ultra-high-resolution-devices.html
            [width, width * 2].map(w => allSizes.find(p => p >= w) || w))
        ];
    }
}
NzImageViewComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.1.2", ngImport: i0, type: NzImageViewComponent, deps: [{ token: i0.ChangeDetectorRef }, { token: i1.NzConfigService }, { token: i2.ImagePreloadService }], target: i0.ɵɵFactoryTarget.Component });
NzImageViewComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "13.1.2", type: NzImageViewComponent, selector: "nz-image", inputs: { nzSrc: "nzSrc", nzAlt: "nzAlt", nzWidth: "nzWidth", nzHeight: "nzHeight", nzSrcLoader: "nzSrcLoader", nzAutoSrcset: "nzAutoSrcset", nzPriority: "nzPriority", nzFallback: "nzFallback", nzPlaceholder: "nzPlaceholder", nzDisablePreview: "nzDisablePreview" }, viewQueries: [{ propertyName: "imageRef", first: true, predicate: ["imageRef"], descendants: true }], exportAs: ["nzImage"], usesOnChanges: true, ngImport: i0, template: `
    <img
      #imageRef
      nz-image
      [nzSrc]="src"
      [nzSrcset]="srcset"
      [nzDisablePreview]="nzDisablePreview"
      [nzFallback]="nzFallback"
      [nzPlaceholder]="nzPlaceholder"
      [attr.width]="width"
      [attr.height]="height"
      [attr.srcset]="srcset"
      [attr.alt]="nzAlt || null"
    />
  `, isInline: true, directives: [{ type: i3.NzImageDirective, selector: "img[nz-image]", inputs: ["nzSrc", "nzSrcset", "nzDisablePreview", "nzFallback", "nzPlaceholder"], exportAs: ["nzImage"] }], changeDetection: i0.ChangeDetectionStrategy.OnPush, encapsulation: i0.ViewEncapsulation.None });
__decorate([
    WithConfig()
], NzImageViewComponent.prototype, "nzSrcLoader", void 0);
__decorate([
    InputBoolean(),
    WithConfig()
], NzImageViewComponent.prototype, "nzAutoSrcset", void 0);
__decorate([
    InputBoolean()
], NzImageViewComponent.prototype, "nzPriority", void 0);
__decorate([
    WithConfig()
], NzImageViewComponent.prototype, "nzFallback", void 0);
__decorate([
    WithConfig()
], NzImageViewComponent.prototype, "nzPlaceholder", void 0);
__decorate([
    InputBoolean(),
    WithConfig()
], NzImageViewComponent.prototype, "nzDisablePreview", void 0);
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.1.2", ngImport: i0, type: NzImageViewComponent, decorators: [{
            type: Component,
            args: [{
                    selector: 'nz-image',
                    exportAs: 'nzImage',
                    template: `
    <img
      #imageRef
      nz-image
      [nzSrc]="src"
      [nzSrcset]="srcset"
      [nzDisablePreview]="nzDisablePreview"
      [nzFallback]="nzFallback"
      [nzPlaceholder]="nzPlaceholder"
      [attr.width]="width"
      [attr.height]="height"
      [attr.srcset]="srcset"
      [attr.alt]="nzAlt || null"
    />
  `,
                    preserveWhitespaces: false,
                    changeDetection: ChangeDetectionStrategy.OnPush,
                    encapsulation: ViewEncapsulation.None
                }]
        }], ctorParameters: function () { return [{ type: i0.ChangeDetectorRef }, { type: i1.NzConfigService }, { type: i2.ImagePreloadService }]; }, propDecorators: { nzSrc: [{
                type: Input
            }], nzAlt: [{
                type: Input
            }], nzWidth: [{
                type: Input
            }], nzHeight: [{
                type: Input
            }], nzSrcLoader: [{
                type: Input
            }], nzAutoSrcset: [{
                type: Input
            }], nzPriority: [{
                type: Input
            }], nzFallback: [{
                type: Input
            }], nzPlaceholder: [{
                type: Input
            }], nzDisablePreview: [{
                type: Input
            }], imageRef: [{
                type: ViewChild,
                args: ['imageRef']
            }] } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW1hZ2UuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vY29tcG9uZW50cy9leHBlcmltZW50YWwvaW1hZ2UvaW1hZ2UuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQTs7O0dBR0c7QUFFSCxPQUFPLEVBQ0wsdUJBQXVCLEVBRXZCLFNBQVMsRUFFVCxLQUFLLEVBS0wsU0FBUyxFQUNULGlCQUFpQixFQUNsQixNQUFNLGVBQWUsQ0FBQztBQUN2QixPQUFPLEVBQUUsT0FBTyxFQUFFLE1BQU0sTUFBTSxDQUFDO0FBQy9CLE9BQU8sRUFBRSxTQUFTLEVBQUUsTUFBTSxnQkFBZ0IsQ0FBQztBQUUzQyxPQUFPLEVBQWdDLFVBQVUsRUFBRSxNQUFNLDJCQUEyQixDQUFDO0FBQ3JGLE9BQU8sRUFBRSxJQUFJLEVBQUUsTUFBTSwyQkFBMkIsQ0FBQztBQUdqRCxPQUFPLEVBQUUsWUFBWSxFQUFFLE1BQU0seUJBQXlCLENBQUM7QUFFdkQsT0FBTyxFQUFFLHFCQUFxQixFQUFFLE1BQU0sZ0JBQWdCLENBQUM7QUFFdkQsT0FBTyxFQUFFLFdBQVcsRUFBRSxNQUFNLFNBQVMsQ0FBQzs7Ozs7QUFFdEMsTUFBTSxDQUFDLE1BQU0scUJBQXFCLEdBQWdCLG1CQUFtQixDQUFDO0FBQ3RFLE1BQU0sZUFBZSxHQUFHLENBQUMsRUFBRSxFQUFFLEVBQUUsRUFBRSxFQUFFLEVBQUUsRUFBRSxFQUFFLEVBQUUsRUFBRSxHQUFHLEVBQUUsR0FBRyxFQUFFLEdBQUcsRUFBRSxHQUFHLEVBQUUsR0FBRyxFQUFFLEdBQUcsRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsSUFBSSxDQUFDLENBQUM7QUF3QnpHLE1BQU0sT0FBTyxvQkFBb0I7SUE0Qi9CLFlBQ1UsR0FBc0IsRUFDdkIsZUFBZ0MsRUFDL0IsbUJBQXdDO1FBRnhDLFFBQUcsR0FBSCxHQUFHLENBQW1CO1FBQ3ZCLG9CQUFl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Ozs7Ozs7O0dBY1Q7b0JBQ0QsbUJBQW1CLEVBQUUsS0FBSztvQkFDMUIsZUFBZSxFQUFFLHVCQUF1QixDQUFDLE1BQU07b0JBQy9DLGFBQWEsRUFBRSxpQkFBaUIsQ0FBQyxJQUFJO2lCQUN0Qzt3S0FPVSxLQUFLO3NCQUFiLEtBQUs7Z0JBQ0csS0FBSztzQkFBYixLQUFLO2dCQUNHLE9BQU87c0JBQWYsS0FBSztnQkFDRyxRQUFRO3NCQUFoQixLQUFLO2dCQUNpQixXQUFXO3NCQUFqQyxLQUFLO2dCQUNpQyxZQUFZO3NCQUFsRCxLQUFLO2dCQUNtQixVQUFVO3NCQUFsQyxLQUFLO2dCQUNpQixVQUFVO3NCQUFoQyxLQUFLO2dCQUNpQixhQUFhO3NCQUFuQyxLQUFLO2dCQUNpQyxnQkFBZ0I7c0JBQXRELEtBQUs7Z0JBQ2lCLFFBQVE7c0JBQTlCLFNBQVM7dUJBQUMsVUFBVSIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxuICogVXNlIG9mIHRoaXMgc291cmNlIGNvZGUgaXMgZ292ZXJuZWQgYnkgYW4gTUlULXN0eWxlIGxpY2Vuc2UgdGhhdCBjYW4gYmVcbiAqIGZvdW5kIGluIHRoZSBMSUNFTlNFIGZpbGUgYXQgaHR0cHM6Ly9naXRodWIuY29tL05HLVpPUlJPL25nLXpvcnJvLWFudGQvYmxvYi9tYXN0ZXIvTElDRU5TRVxuICovXG5cbmltcG9ydCB7XG4gIENoYW5nZURldGVjdGlvblN0cmF0ZWd5LFxuICBDaGFuZ2VEZXRlY3RvclJlZixcbiAgQ29tcG9uZW50LFxuICBFbGVtZW50UmVmLFxuICBJbnB1dCxcbiAgT25DaGFuZ2VzLFxuICBPbkRlc3Ryb3ksXG4gIE9uSW5pdCxcbiAgU2ltcGxlQ2hhbmdlcyxcbiAgVmlld0NoaWxkLFxuICBWaWV3RW5jYXBzdWxhdGlvblxufSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IFN1YmplY3QgfSBmcm9tICdyeGpzJztcbmltcG9ydCB7IHRha2VVbnRpbCB9IGZyb20gJ3J4anMvb3BlcmF0b3JzJztcblxuaW1wb3J0IHsgTnpDb25maWdLZXksIE56Q29uZmlnU2VydmljZSwgV2l0aENvbmZpZyB9IGZyb20gJ25nLXpvcnJvLWFudGQvY29yZS9jb25maWcnO1xuaW1wb3J0IHsgd2FybiB9IGZyb20gJ25nLXpvcnJvLWFudGQvY29yZS9sb2dnZXInO1xuaW1wb3J0IHsgSW1hZ2VQcmVsb2FkU2VydmljZSwgUHJlbG9hZERpc3Bvc2VIYW5kbGUgfSBmcm9tICduZy16b3Jyby1hbnRkL2NvcmUvc2VydmljZXMnO1xuaW1wb3J0IHsgQm9vbGVhbklucHV0IH0gZnJvbSAnbmctem9ycm8tYW50ZC9jb3JlL3R5cGVzJztcbmltcG9ydCB7IElucHV0Qm9vbGVhbiB9IGZyb20gJ25nLXpvcnJvLWFudGQvY29yZS91dGlsJztcblxuaW1wb3J0IHsgZGVmYXVsdEltYWdlU3JjTG9hZGVyIH0gZnJvbSAnLi9pbWFnZS1sb2FkZXInO1xuaW1wb3J0IHsgTnpJbWFnZVNyY0xvYWRlciB9IGZyb20gJy4vdHlwaW5ncyc7XG5pbXBvcnQgeyBpc0ZpeGVkU2l6ZSB9IGZyb20gJy4vdXRpbHMnO1xuXG5leHBvcnQgY29uc3QgTlpfQ09ORklHX01PRFVMRV9OQU1FOiBOekNvbmZpZ0tleSA9ICdpbWFnZUV4cGVyaW1lbnRhbCc7XG5jb25zdCBzaXplQnJlYWtwb2ludHMgPSBbMTYsIDMyLCA0OCwgNjQsIDk2LCAxMjgsIDI1NiwgMzg0LCA2NDAsIDc1MCwgODI4LCAxMDgwLCAxMjAwLCAxOTIwLCAyMDQ4LCAzODQwXTtcblxuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAnbnotaW1hZ2UnLFxuICBleHBvcnRBczogJ256SW1hZ2UnLFxuICB0ZW1wbGF0ZTogYFxuICAgIDxpbWdcbiAgICAgICNpbWFnZVJlZlxuICAgICAgbnotaW1hZ2VcbiAgICAgIFtuelNyY109XCJzcmNcIlxuICAgICAgW256U3Jjc2V0XT1cInNyY3NldFwiXG4gICAgICBbbnpEaXNhYmxlUHJldmlld109XCJuekRpc2FibGVQcmV2aWV3XCJcbiAgICAgIFtuekZhbGxiYWNrXT1cIm56RmFsbGJhY2tcIlxuICAgICAgW256UGxhY2Vob2xkZXJdPVwibnpQbGFjZWhvbGRlclwiXG4gICAgICBbYXR0ci53aWR0aF09XCJ3aWR0aFwiXG4gICAgICBbYXR0ci5oZWlnaHRdPVwiaGVpZ2h0XCJcbiAgICAgIFthdHRyLnNyY3NldF09XCJzcmNzZXRcIlxuICAgICAgW2F0dHIuYWx0XT1cIm56QWx0IHx8IG51bGxcIlxuICAgIC8+XG4gIGAsXG4gIHByZXNlcnZlV2hpdGVzcGFjZXM6IGZhbHNlLFxuICBjaGFuZ2VEZXRlY3Rpb246IENoYW5nZURldGVjdGlvblN0cmF0ZWd5Lk9uUHVzaCxcbiAgZW5jYXBzdWxhdGlvbjogVmlld0VuY2Fwc3VsYXRpb24uTm9uZVxufSlcbmV4cG9ydCBjbGFzcyBOekltYWdlVmlld0NvbXBvbmVudCBpbXBsZW1lbnRzIE9uSW5pdCwgT25DaGFuZ2VzLCBPbkRlc3Ryb3kge1xuICByZWFkb25seSBfbnpNb2R1bGVOYW1lOiBOekNvbmZpZ0tleSA9IE5aX0NPTkZJR19NT0RVTEVfTkFNRTtcbiAgc3RhdGljIG5nQWNjZXB0SW5wdXRUeXBlX256QXV0b1NyY3NldDogQm9vbGVhbklucHV0O1xuICBzdGF0aWMgbmdBY2NlcHRJbnB1dFR5cGVfbnpQcmlvcml0eTogQm9vbGVhbklucHV0O1xuICBzdGF0aWMgbmdBY2NlcHRJbnB1dFR5cGVfbnpEaXNhYmxlUHJldmlldzogQm9vbGVhbklucHV0O1xuXG4gIEBJbnB1dCgpIG56U3JjOiBzdHJpbmcgPSAnJztcbiAgQElucHV0KCkgbnpBbHQ6IHN0cmluZyA9ICcnO1xuICBASW5wdXQoKSBueldpZHRoOiBzdHJpbmcgfCBudW1iZXIgPSAnYXV0byc7XG4gIEBJbnB1dCgpIG56SGVpZ2h0OiBzdHJpbmcgfCBudW1iZXIgPSAnYXV0byc7XG4gIEBJbnB1dCgpIEBXaXRoQ29uZmlnKCkgbnpTcmNMb2FkZXI6IE56SW1hZ2VTcmNMb2FkZXIgPSBkZWZhdWx0SW1hZ2VTcmNMb2FkZXI7XG4gIEBJbnB1dCgpIEBJbnB1dEJvb2xlYW4oKSBAV2l0aENvbmZpZygpIG56QXV0b1NyY3NldDogYm9vbGVhbiA9IGZhbHNlO1xuICBASW5wdXQoKSBASW5wdXRCb29sZWFuKCkgbnpQcmlvcml0eTogYm9vbGVhbiA9IGZhbHNlO1xuICBASW5wdXQoKSBAV2l0aENvbmZpZygpIG56RmFsbGJhY2s6IHN0cmluZyB8IG51bGwgPSBudWxsO1xuICBASW5wdXQoKSBAV2l0aENvbmZpZygpIG56UGxhY2Vob2xkZXI6IHN0cmluZyB8IG51bGwgPSBudWxsO1xuICBASW5wdXQoKSBASW5wdXRCb29sZWFuKCkgQFdpdGhDb25maWcoKSBuekRpc2FibGVQcmV2aWV3OiBib29sZWFuID0gZmFsc2U7XG4gIEBWaWV3Q2hpbGQoJ2ltYWdlUmVmJykgaW1hZ2VSZWYhOiBFbGVtZW50UmVmPEhUTUxJbWFnZUVsZW1lbnQ+O1xuXG4gIHNyYyA9ICcnO1xuXG4gIHdpZHRoOiBzdHJpbmcgfCBudW1iZXIgPSAnYXV0byc7XG4gIGhlaWdodDogc3RyaW5nIHwgbnVtYmVyID0gJ2F1dG8nO1xuICBzcmNzZXQgPSAnJztcbiAgaW50ZXJuYWxJbWFnZSE6IEhUTUxJbWFnZUVsZW1lbnQ7XG5cbiAgcHJpdmF0ZSBkZXN0cm95JCA9IG5ldyBTdWJqZWN0PHZvaWQ+KCk7XG4gIHByaXZhdGUgcmVsb2FkRGlzcG9zZUhhbmRsZXI6IFByZWxvYWREaXNwb3NlSGFuZGxlID0gKCkgPT4gdm9pZCAwO1xuXG4gIGNvbnN0cnVjdG9yKFxuICAgIHByaXZhdGUgY2RyOiBDaGFuZ2VEZXRlY3RvclJlZixcbiAgICBwdWJsaWMgbnpDb25maWdTZXJ2aWNlOiBOekNvbmZpZ1NlcnZpY2UsXG4gICAgcHJpdmF0ZSBpbWFnZVByZWxvYWRTZXJ2aWNlOiBJbWFnZVByZWxvYWRTZXJ2aWNlXG4gICkge1xuICAgIHRoaXMubnpDb25maWdTZXJ2aWNlXG4gICAgICAuZ2V0Q29uZmlnQ2hhbmdlRXZlbnRGb3JDb21wb25lbnQoTlpfQ09ORklHX01PRFVMRV9OQU1FKVxuICAgICAgLnBpcGUodGFrZVVudGlsKHRoaXMuZGVzdHJveSQpKVxuICAgICAgLnN1YnNjcmliZSgoKSA9PiB7XG4gICAgICAgIHRoaXMuY29tcG9zZUltYWdlQXR0cnMoKTtcbiAgICAgICAgdGhpcy5jZHIubWFya0ZvckNoZWNrKCk7XG4gICAgICB9KTtcbiAgfVxuXG4gIG5nT25Jbml0KCk6IHZvaWQge1xuICAgIGlmICh0aGlzLm56UHJpb3JpdHkpIHtcbiAgICAgIHRoaXMucHJlbG9hZCgpO1xuICAgIH1cbiAgfVxuXG4gIG5nT25DaGFuZ2VzKGNoYW5nZXM6IFNpbXBsZUNoYW5nZXMpOiB2b2lkIHtcbiAgICBjb25zdCB7IG56TG9hZGVyLCBuelNyYywgbnpPcHRpbWl6ZSB9ID0gY2hhbmdlcztcblxuICAgIGlmIChuelNyYyB8fCBuekxvYWRlciB8fCBuek9wdGltaXplKSB7XG4gICAgICB0aGlzLmNvbXBvc2VJbWFnZUF0dHJzKCk7XG4gICAgfVxuICB9XG5cbiAgbmdPbkRlc3Ryb3koKTogdm9pZCB7XG4gICAgdGhpcy5yZWxvYWREaXNwb3NlSGFuZGxlcigpO1xuICAgIHRoaXMuZGVzdHJveSQubmV4dCgpO1xuICAgIHRoaXMuZGVzdHJveSQuY29tcGxldGUoKTtcbiAgfVxuXG4gIHByaXZhdGUgcHJlbG9hZCgpOiB2b2lkIHtcbiAgICB0aGlzLnJlbG9hZERpc3Bvc2VIYW5kbGVyID0gdGhpcy5pbWFnZVByZWxvYWRTZXJ2aWNlLmFkZFByZWxvYWQoe1xuICAgICAgc3JjOiB0aGlzLnNyYyxcbiAgICAgIHNyY3NldDogdGhpcy5zcmNzZXRcbiAgICB9KTtcbiAgfVxuXG4gIHByaXZhdGUgb3B0aW1pemFibGUoKTogYm9vbGVhbiB7XG4gICAgaWYgKHRoaXMubnpBdXRvU3Jjc2V0KSB7XG4gICAgICBpZiAoIWlzRml4ZWRTaXplKHRoaXMubnpXaWR0aCkgfHwgIWlzRml4ZWRTaXplKHRoaXMubnpIZWlnaHQpKSB7XG4gICAgICAgIHdhcm4oXG4gICAgICAgICAgYFdoZW4gdXNpbmcgXCJuekF1dG9TcmNzZXRcIiB5b3Ugc2hvdWxkIHVzZSBhIGZpeGVkIHNpemUgd2lkdGggYW5kIGhlaWdodCwgZm9yIG1vcmUgaW5mb3JtYXRpb24gcGxlYXNlIHJlZmVyIHRvIENMUyAoaHR0cHM6Ly93ZWIuZGV2L2Nscy8pIHBlcmZvcm1hbmNlIG1ldHJpY3NgXG4gICAgICAgICk7XG4gICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgIH1cbiAgICAgIGlmICh0aGlzLm56U3JjLmVuZHNXaXRoKCcuc3ZnJykpIHtcbiAgICAgICAgd2FybihgU1ZHIGRvZXMgbm90IG5lZWQgdG8gYmUgb3B0aW1pemVkYCk7XG4gICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgIH1cbiAgICAgIGlmICh0aGlzLm56U3JjLnN0YXJ0c1dpdGgoJ2RhdGE6JykpIHtcbiAgICAgICAgd2FybihgRGF0YSBVUkxzIGNhbm5vdCBiZSBvcHRpbWl6ZWRgKTtcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgfVxuICAgICAgcmV0dXJuIHRydWU7XG4gICAgfVxuICAgIHJldHVybiBmYWxzZTtcbiAgfVxuXG4gIHByaXZhdGUgY29tcG9zZUltYWdlQXR0cnMoKTogdm9pZCB7XG4gICAgY29uc3QgbG9hZGVyID0gdGhpcy5nZXRMb2FkZXIoKTtcbiAgICBpZiAoIXRoaXMub3B0aW1pemFibGUoKSkge1xuICAgICAgdGhpcy5zcmMgPSBsb2FkZXIoeyBzcmM6IHRoaXMubnpTcmMgfSk7XG4gICAgICB0aGlzLndpZHRoID0gdGhpcy5ueldpZHRoO1xuICAgICAgdGhpcy5oZWlnaHQgPSB0aGlzLm56SGVpZ2h0O1xuICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICB0aGlzLndpZHRoID0gdHlwZW9mIHRoaXMubnpXaWR0aCA9PT0gJ251bWJlcicgPyB0aGlzLm56V2lkdGggOiBwYXJzZUludCh0aGlzLm56V2lkdGgsIDEwKTtcbiAgICB0aGlzLmhlaWdodCA9IHR5cGVvZiB0aGlzLm56SGVpZ2h0ID09PSAnbnVtYmVyJyA/IHRoaXMubnpIZWlnaHQgOiBwYXJzZUludCh0aGlzLm56SGVpZ2h0LCAxMCk7XG4gICAgY29uc3Qgd2lkdGhzID0gdGhpcy5jb252ZXJ0V2lkdGhzKHRoaXMud2lkdGgsIHNpemVCcmVha3BvaW50cyk7XG4gICAgdGhpcy5zcmMgPSBsb2FkZXIoeyBzcmM6IHRoaXMubnpTcmMsIHdpZHRoOiB3aWR0aHNbMF0gfSk7XG4gICAgdGhpcy5zcmNzZXQgPSB3aWR0aHNcbiAgICAgIC5tYXAoXG4gICAgICAgICh3LCBpKSA9PlxuICAgICAgICAgIGAke2xvYWRlcih7XG4gICAgICAgICAgICBzcmM6IHRoaXMubnpTcmMsXG4gICAgICAgICAgICB3aWR0aDogd1xuICAgICAgICAgIH0pfSAke2kgKyAxfXhgXG4gICAgICApXG4gICAgICAuam9pbignLCAnKTtcbiAgfVxuXG4gIHByaXZhdGUgZ2V0TG9hZGVyKCk6IE56SW1hZ2VTcmNMb2FkZXIge1xuICAgIHJldHVybiB0aGlzLm56U3JjTG9hZGVyIHx8IGRlZmF1bHRJbWFnZVNyY0xvYWRlcjtcbiAgfVxuXG4gIHByaXZhdGUgY29udmVydFdpZHRocyh3aWR0aDogbnVtYmVyLCBvcHRpbWl6ZVNpemVzOiBudW1iZXJbXSk6IG51bWJlcltdIHtcbiAgICBjb25zdCBhbGxTaXplcyA9IFsuLi5vcHRpbWl6ZVNpemVzXS5zb3J0KChhLCBiKSA9PiBhIC0gYik7XG4gICAgcmV0dXJuIFtcbiAgICAgIC4uLm5ldyBTZXQoXG4gICAgICAgIC8vIDJ4IHNjYWxlIGlzIHN1ZmZpY2llbnRcbiAgICAgICAgLy8gaHR0cHM6Ly9ibG9nLnR3aXR0ZXIuY29tL2VuZ2luZWVyaW5nL2VuX3VzL3RvcGljcy9pbmZyYXN0cnVjdHVyZS8yMDE5L2NhcHBpbmctaW1hZ2UtZmlkZWxpdHktb24tdWx0cmEtaGlnaC1yZXNvbHV0aW9uLWRldmljZXMuaHRtbFxuICAgICAgICBbd2lkdGgsIHdpZHRoICogMl0ubWFwKHcgPT4gYWxsU2l6ZXMuZmluZChwID0+IHAgPj0gdykgfHwgdylcbiAgICAgIClcbiAgICBdO1xuICB9XG59XG4iXX0=