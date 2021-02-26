/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */
import { InjectionToken } from '@angular/core';
/**
 * User should provide an object implements this interface to set global configurations.
 */
export const NZ_CONFIG = new InjectionToken('nz-config');
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29uZmlnLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vY29tcG9uZW50cy9jb3JlL2NvbmZpZy9jb25maWcudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7OztHQUdHO0FBR0gsT0FBTyxFQUFFLGNBQWMsRUFBcUIsTUFBTSxlQUFlLENBQUM7QUF3U2xFOztHQUVHO0FBQ0gsTUFBTSxDQUFDLE1BQU0sU0FBUyxHQUFHLElBQUksY0FBYyxDQUFXLFdBQVcsQ0FBQyxDQUFDIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKiBVc2Ugb2YgdGhpcyBzb3VyY2UgY29kZSBpcyBnb3Zlcm5lZCBieSBhbiBNSVQtc3R5bGUgbGljZW5zZSB0aGF0IGNhbiBiZVxuICogZm91bmQgaW4gdGhlIExJQ0VOU0UgZmlsZSBhdCBodHRwczovL2dpdGh1Yi5jb20vTkctWk9SUk8vbmctem9ycm8tYW50ZC9ibG9iL21hc3Rlci9MSUNFTlNFXG4gKi9cblxuaW1wb3J0IHsgRGlyZWN0aW9uIH0gZnJvbSAnQGFuZ3VsYXIvY2RrL2JpZGknO1xuaW1wb3J0IHsgSW5qZWN0aW9uVG9rZW4sIFRlbXBsYXRlUmVmLCBUeXBlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5cbmltcG9ydCB7IFNhZmVVcmwgfSBmcm9tICdAYW5ndWxhci9wbGF0Zm9ybS1icm93c2VyJztcbmltcG9ydCB7IFRoZW1lVHlwZSB9IGZyb20gJ0BhbnQtZGVzaWduL2ljb25zLWFuZ3VsYXInO1xuaW1wb3J0IHsgTnpCcmVha3BvaW50RW51bSB9IGZyb20gJ25nLXpvcnJvLWFudGQvY29yZS9zZXJ2aWNlcyc7XG5pbXBvcnQgeyBOelNhZmVBbnksIE56U2hhcGVTQ1R5cGUsIE56U2l6ZURTVHlwZSwgTnpTaXplTERTVHlwZSwgTnpTaXplTURTVHlwZSwgTnpUU1R5cGUgfSBmcm9tICduZy16b3Jyby1hbnRkL2NvcmUvdHlwZXMnO1xuXG5leHBvcnQgaW50ZXJmYWNlIE56Q29uZmlnIHtcbiAgYWZmaXg/OiBBZmZpeENvbmZpZztcbiAgc2VsZWN0PzogU2VsZWN0Q29uZmlnO1xuICBhbGVydD86IEFsZXJ0Q29uZmlnO1xuICBhbmNob3I/OiBBbmNob3JDb25maWc7XG4gIGF2YXRhcj86IEF2YXRhckNvbmZpZztcbiAgYmFja1RvcD86IEJhY2tUb3BDb25maWc7XG4gIGJhZGdlPzogQmFkZ2VDb25maWc7XG4gIGJ1dHRvbj86IEJ1dHRvbkNvbmZpZztcbiAgY2FyZD86IENhcmRDb25maWc7XG4gIGNhcm91c2VsPzogQ2Fyb3VzZWxDb25maWc7XG4gIGNhc2NhZGVyPzogQ2FzY2FkZXJDb25maWc7XG4gIGNvZGVFZGl0b3I/OiBDb2RlRWRpdG9yQ29uZmlnO1xuICBjb2xsYXBzZT86IENvbGxhcHNlQ29uZmlnO1xuICBjb2xsYXBzZVBhbmVsPzogQ29sbGFwc2VQYW5lbENvbmZpZztcbiAgZGF0ZVBpY2tlcj86IERhdGVQaWNrZXJDb25maWc7XG4gIGRlc2NyaXB0aW9ucz86IERlc2NyaXB0aW9uc0NvbmZpZztcbiAgZHJhd2VyPzogRHJhd2VyQ29uZmlnO1xuICBlbXB0eT86IEVtcHR5Q29uZmlnO1xuICBmb3JtPzogRm9ybUNvbmZpZztcbiAgaWNvbj86IEljb25Db25maWc7XG4gIG1lc3NhZ2U/OiBNZXNzYWdlQ29uZmlnO1xuICBtb2RhbD86IE1vZGFsQ29uZmlnO1xuICBub3RpZmljYXRpb24/OiBOb3RpZmljYXRpb25Db25maWc7XG4gIHBhZ2VIZWFkZXI/OiBQYWdlSGVhZGVyQ29uZmlnO1xuICBwYWdpbmF0aW9uPzogUGFnaW5hdGlvbkNvbmZpZztcbiAgcHJvZ3Jlc3M/OiBQcm9ncmVzc0NvbmZpZztcbiAgcmF0ZT86IFJhdGVDb25maWc7XG4gIHNwYWNlPzogU3BhY2VDb25maWc7XG4gIHNwaW4/OiBTcGluQ29uZmlnO1xuICBzd2l0Y2g/OiBTd2l0Y2hDb25maWc7XG4gIHRhYmxlPzogVGFibGVDb25maWc7XG4gIHRhYnM/OiBUYWJzQ29uZmlnO1xuICB0aW1lUGlja2VyPzogVGltZVBpY2tlckNvbmZpZztcbiAgdHJlZT86IFRyZWVDb25maWc7XG4gIHRyZWVTZWxlY3Q/OiBUcmVlU2VsZWN0Q29uZmlnO1xuICB0eXBvZ3JhcGh5PzogVHlwb2dyYXBoeUNvbmZpZztcbiAgaW1hZ2U/OiBJbWFnZUNvbmZpZztcbn1cblxuZXhwb3J0IGludGVyZmFjZSBTZWxlY3RDb25maWcge1xuICBuekJvcmRlcmxlc3M/OiBib29sZWFuO1xuICBuelN1ZmZpeEljb24/OiBUZW1wbGF0ZVJlZjxOelNhZmVBbnk+IHwgc3RyaW5nIHwgbnVsbDtcbn1cblxuZXhwb3J0IGludGVyZmFjZSBBZmZpeENvbmZpZyB7XG4gIG56T2Zmc2V0Qm90dG9tPzogbnVtYmVyO1xuICBuek9mZnNldFRvcD86IG51bWJlcjtcbn1cblxuZXhwb3J0IGludGVyZmFjZSBBbGVydENvbmZpZyB7XG4gIG56Q2xvc2VhYmxlPzogYm9vbGVhbjtcbiAgbnpTaG93SWNvbj86IGJvb2xlYW47XG59XG5cbmV4cG9ydCBpbnRlcmZhY2UgQXZhdGFyQ29uZmlnIHtcbiAgbnpTaGFwZT86IE56U2hhcGVTQ1R5cGU7XG4gIG56U2l6ZT86IE56U2l6ZUxEU1R5cGUgfCBudW1iZXI7XG4gIG56R2FwPzogbnVtYmVyO1xufVxuXG5leHBvcnQgaW50ZXJmYWNlIEFuY2hvckNvbmZpZyB7XG4gIG56Qm91bmRzPzogbnVtYmVyO1xuICBuek9mZnNldEJvdHRvbT86IG51bWJlcjtcbiAgbnpPZmZzZXRUb3A/OiBudW1iZXI7XG4gIG56U2hvd0lua0luRml4ZWQ/OiBib29sZWFuO1xufVxuXG5leHBvcnQgaW50ZXJmYWNlIEJhY2tUb3BDb25maWcge1xuICBuelZpc2liaWxpdHlIZWlnaHQ/OiBudW1iZXI7XG59XG5cbmV4cG9ydCBpbnRlcmZhY2UgQmFkZ2VDb25maWcge1xuICBuekNvbG9yPzogbnVtYmVyO1xuICBuek92ZXJmbG93Q291bnQ/OiBudW1iZXI7XG4gIG56U2hvd1plcm8/OiBudW1iZXI7XG59XG5cbmV4cG9ydCBpbnRlcmZhY2UgQnV0dG9uQ29uZmlnIHtcbiAgbnpTaXplPzogJ2xhcmdlJyB8ICdkZWZhdWx0JyB8ICdzbWFsbCc7XG59XG5cbmV4cG9ydCBpbnRlcmZhY2UgQ29kZUVkaXRvckNvbmZpZyB7XG4gIGFzc2V0c1Jvb3Q/OiBzdHJpbmcgfCBTYWZlVXJsO1xuICBkZWZhdWx0RWRpdG9yT3B0aW9uPzogTnpTYWZlQW55O1xuICB1c2VTdGF0aWNMb2FkaW5nPzogYm9vbGVhbjtcblxuICBvbkxvYWQ/KCk6IHZvaWQ7XG5cbiAgb25GaXJzdEVkaXRvckluaXQ/KCk6IHZvaWQ7XG5cbiAgb25Jbml0PygpOiB2b2lkO1xufVxuXG5leHBvcnQgaW50ZXJmYWNlIENhcmRDb25maWcge1xuICBuelNpemU/OiBOelNpemVEU1R5cGU7XG4gIG56SG92ZXJhYmxlPzogYm9vbGVhbjtcbiAgbnpCb3JkZXJlZD86IGJvb2xlYW47XG4gIG56Qm9yZGVybGVzcz86IGJvb2xlYW47XG59XG5cbmV4cG9ydCBpbnRlcmZhY2UgQ2Fyb3VzZWxDb25maWcge1xuICBuekF1dG9QbGF5PzogYm9vbGVhbjtcbiAgbnpBdXRvUGxheVNwZWVkPzogYm9vbGVhbjtcbiAgbnpEb3RzPzogYm9vbGVhbjtcbiAgbnpFZmZlY3Q/OiAnc2Nyb2xseCcgfCAnZmFkZScgfCBzdHJpbmc7XG4gIG56RW5hYmxlU3dpcGU/OiBib29sZWFuO1xuICBuelZlcnRpY2FsPzogYm9vbGVhbjtcbn1cblxuZXhwb3J0IGludGVyZmFjZSBDYXNjYWRlckNvbmZpZyB7XG4gIG56U2l6ZT86IHN0cmluZztcbn1cblxuZXhwb3J0IGludGVyZmFjZSBDb2xsYXBzZUNvbmZpZyB7XG4gIG56QWNjb3JkaW9uPzogYm9vbGVhbjtcbiAgbnpCb3JkZXJlZD86IGJvb2xlYW47XG4gIG56R2hvc3Q/OiBib29sZWFuO1xufVxuXG5leHBvcnQgaW50ZXJmYWNlIENvbGxhcHNlUGFuZWxDb25maWcge1xuICBuelNob3dBcnJvdz86IGJvb2xlYW47XG59XG5cbmV4cG9ydCBpbnRlcmZhY2UgRGF0ZVBpY2tlckNvbmZpZyB7XG4gIG56U2VwYXJhdG9yPzogc3RyaW5nO1xuICBuelN1ZmZpeEljb24/OiBzdHJpbmcgfCBUZW1wbGF0ZVJlZjxOelNhZmVBbnk+O1xufVxuXG5leHBvcnQgaW50ZXJmYWNlIERlc2NyaXB0aW9uc0NvbmZpZyB7XG4gIG56Qm9yZGVyZWQ/OiBib29sZWFuO1xuICBuekNvbHVtbj86IHsgW2tleSBpbiBOekJyZWFrcG9pbnRFbnVtXT86IG51bWJlciB9IHwgbnVtYmVyO1xuICBuelNpemU/OiAnZGVmYXVsdCcgfCAnbWlkZGxlJyB8ICdzbWFsbCc7XG4gIG56Q29sb24/OiBib29sZWFuO1xufVxuXG5leHBvcnQgaW50ZXJmYWNlIERyYXdlckNvbmZpZyB7XG4gIG56TWFzaz86IGJvb2xlYW47XG4gIG56TWFza0Nsb3NhYmxlPzogYm9vbGVhbjtcbiAgbnpDbG9zZU9uTmF2aWdhdGlvbj86IGJvb2xlYW47XG4gIG56RGlyZWN0aW9uPzogRGlyZWN0aW9uO1xufVxuXG5leHBvcnQgaW50ZXJmYWNlIEVtcHR5Q29uZmlnIHtcbiAgbnpEZWZhdWx0RW1wdHlDb250ZW50PzogVHlwZTxOelNhZmVBbnk+IHwgVGVtcGxhdGVSZWY8c3RyaW5nPiB8IHN0cmluZyB8IHVuZGVmaW5lZDtcbn1cblxuZXhwb3J0IGludGVyZmFjZSBGb3JtQ29uZmlnIHtcbiAgbnpOb0NvbG9uPzogYm9vbGVhbjtcbiAgbnpBdXRvVGlwcz86IFJlY29yZDxzdHJpbmcsIFJlY29yZDxzdHJpbmcsIHN0cmluZz4+O1xuICBuelRvb2x0aXBJY29uPzogc3RyaW5nIHwgeyB0eXBlOiBzdHJpbmc7IHRoZW1lOiBUaGVtZVR5cGUgfTtcbn1cblxuZXhwb3J0IGludGVyZmFjZSBJY29uQ29uZmlnIHtcbiAgbnpUaGVtZT86ICdmaWxsJyB8ICdvdXRsaW5lJyB8ICd0d290b25lJztcbiAgbnpUd290b25lQ29sb3I/OiBzdHJpbmc7XG59XG5cbmV4cG9ydCBpbnRlcmZhY2UgTWVzc2FnZUNvbmZpZyB7XG4gIG56QW5pbWF0ZT86IGJvb2xlYW47XG4gIG56RHVyYXRpb24/OiBudW1iZXI7XG4gIG56TWF4U3RhY2s/OiBudW1iZXI7XG4gIG56UGF1c2VPbkhvdmVyPzogYm9vbGVhbjtcbiAgbnpUb3A/OiBudW1iZXIgfCBzdHJpbmc7XG4gIG56RGlyZWN0aW9uPzogRGlyZWN0aW9uO1xufVxuXG5leHBvcnQgaW50ZXJmYWNlIE1vZGFsQ29uZmlnIHtcbiAgbnpNYXNrPzogYm9vbGVhbjtcbiAgbnpNYXNrQ2xvc2FibGU/OiBib29sZWFuO1xuICBuekNsb3NlT25OYXZpZ2F0aW9uPzogYm9vbGVhbjtcbiAgbnpEaXJlY3Rpb24/OiBEaXJlY3Rpb247XG59XG5cbmV4cG9ydCBpbnRlcmZhY2UgTm90aWZpY2F0aW9uQ29uZmlnIGV4dGVuZHMgTWVzc2FnZUNvbmZpZyB7XG4gIG56VG9wPzogc3RyaW5nIHwgbnVtYmVyO1xuICBuekJvdHRvbT86IHN0cmluZyB8IG51bWJlcjtcbiAgbnpQbGFjZW1lbnQ/OiAndG9wTGVmdCcgfCAndG9wUmlnaHQnIHwgJ2JvdHRvbUxlZnQnIHwgJ2JvdHRvbVJpZ2h0Jztcbn1cblxuZXhwb3J0IGludGVyZmFjZSBQYWdlSGVhZGVyQ29uZmlnIHtcbiAgbnpHaG9zdDogYm9vbGVhbjtcbn1cblxuZXhwb3J0IGludGVyZmFjZSBQYWdpbmF0aW9uQ29uZmlnIHtcbiAgbnpTaXplPzogJ2RlZmF1bHQnIHwgJ3NtYWxsJztcbiAgbnpQYWdlU2l6ZU9wdGlvbnM/OiBudW1iZXJbXTtcbiAgbnpTaG93U2l6ZUNoYW5nZXI/OiBib29sZWFuO1xuICBuelNob3dRdWlja0p1bXBlcj86IGJvb2xlYW47XG4gIG56U2ltcGxlPzogYm9vbGVhbjtcbn1cblxuZXhwb3J0IGludGVyZmFjZSBQcm9ncmVzc0NvbmZpZyB7XG4gIG56R2FwRGVncmVlPzogbnVtYmVyO1xuICBuekdhcFBvc2l0aW9uPzogJ3RvcCcgfCAncmlnaHQnIHwgJ2JvdHRvbScgfCAnbGVmdCc7XG4gIG56U2hvd0luZm8/OiBib29sZWFuO1xuICBuelN0cm9rZVN3aXRjaD86IG51bWJlcjtcbiAgbnpTdHJva2VXaWR0aD86IG51bWJlcjtcbiAgbnpTaXplPzogJ2RlZmF1bHQnIHwgJ3NtYWxsJztcbiAgbnpTdHJva2VMaW5lY2FwPzogJ3JvdW5kJyB8ICdzcXVhcmUnO1xuICBuelN0cm9rZUNvbG9yPzogc3RyaW5nO1xufVxuXG5leHBvcnQgaW50ZXJmYWNlIFJhdGVDb25maWcge1xuICBuekFsbG93Q2xlYXI/OiBib29sZWFuO1xuICBuekFsbG93SGFsZj86IGJvb2xlYW47XG59XG5cbmV4cG9ydCBpbnRlcmZhY2UgU3BhY2VDb25maWcge1xuICBuelNpemU/OiAnc21hbGwnIHwgJ21pZGRsZScgfCAnbGFyZ2UnIHwgbnVtYmVyO1xufVxuXG5leHBvcnQgaW50ZXJmYWNlIFNwaW5Db25maWcge1xuICBuekluZGljYXRvcj86IFRlbXBsYXRlUmVmPE56U2FmZUFueT47XG59XG5cbmV4cG9ydCBpbnRlcmZhY2UgU3dpdGNoQ29uZmlnIHtcbiAgbnpTaXplOiBOelNpemVEU1R5cGU7XG59XG5cbmV4cG9ydCBpbnRlcmZhY2UgVGFibGVDb25maWcge1xuICBuekJvcmRlcmVkPzogYm9vbGVhbjtcbiAgbnpTaXplPzogTnpTaXplTURTVHlwZTtcbiAgbnpTaG93UXVpY2tKdW1wZXI/OiBib29sZWFuO1xuICBuekxvYWRpbmdJbmRpY2F0b3I/OiBUZW1wbGF0ZVJlZjxOelNhZmVBbnk+O1xuICBuelNob3dTaXplQ2hhbmdlcj86IGJvb2xlYW47XG4gIG56U2ltcGxlPzogYm9vbGVhbjtcbiAgbnpIaWRlT25TaW5nbGVQYWdlPzogYm9vbGVhbjtcbn1cblxuZXhwb3J0IGludGVyZmFjZSBUYWJzQ29uZmlnIHtcbiAgbnpBbmltYXRlZD86XG4gICAgfCBib29sZWFuXG4gICAgfCB7XG4gICAgICAgIGlua0JhcjogYm9vbGVhbjtcbiAgICAgICAgdGFiUGFuZTogYm9vbGVhbjtcbiAgICAgIH07XG4gIG56U2l6ZT86IE56U2l6ZUxEU1R5cGU7XG4gIG56VHlwZT86ICdsaW5lJyB8ICdjYXJkJztcbiAgbnpUYWJCYXJHdXR0ZXI/OiBudW1iZXI7XG4gIG56U2hvd1BhZ2luYXRpb24/OiBib29sZWFuO1xufVxuXG5leHBvcnQgaW50ZXJmYWNlIFRpbWVQaWNrZXJDb25maWcge1xuICBuekFsbG93RW1wdHk/OiBib29sZWFuO1xuICBuekNsZWFyVGV4dD86IHN0cmluZztcbiAgbnpOb3dUZXh0Pzogc3RyaW5nO1xuICBuek9rVGV4dD86IHN0cmluZztcbiAgbnpGb3JtYXQ/OiBzdHJpbmc7XG4gIG56SG91clN0ZXA/OiBudW1iZXI7XG4gIG56TWludXRlU3RlcD86IG51bWJlcjtcbiAgbnpTZWNvbmRTdGVwPzogbnVtYmVyO1xuICBuelBvcHVwQ2xhc3NOYW1lPzogc3RyaW5nO1xuICBuelVzZTEySG91cnM/OiBzdHJpbmc7XG4gIG56U3VmZml4SWNvbj86IHN0cmluZyB8IFRlbXBsYXRlUmVmPE56U2FmZUFueT47XG59XG5cbmV4cG9ydCBpbnRlcmZhY2UgVHJlZUNvbmZpZyB7XG4gIG56QmxvY2tOb2RlPzogYm9vbGVhbjtcbiAgbnpTaG93SWNvbj86IGJvb2xlYW47XG4gIG56SGlkZVVuTWF0Y2hlZD86IGJvb2xlYW47XG59XG5cbmV4cG9ydCBpbnRlcmZhY2UgVHJlZVNlbGVjdENvbmZpZyB7XG4gIG56U2hvd0ljb24/OiBzdHJpbmc7XG4gIG56U2hvd0xpbmU/OiBib29sZWFuO1xuICBuekRyb3Bkb3duTWF0Y2hTZWxlY3RXaWR0aD86IGJvb2xlYW47XG4gIG56SGlkZVVuTWF0Y2hlZD86IGJvb2xlYW47XG4gIG56U2l6ZT86ICdsYXJnZScgfCAnc21hbGwnIHwgJ2RlZmF1bHQnO1xufVxuXG5leHBvcnQgaW50ZXJmYWNlIFR5cG9ncmFwaHlDb25maWcge1xuICBuekVsbGlwc2lzUm93cz86IG51bWJlcjtcbiAgbnpDb3B5VG9vbHRpcHM/OiBbTnpUU1R5cGUsIE56VFNUeXBlXSB8IG51bGw7XG4gIG56Q29weUljb25zOiBbTnpUU1R5cGUsIE56VFNUeXBlXTtcbiAgbnpFZGl0VG9vbHRpcD86IG51bGwgfCBOelRTVHlwZTtcbiAgbnpFZGl0SWNvbjogTnpUU1R5cGU7XG59XG5cbmV4cG9ydCBpbnRlcmZhY2UgSW1hZ2VDb25maWcge1xuICBuekZhbGxiYWNrPzogc3RyaW5nO1xuICBuelBsYWNlaG9sZGVyPzogc3RyaW5nO1xuICBuekRpc2FibGVQcmV2aWV3Pzogc3RyaW5nO1xuICBuekNsb3NlT25OYXZpZ2F0aW9uPzogYm9vbGVhbjtcbiAgbnpEaXJlY3Rpb24/OiBEaXJlY3Rpb247XG59XG5cbmV4cG9ydCB0eXBlIE56Q29uZmlnS2V5ID0ga2V5b2YgTnpDb25maWc7XG5cbi8qKlxuICogVXNlciBzaG91bGQgcHJvdmlkZSBhbiBvYmplY3QgaW1wbGVtZW50cyB0aGlzIGludGVyZmFjZSB0byBzZXQgZ2xvYmFsIGNvbmZpZ3VyYXRpb25zLlxuICovXG5leHBvcnQgY29uc3QgTlpfQ09ORklHID0gbmV3IEluamVjdGlvblRva2VuPE56Q29uZmlnPignbnotY29uZmlnJyk7XG4iXX0=