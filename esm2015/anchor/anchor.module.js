/**
 * @fileoverview added by tsickle
 * Generated from: anchor.module.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */
import { PlatformModule } from '@angular/cdk/platform';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { NzAffixModule } from 'ng-zorro-antd/affix';
import { SCROLL_SERVICE_PROVIDER } from 'ng-zorro-antd/core/services';
import { NzAnchorLinkComponent } from './anchor-link.component';
import { NzAnchorComponent } from './anchor.component';
export class NzAnchorModule {
}
NzAnchorModule.decorators = [
    { type: NgModule, args: [{
                declarations: [NzAnchorComponent, NzAnchorLinkComponent],
                exports: [NzAnchorComponent, NzAnchorLinkComponent],
                imports: [CommonModule, NzAffixModule, PlatformModule],
                providers: [SCROLL_SERVICE_PROVIDER]
            },] }
];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYW5jaG9yLm1vZHVsZS5qcyIsInNvdXJjZVJvb3QiOiJuZzovL25nLXpvcnJvLWFudGQvYW5jaG9yLyIsInNvdXJjZXMiOlsiYW5jaG9yLm1vZHVsZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7QUFJQSxPQUFPLEVBQUUsY0FBYyxFQUFFLE1BQU0sdUJBQXVCLENBQUM7QUFDdkQsT0FBTyxFQUFFLFlBQVksRUFBRSxNQUFNLGlCQUFpQixDQUFDO0FBQy9DLE9BQU8sRUFBRSxRQUFRLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDekMsT0FBTyxFQUFFLGFBQWEsRUFBRSxNQUFNLHFCQUFxQixDQUFDO0FBQ3BELE9BQU8sRUFBRSx1QkFBdUIsRUFBRSxNQUFNLDZCQUE2QixDQUFDO0FBRXRFLE9BQU8sRUFBRSxxQkFBcUIsRUFBRSxNQUFNLHlCQUF5QixDQUFDO0FBQ2hFLE9BQU8sRUFBRSxpQkFBaUIsRUFBRSxNQUFNLG9CQUFvQixDQUFDO0FBUXZELE1BQU0sT0FBTyxjQUFjOzs7WUFOMUIsUUFBUSxTQUFDO2dCQUNSLFlBQVksRUFBRSxDQUFDLGlCQUFpQixFQUFFLHFCQUFxQixDQUFDO2dCQUN4RCxPQUFPLEVBQUUsQ0FBQyxpQkFBaUIsRUFBRSxxQkFBcUIsQ0FBQztnQkFDbkQsT0FBTyxFQUFFLENBQUMsWUFBWSxFQUFFLGFBQWEsRUFBRSxjQUFjLENBQUM7Z0JBQ3RELFNBQVMsRUFBRSxDQUFDLHVCQUF1QixDQUFDO2FBQ3JDIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKiBVc2Ugb2YgdGhpcyBzb3VyY2UgY29kZSBpcyBnb3Zlcm5lZCBieSBhbiBNSVQtc3R5bGUgbGljZW5zZSB0aGF0IGNhbiBiZVxuICogZm91bmQgaW4gdGhlIExJQ0VOU0UgZmlsZSBhdCBodHRwczovL2dpdGh1Yi5jb20vTkctWk9SUk8vbmctem9ycm8tYW50ZC9ibG9iL21hc3Rlci9MSUNFTlNFXG4gKi9cbmltcG9ydCB7IFBsYXRmb3JtTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY2RrL3BsYXRmb3JtJztcbmltcG9ydCB7IENvbW1vbk1vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbic7XG5pbXBvcnQgeyBOZ01vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgTnpBZmZpeE1vZHVsZSB9IGZyb20gJ25nLXpvcnJvLWFudGQvYWZmaXgnO1xuaW1wb3J0IHsgU0NST0xMX1NFUlZJQ0VfUFJPVklERVIgfSBmcm9tICduZy16b3Jyby1hbnRkL2NvcmUvc2VydmljZXMnO1xuXG5pbXBvcnQgeyBOekFuY2hvckxpbmtDb21wb25lbnQgfSBmcm9tICcuL2FuY2hvci1saW5rLmNvbXBvbmVudCc7XG5pbXBvcnQgeyBOekFuY2hvckNvbXBvbmVudCB9IGZyb20gJy4vYW5jaG9yLmNvbXBvbmVudCc7XG5cbkBOZ01vZHVsZSh7XG4gIGRlY2xhcmF0aW9uczogW056QW5jaG9yQ29tcG9uZW50LCBOekFuY2hvckxpbmtDb21wb25lbnRdLFxuICBleHBvcnRzOiBbTnpBbmNob3JDb21wb25lbnQsIE56QW5jaG9yTGlua0NvbXBvbmVudF0sXG4gIGltcG9ydHM6IFtDb21tb25Nb2R1bGUsIE56QWZmaXhNb2R1bGUsIFBsYXRmb3JtTW9kdWxlXSxcbiAgcHJvdmlkZXJzOiBbU0NST0xMX1NFUlZJQ0VfUFJPVklERVJdXG59KVxuZXhwb3J0IGNsYXNzIE56QW5jaG9yTW9kdWxlIHt9XG4iXX0=