/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */
export function isChildOption(o) {
    return o.isLeaf || !o.children || !o.children.length;
}
export function isParentOption(o) {
    return !!o.children && !!o.children.length && !o.isLeaf;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidXRpbHMuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9jb21wb25lbnRzL2Nhc2NhZGVyL3V0aWxzLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7R0FHRztBQUlILE1BQU0sVUFBVSxhQUFhLENBQUMsQ0FBbUI7SUFDL0MsT0FBTyxDQUFDLENBQUMsTUFBTSxJQUFJLENBQUMsQ0FBQyxDQUFDLFFBQVEsSUFBSSxDQUFDLENBQUMsQ0FBQyxRQUFRLENBQUMsTUFBTSxDQUFDO0FBQ3ZELENBQUM7QUFFRCxNQUFNLFVBQVUsY0FBYyxDQUFDLENBQW1CO0lBQ2hELE9BQU8sQ0FBQyxDQUFDLENBQUMsQ0FBQyxRQUFRLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxRQUFRLENBQUMsTUFBTSxJQUFJLENBQUMsQ0FBQyxDQUFDLE1BQU0sQ0FBQztBQUMxRCxDQUFDIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKiBVc2Ugb2YgdGhpcyBzb3VyY2UgY29kZSBpcyBnb3Zlcm5lZCBieSBhbiBNSVQtc3R5bGUgbGljZW5zZSB0aGF0IGNhbiBiZVxuICogZm91bmQgaW4gdGhlIExJQ0VOU0UgZmlsZSBhdCBodHRwczovL2dpdGh1Yi5jb20vTkctWk9SUk8vbmctem9ycm8tYW50ZC9ibG9iL21hc3Rlci9MSUNFTlNFXG4gKi9cblxuaW1wb3J0IHsgTnpDYXNjYWRlck9wdGlvbiB9IGZyb20gJy4vdHlwaW5ncyc7XG5cbmV4cG9ydCBmdW5jdGlvbiBpc0NoaWxkT3B0aW9uKG86IE56Q2FzY2FkZXJPcHRpb24pOiBib29sZWFuIHtcbiAgcmV0dXJuIG8uaXNMZWFmIHx8ICFvLmNoaWxkcmVuIHx8ICFvLmNoaWxkcmVuLmxlbmd0aDtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGlzUGFyZW50T3B0aW9uKG86IE56Q2FzY2FkZXJPcHRpb24pOiBib29sZWFuIHtcbiAgcmV0dXJuICEhby5jaGlsZHJlbiAmJiAhIW8uY2hpbGRyZW4ubGVuZ3RoICYmICFvLmlzTGVhZjtcbn1cbiJdfQ==