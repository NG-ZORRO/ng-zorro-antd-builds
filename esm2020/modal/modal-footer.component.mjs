/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */
import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { isPromise } from 'ng-zorro-antd/core/util';
import * as i0 from "@angular/core";
import * as i1 from "ng-zorro-antd/i18n";
import * as i2 from "./modal-types";
import * as i3 from "ng-zorro-antd/button";
import * as i4 from "@angular/common";
import * as i5 from "ng-zorro-antd/core/outlet";
import * as i6 from "ng-zorro-antd/core/wave";
import * as i7 from "ng-zorro-antd/core/transition-patch";
export class NzModalFooterComponent {
    constructor(i18n, config) {
        this.i18n = i18n;
        this.config = config;
        this.buttonsFooter = false;
        this.buttons = [];
        this.cancelTriggered = new EventEmitter();
        this.okTriggered = new EventEmitter();
        this.destroy$ = new Subject();
        if (Array.isArray(config.nzFooter)) {
            this.buttonsFooter = true;
            this.buttons = config.nzFooter.map(mergeDefaultOption);
        }
        this.i18n.localeChange.pipe(takeUntil(this.destroy$)).subscribe(() => {
            this.locale = this.i18n.getLocaleData('Modal');
        });
    }
    onCancel() {
        this.cancelTriggered.emit();
    }
    onOk() {
        this.okTriggered.emit();
    }
    /**
     * Returns the value of the specified key.
     * If it is a function, run and return the return value of the function.
     */
    getButtonCallableProp(options, prop) {
        const value = options[prop];
        const componentInstance = this.modalRef.getContentComponent();
        return typeof value === 'function' ? value.apply(options, componentInstance && [componentInstance]) : value;
    }
    /**
     * Run function based on the type and set its `loading` prop if needed.
     */
    onButtonClick(options) {
        const loading = this.getButtonCallableProp(options, 'loading');
        if (!loading) {
            const result = this.getButtonCallableProp(options, 'onClick');
            if (options.autoLoading && isPromise(result)) {
                options.loading = true;
                result
                    .then(() => (options.loading = false))
                    .catch(e => {
                    options.loading = false;
                    throw e;
                });
            }
        }
    }
    ngOnDestroy() {
        this.destroy$.next();
        this.destroy$.complete();
    }
}
NzModalFooterComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.1.2", ngImport: i0, type: NzModalFooterComponent, deps: [{ token: i1.NzI18nService }, { token: i2.ModalOptions }], target: i0.ɵɵFactoryTarget.Component });
NzModalFooterComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "13.1.2", type: NzModalFooterComponent, selector: "div[nz-modal-footer]", inputs: { modalRef: "modalRef" }, outputs: { cancelTriggered: "cancelTriggered", okTriggered: "okTriggered" }, host: { classAttribute: "ant-modal-footer" }, exportAs: ["NzModalFooterBuiltin"], ngImport: i0, template: `
    <ng-container *ngIf="config.nzFooter; else defaultFooterButtons">
      <ng-container
        *nzStringTemplateOutlet="config.nzFooter; context: { $implicit: config.nzComponentParams, modalRef: modalRef }"
      >
        <div *ngIf="!buttonsFooter" [innerHTML]="config.nzFooter"></div>
        <ng-container *ngIf="buttonsFooter">
          <button
            *ngFor="let button of buttons"
            nz-button
            (click)="onButtonClick(button)"
            [hidden]="!getButtonCallableProp(button, 'show')"
            [nzLoading]="getButtonCallableProp(button, 'loading')"
            [disabled]="getButtonCallableProp(button, 'disabled')"
            [nzType]="button.type!"
            [nzDanger]="button.danger"
            [nzShape]="button.shape!"
            [nzSize]="button.size!"
            [nzGhost]="button.ghost!"
          >
            {{ button.label }}
          </button>
        </ng-container>
      </ng-container>
    </ng-container>
    <ng-template #defaultFooterButtons>
      <button
        *ngIf="config.nzCancelText !== null"
        [attr.cdkFocusInitial]="config.nzAutofocus === 'cancel' || null"
        nz-button
        (click)="onCancel()"
        [nzLoading]="!!config.nzCancelLoading"
        [disabled]="config.nzCancelDisabled"
      >
        {{ config.nzCancelText || locale.cancelText }}
      </button>
      <button
        *ngIf="config.nzOkText !== null"
        [attr.cdkFocusInitial]="config.nzAutofocus === 'ok' || null"
        nz-button
        [nzType]="config.nzOkType!"
        [nzDanger]="config.nzOkDanger"
        (click)="onOk()"
        [nzLoading]="!!config.nzOkLoading"
        [disabled]="config.nzOkDisabled"
      >
        {{ config.nzOkText || locale.okText }}
      </button>
    </ng-template>
  `, isInline: true, components: [{ type: i3.NzButtonComponent, selector: "button[nz-button], a[nz-button]", inputs: ["nzBlock", "nzGhost", "nzSearch", "nzLoading", "nzDanger", "disabled", "tabIndex", "nzType", "nzShape", "nzSize"], exportAs: ["nzButton"] }], directives: [{ type: i4.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { type: i5.NzStringTemplateOutletDirective, selector: "[nzStringTemplateOutlet]", inputs: ["nzStringTemplateOutletContext", "nzStringTemplateOutlet"], exportAs: ["nzStringTemplateOutlet"] }, { type: i4.NgForOf, selector: "[ngFor][ngForOf]", inputs: ["ngForOf", "ngForTrackBy", "ngForTemplate"] }, { type: i6.NzWaveDirective, selector: "[nz-wave],button[nz-button]:not([nzType=\"link\"]):not([nzType=\"text\"])", inputs: ["nzWaveExtraNode"], exportAs: ["nzWave"] }, { type: i7.ɵNzTransitionPatchDirective, selector: "[nz-button], nz-button-group, [nz-icon], [nz-menu-item], [nz-submenu], nz-select-top-control, nz-select-placeholder, nz-input-group", inputs: ["hidden"] }], changeDetection: i0.ChangeDetectionStrategy.Default });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.1.2", ngImport: i0, type: NzModalFooterComponent, decorators: [{
            type: Component,
            args: [{
                    selector: 'div[nz-modal-footer]',
                    exportAs: 'NzModalFooterBuiltin',
                    template: `
    <ng-container *ngIf="config.nzFooter; else defaultFooterButtons">
      <ng-container
        *nzStringTemplateOutlet="config.nzFooter; context: { $implicit: config.nzComponentParams, modalRef: modalRef }"
      >
        <div *ngIf="!buttonsFooter" [innerHTML]="config.nzFooter"></div>
        <ng-container *ngIf="buttonsFooter">
          <button
            *ngFor="let button of buttons"
            nz-button
            (click)="onButtonClick(button)"
            [hidden]="!getButtonCallableProp(button, 'show')"
            [nzLoading]="getButtonCallableProp(button, 'loading')"
            [disabled]="getButtonCallableProp(button, 'disabled')"
            [nzType]="button.type!"
            [nzDanger]="button.danger"
            [nzShape]="button.shape!"
            [nzSize]="button.size!"
            [nzGhost]="button.ghost!"
          >
            {{ button.label }}
          </button>
        </ng-container>
      </ng-container>
    </ng-container>
    <ng-template #defaultFooterButtons>
      <button
        *ngIf="config.nzCancelText !== null"
        [attr.cdkFocusInitial]="config.nzAutofocus === 'cancel' || null"
        nz-button
        (click)="onCancel()"
        [nzLoading]="!!config.nzCancelLoading"
        [disabled]="config.nzCancelDisabled"
      >
        {{ config.nzCancelText || locale.cancelText }}
      </button>
      <button
        *ngIf="config.nzOkText !== null"
        [attr.cdkFocusInitial]="config.nzAutofocus === 'ok' || null"
        nz-button
        [nzType]="config.nzOkType!"
        [nzDanger]="config.nzOkDanger"
        (click)="onOk()"
        [nzLoading]="!!config.nzOkLoading"
        [disabled]="config.nzOkDisabled"
      >
        {{ config.nzOkText || locale.okText }}
      </button>
    </ng-template>
  `,
                    host: {
                        class: 'ant-modal-footer'
                    },
                    changeDetection: ChangeDetectionStrategy.Default
                }]
        }], ctorParameters: function () { return [{ type: i1.NzI18nService }, { type: i2.ModalOptions }]; }, propDecorators: { cancelTriggered: [{
                type: Output
            }], okTriggered: [{
                type: Output
            }], modalRef: [{
                type: Input
            }] } });
function mergeDefaultOption(options) {
    return {
        type: null,
        size: 'default',
        autoLoading: true,
        show: true,
        loading: false,
        disabled: false,
        ...options
    };
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kYWwtZm9vdGVyLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL2NvbXBvbmVudHMvbW9kYWwvbW9kYWwtZm9vdGVyLmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7O0dBR0c7QUFFSCxPQUFPLEVBQUUsdUJBQXVCLEVBQUUsU0FBUyxFQUFFLFlBQVksRUFBRSxLQUFLLEVBQWEsTUFBTSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQzNHLE9BQU8sRUFBRSxPQUFPLEVBQUUsTUFBTSxNQUFNLENBQUM7QUFDL0IsT0FBTyxFQUFFLFNBQVMsRUFBRSxNQUFNLGdCQUFnQixDQUFDO0FBRTNDLE9BQU8sRUFBRSxTQUFTLEVBQUUsTUFBTSx5QkFBeUIsQ0FBQzs7Ozs7Ozs7O0FBZ0VwRCxNQUFNLE9BQU8sc0JBQXNCO0lBU2pDLFlBQW9CLElBQW1CLEVBQVMsTUFBb0I7UUFBaEQsU0FBSSxHQUFKLElBQUksQ0FBZTtRQUFTLFdBQU0sR0FBTixNQUFNLENBQWM7UUFScEUsa0JBQWEsR0FBRyxLQUFLLENBQUM7UUFDdEIsWUFBTyxHQUF5QixFQUFFLENBQUM7UUFFaEIsb0JBQWUsR0FBRyxJQUFJLFlBQVksRUFBUSxDQUFDO1FBQzNDLGdCQUFXLEdBQUcsSUFBSSxZQUFZLEVBQVEsQ0FBQztRQUVsRCxhQUFRLEdBQUcsSUFBSSxPQUFPLEVBQVEsQ0FBQztRQUdyQyxJQUFJLEtBQUssQ0FBQyxPQUFPLENBQUMsTUFBTSxDQUFDLFFBQVEsQ0FBQyxFQUFFO1lBQ2xDLElBQUksQ0FBQyxhQUFhLEdBQUcsSUFBSSxDQUFDO1lBQzFCLElBQUksQ0FBQyxPQUFPLEdBQUksTUFBTSxDQUFDLFFBQWlDLENBQUMsR0FBRyxDQUFDLGtCQUFrQixDQUFDLENBQUM7U0FDbEY7UUFDRCxJQUFJLENBQUMsSUFBSSxDQUFDLFlBQVksQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDLFNBQVMsQ0FBQyxHQUFHLEVBQUU7WUFDbkUsSUFBSSxDQUFDLE1BQU0sR0FBRyxJQUFJLENBQUMsSUFBSSxDQUFDLGFBQWEsQ0FBQyxPQUFPLENBQUMsQ0FBQztRQUNqRCxDQUFDLENBQUMsQ0FBQztJQUNMLENBQUM7SUFFRCxRQUFRO1FBQ04sSUFBSSxDQUFDLGVBQWUsQ0FBQyxJQUFJLEVBQUUsQ0FBQztJQUM5QixDQUFDO0lBRUQsSUFBSTtRQUNGLElBQUksQ0FBQyxXQUFXLENBQUMsSUFBSSxFQUFFLENBQUM7SUFDMUIsQ0FBQztJQUVEOzs7T0FHRztJQUNILHFCQUFxQixDQUFDLE9BQTJCLEVBQUUsSUFBOEI7UUFDL0UsTUFBTSxLQUFLLEdBQUcsT0FBTyxDQUFDLElBQUksQ0FBQyxDQUFDO1FBQzVCLE1BQU0saUJBQWlCLEdBQUcsSUFBSSxDQUFDLFFBQVEsQ0FBQyxtQkFBbUIsRUFBRSxDQUFDO1FBQzlELE9BQU8sT0FBTyxLQUFLLEtBQUssVUFBVSxDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUMsS0FBSyxDQUFDLE9BQU8sRUFBRSxpQkFBaUIsSUFBSSxDQUFDLGlCQUFpQixDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDO0lBQzlHLENBQUM7SUFFRDs7T0FFRztJQUNILGFBQWEsQ0FBQyxPQUEyQjtRQUN2QyxNQUFNLE9BQU8sR0FBRyxJQUFJLENBQUMscUJBQXFCLENBQUMsT0FBTyxFQUFFLFNBQVMsQ0FBQyxDQUFDO1FBQy9ELElBQUksQ0FBQyxPQUFPLEVBQUU7WUFDWixNQUFNLE1BQU0sR0FBRyxJQUFJLENBQUMscUJBQXFCLENBQUMsT0FBTyxFQUFFLFNBQVMsQ0FBQyxDQUFDO1lBQzlELElBQUksT0FBTyxDQUFDLFdBQVcsSUFBSSxTQUFTLENBQUMsTUFBTSxDQUFDLEVBQUU7Z0JBQzVDLE9BQU8sQ0FBQyxPQUFPLEdBQUcsSUFBSSxDQUFDO2dCQUN2QixNQUFNO3FCQUNILElBQUksQ0FBQyxHQUFHLEVBQUUsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxPQUFPLEdBQUcsS0FBSyxDQUFDLENBQUM7cUJBQ3JDLEtBQUssQ0FBQyxDQUFDLENBQUMsRUFBRTtvQkFDVCxPQUFPLENBQUMsT0FBTyxHQUFHLEtBQUssQ0FBQztvQkFDeEIsTUFBTSxDQUFDLENBQUM7Z0JBQ1YsQ0FBQyxDQUFDLENBQUM7YUFDTjtTQUNGO0lBQ0gsQ0FBQztJQUVELFdBQVc7UUFDVCxJQUFJLENBQUMsUUFBUSxDQUFDLElBQUksRUFBRSxDQUFDO1FBQ3JCLElBQUksQ0FBQyxRQUFRLENBQUMsUUFBUSxFQUFFLENBQUM7SUFDM0IsQ0FBQzs7bUhBM0RVLHNCQUFzQjt1R0FBdEIsc0JBQXNCLDZQQXZEdkI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7R0FpRFQ7MkZBTVUsc0JBQXNCO2tCQTFEbEMsU0FBUzttQkFBQztvQkFDVCxRQUFRLEVBQUUsc0JBQXNCO29CQUNoQyxRQUFRLEVBQUUsc0JBQXNCO29CQUNoQyxRQUFRLEVBQUU7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7R0FpRFQ7b0JBQ0QsSUFBSSxFQUFFO3dCQUNKLEtBQUssRUFBRSxrQkFBa0I7cUJBQzFCO29CQUNELGVBQWUsRUFBRSx1QkFBdUIsQ0FBQyxPQUFPO2lCQUNqRDsrSEFLb0IsZUFBZTtzQkFBakMsTUFBTTtnQkFDWSxXQUFXO3NCQUE3QixNQUFNO2dCQUNFLFFBQVE7c0JBQWhCLEtBQUs7O0FBd0RSLFNBQVMsa0JBQWtCLENBQUMsT0FBMkI7SUFDckQsT0FBTztRQUNMLElBQUksRUFBRSxJQUFJO1FBQ1YsSUFBSSxFQUFFLFNBQVM7UUFDZixXQUFXLEVBQUUsSUFBSTtRQUNqQixJQUFJLEVBQUUsSUFBSTtRQUNWLE9BQU8sRUFBRSxLQUFLO1FBQ2QsUUFBUSxFQUFFLEtBQUs7UUFDZixHQUFHLE9BQU87S0FDWCxDQUFDO0FBQ0osQ0FBQyIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxuICogVXNlIG9mIHRoaXMgc291cmNlIGNvZGUgaXMgZ292ZXJuZWQgYnkgYW4gTUlULXN0eWxlIGxpY2Vuc2UgdGhhdCBjYW4gYmVcbiAqIGZvdW5kIGluIHRoZSBMSUNFTlNFIGZpbGUgYXQgaHR0cHM6Ly9naXRodWIuY29tL05HLVpPUlJPL25nLXpvcnJvLWFudGQvYmxvYi9tYXN0ZXIvTElDRU5TRVxuICovXG5cbmltcG9ydCB7IENoYW5nZURldGVjdGlvblN0cmF0ZWd5LCBDb21wb25lbnQsIEV2ZW50RW1pdHRlciwgSW5wdXQsIE9uRGVzdHJveSwgT3V0cHV0IH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBTdWJqZWN0IH0gZnJvbSAncnhqcyc7XG5pbXBvcnQgeyB0YWtlVW50aWwgfSBmcm9tICdyeGpzL29wZXJhdG9ycyc7XG5cbmltcG9ydCB7IGlzUHJvbWlzZSB9IGZyb20gJ25nLXpvcnJvLWFudGQvY29yZS91dGlsJztcbmltcG9ydCB7IE56STE4blNlcnZpY2UsIE56TW9kYWxJMThuSW50ZXJmYWNlIH0gZnJvbSAnbmctem9ycm8tYW50ZC9pMThuJztcblxuaW1wb3J0IHsgTnpNb2RhbFJlZiB9IGZyb20gJy4vbW9kYWwtcmVmJztcbmltcG9ydCB7IE1vZGFsQnV0dG9uT3B0aW9ucywgTW9kYWxPcHRpb25zIH0gZnJvbSAnLi9tb2RhbC10eXBlcyc7XG5cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogJ2Rpdltuei1tb2RhbC1mb290ZXJdJyxcbiAgZXhwb3J0QXM6ICdOek1vZGFsRm9vdGVyQnVpbHRpbicsXG4gIHRlbXBsYXRlOiBgXG4gICAgPG5nLWNvbnRhaW5lciAqbmdJZj1cImNvbmZpZy5uekZvb3RlcjsgZWxzZSBkZWZhdWx0Rm9vdGVyQnV0dG9uc1wiPlxuICAgICAgPG5nLWNvbnRhaW5lclxuICAgICAgICAqbnpTdHJpbmdUZW1wbGF0ZU91dGxldD1cImNvbmZpZy5uekZvb3RlcjsgY29udGV4dDogeyAkaW1wbGljaXQ6IGNvbmZpZy5uekNvbXBvbmVudFBhcmFtcywgbW9kYWxSZWY6IG1vZGFsUmVmIH1cIlxuICAgICAgPlxuICAgICAgICA8ZGl2ICpuZ0lmPVwiIWJ1dHRvbnNGb290ZXJcIiBbaW5uZXJIVE1MXT1cImNvbmZpZy5uekZvb3RlclwiPjwvZGl2PlxuICAgICAgICA8bmctY29udGFpbmVyICpuZ0lmPVwiYnV0dG9uc0Zvb3RlclwiPlxuICAgICAgICAgIDxidXR0b25cbiAgICAgICAgICAgICpuZ0Zvcj1cImxldCBidXR0b24gb2YgYnV0dG9uc1wiXG4gICAgICAgICAgICBuei1idXR0b25cbiAgICAgICAgICAgIChjbGljayk9XCJvbkJ1dHRvbkNsaWNrKGJ1dHRvbilcIlxuICAgICAgICAgICAgW2hpZGRlbl09XCIhZ2V0QnV0dG9uQ2FsbGFibGVQcm9wKGJ1dHRvbiwgJ3Nob3cnKVwiXG4gICAgICAgICAgICBbbnpMb2FkaW5nXT1cImdldEJ1dHRvbkNhbGxhYmxlUHJvcChidXR0b24sICdsb2FkaW5nJylcIlxuICAgICAgICAgICAgW2Rpc2FibGVkXT1cImdldEJ1dHRvbkNhbGxhYmxlUHJvcChidXR0b24sICdkaXNhYmxlZCcpXCJcbiAgICAgICAgICAgIFtuelR5cGVdPVwiYnV0dG9uLnR5cGUhXCJcbiAgICAgICAgICAgIFtuekRhbmdlcl09XCJidXR0b24uZGFuZ2VyXCJcbiAgICAgICAgICAgIFtuelNoYXBlXT1cImJ1dHRvbi5zaGFwZSFcIlxuICAgICAgICAgICAgW256U2l6ZV09XCJidXR0b24uc2l6ZSFcIlxuICAgICAgICAgICAgW256R2hvc3RdPVwiYnV0dG9uLmdob3N0IVwiXG4gICAgICAgICAgPlxuICAgICAgICAgICAge3sgYnV0dG9uLmxhYmVsIH19XG4gICAgICAgICAgPC9idXR0b24+XG4gICAgICAgIDwvbmctY29udGFpbmVyPlxuICAgICAgPC9uZy1jb250YWluZXI+XG4gICAgPC9uZy1jb250YWluZXI+XG4gICAgPG5nLXRlbXBsYXRlICNkZWZhdWx0Rm9vdGVyQnV0dG9ucz5cbiAgICAgIDxidXR0b25cbiAgICAgICAgKm5nSWY9XCJjb25maWcubnpDYW5jZWxUZXh0ICE9PSBudWxsXCJcbiAgICAgICAgW2F0dHIuY2RrRm9jdXNJbml0aWFsXT1cImNvbmZpZy5uekF1dG9mb2N1cyA9PT0gJ2NhbmNlbCcgfHwgbnVsbFwiXG4gICAgICAgIG56LWJ1dHRvblxuICAgICAgICAoY2xpY2spPVwib25DYW5jZWwoKVwiXG4gICAgICAgIFtuekxvYWRpbmddPVwiISFjb25maWcubnpDYW5jZWxMb2FkaW5nXCJcbiAgICAgICAgW2Rpc2FibGVkXT1cImNvbmZpZy5uekNhbmNlbERpc2FibGVkXCJcbiAgICAgID5cbiAgICAgICAge3sgY29uZmlnLm56Q2FuY2VsVGV4dCB8fCBsb2NhbGUuY2FuY2VsVGV4dCB9fVxuICAgICAgPC9idXR0b24+XG4gICAgICA8YnV0dG9uXG4gICAgICAgICpuZ0lmPVwiY29uZmlnLm56T2tUZXh0ICE9PSBudWxsXCJcbiAgICAgICAgW2F0dHIuY2RrRm9jdXNJbml0aWFsXT1cImNvbmZpZy5uekF1dG9mb2N1cyA9PT0gJ29rJyB8fCBudWxsXCJcbiAgICAgICAgbnotYnV0dG9uXG4gICAgICAgIFtuelR5cGVdPVwiY29uZmlnLm56T2tUeXBlIVwiXG4gICAgICAgIFtuekRhbmdlcl09XCJjb25maWcubnpPa0RhbmdlclwiXG4gICAgICAgIChjbGljayk9XCJvbk9rKClcIlxuICAgICAgICBbbnpMb2FkaW5nXT1cIiEhY29uZmlnLm56T2tMb2FkaW5nXCJcbiAgICAgICAgW2Rpc2FibGVkXT1cImNvbmZpZy5uek9rRGlzYWJsZWRcIlxuICAgICAgPlxuICAgICAgICB7eyBjb25maWcubnpPa1RleHQgfHwgbG9jYWxlLm9rVGV4dCB9fVxuICAgICAgPC9idXR0b24+XG4gICAgPC9uZy10ZW1wbGF0ZT5cbiAgYCxcbiAgaG9zdDoge1xuICAgIGNsYXNzOiAnYW50LW1vZGFsLWZvb3RlcidcbiAgfSxcbiAgY2hhbmdlRGV0ZWN0aW9uOiBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneS5EZWZhdWx0XG59KVxuZXhwb3J0IGNsYXNzIE56TW9kYWxGb290ZXJDb21wb25lbnQgaW1wbGVtZW50cyBPbkRlc3Ryb3kge1xuICBidXR0b25zRm9vdGVyID0gZmFsc2U7XG4gIGJ1dHRvbnM6IE1vZGFsQnV0dG9uT3B0aW9uc1tdID0gW107XG4gIGxvY2FsZSE6IE56TW9kYWxJMThuSW50ZXJmYWNlO1xuICBAT3V0cHV0KCkgcmVhZG9ubHkgY2FuY2VsVHJpZ2dlcmVkID0gbmV3IEV2ZW50RW1pdHRlcjx2b2lkPigpO1xuICBAT3V0cHV0KCkgcmVhZG9ubHkgb2tUcmlnZ2VyZWQgPSBuZXcgRXZlbnRFbWl0dGVyPHZvaWQ+KCk7XG4gIEBJbnB1dCgpIG1vZGFsUmVmITogTnpNb2RhbFJlZjtcbiAgcHJpdmF0ZSBkZXN0cm95JCA9IG5ldyBTdWJqZWN0PHZvaWQ+KCk7XG5cbiAgY29uc3RydWN0b3IocHJpdmF0ZSBpMThuOiBOekkxOG5TZXJ2aWNlLCBwdWJsaWMgY29uZmlnOiBNb2RhbE9wdGlvbnMpIHtcbiAgICBpZiAoQXJyYXkuaXNBcnJheShjb25maWcubnpGb290ZXIpKSB7XG4gICAgICB0aGlzLmJ1dHRvbnNGb290ZXIgPSB0cnVlO1xuICAgICAgdGhpcy5idXR0b25zID0gKGNvbmZpZy5uekZvb3RlciBhcyBNb2RhbEJ1dHRvbk9wdGlvbnNbXSkubWFwKG1lcmdlRGVmYXVsdE9wdGlvbik7XG4gICAgfVxuICAgIHRoaXMuaTE4bi5sb2NhbGVDaGFuZ2UucGlwZSh0YWtlVW50aWwodGhpcy5kZXN0cm95JCkpLnN1YnNjcmliZSgoKSA9PiB7XG4gICAgICB0aGlzLmxvY2FsZSA9IHRoaXMuaTE4bi5nZXRMb2NhbGVEYXRhKCdNb2RhbCcpO1xuICAgIH0pO1xuICB9XG5cbiAgb25DYW5jZWwoKTogdm9pZCB7XG4gICAgdGhpcy5jYW5jZWxUcmlnZ2VyZWQuZW1pdCgpO1xuICB9XG5cbiAgb25PaygpOiB2b2lkIHtcbiAgICB0aGlzLm9rVHJpZ2dlcmVkLmVtaXQoKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBSZXR1cm5zIHRoZSB2YWx1ZSBvZiB0aGUgc3BlY2lmaWVkIGtleS5cbiAgICogSWYgaXQgaXMgYSBmdW5jdGlvbiwgcnVuIGFuZCByZXR1cm4gdGhlIHJldHVybiB2YWx1ZSBvZiB0aGUgZnVuY3Rpb24uXG4gICAqL1xuICBnZXRCdXR0b25DYWxsYWJsZVByb3Aob3B0aW9uczogTW9kYWxCdXR0b25PcHRpb25zLCBwcm9wOiBrZXlvZiBNb2RhbEJ1dHRvbk9wdGlvbnMpOiBib29sZWFuIHtcbiAgICBjb25zdCB2YWx1ZSA9IG9wdGlvbnNbcHJvcF07XG4gICAgY29uc3QgY29tcG9uZW50SW5zdGFuY2UgPSB0aGlzLm1vZGFsUmVmLmdldENvbnRlbnRDb21wb25lbnQoKTtcbiAgICByZXR1cm4gdHlwZW9mIHZhbHVlID09PSAnZnVuY3Rpb24nID8gdmFsdWUuYXBwbHkob3B0aW9ucywgY29tcG9uZW50SW5zdGFuY2UgJiYgW2NvbXBvbmVudEluc3RhbmNlXSkgOiB2YWx1ZTtcbiAgfVxuXG4gIC8qKlxuICAgKiBSdW4gZnVuY3Rpb24gYmFzZWQgb24gdGhlIHR5cGUgYW5kIHNldCBpdHMgYGxvYWRpbmdgIHByb3AgaWYgbmVlZGVkLlxuICAgKi9cbiAgb25CdXR0b25DbGljayhvcHRpb25zOiBNb2RhbEJ1dHRvbk9wdGlvbnMpOiB2b2lkIHtcbiAgICBjb25zdCBsb2FkaW5nID0gdGhpcy5nZXRCdXR0b25DYWxsYWJsZVByb3Aob3B0aW9ucywgJ2xvYWRpbmcnKTtcbiAgICBpZiAoIWxvYWRpbmcpIHtcbiAgICAgIGNvbnN0IHJlc3VsdCA9IHRoaXMuZ2V0QnV0dG9uQ2FsbGFibGVQcm9wKG9wdGlvbnMsICdvbkNsaWNrJyk7XG4gICAgICBpZiAob3B0aW9ucy5hdXRvTG9hZGluZyAmJiBpc1Byb21pc2UocmVzdWx0KSkge1xuICAgICAgICBvcHRpb25zLmxvYWRpbmcgPSB0cnVlO1xuICAgICAgICByZXN1bHRcbiAgICAgICAgICAudGhlbigoKSA9PiAob3B0aW9ucy5sb2FkaW5nID0gZmFsc2UpKVxuICAgICAgICAgIC5jYXRjaChlID0+IHtcbiAgICAgICAgICAgIG9wdGlvbnMubG9hZGluZyA9IGZhbHNlO1xuICAgICAgICAgICAgdGhyb3cgZTtcbiAgICAgICAgICB9KTtcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICBuZ09uRGVzdHJveSgpOiB2b2lkIHtcbiAgICB0aGlzLmRlc3Ryb3kkLm5leHQoKTtcbiAgICB0aGlzLmRlc3Ryb3kkLmNvbXBsZXRlKCk7XG4gIH1cbn1cblxuZnVuY3Rpb24gbWVyZ2VEZWZhdWx0T3B0aW9uKG9wdGlvbnM6IE1vZGFsQnV0dG9uT3B0aW9ucyk6IE1vZGFsQnV0dG9uT3B0aW9ucyB7XG4gIHJldHVybiB7XG4gICAgdHlwZTogbnVsbCxcbiAgICBzaXplOiAnZGVmYXVsdCcsXG4gICAgYXV0b0xvYWRpbmc6IHRydWUsXG4gICAgc2hvdzogdHJ1ZSxcbiAgICBsb2FkaW5nOiBmYWxzZSxcbiAgICBkaXNhYmxlZDogZmFsc2UsXG4gICAgLi4ub3B0aW9uc1xuICB9O1xufVxuIl19