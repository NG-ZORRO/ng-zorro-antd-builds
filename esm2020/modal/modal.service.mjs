import { OverlayConfig, OverlayRef } from '@angular/cdk/overlay';
import { ComponentPortal, TemplatePortal } from '@angular/cdk/portal';
import { Injectable, Injector, Optional, SkipSelf, TemplateRef } from '@angular/core';
import { defer, Subject } from 'rxjs';
import { startWith } from 'rxjs/operators';
import { warn } from 'ng-zorro-antd/core/logger';
import { isNotNil } from 'ng-zorro-antd/core/util';
import { MODAL_MASK_CLASS_NAME, NZ_CONFIG_MODULE_NAME } from './modal-config';
import { NzModalConfirmContainerComponent } from './modal-confirm-container.component';
import { NzModalContainerComponent } from './modal-container.component';
import { NzModalRef } from './modal-ref';
import { ModalOptions } from './modal-types';
import { applyConfigDefaults, getValueWithConfig, setContentInstanceParams } from './utils';
import * as i0 from "@angular/core";
import * as i1 from "@angular/cdk/overlay";
import * as i2 from "ng-zorro-antd/core/config";
import * as i3 from "@angular/cdk/bidi";
export class NzModalService {
    constructor(overlay, injector, nzConfigService, parentModal, directionality) {
        this.overlay = overlay;
        this.injector = injector;
        this.nzConfigService = nzConfigService;
        this.parentModal = parentModal;
        this.directionality = directionality;
        this.openModalsAtThisLevel = [];
        this.afterAllClosedAtThisLevel = new Subject();
        this.afterAllClose = defer(() => this.openModals.length ? this._afterAllClosed : this._afterAllClosed.pipe(startWith(undefined)));
    }
    get openModals() {
        return this.parentModal ? this.parentModal.openModals : this.openModalsAtThisLevel;
    }
    get _afterAllClosed() {
        const parent = this.parentModal;
        return parent ? parent._afterAllClosed : this.afterAllClosedAtThisLevel;
    }
    create(config) {
        return this.open(config.nzContent, config);
    }
    closeAll() {
        this.closeModals(this.openModals);
    }
    confirm(options = {}, confirmType = 'confirm') {
        if ('nzFooter' in options) {
            warn(`The Confirm-Modal doesn't support "nzFooter", this property will be ignored.`);
        }
        if (!('nzWidth' in options)) {
            options.nzWidth = 416;
        }
        if (!('nzMaskClosable' in options)) {
            options.nzMaskClosable = false;
        }
        options.nzModalType = 'confirm';
        options.nzClassName = `ant-modal-confirm ant-modal-confirm-${confirmType} ${options.nzClassName || ''}`;
        return this.create(options);
    }
    info(options = {}) {
        return this.confirmFactory(options, 'info');
    }
    success(options = {}) {
        return this.confirmFactory(options, 'success');
    }
    error(options = {}) {
        return this.confirmFactory(options, 'error');
    }
    warning(options = {}) {
        return this.confirmFactory(options, 'warning');
    }
    open(componentOrTemplateRef, config) {
        const configMerged = applyConfigDefaults(config || {}, new ModalOptions());
        const overlayRef = this.createOverlay(configMerged);
        const modalContainer = this.attachModalContainer(overlayRef, configMerged);
        const modalRef = this.attachModalContent(componentOrTemplateRef, modalContainer, overlayRef, configMerged);
        modalContainer.modalRef = modalRef;
        this.openModals.push(modalRef);
        modalRef.afterClose.subscribe(() => this.removeOpenModal(modalRef));
        return modalRef;
    }
    removeOpenModal(modalRef) {
        const index = this.openModals.indexOf(modalRef);
        if (index > -1) {
            this.openModals.splice(index, 1);
            if (!this.openModals.length) {
                this._afterAllClosed.next();
            }
        }
    }
    closeModals(dialogs) {
        let i = dialogs.length;
        while (i--) {
            dialogs[i].close();
            if (!this.openModals.length) {
                this._afterAllClosed.next();
            }
        }
    }
    createOverlay(config) {
        const globalConfig = this.nzConfigService.getConfigForComponent(NZ_CONFIG_MODULE_NAME) || {};
        const overlayConfig = new OverlayConfig({
            hasBackdrop: true,
            scrollStrategy: this.overlay.scrollStrategies.block(),
            positionStrategy: this.overlay.position().global(),
            disposeOnNavigation: getValueWithConfig(config.nzCloseOnNavigation, globalConfig.nzCloseOnNavigation, true),
            direction: getValueWithConfig(config.nzDirection, globalConfig.nzDirection, this.directionality.value)
        });
        if (getValueWithConfig(config.nzMask, globalConfig.nzMask, true)) {
            overlayConfig.backdropClass = MODAL_MASK_CLASS_NAME;
        }
        return this.overlay.create(overlayConfig);
    }
    attachModalContainer(overlayRef, config) {
        const userInjector = config && config.nzViewContainerRef && config.nzViewContainerRef.injector;
        const injector = Injector.create({
            parent: userInjector || this.injector,
            providers: [
                { provide: OverlayRef, useValue: overlayRef },
                { provide: ModalOptions, useValue: config }
            ]
        });
        const ContainerComponent = config.nzModalType === 'confirm'
            ? // If the mode is `confirm`, use `NzModalConfirmContainerComponent`
                NzModalConfirmContainerComponent
            : // If the mode is not `confirm`, use `NzModalContainerComponent`
                NzModalContainerComponent;
        const containerPortal = new ComponentPortal(ContainerComponent, config.nzViewContainerRef, injector);
        const containerRef = overlayRef.attach(containerPortal);
        return containerRef.instance;
    }
    attachModalContent(componentOrTemplateRef, modalContainer, overlayRef, config) {
        const modalRef = new NzModalRef(overlayRef, config, modalContainer);
        if (componentOrTemplateRef instanceof TemplateRef) {
            modalContainer.attachTemplatePortal(new TemplatePortal(componentOrTemplateRef, null, {
                $implicit: config.nzComponentParams,
                modalRef
            }));
        }
        else if (isNotNil(componentOrTemplateRef) && typeof componentOrTemplateRef !== 'string') {
            const injector = this.createInjector(modalRef, config);
            const contentRef = modalContainer.attachComponentPortal(new ComponentPortal(componentOrTemplateRef, config.nzViewContainerRef, injector));
            setContentInstanceParams(contentRef.instance, config.nzComponentParams);
            modalRef.componentInstance = contentRef.instance;
        }
        else {
            modalContainer.attachStringContent();
        }
        return modalRef;
    }
    createInjector(modalRef, config) {
        const userInjector = config && config.nzViewContainerRef && config.nzViewContainerRef.injector;
        return Injector.create({
            parent: userInjector || this.injector,
            providers: [{ provide: NzModalRef, useValue: modalRef }]
        });
    }
    confirmFactory(options = {}, confirmType) {
        const iconMap = {
            info: 'info-circle',
            success: 'check-circle',
            error: 'close-circle',
            warning: 'exclamation-circle'
        };
        if (!('nzIconType' in options)) {
            options.nzIconType = iconMap[confirmType];
        }
        if (!('nzCancelText' in options)) {
            // Remove the Cancel button if the user not specify a Cancel button
            options.nzCancelText = null;
        }
        return this.confirm(options, confirmType);
    }
    ngOnDestroy() {
        this.closeModals(this.openModalsAtThisLevel);
        this.afterAllClosedAtThisLevel.complete();
    }
}
NzModalService.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.1.2", ngImport: i0, type: NzModalService, deps: [{ token: i1.Overlay }, { token: i0.Injector }, { token: i2.NzConfigService }, { token: NzModalService, optional: true, skipSelf: true }, { token: i3.Directionality, optional: true }], target: i0.ɵɵFactoryTarget.Injectable });
NzModalService.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "13.1.2", ngImport: i0, type: NzModalService });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.1.2", ngImport: i0, type: NzModalService, decorators: [{
            type: Injectable
        }], ctorParameters: function () { return [{ type: i1.Overlay }, { type: i0.Injector }, { type: i2.NzConfigService }, { type: NzModalService, decorators: [{
                    type: Optional
                }, {
                    type: SkipSelf
                }] }, { type: i3.Directionality, decorators: [{
                    type: Optional
                }] }]; } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kYWwuc2VydmljZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL2NvbXBvbmVudHMvbW9kYWwvbW9kYWwuc2VydmljZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFNQSxPQUFPLEVBQTBCLGFBQWEsRUFBRSxVQUFVLEVBQUUsTUFBTSxzQkFBc0IsQ0FBQztBQUN6RixPQUFPLEVBQUUsZUFBZSxFQUFFLGNBQWMsRUFBRSxNQUFNLHFCQUFxQixDQUFDO0FBQ3RFLE9BQU8sRUFBRSxVQUFVLEVBQUUsUUFBUSxFQUFhLFFBQVEsRUFBRSxRQUFRLEVBQUUsV0FBVyxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQ2pHLE9BQU8sRUFBRSxLQUFLLEVBQWMsT0FBTyxFQUFFLE1BQU0sTUFBTSxDQUFDO0FBQ2xELE9BQU8sRUFBRSxTQUFTLEVBQUUsTUFBTSxnQkFBZ0IsQ0FBQztBQUczQyxPQUFPLEVBQUUsSUFBSSxFQUFFLE1BQU0sMkJBQTJCLENBQUM7QUFFakQsT0FBTyxFQUFFLFFBQVEsRUFBRSxNQUFNLHlCQUF5QixDQUFDO0FBRW5ELE9BQU8sRUFBRSxxQkFBcUIsRUFBRSxxQkFBcUIsRUFBRSxNQUFNLGdCQUFnQixDQUFDO0FBQzlFLE9BQU8sRUFBRSxnQ0FBZ0MsRUFBRSxNQUFNLHFDQUFxQyxDQUFDO0FBQ3ZGLE9BQU8sRUFBRSx5QkFBeUIsRUFBRSxNQUFNLDZCQUE2QixDQUFDO0FBRXhFLE9BQU8sRUFBRSxVQUFVLEVBQUUsTUFBTSxhQUFhLENBQUM7QUFDekMsT0FBTyxFQUFlLFlBQVksRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUMxRCxPQUFPLEVBQUUsbUJBQW1CLEVBQUUsa0JBQWtCLEVBQUUsd0JBQXdCLEVBQUUsTUFBTSxTQUFTLENBQUM7Ozs7O0FBSzVGLE1BQU0sT0FBTyxjQUFjO0lBaUJ6QixZQUNVLE9BQWdCLEVBQ2hCLFFBQWtCLEVBQ2xCLGVBQWdDLEVBQ1IsV0FBMkIsRUFDdkMsY0FBOEI7UUFKMUMsWUFBTyxH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LENBQUMsWUFBWSxHQUFHLElBQUksQ0FBQztTQUM3QjtRQUNELE9BQU8sSUFBSSxDQUFDLE9BQU8sQ0FBQyxPQUFPLEVBQUUsV0FBVyxDQUFDLENBQUM7SUFDNUMsQ0FBQztJQUVELFdBQVc7UUFDVCxJQUFJLENBQUMsV0FBVyxDQUFDLElBQUksQ0FBQyxxQkFBcUIsQ0FBQyxDQUFDO1FBQzdDLElBQUksQ0FBQyx5QkFBeUIsQ0FBQyxRQUFRLEVBQUUsQ0FBQztJQUM1QyxDQUFDOzsyR0F2TVUsY0FBYyxnR0FxQnNCLGNBQWM7K0dBckJsRCxjQUFjOzJGQUFkLGNBQWM7a0JBRDFCLFVBQVU7cUlBc0JzQyxjQUFjOzBCQUExRCxRQUFROzswQkFBSSxRQUFROzswQkFDcEIsUUFBUSIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxuICogVXNlIG9mIHRoaXMgc291cmNlIGNvZGUgaXMgZ292ZXJuZWQgYnkgYW4gTUlULXN0eWxlIGxpY2Vuc2UgdGhhdCBjYW4gYmVcbiAqIGZvdW5kIGluIHRoZSBMSUNFTlNFIGZpbGUgYXQgaHR0cHM6Ly9naXRodWIuY29tL05HLVpPUlJPL25nLXpvcnJvLWFudGQvYmxvYi9tYXN0ZXIvTElDRU5TRVxuICovXG5cbmltcG9ydCB7IERpcmVjdGlvbmFsaXR5IH0gZnJvbSAnQGFuZ3VsYXIvY2RrL2JpZGknO1xuaW1wb3J0IHsgQ29tcG9uZW50VHlwZSwgT3ZlcmxheSwgT3ZlcmxheUNvbmZpZywgT3ZlcmxheVJlZiB9IGZyb20gJ0Bhbmd1bGFyL2Nkay9vdmVybGF5JztcbmltcG9ydCB7IENvbXBvbmVudFBvcnRhbCwgVGVtcGxhdGVQb3J0YWwgfSBmcm9tICdAYW5ndWxhci9jZGsvcG9ydGFsJztcbmltcG9ydCB7IEluamVjdGFibGUsIEluamVjdG9yLCBPbkRlc3Ryb3ksIE9wdGlvbmFsLCBTa2lwU2VsZiwgVGVtcGxhdGVSZWYgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IGRlZmVyLCBPYnNlcnZhYmxlLCBTdWJqZWN0IH0gZnJvbSAncnhqcyc7XG5pbXBvcnQgeyBzdGFydFdpdGggfSBmcm9tICdyeGpzL29wZXJhdG9ycyc7XG5cbmltcG9ydCB7IE56Q29uZmlnU2VydmljZSB9IGZyb20gJ25nLXpvcnJvLWFudGQvY29yZS9jb25maWcnO1xuaW1wb3J0IHsgd2FybiB9IGZyb20gJ25nLXpvcnJvLWFudGQvY29yZS9sb2dnZXInO1xuaW1wb3J0IHsgSW5kZXhhYmxlT2JqZWN0LCBOelNhZmVBbnkgfSBmcm9tICduZy16b3Jyby1hbnRkL2NvcmUvdHlwZXMnO1xuaW1wb3J0IHsgaXNOb3ROaWwgfSBmcm9tICduZy16b3Jyby1hbnRkL2NvcmUvdXRpbCc7XG5cbmltcG9ydCB7IE1PREFMX01BU0tfQ0xBU1NfTkFNRSwgTlpfQ09ORklHX01PRFVMRV9OQU1FIH0gZnJvbSAnLi9tb2RhbC1jb25maWcnO1xuaW1wb3J0IHsgTnpNb2RhbENvbmZpcm1Db250YWluZXJDb21wb25lbnQgfSBmcm9tICcuL21vZGFsLWNvbmZpcm0tY29udGFpbmVyLmNvbXBvbmVudCc7XG5pbXBvcnQgeyBOek1vZGFsQ29udGFpbmVyQ29tcG9uZW50IH0gZnJvbSAnLi9tb2RhbC1jb250YWluZXIuY29tcG9uZW50JztcbmltcG9ydCB7IEJhc2VNb2RhbENvbnRhaW5lckNvbXBvbmVudCB9IGZyb20gJy4vbW9kYWwtY29udGFpbmVyLmRpcmVjdGl2ZSc7XG5pbXBvcnQgeyBOek1vZGFsUmVmIH0gZnJvbSAnLi9tb2RhbC1yZWYnO1xuaW1wb3J0IHsgQ29uZmlybVR5cGUsIE1vZGFsT3B0aW9ucyB9IGZyb20gJy4vbW9kYWwtdHlwZXMnO1xuaW1wb3J0IHsgYXBwbHlDb25maWdEZWZhdWx0cywgZ2V0VmFsdWVXaXRoQ29uZmlnLCBzZXRDb250ZW50SW5zdGFuY2VQYXJhbXMgfSBmcm9tICcuL3V0aWxzJztcblxudHlwZSBDb250ZW50VHlwZTxUPiA9IENvbXBvbmVudFR5cGU8VD4gfCBUZW1wbGF0ZVJlZjxUPiB8IHN0cmluZztcblxuQEluamVjdGFibGUoKVxuZXhwb3J0IGNsYXNzIE56TW9kYWxTZXJ2aWNlIGltcGxlbWVudHMgT25EZXN0cm95IHtcbiAgcHJpdmF0ZSBvcGVuTW9kYWxzQXRUaGlzTGV2ZWw6IE56TW9kYWxSZWZbXSA9IFtdO1xuICBwcml2YXRlIHJlYWRvbmx5IGFmdGVyQWxsQ2xvc2VkQXRUaGlzTGV2ZWwgPSBuZXcgU3ViamVjdDx2b2lkPigpO1xuXG4gIGdldCBvcGVuTW9kYWxzKCk6IE56TW9kYWxSZWZbXSB7XG4gICAgcmV0dXJuIHRoaXMucGFyZW50TW9kYWwgPyB0aGlzLnBhcmVudE1vZGFsLm9wZW5Nb2RhbHMgOiB0aGlzLm9wZW5Nb2RhbHNBdFRoaXNMZXZlbDtcbiAgfVxuXG4gIGdldCBfYWZ0ZXJBbGxDbG9zZWQoKTogU3ViamVjdDx2b2lkPiB7XG4gICAgY29uc3QgcGFyZW50ID0gdGhpcy5wYXJlbnRNb2RhbDtcbiAgICByZXR1cm4gcGFyZW50ID8gcGFyZW50Ll9hZnRlckFsbENsb3NlZCA6IHRoaXMuYWZ0ZXJBbGxDbG9zZWRBdFRoaXNMZXZlbDtcbiAgfVxuXG4gIHJlYWRvbmx5IGFmdGVyQWxsQ2xvc2U6IE9ic2VydmFibGU8dm9pZD4gPSBkZWZlcigoKSA9PlxuICAgIHRoaXMub3Blbk1vZGFscy5sZW5ndGggPyB0aGlzLl9hZnRlckFsbENsb3NlZCA6IHRoaXMuX2FmdGVyQWxsQ2xvc2VkLnBpcGUoc3RhcnRXaXRoKHVuZGVmaW5lZCkpXG4gICkgYXMgT2JzZXJ2YWJsZTx2b2lkPjtcblxuICBjb25zdHJ1Y3RvcihcbiAgICBwcml2YXRlIG92ZXJsYXk6IE92ZXJsYXksXG4gICAgcHJpdmF0ZSBpbmplY3RvcjogSW5qZWN0b3IsXG4gICAgcHJpdmF0ZSBuekNvbmZpZ1NlcnZpY2U6IE56Q29uZmlnU2VydmljZSxcbiAgICBAT3B0aW9uYWwoKSBAU2tpcFNlbGYoKSBwcml2YXRlIHBhcmVudE1vZGFsOiBOek1vZGFsU2VydmljZSxcbiAgICBAT3B0aW9uYWwoKSBwcml2YXRlIGRpcmVjdGlvbmFsaXR5OiBEaXJlY3Rpb25hbGl0eVxuICApIHt9XG5cbiAgY3JlYXRlPFQsIFIgPSBOelNhZmVBbnk+KGNvbmZpZzogTW9kYWxPcHRpb25zPFQsIFI+KTogTnpNb2RhbFJlZjxULCBSPiB7XG4gICAgcmV0dXJuIHRoaXMub3BlbjxULCBSPihjb25maWcubnpDb250ZW50IGFzIENvbXBvbmVudFR5cGU8VD4sIGNvbmZpZyk7XG4gIH1cblxuICBjbG9zZUFsbCgpOiB2b2lkIHtcbiAgICB0aGlzLmNsb3NlTW9kYWxzKHRoaXMub3Blbk1vZGFscyk7XG4gIH1cblxuICBjb25maXJtPFQ+KG9wdGlvbnM6IE1vZGFsT3B0aW9uczxUPiA9IHt9LCBjb25maXJtVHlwZTogQ29uZmlybVR5cGUgPSAnY29uZmlybScpOiBOek1vZGFsUmVmPFQ+IHtcbiAgICBpZiAoJ256Rm9vdGVyJyBpbiBvcHRpb25zKSB7XG4gICAgICB3YXJuKGBUaGUgQ29uZmlybS1Nb2RhbCBkb2Vzbid0IHN1cHBvcnQgXCJuekZvb3RlclwiLCB0aGlzIHByb3BlcnR5IHdpbGwgYmUgaWdub3JlZC5gKTtcbiAgICB9XG4gICAgaWYgKCEoJ256V2lkdGgnIGluIG9wdGlvbnMpKSB7XG4gICAgICBvcHRpb25zLm56V2lkdGggPSA0MTY7XG4gICAgfVxuICAgIGlmICghKCduek1hc2tDbG9zYWJsZScgaW4gb3B0aW9ucykpIHtcbiAgICAgIG9wdGlvbnMubnpNYXNrQ2xvc2FibGUgPSBmYWxzZTtcbiAgICB9XG5cbiAgICBvcHRpb25zLm56TW9kYWxUeXBlID0gJ2NvbmZpcm0nO1xuICAgIG9wdGlvbnMubnpDbGFzc05hbWUgPSBgYW50LW1vZGFsLWNvbmZpcm0gYW50LW1vZGFsLWNvbmZpcm0tJHtjb25maXJtVHlwZX0gJHtvcHRpb25zLm56Q2xhc3NOYW1lIHx8ICcnfWA7XG4gICAgcmV0dXJuIHRoaXMuY3JlYXRlKG9wdGlvbnMpO1xuICB9XG5cbiAgaW5mbzxUPihvcHRpb25zOiBNb2RhbE9wdGlvbnM8VD4gPSB7fSk6IE56TW9kYWxSZWY8VD4ge1xuICAgIHJldHVybiB0aGlzLmNvbmZpcm1GYWN0b3J5KG9wdGlvbnMsICdpbmZvJyk7XG4gIH1cblxuICBzdWNjZXNzPFQ+KG9wdGlvbnM6IE1vZGFsT3B0aW9uczxUPiA9IHt9KTogTnpNb2RhbFJlZjxUPiB7XG4gICAgcmV0dXJuIHRoaXMuY29uZmlybUZhY3Rvcnkob3B0aW9ucywgJ3N1Y2Nlc3MnKTtcbiAgfVxuXG4gIGVycm9yPFQ+KG9wdGlvbnM6IE1vZGFsT3B0aW9uczxUPiA9IHt9KTogTnpNb2RhbFJlZjxUPiB7XG4gICAgcmV0dXJuIHRoaXMuY29uZmlybUZhY3Rvcnkob3B0aW9ucywgJ2Vycm9yJyk7XG4gIH1cblxuICB3YXJuaW5nPFQ+KG9wdGlvbnM6IE1vZGFsT3B0aW9uczxUPiA9IHt9KTogTnpNb2RhbFJlZjxUPiB7XG4gICAgcmV0dXJuIHRoaXMuY29uZmlybUZhY3Rvcnkob3B0aW9ucywgJ3dhcm5pbmcnKTtcbiAgfVxuXG4gIHByaXZhdGUgb3BlbjxULCBSPihjb21wb25lbnRPclRlbXBsYXRlUmVmOiBDb250ZW50VHlwZTxUPiwgY29uZmlnPzogTW9kYWxPcHRpb25zKTogTnpNb2RhbFJlZjxULCBSPiB7XG4gICAgY29uc3QgY29uZmlnTWVyZ2VkID0gYXBwbHlDb25maWdEZWZhdWx0cyhjb25maWcgfHwge30sIG5ldyBNb2RhbE9wdGlvbnMoKSk7XG4gICAgY29uc3Qgb3ZlcmxheVJlZiA9IHRoaXMuY3JlYXRlT3ZlcmxheShjb25maWdNZXJnZWQpO1xuICAgIGNvbnN0IG1vZGFsQ29udGFpbmVyID0gdGhpcy5hdHRhY2hNb2RhbENvbnRhaW5lcihvdmVybGF5UmVmLCBjb25maWdNZXJnZWQpO1xuICAgIGNvbnN0IG1vZGFsUmVmID0gdGhpcy5hdHRhY2hNb2RhbENvbnRlbnQ8VCwgUj4oY29tcG9uZW50T3JUZW1wbGF0ZVJlZiwgbW9kYWxDb250YWluZXIsIG92ZXJsYXlSZWYsIGNvbmZpZ01lcmdlZCk7XG4gICAgbW9kYWxDb250YWluZXIubW9kYWxSZWYgPSBtb2RhbFJlZjtcblxuICAgIHRoaXMub3Blbk1vZGFscy5wdXNoKG1vZGFsUmVmKTtcbiAgICBtb2RhbFJlZi5hZnRlckNsb3NlLnN1YnNjcmliZSgoKSA9PiB0aGlzLnJlbW92ZU9wZW5Nb2RhbChtb2RhbFJlZikpO1xuXG4gICAgcmV0dXJuIG1vZGFsUmVmO1xuICB9XG5cbiAgcHJpdmF0ZSByZW1vdmVPcGVuTW9kYWwobW9kYWxSZWY6IE56TW9kYWxSZWYpOiB2b2lkIHtcbiAgICBjb25zdCBpbmRleCA9IHRoaXMub3Blbk1vZGFscy5pbmRleE9mKG1vZGFsUmVmKTtcbiAgICBpZiAoaW5kZXggPiAtMSkge1xuICAgICAgdGhpcy5vcGVuTW9kYWxzLnNwbGljZShpbmRleCwgMSk7XG5cbiAgICAgIGlmICghdGhpcy5vcGVuTW9kYWxzLmxlbmd0aCkge1xuICAgICAgICB0aGlzLl9hZnRlckFsbENsb3NlZC5uZXh0KCk7XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgcHJpdmF0ZSBjbG9zZU1vZGFscyhkaWFsb2dzOiBOek1vZGFsUmVmW10pOiB2b2lkIHtcbiAgICBsZXQgaSA9IGRpYWxvZ3MubGVuZ3RoO1xuICAgIHdoaWxlIChpLS0pIHtcbiAgICAgIGRpYWxvZ3NbaV0uY2xvc2UoKTtcbiAgICAgIGlmICghdGhpcy5vcGVuTW9kYWxzLmxlbmd0aCkge1xuICAgICAgICB0aGlzLl9hZnRlckFsbENsb3NlZC5uZXh0KCk7XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgcHJpdmF0ZSBjcmVhdGVPdmVybGF5KGNvbmZpZzogTW9kYWxPcHRpb25zKTogT3ZlcmxheVJlZiB7XG4gICAgY29uc3QgZ2xvYmFsQ29uZmlnOiBOelNhZmVBbnkgPSB0aGlzLm56Q29uZmlnU2VydmljZS5nZXRDb25maWdGb3JDb21wb25lbnQoTlpfQ09ORklHX01PRFVMRV9OQU1FKSB8fCB7fTtcbiAgICBjb25zdCBvdmVybGF5Q29uZmlnID0gbmV3IE92ZXJsYXlDb25maWcoe1xuICAgICAgaGFzQmFja2Ryb3A6IHRydWUsXG4gICAgICBzY3JvbGxTdHJhdGVneTogdGhpcy5vdmVybGF5LnNjcm9sbFN0cmF0ZWdpZXMuYmxvY2soKSxcbiAgICAgIHBvc2l0aW9uU3RyYXRlZ3k6IHRoaXMub3ZlcmxheS5wb3NpdGlvbigpLmdsb2JhbCgpLFxuICAgICAgZGlzcG9zZU9uTmF2aWdhdGlvbjogZ2V0VmFsdWVXaXRoQ29uZmlnKGNvbmZpZy5uekNsb3NlT25OYXZpZ2F0aW9uLCBnbG9iYWxDb25maWcubnpDbG9zZU9uTmF2aWdhdGlvbiwgdHJ1ZSksXG4gICAgICBkaXJlY3Rpb246IGdldFZhbHVlV2l0aENvbmZpZyhjb25maWcubnpEaXJlY3Rpb24sIGdsb2JhbENvbmZpZy5uekRpcmVjdGlvbiwgdGhpcy5kaXJlY3Rpb25hbGl0eS52YWx1ZSlcbiAgICB9KTtcbiAgICBpZiAoZ2V0VmFsdWVXaXRoQ29uZmlnKGNvbmZpZy5uek1hc2ssIGdsb2JhbENvbmZpZy5uek1hc2ssIHRydWUpKSB7XG4gICAgICBvdmVybGF5Q29uZmlnLmJhY2tkcm9wQ2xhc3MgPSBNT0RBTF9NQVNLX0NMQVNTX05BTUU7XG4gICAgfVxuXG4gICAgcmV0dXJuIHRoaXMub3ZlcmxheS5jcmVhdGUob3ZlcmxheUNvbmZpZyk7XG4gIH1cblxuICBwcml2YXRlIGF0dGFjaE1vZGFsQ29udGFpbmVyKG92ZXJsYXlSZWY6IE92ZXJsYXlSZWYsIGNvbmZpZzogTW9kYWxPcHRpb25zKTogQmFzZU1vZGFsQ29udGFpbmVyQ29tcG9uZW50IHtcbiAgICBjb25zdCB1c2VySW5qZWN0b3IgPSBjb25maWcgJiYgY29uZmlnLm56Vmlld0NvbnRhaW5lclJlZiAmJiBjb25maWcubnpWaWV3Q29udGFpbmVyUmVmLmluamVjdG9yO1xuICAgIGNvbnN0IGluamVjdG9yID0gSW5qZWN0b3IuY3JlYXRlKHtcbiAgICAgIHBhcmVudDogdXNlckluamVjdG9yIHx8IHRoaXMuaW5qZWN0b3IsXG4gICAgICBwcm92aWRlcnM6IFtcbiAgICAgICAgeyBwcm92aWRlOiBPdmVybGF5UmVmLCB1c2VWYWx1ZTogb3ZlcmxheVJlZiB9LFxuICAgICAgICB7IHByb3ZpZGU6IE1vZGFsT3B0aW9ucywgdXNlVmFsdWU6IGNvbmZpZyB9XG4gICAgICBdXG4gICAgfSk7XG5cbiAgICBjb25zdCBDb250YWluZXJDb21wb25lbnQgPVxuICAgICAgY29uZmlnLm56TW9kYWxUeXBlID09PSAnY29uZmlybSdcbiAgICAgICAgPyAvLyBJZiB0aGUgbW9kZSBpcyBgY29uZmlybWAsIHVzZSBgTnpNb2RhbENvbmZpcm1Db250YWluZXJDb21wb25lbnRgXG4gICAgICAgICAgTnpNb2RhbENvbmZpcm1Db250YWluZXJDb21wb25lbnRcbiAgICAgICAgOiAvLyBJZiB0aGUgbW9kZSBpcyBub3QgYGNvbmZpcm1gLCB1c2UgYE56TW9kYWxDb250YWluZXJDb21wb25lbnRgXG4gICAgICAgICAgTnpNb2RhbENvbnRhaW5lckNvbXBvbmVudDtcblxuICAgIGNvbnN0IGNvbnRhaW5lclBvcnRhbCA9IG5ldyBDb21wb25lbnRQb3J0YWw8QmFzZU1vZGFsQ29udGFpbmVyQ29tcG9uZW50PihcbiAgICAgIENvbnRhaW5lckNvbXBvbmVudCxcbiAgICAgIGNvbmZpZy5uelZpZXdDb250YWluZXJSZWYsXG4gICAgICBpbmplY3RvclxuICAgICk7XG4gICAgY29uc3QgY29udGFpbmVyUmVmID0gb3ZlcmxheVJlZi5hdHRhY2g8QmFzZU1vZGFsQ29udGFpbmVyQ29tcG9uZW50Pihjb250YWluZXJQb3J0YWwpO1xuXG4gICAgcmV0dXJuIGNvbnRhaW5lclJlZi5pbnN0YW5jZTtcbiAgfVxuXG4gIHByaXZhdGUgYXR0YWNoTW9kYWxDb250ZW50PFQsIFI+KFxuICAgIGNvbXBvbmVudE9yVGVtcGxhdGVSZWY6IENvbnRlbnRUeXBlPFQ+LFxuICAgIG1vZGFsQ29udGFpbmVyOiBCYXNlTW9kYWxDb250YWluZXJDb21wb25lbnQsXG4gICAgb3ZlcmxheVJlZjogT3ZlcmxheVJlZixcbiAgICBjb25maWc6IE1vZGFsT3B0aW9uczxUPlxuICApOiBOek1vZGFsUmVmPFQsIFI+IHtcbiAgICBjb25zdCBtb2RhbFJlZiA9IG5ldyBOek1vZGFsUmVmPFQsIFI+KG92ZXJsYXlSZWYsIGNvbmZpZywgbW9kYWxDb250YWluZXIpO1xuXG4gICAgaWYgKGNvbXBvbmVudE9yVGVtcGxhdGVSZWYgaW5zdGFuY2VvZiBUZW1wbGF0ZVJlZikge1xuICAgICAgbW9kYWxDb250YWluZXIuYXR0YWNoVGVtcGxhdGVQb3J0YWwoXG4gICAgICAgIG5ldyBUZW1wbGF0ZVBvcnRhbDxUPihjb21wb25lbnRPclRlbXBsYXRlUmVmLCBudWxsISwge1xuICAgICAgICAgICRpbXBsaWNpdDogY29uZmlnLm56Q29tcG9uZW50UGFyYW1zLFxuICAgICAgICAgIG1vZGFsUmVmXG4gICAgICAgIH0gYXMgTnpTYWZlQW55KVxuICAgICAgKTtcbiAgICB9IGVsc2UgaWYgKGlzTm90TmlsKGNvbXBvbmVudE9yVGVtcGxhdGVSZWYpICYmIHR5cGVvZiBjb21wb25lbnRPclRlbXBsYXRlUmVmICE9PSAnc3RyaW5nJykge1xuICAgICAgY29uc3QgaW5qZWN0b3IgPSB0aGlzLmNyZWF0ZUluamVjdG9yPFQsIFI+KG1vZGFsUmVmLCBjb25maWcpO1xuICAgICAgY29uc3QgY29udGVudFJlZiA9IG1vZGFsQ29udGFpbmVyLmF0dGFjaENvbXBvbmVudFBvcnRhbDxUPihcbiAgICAgICAgbmV3IENvbXBvbmVudFBvcnRhbChjb21wb25lbnRPclRlbXBsYXRlUmVmLCBjb25maWcubnpWaWV3Q29udGFpbmVyUmVmLCBpbmplY3RvcilcbiAgICAgICk7XG4gICAgICBzZXRDb250ZW50SW5zdGFuY2VQYXJhbXM8VD4oY29udGVudFJlZi5pbnN0YW5jZSwgY29uZmlnLm56Q29tcG9uZW50UGFyYW1zKTtcbiAgICAgIG1vZGFsUmVmLmNvbXBvbmVudEluc3RhbmNlID0gY29udGVudFJlZi5pbnN0YW5jZTtcbiAgICB9IGVsc2Uge1xuICAgICAgbW9kYWxDb250YWluZXIuYXR0YWNoU3RyaW5nQ29udGVudCgpO1xuICAgIH1cbiAgICByZXR1cm4gbW9kYWxSZWY7XG4gIH1cblxuICBwcml2YXRlIGNyZWF0ZUluamVjdG9yPFQsIFI+KG1vZGFsUmVmOiBOek1vZGFsUmVmPFQsIFI+LCBjb25maWc6IE1vZGFsT3B0aW9uczxUPik6IEluamVjdG9yIHtcbiAgICBjb25zdCB1c2VySW5qZWN0b3IgPSBjb25maWcgJiYgY29uZmlnLm56Vmlld0NvbnRhaW5lclJlZiAmJiBjb25maWcubnpWaWV3Q29udGFpbmVyUmVmLmluamVjdG9yO1xuXG4gICAgcmV0dXJuIEluamVjdG9yLmNyZWF0ZSh7XG4gICAgICBwYXJlbnQ6IHVzZXJJbmplY3RvciB8fCB0aGlzLmluamVjdG9yLFxuICAgICAgcHJvdmlkZXJzOiBbeyBwcm92aWRlOiBOek1vZGFsUmVmLCB1c2VWYWx1ZTogbW9kYWxSZWYgfV1cbiAgICB9KTtcbiAgfVxuXG4gIHByaXZhdGUgY29uZmlybUZhY3Rvcnk8VD4ob3B0aW9uczogTW9kYWxPcHRpb25zPFQ+ID0ge30sIGNvbmZpcm1UeXBlOiBDb25maXJtVHlwZSk6IE56TW9kYWxSZWY8VD4ge1xuICAgIGNvbnN0IGljb25NYXA6IEluZGV4YWJsZU9iamVjdCA9IHtcbiAgICAgIGluZm86ICdpbmZvLWNpcmNsZScsXG4gICAgICBzdWNjZXNzOiAnY2hlY2stY2lyY2xlJyxcbiAgICAgIGVycm9yOiAnY2xvc2UtY2lyY2xlJyxcbiAgICAgIHdhcm5pbmc6ICdleGNsYW1hdGlvbi1jaXJjbGUnXG4gICAgfTtcbiAgICBpZiAoISgnbnpJY29uVHlwZScgaW4gb3B0aW9ucykpIHtcbiAgICAgIG9wdGlvbnMubnpJY29uVHlwZSA9IGljb25NYXBbY29uZmlybVR5cGVdO1xuICAgIH1cbiAgICBpZiAoISgnbnpDYW5jZWxUZXh0JyBpbiBvcHRpb25zKSkge1xuICAgICAgLy8gUmVtb3ZlIHRoZSBDYW5jZWwgYnV0dG9uIGlmIHRoZSB1c2VyIG5vdCBzcGVjaWZ5IGEgQ2FuY2VsIGJ1dHRvblxuICAgICAgb3B0aW9ucy5uekNhbmNlbFRleHQgPSBudWxsO1xuICAgIH1cbiAgICByZXR1cm4gdGhpcy5jb25maXJtKG9wdGlvbnMsIGNvbmZpcm1UeXBlKTtcbiAgfVxuXG4gIG5nT25EZXN0cm95KCk6IHZvaWQge1xuICAgIHRoaXMuY2xvc2VNb2RhbHModGhpcy5vcGVuTW9kYWxzQXRUaGlzTGV2ZWwpO1xuICAgIHRoaXMuYWZ0ZXJBbGxDbG9zZWRBdFRoaXNMZXZlbC5jb21wbGV0ZSgpO1xuICB9XG59XG4iXX0=