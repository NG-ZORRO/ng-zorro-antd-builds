/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */
import { InjectionToken } from '@angular/core';
/**
 * User should provide an object implements this interface to set global configurations.
 */
export const NZ_CONFIG = new InjectionToken('nz-config');
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29uZmlnLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vY29tcG9uZW50cy9jb3JlL2NvbmZpZy9jb25maWcudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7OztHQUdHO0FBR0gsT0FBTyxFQUFFLGNBQWMsRUFBcUIsTUFBTSxlQUFlLENBQUM7QUFxVmxFOztHQUVHO0FBQ0gsTUFBTSxDQUFDLE1BQU0sU0FBUyxHQUFHLElBQUksY0FBYyxDQUFXLFdBQVcsQ0FBQyxDQUFDIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKiBVc2Ugb2YgdGhpcyBzb3VyY2UgY29kZSBpcyBnb3Zlcm5lZCBieSBhbiBNSVQtc3R5bGUgbGljZW5zZSB0aGF0IGNhbiBiZVxuICogZm91bmQgaW4gdGhlIExJQ0VOU0UgZmlsZSBhdCBodHRwczovL2dpdGh1Yi5jb20vTkctWk9SUk8vbmctem9ycm8tYW50ZC9ibG9iL21hc3Rlci9MSUNFTlNFXG4gKi9cblxuaW1wb3J0IHsgRGlyZWN0aW9uIH0gZnJvbSAnQGFuZ3VsYXIvY2RrL2JpZGknO1xuaW1wb3J0IHsgSW5qZWN0aW9uVG9rZW4sIFRlbXBsYXRlUmVmLCBUeXBlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBTYWZlVXJsIH0gZnJvbSAnQGFuZ3VsYXIvcGxhdGZvcm0tYnJvd3Nlcic7XG5cbmltcG9ydCB7IFRoZW1lVHlwZSB9IGZyb20gJ0BhbnQtZGVzaWduL2ljb25zLWFuZ3VsYXInO1xuXG5pbXBvcnQgeyBOekJyZWFrcG9pbnRFbnVtIH0gZnJvbSAnbmctem9ycm8tYW50ZC9jb3JlL3NlcnZpY2VzJztcbmltcG9ydCB7XG4gIE56U2FmZUFueSxcbiAgTnpTaGFwZVNDVHlwZSxcbiAgTnpTaXplRFNUeXBlLFxuICBOelNpemVMRFNUeXBlLFxuICBOelNpemVNRFNUeXBlLFxuICBOelRTVHlwZVxufSBmcm9tICduZy16b3Jyby1hbnRkL2NvcmUvdHlwZXMnO1xuXG5leHBvcnQgaW50ZXJmYWNlIE56Q29uZmlnIHtcbiAgYWZmaXg/OiBBZmZpeENvbmZpZztcbiAgc2VsZWN0PzogU2VsZWN0Q29uZmlnO1xuICBhbGVydD86IEFsZXJ0Q29uZmlnO1xuICBhbmNob3I/OiBBbmNob3JDb25maWc7XG4gIGF2YXRhcj86IEF2YXRhckNvbmZpZztcbiAgYmFja1RvcD86IEJhY2tUb3BDb25maWc7XG4gIGJhZGdlPzogQmFkZ2VDb25maWc7XG4gIGJ1dHRvbj86IEJ1dHRvbkNvbmZpZztcbiAgY2FyZD86IENhcmRDb25maWc7XG4gIGNhcm91c2VsPzogQ2Fyb3VzZWxDb25maWc7XG4gIGNhc2NhZGVyPzogQ2FzY2FkZXJDb25maWc7XG4gIGNvZGVFZGl0b3I/OiBDb2RlRWRpdG9yQ29uZmlnO1xuICBjb2xsYXBzZT86IENvbGxhcHNlQ29uZmlnO1xuICBjb2xsYXBzZVBhbmVsPzogQ29sbGFwc2VQYW5lbENvbmZpZztcbiAgZGF0ZVBpY2tlcj86IERhdGVQaWNrZXJDb25maWc7XG4gIGRlc2NyaXB0aW9ucz86IERlc2NyaXB0aW9uc0NvbmZpZztcbiAgZHJhd2VyPzogRHJhd2VyQ29uZmlnO1xuICBkcm9wRG93bj86IERyb3BEb3duQ29uZmlnO1xuICBlbXB0eT86IEVtcHR5Q29uZmlnO1xuICBmaWx0ZXJUcmlnZ2VyPzogRmlsdGVyVHJpZ2dlckNvbmZpZztcbiAgZm9ybT86IEZvcm1Db25maWc7XG4gIGljb24/OiBJY29uQ29uZmlnO1xuICBtZXNzYWdlPzogTWVzc2FnZUNvbmZpZztcbiAgbW9kYWw/OiBNb2RhbENvbmZpZztcbiAgbm90aWZpY2F0aW9uPzogTm90aWZpY2F0aW9uQ29uZmlnO1xuICBwYWdlSGVhZGVyPzogUGFnZUhlYWRlckNvbmZpZztcbiAgcGFnaW5hdGlvbj86IFBhZ2luYXRpb25Db25maWc7XG4gIHByb2dyZXNzPzogUHJvZ3Jlc3NDb25maWc7XG4gIHJhdGU/OiBSYXRlQ29uZmlnO1xuICBzcGFjZT86IFNwYWNlQ29uZmlnO1xuICBzcGluPzogU3BpbkNvbmZpZztcbiAgc3dpdGNoPzogU3dpdGNoQ29uZmlnO1xuICB0YWJsZT86IFRhYmxlQ29uZmlnO1xuICB0YWJzPzogVGFic0NvbmZpZztcbiAgdGltZVBpY2tlcj86IFRpbWVQaWNrZXJDb25maWc7XG4gIHRyZWU/OiBUcmVlQ29uZmlnO1xuICB0cmVlU2VsZWN0PzogVHJlZVNlbGVjdENvbmZpZztcbiAgdHlwb2dyYXBoeT86IFR5cG9ncmFwaHlDb25maWc7XG4gIGltYWdlPzogSW1hZ2VDb25maWc7XG4gIHBvcGNvbmZpcm0/OiBQb3BDb25maXJtQ29uZmlnO1xuICBwb3BvdmVyPzogUG9wb3ZlckNvbmZpZztcbiAgaW1hZ2VFeHBlcmltZW50YWw/OiBJbWFnZUV4cGVyaW1lbnRhbENvbmZpZztcbn1cblxuZXhwb3J0IGludGVyZmFjZSBTZWxlY3RDb25maWcge1xuICBuekJvcmRlcmxlc3M/OiBib29sZWFuO1xuICBuelN1ZmZpeEljb24/OiBUZW1wbGF0ZVJlZjxOelNhZmVBbnk+IHwgc3RyaW5nIHwgbnVsbDtcbiAgbnpCYWNrZHJvcD86IGJvb2xlYW47XG59XG5cbmV4cG9ydCBpbnRlcmZhY2UgQWZmaXhDb25maWcge1xuICBuek9mZnNldEJvdHRvbT86IG51bWJlcjtcbiAgbnpPZmZzZXRUb3A/OiBudW1iZXI7XG59XG5cbmV4cG9ydCBpbnRlcmZhY2UgQWxlcnRDb25maWcge1xuICBuekNsb3NlYWJsZT86IGJvb2xlYW47XG4gIG56U2hvd0ljb24/OiBib29sZWFuO1xufVxuXG5leHBvcnQgaW50ZXJmYWNlIEF2YXRhckNvbmZpZyB7XG4gIG56U2hhcGU/OiBOelNoYXBlU0NUeXBlO1xuICBuelNpemU/OiBOelNpemVMRFNUeXBlIHwgbnVtYmVyO1xuICBuekdhcD86IG51bWJlcjtcbn1cblxuZXhwb3J0IGludGVyZmFjZSBBbmNob3JDb25maWcge1xuICBuekJvdW5kcz86IG51bWJlcjtcbiAgbnpPZmZzZXRCb3R0b20/OiBudW1iZXI7XG4gIG56T2Zmc2V0VG9wPzogbnVtYmVyO1xuICBuelNob3dJbmtJbkZpeGVkPzogYm9vbGVhbjtcbn1cblxuZXhwb3J0IGludGVyZmFjZSBCYWNrVG9wQ29uZmlnIHtcbiAgbnpWaXNpYmlsaXR5SGVpZ2h0PzogbnVtYmVyO1xufVxuXG5leHBvcnQgaW50ZXJmYWNlIEJhZGdlQ29uZmlnIHtcbiAgbnpDb2xvcj86IG51bWJlcjtcbiAgbnpPdmVyZmxvd0NvdW50PzogbnVtYmVyO1xuICBuelNob3daZXJvPzogbnVtYmVyO1xufVxuXG5leHBvcnQgaW50ZXJmYWNlIEJ1dHRvbkNvbmZpZyB7XG4gIG56U2l6ZT86ICdsYXJnZScgfCAnZGVmYXVsdCcgfCAnc21hbGwnO1xufVxuXG5leHBvcnQgaW50ZXJmYWNlIENvZGVFZGl0b3JDb25maWcge1xuICBhc3NldHNSb290Pzogc3RyaW5nIHwgU2FmZVVybDtcbiAgZGVmYXVsdEVkaXRvck9wdGlvbj86IE56U2FmZUFueTtcbiAgdXNlU3RhdGljTG9hZGluZz86IGJvb2xlYW47XG5cbiAgb25Mb2FkPygpOiB2b2lkO1xuXG4gIG9uRmlyc3RFZGl0b3JJbml0PygpOiB2b2lkO1xuXG4gIG9uSW5pdD8oKTogdm9pZDtcbn1cblxuZXhwb3J0IGludGVyZmFjZSBDYXJkQ29uZmlnIHtcbiAgbnpTaXplPzogTnpTaXplRFNUeXBlO1xuICBuekhvdmVyYWJsZT86IGJvb2xlYW47XG4gIG56Qm9yZGVyZWQ/OiBib29sZWFuO1xuICBuekJvcmRlcmxlc3M/OiBib29sZWFuO1xufVxuXG5leHBvcnQgaW50ZXJmYWNlIENhcm91c2VsQ29uZmlnIHtcbiAgbnpBdXRvUGxheT86IGJvb2xlYW47XG4gIG56QXV0b1BsYXlTcGVlZD86IGJvb2xlYW47XG4gIG56RG90cz86IGJvb2xlYW47XG4gIG56RWZmZWN0PzogJ3Njcm9sbHgnIHwgJ2ZhZGUnIHwgc3RyaW5nO1xuICBuekVuYWJsZVN3aXBlPzogYm9vbGVhbjtcbiAgbnpWZXJ0aWNhbD86IGJvb2xlYW47XG59XG5cbmV4cG9ydCBpbnRlcmZhY2UgQ2FzY2FkZXJDb25maWcge1xuICBuelNpemU/OiBzdHJpbmc7XG4gIG56QmFja2Ryb3A/OiBib29sZWFuO1xufVxuXG5leHBvcnQgaW50ZXJmYWNlIENvbGxhcHNlQ29uZmlnIHtcbiAgbnpBY2NvcmRpb24/OiBib29sZWFuO1xuICBuekJvcmRlcmVkPzogYm9vbGVhbjtcbiAgbnpHaG9zdD86IGJvb2xlYW47XG59XG5cbmV4cG9ydCBpbnRlcmZhY2UgQ29sbGFwc2VQYW5lbENvbmZpZyB7XG4gIG56U2hvd0Fycm93PzogYm9vbGVhbjtcbn1cblxuZXhwb3J0IGludGVyZmFjZSBEYXRlUGlja2VyQ29uZmlnIHtcbiAgbnpTZXBhcmF0b3I/OiBzdHJpbmc7XG4gIG56U3VmZml4SWNvbj86IHN0cmluZyB8IFRlbXBsYXRlUmVmPE56U2FmZUFueT47XG4gIG56QmFja2Ryb3A/OiBib29sZWFuO1xufVxuXG5leHBvcnQgaW50ZXJmYWNlIERlc2NyaXB0aW9uc0NvbmZpZyB7XG4gIG56Qm9yZGVyZWQ/OiBib29sZWFuO1xuICBuekNvbHVtbj86IHsgW2tleSBpbiBOekJyZWFrcG9pbnRFbnVtXT86IG51bWJlciB9IHwgbnVtYmVyO1xuICBuelNpemU/OiAnZGVmYXVsdCcgfCAnbWlkZGxlJyB8ICdzbWFsbCc7XG4gIG56Q29sb24/OiBib29sZWFuO1xufVxuXG5leHBvcnQgaW50ZXJmYWNlIERyYXdlckNvbmZpZyB7XG4gIG56TWFzaz86IGJvb2xlYW47XG4gIG56TWFza0Nsb3NhYmxlPzogYm9vbGVhbjtcbiAgbnpDbG9zZU9uTmF2aWdhdGlvbj86IGJvb2xlYW47XG4gIG56RGlyZWN0aW9uPzogRGlyZWN0aW9uO1xufVxuXG5leHBvcnQgaW50ZXJmYWNlIERyb3BEb3duQ29uZmlnIHtcbiAgbnpCYWNrZHJvcD86IGJvb2xlYW47XG59XG5cbmV4cG9ydCBpbnRlcmZhY2UgRW1wdHlDb25maWcge1xuICBuekRlZmF1bHRFbXB0eUNvbnRlbnQ/OiBUeXBlPE56U2FmZUFueT4gfCBUZW1wbGF0ZVJlZjxzdHJpbmc+IHwgc3RyaW5nIHwgdW5kZWZpbmVkO1xufVxuXG5leHBvcnQgaW50ZXJmYWNlIEZpbHRlclRyaWdnZXJDb25maWcge1xuICBuekJhY2tkcm9wPzogYm9vbGVhbjtcbn1cblxuZXhwb3J0IGludGVyZmFjZSBGb3JtQ29uZmlnIHtcbiAgbnpOb0NvbG9uPzogYm9vbGVhbjtcbiAgbnpBdXRvVGlwcz86IFJlY29yZDxzdHJpbmcsIFJlY29yZDxzdHJpbmcsIHN0cmluZz4+O1xuICBuelRvb2x0aXBJY29uPzogc3RyaW5nIHwgeyB0eXBlOiBzdHJpbmc7IHRoZW1lOiBUaGVtZVR5cGUgfTtcbn1cblxuZXhwb3J0IGludGVyZmFjZSBJY29uQ29uZmlnIHtcbiAgbnpUaGVtZT86ICdmaWxsJyB8ICdvdXRsaW5lJyB8ICd0d290b25lJztcbiAgbnpUd290b25lQ29sb3I/OiBzdHJpbmc7XG59XG5cbmV4cG9ydCBpbnRlcmZhY2UgTWVzc2FnZUNvbmZpZyB7XG4gIG56QW5pbWF0ZT86IGJvb2xlYW47XG4gIG56RHVyYXRpb24/OiBudW1iZXI7XG4gIG56TWF4U3RhY2s/OiBudW1iZXI7XG4gIG56UGF1c2VPbkhvdmVyPzogYm9vbGVhbjtcbiAgbnpUb3A/OiBudW1iZXIgfCBzdHJpbmc7XG4gIG56RGlyZWN0aW9uPzogRGlyZWN0aW9uO1xufVxuXG5leHBvcnQgaW50ZXJmYWNlIE1vZGFsQ29uZmlnIHtcbiAgbnpNYXNrPzogYm9vbGVhbjtcbiAgbnpNYXNrQ2xvc2FibGU/OiBib29sZWFuO1xuICBuekNsb3NlT25OYXZpZ2F0aW9uPzogYm9vbGVhbjtcbiAgbnpEaXJlY3Rpb24/OiBEaXJlY3Rpb247XG59XG5cbmV4cG9ydCBpbnRlcmZhY2UgTm90aWZpY2F0aW9uQ29uZmlnIGV4dGVuZHMgTWVzc2FnZUNvbmZpZyB7XG4gIG56VG9wPzogc3RyaW5nIHwgbnVtYmVyO1xuICBuekJvdHRvbT86IHN0cmluZyB8IG51bWJlcjtcbiAgbnpQbGFjZW1lbnQ/OiAndG9wTGVmdCcgfCAndG9wUmlnaHQnIHwgJ2JvdHRvbUxlZnQnIHwgJ2JvdHRvbVJpZ2h0Jztcbn1cblxuZXhwb3J0IGludGVyZmFjZSBQYWdlSGVhZGVyQ29uZmlnIHtcbiAgbnpHaG9zdDogYm9vbGVhbjtcbn1cblxuZXhwb3J0IGludGVyZmFjZSBQYWdpbmF0aW9uQ29uZmlnIHtcbiAgbnpTaXplPzogJ2RlZmF1bHQnIHwgJ3NtYWxsJztcbiAgbnpQYWdlU2l6ZU9wdGlvbnM/OiBudW1iZXJbXTtcbiAgbnpTaG93U2l6ZUNoYW5nZXI/OiBib29sZWFuO1xuICBuelNob3dRdWlja0p1bXBlcj86IGJvb2xlYW47XG4gIG56U2ltcGxlPzogYm9vbGVhbjtcbn1cblxuZXhwb3J0IGludGVyZmFjZSBQcm9ncmVzc0NvbmZpZyB7XG4gIG56R2FwRGVncmVlPzogbnVtYmVyO1xuICBuekdhcFBvc2l0aW9uPzogJ3RvcCcgfCAncmlnaHQnIHwgJ2JvdHRvbScgfCAnbGVmdCc7XG4gIG56U2hvd0luZm8/OiBib29sZWFuO1xuICBuelN0cm9rZVN3aXRjaD86IG51bWJlcjtcbiAgbnpTdHJva2VXaWR0aD86IG51bWJlcjtcbiAgbnpTaXplPzogJ2RlZmF1bHQnIHwgJ3NtYWxsJztcbiAgbnpTdHJva2VMaW5lY2FwPzogJ3JvdW5kJyB8ICdzcXVhcmUnO1xuICBuelN0cm9rZUNvbG9yPzogc3RyaW5nO1xufVxuXG5leHBvcnQgaW50ZXJmYWNlIFJhdGVDb25maWcge1xuICBuekFsbG93Q2xlYXI/OiBib29sZWFuO1xuICBuekFsbG93SGFsZj86IGJvb2xlYW47XG59XG5cbmV4cG9ydCBpbnRlcmZhY2UgU3BhY2VDb25maWcge1xuICBuelNpemU/OiAnc21hbGwnIHwgJ21pZGRsZScgfCAnbGFyZ2UnIHwgbnVtYmVyO1xufVxuXG5leHBvcnQgaW50ZXJmYWNlIFNwaW5Db25maWcge1xuICBuekluZGljYXRvcj86IFRlbXBsYXRlUmVmPE56U2FmZUFueT47XG59XG5cbmV4cG9ydCBpbnRlcmZhY2UgU3dpdGNoQ29uZmlnIHtcbiAgbnpTaXplOiBOelNpemVEU1R5cGU7XG59XG5cbmV4cG9ydCBpbnRlcmZhY2UgVGFibGVDb25maWcge1xuICBuekJvcmRlcmVkPzogYm9vbGVhbjtcbiAgbnpTaXplPzogTnpTaXplTURTVHlwZTtcbiAgbnpTaG93UXVpY2tKdW1wZXI/OiBib29sZWFuO1xuICBuekxvYWRpbmdJbmRpY2F0b3I/OiBUZW1wbGF0ZVJlZjxOelNhZmVBbnk+O1xuICBuelNob3dTaXplQ2hhbmdlcj86IGJvb2xlYW47XG4gIG56U2ltcGxlPzogYm9vbGVhbjtcbiAgbnpIaWRlT25TaW5nbGVQYWdlPzogYm9vbGVhbjtcbn1cblxuZXhwb3J0IGludGVyZmFjZSBUYWJzQ29uZmlnIHtcbiAgbnpBbmltYXRlZD86XG4gICAgfCBib29sZWFuXG4gICAgfCB7XG4gICAgICAgIGlua0JhcjogYm9vbGVhbjtcbiAgICAgICAgdGFiUGFuZTogYm9vbGVhbjtcbiAgICAgIH07XG4gIG56U2l6ZT86IE56U2l6ZUxEU1R5cGU7XG4gIG56VHlwZT86ICdsaW5lJyB8ICdjYXJkJztcbiAgbnpUYWJCYXJHdXR0ZXI/OiBudW1iZXI7XG4gIG56U2hvd1BhZ2luYXRpb24/OiBib29sZWFuO1xufVxuXG5leHBvcnQgaW50ZXJmYWNlIFRpbWVQaWNrZXJDb25maWcge1xuICBuekFsbG93RW1wdHk/OiBib29sZWFuO1xuICBuekNsZWFyVGV4dD86IHN0cmluZztcbiAgbnpOb3dUZXh0Pzogc3RyaW5nO1xuICBuek9rVGV4dD86IHN0cmluZztcbiAgbnpGb3JtYXQ/OiBzdHJpbmc7XG4gIG56SG91clN0ZXA/OiBudW1iZXI7XG4gIG56TWludXRlU3RlcD86IG51bWJlcjtcbiAgbnpTZWNvbmRTdGVwPzogbnVtYmVyO1xuICBuelBvcHVwQ2xhc3NOYW1lPzogc3RyaW5nO1xuICBuelVzZTEySG91cnM/OiBzdHJpbmc7XG4gIG56U3VmZml4SWNvbj86IHN0cmluZyB8IFRlbXBsYXRlUmVmPE56U2FmZUFueT47XG4gIG56QmFja2Ryb3A/OiBib29sZWFuO1xufVxuXG5leHBvcnQgaW50ZXJmYWNlIFRyZWVDb25maWcge1xuICBuekJsb2NrTm9kZT86IGJvb2xlYW47XG4gIG56U2hvd0ljb24/OiBib29sZWFuO1xuICBuekhpZGVVbk1hdGNoZWQ/OiBib29sZWFuO1xufVxuXG5leHBvcnQgaW50ZXJmYWNlIFRyZWVTZWxlY3RDb25maWcge1xuICBuelNob3dJY29uPzogc3RyaW5nO1xuICBuelNob3dMaW5lPzogYm9vbGVhbjtcbiAgbnpEcm9wZG93bk1hdGNoU2VsZWN0V2lkdGg/OiBib29sZWFuO1xuICBuekhpZGVVbk1hdGNoZWQ/OiBib29sZWFuO1xuICBuelNpemU/OiAnbGFyZ2UnIHwgJ3NtYWxsJyB8ICdkZWZhdWx0JztcbiAgbnpCYWNrZHJvcD86IGJvb2xlYW47XG59XG5cbmV4cG9ydCBpbnRlcmZhY2UgVHlwb2dyYXBoeUNvbmZpZyB7XG4gIG56RWxsaXBzaXNSb3dzPzogbnVtYmVyO1xuICBuekNvcHlUb29sdGlwcz86IFtOelRTVHlwZSwgTnpUU1R5cGVdIHwgbnVsbDtcbiAgbnpDb3B5SWNvbnM6IFtOelRTVHlwZSwgTnpUU1R5cGVdO1xuICBuekVkaXRUb29sdGlwPzogbnVsbCB8IE56VFNUeXBlO1xuICBuekVkaXRJY29uOiBOelRTVHlwZTtcbn1cblxuZXhwb3J0IGludGVyZmFjZSBJbWFnZUNvbmZpZyB7XG4gIG56RmFsbGJhY2s/OiBzdHJpbmc7XG4gIG56UGxhY2Vob2xkZXI/OiBzdHJpbmc7XG4gIG56RGlzYWJsZVByZXZpZXc/OiBzdHJpbmc7XG4gIG56Q2xvc2VPbk5hdmlnYXRpb24/OiBib29sZWFuO1xuICBuekRpcmVjdGlvbj86IERpcmVjdGlvbjtcbn1cblxuZXhwb3J0IGludGVyZmFjZSBJbWFnZUV4cGVyaW1lbnRhbENvbmZpZyB7XG4gIG56RmFsbGJhY2s/OiBzdHJpbmc7XG4gIG56UGxhY2Vob2xkZXI/OiBzdHJpbmc7XG4gIG56RGlzYWJsZVByZXZpZXc/OiBzdHJpbmc7XG4gIG56Q2xvc2VPbk5hdmlnYXRpb24/OiBib29sZWFuO1xuICBuekRpcmVjdGlvbj86IERpcmVjdGlvbjtcbiAgbnpBdXRvU3Jjc2V0PzogYm9vbGVhbjtcbiAgbnpTcmNMb2FkZXI/KHBhcmFtczogeyBzcmM6IHN0cmluZzsgd2lkdGg6IG51bWJlciB9KTogc3RyaW5nO1xufVxuXG5leHBvcnQgaW50ZXJmYWNlIFBvcENvbmZpcm1Db25maWcge1xuICBuelBvcGNvbmZpcm1CYWNrZHJvcD86IGJvb2xlYW47XG4gIG56QXV0b2ZvY3VzPzogbnVsbCB8ICdvaycgfCAnY2FuY2VsJztcbn1cblxuZXhwb3J0IGludGVyZmFjZSBQb3BvdmVyQ29uZmlnIHtcbiAgbnpQb3BvdmVyQmFja2Ryb3A/OiBib29sZWFuO1xufVxuXG5leHBvcnQgdHlwZSBOekNvbmZpZ0tleSA9IGtleW9mIE56Q29uZmlnO1xuXG4vKipcbiAqIFVzZXIgc2hvdWxkIHByb3ZpZGUgYW4gb2JqZWN0IGltcGxlbWVudHMgdGhpcyBpbnRlcmZhY2UgdG8gc2V0IGdsb2JhbCBjb25maWd1cmF0aW9ucy5cbiAqL1xuZXhwb3J0IGNvbnN0IE5aX0NPTkZJRyA9IG5ldyBJbmplY3Rpb25Ub2tlbjxOekNvbmZpZz4oJ256LWNvbmZpZycpO1xuIl19