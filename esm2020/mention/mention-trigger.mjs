/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */
import { Directive, EventEmitter, forwardRef } from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
import { NZ_MENTION_CONFIG } from './config';
import * as i0 from "@angular/core";
import * as i1 from "./mention.service";
export const NZ_MENTION_TRIGGER_ACCESSOR = {
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => NzMentionTriggerDirective),
    multi: true
};
export class NzMentionTriggerDirective {
    constructor(el, nzMentionService) {
        this.el = el;
        this.nzMentionService = nzMentionService;
        this.onChange = () => { };
        this.onTouched = () => { };
        this.onFocusin = new EventEmitter();
        this.onBlur = new EventEmitter();
        this.onInput = new EventEmitter();
        this.onKeydown = new EventEmitter();
        this.onClick = new EventEmitter();
    }
    completeEvents() {
        this.onFocusin.complete();
        this.onBlur.complete();
        this.onInput.complete();
        this.onKeydown.complete();
        this.onClick.complete();
    }
    focus(caretPos) {
        this.el.nativeElement.focus();
        this.el.nativeElement.setSelectionRange(caretPos, caretPos);
    }
    insertMention(mention) {
        const value = this.el.nativeElement.value;
        const insertValue = `${mention.mention}${NZ_MENTION_CONFIG.split}`;
        const newValue = [
            value.slice(0, mention.startPos + 1),
            insertValue,
            value.slice(mention.endPos, value.length)
        ].join('');
        this.el.nativeElement.value = newValue;
        this.focus(mention.startPos + insertValue.length + 1);
        this.onChange(newValue);
        this.value = newValue;
    }
    writeValue(value) {
        this.value = value;
        if (typeof value === 'string') {
            this.el.nativeElement.value = value;
        }
        else {
            this.el.nativeElement.value = '';
        }
    }
    registerOnChange(fn) {
        this.onChange = fn;
    }
    registerOnTouched(fn) {
        this.onTouched = fn;
    }
    ngAfterViewInit() {
        this.nzMentionService.registerTrigger(this);
    }
    ngOnDestroy() {
        this.completeEvents();
    }
}
NzMentionTriggerDirective.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.1.2", ngImport: i0, type: NzMentionTriggerDirective, deps: [{ token: i0.ElementRef }, { token: i1.NzMentionService }], target: i0.ɵɵFactoryTarget.Directive });
NzMentionTriggerDirective.ɵdir = i0.ɵɵngDeclareDirective({ minVersion: "12.0.0", version: "13.1.2", type: NzMentionTriggerDirective, selector: "input[nzMentionTrigger], textarea[nzMentionTrigger]", host: { attributes: { "autocomplete": "off" }, listeners: { "focusin": "onFocusin.emit()", "blur": "onBlur.emit()", "input": "onInput.emit($event)", "keydown": "onKeydown.emit($event)", "click": "onClick.emit($event)" } }, providers: [NZ_MENTION_TRIGGER_ACCESSOR], exportAs: ["nzMentionTrigger"], ngImport: i0 });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.1.2", ngImport: i0, type: NzMentionTriggerDirective, decorators: [{
            type: Directive,
            args: [{
                    selector: 'input[nzMentionTrigger], textarea[nzMentionTrigger]',
                    exportAs: 'nzMentionTrigger',
                    providers: [NZ_MENTION_TRIGGER_ACCESSOR],
                    host: {
                        autocomplete: 'off',
                        '(focusin)': 'onFocusin.emit()',
                        '(blur)': 'onBlur.emit()',
                        '(input)': 'onInput.emit($event)',
                        '(keydown)': 'onKeydown.emit($event)',
                        '(click)': 'onClick.emit($event)'
                    }
                }]
        }], ctorParameters: function () { return [{ type: i0.ElementRef }, { type: i1.NzMentionService }]; } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWVudGlvbi10cmlnZ2VyLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vY29tcG9uZW50cy9tZW50aW9uL21lbnRpb24tdHJpZ2dlci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7O0dBR0c7QUFFSCxPQUFPLEVBRUwsU0FBUyxFQUVULFlBQVksRUFFWixVQUFVLEVBRVgsTUFBTSxlQUFlLENBQUM7QUFDdkIsT0FBTyxFQUF3QixpQkFBaUIsRUFBRSxNQUFNLGdCQUFnQixDQUFDO0FBSXpFLE9BQU8sRUFBRSxpQkFBaUIsRUFBRSxNQUFNLFVBQVUsQ0FBQzs7O0FBSTdDLE1BQU0sQ0FBQyxNQUFNLDJCQUEyQixHQUFxQjtJQUMzRCxPQUFPLEVBQUUsaUJBQWlCO0lBQzFCLFdBQVcsRUFBRSxVQUFVLENBQUMsR0FBRyxFQUFFLENBQUMseUJBQXlCLENBQUM7SUFDeEQsS0FBSyxFQUFFLElBQUk7Q0FDWixDQUFDO0FBZUYsTUFBTSxPQUFPLHlCQUF5QjtJQVdwQyxZQUFtQixFQUFjLEVBQVUsZ0JBQWtDO1FBQTFELE9BQUUsR0FBRixFQUFFLENBQVk7UUFBVSxxQkFBZ0IsR0FBaEIsZ0JBQWdCLENBQWtCO1FBVjdFLGFBQVEsR0FBaUIsR0FBRyxFQUFFLEdBQUUsQ0FBQyxDQUFDO1FBQ2xDLGNBQVMsR0FBa0IsR0FBRyxFQUFFLEdBQUUsQ0FBQyxDQUFDO1FBRTNCLGNBQVMsR0FBdUIsSUFBSSxZQUFZLEVBQUUsQ0FBQztRQUNuRCxXQUFNLEdBQXVCLElBQUksWUFBWSxFQUFFLENBQUM7UUFDaEQsWUFBTyxHQUFnQyxJQUFJLFlBQVksRUFBRSxDQUFDO1FBQzFELGNBQVMsR0FBZ0MsSUFBSSxZQUFZLEVBQUUsQ0FBQztRQUM1RCxZQUFPLEdBQTZCLElBQUksWUFBWSxFQUFFLENBQUM7SUFHZ0IsQ0FBQztJQUVqRixjQUFjO1FBQ1osSUFBSSxDQUFDLFNBQVMsQ0FBQyxRQUFRLEVBQUUsQ0FBQztRQUMxQixJQUFJLENBQUMsTUFBTSxDQUFDLFFBQVEsRUFBRSxDQUFDO1FBQ3ZCLElBQUksQ0FBQyxPQUFPLENBQUMsUUFBUSxFQUFFLENBQUM7UUFDeEIsSUFBSSxDQUFDLFNBQVMsQ0FBQyxRQUFRLEVBQUUsQ0FBQztRQUMxQixJQUFJLENBQUMsT0FBTyxDQUFDLFFBQVEsRUFBRSxDQUFDO0lBQzFCLENBQUM7SUFFRCxLQUFLLENBQUMsUUFBaUI7UUFDckIsSUFBSSxDQUFDLEVBQUUsQ0FBQyxhQUFhLENBQUMsS0FBSyxFQUFFLENBQUM7UUFDOUIsSUFBSSxDQUFDLEVBQUUsQ0FBQyxhQUFhLENBQUMsaUJBQWlCLENBQUMsUUFBUSxFQUFFLFFBQVEsQ0FBQyxDQUFDO0lBQzlELENBQUM7SUFFRCxhQUFhLENBQUMsT0FBZ0I7UUFDNUIsTUFBTSxLQUFLLEdBQVcsSUFBSSxDQUFDLEVBQUUsQ0FBQyxhQUFhLENBQUMsS0FBSyxDQUFDO1FBQ2xELE1BQU0sV0FBVyxHQUFHLEdBQUcsT0FBTyxDQUFDLE9BQU8sR0FBRyxpQkFBaUIsQ0FBQyxLQUFLLEVBQUUsQ0FBQztRQUNuRSxNQUFNLFFBQVEsR0FBRztZQUNmLEtBQUssQ0FBQyxLQUFLLENBQUMsQ0FBQyxFQUFFLE9BQU8sQ0FBQyxRQUFRLEdBQUcsQ0FBQyxDQUFDO1lBQ3BDLFdBQVc7WUFDWCxLQUFLLENBQUMsS0FBSyxDQUFDLE9BQU8sQ0FBQyxNQUFNLEVBQUUsS0FBSyxDQUFDLE1BQU0sQ0FBQztTQUMxQyxDQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsQ0FBQztRQUNYLElBQUksQ0FBQyxFQUFFLENBQUMsYUFBYSxDQUFDLEtBQUssR0FBRyxRQUFRLENBQUM7UUFDdkMsSUFBSSxDQUFDLEtBQUssQ0FBQyxPQUFPLENBQUMsUUFBUSxHQUFHLFdBQVcsQ0FBQyxNQUFNLEdBQUcsQ0FBQyxDQUFDLENBQUM7UUFDdEQsSUFBSSxDQUFDLFFBQVEsQ0FBQyxRQUFRLENBQUMsQ0FBQztRQUN4QixJQUFJLENBQUMsS0FBSyxHQUFHLFFBQVEsQ0FBQztJQUN4QixDQUFDO0lBRUQsVUFBVSxDQUFDLEtBQWE7UUFDdEIsSUFBSSxDQUFDLEtBQUssR0FBRyxLQUFLLENBQUM7UUFDbkIsSUFBSSxPQUFPLEtBQUssS0FBSyxRQUFRLEVBQUU7WUFDN0IsSUFBSSxDQUFDLEVBQUUsQ0FBQyxhQUFhLENBQUMsS0FBSyxHQUFHLEtBQUssQ0FBQztTQUNyQzthQUFNO1lBQ0wsSUFBSSxDQUFDLEVBQUUsQ0FBQyxhQUFhLENBQUMsS0FBSyxHQUFHLEVBQUUsQ0FBQztTQUNsQztJQUNILENBQUM7SUFFRCxnQkFBZ0IsQ0FBQyxFQUEyQjtRQUMxQyxJQUFJLENBQUMsUUFBUSxHQUFHLEVBQUUsQ0FBQztJQUNyQixDQUFDO0lBRUQsaUJBQWlCLENBQUMsRUFBYztRQUM5QixJQUFJLENBQUMsU0FBUyxHQUFHLEVBQUUsQ0FBQztJQUN0QixDQUFDO0lBRUQsZUFBZTtRQUNiLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxlQUFlLENBQUMsSUFBSSxDQUFDLENBQUM7SUFDOUMsQ0FBQztJQUVELFdBQVc7UUFDVCxJQUFJLENBQUMsY0FBYyxFQUFFLENBQUM7SUFDeEIsQ0FBQzs7c0hBL0RVLHlCQUF5QjswR0FBekIseUJBQXlCLDZTQVZ6QixDQUFDLDJCQUEyQixDQUFDOzJGQVU3Qix5QkFBeUI7a0JBYnJDLFNBQVM7bUJBQUM7b0JBQ1QsUUFBUSxFQUFFLHFEQUFxRDtvQkFDL0QsUUFBUSxFQUFFLGtCQUFrQjtvQkFDNUIsU0FBUyxFQUFFLENBQUMsMkJBQTJCLENBQUM7b0JBQ3hDLElBQUksRUFBRTt3QkFDSixZQUFZLEVBQUUsS0FBSzt3QkFDbkIsV0FBVyxFQUFFLGtCQUFrQjt3QkFDL0IsUUFBUSxFQUFFLGVBQWU7d0JBQ3pCLFNBQVMsRUFBRSxzQkFBc0I7d0JBQ2pDLFdBQVcsRUFBRSx3QkFBd0I7d0JBQ3JDLFNBQVMsRUFBRSxzQkFBc0I7cUJBQ2xDO2lCQUNGIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKiBVc2Ugb2YgdGhpcyBzb3VyY2UgY29kZSBpcyBnb3Zlcm5lZCBieSBhbiBNSVQtc3R5bGUgbGljZW5zZSB0aGF0IGNhbiBiZVxuICogZm91bmQgaW4gdGhlIExJQ0VOU0UgZmlsZSBhdCBodHRwczovL2dpdGh1Yi5jb20vTkctWk9SUk8vbmctem9ycm8tYW50ZC9ibG9iL21hc3Rlci9MSUNFTlNFXG4gKi9cblxuaW1wb3J0IHtcbiAgQWZ0ZXJWaWV3SW5pdCxcbiAgRGlyZWN0aXZlLFxuICBFbGVtZW50UmVmLFxuICBFdmVudEVtaXR0ZXIsXG4gIEV4aXN0aW5nUHJvdmlkZXIsXG4gIGZvcndhcmRSZWYsXG4gIE9uRGVzdHJveVxufSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IENvbnRyb2xWYWx1ZUFjY2Vzc29yLCBOR19WQUxVRV9BQ0NFU1NPUiB9IGZyb20gJ0Bhbmd1bGFyL2Zvcm1zJztcblxuaW1wb3J0IHsgT25DaGFuZ2VUeXBlLCBPblRvdWNoZWRUeXBlIH0gZnJvbSAnbmctem9ycm8tYW50ZC9jb3JlL3R5cGVzJztcblxuaW1wb3J0IHsgTlpfTUVOVElPTl9DT05GSUcgfSBmcm9tICcuL2NvbmZpZyc7XG5pbXBvcnQgeyBNZW50aW9uIH0gZnJvbSAnLi9tZW50aW9uLmNvbXBvbmVudCc7XG5pbXBvcnQgeyBOek1lbnRpb25TZXJ2aWNlIH0gZnJvbSAnLi9tZW50aW9uLnNlcnZpY2UnO1xuXG5leHBvcnQgY29uc3QgTlpfTUVOVElPTl9UUklHR0VSX0FDQ0VTU09SOiBFeGlzdGluZ1Byb3ZpZGVyID0ge1xuICBwcm92aWRlOiBOR19WQUxVRV9BQ0NFU1NPUixcbiAgdXNlRXhpc3Rpbmc6IGZvcndhcmRSZWYoKCkgPT4gTnpNZW50aW9uVHJpZ2dlckRpcmVjdGl2ZSksXG4gIG11bHRpOiB0cnVlXG59O1xuXG5ARGlyZWN0aXZlKHtcbiAgc2VsZWN0b3I6ICdpbnB1dFtuek1lbnRpb25UcmlnZ2VyXSwgdGV4dGFyZWFbbnpNZW50aW9uVHJpZ2dlcl0nLFxuICBleHBvcnRBczogJ256TWVudGlvblRyaWdnZXInLFxuICBwcm92aWRlcnM6IFtOWl9NRU5USU9OX1RSSUdHRVJfQUNDRVNTT1JdLFxuICBob3N0OiB7XG4gICAgYXV0b2NvbXBsZXRlOiAnb2ZmJyxcbiAgICAnKGZvY3VzaW4pJzogJ29uRm9jdXNpbi5lbWl0KCknLFxuICAgICcoYmx1ciknOiAnb25CbHVyLmVtaXQoKScsXG4gICAgJyhpbnB1dCknOiAnb25JbnB1dC5lbWl0KCRldmVudCknLFxuICAgICcoa2V5ZG93biknOiAnb25LZXlkb3duLmVtaXQoJGV2ZW50KScsXG4gICAgJyhjbGljayknOiAnb25DbGljay5lbWl0KCRldmVudCknXG4gIH1cbn0pXG5leHBvcnQgY2xhc3MgTnpNZW50aW9uVHJpZ2dlckRpcmVjdGl2ZSBpbXBsZW1lbnRzIENvbnRyb2xWYWx1ZUFjY2Vzc29yLCBPbkRlc3Ryb3ksIEFmdGVyVmlld0luaXQge1xuICBvbkNoYW5nZTogT25DaGFuZ2VUeXBlID0gKCkgPT4ge307XG4gIG9uVG91Y2hlZDogT25Ub3VjaGVkVHlwZSA9ICgpID0+IHt9O1xuXG4gIHJlYWRvbmx5IG9uRm9jdXNpbjogRXZlbnRFbWl0dGVyPHZvaWQ+ID0gbmV3IEV2ZW50RW1pdHRlcigpO1xuICByZWFkb25seSBvbkJsdXI6IEV2ZW50RW1pdHRlcjx2b2lkPiA9IG5ldyBFdmVudEVtaXR0ZXIoKTtcbiAgcmVhZG9ubHkgb25JbnB1dDogRXZlbnRFbWl0dGVyPEtleWJvYXJkRXZlbnQ+ID0gbmV3IEV2ZW50RW1pdHRlcigpO1xuICByZWFkb25seSBvbktleWRvd246IEV2ZW50RW1pdHRlcjxLZXlib2FyZEV2ZW50PiA9IG5ldyBFdmVudEVtaXR0ZXIoKTtcbiAgcmVhZG9ubHkgb25DbGljazogRXZlbnRFbWl0dGVyPE1vdXNlRXZlbnQ+ID0gbmV3IEV2ZW50RW1pdHRlcigpO1xuICB2YWx1ZT86IHN0cmluZztcblxuICBjb25zdHJ1Y3RvcihwdWJsaWMgZWw6IEVsZW1lbnRSZWYsIHByaXZhdGUgbnpNZW50aW9uU2VydmljZTogTnpNZW50aW9uU2VydmljZSkge31cblxuICBjb21wbGV0ZUV2ZW50cygpOiB2b2lkIHtcbiAgICB0aGlzLm9uRm9jdXNpbi5jb21wbGV0ZSgpO1xuICAgIHRoaXMub25CbHVyLmNvbXBsZXRlKCk7XG4gICAgdGhpcy5vbklucHV0LmNvbXBsZXRlKCk7XG4gICAgdGhpcy5vbktleWRvd24uY29tcGxldGUoKTtcbiAgICB0aGlzLm9uQ2xpY2suY29tcGxldGUoKTtcbiAgfVxuXG4gIGZvY3VzKGNhcmV0UG9zPzogbnVtYmVyKTogdm9pZCB7XG4gICAgdGhpcy5lbC5uYXRpdmVFbGVtZW50LmZvY3VzKCk7XG4gICAgdGhpcy5lbC5uYXRpdmVFbGVtZW50LnNldFNlbGVjdGlvblJhbmdlKGNhcmV0UG9zLCBjYXJldFBvcyk7XG4gIH1cblxuICBpbnNlcnRNZW50aW9uKG1lbnRpb246IE1lbnRpb24pOiB2b2lkIHtcbiAgICBjb25zdCB2YWx1ZTogc3RyaW5nID0gdGhpcy5lbC5uYXRpdmVFbGVtZW50LnZhbHVlO1xuICAgIGNvbnN0IGluc2VydFZhbHVlID0gYCR7bWVudGlvbi5tZW50aW9ufSR7TlpfTUVOVElPTl9DT05GSUcuc3BsaXR9YDtcbiAgICBjb25zdCBuZXdWYWx1ZSA9IFtcbiAgICAgIHZhbHVlLnNsaWNlKDAsIG1lbnRpb24uc3RhcnRQb3MgKyAxKSxcbiAgICAgIGluc2VydFZhbHVlLFxuICAgICAgdmFsdWUuc2xpY2UobWVudGlvbi5lbmRQb3MsIHZhbHVlLmxlbmd0aClcbiAgICBdLmpvaW4oJycpO1xuICAgIHRoaXMuZWwubmF0aXZlRWxlbWVudC52YWx1ZSA9IG5ld1ZhbHVlO1xuICAgIHRoaXMuZm9jdXMobWVudGlvbi5zdGFydFBvcyArIGluc2VydFZhbHVlLmxlbmd0aCArIDEpO1xuICAgIHRoaXMub25DaGFuZ2UobmV3VmFsdWUpO1xuICAgIHRoaXMudmFsdWUgPSBuZXdWYWx1ZTtcbiAgfVxuXG4gIHdyaXRlVmFsdWUodmFsdWU6IHN0cmluZyk6IHZvaWQge1xuICAgIHRoaXMudmFsdWUgPSB2YWx1ZTtcbiAgICBpZiAodHlwZW9mIHZhbHVlID09PSAnc3RyaW5nJykge1xuICAgICAgdGhpcy5lbC5uYXRpdmVFbGVtZW50LnZhbHVlID0gdmFsdWU7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMuZWwubmF0aXZlRWxlbWVudC52YWx1ZSA9ICcnO1xuICAgIH1cbiAgfVxuXG4gIHJlZ2lzdGVyT25DaGFuZ2UoZm46ICh2YWx1ZTogc3RyaW5nKSA9PiB2b2lkKTogdm9pZCB7XG4gICAgdGhpcy5vbkNoYW5nZSA9IGZuO1xuICB9XG5cbiAgcmVnaXN0ZXJPblRvdWNoZWQoZm46ICgpID0+IHZvaWQpOiB2b2lkIHtcbiAgICB0aGlzLm9uVG91Y2hlZCA9IGZuO1xuICB9XG5cbiAgbmdBZnRlclZpZXdJbml0KCk6IHZvaWQge1xuICAgIHRoaXMubnpNZW50aW9uU2VydmljZS5yZWdpc3RlclRyaWdnZXIodGhpcyk7XG4gIH1cblxuICBuZ09uRGVzdHJveSgpOiB2b2lkIHtcbiAgICB0aGlzLmNvbXBsZXRlRXZlbnRzKCk7XG4gIH1cbn1cbiJdfQ==