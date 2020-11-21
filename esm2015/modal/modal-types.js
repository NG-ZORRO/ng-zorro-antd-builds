/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */
const noopFun = () => void 0;
const ɵ0 = noopFun;
export class ModalOptions {
    constructor() {
        this.nzClosable = true;
        this.nzOkLoading = false;
        this.nzOkDisabled = false;
        this.nzCancelDisabled = false;
        this.nzCancelLoading = false;
        this.nzNoAnimation = false;
        this.nzAutofocus = 'auto';
        this.nzKeyboard = true;
        this.nzZIndex = 1000;
        this.nzWidth = 520;
        this.nzCloseIcon = 'close';
        this.nzOkType = 'primary';
        this.nzModalType = 'default';
        this.nzOnCancel = noopFun;
        this.nzOnOk = noopFun;
        // Confirm
        this.nzIconType = 'question-circle';
    }
}
export { ɵ0 };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kYWwtdHlwZXMuanMiLCJzb3VyY2VSb290IjoiL2hvbWUvdnN0cy93b3JrLzEvcy9jb21wb25lbnRzL21vZGFsLyIsInNvdXJjZXMiOlsibW9kYWwtdHlwZXMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7OztHQUdHO0FBaUJILE1BQU0sT0FBTyxHQUFHLEdBQUcsRUFBRSxDQUFDLEtBQUssQ0FBQyxDQUFDOztBQUU3QixNQUFNLE9BQU8sWUFBWTtJQUF6QjtRQUNFLGVBQVUsR0FBYSxJQUFJLENBQUM7UUFDNUIsZ0JBQVcsR0FBYSxLQUFLLENBQUM7UUFDOUIsaUJBQVksR0FBYSxLQUFLLENBQUM7UUFDL0IscUJBQWdCLEdBQWEsS0FBSyxDQUFDO1FBQ25DLG9CQUFlLEdBQWEsS0FBSyxDQUFDO1FBQ2xDLGtCQUFhLEdBQWEsS0FBSyxDQUFDO1FBQ2hDLGdCQUFXLEdBQXFDLE1BQU0sQ0FBQztRQUd2RCxlQUFVLEdBQWEsSUFBSSxDQUFDO1FBQzVCLGFBQVEsR0FBWSxJQUFJLENBQUM7UUFDekIsWUFBTyxHQUFxQixHQUFHLENBQUM7UUFDaEMsZ0JBQVcsR0FBZ0MsT0FBTyxDQUFDO1FBQ25ELGFBQVEsR0FBa0IsU0FBUyxDQUFDO1FBQ3BDLGdCQUFXLEdBQWdCLFNBQVMsQ0FBQztRQUNyQyxlQUFVLEdBQTBDLE9BQU8sQ0FBQztRQUM1RCxXQUFNLEdBQTBDLE9BQU8sQ0FBQztRQTBCeEQsVUFBVTtRQUNWLGVBQVUsR0FBWSxpQkFBaUIsQ0FBQztJQUMxQyxDQUFDO0NBQUEiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqIFVzZSBvZiB0aGlzIHNvdXJjZSBjb2RlIGlzIGdvdmVybmVkIGJ5IGFuIE1JVC1zdHlsZSBsaWNlbnNlIHRoYXQgY2FuIGJlXG4gKiBmb3VuZCBpbiB0aGUgTElDRU5TRSBmaWxlIGF0IGh0dHBzOi8vZ2l0aHViLmNvbS9ORy1aT1JSTy9uZy16b3Jyby1hbnRkL2Jsb2IvbWFzdGVyL0xJQ0VOU0VcbiAqL1xuXG5pbXBvcnQgeyBPdmVybGF5UmVmIH0gZnJvbSAnQGFuZ3VsYXIvY2RrL292ZXJsYXknO1xuaW1wb3J0IHsgRXZlbnRFbWl0dGVyLCBUZW1wbGF0ZVJlZiwgVHlwZSwgVmlld0NvbnRhaW5lclJlZiB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgTnpCdXR0b25TaGFwZSwgTnpCdXR0b25TaXplLCBOekJ1dHRvblR5cGUgfSBmcm9tICduZy16b3Jyby1hbnRkL2J1dHRvbic7XG5pbXBvcnQgeyBOelNhZmVBbnkgfSBmcm9tICduZy16b3Jyby1hbnRkL2NvcmUvdHlwZXMnO1xuXG5leHBvcnQgdHlwZSBPbkNsaWNrQ2FsbGJhY2s8VD4gPSAoaW5zdGFuY2U6IFQpID0+IChmYWxzZSB8IHZvaWQgfCB7fSkgfCBQcm9taXNlPGZhbHNlIHwgdm9pZCB8IHt9PjtcblxuZXhwb3J0IHR5cGUgTW9kYWxUeXBlcyA9ICdkZWZhdWx0JyB8ICdjb25maXJtJzsgLy8gRGlmZmVyZW50IG1vZGFsIHN0eWxlcyB3ZSBoYXZlIHN1cHBvcnRlZFxuXG5leHBvcnQgdHlwZSBDb25maXJtVHlwZSA9ICdjb25maXJtJyB8ICdpbmZvJyB8ICdzdWNjZXNzJyB8ICdlcnJvcicgfCAnd2FybmluZyc7IC8vIFN1YnR5cGVzIG9mIENvbmZpcm0gTW9kYWxcblxuZXhwb3J0IGludGVyZmFjZSBTdHlsZU9iamVjdExpa2Uge1xuICBba2V5OiBzdHJpbmddOiBzdHJpbmc7XG59XG5cbmNvbnN0IG5vb3BGdW4gPSAoKSA9PiB2b2lkIDA7XG5cbmV4cG9ydCBjbGFzcyBNb2RhbE9wdGlvbnM8VCA9IE56U2FmZUFueSwgUiA9IE56U2FmZUFueT4ge1xuICBuekNsb3NhYmxlPzogYm9vbGVhbiA9IHRydWU7XG4gIG56T2tMb2FkaW5nPzogYm9vbGVhbiA9IGZhbHNlO1xuICBuek9rRGlzYWJsZWQ/OiBib29sZWFuID0gZmFsc2U7XG4gIG56Q2FuY2VsRGlzYWJsZWQ/OiBib29sZWFuID0gZmFsc2U7XG4gIG56Q2FuY2VsTG9hZGluZz86IGJvb2xlYW4gPSBmYWxzZTtcbiAgbnpOb0FuaW1hdGlvbj86IGJvb2xlYW4gPSBmYWxzZTtcbiAgbnpBdXRvZm9jdXM/OiAnb2snIHwgJ2NhbmNlbCcgfCAnYXV0bycgfCBudWxsID0gJ2F1dG8nO1xuICBuek1hc2s/OiBib29sZWFuO1xuICBuek1hc2tDbG9zYWJsZT86IGJvb2xlYW47XG4gIG56S2V5Ym9hcmQ/OiBib29sZWFuID0gdHJ1ZTtcbiAgbnpaSW5kZXg/OiBudW1iZXIgPSAxMDAwO1xuICBueldpZHRoPzogbnVtYmVyIHwgc3RyaW5nID0gNTIwO1xuICBuekNsb3NlSWNvbj86IHN0cmluZyB8IFRlbXBsYXRlUmVmPHZvaWQ+ID0gJ2Nsb3NlJztcbiAgbnpPa1R5cGU/OiBOekJ1dHRvblR5cGUgPSAncHJpbWFyeSc7XG4gIG56TW9kYWxUeXBlPzogTW9kYWxUeXBlcyA9ICdkZWZhdWx0JztcbiAgbnpPbkNhbmNlbD86IEV2ZW50RW1pdHRlcjxUPiB8IE9uQ2xpY2tDYWxsYmFjazxUPiA9IG5vb3BGdW47XG4gIG56T25Paz86IEV2ZW50RW1pdHRlcjxUPiB8IE9uQ2xpY2tDYWxsYmFjazxUPiA9IG5vb3BGdW47XG4gIG56Q29tcG9uZW50UGFyYW1zPzogUGFydGlhbDxUPjtcbiAgbnpNYXNrU3R5bGU/OiBTdHlsZU9iamVjdExpa2U7XG4gIG56Qm9keVN0eWxlPzogU3R5bGVPYmplY3RMaWtlO1xuICBueldyYXBDbGFzc05hbWU/OiBzdHJpbmc7XG4gIG56Q2xhc3NOYW1lPzogc3RyaW5nO1xuICBuelN0eWxlPzogb2JqZWN0O1xuICBuelRpdGxlPzogc3RyaW5nIHwgVGVtcGxhdGVSZWY8e30+O1xuICBuekZvb3Rlcj86IHN0cmluZyB8IFRlbXBsYXRlUmVmPHt9PiB8IEFycmF5PE1vZGFsQnV0dG9uT3B0aW9uczxUPj4gfCBudWxsOyAvLyBEZWZhdWx0IE1vZGFsIE9OTFlcbiAgbnpDYW5jZWxUZXh0Pzogc3RyaW5nIHwgbnVsbDtcbiAgbnpPa1RleHQ/OiBzdHJpbmcgfCBudWxsO1xuICBuekNvbnRlbnQ/OiBzdHJpbmcgfCBUZW1wbGF0ZVJlZjxOelNhZmVBbnk+IHwgVHlwZTxUPjtcbiAgbnpDbG9zZU9uTmF2aWdhdGlvbj86IGJvb2xlYW47XG4gIG56Vmlld0NvbnRhaW5lclJlZj86IFZpZXdDb250YWluZXJSZWY7XG5cbiAgLyoqXG4gICAqIFJlc2V0IHRoZSBjb250YWluZXIgZWxlbWVudC5cbiAgICogQGRlcHJlY2F0ZWQgTm90IHN1cHBvcnRlZC5cbiAgICogQGJyZWFraW5nLWNoYW5nZSAxMS4wLjBcbiAgICovXG4gIG56R2V0Q29udGFpbmVyPzogSFRNTEVsZW1lbnQgfCBPdmVybGF5UmVmIHwgKCgpID0+IEhUTUxFbGVtZW50IHwgT3ZlcmxheVJlZik7XG5cbiAgLy8gVGVtcGxhdGUgdXNlIG9ubHlcbiAgbnpBZnRlck9wZW4/OiBFdmVudEVtaXR0ZXI8dm9pZD47XG4gIG56QWZ0ZXJDbG9zZT86IEV2ZW50RW1pdHRlcjxSPjtcblxuICAvLyBDb25maXJtXG4gIG56SWNvblR5cGU/OiBzdHJpbmcgPSAncXVlc3Rpb24tY2lyY2xlJztcbn1cblxuZXhwb3J0IGludGVyZmFjZSBNb2RhbEJ1dHRvbk9wdGlvbnM8VCA9IE56U2FmZUFueT4ge1xuICBsYWJlbDogc3RyaW5nO1xuICB0eXBlPzogTnpCdXR0b25UeXBlO1xuICBzaGFwZT86IE56QnV0dG9uU2hhcGU7XG4gIGdob3N0PzogYm9vbGVhbjtcbiAgc2l6ZT86IE56QnV0dG9uU2l6ZTtcbiAgYXV0b0xvYWRpbmc/OiBib29sZWFuOyAvLyBEZWZhdWx0OiB0cnVlLCBpbmRpY2F0ZSB3aGV0aGVyIHNob3cgbG9hZGluZyBhdXRvbWF0aWNhbGx5IHdoaWxlIG9uQ2xpY2sgcmV0dXJuZWQgYSBQcm9taXNlXG5cbiAgLy8gW05PVEVdIFwiY29tcG9uZW50SW5zdGFuY2VcIiB3aWxsIHJlZmVyIHRvIHRoZSBjb21wb25lbnQncyBpbnN0YW5jZSB3aGVuIHVzaW5nIENvbXBvbmVudFxuICBzaG93PzogYm9vbGVhbiB8ICgodGhpczogTW9kYWxCdXR0b25PcHRpb25zPFQ+LCBjb250ZW50Q29tcG9uZW50SW5zdGFuY2U/OiBUKSA9PiBib29sZWFuKTtcbiAgbG9hZGluZz86IGJvb2xlYW4gfCAoKHRoaXM6IE1vZGFsQnV0dG9uT3B0aW9uczxUPiwgY29udGVudENvbXBvbmVudEluc3RhbmNlPzogVCkgPT4gYm9vbGVhbik7IC8vIFRoaXMgcHJvcCBDQU4nVCB1c2Ugd2l0aCBhdXRvTG9hZGluZz10cnVlXG4gIGRpc2FibGVkPzogYm9vbGVhbiB8ICgodGhpczogTW9kYWxCdXR0b25PcHRpb25zPFQ+LCBjb250ZW50Q29tcG9uZW50SW5zdGFuY2U/OiBUKSA9PiBib29sZWFuKTtcbiAgb25DbGljaz8odGhpczogTW9kYWxCdXR0b25PcHRpb25zPFQ+LCBjb250ZW50Q29tcG9uZW50SW5zdGFuY2U/OiBUKTogTnpTYWZlQW55IHwgUHJvbWlzZTxOelNhZmVBbnk+O1xuICBba2V5OiBzdHJpbmddOiBOelNhZmVBbnk7XG59XG4iXX0=