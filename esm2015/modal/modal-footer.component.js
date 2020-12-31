/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */
import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { isPromise } from 'ng-zorro-antd/core/util';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { NzI18nService } from 'ng-zorro-antd/i18n';
import { NzModalRef } from './modal-ref';
import { ModalOptions } from './modal-types';
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
                result.then(() => (options.loading = false)).catch(() => (options.loading = false));
            }
        }
    }
    ngOnDestroy() {
        this.destroy$.next();
        this.destroy$.complete();
    }
}
NzModalFooterComponent.decorators = [
    { type: Component, args: [{
                selector: 'div[nz-modal-footer]',
                exportAs: 'NzModalFooterBuiltin',
                template: `
    <ng-container *ngIf="config.nzFooter; else defaultFooterButtons">
      <ng-container *nzStringTemplateOutlet="config.nzFooter; context: { $implicit: config.nzComponentParams, modalRef: modalRef }">
        <div *ngIf="!buttonsFooter" [innerHTML]="config.nzTitle"></div>
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
            },] }
];
NzModalFooterComponent.ctorParameters = () => [
    { type: NzI18nService },
    { type: ModalOptions }
];
NzModalFooterComponent.propDecorators = {
    cancelTriggered: [{ type: Output }],
    okTriggered: [{ type: Output }],
    modalRef: [{ type: Input }]
};
function mergeDefaultOption(options) {
    return Object.assign({ type: null, size: 'default', autoLoading: true, show: true, loading: false, disabled: false }, options);
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kYWwtZm9vdGVyLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiIuLi8uLi8uLi9jb21wb25lbnRzL21vZGFsLyIsInNvdXJjZXMiOlsibW9kYWwtZm9vdGVyLmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7O0dBR0c7QUFFSCxPQUFPLEVBQUUsdUJBQXVCLEVBQUUsU0FBUyxFQUFFLFlBQVksRUFBRSxLQUFLLEVBQWEsTUFBTSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQzNHLE9BQU8sRUFBRSxTQUFTLEVBQUUsTUFBTSx5QkFBeUIsQ0FBQztBQUNwRCxPQUFPLEVBQUUsT0FBTyxFQUFFLE1BQU0sTUFBTSxDQUFDO0FBQy9CLE9BQU8sRUFBRSxTQUFTLEVBQUUsTUFBTSxnQkFBZ0IsQ0FBQztBQUUzQyxPQUFPLEVBQUUsYUFBYSxFQUF3QixNQUFNLG9CQUFvQixDQUFDO0FBRXpFLE9BQU8sRUFBRSxVQUFVLEVBQUUsTUFBTSxhQUFhLENBQUM7QUFDekMsT0FBTyxFQUFzQixZQUFZLEVBQUUsTUFBTSxlQUFlLENBQUM7QUEwRGpFLE1BQU0sT0FBTyxzQkFBc0I7SUFTakMsWUFBb0IsSUFBbUIsRUFBUyxNQUFvQjtRQUFoRCxTQUFJLEdBQUosSUFBSSxDQUFlO1FBQVMsV0FBTSxHQUFOLE1BQU0sQ0FBYztRQVJwRSxrQkFBYSxHQUFHLEtBQUssQ0FBQztRQUN0QixZQUFPLEdBQXlCLEVBQUUsQ0FBQztRQUVoQixvQkFBZSxHQUFHLElBQUksWUFBWSxFQUFRLENBQUM7UUFDM0MsZ0JBQVcsR0FBRyxJQUFJLFlBQVksRUFBUSxDQUFDO1FBRWxELGFBQVEsR0FBRyxJQUFJLE9BQU8sRUFBUSxDQUFDO1FBR3JDLElBQUksS0FBSyxDQUFDLE9BQU8sQ0FBQyxNQUFNLENBQUMsUUFBUSxDQUFDLEVBQUU7WUFDbEMsSUFBSSxDQUFDLGFBQWEsR0FBRyxJQUFJLENBQUM7WUFDMUIsSUFBSSxDQUFDLE9BQU8sR0FBSSxNQUFNLENBQUMsUUFBaUMsQ0FBQyxHQUFHLENBQUMsa0JBQWtCLENBQUMsQ0FBQztTQUNsRjtRQUNELElBQUksQ0FBQyxJQUFJLENBQUMsWUFBWSxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUMsU0FBUyxDQUFDLEdBQUcsRUFBRTtZQUNuRSxJQUFJLENBQUMsTUFBTSxHQUFHLElBQUksQ0FBQyxJQUFJLENBQUMsYUFBYSxDQUFDLE9BQU8sQ0FBQyxDQUFDO1FBQ2pELENBQUMsQ0FBQyxDQUFDO0lBQ0wsQ0FBQztJQUVELFFBQVE7UUFDTixJQUFJLENBQUMsZUFBZSxDQUFDLElBQUksRUFBRSxDQUFDO0lBQzlCLENBQUM7SUFFRCxJQUFJO1FBQ0YsSUFBSSxDQUFDLFdBQVcsQ0FBQyxJQUFJLEVBQUUsQ0FBQztJQUMxQixDQUFDO0lBRUQ7OztPQUdHO0lBQ0gscUJBQXFCLENBQUMsT0FBMkIsRUFBRSxJQUE4QjtRQUMvRSxNQUFNLEtBQUssR0FBRyxPQUFPLENBQUMsSUFBSSxDQUFDLENBQUM7UUFDNUIsTUFBTSxpQkFBaUIsR0FBRyxJQUFJLENBQUMsUUFBUSxDQUFDLG1CQUFtQixFQUFFLENBQUM7UUFDOUQsT0FBTyxPQUFPLEtBQUssS0FBSyxVQUFVLENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQyxLQUFLLENBQUMsT0FBTyxFQUFFLGlCQUFpQixJQUFJLENBQUMsaUJBQWlCLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUM7SUFDOUcsQ0FBQztJQUVEOztPQUVHO0lBQ0gsYUFBYSxDQUFDLE9BQTJCO1FBQ3ZDLE1BQU0sT0FBTyxHQUFHLElBQUksQ0FBQyxxQkFBcUIsQ0FBQyxPQUFPLEVBQUUsU0FBUyxDQUFDLENBQUM7UUFDL0QsSUFBSSxDQUFDLE9BQU8sRUFBRTtZQUNaLE1BQU0sTUFBTSxHQUFHLElBQUksQ0FBQyxxQkFBcUIsQ0FBQyxPQUFPLEVBQUUsU0FBUyxDQUFDLENBQUM7WUFDOUQsSUFBSSxPQUFPLENBQUMsV0FBVyxJQUFJLFNBQVMsQ0FBQyxNQUFNLENBQUMsRUFBRTtnQkFDNUMsT0FBTyxDQUFDLE9BQU8sR0FBRyxJQUFJLENBQUM7Z0JBQ3ZCLE1BQU0sQ0FBQyxJQUFJLENBQUMsR0FBRyxFQUFFLENBQUMsQ0FBQyxPQUFPLENBQUMsT0FBTyxHQUFHLEtBQUssQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDLEdBQUcsRUFBRSxDQUFDLENBQUMsT0FBTyxDQUFDLE9BQU8sR0FBRyxLQUFLLENBQUMsQ0FBQyxDQUFDO2FBQ3JGO1NBQ0Y7SUFDSCxDQUFDO0lBRUQsV0FBVztRQUNULElBQUksQ0FBQyxRQUFRLENBQUMsSUFBSSxFQUFFLENBQUM7UUFDckIsSUFBSSxDQUFDLFFBQVEsQ0FBQyxRQUFRLEVBQUUsQ0FBQztJQUMzQixDQUFDOzs7WUE5R0YsU0FBUyxTQUFDO2dCQUNULFFBQVEsRUFBRSxzQkFBc0I7Z0JBQ2hDLFFBQVEsRUFBRSxzQkFBc0I7Z0JBQ2hDLFFBQVEsRUFBRTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7R0ErQ1Q7Z0JBQ0QsSUFBSSxFQUFFO29CQUNKLEtBQUssRUFBRSxrQkFBa0I7aUJBQzFCO2dCQUNELGVBQWUsRUFBRSx1QkFBdUIsQ0FBQyxPQUFPO2FBQ2pEOzs7WUE1RFEsYUFBYTtZQUdPLFlBQVk7Ozs4QkE4RHRDLE1BQU07MEJBQ04sTUFBTTt1QkFDTixLQUFLOztBQW1EUixTQUFTLGtCQUFrQixDQUFDLE9BQTJCO0lBQ3JELHVCQUNFLElBQUksRUFBRSxJQUFJLEVBQ1YsSUFBSSxFQUFFLFNBQVMsRUFDZixXQUFXLEVBQUUsSUFBSSxFQUNqQixJQUFJLEVBQUUsSUFBSSxFQUNWLE9BQU8sRUFBRSxLQUFLLEVBQ2QsUUFBUSxFQUFFLEtBQUssSUFDWixPQUFPLEVBQ1Y7QUFDSixDQUFDIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKiBVc2Ugb2YgdGhpcyBzb3VyY2UgY29kZSBpcyBnb3Zlcm5lZCBieSBhbiBNSVQtc3R5bGUgbGljZW5zZSB0aGF0IGNhbiBiZVxuICogZm91bmQgaW4gdGhlIExJQ0VOU0UgZmlsZSBhdCBodHRwczovL2dpdGh1Yi5jb20vTkctWk9SUk8vbmctem9ycm8tYW50ZC9ibG9iL21hc3Rlci9MSUNFTlNFXG4gKi9cblxuaW1wb3J0IHsgQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3ksIENvbXBvbmVudCwgRXZlbnRFbWl0dGVyLCBJbnB1dCwgT25EZXN0cm95LCBPdXRwdXQgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IGlzUHJvbWlzZSB9IGZyb20gJ25nLXpvcnJvLWFudGQvY29yZS91dGlsJztcbmltcG9ydCB7IFN1YmplY3QgfSBmcm9tICdyeGpzJztcbmltcG9ydCB7IHRha2VVbnRpbCB9IGZyb20gJ3J4anMvb3BlcmF0b3JzJztcblxuaW1wb3J0IHsgTnpJMThuU2VydmljZSwgTnpNb2RhbEkxOG5JbnRlcmZhY2UgfSBmcm9tICduZy16b3Jyby1hbnRkL2kxOG4nO1xuXG5pbXBvcnQgeyBOek1vZGFsUmVmIH0gZnJvbSAnLi9tb2RhbC1yZWYnO1xuaW1wb3J0IHsgTW9kYWxCdXR0b25PcHRpb25zLCBNb2RhbE9wdGlvbnMgfSBmcm9tICcuL21vZGFsLXR5cGVzJztcblxuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAnZGl2W256LW1vZGFsLWZvb3Rlcl0nLFxuICBleHBvcnRBczogJ056TW9kYWxGb290ZXJCdWlsdGluJyxcbiAgdGVtcGxhdGU6IGBcbiAgICA8bmctY29udGFpbmVyICpuZ0lmPVwiY29uZmlnLm56Rm9vdGVyOyBlbHNlIGRlZmF1bHRGb290ZXJCdXR0b25zXCI+XG4gICAgICA8bmctY29udGFpbmVyICpuelN0cmluZ1RlbXBsYXRlT3V0bGV0PVwiY29uZmlnLm56Rm9vdGVyOyBjb250ZXh0OiB7ICRpbXBsaWNpdDogY29uZmlnLm56Q29tcG9uZW50UGFyYW1zLCBtb2RhbFJlZjogbW9kYWxSZWYgfVwiPlxuICAgICAgICA8ZGl2ICpuZ0lmPVwiIWJ1dHRvbnNGb290ZXJcIiBbaW5uZXJIVE1MXT1cImNvbmZpZy5uelRpdGxlXCI+PC9kaXY+XG4gICAgICAgIDxuZy1jb250YWluZXIgKm5nSWY9XCJidXR0b25zRm9vdGVyXCI+XG4gICAgICAgICAgPGJ1dHRvblxuICAgICAgICAgICAgKm5nRm9yPVwibGV0IGJ1dHRvbiBvZiBidXR0b25zXCJcbiAgICAgICAgICAgIG56LWJ1dHRvblxuICAgICAgICAgICAgKGNsaWNrKT1cIm9uQnV0dG9uQ2xpY2soYnV0dG9uKVwiXG4gICAgICAgICAgICBbaGlkZGVuXT1cIiFnZXRCdXR0b25DYWxsYWJsZVByb3AoYnV0dG9uLCAnc2hvdycpXCJcbiAgICAgICAgICAgIFtuekxvYWRpbmddPVwiZ2V0QnV0dG9uQ2FsbGFibGVQcm9wKGJ1dHRvbiwgJ2xvYWRpbmcnKVwiXG4gICAgICAgICAgICBbZGlzYWJsZWRdPVwiZ2V0QnV0dG9uQ2FsbGFibGVQcm9wKGJ1dHRvbiwgJ2Rpc2FibGVkJylcIlxuICAgICAgICAgICAgW256VHlwZV09XCJidXR0b24udHlwZSFcIlxuICAgICAgICAgICAgW256RGFuZ2VyXT1cImJ1dHRvbi5kYW5nZXJcIlxuICAgICAgICAgICAgW256U2hhcGVdPVwiYnV0dG9uLnNoYXBlIVwiXG4gICAgICAgICAgICBbbnpTaXplXT1cImJ1dHRvbi5zaXplIVwiXG4gICAgICAgICAgICBbbnpHaG9zdF09XCJidXR0b24uZ2hvc3QhXCJcbiAgICAgICAgICA+XG4gICAgICAgICAgICB7eyBidXR0b24ubGFiZWwgfX1cbiAgICAgICAgICA8L2J1dHRvbj5cbiAgICAgICAgPC9uZy1jb250YWluZXI+XG4gICAgICA8L25nLWNvbnRhaW5lcj5cbiAgICA8L25nLWNvbnRhaW5lcj5cbiAgICA8bmctdGVtcGxhdGUgI2RlZmF1bHRGb290ZXJCdXR0b25zPlxuICAgICAgPGJ1dHRvblxuICAgICAgICAqbmdJZj1cImNvbmZpZy5uekNhbmNlbFRleHQgIT09IG51bGxcIlxuICAgICAgICBbYXR0ci5jZGtGb2N1c0luaXRpYWxdPVwiY29uZmlnLm56QXV0b2ZvY3VzID09PSAnY2FuY2VsJyB8fCBudWxsXCJcbiAgICAgICAgbnotYnV0dG9uXG4gICAgICAgIChjbGljayk9XCJvbkNhbmNlbCgpXCJcbiAgICAgICAgW256TG9hZGluZ109XCIhIWNvbmZpZy5uekNhbmNlbExvYWRpbmdcIlxuICAgICAgICBbZGlzYWJsZWRdPVwiY29uZmlnLm56Q2FuY2VsRGlzYWJsZWRcIlxuICAgICAgPlxuICAgICAgICB7eyBjb25maWcubnpDYW5jZWxUZXh0IHx8IGxvY2FsZS5jYW5jZWxUZXh0IH19XG4gICAgICA8L2J1dHRvbj5cbiAgICAgIDxidXR0b25cbiAgICAgICAgKm5nSWY9XCJjb25maWcubnpPa1RleHQgIT09IG51bGxcIlxuICAgICAgICBbYXR0ci5jZGtGb2N1c0luaXRpYWxdPVwiY29uZmlnLm56QXV0b2ZvY3VzID09PSAnb2snIHx8IG51bGxcIlxuICAgICAgICBuei1idXR0b25cbiAgICAgICAgW256VHlwZV09XCJjb25maWcubnpPa1R5cGUhXCJcbiAgICAgICAgW256RGFuZ2VyXT1cImNvbmZpZy5uek9rRGFuZ2VyXCJcbiAgICAgICAgKGNsaWNrKT1cIm9uT2soKVwiXG4gICAgICAgIFtuekxvYWRpbmddPVwiISFjb25maWcubnpPa0xvYWRpbmdcIlxuICAgICAgICBbZGlzYWJsZWRdPVwiY29uZmlnLm56T2tEaXNhYmxlZFwiXG4gICAgICA+XG4gICAgICAgIHt7IGNvbmZpZy5uek9rVGV4dCB8fCBsb2NhbGUub2tUZXh0IH19XG4gICAgICA8L2J1dHRvbj5cbiAgICA8L25nLXRlbXBsYXRlPlxuICBgLFxuICBob3N0OiB7XG4gICAgY2xhc3M6ICdhbnQtbW9kYWwtZm9vdGVyJ1xuICB9LFxuICBjaGFuZ2VEZXRlY3Rpb246IENoYW5nZURldGVjdGlvblN0cmF0ZWd5LkRlZmF1bHRcbn0pXG5leHBvcnQgY2xhc3MgTnpNb2RhbEZvb3RlckNvbXBvbmVudCBpbXBsZW1lbnRzIE9uRGVzdHJveSB7XG4gIGJ1dHRvbnNGb290ZXIgPSBmYWxzZTtcbiAgYnV0dG9uczogTW9kYWxCdXR0b25PcHRpb25zW10gPSBbXTtcbiAgbG9jYWxlITogTnpNb2RhbEkxOG5JbnRlcmZhY2U7XG4gIEBPdXRwdXQoKSByZWFkb25seSBjYW5jZWxUcmlnZ2VyZWQgPSBuZXcgRXZlbnRFbWl0dGVyPHZvaWQ+KCk7XG4gIEBPdXRwdXQoKSByZWFkb25seSBva1RyaWdnZXJlZCA9IG5ldyBFdmVudEVtaXR0ZXI8dm9pZD4oKTtcbiAgQElucHV0KCkgbW9kYWxSZWYhOiBOek1vZGFsUmVmO1xuICBwcml2YXRlIGRlc3Ryb3kkID0gbmV3IFN1YmplY3Q8dm9pZD4oKTtcblxuICBjb25zdHJ1Y3Rvcihwcml2YXRlIGkxOG46IE56STE4blNlcnZpY2UsIHB1YmxpYyBjb25maWc6IE1vZGFsT3B0aW9ucykge1xuICAgIGlmIChBcnJheS5pc0FycmF5KGNvbmZpZy5uekZvb3RlcikpIHtcbiAgICAgIHRoaXMuYnV0dG9uc0Zvb3RlciA9IHRydWU7XG4gICAgICB0aGlzLmJ1dHRvbnMgPSAoY29uZmlnLm56Rm9vdGVyIGFzIE1vZGFsQnV0dG9uT3B0aW9uc1tdKS5tYXAobWVyZ2VEZWZhdWx0T3B0aW9uKTtcbiAgICB9XG4gICAgdGhpcy5pMThuLmxvY2FsZUNoYW5nZS5waXBlKHRha2VVbnRpbCh0aGlzLmRlc3Ryb3kkKSkuc3Vic2NyaWJlKCgpID0+IHtcbiAgICAgIHRoaXMubG9jYWxlID0gdGhpcy5pMThuLmdldExvY2FsZURhdGEoJ01vZGFsJyk7XG4gICAgfSk7XG4gIH1cblxuICBvbkNhbmNlbCgpOiB2b2lkIHtcbiAgICB0aGlzLmNhbmNlbFRyaWdnZXJlZC5lbWl0KCk7XG4gIH1cblxuICBvbk9rKCk6IHZvaWQge1xuICAgIHRoaXMub2tUcmlnZ2VyZWQuZW1pdCgpO1xuICB9XG5cbiAgLyoqXG4gICAqIFJldHVybnMgdGhlIHZhbHVlIG9mIHRoZSBzcGVjaWZpZWQga2V5LlxuICAgKiBJZiBpdCBpcyBhIGZ1bmN0aW9uLCBydW4gYW5kIHJldHVybiB0aGUgcmV0dXJuIHZhbHVlIG9mIHRoZSBmdW5jdGlvbi5cbiAgICovXG4gIGdldEJ1dHRvbkNhbGxhYmxlUHJvcChvcHRpb25zOiBNb2RhbEJ1dHRvbk9wdGlvbnMsIHByb3A6IGtleW9mIE1vZGFsQnV0dG9uT3B0aW9ucyk6IGJvb2xlYW4ge1xuICAgIGNvbnN0IHZhbHVlID0gb3B0aW9uc1twcm9wXTtcbiAgICBjb25zdCBjb21wb25lbnRJbnN0YW5jZSA9IHRoaXMubW9kYWxSZWYuZ2V0Q29udGVudENvbXBvbmVudCgpO1xuICAgIHJldHVybiB0eXBlb2YgdmFsdWUgPT09ICdmdW5jdGlvbicgPyB2YWx1ZS5hcHBseShvcHRpb25zLCBjb21wb25lbnRJbnN0YW5jZSAmJiBbY29tcG9uZW50SW5zdGFuY2VdKSA6IHZhbHVlO1xuICB9XG5cbiAgLyoqXG4gICAqIFJ1biBmdW5jdGlvbiBiYXNlZCBvbiB0aGUgdHlwZSBhbmQgc2V0IGl0cyBgbG9hZGluZ2AgcHJvcCBpZiBuZWVkZWQuXG4gICAqL1xuICBvbkJ1dHRvbkNsaWNrKG9wdGlvbnM6IE1vZGFsQnV0dG9uT3B0aW9ucyk6IHZvaWQge1xuICAgIGNvbnN0IGxvYWRpbmcgPSB0aGlzLmdldEJ1dHRvbkNhbGxhYmxlUHJvcChvcHRpb25zLCAnbG9hZGluZycpO1xuICAgIGlmICghbG9hZGluZykge1xuICAgICAgY29uc3QgcmVzdWx0ID0gdGhpcy5nZXRCdXR0b25DYWxsYWJsZVByb3Aob3B0aW9ucywgJ29uQ2xpY2snKTtcbiAgICAgIGlmIChvcHRpb25zLmF1dG9Mb2FkaW5nICYmIGlzUHJvbWlzZShyZXN1bHQpKSB7XG4gICAgICAgIG9wdGlvbnMubG9hZGluZyA9IHRydWU7XG4gICAgICAgIHJlc3VsdC50aGVuKCgpID0+IChvcHRpb25zLmxvYWRpbmcgPSBmYWxzZSkpLmNhdGNoKCgpID0+IChvcHRpb25zLmxvYWRpbmcgPSBmYWxzZSkpO1xuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIG5nT25EZXN0cm95KCk6IHZvaWQge1xuICAgIHRoaXMuZGVzdHJveSQubmV4dCgpO1xuICAgIHRoaXMuZGVzdHJveSQuY29tcGxldGUoKTtcbiAgfVxufVxuXG5mdW5jdGlvbiBtZXJnZURlZmF1bHRPcHRpb24ob3B0aW9uczogTW9kYWxCdXR0b25PcHRpb25zKTogTW9kYWxCdXR0b25PcHRpb25zIHtcbiAgcmV0dXJuIHtcbiAgICB0eXBlOiBudWxsLFxuICAgIHNpemU6ICdkZWZhdWx0JyxcbiAgICBhdXRvTG9hZGluZzogdHJ1ZSxcbiAgICBzaG93OiB0cnVlLFxuICAgIGxvYWRpbmc6IGZhbHNlLFxuICAgIGRpc2FibGVkOiBmYWxzZSxcbiAgICAuLi5vcHRpb25zXG4gIH07XG59XG4iXX0=