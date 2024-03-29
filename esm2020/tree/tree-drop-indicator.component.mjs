/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */
import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import * as i0 from "@angular/core";
export class NzTreeDropIndicatorComponent {
    constructor(cdr) {
        this.cdr = cdr;
        this.level = 1;
        this.direction = 'ltr';
        this.style = {};
    }
    ngOnChanges(_changes) {
        this.renderIndicator(this.dropPosition, this.direction);
    }
    renderIndicator(dropPosition, direction = 'ltr') {
        const offset = 4;
        const startPosition = direction === 'ltr' ? 'left' : 'right';
        const endPosition = direction === 'ltr' ? 'right' : 'left';
        const style = {
            [startPosition]: `${offset}px`,
            [endPosition]: '0px'
        };
        switch (dropPosition) {
            case -1:
                style.top = `${-3}px`;
                break;
            case 1:
                style.bottom = `${-3}px`;
                break;
            case 0:
                // dropPosition === 0
                style.bottom = `${-3}px`;
                style[startPosition] = `${offset + 24}px`;
                break;
            default:
                style.display = 'none';
                break;
        }
        this.style = style;
        this.cdr.markForCheck();
    }
}
NzTreeDropIndicatorComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.1.2", ngImport: i0, type: NzTreeDropIndicatorComponent, deps: [{ token: i0.ChangeDetectorRef }], target: i0.ɵɵFactoryTarget.Component });
NzTreeDropIndicatorComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "13.1.2", type: NzTreeDropIndicatorComponent, selector: "nz-tree-drop-indicator", inputs: { dropPosition: "dropPosition", level: "level", direction: "direction" }, host: { properties: { "class.ant-tree-drop-indicator": "true", "style": "style" } }, exportAs: ["NzTreeDropIndicator"], usesOnChanges: true, ngImport: i0, template: ``, isInline: true, changeDetection: i0.ChangeDetectionStrategy.OnPush });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.1.2", ngImport: i0, type: NzTreeDropIndicatorComponent, decorators: [{
            type: Component,
            args: [{
                    selector: 'nz-tree-drop-indicator',
                    exportAs: 'NzTreeDropIndicator',
                    template: ``,
                    changeDetection: ChangeDetectionStrategy.OnPush,
                    preserveWhitespaces: false,
                    host: {
                        '[class.ant-tree-drop-indicator]': 'true',
                        '[style]': 'style'
                    }
                }]
        }], ctorParameters: function () { return [{ type: i0.ChangeDetectorRef }]; }, propDecorators: { dropPosition: [{
                type: Input
            }], level: [{
                type: Input
            }], direction: [{
                type: Input
            }] } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidHJlZS1kcm9wLWluZGljYXRvci5jb21wb25lbnQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9jb21wb25lbnRzL3RyZWUvdHJlZS1kcm9wLWluZGljYXRvci5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7OztHQUdHO0FBRUgsT0FBTyxFQUFFLHVCQUF1QixFQUFxQixTQUFTLEVBQUUsS0FBSyxFQUE0QixNQUFNLGVBQWUsQ0FBQzs7QUFldkgsTUFBTSxPQUFPLDRCQUE0QjtJQU12QyxZQUFvQixHQUFzQjtRQUF0QixRQUFHLEdBQUgsR0FBRyxDQUFtQjtRQUpqQyxVQUFLLEdBQVcsQ0FBQyxDQUFDO1FBQ2xCLGNBQVMsR0FBVyxLQUFLLENBQUM7UUFDbkMsVUFBSyxHQUFxQixFQUFFLENBQUM7SUFFZ0IsQ0FBQztJQUU5QyxXQUFXLENBQUMsUUFBdUI7UUFDakMsSUFBSSxDQUFDLGVBQWUsQ0FBQyxJQUFJLENBQUMsWUFBYSxFQUFFLElBQUksQ0FBQyxTQUFTLENBQUMsQ0FBQztJQUMzRCxDQUFDO0lBRUQsZUFBZSxDQUFDLFlBQW9CLEVBQUUsWUFBb0IsS0FBSztRQUM3RCxNQUFNLE1BQU0sR0FBRyxDQUFDLENBQUM7UUFDakIsTUFBTSxhQUFhLEdBQUcsU0FBUyxLQUFLLEtBQUssQ0FBQyxDQUFDLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxPQUFPLENBQUM7UUFDN0QsTUFBTSxXQUFXLEdBQUcsU0FBUyxLQUFLLEtBQUssQ0FBQyxDQUFDLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxNQUFNLENBQUM7UUFDM0QsTUFBTSxLQUFLLEdBQXFCO1lBQzlCLENBQUMsYUFBYSxDQUFDLEVBQUUsR0FBRyxNQUFNLElBQUk7WUFDOUIsQ0FBQyxXQUFXLENBQUMsRUFBRSxLQUFLO1NBQ3JCLENBQUM7UUFDRixRQUFRLFlBQVksRUFBRTtZQUNwQixLQUFLLENBQUMsQ0FBQztnQkFDTCxLQUFLLENBQUMsR0FBRyxHQUFHLEdBQUcsQ0FBQyxDQUFDLElBQUksQ0FBQztnQkFDdEIsTUFBTTtZQUNSLEtBQUssQ0FBQztnQkFDSixLQUFLLENBQUMsTUFBTSxHQUFHLEdBQUcsQ0FBQyxDQUFDLElBQUksQ0FBQztnQkFDekIsTUFBTTtZQUNSLEtBQUssQ0FBQztnQkFDSixxQkFBcUI7Z0JBQ3JCLEtBQUssQ0FBQyxNQUFNLEdBQUcsR0FBRyxDQUFDLENBQUMsSUFBSSxDQUFDO2dCQUN6QixLQUFLLENBQUMsYUFBYSxDQUFDLEdBQUcsR0FBRyxNQUFNLEdBQUcsRUFBRSxJQUFJLENBQUM7Z0JBQzFDLE1BQU07WUFDUjtnQkFDRSxLQUFLLENBQUMsT0FBTyxHQUFHLE1BQU0sQ0FBQztnQkFDdkIsTUFBTTtTQUNUO1FBQ0QsSUFBSSxDQUFDLEtBQUssR0FBRyxLQUFLLENBQUM7UUFDbkIsSUFBSSxDQUFDLEdBQUcsQ0FBQyxZQUFZLEVBQUUsQ0FBQztJQUMxQixDQUFDOzt5SEF0Q1UsNEJBQTRCOzZHQUE1Qiw0QkFBNEIsNlJBUjdCLEVBQUU7MkZBUUQsNEJBQTRCO2tCQVh4QyxTQUFTO21CQUFDO29CQUNULFFBQVEsRUFBRSx3QkFBd0I7b0JBQ2xDLFFBQVEsRUFBRSxxQkFBcUI7b0JBQy9CLFFBQVEsRUFBRSxFQUFFO29CQUNaLGVBQWUsRUFBRSx1QkFBdUIsQ0FBQyxNQUFNO29CQUMvQyxtQkFBbUIsRUFBRSxLQUFLO29CQUMxQixJQUFJLEVBQUU7d0JBQ0osaUNBQWlDLEVBQUUsTUFBTTt3QkFDekMsU0FBUyxFQUFFLE9BQU87cUJBQ25CO2lCQUNGO3dHQUVVLFlBQVk7c0JBQXBCLEtBQUs7Z0JBQ0csS0FBSztzQkFBYixLQUFLO2dCQUNHLFNBQVM7c0JBQWpCLEtBQUsiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqIFVzZSBvZiB0aGlzIHNvdXJjZSBjb2RlIGlzIGdvdmVybmVkIGJ5IGFuIE1JVC1zdHlsZSBsaWNlbnNlIHRoYXQgY2FuIGJlXG4gKiBmb3VuZCBpbiB0aGUgTElDRU5TRSBmaWxlIGF0IGh0dHBzOi8vZ2l0aHViLmNvbS9ORy1aT1JSTy9uZy16b3Jyby1hbnRkL2Jsb2IvbWFzdGVyL0xJQ0VOU0VcbiAqL1xuXG5pbXBvcnQgeyBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneSwgQ2hhbmdlRGV0ZWN0b3JSZWYsIENvbXBvbmVudCwgSW5wdXQsIE9uQ2hhbmdlcywgU2ltcGxlQ2hhbmdlcyB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuXG5pbXBvcnQgeyBOZ1N0eWxlSW50ZXJmYWNlIH0gZnJvbSAnbmctem9ycm8tYW50ZC9jb3JlL3R5cGVzJztcblxuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAnbnotdHJlZS1kcm9wLWluZGljYXRvcicsXG4gIGV4cG9ydEFzOiAnTnpUcmVlRHJvcEluZGljYXRvcicsXG4gIHRlbXBsYXRlOiBgYCxcbiAgY2hhbmdlRGV0ZWN0aW9uOiBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneS5PblB1c2gsXG4gIHByZXNlcnZlV2hpdGVzcGFjZXM6IGZhbHNlLFxuICBob3N0OiB7XG4gICAgJ1tjbGFzcy5hbnQtdHJlZS1kcm9wLWluZGljYXRvcl0nOiAndHJ1ZScsXG4gICAgJ1tzdHlsZV0nOiAnc3R5bGUnXG4gIH1cbn0pXG5leHBvcnQgY2xhc3MgTnpUcmVlRHJvcEluZGljYXRvckNvbXBvbmVudCBpbXBsZW1lbnRzIE9uQ2hhbmdlcyB7XG4gIEBJbnB1dCgpIGRyb3BQb3NpdGlvbj86IG51bWJlcjtcbiAgQElucHV0KCkgbGV2ZWw6IG51bWJlciA9IDE7XG4gIEBJbnB1dCgpIGRpcmVjdGlvbjogc3RyaW5nID0gJ2x0cic7XG4gIHN0eWxlOiBOZ1N0eWxlSW50ZXJmYWNlID0ge307XG5cbiAgY29uc3RydWN0b3IocHJpdmF0ZSBjZHI6IENoYW5nZURldGVjdG9yUmVmKSB7fVxuXG4gIG5nT25DaGFuZ2VzKF9jaGFuZ2VzOiBTaW1wbGVDaGFuZ2VzKTogdm9pZCB7XG4gICAgdGhpcy5yZW5kZXJJbmRpY2F0b3IodGhpcy5kcm9wUG9zaXRpb24hLCB0aGlzLmRpcmVjdGlvbik7XG4gIH1cblxuICByZW5kZXJJbmRpY2F0b3IoZHJvcFBvc2l0aW9uOiBudW1iZXIsIGRpcmVjdGlvbjogc3RyaW5nID0gJ2x0cicpOiB2b2lkIHtcbiAgICBjb25zdCBvZmZzZXQgPSA0O1xuICAgIGNvbnN0IHN0YXJ0UG9zaXRpb24gPSBkaXJlY3Rpb24gPT09ICdsdHInID8gJ2xlZnQnIDogJ3JpZ2h0JztcbiAgICBjb25zdCBlbmRQb3NpdGlvbiA9IGRpcmVjdGlvbiA9PT0gJ2x0cicgPyAncmlnaHQnIDogJ2xlZnQnO1xuICAgIGNvbnN0IHN0eWxlOiBOZ1N0eWxlSW50ZXJmYWNlID0ge1xuICAgICAgW3N0YXJ0UG9zaXRpb25dOiBgJHtvZmZzZXR9cHhgLFxuICAgICAgW2VuZFBvc2l0aW9uXTogJzBweCdcbiAgICB9O1xuICAgIHN3aXRjaCAoZHJvcFBvc2l0aW9uKSB7XG4gICAgICBjYXNlIC0xOlxuICAgICAgICBzdHlsZS50b3AgPSBgJHstM31weGA7XG4gICAgICAgIGJyZWFrO1xuICAgICAgY2FzZSAxOlxuICAgICAgICBzdHlsZS5ib3R0b20gPSBgJHstM31weGA7XG4gICAgICAgIGJyZWFrO1xuICAgICAgY2FzZSAwOlxuICAgICAgICAvLyBkcm9wUG9zaXRpb24gPT09IDBcbiAgICAgICAgc3R5bGUuYm90dG9tID0gYCR7LTN9cHhgO1xuICAgICAgICBzdHlsZVtzdGFydFBvc2l0aW9uXSA9IGAke29mZnNldCArIDI0fXB4YDtcbiAgICAgICAgYnJlYWs7XG4gICAgICBkZWZhdWx0OlxuICAgICAgICBzdHlsZS5kaXNwbGF5ID0gJ25vbmUnO1xuICAgICAgICBicmVhaztcbiAgICB9XG4gICAgdGhpcy5zdHlsZSA9IHN0eWxlO1xuICAgIHRoaXMuY2RyLm1hcmtGb3JDaGVjaygpO1xuICB9XG59XG4iXX0=