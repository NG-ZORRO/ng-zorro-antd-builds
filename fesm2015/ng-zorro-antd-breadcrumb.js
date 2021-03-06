import { Component, ChangeDetectionStrategy, ViewEncapsulation, Injector, NgZone, ChangeDetectorRef, ElementRef, Renderer2, Optional, Input, NgModule } from '@angular/core';
import { NzDropDownModule } from 'ng-zorro-antd/dropdown';
import { __decorate, __metadata } from 'tslib';
import { Directionality, BidiModule } from '@angular/cdk/bidi';
import { Router, ActivatedRoute, NavigationEnd, PRIMARY_OUTLET } from '@angular/router';
import { PREFIX } from 'ng-zorro-antd/core/logger';
import { InputBoolean } from 'ng-zorro-antd/core/util';
import { Subject } from 'rxjs';
import { takeUntil, filter, startWith } from 'rxjs/operators';
import { OverlayModule } from '@angular/cdk/overlay';
import { CommonModule } from '@angular/common';
import { NzOutletModule } from 'ng-zorro-antd/core/outlet';
import { NzOverlayModule } from 'ng-zorro-antd/core/overlay';
import { NzIconModule } from 'ng-zorro-antd/icon';

/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */
class NzBreadCrumbComponent {
    constructor(injector, ngZone, cdr, elementRef, renderer, directionality) {
        this.injector = injector;
        this.ngZone = ngZone;
        this.cdr = cdr;
        this.elementRef = elementRef;
        this.renderer = renderer;
        this.directionality = directionality;
        this.nzAutoGenerate = false;
        this.nzSeparator = '/';
        this.nzRouteLabel = 'breadcrumb';
        this.nzRouteLabelFn = label => label;
        this.breadcrumbs = [];
        this.dir = 'ltr';
        this.destroy$ = new Subject();
        renderer.addClass(elementRef.nativeElement, 'ant-breadcrumb');
    }
    ngOnInit() {
        var _a;
        if (this.nzAutoGenerate) {
            this.registerRouterChange();
        }
        (_a = this.directionality.change) === null || _a === void 0 ? void 0 : _a.pipe(takeUntil(this.destroy$)).subscribe((direction) => {
            this.dir = direction;
            this.prepareComponentForRtl();
            this.cdr.detectChanges();
        });
        this.dir = this.directionality.value;
        this.prepareComponentForRtl();
    }
    ngOnDestroy() {
        this.destroy$.next();
        this.destroy$.complete();
    }
    navigate(url, e) {
        e.preventDefault();
        this.ngZone.run(() => this.injector.get(Router).navigateByUrl(url).then()).then();
    }
    registerRouterChange() {
        try {
            const router = this.injector.get(Router);
            const activatedRoute = this.injector.get(ActivatedRoute);
            router.events
                .pipe(filter(e => e instanceof NavigationEnd), takeUntil(this.destroy$), startWith(true) // trigger initial render
            )
                .subscribe(() => {
                this.breadcrumbs = this.getBreadcrumbs(activatedRoute.root);
                this.cdr.markForCheck();
            });
        }
        catch (e) {
            throw new Error(`${PREFIX} You should import RouterModule if you want to use 'NzAutoGenerate'.`);
        }
    }
    getBreadcrumbs(route, url = '', breadcrumbs = []) {
        const children = route.children;
        // If there's no sub root, then stop the recurse and returns the generated breadcrumbs.
        if (children.length === 0) {
            return breadcrumbs;
        }
        for (const child of children) {
            if (child.outlet === PRIMARY_OUTLET) {
                // Only parse components in primary router-outlet (in another word, router-outlet without a specific name).
                // Parse this layer and generate a breadcrumb item.
                const routeUrl = child.snapshot.url
                    .map(segment => segment.path)
                    .filter(path => path)
                    .join('/');
                // Do not change nextUrl if routeUrl is falsy. This happens when it's a route lazy loading other modules.
                const nextUrl = !!routeUrl ? url + `/${routeUrl}` : url;
                const breadcrumbLabel = this.nzRouteLabelFn(child.snapshot.data[this.nzRouteLabel]);
                // If have data, go to generate a breadcrumb for it.
                if (routeUrl && breadcrumbLabel) {
                    const breadcrumb = {
                        label: breadcrumbLabel,
                        params: child.snapshot.params,
                        url: nextUrl
                    };
                    breadcrumbs.push(breadcrumb);
                }
                return this.getBreadcrumbs(child, nextUrl, breadcrumbs);
            }
        }
        return breadcrumbs;
    }
    prepareComponentForRtl() {
        if (this.dir === 'rtl') {
            this.renderer.addClass(this.elementRef.nativeElement, 'ant-breadcrumb-rtl');
        }
        else {
            this.renderer.removeClass(this.elementRef.nativeElement, 'ant-breadcrumb-rtl');
        }
    }
}
NzBreadCrumbComponent.decorators = [
    { type: Component, args: [{
                changeDetection: ChangeDetectionStrategy.OnPush,
                encapsulation: ViewEncapsulation.None,
                selector: 'nz-breadcrumb',
                exportAs: 'nzBreadcrumb',
                preserveWhitespaces: false,
                template: `
    <ng-content></ng-content>
    <ng-container *ngIf="nzAutoGenerate && breadcrumbs.length">
      <nz-breadcrumb-item *ngFor="let breadcrumb of breadcrumbs">
        <a [attr.href]="breadcrumb.url" (click)="navigate(breadcrumb.url, $event)">{{ breadcrumb.label }}</a>
      </nz-breadcrumb-item>
    </ng-container>
  `
            },] }
];
NzBreadCrumbComponent.ctorParameters = () => [
    { type: Injector },
    { type: NgZone },
    { type: ChangeDetectorRef },
    { type: ElementRef },
    { type: Renderer2 },
    { type: Directionality, decorators: [{ type: Optional }] }
];
NzBreadCrumbComponent.propDecorators = {
    nzAutoGenerate: [{ type: Input }],
    nzSeparator: [{ type: Input }],
    nzRouteLabel: [{ type: Input }],
    nzRouteLabelFn: [{ type: Input }]
};
__decorate([
    InputBoolean(),
    __metadata("design:type", Object)
], NzBreadCrumbComponent.prototype, "nzAutoGenerate", void 0);

/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */
class NzBreadCrumbItemComponent {
    constructor(nzBreadCrumbComponent) {
        this.nzBreadCrumbComponent = nzBreadCrumbComponent;
    }
}
NzBreadCrumbItemComponent.decorators = [
    { type: Component, args: [{
                changeDetection: ChangeDetectionStrategy.OnPush,
                encapsulation: ViewEncapsulation.None,
                selector: 'nz-breadcrumb-item',
                exportAs: 'nzBreadcrumbItem',
                preserveWhitespaces: false,
                template: `
    <ng-container *ngIf="!!nzOverlay; else noMenuTpl">
      <span class="ant-breadcrumb-overlay-link" nz-dropdown [nzDropdownMenu]="nzOverlay">
        <ng-template [ngTemplateOutlet]="noMenuTpl"></ng-template>
        <i *ngIf="!!nzOverlay" nz-icon nzType="down"></i>
      </span>
    </ng-container>

    <ng-template #noMenuTpl>
      <span class="ant-breadcrumb-link">
        <ng-content></ng-content>
      </span>
    </ng-template>

    <span class="ant-breadcrumb-separator" *ngIf="nzBreadCrumbComponent.nzSeparator">
      <ng-container *nzStringTemplateOutlet="nzBreadCrumbComponent.nzSeparator">
        {{ nzBreadCrumbComponent.nzSeparator }}
      </ng-container>
    </span>
  `
            },] }
];
NzBreadCrumbItemComponent.ctorParameters = () => [
    { type: NzBreadCrumbComponent }
];
NzBreadCrumbItemComponent.propDecorators = {
    nzOverlay: [{ type: Input }]
};

/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */
class NzBreadCrumbSeparatorComponent {
}
NzBreadCrumbSeparatorComponent.decorators = [
    { type: Component, args: [{
                selector: 'nz-breadcrumb-separator',
                exportAs: 'nzBreadcrumbSeparator',
                template: `
    <span class="ant-breadcrumb-separator">
      <ng-content></ng-content>
    </span>
  `
            },] }
];

/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */
class NzBreadCrumbModule {
}
NzBreadCrumbModule.decorators = [
    { type: NgModule, args: [{
                imports: [CommonModule, NzOutletModule, OverlayModule, NzOverlayModule, NzDropDownModule, NzIconModule],
                declarations: [NzBreadCrumbComponent, NzBreadCrumbItemComponent, NzBreadCrumbSeparatorComponent],
                exports: [BidiModule, NzBreadCrumbComponent, NzBreadCrumbItemComponent, NzBreadCrumbSeparatorComponent]
            },] }
];

/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */

/**
 * Generated bundle index. Do not edit.
 */

export { NzBreadCrumbComponent, NzBreadCrumbItemComponent, NzBreadCrumbModule, NzBreadCrumbSeparatorComponent };
//# sourceMappingURL=ng-zorro-antd-breadcrumb.js.map
