/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */
import { ComponentType, Overlay } from '@angular/cdk/overlay';
import { ChangeDetectorRef, EventEmitter, Injector, OnDestroy, OnInit } from '@angular/core';
import { MessageConfig, NzConfigService } from 'ng-zorro-antd/core/config';
import { NzSingletonService } from 'ng-zorro-antd/core/services';
import { Subject } from 'rxjs';
import { NzMessageData, NzMessageDataOptions } from './typings';
export declare abstract class NzMNService {
    protected nzSingletonService: NzSingletonService;
    protected overlay: Overlay;
    private injector;
    protected abstract componentPrefix: string;
    protected container?: NzMNContainerComponent;
    constructor(nzSingletonService: NzSingletonService, overlay: Overlay, injector: Injector);
    remove(id?: string): void;
    protected getInstanceId(): string;
    protected withContainer<T extends NzMNContainerComponent>(ctor: ComponentType<T>): T;
}
export declare abstract class NzMNContainerComponent implements OnInit, OnDestroy {
    protected cdr: ChangeDetectorRef;
    protected nzConfigService: NzConfigService;
    config?: Required<MessageConfig>;
    instances: Array<Required<NzMessageData>>;
    protected readonly destroy$: Subject<void>;
    constructor(cdr: ChangeDetectorRef, nzConfigService: NzConfigService);
    ngOnInit(): void;
    ngOnDestroy(): void;
    create(data: NzMessageData): Required<NzMessageData>;
    remove(id: string, userAction?: boolean): void;
    removeAll(): void;
    protected onCreate(instance: NzMessageData): Required<NzMessageData>;
    protected onRemove(instance: Required<NzMessageData>, userAction: boolean): void;
    protected readyInstances(): void;
    protected abstract updateConfig(): void;
    protected abstract subscribeConfigChange(): void;
    protected mergeOptions(options?: NzMessageDataOptions): NzMessageDataOptions;
}
export declare abstract class NzMNComponent implements OnInit, OnDestroy {
    protected cdr: ChangeDetectorRef;
    instance: Required<NzMessageData>;
    index?: number;
    readonly destroyed: EventEmitter<{
        id: string;
        userAction: boolean;
    }>;
    protected options: Required<NzMessageDataOptions>;
    protected autoClose?: boolean;
    protected eraseTimer: number | null;
    protected eraseTimingStart?: number;
    protected eraseTTL: number;
    constructor(cdr: ChangeDetectorRef);
    ngOnInit(): void;
    ngOnDestroy(): void;
    onEnter(): void;
    onLeave(): void;
    protected destroy(userAction?: boolean): void;
    private initErase;
    private updateTTL;
    private startEraseTimeout;
    private clearEraseTimeout;
}
