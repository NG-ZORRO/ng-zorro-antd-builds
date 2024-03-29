/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */
import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';
import * as i0 from "@angular/core";
export class MenuService {
    constructor() {
        /** all descendant menu click **/
        this.descendantMenuItemClick$ = new Subject();
        /** child menu item click **/
        this.childMenuItemClick$ = new Subject();
        this.theme$ = new BehaviorSubject('light');
        this.mode$ = new BehaviorSubject('vertical');
        this.inlineIndent$ = new BehaviorSubject(24);
        this.isChildSubMenuOpen$ = new BehaviorSubject(false);
    }
    onDescendantMenuItemClick(menu) {
        this.descendantMenuItemClick$.next(menu);
    }
    onChildMenuItemClick(menu) {
        this.childMenuItemClick$.next(menu);
    }
    setMode(mode) {
        this.mode$.next(mode);
    }
    setTheme(theme) {
        this.theme$.next(theme);
    }
    setInlineIndent(indent) {
        this.inlineIndent$.next(indent);
    }
}
MenuService.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.1.2", ngImport: i0, type: MenuService, deps: [], target: i0.ɵɵFactoryTarget.Injectable });
MenuService.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "13.1.2", ngImport: i0, type: MenuService });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.1.2", ngImport: i0, type: MenuService, decorators: [{
            type: Injectable
        }] });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWVudS5zZXJ2aWNlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vY29tcG9uZW50cy9tZW51L21lbnUuc2VydmljZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7O0dBR0c7QUFFSCxPQUFPLEVBQUUsVUFBVSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQzNDLE9BQU8sRUFBRSxlQUFlLEVBQUUsT0FBTyxFQUFFLE1BQU0sTUFBTSxDQUFDOztBQU9oRCxNQUFNLE9BQU8sV0FBVztJQUR4QjtRQUVFLGlDQUFpQztRQUNqQyw2QkFBd0IsR0FBRyxJQUFJLE9BQU8sRUFBYSxDQUFDO1FBQ3BELDZCQUE2QjtRQUM3Qix3QkFBbUIsR0FBRyxJQUFJLE9BQU8sRUFBYSxDQUFDO1FBQy9DLFdBQU0sR0FBRyxJQUFJLGVBQWUsQ0FBa0IsT0FBTyxDQUFDLENBQUM7UUFDdkQsVUFBSyxHQUFHLElBQUksZUFBZSxDQUFpQixVQUFVLENBQUMsQ0FBQztRQUN4RCxrQkFBYSxHQUFHLElBQUksZUFBZSxDQUFTLEVBQUUsQ0FBQyxDQUFDO1FBQ2hELHdCQUFtQixHQUFHLElBQUksZUFBZSxDQUFVLEtBQUssQ0FBQyxDQUFDO0tBcUIzRDtJQW5CQyx5QkFBeUIsQ0FBQyxJQUFlO1FBQ3ZDLElBQUksQ0FBQyx3QkFBd0IsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUM7SUFDM0MsQ0FBQztJQUVELG9CQUFvQixDQUFDLElBQWU7UUFDbEMsSUFBSSxDQUFDLG1CQUFtQixDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQztJQUN0QyxDQUFDO0lBRUQsT0FBTyxDQUFDLElBQW9CO1FBQzFCLElBQUksQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDO0lBQ3hCLENBQUM7SUFFRCxRQUFRLENBQUMsS0FBc0I7UUFDN0IsSUFBSSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUM7SUFDMUIsQ0FBQztJQUVELGVBQWUsQ0FBQyxNQUFjO1FBQzVCLElBQUksQ0FBQyxhQUFhLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDO0lBQ2xDLENBQUM7O3dHQTVCVSxXQUFXOzRHQUFYLFdBQVc7MkZBQVgsV0FBVztrQkFEdkIsVUFBVSIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxuICogVXNlIG9mIHRoaXMgc291cmNlIGNvZGUgaXMgZ292ZXJuZWQgYnkgYW4gTUlULXN0eWxlIGxpY2Vuc2UgdGhhdCBjYW4gYmVcbiAqIGZvdW5kIGluIHRoZSBMSUNFTlNFIGZpbGUgYXQgaHR0cHM6Ly9naXRodWIuY29tL05HLVpPUlJPL25nLXpvcnJvLWFudGQvYmxvYi9tYXN0ZXIvTElDRU5TRVxuICovXG5cbmltcG9ydCB7IEluamVjdGFibGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IEJlaGF2aW9yU3ViamVjdCwgU3ViamVjdCB9IGZyb20gJ3J4anMnO1xuXG5pbXBvcnQgeyBOelNhZmVBbnkgfSBmcm9tICduZy16b3Jyby1hbnRkL2NvcmUvdHlwZXMnO1xuXG5pbXBvcnQgeyBOek1lbnVNb2RlVHlwZSwgTnpNZW51VGhlbWVUeXBlIH0gZnJvbSAnLi9tZW51LnR5cGVzJztcblxuQEluamVjdGFibGUoKVxuZXhwb3J0IGNsYXNzIE1lbnVTZXJ2aWNlIHtcbiAgLyoqIGFsbCBkZXNjZW5kYW50IG1lbnUgY2xpY2sgKiovXG4gIGRlc2NlbmRhbnRNZW51SXRlbUNsaWNrJCA9IG5ldyBTdWJqZWN0PE56U2FmZUFueT4oKTtcbiAgLyoqIGNoaWxkIG1lbnUgaXRlbSBjbGljayAqKi9cbiAgY2hpbGRNZW51SXRlbUNsaWNrJCA9IG5ldyBTdWJqZWN0PE56U2FmZUFueT4oKTtcbiAgdGhlbWUkID0gbmV3IEJlaGF2aW9yU3ViamVjdDxOek1lbnVUaGVtZVR5cGU+KCdsaWdodCcpO1xuICBtb2RlJCA9IG5ldyBCZWhhdmlvclN1YmplY3Q8TnpNZW51TW9kZVR5cGU+KCd2ZXJ0aWNhbCcpO1xuICBpbmxpbmVJbmRlbnQkID0gbmV3IEJlaGF2aW9yU3ViamVjdDxudW1iZXI+KDI0KTtcbiAgaXNDaGlsZFN1Yk1lbnVPcGVuJCA9IG5ldyBCZWhhdmlvclN1YmplY3Q8Ym9vbGVhbj4oZmFsc2UpO1xuXG4gIG9uRGVzY2VuZGFudE1lbnVJdGVtQ2xpY2sobWVudTogTnpTYWZlQW55KTogdm9pZCB7XG4gICAgdGhpcy5kZXNjZW5kYW50TWVudUl0ZW1DbGljayQubmV4dChtZW51KTtcbiAgfVxuXG4gIG9uQ2hpbGRNZW51SXRlbUNsaWNrKG1lbnU6IE56U2FmZUFueSk6IHZvaWQge1xuICAgIHRoaXMuY2hpbGRNZW51SXRlbUNsaWNrJC5uZXh0KG1lbnUpO1xuICB9XG5cbiAgc2V0TW9kZShtb2RlOiBOek1lbnVNb2RlVHlwZSk6IHZvaWQge1xuICAgIHRoaXMubW9kZSQubmV4dChtb2RlKTtcbiAgfVxuXG4gIHNldFRoZW1lKHRoZW1lOiBOek1lbnVUaGVtZVR5cGUpOiB2b2lkIHtcbiAgICB0aGlzLnRoZW1lJC5uZXh0KHRoZW1lKTtcbiAgfVxuXG4gIHNldElubGluZUluZGVudChpbmRlbnQ6IG51bWJlcik6IHZvaWQge1xuICAgIHRoaXMuaW5saW5lSW5kZW50JC5uZXh0KGluZGVudCk7XG4gIH1cbn1cbiJdfQ==