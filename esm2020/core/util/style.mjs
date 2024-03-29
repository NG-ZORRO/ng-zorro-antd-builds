/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */
export function isStyleSupport(styleName) {
    if (typeof window !== 'undefined' && window.document && window.document.documentElement) {
        const styleNameList = Array.isArray(styleName) ? styleName : [styleName];
        const { documentElement } = window.document;
        return styleNameList.some(name => name in documentElement.style);
    }
    return false;
}
export function getStyleAsText(styles) {
    if (!styles) {
        return '';
    }
    return Object.keys(styles)
        .map(key => {
        const val = styles[key];
        return `${key}:${typeof val === 'string' ? val : `${val}px`}`;
    })
        .join(';');
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic3R5bGUuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi9jb21wb25lbnRzL2NvcmUvdXRpbC9zdHlsZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7O0dBR0c7QUFJSCxNQUFNLFVBQVUsY0FBYyxDQUFDLFNBQTRCO0lBQ3pELElBQUksT0FBTyxNQUFNLEtBQUssV0FBVyxJQUFJLE1BQU0sQ0FBQyxRQUFRLElBQUksTUFBTSxDQUFDLFFBQVEsQ0FBQyxlQUFlLEVBQUU7UUFDdkYsTUFBTSxhQUFhLEdBQUcsS0FBSyxDQUFDLE9BQU8sQ0FBQyxTQUFTLENBQUMsQ0FBQyxDQUFDLENBQUMsU0FBUyxDQUFDLENBQUMsQ0FBQyxDQUFDLFNBQVMsQ0FBQyxDQUFDO1FBQ3pFLE1BQU0sRUFBRSxlQUFlLEVBQUUsR0FBRyxNQUFNLENBQUMsUUFBUSxDQUFDO1FBRTVDLE9BQU8sYUFBYSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsRUFBRSxDQUFDLElBQUksSUFBSSxlQUFlLENBQUMsS0FBSyxDQUFDLENBQUM7S0FDbEU7SUFDRCxPQUFPLEtBQUssQ0FBQztBQUNmLENBQUM7QUFFRCxNQUFNLFVBQVUsY0FBYyxDQUFDLE1BQXlCO0lBQ3RELElBQUksQ0FBQyxNQUFNLEVBQUU7UUFDWCxPQUFPLEVBQUUsQ0FBQztLQUNYO0lBRUQsT0FBTyxNQUFNLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQztTQUN2QixHQUFHLENBQUMsR0FBRyxDQUFDLEVBQUU7UUFDVCxNQUFNLEdBQUcsR0FBRyxNQUFNLENBQUMsR0FBRyxDQUFDLENBQUM7UUFDeEIsT0FBTyxHQUFHLEdBQUcsSUFBSSxPQUFPLEdBQUcsS0FBSyxRQUFRLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsR0FBRyxHQUFHLElBQUksRUFBRSxDQUFDO0lBQ2hFLENBQUMsQ0FBQztTQUNELElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQztBQUNmLENBQUMiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqIFVzZSBvZiB0aGlzIHNvdXJjZSBjb2RlIGlzIGdvdmVybmVkIGJ5IGFuIE1JVC1zdHlsZSBsaWNlbnNlIHRoYXQgY2FuIGJlXG4gKiBmb3VuZCBpbiB0aGUgTElDRU5TRSBmaWxlIGF0IGh0dHBzOi8vZ2l0aHViLmNvbS9ORy1aT1JSTy9uZy16b3Jyby1hbnRkL2Jsb2IvbWFzdGVyL0xJQ0VOU0VcbiAqL1xuXG5pbXBvcnQgeyBOZ1N0eWxlSW50ZXJmYWNlIH0gZnJvbSAnbmctem9ycm8tYW50ZC9jb3JlL3R5cGVzJztcblxuZXhwb3J0IGZ1bmN0aW9uIGlzU3R5bGVTdXBwb3J0KHN0eWxlTmFtZTogc3RyaW5nIHwgc3RyaW5nW10pOiBib29sZWFuIHtcbiAgaWYgKHR5cGVvZiB3aW5kb3cgIT09ICd1bmRlZmluZWQnICYmIHdpbmRvdy5kb2N1bWVudCAmJiB3aW5kb3cuZG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50KSB7XG4gICAgY29uc3Qgc3R5bGVOYW1lTGlzdCA9IEFycmF5LmlzQXJyYXkoc3R5bGVOYW1lKSA/IHN0eWxlTmFtZSA6IFtzdHlsZU5hbWVdO1xuICAgIGNvbnN0IHsgZG9jdW1lbnRFbGVtZW50IH0gPSB3aW5kb3cuZG9jdW1lbnQ7XG5cbiAgICByZXR1cm4gc3R5bGVOYW1lTGlzdC5zb21lKG5hbWUgPT4gbmFtZSBpbiBkb2N1bWVudEVsZW1lbnQuc3R5bGUpO1xuICB9XG4gIHJldHVybiBmYWxzZTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGdldFN0eWxlQXNUZXh0KHN0eWxlcz86IE5nU3R5bGVJbnRlcmZhY2UpOiBzdHJpbmcge1xuICBpZiAoIXN0eWxlcykge1xuICAgIHJldHVybiAnJztcbiAgfVxuXG4gIHJldHVybiBPYmplY3Qua2V5cyhzdHlsZXMpXG4gICAgLm1hcChrZXkgPT4ge1xuICAgICAgY29uc3QgdmFsID0gc3R5bGVzW2tleV07XG4gICAgICByZXR1cm4gYCR7a2V5fToke3R5cGVvZiB2YWwgPT09ICdzdHJpbmcnID8gdmFsIDogYCR7dmFsfXB4YH1gO1xuICAgIH0pXG4gICAgLmpvaW4oJzsnKTtcbn1cbiJdfQ==