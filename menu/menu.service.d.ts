/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */
import { NzSafeAny } from 'ng-zorro-antd/core/types';
import { BehaviorSubject, Subject } from 'rxjs';
import { NzMenuModeType, NzMenuThemeType } from './menu.types';
export declare class MenuService {
    /** all descendant menu click **/
    descendantMenuItemClick$: Subject<any>;
    /** child menu item click **/
    childMenuItemClick$: Subject<any>;
    theme$: BehaviorSubject<NzMenuThemeType>;
    mode$: BehaviorSubject<NzMenuModeType>;
    inlineIndent$: BehaviorSubject<number>;
    isChildSubMenuOpen$: BehaviorSubject<boolean>;
    onDescendantMenuItemClick(menu: NzSafeAny): void;
    onChildMenuItemClick(menu: NzSafeAny): void;
    setMode(mode: NzMenuModeType): void;
    setTheme(theme: NzMenuThemeType): void;
    setInlineIndent(indent: number): void;
}
