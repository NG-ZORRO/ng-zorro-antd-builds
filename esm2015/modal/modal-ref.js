import { __awaiter } from "tslib";
/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */
import { ESCAPE, hasModifierKey } from '@angular/cdk/keycodes';
import { EventEmitter } from '@angular/core';
import { isPromise } from 'ng-zorro-antd/core/util';
import { Subject } from 'rxjs';
import { filter, take } from 'rxjs/operators';
export class NzModalRef {
    constructor(overlayRef, config, containerInstance) {
        this.overlayRef = overlayRef;
        this.config = config;
        this.containerInstance = containerInstance;
        this.componentInstance = null;
        this.state = 0 /* OPEN */;
        this.afterClose = new Subject();
        this.afterOpen = new Subject();
        containerInstance.animationStateChanged
            .pipe(filter(event => event.phaseName === 'done' && event.toState === 'enter'), take(1))
            .subscribe(() => {
            this.afterOpen.next();
            this.afterOpen.complete();
            if (config.nzAfterOpen instanceof EventEmitter) {
                config.nzAfterOpen.emit();
            }
        });
        containerInstance.animationStateChanged
            .pipe(filter(event => event.phaseName === 'done' && event.toState === 'exit'), take(1))
            .subscribe(() => {
            clearTimeout(this.closeTimeout);
            this._finishDialogClose();
        });
        containerInstance.containerClick.pipe(take(1)).subscribe(() => {
            const cancelable = !this.config.nzCancelLoading && !this.config.nzOkLoading;
            if (cancelable) {
                this.trigger("cancel" /* CANCEL */);
            }
        });
        overlayRef
            .keydownEvents()
            .pipe(filter(event => {
            return (this.config.nzKeyboard &&
                !this.config.nzCancelLoading &&
                !this.config.nzOkLoading &&
                event.keyCode === ESCAPE &&
                !hasModifierKey(event));
        }))
            .subscribe(event => {
            event.preventDefault();
            this.trigger("cancel" /* CANCEL */);
        });
        containerInstance.cancelTriggered.subscribe(() => this.trigger("cancel" /* CANCEL */));
        containerInstance.okTriggered.subscribe(() => this.trigger("ok" /* OK */));
        overlayRef.detachments().subscribe(() => {
            this.afterClose.next(this.result);
            this.afterClose.complete();
            if (config.nzAfterClose instanceof EventEmitter) {
                config.nzAfterClose.emit(this.result);
            }
            this.componentInstance = null;
            this.overlayRef.dispose();
        });
    }
    getContentComponent() {
        return this.componentInstance;
    }
    getElement() {
        return this.containerInstance.getNativeElement();
    }
    destroy(result) {
        this.close(result);
    }
    triggerOk() {
        return this.trigger("ok" /* OK */);
    }
    triggerCancel() {
        return this.trigger("cancel" /* CANCEL */);
    }
    close(result) {
        this.result = result;
        this.containerInstance.animationStateChanged
            .pipe(filter(event => event.phaseName === 'start'), take(1))
            .subscribe(event => {
            this.overlayRef.detachBackdrop();
            this.closeTimeout = setTimeout(() => {
                this._finishDialogClose();
            }, event.totalTime + 100);
        });
        this.containerInstance.startExitAnimation();
        this.state = 1 /* CLOSING */;
    }
    updateConfig(config) {
        Object.assign(this.config, config);
        this.containerInstance.bindBackdropStyle();
        this.containerInstance.cdr.markForCheck();
    }
    getState() {
        return this.state;
    }
    getConfig() {
        return this.config;
    }
    getBackdropElement() {
        return this.overlayRef.backdropElement;
    }
    trigger(action) {
        return __awaiter(this, void 0, void 0, function* () {
            const trigger = { ok: this.config.nzOnOk, cancel: this.config.nzOnCancel }[action];
            const loadingKey = { ok: 'nzOkLoading', cancel: 'nzCancelLoading' }[action];
            const loading = this.config[loadingKey];
            if (loading) {
                return;
            }
            if (trigger instanceof EventEmitter) {
                trigger.emit(this.getContentComponent());
            }
            else if (typeof trigger === 'function') {
                const result = trigger(this.getContentComponent());
                if (isPromise(result)) {
                    this.config[loadingKey] = true;
                    let doClose = false;
                    try {
                        doClose = yield result;
                    }
                    finally {
                        this.config[loadingKey] = false;
                        this.closeWhitResult(doClose);
                    }
                }
                else {
                    this.closeWhitResult(result);
                }
            }
        });
    }
    closeWhitResult(result) {
        if (result !== false) {
            this.close(result);
        }
    }
    _finishDialogClose() {
        this.state = 2 /* CLOSED */;
        this.overlayRef.dispose();
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kYWwtcmVmLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vY29tcG9uZW50cy9tb2RhbC9tb2RhbC1yZWYudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBOzs7R0FHRztBQUNILE9BQU8sRUFBRSxNQUFNLEVBQUUsY0FBYyxFQUFFLE1BQU0sdUJBQXVCLENBQUM7QUFFL0QsT0FBTyxFQUFFLFlBQVksRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUU3QyxPQUFPLEVBQUUsU0FBUyxFQUFFLE1BQU0seUJBQXlCLENBQUM7QUFDcEQsT0FBTyxFQUFFLE9BQU8sRUFBRSxNQUFNLE1BQU0sQ0FBQztBQUMvQixPQUFPLEVBQUUsTUFBTSxFQUFFLElBQUksRUFBRSxNQUFNLGdCQUFnQixDQUFDO0FBaUI5QyxNQUFNLE9BQU8sVUFBVTtJQVNyQixZQUFvQixVQUFzQixFQUFVLE1BQW9CLEVBQVMsaUJBQThDO1FBQTNHLGVBQVUsR0FBVixVQUFVLENBQVk7UUFBVSxXQUFNLEdBQU4sTUFBTSxDQUFjO1FBQVMsc0JBQWlCLEdBQWpCLGlCQUFpQixDQUE2QjtRQVIvSCxzQkFBaUIsR0FBYSxJQUFJLENBQUM7UUFFbkMsVUFBSyxnQkFBbUM7UUFDeEMsZUFBVSxHQUFlLElBQUksT0FBTyxFQUFFLENBQUM7UUFDdkMsY0FBUyxHQUFrQixJQUFJLE9BQU8sRUFBRSxDQUFDO1FBS3ZDLGlCQUFpQixDQUFDLHFCQUFxQjthQUNwQyxJQUFJLENBQ0gsTUFBTSxDQUFDLEtBQUssQ0FBQyxFQUFFLENBQUMsS0FBSyxDQUFDLFNBQVMsS0FBSyxNQUFNLElBQUksS0FBSyxDQUFDLE9BQU8sS0FBSyxPQUFPLENBQUMsRUFDeEUsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUNSO2FBQ0EsU0FBUyxDQUFDLEdBQUcsRUFBRTtZQUNkLElBQUksQ0FBQyxTQUFTLENBQUMsSUFBSSxFQUFFLENBQUM7WUFDdEIsSUFBSSxDQUFDLFNBQVMsQ0FBQyxRQUFRLEVBQUUsQ0FB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TSxDQUFDLENBQUM7aUJBQzlCO2FBQ0Y7UUFDSCxDQUFDO0tBQUE7SUFFTyxlQUFlLENBQUMsTUFBaUI7UUFDdkMsSUFBSSxNQUFNLEtBQUssS0FBSyxFQUFFO1lBQ3BCLElBQUksQ0FBQyxLQUFLLENBQUMsTUFBTSxDQUFDLENBQUM7U0FDcEI7SUFDSCxDQUFDO0lBRUQsa0JBQWtCO1FBQ2hCLElBQUksQ0FBQyxLQUFLLGlCQUFzQixDQUFDO1FBQ2pDLElBQUksQ0FBQyxVQUFVLENBQUMsT0FBTyxFQUFFLENBQUM7SUFDNUIsQ0FBQztDQUNGIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKiBVc2Ugb2YgdGhpcyBzb3VyY2UgY29kZSBpcyBnb3Zlcm5lZCBieSBhbiBNSVQtc3R5bGUgbGljZW5zZSB0aGF0IGNhbiBiZVxuICogZm91bmQgaW4gdGhlIExJQ0VOU0UgZmlsZSBhdCBodHRwczovL2dpdGh1Yi5jb20vTkctWk9SUk8vbmctem9ycm8tYW50ZC9ibG9iL21hc3Rlci9MSUNFTlNFXG4gKi9cbmltcG9ydCB7IEVTQ0FQRSwgaGFzTW9kaWZpZXJLZXkgfSBmcm9tICdAYW5ndWxhci9jZGsva2V5Y29kZXMnO1xuaW1wb3J0IHsgT3ZlcmxheVJlZiB9IGZyb20gJ0Bhbmd1bGFyL2Nkay9vdmVybGF5JztcbmltcG9ydCB7IEV2ZW50RW1pdHRlciB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgTnpTYWZlQW55IH0gZnJvbSAnbmctem9ycm8tYW50ZC9jb3JlL3R5cGVzJztcbmltcG9ydCB7IGlzUHJvbWlzZSB9IGZyb20gJ25nLXpvcnJvLWFudGQvY29yZS91dGlsJztcbmltcG9ydCB7IFN1YmplY3QgfSBmcm9tICdyeGpzJztcbmltcG9ydCB7IGZpbHRlciwgdGFrZSB9IGZyb20gJ3J4anMvb3BlcmF0b3JzJztcblxuaW1wb3J0IHsgQmFzZU1vZGFsQ29udGFpbmVyQ29tcG9uZW50IH0gZnJvbSAnLi9tb2RhbC1jb250YWluZXInO1xuaW1wb3J0IHsgTnpNb2RhbExlZ2FjeUFQSSB9IGZyb20gJy4vbW9kYWwtbGVnYWN5LWFwaSc7XG5pbXBvcnQgeyBNb2RhbE9wdGlvbnMgfSBmcm9tICcuL21vZGFsLXR5cGVzJztcblxuZXhwb3J0IGNvbnN0IGVudW0gTnpNb2RhbFN0YXRlIHtcbiAgT1BFTixcbiAgQ0xPU0lORyxcbiAgQ0xPU0VEXG59XG5cbmV4cG9ydCBjb25zdCBlbnVtIE56VHJpZ2dlckFjdGlvbiB7XG4gIENBTkNFTCA9ICdjYW5jZWwnLFxuICBPSyA9ICdvaydcbn1cblxuZXhwb3J0IGNsYXNzIE56TW9kYWxSZWY8VCA9IE56U2FmZUFueSwgUiA9IE56U2FmZUFueT4gaW1wbGVtZW50cyBOek1vZGFsTGVnYWN5QVBJPFQsIFI+IHtcbiAgY29tcG9uZW50SW5zdGFuY2U6IFQgfCBudWxsID0gbnVsbDtcbiAgcmVzdWx0PzogUjtcbiAgc3RhdGU6IE56TW9kYWxTdGF0ZSA9IE56TW9kYWxTdGF0ZS5PUEVOO1xuICBhZnRlckNsb3NlOiBTdWJqZWN0PFI+ID0gbmV3IFN1YmplY3QoKTtcbiAgYWZ0ZXJPcGVuOiBTdWJqZWN0PHZvaWQ+ID0gbmV3IFN1YmplY3QoKTtcblxuICBwcml2YXRlIGNsb3NlVGltZW91dD86IG51bWJlcjtcblxuICBjb25zdHJ1Y3Rvcihwcml2YXRlIG92ZXJsYXlSZWY6IE92ZXJsYXlSZWYsIHByaXZhdGUgY29uZmlnOiBNb2RhbE9wdGlvbnMsIHB1YmxpYyBjb250YWluZXJJbnN0YW5jZTogQmFzZU1vZGFsQ29udGFpbmVyQ29tcG9uZW50KSB7XG4gICAgY29udGFpbmVySW5zdGFuY2UuYW5pbWF0aW9uU3RhdGVDaGFuZ2VkXG4gICAgICAucGlwZShcbiAgICAgICAgZmlsdGVyKGV2ZW50ID0+IGV2ZW50LnBoYXNlTmFtZSA9PT0gJ2RvbmUnICYmIGV2ZW50LnRvU3RhdGUgPT09ICdlbnRlcicpLFxuICAgICAgICB0YWtlKDEpXG4gICAgICApXG4gICAgICAuc3Vic2NyaWJlKCgpID0+IHtcbiAgICAgICAgdGhpcy5hZnRlck9wZW4ubmV4dCgpO1xuICAgICAgICB0aGlzLmFmdGVyT3Blbi5jb21wbGV0ZSgpO1xuICAgICAgICBpZiAoY29uZmlnLm56QWZ0ZXJPcGVuIGluc3RhbmNlb2YgRXZlbnRFbWl0dGVyKSB7XG4gICAgICAgICAgY29uZmlnLm56QWZ0ZXJPcGVuLmVtaXQoKTtcbiAgICAgICAgfVxuICAgICAgfSk7XG5cbiAgICBjb250YWluZXJJbnN0YW5jZS5hbmltYXRpb25TdGF0ZUNoYW5nZWRcbiAgICAgIC5waXBlKFxuICAgICAgICBmaWx0ZXIoZXZlbnQgPT4gZXZlbnQucGhhc2VOYW1lID09PSAnZG9uZScgJiYgZXZlbnQudG9TdGF0ZSA9PT0gJ2V4aXQnKSxcbiAgICAgICAgdGFrZSgxKVxuICAgICAgKVxuICAgICAgLnN1YnNjcmliZSgoKSA9PiB7XG4gICAgICAgIGNsZWFyVGltZW91dCh0aGlzLmNsb3NlVGltZW91dCk7XG4gICAgICAgIHRoaXMuX2ZpbmlzaERpYWxvZ0Nsb3NlKCk7XG4gICAgICB9KTtcblxuICAgIGNvbnRhaW5lckluc3RhbmNlLmNvbnRhaW5lckNsaWNrLnBpcGUodGFrZSgxKSkuc3Vic2NyaWJlKCgpID0+IHtcbiAgICAgIGNvbnN0IGNhbmNlbGFibGUgPSAhdGhpcy5jb25maWcubnpDYW5jZWxMb2FkaW5nICYmICF0aGlzLmNvbmZpZy5uek9rTG9hZGluZztcbiAgICAgIGlmIChjYW5jZWxhYmxlKSB7XG4gICAgICAgIHRoaXMudHJpZ2dlcihOelRyaWdnZXJBY3Rpb24uQ0FOQ0VMKTtcbiAgICAgIH1cbiAgICB9KTtcblxuICAgIG92ZXJsYXlSZWZcbiAgICAgIC5rZXlkb3duRXZlbnRzKClcbiAgICAgIC5waXBlKFxuICAgICAgICBmaWx0ZXIoZXZlbnQgPT4ge1xuICAgICAgICAgIHJldHVybiAoXG4gICAgICAgICAgICAodGhpcy5jb25maWcubnpLZXlib2FyZCBhcyBib29sZWFuKSAmJlxuICAgICAgICAgICAgIXRoaXMuY29uZmlnLm56Q2FuY2VsTG9hZGluZyAmJlxuICAgICAgICAgICAgIXRoaXMuY29uZmlnLm56T2tMb2FkaW5nICYmXG4gICAgICAgICAgICBldmVudC5rZXlDb2RlID09PSBFU0NBUEUgJiZcbiAgICAgICAgICAgICFoYXNNb2RpZmllcktleShldmVudClcbiAgICAgICAgICApO1xuICAgICAgICB9KVxuICAgICAgKVxuICAgICAgLnN1YnNjcmliZShldmVudCA9PiB7XG4gICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgIHRoaXMudHJpZ2dlcihOelRyaWdnZXJBY3Rpb24uQ0FOQ0VMKTtcbiAgICAgIH0pO1xuXG4gICAgY29udGFpbmVySW5zdGFuY2UuY2FuY2VsVHJpZ2dlcmVkLnN1YnNjcmliZSgoKSA9PiB0aGlzLnRyaWdnZXIoTnpUcmlnZ2VyQWN0aW9uLkNBTkNFTCkpO1xuXG4gICAgY29udGFpbmVySW5zdGFuY2Uub2tUcmlnZ2VyZWQuc3Vic2NyaWJlKCgpID0+IHRoaXMudHJpZ2dlcihOelRyaWdnZXJBY3Rpb24uT0spKTtcblxuICAgIG92ZXJsYXlSZWYuZGV0YWNobWVudHMoKS5zdWJzY3JpYmUoKCkgPT4ge1xuICAgICAgdGhpcy5hZnRlckNsb3NlLm5leHQodGhpcy5yZXN1bHQpO1xuICAgICAgdGhpcy5hZnRlckNsb3NlLmNvbXBsZXRlKCk7XG4gICAgICBpZiAoY29uZmlnLm56QWZ0ZXJDbG9zZSBpbnN0YW5jZW9mIEV2ZW50RW1pdHRlcikge1xuICAgICAgICBjb25maWcubnpBZnRlckNsb3NlLmVtaXQodGhpcy5yZXN1bHQpO1xuICAgICAgfVxuICAgICAgdGhpcy5jb21wb25lbnRJbnN0YW5jZSA9IG51bGw7XG4gICAgICB0aGlzLm92ZXJsYXlSZWYuZGlzcG9zZSgpO1xuICAgIH0pO1xuICB9XG5cbiAgZ2V0Q29udGVudENvbXBvbmVudCgpOiBUIHtcbiAgICByZXR1cm4gdGhpcy5jb21wb25lbnRJbnN0YW5jZSBhcyBUO1xuICB9XG5cbiAgZ2V0RWxlbWVudCgpOiBIVE1MRWxlbWVudCB7XG4gICAgcmV0dXJuIHRoaXMuY29udGFpbmVySW5zdGFuY2UuZ2V0TmF0aXZlRWxlbWVudCgpO1xuICB9XG5cbiAgZGVzdHJveShyZXN1bHQ/OiBSKTogdm9pZCB7XG4gICAgdGhpcy5jbG9zZShyZXN1bHQpO1xuICB9XG5cbiAgdHJpZ2dlck9rKCk6IFByb21pc2U8dm9pZD4ge1xuICAgIHJldHVybiB0aGlzLnRyaWdnZXIoTnpUcmlnZ2VyQWN0aW9uLk9LKTtcbiAgfVxuXG4gIHRyaWdnZXJDYW5jZWwoKTogUHJvbWlzZTx2b2lkPiB7XG4gICAgcmV0dXJuIHRoaXMudHJpZ2dlcihOelRyaWdnZXJBY3Rpb24uQ0FOQ0VMKTtcbiAgfVxuXG4gIGNsb3NlKHJlc3VsdD86IFIpOiB2b2lkIHtcbiAgICB0aGlzLnJlc3VsdCA9IHJlc3VsdDtcbiAgICB0aGlzLmNvbnRhaW5lckluc3RhbmNlLmFuaW1hdGlvblN0YXRlQ2hhbmdlZFxuICAgICAgLnBpcGUoXG4gICAgICAgIGZpbHRlcihldmVudCA9PiBldmVudC5waGFzZU5hbWUgPT09ICdzdGFydCcpLFxuICAgICAgICB0YWtlKDEpXG4gICAgICApXG4gICAgICAuc3Vic2NyaWJlKGV2ZW50ID0+IHtcbiAgICAgICAgdGhpcy5vdmVybGF5UmVmLmRldGFjaEJhY2tkcm9wKCk7XG4gICAgICAgIHRoaXMuY2xvc2VUaW1lb3V0ID0gc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICAgICAgdGhpcy5fZmluaXNoRGlhbG9nQ2xvc2UoKTtcbiAgICAgICAgfSwgZXZlbnQudG90YWxUaW1lICsgMTAwKTtcbiAgICAgIH0pO1xuXG4gICAgdGhpcy5jb250YWluZXJJbnN0YW5jZS5zdGFydEV4aXRBbmltYXRpb24oKTtcbiAgICB0aGlzLnN0YXRlID0gTnpNb2RhbFN0YXRlLkNMT1NJTkc7XG4gIH1cblxuICB1cGRhdGVDb25maWcoY29uZmlnOiBNb2RhbE9wdGlvbnMpOiB2b2lkIHtcbiAgICBPYmplY3QuYXNzaWduKHRoaXMuY29uZmlnLCBjb25maWcpO1xuICAgIHRoaXMuY29udGFpbmVySW5zdGFuY2UuYmluZEJhY2tkcm9wU3R5bGUoKTtcbiAgICB0aGlzLmNvbnRhaW5lckluc3RhbmNlLmNkci5tYXJrRm9yQ2hlY2soKTtcbiAgfVxuXG4gIGdldFN0YXRlKCk6IE56TW9kYWxTdGF0ZSB7XG4gICAgcmV0dXJuIHRoaXMuc3RhdGU7XG4gIH1cblxuICBnZXRDb25maWcoKTogTW9kYWxPcHRpb25zIHtcbiAgICByZXR1cm4gdGhpcy5jb25maWc7XG4gIH1cblxuICBnZXRCYWNrZHJvcEVsZW1lbnQoKTogSFRNTEVsZW1lbnQgfCBudWxsIHtcbiAgICByZXR1cm4gdGhpcy5vdmVybGF5UmVmLmJhY2tkcm9wRWxlbWVudDtcbiAgfVxuXG4gIHByaXZhdGUgYXN5bmMgdHJpZ2dlcihhY3Rpb246IE56VHJpZ2dlckFjdGlvbik6IFByb21pc2U8dm9pZD4ge1xuICAgIGNvbnN0IHRyaWdnZXIgPSB7IG9rOiB0aGlzLmNvbmZpZy5uek9uT2ssIGNhbmNlbDogdGhpcy5jb25maWcubnpPbkNhbmNlbCB9W2FjdGlvbl07XG4gICAgY29uc3QgbG9hZGluZ0tleSA9IHsgb2s6ICduek9rTG9hZGluZycsIGNhbmNlbDogJ256Q2FuY2VsTG9hZGluZycgfVthY3Rpb25dIGFzICduek9rTG9hZGluZycgfCAnbnpDYW5jZWxMb2FkaW5nJztcbiAgICBjb25zdCBsb2FkaW5nID0gdGhpcy5jb25maWdbbG9hZGluZ0tleV07XG4gICAgaWYgKGxvYWRpbmcpIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG4gICAgaWYgKHRyaWdnZXIgaW5zdGFuY2VvZiBFdmVudEVtaXR0ZXIpIHtcbiAgICAgIHRyaWdnZXIuZW1pdCh0aGlzLmdldENvbnRlbnRDb21wb25lbnQoKSk7XG4gICAgfSBlbHNlIGlmICh0eXBlb2YgdHJpZ2dlciA9PT0gJ2Z1bmN0aW9uJykge1xuICAgICAgY29uc3QgcmVzdWx0ID0gdHJpZ2dlcih0aGlzLmdldENvbnRlbnRDb21wb25lbnQoKSk7XG4gICAgICBpZiAoaXNQcm9taXNlKHJlc3VsdCkpIHtcbiAgICAgICAgdGhpcy5jb25maWdbbG9hZGluZ0tleV0gPSB0cnVlO1xuICAgICAgICBsZXQgZG9DbG9zZTogYm9vbGVhbiB8IHZvaWQgfCB7fSA9IGZhbHNlO1xuICAgICAgICB0cnkge1xuICAgICAgICAgIGRvQ2xvc2UgPSBhd2FpdCByZXN1bHQ7XG4gICAgICAgIH0gZmluYWxseSB7XG4gICAgICAgICAgdGhpcy5jb25maWdbbG9hZGluZ0tleV0gPSBmYWxzZTtcbiAgICAgICAgICB0aGlzLmNsb3NlV2hpdFJlc3VsdChkb0Nsb3NlKTtcbiAgICAgICAgfVxuICAgICAgfSBlbHNlIHtcbiAgICAgICAgdGhpcy5jbG9zZVdoaXRSZXN1bHQocmVzdWx0KTtcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICBwcml2YXRlIGNsb3NlV2hpdFJlc3VsdChyZXN1bHQ6IE56U2FmZUFueSk6IHZvaWQge1xuICAgIGlmIChyZXN1bHQgIT09IGZhbHNlKSB7XG4gICAgICB0aGlzLmNsb3NlKHJlc3VsdCk7XG4gICAgfVxuICB9XG5cbiAgX2ZpbmlzaERpYWxvZ0Nsb3NlKCk6IHZvaWQge1xuICAgIHRoaXMuc3RhdGUgPSBOek1vZGFsU3RhdGUuQ0xPU0VEO1xuICAgIHRoaXMub3ZlcmxheVJlZi5kaXNwb3NlKCk7XG4gIH1cbn1cbiJdfQ==