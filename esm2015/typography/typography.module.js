/**
 * @fileoverview added by tsickle
 * Generated from: typography.module.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */
import { ClipboardModule } from '@angular/cdk/clipboard';
import { PlatformModule } from '@angular/cdk/platform';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { NzTransButtonModule } from 'ng-zorro-antd/core/trans-button';
import { NzI18nModule } from 'ng-zorro-antd/i18n';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzToolTipModule } from 'ng-zorro-antd/tooltip';
import { NzTextCopyComponent } from './text-copy.component';
import { NzTextEditComponent } from './text-edit.component';
import { NzTypographyComponent } from './typography.component';
export class NzTypographyModule {
}
NzTypographyModule.decorators = [
    { type: NgModule, args: [{
                imports: [CommonModule, NzIconModule, NzToolTipModule, NzInputModule, NzI18nModule, NzTransButtonModule, ClipboardModule],
                exports: [NzTypographyComponent, NzTextCopyComponent, NzTextEditComponent, PlatformModule],
                declarations: [NzTypographyComponent, NzTextCopyComponent, NzTextEditComponent]
            },] }
];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidHlwb2dyYXBoeS5tb2R1bGUuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9uZy16b3Jyby1hbnRkL3R5cG9ncmFwaHkvIiwic291cmNlcyI6WyJ0eXBvZ3JhcGh5Lm1vZHVsZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7QUFJQSxPQUFPLEVBQUUsZUFBZSxFQUFFLE1BQU0sd0JBQXdCLENBQUM7QUFDekQsT0FBTyxFQUFFLGNBQWMsRUFBRSxNQUFNLHVCQUF1QixDQUFDO0FBQ3ZELE9BQU8sRUFBRSxZQUFZLEVBQUUsTUFBTSxpQkFBaUIsQ0FBQztBQUMvQyxPQUFPLEVBQUUsUUFBUSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQ3pDLE9BQU8sRUFBRSxtQkFBbUIsRUFBRSxNQUFNLGlDQUFpQyxDQUFDO0FBRXRFLE9BQU8sRUFBRSxZQUFZLEVBQUUsTUFBTSxvQkFBb0IsQ0FBQztBQUNsRCxPQUFPLEVBQUUsWUFBWSxFQUFFLE1BQU0sb0JBQW9CLENBQUM7QUFDbEQsT0FBTyxFQUFFLGFBQWEsRUFBRSxNQUFNLHFCQUFxQixDQUFDO0FBQ3BELE9BQU8sRUFBRSxlQUFlLEVBQUUsTUFBTSx1QkFBdUIsQ0FBQztBQUV4RCxPQUFPLEVBQUUsbUJBQW1CLEVBQUUsTUFBTSx1QkFBdUIsQ0FBQztBQUM1RCxPQUFPLEVBQUUsbUJBQW1CLEVBQUUsTUFBTSx1QkFBdUIsQ0FBQztBQUM1RCxPQUFPLEVBQUUscUJBQXFCLEVBQUUsTUFBTSx3QkFBd0IsQ0FBQztBQU8vRCxNQUFNLE9BQU8sa0JBQWtCOzs7WUFMOUIsUUFBUSxTQUFDO2dCQUNSLE9BQU8sRUFBRSxDQUFDLFlBQVksRUFBRSxZQUFZLEVBQUUsZUFBZSxFQUFFLGFBQWEsRUFBRSxZQUFZLEVBQUUsbUJBQW1CLEVBQUUsZUFBZSxDQUFDO2dCQUN6SCxPQUFPLEVBQUUsQ0FBQyxxQkFBcUIsRUFBRSxtQkFBbUIsRUFBRSxtQkFBbUIsRUFBRSxjQUFjLENBQUM7Z0JBQzFGLFlBQVksRUFBRSxDQUFDLHFCQUFxQixFQUFFLG1CQUFtQixFQUFFLG1CQUFtQixDQUFDO2FBQ2hGIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKiBVc2Ugb2YgdGhpcyBzb3VyY2UgY29kZSBpcyBnb3Zlcm5lZCBieSBhbiBNSVQtc3R5bGUgbGljZW5zZSB0aGF0IGNhbiBiZVxuICogZm91bmQgaW4gdGhlIExJQ0VOU0UgZmlsZSBhdCBodHRwczovL2dpdGh1Yi5jb20vTkctWk9SUk8vbmctem9ycm8tYW50ZC9ibG9iL21hc3Rlci9MSUNFTlNFXG4gKi9cbmltcG9ydCB7IENsaXBib2FyZE1vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2Nkay9jbGlwYm9hcmQnO1xuaW1wb3J0IHsgUGxhdGZvcm1Nb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jZGsvcGxhdGZvcm0nO1xuaW1wb3J0IHsgQ29tbW9uTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uJztcbmltcG9ydCB7IE5nTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBOelRyYW5zQnV0dG9uTW9kdWxlIH0gZnJvbSAnbmctem9ycm8tYW50ZC9jb3JlL3RyYW5zLWJ1dHRvbic7XG5cbmltcG9ydCB7IE56STE4bk1vZHVsZSB9IGZyb20gJ25nLXpvcnJvLWFudGQvaTE4bic7XG5pbXBvcnQgeyBOekljb25Nb2R1bGUgfSBmcm9tICduZy16b3Jyby1hbnRkL2ljb24nO1xuaW1wb3J0IHsgTnpJbnB1dE1vZHVsZSB9IGZyb20gJ25nLXpvcnJvLWFudGQvaW5wdXQnO1xuaW1wb3J0IHsgTnpUb29sVGlwTW9kdWxlIH0gZnJvbSAnbmctem9ycm8tYW50ZC90b29sdGlwJztcblxuaW1wb3J0IHsgTnpUZXh0Q29weUNvbXBvbmVudCB9IGZyb20gJy4vdGV4dC1jb3B5LmNvbXBvbmVudCc7XG5pbXBvcnQgeyBOelRleHRFZGl0Q29tcG9uZW50IH0gZnJvbSAnLi90ZXh0LWVkaXQuY29tcG9uZW50JztcbmltcG9ydCB7IE56VHlwb2dyYXBoeUNvbXBvbmVudCB9IGZyb20gJy4vdHlwb2dyYXBoeS5jb21wb25lbnQnO1xuXG5ATmdNb2R1bGUoe1xuICBpbXBvcnRzOiBbQ29tbW9uTW9kdWxlLCBOekljb25Nb2R1bGUsIE56VG9vbFRpcE1vZHVsZSwgTnpJbnB1dE1vZHVsZSwgTnpJMThuTW9kdWxlLCBOelRyYW5zQnV0dG9uTW9kdWxlLCBDbGlwYm9hcmRNb2R1bGVdLFxuICBleHBvcnRzOiBbTnpUeXBvZ3JhcGh5Q29tcG9uZW50LCBOelRleHRDb3B5Q29tcG9uZW50LCBOelRleHRFZGl0Q29tcG9uZW50LCBQbGF0Zm9ybU1vZHVsZV0sXG4gIGRlY2xhcmF0aW9uczogW056VHlwb2dyYXBoeUNvbXBvbmVudCwgTnpUZXh0Q29weUNvbXBvbmVudCwgTnpUZXh0RWRpdENvbXBvbmVudF1cbn0pXG5leHBvcnQgY2xhc3MgTnpUeXBvZ3JhcGh5TW9kdWxlIHt9XG4iXX0=