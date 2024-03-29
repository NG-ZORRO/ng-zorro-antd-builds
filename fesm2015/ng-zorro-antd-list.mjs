import * as i0 from '@angular/core';
import { Component, ChangeDetectionStrategy, Input, TemplateRef, ViewEncapsulation, ContentChild, ViewChild, ContentChildren, Directive, Optional, HostBinding, NgModule } from '@angular/core';
import * as i1 from 'ng-zorro-antd/avatar';
import { NzAvatarModule } from 'ng-zorro-antd/avatar';
import * as i2 from '@angular/common';
import { CommonModule } from '@angular/common';
import * as i3 from 'ng-zorro-antd/core/outlet';
import { NzOutletModule } from 'ng-zorro-antd/core/outlet';
import { __decorate } from 'tslib';
import { InputBoolean } from 'ng-zorro-antd/core/util';
import { Subject, defer, of, merge, BehaviorSubject } from 'rxjs';
import { take, switchMap, takeUntil } from 'rxjs/operators';
import * as i1$1 from 'ng-zorro-antd/empty';
import { NzEmptyModule } from 'ng-zorro-antd/empty';
import * as i1$2 from '@angular/cdk/bidi';
import { BidiModule } from '@angular/cdk/bidi';
import * as i3$1 from 'ng-zorro-antd/spin';
import { NzSpinModule } from 'ng-zorro-antd/spin';
import * as i6 from 'ng-zorro-antd/grid';
import { NzGridModule } from 'ng-zorro-antd/grid';

/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */
class NzListItemMetaTitleComponent {
}
NzListItemMetaTitleComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.1.2", ngImport: i0, type: NzListItemMetaTitleComponent, deps: [], target: i0.ɵɵFactoryTarget.Component });
NzListItemMetaTitleComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "13.1.2", type: NzListItemMetaTitleComponent, selector: "nz-list-item-meta-title", exportAs: ["nzListItemMetaTitle"], ngImport: i0, template: `
    <h4 class="ant-list-item-meta-title">
      <ng-content></ng-content>
    </h4>
  `, isInline: true, changeDetection: i0.ChangeDetectionStrategy.OnPush });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.1.2", ngImport: i0, type: NzListItemMetaTitleComponent, decorators: [{
            type: Component,
            args: [{
                    selector: 'nz-list-item-meta-title',
                    exportAs: 'nzListItemMetaTitle',
                    template: `
    <h4 class="ant-list-item-meta-title">
      <ng-content></ng-content>
    </h4>
  `,
                    changeDetection: ChangeDetectionStrategy.OnPush
                }]
        }] });
class NzListItemMetaDescriptionComponent {
}
NzListItemMetaDescriptionComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.1.2", ngImport: i0, type: NzListItemMetaDescriptionComponent, deps: [], target: i0.ɵɵFactoryTarget.Component });
NzListItemMetaDescriptionComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "13.1.2", type: NzListItemMetaDescriptionComponent, selector: "nz-list-item-meta-description", exportAs: ["nzListItemMetaDescription"], ngImport: i0, template: `
    <div class="ant-list-item-meta-description">
      <ng-content></ng-content>
    </div>
  `, isInline: true, changeDetection: i0.ChangeDetectionStrategy.OnPush });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.1.2", ngImport: i0, type: NzListItemMetaDescriptionComponent, decorators: [{
            type: Component,
            args: [{
                    selector: 'nz-list-item-meta-description',
                    exportAs: 'nzListItemMetaDescription',
                    template: `
    <div class="ant-list-item-meta-description">
      <ng-content></ng-content>
    </div>
  `,
                    changeDetection: ChangeDetectionStrategy.OnPush
                }]
        }] });
class NzListItemMetaAvatarComponent {
}
NzListItemMetaAvatarComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.1.2", ngImport: i0, type: NzListItemMetaAvatarComponent, deps: [], target: i0.ɵɵFactoryTarget.Component });
NzListItemMetaAvatarComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "13.1.2", type: NzListItemMetaAvatarComponent, selector: "nz-list-item-meta-avatar", inputs: { nzSrc: "nzSrc" }, exportAs: ["nzListItemMetaAvatar"], ngImport: i0, template: `
    <div class="ant-list-item-meta-avatar">
      <nz-avatar *ngIf="nzSrc" [nzSrc]="nzSrc"></nz-avatar>
      <ng-content *ngIf="!nzSrc"></ng-content>
    </div>
  `, isInline: true, components: [{ type: i1.NzAvatarComponent, selector: "nz-avatar", inputs: ["nzShape", "nzSize", "nzGap", "nzText", "nzSrc", "nzSrcSet", "nzAlt", "nzIcon"], outputs: ["nzError"], exportAs: ["nzAvatar"] }], directives: [{ type: i2.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }], changeDetection: i0.ChangeDetectionStrategy.OnPush });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.1.2", ngImport: i0, type: NzListItemMetaAvatarComponent, decorators: [{
            type: Component,
            args: [{
                    selector: 'nz-list-item-meta-avatar',
                    exportAs: 'nzListItemMetaAvatar',
                    template: `
    <div class="ant-list-item-meta-avatar">
      <nz-avatar *ngIf="nzSrc" [nzSrc]="nzSrc"></nz-avatar>
      <ng-content *ngIf="!nzSrc"></ng-content>
    </div>
  `,
                    changeDetection: ChangeDetectionStrategy.OnPush
                }]
        }], propDecorators: { nzSrc: [{
                type: Input
            }] } });

/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */
class NzListItemMetaComponent {
    constructor(elementRef, renderer) {
        this.elementRef = elementRef;
        this.renderer = renderer;
        this.avatarStr = '';
        this.renderer.addClass(elementRef.nativeElement, 'ant-list-item-meta');
    }
    set nzAvatar(value) {
        if (value instanceof TemplateRef) {
            this.avatarStr = '';
            this.avatarTpl = value;
        }
        else {
            this.avatarStr = value;
        }
    }
}
NzListItemMetaComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.1.2", ngImport: i0, type: NzListItemMetaComponent, deps: [{ token: i0.ElementRef }, { token: i0.Renderer2 }], target: i0.ɵɵFactoryTarget.Component });
NzListItemMetaComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "13.1.2", type: NzListItemMetaComponent, selector: "nz-list-item-meta, [nz-list-item-meta]", inputs: { nzAvatar: "nzAvatar", nzTitle: "nzTitle", nzDescription: "nzDescription" }, queries: [{ propertyName: "descriptionComponent", first: true, predicate: NzListItemMetaDescriptionComponent, descendants: true }, { propertyName: "titleComponent", first: true, predicate: NzListItemMetaTitleComponent, descendants: true }], exportAs: ["nzListItemMeta"], ngImport: i0, template: `
    <!--Old API Start-->
    <nz-list-item-meta-avatar *ngIf="avatarStr" [nzSrc]="avatarStr"></nz-list-item-meta-avatar>
    <nz-list-item-meta-avatar *ngIf="avatarTpl">
      <ng-container [ngTemplateOutlet]="avatarTpl"></ng-container>
    </nz-list-item-meta-avatar>
    <!--Old API End-->

    <ng-content select="nz-list-item-meta-avatar"></ng-content>

    <div *ngIf="nzTitle || nzDescription || descriptionComponent || titleComponent" class="ant-list-item-meta-content">
      <!--Old API Start-->
      <nz-list-item-meta-title *ngIf="nzTitle && !titleComponent">
        <ng-container *nzStringTemplateOutlet="nzTitle">{{ nzTitle }}</ng-container>
      </nz-list-item-meta-title>
      <nz-list-item-meta-description *ngIf="nzDescription && !descriptionComponent">
        <ng-container *nzStringTemplateOutlet="nzDescription">{{ nzDescription }}</ng-container>
      </nz-list-item-meta-description>
      <!--Old API End-->

      <ng-content select="nz-list-item-meta-title"></ng-content>
      <ng-content select="nz-list-item-meta-description"></ng-content>
    </div>
  `, isInline: true, components: [{ type: NzListItemMetaAvatarComponent, selector: "nz-list-item-meta-avatar", inputs: ["nzSrc"], exportAs: ["nzListItemMetaAvatar"] }, { type: NzListItemMetaTitleComponent, selector: "nz-list-item-meta-title", exportAs: ["nzListItemMetaTitle"] }, { type: NzListItemMetaDescriptionComponent, selector: "nz-list-item-meta-description", exportAs: ["nzListItemMetaDescription"] }], directives: [{ type: i2.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { type: i2.NgTemplateOutlet, selector: "[ngTemplateOutlet]", inputs: ["ngTemplateOutletContext", "ngTemplateOutlet"] }, { type: i3.NzStringTemplateOutletDirective, selector: "[nzStringTemplateOutlet]", inputs: ["nzStringTemplateOutletContext", "nzStringTemplateOutlet"], exportAs: ["nzStringTemplateOutlet"] }], changeDetection: i0.ChangeDetectionStrategy.OnPush, encapsulation: i0.ViewEncapsulation.None });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.1.2", ngImport: i0, type: NzListItemMetaComponent, decorators: [{
            type: Component,
            args: [{
                    selector: 'nz-list-item-meta, [nz-list-item-meta]',
                    exportAs: 'nzListItemMeta',
                    template: `
    <!--Old API Start-->
    <nz-list-item-meta-avatar *ngIf="avatarStr" [nzSrc]="avatarStr"></nz-list-item-meta-avatar>
    <nz-list-item-meta-avatar *ngIf="avatarTpl">
      <ng-container [ngTemplateOutlet]="avatarTpl"></ng-container>
    </nz-list-item-meta-avatar>
    <!--Old API End-->

    <ng-content select="nz-list-item-meta-avatar"></ng-content>

    <div *ngIf="nzTitle || nzDescription || descriptionComponent || titleComponent" class="ant-list-item-meta-content">
      <!--Old API Start-->
      <nz-list-item-meta-title *ngIf="nzTitle && !titleComponent">
        <ng-container *nzStringTemplateOutlet="nzTitle">{{ nzTitle }}</ng-container>
      </nz-list-item-meta-title>
      <nz-list-item-meta-description *ngIf="nzDescription && !descriptionComponent">
        <ng-container *nzStringTemplateOutlet="nzDescription">{{ nzDescription }}</ng-container>
      </nz-list-item-meta-description>
      <!--Old API End-->

      <ng-content select="nz-list-item-meta-title"></ng-content>
      <ng-content select="nz-list-item-meta-description"></ng-content>
    </div>
  `,
                    preserveWhitespaces: false,
                    changeDetection: ChangeDetectionStrategy.OnPush,
                    encapsulation: ViewEncapsulation.None
                }]
        }], ctorParameters: function () { return [{ type: i0.ElementRef }, { type: i0.Renderer2 }]; }, propDecorators: { nzAvatar: [{
                type: Input
            }], nzTitle: [{
                type: Input
            }], nzDescription: [{
                type: Input
            }], descriptionComponent: [{
                type: ContentChild,
                args: [NzListItemMetaDescriptionComponent]
            }], titleComponent: [{
                type: ContentChild,
                args: [NzListItemMetaTitleComponent]
            }] } });

/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */
class NzListItemExtraComponent {
    constructor() { }
}
NzListItemExtraComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.1.2", ngImport: i0, type: NzListItemExtraComponent, deps: [], target: i0.ɵɵFactoryTarget.Component });
NzListItemExtraComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "13.1.2", type: NzListItemExtraComponent, selector: "nz-list-item-extra, [nz-list-item-extra]", host: { classAttribute: "ant-list-item-extra" }, exportAs: ["nzListItemExtra"], ngImport: i0, template: ` <ng-content></ng-content> `, isInline: true, changeDetection: i0.ChangeDetectionStrategy.OnPush });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.1.2", ngImport: i0, type: NzListItemExtraComponent, decorators: [{
            type: Component,
            args: [{
                    selector: 'nz-list-item-extra, [nz-list-item-extra]',
                    exportAs: 'nzListItemExtra',
                    changeDetection: ChangeDetectionStrategy.OnPush,
                    template: ` <ng-content></ng-content> `,
                    host: {
                        class: 'ant-list-item-extra'
                    }
                }]
        }], ctorParameters: function () { return []; } });
class NzListItemActionComponent {
    constructor() { }
}
NzListItemActionComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.1.2", ngImport: i0, type: NzListItemActionComponent, deps: [], target: i0.ɵɵFactoryTarget.Component });
NzListItemActionComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "13.1.2", type: NzListItemActionComponent, selector: "nz-list-item-action", viewQueries: [{ propertyName: "templateRef", first: true, predicate: TemplateRef, descendants: true }], exportAs: ["nzListItemAction"], ngImport: i0, template: ` <ng-template><ng-content></ng-content></ng-template> `, isInline: true, changeDetection: i0.ChangeDetectionStrategy.OnPush });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.1.2", ngImport: i0, type: NzListItemActionComponent, decorators: [{
            type: Component,
            args: [{
                    selector: 'nz-list-item-action',
                    exportAs: 'nzListItemAction',
                    changeDetection: ChangeDetectionStrategy.OnPush,
                    template: ` <ng-template><ng-content></ng-content></ng-template> `
                }]
        }], ctorParameters: function () { return []; }, propDecorators: { templateRef: [{
                type: ViewChild,
                args: [TemplateRef]
            }] } });
class NzListItemActionsComponent {
    constructor(ngZone, cdr) {
        this.ngZone = ngZone;
        this.cdr = cdr;
        this.nzActions = [];
        this.actions = [];
        this.destroy$ = new Subject();
        this.inputActionChanges$ = new Subject();
        this.contentChildrenChanges$ = defer(() => {
            if (this.nzListItemActions) {
                return of(null);
            }
            return this.ngZone.onStable.asObservable().pipe(take(1), switchMap(() => this.contentChildrenChanges$));
        });
        merge(this.contentChildrenChanges$, this.inputActionChanges$)
            .pipe(takeUntil(this.destroy$))
            .subscribe(() => {
            if (this.nzActions.length) {
                this.actions = this.nzActions;
            }
            else {
                this.actions = this.nzListItemActions.map(action => action.templateRef);
            }
            this.cdr.detectChanges();
        });
    }
    ngOnChanges() {
        this.inputActionChanges$.next(null);
    }
    ngOnDestroy() {
        this.destroy$.next();
        this.destroy$.complete();
    }
}
NzListItemActionsComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.1.2", ngImport: i0, type: NzListItemActionsComponent, deps: [{ token: i0.NgZone }, { token: i0.ChangeDetectorRef }], target: i0.ɵɵFactoryTarget.Component });
NzListItemActionsComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "13.1.2", type: NzListItemActionsComponent, selector: "ul[nz-list-item-actions]", inputs: { nzActions: "nzActions" }, host: { classAttribute: "ant-list-item-action" }, queries: [{ propertyName: "nzListItemActions", predicate: NzListItemActionComponent }], exportAs: ["nzListItemActions"], usesOnChanges: true, ngImport: i0, template: `
    <li *ngFor="let i of actions; let last = last">
      <ng-template [ngTemplateOutlet]="i"></ng-template>
      <em *ngIf="!last" class="ant-list-item-action-split"></em>
    </li>
  `, isInline: true, directives: [{ type: i2.NgForOf, selector: "[ngFor][ngForOf]", inputs: ["ngForOf", "ngForTrackBy", "ngForTemplate"] }, { type: i2.NgTemplateOutlet, selector: "[ngTemplateOutlet]", inputs: ["ngTemplateOutletContext", "ngTemplateOutlet"] }, { type: i2.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }], changeDetection: i0.ChangeDetectionStrategy.OnPush });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.1.2", ngImport: i0, type: NzListItemActionsComponent, decorators: [{
            type: Component,
            args: [{
                    selector: 'ul[nz-list-item-actions]',
                    exportAs: 'nzListItemActions',
                    changeDetection: ChangeDetectionStrategy.OnPush,
                    template: `
    <li *ngFor="let i of actions; let last = last">
      <ng-template [ngTemplateOutlet]="i"></ng-template>
      <em *ngIf="!last" class="ant-list-item-action-split"></em>
    </li>
  `,
                    host: {
                        class: 'ant-list-item-action'
                    }
                }]
        }], ctorParameters: function () { return [{ type: i0.NgZone }, { type: i0.ChangeDetectorRef }]; }, propDecorators: { nzActions: [{
                type: Input
            }], nzListItemActions: [{
                type: ContentChildren,
                args: [NzListItemActionComponent]
            }] } });

/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */
class NzListEmptyComponent {
}
NzListEmptyComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.1.2", ngImport: i0, type: NzListEmptyComponent, deps: [], target: i0.ɵɵFactoryTarget.Component });
NzListEmptyComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "13.1.2", type: NzListEmptyComponent, selector: "nz-list-empty", inputs: { nzNoResult: "nzNoResult" }, host: { classAttribute: "ant-list-empty-text" }, exportAs: ["nzListHeader"], ngImport: i0, template: ` <nz-embed-empty [nzComponentName]="'list'" [specificContent]="nzNoResult"></nz-embed-empty> `, isInline: true, components: [{ type: i1$1.NzEmbedEmptyComponent, selector: "nz-embed-empty", inputs: ["nzComponentName", "specificContent"], exportAs: ["nzEmbedEmpty"] }], changeDetection: i0.ChangeDetectionStrategy.OnPush });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.1.2", ngImport: i0, type: NzListEmptyComponent, decorators: [{
            type: Component,
            args: [{
                    selector: 'nz-list-empty',
                    exportAs: 'nzListHeader',
                    changeDetection: ChangeDetectionStrategy.OnPush,
                    template: ` <nz-embed-empty [nzComponentName]="'list'" [specificContent]="nzNoResult"></nz-embed-empty> `,
                    host: {
                        class: 'ant-list-empty-text'
                    }
                }]
        }], propDecorators: { nzNoResult: [{
                type: Input
            }] } });
class NzListHeaderComponent {
}
NzListHeaderComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.1.2", ngImport: i0, type: NzListHeaderComponent, deps: [], target: i0.ɵɵFactoryTarget.Component });
NzListHeaderComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "13.1.2", type: NzListHeaderComponent, selector: "nz-list-header", host: { classAttribute: "ant-list-header" }, exportAs: ["nzListHeader"], ngImport: i0, template: ` <ng-content></ng-content> `, isInline: true, changeDetection: i0.ChangeDetectionStrategy.OnPush });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.1.2", ngImport: i0, type: NzListHeaderComponent, decorators: [{
            type: Component,
            args: [{
                    selector: 'nz-list-header',
                    exportAs: 'nzListHeader',
                    changeDetection: ChangeDetectionStrategy.OnPush,
                    template: ` <ng-content></ng-content> `,
                    host: {
                        class: 'ant-list-header'
                    }
                }]
        }] });
class NzListFooterComponent {
}
NzListFooterComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.1.2", ngImport: i0, type: NzListFooterComponent, deps: [], target: i0.ɵɵFactoryTarget.Component });
NzListFooterComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "13.1.2", type: NzListFooterComponent, selector: "nz-list-footer", host: { classAttribute: "ant-list-footer" }, exportAs: ["nzListFooter"], ngImport: i0, template: ` <ng-content></ng-content> `, isInline: true, changeDetection: i0.ChangeDetectionStrategy.OnPush });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.1.2", ngImport: i0, type: NzListFooterComponent, decorators: [{
            type: Component,
            args: [{
                    selector: 'nz-list-footer',
                    exportAs: 'nzListFooter',
                    changeDetection: ChangeDetectionStrategy.OnPush,
                    template: ` <ng-content></ng-content> `,
                    host: {
                        class: 'ant-list-footer'
                    }
                }]
        }] });
class NzListPaginationComponent {
}
NzListPaginationComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.1.2", ngImport: i0, type: NzListPaginationComponent, deps: [], target: i0.ɵɵFactoryTarget.Component });
NzListPaginationComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "13.1.2", type: NzListPaginationComponent, selector: "nz-list-pagination", host: { classAttribute: "ant-list-pagination" }, exportAs: ["nzListPagination"], ngImport: i0, template: ` <ng-content></ng-content> `, isInline: true, changeDetection: i0.ChangeDetectionStrategy.OnPush });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.1.2", ngImport: i0, type: NzListPaginationComponent, decorators: [{
            type: Component,
            args: [{
                    selector: 'nz-list-pagination',
                    exportAs: 'nzListPagination',
                    changeDetection: ChangeDetectionStrategy.OnPush,
                    template: ` <ng-content></ng-content> `,
                    host: {
                        class: 'ant-list-pagination'
                    }
                }]
        }] });
class NzListLoadMoreDirective {
}
NzListLoadMoreDirective.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.1.2", ngImport: i0, type: NzListLoadMoreDirective, deps: [], target: i0.ɵɵFactoryTarget.Directive });
NzListLoadMoreDirective.ɵdir = i0.ɵɵngDeclareDirective({ minVersion: "12.0.0", version: "13.1.2", type: NzListLoadMoreDirective, selector: "nz-list-load-more", exportAs: ["nzListLoadMoreDirective"], ngImport: i0 });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.1.2", ngImport: i0, type: NzListLoadMoreDirective, decorators: [{
            type: Directive,
            args: [{
                    selector: 'nz-list-load-more',
                    exportAs: 'nzListLoadMoreDirective'
                }]
        }] });
class NzListGridDirective {
}
NzListGridDirective.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.1.2", ngImport: i0, type: NzListGridDirective, deps: [], target: i0.ɵɵFactoryTarget.Directive });
NzListGridDirective.ɵdir = i0.ɵɵngDeclareDirective({ minVersion: "12.0.0", version: "13.1.2", type: NzListGridDirective, selector: "nz-list[nzGrid]", host: { classAttribute: "ant-list-grid" }, ngImport: i0 });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.1.2", ngImport: i0, type: NzListGridDirective, decorators: [{
            type: Directive,
            args: [{
                    selector: 'nz-list[nzGrid]',
                    host: {
                        class: 'ant-list-grid'
                    }
                }]
        }] });

class NzListComponent {
    constructor(directionality) {
        this.directionality = directionality;
        this.nzBordered = false;
        this.nzGrid = '';
        this.nzItemLayout = 'horizontal';
        this.nzRenderItem = null;
        this.nzLoading = false;
        this.nzLoadMore = null;
        this.nzSize = 'default';
        this.nzSplit = true;
        this.hasSomethingAfterLastItem = false;
        this.dir = 'ltr';
        this.itemLayoutNotifySource = new BehaviorSubject(this.nzItemLayout);
        this.destroy$ = new Subject();
    }
    get itemLayoutNotify$() {
        return this.itemLayoutNotifySource.asObservable();
    }
    ngOnInit() {
        var _a;
        this.dir = this.directionality.value;
        (_a = this.directionality.change) === null || _a === void 0 ? void 0 : _a.pipe(takeUntil(this.destroy$)).subscribe((direction) => {
            this.dir = direction;
        });
    }
    getSomethingAfterLastItem() {
        return !!(this.nzLoadMore ||
            this.nzPagination ||
            this.nzFooter ||
            this.nzListFooterComponent ||
            this.nzListPaginationComponent ||
            this.nzListLoadMoreDirective);
    }
    ngOnChanges(changes) {
        if (changes.nzItemLayout) {
            this.itemLayoutNotifySource.next(this.nzItemLayout);
        }
    }
    ngOnDestroy() {
        this.itemLayoutNotifySource.unsubscribe();
        this.destroy$.next();
        this.destroy$.complete();
    }
    ngAfterContentInit() {
        this.hasSomethingAfterLastItem = this.getSomethingAfterLastItem();
    }
}
NzListComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.1.2", ngImport: i0, type: NzListComponent, deps: [{ token: i1$2.Directionality, optional: true }], target: i0.ɵɵFactoryTarget.Component });
NzListComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "13.1.2", type: NzListComponent, selector: "nz-list, [nz-list]", inputs: { nzDataSource: "nzDataSource", nzBordered: "nzBordered", nzGrid: "nzGrid", nzHeader: "nzHeader", nzFooter: "nzFooter", nzItemLayout: "nzItemLayout", nzRenderItem: "nzRenderItem", nzLoading: "nzLoading", nzLoadMore: "nzLoadMore", nzPagination: "nzPagination", nzSize: "nzSize", nzSplit: "nzSplit", nzNoResult: "nzNoResult" }, host: { properties: { "class.ant-list-rtl": "dir === 'rtl'", "class.ant-list-vertical": "nzItemLayout === \"vertical\"", "class.ant-list-lg": "nzSize === \"large\"", "class.ant-list-sm": "nzSize === \"small\"", "class.ant-list-split": "nzSplit", "class.ant-list-bordered": "nzBordered", "class.ant-list-loading": "nzLoading", "class.ant-list-something-after-last-item": "hasSomethingAfterLastItem" }, classAttribute: "ant-list" }, queries: [{ propertyName: "nzListFooterComponent", first: true, predicate: NzListFooterComponent, descendants: true }, { propertyName: "nzListPaginationComponent", first: true, predicate: NzListPaginationComponent, descendants: true }, { propertyName: "nzListLoadMoreDirective", first: true, predicate: NzListLoadMoreDirective, descendants: true }], exportAs: ["nzList"], usesOnChanges: true, ngImport: i0, template: `
    <ng-template #itemsTpl>
      <div class="ant-list-items">
        <ng-container *ngFor="let item of nzDataSource; let index = index">
          <ng-template
            [ngTemplateOutlet]="nzRenderItem"
            [ngTemplateOutletContext]="{ $implicit: item, index: index }"
          ></ng-template>
        </ng-container>
        <ng-content></ng-content>
      </div>
    </ng-template>

    <nz-list-header *ngIf="nzHeader">
      <ng-container *nzStringTemplateOutlet="nzHeader">{{ nzHeader }}</ng-container>
    </nz-list-header>
    <ng-content select="nz-list-header"></ng-content>

    <nz-spin [nzSpinning]="nzLoading">
      <ng-container>
        <div *ngIf="nzLoading && nzDataSource && nzDataSource.length === 0" [style.min-height.px]="53"></div>
        <div *ngIf="nzGrid && nzDataSource; else itemsTpl" nz-row [nzGutter]="nzGrid.gutter || null">
          <div
            nz-col
            [nzSpan]="nzGrid.span || null"
            [nzXs]="nzGrid.xs || null"
            [nzSm]="nzGrid.sm || null"
            [nzMd]="nzGrid.md || null"
            [nzLg]="nzGrid.lg || null"
            [nzXl]="nzGrid.xl || null"
            [nzXXl]="nzGrid.xxl || null"
            *ngFor="let item of nzDataSource; let index = index"
          >
            <ng-template
              [ngTemplateOutlet]="nzRenderItem"
              [ngTemplateOutletContext]="{ $implicit: item, index: index }"
            ></ng-template>
          </div>
        </div>
        <nz-list-empty
          *ngIf="!nzLoading && nzDataSource && nzDataSource.length === 0"
          [nzNoResult]="nzNoResult"
        ></nz-list-empty>
      </ng-container>
    </nz-spin>

    <nz-list-footer *ngIf="nzFooter">
      <ng-container *nzStringTemplateOutlet="nzFooter">{{ nzFooter }}</ng-container>
    </nz-list-footer>
    <ng-content select="nz-list-footer, [nz-list-footer]"></ng-content>

    <ng-template [ngTemplateOutlet]="nzLoadMore"></ng-template>
    <ng-content select="nz-list-load-more, [nz-list-load-more]"></ng-content>

    <nz-list-pagination *ngIf="nzPagination">
      <ng-template [ngTemplateOutlet]="nzPagination"></ng-template>
    </nz-list-pagination>
    <ng-content select="nz-list-pagination, [nz-list-pagination]"></ng-content>
  `, isInline: true, components: [{ type: NzListHeaderComponent, selector: "nz-list-header", exportAs: ["nzListHeader"] }, { type: i3$1.NzSpinComponent, selector: "nz-spin", inputs: ["nzIndicator", "nzSize", "nzTip", "nzDelay", "nzSimple", "nzSpinning"], exportAs: ["nzSpin"] }, { type: NzListEmptyComponent, selector: "nz-list-empty", inputs: ["nzNoResult"], exportAs: ["nzListHeader"] }, { type: NzListFooterComponent, selector: "nz-list-footer", exportAs: ["nzListFooter"] }, { type: NzListPaginationComponent, selector: "nz-list-pagination", exportAs: ["nzListPagination"] }], directives: [{ type: i2.NgForOf, selector: "[ngFor][ngForOf]", inputs: ["ngForOf", "ngForTrackBy", "ngForTemplate"] }, { type: i2.NgTemplateOutlet, selector: "[ngTemplateOutlet]", inputs: ["ngTemplateOutletContext", "ngTemplateOutlet"] }, { type: i2.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { type: i3.NzStringTemplateOutletDirective, selector: "[nzStringTemplateOutlet]", inputs: ["nzStringTemplateOutletContext", "nzStringTemplateOutlet"], exportAs: ["nzStringTemplateOutlet"] }, { type: i6.NzRowDirective, selector: "[nz-row],nz-row,nz-form-item", inputs: ["nzAlign", "nzJustify", "nzGutter"], exportAs: ["nzRow"] }, { type: i6.NzColDirective, selector: "[nz-col],nz-col,nz-form-control,nz-form-label", inputs: ["nzFlex", "nzSpan", "nzOrder", "nzOffset", "nzPush", "nzPull", "nzXs", "nzSm", "nzMd", "nzLg", "nzXl", "nzXXl"], exportAs: ["nzCol"] }], changeDetection: i0.ChangeDetectionStrategy.OnPush, encapsulation: i0.ViewEncapsulation.None });
__decorate([
    InputBoolean()
], NzListComponent.prototype, "nzBordered", void 0);
__decorate([
    InputBoolean()
], NzListComponent.prototype, "nzLoading", void 0);
__decorate([
    InputBoolean()
], NzListComponent.prototype, "nzSplit", void 0);
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.1.2", ngImport: i0, type: NzListComponent, decorators: [{
            type: Component,
            args: [{
                    selector: 'nz-list, [nz-list]',
                    exportAs: 'nzList',
                    template: `
    <ng-template #itemsTpl>
      <div class="ant-list-items">
        <ng-container *ngFor="let item of nzDataSource; let index = index">
          <ng-template
            [ngTemplateOutlet]="nzRenderItem"
            [ngTemplateOutletContext]="{ $implicit: item, index: index }"
          ></ng-template>
        </ng-container>
        <ng-content></ng-content>
      </div>
    </ng-template>

    <nz-list-header *ngIf="nzHeader">
      <ng-container *nzStringTemplateOutlet="nzHeader">{{ nzHeader }}</ng-container>
    </nz-list-header>
    <ng-content select="nz-list-header"></ng-content>

    <nz-spin [nzSpinning]="nzLoading">
      <ng-container>
        <div *ngIf="nzLoading && nzDataSource && nzDataSource.length === 0" [style.min-height.px]="53"></div>
        <div *ngIf="nzGrid && nzDataSource; else itemsTpl" nz-row [nzGutter]="nzGrid.gutter || null">
          <div
            nz-col
            [nzSpan]="nzGrid.span || null"
            [nzXs]="nzGrid.xs || null"
            [nzSm]="nzGrid.sm || null"
            [nzMd]="nzGrid.md || null"
            [nzLg]="nzGrid.lg || null"
            [nzXl]="nzGrid.xl || null"
            [nzXXl]="nzGrid.xxl || null"
            *ngFor="let item of nzDataSource; let index = index"
          >
            <ng-template
              [ngTemplateOutlet]="nzRenderItem"
              [ngTemplateOutletContext]="{ $implicit: item, index: index }"
            ></ng-template>
          </div>
        </div>
        <nz-list-empty
          *ngIf="!nzLoading && nzDataSource && nzDataSource.length === 0"
          [nzNoResult]="nzNoResult"
        ></nz-list-empty>
      </ng-container>
    </nz-spin>

    <nz-list-footer *ngIf="nzFooter">
      <ng-container *nzStringTemplateOutlet="nzFooter">{{ nzFooter }}</ng-container>
    </nz-list-footer>
    <ng-content select="nz-list-footer, [nz-list-footer]"></ng-content>

    <ng-template [ngTemplateOutlet]="nzLoadMore"></ng-template>
    <ng-content select="nz-list-load-more, [nz-list-load-more]"></ng-content>

    <nz-list-pagination *ngIf="nzPagination">
      <ng-template [ngTemplateOutlet]="nzPagination"></ng-template>
    </nz-list-pagination>
    <ng-content select="nz-list-pagination, [nz-list-pagination]"></ng-content>
  `,
                    preserveWhitespaces: false,
                    encapsulation: ViewEncapsulation.None,
                    changeDetection: ChangeDetectionStrategy.OnPush,
                    host: {
                        class: 'ant-list',
                        '[class.ant-list-rtl]': `dir === 'rtl'`,
                        '[class.ant-list-vertical]': 'nzItemLayout === "vertical"',
                        '[class.ant-list-lg]': 'nzSize === "large"',
                        '[class.ant-list-sm]': 'nzSize === "small"',
                        '[class.ant-list-split]': 'nzSplit',
                        '[class.ant-list-bordered]': 'nzBordered',
                        '[class.ant-list-loading]': 'nzLoading',
                        '[class.ant-list-something-after-last-item]': 'hasSomethingAfterLastItem'
                    }
                }]
        }], ctorParameters: function () {
        return [{ type: i1$2.Directionality, decorators: [{
                        type: Optional
                    }] }];
    }, propDecorators: { nzDataSource: [{
                type: Input
            }], nzBordered: [{
                type: Input
            }], nzGrid: [{
                type: Input
            }], nzHeader: [{
                type: Input
            }], nzFooter: [{
                type: Input
            }], nzItemLayout: [{
                type: Input
            }], nzRenderItem: [{
                type: Input
            }], nzLoading: [{
                type: Input
            }], nzLoadMore: [{
                type: Input
            }], nzPagination: [{
                type: Input
            }], nzSize: [{
                type: Input
            }], nzSplit: [{
                type: Input
            }], nzNoResult: [{
                type: Input
            }], nzListFooterComponent: [{
                type: ContentChild,
                args: [NzListFooterComponent]
            }], nzListPaginationComponent: [{
                type: ContentChild,
                args: [NzListPaginationComponent]
            }], nzListLoadMoreDirective: [{
                type: ContentChild,
                args: [NzListLoadMoreDirective]
            }] } });

class NzListItemComponent {
    constructor(elementRef, renderer, parentComp, cdr) {
        this.parentComp = parentComp;
        this.cdr = cdr;
        this.nzActions = [];
        this.nzExtra = null;
        this.nzNoFlex = false;
        renderer.addClass(elementRef.nativeElement, 'ant-list-item');
    }
    get isVerticalAndExtra() {
        return this.itemLayout === 'vertical' && (!!this.listItemExtraDirective || !!this.nzExtra);
    }
    ngAfterViewInit() {
        this.itemLayout$ = this.parentComp.itemLayoutNotify$.subscribe(val => {
            this.itemLayout = val;
            this.cdr.detectChanges();
        });
    }
    ngOnDestroy() {
        if (this.itemLayout$) {
            this.itemLayout$.unsubscribe();
        }
    }
}
NzListItemComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.1.2", ngImport: i0, type: NzListItemComponent, deps: [{ token: i0.ElementRef }, { token: i0.Renderer2 }, { token: NzListComponent }, { token: i0.ChangeDetectorRef }], target: i0.ɵɵFactoryTarget.Component });
NzListItemComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "13.1.2", type: NzListItemComponent, selector: "nz-list-item, [nz-list-item]", inputs: { nzActions: "nzActions", nzContent: "nzContent", nzExtra: "nzExtra", nzNoFlex: "nzNoFlex" }, host: { properties: { "class.ant-list-item-no-flex": "this.nzNoFlex" } }, queries: [{ propertyName: "listItemExtraDirective", first: true, predicate: NzListItemExtraComponent, descendants: true }], exportAs: ["nzListItem"], ngImport: i0, template: `
    <ng-template #actionsTpl>
      <ul nz-list-item-actions *ngIf="nzActions && nzActions.length > 0" [nzActions]="nzActions"></ul>
      <ng-content select="nz-list-item-actions, [nz-list-item-actions]"></ng-content>
    </ng-template>
    <ng-template #contentTpl>
      <ng-content select="nz-list-item-meta, [nz-list-item-meta]"></ng-content>
      <ng-content></ng-content>
      <ng-container *ngIf="nzContent">
        <ng-container *nzStringTemplateOutlet="nzContent">{{ nzContent }}</ng-container>
      </ng-container>
    </ng-template>
    <ng-template #extraTpl>
      <ng-content select="nz-list-item-extra, [nz-list-item-extra]"></ng-content>
    </ng-template>
    <ng-template #simpleTpl>
      <ng-template [ngTemplateOutlet]="contentTpl"></ng-template>
      <ng-template [ngTemplateOutlet]="nzExtra"></ng-template>
      <ng-template [ngTemplateOutlet]="extraTpl"></ng-template>
      <ng-template [ngTemplateOutlet]="actionsTpl"></ng-template>
    </ng-template>

    <ng-container *ngIf="isVerticalAndExtra; else simpleTpl">
      <div class="ant-list-item-main">
        <ng-template [ngTemplateOutlet]="contentTpl"></ng-template>
        <ng-template [ngTemplateOutlet]="actionsTpl"></ng-template>
      </div>
      <nz-list-item-extra *ngIf="nzExtra">
        <ng-template [ngTemplateOutlet]="nzExtra"></ng-template>
      </nz-list-item-extra>
      <ng-template [ngTemplateOutlet]="extraTpl"></ng-template>
    </ng-container>
  `, isInline: true, components: [{ type: NzListItemActionsComponent, selector: "ul[nz-list-item-actions]", inputs: ["nzActions"], exportAs: ["nzListItemActions"] }, { type: NzListItemExtraComponent, selector: "nz-list-item-extra, [nz-list-item-extra]", exportAs: ["nzListItemExtra"] }], directives: [{ type: i2.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { type: i3.NzStringTemplateOutletDirective, selector: "[nzStringTemplateOutlet]", inputs: ["nzStringTemplateOutletContext", "nzStringTemplateOutlet"], exportAs: ["nzStringTemplateOutlet"] }, { type: i2.NgTemplateOutlet, selector: "[ngTemplateOutlet]", inputs: ["ngTemplateOutletContext", "ngTemplateOutlet"] }], changeDetection: i0.ChangeDetectionStrategy.OnPush, encapsulation: i0.ViewEncapsulation.None });
__decorate([
    InputBoolean()
], NzListItemComponent.prototype, "nzNoFlex", void 0);
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.1.2", ngImport: i0, type: NzListItemComponent, decorators: [{
            type: Component,
            args: [{
                    selector: 'nz-list-item, [nz-list-item]',
                    exportAs: 'nzListItem',
                    template: `
    <ng-template #actionsTpl>
      <ul nz-list-item-actions *ngIf="nzActions && nzActions.length > 0" [nzActions]="nzActions"></ul>
      <ng-content select="nz-list-item-actions, [nz-list-item-actions]"></ng-content>
    </ng-template>
    <ng-template #contentTpl>
      <ng-content select="nz-list-item-meta, [nz-list-item-meta]"></ng-content>
      <ng-content></ng-content>
      <ng-container *ngIf="nzContent">
        <ng-container *nzStringTemplateOutlet="nzContent">{{ nzContent }}</ng-container>
      </ng-container>
    </ng-template>
    <ng-template #extraTpl>
      <ng-content select="nz-list-item-extra, [nz-list-item-extra]"></ng-content>
    </ng-template>
    <ng-template #simpleTpl>
      <ng-template [ngTemplateOutlet]="contentTpl"></ng-template>
      <ng-template [ngTemplateOutlet]="nzExtra"></ng-template>
      <ng-template [ngTemplateOutlet]="extraTpl"></ng-template>
      <ng-template [ngTemplateOutlet]="actionsTpl"></ng-template>
    </ng-template>

    <ng-container *ngIf="isVerticalAndExtra; else simpleTpl">
      <div class="ant-list-item-main">
        <ng-template [ngTemplateOutlet]="contentTpl"></ng-template>
        <ng-template [ngTemplateOutlet]="actionsTpl"></ng-template>
      </div>
      <nz-list-item-extra *ngIf="nzExtra">
        <ng-template [ngTemplateOutlet]="nzExtra"></ng-template>
      </nz-list-item-extra>
      <ng-template [ngTemplateOutlet]="extraTpl"></ng-template>
    </ng-container>
  `,
                    preserveWhitespaces: false,
                    encapsulation: ViewEncapsulation.None,
                    changeDetection: ChangeDetectionStrategy.OnPush
                }]
        }], ctorParameters: function () { return [{ type: i0.ElementRef }, { type: i0.Renderer2 }, { type: NzListComponent }, { type: i0.ChangeDetectorRef }]; }, propDecorators: { nzActions: [{
                type: Input
            }], nzContent: [{
                type: Input
            }], nzExtra: [{
                type: Input
            }], nzNoFlex: [{
                type: Input
            }, {
                type: HostBinding,
                args: ['class.ant-list-item-no-flex']
            }], listItemExtraDirective: [{
                type: ContentChild,
                args: [NzListItemExtraComponent]
            }] } });

/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */
const DIRECTIVES = [
    NzListComponent,
    NzListHeaderComponent,
    NzListFooterComponent,
    NzListPaginationComponent,
    NzListEmptyComponent,
    NzListItemComponent,
    NzListItemMetaComponent,
    NzListItemMetaTitleComponent,
    NzListItemMetaDescriptionComponent,
    NzListItemMetaAvatarComponent,
    NzListItemActionsComponent,
    NzListItemActionComponent,
    NzListItemExtraComponent,
    NzListLoadMoreDirective,
    NzListGridDirective
];
class NzListModule {
}
NzListModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.1.2", ngImport: i0, type: NzListModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
NzListModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "12.0.0", version: "13.1.2", ngImport: i0, type: NzListModule, declarations: [NzListComponent,
        NzListHeaderComponent,
        NzListFooterComponent,
        NzListPaginationComponent,
        NzListEmptyComponent,
        NzListItemComponent,
        NzListItemMetaComponent,
        NzListItemMetaTitleComponent,
        NzListItemMetaDescriptionComponent,
        NzListItemMetaAvatarComponent,
        NzListItemActionsComponent,
        NzListItemActionComponent,
        NzListItemExtraComponent,
        NzListLoadMoreDirective,
        NzListGridDirective], imports: [BidiModule, CommonModule, NzSpinModule, NzGridModule, NzAvatarModule, NzOutletModule, NzEmptyModule], exports: [NzListComponent,
        NzListHeaderComponent,
        NzListFooterComponent,
        NzListPaginationComponent,
        NzListEmptyComponent,
        NzListItemComponent,
        NzListItemMetaComponent,
        NzListItemMetaTitleComponent,
        NzListItemMetaDescriptionComponent,
        NzListItemMetaAvatarComponent,
        NzListItemActionsComponent,
        NzListItemActionComponent,
        NzListItemExtraComponent,
        NzListLoadMoreDirective,
        NzListGridDirective] });
NzListModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "13.1.2", ngImport: i0, type: NzListModule, imports: [[BidiModule, CommonModule, NzSpinModule, NzGridModule, NzAvatarModule, NzOutletModule, NzEmptyModule]] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.1.2", ngImport: i0, type: NzListModule, decorators: [{
            type: NgModule,
            args: [{
                    imports: [BidiModule, CommonModule, NzSpinModule, NzGridModule, NzAvatarModule, NzOutletModule, NzEmptyModule],
                    declarations: [DIRECTIVES],
                    exports: [DIRECTIVES]
                }]
        }] });

/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */

/**
 * Generated bundle index. Do not edit.
 */

export { NzListComponent, NzListEmptyComponent, NzListFooterComponent, NzListGridDirective, NzListHeaderComponent, NzListItemActionComponent, NzListItemActionsComponent, NzListItemComponent, NzListItemExtraComponent, NzListItemMetaAvatarComponent, NzListItemMetaComponent, NzListItemMetaDescriptionComponent, NzListItemMetaTitleComponent, NzListLoadMoreDirective, NzListModule, NzListPaginationComponent };
//# sourceMappingURL=ng-zorro-antd-list.mjs.map
