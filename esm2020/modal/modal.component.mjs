import { __decorate } from "tslib";
/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */
import { ChangeDetectionStrategy, Component, ContentChild, EventEmitter, Input, Output, TemplateRef } from '@angular/core';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { InputBoolean } from 'ng-zorro-antd/core/util';
import { NzModalContentDirective } from './modal-content.directive';
import { NzModalFooterDirective } from './modal-footer.directive';
import { NzModalTitleDirective } from './modal-title.directive';
import { getConfigFromComponent } from './utils';
import * as i0 from "@angular/core";
import * as i1 from "./modal.service";
export class NzModalComponent {
    constructor(cdr, modal, viewContainerRef) {
        this.cdr = cdr;
        this.modal = modal;
        this.viewContainerRef = viewContainerRef;
        this.nzVisible = false;
        this.nzClosable = true;
        this.nzOkLoading = false;
        this.nzOkDisabled = false;
        this.nzCancelDisabled = false;
        this.nzCancelLoading = false;
        this.nzKeyboard = true;
        this.nzNoAnimation = false;
        this.nzCentered = false;
        this.nzZIndex = 1000;
        this.nzWidth = 520;
        this.nzCloseIcon = 'close';
        this.nzOkType = 'primary';
        this.nzOkDanger = false;
        this.nzIconType = 'question-circle'; // Confirm Modal ONLY
        this.nzModalType = 'default';
        this.nzAutofocus = 'auto';
        // TODO(@hsuanxyz) Input will not be supported
        this.nzOnOk = new EventEmitter();
        // TODO(@hsuanxyz) Input will not be supported
        this.nzOnCancel = new EventEmitter();
        this.nzAfterOpen = new EventEmitter();
        this.nzAfterClose = new EventEmitter();
        this.nzVisibleChange = new EventEmitter();
        this.modalRef = null;
        this.destroy$ = new Subject();
    }
    set modalTitle(value) {
        if (value) {
            this.setTitleWithTemplate(value);
        }
    }
    set modalFooter(value) {
        if (value) {
            this.setFooterWithTemplate(value);
        }
    }
    get afterOpen() {
        // Observable alias for nzAfterOpen
        return this.nzAfterOpen.asObservable();
    }
    get afterClose() {
        // Observable alias for nzAfterClose
        return this.nzAfterClose.asObservable();
    }
    open() {
        if (!this.nzVisible) {
            this.nzVisible = true;
            this.nzVisibleChange.emit(true);
        }
        if (!this.modalRef) {
            const config = this.getConfig();
            this.modalRef = this.modal.create(config);
            // When the modal is implicitly closed (e.g. closeAll) the nzVisible needs to be set to the correct value and emit.
            this.modalRef.afterClose
                .asObservable()
                .pipe(takeUntil(this.destroy$))
                .subscribe(() => {
                this.close();
            });
        }
    }
    close(result) {
        if (this.nzVisible) {
            this.nzVisible = false;
            this.nzVisibleChange.emit(false);
        }
        if (this.modalRef) {
            this.modalRef.close(result);
            this.modalRef = null;
        }
    }
    destroy(result) {
        this.close(result);
    }
    triggerOk() {
        this.modalRef?.triggerOk();
    }
    triggerCancel() {
        this.modalRef?.triggerCancel();
    }
    getContentComponent() {
        return this.modalRef?.getContentComponent();
    }
    getElement() {
        return this.modalRef?.getElement();
    }
    getModalRef() {
        return this.modalRef;
    }
    setTitleWithTemplate(templateRef) {
        this.nzTitle = templateRef;
        if (this.modalRef) {
            // If modalRef already created, set the title in next tick
            Promise.resolve().then(() => {
                this.modalRef.updateConfig({
                    nzTitle: this.nzTitle
                });
            });
        }
    }
    setFooterWithTemplate(templateRef) {
        this.nzFooter = templateRef;
        if (this.modalRef) {
            // If modalRef already created, set the footer in next tick
            Promise.resolve().then(() => {
                this.modalRef.updateConfig({
                    nzFooter: this.nzFooter
                });
            });
        }
        this.cdr.markForCheck();
    }
    getConfig() {
        const componentConfig = getConfigFromComponent(this);
        componentConfig.nzViewContainerRef = this.viewContainerRef;
        componentConfig.nzContent = this.nzContent || this.contentFromContentChild;
        return componentConfig;
    }
    ngOnChanges(changes) {
        const { nzVisible, ...otherChanges } = changes;
        if (Object.keys(otherChanges).length && this.modalRef) {
            this.modalRef.updateConfig(getConfigFromComponent(this));
        }
        if (nzVisible) {
            if (this.nzVisible) {
                this.open();
            }
            else {
                this.close();
            }
        }
    }
    ngOnDestroy() {
        this.modalRef?._finishDialogClose();
        this.destroy$.next();
        this.destroy$.complete();
    }
}
NzModalComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.1.2", ngImport: i0, type: NzModalComponent, deps: [{ token: i0.ChangeDetectorRef }, { token: i1.NzModalService }, { token: i0.ViewContainerRef }], target: i0.ɵɵFactoryTarget.Component });
NzModalComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "13.1.2", type: NzModalComponent, selector: "nz-modal", inputs: { nzMask: "nzMask", nzMaskClosable: "nzMaskClosable", nzCloseOnNavigation: "nzCloseOnNavigation", nzVisible: "nzVisible", nzClosable: "nzClosable", nzOkLoading: "nzOkLoading", nzOkDisabled: "nzOkDisabled", nzCancelDisabled: "nzCancelDisabled", nzCancelLoading: "nzCancelLoading", nzKeyboard: "nzKeyboard", nzNoAnimation: "nzNoAnimation", nzCentered: "nzCentered", nzContent: "nzContent", nzComponentParams: "nzComponentParams", nzFooter: "nzFooter", nzZIndex: "nzZIndex", nzWidth: "nzWidth", nzWrapClassName: "nzWrapClassName", nzClassName: "nzClassName", nzStyle: "nzStyle", nzTitle: "nzTitle", nzCloseIcon: "nzCloseIcon", nzMaskStyle: "nzMaskStyle", nzBodyStyle: "nzBodyStyle", nzOkText: "nzOkText", nzCancelText: "nzCancelText", nzOkType: "nzOkType", nzOkDanger: "nzOkDanger", nzIconType: "nzIconType", nzModalType: "nzModalType", nzAutofocus: "nzAutofocus", nzOnOk: "nzOnOk", nzOnCancel: "nzOnCancel" }, outputs: { nzOnOk: "nzOnOk", nzOnCancel: "nzOnCancel", nzAfterOpen: "nzAfterOpen", nzAfterClose: "nzAfterClose", nzVisibleChange: "nzVisibleChange" }, queries: [{ propertyName: "modalTitle", first: true, predicate: NzModalTitleDirective, descendants: true, read: TemplateRef, static: true }, { propertyName: "contentFromContentChild", first: true, predicate: NzModalContentDirective, descendants: true, read: TemplateRef, static: true }, { propertyName: "modalFooter", first: true, predicate: NzModalFooterDirective, descendants: true, read: TemplateRef, static: true }], exportAs: ["nzModal"], usesOnChanges: true, ngImport: i0, template: ``, isInline: true, changeDetection: i0.ChangeDetectionStrategy.OnPush });
__decorate([
    InputBoolean()
], NzModalComponent.prototype, "nzMask", void 0);
__decorate([
    InputBoolean()
], NzModalComponent.prototype, "nzMaskClosable", void 0);
__decorate([
    InputBoolean()
], NzModalComponent.prototype, "nzCloseOnNavigation", void 0);
__decorate([
    InputBoolean()
], NzModalComponent.prototype, "nzVisible", void 0);
__decorate([
    InputBoolean()
], NzModalComponent.prototype, "nzClosable", void 0);
__decorate([
    InputBoolean()
], NzModalComponent.prototype, "nzOkLoading", void 0);
__decorate([
    InputBoolean()
], NzModalComponent.prototype, "nzOkDisabled", void 0);
__decorate([
    InputBoolean()
], NzModalComponent.prototype, "nzCancelDisabled", void 0);
__decorate([
    InputBoolean()
], NzModalComponent.prototype, "nzCancelLoading", void 0);
__decorate([
    InputBoolean()
], NzModalComponent.prototype, "nzKeyboard", void 0);
__decorate([
    InputBoolean()
], NzModalComponent.prototype, "nzNoAnimation", void 0);
__decorate([
    InputBoolean()
], NzModalComponent.prototype, "nzCentered", void 0);
__decorate([
    InputBoolean()
], NzModalComponent.prototype, "nzOkDanger", void 0);
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.1.2", ngImport: i0, type: NzModalComponent, decorators: [{
            type: Component,
            args: [{
                    selector: 'nz-modal',
                    exportAs: 'nzModal',
                    template: ``,
                    changeDetection: ChangeDetectionStrategy.OnPush
                }]
        }], ctorParameters: function () { return [{ type: i0.ChangeDetectorRef }, { type: i1.NzModalService }, { type: i0.ViewContainerRef }]; }, propDecorators: { nzMask: [{
                type: Input
            }], nzMaskClosable: [{
                type: Input
            }], nzCloseOnNavigation: [{
                type: Input
            }], nzVisible: [{
                type: Input
            }], nzClosable: [{
                type: Input
            }], nzOkLoading: [{
                type: Input
            }], nzOkDisabled: [{
                type: Input
            }], nzCancelDisabled: [{
                type: Input
            }], nzCancelLoading: [{
                type: Input
            }], nzKeyboard: [{
                type: Input
            }], nzNoAnimation: [{
                type: Input
            }], nzCentered: [{
                type: Input
            }], nzContent: [{
                type: Input
            }], nzComponentParams: [{
                type: Input
            }], nzFooter: [{
                type: Input
            }], nzZIndex: [{
                type: Input
            }], nzWidth: [{
                type: Input
            }], nzWrapClassName: [{
                type: Input
            }], nzClassName: [{
                type: Input
            }], nzStyle: [{
                type: Input
            }], nzTitle: [{
                type: Input
            }], nzCloseIcon: [{
                type: Input
            }], nzMaskStyle: [{
                type: Input
            }], nzBodyStyle: [{
                type: Input
            }], nzOkText: [{
                type: Input
            }], nzCancelText: [{
                type: Input
            }], nzOkType: [{
                type: Input
            }], nzOkDanger: [{
                type: Input
            }], nzIconType: [{
                type: Input
            }], nzModalType: [{
                type: Input
            }], nzAutofocus: [{
                type: Input
            }], nzOnOk: [{
                type: Input
            }, {
                type: Output
            }], nzOnCancel: [{
                type: Input
            }, {
                type: Output
            }], nzAfterOpen: [{
                type: Output
            }], nzAfterClose: [{
                type: Output
            }], nzVisibleChange: [{
                type: Output
            }], modalTitle: [{
                type: ContentChild,
                args: [NzModalTitleDirective, { static: true, read: TemplateRef }]
            }], contentFromContentChild: [{
                type: ContentChild,
                args: [NzModalContentDirective, { static: true, read: TemplateRef }]
            }], modalFooter: [{
                type: ContentChild,
                args: [NzModalFooterDirective, { static: true, read: TemplateRef }]
            }] } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kYWwuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vY29tcG9uZW50cy9tb2RhbC9tb2RhbC5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBOzs7R0FHRztBQUVILE9BQU8sRUFDTCx1QkFBdUIsRUFFdkIsU0FBUyxFQUNULFlBQVksRUFDWixZQUFZLEVBQ1osS0FBSyxFQUdMLE1BQU0sRUFFTixXQUFXLEVBR1osTUFBTSxlQUFlLENBQUM7QUFDdkIsT0FBTyxFQUFjLE9BQU8sRUFBRSxNQUFNLE1BQU0sQ0FBQztBQUMzQyxPQUFPLEVBQUUsU0FBUyxFQUFFLE1BQU0sZ0JBQWdCLENBQUM7QUFJM0MsT0FBTyxFQUFFLFlBQVksRUFBRSxNQUFNLHlCQUF5QixDQUFDO0FBRXZELE9BQU8sRUFBRSx1QkFBdUIsRUFBRSxNQUFNLDJCQUEyQixDQUFDO0FBQ3BFLE9BQU8sRUFBRSxzQkFBc0IsRUFBRSxNQUFNLDBCQUEwQixDQUFDO0FBR2xFLE9BQU8sRUFBRSxxQkFBcUIsRUFBRSxNQUFNLHlCQUF5QixDQUFDO0FBR2hFLE9BQU8sRUFBRSxzQkFBc0IsRUFBRSxNQUFNLFNBQVMsQ0FBQzs7O0FBUWpELE1BQU0sT0FBTyxnQkFBZ0I7SUEyRjNCLFlBQ1UsR0FBc0IsRUFDdEIsS0FBcUIsRUFDckIsZ0JBQWtDO1FBRmxDLFFBQUcsR0FBSCxHQUFHLENBQW1CO1FBQ3RCLFVBQUssR0FBTCxLQUFLLENBQWdCO1FBQ3JCLHFCQUFnQixHQUFoQixnQkFBZ0IsQ0FBa0I7UUE1RW5CLGNBQVMsR0FBWSxLQUFLLENBQUM7UUFDM0IsZUFBVSxHQUFZLElBQUksQ0FBQztRQUMzQixnQkFBVyxHQUFZLEtBQUssQ0FBQztRQUM3QixpQkFBWSxHQUFZLEtBQUssQ0FBQztRQUM5QixxQkFBZ0IsR0FBWSxLQUFLLENBQUM7UUFDbEMsb0JBQWUsR0FBWSxLQUFLLENBQUM7UUFDakMsZUFBVSxHQUFZLElBQUksQ0FB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RyxPQUFPO3NCQUFmLEtBQUs7Z0JBQ0csT0FBTztzQkFBZixLQUFLO2dCQUNHLFdBQVc7c0JBQW5CLEtBQUs7Z0JBQ0csV0FBVztzQkFBbkIsS0FBSztnQkFDRyxXQUFXO3NCQUFuQixLQUFLO2dCQUNHLFFBQVE7c0JBQWhCLEtBQUs7Z0JBQ0csWUFBWTtzQkFBcEIsS0FBSztnQkFDRyxRQUFRO3NCQUFoQixLQUFLO2dCQUNtQixVQUFVO3NCQUFsQyxLQUFLO2dCQUNHLFVBQVU7c0JBQWxCLEtBQUs7Z0JBQ0csV0FBVztzQkFBbkIsS0FBSztnQkFDRyxXQUFXO3NCQUFuQixLQUFLO2dCQUtHLE1BQU07c0JBRmQsS0FBSzs7c0JBQ0wsTUFBTTtnQkFNRSxVQUFVO3NCQUZsQixLQUFLOztzQkFDTCxNQUFNO2dCQUdZLFdBQVc7c0JBQTdCLE1BQU07Z0JBQ1ksWUFBWTtzQkFBOUIsTUFBTTtnQkFDWSxlQUFlO3NCQUFqQyxNQUFNO2dCQUdILFVBQVU7c0JBRGIsWUFBWTt1QkFBQyxxQkFBcUIsRUFBRSxFQUFFLE1BQU0sRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFLFdBQVcsRUFBRTtnQkFReEUsdUJBQXVCO3NCQUR0QixZQUFZO3VCQUFDLHVCQUF1QixFQUFFLEVBQUUsTUFBTSxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsV0FBVyxFQUFFO2dCQUl0RSxXQUFXO3NCQURkLFlBQVk7dUJBQUMsc0JBQXNCLEVBQUUsRUFBRSxNQUFNLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRSxXQUFXLEVBQUUiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqIFVzZSBvZiB0aGlzIHNvdXJjZSBjb2RlIGlzIGdvdmVybmVkIGJ5IGFuIE1JVC1zdHlsZSBsaWNlbnNlIHRoYXQgY2FuIGJlXG4gKiBmb3VuZCBpbiB0aGUgTElDRU5TRSBmaWxlIGF0IGh0dHBzOi8vZ2l0aHViLmNvbS9ORy1aT1JSTy9uZy16b3Jyby1hbnRkL2Jsb2IvbWFzdGVyL0xJQ0VOU0VcbiAqL1xuXG5pbXBvcnQge1xuICBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneSxcbiAgQ2hhbmdlRGV0ZWN0b3JSZWYsXG4gIENvbXBvbmVudCxcbiAgQ29udGVudENoaWxkLFxuICBFdmVudEVtaXR0ZXIsXG4gIElucHV0LFxuICBPbkNoYW5nZXMsXG4gIE9uRGVzdHJveSxcbiAgT3V0cHV0LFxuICBTaW1wbGVDaGFuZ2VzLFxuICBUZW1wbGF0ZVJlZixcbiAgVHlwZSxcbiAgVmlld0NvbnRhaW5lclJlZlxufSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IE9ic2VydmFibGUsIFN1YmplY3QgfSBmcm9tICdyeGpzJztcbmltcG9ydCB7IHRha2VVbnRpbCB9IGZyb20gJ3J4anMvb3BlcmF0b3JzJztcblxuaW1wb3J0IHsgTnpCdXR0b25UeXBlIH0gZnJvbSAnbmctem9ycm8tYW50ZC9idXR0b24nO1xuaW1wb3J0IHsgQm9vbGVhbklucHV0LCBOelNhZmVBbnkgfSBmcm9tICduZy16b3Jyby1hbnRkL2NvcmUvdHlwZXMnO1xuaW1wb3J0IHsgSW5wdXRCb29sZWFuIH0gZnJvbSAnbmctem9ycm8tYW50ZC9jb3JlL3V0aWwnO1xuXG5pbXBvcnQgeyBOek1vZGFsQ29udGVudERpcmVjdGl2ZSB9IGZyb20gJy4vbW9kYWwtY29udGVudC5kaXJlY3RpdmUnO1xuaW1wb3J0IHsgTnpNb2RhbEZvb3RlckRpcmVjdGl2ZSB9IGZyb20gJy4vbW9kYWwtZm9vdGVyLmRpcmVjdGl2ZSc7XG5pbXBvcnQgeyBOek1vZGFsTGVnYWN5QVBJIH0gZnJvbSAnLi9tb2RhbC1sZWdhY3ktYXBpJztcbmltcG9ydCB7IE56TW9kYWxSZWYgfSBmcm9tICcuL21vZGFsLXJlZic7XG5pbXBvcnQgeyBOek1vZGFsVGl0bGVEaXJlY3RpdmUgfSBmcm9tICcuL21vZGFsLXRpdGxlLmRpcmVjdGl2ZSc7XG5pbXBvcnQgeyBNb2RhbEJ1dHRvbk9wdGlvbnMsIE1vZGFsT3B0aW9ucywgTW9kYWxUeXBlcywgT25DbGlja0NhbGxiYWNrLCBTdHlsZU9iamVjdExpa2UgfSBmcm9tICcuL21vZGFsLXR5cGVzJztcbmltcG9ydCB7IE56TW9kYWxTZXJ2aWNlIH0gZnJvbSAnLi9tb2RhbC5zZXJ2aWNlJztcbmltcG9ydCB7IGdldENvbmZpZ0Zyb21Db21wb25lbnQgfSBmcm9tICcuL3V0aWxzJztcblxuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAnbnotbW9kYWwnLFxuICBleHBvcnRBczogJ256TW9kYWwnLFxuICB0ZW1wbGF0ZTogYGAsXG4gIGNoYW5nZURldGVjdGlvbjogQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3kuT25QdXNoXG59KVxuZXhwb3J0IGNsYXNzIE56TW9kYWxDb21wb25lbnQ8VCA9IE56U2FmZUFueSwgUiA9IE56U2FmZUFueT4gaW1wbGVtZW50cyBPbkNoYW5nZXMsIE56TW9kYWxMZWdhY3lBUEk8VCwgUj4sIE9uRGVzdHJveSB7XG4gIHN0YXRpYyBuZ0FjY2VwdElucHV0VHlwZV9uek1hc2s6IEJvb2xlYW5JbnB1dDtcbiAgc3RhdGljIG5nQWNjZXB0SW5wdXRUeXBlX256TWFza0Nsb3NhYmxlOiBCb29sZWFuSW5wdXQ7XG4gIHN0YXRpYyBuZ0FjY2VwdElucHV0VHlwZV9uekNsb3NlT25OYXZpZ2F0aW9uOiBCb29sZWFuSW5wdXQ7XG4gIHN0YXRpYyBuZ0FjY2VwdElucHV0VHlwZV9uelZpc2libGU6IEJvb2xlYW5JbnB1dDtcbiAgc3RhdGljIG5nQWNjZXB0SW5wdXRUeXBlX256Q2xvc2FibGU6IEJvb2xlYW5JbnB1dDtcbiAgc3RhdGljIG5nQWNjZXB0SW5wdXRUeXBlX256T2tMb2FkaW5nOiBCb29sZWFuSW5wdXQ7XG4gIHN0YXRpYyBuZ0FjY2VwdElucHV0VHlwZV9uek9rRGlzYWJsZWQ6IEJvb2xlYW5JbnB1dDtcbiAgc3RhdGljIG5nQWNjZXB0SW5wdXRUeXBlX256Q2FuY2VsRGlzYWJsZWQ6IEJvb2xlYW5JbnB1dDtcbiAgc3RhdGljIG5nQWNjZXB0SW5wdXRUeXBlX256Q2FuY2VsTG9hZGluZzogQm9vbGVhbklucHV0O1xuICBzdGF0aWMgbmdBY2NlcHRJbnB1dFR5cGVfbnpLZXlib2FyZDogQm9vbGVhbklucHV0O1xuICBzdGF0aWMgbmdBY2NlcHRJbnB1dFR5cGVfbnpOb0FuaW1hdGlvbjogQm9vbGVhbklucHV0O1xuICBzdGF0aWMgbmdBY2NlcHRJbnB1dFR5cGVfbnpPa0RhbmdlcjogQm9vbGVhbklucHV0O1xuICBzdGF0aWMgbmdBY2NlcHRJbnB1dFR5cGVfbnpDZW50ZXJlZDogQm9vbGVhbklucHV0O1xuXG4gIEBJbnB1dCgpIEBJbnB1dEJvb2xlYW4oKSBuek1hc2s/OiBib29sZWFuO1xuICBASW5wdXQoKSBASW5wdXRCb29sZWFuKCkgbnpNYXNrQ2xvc2FibGU/OiBib29sZWFuO1xuICBASW5wdXQoKSBASW5wdXRCb29sZWFuKCkgbnpDbG9zZU9uTmF2aWdhdGlvbj86IGJvb2xlYW47XG4gIEBJbnB1dCgpIEBJbnB1dEJvb2xlYW4oKSBuelZpc2libGU6IGJvb2xlYW4gPSBmYWxzZTtcbiAgQElucHV0KCkgQElucHV0Qm9vbGVhbigpIG56Q2xvc2FibGU6IGJvb2xlYW4gPSB0cnVlO1xuICBASW5wdXQoKSBASW5wdXRCb29sZWFuKCkgbnpPa0xvYWRpbmc6IGJvb2xlYW4gPSBmYWxzZTtcbiAgQElucHV0KCkgQElucHV0Qm9vbGVhbigpIG56T2tEaXNhYmxlZDogYm9vbGVhbiA9IGZhbHNlO1xuICBASW5wdXQoKSBASW5wdXRCb29sZWFuKCkgbnpDYW5jZWxEaXNhYmxlZDogYm9vbGVhbiA9IGZhbHNlO1xuICBASW5wdXQoKSBASW5wdXRCb29sZWFuKCkgbnpDYW5jZWxMb2FkaW5nOiBib29sZWFuID0gZmFsc2U7XG4gIEBJbnB1dCgpIEBJbnB1dEJvb2xlYW4oKSBuektleWJvYXJkOiBib29sZWFuID0gdHJ1ZTtcbiAgQElucHV0KCkgQElucHV0Qm9vbGVhbigpIG56Tm9BbmltYXRpb24gPSBmYWxzZTtcbiAgQElucHV0KCkgQElucHV0Qm9vbGVhbigpIG56Q2VudGVyZWQgPSBmYWxzZTtcbiAgQElucHV0KCkgbnpDb250ZW50Pzogc3RyaW5nIHwgVGVtcGxhdGVSZWY8e30+IHwgVHlwZTxUPjtcbiAgQElucHV0KCkgbnpDb21wb25lbnRQYXJhbXM/OiBUO1xuICBASW5wdXQoKSBuekZvb3Rlcj86IHN0cmluZyB8IFRlbXBsYXRlUmVmPHt9PiB8IEFycmF5PE1vZGFsQnV0dG9uT3B0aW9uczxUPj4gfCBudWxsO1xuICBASW5wdXQoKSBuelpJbmRleDogbnVtYmVyID0gMTAwMDtcbiAgQElucHV0KCkgbnpXaWR0aDogbnVtYmVyIHwgc3RyaW5nID0gNTIwO1xuICBASW5wdXQoKSBueldyYXBDbGFzc05hbWU/OiBzdHJpbmc7XG4gIEBJbnB1dCgpIG56Q2xhc3NOYW1lPzogc3RyaW5nO1xuICBASW5wdXQoKSBuelN0eWxlPzogb2JqZWN0O1xuICBASW5wdXQoKSBuelRpdGxlPzogc3RyaW5nIHwgVGVtcGxhdGVSZWY8e30+O1xuICBASW5wdXQoKSBuekNsb3NlSWNvbjogc3RyaW5nIHwgVGVtcGxhdGVSZWY8dm9pZD4gPSAnY2xvc2UnO1xuICBASW5wdXQoKSBuek1hc2tTdHlsZT86IFN0eWxlT2JqZWN0TGlrZTtcbiAgQElucHV0KCkgbnpCb2R5U3R5bGU/OiBTdHlsZU9iamVjdExpa2U7XG4gIEBJbnB1dCgpIG56T2tUZXh0Pzogc3RyaW5nIHwgbnVsbDtcbiAgQElucHV0KCkgbnpDYW5jZWxUZXh0Pzogc3RyaW5nIHwgbnVsbDtcbiAgQElucHV0KCkgbnpPa1R5cGU6IE56QnV0dG9uVHlwZSA9ICdwcmltYXJ5JztcbiAgQElucHV0KCkgQElucHV0Qm9vbGVhbigpIG56T2tEYW5nZXI6IGJvb2xlYW4gPSBmYWxzZTtcbiAgQElucHV0KCkgbnpJY29uVHlwZTogc3RyaW5nID0gJ3F1ZXN0aW9uLWNpcmNsZSc7IC8vIENvbmZpcm0gTW9kYWwgT05MWVxuICBASW5wdXQoKSBuek1vZGFsVHlwZTogTW9kYWxUeXBlcyA9ICdkZWZhdWx0JztcbiAgQElucHV0KCkgbnpBdXRvZm9jdXM6ICdvaycgfCAnY2FuY2VsJyB8ICdhdXRvJyB8IG51bGwgPSAnYXV0byc7XG5cbiAgLy8gVE9ETyhAaHN1YW54eXopIElucHV0IHdpbGwgbm90IGJlIHN1cHBvcnRlZFxuICBASW5wdXQoKVxuICBAT3V0cHV0KClcbiAgcmVhZG9ubHkgbnpPbk9rOiBFdmVudEVtaXR0ZXI8VD4gfCBPbkNsaWNrQ2FsbGJhY2s8VD4gfCBOelNhZmVBbnkgPSBuZXcgRXZlbnRFbWl0dGVyPFQ+KCk7XG5cbiAgLy8gVE9ETyhAaHN1YW54eXopIElucHV0IHdpbGwgbm90IGJlIHN1cHBvcnRlZFxuICBASW5wdXQoKVxuICBAT3V0cHV0KClcbiAgcmVhZG9ubHkgbnpPbkNhbmNlbDogRXZlbnRFbWl0dGVyPFQ+IHwgT25DbGlja0NhbGxiYWNrPFQ+IHwgTnpTYWZlQW55ID0gbmV3IEV2ZW50RW1pdHRlcjxUPigpO1xuXG4gIEBPdXRwdXQoKSByZWFkb25seSBuekFmdGVyT3BlbiA9IG5ldyBFdmVudEVtaXR0ZXI8dm9pZD4oKTtcbiAgQE91dHB1dCgpIHJlYWRvbmx5IG56QWZ0ZXJDbG9zZSA9IG5ldyBFdmVudEVtaXR0ZXI8Uj4oKTtcbiAgQE91dHB1dCgpIHJlYWRvbmx5IG56VmlzaWJsZUNoYW5nZSA9IG5ldyBFdmVudEVtaXR0ZXI8Ym9vbGVhbj4oKTtcblxuICBAQ29udGVudENoaWxkKE56TW9kYWxUaXRsZURpcmVjdGl2ZSwgeyBzdGF0aWM6IHRydWUsIHJlYWQ6IFRlbXBsYXRlUmVmIH0pXG4gIHNldCBtb2RhbFRpdGxlKHZhbHVlOiBUZW1wbGF0ZVJlZjxOelNhZmVBbnk+KSB7XG4gICAgaWYgKHZhbHVlKSB7XG4gICAgICB0aGlzLnNldFRpdGxlV2l0aFRlbXBsYXRlKHZhbHVlKTtcbiAgICB9XG4gIH1cblxuICBAQ29udGVudENoaWxkKE56TW9kYWxDb250ZW50RGlyZWN0aXZlLCB7IHN0YXRpYzogdHJ1ZSwgcmVhZDogVGVtcGxhdGVSZWYgfSlcbiAgY29udGVudEZyb21Db250ZW50Q2hpbGQhOiBUZW1wbGF0ZVJlZjxOelNhZmVBbnk+O1xuXG4gIEBDb250ZW50Q2hpbGQoTnpNb2RhbEZvb3RlckRpcmVjdGl2ZSwgeyBzdGF0aWM6IHRydWUsIHJlYWQ6IFRlbXBsYXRlUmVmIH0pXG4gIHNldCBtb2RhbEZvb3Rlcih2YWx1ZTogVGVtcGxhdGVSZWY8TnpTYWZlQW55Pikge1xuICAgIGlmICh2YWx1ZSkge1xuICAgICAgdGhpcy5zZXRGb290ZXJXaXRoVGVtcGxhdGUodmFsdWUpO1xuICAgIH1cbiAgfVxuXG4gIHByaXZhdGUgbW9kYWxSZWY6IE56TW9kYWxSZWYgfCBudWxsID0gbnVsbDtcbiAgcHJpdmF0ZSBkZXN0cm95JCA9IG5ldyBTdWJqZWN0PHZvaWQ+KCk7XG5cbiAgZ2V0IGFmdGVyT3BlbigpOiBPYnNlcnZhYmxlPHZvaWQ+IHtcbiAgICAvLyBPYnNlcnZhYmxlIGFsaWFzIGZvciBuekFmdGVyT3BlblxuICAgIHJldHVybiB0aGlzLm56QWZ0ZXJPcGVuLmFzT2JzZXJ2YWJsZSgpO1xuICB9XG5cbiAgZ2V0IGFmdGVyQ2xvc2UoKTogT2JzZXJ2YWJsZTxSPiB7XG4gICAgLy8gT2JzZXJ2YWJsZSBhbGlhcyBmb3IgbnpBZnRlckNsb3NlXG4gICAgcmV0dXJuIHRoaXMubnpBZnRlckNsb3NlLmFzT2JzZXJ2YWJsZSgpO1xuICB9XG5cbiAgY29uc3RydWN0b3IoXG4gICAgcHJpdmF0ZSBjZHI6IENoYW5nZURldGVjdG9yUmVmLFxuICAgIHByaXZhdGUgbW9kYWw6IE56TW9kYWxTZXJ2aWNlLFxuICAgIHByaXZhdGUgdmlld0NvbnRhaW5lclJlZjogVmlld0NvbnRhaW5lclJlZlxuICApIHt9XG5cbiAgb3BlbigpOiB2b2lkIHtcbiAgICBpZiAoIXRoaXMubnpWaXNpYmxlKSB7XG4gICAgICB0aGlzLm56VmlzaWJsZSA9IHRydWU7XG4gICAgICB0aGlzLm56VmlzaWJsZUNoYW5nZS5lbWl0KHRydWUpO1xuICAgIH1cblxuICAgIGlmICghdGhpcy5tb2RhbFJlZikge1xuICAgICAgY29uc3QgY29uZmlnID0gdGhpcy5nZXRDb25maWcoKTtcbiAgICAgIHRoaXMubW9kYWxSZWYgPSB0aGlzLm1vZGFsLmNyZWF0ZShjb25maWcpO1xuXG4gICAgICAvLyBXaGVuIHRoZSBtb2RhbCBpcyBpbXBsaWNpdGx5IGNsb3NlZCAoZS5nLiBjbG9zZUFsbCkgdGhlIG56VmlzaWJsZSBuZWVkcyB0byBiZSBzZXQgdG8gdGhlIGNvcnJlY3QgdmFsdWUgYW5kIGVtaXQuXG4gICAgICB0aGlzLm1vZGFsUmVmLmFmdGVyQ2xvc2VcbiAgICAgICAgLmFzT2JzZXJ2YWJsZSgpXG4gICAgICAgIC5waXBlKHRha2VVbnRpbCh0aGlzLmRlc3Ryb3kkKSlcbiAgICAgICAgLnN1YnNjcmliZSgoKSA9PiB7XG4gICAgICAgICAgdGhpcy5jbG9zZSgpO1xuICAgICAgICB9KTtcbiAgICB9XG4gIH1cblxuICBjbG9zZShyZXN1bHQ/OiBSKTogdm9pZCB7XG4gICAgaWYgKHRoaXMubnpWaXNpYmxlKSB7XG4gICAgICB0aGlzLm56VmlzaWJsZSA9IGZhbHNlO1xuICAgICAgdGhpcy5uelZpc2libGVDaGFuZ2UuZW1pdChmYWxzZSk7XG4gICAgfVxuXG4gICAgaWYgKHRoaXMubW9kYWxSZWYpIHtcbiAgICAgIHRoaXMubW9kYWxSZWYuY2xvc2UocmVzdWx0KTtcbiAgICAgIHRoaXMubW9kYWxSZWYgPSBudWxsO1xuICAgIH1cbiAgfVxuXG4gIGRlc3Ryb3kocmVzdWx0PzogUik6IHZvaWQge1xuICAgIHRoaXMuY2xvc2UocmVzdWx0KTtcbiAgfVxuXG4gIHRyaWdnZXJPaygpOiB2b2lkIHtcbiAgICB0aGlzLm1vZGFsUmVmPy50cmlnZ2VyT2soKTtcbiAgfVxuXG4gIHRyaWdnZXJDYW5jZWwoKTogdm9pZCB7XG4gICAgdGhpcy5tb2RhbFJlZj8udHJpZ2dlckNhbmNlbCgpO1xuICB9XG5cbiAgZ2V0Q29udGVudENvbXBvbmVudCgpOiBUIHwgdm9pZCB7XG4gICAgcmV0dXJuIHRoaXMubW9kYWxSZWY/LmdldENvbnRlbnRDb21wb25lbnQoKTtcbiAgfVxuXG4gIGdldEVsZW1lbnQoKTogSFRNTEVsZW1lbnQgfCB2b2lkIHtcbiAgICByZXR1cm4gdGhpcy5tb2RhbFJlZj8uZ2V0RWxlbWVudCgpO1xuICB9XG5cbiAgZ2V0TW9kYWxSZWYoKTogTnpNb2RhbFJlZiB8IG51bGwge1xuICAgIHJldHVybiB0aGlzLm1vZGFsUmVmO1xuICB9XG5cbiAgcHJpdmF0ZSBzZXRUaXRsZVdpdGhUZW1wbGF0ZSh0ZW1wbGF0ZVJlZjogVGVtcGxhdGVSZWY8e30+KTogdm9pZCB7XG4gICAgdGhpcy5uelRpdGxlID0gdGVtcGxhdGVSZWY7XG4gICAgaWYgKHRoaXMubW9kYWxSZWYpIHtcbiAgICAgIC8vIElmIG1vZGFsUmVmIGFscmVhZHkgY3JlYXRlZCwgc2V0IHRoZSB0aXRsZSBpbiBuZXh0IHRpY2tcbiAgICAgIFByb21pc2UucmVzb2x2ZSgpLnRoZW4oKCkgPT4ge1xuICAgICAgICB0aGlzLm1vZGFsUmVmIS51cGRhdGVDb25maWcoe1xuICAgICAgICAgIG56VGl0bGU6IHRoaXMubnpUaXRsZVxuICAgICAgICB9KTtcbiAgICAgIH0pO1xuICAgIH1cbiAgfVxuXG4gIHByaXZhdGUgc2V0Rm9vdGVyV2l0aFRlbXBsYXRlKHRlbXBsYXRlUmVmOiBUZW1wbGF0ZVJlZjx7fT4pOiB2b2lkIHtcbiAgICB0aGlzLm56Rm9vdGVyID0gdGVtcGxhdGVSZWY7XG4gICAgaWYgKHRoaXMubW9kYWxSZWYpIHtcbiAgICAgIC8vIElmIG1vZGFsUmVmIGFscmVhZHkgY3JlYXRlZCwgc2V0IHRoZSBmb290ZXIgaW4gbmV4dCB0aWNrXG4gICAgICBQcm9taXNlLnJlc29sdmUoKS50aGVuKCgpID0+IHtcbiAgICAgICAgdGhpcy5tb2RhbFJlZiEudXBkYXRlQ29uZmlnKHtcbiAgICAgICAgICBuekZvb3RlcjogdGhpcy5uekZvb3RlclxuICAgICAgICB9KTtcbiAgICAgIH0pO1xuICAgIH1cblxuICAgIHRoaXMuY2RyLm1hcmtGb3JDaGVjaygpO1xuICB9XG5cbiAgcHJpdmF0ZSBnZXRDb25maWcoKTogTW9kYWxPcHRpb25zIHtcbiAgICBjb25zdCBjb21wb25lbnRDb25maWcgPSBnZXRDb25maWdGcm9tQ29tcG9uZW50KHRoaXMpO1xuICAgIGNvbXBvbmVudENvbmZpZy5uelZpZXdDb250YWluZXJSZWYgPSB0aGlzLnZpZXdDb250YWluZXJSZWY7XG4gICAgY29tcG9uZW50Q29uZmlnLm56Q29udGVudCA9IHRoaXMubnpDb250ZW50IHx8IHRoaXMuY29udGVudEZyb21Db250ZW50Q2hpbGQ7XG4gICAgcmV0dXJuIGNvbXBvbmVudENvbmZpZztcbiAgfVxuXG4gIG5nT25DaGFuZ2VzKGNoYW5nZXM6IFNpbXBsZUNoYW5nZXMpOiB2b2lkIHtcbiAgICBjb25zdCB7IG56VmlzaWJsZSwgLi4ub3RoZXJDaGFuZ2VzIH0gPSBjaGFuZ2VzO1xuXG4gICAgaWYgKE9iamVjdC5rZXlzKG90aGVyQ2hhbmdlcykubGVuZ3RoICYmIHRoaXMubW9kYWxSZWYpIHtcbiAgICAgIHRoaXMubW9kYWxSZWYudXBkYXRlQ29uZmlnKGdldENvbmZpZ0Zyb21Db21wb25lbnQodGhpcykpO1xuICAgIH1cblxuICAgIGlmIChuelZpc2libGUpIHtcbiAgICAgIGlmICh0aGlzLm56VmlzaWJsZSkge1xuICAgICAgICB0aGlzLm9wZW4oKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHRoaXMuY2xvc2UoKTtcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICBuZ09uRGVzdHJveSgpOiB2b2lkIHtcbiAgICB0aGlzLm1vZGFsUmVmPy5fZmluaXNoRGlhbG9nQ2xvc2UoKTtcbiAgICB0aGlzLmRlc3Ryb3kkLm5leHQoKTtcbiAgICB0aGlzLmRlc3Ryb3kkLmNvbXBsZXRlKCk7XG4gIH1cbn1cbiJdfQ==