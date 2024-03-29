/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */
import { ElementRef, Renderer2, TemplateRef } from '@angular/core';
import { NzListItemMetaDescriptionComponent as DescriptionComponent, NzListItemMetaTitleComponent as TitleComponent } from './list-item-meta-cell';
import * as i0 from "@angular/core";
export declare class NzListItemMetaComponent {
    elementRef: ElementRef;
    private renderer;
    avatarStr: string;
    avatarTpl?: TemplateRef<void>;
    set nzAvatar(value: string | TemplateRef<void>);
    nzTitle?: string | TemplateRef<void>;
    nzDescription?: string | TemplateRef<void>;
    descriptionComponent?: DescriptionComponent;
    titleComponent?: TitleComponent;
    constructor(elementRef: ElementRef, renderer: Renderer2);
    static ɵfac: i0.ɵɵFactoryDeclaration<NzListItemMetaComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<NzListItemMetaComponent, "nz-list-item-meta, [nz-list-item-meta]", ["nzListItemMeta"], { "nzAvatar": "nzAvatar"; "nzTitle": "nzTitle"; "nzDescription": "nzDescription"; }, {}, ["descriptionComponent", "titleComponent"], ["nz-list-item-meta-avatar", "nz-list-item-meta-title", "nz-list-item-meta-description"]>;
}
