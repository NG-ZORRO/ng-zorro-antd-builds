import { Observable } from 'rxjs';
import { NzSafeAny } from 'ng-zorro-antd/core/types';
import { NzConfig, NzConfigKey } from './config';
import * as i0 from "@angular/core";
export declare class NzConfigService {
    private configUpdated$;
    /** Global config holding property. */
    private readonly config;
    constructor(defaultConfig?: NzConfig);
    getConfig(): NzConfig;
    getConfigForComponent<T extends NzConfigKey>(componentName: T): NzConfig[T];
    getConfigChangeEventForComponent(componentName: NzConfigKey): Observable<void>;
    set<T extends NzConfigKey>(componentName: T, value: NzConfig[T]): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<NzConfigService, [{ optional: true; }]>;
    static ɵprov: i0.ɵɵInjectableDeclaration<NzConfigService>;
}
/**
 * This decorator is used to decorate properties. If a property is decorated, it would try to load default value from
 * config.
 */
export declare function WithConfig<T>(): (target: NzSafeAny, propName: NzSafeAny, originalDescriptor?: TypedPropertyDescriptor<T> | undefined) => NzSafeAny;
