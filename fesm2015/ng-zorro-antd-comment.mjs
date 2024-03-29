import * as i1 from '@angular/cdk/bidi';
import { BidiModule } from '@angular/cdk/bidi';
import * as i2 from '@angular/common';
import { CommonModule } from '@angular/common';
import * as i0 from '@angular/core';
import { Directive, Input, TemplateRef, Component, ViewEncapsulation, ChangeDetectionStrategy, ViewChild, Optional, ContentChildren, NgModule } from '@angular/core';
import * as i3 from 'ng-zorro-antd/core/outlet';
import { NzOutletModule } from 'ng-zorro-antd/core/outlet';
import { CdkPortalOutlet, TemplatePortal } from '@angular/cdk/portal';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */
class NzCommentAvatarDirective {
}
NzCommentAvatarDirective.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.1.2", ngImport: i0, type: NzCommentAvatarDirective, deps: [], target: i0.ɵɵFactoryTarget.Directive });
NzCommentAvatarDirective.ɵdir = i0.ɵɵngDeclareDirective({ minVersion: "12.0.0", version: "13.1.2", type: NzCommentAvatarDirective, selector: "nz-avatar[nz-comment-avatar]", exportAs: ["nzCommentAvatar"], ngImport: i0 });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.1.2", ngImport: i0, type: NzCommentAvatarDirective, decorators: [{
            type: Directive,
            args: [{
                    selector: 'nz-avatar[nz-comment-avatar]',
                    exportAs: 'nzCommentAvatar'
                }]
        }] });
class NzCommentContentDirective {
}
NzCommentContentDirective.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.1.2", ngImport: i0, type: NzCommentContentDirective, deps: [], target: i0.ɵɵFactoryTarget.Directive });
NzCommentContentDirective.ɵdir = i0.ɵɵngDeclareDirective({ minVersion: "12.0.0", version: "13.1.2", type: NzCommentContentDirective, selector: "nz-comment-content, [nz-comment-content]", host: { classAttribute: "ant-comment-content-detail" }, exportAs: ["nzCommentContent"], ngImport: i0 });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.1.2", ngImport: i0, type: NzCommentContentDirective, decorators: [{
            type: Directive,
            args: [{
                    selector: 'nz-comment-content, [nz-comment-content]',
                    exportAs: 'nzCommentContent',
                    host: { class: 'ant-comment-content-detail' }
                }]
        }] });
class NzCommentActionHostDirective extends CdkPortalOutlet {
    constructor(componentFactoryResolver, viewContainerRef) {
        super(componentFactoryResolver, viewContainerRef);
    }
    ngOnInit() {
        super.ngOnInit();
    }
    ngOnDestroy() {
        super.ngOnDestroy();
    }
    ngAfterViewInit() {
        this.attach(this.nzCommentActionHost);
    }
}
NzCommentActionHostDirective.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.1.2", ngImport: i0, type: NzCommentActionHostDirective, deps: [{ token: i0.ComponentFactoryResolver }, { token: i0.ViewContainerRef }], target: i0.ɵɵFactoryTarget.Directive });
NzCommentActionHostDirective.ɵdir = i0.ɵɵngDeclareDirective({ minVersion: "12.0.0", version: "13.1.2", type: NzCommentActionHostDirective, selector: "[nzCommentActionHost]", inputs: { nzCommentActionHost: "nzCommentActionHost" }, exportAs: ["nzCommentActionHost"], usesInheritance: true, ngImport: i0 });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.1.2", ngImport: i0, type: NzCommentActionHostDirective, decorators: [{
            type: Directive,
            args: [{
                    selector: '[nzCommentActionHost]',
                    exportAs: 'nzCommentActionHost'
                }]
        }], ctorParameters: function () { return [{ type: i0.ComponentFactoryResolver }, { type: i0.ViewContainerRef }]; }, propDecorators: { nzCommentActionHost: [{
                type: Input
            }] } });
class NzCommentActionComponent {
    constructor(viewContainerRef) {
        this.viewContainerRef = viewContainerRef;
        this.contentPortal = null;
    }
    get content() {
        return this.contentPortal;
    }
    ngOnInit() {
        this.contentPortal = new TemplatePortal(this.implicitContent, this.viewContainerRef);
    }
}
NzCommentActionComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.1.2", ngImport: i0, type: NzCommentActionComponent, deps: [{ token: i0.ViewContainerRef }], target: i0.ɵɵFactoryTarget.Component });
NzCommentActionComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "13.1.2", type: NzCommentActionComponent, selector: "nz-comment-action", viewQueries: [{ propertyName: "implicitContent", first: true, predicate: TemplateRef, descendants: true, static: true }], exportAs: ["nzCommentAction"], ngImport: i0, template: '<ng-template><ng-content></ng-content></ng-template>', isInline: true, changeDetection: i0.ChangeDetectionStrategy.OnPush, encapsulation: i0.ViewEncapsulation.None });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.1.2", ngImport: i0, type: NzCommentActionComponent, decorators: [{
            type: Component,
            args: [{
                    selector: 'nz-comment-action',
                    exportAs: 'nzCommentAction',
                    encapsulation: ViewEncapsulation.None,
                    changeDetection: ChangeDetectionStrategy.OnPush,
                    template: '<ng-template><ng-content></ng-content></ng-template>'
                }]
        }], ctorParameters: function () { return [{ type: i0.ViewContainerRef }]; }, propDecorators: { implicitContent: [{
                type: ViewChild,
                args: [TemplateRef, { static: true }]
            }] } });

class NzCommentComponent {
    constructor(cdr, directionality) {
        this.cdr = cdr;
        this.directionality = directionality;
        this.dir = 'ltr';
        this.destroy$ = new Subject();
    }
    ngOnInit() {
        var _a;
        (_a = this.directionality.change) === null || _a === void 0 ? void 0 : _a.pipe(takeUntil(this.destroy$)).subscribe((direction) => {
            this.dir = direction;
            this.cdr.detectChanges();
        });
        this.dir = this.directionality.value;
    }
    ngOnDestroy() {
        this.destroy$.next();
        this.destroy$.complete();
    }
}
NzCommentComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.1.2", ngImport: i0, type: NzCommentComponent, deps: [{ token: i0.ChangeDetectorRef }, { token: i1.Directionality, optional: true }], target: i0.ɵɵFactoryTarget.Component });
NzCommentComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "13.1.2", type: NzCommentComponent, selector: "nz-comment", inputs: { nzAuthor: "nzAuthor", nzDatetime: "nzDatetime" }, host: { properties: { "class.ant-comment": "true", "class.ant-comment-rtl": "dir === \"rtl\"" } }, queries: [{ propertyName: "actions", predicate: NzCommentActionComponent }], exportAs: ["nzComment"], ngImport: i0, template: `
    <div class="ant-comment-inner">
      <div class="ant-comment-avatar">
        <ng-content select="nz-avatar[nz-comment-avatar]"></ng-content>
      </div>
      <div class="ant-comment-content">
        <div class="ant-comment-content-author">
          <span *ngIf="nzAuthor" class="ant-comment-content-author-name">
            <ng-container *nzStringTemplateOutlet="nzAuthor">{{ nzAuthor }}</ng-container>
          </span>
          <span *ngIf="nzDatetime" class="ant-comment-content-author-time">
            <ng-container *nzStringTemplateOutlet="nzDatetime">{{ nzDatetime }}</ng-container>
          </span>
        </div>
        <ng-content select="nz-comment-content"></ng-content>
        <ul class="ant-comment-actions" *ngIf="actions?.length">
          <li *ngFor="let action of actions">
            <span><ng-template [nzCommentActionHost]="action.content"></ng-template></span>
          </li>
        </ul>
      </div>
    </div>
    <div class="ant-comment-nested">
      <ng-content></ng-content>
    </div>
  `, isInline: true, directives: [{ type: i2.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { type: i3.NzStringTemplateOutletDirective, selector: "[nzStringTemplateOutlet]", inputs: ["nzStringTemplateOutletContext", "nzStringTemplateOutlet"], exportAs: ["nzStringTemplateOutlet"] }, { type: i2.NgForOf, selector: "[ngFor][ngForOf]", inputs: ["ngForOf", "ngForTrackBy", "ngForTemplate"] }, { type: NzCommentActionHostDirective, selector: "[nzCommentActionHost]", inputs: ["nzCommentActionHost"], exportAs: ["nzCommentActionHost"] }], changeDetection: i0.ChangeDetectionStrategy.OnPush, encapsulation: i0.ViewEncapsulation.None });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.1.2", ngImport: i0, type: NzCommentComponent, decorators: [{
            type: Component,
            args: [{
                    selector: 'nz-comment',
                    exportAs: 'nzComment',
                    template: `
    <div class="ant-comment-inner">
      <div class="ant-comment-avatar">
        <ng-content select="nz-avatar[nz-comment-avatar]"></ng-content>
      </div>
      <div class="ant-comment-content">
        <div class="ant-comment-content-author">
          <span *ngIf="nzAuthor" class="ant-comment-content-author-name">
            <ng-container *nzStringTemplateOutlet="nzAuthor">{{ nzAuthor }}</ng-container>
          </span>
          <span *ngIf="nzDatetime" class="ant-comment-content-author-time">
            <ng-container *nzStringTemplateOutlet="nzDatetime">{{ nzDatetime }}</ng-container>
          </span>
        </div>
        <ng-content select="nz-comment-content"></ng-content>
        <ul class="ant-comment-actions" *ngIf="actions?.length">
          <li *ngFor="let action of actions">
            <span><ng-template [nzCommentActionHost]="action.content"></ng-template></span>
          </li>
        </ul>
      </div>
    </div>
    <div class="ant-comment-nested">
      <ng-content></ng-content>
    </div>
  `,
                    encapsulation: ViewEncapsulation.None,
                    changeDetection: ChangeDetectionStrategy.OnPush,
                    host: {
                        '[class.ant-comment]': `true`,
                        '[class.ant-comment-rtl]': `dir === "rtl"`
                    }
                }]
        }], ctorParameters: function () {
        return [{ type: i0.ChangeDetectorRef }, { type: i1.Directionality, decorators: [{
                        type: Optional
                    }] }];
    }, propDecorators: { nzAuthor: [{
                type: Input
            }], nzDatetime: [{
                type: Input
            }], actions: [{
                type: ContentChildren,
                args: [NzCommentActionComponent]
            }] } });

/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */
const NZ_COMMENT_CELLS = [
    NzCommentAvatarDirective,
    NzCommentContentDirective,
    NzCommentActionComponent,
    NzCommentActionHostDirective
];
class NzCommentModule {
}
NzCommentModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.1.2", ngImport: i0, type: NzCommentModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
NzCommentModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "12.0.0", version: "13.1.2", ngImport: i0, type: NzCommentModule, declarations: [NzCommentComponent, NzCommentAvatarDirective,
        NzCommentContentDirective,
        NzCommentActionComponent,
        NzCommentActionHostDirective], imports: [BidiModule, CommonModule, NzOutletModule], exports: [NzCommentComponent, NzCommentAvatarDirective,
        NzCommentContentDirective,
        NzCommentActionComponent,
        NzCommentActionHostDirective] });
NzCommentModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "13.1.2", ngImport: i0, type: NzCommentModule, imports: [[BidiModule, CommonModule, NzOutletModule]] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.1.2", ngImport: i0, type: NzCommentModule, decorators: [{
            type: NgModule,
            args: [{
                    imports: [BidiModule, CommonModule, NzOutletModule],
                    exports: [NzCommentComponent, ...NZ_COMMENT_CELLS],
                    declarations: [NzCommentComponent, ...NZ_COMMENT_CELLS]
                }]
        }] });

/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */

/**
 * Generated bundle index. Do not edit.
 */

export { NzCommentActionComponent, NzCommentActionHostDirective, NzCommentAvatarDirective, NzCommentComponent, NzCommentContentDirective, NzCommentModule };
//# sourceMappingURL=ng-zorro-antd-comment.mjs.map
