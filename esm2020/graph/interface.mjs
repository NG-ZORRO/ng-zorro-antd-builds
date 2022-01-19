/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */
export var NzGraphEdgeType;
(function (NzGraphEdgeType) {
    NzGraphEdgeType["LINE"] = "line";
    NzGraphEdgeType["CURVE"] = "curve";
})(NzGraphEdgeType || (NzGraphEdgeType = {}));
export function nzTypeDefinition() {
    return item => item;
}
export const NZ_GRAPH_LAYOUT_SETTING = {
    graph: {
        meta: {
            nodeSep: 50,
            rankSep: 50,
            edgeSep: 5
        }
    },
    subScene: {
        meta: {
            paddingTop: 20,
            paddingBottom: 20,
            paddingLeft: 20,
            paddingRight: 20,
            labelHeight: 20
        }
    },
    nodeSize: {
        meta: {
            width: 50,
            maxLabelWidth: 0,
            height: 50
        },
        node: {
            width: 50,
            height: 50,
            labelOffset: 10,
            maxLabelWidth: 40
        },
        bridge: {
            width: 5,
            height: 5,
            radius: 2,
            labelOffset: 0
        }
    }
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW50ZXJmYWNlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vY29tcG9uZW50cy9ncmFwaC9pbnRlcmZhY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7OztHQUdHO0FBZUgsTUFBTSxDQUFOLElBQVksZUFHWDtBQUhELFdBQVksZUFBZTtJQUN6QixnQ0FBYSxDQUFBO0lBQ2Isa0NBQWUsQ0FBQTtBQUNqQixDQUFDLEVBSFcsZUFBZSxLQUFmLGVBQWUsUUFHMUI7QUF3RUQsTUFBTSxVQUFVLGdCQUFnQjtJQUM5QixPQUFPLElBQUksQ0FBQyxFQUFFLENBQUMsSUFBUyxDQUFDO0FBQzNCLENBQUM7QUFZRCxNQUFNLENBQUMsTUFBTSx1QkFBdUIsR0FBb0I7SUFDdEQsS0FBSyxFQUFFO1FBQ0wsSUFBSSxFQUFFO1lBQ0osT0FBTyxFQUFFLEVBQUU7WUFDWCxPQUFPLEVBQUUsRUFBRTtZQUNYLE9BQU8sRUFBRSxDQUFDO1NBQ1g7S0FDRjtJQUNELFFBQVEsRUFBRTtRQUNSLElBQUksRUFBRTtZQUNKLFVBQVUsRUFBRSxFQUFFO1lBQ2QsYUFBYSxFQUFFLEVBQUU7WUFDakIsV0FBVyxFQUFFLEVBQUU7WUFDZixZQUFZLEVBQUUsRUFBRTtZQUNoQixXQUFXLEVBQUUsRUFBRTtTQUNoQjtLQUNGO0lBQ0QsUUFBUSxFQUFFO1FBQ1IsSUFBSSxFQUFFO1lBQ0osS0FBSyxFQUFFLEVBQUU7WUFDVCxhQUFhLEVBQUUsQ0FBQztZQUNoQixNQUFNLEVBQUUsRUFBRTtTQUNYO1FBQ0QsSUFBSSxFQUFFO1lBQ0osS0FBSyxFQUFFLEVBQUU7WUFDVCxNQUFNLEVBQUUsRUFBRTtZQUNWLFdBQVcsRUFBRSxFQUFFO1lBQ2YsYUFBYSxFQUFFLEVBQUU7U0FDbEI7UUFDRCxNQUFNLEVBQUU7WUFDTixLQUFLLEVBQUUsQ0FBQztZQUNSLE1BQU0sRUFBRSxDQUFDO1lBQ1QsTUFBTSxFQUFFLENBQUM7WUFDVCxXQUFXLEVBQUUsQ0FBQztTQUNmO0tBQ0Y7Q0FDRixDQUFDIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKiBVc2Ugb2YgdGhpcyBzb3VyY2UgY29kZSBpcyBnb3Zlcm5lZCBieSBhbiBNSVQtc3R5bGUgbGljZW5zZSB0aGF0IGNhbiBiZVxuICogZm91bmQgaW4gdGhlIExJQ0VOU0UgZmlsZSBhdCBodHRwczovL2dpdGh1Yi5jb20vTkctWk9SUk8vbmctem9ycm8tYW50ZC9ibG9iL21hc3Rlci9MSUNFTlNFXG4gKi9cblxuaW1wb3J0IHtcbiAgSGllcmFyY2h5QmFzZUVkZ2VJbmZvLFxuICBIaWVyYXJjaHlCYXNlTm9kZUluZm8sXG4gIEhpZXJhcmNoeUdyYXBoRGVmLFxuICBIaWVyYXJjaHlHcmFwaEVkZ2VEZWYsXG4gIEhpZXJhcmNoeUdyYXBoTm9kZURlZixcbiAgSGllcmFyY2h5R3JhcGhOb2RlSW5mbyxcbiAgSGllcmFyY2h5R3JhcGhPcHRpb24sXG4gIExheW91dENvbmZpZ1xufSBmcm9tICdkYWdyZS1jb21wb3VuZCc7XG5cbmltcG9ydCB7IE56U2FmZUFueSB9IGZyb20gJ25nLXpvcnJvLWFudGQvY29yZS90eXBlcyc7XG5cbmV4cG9ydCBlbnVtIE56R3JhcGhFZGdlVHlwZSB7XG4gIExJTkUgPSAnbGluZScsXG4gIENVUlZFID0gJ2N1cnZlJ1xufVxuXG5leHBvcnQgaW50ZXJmYWNlIE56R3JhcGhEYXRhRGVmIGV4dGVuZHMgSGllcmFyY2h5R3JhcGhEZWYge1xuICBub2RlczogTnpHcmFwaE5vZGVEZWZbXTtcbiAgZWRnZXM6IE56R3JhcGhFZGdlRGVmW107XG59XG5cbmV4cG9ydCBpbnRlcmZhY2UgTnpHcmFwaE5vZGVEZWYgZXh0ZW5kcyBIaWVyYXJjaHlHcmFwaE5vZGVEZWYge1xuICBsYWJlbD86IHN0cmluZztcbn1cblxuZXhwb3J0IGludGVyZmFjZSBOekdyYXBoRWRnZURlZiBleHRlbmRzIEhpZXJhcmNoeUdyYXBoRWRnZURlZiB7XG4gIGxhYmVsPzogc3RyaW5nO1xufVxuXG4vLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgQHR5cGVzY3JpcHQtZXNsaW50L25vLWVtcHR5LWludGVyZmFjZVxuZXhwb3J0IGludGVyZmFjZSBOekdyYXBoT3B0aW9uIGV4dGVuZHMgSGllcmFyY2h5R3JhcGhPcHRpb24ge31cbmV4cG9ydCBkZWNsYXJlIHR5cGUgTnpSYW5rRGlyZWN0aW9uID0gJ1RCJyB8ICdCVCcgfCAnTFInIHwgJ1JMJztcblxuZXhwb3J0IGludGVyZmFjZSBOekdyYXBoR3JvdXBOb2RlIGV4dGVuZHMgSGllcmFyY2h5R3JhcGhOb2RlSW5mbyB7XG4gIG5vZGVzOiBBcnJheTxOekdyYXBoTm9kZSB8IE56R3JhcGhHcm91cE5vZGU+O1xuICBlZGdlczogTnpHcmFwaEVkZ2VbXTtcbiAgW2tleTogc3RyaW5nXTogTnpTYWZlQW55O1xufVxuXG5leHBvcnQgaW50ZXJmYWNlIE56R3JhcGhOb2RlIGV4dGVuZHMgSGllcmFyY2h5QmFzZU5vZGVJbmZvIHtcbiAgaWQ6IE56U2FmZUFueTtcbiAgLy8gVE9ET1xuICBuYW1lOiBOelNhZmVBbnk7XG4gIGxhYmVsPzogc3RyaW5nO1xuICBba2V5OiBzdHJpbmddOiBOelNhZmVBbnk7XG59XG5cbmV4cG9ydCBpbnRlcmZhY2UgTnpHcmFwaEVkZ2UgZXh0ZW5kcyBIaWVyYXJjaHlCYXNlRWRnZUluZm8ge1xuICBpZDogTnpTYWZlQW55O1xuICB2OiBOelNhZmVBbnk7XG4gIHc6IE56U2FmZUFueTtcbiAgbGFiZWw/OiBzdHJpbmc7XG59XG5cbi8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBAdHlwZXNjcmlwdC1lc2xpbnQvbm8tZW1wdHktaW50ZXJmYWNlXG5leHBvcnQgaW50ZXJmYWNlIE56TGF5b3V0U2V0dGluZyBleHRlbmRzIExheW91dENvbmZpZyB7fVxuXG5leHBvcnQgaW50ZXJmYWNlIE56R3JhcGhCYXNlTGF5b3V0IHtcbiAgbGF5b3V0OiB7XG4gICAgbm9kZVNlcDogbnVtYmVyO1xuICAgIHJhbmtTZXA6IG51bWJlcjtcbiAgICBlZGdlU2VwOiBudW1iZXI7XG4gIH07XG4gIHN1YlNjZW5lOiB7XG4gICAgcGFkZGluZ1RvcDogbnVtYmVyO1xuICAgIHBhZGRpbmdCb3R0b206IG51bWJlcjtcbiAgICBwYWRkaW5nTGVmdDogbnVtYmVyO1xuICAgIHBhZGRpbmdSaWdodDogbnVtYmVyO1xuICAgIGxhYmVsSGVpZ2h0OiBudW1iZXI7XG4gIH07XG4gIGRlZmF1bHRDb21wb3VuZE5vZGU6IHtcbiAgICB3aWR0aDogbnVtYmVyO1xuICAgIGhlaWdodDogbnVtYmVyO1xuICAgIG1heExhYmVsV2lkdGg6IG51bWJlcjtcbiAgfTtcbiAgZGVmYXVsdE5vZGU6IHtcbiAgICB3aWR0aDogbnVtYmVyO1xuICAgIGhlaWdodDogbnVtYmVyO1xuICAgIGxhYmVsT2Zmc2V0OiBudW1iZXI7XG4gICAgbWF4TGFiZWxXaWR0aDogbnVtYmVyO1xuICB9O1xuICBkZWZhdWx0RWRnZToge1xuICAgIHR5cGU6IE56R3JhcGhFZGdlVHlwZSB8IHN0cmluZzsgLy8gTmVlZCB0byBzdXBwb3J0IGV4dGVuc2lvbnNcbiAgfTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIG56VHlwZURlZmluaXRpb248VD4oKTogKGl0ZW06IHVua25vd24pID0+IFQge1xuICByZXR1cm4gaXRlbSA9PiBpdGVtIGFzIFQ7XG59XG5cbi8qIGVzbGludC1kaXNhYmxlIG5vLXNoYWRvdyAqL1xuZXhwb3J0IHR5cGUgTnpEZWVwUGFydGlhbDxUPiA9IHtcbiAgW1AgaW4ga2V5b2YgVF0/OiBUW1BdIGV4dGVuZHMgQXJyYXk8aW5mZXIgVT5cbiAgICA/IEFycmF5PE56RGVlcFBhcnRpYWw8VT4+XG4gICAgOiBUW1BdIGV4dGVuZHMgUmVhZG9ubHlBcnJheTxpbmZlciBVPlxuICAgID8gUmVhZG9ubHlBcnJheTxOekRlZXBQYXJ0aWFsPFU+PlxuICAgIDogTnpEZWVwUGFydGlhbDxUW1BdPjtcbn07XG5cbmV4cG9ydCB0eXBlIE56R3JhcGhMYXlvdXRDb25maWcgPSBOekRlZXBQYXJ0aWFsPE56R3JhcGhCYXNlTGF5b3V0PjtcbmV4cG9ydCBjb25zdCBOWl9HUkFQSF9MQVlPVVRfU0VUVElORzogTnpMYXlvdXRTZXR0aW5nID0ge1xuICBncmFwaDoge1xuICAgIG1ldGE6IHtcbiAgICAgIG5vZGVTZXA6IDUwLFxuICAgICAgcmFua1NlcDogNTAsXG4gICAgICBlZGdlU2VwOiA1XG4gICAgfVxuICB9LFxuICBzdWJTY2VuZToge1xuICAgIG1ldGE6IHtcbiAgICAgIHBhZGRpbmdUb3A6IDIwLFxuICAgICAgcGFkZGluZ0JvdHRvbTogMjAsXG4gICAgICBwYWRkaW5nTGVmdDogMjAsXG4gICAgICBwYWRkaW5nUmlnaHQ6IDIwLFxuICAgICAgbGFiZWxIZWlnaHQ6IDIwXG4gICAgfVxuICB9LFxuICBub2RlU2l6ZToge1xuICAgIG1ldGE6IHtcbiAgICAgIHdpZHRoOiA1MCxcbiAgICAgIG1heExhYmVsV2lkdGg6IDAsXG4gICAgICBoZWlnaHQ6IDUwXG4gICAgfSxcbiAgICBub2RlOiB7XG4gICAgICB3aWR0aDogNTAsXG4gICAgICBoZWlnaHQ6IDUwLFxuICAgICAgbGFiZWxPZmZzZXQ6IDEwLFxuICAgICAgbWF4TGFiZWxXaWR0aDogNDBcbiAgICB9LFxuICAgIGJyaWRnZToge1xuICAgICAgd2lkdGg6IDUsXG4gICAgICBoZWlnaHQ6IDUsXG4gICAgICByYWRpdXM6IDIsXG4gICAgICBsYWJlbE9mZnNldDogMFxuICAgIH1cbiAgfVxufTtcblxuLy8gWm9vbSBpbnRlcmZhY2VcblxuZXhwb3J0IGludGVyZmFjZSBOelpvb21UcmFuc2Zvcm0ge1xuICB4OiBudW1iZXI7XG4gIHk6IG51bWJlcjtcbiAgazogbnVtYmVyO1xufVxuXG5leHBvcnQgaW50ZXJmYWNlIFJlbGF0aXZlUG9zaXRpb25JbmZvIHtcbiAgdG9wTGVmdDogeyB4OiBudW1iZXI7IHk6IG51bWJlciB9O1xuICBib3R0b21SaWdodDogeyB4OiBudW1iZXI7IHk6IG51bWJlciB9O1xufVxuIl19