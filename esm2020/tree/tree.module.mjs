/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */
import { BidiModule } from '@angular/cdk/bidi';
import { ScrollingModule } from '@angular/cdk/scrolling';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { NzHighlightModule } from 'ng-zorro-antd/core/highlight';
import { NzNoAnimationModule } from 'ng-zorro-antd/core/no-animation';
import { NzOutletModule } from 'ng-zorro-antd/core/outlet';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzTreeDropIndicatorComponent } from './tree-drop-indicator.component';
import { NzTreeIndentComponent } from './tree-indent.component';
import { NzTreeNodeBuiltinCheckboxComponent } from './tree-node-checkbox.component';
import { NzTreeNodeSwitcherComponent } from './tree-node-switcher.component';
import { NzTreeNodeTitleComponent } from './tree-node-title.component';
import { NzTreeNodeBuiltinComponent } from './tree-node.component';
import { NzTreeComponent } from './tree.component';
import * as i0 from "@angular/core";
export class NzTreeModule {
}
NzTreeModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.1.2", ngImport: i0, type: NzTreeModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
NzTreeModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "12.0.0", version: "13.1.2", ngImport: i0, type: NzTreeModule, declarations: [NzTreeComponent,
        NzTreeNodeBuiltinComponent,
        NzTreeIndentComponent,
        NzTreeNodeSwitcherComponent,
        NzTreeNodeBuiltinCheckboxComponent,
        NzTreeNodeTitleComponent,
        NzTreeDropIndicatorComponent], imports: [BidiModule,
        CommonModule,
        NzOutletModule,
        NzIconModule,
        NzNoAnimationModule,
        NzHighlightModule,
        ScrollingModule], exports: [NzTreeComponent, NzTreeNodeBuiltinComponent, NzTreeIndentComponent] });
NzTreeModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "13.1.2", ngImport: i0, type: NzTreeModule, imports: [[
            BidiModule,
            CommonModule,
            NzOutletModule,
            NzIconModule,
            NzNoAnimationModule,
            NzHighlightModule,
            ScrollingModule
        ]] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.1.2", ngImport: i0, type: NzTreeModule, decorators: [{
            type: NgModule,
            args: [{
                    imports: [
                        BidiModule,
                        CommonModule,
                        NzOutletModule,
                        NzIconModule,
                        NzNoAnimationModule,
                        NzHighlightModule,
                        ScrollingModule
                    ],
                    declarations: [
                        NzTreeComponent,
                        NzTreeNodeBuiltinComponent,
                        NzTreeIndentComponent,
                        NzTreeNodeSwitcherComponent,
                        NzTreeNodeBuiltinCheckboxComponent,
                        NzTreeNodeTitleComponent,
                        NzTreeDropIndicatorComponent
                    ],
                    exports: [NzTreeComponent, NzTreeNodeBuiltinComponent, NzTreeIndentComponent]
                }]
        }] });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidHJlZS5tb2R1bGUuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9jb21wb25lbnRzL3RyZWUvdHJlZS5tb2R1bGUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7OztHQUdHO0FBRUgsT0FBTyxFQUFFLFVBQVUsRUFBRSxNQUFNLG1CQUFtQixDQUFDO0FBQy9DLE9BQU8sRUFBRSxlQUFlLEVBQUUsTUFBTSx3QkFBd0IsQ0FBQztBQUN6RCxPQUFPLEVBQUUsWUFBWSxFQUFFLE1BQU0saUJBQWlCLENBQUM7QUFDL0MsT0FBTyxFQUFFLFFBQVEsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUV6QyxPQUFPLEVBQUUsaUJBQWlCLEVBQUUsTUFBTSw4QkFBOEIsQ0FBQztBQUNqRSxPQUFPLEVBQUUsbUJBQW1CLEVBQUUsTUFBTSxpQ0FBaUMsQ0FBQztBQUN0RSxPQUFPLEVBQUUsY0FBYyxFQUFFLE1BQU0sMkJBQTJCLENBQUM7QUFDM0QsT0FBTyxFQUFFLFlBQVksRUFBRSxNQUFNLG9CQUFvQixDQUFDO0FBRWxELE9BQU8sRUFBRSw0QkFBNEIsRUFBRSxNQUFNLGlDQUFpQyxDQUFDO0FBQy9FLE9BQU8sRUFBRSxxQkFBcUIsRUFBRSxNQUFNLHlCQUF5QixDQUFDO0FBQ2hFLE9BQU8sRUFBRSxrQ0FBa0MsRUFBRSxNQUFNLGdDQUFnQyxDQUFDO0FBQ3BGLE9BQU8sRUFBRSwyQkFBMkIsRUFBRSxNQUFNLGdDQUFnQyxDQUFDO0FBQzdFLE9BQU8sRUFBRSx3QkFBd0IsRUFBRSxNQUFNLDZCQUE2QixDQUFDO0FBQ3ZFLE9BQU8sRUFBRSwwQkFBMEIsRUFBRSxNQUFNLHVCQUF1QixDQUFDO0FBQ25FLE9BQU8sRUFBRSxlQUFlLEVBQUUsTUFBTSxrQkFBa0IsQ0FBQzs7QUF1Qm5ELE1BQU0sT0FBTyxZQUFZOzt5R0FBWixZQUFZOzBHQUFaLFlBQVksaUJBVnJCLGVBQWU7UUFDZiwwQkFBMEI7UUFDMUIscUJBQXFCO1FBQ3JCLDJCQUEyQjtRQUMzQixrQ0FBa0M7UUFDbEMsd0JBQXdCO1FBQ3hCLDRCQUE0QixhQWY1QixVQUFVO1FBQ1YsWUFBWTtRQUNaLGNBQWM7UUFDZCxZQUFZO1FBQ1osbUJBQW1CO1FBQ25CLGlCQUFpQjtRQUNqQixlQUFlLGFBV1AsZUFBZSxFQUFFLDBCQUEwQixFQUFFLHFCQUFxQjswR0FFakUsWUFBWSxZQXBCZDtZQUNQLFVBQVU7WUFDVixZQUFZO1lBQ1osY0FBYztZQUNkLFlBQVk7WUFDWixtQkFBbUI7WUFDbkIsaUJBQWlCO1lBQ2pCLGVBQWU7U0FDaEI7MkZBWVUsWUFBWTtrQkFyQnhCLFFBQVE7bUJBQUM7b0JBQ1IsT0FBTyxFQUFFO3dCQUNQLFVBQVU7d0JBQ1YsWUFBWTt3QkFDWixjQUFjO3dCQUNkLFlBQVk7d0JBQ1osbUJBQW1CO3dCQUNuQixpQkFBaUI7d0JBQ2pCLGVBQWU7cUJBQ2hCO29CQUNELFlBQVksRUFBRTt3QkFDWixlQUFlO3dCQUNmLDBCQUEwQjt3QkFDMUIscUJBQXFCO3dCQUNyQiwyQkFBMkI7d0JBQzNCLGtDQUFrQzt3QkFDbEMsd0JBQXdCO3dCQUN4Qiw0QkFBNEI7cUJBQzdCO29CQUNELE9BQU8sRUFBRSxDQUFDLGVBQWUsRUFBRSwwQkFBMEIsRUFBRSxxQkFBcUIsQ0FBQztpQkFDOUUiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqIFVzZSBvZiB0aGlzIHNvdXJjZSBjb2RlIGlzIGdvdmVybmVkIGJ5IGFuIE1JVC1zdHlsZSBsaWNlbnNlIHRoYXQgY2FuIGJlXG4gKiBmb3VuZCBpbiB0aGUgTElDRU5TRSBmaWxlIGF0IGh0dHBzOi8vZ2l0aHViLmNvbS9ORy1aT1JSTy9uZy16b3Jyby1hbnRkL2Jsb2IvbWFzdGVyL0xJQ0VOU0VcbiAqL1xuXG5pbXBvcnQgeyBCaWRpTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY2RrL2JpZGknO1xuaW1wb3J0IHsgU2Nyb2xsaW5nTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY2RrL3Njcm9sbGluZyc7XG5pbXBvcnQgeyBDb21tb25Nb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jb21tb24nO1xuaW1wb3J0IHsgTmdNb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcblxuaW1wb3J0IHsgTnpIaWdobGlnaHRNb2R1bGUgfSBmcm9tICduZy16b3Jyby1hbnRkL2NvcmUvaGlnaGxpZ2h0JztcbmltcG9ydCB7IE56Tm9BbmltYXRpb25Nb2R1bGUgfSBmcm9tICduZy16b3Jyby1hbnRkL2NvcmUvbm8tYW5pbWF0aW9uJztcbmltcG9ydCB7IE56T3V0bGV0TW9kdWxlIH0gZnJvbSAnbmctem9ycm8tYW50ZC9jb3JlL291dGxldCc7XG5pbXBvcnQgeyBOekljb25Nb2R1bGUgfSBmcm9tICduZy16b3Jyby1hbnRkL2ljb24nO1xuXG5pbXBvcnQgeyBOelRyZWVEcm9wSW5kaWNhdG9yQ29tcG9uZW50IH0gZnJvbSAnLi90cmVlLWRyb3AtaW5kaWNhdG9yLmNvbXBvbmVudCc7XG5pbXBvcnQgeyBOelRyZWVJbmRlbnRDb21wb25lbnQgfSBmcm9tICcuL3RyZWUtaW5kZW50LmNvbXBvbmVudCc7XG5pbXBvcnQgeyBOelRyZWVOb2RlQnVpbHRpbkNoZWNrYm94Q29tcG9uZW50IH0gZnJvbSAnLi90cmVlLW5vZGUtY2hlY2tib3guY29tcG9uZW50JztcbmltcG9ydCB7IE56VHJlZU5vZGVTd2l0Y2hlckNvbXBvbmVudCB9IGZyb20gJy4vdHJlZS1ub2RlLXN3aXRjaGVyLmNvbXBvbmVudCc7XG5pbXBvcnQgeyBOelRyZWVOb2RlVGl0bGVDb21wb25lbnQgfSBmcm9tICcuL3RyZWUtbm9kZS10aXRsZS5jb21wb25lbnQnO1xuaW1wb3J0IHsgTnpUcmVlTm9kZUJ1aWx0aW5Db21wb25lbnQgfSBmcm9tICcuL3RyZWUtbm9kZS5jb21wb25lbnQnO1xuaW1wb3J0IHsgTnpUcmVlQ29tcG9uZW50IH0gZnJvbSAnLi90cmVlLmNvbXBvbmVudCc7XG5cbkBOZ01vZHVsZSh7XG4gIGltcG9ydHM6IFtcbiAgICBCaWRpTW9kdWxlLFxuICAgIENvbW1vbk1vZHVsZSxcbiAgICBOek91dGxldE1vZHVsZSxcbiAgICBOekljb25Nb2R1bGUsXG4gICAgTnpOb0FuaW1hdGlvbk1vZHVsZSxcbiAgICBOekhpZ2hsaWdodE1vZHVsZSxcbiAgICBTY3JvbGxpbmdNb2R1bGVcbiAgXSxcbiAgZGVjbGFyYXRpb25zOiBbXG4gICAgTnpUcmVlQ29tcG9uZW50LFxuICAgIE56VHJlZU5vZGVCdWlsdGluQ29tcG9uZW50LFxuICAgIE56VHJlZUluZGVudENvbXBvbmVudCxcbiAgICBOelRyZWVOb2RlU3dpdGNoZXJDb21wb25lbnQsXG4gICAgTnpUcmVlTm9kZUJ1aWx0aW5DaGVja2JveENvbXBvbmVudCxcbiAgICBOelRyZWVOb2RlVGl0bGVDb21wb25lbnQsXG4gICAgTnpUcmVlRHJvcEluZGljYXRvckNvbXBvbmVudFxuICBdLFxuICBleHBvcnRzOiBbTnpUcmVlQ29tcG9uZW50LCBOelRyZWVOb2RlQnVpbHRpbkNvbXBvbmVudCwgTnpUcmVlSW5kZW50Q29tcG9uZW50XVxufSlcbmV4cG9ydCBjbGFzcyBOelRyZWVNb2R1bGUge31cbiJdfQ==