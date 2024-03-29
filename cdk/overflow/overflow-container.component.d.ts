/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */
import { QueryList, ElementRef, OnInit, AfterContentInit, OnDestroy, ChangeDetectorRef } from '@angular/core';
import { BehaviorSubject, Observable, ReplaySubject, Subject } from 'rxjs';
import { NzResizeObserver } from 'ng-zorro-antd/cdk/resize-observer';
import { NzOverflowItemDirective } from './overflow-item.directive';
import { NzOverflowRestDirective } from './overflow-rest.directive';
import { NzOverflowSuffixDirective } from './overflow-suffix.directive';
import * as i0 from "@angular/core";
export declare class NzOverflowContainerComponent implements OnInit, AfterContentInit, OnDestroy {
    private nzResizeObserver;
    private elementRef;
    private cdr;
    contentInit$: Subject<void>;
    overflowItems: QueryList<NzOverflowItemDirective> | undefined;
    overflowSuffix: NzOverflowSuffixDirective | undefined;
    overflowRest: NzOverflowRestDirective | undefined;
    overflowItems$: ReplaySubject<QueryList<NzOverflowItemDirective>>;
    destroy$: Subject<void>;
    containerWidth$: Observable<number>;
    restWidth$: BehaviorSubject<number>;
    suffixWidth$: BehaviorSubject<number>;
    suffixFixedStart$: BehaviorSubject<number | null>;
    displayCount$: BehaviorSubject<number>;
    restReady$: BehaviorSubject<boolean>;
    maxRestWith$: Observable<number>;
    omittedItems$: Observable<NzOverflowItemDirective[]>;
    displayRest$: Observable<boolean>;
    updateDisplayCount(count: number, notReady?: boolean): void;
    constructor(nzResizeObserver: NzResizeObserver, elementRef: ElementRef, cdr: ChangeDetectorRef);
    ngOnInit(): void;
    ngAfterContentInit(): void;
    ngOnDestroy(): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<NzOverflowContainerComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<NzOverflowContainerComponent, "nz-overflow-container", never, {}, {}, ["overflowSuffix", "overflowRest", "overflowItems"], ["*", "[appOverflowRest]", "[appOverflowSuffix]"]>;
}
