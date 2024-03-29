import { CdkTreeNodePadding } from '@angular/cdk/tree';
import { Directive, Input } from '@angular/core';
import * as i0 from "@angular/core";
export class NzTreeNodePaddingDirective extends CdkTreeNodePadding {
    constructor() {
        super(...arguments);
        this._indent = 24;
    }
    get level() {
        return this._level;
    }
    set level(value) {
        this._setLevelInput(value);
    }
    get indent() {
        return this._indent;
    }
    set indent(indent) {
        this._setIndentInput(indent);
    }
}
NzTreeNodePaddingDirective.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.1.2", ngImport: i0, type: NzTreeNodePaddingDirective, deps: null, target: i0.ɵɵFactoryTarget.Directive });
NzTreeNodePaddingDirective.ɵdir = i0.ɵɵngDeclareDirective({ minVersion: "12.0.0", version: "13.1.2", type: NzTreeNodePaddingDirective, selector: "[nzTreeNodePadding]", inputs: { level: ["nzTreeNodePadding", "level"], indent: ["nzTreeNodePaddingIndent", "indent"] }, providers: [{ provide: CdkTreeNodePadding, useExisting: NzTreeNodePaddingDirective }], usesInheritance: true, ngImport: i0 });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.1.2", ngImport: i0, type: NzTreeNodePaddingDirective, decorators: [{
            type: Directive,
            args: [{
                    selector: '[nzTreeNodePadding]',
                    providers: [{ provide: CdkTreeNodePadding, useExisting: NzTreeNodePaddingDirective }]
                }]
        }], propDecorators: { level: [{
                type: Input,
                args: ['nzTreeNodePadding']
            }], indent: [{
                type: Input,
                args: ['nzTreeNodePaddingIndent']
            }] } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicGFkZGluZy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL2NvbXBvbmVudHMvdHJlZS12aWV3L3BhZGRpbmcudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBTUEsT0FBTyxFQUFFLGtCQUFrQixFQUFFLE1BQU0sbUJBQW1CLENBQUM7QUFDdkQsT0FBTyxFQUFFLFNBQVMsRUFBRSxLQUFLLEVBQUUsTUFBTSxlQUFlLENBQUM7O0FBTWpELE1BQU0sT0FBTywwQkFBOEIsU0FBUSxrQkFBcUI7SUFKeEU7O1FBS1csWUFBTyxHQUFHLEVBQUUsQ0FBQztLQWlCdkI7SUFmQyxJQUNhLEtBQUs7UUFDaEIsT0FBTyxJQUFJLENBQUMsTUFBTSxDQUFDO0lBQ3JCLENBQUM7SUFDRCxJQUFhLEtBQUssQ0FBQyxLQUFrQjtRQUNuQyxJQUFJLENBQUMsY0FBYyxDQUFDLEtBQUssQ0FBQyxDQUFDO0lBQzdCLENBQUM7SUFFRCxJQUNhLE1BQU07UUFDakIsT0FBTyxJQUFJLENBQUMsT0FBTyxDQUFDO0lBQ3RCLENBQUM7SUFDRCxJQUFhLE1BQU0sQ0FBQyxNQUF1QjtRQUN6QyxJQUFJLENBQUMsZUFBZSxDQUFDLE1BQU0sQ0FBQyxDQUFDO0lBQy9CLENBQUM7O3VIQWpCVSwwQkFBMEI7MkdBQTFCLDBCQUEwQixnSkFGMUIsQ0FBQyxFQUFFLE9BQU8sRUFBRSxrQkFBa0IsRUFBRSxXQUFXLEVBQUUsMEJBQTBCLEVBQUUsQ0FBQzsyRkFFMUUsMEJBQTBCO2tCQUp0QyxTQUFTO21CQUFDO29CQUNULFFBQVEsRUFBRSxxQkFBcUI7b0JBQy9CLFNBQVMsRUFBRSxDQUFDLEVBQUUsT0FBTyxFQUFFLGtCQUFrQixFQUFFLFdBQVcsNEJBQTRCLEVBQUUsQ0FBQztpQkFDdEY7OEJBS2MsS0FBSztzQkFEakIsS0FBSzt1QkFBQyxtQkFBbUI7Z0JBU2IsTUFBTTtzQkFEbEIsS0FBSzt1QkFBQyx5QkFBeUIiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqIFVzZSBvZiB0aGlzIHNvdXJjZSBjb2RlIGlzIGdvdmVybmVkIGJ5IGFuIE1JVC1zdHlsZSBsaWNlbnNlIHRoYXQgY2FuIGJlXG4gKiBmb3VuZCBpbiB0aGUgTElDRU5TRSBmaWxlIGF0IGh0dHBzOi8vZ2l0aHViLmNvbS9ORy1aT1JSTy9uZy16b3Jyby1hbnRkL2Jsb2IvbWFzdGVyL0xJQ0VOU0VcbiAqL1xuXG5pbXBvcnQgeyBOdW1iZXJJbnB1dCB9IGZyb20gJ0Bhbmd1bGFyL2Nkay9jb2VyY2lvbic7XG5pbXBvcnQgeyBDZGtUcmVlTm9kZVBhZGRpbmcgfSBmcm9tICdAYW5ndWxhci9jZGsvdHJlZSc7XG5pbXBvcnQgeyBEaXJlY3RpdmUsIElucHV0IH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5cbkBEaXJlY3RpdmUoe1xuICBzZWxlY3RvcjogJ1tuelRyZWVOb2RlUGFkZGluZ10nLFxuICBwcm92aWRlcnM6IFt7IHByb3ZpZGU6IENka1RyZWVOb2RlUGFkZGluZywgdXNlRXhpc3Rpbmc6IE56VHJlZU5vZGVQYWRkaW5nRGlyZWN0aXZlIH1dXG59KVxuZXhwb3J0IGNsYXNzIE56VHJlZU5vZGVQYWRkaW5nRGlyZWN0aXZlPFQ+IGV4dGVuZHMgQ2RrVHJlZU5vZGVQYWRkaW5nPFQ+IHtcbiAgb3ZlcnJpZGUgX2luZGVudCA9IDI0O1xuXG4gIEBJbnB1dCgnbnpUcmVlTm9kZVBhZGRpbmcnKVxuICBvdmVycmlkZSBnZXQgbGV2ZWwoKTogbnVtYmVyIHtcbiAgICByZXR1cm4gdGhpcy5fbGV2ZWw7XG4gIH1cbiAgb3ZlcnJpZGUgc2V0IGxldmVsKHZhbHVlOiBOdW1iZXJJbnB1dCkge1xuICAgIHRoaXMuX3NldExldmVsSW5wdXQodmFsdWUpO1xuICB9XG5cbiAgQElucHV0KCduelRyZWVOb2RlUGFkZGluZ0luZGVudCcpXG4gIG92ZXJyaWRlIGdldCBpbmRlbnQoKTogbnVtYmVyIHwgc3RyaW5nIHtcbiAgICByZXR1cm4gdGhpcy5faW5kZW50O1xuICB9XG4gIG92ZXJyaWRlIHNldCBpbmRlbnQoaW5kZW50OiBudW1iZXIgfCBzdHJpbmcpIHtcbiAgICB0aGlzLl9zZXRJbmRlbnRJbnB1dChpbmRlbnQpO1xuICB9XG59XG4iXX0=