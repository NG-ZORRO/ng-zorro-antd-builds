/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, Input } from '@angular/core';
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
NzTreeDropIndicatorComponent.decorators = [
    { type: Component, args: [{
                selector: 'nz-tree-drop-indicator',
                exportAs: 'NzTreeDropIndicator',
                template: ``,
                changeDetection: ChangeDetectionStrategy.OnPush,
                preserveWhitespaces: false,
                host: {
                    '[class.ant-tree-drop-indicator]': 'true',
                    '[style]': 'style'
                }
            },] }
];
NzTreeDropIndicatorComponent.ctorParameters = () => [
    { type: ChangeDetectorRef }
];
NzTreeDropIndicatorComponent.propDecorators = {
    dropPosition: [{ type: Input }],
    level: [{ type: Input }],
    direction: [{ type: Input }]
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidHJlZS1kcm9wLWluZGljYXRvci5jb21wb25lbnQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9jb21wb25lbnRzL3RyZWUvdHJlZS1kcm9wLWluZGljYXRvci5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7OztHQUdHO0FBRUgsT0FBTyxFQUFFLHVCQUF1QixFQUFFLGlCQUFpQixFQUFFLFNBQVMsRUFBRSxLQUFLLEVBQTRCLE1BQU0sZUFBZSxDQUFDO0FBY3ZILE1BQU0sT0FBTyw0QkFBNEI7SUFNdkMsWUFBb0IsR0FBc0I7UUFBdEIsUUFBRyxHQUFILEdBQUcsQ0FBbUI7UUFKakMsVUFBSyxHQUFXLENBQUMsQ0FBQztRQUNsQixjQUFTLEdBQVcsS0FBSyxDQUFDO1FBQ25DLFVBQUssR0FBcUIsRUFBRSxDQUFDO0lBRWdCLENBQUM7SUFFOUMsV0FBVyxDQUFDLFFBQXVCO1FBQ2pDLElBQUksQ0FBQyxlQUFlLENBQUMsSUFBSSxDQUFDLFlBQWEsRUFBRSxJQUFJLENBQUMsU0FBUyxDQUFDLENBQUM7SUFDM0QsQ0FBQztJQUVELGVBQWUsQ0FBQyxZQUFvQixFQUFFLFlBQW9CLEtBQUs7UUFDN0QsTUFBTSxNQUFNLEdBQUcsQ0FBQyxDQUFDO1FBQ2pCLE1BQU0sYUFBYSxHQUFHLFNBQVMsS0FBSyxLQUFLLENBQUMsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsT0FBTyxDQUFDO1FBQzdELE1BQU0sV0FBVyxHQUFHLFNBQVMsS0FBSyxLQUFLLENBQUMsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsTUFBTSxDQUFDO1FBQzNELE1BQU0sS0FBSyxHQUFxQjtZQUM5QixDQUFDLGFBQWEsQ0FBQyxFQUFFLEdBQUcsTUFBTSxJQUFJO1lBQzlCLENBQUMsV0FBVyxDQUFDLEVBQUUsS0FBSztTQUNyQixDQUFDO1FBQ0YsUUFBUSxZQUFZLEVBQUU7WUFDcEIsS0FBSyxDQUFDLENBQUM7Z0JBQ0wsS0FBSyxDQUFDLEdBQUcsR0FBRyxHQUFHLENBQUMsQ0FBQyxJQUFJLENBQUM7Z0JBQ3RCLE1BQU07WUFDUixLQUFLLENBQUM7Z0JBQ0osS0FBSyxDQUFDLE1BQU0sR0FBRyxHQUFHLENBQUMsQ0FBQyxJQUFJLENBQUM7Z0JBQ3pCLE1BQU07WUFDUixLQUFLLENBQUM7Z0JBQ0oscUJBQXFCO2dCQUNyQixLQUFLLENBQUMsTUFBTSxHQUFHLEdBQUcsQ0FBQyxDQUFDLElBQUksQ0FBQztnQkFDekIsS0FBSyxDQUFDLGFBQWEsQ0FBQyxHQUFHLEdBQUcsTUFBTSxHQUFHLEVBQUUsSUFBSSxDQUFDO2dCQUMxQyxNQUFNO1lBQ1I7Z0JBQ0UsS0FBSyxDQUFDLE9BQU8sR0FBRyxNQUFNLENBQUM7Z0JBQ3ZCLE1BQU07U0FDVDtRQUNELElBQUksQ0FBQyxLQUFLLEdBQUcsS0FBSyxDQUFDO1FBQ25CLElBQUksQ0FBQyxHQUFHLENBQUMsWUFBWSxFQUFFLENBQUM7SUFDMUIsQ0FBQzs7O1lBakRGLFNBQVMsU0FBQztnQkFDVCxRQUFRLEVBQUUsd0JBQXdCO2dCQUNsQyxRQUFRLEVBQUUscUJBQXFCO2dCQUMvQixRQUFRLEVBQUUsRUFBRTtnQkFDWixlQUFlLEVBQUUsdUJBQXVCLENBQUMsTUFBTTtnQkFDL0MsbUJBQW1CLEVBQUUsS0FBSztnQkFDMUIsSUFBSSxFQUFFO29CQUNKLGlDQUFpQyxFQUFFLE1BQU07b0JBQ3pDLFNBQVMsRUFBRSxPQUFPO2lCQUNuQjthQUNGOzs7WUFiaUMsaUJBQWlCOzs7MkJBZWhELEtBQUs7b0JBQ0wsS0FBSzt3QkFDTCxLQUFLIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKiBVc2Ugb2YgdGhpcyBzb3VyY2UgY29kZSBpcyBnb3Zlcm5lZCBieSBhbiBNSVQtc3R5bGUgbGljZW5zZSB0aGF0IGNhbiBiZVxuICogZm91bmQgaW4gdGhlIExJQ0VOU0UgZmlsZSBhdCBodHRwczovL2dpdGh1Yi5jb20vTkctWk9SUk8vbmctem9ycm8tYW50ZC9ibG9iL21hc3Rlci9MSUNFTlNFXG4gKi9cblxuaW1wb3J0IHsgQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3ksIENoYW5nZURldGVjdG9yUmVmLCBDb21wb25lbnQsIElucHV0LCBPbkNoYW5nZXMsIFNpbXBsZUNoYW5nZXMgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IE5nU3R5bGVJbnRlcmZhY2UgfSBmcm9tICduZy16b3Jyby1hbnRkL2NvcmUvdHlwZXMnO1xuXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICduei10cmVlLWRyb3AtaW5kaWNhdG9yJyxcbiAgZXhwb3J0QXM6ICdOelRyZWVEcm9wSW5kaWNhdG9yJyxcbiAgdGVtcGxhdGU6IGBgLFxuICBjaGFuZ2VEZXRlY3Rpb246IENoYW5nZURldGVjdGlvblN0cmF0ZWd5Lk9uUHVzaCxcbiAgcHJlc2VydmVXaGl0ZXNwYWNlczogZmFsc2UsXG4gIGhvc3Q6IHtcbiAgICAnW2NsYXNzLmFudC10cmVlLWRyb3AtaW5kaWNhdG9yXSc6ICd0cnVlJyxcbiAgICAnW3N0eWxlXSc6ICdzdHlsZSdcbiAgfVxufSlcbmV4cG9ydCBjbGFzcyBOelRyZWVEcm9wSW5kaWNhdG9yQ29tcG9uZW50IGltcGxlbWVudHMgT25DaGFuZ2VzIHtcbiAgQElucHV0KCkgZHJvcFBvc2l0aW9uPzogbnVtYmVyO1xuICBASW5wdXQoKSBsZXZlbDogbnVtYmVyID0gMTtcbiAgQElucHV0KCkgZGlyZWN0aW9uOiBzdHJpbmcgPSAnbHRyJztcbiAgc3R5bGU6IE5nU3R5bGVJbnRlcmZhY2UgPSB7fTtcblxuICBjb25zdHJ1Y3Rvcihwcml2YXRlIGNkcjogQ2hhbmdlRGV0ZWN0b3JSZWYpIHt9XG5cbiAgbmdPbkNoYW5nZXMoX2NoYW5nZXM6IFNpbXBsZUNoYW5nZXMpOiB2b2lkIHtcbiAgICB0aGlzLnJlbmRlckluZGljYXRvcih0aGlzLmRyb3BQb3NpdGlvbiEsIHRoaXMuZGlyZWN0aW9uKTtcbiAgfVxuXG4gIHJlbmRlckluZGljYXRvcihkcm9wUG9zaXRpb246IG51bWJlciwgZGlyZWN0aW9uOiBzdHJpbmcgPSAnbHRyJyk6IHZvaWQge1xuICAgIGNvbnN0IG9mZnNldCA9IDQ7XG4gICAgY29uc3Qgc3RhcnRQb3NpdGlvbiA9IGRpcmVjdGlvbiA9PT0gJ2x0cicgPyAnbGVmdCcgOiAncmlnaHQnO1xuICAgIGNvbnN0IGVuZFBvc2l0aW9uID0gZGlyZWN0aW9uID09PSAnbHRyJyA/ICdyaWdodCcgOiAnbGVmdCc7XG4gICAgY29uc3Qgc3R5bGU6IE5nU3R5bGVJbnRlcmZhY2UgPSB7XG4gICAgICBbc3RhcnRQb3NpdGlvbl06IGAke29mZnNldH1weGAsXG4gICAgICBbZW5kUG9zaXRpb25dOiAnMHB4J1xuICAgIH07XG4gICAgc3dpdGNoIChkcm9wUG9zaXRpb24pIHtcbiAgICAgIGNhc2UgLTE6XG4gICAgICAgIHN0eWxlLnRvcCA9IGAkey0zfXB4YDtcbiAgICAgICAgYnJlYWs7XG4gICAgICBjYXNlIDE6XG4gICAgICAgIHN0eWxlLmJvdHRvbSA9IGAkey0zfXB4YDtcbiAgICAgICAgYnJlYWs7XG4gICAgICBjYXNlIDA6XG4gICAgICAgIC8vIGRyb3BQb3NpdGlvbiA9PT0gMFxuICAgICAgICBzdHlsZS5ib3R0b20gPSBgJHstM31weGA7XG4gICAgICAgIHN0eWxlW3N0YXJ0UG9zaXRpb25dID0gYCR7b2Zmc2V0ICsgMjR9cHhgO1xuICAgICAgICBicmVhaztcbiAgICAgIGRlZmF1bHQ6XG4gICAgICAgIHN0eWxlLmRpc3BsYXkgPSAnbm9uZSc7XG4gICAgICAgIGJyZWFrO1xuICAgIH1cbiAgICB0aGlzLnN0eWxlID0gc3R5bGU7XG4gICAgdGhpcy5jZHIubWFya0ZvckNoZWNrKCk7XG4gIH1cbn1cbiJdfQ==