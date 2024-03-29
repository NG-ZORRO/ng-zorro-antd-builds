import { ChangeDetectionStrategy, Component, Input, ViewEncapsulation } from '@angular/core';
import * as i0 from "@angular/core";
import * as i1 from "@angular/common";
import * as i2 from "ng-zorro-antd/icon";
import * as i3 from "ng-zorro-antd/core/outlet";
import * as i4 from "ng-zorro-antd/core/highlight";
export class NzCascaderOptionComponent {
    constructor(cdr, elementRef, renderer) {
        this.cdr = cdr;
        this.optionTemplate = null;
        this.activated = false;
        this.nzLabelProperty = 'label';
        this.expandIcon = '';
        this.dir = 'ltr';
        renderer.addClass(elementRef.nativeElement, 'ant-cascader-menu-item');
        renderer.addClass(elementRef.nativeElement, 'ant-cascader-menu-item-expanded');
        this.nativeElement = elementRef.nativeElement;
    }
    ngOnInit() {
        if (this.expandIcon === '' && this.dir === 'rtl') {
            this.expandIcon = 'left';
        }
        else if (this.expandIcon === '') {
            this.expandIcon = 'right';
        }
    }
    get optionLabel() {
        return this.option[this.nzLabelProperty];
    }
    markForCheck() {
        this.cdr.markForCheck();
    }
}
NzCascaderOptionComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.1.2", ngImport: i0, type: NzCascaderOptionComponent, deps: [{ token: i0.ChangeDetectorRef }, { token: i0.ElementRef }, { token: i0.Renderer2 }], target: i0.ɵɵFactoryTarget.Component });
NzCascaderOptionComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "13.1.2", type: NzCascaderOptionComponent, selector: "[nz-cascader-option]", inputs: { optionTemplate: "optionTemplate", option: "option", activated: "activated", highlightText: "highlightText", nzLabelProperty: "nzLabelProperty", columnIndex: "columnIndex", expandIcon: "expandIcon", dir: "dir" }, host: { properties: { "attr.title": "option.title || optionLabel", "class.ant-cascader-menu-item-active": "activated", "class.ant-cascader-menu-item-expand": "!option.isLeaf", "class.ant-cascader-menu-item-disabled": "option.disabled" } }, exportAs: ["nzCascaderOption"], ngImport: i0, template: `
    <ng-container *ngIf="optionTemplate; else defaultOptionTemplate">
      <ng-template
        [ngTemplateOutlet]="optionTemplate"
        [ngTemplateOutletContext]="{ $implicit: option, index: columnIndex }"
      ></ng-template>
    </ng-container>
    <ng-template #defaultOptionTemplate>
      <div
        class="ant-cascader-menu-item-content"
        [innerHTML]="optionLabel | nzHighlight: highlightText:'g':'ant-cascader-menu-item-keyword'"
      ></div>
    </ng-template>
    <div *ngIf="!option.isLeaf || option.children?.length || option.loading" class="ant-cascader-menu-item-expand-icon">
      <i *ngIf="option.loading; else icon" nz-icon nzType="loading"></i>
      <ng-template #icon>
        <ng-container *nzStringTemplateOutlet="expandIcon">
          <i nz-icon [nzType]="$any(expandIcon)"></i>
        </ng-container>
      </ng-template>
    </div>
  `, isInline: true, directives: [{ type: i1.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { type: i1.NgTemplateOutlet, selector: "[ngTemplateOutlet]", inputs: ["ngTemplateOutletContext", "ngTemplateOutlet"] }, { type: i2.NzIconDirective, selector: "[nz-icon]", inputs: ["nzSpin", "nzRotate", "nzType", "nzTheme", "nzTwotoneColor", "nzIconfont"], exportAs: ["nzIcon"] }, { type: i3.NzStringTemplateOutletDirective, selector: "[nzStringTemplateOutlet]", inputs: ["nzStringTemplateOutletContext", "nzStringTemplateOutlet"], exportAs: ["nzStringTemplateOutlet"] }], pipes: { "nzHighlight": i4.NzHighlightPipe }, changeDetection: i0.ChangeDetectionStrategy.OnPush, encapsulation: i0.ViewEncapsulation.None });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.1.2", ngImport: i0, type: NzCascaderOptionComponent, decorators: [{
            type: Component,
            args: [{
                    changeDetection: ChangeDetectionStrategy.OnPush,
                    encapsulation: ViewEncapsulation.None,
                    selector: '[nz-cascader-option]',
                    exportAs: 'nzCascaderOption',
                    template: `
    <ng-container *ngIf="optionTemplate; else defaultOptionTemplate">
      <ng-template
        [ngTemplateOutlet]="optionTemplate"
        [ngTemplateOutletContext]="{ $implicit: option, index: columnIndex }"
      ></ng-template>
    </ng-container>
    <ng-template #defaultOptionTemplate>
      <div
        class="ant-cascader-menu-item-content"
        [innerHTML]="optionLabel | nzHighlight: highlightText:'g':'ant-cascader-menu-item-keyword'"
      ></div>
    </ng-template>
    <div *ngIf="!option.isLeaf || option.children?.length || option.loading" class="ant-cascader-menu-item-expand-icon">
      <i *ngIf="option.loading; else icon" nz-icon nzType="loading"></i>
      <ng-template #icon>
        <ng-container *nzStringTemplateOutlet="expandIcon">
          <i nz-icon [nzType]="$any(expandIcon)"></i>
        </ng-container>
      </ng-template>
    </div>
  `,
                    host: {
                        '[attr.title]': 'option.title || optionLabel',
                        '[class.ant-cascader-menu-item-active]': 'activated',
                        '[class.ant-cascader-menu-item-expand]': '!option.isLeaf',
                        '[class.ant-cascader-menu-item-disabled]': 'option.disabled'
                    }
                }]
        }], ctorParameters: function () { return [{ type: i0.ChangeDetectorRef }, { type: i0.ElementRef }, { type: i0.Renderer2 }]; }, propDecorators: { optionTemplate: [{
                type: Input
            }], option: [{
                type: Input
            }], activated: [{
                type: Input
            }], highlightText: [{
                type: Input
            }], nzLabelProperty: [{
                type: Input
            }], columnIndex: [{
                type: Input
            }], expandIcon: [{
                type: Input
            }], dir: [{
                type: Input
            }] } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2FzY2FkZXItbGkuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vY29tcG9uZW50cy9jYXNjYWRlci9jYXNjYWRlci1saS5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBTUEsT0FBTyxFQUNMLHVCQUF1QixFQUV2QixTQUFTLEVBRVQsS0FBSyxFQUlMLGlCQUFpQixFQUNsQixNQUFNLGVBQWUsQ0FBQzs7Ozs7O0FBc0N2QixNQUFNLE9BQU8seUJBQXlCO0lBWXBDLFlBQW9CLEdBQXNCLEVBQUUsVUFBc0IsRUFBRSxRQUFtQjtRQUFuRSxRQUFHLEdBQUgsR0FBRyxDQUFtQjtRQVhqQyxtQkFBYyxHQUF5QyxJQUFJLENBQUM7UUFFNUQsY0FBUyxHQUFHLEtBQUssQ0FBQztRQUVsQixvQkFBZSxHQUFHLE9BQU8sQ0FBQztRQUUxQixlQUFVLEdBQStCLEVBQUUsQ0FBQztRQUM1QyxRQUFHLEdBQWMsS0FBSyxDQUFDO1FBSzlCLFFBQVEsQ0FBQyxRQUFRLENBQUMsVUFBVSxDQUFDLGFBQWEsRUFBRSx3QkFBd0IsQ0FBQyxDQUFDO1FBQ3RFLFFBQVEsQ0FBQyxRQUFRLENBQUMsVUFBVSxDQUFDLGFBQWEsRUFBRSxpQ0FBaUMsQ0FBQyxDQUFDO1FBQy9FLElBQUksQ0FBQyxhQUFhLEdBQUcsVUFBVSxDQUFDLGFBQWEsQ0FBQztJQUNoRCxDQUFDO0lBQ0QsUUFBUTtRQUNOLElBQUksSUFBSSxDQUFDLFVBQVUsS0FBSyxFQUFFLElBQUksSUFBSSxDQUFDLEdBQUcsS0FBSyxLQUFLLEVBQUU7WUFDaEQsSUFBSSxDQUFDLFVBQVUsR0FBRyxNQUFNLENBQUM7U0FDMUI7YUFBTSxJQUFJLElBQUksQ0FBQyxVQUFVLEtBQUssRUFBRSxFQUFFO1lBQ2pDLElBQUksQ0FBQyxVQUFVLEdBQUcsT0FBTyxDQUFDO1NBQzNCO0lBQ0gsQ0FBQztJQUVELElBQUksV0FBVztRQUNiLE9BQU8sSUFBSSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsZUFBZSxDQUFDLENBQUM7SUFDM0MsQ0FBQztJQUVELFlBQVk7UUFDVixJQUFJLENBQUMsR0FBRyxDQUFDLFlBQVksRUFBRSxDQUFDO0lBQzFCLENBQUM7O3NIQS9CVSx5QkFBeUI7MEdBQXpCLHlCQUF5QiwwaUJBN0IxQjs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0dBcUJUOzJGQVFVLHlCQUF5QjtrQkFsQ3JDLFNBQVM7bUJBQUM7b0JBQ1QsZUFBZSxFQUFFLHVCQUF1QixDQUFDLE1BQU07b0JBQy9DLGFBQWEsRUFBRSxpQkFBaUIsQ0FBQyxJQUFJO29CQUNyQyxRQUFRLEVBQUUsc0JBQXNCO29CQUNoQyxRQUFRLEVBQUUsa0JBQWtCO29CQUM1QixRQUFRLEVBQUU7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztHQXFCVDtvQkFDRCxJQUFJLEVBQUU7d0JBQ0osY0FBYyxFQUFFLDZCQUE2Qjt3QkFDN0MsdUNBQXVDLEVBQUUsV0FBVzt3QkFDcEQsdUNBQXVDLEVBQUUsZ0JBQWdCO3dCQUN6RCx5Q0FBeUMsRUFBRSxpQkFBaUI7cUJBQzdEO2lCQUNGO3lKQUVVLGNBQWM7c0JBQXRCLEtBQUs7Z0JBQ0csTUFBTTtzQkFBZCxLQUFLO2dCQUNHLFNBQVM7c0JBQWpCLEtBQUs7Z0JBQ0csYUFBYTtzQkFBckIsS0FBSztnQkFDRyxlQUFlO3NCQUF2QixLQUFLO2dCQUNHLFdBQVc7c0JBQW5CLEtBQUs7Z0JBQ0csVUFBVTtzQkFBbEIsS0FBSztnQkFDRyxHQUFHO3NCQUFYLEtBQUsiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqIFVzZSBvZiB0aGlzIHNvdXJjZSBjb2RlIGlzIGdvdmVybmVkIGJ5IGFuIE1JVC1zdHlsZSBsaWNlbnNlIHRoYXQgY2FuIGJlXG4gKiBmb3VuZCBpbiB0aGUgTElDRU5TRSBmaWxlIGF0IGh0dHBzOi8vZ2l0aHViLmNvbS9ORy1aT1JSTy9uZy16b3Jyby1hbnRkL2Jsb2IvbWFzdGVyL0xJQ0VOU0VcbiAqL1xuXG5pbXBvcnQgeyBEaXJlY3Rpb24gfSBmcm9tICdAYW5ndWxhci9jZGsvYmlkaSc7XG5pbXBvcnQge1xuICBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneSxcbiAgQ2hhbmdlRGV0ZWN0b3JSZWYsXG4gIENvbXBvbmVudCxcbiAgRWxlbWVudFJlZixcbiAgSW5wdXQsXG4gIE9uSW5pdCxcbiAgUmVuZGVyZXIyLFxuICBUZW1wbGF0ZVJlZixcbiAgVmlld0VuY2Fwc3VsYXRpb25cbn0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5cbmltcG9ydCB7IE56Q2FzY2FkZXJPcHRpb24gfSBmcm9tICcuL3R5cGluZ3MnO1xuXG5AQ29tcG9uZW50KHtcbiAgY2hhbmdlRGV0ZWN0aW9uOiBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneS5PblB1c2gsXG4gIGVuY2Fwc3VsYXRpb246IFZpZXdFbmNhcHN1bGF0aW9uLk5vbmUsXG4gIHNlbGVjdG9yOiAnW256LWNhc2NhZGVyLW9wdGlvbl0nLFxuICBleHBvcnRBczogJ256Q2FzY2FkZXJPcHRpb24nLFxuICB0ZW1wbGF0ZTogYFxuICAgIDxuZy1jb250YWluZXIgKm5nSWY9XCJvcHRpb25UZW1wbGF0ZTsgZWxzZSBkZWZhdWx0T3B0aW9uVGVtcGxhdGVcIj5cbiAgICAgIDxuZy10ZW1wbGF0ZVxuICAgICAgICBbbmdUZW1wbGF0ZU91dGxldF09XCJvcHRpb25UZW1wbGF0ZVwiXG4gICAgICAgIFtuZ1RlbXBsYXRlT3V0bGV0Q29udGV4dF09XCJ7ICRpbXBsaWNpdDogb3B0aW9uLCBpbmRleDogY29sdW1uSW5kZXggfVwiXG4gICAgICA+PC9uZy10ZW1wbGF0ZT5cbiAgICA8L25nLWNvbnRhaW5lcj5cbiAgICA8bmctdGVtcGxhdGUgI2RlZmF1bHRPcHRpb25UZW1wbGF0ZT5cbiAgICAgIDxkaXZcbiAgICAgICAgY2xhc3M9XCJhbnQtY2FzY2FkZXItbWVudS1pdGVtLWNvbnRlbnRcIlxuICAgICAgICBbaW5uZXJIVE1MXT1cIm9wdGlvbkxhYmVsIHwgbnpIaWdobGlnaHQ6IGhpZ2hsaWdodFRleHQ6J2cnOidhbnQtY2FzY2FkZXItbWVudS1pdGVtLWtleXdvcmQnXCJcbiAgICAgID48L2Rpdj5cbiAgICA8L25nLXRlbXBsYXRlPlxuICAgIDxkaXYgKm5nSWY9XCIhb3B0aW9uLmlzTGVhZiB8fCBvcHRpb24uY2hpbGRyZW4/Lmxlbmd0aCB8fCBvcHRpb24ubG9hZGluZ1wiIGNsYXNzPVwiYW50LWNhc2NhZGVyLW1lbnUtaXRlbS1leHBhbmQtaWNvblwiPlxuICAgICAgPGkgKm5nSWY9XCJvcHRpb24ubG9hZGluZzsgZWxzZSBpY29uXCIgbnotaWNvbiBuelR5cGU9XCJsb2FkaW5nXCI+PC9pPlxuICAgICAgPG5nLXRlbXBsYXRlICNpY29uPlxuICAgICAgICA8bmctY29udGFpbmVyICpuelN0cmluZ1RlbXBsYXRlT3V0bGV0PVwiZXhwYW5kSWNvblwiPlxuICAgICAgICAgIDxpIG56LWljb24gW256VHlwZV09XCIkYW55KGV4cGFuZEljb24pXCI+PC9pPlxuICAgICAgICA8L25nLWNvbnRhaW5lcj5cbiAgICAgIDwvbmctdGVtcGxhdGU+XG4gICAgPC9kaXY+XG4gIGAsXG4gIGhvc3Q6IHtcbiAgICAnW2F0dHIudGl0bGVdJzogJ29wdGlvbi50aXRsZSB8fCBvcHRpb25MYWJlbCcsXG4gICAgJ1tjbGFzcy5hbnQtY2FzY2FkZXItbWVudS1pdGVtLWFjdGl2ZV0nOiAnYWN0aXZhdGVkJyxcbiAgICAnW2NsYXNzLmFudC1jYXNjYWRlci1tZW51LWl0ZW0tZXhwYW5kXSc6ICchb3B0aW9uLmlzTGVhZicsXG4gICAgJ1tjbGFzcy5hbnQtY2FzY2FkZXItbWVudS1pdGVtLWRpc2FibGVkXSc6ICdvcHRpb24uZGlzYWJsZWQnXG4gIH1cbn0pXG5leHBvcnQgY2xhc3MgTnpDYXNjYWRlck9wdGlvbkNvbXBvbmVudCBpbXBsZW1lbnRzIE9uSW5pdCB7XG4gIEBJbnB1dCgpIG9wdGlvblRlbXBsYXRlOiBUZW1wbGF0ZVJlZjxOekNhc2NhZGVyT3B0aW9uPiB8IG51bGwgPSBudWxsO1xuICBASW5wdXQoKSBvcHRpb24hOiBOekNhc2NhZGVyT3B0aW9uO1xuICBASW5wdXQoKSBhY3RpdmF0ZWQgPSBmYWxzZTtcbiAgQElucHV0KCkgaGlnaGxpZ2h0VGV4dCE6IHN0cmluZztcbiAgQElucHV0KCkgbnpMYWJlbFByb3BlcnR5ID0gJ2xhYmVsJztcbiAgQElucHV0KCkgY29sdW1uSW5kZXghOiBudW1iZXI7XG4gIEBJbnB1dCgpIGV4cGFuZEljb246IHN0cmluZyB8IFRlbXBsYXRlUmVmPHZvaWQ+ID0gJyc7XG4gIEBJbnB1dCgpIGRpcjogRGlyZWN0aW9uID0gJ2x0cic7XG5cbiAgcmVhZG9ubHkgbmF0aXZlRWxlbWVudDogSFRNTEVsZW1lbnQ7XG5cbiAgY29uc3RydWN0b3IocHJpdmF0ZSBjZHI6IENoYW5nZURldGVjdG9yUmVmLCBlbGVtZW50UmVmOiBFbGVtZW50UmVmLCByZW5kZXJlcjogUmVuZGVyZXIyKSB7XG4gICAgcmVuZGVyZXIuYWRkQ2xhc3MoZWxlbWVudFJlZi5uYXRpdmVFbGVtZW50LCAnYW50LWNhc2NhZGVyLW1lbnUtaXRlbScpO1xuICAgIHJlbmRlcmVyLmFkZENsYXNzKGVsZW1lbnRSZWYubmF0aXZlRWxlbWVudCwgJ2FudC1jYXNjYWRlci1tZW51LWl0ZW0tZXhwYW5kZWQnKTtcbiAgICB0aGlzLm5hdGl2ZUVsZW1lbnQgPSBlbGVtZW50UmVmLm5hdGl2ZUVsZW1lbnQ7XG4gIH1cbiAgbmdPbkluaXQoKTogdm9pZCB7XG4gICAgaWYgKHRoaXMuZXhwYW5kSWNvbiA9PT0gJycgJiYgdGhpcy5kaXIgPT09ICdydGwnKSB7XG4gICAgICB0aGlzLmV4cGFuZEljb24gPSAnbGVmdCc7XG4gICAgfSBlbHNlIGlmICh0aGlzLmV4cGFuZEljb24gPT09ICcnKSB7XG4gICAgICB0aGlzLmV4cGFuZEljb24gPSAncmlnaHQnO1xuICAgIH1cbiAgfVxuXG4gIGdldCBvcHRpb25MYWJlbCgpOiBzdHJpbmcge1xuICAgIHJldHVybiB0aGlzLm9wdGlvblt0aGlzLm56TGFiZWxQcm9wZXJ0eV07XG4gIH1cblxuICBtYXJrRm9yQ2hlY2soKTogdm9pZCB7XG4gICAgdGhpcy5jZHIubWFya0ZvckNoZWNrKCk7XG4gIH1cbn1cbiJdfQ==