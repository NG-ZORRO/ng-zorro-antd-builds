/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */
import { InjectionToken } from '@angular/core';
/**
 * User should provide an object implements this interface to set global configurations.
 */
export const NZ_CONFIG = new InjectionToken('nz-config');
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29uZmlnLmpzIiwic291cmNlUm9vdCI6Ii9ob21lL3ZzdHMvd29yay8xL3MvY29tcG9uZW50cy9jb3JlL2NvbmZpZy8iLCJzb3VyY2VzIjpbImNvbmZpZy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7O0dBR0c7QUFFSCxPQUFPLEVBQUUsY0FBYyxFQUFxQixNQUFNLGVBQWUsQ0FBQztBQStRbEU7O0dBRUc7QUFDSCxNQUFNLENBQUMsTUFBTSxTQUFTLEdBQUcsSUFBSSxjQUFjLENBQVcsV0FBVyxDQUFDLENBQUMiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqIFVzZSBvZiB0aGlzIHNvdXJjZSBjb2RlIGlzIGdvdmVybmVkIGJ5IGFuIE1JVC1zdHlsZSBsaWNlbnNlIHRoYXQgY2FuIGJlXG4gKiBmb3VuZCBpbiB0aGUgTElDRU5TRSBmaWxlIGF0IGh0dHBzOi8vZ2l0aHViLmNvbS9ORy1aT1JSTy9uZy16b3Jyby1hbnRkL2Jsb2IvbWFzdGVyL0xJQ0VOU0VcbiAqL1xuXG5pbXBvcnQgeyBJbmplY3Rpb25Ub2tlbiwgVGVtcGxhdGVSZWYsIFR5cGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcblxuaW1wb3J0IHsgU2FmZVVybCB9IGZyb20gJ0Bhbmd1bGFyL3BsYXRmb3JtLWJyb3dzZXInO1xuaW1wb3J0IHsgVGhlbWVUeXBlIH0gZnJvbSAnQGFudC1kZXNpZ24vaWNvbnMtYW5ndWxhcic7XG5pbXBvcnQgeyBOekJyZWFrcG9pbnRFbnVtIH0gZnJvbSAnbmctem9ycm8tYW50ZC9jb3JlL3NlcnZpY2VzJztcbmltcG9ydCB7IE56U2FmZUFueSwgTnpTaGFwZVNDVHlwZSwgTnpTaXplRFNUeXBlLCBOelNpemVMRFNUeXBlLCBOelNpemVNRFNUeXBlLCBOelRTVHlwZSB9IGZyb20gJ25nLXpvcnJvLWFudGQvY29yZS90eXBlcyc7XG5cbmV4cG9ydCBpbnRlcmZhY2UgTnpDb25maWcge1xuICBhZmZpeD86IEFmZml4Q29uZmlnO1xuICBzZWxlY3Q/OiBTZWxlY3RDb25maWc7XG4gIGFsZXJ0PzogQWxlcnRDb25maWc7XG4gIGFuY2hvcj86IEFuY2hvckNvbmZpZztcbiAgYXZhdGFyPzogQXZhdGFyQ29uZmlnO1xuICBiYWNrVG9wPzogQmFja1RvcENvbmZpZztcbiAgYmFkZ2U/OiBCYWRnZUNvbmZpZztcbiAgYnV0dG9uPzogQnV0dG9uQ29uZmlnO1xuICBjYXJkPzogQ2FyZENvbmZpZztcbiAgY2Fyb3VzZWw/OiBDYXJvdXNlbENvbmZpZztcbiAgY2FzY2FkZXI/OiBDYXNjYWRlckNvbmZpZztcbiAgY29kZUVkaXRvcj86IENvZGVFZGl0b3JDb25maWc7XG4gIGNvbGxhcHNlPzogQ29sbGFwc2VDb25maWc7XG4gIGNvbGxhcHNlUGFuZWw/OiBDb2xsYXBzZVBhbmVsQ29uZmlnO1xuICBkYXRlUGlja2VyPzogRGF0ZVBpY2tlckNvbmZpZztcbiAgZGVzY3JpcHRpb25zPzogRGVzY3JpcHRpb25zQ29uZmlnO1xuICBkcmF3ZXI/OiBEcmF3ZXJDb25maWc7XG4gIGVtcHR5PzogRW1wdHlDb25maWc7XG4gIGZvcm0/OiBGb3JtQ29uZmlnO1xuICBpY29uPzogSWNvbkNvbmZpZztcbiAgbWVzc2FnZT86IE1lc3NhZ2VDb25maWc7XG4gIG1vZGFsPzogTW9kYWxDb25maWc7XG4gIG5vdGlmaWNhdGlvbj86IE5vdGlmaWNhdGlvbkNvbmZpZztcbiAgcGFnZUhlYWRlcj86IFBhZ2VIZWFkZXJDb25maWc7XG4gIHByb2dyZXNzPzogUHJvZ3Jlc3NDb25maWc7XG4gIHJhdGU/OiBSYXRlQ29uZmlnO1xuICBzcGFjZT86IFNwYWNlQ29uZmlnO1xuICBzcGluPzogU3BpbkNvbmZpZztcbiAgc3dpdGNoPzogU3dpdGNoQ29uZmlnO1xuICB0YWJsZT86IFRhYmxlQ29uZmlnO1xuICB0YWJzPzogVGFic0NvbmZpZztcbiAgdGltZVBpY2tlcj86IFRpbWVQaWNrZXJDb25maWc7XG4gIHRyZWU/OiBUcmVlQ29uZmlnO1xuICB0cmVlU2VsZWN0PzogVHJlZVNlbGVjdENvbmZpZztcbiAgdHlwb2dyYXBoeT86IFR5cG9ncmFwaHlDb25maWc7XG59XG5cbmV4cG9ydCBpbnRlcmZhY2UgU2VsZWN0Q29uZmlnIHtcbiAgbnpCb3JkZXJsZXNzPzogYm9vbGVhbjtcbiAgbnpTdWZmaXhJY29uPzogVGVtcGxhdGVSZWY8TnpTYWZlQW55PiB8IHN0cmluZyB8IG51bGw7XG59XG5cbmV4cG9ydCBpbnRlcmZhY2UgQWZmaXhDb25maWcge1xuICBuek9mZnNldEJvdHRvbT86IG51bWJlcjtcbiAgbnpPZmZzZXRUb3A/OiBudW1iZXI7XG59XG5cbmV4cG9ydCBpbnRlcmZhY2UgQWxlcnRDb25maWcge1xuICBuekNsb3NlYWJsZT86IGJvb2xlYW47XG4gIG56U2hvd0ljb24/OiBib29sZWFuO1xufVxuXG5leHBvcnQgaW50ZXJmYWNlIEF2YXRhckNvbmZpZyB7XG4gIG56U2hhcGU/OiBOelNoYXBlU0NUeXBlO1xuICBuelNpemU/OiBOelNpemVMRFNUeXBlIHwgbnVtYmVyO1xuICBuekdhcD86IG51bWJlcjtcbn1cblxuZXhwb3J0IGludGVyZmFjZSBBbmNob3JDb25maWcge1xuICBuekJvdW5kcz86IG51bWJlcjtcbiAgbnpPZmZzZXRCb3R0b20/OiBudW1iZXI7XG4gIG56T2Zmc2V0VG9wPzogbnVtYmVyO1xuICBuelNob3dJbmtJbkZpeGVkPzogYm9vbGVhbjtcbn1cblxuZXhwb3J0IGludGVyZmFjZSBCYWNrVG9wQ29uZmlnIHtcbiAgbnpWaXNpYmlsaXR5SGVpZ2h0PzogbnVtYmVyO1xufVxuXG5leHBvcnQgaW50ZXJmYWNlIEJhZGdlQ29uZmlnIHtcbiAgbnpDb2xvcj86IG51bWJlcjtcbiAgbnpPdmVyZmxvd0NvdW50PzogbnVtYmVyO1xuICBuelNob3daZXJvPzogbnVtYmVyO1xufVxuXG5leHBvcnQgaW50ZXJmYWNlIEJ1dHRvbkNvbmZpZyB7XG4gIG56U2l6ZT86ICdsYXJnZScgfCAnZGVmYXVsdCcgfCAnc21hbGwnO1xufVxuXG5leHBvcnQgaW50ZXJmYWNlIENvZGVFZGl0b3JDb25maWcge1xuICBhc3NldHNSb290Pzogc3RyaW5nIHwgU2FmZVVybDtcbiAgZGVmYXVsdEVkaXRvck9wdGlvbj86IE56U2FmZUFueTtcbiAgdXNlU3RhdGljTG9hZGluZz86IGJvb2xlYW47XG5cbiAgb25Mb2FkPygpOiB2b2lkO1xuICBvbkZpcnN0RWRpdG9ySW5pdD8oKTogdm9pZDtcbiAgb25Jbml0PygpOiB2b2lkO1xufVxuXG5leHBvcnQgaW50ZXJmYWNlIENhcmRDb25maWcge1xuICBuelNpemU/OiBOelNpemVEU1R5cGU7XG4gIG56SG92ZXJhYmxlPzogYm9vbGVhbjtcbiAgbnpCb3JkZXJlZD86IGJvb2xlYW47XG4gIG56Qm9yZGVybGVzcz86IGJvb2xlYW47XG59XG5cbmV4cG9ydCBpbnRlcmZhY2UgQ2Fyb3VzZWxDb25maWcge1xuICBuekF1dG9QbGF5PzogYm9vbGVhbjtcbiAgbnpBdXRvUGxheVNwZWVkPzogYm9vbGVhbjtcbiAgbnpEb3RzPzogYm9vbGVhbjtcbiAgbnpFZmZlY3Q/OiAnc2Nyb2xseCcgfCAnZmFkZScgfCBzdHJpbmc7XG4gIG56RW5hYmxlU3dpcGU/OiBib29sZWFuO1xuICBuelZlcnRpY2FsPzogYm9vbGVhbjtcbn1cblxuZXhwb3J0IGludGVyZmFjZSBDYXNjYWRlckNvbmZpZyB7XG4gIG56U2l6ZT86IHN0cmluZztcbn1cblxuZXhwb3J0IGludGVyZmFjZSBDb2xsYXBzZUNvbmZpZyB7XG4gIG56QWNjb3JkaW9uPzogYm9vbGVhbjtcbiAgbnpCb3JkZXJlZD86IGJvb2xlYW47XG4gIG56R2hvc3Q/OiBib29sZWFuO1xufVxuXG5leHBvcnQgaW50ZXJmYWNlIENvbGxhcHNlUGFuZWxDb25maWcge1xuICBuelNob3dBcnJvdz86IGJvb2xlYW47XG59XG5cbmV4cG9ydCBpbnRlcmZhY2UgRGF0ZVBpY2tlckNvbmZpZyB7XG4gIG56U2VwYXJhdG9yPzogc3RyaW5nO1xuICBuelN1ZmZpeEljb24/OiBzdHJpbmcgfCBUZW1wbGF0ZVJlZjxOelNhZmVBbnk+O1xufVxuXG5leHBvcnQgaW50ZXJmYWNlIERlc2NyaXB0aW9uc0NvbmZpZyB7XG4gIG56Qm9yZGVyPzogYm9vbGVhbjtcbiAgbnpDb2x1bW4/OiB7IFtrZXkgaW4gTnpCcmVha3BvaW50RW51bV0/OiBudW1iZXIgfSB8IG51bWJlcjtcbiAgbnpTaXplPzogJ2RlZmF1bHQnIHwgJ21pZGRsZScgfCAnc21hbGwnO1xuICBuekNvbG9uPzogYm9vbGVhbjtcbn1cblxuZXhwb3J0IGludGVyZmFjZSBEcmF3ZXJDb25maWcge1xuICBuek1hc2s/OiBib29sZWFuO1xuICBuek1hc2tDbG9zYWJsZT86IGJvb2xlYW47XG4gIG56Q2xvc2VPbk5hdmlnYXRpb24/OiBib29sZWFuO1xufVxuXG5leHBvcnQgaW50ZXJmYWNlIEVtcHR5Q29uZmlnIHtcbiAgbnpEZWZhdWx0RW1wdHlDb250ZW50PzogVHlwZTxOelNhZmVBbnk+IHwgVGVtcGxhdGVSZWY8c3RyaW5nPiB8IHN0cmluZyB8IHVuZGVmaW5lZDtcbn1cblxuZXhwb3J0IGludGVyZmFjZSBGb3JtQ29uZmlnIHtcbiAgbnpOb0NvbG9uPzogYm9vbGVhbjtcbiAgbnpBdXRvVGlwcz86IFJlY29yZDxzdHJpbmcsIFJlY29yZDxzdHJpbmcsIHN0cmluZz4+O1xuICBuelRvb2x0aXBJY29uPzogc3RyaW5nIHwgeyB0eXBlOiBzdHJpbmc7IHRoZW1lOiBUaGVtZVR5cGUgfTtcbn1cblxuZXhwb3J0IGludGVyZmFjZSBJY29uQ29uZmlnIHtcbiAgbnpUaGVtZT86ICdmaWxsJyB8ICdvdXRsaW5lJyB8ICd0d290b25lJztcbiAgbnpUd290b25lQ29sb3I/OiBzdHJpbmc7XG59XG5cbmV4cG9ydCBpbnRlcmZhY2UgTWVzc2FnZUNvbmZpZyB7XG4gIG56QW5pbWF0ZT86IGJvb2xlYW47XG4gIG56RHVyYXRpb24/OiBudW1iZXI7XG4gIG56TWF4U3RhY2s/OiBudW1iZXI7XG4gIG56UGF1c2VPbkhvdmVyPzogYm9vbGVhbjtcbiAgbnpUb3A/OiBudW1iZXIgfCBzdHJpbmc7XG59XG5cbmV4cG9ydCBpbnRlcmZhY2UgTW9kYWxDb25maWcge1xuICBuek1hc2s/OiBib29sZWFuO1xuICBuek1hc2tDbG9zYWJsZT86IGJvb2xlYW47XG4gIG56Q2xvc2VPbk5hdmlnYXRpb24/OiBib29sZWFuO1xufVxuXG5leHBvcnQgaW50ZXJmYWNlIE5vdGlmaWNhdGlvbkNvbmZpZyBleHRlbmRzIE1lc3NhZ2VDb25maWcge1xuICBuelRvcD86IHN0cmluZyB8IG51bWJlcjtcbiAgbnpCb3R0b20/OiBzdHJpbmcgfCBudW1iZXI7XG4gIG56UGxhY2VtZW50PzogJ3RvcExlZnQnIHwgJ3RvcFJpZ2h0JyB8ICdib3R0b21MZWZ0JyB8ICdib3R0b21SaWdodCc7XG59XG5cbmV4cG9ydCBpbnRlcmZhY2UgUGFnZUhlYWRlckNvbmZpZyB7XG4gIG56R2hvc3Q6IGJvb2xlYW47XG59XG5cbmV4cG9ydCBpbnRlcmZhY2UgUHJvZ3Jlc3NDb25maWcge1xuICBuekdhcERlZ3JlZT86IG51bWJlcjtcbiAgbnpHYXBQb3NpdGlvbj86ICd0b3AnIHwgJ3JpZ2h0JyB8ICdib3R0b20nIHwgJ2xlZnQnO1xuICBuelNob3dJbmZvPzogYm9vbGVhbjtcbiAgbnpTdHJva2VTd2l0Y2g/OiBudW1iZXI7XG4gIG56U3Ryb2tlV2lkdGg/OiBudW1iZXI7XG4gIG56U2l6ZT86ICdkZWZhdWx0JyB8ICdzbWFsbCc7XG4gIG56U3Ryb2tlTGluZWNhcD86ICdyb3VuZCcgfCAnc3F1YXJlJztcbiAgbnpTdHJva2VDb2xvcj86IHN0cmluZztcbn1cblxuZXhwb3J0IGludGVyZmFjZSBSYXRlQ29uZmlnIHtcbiAgbnpBbGxvd0NsZWFyPzogYm9vbGVhbjtcbiAgbnpBbGxvd0hhbGY/OiBib29sZWFuO1xufVxuXG5leHBvcnQgaW50ZXJmYWNlIFNwYWNlQ29uZmlnIHtcbiAgbnpTaXplPzogJ3NtYWxsJyB8ICdtaWRkbGUnIHwgJ2xhcmdlJyB8IG51bWJlcjtcbn1cblxuZXhwb3J0IGludGVyZmFjZSBTcGluQ29uZmlnIHtcbiAgbnpJbmRpY2F0b3I/OiBUZW1wbGF0ZVJlZjxOelNhZmVBbnk+O1xufVxuXG5leHBvcnQgaW50ZXJmYWNlIFN3aXRjaENvbmZpZyB7XG4gIG56U2l6ZTogTnpTaXplRFNUeXBlO1xufVxuXG5leHBvcnQgaW50ZXJmYWNlIFRhYmxlQ29uZmlnIHtcbiAgbnpCb3JkZXJlZD86IGJvb2xlYW47XG4gIG56U2l6ZT86IE56U2l6ZU1EU1R5cGU7XG4gIG56U2hvd1F1aWNrSnVtcGVyPzogYm9vbGVhbjtcbiAgbnpMb2FkaW5nSW5kaWNhdG9yPzogVGVtcGxhdGVSZWY8TnpTYWZlQW55PjtcbiAgbnpTaG93U2l6ZUNoYW5nZXI/OiBib29sZWFuO1xuICBuelNpbXBsZT86IGJvb2xlYW47XG4gIG56SGlkZU9uU2luZ2xlUGFnZT86IGJvb2xlYW47XG59XG5cbmV4cG9ydCBpbnRlcmZhY2UgVGFic0NvbmZpZyB7XG4gIG56QW5pbWF0ZWQ/OlxuICAgIHwgYm9vbGVhblxuICAgIHwge1xuICAgICAgICBpbmtCYXI6IGJvb2xlYW47XG4gICAgICAgIHRhYlBhbmU6IGJvb2xlYW47XG4gICAgICB9O1xuICBuelNpemU/OiBOelNpemVMRFNUeXBlO1xuICBuelR5cGU/OiAnbGluZScgfCAnY2FyZCc7XG4gIG56VGFiQmFyR3V0dGVyPzogbnVtYmVyO1xuICBuelNob3dQYWdpbmF0aW9uPzogYm9vbGVhbjtcbn1cblxuZXhwb3J0IGludGVyZmFjZSBUaW1lUGlja2VyQ29uZmlnIHtcbiAgbnpBbGxvd0VtcHR5PzogYm9vbGVhbjtcbiAgbnpDbGVhclRleHQ/OiBzdHJpbmc7XG4gIG56Rm9ybWF0Pzogc3RyaW5nO1xuICBuekhvdXJTdGVwPzogbnVtYmVyO1xuICBuek1pbnV0ZVN0ZXA/OiBudW1iZXI7XG4gIG56U2Vjb25kU3RlcD86IG51bWJlcjtcbiAgbnpQb3B1cENsYXNzTmFtZT86IHN0cmluZztcbiAgbnpVc2UxMkhvdXJzPzogc3RyaW5nO1xuICBuelN1ZmZpeEljb24/OiBzdHJpbmcgfCBUZW1wbGF0ZVJlZjxOelNhZmVBbnk+O1xufVxuXG5leHBvcnQgaW50ZXJmYWNlIFRyZWVDb25maWcge1xuICBuekJsb2NrTm9kZT86IGJvb2xlYW47XG4gIG56U2hvd0ljb24/OiBib29sZWFuO1xuICBuekhpZGVVbk1hdGNoZWQ/OiBib29sZWFuO1xufVxuXG5leHBvcnQgaW50ZXJmYWNlIFRyZWVTZWxlY3RDb25maWcge1xuICBuelNob3dJY29uPzogc3RyaW5nO1xuICBuelNob3dMaW5lPzogYm9vbGVhbjtcbiAgbnpEcm9wZG93bk1hdGNoU2VsZWN0V2lkdGg/OiBib29sZWFuO1xuICBuekhpZGVVbk1hdGNoZWQ/OiBib29sZWFuO1xuICBuelNpemU/OiAnbGFyZ2UnIHwgJ3NtYWxsJyB8ICdkZWZhdWx0Jztcbn1cblxuZXhwb3J0IGludGVyZmFjZSBUeXBvZ3JhcGh5Q29uZmlnIHtcbiAgbnpFbGxpcHNpc1Jvd3M/OiBudW1iZXI7XG4gIG56Q29weVRvb2x0aXBzPzogW056VFNUeXBlLCBOelRTVHlwZV0gfCBudWxsO1xuICBuekNvcHlJY29uczogW056VFNUeXBlLCBOelRTVHlwZV07XG4gIG56RWRpdFRvb2x0aXA/OiBudWxsIHwgTnpUU1R5cGU7XG4gIG56RWRpdEljb246IE56VFNUeXBlO1xufVxuXG5leHBvcnQgdHlwZSBOekNvbmZpZ0tleSA9IGtleW9mIE56Q29uZmlnO1xuXG4vKipcbiAqIFVzZXIgc2hvdWxkIHByb3ZpZGUgYW4gb2JqZWN0IGltcGxlbWVudHMgdGhpcyBpbnRlcmZhY2UgdG8gc2V0IGdsb2JhbCBjb25maWd1cmF0aW9ucy5cbiAqL1xuZXhwb3J0IGNvbnN0IE5aX0NPTkZJRyA9IG5ldyBJbmplY3Rpb25Ub2tlbjxOekNvbmZpZz4oJ256LWNvbmZpZycpO1xuIl19