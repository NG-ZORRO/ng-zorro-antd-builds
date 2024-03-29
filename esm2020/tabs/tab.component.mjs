import { __decorate } from "tslib";
/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */
import { ChangeDetectionStrategy, Component, ContentChild, EventEmitter, Inject, InjectionToken, Input, Output, TemplateRef, ViewChild, ViewEncapsulation } from '@angular/core';
import { Subject } from 'rxjs';
import { InputBoolean } from 'ng-zorro-antd/core/util';
import { NzTabLinkDirective, NzTabLinkTemplateDirective } from './tab-link.directive';
import { NzTabDirective } from './tab.directive';
import * as i0 from "@angular/core";
/**
 * Used to provide a tab set to a tab without causing a circular dependency.
 */
export const NZ_TAB_SET = new InjectionToken('NZ_TAB_SET');
export class NzTabComponent {
    constructor(closestTabSet) {
        this.closestTabSet = closestTabSet;
        this.nzTitle = '';
        this.nzClosable = false;
        this.nzCloseIcon = 'close';
        this.nzDisabled = false;
        this.nzForceRender = false;
        this.nzSelect = new EventEmitter();
        this.nzDeselect = new EventEmitter();
        this.nzClick = new EventEmitter();
        this.nzContextmenu = new EventEmitter();
        this.template = null;
        this.isActive = false;
        this.position = null;
        this.origin = null;
        this.stateChanges = new Subject();
    }
    get content() {
        return this.template || this.contentTemplate;
    }
    get label() {
        return this.nzTitle || this.nzTabLinkTemplateDirective?.templateRef;
    }
    ngOnChanges(changes) {
        const { nzTitle, nzDisabled, nzForceRender } = changes;
        if (nzTitle || nzDisabled || nzForceRender) {
            this.stateChanges.next();
        }
    }
    ngOnDestroy() {
        this.stateChanges.complete();
    }
}
NzTabComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.1.2", ngImport: i0, type: NzTabComponent, deps: [{ token: NZ_TAB_SET }], target: i0.ɵɵFactoryTarget.Component });
NzTabComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "13.1.2", type: NzTabComponent, selector: "nz-tab", inputs: { nzTitle: "nzTitle", nzClosable: "nzClosable", nzCloseIcon: "nzCloseIcon", nzDisabled: "nzDisabled", nzForceRender: "nzForceRender" }, outputs: { nzSelect: "nzSelect", nzDeselect: "nzDeselect", nzClick: "nzClick", nzContextmenu: "nzContextmenu" }, queries: [{ propertyName: "nzTabLinkTemplateDirective", first: true, predicate: NzTabLinkTemplateDirective, descendants: true }, { propertyName: "template", first: true, predicate: NzTabDirective, descendants: true, read: TemplateRef }, { propertyName: "linkDirective", first: true, predicate: NzTabLinkDirective, descendants: true }], viewQueries: [{ propertyName: "contentTemplate", first: true, predicate: ["contentTemplate"], descendants: true, static: true }], exportAs: ["nzTab"], usesOnChanges: true, ngImport: i0, template: `
    <ng-template #tabLinkTemplate>
      <ng-content select="[nz-tab-link]"></ng-content>
    </ng-template>
    <ng-template #contentTemplate><ng-content></ng-content></ng-template>
  `, isInline: true, changeDetection: i0.ChangeDetectionStrategy.OnPush, encapsulation: i0.ViewEncapsulation.None });
__decorate([
    InputBoolean()
], NzTabComponent.prototype, "nzClosable", void 0);
__decorate([
    InputBoolean()
], NzTabComponent.prototype, "nzDisabled", void 0);
__decorate([
    InputBoolean()
], NzTabComponent.prototype, "nzForceRender", void 0);
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.1.2", ngImport: i0, type: NzTabComponent, decorators: [{
            type: Component,
            args: [{
                    selector: 'nz-tab',
                    exportAs: 'nzTab',
                    preserveWhitespaces: false,
                    encapsulation: ViewEncapsulation.None,
                    changeDetection: ChangeDetectionStrategy.OnPush,
                    template: `
    <ng-template #tabLinkTemplate>
      <ng-content select="[nz-tab-link]"></ng-content>
    </ng-template>
    <ng-template #contentTemplate><ng-content></ng-content></ng-template>
  `
                }]
        }], ctorParameters: function () { return [{ type: undefined, decorators: [{
                    type: Inject,
                    args: [NZ_TAB_SET]
                }] }]; }, propDecorators: { nzTitle: [{
                type: Input
            }], nzClosable: [{
                type: Input
            }], nzCloseIcon: [{
                type: Input
            }], nzDisabled: [{
                type: Input
            }], nzForceRender: [{
                type: Input
            }], nzSelect: [{
                type: Output
            }], nzDeselect: [{
                type: Output
            }], nzClick: [{
                type: Output
            }], nzContextmenu: [{
                type: Output
            }], nzTabLinkTemplateDirective: [{
                type: ContentChild,
                args: [NzTabLinkTemplateDirective, { static: false }]
            }], template: [{
                type: ContentChild,
                args: [NzTabDirective, { static: false, read: TemplateRef }]
            }], linkDirective: [{
                type: ContentChild,
                args: [NzTabLinkDirective, { static: false }]
            }], contentTemplate: [{
                type: ViewChild,
                args: ['contentTemplate', { static: true }]
            }] } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGFiLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL2NvbXBvbmVudHMvdGFicy90YWIuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQTs7O0dBR0c7QUFFSCxPQUFPLEVBQ0wsdUJBQXVCLEVBQ3ZCLFNBQVMsRUFDVCxZQUFZLEVBQ1osWUFBWSxFQUNaLE1BQU0sRUFDTixjQUFjLEVBQ2QsS0FBSyxFQUdMLE1BQU0sRUFFTixXQUFXLEVBQ1gsU0FBUyxFQUNULGlCQUFpQixFQUNsQixNQUFNLGVBQWUsQ0FBQztBQUN2QixPQUFPLEVBQUUsT0FBTyxFQUFFLE1BQU0sTUFBTSxDQUFDO0FBRy9CLE9BQU8sRUFBRSxZQUFZLEVBQUUsTUFBTSx5QkFBeUIsQ0FBQztBQUd2RCxPQUFPLEVBQUUsa0JBQWtCLEVBQUUsMEJBQTBCLEVBQUUsTUFBTSxzQkFBc0IsQ0FBQztBQUN0RixPQUFPLEVBQUUsY0FBYyxFQUFFLE1BQU0saUJBQWlCLENBQUM7O0FBRWpEOztHQUVHO0FBQ0gsTUFBTSxDQUFDLE1BQU0sVUFBVSxHQUFHLElBQUksY0FBYyxDQUFZLFlBQVksQ0FBQyxDQUFDO0FBZXRFLE1BQU0sT0FBTyxjQUFjO0lBaUN6QixZQUF1QyxhQUF3QjtRQUF4QixrQkFBYSxHQUFiLGFBQWEsQ0FBVztRQTVCdEQsWUFBTyxHQUE2QyxFQUFFLENBQUM7UUFDdkMsZUFBVSxHQUFHLEtBQUssQ0FBQztRQUNuQyxnQkFBVyxHQUFvQyxPQUFPLENBQUM7UUFDdkMsZUFBVSxHQUFHLEtBQUssQ0FBQztRQUNuQixrQkFBYSxHQUFHLEtBQUssQ0FBQztRQUM1QixhQUFRLEdBQUcsSUFBSSxZQUFZLEVBQVEsQ0FBQztRQUNwQyxlQUFVLEdBQUcsSUFBSSxZQUFZLEVBQVEsQ0FBQztRQUN0QyxZQUFPLEdBQUcsSUFBSSxZQUFZLEVBQVEsQ0FBQztRQUNuQyxrQkFBYSxHQUFHLElBQUksWUFBWSxFQUFjLENBQUM7UUFHRSxhQUFRLEdBQTZCLElBQUksQ0FBQztRQUk5RyxhQUFRLEdBQVksS0FBSyxDQUFDO1FBQzFCLGFBQVEsR0FBa0IsSUFBSSxDQUFDO1FBQy9CLFdBQU0sR0FBa0IsSUFBSSxDQUFDO1FBQ3BCLGlCQUFZLEdBQUcsSUFBSSxPQUFPLEVBQVEsQ0FBQztJQVVzQixDQUFDO0lBUm5FLElBQUksT0FBTztRQUNULE9BQU8sSUFBSSxDQUFDLFFBQVEsSUFBSSxJQUFJLENBQUMsZUFBZSxDQUFDO0lBQy9DLENBQUM7SUFFRCxJQUFJLEtBQUs7UUFDUCxPQUFPLElBQUksQ0FBQyxPQUFPLElBQUksSUFBSSxDQUFDLDBCQUEwQixFQUFFLFdBQVcsQ0FBQztJQUN0RSxDQUFDO0lBSUQsV0FBVyxDQUFDLE9BQXNCO1FBQ2hDLE1BQU0sRUFBRSxPQUFPLEVBQUUsVUFBVSxFQUFFLGFBQWEsRUFBRSxHQUFHLE9BQU8sQ0FBQztRQUN2RCxJQUFJLE9BQU8sSUFBSSxVQUFVLElBQUksYUFBYSxFQUFFO1lBQzFDLElBQUksQ0FBQyxZQUFZLENBQUMsSUFBSSxFQUFFLENBQUM7U0FDMUI7SUFDSCxDQUFDO0lBRUQsV0FBVztRQUNULElBQUksQ0FBQyxZQUFZLENBQUMsUUFBUSxFQUFFLENBQUM7SUFDL0IsQ0FBQzs7MkdBNUNVLGNBQWMsa0JBaUNMLFVBQVU7K0ZBakNuQixjQUFjLHVXQWVYLDBCQUEwQiwyRUFDMUIsY0FBYywyQkFBeUIsV0FBVyw2REFDbEQsa0JBQWtCLDROQXhCdEI7Ozs7O0dBS1Q7QUFRd0I7SUFBZixZQUFZLEVBQUU7a0RBQW9CO0FBRW5CO0lBQWYsWUFBWSxFQUFFO2tEQUFvQjtBQUNuQjtJQUFmLFlBQVksRUFBRTtxREFBdUI7MkZBVHBDLGNBQWM7a0JBYjFCLFNBQVM7bUJBQUM7b0JBQ1QsUUFBUSxFQUFFLFFBQVE7b0JBQ2xCLFFBQVEsRUFBRSxPQUFPO29CQUNqQixtQkFBbUIsRUFBRSxLQUFLO29CQUMxQixhQUFhLEVBQUUsaUJBQWlCLENBQUMsSUFBSTtvQkFDckMsZUFBZSxFQUFFLHVCQUF1QixDQUFDLE1BQU07b0JBQy9DLFFBQVEsRUFBRTs7Ozs7R0FLVDtpQkFDRjs7MEJBa0NjLE1BQU07MkJBQUMsVUFBVTs0Q0E1QnJCLE9BQU87c0JBQWYsS0FBSztnQkFDbUIsVUFBVTtzQkFBbEMsS0FBSztnQkFDRyxXQUFXO3NCQUFuQixLQUFLO2dCQUNtQixVQUFVO3NCQUFsQyxLQUFLO2dCQUNtQixhQUFhO3NCQUFyQyxLQUFLO2dCQUNhLFFBQVE7c0JBQTFCLE1BQU07Z0JBQ1ksVUFBVTtzQkFBNUIsTUFBTTtnQkFDWSxPQUFPO3NCQUF6QixNQUFNO2dCQUNZLGFBQWE7c0JBQS9CLE1BQU07Z0JBRXNELDBCQUEwQjtzQkFBdEYsWUFBWTt1QkFBQywwQkFBMEIsRUFBRSxFQUFFLE1BQU0sRUFBRSxLQUFLLEVBQUU7Z0JBQ1MsUUFBUTtzQkFBM0UsWUFBWTt1QkFBQyxjQUFjLEVBQUUsRUFBRSxNQUFNLEVBQUUsS0FBSyxFQUFFLElBQUksRUFBRSxXQUFXLEVBQUU7Z0JBQ2IsYUFBYTtzQkFBakUsWUFBWTt1QkFBQyxrQkFBa0IsRUFBRSxFQUFFLE1BQU0sRUFBRSxLQUFLLEVBQUU7Z0JBQ0gsZUFBZTtzQkFBOUQsU0FBUzt1QkFBQyxpQkFBaUIsRUFBRSxFQUFFLE1BQU0sRUFBRSxJQUFJLEVBQUUiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqIFVzZSBvZiB0aGlzIHNvdXJjZSBjb2RlIGlzIGdvdmVybmVkIGJ5IGFuIE1JVC1zdHlsZSBsaWNlbnNlIHRoYXQgY2FuIGJlXG4gKiBmb3VuZCBpbiB0aGUgTElDRU5TRSBmaWxlIGF0IGh0dHBzOi8vZ2l0aHViLmNvbS9ORy1aT1JSTy9uZy16b3Jyby1hbnRkL2Jsb2IvbWFzdGVyL0xJQ0VOU0VcbiAqL1xuXG5pbXBvcnQge1xuICBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneSxcbiAgQ29tcG9uZW50LFxuICBDb250ZW50Q2hpbGQsXG4gIEV2ZW50RW1pdHRlcixcbiAgSW5qZWN0LFxuICBJbmplY3Rpb25Ub2tlbixcbiAgSW5wdXQsXG4gIE9uQ2hhbmdlcyxcbiAgT25EZXN0cm95LFxuICBPdXRwdXQsXG4gIFNpbXBsZUNoYW5nZXMsXG4gIFRlbXBsYXRlUmVmLFxuICBWaWV3Q2hpbGQsXG4gIFZpZXdFbmNhcHN1bGF0aW9uXG59IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgU3ViamVjdCB9IGZyb20gJ3J4anMnO1xuXG5pbXBvcnQgeyBCb29sZWFuSW5wdXQsIE56U2FmZUFueSB9IGZyb20gJ25nLXpvcnJvLWFudGQvY29yZS90eXBlcyc7XG5pbXBvcnQgeyBJbnB1dEJvb2xlYW4gfSBmcm9tICduZy16b3Jyby1hbnRkL2NvcmUvdXRpbCc7XG5cbmltcG9ydCB7IFRhYlRlbXBsYXRlQ29udGV4dCB9IGZyb20gJy4vaW50ZXJmYWNlcyc7XG5pbXBvcnQgeyBOelRhYkxpbmtEaXJlY3RpdmUsIE56VGFiTGlua1RlbXBsYXRlRGlyZWN0aXZlIH0gZnJvbSAnLi90YWItbGluay5kaXJlY3RpdmUnO1xuaW1wb3J0IHsgTnpUYWJEaXJlY3RpdmUgfSBmcm9tICcuL3RhYi5kaXJlY3RpdmUnO1xuXG4vKipcbiAqIFVzZWQgdG8gcHJvdmlkZSBhIHRhYiBzZXQgdG8gYSB0YWIgd2l0aG91dCBjYXVzaW5nIGEgY2lyY3VsYXIgZGVwZW5kZW5jeS5cbiAqL1xuZXhwb3J0IGNvbnN0IE5aX1RBQl9TRVQgPSBuZXcgSW5qZWN0aW9uVG9rZW48TnpTYWZlQW55PignTlpfVEFCX1NFVCcpO1xuXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICduei10YWInLFxuICBleHBvcnRBczogJ256VGFiJyxcbiAgcHJlc2VydmVXaGl0ZXNwYWNlczogZmFsc2UsXG4gIGVuY2Fwc3VsYXRpb246IFZpZXdFbmNhcHN1bGF0aW9uLk5vbmUsXG4gIGNoYW5nZURldGVjdGlvbjogQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3kuT25QdXNoLFxuICB0ZW1wbGF0ZTogYFxuICAgIDxuZy10ZW1wbGF0ZSAjdGFiTGlua1RlbXBsYXRlPlxuICAgICAgPG5nLWNvbnRlbnQgc2VsZWN0PVwiW256LXRhYi1saW5rXVwiPjwvbmctY29udGVudD5cbiAgICA8L25nLXRlbXBsYXRlPlxuICAgIDxuZy10ZW1wbGF0ZSAjY29udGVudFRlbXBsYXRlPjxuZy1jb250ZW50PjwvbmctY29udGVudD48L25nLXRlbXBsYXRlPlxuICBgXG59KVxuZXhwb3J0IGNsYXNzIE56VGFiQ29tcG9uZW50IGltcGxlbWVudHMgT25DaGFuZ2VzLCBPbkRlc3Ryb3kge1xuICBzdGF0aWMgbmdBY2NlcHRJbnB1dFR5cGVfbnpEaXNhYmxlZDogQm9vbGVhbklucHV0O1xuICBzdGF0aWMgbmdBY2NlcHRJbnB1dFR5cGVfbnpDbG9zYWJsZTogQm9vbGVhbklucHV0O1xuICBzdGF0aWMgbmdBY2NlcHRJbnB1dFR5cGVfbnpGb3JjZVJlbmRlcjogQm9vbGVhbklucHV0O1xuXG4gIEBJbnB1dCgpIG56VGl0bGU6IHN0cmluZyB8IFRlbXBsYXRlUmVmPFRhYlRlbXBsYXRlQ29udGV4dD4gPSAnJztcbiAgQElucHV0KCkgQElucHV0Qm9vbGVhbigpIG56Q2xvc2FibGUgPSBmYWxzZTtcbiAgQElucHV0KCkgbnpDbG9zZUljb246IHN0cmluZyB8IFRlbXBsYXRlUmVmPE56U2FmZUFueT4gPSAnY2xvc2UnO1xuICBASW5wdXQoKSBASW5wdXRCb29sZWFuKCkgbnpEaXNhYmxlZCA9IGZhbHNlO1xuICBASW5wdXQoKSBASW5wdXRCb29sZWFuKCkgbnpGb3JjZVJlbmRlciA9IGZhbHNlO1xuICBAT3V0cHV0KCkgcmVhZG9ubHkgbnpTZWxlY3QgPSBuZXcgRXZlbnRFbWl0dGVyPHZvaWQ+KCk7XG4gIEBPdXRwdXQoKSByZWFkb25seSBuekRlc2VsZWN0ID0gbmV3IEV2ZW50RW1pdHRlcjx2b2lkPigpO1xuICBAT3V0cHV0KCkgcmVhZG9ubHkgbnpDbGljayA9IG5ldyBFdmVudEVtaXR0ZXI8dm9pZD4oKTtcbiAgQE91dHB1dCgpIHJlYWRvbmx5IG56Q29udGV4dG1lbnUgPSBuZXcgRXZlbnRFbWl0dGVyPE1vdXNlRXZlbnQ+KCk7XG5cbiAgQENvbnRlbnRDaGlsZChOelRhYkxpbmtUZW1wbGF0ZURpcmVjdGl2ZSwgeyBzdGF0aWM6IGZhbHNlIH0pIG56VGFiTGlua1RlbXBsYXRlRGlyZWN0aXZlITogTnpUYWJMaW5rVGVtcGxhdGVEaXJlY3RpdmU7XG4gIEBDb250ZW50Q2hpbGQoTnpUYWJEaXJlY3RpdmUsIHsgc3RhdGljOiBmYWxzZSwgcmVhZDogVGVtcGxhdGVSZWYgfSkgdGVtcGxhdGU6IFRlbXBsYXRlUmVmPHZvaWQ+IHwgbnVsbCA9IG51bGw7XG4gIEBDb250ZW50Q2hpbGQoTnpUYWJMaW5rRGlyZWN0aXZlLCB7IHN0YXRpYzogZmFsc2UgfSkgbGlua0RpcmVjdGl2ZSE6IE56VGFiTGlua0RpcmVjdGl2ZTtcbiAgQFZpZXdDaGlsZCgnY29udGVudFRlbXBsYXRlJywgeyBzdGF0aWM6IHRydWUgfSkgY29udGVudFRlbXBsYXRlITogVGVtcGxhdGVSZWY8TnpTYWZlQW55PjtcblxuICBpc0FjdGl2ZTogYm9vbGVhbiA9IGZhbHNlO1xuICBwb3NpdGlvbjogbnVtYmVyIHwgbnVsbCA9IG51bGw7XG4gIG9yaWdpbjogbnVtYmVyIHwgbnVsbCA9IG51bGw7XG4gIHJlYWRvbmx5IHN0YXRlQ2hhbmdlcyA9IG5ldyBTdWJqZWN0PHZvaWQ+KCk7XG5cbiAgZ2V0IGNvbnRlbnQoKTogVGVtcGxhdGVSZWY8TnpTYWZlQW55PiB7XG4gICAgcmV0dXJuIHRoaXMudGVtcGxhdGUgfHwgdGhpcy5jb250ZW50VGVtcGxhdGU7XG4gIH1cblxuICBnZXQgbGFiZWwoKTogc3RyaW5nIHwgVGVtcGxhdGVSZWY8TnpTYWZlQW55PiB7XG4gICAgcmV0dXJuIHRoaXMubnpUaXRsZSB8fCB0aGlzLm56VGFiTGlua1RlbXBsYXRlRGlyZWN0aXZlPy50ZW1wbGF0ZVJlZjtcbiAgfVxuXG4gIGNvbnN0cnVjdG9yKEBJbmplY3QoTlpfVEFCX1NFVCkgcHVibGljIGNsb3Nlc3RUYWJTZXQ6IE56U2FmZUFueSkge31cblxuICBuZ09uQ2hhbmdlcyhjaGFuZ2VzOiBTaW1wbGVDaGFuZ2VzKTogdm9pZCB7XG4gICAgY29uc3QgeyBuelRpdGxlLCBuekRpc2FibGVkLCBuekZvcmNlUmVuZGVyIH0gPSBjaGFuZ2VzO1xuICAgIGlmIChuelRpdGxlIHx8IG56RGlzYWJsZWQgfHwgbnpGb3JjZVJlbmRlcikge1xuICAgICAgdGhpcy5zdGF0ZUNoYW5nZXMubmV4dCgpO1xuICAgIH1cbiAgfVxuXG4gIG5nT25EZXN0cm95KCk6IHZvaWQge1xuICAgIHRoaXMuc3RhdGVDaGFuZ2VzLmNvbXBsZXRlKCk7XG4gIH1cbn1cbiJdfQ==