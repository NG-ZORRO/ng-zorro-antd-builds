/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */
import { DOCUMENT } from '@angular/common';
import { Inject, Injectable } from '@angular/core';
import { NzConfigService } from 'ng-zorro-antd/core/config';
import { PREFIX, warn } from 'ng-zorro-antd/core/logger';
import { BehaviorSubject, of as observableOf, Subject } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { NzCodeEditorLoadingStatus } from './typings';
import * as i0 from "@angular/core";
import * as i1 from "ng-zorro-antd/core/config";
import * as i2 from "@angular/common";
const NZ_CONFIG_MODULE_NAME = 'codeEditor';
function tryTriggerFunc(fn) {
    return (...args) => {
        if (fn) {
            fn(...args);
        }
    };
}
export class NzCodeEditorService {
    constructor(nzConfigService, _document) {
        this.nzConfigService = nzConfigService;
        this.firstEditorInitialized = false;
        this.loaded$ = new Subject();
        this.loadingStatus = NzCodeEditorLoadingStatus.UNLOAD;
        this.option = {};
        this.option$ = new BehaviorSubject(this.option);
        const globalConfig = this.nzConfigService.getConfigForComponent(NZ_CONFIG_MODULE_NAME);
        this.document = _document;
        this.config = Object.assign({}, globalConfig);
        this.option = this.config.defaultEditorOption || {};
        this.nzConfigService.getConfigChangeEventForComponent(NZ_CONFIG_MODULE_NAME).subscribe(() => {
            const newGlobalConfig = this.nzConfigService.getConfigForComponent(NZ_CONFIG_MODULE_NAME);
            if (newGlobalConfig) {
                this._updateDefaultOption(newGlobalConfig.defaultEditorOption);
            }
        });
    }
    _updateDefaultOption(option) {
        this.option = Object.assign(Object.assign({}, this.option), option);
        this.option$.next(this.option);
        if (option.theme) {
            monaco.editor.setTheme(option.theme);
        }
    }
    requestToInit() {
        if (this.loadingStatus === NzCodeEditorLoadingStatus.LOADED) {
            this.onInit();
            return observableOf(this.getLatestOption());
        }
        if (this.loadingStatus === NzCodeEditorLoadingStatus.UNLOAD) {
            if (this.config.useStaticLoading && typeof monaco === 'undefined') {
                warn('You choose to use static loading but it seems that you forget ' +
                    'to config webpack plugin correctly. Please refer to our official website' +
                    'for more details about static loading.');
            }
            else {
                this.loadMonacoScript();
            }
        }
        return this.loaded$.asObservable().pipe(tap(() => this.onInit()), map(() => this.getLatestOption()));
    }
    loadMonacoScript() {
        if (this.config.useStaticLoading) {
            Promise.resolve().then(() => this.onLoad());
            return;
        }
        if (this.loadingStatus === NzCodeEditorLoadingStatus.LOADING) {
            return;
        }
        this.loadingStatus = NzCodeEditorLoadingStatus.LOADING;
        const assetsRoot = this.config.assetsRoot;
        const vs = assetsRoot ? `${assetsRoot}/vs` : 'assets/vs';
        const windowAsAny = window;
        const loadScript = this.document.createElement('script');
        loadScript.type = 'text/javascript';
        loadScript.src = `${vs}/loader.js`;
        loadScript.onload = () => {
            windowAsAny.require.config({
                paths: { vs }
            });
            windowAsAny.require(['vs/editor/editor.main'], () => {
                this.onLoad();
            });
        };
        loadScript.onerror = () => {
            throw new Error(`${PREFIX} cannot load assets of monaco editor from source "${vs}".`);
        };
        this.document.documentElement.appendChild(loadScript);
    }
    onLoad() {
        this.loadingStatus = NzCodeEditorLoadingStatus.LOADED;
        this.loaded$.next(true);
        this.loaded$.complete();
        tryTriggerFunc(this.config.onLoad)();
    }
    onInit() {
        if (!this.firstEditorInitialized) {
            this.firstEditorInitialized = true;
            tryTriggerFunc(this.config.onFirstEditorInit)();
        }
        tryTriggerFunc(this.config.onInit)();
    }
    getLatestOption() {
        return Object.assign({}, this.option);
    }
}
NzCodeEditorService.ɵprov = i0.ɵɵdefineInjectable({ factory: function NzCodeEditorService_Factory() { return new NzCodeEditorService(i0.ɵɵinject(i1.NzConfigService), i0.ɵɵinject(i2.DOCUMENT)); }, token: NzCodeEditorService, providedIn: "root" });
NzCodeEditorService.decorators = [
    { type: Injectable, args: [{
                providedIn: 'root'
            },] }
];
NzCodeEditorService.ctorParameters = () => [
    { type: NzConfigService },
    { type: undefined, decorators: [{ type: Inject, args: [DOCUMENT,] }] }
];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29kZS1lZGl0b3Iuc2VydmljZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL2NvbXBvbmVudHMvY29kZS1lZGl0b3IvY29kZS1lZGl0b3Iuc2VydmljZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7O0dBR0c7QUFFSCxPQUFPLEVBQUUsUUFBUSxFQUFFLE1BQU0saUJBQWlCLENBQUM7QUFDM0MsT0FBTyxFQUFFLE1BQU0sRUFBRSxVQUFVLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDbkQsT0FBTyxFQUFvQixlQUFlLEVBQUUsTUFBTSwyQkFBMkIsQ0FBQztBQUM5RSxPQUFPLEVBQUUsTUFBTSxFQUFFLElBQUksRUFBRSxNQUFNLDJCQUEyQixDQUFDO0FBRXpELE9BQU8sRUFBRSxlQUFlLEVBQWMsRUFBRSxJQUFJLFlBQVksRUFBRSxPQUFPLEVBQUUsTUFBTSxNQUFNLENBQUM7QUFDaEYsT0FBTyxFQUFFLEdBQUcsRUFBRSxHQUFHLEVBQUUsTUFBTSxnQkFBZ0IsQ0FBQztBQUMxQyxPQUFPLEVBQXVCLHlCQUF5QixFQUFFLE1BQU0sV0FBVyxDQUFDOzs7O0FBSTNFLE1BQU0scUJBQXFCLEdBQUcsWUFBWSxDQUFDO0FBRTNDLFNBQVMsY0FBYyxDQUFDLEVBQXdDO0lBQzlELE9BQU8sQ0FBQyxHQUFHLElBQWlCLEVBQUUsRUFBRTtRQUM5QixJQUFJLEVBQUUsRUFBRTtZQUNOLEVBQUUsQ0FBQyxHQUFHLElBQUksQ0FBQyxDQUFDO1NBQ2I7SUFDSCxDQUFDLENBQUM7QUFDSixDQUFDO0FBS0QsTUFBTSxPQUFPLG1CQUFtQjtJQVU5QixZQUE2QixlQUFnQyxFQUFvQixTQUFvQjtRQUF4RSxvQkFBZSxHQUFmLGVBQWUsQ0FBaUI7UUFSckQsMkJBQXNCLEdBQUcsS0FBSyxDQUFDO1FBQy9CLFlBQU8sR0FBRyxJQUFJLE9BQU8sRUFBVyxDQUFDO1FBQ2pDLGtCQUFhLEdBQUcseUJBQXlCLENBQUMsTUFBTSxDQUFDO1FBQ2pELFdB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LENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxpQkFBaUIsQ0FBQyxFQUFFLENBQUM7U0FDakQ7UUFFRCxjQUFjLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxNQUFNLENBQUMsRUFBRSxDQUFDO0lBQ3ZDLENBQUM7SUFFTyxlQUFlO1FBQ3JCLHlCQUFZLElBQUksQ0FBQyxNQUFNLEVBQUc7SUFDNUIsQ0FBQzs7OztZQWxIRixVQUFVLFNBQUM7Z0JBQ1YsVUFBVSxFQUFFLE1BQU07YUFDbkI7OztZQXJCMEIsZUFBZTs0Q0FnQ3dCLE1BQU0sU0FBQyxRQUFRIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKiBVc2Ugb2YgdGhpcyBzb3VyY2UgY29kZSBpcyBnb3Zlcm5lZCBieSBhbiBNSVQtc3R5bGUgbGljZW5zZSB0aGF0IGNhbiBiZVxuICogZm91bmQgaW4gdGhlIExJQ0VOU0UgZmlsZSBhdCBodHRwczovL2dpdGh1Yi5jb20vTkctWk9SUk8vbmctem9ycm8tYW50ZC9ibG9iL21hc3Rlci9MSUNFTlNFXG4gKi9cblxuaW1wb3J0IHsgRE9DVU1FTlQgfSBmcm9tICdAYW5ndWxhci9jb21tb24nO1xuaW1wb3J0IHsgSW5qZWN0LCBJbmplY3RhYmxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBDb2RlRWRpdG9yQ29uZmlnLCBOekNvbmZpZ1NlcnZpY2UgfSBmcm9tICduZy16b3Jyby1hbnRkL2NvcmUvY29uZmlnJztcbmltcG9ydCB7IFBSRUZJWCwgd2FybiB9IGZyb20gJ25nLXpvcnJvLWFudGQvY29yZS9sb2dnZXInO1xuaW1wb3J0IHsgTnpTYWZlQW55IH0gZnJvbSAnbmctem9ycm8tYW50ZC9jb3JlL3R5cGVzJztcbmltcG9ydCB7IEJlaGF2aW9yU3ViamVjdCwgT2JzZXJ2YWJsZSwgb2YgYXMgb2JzZXJ2YWJsZU9mLCBTdWJqZWN0IH0gZnJvbSAncnhqcyc7XG5pbXBvcnQgeyBtYXAsIHRhcCB9IGZyb20gJ3J4anMvb3BlcmF0b3JzJztcbmltcG9ydCB7IEpvaW5lZEVkaXRvck9wdGlvbnMsIE56Q29kZUVkaXRvckxvYWRpbmdTdGF0dXMgfSBmcm9tICcuL3R5cGluZ3MnO1xuXG5kZWNsYXJlIGNvbnN0IG1vbmFjbzogTnpTYWZlQW55O1xuXG5jb25zdCBOWl9DT05GSUdfTU9EVUxFX05BTUUgPSAnY29kZUVkaXRvcic7XG5cbmZ1bmN0aW9uIHRyeVRyaWdnZXJGdW5jKGZuPzogKC4uLmFyZ3M6IE56U2FmZUFueVtdKSA9PiBOelNhZmVBbnkpOiAoLi4uYXJnczogTnpTYWZlQW55KSA9PiB2b2lkIHtcbiAgcmV0dXJuICguLi5hcmdzOiBOelNhZmVBbnlbXSkgPT4ge1xuICAgIGlmIChmbikge1xuICAgICAgZm4oLi4uYXJncyk7XG4gICAgfVxuICB9O1xufVxuXG5ASW5qZWN0YWJsZSh7XG4gIHByb3ZpZGVkSW46ICdyb290J1xufSlcbmV4cG9ydCBjbGFzcyBOekNvZGVFZGl0b3JTZXJ2aWNlIHtcbiAgcHJpdmF0ZSBkb2N1bWVudDogRG9jdW1lbnQ7XG4gIHByaXZhdGUgZmlyc3RFZGl0b3JJbml0aWFsaXplZCA9IGZhbHNlO1xuICBwcml2YXRlIGxvYWRlZCQgPSBuZXcgU3ViamVjdDxib29sZWFuPigpO1xuICBwcml2YXRlIGxvYWRpbmdTdGF0dXMgPSBOekNvZGVFZGl0b3JMb2FkaW5nU3RhdHVzLlVOTE9BRDtcbiAgcHJpdmF0ZSBvcHRpb246IEpvaW5lZEVkaXRvck9wdGlvbnMgPSB7fTtcbiAgcHJpdmF0ZSBjb25maWc6IENvZGVFZGl0b3JDb25maWc7XG5cbiAgb3B0aW9uJCA9IG5ldyBCZWhhdmlvclN1YmplY3Q8Sm9pbmVkRWRpdG9yT3B0aW9ucz4odGhpcy5vcHRpb24pO1xuXG4gIGNvbnN0cnVjdG9yKHByaXZhdGUgcmVhZG9ubHkgbnpDb25maWdTZXJ2aWNlOiBOekNvbmZpZ1NlcnZpY2UsIEBJbmplY3QoRE9DVU1FTlQpIF9kb2N1bWVudDogTnpTYWZlQW55KSB7XG4gICAgY29uc3QgZ2xvYmFsQ29uZmlnID0gdGhpcy5uekNvbmZpZ1NlcnZpY2UuZ2V0Q29uZmlnRm9yQ29tcG9uZW50KE5aX0NPTkZJR19NT0RVTEVfTkFNRSk7XG5cbiAgICB0aGlzLmRvY3VtZW50ID0gX2RvY3VtZW50O1xuICAgIHRoaXMuY29uZmlnID0geyAuLi5nbG9iYWxDb25maWcgfTtcbiAgICB0aGlzLm9wdGlvbiA9IHRoaXMuY29uZmlnLmRlZmF1bHRFZGl0b3JPcHRpb24gfHwge307XG5cbiAgICB0aGlzLm56Q29uZmlnU2VydmljZS5nZXRDb25maWdDaGFuZ2VFdmVudEZvckNvbXBvbmVudChOWl9DT05GSUdfTU9EVUxFX05BTUUpLnN1YnNjcmliZSgoKSA9PiB7XG4gICAgICBjb25zdCBuZXdHbG9iYWxDb25maWc6IE56U2FmZUFueSA9IHRoaXMubnpDb25maWdTZXJ2aWNlLmdldENvbmZpZ0ZvckNvbXBvbmVudChOWl9DT05GSUdfTU9EVUxFX05BTUUpO1xuICAgICAgaWYgKG5ld0dsb2JhbENvbmZpZykge1xuICAgICAgICB0aGlzLl91cGRhdGVEZWZhdWx0T3B0aW9uKG5ld0dsb2JhbENvbmZpZy5kZWZhdWx0RWRpdG9yT3B0aW9uKTtcbiAgICAgIH1cbiAgICB9KTtcbiAgfVxuXG4gIHByaXZhdGUgX3VwZGF0ZURlZmF1bHRPcHRpb24ob3B0aW9uOiBKb2luZWRFZGl0b3JPcHRpb25zKTogdm9pZCB7XG4gICAgdGhpcy5vcHRpb24gPSB7IC4uLnRoaXMub3B0aW9uLCAuLi5vcHRpb24gfTtcbiAgICB0aGlzLm9wdGlvbiQubmV4dCh0aGlzLm9wdGlvbik7XG5cbiAgICBpZiAob3B0aW9uLnRoZW1lKSB7XG4gICAgICBtb25hY28uZWRpdG9yLnNldFRoZW1lKG9wdGlvbi50aGVtZSk7XG4gICAgfVxuICB9XG5cbiAgcmVxdWVzdFRvSW5pdCgpOiBPYnNlcnZhYmxlPEpvaW5lZEVkaXRvck9wdGlvbnM+IHtcbiAgICBpZiAodGhpcy5sb2FkaW5nU3RhdHVzID09PSBOekNvZGVFZGl0b3JMb2FkaW5nU3RhdHVzLkxPQURFRCkge1xuICAgICAgdGhpcy5vbkluaXQoKTtcbiAgICAgIHJldHVybiBvYnNlcnZhYmxlT2YodGhpcy5nZXRMYXRlc3RPcHRpb24oKSk7XG4gICAgfVxuXG4gICAgaWYgKHRoaXMubG9hZGluZ1N0YXR1cyA9PT0gTnpDb2RlRWRpdG9yTG9hZGluZ1N0YXR1cy5VTkxPQUQpIHtcbiAgICAgIGlmICh0aGlzLmNvbmZpZy51c2VTdGF0aWNMb2FkaW5nICYmIHR5cGVvZiBtb25hY28gPT09ICd1bmRlZmluZWQnKSB7XG4gICAgICAgIHdhcm4oXG4gICAgICAgICAgJ1lvdSBjaG9vc2UgdG8gdXNlIHN0YXRpYyBsb2FkaW5nIGJ1dCBpdCBzZWVtcyB0aGF0IHlvdSBmb3JnZXQgJyArXG4gICAgICAgICAgICAndG8gY29uZmlnIHdlYnBhY2sgcGx1Z2luIGNvcnJlY3RseS4gUGxlYXNlIHJlZmVyIHRvIG91ciBvZmZpY2lhbCB3ZWJzaXRlJyArXG4gICAgICAgICAgICAnZm9yIG1vcmUgZGV0YWlscyBhYm91dCBzdGF0aWMgbG9hZGluZy4nXG4gICAgICAgICk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICB0aGlzLmxvYWRNb25hY29TY3JpcHQoKTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICByZXR1cm4gdGhpcy5sb2FkZWQkLmFzT2JzZXJ2YWJsZSgpLnBpcGUoXG4gICAgICB0YXAoKCkgPT4gdGhpcy5vbkluaXQoKSksXG4gICAgICBtYXAoKCkgPT4gdGhpcy5nZXRMYXRlc3RPcHRpb24oKSlcbiAgICApO1xuICB9XG5cbiAgcHJpdmF0ZSBsb2FkTW9uYWNvU2NyaXB0KCk6IHZvaWQge1xuICAgIGlmICh0aGlzLmNvbmZpZy51c2VTdGF0aWNMb2FkaW5nKSB7XG4gICAgICBQcm9taXNlLnJlc29sdmUoKS50aGVuKCgpID0+IHRoaXMub25Mb2FkKCkpO1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIGlmICh0aGlzLmxvYWRpbmdTdGF0dXMgPT09IE56Q29kZUVkaXRvckxvYWRpbmdTdGF0dXMuTE9BRElORykge1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIHRoaXMubG9hZGluZ1N0YXR1cyA9IE56Q29kZUVkaXRvckxvYWRpbmdTdGF0dXMuTE9BRElORztcblxuICAgIGNvbnN0IGFzc2V0c1Jvb3QgPSB0aGlzLmNvbmZpZy5hc3NldHNSb290O1xuICAgIGNvbnN0IHZzID0gYXNzZXRzUm9vdCA/IGAke2Fzc2V0c1Jvb3R9L3ZzYCA6ICdhc3NldHMvdnMnO1xuICAgIGNvbnN0IHdpbmRvd0FzQW55ID0gd2luZG93IGFzIE56U2FmZUFueTtcbiAgICBjb25zdCBsb2FkU2NyaXB0ID0gdGhpcy5kb2N1bWVudC5jcmVhdGVFbGVtZW50KCdzY3JpcHQnKTtcblxuICAgIGxvYWRTY3JpcHQudHlwZSA9ICd0ZXh0L2phdmFzY3JpcHQnO1xuICAgIGxvYWRTY3JpcHQuc3JjID0gYCR7dnN9L2xvYWRlci5qc2A7XG4gICAgbG9hZFNjcmlwdC5vbmxvYWQgPSAoKSA9PiB7XG4gICAgICB3aW5kb3dBc0FueS5yZXF1aXJlLmNvbmZpZyh7XG4gICAgICAgIHBhdGhzOiB7IHZzIH1cbiAgICAgIH0pO1xuICAgICAgd2luZG93QXNBbnkucmVxdWlyZShbJ3ZzL2VkaXRvci9lZGl0b3IubWFpbiddLCAoKSA9PiB7XG4gICAgICAgIHRoaXMub25Mb2FkKCk7XG4gICAgICB9KTtcbiAgICB9O1xuICAgIGxvYWRTY3JpcHQub25lcnJvciA9ICgpID0+IHtcbiAgICAgIHRocm93IG5ldyBFcnJvcihgJHtQUkVGSVh9IGNhbm5vdCBsb2FkIGFzc2V0cyBvZiBtb25hY28gZWRpdG9yIGZyb20gc291cmNlIFwiJHt2c31cIi5gKTtcbiAgICB9O1xuXG4gICAgdGhpcy5kb2N1bWVudC5kb2N1bWVudEVsZW1lbnQuYXBwZW5kQ2hpbGQobG9hZFNjcmlwdCk7XG4gIH1cblxuICBwcml2YXRlIG9uTG9hZCgpOiB2b2lkIHtcbiAgICB0aGlzLmxvYWRpbmdTdGF0dXMgPSBOekNvZGVFZGl0b3JMb2FkaW5nU3RhdHVzLkxPQURFRDtcbiAgICB0aGlzLmxvYWRlZCQubmV4dCh0cnVlKTtcbiAgICB0aGlzLmxvYWRlZCQuY29tcGxldGUoKTtcblxuICAgIHRyeVRyaWdnZXJGdW5jKHRoaXMuY29uZmlnLm9uTG9hZCkoKTtcbiAgfVxuXG4gIHByaXZhdGUgb25Jbml0KCk6IHZvaWQge1xuICAgIGlmICghdGhpcy5maXJzdEVkaXRvckluaXRpYWxpemVkKSB7XG4gICAgICB0aGlzLmZpcnN0RWRpdG9ySW5pdGlhbGl6ZWQgPSB0cnVlO1xuICAgICAgdHJ5VHJpZ2dlckZ1bmModGhpcy5jb25maWcub25GaXJzdEVkaXRvckluaXQpKCk7XG4gICAgfVxuXG4gICAgdHJ5VHJpZ2dlckZ1bmModGhpcy5jb25maWcub25Jbml0KSgpO1xuICB9XG5cbiAgcHJpdmF0ZSBnZXRMYXRlc3RPcHRpb24oKTogSm9pbmVkRWRpdG9yT3B0aW9ucyB7XG4gICAgcmV0dXJuIHsgLi4udGhpcy5vcHRpb24gfTtcbiAgfVxufVxuIl19