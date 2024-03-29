/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */
export * from './carousel.module';
export * from './carousel.component';
export * from './carousel-content.directive';
export * from './typings';
export * from './strategies/base-strategy';
export { NzCarouselOpacityStrategy } from './strategies/opacity-strategy';
export { NzCarouselTransformStrategy } from './strategies/transform-strategy';
export { NzCarouselTransformNoLoopStrategy } from './strategies/experimental/transform-no-loop-strategy';
export { NzCarouselFlipStrategy } from './strategies/experimental/flip-strategy';
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicHVibGljLWFwaS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL2NvbXBvbmVudHMvY2Fyb3VzZWwvcHVibGljLWFwaS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7O0dBR0c7QUFFSCxjQUFjLG1CQUFtQixDQUFDO0FBQ2xDLGNBQWMsc0JBQXNCLENBQUM7QUFDckMsY0FBYyw4QkFBOEIsQ0FBQztBQUM3QyxjQUFjLFdBQVcsQ0FBQztBQUUxQixjQUFjLDRCQUE0QixDQUFDO0FBQzNDLE9BQU8sRUFBRSx5QkFBeUIsRUFBRSxNQUFNLCtCQUErQixDQUFDO0FBQzFFLE9BQU8sRUFBRSwyQkFBMkIsRUFBRSxNQUFNLGlDQUFpQyxDQUFDO0FBQzlFLE9BQU8sRUFBRSxpQ0FBaUMsRUFBRSxNQUFNLHNEQUFzRCxDQUFDO0FBQ3pHLE9BQU8sRUFBRSxzQkFBc0IsRUFBRSxNQUFNLHlDQUF5QyxDQUFDIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKiBVc2Ugb2YgdGhpcyBzb3VyY2UgY29kZSBpcyBnb3Zlcm5lZCBieSBhbiBNSVQtc3R5bGUgbGljZW5zZSB0aGF0IGNhbiBiZVxuICogZm91bmQgaW4gdGhlIExJQ0VOU0UgZmlsZSBhdCBodHRwczovL2dpdGh1Yi5jb20vTkctWk9SUk8vbmctem9ycm8tYW50ZC9ibG9iL21hc3Rlci9MSUNFTlNFXG4gKi9cblxuZXhwb3J0ICogZnJvbSAnLi9jYXJvdXNlbC5tb2R1bGUnO1xuZXhwb3J0ICogZnJvbSAnLi9jYXJvdXNlbC5jb21wb25lbnQnO1xuZXhwb3J0ICogZnJvbSAnLi9jYXJvdXNlbC1jb250ZW50LmRpcmVjdGl2ZSc7XG5leHBvcnQgKiBmcm9tICcuL3R5cGluZ3MnO1xuXG5leHBvcnQgKiBmcm9tICcuL3N0cmF0ZWdpZXMvYmFzZS1zdHJhdGVneSc7XG5leHBvcnQgeyBOekNhcm91c2VsT3BhY2l0eVN0cmF0ZWd5IH0gZnJvbSAnLi9zdHJhdGVnaWVzL29wYWNpdHktc3RyYXRlZ3knO1xuZXhwb3J0IHsgTnpDYXJvdXNlbFRyYW5zZm9ybVN0cmF0ZWd5IH0gZnJvbSAnLi9zdHJhdGVnaWVzL3RyYW5zZm9ybS1zdHJhdGVneSc7XG5leHBvcnQgeyBOekNhcm91c2VsVHJhbnNmb3JtTm9Mb29wU3RyYXRlZ3kgfSBmcm9tICcuL3N0cmF0ZWdpZXMvZXhwZXJpbWVudGFsL3RyYW5zZm9ybS1uby1sb29wLXN0cmF0ZWd5JztcbmV4cG9ydCB7IE56Q2Fyb3VzZWxGbGlwU3RyYXRlZ3kgfSBmcm9tICcuL3N0cmF0ZWdpZXMvZXhwZXJpbWVudGFsL2ZsaXAtc3RyYXRlZ3knO1xuIl19