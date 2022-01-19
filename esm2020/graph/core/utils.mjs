/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */
/**
 * Calculate position and scale
 *
 * @param containerEle
 * @param targetEle
 * @param scale: if scale is set, skip calculate scale value
 */
export const calculateTransform = (containerEle, targetEle, scale) => {
    const containerEleSize = containerEle.getBoundingClientRect();
    const targetEleSize = targetEle.getBBox();
    if (!targetEleSize.width) {
        // There is no g element anymore.
        return null;
    }
    // TODO
    // leave some place when re-scale
    const scaleUnit = (containerEleSize.width - 48) / containerEleSize.width;
    const k = scale ||
        Math.min(containerEleSize.width / targetEleSize.width, containerEleSize.height / targetEleSize.height, 1) *
            scaleUnit;
    const x = (containerEleSize.width - targetEleSize.width * k) / 2;
    const y = (containerEleSize.height - targetEleSize.height * k) / 2;
    return {
        x,
        y,
        k
    };
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidXRpbHMuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi9jb21wb25lbnRzL2dyYXBoL2NvcmUvdXRpbHMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7OztHQUdHO0FBSUg7Ozs7OztHQU1HO0FBQ0gsTUFBTSxDQUFDLE1BQU0sa0JBQWtCLEdBQUcsQ0FDaEMsWUFBMkIsRUFDM0IsU0FBc0IsRUFDdEIsS0FBYyxFQUNVLEVBQUU7SUFDMUIsTUFBTSxnQkFBZ0IsR0FBRyxZQUFZLENBQUMscUJBQXFCLEVBQUUsQ0FBQztJQUM5RCxNQUFNLGFBQWEsR0FBRyxTQUFTLENBQUMsT0FBTyxFQUFFLENBQUM7SUFDMUMsSUFBSSxDQUFDLGFBQWEsQ0FBQyxLQUFLLEVBQUU7UUFDeEIsaUNBQWlDO1FBQ2pDLE9BQU8sSUFBSSxDQUFDO0tBQ2I7SUFFRCxPQUFPO0lBQ1AsaUNBQWlDO0lBQ2pDLE1BQU0sU0FBUyxHQUFHLENBQUMsZ0JBQWdCLENBQUMsS0FBSyxHQUFHLEVBQUUsQ0FBQyxHQUFHLGdCQUFnQixDQUFDLEtBQUssQ0FBQztJQUN6RSxNQUFNLENBQUMsR0FDTCxLQUFLO1FBQ0wsSUFBSSxDQUFDLEdBQUcsQ0FBQyxnQkFBZ0IsQ0FBQyxLQUFLLEdBQUcsYUFBYSxDQUFDLEtBQUssRUFBRSxnQkFBZ0IsQ0FBQyxNQUFNLEdBQUcsYUFBYSxDQUFDLE1BQU0sRUFBRSxDQUFDLENBQUM7WUFDdkcsU0FBUyxDQUFDO0lBQ2QsTUFBTSxDQUFDLEdBQUcsQ0FBQyxnQkFBZ0IsQ0FBQyxLQUFLLEdBQUcsYUFBYSxDQUFDLEtBQUssR0FBRyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUM7SUFDakUsTUFBTSxDQUFDLEdBQUcsQ0FBQyxnQkFBZ0IsQ0FBQyxNQUFNLEdBQUcsYUFBYSxDQUFDLE1BQU0sR0FBRyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUM7SUFDbkUsT0FBTztRQUNMLENBQUM7UUFDRCxDQUFDO1FBQ0QsQ0FBQztLQUNGLENBQUM7QUFDSixDQUFDLENBQUMiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqIFVzZSBvZiB0aGlzIHNvdXJjZSBjb2RlIGlzIGdvdmVybmVkIGJ5IGFuIE1JVC1zdHlsZSBsaWNlbnNlIHRoYXQgY2FuIGJlXG4gKiBmb3VuZCBpbiB0aGUgTElDRU5TRSBmaWxlIGF0IGh0dHBzOi8vZ2l0aHViLmNvbS9ORy1aT1JSTy9uZy16b3Jyby1hbnRkL2Jsb2IvbWFzdGVyL0xJQ0VOU0VcbiAqL1xuXG5pbXBvcnQgeyBOelpvb21UcmFuc2Zvcm0gfSBmcm9tICcuLi9pbnRlcmZhY2UnO1xuXG4vKipcbiAqIENhbGN1bGF0ZSBwb3NpdGlvbiBhbmQgc2NhbGVcbiAqXG4gKiBAcGFyYW0gY29udGFpbmVyRWxlXG4gKiBAcGFyYW0gdGFyZ2V0RWxlXG4gKiBAcGFyYW0gc2NhbGU6IGlmIHNjYWxlIGlzIHNldCwgc2tpcCBjYWxjdWxhdGUgc2NhbGUgdmFsdWVcbiAqL1xuZXhwb3J0IGNvbnN0IGNhbGN1bGF0ZVRyYW5zZm9ybSA9IChcbiAgY29udGFpbmVyRWxlOiBTVkdTVkdFbGVtZW50LFxuICB0YXJnZXRFbGU6IFNWR0dFbGVtZW50LFxuICBzY2FsZT86IG51bWJlclxuKTogTnpab29tVHJhbnNmb3JtIHwgbnVsbCA9PiB7XG4gIGNvbnN0IGNvbnRhaW5lckVsZVNpemUgPSBjb250YWluZXJFbGUuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCk7XG4gIGNvbnN0IHRhcmdldEVsZVNpemUgPSB0YXJnZXRFbGUuZ2V0QkJveCgpO1xuICBpZiAoIXRhcmdldEVsZVNpemUud2lkdGgpIHtcbiAgICAvLyBUaGVyZSBpcyBubyBnIGVsZW1lbnQgYW55bW9yZS5cbiAgICByZXR1cm4gbnVsbDtcbiAgfVxuXG4gIC8vIFRPRE9cbiAgLy8gbGVhdmUgc29tZSBwbGFjZSB3aGVuIHJlLXNjYWxlXG4gIGNvbnN0IHNjYWxlVW5pdCA9IChjb250YWluZXJFbGVTaXplLndpZHRoIC0gNDgpIC8gY29udGFpbmVyRWxlU2l6ZS53aWR0aDtcbiAgY29uc3QgayA9XG4gICAgc2NhbGUgfHxcbiAgICBNYXRoLm1pbihjb250YWluZXJFbGVTaXplLndpZHRoIC8gdGFyZ2V0RWxlU2l6ZS53aWR0aCwgY29udGFpbmVyRWxlU2l6ZS5oZWlnaHQgLyB0YXJnZXRFbGVTaXplLmhlaWdodCwgMSkgKlxuICAgICAgc2NhbGVVbml0O1xuICBjb25zdCB4ID0gKGNvbnRhaW5lckVsZVNpemUud2lkdGggLSB0YXJnZXRFbGVTaXplLndpZHRoICogaykgLyAyO1xuICBjb25zdCB5ID0gKGNvbnRhaW5lckVsZVNpemUuaGVpZ2h0IC0gdGFyZ2V0RWxlU2l6ZS5oZWlnaHQgKiBrKSAvIDI7XG4gIHJldHVybiB7XG4gICAgeCxcbiAgICB5LFxuICAgIGtcbiAgfTtcbn07XG4iXX0=