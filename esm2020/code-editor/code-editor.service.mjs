/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */
import { DOCUMENT } from '@angular/common';
import { Inject, Injectable } from '@angular/core';
import { BehaviorSubject, of, ReplaySubject } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { PREFIX, warn } from 'ng-zorro-antd/core/logger';
import * as i0 from "@angular/core";
import * as i1 from "ng-zorro-antd/core/config";
const NZ_CONFIG_MODULE_NAME = 'codeEditor';
function tryTriggerFunc(fn) {
    return (...args) => {
        if (fn) {
            fn(...args);
        }
    };
}
// Caretaker note: previously, these were `NzCodeEditorService` properties.
// They're kept as static variables because this will allow loading Monaco only once.
// This applies to micro frontend apps with multiple Angular apps or a single Angular app
// that can be bootstrapped and destroyed multiple times (e.g. using Webpack module federation).
// Root providers are re-initialized each time the app is bootstrapped. Platform providers aren't.
// We can't make the `NzCodeEditorService` to be a platform provider (`@Injectable({ providedIn: 'platform' })`)
// since it depends on other root providers.
const loaded$ = new ReplaySubject(1);
let loadingStatus = "unload" /* UNLOAD */;
export class NzCodeEditorService {
    constructor(nzConfigService, _document) {
        this.nzConfigService = nzConfigService;
        this.firstEditorInitialized = false;
        this.option = {};
        this.option$ = new BehaviorSubject(this.option);
        const globalConfig = this.nzConfigService.getConfigForComponent(NZ_CONFIG_MODULE_NAME);
        this.document = _document;
        this.config = { ...globalConfig };
        this.option = this.config.defaultEditorOption || {};
        this.subscription = this.nzConfigService.getConfigChangeEventForComponent(NZ_CONFIG_MODULE_NAME).subscribe(() => {
            const newGlobalConfig = this.nzConfigService.getConfigForComponent(NZ_CONFIG_MODULE_NAME);
            if (newGlobalConfig) {
                this._updateDefaultOption(newGlobalConfig.defaultEditorOption);
            }
        });
    }
    ngOnDestroy() {
        this.subscription.unsubscribe();
        this.subscription = null;
    }
    _updateDefaultOption(option) {
        this.option = { ...this.option, ...option };
        this.option$.next(this.option);
        if (option.theme) {
            monaco.editor.setTheme(option.theme);
        }
    }
    requestToInit() {
        if (loadingStatus === "LOADED" /* LOADED */) {
            this.onInit();
            return of(this.getLatestOption());
        }
        if (loadingStatus === "unload" /* UNLOAD */) {
            if (this.config.useStaticLoading && typeof monaco === 'undefined') {
                warn('You choose to use static loading but it seems that you forget ' +
                    'to config webpack plugin correctly. Please refer to our official website' +
                    'for more details about static loading.');
            }
            else {
                this.loadMonacoScript();
            }
        }
        return loaded$.pipe(tap(() => this.onInit()), map(() => this.getLatestOption()));
    }
    loadMonacoScript() {
        if (this.config.useStaticLoading) {
            Promise.resolve().then(() => this.onLoad());
            return;
        }
        if (loadingStatus === "loading" /* LOADING */) {
            return;
        }
        loadingStatus = "loading" /* LOADING */;
        const assetsRoot = this.config.assetsRoot;
        const vs = assetsRoot ? `${assetsRoot}/vs` : 'assets/vs';
        const windowAsAny = window;
        const loadScript = this.document.createElement('script');
        loadScript.type = 'text/javascript';
        loadScript.src = `${vs}/loader.js`;
        const onLoad = () => {
            cleanup();
            windowAsAny.require.config({
                paths: { vs }
            });
            windowAsAny.require(['vs/editor/editor.main'], () => {
                this.onLoad();
            });
        };
        const onError = () => {
            cleanup();
            throw new Error(`${PREFIX} cannot load assets of monaco editor from source "${vs}".`);
        };
        const cleanup = () => {
            // Caretaker note: we have to remove these listeners once the `<script>` is loaded successfully
            // or not since the `onLoad` listener captures `this`, which will prevent the `NzCodeEditorService`
            // from being garbage collected.
            loadScript.removeEventListener('load', onLoad);
            loadScript.removeEventListener('error', onError);
            // We don't need to keep the `<script>` element within the `<body>` since JavaScript has
            // been executed and Monaco is available globally. E.g. Webpack, always removes `<script>`
            // elements after loading chunks (see its `LoadScriptRuntimeModule`).
            this.document.documentElement.removeChild(loadScript);
        };
        loadScript.addEventListener('load', onLoad);
        loadScript.addEventListener('error', onError);
        this.document.documentElement.appendChild(loadScript);
    }
    onLoad() {
        loadingStatus = "LOADED" /* LOADED */;
        loaded$.next(true);
        loaded$.complete();
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
        return { ...this.option };
    }
}
NzCodeEditorService.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.1.2", ngImport: i0, type: NzCodeEditorService, deps: [{ token: i1.NzConfigService }, { token: DOCUMENT }], target: i0.ɵɵFactoryTarget.Injectable });
NzCodeEditorService.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "13.1.2", ngImport: i0, type: NzCodeEditorService, providedIn: 'root' });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.1.2", ngImport: i0, type: NzCodeEditorService, decorators: [{
            type: Injectable,
            args: [{
                    providedIn: 'root'
                }]
        }], ctorParameters: function () { return [{ type: i1.NzConfigService }, { type: undefined, decorators: [{
                    type: Inject,
                    args: [DOCUMENT]
                }] }]; } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29kZS1lZGl0b3Iuc2VydmljZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL2NvbXBvbmVudHMvY29kZS1lZGl0b3IvY29kZS1lZGl0b3Iuc2VydmljZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7O0dBR0c7QUFFSCxPQUFPLEVBQUUsUUFBUSxFQUFFLE1BQU0saUJBQWlCLENBQUM7QUFDM0MsT0FBTyxFQUFFLE1BQU0sRUFBRSxVQUFVLEVBQWEsTUFBTSxlQUFlLENBQUM7QUFDOUQsT0FBTyxFQUFFLGVBQWUsRUFBYyxFQUFFLEVBQUUsYUFBYSxFQUFnQixNQUFNLE1BQU0sQ0FBQztBQUNwRixPQUFPLEVBQUUsR0FBRyxFQUFFLEdBQUcsRUFBRSxNQUFNLGdCQUFnQixDQUFDO0FBRzFDLE9BQU8sRUFBRSxNQUFNLEVBQUUsSUFBSSxFQUFFLE1BQU0sMkJBQTJCLENBQUM7OztBQU96RCxNQUFNLHFCQUFxQixHQUFHLFlBQVksQ0FBQztBQUUzQyxTQUFTLGNBQWMsQ0FBQyxFQUF3QztJQUM5RCxPQUFPLENBQUMsR0FBRyxJQUFpQixFQUFFLEVBQUU7UUFDOUIsSUFBSSxFQUFFLEVBQUU7WUFDTixFQUFFLENBQUMsR0FBRyxJQUFJLENBQUMsQ0FBQztTQUNiO0lBQ0gsQ0FBQyxDQUFDO0FBQ0osQ0FBQztBQUVELDJFQUEyRTtBQUMzRSxxRkFBcUY7QUFDckYseUZBQXlGO0FBQ3pGLGdHQUFnRztBQUNoRyxrR0FBa0c7QUFDbEcsZ0hBQWdIO0FBQ2hILDRDQUE0QztBQUM1QyxNQUFNLE9BQU8sR0FBRyxJQUFJLGFBQWEsQ0FBVSxDQUFDLENBQUMsQ0FBQztBQUM5QyxJQUFJLGFBQWEsd0JBQW1DLENBQUM7QUFLckQsTUFBTSxPQUFPLG1CQUFtQjtJQVM5QixZQUE2QixlQUFnQyxFQUFvQixTQUFvQjtRQUF4RSxvQkFBZSxHQUFmLGVBQWUsQ0FBaUI7UUFQckQsMkJBQXNCLEdBQUcsS0FBSyxDQUFDO1FBQy9CLFdBQU0s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QUM7UUFDNUMsVUFBVSxDQUFDLGdCQUFnQixDQUFDLE9BQU8sRUFBRSxPQUFPLENBQUMsQ0FBQztRQUU5QyxJQUFJLENBQUMsUUFBUSxDQUFDLGVBQWUsQ0FBQyxXQUFXLENBQUMsVUFBVSxDQUFDLENBQUM7SUFDeEQsQ0FBQztJQUVPLE1BQU07UUFDWixhQUFhLHdCQUFtQyxDQUFDO1FBQ2pELE9BQU8sQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUM7UUFDbkIsT0FBTyxDQUFDLFFBQVEsRUFBRSxDQUFDO1FBRW5CLGNBQWMsQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLE1BQU0sQ0FBQyxFQUFFLENBQUM7SUFDdkMsQ0FBQztJQUVPLE1BQU07UUFDWixJQUFJLENBQUMsSUFBSSxDQUFDLHNCQUFzQixFQUFFO1lBQ2hDLElBQUksQ0FBQyxzQkFBc0IsR0FBRyxJQUFJLENBQUM7WUFDbkMsY0FBYyxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsaUJBQWlCLENBQUMsRUFBRSxDQUFDO1NBQ2pEO1FBRUQsY0FBYyxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsTUFBTSxDQUFDLEVBQUUsQ0FBQztJQUN2QyxDQUFDO0lBRU8sZUFBZTtRQUNyQixPQUFPLEVBQUUsR0FBRyxJQUFJLENBQUMsTUFBTSxFQUFFLENBQUM7SUFDNUIsQ0FBQzs7Z0hBdElVLG1CQUFtQixpREFTeUMsUUFBUTtvSEFUcEUsbUJBQW1CLGNBRmxCLE1BQU07MkZBRVAsbUJBQW1CO2tCQUgvQixVQUFVO21CQUFDO29CQUNWLFVBQVUsRUFBRSxNQUFNO2lCQUNuQjs7MEJBVWlFLE1BQU07MkJBQUMsUUFBUSIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxuICogVXNlIG9mIHRoaXMgc291cmNlIGNvZGUgaXMgZ292ZXJuZWQgYnkgYW4gTUlULXN0eWxlIGxpY2Vuc2UgdGhhdCBjYW4gYmVcbiAqIGZvdW5kIGluIHRoZSBMSUNFTlNFIGZpbGUgYXQgaHR0cHM6Ly9naXRodWIuY29tL05HLVpPUlJPL25nLXpvcnJvLWFudGQvYmxvYi9tYXN0ZXIvTElDRU5TRVxuICovXG5cbmltcG9ydCB7IERPQ1VNRU5UIH0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uJztcbmltcG9ydCB7IEluamVjdCwgSW5qZWN0YWJsZSwgT25EZXN0cm95IH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBCZWhhdmlvclN1YmplY3QsIE9ic2VydmFibGUsIG9mLCBSZXBsYXlTdWJqZWN0LCBTdWJzY3JpcHRpb24gfSBmcm9tICdyeGpzJztcbmltcG9ydCB7IG1hcCwgdGFwIH0gZnJvbSAncnhqcy9vcGVyYXRvcnMnO1xuXG5pbXBvcnQgeyBDb2RlRWRpdG9yQ29uZmlnLCBOekNvbmZpZ1NlcnZpY2UgfSBmcm9tICduZy16b3Jyby1hbnRkL2NvcmUvY29uZmlnJztcbmltcG9ydCB7IFBSRUZJWCwgd2FybiB9IGZyb20gJ25nLXpvcnJvLWFudGQvY29yZS9sb2dnZXInO1xuaW1wb3J0IHsgTnpTYWZlQW55IH0gZnJvbSAnbmctem9ycm8tYW50ZC9jb3JlL3R5cGVzJztcblxuaW1wb3J0IHsgSm9pbmVkRWRpdG9yT3B0aW9ucywgTnpDb2RlRWRpdG9yTG9hZGluZ1N0YXR1cyB9IGZyb20gJy4vdHlwaW5ncyc7XG5cbmRlY2xhcmUgY29uc3QgbW9uYWNvOiBOelNhZmVBbnk7XG5cbmNvbnN0IE5aX0NPTkZJR19NT0RVTEVfTkFNRSA9ICdjb2RlRWRpdG9yJztcblxuZnVuY3Rpb24gdHJ5VHJpZ2dlckZ1bmMoZm4/OiAoLi4uYXJnczogTnpTYWZlQW55W10pID0+IE56U2FmZUFueSk6ICguLi5hcmdzOiBOelNhZmVBbnkpID0+IHZvaWQge1xuICByZXR1cm4gKC4uLmFyZ3M6IE56U2FmZUFueVtdKSA9PiB7XG4gICAgaWYgKGZuKSB7XG4gICAgICBmbiguLi5hcmdzKTtcbiAgICB9XG4gIH07XG59XG5cbi8vIENhcmV0YWtlciBub3RlOiBwcmV2aW91c2x5LCB0aGVzZSB3ZXJlIGBOekNvZGVFZGl0b3JTZXJ2aWNlYCBwcm9wZXJ0aWVzLlxuLy8gVGhleSdyZSBrZXB0IGFzIHN0YXRpYyB2YXJpYWJsZXMgYmVjYXVzZSB0aGlzIHdpbGwgYWxsb3cgbG9hZGluZyBNb25hY28gb25seSBvbmNlLlxuLy8gVGhpcyBhcHBsaWVzIHRvIG1pY3JvIGZyb250ZW5kIGFwcHMgd2l0aCBtdWx0aXBsZSBBbmd1bGFyIGFwcHMgb3IgYSBzaW5nbGUgQW5ndWxhciBhcHBcbi8vIHRoYXQgY2FuIGJlIGJvb3RzdHJhcHBlZCBhbmQgZGVzdHJveWVkIG11bHRpcGxlIHRpbWVzIChlLmcuIHVzaW5nIFdlYnBhY2sgbW9kdWxlIGZlZGVyYXRpb24pLlxuLy8gUm9vdCBwcm92aWRlcnMgYXJlIHJlLWluaXRpYWxpemVkIGVhY2ggdGltZSB0aGUgYXBwIGlzIGJvb3RzdHJhcHBlZC4gUGxhdGZvcm0gcHJvdmlkZXJzIGFyZW4ndC5cbi8vIFdlIGNhbid0IG1ha2UgdGhlIGBOekNvZGVFZGl0b3JTZXJ2aWNlYCB0byBiZSBhIHBsYXRmb3JtIHByb3ZpZGVyIChgQEluamVjdGFibGUoeyBwcm92aWRlZEluOiAncGxhdGZvcm0nIH0pYClcbi8vIHNpbmNlIGl0IGRlcGVuZHMgb24gb3RoZXIgcm9vdCBwcm92aWRlcnMuXG5jb25zdCBsb2FkZWQkID0gbmV3IFJlcGxheVN1YmplY3Q8Ym9vbGVhbj4oMSk7XG5sZXQgbG9hZGluZ1N0YXR1cyA9IE56Q29kZUVkaXRvckxvYWRpbmdTdGF0dXMuVU5MT0FEO1xuXG5ASW5qZWN0YWJsZSh7XG4gIHByb3ZpZGVkSW46ICdyb290J1xufSlcbmV4cG9ydCBjbGFzcyBOekNvZGVFZGl0b3JTZXJ2aWNlIGltcGxlbWVudHMgT25EZXN0cm95IHtcbiAgcHJpdmF0ZSBkb2N1bWVudDogRG9jdW1lbnQ7XG4gIHByaXZhdGUgZmlyc3RFZGl0b3JJbml0aWFsaXplZCA9IGZhbHNlO1xuICBwcml2YXRlIG9wdGlvbjogSm9pbmVkRWRpdG9yT3B0aW9ucyA9IHt9O1xuICBwcml2YXRlIGNvbmZpZzogQ29kZUVkaXRvckNvbmZpZztcbiAgcHJpdmF0ZSBzdWJzY3JpcHRpb246IFN1YnNjcmlwdGlvbiB8IG51bGw7XG5cbiAgb3B0aW9uJCA9IG5ldyBCZWhhdmlvclN1YmplY3Q8Sm9pbmVkRWRpdG9yT3B0aW9ucz4odGhpcy5vcHRpb24pO1xuXG4gIGNvbnN0cnVjdG9yKHByaXZhdGUgcmVhZG9ubHkgbnpDb25maWdTZXJ2aWNlOiBOekNvbmZpZ1NlcnZpY2UsIEBJbmplY3QoRE9DVU1FTlQpIF9kb2N1bWVudDogTnpTYWZlQW55KSB7XG4gICAgY29uc3QgZ2xvYmFsQ29uZmlnID0gdGhpcy5uekNvbmZpZ1NlcnZpY2UuZ2V0Q29uZmlnRm9yQ29tcG9uZW50KE5aX0NPTkZJR19NT0RVTEVfTkFNRSk7XG5cbiAgICB0aGlzLmRvY3VtZW50ID0gX2RvY3VtZW50O1xuICAgIHRoaXMuY29uZmlnID0geyAuLi5nbG9iYWxDb25maWcgfTtcbiAgICB0aGlzLm9wdGlvbiA9IHRoaXMuY29uZmlnLmRlZmF1bHRFZGl0b3JPcHRpb24gfHwge307XG5cbiAgICB0aGlzLnN1YnNjcmlwdGlvbiA9IHRoaXMubnpDb25maWdTZXJ2aWNlLmdldENvbmZpZ0NoYW5nZUV2ZW50Rm9yQ29tcG9uZW50KE5aX0NPTkZJR19NT0RVTEVfTkFNRSkuc3Vic2NyaWJlKCgpID0+IHtcbiAgICAgIGNvbnN0IG5ld0dsb2JhbENvbmZpZzogTnpTYWZlQW55ID0gdGhpcy5uekNvbmZpZ1NlcnZpY2UuZ2V0Q29uZmlnRm9yQ29tcG9uZW50KE5aX0NPTkZJR19NT0RVTEVfTkFNRSk7XG4gICAgICBpZiAobmV3R2xvYmFsQ29uZmlnKSB7XG4gICAgICAgIHRoaXMuX3VwZGF0ZURlZmF1bHRPcHRpb24obmV3R2xvYmFsQ29uZmlnLmRlZmF1bHRFZGl0b3JPcHRpb24pO1xuICAgICAgfVxuICAgIH0pO1xuICB9XG5cbiAgbmdPbkRlc3Ryb3koKTogdm9pZCB7XG4gICAgdGhpcy5zdWJzY3JpcHRpb24hLnVuc3Vic2NyaWJlKCk7XG4gICAgdGhpcy5zdWJzY3JpcHRpb24gPSBudWxsO1xuICB9XG5cbiAgcHJpdmF0ZSBfdXBkYXRlRGVmYXVsdE9wdGlvbihvcHRpb246IEpvaW5lZEVkaXRvck9wdGlvbnMpOiB2b2lkIHtcbiAgICB0aGlzLm9wdGlvbiA9IHsgLi4udGhpcy5vcHRpb24sIC4uLm9wdGlvbiB9O1xuICAgIHRoaXMub3B0aW9uJC5uZXh0KHRoaXMub3B0aW9uKTtcblxuICAgIGlmIChvcHRpb24udGhlbWUpIHtcbiAgICAgIG1vbmFjby5lZGl0b3Iuc2V0VGhlbWUob3B0aW9uLnRoZW1lKTtcbiAgICB9XG4gIH1cblxuICByZXF1ZXN0VG9Jbml0KCk6IE9ic2VydmFibGU8Sm9pbmVkRWRpdG9yT3B0aW9ucz4ge1xuICAgIGlmIChsb2FkaW5nU3RhdHVzID09PSBOekNvZGVFZGl0b3JMb2FkaW5nU3RhdHVzLkxPQURFRCkge1xuICAgICAgdGhpcy5vbkluaXQoKTtcbiAgICAgIHJldHVybiBvZih0aGlzLmdldExhdGVzdE9wdGlvbigpKTtcbiAgICB9XG5cbiAgICBpZiAobG9hZGluZ1N0YXR1cyA9PT0gTnpDb2RlRWRpdG9yTG9hZGluZ1N0YXR1cy5VTkxPQUQpIHtcbiAgICAgIGlmICh0aGlzLmNvbmZpZy51c2VTdGF0aWNMb2FkaW5nICYmIHR5cGVvZiBtb25hY28gPT09ICd1bmRlZmluZWQnKSB7XG4gICAgICAgIHdhcm4oXG4gICAgICAgICAgJ1lvdSBjaG9vc2UgdG8gdXNlIHN0YXRpYyBsb2FkaW5nIGJ1dCBpdCBzZWVtcyB0aGF0IHlvdSBmb3JnZXQgJyArXG4gICAgICAgICAgICAndG8gY29uZmlnIHdlYnBhY2sgcGx1Z2luIGNvcnJlY3RseS4gUGxlYXNlIHJlZmVyIHRvIG91ciBvZmZpY2lhbCB3ZWJzaXRlJyArXG4gICAgICAgICAgICAnZm9yIG1vcmUgZGV0YWlscyBhYm91dCBzdGF0aWMgbG9hZGluZy4nXG4gICAgICAgICk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICB0aGlzLmxvYWRNb25hY29TY3JpcHQoKTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICByZXR1cm4gbG9hZGVkJC5waXBlKFxuICAgICAgdGFwKCgpID0+IHRoaXMub25Jbml0KCkpLFxuICAgICAgbWFwKCgpID0+IHRoaXMuZ2V0TGF0ZXN0T3B0aW9uKCkpXG4gICAgKTtcbiAgfVxuXG4gIHByaXZhdGUgbG9hZE1vbmFjb1NjcmlwdCgpOiB2b2lkIHtcbiAgICBpZiAodGhpcy5jb25maWcudXNlU3RhdGljTG9hZGluZykge1xuICAgICAgUHJvbWlzZS5yZXNvbHZlKCkudGhlbigoKSA9PiB0aGlzLm9uTG9hZCgpKTtcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICBpZiAobG9hZGluZ1N0YXR1cyA9PT0gTnpDb2RlRWRpdG9yTG9hZGluZ1N0YXR1cy5MT0FESU5HKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgbG9hZGluZ1N0YXR1cyA9IE56Q29kZUVkaXRvckxvYWRpbmdTdGF0dXMuTE9BRElORztcblxuICAgIGNvbnN0IGFzc2V0c1Jvb3QgPSB0aGlzLmNvbmZpZy5hc3NldHNSb290O1xuICAgIGNvbnN0IHZzID0gYXNzZXRzUm9vdCA/IGAke2Fzc2V0c1Jvb3R9L3ZzYCA6ICdhc3NldHMvdnMnO1xuICAgIGNvbnN0IHdpbmRvd0FzQW55ID0gd2luZG93IGFzIE56U2FmZUFueTtcbiAgICBjb25zdCBsb2FkU2NyaXB0ID0gdGhpcy5kb2N1bWVudC5jcmVhdGVFbGVtZW50KCdzY3JpcHQnKTtcblxuICAgIGxvYWRTY3JpcHQudHlwZSA9ICd0ZXh0L2phdmFzY3JpcHQnO1xuICAgIGxvYWRTY3JpcHQuc3JjID0gYCR7dnN9L2xvYWRlci5qc2A7XG5cbiAgICBjb25zdCBvbkxvYWQgPSAoKTogdm9pZCA9PiB7XG4gICAgICBjbGVhbnVwKCk7XG4gICAgICB3aW5kb3dBc0FueS5yZXF1aXJlLmNvbmZpZyh7XG4gICAgICAgIHBhdGhzOiB7IHZzIH1cbiAgICAgIH0pO1xuICAgICAgd2luZG93QXNBbnkucmVxdWlyZShbJ3ZzL2VkaXRvci9lZGl0b3IubWFpbiddLCAoKSA9PiB7XG4gICAgICAgIHRoaXMub25Mb2FkKCk7XG4gICAgICB9KTtcbiAgICB9O1xuXG4gICAgY29uc3Qgb25FcnJvciA9ICgpOiB2b2lkID0+IHtcbiAgICAgIGNsZWFudXAoKTtcbiAgICAgIHRocm93IG5ldyBFcnJvcihgJHtQUkVGSVh9IGNhbm5vdCBsb2FkIGFzc2V0cyBvZiBtb25hY28gZWRpdG9yIGZyb20gc291cmNlIFwiJHt2c31cIi5gKTtcbiAgICB9O1xuXG4gICAgY29uc3QgY2xlYW51cCA9ICgpOiB2b2lkID0+IHtcbiAgICAgIC8vIENhcmV0YWtlciBub3RlOiB3ZSBoYXZlIHRvIHJlbW92ZSB0aGVzZSBsaXN0ZW5lcnMgb25jZSB0aGUgYDxzY3JpcHQ+YCBpcyBsb2FkZWQgc3VjY2Vzc2Z1bGx5XG4gICAgICAvLyBvciBub3Qgc2luY2UgdGhlIGBvbkxvYWRgIGxpc3RlbmVyIGNhcHR1cmVzIGB0aGlzYCwgd2hpY2ggd2lsbCBwcmV2ZW50IHRoZSBgTnpDb2RlRWRpdG9yU2VydmljZWBcbiAgICAgIC8vIGZyb20gYmVpbmcgZ2FyYmFnZSBjb2xsZWN0ZWQuXG4gICAgICBsb2FkU2NyaXB0LnJlbW92ZUV2ZW50TGlzdGVuZXIoJ2xvYWQnLCBvbkxvYWQpO1xuICAgICAgbG9hZFNjcmlwdC5yZW1vdmVFdmVudExpc3RlbmVyKCdlcnJvcicsIG9uRXJyb3IpO1xuICAgICAgLy8gV2UgZG9uJ3QgbmVlZCB0byBrZWVwIHRoZSBgPHNjcmlwdD5gIGVsZW1lbnQgd2l0aGluIHRoZSBgPGJvZHk+YCBzaW5jZSBKYXZhU2NyaXB0IGhhc1xuICAgICAgLy8gYmVlbiBleGVjdXRlZCBhbmQgTW9uYWNvIGlzIGF2YWlsYWJsZSBnbG9iYWxseS4gRS5nLiBXZWJwYWNrLCBhbHdheXMgcmVtb3ZlcyBgPHNjcmlwdD5gXG4gICAgICAvLyBlbGVtZW50cyBhZnRlciBsb2FkaW5nIGNodW5rcyAoc2VlIGl0cyBgTG9hZFNjcmlwdFJ1bnRpbWVNb2R1bGVgKS5cbiAgICAgIHRoaXMuZG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50LnJlbW92ZUNoaWxkKGxvYWRTY3JpcHQpO1xuICAgIH07XG5cbiAgICBsb2FkU2NyaXB0LmFkZEV2ZW50TGlzdGVuZXIoJ2xvYWQnLCBvbkxvYWQpO1xuICAgIGxvYWRTY3JpcHQuYWRkRXZlbnRMaXN0ZW5lcignZXJyb3InLCBvbkVycm9yKTtcblxuICAgIHRoaXMuZG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50LmFwcGVuZENoaWxkKGxvYWRTY3JpcHQpO1xuICB9XG5cbiAgcHJpdmF0ZSBvbkxvYWQoKTogdm9pZCB7XG4gICAgbG9hZGluZ1N0YXR1cyA9IE56Q29kZUVkaXRvckxvYWRpbmdTdGF0dXMuTE9BREVEO1xuICAgIGxvYWRlZCQubmV4dCh0cnVlKTtcbiAgICBsb2FkZWQkLmNvbXBsZXRlKCk7XG5cbiAgICB0cnlUcmlnZ2VyRnVuYyh0aGlzLmNvbmZpZy5vbkxvYWQpKCk7XG4gIH1cblxuICBwcml2YXRlIG9uSW5pdCgpOiB2b2lkIHtcbiAgICBpZiAoIXRoaXMuZmlyc3RFZGl0b3JJbml0aWFsaXplZCkge1xuICAgICAgdGhpcy5maXJzdEVkaXRvckluaXRpYWxpemVkID0gdHJ1ZTtcbiAgICAgIHRyeVRyaWdnZXJGdW5jKHRoaXMuY29uZmlnLm9uRmlyc3RFZGl0b3JJbml0KSgpO1xuICAgIH1cblxuICAgIHRyeVRyaWdnZXJGdW5jKHRoaXMuY29uZmlnLm9uSW5pdCkoKTtcbiAgfVxuXG4gIHByaXZhdGUgZ2V0TGF0ZXN0T3B0aW9uKCk6IEpvaW5lZEVkaXRvck9wdGlvbnMge1xuICAgIHJldHVybiB7IC4uLnRoaXMub3B0aW9uIH07XG4gIH1cbn1cbiJdfQ==