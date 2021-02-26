/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */
export function isTargetWindow(target) {
    return typeof window !== 'undefined' && target === window;
}
export function getTargetRect(target) {
    return !isTargetWindow(target)
        ? target.getBoundingClientRect()
        : {
            top: 0,
            left: 0,
            bottom: 0
        };
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidXRpbHMuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9jb21wb25lbnRzL2FmZml4L3V0aWxzLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7R0FHRztBQVVILE1BQU0sVUFBVSxjQUFjLENBQUMsTUFBd0I7SUFDckQsT0FBTyxPQUFPLE1BQU0sS0FBSyxXQUFXLElBQUksTUFBTSxLQUFLLE1BQU0sQ0FBQztBQUM1RCxDQUFDO0FBRUQsTUFBTSxVQUFVLGFBQWEsQ0FBQyxNQUF3QjtJQUNwRCxPQUFPLENBQUMsY0FBYyxDQUFDLE1BQU0sQ0FBQztRQUM1QixDQUFDLENBQUMsTUFBTSxDQUFDLHFCQUFxQixFQUFFO1FBQ2hDLENBQUMsQ0FBQztZQUNFLEdBQUcsRUFBRSxDQUFDO1lBQ04sSUFBSSxFQUFFLENBQUM7WUFDUCxNQUFNLEVBQUUsQ0FBQztTQUNWLENBQUM7QUFDUixDQUFDIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKiBVc2Ugb2YgdGhpcyBzb3VyY2UgY29kZSBpcyBnb3Zlcm5lZCBieSBhbiBNSVQtc3R5bGUgbGljZW5zZSB0aGF0IGNhbiBiZVxuICogZm91bmQgaW4gdGhlIExJQ0VOU0UgZmlsZSBhdCBodHRwczovL2dpdGh1Yi5jb20vTkctWk9SUk8vbmctem9ycm8tYW50ZC9ibG9iL21hc3Rlci9MSUNFTlNFXG4gKi9cblxuZXhwb3J0IGludGVyZmFjZSBTaW1wbGVSZWN0IHtcbiAgdG9wOiBudW1iZXI7XG4gIGxlZnQ6IG51bWJlcjtcbiAgd2lkdGg/OiBudW1iZXI7XG4gIGhlaWdodD86IG51bWJlcjtcbiAgYm90dG9tPzogbnVtYmVyO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gaXNUYXJnZXRXaW5kb3codGFyZ2V0OiBFbGVtZW50IHwgV2luZG93KTogdGFyZ2V0IGlzIFdpbmRvdyB7XG4gIHJldHVybiB0eXBlb2Ygd2luZG93ICE9PSAndW5kZWZpbmVkJyAmJiB0YXJnZXQgPT09IHdpbmRvdztcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGdldFRhcmdldFJlY3QodGFyZ2V0OiBFbGVtZW50IHwgV2luZG93KTogU2ltcGxlUmVjdCB7XG4gIHJldHVybiAhaXNUYXJnZXRXaW5kb3codGFyZ2V0KVxuICAgID8gdGFyZ2V0LmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpXG4gICAgOiB7XG4gICAgICAgIHRvcDogMCxcbiAgICAgICAgbGVmdDogMCxcbiAgICAgICAgYm90dG9tOiAwXG4gICAgICB9O1xufVxuIl19