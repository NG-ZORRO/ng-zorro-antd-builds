export function getPercent(min, max, value) {
    return ((value - min) / (max - min)) * 100;
}
export function getPrecision(num) {
    const numStr = num.toString();
    const dotIndex = numStr.indexOf('.');
    return dotIndex >= 0 ? numStr.length - dotIndex - 1 : 0;
}
export function ensureNumberInRange(num, min, max) {
    if (isNaN(num) || num < min) {
        return min;
    }
    else if (num > max) {
        return max;
    }
    else {
        return num;
    }
}
export function isNumberFinite(value) {
    return typeof value === 'number' && isFinite(value);
}
export function toDecimal(value, decimal) {
    return Math.round(value * Math.pow(10, decimal)) / Math.pow(10, decimal);
}
export function sum(input, initial = 0) {
    return input.reduce((previous, current) => previous + current, initial);
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibnVtYmVyLmpzIiwic291cmNlUm9vdCI6Ii9ob21lL3ZzdHMvd29yay8xL3MvY29tcG9uZW50cy9jb3JlL3V0aWwvIiwic291cmNlcyI6WyJudW1iZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBTUEsTUFBTSxVQUFVLFVBQVUsQ0FBQyxHQUFXLEVBQUUsR0FBVyxFQUFFLEtBQWE7SUFDaEUsT0FBTyxDQUFDLENBQUMsS0FBSyxHQUFHLEdBQUcsQ0FBQyxHQUFHLENBQUMsR0FBRyxHQUFHLEdBQUcsQ0FBQyxDQUFDLEdBQUcsR0FBRyxDQUFDO0FBQzdDLENBQUM7QUFFRCxNQUFNLFVBQVUsWUFBWSxDQUFDLEdBQVc7SUFDdEMsTUFBTSxNQUFNLEdBQUcsR0FBRyxDQUFDLFFBQVEsRUFBRSxDQUFDO0lBQzlCLE1BQU0sUUFBUSxHQUFHLE1BQU0sQ0FBQyxPQUFPLENBQUMsR0FBRyxDQUFDLENBQUM7SUFDckMsT0FBTyxRQUFRLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxNQUFNLENBQUMsTUFBTSxHQUFHLFFBQVEsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztBQUMxRCxDQUFDO0FBRUQsTUFBTSxVQUFVLG1CQUFtQixDQUFDLEdBQVcsRUFBRSxHQUFXLEVBQUUsR0FBVztJQUN2RSxJQUFJLEtBQUssQ0FBQyxHQUFHLENBQUMsSUFBSSxHQUFHLEdBQUcsR0FBRyxFQUFFO1FBQzNCLE9BQU8sR0FBRyxDQUFDO0tBQ1o7U0FBTSxJQUFJLEdBQUcsR0FBRyxHQUFHLEVBQUU7UUFDcEIsT0FBTyxHQUFHLENBQUM7S0FDWjtTQUFNO1FBQ0wsT0FBTyxHQUFHLENBQUM7S0FDWjtBQUNILENBQUM7QUFFRCxNQUFNLFVBQVUsY0FBYyxDQUFDLEtBQWdCO0lBQzdDLE9BQU8sT0FBTyxLQUFLLEtBQUssUUFBUSxJQUFJLFFBQVEsQ0FBQyxLQUFLLENBQUMsQ0FBQztBQUN0RCxDQUFDO0FBRUQsTUFBTSxVQUFVLFNBQVMsQ0FBQyxLQUFhLEVBQUUsT0FBZTtJQUN0RCxPQUFPLElBQUksQ0FBQyxLQUFLLENBQUMsS0FBSyxHQUFHLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRSxFQUFFLE9BQU8sQ0FBQyxDQUFDLEdBQUcsSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLEVBQUUsT0FBTyxDQUFDLENBQUM7QUFDM0UsQ0FBQztBQUVELE1BQU0sVUFBVSxHQUFHLENBQUMsS0FBZSxFQUFFLFVBQWtCLENBQUM7SUFDdEQsT0FBTyxLQUFLLENBQUMsTUFBTSxDQUFDLENBQUMsUUFBZ0IsRUFBRSxPQUFlLEVBQUUsRUFBRSxDQUFDLFFBQVEsR0FBRyxPQUFPLEVBQUUsT0FBTyxDQUFDLENBQUM7QUFDMUYsQ0FBQyIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxuICogVXNlIG9mIHRoaXMgc291cmNlIGNvZGUgaXMgZ292ZXJuZWQgYnkgYW4gTUlULXN0eWxlIGxpY2Vuc2UgdGhhdCBjYW4gYmVcbiAqIGZvdW5kIGluIHRoZSBMSUNFTlNFIGZpbGUgYXQgaHR0cHM6Ly9naXRodWIuY29tL05HLVpPUlJPL25nLXpvcnJvLWFudGQvYmxvYi9tYXN0ZXIvTElDRU5TRVxuICovXG5pbXBvcnQgeyBOelNhZmVBbnkgfSBmcm9tICduZy16b3Jyby1hbnRkL2NvcmUvdHlwZXMnO1xuXG5leHBvcnQgZnVuY3Rpb24gZ2V0UGVyY2VudChtaW46IG51bWJlciwgbWF4OiBudW1iZXIsIHZhbHVlOiBudW1iZXIpOiBudW1iZXIge1xuICByZXR1cm4gKCh2YWx1ZSAtIG1pbikgLyAobWF4IC0gbWluKSkgKiAxMDA7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBnZXRQcmVjaXNpb24obnVtOiBudW1iZXIpOiBudW1iZXIge1xuICBjb25zdCBudW1TdHIgPSBudW0udG9TdHJpbmcoKTtcbiAgY29uc3QgZG90SW5kZXggPSBudW1TdHIuaW5kZXhPZignLicpO1xuICByZXR1cm4gZG90SW5kZXggPj0gMCA/IG51bVN0ci5sZW5ndGggLSBkb3RJbmRleCAtIDEgOiAwO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gZW5zdXJlTnVtYmVySW5SYW5nZShudW06IG51bWJlciwgbWluOiBudW1iZXIsIG1heDogbnVtYmVyKTogbnVtYmVyIHtcbiAgaWYgKGlzTmFOKG51bSkgfHwgbnVtIDwgbWluKSB7XG4gICAgcmV0dXJuIG1pbjtcbiAgfSBlbHNlIGlmIChudW0gPiBtYXgpIHtcbiAgICByZXR1cm4gbWF4O1xuICB9IGVsc2Uge1xuICAgIHJldHVybiBudW07XG4gIH1cbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGlzTnVtYmVyRmluaXRlKHZhbHVlOiBOelNhZmVBbnkpOiBib29sZWFuIHtcbiAgcmV0dXJuIHR5cGVvZiB2YWx1ZSA9PT0gJ251bWJlcicgJiYgaXNGaW5pdGUodmFsdWUpO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gdG9EZWNpbWFsKHZhbHVlOiBudW1iZXIsIGRlY2ltYWw6IG51bWJlcik6IG51bWJlciB7XG4gIHJldHVybiBNYXRoLnJvdW5kKHZhbHVlICogTWF0aC5wb3coMTAsIGRlY2ltYWwpKSAvIE1hdGgucG93KDEwLCBkZWNpbWFsKTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIHN1bShpbnB1dDogbnVtYmVyW10sIGluaXRpYWw6IG51bWJlciA9IDApOiBudW1iZXIge1xuICByZXR1cm4gaW5wdXQucmVkdWNlKChwcmV2aW91czogbnVtYmVyLCBjdXJyZW50OiBudW1iZXIpID0+IHByZXZpb3VzICsgY3VycmVudCwgaW5pdGlhbCk7XG59XG4iXX0=