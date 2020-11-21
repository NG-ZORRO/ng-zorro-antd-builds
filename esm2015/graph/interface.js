/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */
export function nzTypeDefinition() {
    return item => item;
}
export const NZ_GRAPH_LAYOUT_SETTING = {
    animation: {
        /** Default duration for graph animations in ms. */
        duration: 250
    },
    graph: {
        /** Graph parameter for metanode. */
        meta: {
            /**
             * Dagre's nodesep param - number of pixels that
             * separate nodes horizontally in the layout.
             *
             * See https://github.com/cpettitt/dagre/wiki#configuring-the-layout
             */
            nodeSep: 50,
            /**
             * Dagre's ranksep param - number of pixels
             * between each rank in the layout.
             *
             * See https://github.com/cpettitt/dagre/wiki#configuring-the-layout
             */
            rankSep: 40,
            /**
             * Dagre's edgesep param - number of pixels that separate
             * edges horizontally in the layout.
             */
            edgeSep: 5
        },
        /**
         * Padding is used to correctly position the graph SVG inside of its parent
         * element. The padding amounts are applied using an SVG transform of X and
         * Y coordinates.
         */
        padding: { paddingTop: 10, paddingLeft: 0 }
    },
    subscene: {
        meta: {
            paddingTop: 20,
            paddingBottom: 20,
            paddingLeft: 20,
            paddingRight: 20,
            /**
             * Used to leave room for the label on top of the highest node in
             * the groupCore graph.
             */
            labelHeight: 20,
            /** X-space between each extracted node and the groupCore graph. */
            extractXOffset: 0,
            /** Y-space between each extracted node. */
            extractYOffset: 0
        }
    },
    nodeSize: {
        /** Size of meta nodes. */
        meta: {
            radius: 2,
            width: 160,
            maxLabelWidth: 0,
            /** A scale for the node's height based on number of nodes inside */
            // Hack - set this as an any type to avoid issues in exporting a type
            // from an external module.
            height: 100,
            /** The radius of the circle denoting the expand button. */
            expandButtonRadius: 3
        },
        /** Size of op nodes. */
        op: {
            width: 160,
            height: 100,
            radius: 1,
            labelOffset: 10,
            maxLabelWidth: 40
        },
        /** Size of bridge nodes. */
        bridge: {
            // NOTE: bridge nodes will normally be invisible, but they must
            // take up some space so that the layout step leaves room for
            // their edges.
            width: 10,
            height: 10,
            radius: 2,
            labelOffset: 0
        }
    },
    shortcutSize: {
        /** Size of shortcuts for op nodes */
        op: { width: 10, height: 4 },
        /** Size of shortcuts for meta nodes */
        meta: { width: 12, height: 4, radius: 1 },
        /** Size of shortcuts for series nodes */
        series: {
            width: 14,
            height: 4
        }
    },
    annotations: {
        /** Maximum possible width of the bounding box for in annotations */
        inboxWidth: 50,
        /** Maximum possible width of the bounding box for out annotations */
        outboxWidth: 50,
        /** X-space between the shape and each annotation-node. */
        xOffset: 10,
        /** Y-space between each annotation-node. */
        yOffset: 3,
        /** X-space between each annotation-node and its label. */
        labelOffset: 2,
        /** Defines the max width for annotation label */
        maxLabelWidth: 120
    },
    constant: { size: { width: 4, height: 4 } },
    minimap: {
        /** The maximum width/height the minimap can have. */
        size: 150
    }
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW50ZXJmYWNlLmpzIiwic291cmNlUm9vdCI6Ii9ob21lL3ZzdHMvd29yay8xL3MvY29tcG9uZW50cy9ncmFwaC8iLCJzb3VyY2VzIjpbImludGVyZmFjZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7O0dBR0c7QUF1REgsTUFBTSxVQUFVLGdCQUFnQjtJQUM5QixPQUFPLElBQUksQ0FBQyxFQUFFLENBQUMsSUFBUyxDQUFDO0FBQzNCLENBQUM7QUFZRCxNQUFNLENBQUMsTUFBTSx1QkFBdUIsR0FBb0I7SUFDdEQsU0FBUyxFQUFFO1FBQ1QsbURBQW1EO1FBQ25ELFFBQVEsRUFBRSxHQUFHO0tBQ2Q7SUFDRCxLQUFLLEVBQUU7UUFDTCxvQ0FBb0M7UUFDcEMsSUFBSSxFQUFFO1lBQ0o7Ozs7O2VBS0c7WUFDSCxPQUFPLEVBQUUsRUFBRTtZQUNYOzs7OztlQUtHO1lBQ0gsT0FBTyxFQUFFLEVBQUU7WUFDWDs7O2VBR0c7WUFDSCxPQUFPLEVBQUUsQ0FBQztTQUNYO1FBQ0Q7Ozs7V0FJRztRQUNILE9BQU8sRUFBRSxFQUFFLFVBQVUsRUFBRSxFQUFFLEVBQUUsV0FBVyxFQUFFLENBQUMsRUFBRTtLQUM1QztJQUNELFFBQVEsRUFBRTtRQUNSLElBQUksRUFBRTtZQUNKLFVBQVUsRUFBRSxFQUFFO1lBQ2QsYUFBYSxFQUFFLEVBQUU7WUFDakIsV0FBVyxFQUFFLEVBQUU7WUFDZixZQUFZLEVBQUUsRUFBRTtZQUNoQjs7O2VBR0c7WUFDSCxXQUFXLEVBQUUsRUFBRTtZQUNmLG1FQUFtRTtZQUNuRSxjQUFjLEVBQUUsQ0FBQztZQUNqQiwyQ0FBMkM7WUFDM0MsY0FBYyxFQUFFLENBQUM7U0FDbEI7S0FDRjtJQUNELFFBQVEsRUFBRTtRQUNSLDBCQUEwQjtRQUMxQixJQUFJLEVBQUU7WUFDSixNQUFNLEVBQUUsQ0FBQztZQUNULEtBQUssRUFBRSxHQUFHO1lBQ1YsYUFBYSxFQUFFLENBQUM7WUFDaEIsb0VBQW9FO1lBQ3BFLHFFQUFxRTtZQUNyRSwyQkFBMkI7WUFDM0IsTUFBTSxFQUFFLEdBQUc7WUFDWCwyREFBMkQ7WUFDM0Qsa0JBQWtCLEVBQUUsQ0FBQztTQUN0QjtRQUNELHdCQUF3QjtRQUN4QixFQUFFLEVBQUU7WUFDRixLQUFLLEVBQUUsR0FBRztZQUNWLE1BQU0sRUFBRSxHQUFHO1lBQ1gsTUFBTSxFQUFFLENBQUM7WUFDVCxXQUFXLEVBQUUsRUFBRTtZQUNmLGFBQWEsRUFBRSxFQUFFO1NBQ2xCO1FBQ0QsNEJBQTRCO1FBQzVCLE1BQU0sRUFBRTtZQUNOLCtEQUErRDtZQUMvRCw2REFBNkQ7WUFDN0QsZUFBZTtZQUNmLEtBQUssRUFBRSxFQUFFO1lBQ1QsTUFBTSxFQUFFLEVBQUU7WUFDVixNQUFNLEVBQUUsQ0FBQztZQUNULFdBQVcsRUFBRSxDQUFDO1NBQ2Y7S0FDRjtJQUNELFlBQVksRUFBRTtRQUNaLHFDQUFxQztRQUNyQyxFQUFFLEVBQUUsRUFBRSxLQUFLLEVBQUUsRUFBRSxFQUFFLE1BQU0sRUFBRSxDQUFDLEVBQUU7UUFDNUIsdUNBQXVDO1FBQ3ZDLElBQUksRUFBRSxFQUFFLEtBQUssRUFBRSxFQUFFLEVBQUUsTUFBTSxFQUFFLENBQUMsRUFBRSxNQUFNLEVBQUUsQ0FBQyxFQUFFO1FBQ3pDLHlDQUF5QztRQUN6QyxNQUFNLEVBQUU7WUFDTixLQUFLLEVBQUUsRUFBRTtZQUNULE1BQU0sRUFBRSxDQUFDO1NBQ1Y7S0FDRjtJQUNELFdBQVcsRUFBRTtRQUNYLG9FQUFvRTtRQUNwRSxVQUFVLEVBQUUsRUFBRTtRQUNkLHFFQUFxRTtRQUNyRSxXQUFXLEVBQUUsRUFBRTtRQUNmLDBEQUEwRDtRQUMxRCxPQUFPLEVBQUUsRUFBRTtRQUNYLDRDQUE0QztRQUM1QyxPQUFPLEVBQUUsQ0FBQztRQUNWLDBEQUEwRDtRQUMxRCxXQUFXLEVBQUUsQ0FBQztRQUNkLGlEQUFpRDtRQUNqRCxhQUFhLEVBQUUsR0FBRztLQUNuQjtJQUNELFFBQVEsRUFBRSxFQUFFLElBQUksRUFBRSxFQUFFLEtBQUssRUFBRSxDQUFDLEVBQUUsTUFBTSxFQUFFLENBQUMsRUFBRSxFQUFFO0lBQzNDLE9BQU8sRUFBRTtRQUNQLHFEQUFxRDtRQUNyRCxJQUFJLEVBQUUsR0FBRztLQUNWO0NBQ0YsQ0FBQyIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxuICogVXNlIG9mIHRoaXMgc291cmNlIGNvZGUgaXMgZ292ZXJuZWQgYnkgYW4gTUlULXN0eWxlIGxpY2Vuc2UgdGhhdCBjYW4gYmVcbiAqIGZvdW5kIGluIHRoZSBMSUNFTlNFIGZpbGUgYXQgaHR0cHM6Ly9naXRodWIuY29tL05HLVpPUlJPL25nLXpvcnJvLWFudGQvYmxvYi9tYXN0ZXIvTElDRU5TRVxuICovXG5cbmltcG9ydCB7XG4gIEhpZXJhcmNoeUJhc2VFZGdlSW5mbyxcbiAgSGllcmFyY2h5QmFzZU5vZGVJbmZvLFxuICBIaWVyYXJjaHlHcmFwaERlZixcbiAgSGllcmFyY2h5R3JhcGhFZGdlRGVmLFxuICBIaWVyYXJjaHlHcmFwaE5vZGVEZWYsXG4gIEhpZXJhcmNoeUdyYXBoTm9kZUluZm8sXG4gIEhpZXJhcmNoeUdyYXBoT3B0aW9uXG59IGZyb20gJ0BueC1jb21wb25lbnQvaGllcmFyY2h5LWdyYXBoJztcbmltcG9ydCB7IExheW91dFNldHRpbmcgfSBmcm9tICdAbngtY29tcG9uZW50L2hpZXJhcmNoeS1ncmFwaC9kaXN0L3R5cGVzJztcbmltcG9ydCB7IE56U2FmZUFueSB9IGZyb20gJ25nLXpvcnJvLWFudGQvY29yZS90eXBlcyc7XG5cbmV4cG9ydCBpbnRlcmZhY2UgTnpHcmFwaERhdGFEZWYgZXh0ZW5kcyBIaWVyYXJjaHlHcmFwaERlZiB7XG4gIG5vZGVzOiBOekdyYXBoTm9kZURlZltdO1xuICBlZGdlczogTnpHcmFwaEVkZ2VEZWZbXTtcbn1cblxuZXhwb3J0IGludGVyZmFjZSBOekdyYXBoTm9kZURlZiBleHRlbmRzIEhpZXJhcmNoeUdyYXBoTm9kZURlZiB7XG4gIGxhYmVsPzogc3RyaW5nO1xufVxuXG5leHBvcnQgaW50ZXJmYWNlIE56R3JhcGhFZGdlRGVmIGV4dGVuZHMgSGllcmFyY2h5R3JhcGhFZGdlRGVmIHtcbiAgbGFiZWw/OiBzdHJpbmc7XG59XG5cbi8vIHRzbGludDpkaXNhYmxlLW5leHQtbGluZTpuby1lbXB0eS1pbnRlcmZhY2VcbmV4cG9ydCBpbnRlcmZhY2UgTnpHcmFwaE9wdGlvbiBleHRlbmRzIEhpZXJhcmNoeUdyYXBoT3B0aW9uIHt9XG5leHBvcnQgZGVjbGFyZSB0eXBlIE56UmFua0RpcmVjdGlvbiA9ICdUQicgfCAnQlQnIHwgJ0xSJyB8ICdSTCc7XG5cbmV4cG9ydCBpbnRlcmZhY2UgTnpHcmFwaEdyb3VwTm9kZSBleHRlbmRzIEhpZXJhcmNoeUdyYXBoTm9kZUluZm8ge1xuICBub2RlczogQXJyYXk8TnpHcmFwaE5vZGUgfCBOekdyYXBoR3JvdXBOb2RlPjtcbiAgZWRnZXM6IE56R3JhcGhFZGdlW107XG4gIFtrZXk6IHN0cmluZ106IE56U2FmZUFueTtcbn1cblxuZXhwb3J0IGludGVyZmFjZSBOekdyYXBoTm9kZSBleHRlbmRzIEhpZXJhcmNoeUJhc2VOb2RlSW5mbyB7XG4gIGlkOiBOelNhZmVBbnk7XG4gIC8vIFRPRE9cbiAgbmFtZTogTnpTYWZlQW55O1xuICBsYWJlbD86IHN0cmluZztcbiAgW2tleTogc3RyaW5nXTogTnpTYWZlQW55O1xufVxuXG5leHBvcnQgaW50ZXJmYWNlIE56R3JhcGhFZGdlIGV4dGVuZHMgSGllcmFyY2h5QmFzZUVkZ2VJbmZvIHtcbiAgaWQ6IE56U2FmZUFueTtcbiAgdjogTnpTYWZlQW55O1xuICB3OiBOelNhZmVBbnk7XG4gIGxhYmVsPzogc3RyaW5nO1xufVxuXG4vLyB0c2xpbnQ6ZGlzYWJsZS1uZXh0LWxpbmU6bm8tZW1wdHktaW50ZXJmYWNlXG5leHBvcnQgaW50ZXJmYWNlIE56TGF5b3V0U2V0dGluZyBleHRlbmRzIExheW91dFNldHRpbmcge31cblxuZXhwb3J0IGZ1bmN0aW9uIG56VHlwZURlZmluaXRpb248VD4oKTogKGl0ZW06IHVua25vd24pID0+IFQge1xuICByZXR1cm4gaXRlbSA9PiBpdGVtIGFzIFQ7XG59XG5cbi8vIHRzbGludDpkaXNhYmxlOm5vLXNoYWRvd2VkLXZhcmlhYmxlXG5leHBvcnQgdHlwZSBOekRlZXBQYXJ0aWFsPFQ+ID0ge1xuICBbUCBpbiBrZXlvZiBUXT86IFRbUF0gZXh0ZW5kcyBBcnJheTxpbmZlciBVPlxuICAgID8gQXJyYXk8TnpEZWVwUGFydGlhbDxVPj5cbiAgICA6IFRbUF0gZXh0ZW5kcyBSZWFkb25seUFycmF5PGluZmVyIFU+XG4gICAgPyBSZWFkb25seUFycmF5PE56RGVlcFBhcnRpYWw8VT4+XG4gICAgOiBOekRlZXBQYXJ0aWFsPFRbUF0+O1xufTtcblxuZXhwb3J0IHR5cGUgTnpHcmFwaExheW91dFNldHRpbmcgPSBOekRlZXBQYXJ0aWFsPE56TGF5b3V0U2V0dGluZz47XG5leHBvcnQgY29uc3QgTlpfR1JBUEhfTEFZT1VUX1NFVFRJTkc6IE56TGF5b3V0U2V0dGluZyA9IHtcbiAgYW5pbWF0aW9uOiB7XG4gICAgLyoqIERlZmF1bHQgZHVyYXRpb24gZm9yIGdyYXBoIGFuaW1hdGlvbnMgaW4gbXMuICovXG4gICAgZHVyYXRpb246IDI1MFxuICB9LFxuICBncmFwaDoge1xuICAgIC8qKiBHcmFwaCBwYXJhbWV0ZXIgZm9yIG1ldGFub2RlLiAqL1xuICAgIG1ldGE6IHtcbiAgICAgIC8qKlxuICAgICAgICogRGFncmUncyBub2Rlc2VwIHBhcmFtIC0gbnVtYmVyIG9mIHBpeGVscyB0aGF0XG4gICAgICAgKiBzZXBhcmF0ZSBub2RlcyBob3Jpem9udGFsbHkgaW4gdGhlIGxheW91dC5cbiAgICAgICAqXG4gICAgICAgKiBTZWUgaHR0cHM6Ly9naXRodWIuY29tL2NwZXR0aXR0L2RhZ3JlL3dpa2kjY29uZmlndXJpbmctdGhlLWxheW91dFxuICAgICAgICovXG4gICAgICBub2RlU2VwOiA1MCxcbiAgICAgIC8qKlxuICAgICAgICogRGFncmUncyByYW5rc2VwIHBhcmFtIC0gbnVtYmVyIG9mIHBpeGVsc1xuICAgICAgICogYmV0d2VlbiBlYWNoIHJhbmsgaW4gdGhlIGxheW91dC5cbiAgICAgICAqXG4gICAgICAgKiBTZWUgaHR0cHM6Ly9naXRodWIuY29tL2NwZXR0aXR0L2RhZ3JlL3dpa2kjY29uZmlndXJpbmctdGhlLWxheW91dFxuICAgICAgICovXG4gICAgICByYW5rU2VwOiA0MCxcbiAgICAgIC8qKlxuICAgICAgICogRGFncmUncyBlZGdlc2VwIHBhcmFtIC0gbnVtYmVyIG9mIHBpeGVscyB0aGF0IHNlcGFyYXRlXG4gICAgICAgKiBlZGdlcyBob3Jpem9udGFsbHkgaW4gdGhlIGxheW91dC5cbiAgICAgICAqL1xuICAgICAgZWRnZVNlcDogNVxuICAgIH0sXG4gICAgLyoqXG4gICAgICogUGFkZGluZyBpcyB1c2VkIHRvIGNvcnJlY3RseSBwb3NpdGlvbiB0aGUgZ3JhcGggU1ZHIGluc2lkZSBvZiBpdHMgcGFyZW50XG4gICAgICogZWxlbWVudC4gVGhlIHBhZGRpbmcgYW1vdW50cyBhcmUgYXBwbGllZCB1c2luZyBhbiBTVkcgdHJhbnNmb3JtIG9mIFggYW5kXG4gICAgICogWSBjb29yZGluYXRlcy5cbiAgICAgKi9cbiAgICBwYWRkaW5nOiB7IHBhZGRpbmdUb3A6IDEwLCBwYWRkaW5nTGVmdDogMCB9XG4gIH0sXG4gIHN1YnNjZW5lOiB7XG4gICAgbWV0YToge1xuICAgICAgcGFkZGluZ1RvcDogMjAsXG4gICAgICBwYWRkaW5nQm90dG9tOiAyMCxcbiAgICAgIHBhZGRpbmdMZWZ0OiAyMCxcbiAgICAgIHBhZGRpbmdSaWdodDogMjAsXG4gICAgICAvKipcbiAgICAgICAqIFVzZWQgdG8gbGVhdmUgcm9vbSBmb3IgdGhlIGxhYmVsIG9uIHRvcCBvZiB0aGUgaGlnaGVzdCBub2RlIGluXG4gICAgICAgKiB0aGUgZ3JvdXBDb3JlIGdyYXBoLlxuICAgICAgICovXG4gICAgICBsYWJlbEhlaWdodDogMjAsXG4gICAgICAvKiogWC1zcGFjZSBiZXR3ZWVuIGVhY2ggZXh0cmFjdGVkIG5vZGUgYW5kIHRoZSBncm91cENvcmUgZ3JhcGguICovXG4gICAgICBleHRyYWN0WE9mZnNldDogMCxcbiAgICAgIC8qKiBZLXNwYWNlIGJldHdlZW4gZWFjaCBleHRyYWN0ZWQgbm9kZS4gKi9cbiAgICAgIGV4dHJhY3RZT2Zmc2V0OiAwXG4gICAgfVxuICB9LFxuICBub2RlU2l6ZToge1xuICAgIC8qKiBTaXplIG9mIG1ldGEgbm9kZXMuICovXG4gICAgbWV0YToge1xuICAgICAgcmFkaXVzOiAyLFxuICAgICAgd2lkdGg6IDE2MCxcbiAgICAgIG1heExhYmVsV2lkdGg6IDAsXG4gICAgICAvKiogQSBzY2FsZSBmb3IgdGhlIG5vZGUncyBoZWlnaHQgYmFzZWQgb24gbnVtYmVyIG9mIG5vZGVzIGluc2lkZSAqL1xuICAgICAgLy8gSGFjayAtIHNldCB0aGlzIGFzIGFuIGFueSB0eXBlIHRvIGF2b2lkIGlzc3VlcyBpbiBleHBvcnRpbmcgYSB0eXBlXG4gICAgICAvLyBmcm9tIGFuIGV4dGVybmFsIG1vZHVsZS5cbiAgICAgIGhlaWdodDogMTAwLFxuICAgICAgLyoqIFRoZSByYWRpdXMgb2YgdGhlIGNpcmNsZSBkZW5vdGluZyB0aGUgZXhwYW5kIGJ1dHRvbi4gKi9cbiAgICAgIGV4cGFuZEJ1dHRvblJhZGl1czogM1xuICAgIH0sXG4gICAgLyoqIFNpemUgb2Ygb3Agbm9kZXMuICovXG4gICAgb3A6IHtcbiAgICAgIHdpZHRoOiAxNjAsXG4gICAgICBoZWlnaHQ6IDEwMCxcbiAgICAgIHJhZGl1czogMSwgLy8gZm9yIG1ha2luZyBhbm5vdGF0aW9uIHRvdWNoaW5nIGVsbGlwc2VcbiAgICAgIGxhYmVsT2Zmc2V0OiAxMCxcbiAgICAgIG1heExhYmVsV2lkdGg6IDQwXG4gICAgfSxcbiAgICAvKiogU2l6ZSBvZiBicmlkZ2Ugbm9kZXMuICovXG4gICAgYnJpZGdlOiB7XG4gICAgICAvLyBOT1RFOiBicmlkZ2Ugbm9kZXMgd2lsbCBub3JtYWxseSBiZSBpbnZpc2libGUsIGJ1dCB0aGV5IG11c3RcbiAgICAgIC8vIHRha2UgdXAgc29tZSBzcGFjZSBzbyB0aGF0IHRoZSBsYXlvdXQgc3RlcCBsZWF2ZXMgcm9vbSBmb3JcbiAgICAgIC8vIHRoZWlyIGVkZ2VzLlxuICAgICAgd2lkdGg6IDEwLFxuICAgICAgaGVpZ2h0OiAxMCxcbiAgICAgIHJhZGl1czogMixcbiAgICAgIGxhYmVsT2Zmc2V0OiAwXG4gICAgfVxuICB9LFxuICBzaG9ydGN1dFNpemU6IHtcbiAgICAvKiogU2l6ZSBvZiBzaG9ydGN1dHMgZm9yIG9wIG5vZGVzICovXG4gICAgb3A6IHsgd2lkdGg6IDEwLCBoZWlnaHQ6IDQgfSxcbiAgICAvKiogU2l6ZSBvZiBzaG9ydGN1dHMgZm9yIG1ldGEgbm9kZXMgKi9cbiAgICBtZXRhOiB7IHdpZHRoOiAxMiwgaGVpZ2h0OiA0LCByYWRpdXM6IDEgfSxcbiAgICAvKiogU2l6ZSBvZiBzaG9ydGN1dHMgZm9yIHNlcmllcyBub2RlcyAqL1xuICAgIHNlcmllczoge1xuICAgICAgd2lkdGg6IDE0LFxuICAgICAgaGVpZ2h0OiA0XG4gICAgfVxuICB9LFxuICBhbm5vdGF0aW9uczoge1xuICAgIC8qKiBNYXhpbXVtIHBvc3NpYmxlIHdpZHRoIG9mIHRoZSBib3VuZGluZyBib3ggZm9yIGluIGFubm90YXRpb25zICovXG4gICAgaW5ib3hXaWR0aDogNTAsXG4gICAgLyoqIE1heGltdW0gcG9zc2libGUgd2lkdGggb2YgdGhlIGJvdW5kaW5nIGJveCBmb3Igb3V0IGFubm90YXRpb25zICovXG4gICAgb3V0Ym94V2lkdGg6IDUwLFxuICAgIC8qKiBYLXNwYWNlIGJldHdlZW4gdGhlIHNoYXBlIGFuZCBlYWNoIGFubm90YXRpb24tbm9kZS4gKi9cbiAgICB4T2Zmc2V0OiAxMCxcbiAgICAvKiogWS1zcGFjZSBiZXR3ZWVuIGVhY2ggYW5ub3RhdGlvbi1ub2RlLiAqL1xuICAgIHlPZmZzZXQ6IDMsXG4gICAgLyoqIFgtc3BhY2UgYmV0d2VlbiBlYWNoIGFubm90YXRpb24tbm9kZSBhbmQgaXRzIGxhYmVsLiAqL1xuICAgIGxhYmVsT2Zmc2V0OiAyLFxuICAgIC8qKiBEZWZpbmVzIHRoZSBtYXggd2lkdGggZm9yIGFubm90YXRpb24gbGFiZWwgKi9cbiAgICBtYXhMYWJlbFdpZHRoOiAxMjBcbiAgfSxcbiAgY29uc3RhbnQ6IHsgc2l6ZTogeyB3aWR0aDogNCwgaGVpZ2h0OiA0IH0gfSxcbiAgbWluaW1hcDoge1xuICAgIC8qKiBUaGUgbWF4aW11bSB3aWR0aC9oZWlnaHQgdGhlIG1pbmltYXAgY2FuIGhhdmUuICovXG4gICAgc2l6ZTogMTUwXG4gIH1cbn07XG4iXX0=