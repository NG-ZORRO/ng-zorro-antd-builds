import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output, ViewEncapsulation } from '@angular/core';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import * as i0 from "@angular/core";
import * as i1 from "@angular/cdk/clipboard";
import * as i2 from "ng-zorro-antd/i18n";
import * as i3 from "ng-zorro-antd/core/trans-button";
import * as i4 from "ng-zorro-antd/tooltip";
import * as i5 from "ng-zorro-antd/core/outlet";
import * as i6 from "ng-zorro-antd/icon";
export class NzTextCopyComponent {
    constructor(host, cdr, clipboard, i18n) {
        this.host = host;
        this.cdr = cdr;
        this.clipboard = clipboard;
        this.i18n = i18n;
        this.copied = false;
        this.copyId = -1;
        this.nativeElement = this.host.nativeElement;
        this.copyTooltip = null;
        this.copedTooltip = null;
        this.copyIcon = 'copy';
        this.copedIcon = 'check';
        this.destroy$ = new Subject();
        this.icons = ['copy', 'check'];
        this.textCopy = new EventEmitter();
    }
    ngOnInit() {
        this.i18n.localeChange.pipe(takeUntil(this.destroy$)).subscribe(() => {
            this.locale = this.i18n.getLocaleData('Text');
            this.updateTooltips();
            this.cdr.markForCheck();
        });
    }
    ngOnChanges(changes) {
        const { tooltips, icons } = changes;
        if (tooltips) {
            this.updateTooltips();
        }
        if (icons) {
            this.updateIcons();
        }
    }
    ngOnDestroy() {
        clearTimeout(this.copyId);
        this.destroy$.next();
        this.destroy$.complete();
    }
    onClick() {
        if (this.copied) {
            return;
        }
        this.copied = true;
        this.cdr.detectChanges();
        const text = this.text;
        this.textCopy.emit(text);
        this.clipboard.copy(text);
        this.onCopied();
    }
    onCopied() {
        clearTimeout(this.copyId);
        this.copyId = setTimeout(() => {
            this.copied = false;
            this.cdr.detectChanges();
        }, 3000);
    }
    updateTooltips() {
        if (this.tooltips === null) {
            this.copedTooltip = null;
            this.copyTooltip = null;
        }
        else if (Array.isArray(this.tooltips)) {
            const [copyTooltip, copedTooltip] = this.tooltips;
            this.copyTooltip = copyTooltip || this.locale?.copy;
            this.copedTooltip = copedTooltip || this.locale?.copied;
        }
        else {
            this.copyTooltip = this.locale?.copy;
            this.copedTooltip = this.locale?.copied;
        }
        this.cdr.markForCheck();
    }
    updateIcons() {
        const [copyIcon, copedIcon] = this.icons;
        this.copyIcon = copyIcon;
        this.copedIcon = copedIcon;
        this.cdr.markForCheck();
    }
}
NzTextCopyComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.1.2", ngImport: i0, type: NzTextCopyComponent, deps: [{ token: i0.ElementRef }, { token: i0.ChangeDetectorRef }, { token: i1.Clipboard }, { token: i2.NzI18nService }], target: i0.ɵɵFactoryTarget.Component });
NzTextCopyComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "13.1.2", type: NzTextCopyComponent, selector: "nz-text-copy", inputs: { text: "text", tooltips: "tooltips", icons: "icons" }, outputs: { textCopy: "textCopy" }, exportAs: ["nzTextCopy"], usesOnChanges: true, ngImport: i0, template: `
    <button
      type="button"
      nz-tooltip
      nz-trans-button
      [nzTooltipTitle]="copied ? copedTooltip : copyTooltip"
      class="ant-typography-copy"
      [class.ant-typography-copy-success]="copied"
      (click)="onClick()"
    >
      <ng-container *nzStringTemplateOutlet="copied ? copedIcon : copyIcon; let icon">
        <i nz-icon [nzType]="icon"></i>
      </ng-container>
    </button>
  `, isInline: true, directives: [{ type: i3.NzTransButtonDirective, selector: "button[nz-trans-button]" }, { type: i4.NzTooltipDirective, selector: "[nz-tooltip]", inputs: ["nzTooltipTitle", "nzTooltipTitleContext", "nz-tooltip", "nzTooltipTrigger", "nzTooltipPlacement", "nzTooltipOrigin", "nzTooltipVisible", "nzTooltipMouseEnterDelay", "nzTooltipMouseLeaveDelay", "nzTooltipOverlayClassName", "nzTooltipOverlayStyle", "nzTooltipArrowPointAtCenter", "nzTooltipColor"], outputs: ["nzTooltipVisibleChange"], exportAs: ["nzTooltip"] }, { type: i5.NzStringTemplateOutletDirective, selector: "[nzStringTemplateOutlet]", inputs: ["nzStringTemplateOutletContext", "nzStringTemplateOutlet"], exportAs: ["nzStringTemplateOutlet"] }, { type: i6.NzIconDirective, selector: "[nz-icon]", inputs: ["nzSpin", "nzRotate", "nzType", "nzTheme", "nzTwotoneColor", "nzIconfont"], exportAs: ["nzIcon"] }], changeDetection: i0.ChangeDetectionStrategy.OnPush, encapsulation: i0.ViewEncapsulation.None });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.1.2", ngImport: i0, type: NzTextCopyComponent, decorators: [{
            type: Component,
            args: [{
                    selector: 'nz-text-copy',
                    exportAs: 'nzTextCopy',
                    template: `
    <button
      type="button"
      nz-tooltip
      nz-trans-button
      [nzTooltipTitle]="copied ? copedTooltip : copyTooltip"
      class="ant-typography-copy"
      [class.ant-typography-copy-success]="copied"
      (click)="onClick()"
    >
      <ng-container *nzStringTemplateOutlet="copied ? copedIcon : copyIcon; let icon">
        <i nz-icon [nzType]="icon"></i>
      </ng-container>
    </button>
  `,
                    changeDetection: ChangeDetectionStrategy.OnPush,
                    encapsulation: ViewEncapsulation.None,
                    preserveWhitespaces: false
                }]
        }], ctorParameters: function () { return [{ type: i0.ElementRef }, { type: i0.ChangeDetectorRef }, { type: i1.Clipboard }, { type: i2.NzI18nService }]; }, propDecorators: { text: [{
                type: Input
            }], tooltips: [{
                type: Input
            }], icons: [{
                type: Input
            }], textCopy: [{
                type: Output
            }] } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGV4dC1jb3B5LmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL2NvbXBvbmVudHMvdHlwb2dyYXBoeS90ZXh0LWNvcHkuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQU1BLE9BQU8sRUFDTCx1QkFBdUIsRUFFdkIsU0FBUyxFQUVULFlBQVksRUFDWixLQUFLLEVBSUwsTUFBTSxFQUVOLGlCQUFpQixFQUNsQixNQUFNLGVBQWUsQ0FBQztBQUN2QixPQUFPLEVBQUUsT0FBTyxFQUFFLE1BQU0sTUFBTSxDQUFDO0FBQy9CLE9BQU8sRUFBRSxTQUFTLEVBQUUsTUFBTSxnQkFBZ0IsQ0FBQzs7Ozs7Ozs7QUEyQjNDLE1BQU0sT0FBTyxtQkFBbUI7SUFpQjlCLFlBQ1UsSUFBZ0IsRUFDaEIsR0FBc0IsRUFDdEIsU0FBb0IsRUFDcEIsSUFBbUI7UUFIbkIsU0FBSSxHQUFKLElBQUksQ0FBWTtRQUNoQixRQUFHLEdBQUgsR0FBRyxDQUFtQjtRQUN0QixjQUFTLEdBQVQsU0FBUyxDQUFXO1FBQ3BCLFNBQUksR0FBSixJQUFJLENBQWU7UUFwQjdCLFdBQU0sR0FBRyxLQUFLLENBQUM7UUFDZixXQUFNLEdBQVcsQ0FBQyxDQUFDLENBQUM7UUFFcEIsa0JBQWEsR0FBRyxJQUFJLENBQUMsSUFBSSxDQUFDLGFBQWEsQ0FBQztRQUN4QyxnQkFBVyxHQUFvQixJQUFJLENBQUM7UUFDcEMsaUJBQVksR0FBb0IsSUFBSSxDQUFDO1FBQ3JDLGFBQVEsR0FBYSxNQUFNLENBQUM7UUFDNUIsY0FBUyxHQUFhLE9BQU8sQ0FBQztRQUN0QixhQUFRLEdBQUcsSUFBSSxPQUFPLEVBQUUsQ0FBQztRQUl4QixVQUFLLEdBQXlCLENBQUMsTUFBTSxFQUFFLE9BQU8sQ0FBQyxDQUFDO1FBRXRDLGFBQVEsR0FBRyxJQUFJLFlBQVksRUFBVSxDQUFDO0lBT3RELENBQUM7SUFFSixRQUFRO1FBQ04sSUFBSSxDQUFDLElBQUksQ0FBQyxZ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U0FBUyxHQUFHLFNBQVMsQ0FBQztRQUMzQixJQUFJLENBQUMsR0FBRyxDQUFDLFlBQVksRUFBRSxDQUFDO0lBQzFCLENBQUM7O2dIQXhGVSxtQkFBbUI7b0dBQW5CLG1CQUFtQixzTUFuQnBCOzs7Ozs7Ozs7Ozs7OztHQWNUOzJGQUtVLG1CQUFtQjtrQkF0Qi9CLFNBQVM7bUJBQUM7b0JBQ1QsUUFBUSxFQUFFLGNBQWM7b0JBQ3hCLFFBQVEsRUFBRSxZQUFZO29CQUN0QixRQUFRLEVBQUU7Ozs7Ozs7Ozs7Ozs7O0dBY1Q7b0JBQ0QsZUFBZSxFQUFFLHVCQUF1QixDQUFDLE1BQU07b0JBQy9DLGFBQWEsRUFBRSxpQkFBaUIsQ0FBQyxJQUFJO29CQUNyQyxtQkFBbUIsRUFBRSxLQUFLO2lCQUMzQjtxTEFZVSxJQUFJO3NCQUFaLEtBQUs7Z0JBQ0csUUFBUTtzQkFBaEIsS0FBSztnQkFDRyxLQUFLO3NCQUFiLEtBQUs7Z0JBRWEsUUFBUTtzQkFBMUIsTUFBTSIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxuICogVXNlIG9mIHRoaXMgc291cmNlIGNvZGUgaXMgZ292ZXJuZWQgYnkgYW4gTUlULXN0eWxlIGxpY2Vuc2UgdGhhdCBjYW4gYmVcbiAqIGZvdW5kIGluIHRoZSBMSUNFTlNFIGZpbGUgYXQgaHR0cHM6Ly9naXRodWIuY29tL05HLVpPUlJPL25nLXpvcnJvLWFudGQvYmxvYi9tYXN0ZXIvTElDRU5TRVxuICovXG5cbmltcG9ydCB7IENsaXBib2FyZCB9IGZyb20gJ0Bhbmd1bGFyL2Nkay9jbGlwYm9hcmQnO1xuaW1wb3J0IHtcbiAgQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3ksXG4gIENoYW5nZURldGVjdG9yUmVmLFxuICBDb21wb25lbnQsXG4gIEVsZW1lbnRSZWYsXG4gIEV2ZW50RW1pdHRlcixcbiAgSW5wdXQsXG4gIE9uQ2hhbmdlcyxcbiAgT25EZXN0cm95LFxuICBPbkluaXQsXG4gIE91dHB1dCxcbiAgU2ltcGxlQ2hhbmdlcyxcbiAgVmlld0VuY2Fwc3VsYXRpb25cbn0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBTdWJqZWN0IH0gZnJvbSAncnhqcyc7XG5pbXBvcnQgeyB0YWtlVW50aWwgfSBmcm9tICdyeGpzL29wZXJhdG9ycyc7XG5cbmltcG9ydCB7IE56VFNUeXBlIH0gZnJvbSAnbmctem9ycm8tYW50ZC9jb3JlL3R5cGVzJztcbmltcG9ydCB7IE56STE4blNlcnZpY2UsIE56VGV4dEkxOG5JbnRlcmZhY2UgfSBmcm9tICduZy16b3Jyby1hbnRkL2kxOG4nO1xuXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICduei10ZXh0LWNvcHknLFxuICBleHBvcnRBczogJ256VGV4dENvcHknLFxuICB0ZW1wbGF0ZTogYFxuICAgIDxidXR0b25cbiAgICAgIHR5cGU9XCJidXR0b25cIlxuICAgICAgbnotdG9vbHRpcFxuICAgICAgbnotdHJhbnMtYnV0dG9uXG4gICAgICBbbnpUb29sdGlwVGl0bGVdPVwiY29waWVkID8gY29wZWRUb29sdGlwIDogY29weVRvb2x0aXBcIlxuICAgICAgY2xhc3M9XCJhbnQtdHlwb2dyYXBoeS1jb3B5XCJcbiAgICAgIFtjbGFzcy5hbnQtdHlwb2dyYXBoeS1jb3B5LXN1Y2Nlc3NdPVwiY29waWVkXCJcbiAgICAgIChjbGljayk9XCJvbkNsaWNrKClcIlxuICAgID5cbiAgICAgIDxuZy1jb250YWluZXIgKm56U3RyaW5nVGVtcGxhdGVPdXRsZXQ9XCJjb3BpZWQgPyBjb3BlZEljb24gOiBjb3B5SWNvbjsgbGV0IGljb25cIj5cbiAgICAgICAgPGkgbnotaWNvbiBbbnpUeXBlXT1cImljb25cIj48L2k+XG4gICAgICA8L25nLWNvbnRhaW5lcj5cbiAgICA8L2J1dHRvbj5cbiAgYCxcbiAgY2hhbmdlRGV0ZWN0aW9uOiBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneS5PblB1c2gsXG4gIGVuY2Fwc3VsYXRpb246IFZpZXdFbmNhcHN1bGF0aW9uLk5vbmUsXG4gIHByZXNlcnZlV2hpdGVzcGFjZXM6IGZhbHNlXG59KVxuZXhwb3J0IGNsYXNzIE56VGV4dENvcHlDb21wb25lbnQgaW1wbGVtZW50cyBPbkluaXQsIE9uRGVzdHJveSwgT25DaGFuZ2VzIHtcbiAgY29waWVkID0gZmFsc2U7XG4gIGNvcHlJZDogbnVtYmVyID0gLTE7XG4gIGxvY2FsZSE6IE56VGV4dEkxOG5JbnRlcmZhY2U7XG4gIG5hdGl2ZUVsZW1lbnQgPSB0aGlzLmhvc3QubmF0aXZlRWxlbWVudDtcbiAgY29weVRvb2x0aXA6IE56VFNUeXBlIHwgbnVsbCA9IG51bGw7XG4gIGNvcGVkVG9vbHRpcDogTnpUU1R5cGUgfCBudWxsID0gbnVsbDtcbiAgY29weUljb246IE56VFNUeXBlID0gJ2NvcHknO1xuICBjb3BlZEljb246IE56VFNUeXBlID0gJ2NoZWNrJztcbiAgcHJpdmF0ZSBkZXN0cm95JCA9IG5ldyBTdWJqZWN0KCk7XG5cbiAgQElucHV0KCkgdGV4dCE6IHN0cmluZztcbiAgQElucHV0KCkgdG9vbHRpcHM/OiBbTnpUU1R5cGUsIE56VFNUeXBlXSB8IG51bGw7XG4gIEBJbnB1dCgpIGljb25zOiBbTnpUU1R5cGUsIE56VFNUeXBlXSA9IFsnY29weScsICdjaGVjayddO1xuXG4gIEBPdXRwdXQoKSByZWFkb25seSB0ZXh0Q29weSA9IG5ldyBFdmVudEVtaXR0ZXI8c3RyaW5nPigpO1xuXG4gIGNvbnN0cnVjdG9yKFxuICAgIHByaXZhdGUgaG9zdDogRWxlbWVudFJlZixcbiAgICBwcml2YXRlIGNkcjogQ2hhbmdlRGV0ZWN0b3JSZWYsXG4gICAgcHJpdmF0ZSBjbGlwYm9hcmQ6IENsaXBib2FyZCxcbiAgICBwcml2YXRlIGkxOG46IE56STE4blNlcnZpY2VcbiAgKSB7fVxuXG4gIG5nT25Jbml0KCk6IHZvaWQge1xuICAgIHRoaXMuaTE4bi5sb2NhbGVDaGFuZ2UucGlwZSh0YWtlVW50aWwodGhpcy5kZXN0cm95JCkpLnN1YnNjcmliZSgoKSA9PiB7XG4gICAgICB0aGlzLmxvY2FsZSA9IHRoaXMuaTE4bi5nZXRMb2NhbGVEYXRhKCdUZXh0Jyk7XG4gICAgICB0aGlzLnVwZGF0ZVRvb2x0aXBzKCk7XG4gICAgICB0aGlzLmNkci5tYXJrRm9yQ2hlY2soKTtcbiAgICB9KTtcbiAgfVxuXG4gIG5nT25DaGFuZ2VzKGNoYW5nZXM6IFNpbXBsZUNoYW5nZXMpOiB2b2lkIHtcbiAgICBjb25zdCB7IHRvb2x0aXBzLCBpY29ucyB9ID0gY2hhbmdlcztcbiAgICBpZiAodG9vbHRpcHMpIHtcbiAgICAgIHRoaXMudXBkYXRlVG9vbHRpcHMoKTtcbiAgICB9XG4gICAgaWYgKGljb25zKSB7XG4gICAgICB0aGlzLnVwZGF0ZUljb25zKCk7XG4gICAgfVxuICB9XG5cbiAgbmdPbkRlc3Ryb3koKTogdm9pZCB7XG4gICAgY2xlYXJUaW1lb3V0KHRoaXMuY29weUlkKTtcbiAgICB0aGlzLmRlc3Ryb3kkLm5leHQoKTtcbiAgICB0aGlzLmRlc3Ryb3kkLmNvbXBsZXRlKCk7XG4gIH1cblxuICBvbkNsaWNrKCk6IHZvaWQge1xuICAgIGlmICh0aGlzLmNvcGllZCkge1xuICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICB0aGlzLmNvcGllZCA9IHRydWU7XG4gICAgdGhpcy5jZHIuZGV0ZWN0Q2hhbmdlcygpO1xuICAgIGNvbnN0IHRleHQgPSB0aGlzLnRleHQ7XG4gICAgdGhpcy50ZXh0Q29weS5lbWl0KHRleHQpO1xuICAgIHRoaXMuY2xpcGJvYXJkLmNvcHkodGV4dCk7XG4gICAgdGhpcy5vbkNvcGllZCgpO1xuICB9XG5cbiAgb25Db3BpZWQoKTogdm9pZCB7XG4gICAgY2xlYXJUaW1lb3V0KHRoaXMuY29weUlkKTtcbiAgICB0aGlzLmNvcHlJZCA9IHNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgdGhpcy5jb3BpZWQgPSBmYWxzZTtcbiAgICAgIHRoaXMuY2RyLmRldGVjdENoYW5nZXMoKTtcbiAgICB9LCAzMDAwKTtcbiAgfVxuXG4gIHByaXZhdGUgdXBkYXRlVG9vbHRpcHMoKTogdm9pZCB7XG4gICAgaWYgKHRoaXMudG9vbHRpcHMgPT09IG51bGwpIHtcbiAgICAgIHRoaXMuY29wZWRUb29sdGlwID0gbnVsbDtcbiAgICAgIHRoaXMuY29weVRvb2x0aXAgPSBudWxsO1xuICAgIH0gZWxzZSBpZiAoQXJyYXkuaXNBcnJheSh0aGlzLnRvb2x0aXBzKSkge1xuICAgICAgY29uc3QgW2NvcHlUb29sdGlwLCBjb3BlZFRvb2x0aXBdID0gdGhpcy50b29sdGlwcztcbiAgICAgIHRoaXMuY29weVRvb2x0aXAgPSBjb3B5VG9vbHRpcCB8fCB0aGlzLmxvY2FsZT8uY29weTtcbiAgICAgIHRoaXMuY29wZWRUb29sdGlwID0gY29wZWRUb29sdGlwIHx8IHRoaXMubG9jYWxlPy5jb3BpZWQ7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMuY29weVRvb2x0aXAgPSB0aGlzLmxvY2FsZT8uY29weTtcbiAgICAgIHRoaXMuY29wZWRUb29sdGlwID0gdGhpcy5sb2NhbGU/LmNvcGllZDtcbiAgICB9XG4gICAgdGhpcy5jZHIubWFya0ZvckNoZWNrKCk7XG4gIH1cblxuICBwcml2YXRlIHVwZGF0ZUljb25zKCk6IHZvaWQge1xuICAgIGNvbnN0IFtjb3B5SWNvbiwgY29wZWRJY29uXSA9IHRoaXMuaWNvbnM7XG4gICAgdGhpcy5jb3B5SWNvbiA9IGNvcHlJY29uO1xuICAgIHRoaXMuY29wZWRJY29uID0gY29wZWRJY29uO1xuICAgIHRoaXMuY2RyLm1hcmtGb3JDaGVjaygpO1xuICB9XG59XG4iXX0=