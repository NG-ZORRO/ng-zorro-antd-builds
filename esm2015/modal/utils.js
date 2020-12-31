/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */
export function applyConfigDefaults(config, defaultOptions) {
    return Object.assign(Object.assign({}, defaultOptions), config);
}
export function getValueWithConfig(userValue, configValue, defaultValue) {
    return typeof userValue === 'undefined' ? (typeof configValue === 'undefined' ? defaultValue : configValue) : userValue;
}
/**
 * Assign the params into the content component instance.
 * @deprecated Should use dependency injection to get the params for user
 * @breaking-change 12.0.0
 */
export function setContentInstanceParams(instance, params) {
    Object.assign(instance, params);
}
export function getConfigFromComponent(component) {
    const { nzMask, nzMaskClosable, nzClosable, nzOkLoading, nzOkDisabled, nzCancelDisabled, nzCancelLoading, nzKeyboard, nzNoAnimation, nzContent, nzComponentParams, nzFooter, nzZIndex, nzWidth, nzWrapClassName, nzClassName, nzStyle, nzTitle, nzCloseIcon, nzMaskStyle, nzBodyStyle, nzOkText, nzCancelText, nzOkType, nzOkDanger, nzIconType, nzModalType, nzOnOk, nzOnCancel, nzAfterOpen, nzAfterClose, nzCloseOnNavigation, nzAutofocus } = component;
    return {
        nzMask,
        nzMaskClosable,
        nzClosable,
        nzOkLoading,
        nzOkDisabled,
        nzCancelDisabled,
        nzCancelLoading,
        nzKeyboard,
        nzNoAnimation,
        nzContent,
        nzComponentParams,
        nzFooter,
        nzZIndex,
        nzWidth,
        nzWrapClassName,
        nzClassName,
        nzStyle,
        nzTitle,
        nzCloseIcon,
        nzMaskStyle,
        nzBodyStyle,
        nzOkText,
        nzCancelText,
        nzOkType,
        nzOkDanger,
        nzIconType,
        nzModalType,
        nzOnOk,
        nzOnCancel,
        nzAfterOpen,
        nzAfterClose,
        nzCloseOnNavigation,
        nzAutofocus
    };
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidXRpbHMuanMiLCJzb3VyY2VSb290IjoiLi4vLi4vLi4vY29tcG9uZW50cy9tb2RhbC8iLCJzb3VyY2VzIjpbInV0aWxzLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7R0FHRztBQUtILE1BQU0sVUFBVSxtQkFBbUIsQ0FBQyxNQUFvQixFQUFFLGNBQTRCO0lBQ3BGLHVDQUFZLGNBQWMsR0FBSyxNQUFNLEVBQUc7QUFDMUMsQ0FBQztBQUVELE1BQU0sVUFBVSxrQkFBa0IsQ0FBSSxTQUF3QixFQUFFLFdBQTBCLEVBQUUsWUFBZTtJQUN6RyxPQUFPLE9BQU8sU0FBUyxLQUFLLFdBQVcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxPQUFPLFdBQVcsS0FBSyxXQUFXLENBQUMsQ0FBQyxDQUFDLFlBQVksQ0FBQyxDQUFDLENBQUMsV0FBVyxDQUFDLENBQUMsQ0FBQyxDQUFDLFNBQVMsQ0FBQztBQUMxSCxDQUFDO0FBRUQ7Ozs7R0FJRztBQUNILE1BQU0sVUFBVSx3QkFBd0IsQ0FBSSxRQUFXLEVBQUUsTUFBOEI7SUFDckYsTUFBTSxDQUFDLE1BQU0sQ0FBQyxRQUFRLEVBQUUsTUFBTSxDQUFDLENBQUM7QUFDbEMsQ0FBQztBQUVELE1BQU0sVUFBVSxzQkFBc0IsQ0FBQyxTQUEyQjtJQUNoRSxNQUFNLEVBQ0osTUFBTSxFQUNOLGNBQWMsRUFDZCxVQUFVLEVBQ1YsV0FBVyxFQUNYLFlBQVksRUFDWixnQkFBZ0IsRUFDaEIsZUFBZSxFQUNmLFVBQVUsRUFDVixhQUFhLEVBQ2IsU0FBUyxFQUNULGlCQUFpQixFQUNqQixRQUFRLEVBQ1IsUUFBUSxFQUNSLE9BQU8sRUFDUCxlQUFlLEVBQ2YsV0FBVyxFQUNYLE9BQU8sRUFDUCxPQUFPLEVBQ1AsV0FBVyxFQUNYLFdBQVcsRUFDWCxXQUFXLEVBQ1gsUUFBUSxFQUNSLFlBQVksRUFDWixRQUFRLEVBQ1IsVUFBVSxFQUNWLFVBQVUsRUFDVixXQUFXLEVBQ1gsTUFBTSxFQUNOLFVBQVUsRUFDVixXQUFXLEVBQ1gsWUFBWSxFQUNaLG1CQUFtQixFQUNuQixXQUFXLEVBQ1osR0FBRyxTQUFTLENBQUM7SUFDZCxPQUFPO1FBQ0wsTUFBTTtRQUNOLGNBQWM7UUFDZCxVQUFVO1FBQ1YsV0FBVztRQUNYLFlBQVk7UUFDWixnQkFBZ0I7UUFDaEIsZUFBZTtRQUNmLFVBQVU7UUFDVixhQUFhO1FBQ2IsU0FBUztRQUNULGlCQUFpQjtRQUNqQixRQUFRO1FBQ1IsUUFBUTtRQUNSLE9BQU87UUFDUCxlQUFlO1FBQ2YsV0FBVztRQUNYLE9BQU87UUFDUCxPQUFPO1FBQ1AsV0FBVztRQUNYLFdBQVc7UUFDWCxXQUFXO1FBQ1gsUUFBUTtRQUNSLFlBQVk7UUFDWixRQUFRO1FBQ1IsVUFBVTtRQUNWLFVBQVU7UUFDVixXQUFXO1FBQ1gsTUFBTTtRQUNOLFVBQVU7UUFDVixXQUFXO1FBQ1gsWUFBWTtRQUNaLG1CQUFtQjtRQUNuQixXQUFXO0tBQ1osQ0FBQztBQUNKLENBQUMiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqIFVzZSBvZiB0aGlzIHNvdXJjZSBjb2RlIGlzIGdvdmVybmVkIGJ5IGFuIE1JVC1zdHlsZSBsaWNlbnNlIHRoYXQgY2FuIGJlXG4gKiBmb3VuZCBpbiB0aGUgTElDRU5TRSBmaWxlIGF0IGh0dHBzOi8vZ2l0aHViLmNvbS9ORy1aT1JSTy9uZy16b3Jyby1hbnRkL2Jsb2IvbWFzdGVyL0xJQ0VOU0VcbiAqL1xuXG5pbXBvcnQgeyBNb2RhbE9wdGlvbnMgfSBmcm9tICcuL21vZGFsLXR5cGVzJztcbmltcG9ydCB7IE56TW9kYWxDb21wb25lbnQgfSBmcm9tICcuL21vZGFsLmNvbXBvbmVudCc7XG5cbmV4cG9ydCBmdW5jdGlvbiBhcHBseUNvbmZpZ0RlZmF1bHRzKGNvbmZpZzogTW9kYWxPcHRpb25zLCBkZWZhdWx0T3B0aW9uczogTW9kYWxPcHRpb25zKTogTW9kYWxPcHRpb25zIHtcbiAgcmV0dXJuIHsgLi4uZGVmYXVsdE9wdGlvbnMsIC4uLmNvbmZpZyB9O1xufVxuXG5leHBvcnQgZnVuY3Rpb24gZ2V0VmFsdWVXaXRoQ29uZmlnPFQ+KHVzZXJWYWx1ZTogVCB8IHVuZGVmaW5lZCwgY29uZmlnVmFsdWU6IFQgfCB1bmRlZmluZWQsIGRlZmF1bHRWYWx1ZTogVCk6IFQgfCB1bmRlZmluZWQge1xuICByZXR1cm4gdHlwZW9mIHVzZXJWYWx1ZSA9PT0gJ3VuZGVmaW5lZCcgPyAodHlwZW9mIGNvbmZpZ1ZhbHVlID09PSAndW5kZWZpbmVkJyA/IGRlZmF1bHRWYWx1ZSA6IGNvbmZpZ1ZhbHVlKSA6IHVzZXJWYWx1ZTtcbn1cblxuLyoqXG4gKiBBc3NpZ24gdGhlIHBhcmFtcyBpbnRvIHRoZSBjb250ZW50IGNvbXBvbmVudCBpbnN0YW5jZS5cbiAqIEBkZXByZWNhdGVkIFNob3VsZCB1c2UgZGVwZW5kZW5jeSBpbmplY3Rpb24gdG8gZ2V0IHRoZSBwYXJhbXMgZm9yIHVzZXJcbiAqIEBicmVha2luZy1jaGFuZ2UgMTIuMC4wXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBzZXRDb250ZW50SW5zdGFuY2VQYXJhbXM8VD4oaW5zdGFuY2U6IFQsIHBhcmFtczogUGFydGlhbDxUPiB8IHVuZGVmaW5lZCk6IHZvaWQge1xuICBPYmplY3QuYXNzaWduKGluc3RhbmNlLCBwYXJhbXMpO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gZ2V0Q29uZmlnRnJvbUNvbXBvbmVudChjb21wb25lbnQ6IE56TW9kYWxDb21wb25lbnQpOiBNb2RhbE9wdGlvbnMge1xuICBjb25zdCB7XG4gICAgbnpNYXNrLFxuICAgIG56TWFza0Nsb3NhYmxlLFxuICAgIG56Q2xvc2FibGUsXG4gICAgbnpPa0xvYWRpbmcsXG4gICAgbnpPa0Rpc2FibGVkLFxuICAgIG56Q2FuY2VsRGlzYWJsZWQsXG4gICAgbnpDYW5jZWxMb2FkaW5nLFxuICAgIG56S2V5Ym9hcmQsXG4gICAgbnpOb0FuaW1hdGlvbixcbiAgICBuekNvbnRlbnQsXG4gICAgbnpDb21wb25lbnRQYXJhbXMsXG4gICAgbnpGb290ZXIsXG4gICAgbnpaSW5kZXgsXG4gICAgbnpXaWR0aCxcbiAgICBueldyYXBDbGFzc05hbWUsXG4gICAgbnpDbGFzc05hbWUsXG4gICAgbnpTdHlsZSxcbiAgICBuelRpdGxlLFxuICAgIG56Q2xvc2VJY29uLFxuICAgIG56TWFza1N0eWxlLFxuICAgIG56Qm9keVN0eWxlLFxuICAgIG56T2tUZXh0LFxuICAgIG56Q2FuY2VsVGV4dCxcbiAgICBuek9rVHlwZSxcbiAgICBuek9rRGFuZ2VyLFxuICAgIG56SWNvblR5cGUsXG4gICAgbnpNb2RhbFR5cGUsXG4gICAgbnpPbk9rLFxuICAgIG56T25DYW5jZWwsXG4gICAgbnpBZnRlck9wZW4sXG4gICAgbnpBZnRlckNsb3NlLFxuICAgIG56Q2xvc2VPbk5hdmlnYXRpb24sXG4gICAgbnpBdXRvZm9jdXNcbiAgfSA9IGNvbXBvbmVudDtcbiAgcmV0dXJuIHtcbiAgICBuek1hc2ssXG4gICAgbnpNYXNrQ2xvc2FibGUsXG4gICAgbnpDbG9zYWJsZSxcbiAgICBuek9rTG9hZGluZyxcbiAgICBuek9rRGlzYWJsZWQsXG4gICAgbnpDYW5jZWxEaXNhYmxlZCxcbiAgICBuekNhbmNlbExvYWRpbmcsXG4gICAgbnpLZXlib2FyZCxcbiAgICBuek5vQW5pbWF0aW9uLFxuICAgIG56Q29udGVudCxcbiAgICBuekNvbXBvbmVudFBhcmFtcyxcbiAgICBuekZvb3RlcixcbiAgICBuelpJbmRleCxcbiAgICBueldpZHRoLFxuICAgIG56V3JhcENsYXNzTmFtZSxcbiAgICBuekNsYXNzTmFtZSxcbiAgICBuelN0eWxlLFxuICAgIG56VGl0bGUsXG4gICAgbnpDbG9zZUljb24sXG4gICAgbnpNYXNrU3R5bGUsXG4gICAgbnpCb2R5U3R5bGUsXG4gICAgbnpPa1RleHQsXG4gICAgbnpDYW5jZWxUZXh0LFxuICAgIG56T2tUeXBlLFxuICAgIG56T2tEYW5nZXIsXG4gICAgbnpJY29uVHlwZSxcbiAgICBuek1vZGFsVHlwZSxcbiAgICBuek9uT2ssXG4gICAgbnpPbkNhbmNlbCxcbiAgICBuekFmdGVyT3BlbixcbiAgICBuekFmdGVyQ2xvc2UsXG4gICAgbnpDbG9zZU9uTmF2aWdhdGlvbixcbiAgICBuekF1dG9mb2N1c1xuICB9O1xufVxuIl19