import { __decorate } from "tslib";
import { DOCUMENT } from '@angular/common';
import { ChangeDetectionStrategy, Component, EventEmitter, Inject, Input, Optional, Output, ViewChild, ViewEncapsulation } from '@angular/core';
import { Subject, Subscription } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { WithConfig } from 'ng-zorro-antd/core/config';
import { cancelRequestAnimationFrame, reqAnimFrame } from 'ng-zorro-antd/core/polyfill';
import { InputBoolean, InputNumber, isStyleSupport, measure } from 'ng-zorro-antd/core/util';
import { NzTextCopyComponent } from './text-copy.component';
import { NzTextEditComponent } from './text-edit.component';
import * as i0 from "@angular/core";
import * as i1 from "ng-zorro-antd/core/config";
import * as i2 from "@angular/cdk/platform";
import * as i3 from "ng-zorro-antd/i18n";
import * as i4 from "ng-zorro-antd/core/services";
import * as i5 from "@angular/cdk/bidi";
import * as i6 from "./text-edit.component";
import * as i7 from "./text-copy.component";
import * as i8 from "@angular/common";
const NZ_CONFIG_MODULE_NAME = 'typography';
const EXPAND_ELEMENT_CLASSNAME = 'ant-typography-expand';
export class NzTypographyComponent {
    constructor(nzConfigService, host, cdr, viewContainerRef, renderer, platform, i18n, document, resizeService, directionality) {
        this.nzConfigService = nzConfigService;
        this.host = host;
        this.cdr = cdr;
        this.viewContainerRef = viewContainerRef;
        this.renderer = renderer;
        this.platform = platform;
        this.i18n = i18n;
        this.resizeService = resizeService;
        this.directionality = directionality;
        this._nzModuleName = NZ_CONFIG_MODULE_NAME;
        this.nzCopyable = false;
        this.nzEditable = false;
        this.nzDisabled = false;
        this.nzExpandable = false;
        this.nzEllipsis = false;
        this.nzCopyTooltips = undefined;
        this.nzCopyIcons = ['copy', 'check'];
        this.nzEditTooltip = undefined;
        this.nzEditIcon = 'edit';
        this.nzEllipsisRows = 1;
        this.nzContentChange = new EventEmitter();
        this.nzCopy = new EventEmitter();
        this.nzExpandChange = new EventEmitter();
        // This is not a two-way binding output with {@link nzEllipsis}
        this.nzOnEllipsis = new EventEmitter();
        this.expandableBtnElementCache = null;
        this.editing = false;
        this.cssEllipsis = false;
        this.isEllipsis = true;
        this.expanded = false;
        this.ellipsisStr = '...';
        this.dir = 'ltr';
        this.viewInit = false;
        this.rfaId = -1;
        this.destroy$ = new Subject();
        this.windowResizeSubscription = Subscription.EMPTY;
        this.document = document;
    }
    get hasEllipsisObservers() {
        return this.nzOnEllipsis.observers.length > 0;
    }
    get canCssEllipsis() {
        return this.nzEllipsis && this.cssEllipsis && !this.expanded && !this.hasEllipsisObservers;
    }
    get hasOperationsWithEllipsis() {
        return (this.nzCopyable || this.nzEditable || this.nzExpandable) && this.nzEllipsis;
    }
    get copyText() {
        return (typeof this.nzCopyText === 'string' ? this.nzCopyText : this.nzContent);
    }
    onTextCopy(text) {
        this.nzCopy.emit(text);
    }
    onStartEditing() {
        this.editing = true;
    }
    onEndEditing(text) {
        this.editing = false;
        this.nzContentChange.emit(text);
        if (this.nzContent === text) {
            this.renderOnNextFrame();
        }
        this.cdr.markForCheck();
    }
    onExpand() {
        this.isEllipsis = false;
        this.expanded = true;
        this.nzExpandChange.emit();
        this.nzOnEllipsis.emit(false);
    }
    canUseCSSEllipsis() {
        if (this.nzEditable || this.nzCopyable || this.nzExpandable || this.nzSuffix) {
            return false;
        }
        // make sure {@link nzOnEllipsis} works, will force use JS to calculations
        if (this.hasEllipsisObservers) {
            return false;
        }
        if (this.nzEllipsisRows === 1) {
            return isStyleSupport('textOverflow');
        }
        else {
            return isStyleSupport('webkitLineClamp');
        }
    }
    renderOnNextFrame() {
        cancelRequestAnimationFrame(this.rfaId);
        if (!this.viewInit || !this.nzEllipsis || this.nzEllipsisRows < 0 || this.expanded || !this.platform.isBrowser) {
            return;
        }
        this.rfaId = reqAnimFrame(() => {
            this.syncEllipsis();
        });
    }
    getOriginContentViewRef() {
        const viewRef = this.viewContainerRef.createEmbeddedView(this.contentTemplate, {
            content: this.nzContent
        });
        viewRef.detectChanges();
        return {
            viewRef,
            removeView: () => {
                this.viewContainerRef.remove(this.viewContainerRef.indexOf(viewRef));
            }
        };
    }
    syncEllipsis() {
        if (this.cssEllipsis) {
            return;
        }
        const { viewRef, removeView } = this.getOriginContentViewRef();
        const fixedNodes = [this.textCopyRef, this.textEditRef]
            .filter(e => e && e.nativeElement)
            .map(e => e.nativeElement);
        const expandableBtnElement = this.getExpandableBtnElement();
        if (expandableBtnElement) {
            fixedNodes.push(expandableBtnElement);
        }
        const { contentNodes, text, ellipsis } = measure(this.host.nativeElement, this.nzEllipsisRows, viewRef.rootNodes, fixedNodes, this.ellipsisStr, this.nzSuffix);
        removeView();
        this.ellipsisText = text;
        if (ellipsis !== this.isEllipsis) {
            this.isEllipsis = ellipsis;
            this.nzOnEllipsis.emit(ellipsis);
        }
        const ellipsisContainerNativeElement = this.ellipsisContainer.nativeElement;
        while (ellipsisContainerNativeElement.firstChild) {
            this.renderer.removeChild(ellipsisContainerNativeElement, ellipsisContainerNativeElement.firstChild);
        }
        contentNodes.forEach(n => {
            this.renderer.appendChild(ellipsisContainerNativeElement, n.cloneNode(true));
        });
        this.cdr.markForCheck();
    }
    // Need to create the element for calculation size before view init
    getExpandableBtnElement() {
        if (this.nzExpandable) {
            const expandText = this.locale ? this.locale.expand : '';
            const cache = this.expandableBtnElementCache;
            if (!cache || cache.innerText === expandText) {
                const el = this.document.createElement('a');
                el.className = EXPAND_ELEMENT_CLASSNAME;
                el.innerText = expandText;
                this.expandableBtnElementCache = el;
            }
            return this.expandableBtnElementCache;
        }
        else {
            this.expandableBtnElementCache = null;
            return null;
        }
    }
    renderAndSubscribeWindowResize() {
        if (this.platform.isBrowser) {
            this.windowResizeSubscription.unsubscribe();
            this.cssEllipsis = this.canUseCSSEllipsis();
            this.renderOnNextFrame();
            this.windowResizeSubscription = this.resizeService
                .subscribe()
                .pipe(takeUntil(this.destroy$))
                .subscribe(() => this.renderOnNextFrame());
        }
    }
    ngOnInit() {
        this.i18n.localeChange.pipe(takeUntil(this.destroy$)).subscribe(() => {
            this.locale = this.i18n.getLocaleData('Text');
            this.cdr.markForCheck();
        });
        this.directionality.change?.pipe(takeUntil(this.destroy$)).subscribe((direction) => {
            this.dir = direction;
            this.cdr.detectChanges();
        });
        this.dir = this.directionality.value;
    }
    ngAfterViewInit() {
        this.viewInit = true;
        this.renderAndSubscribeWindowResize();
    }
    ngOnChanges(changes) {
        const { nzCopyable, nzEditable, nzExpandable, nzEllipsis, nzContent, nzEllipsisRows, nzSuffix } = changes;
        if (nzCopyable || nzEditable || nzExpandable || nzEllipsis || nzContent || nzEllipsisRows || nzSuffix) {
            if (this.nzEllipsis) {
                if (this.expanded) {
                    this.windowResizeSubscription.unsubscribe();
                }
                else {
                    this.renderAndSubscribeWindowResize();
                }
            }
        }
    }
    ngOnDestroy() {
        this.destroy$.next();
        this.destroy$.complete();
        this.expandableBtnElementCache = null;
        this.windowResizeSubscription.unsubscribe();
    }
}
NzTypographyComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.1.2", ngImport: i0, type: NzTypographyComponent, deps: [{ token: i1.NzConfigService }, { token: i0.ElementRef }, { token: i0.ChangeDetectorRef }, { token: i0.ViewContainerRef }, { token: i0.Renderer2 }, { token: i2.Platform }, { token: i3.NzI18nService }, { token: DOCUMENT }, { token: i4.NzResizeService }, { token: i5.Directionality, optional: true }], target: i0.ɵɵFactoryTarget.Component });
NzTypographyComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "13.1.2", type: NzTypographyComponent, selector: "\n  nz-typography,\n  [nz-typography],\n  p[nz-paragraph],\n  span[nz-text],\n  h1[nz-title], h2[nz-title], h3[nz-title], h4[nz-title]\n  ", inputs: { nzCopyable: "nzCopyable", nzEditable: "nzEditable", nzDisabled: "nzDisabled", nzExpandable: "nzExpandable", nzEllipsis: "nzEllipsis", nzCopyTooltips: "nzCopyTooltips", nzCopyIcons: "nzCopyIcons", nzEditTooltip: "nzEditTooltip", nzEditIcon: "nzEditIcon", nzContent: "nzContent", nzEllipsisRows: "nzEllipsisRows", nzType: "nzType", nzCopyText: "nzCopyText", nzSuffix: "nzSuffix" }, outputs: { nzContentChange: "nzContentChange", nzCopy: "nzCopy", nzExpandChange: "nzExpandChange", nzOnEllipsis: "nzOnEllipsis" }, host: { properties: { "class.ant-typography": "!editing", "class.ant-typography-rtl": "dir === \"rtl\"", "class.ant-typography-edit-content": "editing", "class.ant-typography-secondary": "nzType === \"secondary\"", "class.ant-typography-warning": "nzType === \"warning\"", "class.ant-typography-danger": "nzType === \"danger\"", "class.ant-typography-success": "nzType === \"success\"", "class.ant-typography-disabled": "nzDisabled", "class.ant-typography-ellipsis": "nzEllipsis && !expanded", "class.ant-typography-single-line": "nzEllipsis && nzEllipsisRows === 1", "class.ant-typography-ellipsis-single-line": "canCssEllipsis && nzEllipsisRows === 1", "class.ant-typography-ellipsis-multiple-line": "canCssEllipsis && nzEllipsisRows > 1", "style.-webkit-line-clamp": "(canCssEllipsis && nzEllipsisRows > 1) ? nzEllipsisRows : null" } }, viewQueries: [{ propertyName: "textEditRef", first: true, predicate: NzTextEditComponent, descendants: true }, { propertyName: "textCopyRef", first: true, predicate: NzTextCopyComponent, descendants: true }, { propertyName: "ellipsisContainer", first: true, predicate: ["ellipsisContainer"], descendants: true }, { propertyName: "expandableBtn", first: true, predicate: ["expandable"], descendants: true }, { propertyName: "contentTemplate", first: true, predicate: ["contentTemplate"], descendants: true }], exportAs: ["nzTypography"], usesOnChanges: true, ngImport: i0, template: `
    <ng-template #contentTemplate let-content="content">
      <ng-content *ngIf="!content"></ng-content>
      {{ content }}
    </ng-template>
    <ng-container *ngIf="!editing">
      <ng-container
        *ngIf="
          expanded ||
            (!hasOperationsWithEllipsis && nzEllipsisRows === 1 && !hasEllipsisObservers) ||
            canCssEllipsis ||
            (nzSuffix && expanded);
          else jsEllipsis
        "
      >
        <ng-template
          [ngTemplateOutlet]="contentTemplate"
          [ngTemplateOutletContext]="{ content: nzContent }"
        ></ng-template>
        <ng-container *ngIf="nzSuffix">{{ nzSuffix }}</ng-container>
      </ng-container>
      <ng-template #jsEllipsis>
        <span #ellipsisContainer></span>
        <ng-container *ngIf="isEllipsis">{{ ellipsisStr }}</ng-container>
        <ng-container *ngIf="nzSuffix">{{ nzSuffix }}</ng-container>
        <a #expandable *ngIf="nzExpandable && isEllipsis" class="ant-typography-expand" (click)="onExpand()">
          {{ locale?.expand }}
        </a>
      </ng-template>
    </ng-container>

    <nz-text-edit
      *ngIf="nzEditable"
      [text]="nzContent"
      [icon]="nzEditIcon"
      [tooltip]="nzEditTooltip"
      (endEditing)="onEndEditing($event)"
      (startEditing)="onStartEditing()"
    ></nz-text-edit>

    <nz-text-copy
      *ngIf="nzCopyable && !editing"
      [text]="copyText"
      [tooltips]="nzCopyTooltips"
      [icons]="nzCopyIcons"
      (textCopy)="onTextCopy($event)"
    ></nz-text-copy>
  `, isInline: true, components: [{ type: i6.NzTextEditComponent, selector: "nz-text-edit", inputs: ["text", "icon", "tooltip"], outputs: ["startEditing", "endEditing"], exportAs: ["nzTextEdit"] }, { type: i7.NzTextCopyComponent, selector: "nz-text-copy", inputs: ["text", "tooltips", "icons"], outputs: ["textCopy"], exportAs: ["nzTextCopy"] }], directives: [{ type: i8.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { type: i8.NgTemplateOutlet, selector: "[ngTemplateOutlet]", inputs: ["ngTemplateOutletContext", "ngTemplateOutlet"] }], changeDetection: i0.ChangeDetectionStrategy.OnPush, encapsulation: i0.ViewEncapsulation.None });
__decorate([
    InputBoolean()
], NzTypographyComponent.prototype, "nzCopyable", void 0);
__decorate([
    InputBoolean()
], NzTypographyComponent.prototype, "nzEditable", void 0);
__decorate([
    InputBoolean()
], NzTypographyComponent.prototype, "nzDisabled", void 0);
__decorate([
    InputBoolean()
], NzTypographyComponent.prototype, "nzExpandable", void 0);
__decorate([
    InputBoolean()
], NzTypographyComponent.prototype, "nzEllipsis", void 0);
__decorate([
    WithConfig()
], NzTypographyComponent.prototype, "nzCopyTooltips", void 0);
__decorate([
    WithConfig()
], NzTypographyComponent.prototype, "nzCopyIcons", void 0);
__decorate([
    WithConfig()
], NzTypographyComponent.prototype, "nzEditTooltip", void 0);
__decorate([
    WithConfig()
], NzTypographyComponent.prototype, "nzEditIcon", void 0);
__decorate([
    WithConfig(),
    InputNumber()
], NzTypographyComponent.prototype, "nzEllipsisRows", void 0);
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.1.2", ngImport: i0, type: NzTypographyComponent, decorators: [{
            type: Component,
            args: [{
                    selector: `
  nz-typography,
  [nz-typography],
  p[nz-paragraph],
  span[nz-text],
  h1[nz-title], h2[nz-title], h3[nz-title], h4[nz-title]
  `,
                    exportAs: 'nzTypography',
                    template: `
    <ng-template #contentTemplate let-content="content">
      <ng-content *ngIf="!content"></ng-content>
      {{ content }}
    </ng-template>
    <ng-container *ngIf="!editing">
      <ng-container
        *ngIf="
          expanded ||
            (!hasOperationsWithEllipsis && nzEllipsisRows === 1 && !hasEllipsisObservers) ||
            canCssEllipsis ||
            (nzSuffix && expanded);
          else jsEllipsis
        "
      >
        <ng-template
          [ngTemplateOutlet]="contentTemplate"
          [ngTemplateOutletContext]="{ content: nzContent }"
        ></ng-template>
        <ng-container *ngIf="nzSuffix">{{ nzSuffix }}</ng-container>
      </ng-container>
      <ng-template #jsEllipsis>
        <span #ellipsisContainer></span>
        <ng-container *ngIf="isEllipsis">{{ ellipsisStr }}</ng-container>
        <ng-container *ngIf="nzSuffix">{{ nzSuffix }}</ng-container>
        <a #expandable *ngIf="nzExpandable && isEllipsis" class="ant-typography-expand" (click)="onExpand()">
          {{ locale?.expand }}
        </a>
      </ng-template>
    </ng-container>

    <nz-text-edit
      *ngIf="nzEditable"
      [text]="nzContent"
      [icon]="nzEditIcon"
      [tooltip]="nzEditTooltip"
      (endEditing)="onEndEditing($event)"
      (startEditing)="onStartEditing()"
    ></nz-text-edit>

    <nz-text-copy
      *ngIf="nzCopyable && !editing"
      [text]="copyText"
      [tooltips]="nzCopyTooltips"
      [icons]="nzCopyIcons"
      (textCopy)="onTextCopy($event)"
    ></nz-text-copy>
  `,
                    changeDetection: ChangeDetectionStrategy.OnPush,
                    encapsulation: ViewEncapsulation.None,
                    preserveWhitespaces: false,
                    host: {
                        '[class.ant-typography]': '!editing',
                        '[class.ant-typography-rtl]': 'dir === "rtl"',
                        '[class.ant-typography-edit-content]': 'editing',
                        '[class.ant-typography-secondary]': 'nzType === "secondary"',
                        '[class.ant-typography-warning]': 'nzType === "warning"',
                        '[class.ant-typography-danger]': 'nzType === "danger"',
                        '[class.ant-typography-success]': 'nzType === "success"',
                        '[class.ant-typography-disabled]': 'nzDisabled',
                        '[class.ant-typography-ellipsis]': 'nzEllipsis && !expanded',
                        '[class.ant-typography-single-line]': 'nzEllipsis && nzEllipsisRows === 1',
                        '[class.ant-typography-ellipsis-single-line]': 'canCssEllipsis && nzEllipsisRows === 1',
                        '[class.ant-typography-ellipsis-multiple-line]': 'canCssEllipsis && nzEllipsisRows > 1',
                        '[style.-webkit-line-clamp]': '(canCssEllipsis && nzEllipsisRows > 1) ? nzEllipsisRows : null'
                    }
                }]
        }], ctorParameters: function () { return [{ type: i1.NzConfigService }, { type: i0.ElementRef }, { type: i0.ChangeDetectorRef }, { type: i0.ViewContainerRef }, { type: i0.Renderer2 }, { type: i2.Platform }, { type: i3.NzI18nService }, { type: undefined, decorators: [{
                    type: Inject,
                    args: [DOCUMENT]
                }] }, { type: i4.NzResizeService }, { type: i5.Directionality, decorators: [{
                    type: Optional
                }] }]; }, propDecorators: { nzCopyable: [{
                type: Input
            }], nzEditable: [{
                type: Input
            }], nzDisabled: [{
                type: Input
            }], nzExpandable: [{
                type: Input
            }], nzEllipsis: [{
                type: Input
            }], nzCopyTooltips: [{
                type: Input
            }], nzCopyIcons: [{
                type: Input
            }], nzEditTooltip: [{
                type: Input
            }], nzEditIcon: [{
                type: Input
            }], nzContent: [{
                type: Input
            }], nzEllipsisRows: [{
                type: Input
            }], nzType: [{
                type: Input
            }], nzCopyText: [{
                type: Input
            }], nzSuffix: [{
                type: Input
            }], nzContentChange: [{
                type: Output
            }], nzCopy: [{
                type: Output
            }], nzExpandChange: [{
                type: Output
            }], nzOnEllipsis: [{
                type: Output
            }], textEditRef: [{
                type: ViewChild,
                args: [NzTextEditComponent, { static: false }]
            }], textCopyRef: [{
                type: ViewChild,
                args: [NzTextCopyComponent, { static: false }]
            }], ellipsisContainer: [{
                type: ViewChild,
                args: ['ellipsisContainer', { static: false }]
            }], expandableBtn: [{
                type: ViewChild,
                args: ['expandable', { static: false }]
            }], contentTemplate: [{
                type: ViewChild,
                args: ['contentTemplate', { static: false }]
            }] } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidHlwb2dyYXBoeS5jb21wb25lbnQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9jb21wb25lbnRzL3R5cG9ncmFwaHkvdHlwb2dyYXBoeS5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQU9BLE9BQU8sRUFBRSxRQUFRLEVBQUUsTUFBTSxpQkFBaUIsQ0FBQztBQUMzQyxPQUFPLEVBRUwsdUJBQXVCLEVBRXZCLFNBQVMsRUFHVCxZQUFZLEVBQ1osTUFBTSxFQUNOLEtBQUssRUFJTCxRQUFRLEVBQ1IsTUFBTSxFQUlOLFNBQVMsRUFFVCxpQkFBaUIsRUFDbEIsTUFBTSxlQUFlLENBQUM7QUFDdkIsT0FBTyxFQUFFLE9BQU8sRUFBRSxZQUFZLEVBQUUsTUFBTSxNQUFNLENBQUM7QUFDN0MsT0FBTyxFQUFFLFNBQVMsRUFBRSxNQUFNLGdCQUFnQixDQUFDO0FBRTNDLE9BQU8sRUFBZ0MsVUFBVSxFQUFFLE1BQU0sMkJBQTJCLENBQUM7QUFDckYsT0FBTyxFQUFFLDJCQUEyQixFQUFFLFlBQVksRUFBRSxNQUFNLDZCQUE2QixDQUFDO0FBR3hGLE9BQU8sRUFBRSxZQUFZLEVBQUUsV0FBVyxFQUFFLGNBQWMsRUFBRSxPQUFPLEVBQUUsTUFBTSx5QkFBeUIsQ0FBQztBQUc3RixPQUFPLEVBQUUsbUJBQW1CLEVBQUUsTUFBTSx1QkFBdUIsQ0FBQztBQUM1RCxPQUFPLEVBQUUsbUJBQW1CLEVBQUUsTUFBTSx1QkFBdUIsQ0FBQzs7Ozs7Ozs7OztBQUU1RCxNQUFNLHFCQUFxQixHQUFnQixZQUFZLENBQUM7QUFDeEQsTUFBTSx3QkFBd0IsR0FBRyx1QkFBdUIsQ0FBQztBQThFekQsTUFBTSxPQUFPLHFCQUFxQjtJQW1FaEMsWUFDUyxlQUFnQyxFQUMvQixJQUE2QixFQUM3QixHQUFzQixFQUN0QixnQkFBa0MsRUFDbEMsUUFBbUIsRUFDbkIsUUFBa0IsRUFDbEIsSUFBbUIsRUFDVCxRQUFtQixFQUM3QixhQUE4QixFQUNs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bUIsRUFBRSxFQUFFLE1BQU0sRUFBRSxLQUFLLEVBQUU7Z0JBQ0wsYUFBYTtzQkFBeEQsU0FBUzt1QkFBQyxZQUFZLEVBQUUsRUFBRSxNQUFNLEVBQUUsS0FBSyxFQUFFO2dCQUNPLGVBQWU7c0JBQS9ELFNBQVM7dUJBQUMsaUJBQWlCLEVBQUUsRUFBRSxNQUFNLEVBQUUsS0FBSyxFQUFFIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKiBVc2Ugb2YgdGhpcyBzb3VyY2UgY29kZSBpcyBnb3Zlcm5lZCBieSBhbiBNSVQtc3R5bGUgbGljZW5zZSB0aGF0IGNhbiBiZVxuICogZm91bmQgaW4gdGhlIExJQ0VOU0UgZmlsZSBhdCBodHRwczovL2dpdGh1Yi5jb20vTkctWk9SUk8vbmctem9ycm8tYW50ZC9ibG9iL21hc3Rlci9MSUNFTlNFXG4gKi9cblxuaW1wb3J0IHsgRGlyZWN0aW9uLCBEaXJlY3Rpb25hbGl0eSB9IGZyb20gJ0Bhbmd1bGFyL2Nkay9iaWRpJztcbmltcG9ydCB7IFBsYXRmb3JtIH0gZnJvbSAnQGFuZ3VsYXIvY2RrL3BsYXRmb3JtJztcbmltcG9ydCB7IERPQ1VNRU5UIH0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uJztcbmltcG9ydCB7XG4gIEFmdGVyVmlld0luaXQsXG4gIENoYW5nZURldGVjdGlvblN0cmF0ZWd5LFxuICBDaGFuZ2VEZXRlY3RvclJlZixcbiAgQ29tcG9uZW50LFxuICBFbGVtZW50UmVmLFxuICBFbWJlZGRlZFZpZXdSZWYsXG4gIEV2ZW50RW1pdHRlcixcbiAgSW5qZWN0LFxuICBJbnB1dCxcbiAgT25DaGFuZ2VzLFxuICBPbkRlc3Ryb3ksXG4gIE9uSW5pdCxcbiAgT3B0aW9uYWwsXG4gIE91dHB1dCxcbiAgUmVuZGVyZXIyLFxuICBTaW1wbGVDaGFuZ2VzLFxuICBUZW1wbGF0ZVJlZixcbiAgVmlld0NoaWxkLFxuICBWaWV3Q29udGFpbmVyUmVmLFxuICBWaWV3RW5jYXBzdWxhdGlvblxufSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IFN1YmplY3QsIFN1YnNjcmlwdGlvbiB9IGZyb20gJ3J4anMnO1xuaW1wb3J0IHsgdGFrZVVudGlsIH0gZnJvbSAncnhqcy9vcGVyYXRvcnMnO1xuXG5pbXBvcnQgeyBOekNvbmZpZ0tleSwgTnpDb25maWdTZXJ2aWNlLCBXaXRoQ29uZmlnIH0gZnJvbSAnbmctem9ycm8tYW50ZC9jb3JlL2NvbmZpZyc7XG5pbXBvcnQgeyBjYW5jZWxSZXF1ZXN0QW5pbWF0aW9uRnJhbWUsIHJlcUFuaW1GcmFtZSB9IGZyb20gJ25nLXpvcnJvLWFudGQvY29yZS9wb2x5ZmlsbCc7XG5pbXBvcnQgeyBOelJlc2l6ZVNlcnZpY2UgfSBmcm9tICduZy16b3Jyby1hbnRkL2NvcmUvc2VydmljZXMnO1xuaW1wb3J0IHsgQm9vbGVhbklucHV0LCBOdW1iZXJJbnB1dCwgTnpTYWZlQW55LCBOelRTVHlwZSB9IGZyb20gJ25nLXpvcnJvLWFudGQvY29yZS90eXBlcyc7XG5pbXBvcnQgeyBJbnB1dEJvb2xlYW4sIElucHV0TnVtYmVyLCBpc1N0eWxlU3VwcG9ydCwgbWVhc3VyZSB9IGZyb20gJ25nLXpvcnJvLWFudGQvY29yZS91dGlsJztcbmltcG9ydCB7IE56STE4blNlcnZpY2UsIE56VGV4dEkxOG5JbnRlcmZhY2UgfSBmcm9tICduZy16b3Jyby1hbnRkL2kxOG4nO1xuXG5pbXBvcnQgeyBOelRleHRDb3B5Q29tcG9uZW50IH0gZnJvbSAnLi90ZXh0LWNvcHkuY29tcG9uZW50JztcbmltcG9ydCB7IE56VGV4dEVkaXRDb21wb25lbnQgfSBmcm9tICcuL3RleHQtZWRpdC5jb21wb25lbnQnO1xuXG5jb25zdCBOWl9DT05GSUdfTU9EVUxFX05BTUU6IE56Q29uZmlnS2V5ID0gJ3R5cG9ncmFwaHknO1xuY29uc3QgRVhQQU5EX0VMRU1FTlRfQ0xBU1NOQU1FID0gJ2FudC10eXBvZ3JhcGh5LWV4cGFuZCc7XG5cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogYFxuICBuei10eXBvZ3JhcGh5LFxuICBbbnotdHlwb2dyYXBoeV0sXG4gIHBbbnotcGFyYWdyYXBoXSxcbiAgc3Bhbltuei10ZXh0XSxcbiAgaDFbbnotdGl0bGVdLCBoMltuei10aXRsZV0sIGgzW256LXRpdGxlXSwgaDRbbnotdGl0bGVdXG4gIGAsXG4gIGV4cG9ydEFzOiAnbnpUeXBvZ3JhcGh5JyxcbiAgdGVtcGxhdGU6IGBcbiAgICA8bmctdGVtcGxhdGUgI2NvbnRlbnRUZW1wbGF0ZSBsZXQtY29udGVudD1cImNvbnRlbnRcIj5cbiAgICAgIDxuZy1jb250ZW50ICpuZ0lmPVwiIWNvbnRlbnRcIj48L25nLWNvbnRlbnQ+XG4gICAgICB7eyBjb250ZW50IH19XG4gICAgPC9uZy10ZW1wbGF0ZT5cbiAgICA8bmctY29udGFpbmVyICpuZ0lmPVwiIWVkaXRpbmdcIj5cbiAgICAgIDxuZy1jb250YWluZXJcbiAgICAgICAgKm5nSWY9XCJcbiAgICAgICAgICBleHBhbmRlZCB8fFxuICAgICAgICAgICAgKCFoYXNPcGVyYXRpb25zV2l0aEVsbGlwc2lzICYmIG56RWxsaXBzaXNSb3dzID09PSAxICYmICFoYXNFbGxpcHNpc09ic2VydmVycykgfHxcbiAgICAgICAgICAgIGNhbkNzc0VsbGlwc2lzIHx8XG4gICAgICAgICAgICAobnpTdWZmaXggJiYgZXhwYW5kZWQpO1xuICAgICAgICAgIGVsc2UganNFbGxpcHNpc1xuICAgICAgICBcIlxuICAgICAgPlxuICAgICAgICA8bmctdGVtcGxhdGVcbiAgICAgICAgICBbbmdUZW1wbGF0ZU91dGxldF09XCJjb250ZW50VGVtcGxhdGVcIlxuICAgICAgICAgIFtuZ1RlbXBsYXRlT3V0bGV0Q29udGV4dF09XCJ7IGNvbnRlbnQ6IG56Q29udGVudCB9XCJcbiAgICAgICAgPjwvbmctdGVtcGxhdGU+XG4gICAgICAgIDxuZy1jb250YWluZXIgKm5nSWY9XCJuelN1ZmZpeFwiPnt7IG56U3VmZml4IH19PC9uZy1jb250YWluZXI+XG4gICAgICA8L25nLWNvbnRhaW5lcj5cbiAgICAgIDxuZy10ZW1wbGF0ZSAjanNFbGxpcHNpcz5cbiAgICAgICAgPHNwYW4gI2VsbGlwc2lzQ29udGFpbmVyPjwvc3Bhbj5cbiAgICAgICAgPG5nLWNvbnRhaW5lciAqbmdJZj1cImlzRWxsaXBzaXNcIj57eyBlbGxpcHNpc1N0ciB9fTwvbmctY29udGFpbmVyPlxuICAgICAgICA8bmctY29udGFpbmVyICpuZ0lmPVwibnpTdWZmaXhcIj57eyBuelN1ZmZpeCB9fTwvbmctY29udGFpbmVyPlxuICAgICAgICA8YSAjZXhwYW5kYWJsZSAqbmdJZj1cIm56RXhwYW5kYWJsZSAmJiBpc0VsbGlwc2lzXCIgY2xhc3M9XCJhbnQtdHlwb2dyYXBoeS1leHBhbmRcIiAoY2xpY2spPVwib25FeHBhbmQoKVwiPlxuICAgICAgICAgIHt7IGxvY2FsZT8uZXhwYW5kIH19XG4gICAgICAgIDwvYT5cbiAgICAgIDwvbmctdGVtcGxhdGU+XG4gICAgPC9uZy1jb250YWluZXI+XG5cbiAgICA8bnotdGV4dC1lZGl0XG4gICAgICAqbmdJZj1cIm56RWRpdGFibGVcIlxuICAgICAgW3RleHRdPVwibnpDb250ZW50XCJcbiAgICAgIFtpY29uXT1cIm56RWRpdEljb25cIlxuICAgICAgW3Rvb2x0aXBdPVwibnpFZGl0VG9vbHRpcFwiXG4gICAgICAoZW5kRWRpdGluZyk9XCJvbkVuZEVkaXRpbmcoJGV2ZW50KVwiXG4gICAgICAoc3RhcnRFZGl0aW5nKT1cIm9uU3RhcnRFZGl0aW5nKClcIlxuICAgID48L256LXRleHQtZWRpdD5cblxuICAgIDxuei10ZXh0LWNvcHlcbiAgICAgICpuZ0lmPVwibnpDb3B5YWJsZSAmJiAhZWRpdGluZ1wiXG4gICAgICBbdGV4dF09XCJjb3B5VGV4dFwiXG4gICAgICBbdG9vbHRpcHNdPVwibnpDb3B5VG9vbHRpcHNcIlxuICAgICAgW2ljb25zXT1cIm56Q29weUljb25zXCJcbiAgICAgICh0ZXh0Q29weSk9XCJvblRleHRDb3B5KCRldmVudClcIlxuICAgID48L256LXRleHQtY29weT5cbiAgYCxcbiAgY2hhbmdlRGV0ZWN0aW9uOiBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneS5PblB1c2gsXG4gIGVuY2Fwc3VsYXRpb246IFZpZXdFbmNhcHN1bGF0aW9uLk5vbmUsXG4gIHByZXNlcnZlV2hpdGVzcGFjZXM6IGZhbHNlLFxuICBob3N0OiB7XG4gICAgJ1tjbGFzcy5hbnQtdHlwb2dyYXBoeV0nOiAnIWVkaXRpbmcnLFxuICAgICdbY2xhc3MuYW50LXR5cG9ncmFwaHktcnRsXSc6ICdkaXIgPT09IFwicnRsXCInLFxuICAgICdbY2xhc3MuYW50LXR5cG9ncmFwaHktZWRpdC1jb250ZW50XSc6ICdlZGl0aW5nJyxcbiAgICAnW2NsYXNzLmFudC10eXBvZ3JhcGh5LXNlY29uZGFyeV0nOiAnbnpUeXBlID09PSBcInNlY29uZGFyeVwiJyxcbiAgICAnW2NsYXNzLmFudC10eXBvZ3JhcGh5LXdhcm5pbmddJzogJ256VHlwZSA9PT0gXCJ3YXJuaW5nXCInLFxuICAgICdbY2xhc3MuYW50LXR5cG9ncmFwaHktZGFuZ2VyXSc6ICduelR5cGUgPT09IFwiZGFuZ2VyXCInLFxuICAgICdbY2xhc3MuYW50LXR5cG9ncmFwaHktc3VjY2Vzc10nOiAnbnpUeXBlID09PSBcInN1Y2Nlc3NcIicsXG4gICAgJ1tjbGFzcy5hbnQtdHlwb2dyYXBoeS1kaXNhYmxlZF0nOiAnbnpEaXNhYmxlZCcsXG4gICAgJ1tjbGFzcy5hbnQtdHlwb2dyYXBoeS1lbGxpcHNpc10nOiAnbnpFbGxpcHNpcyAmJiAhZXhwYW5kZWQnLFxuICAgICdbY2xhc3MuYW50LXR5cG9ncmFwaHktc2luZ2xlLWxpbmVdJzogJ256RWxsaXBzaXMgJiYgbnpFbGxpcHNpc1Jvd3MgPT09IDEnLFxuICAgICdbY2xhc3MuYW50LXR5cG9ncmFwaHktZWxsaXBzaXMtc2luZ2xlLWxpbmVdJzogJ2NhbkNzc0VsbGlwc2lzICYmIG56RWxsaXBzaXNSb3dzID09PSAxJyxcbiAgICAnW2NsYXNzLmFudC10eXBvZ3JhcGh5LWVsbGlwc2lzLW11bHRpcGxlLWxpbmVdJzogJ2NhbkNzc0VsbGlwc2lzICYmIG56RWxsaXBzaXNSb3dzID4gMScsXG4gICAgJ1tzdHlsZS4td2Via2l0LWxpbmUtY2xhbXBdJzogJyhjYW5Dc3NFbGxpcHNpcyAmJiBuekVsbGlwc2lzUm93cyA+IDEpID8gbnpFbGxpcHNpc1Jvd3MgOiBudWxsJ1xuICB9XG59KVxuZXhwb3J0IGNsYXNzIE56VHlwb2dyYXBoeUNvbXBvbmVudCBpbXBsZW1lbnRzIE9uSW5pdCwgQWZ0ZXJWaWV3SW5pdCwgT25EZXN0cm95LCBPbkNoYW5nZXMge1xuICByZWFkb25seSBfbnpNb2R1bGVOYW1lOiBOekNvbmZpZ0tleSA9IE5aX0NPTkZJR19NT0RVTEVfTkFNRTtcblxuICBzdGF0aWMgbmdBY2NlcHRJbnB1dFR5cGVfbnpDb3B5YWJsZTogQm9vbGVhbklucHV0O1xuICBzdGF0aWMgbmdBY2NlcHRJbnB1dFR5cGVfbnpFZGl0YWJsZTogQm9vbGVhbklucHV0O1xuICBzdGF0aWMgbmdBY2NlcHRJbnB1dFR5cGVfbnpEaXNhYmxlZDogQm9vbGVhbklucHV0O1xuICBzdGF0aWMgbmdBY2NlcHRJbnB1dFR5cGVfbnpFeHBhbmRhYmxlOiBCb29sZWFuSW5wdXQ7XG4gIHN0YXRpYyBuZ0FjY2VwdElucHV0VHlwZV9uekVsbGlwc2lzOiBCb29sZWFuSW5wdXQ7XG4gIHN0YXRpYyBuZ0FjY2VwdElucHV0VHlwZV9uekVsbGlwc2lzUm93czogTnVtYmVySW5wdXQ7XG5cbiAgQElucHV0KCkgQElucHV0Qm9vbGVhbigpIG56Q29weWFibGUgPSBmYWxzZTtcbiAgQElucHV0KCkgQElucHV0Qm9vbGVhbigpIG56RWRpdGFibGUgPSBmYWxzZTtcbiAgQElucHV0KCkgQElucHV0Qm9vbGVhbigpIG56RGlzYWJsZWQgPSBmYWxzZTtcbiAgQElucHV0KCkgQElucHV0Qm9vbGVhbigpIG56RXhwYW5kYWJsZSA9IGZhbHNlO1xuICBASW5wdXQoKSBASW5wdXRCb29sZWFuKCkgbnpFbGxpcHNpcyA9IGZhbHNlO1xuICBASW5wdXQoKSBAV2l0aENvbmZpZygpIG56Q29weVRvb2x0aXBzPzogW056VFNUeXBlLCBOelRTVHlwZV0gfCBudWxsID0gdW5kZWZpbmVkO1xuICBASW5wdXQoKSBAV2l0aENvbmZpZygpIG56Q29weUljb25zOiBbTnpUU1R5cGUsIE56VFNUeXBlXSA9IFsnY29weScsICdjaGVjayddO1xuICBASW5wdXQoKSBAV2l0aENvbmZpZygpIG56RWRpdFRvb2x0aXA/OiBudWxsIHwgTnpUU1R5cGUgPSB1bmRlZmluZWQ7XG4gIEBJbnB1dCgpIEBXaXRoQ29uZmlnKCkgbnpFZGl0SWNvbjogTnpUU1R5cGUgPSAnZWRpdCc7XG4gIEBJbnB1dCgpIG56Q29udGVudD86IHN0cmluZztcbiAgQElucHV0KCkgQFdpdGhDb25maWcoKSBASW5wdXROdW1iZXIoKSBuekVsbGlwc2lzUm93czogbnVtYmVyID0gMTtcbiAgQElucHV0KCkgbnpUeXBlOiAnc2Vjb25kYXJ5JyB8ICd3YXJuaW5nJyB8ICdkYW5nZXInIHwgJ3N1Y2Nlc3MnIHwgdW5kZWZpbmVkO1xuICBASW5wdXQoKSBuekNvcHlUZXh0OiBzdHJpbmcgfCB1bmRlZmluZWQ7XG4gIEBJbnB1dCgpIG56U3VmZml4OiBzdHJpbmcgfCB1bmRlZmluZWQ7XG4gIEBPdXRwdXQoKSByZWFkb25seSBuekNvbnRlbnRDaGFuZ2UgPSBuZXcgRXZlbnRFbWl0dGVyPHN0cmluZz4oKTtcbiAgQE91dHB1dCgpIHJlYWRvbmx5IG56Q29weSA9IG5ldyBFdmVudEVtaXR0ZXI8c3RyaW5nPigpO1xuICBAT3V0cHV0KCkgcmVhZG9ubHkgbnpFeHBhbmRDaGFuZ2UgPSBuZXcgRXZlbnRFbWl0dGVyPHZvaWQ+KCk7XG4gIC8vIFRoaXMgaXMgbm90IGEgdHdvLXdheSBiaW5kaW5nIG91dHB1dCB3aXRoIHtAbGluayBuekVsbGlwc2lzfVxuICBAT3V0cHV0KCkgcmVhZG9ubHkgbnpPbkVsbGlwc2lzID0gbmV3IEV2ZW50RW1pdHRlcjxib29sZWFuPigpO1xuXG4gIEBWaWV3Q2hpbGQoTnpUZXh0RWRpdENvbXBvbmVudCwgeyBzdGF0aWM6IGZhbHNlIH0pIHRleHRFZGl0UmVmPzogTnpUZXh0RWRpdENvbXBvbmVudDtcbiAgQFZpZXdDaGlsZChOelRleHRDb3B5Q29tcG9uZW50LCB7IHN0YXRpYzogZmFsc2UgfSkgdGV4dENvcHlSZWY/OiBOelRleHRDb3B5Q29tcG9uZW50O1xuICBAVmlld0NoaWxkKCdlbGxpcHNpc0NvbnRhaW5lcicsIHsgc3RhdGljOiBmYWxzZSB9KSBlbGxpcHNpc0NvbnRhaW5lcj86IEVsZW1lbnRSZWY8SFRNTFNwYW5FbGVtZW50PjtcbiAgQFZpZXdDaGlsZCgnZXhwYW5kYWJsZScsIHsgc3RhdGljOiBmYWxzZSB9KSBleHBhbmRhYmxlQnRuPzogRWxlbWVudFJlZjxIVE1MU3BhbkVsZW1lbnQ+O1xuICBAVmlld0NoaWxkKCdjb250ZW50VGVtcGxhdGUnLCB7IHN0YXRpYzogZmFsc2UgfSkgY29udGVudFRlbXBsYXRlPzogVGVtcGxhdGVSZWY8eyBjb250ZW50OiBzdHJpbmcgfT47XG5cbiAgbG9jYWxlITogTnpUZXh0STE4bkludGVyZmFjZTtcbiAgZG9jdW1lbnQ6IERvY3VtZW50O1xuICBleHBhbmRhYmxlQnRuRWxlbWVudENhY2hlOiBIVE1MRWxlbWVudCB8IG51bGwgPSBudWxsO1xuICBlZGl0aW5nID0gZmFsc2U7XG4gIGVsbGlwc2lzVGV4dDogc3RyaW5nIHwgdW5kZWZpbmVkO1xuICBjc3NFbGxpcHNpczogYm9vbGVhbiA9IGZhbHNlO1xuICBpc0VsbGlwc2lzOiBib29sZWFuID0gdHJ1ZTtcbiAgZXhwYW5kZWQ6IGJvb2xlYW4gPSBmYWxzZTtcbiAgZWxsaXBzaXNTdHIgPSAnLi4uJztcbiAgZGlyOiBEaXJlY3Rpb24gPSAnbHRyJztcblxuICBnZXQgaGFzRWxsaXBzaXNPYnNlcnZlcnMoKTogYm9vbGVhbiB7XG4gICAgcmV0dXJuIHRoaXMubnpPbkVsbGlwc2lzLm9ic2VydmVycy5sZW5ndGggPiAwO1xuICB9XG5cbiAgZ2V0IGNhbkNzc0VsbGlwc2lzKCk6IGJvb2xlYW4ge1xuICAgIHJldHVybiB0aGlzLm56RWxsaXBzaXMgJiYgdGhpcy5jc3NFbGxpcHNpcyAmJiAhdGhpcy5leHBhbmRlZCAmJiAhdGhpcy5oYXNFbGxpcHNpc09ic2VydmVycztcbiAgfVxuXG4gIGdldCBoYXNPcGVyYXRpb25zV2l0aEVsbGlwc2lzKCk6IGJvb2xlYW4ge1xuICAgIHJldHVybiAodGhpcy5uekNvcHlhYmxlIHx8IHRoaXMubnpFZGl0YWJsZSB8fCB0aGlzLm56RXhwYW5kYWJsZSkgJiYgdGhpcy5uekVsbGlwc2lzO1xuICB9XG5cbiAgcHJpdmF0ZSB2aWV3SW5pdCA9IGZhbHNlO1xuICBwcml2YXRlIHJmYUlkOiBudW1iZXIgPSAtMTtcbiAgcHJpdmF0ZSBkZXN0cm95JCA9IG5ldyBTdWJqZWN0KCk7XG4gIHByaXZhdGUgd2luZG93UmVzaXplU3Vic2NyaXB0aW9uID0gU3Vic2NyaXB0aW9uLkVNUFRZO1xuICBnZXQgY29weVRleHQoKTogc3RyaW5nIHtcbiAgICByZXR1cm4gKHR5cGVvZiB0aGlzLm56Q29weVRleHQgPT09ICdzdHJpbmcnID8gdGhpcy5uekNvcHlUZXh0IDogdGhpcy5uekNvbnRlbnQpITtcbiAgfVxuXG4gIGNvbnN0cnVjdG9yKFxuICAgIHB1YmxpYyBuekNvbmZpZ1NlcnZpY2U6IE56Q29uZmlnU2VydmljZSxcbiAgICBwcml2YXRlIGhvc3Q6IEVsZW1lbnRSZWY8SFRNTEVsZW1lbnQ+LFxuICAgIHByaXZhdGUgY2RyOiBDaGFuZ2VEZXRlY3RvclJlZixcbiAgICBwcml2YXRlIHZpZXdDb250YWluZXJSZWY6IFZpZXdDb250YWluZXJSZWYsXG4gICAgcHJpdmF0ZSByZW5kZXJlcjogUmVuZGVyZXIyLFxuICAgIHByaXZhdGUgcGxhdGZvcm06IFBsYXRmb3JtLFxuICAgIHByaXZhdGUgaTE4bjogTnpJMThuU2VydmljZSxcbiAgICBASW5qZWN0KERPQ1VNRU5UKSBkb2N1bWVudDogTnpTYWZlQW55LFxuICAgIHByaXZhdGUgcmVzaXplU2VydmljZTogTnpSZXNpemVTZXJ2aWNlLFxuICAgIEBPcHRpb25hbCgpIHByaXZhdGUgZGlyZWN0aW9uYWxpdHk6IERpcmVjdGlvbmFsaXR5XG4gICkge1xuICAgIHRoaXMuZG9jdW1lbnQgPSBkb2N1bWVudDtcbiAgfVxuXG4gIG9uVGV4dENvcHkodGV4dDogc3RyaW5nKTogdm9pZCB7XG4gICAgdGhpcy5uekNvcHkuZW1pdCh0ZXh0KTtcbiAgfVxuXG4gIG9uU3RhcnRFZGl0aW5nKCk6IHZvaWQge1xuICAgIHRoaXMuZWRpdGluZyA9IHRydWU7XG4gIH1cblxuICBvbkVuZEVkaXRpbmcodGV4dDogc3RyaW5nKTogdm9pZCB7XG4gICAgdGhpcy5lZGl0aW5nID0gZmFsc2U7XG4gICAgdGhpcy5uekNvbnRlbnRDaGFuZ2UuZW1pdCh0ZXh0KTtcbiAgICBpZiAodGhpcy5uekNvbnRlbnQgPT09IHRleHQpIHtcbiAgICAgIHRoaXMucmVuZGVyT25OZXh0RnJhbWUoKTtcbiAgICB9XG4gICAgdGhpcy5jZHIubWFya0ZvckNoZWNrKCk7XG4gIH1cblxuICBvbkV4cGFuZCgpOiB2b2lkIHtcbiAgICB0aGlzLmlzRWxsaXBzaXMgPSBmYWxzZTtcbiAgICB0aGlzLmV4cGFuZGVkID0gdHJ1ZTtcbiAgICB0aGlzLm56RXhwYW5kQ2hhbmdlLmVtaXQoKTtcbiAgICB0aGlzLm56T25FbGxpcHNpcy5lbWl0KGZhbHNlKTtcbiAgfVxuXG4gIGNhblVzZUNTU0VsbGlwc2lzKCk6IGJvb2xlYW4ge1xuICAgIGlmICh0aGlzLm56RWRpdGFibGUgfHwgdGhpcy5uekNvcHlhYmxlIHx8IHRoaXMubnpFeHBhbmRhYmxlIHx8IHRoaXMubnpTdWZmaXgpIHtcbiAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG4gICAgLy8gbWFrZSBzdXJlIHtAbGluayBuek9uRWxsaXBzaXN9IHdvcmtzLCB3aWxsIGZvcmNlIHVzZSBKUyB0byBjYWxjdWxhdGlvbnNcbiAgICBpZiAodGhpcy5oYXNFbGxpcHNpc09ic2VydmVycykge1xuICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cbiAgICBpZiAodGhpcy5uekVsbGlwc2lzUm93cyA9PT0gMSkge1xuICAgICAgcmV0dXJuIGlzU3R5bGVTdXBwb3J0KCd0ZXh0T3ZlcmZsb3cnKTtcbiAgICB9IGVsc2Uge1xuICAgICAgcmV0dXJuIGlzU3R5bGVTdXBwb3J0KCd3ZWJraXRMaW5lQ2xhbXAnKTtcbiAgICB9XG4gIH1cblxuICByZW5kZXJPbk5leHRGcmFtZSgpOiB2b2lkIHtcbiAgICBjYW5jZWxSZXF1ZXN0QW5pbWF0aW9uRnJhbWUodGhpcy5yZmFJZCk7XG4gICAgaWYgKCF0aGlzLnZpZXdJbml0IHx8ICF0aGlzLm56RWxsaXBzaXMgfHwgdGhpcy5uekVsbGlwc2lzUm93cyA8IDAgfHwgdGhpcy5leHBhbmRlZCB8fCAhdGhpcy5wbGF0Zm9ybS5pc0Jyb3dzZXIpIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG4gICAgdGhpcy5yZmFJZCA9IHJlcUFuaW1GcmFtZSgoKSA9PiB7XG4gICAgICB0aGlzLnN5bmNFbGxpcHNpcygpO1xuICAgIH0pO1xuICB9XG5cbiAgZ2V0T3JpZ2luQ29udGVudFZpZXdSZWYoKTogeyB2aWV3UmVmOiBFbWJlZGRlZFZpZXdSZWY8eyBjb250ZW50OiBzdHJpbmcgfT47IHJlbW92ZVZpZXcoKTogdm9pZCB9IHtcbiAgICBjb25zdCB2aWV3UmVmID0gdGhpcy52aWV3Q29udGFpbmVyUmVmLmNyZWF0ZUVtYmVkZGVkVmlldzx7IGNvbnRlbnQ6IHN0cmluZyB9Pih0aGlzLmNvbnRlbnRUZW1wbGF0ZSEsIHtcbiAgICAgIGNvbnRlbnQ6IHRoaXMubnpDb250ZW50IVxuICAgIH0pO1xuICAgIHZpZXdSZWYuZGV0ZWN0Q2hhbmdlcygpO1xuICAgIHJldHVybiB7XG4gICAgICB2aWV3UmVmLFxuICAgICAgcmVtb3ZlVmlldzogKCkgPT4ge1xuICAgICAgICB0aGlzLnZpZXdDb250YWluZXJSZWYucmVtb3ZlKHRoaXMudmlld0NvbnRhaW5lclJlZi5pbmRleE9mKHZpZXdSZWYpKTtcbiAgICAgIH1cbiAgICB9O1xuICB9XG5cbiAgc3luY0VsbGlwc2lzKCk6IHZvaWQge1xuICAgIGlmICh0aGlzLmNzc0VsbGlwc2lzKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuICAgIGNvbnN0IHsgdmlld1JlZiwgcmVtb3ZlVmlldyB9ID0gdGhpcy5nZXRPcmlnaW5Db250ZW50Vmlld1JlZigpO1xuICAgIGNvbnN0IGZpeGVkTm9kZXMgPSBbdGhpcy50ZXh0Q29weVJlZiwgdGhpcy50ZXh0RWRpdFJlZl1cbiAgICAgIC5maWx0ZXIoZSA9PiBlICYmIGUubmF0aXZlRWxlbWVudClcbiAgICAgIC5tYXAoZSA9PiBlIS5uYXRpdmVFbGVtZW50KTtcbiAgICBjb25zdCBleHBhbmRhYmxlQnRuRWxlbWVudCA9IHRoaXMuZ2V0RXhwYW5kYWJsZUJ0bkVsZW1lbnQoKTtcbiAgICBpZiAoZXhwYW5kYWJsZUJ0bkVsZW1lbnQpIHtcbiAgICAgIGZpeGVkTm9kZXMucHVzaChleHBhbmRhYmxlQnRuRWxlbWVudCk7XG4gICAgfVxuICAgIGNvbnN0IHsgY29udGVudE5vZGVzLCB0ZXh0LCBlbGxpcHNpcyB9ID0gbWVhc3VyZShcbiAgICAgIHRoaXMuaG9zdC5uYXRpdmVFbGVtZW50LFxuICAgICAgdGhpcy5uekVsbGlwc2lzUm93cyxcbiAgICAgIHZpZXdSZWYucm9vdE5vZGVzLFxuICAgICAgZml4ZWROb2RlcyxcbiAgICAgIHRoaXMuZWxsaXBzaXNTdHIsXG4gICAgICB0aGlzLm56U3VmZml4XG4gICAgKTtcblxuICAgIHJlbW92ZVZpZXcoKTtcblxuICAgIHRoaXMuZWxsaXBzaXNUZXh0ID0gdGV4dDtcbiAgICBpZiAoZWxsaXBzaXMgIT09IHRoaXMuaXNFbGxpcHNpcykge1xuICAgICAgdGhpcy5pc0VsbGlwc2lzID0gZWxsaXBzaXM7XG4gICAgICB0aGlzLm56T25FbGxpcHNpcy5lbWl0KGVsbGlwc2lzKTtcbiAgICB9XG4gICAgY29uc3QgZWxsaXBzaXNDb250YWluZXJOYXRpdmVFbGVtZW50ID0gdGhpcy5lbGxpcHNpc0NvbnRhaW5lciEubmF0aXZlRWxlbWVudDtcbiAgICB3aGlsZSAoZWxsaXBzaXNDb250YWluZXJOYXRpdmVFbGVtZW50LmZpcnN0Q2hpbGQpIHtcbiAgICAgIHRoaXMucmVuZGVyZXIucmVtb3ZlQ2hpbGQoZWxsaXBzaXNDb250YWluZXJOYXRpdmVFbGVtZW50LCBlbGxpcHNpc0NvbnRhaW5lck5hdGl2ZUVsZW1lbnQuZmlyc3RDaGlsZCk7XG4gICAgfVxuICAgIGNvbnRlbnROb2Rlcy5mb3JFYWNoKG4gPT4ge1xuICAgICAgdGhpcy5yZW5kZXJlci5hcHBlbmRDaGlsZChlbGxpcHNpc0NvbnRhaW5lck5hdGl2ZUVsZW1lbnQsIG4uY2xvbmVOb2RlKHRydWUpKTtcbiAgICB9KTtcbiAgICB0aGlzLmNkci5tYXJrRm9yQ2hlY2soKTtcbiAgfVxuXG4gIC8vIE5lZWQgdG8gY3JlYXRlIHRoZSBlbGVtZW50IGZvciBjYWxjdWxhdGlvbiBzaXplIGJlZm9yZSB2aWV3IGluaXRcbiAgcHJpdmF0ZSBnZXRFeHBhbmRhYmxlQnRuRWxlbWVudCgpOiBIVE1MRWxlbWVudCB8IG51bGwge1xuICAgIGlmICh0aGlzLm56RXhwYW5kYWJsZSkge1xuICAgICAgY29uc3QgZXhwYW5kVGV4dCA9IHRoaXMubG9jYWxlID8gdGhpcy5sb2NhbGUuZXhwYW5kIDogJyc7XG4gICAgICBjb25zdCBjYWNoZSA9IHRoaXMuZXhwYW5kYWJsZUJ0bkVsZW1lbnRDYWNoZTtcbiAgICAgIGlmICghY2FjaGUgfHwgY2FjaGUuaW5uZXJUZXh0ID09PSBleHBhbmRUZXh0KSB7XG4gICAgICAgIGNvbnN0IGVsID0gdGhpcy5kb2N1bWVudC5jcmVhdGVFbGVtZW50KCdhJyk7XG4gICAgICAgIGVsLmNsYXNzTmFtZSA9IEVYUEFORF9FTEVNRU5UX0NMQVNTTkFNRTtcbiAgICAgICAgZWwuaW5uZXJUZXh0ID0gZXhwYW5kVGV4dDtcbiAgICAgICAgdGhpcy5leHBhbmRhYmxlQnRuRWxlbWVudENhY2hlID0gZWw7XG4gICAgICB9XG4gICAgICByZXR1cm4gdGhpcy5leHBhbmRhYmxlQnRuRWxlbWVudENhY2hlO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLmV4cGFuZGFibGVCdG5FbGVtZW50Q2FjaGUgPSBudWxsO1xuICAgICAgcmV0dXJuIG51bGw7XG4gICAgfVxuICB9XG5cbiAgcHJpdmF0ZSByZW5kZXJBbmRTdWJzY3JpYmVXaW5kb3dSZXNpemUoKTogdm9pZCB7XG4gICAgaWYgKHRoaXMucGxhdGZvcm0uaXNCcm93c2VyKSB7XG4gICAgICB0aGlzLndpbmRvd1Jlc2l6ZVN1YnNjcmlwdGlvbi51bnN1YnNjcmliZSgpO1xuICAgICAgdGhpcy5jc3NFbGxpcHNpcyA9IHRoaXMuY2FuVXNlQ1NTRWxsaXBzaXMoKTtcbiAgICAgIHRoaXMucmVuZGVyT25OZXh0RnJhbWUoKTtcbiAgICAgIHRoaXMud2luZG93UmVzaXplU3Vic2NyaXB0aW9uID0gdGhpcy5yZXNpemVTZXJ2aWNlXG4gICAgICAgIC5zdWJzY3JpYmUoKVxuICAgICAgICAucGlwZSh0YWtlVW50aWwodGhpcy5kZXN0cm95JCkpXG4gICAgICAgIC5zdWJzY3JpYmUoKCkgPT4gdGhpcy5yZW5kZXJPbk5leHRGcmFtZSgpKTtcbiAgICB9XG4gIH1cblxuICBuZ09uSW5pdCgpOiB2b2lkIHtcbiAgICB0aGlzLmkxOG4ubG9jYWxlQ2hhbmdlLnBpcGUodGFrZVVudGlsKHRoaXMuZGVzdHJveSQpKS5zdWJzY3JpYmUoKCkgPT4ge1xuICAgICAgdGhpcy5sb2NhbGUgPSB0aGlzLmkxOG4uZ2V0TG9jYWxlRGF0YSgnVGV4dCcpO1xuICAgICAgdGhpcy5jZHIubWFya0ZvckNoZWNrKCk7XG4gICAgfSk7XG5cbiAgICB0aGlzLmRpcmVjdGlvbmFsaXR5LmNoYW5nZT8ucGlwZSh0YWtlVW50aWwodGhpcy5kZXN0cm95JCkpLnN1YnNjcmliZSgoZGlyZWN0aW9uOiBEaXJlY3Rpb24pID0+IHtcbiAgICAgIHRoaXMuZGlyID0gZGlyZWN0aW9uO1xuICAgICAgdGhpcy5jZHIuZGV0ZWN0Q2hhbmdlcygpO1xuICAgIH0pO1xuXG4gICAgdGhpcy5kaXIgPSB0aGlzLmRpcmVjdGlvbmFsaXR5LnZhbHVlO1xuICB9XG5cbiAgbmdBZnRlclZpZXdJbml0KCk6IHZvaWQge1xuICAgIHRoaXMudmlld0luaXQgPSB0cnVlO1xuICAgIHRoaXMucmVuZGVyQW5kU3Vic2NyaWJlV2luZG93UmVzaXplKCk7XG4gIH1cblxuICBuZ09uQ2hhbmdlcyhjaGFuZ2VzOiBTaW1wbGVDaGFuZ2VzKTogdm9pZCB7XG4gICAgY29uc3QgeyBuekNvcHlhYmxlLCBuekVkaXRhYmxlLCBuekV4cGFuZGFibGUsIG56RWxsaXBzaXMsIG56Q29udGVudCwgbnpFbGxpcHNpc1Jvd3MsIG56U3VmZml4IH0gPSBjaGFuZ2VzO1xuICAgIGlmIChuekNvcHlhYmxlIHx8IG56RWRpdGFibGUgfHwgbnpFeHBhbmRhYmxlIHx8IG56RWxsaXBzaXMgfHwgbnpDb250ZW50IHx8IG56RWxsaXBzaXNSb3dzIHx8IG56U3VmZml4KSB7XG4gICAgICBpZiAodGhpcy5uekVsbGlwc2lzKSB7XG4gICAgICAgIGlmICh0aGlzLmV4cGFuZGVkKSB7XG4gICAgICAgICAgdGhpcy53aW5kb3dSZXNpemVTdWJzY3JpcHRpb24udW5zdWJzY3JpYmUoKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICB0aGlzLnJlbmRlckFuZFN1YnNjcmliZVdpbmRvd1Jlc2l6ZSgpO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgbmdPbkRlc3Ryb3koKTogdm9pZCB7XG4gICAgdGhpcy5kZXN0cm95JC5uZXh0KCk7XG4gICAgdGhpcy5kZXN0cm95JC5jb21wbGV0ZSgpO1xuICAgIHRoaXMuZXhwYW5kYWJsZUJ0bkVsZW1lbnRDYWNoZSA9IG51bGw7XG4gICAgdGhpcy53aW5kb3dSZXNpemVTdWJzY3JpcHRpb24udW5zdWJzY3JpYmUoKTtcbiAgfVxufVxuIl19