/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */
import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';
import { arraysEqual, isNotNil } from 'ng-zorro-antd/core/util';
import { isShowSearchObject } from './typings';
import { isChildOption, isParentOption } from './utils';
import * as i0 from "@angular/core";
/**
 * All data is stored and parsed in NzCascaderService.
 */
export class NzCascaderService {
    constructor() {
        /** Activated options in each column. */
        this.activatedOptions = [];
        /** An array to store cascader items arranged in different layers. */
        this.columns = [];
        /** If user has entered searching mode. */
        this.inSearchingMode = false;
        /** Selected options would be output to user. */
        this.selectedOptions = [];
        this.values = [];
        this.$loading = new BehaviorSubject(false);
        /**
         * Emit an event to notify cascader it needs to redraw because activated or
         * selected options are changed.
         */
        this.$redraw = new Subject();
        /**
         * Emit an event when an option gets selected.
         * Emit true if a leaf options is selected.
         */
        this.$optionSelected = new Subject();
        /**
         * Emit an event to notify cascader it needs to quit searching mode.
         * Only emit when user do select a searching option.
         */
        this.$quitSearching = new Subject();
        /** To hold columns before entering searching mode. */
        this.columnsSnapshot = [[]];
        /** To hold activated options before entering searching mode. */
        this.activatedOptionsSnapshot = [];
    }
    /** Return cascader options in the first layer. */
    get nzOptions() {
        return this.columns[0];
    }
    ngOnDestroy() {
        this.$redraw.complete();
        this.$quitSearching.complete();
        this.$optionSelected.complete();
        this.$loading.complete();
    }
    /**
     * Make sure that value matches what is displayed in the dropdown.
     */
    syncOptions(first = false) {
        const values = this.values;
        const hasValue = values && values.length;
        const lastColumnIndex = values.length - 1;
        const initColumnWithIndex = (columnIndex) => {
            const activatedOptionSetter = () => {
                const currentValue = values[columnIndex];
                if (!isNotNil(currentValue)) {
                    this.$redraw.next();
                    return;
                }
                const option = this.findOptionWithValue(columnIndex, values[columnIndex]) ||
                    (typeof currentValue === 'object'
                        ? currentValue
                        : {
                            [`${this.cascaderComponent.nzValueProperty}`]: currentValue,
                            [`${this.cascaderComponent.nzLabelProperty}`]: currentValue
                        });
                this.setOptionActivated(option, columnIndex, false, false);
                if (columnIndex < lastColumnIndex) {
                    initColumnWithIndex(columnIndex + 1);
                }
                else {
                    this.dropBehindColumns(columnIndex);
                    this.selectedOptions = [...this.activatedOptions];
                    this.$redraw.next();
                }
            };
            if (this.isLoaded(columnIndex) || !this.cascaderComponent.nzLoadData) {
                activatedOptionSetter();
            }
            else {
                const option = this.activatedOptions[columnIndex - 1] || {};
                this.loadChildren(option, columnIndex - 1, activatedOptionSetter);
            }
        };
        this.activatedOptions = [];
        this.selectedOptions = [];
        if (first && this.cascaderComponent.nzLoadData && !hasValue) {
            // Should also notify the component that value changes. Fix #3480.
            this.$redraw.next();
            return;
        }
        else {
            initColumnWithIndex(0);
        }
    }
    /**
     * Bind cascader component so this service could use inputs.
     */
    withComponent(cascaderComponent) {
        this.cascaderComponent = cascaderComponent;
    }
    /**
     * Reset all options. Rebuild searching options if in searching mode.
     */
    withOptions(options) {
        this.columnsSnapshot = this.columns = options && options.length ? [options] : [];
        if (this.inSearchingMode) {
            this.prepareSearchOptions(this.cascaderComponent.inputValue);
        }
        else if (this.columns.length) {
            this.syncOptions();
        }
    }
    /**
     * Try to set a option as activated.
     *
     * @param option Cascader option
     * @param columnIndex Of which column this option is in
     * @param performSelect Select
     * @param loadingChildren Try to load children asynchronously.
     */
    setOptionActivated(option, columnIndex, performSelect = false, loadingChildren = true) {
        if (option.disabled) {
            return;
        }
        this.activatedOptions[columnIndex] = option;
        this.trackAncestorActivatedOptions(columnIndex);
        this.dropBehindActivatedOptions(columnIndex);
        const isParent = isParentOption(option);
        if (isParent) {
            // Parent option that has children.
            this.setColumnData(option.children, columnIndex + 1, option);
        }
        else if (!option.isLeaf && loadingChildren) {
            // Parent option that should try to load children asynchronously.
            this.loadChildren(option, columnIndex);
        }
        else if (option.isLeaf) {
            // Leaf option.
            this.dropBehindColumns(columnIndex);
        }
        // Actually perform selection to make an options not only activated but also selected.
        if (performSelect) {
            this.setOptionSelected(option, columnIndex);
        }
        this.$redraw.next();
    }
    setOptionSelected(option, index) {
        const changeOn = this.cascaderComponent.nzChangeOn;
        const shouldPerformSelection = (o, i) => typeof changeOn === 'function' ? changeOn(o, i) : false;
        if (option.isLeaf || this.cascaderComponent.nzChangeOnSelect || shouldPerformSelection(option, index)) {
            this.selectedOptions = [...this.activatedOptions];
            this.prepareEmitValue();
            this.$redraw.next();
            this.$optionSelected.next({ option, index });
        }
    }
    setOptionDeactivatedSinceColumn(column) {
        this.dropBehindActivatedOptions(column - 1);
        this.dropBehindColumns(column);
        this.$redraw.next();
    }
    /**
     * Set a searching option as selected, finishing up things.
     *
     * @param option
     */
    setSearchOptionSelected(option) {
        this.activatedOptions = [option];
        this.selectedOptions = [...option.path];
        this.prepareEmitValue();
        this.$redraw.next();
        this.$optionSelected.next({ option, index: 0 });
        setTimeout(() => {
            // Reset data and tell UI only to remove input and reset dropdown width style.
            this.$quitSearching.next();
            this.$redraw.next();
            this.inSearchingMode = false;
            this.columns = [...this.columnsSnapshot];
            this.activatedOptions = [...this.selectedOptions];
        }, 200);
    }
    /**
     * Filter cascader options to reset `columns`.
     *
     * @param searchValue The string user wants to search.
     */
    prepareSearchOptions(searchValue) {
        const results = []; // Search results only have one layer.
        const path = [];
        const defaultFilter = (i, p) => p.some(o => {
            const label = this.getOptionLabel(o);
            return !!label && label.indexOf(i) !== -1;
        });
        const showSearch = this.cascaderComponent.nzShowSearch;
        const filter = isShowSearchObject(showSearch) && showSearch.filter ? showSearch.filter : defaultFilter;
        const sorter = isShowSearchObject(showSearch) && showSearch.sorter ? showSearch.sorter : null;
        const loopChild = (node, forceDisabled = false) => {
            path.push(node);
            const cPath = Array.from(path);
            if (filter(searchValue, cPath)) {
                const disabled = forceDisabled || node.disabled;
                const option = {
                    disabled,
                    isLeaf: true,
                    path: cPath,
                    [this.cascaderComponent.nzLabelProperty]: cPath.map(p => this.getOptionLabel(p)).join(' / ')
                };
                results.push(option);
            }
            path.pop();
        };
        const loopParent = (node, forceDisabled = false) => {
            const disabled = forceDisabled || node.disabled;
            path.push(node);
            node.children.forEach(sNode => {
                if (!sNode.parent) {
                    sNode.parent = node;
                }
                if (!sNode.isLeaf) {
                    loopParent(sNode, disabled);
                }
                if (sNode.isLeaf || !sNode.children || !sNode.children.length) {
                    loopChild(sNode, disabled);
                }
            });
            path.pop();
        };
        if (!this.columnsSnapshot.length) {
            this.columns = [[]];
            return;
        }
        this.columnsSnapshot[0].forEach(o => (isChildOption(o) ? loopChild(o) : loopParent(o)));
        if (sorter) {
            results.sort((a, b) => sorter(a.path, b.path, searchValue));
        }
        this.columns = [results];
        this.$redraw.next(); // Search results may be empty, so should redraw.
    }
    /**
     * Toggle searching mode by UI. It deals with things not directly related to UI.
     *
     * @param toSearching If this cascader is entering searching mode
     */
    toggleSearchingMode(toSearching) {
        this.inSearchingMode = toSearching;
        if (toSearching) {
            this.activatedOptionsSnapshot = [...this.activatedOptions];
            this.activatedOptions = [];
            this.selectedOptions = [];
            this.$redraw.next();
        }
        else {
            // User quit searching mode without selecting an option.
            this.activatedOptions = [...this.activatedOptionsSnapshot];
            this.selectedOptions = [...this.activatedOptions];
            this.columns = [...this.columnsSnapshot];
            this.syncOptions();
            this.$redraw.next();
        }
    }
    /**
     * Clear selected options.
     */
    clear() {
        this.values = [];
        this.selectedOptions = [];
        this.activatedOptions = [];
        this.dropBehindColumns(0);
        this.$redraw.next();
        this.$optionSelected.next(null);
    }
    getOptionLabel(o) {
        return o[this.cascaderComponent.nzLabelProperty || 'label'];
    }
    getOptionValue(o) {
        return o[this.cascaderComponent.nzValueProperty || 'value'];
    }
    /**
     * Try to insert options into a column.
     *
     * @param options Options to insert
     * @param columnIndex Position
     */
    setColumnData(options, columnIndex, parent) {
        const existingOptions = this.columns[columnIndex];
        if (!arraysEqual(existingOptions, options)) {
            options.forEach(o => (o.parent = parent));
            this.columns[columnIndex] = options;
            this.dropBehindColumns(columnIndex);
        }
    }
    /**
     * Set all ancestor options as activated.
     */
    trackAncestorActivatedOptions(startIndex) {
        for (let i = startIndex - 1; i >= 0; i--) {
            if (!this.activatedOptions[i]) {
                this.activatedOptions[i] = this.activatedOptions[i + 1].parent;
            }
        }
    }
    dropBehindActivatedOptions(lastReserveIndex) {
        this.activatedOptions = this.activatedOptions.splice(0, lastReserveIndex + 1);
    }
    dropBehindColumns(lastReserveIndex) {
        if (lastReserveIndex < this.columns.length - 1) {
            this.columns = this.columns.slice(0, lastReserveIndex + 1);
        }
    }
    /**
     * Load children of an option asynchronously.
     */
    loadChildren(option, columnIndex, success, failure) {
        const loadFn = this.cascaderComponent.nzLoadData;
        if (loadFn) {
            // If there isn't any option in columns.
            this.$loading.next(columnIndex < 0);
            if (typeof option === 'object') {
                option.loading = true;
            }
            loadFn(option, columnIndex).then(() => {
                option.loading = false;
                if (option.children) {
                    this.setColumnData(option.children, columnIndex + 1, option);
                }
                if (success) {
                    success();
                }
                this.$loading.next(false);
                this.$redraw.next();
            }, () => {
                option.loading = false;
                option.isLeaf = true;
                if (failure) {
                    failure();
                }
                this.$redraw.next();
            });
        }
    }
    isLoaded(index) {
        return this.columns[index] && this.columns[index].length > 0;
    }
    /**
     * Find a option that has a given value in a given column.
     */
    findOptionWithValue(columnIndex, value) {
        const targetColumn = this.columns[columnIndex];
        if (targetColumn) {
            const v = typeof value === 'object' ? this.getOptionValue(value) : value;
            return targetColumn.find(o => v === this.getOptionValue(o));
        }
        return null;
    }
    prepareEmitValue() {
        this.values = this.selectedOptions.map(o => this.getOptionValue(o));
    }
}
NzCascaderService.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.1.2", ngImport: i0, type: NzCascaderService, deps: [], target: i0.ɵɵFactoryTarget.Injectable });
NzCascaderService.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "13.1.2", ngImport: i0, type: NzCascaderService });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.1.2", ngImport: i0, type: NzCascaderService, decorators: [{
            type: Injectable
        }] });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2FzY2FkZXIuc2VydmljZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL2NvbXBvbmVudHMvY2FzY2FkZXIvY2FzY2FkZXIuc2VydmljZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7O0dBR0c7QUFFSCxPQUFPLEVBQUUsVUFBVSxFQUFhLE1BQU0sZUFBZSxDQUFDO0FBQ3RELE9BQU8sRUFBRSxlQUFlLEVBQUUsT0FBTyxFQUFFLE1BQU0sTUFBTSxDQUFDO0FBR2hELE9BQU8sRUFBRSxXQUFXLEVBQUUsUUFBUSxFQUFFLE1BQU0seUJBQXlCLENBQUM7QUFFaEUsT0FBTyxFQUNMLGtCQUFrQixFQUtuQixNQUFNLFdBQVcsQ0FBQztBQUNuQixPQUFPLEVBQUUsYUFBYSxFQUFFLGNBQWMsRUFBRSxNQUFNLFNBQVMsQ0FBQzs7QUFFeEQ7O0dBRUc7QUFFSCxNQUFNLE9BQU8saUJBQWlCO0lBRDlCO1FBRUUsd0NBQXdDO1FBQ3hDLHFCQUFnQixHQUF1QixFQUFFLENBQUM7UUFFMUMscUVBQXFFO1FBQ3JFLFlBQU8sR0FBeUIsRUFBRSxDQUFDO1FBRW5DLDBDQUEwQztRQUMxQyxvQkFBZSxHQUFHLEtBQUssQ0FBQztRQUV4QixnREFBZ0Q7UUFDaEQsb0JBQWUsR0FBdUIsRUFBRSxDQUFDO1FBRXpDLFdBQU0sR0FBZ0IsRUFBRSxDQUFDO1FBRWhCLGFBQVEsR0FBRyxJQUFJLGVBQWUsQ0FBVSxLQUFLLENBQUMsQ0FBQztRQUV4RDs7O1dBR0c7UUFDTSxZQUFPLEdBQUcsSUFBSSxPQUFPLEVBQVEsQ0FBQztRQUV2Qzs7O1dBR0c7UUFDTSxvQkFBZSxHQUFHLElBQUksT0FBTyxFQUczQixDQUFDO1FBRVo7OztXQUdHO1FBQ00sbUJBQWMsR0FBRyxJQUFJLE9BQU8sRUFBUSxDQUFDO1FBRTlDLHNEQUFzRDtRQUM5QyxvQkFBZSxHQUF5QixDQUFDLEVBQUUsQ0FBQyxDQUFDO1FBRXJELGdFQUFnRTtRQUN4RCw2QkFBd0IsR0FBdUIs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QU0sWUFBWSxHQUFHLElBQUksQ0FBQyxPQUFPLENBQUMsV0FBVyxDQUFDLENBQUM7UUFDL0MsSUFBSSxZQUFZLEVBQUU7WUFDaEIsTUFBTSxDQUFDLEdBQUcsT0FBTyxLQUFLLEtBQUssUUFBUSxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsY0FBYyxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUM7WUFDekUsT0FBTyxZQUFZLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxLQUFLLElBQUksQ0FBQyxjQUFjLENBQUMsQ0FBQyxDQUFDLENBQUUsQ0FBQztTQUM5RDtRQUNELE9BQU8sSUFBSSxDQUFDO0lBQ2QsQ0FBQztJQUVPLGdCQUFnQjtRQUN0QixJQUFJLENBQUMsTUFBTSxHQUFHLElBQUksQ0FBQyxlQUFlLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsSUFBSSxDQUFDLGNBQWMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO0lBQ3RFLENBQUM7OzhHQXRhVSxpQkFBaUI7a0hBQWpCLGlCQUFpQjsyRkFBakIsaUJBQWlCO2tCQUQ3QixVQUFVIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKiBVc2Ugb2YgdGhpcyBzb3VyY2UgY29kZSBpcyBnb3Zlcm5lZCBieSBhbiBNSVQtc3R5bGUgbGljZW5zZSB0aGF0IGNhbiBiZVxuICogZm91bmQgaW4gdGhlIExJQ0VOU0UgZmlsZSBhdCBodHRwczovL2dpdGh1Yi5jb20vTkctWk9SUk8vbmctem9ycm8tYW50ZC9ibG9iL21hc3Rlci9MSUNFTlNFXG4gKi9cblxuaW1wb3J0IHsgSW5qZWN0YWJsZSwgT25EZXN0cm95IH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBCZWhhdmlvclN1YmplY3QsIFN1YmplY3QgfSBmcm9tICdyeGpzJztcblxuaW1wb3J0IHsgTnpTYWZlQW55IH0gZnJvbSAnbmctem9ycm8tYW50ZC9jb3JlL3R5cGVzJztcbmltcG9ydCB7IGFycmF5c0VxdWFsLCBpc05vdE5pbCB9IGZyb20gJ25nLXpvcnJvLWFudGQvY29yZS91dGlsJztcblxuaW1wb3J0IHtcbiAgaXNTaG93U2VhcmNoT2JqZWN0LFxuICBOekNhc2NhZGVyQ29tcG9uZW50QXNTb3VyY2UsXG4gIE56Q2FzY2FkZXJGaWx0ZXIsXG4gIE56Q2FzY2FkZXJPcHRpb24sXG4gIE56Q2FzY2FkZXJTZWFyY2hPcHRpb25cbn0gZnJvbSAnLi90eXBpbmdzJztcbmltcG9ydCB7IGlzQ2hpbGRPcHRpb24sIGlzUGFyZW50T3B0aW9uIH0gZnJvbSAnLi91dGlscyc7XG5cbi8qKlxuICogQWxsIGRhdGEgaXMgc3RvcmVkIGFuZCBwYXJzZWQgaW4gTnpDYXNjYWRlclNlcnZpY2UuXG4gKi9cbkBJbmplY3RhYmxlKClcbmV4cG9ydCBjbGFzcyBOekNhc2NhZGVyU2VydmljZSBpbXBsZW1lbnRzIE9uRGVzdHJveSB7XG4gIC8qKiBBY3RpdmF0ZWQgb3B0aW9ucyBpbiBlYWNoIGNvbHVtbi4gKi9cbiAgYWN0aXZhdGVkT3B0aW9uczogTnpDYXNjYWRlck9wdGlvbltdID0gW107XG5cbiAgLyoqIEFuIGFycmF5IHRvIHN0b3JlIGNhc2NhZGVyIGl0ZW1zIGFycmFuZ2VkIGluIGRpZmZlcmVudCBsYXllcnMuICovXG4gIGNvbHVtbnM6IE56Q2FzY2FkZXJPcHRpb25bXVtdID0gW107XG5cbiAgLyoqIElmIHVzZXIgaGFzIGVudGVyZWQgc2VhcmNoaW5nIG1vZGUuICovXG4gIGluU2VhcmNoaW5nTW9kZSA9IGZhbHNlO1xuXG4gIC8qKiBTZWxlY3RlZCBvcHRpb25zIHdvdWxkIGJlIG91dHB1dCB0byB1c2VyLiAqL1xuICBzZWxlY3RlZE9wdGlvbnM6IE56Q2FzY2FkZXJPcHRpb25bXSA9IFtdO1xuXG4gIHZhbHVlczogTnpTYWZlQW55W10gPSBbXTtcblxuICByZWFkb25seSAkbG9hZGluZyA9IG5ldyBCZWhhdmlvclN1YmplY3Q8Ym9vbGVhbj4oZmFsc2UpO1xuXG4gIC8qKlxuICAgKiBFbWl0IGFuIGV2ZW50IHRvIG5vdGlmeSBjYXNjYWRlciBpdCBuZWVkcyB0byByZWRyYXcgYmVjYXVzZSBhY3RpdmF0ZWQgb3JcbiAgICogc2VsZWN0ZWQgb3B0aW9ucyBhcmUgY2hhbmdlZC5cbiAgICovXG4gIHJlYWRvbmx5ICRyZWRyYXcgPSBuZXcgU3ViamVjdDx2b2lkPigpO1xuXG4gIC8qKlxuICAgKiBFbWl0IGFuIGV2ZW50IHdoZW4gYW4gb3B0aW9uIGdldHMgc2VsZWN0ZWQuXG4gICAqIEVtaXQgdHJ1ZSBpZiBhIGxlYWYgb3B0aW9ucyBpcyBzZWxlY3RlZC5cbiAgICovXG4gIHJlYWRvbmx5ICRvcHRpb25TZWxlY3RlZCA9IG5ldyBTdWJqZWN0PHtcbiAgICBvcHRpb246IE56Q2FzY2FkZXJPcHRpb247XG4gICAgaW5kZXg6IG51bWJlcjtcbiAgfSB8IG51bGw+KCk7XG5cbiAgLyoqXG4gICAqIEVtaXQgYW4gZXZlbnQgdG8gbm90aWZ5IGNhc2NhZGVyIGl0IG5lZWRzIHRvIHF1aXQgc2VhcmNoaW5nIG1vZGUuXG4gICAqIE9ubHkgZW1pdCB3aGVuIHVzZXIgZG8gc2VsZWN0IGEgc2VhcmNoaW5nIG9wdGlvbi5cbiAgICovXG4gIHJlYWRvbmx5ICRxdWl0U2VhcmNoaW5nID0gbmV3IFN1YmplY3Q8dm9pZD4oKTtcblxuICAvKiogVG8gaG9sZCBjb2x1bW5zIGJlZm9yZSBlbnRlcmluZyBzZWFyY2hpbmcgbW9kZS4gKi9cbiAgcHJpdmF0ZSBjb2x1bW5zU25hcHNob3Q6IE56Q2FzY2FkZXJPcHRpb25bXVtdID0gW1tdXTtcblxuICAvKiogVG8gaG9sZCBhY3RpdmF0ZWQgb3B0aW9ucyBiZWZvcmUgZW50ZXJpbmcgc2VhcmNoaW5nIG1vZGUuICovXG4gIHByaXZhdGUgYWN0aXZhdGVkT3B0aW9uc1NuYXBzaG90OiBOekNhc2NhZGVyT3B0aW9uW10gPSBbXTtcblxuICBwcml2YXRlIGNhc2NhZGVyQ29tcG9uZW50ITogTnpDYXNjYWRlckNvbXBvbmVudEFzU291cmNlO1xuXG4gIC8qKiBSZXR1cm4gY2FzY2FkZXIgb3B0aW9ucyBpbiB0aGUgZmlyc3QgbGF5ZXIuICovXG4gIGdldCBuek9wdGlvbnMoKTogTnpDYXNjYWRlck9wdGlvbltdIHtcbiAgICByZXR1cm4gdGhpcy5jb2x1bW5zWzBdO1xuICB9XG5cbiAgbmdPbkRlc3Ryb3koKTogdm9pZCB7XG4gICAgdGhpcy4kcmVkcmF3LmNvbXBsZXRlKCk7XG4gICAgdGhpcy4kcXVpdFNlYXJjaGluZy5jb21wbGV0ZSgpO1xuICAgIHRoaXMuJG9wdGlvblNlbGVjdGVkLmNvbXBsZXRlKCk7XG4gICAgdGhpcy4kbG9hZGluZy5jb21wbGV0ZSgpO1xuICB9XG5cbiAgLyoqXG4gICAqIE1ha2Ugc3VyZSB0aGF0IHZhbHVlIG1hdGNoZXMgd2hhdCBpcyBkaXNwbGF5ZWQgaW4gdGhlIGRyb3Bkb3duLlxuICAgKi9cbiAgc3luY09wdGlvbnMoZmlyc3Q6IGJvb2xlYW4gPSBmYWxzZSk6IHZvaWQge1xuICAgIGNvbnN0IHZhbHVlcyA9IHRoaXMudmFsdWVzO1xuICAgIGNvbnN0IGhhc1ZhbHVlID0gdmFsdWVzICYmIHZhbHVlcy5sZW5ndGg7XG4gICAgY29uc3QgbGFzdENvbHVtbkluZGV4ID0gdmFsdWVzLmxlbmd0aCAtIDE7XG4gICAgY29uc3QgaW5pdENvbHVtbldpdGhJbmRleCA9IChjb2x1bW5JbmRleDogbnVtYmVyKTogdm9pZCA9PiB7XG4gICAgICBjb25zdCBhY3RpdmF0ZWRPcHRpb25TZXR0ZXIgPSAoKTogdm9pZCA9PiB7XG4gICAgICAgIGNvbnN0IGN1cnJlbnRWYWx1ZSA9IHZhbHVlc1tjb2x1bW5JbmRleF07XG5cbiAgICAgICAgaWYgKCFpc05vdE5pbChjdXJyZW50VmFsdWUpKSB7XG4gICAgICAgICAgdGhpcy4kcmVkcmF3Lm5leHQoKTtcbiAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cblxuICAgICAgICBjb25zdCBvcHRpb24gPVxuICAgICAgICAgIHRoaXMuZmluZE9wdGlvbldpdGhWYWx1ZShjb2x1bW5JbmRleCwgdmFsdWVzW2NvbHVtbkluZGV4XSkgfHxcbiAgICAgICAgICAodHlwZW9mIGN1cnJlbnRWYWx1ZSA9PT0gJ29iamVjdCdcbiAgICAgICAgICAgID8gY3VycmVudFZhbHVlXG4gICAgICAgICAgICA6IHtcbiAgICAgICAgICAgICAgICBbYCR7dGhpcy5jYXNjYWRlckNvbXBvbmVudC5uelZhbHVlUHJvcGVydHl9YF06IGN1cnJlbnRWYWx1ZSxcbiAgICAgICAgICAgICAgICBbYCR7dGhpcy5jYXNjYWRlckNvbXBvbmVudC5uekxhYmVsUHJvcGVydHl9YF06IGN1cnJlbnRWYWx1ZVxuICAgICAgICAgICAgICB9KTtcblxuICAgICAgICB0aGlzLnNldE9wdGlvbkFjdGl2YXRlZChvcHRpb24sIGNvbHVtbkluZGV4LCBmYWxzZSwgZmFsc2UpO1xuXG4gICAgICAgIGlmIChjb2x1bW5JbmRleCA8IGxhc3RDb2x1bW5JbmRleCkge1xuICAgICAgICAgIGluaXRDb2x1bW5XaXRoSW5kZXgoY29sdW1uSW5kZXggKyAxKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICB0aGlzLmRyb3BCZWhpbmRDb2x1bW5zKGNvbHVtbkluZGV4KTtcbiAgICAgICAgICB0aGlzLnNlbGVjdGVkT3B0aW9ucyA9IFsuLi50aGlzLmFjdGl2YXRlZE9wdGlvbnNdO1xuICAgICAgICAgIHRoaXMuJHJlZHJhdy5uZXh0KCk7XG4gICAgICAgIH1cbiAgICAgIH07XG5cbiAgICAgIGlmICh0aGlzLmlzTG9hZGVkKGNvbHVtbkluZGV4KSB8fCAhdGhpcy5jYXNjYWRlckNvbXBvbmVudC5uekxvYWREYXRhKSB7XG4gICAgICAgIGFjdGl2YXRlZE9wdGlvblNldHRlcigpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgY29uc3Qgb3B0aW9uID0gdGhpcy5hY3RpdmF0ZWRPcHRpb25zW2NvbHVtbkluZGV4IC0gMV0gfHwge307XG4gICAgICAgIHRoaXMubG9hZENoaWxkcmVuKG9wdGlvbiwgY29sdW1uSW5kZXggLSAxLCBhY3RpdmF0ZWRPcHRpb25TZXR0ZXIpO1xuICAgICAgfVxuICAgIH07XG5cbiAgICB0aGlzLmFjdGl2YXRlZE9wdGlvbnMgPSBbXTtcbiAgICB0aGlzLnNlbGVjdGVkT3B0aW9ucyA9IFtdO1xuXG4gICAgaWYgKGZpcnN0ICYmIHRoaXMuY2FzY2FkZXJDb21wb25lbnQubnpMb2FkRGF0YSAmJiAhaGFzVmFsdWUpIHtcbiAgICAgIC8vIFNob3VsZCBhbHNvIG5vdGlmeSB0aGUgY29tcG9uZW50IHRoYXQgdmFsdWUgY2hhbmdlcy4gRml4ICMzNDgwLlxuICAgICAgdGhpcy4kcmVkcmF3Lm5leHQoKTtcbiAgICAgIHJldHVybjtcbiAgICB9IGVsc2Uge1xuICAgICAgaW5pdENvbHVtbldpdGhJbmRleCgwKTtcbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogQmluZCBjYXNjYWRlciBjb21wb25lbnQgc28gdGhpcyBzZXJ2aWNlIGNvdWxkIHVzZSBpbnB1dHMuXG4gICAqL1xuICB3aXRoQ29tcG9uZW50KGNhc2NhZGVyQ29tcG9uZW50OiBOekNhc2NhZGVyQ29tcG9uZW50QXNTb3VyY2UpOiB2b2lkIHtcbiAgICB0aGlzLmNhc2NhZGVyQ29tcG9uZW50ID0gY2FzY2FkZXJDb21wb25lbnQ7XG4gIH1cblxuICAvKipcbiAgICogUmVzZXQgYWxsIG9wdGlvbnMuIFJlYnVpbGQgc2VhcmNoaW5nIG9wdGlvbnMgaWYgaW4gc2VhcmNoaW5nIG1vZGUuXG4gICAqL1xuICB3aXRoT3B0aW9ucyhvcHRpb25zOiBOekNhc2NhZGVyT3B0aW9uW10gfCBudWxsKTogdm9pZCB7XG4gICAgdGhpcy5jb2x1bW5zU25hcHNob3QgPSB0aGlzLmNvbHVtbnMgPSBvcHRpb25zICYmIG9wdGlvbnMubGVuZ3RoID8gW29wdGlvbnNdIDogW107XG5cbiAgICBpZiAodGhpcy5pblNlYXJjaGluZ01vZGUpIHtcbiAgICAgIHRoaXMucHJlcGFyZVNlYXJjaE9wdGlvbnModGhpcy5jYXNjYWRlckNvbXBvbmVudC5pbnB1dFZhbHVlKTtcbiAgICB9IGVsc2UgaWYgKHRoaXMuY29sdW1ucy5sZW5ndGgpIHtcbiAgICAgIHRoaXMuc3luY09wdGlvbnMoKTtcbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogVHJ5IHRvIHNldCBhIG9wdGlvbiBhcyBhY3RpdmF0ZWQuXG4gICAqXG4gICAqIEBwYXJhbSBvcHRpb24gQ2FzY2FkZXIgb3B0aW9uXG4gICAqIEBwYXJhbSBjb2x1bW5JbmRleCBPZiB3aGljaCBjb2x1bW4gdGhpcyBvcHRpb24gaXMgaW5cbiAgICogQHBhcmFtIHBlcmZvcm1TZWxlY3QgU2VsZWN0XG4gICAqIEBwYXJhbSBsb2FkaW5nQ2hpbGRyZW4gVHJ5IHRvIGxvYWQgY2hpbGRyZW4gYXN5bmNocm9ub3VzbHkuXG4gICAqL1xuICBzZXRPcHRpb25BY3RpdmF0ZWQoXG4gICAgb3B0aW9uOiBOekNhc2NhZGVyT3B0aW9uLFxuICAgIGNvbHVtbkluZGV4OiBudW1iZXIsXG4gICAgcGVyZm9ybVNlbGVjdDogYm9vbGVhbiA9IGZhbHNlLFxuICAgIGxvYWRpbmdDaGlsZHJlbjogYm9vbGVhbiA9IHRydWVcbiAgKTogdm9pZCB7XG4gICAgaWYgKG9wdGlvbi5kaXNhYmxlZCkge1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIHRoaXMuYWN0aXZhdGVkT3B0aW9uc1tjb2x1bW5JbmRleF0gPSBvcHRpb247XG4gICAgdGhpcy50cmFja0FuY2VzdG9yQWN0aXZhdGVkT3B0aW9ucyhjb2x1bW5JbmRleCk7XG4gICAgdGhpcy5kcm9wQmVoaW5kQWN0aXZhdGVkT3B0aW9ucyhjb2x1bW5JbmRleCk7XG5cbiAgICBjb25zdCBpc1BhcmVudCA9IGlzUGFyZW50T3B0aW9uKG9wdGlvbik7XG5cbiAgICBpZiAoaXNQYXJlbnQpIHtcbiAgICAgIC8vIFBhcmVudCBvcHRpb24gdGhhdCBoYXMgY2hpbGRyZW4uXG4gICAgICB0aGlzLnNldENvbHVtbkRhdGEob3B0aW9uLmNoaWxkcmVuISwgY29sdW1uSW5kZXggKyAxLCBvcHRpb24pO1xuICAgIH0gZWxzZSBpZiAoIW9wdGlvbi5pc0xlYWYgJiYgbG9hZGluZ0NoaWxkcmVuKSB7XG4gICAgICAvLyBQYXJlbnQgb3B0aW9uIHRoYXQgc2hvdWxkIHRyeSB0byBsb2FkIGNoaWxkcmVuIGFzeW5jaHJvbm91c2x5LlxuICAgICAgdGhpcy5sb2FkQ2hpbGRyZW4ob3B0aW9uLCBjb2x1bW5JbmRleCk7XG4gICAgfSBlbHNlIGlmIChvcHRpb24uaXNMZWFmKSB7XG4gICAgICAvLyBMZWFmIG9wdGlvbi5cbiAgICAgIHRoaXMuZHJvcEJlaGluZENvbHVtbnMoY29sdW1uSW5kZXgpO1xuICAgIH1cblxuICAgIC8vIEFjdHVhbGx5IHBlcmZvcm0gc2VsZWN0aW9uIHRvIG1ha2UgYW4gb3B0aW9ucyBub3Qgb25seSBhY3RpdmF0ZWQgYnV0IGFsc28gc2VsZWN0ZWQuXG4gICAgaWYgKHBlcmZvcm1TZWxlY3QpIHtcbiAgICAgIHRoaXMuc2V0T3B0aW9uU2VsZWN0ZWQob3B0aW9uLCBjb2x1bW5JbmRleCk7XG4gICAgfVxuXG4gICAgdGhpcy4kcmVkcmF3Lm5leHQoKTtcbiAgfVxuXG4gIHNldE9wdGlvblNlbGVjdGVkKG9wdGlvbjogTnpDYXNjYWRlck9wdGlvbiwgaW5kZXg6IG51bWJlcik6IHZvaWQge1xuICAgIGNvbnN0IGNoYW5nZU9uID0gdGhpcy5jYXNjYWRlckNvbXBvbmVudC5uekNoYW5nZU9uO1xuICAgIGNvbnN0IHNob3VsZFBlcmZvcm1TZWxlY3Rpb24gPSAobzogTnpDYXNjYWRlck9wdGlvbiwgaTogbnVtYmVyKTogYm9vbGVhbiA9PlxuICAgICAgdHlwZW9mIGNoYW5nZU9uID09PSAnZnVuY3Rpb24nID8gY2hhbmdlT24obywgaSkgOiBmYWxzZTtcblxuICAgIGlmIChvcHRpb24uaXNMZWFmIHx8IHRoaXMuY2FzY2FkZXJDb21wb25lbnQubnpDaGFuZ2VPblNlbGVjdCB8fCBzaG91bGRQZXJmb3JtU2VsZWN0aW9uKG9wdGlvbiwgaW5kZXgpKSB7XG4gICAgICB0aGlzLnNlbGVjdGVkT3B0aW9ucyA9IFsuLi50aGlzLmFjdGl2YXRlZE9wdGlvbnNdO1xuICAgICAgdGhpcy5wcmVwYXJlRW1pdFZhbHVlKCk7XG4gICAgICB0aGlzLiRyZWRyYXcubmV4dCgpO1xuICAgICAgdGhpcy4kb3B0aW9uU2VsZWN0ZWQubmV4dCh7IG9wdGlvbiwgaW5kZXggfSk7XG4gICAgfVxuICB9XG5cbiAgc2V0T3B0aW9uRGVhY3RpdmF0ZWRTaW5jZUNvbHVtbihjb2x1bW46IG51bWJlcik6IHZvaWQge1xuICAgIHRoaXMuZHJvcEJlaGluZEFjdGl2YXRlZE9wdGlvbnMoY29sdW1uIC0gMSk7XG4gICAgdGhpcy5kcm9wQmVoaW5kQ29sdW1ucyhjb2x1bW4pO1xuICAgIHRoaXMuJHJlZHJhdy5uZXh0KCk7XG4gIH1cblxuICAvKipcbiAgICogU2V0IGEgc2VhcmNoaW5nIG9wdGlvbiBhcyBzZWxlY3RlZCwgZmluaXNoaW5nIHVwIHRoaW5ncy5cbiAgICpcbiAgICogQHBhcmFtIG9wdGlvblxuICAgKi9cbiAgc2V0U2VhcmNoT3B0aW9uU2VsZWN0ZWQob3B0aW9uOiBOekNhc2NhZGVyU2VhcmNoT3B0aW9uKTogdm9pZCB7XG4gICAgdGhpcy5hY3RpdmF0ZWRPcHRpb25zID0gW29wdGlvbl07XG4gICAgdGhpcy5zZWxlY3RlZE9wdGlvbnMgPSBbLi4ub3B0aW9uLnBhdGhdO1xuICAgIHRoaXMucHJlcGFyZUVtaXRWYWx1ZSgpO1xuICAgIHRoaXMuJHJlZHJhdy5uZXh0KCk7XG4gICAgdGhpcy4kb3B0aW9uU2VsZWN0ZWQubmV4dCh7IG9wdGlvbiwgaW5kZXg6IDAgfSk7XG5cbiAgICBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgIC8vIFJlc2V0IGRhdGEgYW5kIHRlbGwgVUkgb25seSB0byByZW1vdmUgaW5wdXQgYW5kIHJlc2V0IGRyb3Bkb3duIHdpZHRoIHN0eWxlLlxuICAgICAgdGhpcy4kcXVpdFNlYXJjaGluZy5uZXh0KCk7XG4gICAgICB0aGlzLiRyZWRyYXcubmV4dCgpO1xuICAgICAgdGhpcy5pblNlYXJjaGluZ01vZGUgPSBmYWxzZTtcbiAgICAgIHRoaXMuY29sdW1ucyA9IFsuLi50aGlzLmNvbHVtbnNTbmFwc2hvdF07XG4gICAgICB0aGlzLmFjdGl2YXRlZE9wdGlvbnMgPSBbLi4udGhpcy5zZWxlY3RlZE9wdGlvbnNdO1xuICAgIH0sIDIwMCk7XG4gIH1cblxuICAvKipcbiAgICogRmlsdGVyIGNhc2NhZGVyIG9wdGlvbnMgdG8gcmVzZXQgYGNvbHVtbnNgLlxuICAgKlxuICAgKiBAcGFyYW0gc2VhcmNoVmFsdWUgVGhlIHN0cmluZyB1c2VyIHdhbnRzIHRvIHNlYXJjaC5cbiAgICovXG4gIHByZXBhcmVTZWFyY2hPcHRpb25zKHNlYXJjaFZhbHVlOiBzdHJpbmcpOiB2b2lkIHtcbiAgICBjb25zdCByZXN1bHRzOiBOekNhc2NhZGVyT3B0aW9uW10gPSBbXTsgLy8gU2VhcmNoIHJlc3VsdHMgb25seSBoYXZlIG9uZSBsYXllci5cbiAgICBjb25zdCBwYXRoOiBOekNhc2NhZGVyT3B0aW9uW10gPSBbXTtcbiAgICBjb25zdCBkZWZhdWx0RmlsdGVyOiBOekNhc2NhZGVyRmlsdGVyID0gKGksIHApID0+XG4gICAgICBwLnNvbWUobyA9PiB7XG4gICAgICAgIGNvbnN0IGxhYmVsID0gdGhpcy5nZXRPcHRpb25MYWJlbChvKTtcbiAgICAgICAgcmV0dXJuICEhbGFiZWwgJiYgbGFiZWwuaW5kZXhPZihpKSAhPT0gLTE7XG4gICAgICB9KTtcbiAgICBjb25zdCBzaG93U2VhcmNoID0gdGhpcy5jYXNjYWRlckNvbXBvbmVudC5uelNob3dTZWFyY2g7XG4gICAgY29uc3QgZmlsdGVyID0gaXNTaG93U2VhcmNoT2JqZWN0KHNob3dTZWFyY2gpICYmIHNob3dTZWFyY2guZmlsdGVyID8gc2hvd1NlYXJjaC5maWx0ZXIgOiBkZWZhdWx0RmlsdGVyO1xuICAgIGNvbnN0IHNvcnRlciA9IGlzU2hvd1NlYXJjaE9iamVjdChzaG93U2VhcmNoKSAmJiBzaG93U2VhcmNoLnNvcnRlciA/IHNob3dTZWFyY2guc29ydGVyIDogbnVsbDtcbiAgICBjb25zdCBsb29wQ2hpbGQgPSAobm9kZTogTnpDYXNjYWRlck9wdGlvbiwgZm9yY2VEaXNhYmxlZCA9IGZhbHNlKTogdm9pZCA9PiB7XG4gICAgICBwYXRoLnB1c2gobm9kZSk7XG4gICAgICBjb25zdCBjUGF0aCA9IEFycmF5LmZyb20ocGF0aCk7XG4gICAgICBpZiAoZmlsdGVyKHNlYXJjaFZhbHVlLCBjUGF0aCkpIHtcbiAgICAgICAgY29uc3QgZGlzYWJsZWQgPSBmb3JjZURpc2FibGVkIHx8IG5vZGUuZGlzYWJsZWQ7XG4gICAgICAgIGNvbnN0IG9wdGlvbjogTnpDYXNjYWRlclNlYXJjaE9wdGlvbiA9IHtcbiAgICAgICAgICBkaXNhYmxlZCxcbiAgICAgICAgICBpc0xlYWY6IHRydWUsXG4gICAgICAgICAgcGF0aDogY1BhdGgsXG4gICAgICAgICAgW3RoaXMuY2FzY2FkZXJDb21wb25lbnQubnpMYWJlbFByb3BlcnR5XTogY1BhdGgubWFwKHAgPT4gdGhpcy5nZXRPcHRpb25MYWJlbChwKSkuam9pbignIC8gJylcbiAgICAgICAgfTtcbiAgICAgICAgcmVzdWx0cy5wdXNoKG9wdGlvbik7XG4gICAgICB9XG4gICAgICBwYXRoLnBvcCgpO1xuICAgIH07XG4gICAgY29uc3QgbG9vcFBhcmVudCA9IChub2RlOiBOekNhc2NhZGVyT3B0aW9uLCBmb3JjZURpc2FibGVkID0gZmFsc2UpOiB2b2lkID0+IHtcbiAgICAgIGNvbnN0IGRpc2FibGVkID0gZm9yY2VEaXNhYmxlZCB8fCBub2RlLmRpc2FibGVkO1xuICAgICAgcGF0aC5wdXNoKG5vZGUpO1xuICAgICAgbm9kZS5jaGlsZHJlbiEuZm9yRWFjaChzTm9kZSA9PiB7XG4gICAgICAgIGlmICghc05vZGUucGFyZW50KSB7XG4gICAgICAgICAgc05vZGUucGFyZW50ID0gbm9kZTtcbiAgICAgICAgfVxuICAgICAgICBpZiAoIXNOb2RlLmlzTGVhZikge1xuICAgICAgICAgIGxvb3BQYXJlbnQoc05vZGUsIGRpc2FibGVkKTtcbiAgICAgICAgfVxuICAgICAgICBpZiAoc05vZGUuaXNMZWFmIHx8ICFzTm9kZS5jaGlsZHJlbiB8fCAhc05vZGUuY2hpbGRyZW4ubGVuZ3RoKSB7XG4gICAgICAgICAgbG9vcENoaWxkKHNOb2RlLCBkaXNhYmxlZCk7XG4gICAgICAgIH1cbiAgICAgIH0pO1xuICAgICAgcGF0aC5wb3AoKTtcbiAgICB9O1xuXG4gICAgaWYgKCF0aGlzLmNvbHVtbnNTbmFwc2hvdC5sZW5ndGgpIHtcbiAgICAgIHRoaXMuY29sdW1ucyA9IFtbXV07XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgdGhpcy5jb2x1bW5zU25hcHNob3RbMF0uZm9yRWFjaChvID0+IChpc0NoaWxkT3B0aW9uKG8pID8gbG9vcENoaWxkKG8pIDogbG9vcFBhcmVudChvKSkpO1xuXG4gICAgaWYgKHNvcnRlcikge1xuICAgICAgcmVzdWx0cy5zb3J0KChhLCBiKSA9PiBzb3J0ZXIoYS5wYXRoLCBiLnBhdGgsIHNlYXJjaFZhbHVlKSk7XG4gICAgfVxuXG4gICAgdGhpcy5jb2x1bW5zID0gW3Jlc3VsdHNdO1xuXG4gICAgdGhpcy4kcmVkcmF3Lm5leHQoKTsgLy8gU2VhcmNoIHJlc3VsdHMgbWF5IGJlIGVtcHR5LCBzbyBzaG91bGQgcmVkcmF3LlxuICB9XG5cbiAgLyoqXG4gICAqIFRvZ2dsZSBzZWFyY2hpbmcgbW9kZSBieSBVSS4gSXQgZGVhbHMgd2l0aCB0aGluZ3Mgbm90IGRpcmVjdGx5IHJlbGF0ZWQgdG8gVUkuXG4gICAqXG4gICAqIEBwYXJhbSB0b1NlYXJjaGluZyBJZiB0aGlzIGNhc2NhZGVyIGlzIGVudGVyaW5nIHNlYXJjaGluZyBtb2RlXG4gICAqL1xuICB0b2dnbGVTZWFyY2hpbmdNb2RlKHRvU2VhcmNoaW5nOiBib29sZWFuKTogdm9pZCB7XG4gICAgdGhpcy5pblNlYXJjaGluZ01vZGUgPSB0b1NlYXJjaGluZztcblxuICAgIGlmICh0b1NlYXJjaGluZykge1xuICAgICAgdGhpcy5hY3RpdmF0ZWRPcHRpb25zU25hcHNob3QgPSBbLi4udGhpcy5hY3RpdmF0ZWRPcHRpb25zXTtcbiAgICAgIHRoaXMuYWN0aXZhdGVkT3B0aW9ucyA9IFtdO1xuICAgICAgdGhpcy5zZWxlY3RlZE9wdGlvbnMgPSBbXTtcbiAgICAgIHRoaXMuJHJlZHJhdy5uZXh0KCk7XG4gICAgfSBlbHNlIHtcbiAgICAgIC8vIFVzZXIgcXVpdCBzZWFyY2hpbmcgbW9kZSB3aXRob3V0IHNlbGVjdGluZyBhbiBvcHRpb24uXG4gICAgICB0aGlzLmFjdGl2YXRlZE9wdGlvbnMgPSBbLi4udGhpcy5hY3RpdmF0ZWRPcHRpb25zU25hcHNob3RdO1xuICAgICAgdGhpcy5zZWxlY3RlZE9wdGlvbnMgPSBbLi4udGhpcy5hY3RpdmF0ZWRPcHRpb25zXTtcbiAgICAgIHRoaXMuY29sdW1ucyA9IFsuLi50aGlzLmNvbHVtbnNTbmFwc2hvdF07XG4gICAgICB0aGlzLnN5bmNPcHRpb25zKCk7XG4gICAgICB0aGlzLiRyZWRyYXcubmV4dCgpO1xuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBDbGVhciBzZWxlY3RlZCBvcHRpb25zLlxuICAgKi9cbiAgY2xlYXIoKTogdm9pZCB7XG4gICAgdGhpcy52YWx1ZXMgPSBbXTtcbiAgICB0aGlzLnNlbGVjdGVkT3B0aW9ucyA9IFtdO1xuICAgIHRoaXMuYWN0aXZhdGVkT3B0aW9ucyA9IFtdO1xuICAgIHRoaXMuZHJvcEJlaGluZENvbHVtbnMoMCk7XG4gICAgdGhpcy4kcmVkcmF3Lm5leHQoKTtcbiAgICB0aGlzLiRvcHRpb25TZWxlY3RlZC5uZXh0KG51bGwpO1xuICB9XG5cbiAgZ2V0T3B0aW9uTGFiZWwobzogTnpDYXNjYWRlck9wdGlvbik6IHN0cmluZyB7XG4gICAgcmV0dXJuIG9bdGhpcy5jYXNjYWRlckNvbXBvbmVudC5uekxhYmVsUHJvcGVydHkgfHwgJ2xhYmVsJ10gYXMgc3RyaW5nO1xuICB9XG5cbiAgZ2V0T3B0aW9uVmFsdWUobzogTnpDYXNjYWRlck9wdGlvbik6IE56U2FmZUFueSB7XG4gICAgcmV0dXJuIG9bdGhpcy5jYXNjYWRlckNvbXBvbmVudC5uelZhbHVlUHJvcGVydHkgfHwgJ3ZhbHVlJ107XG4gIH1cblxuICAvKipcbiAgICogVHJ5IHRvIGluc2VydCBvcHRpb25zIGludG8gYSBjb2x1bW4uXG4gICAqXG4gICAqIEBwYXJhbSBvcHRpb25zIE9wdGlvbnMgdG8gaW5zZXJ0XG4gICAqIEBwYXJhbSBjb2x1bW5JbmRleCBQb3NpdGlvblxuICAgKi9cbiAgcHJpdmF0ZSBzZXRDb2x1bW5EYXRhKG9wdGlvbnM6IE56Q2FzY2FkZXJPcHRpb25bXSwgY29sdW1uSW5kZXg6IG51bWJlciwgcGFyZW50OiBOekNhc2NhZGVyT3B0aW9uKTogdm9pZCB7XG4gICAgY29uc3QgZXhpc3RpbmdPcHRpb25zID0gdGhpcy5jb2x1bW5zW2NvbHVtbkluZGV4XTtcbiAgICBpZiAoIWFycmF5c0VxdWFsKGV4aXN0aW5nT3B0aW9ucywgb3B0aW9ucykpIHtcbiAgICAgIG9wdGlvbnMuZm9yRWFjaChvID0+IChvLnBhcmVudCA9IHBhcmVudCkpO1xuICAgICAgdGhpcy5jb2x1bW5zW2NvbHVtbkluZGV4XSA9IG9wdGlvbnM7XG4gICAgICB0aGlzLmRyb3BCZWhpbmRDb2x1bW5zKGNvbHVtbkluZGV4KTtcbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogU2V0IGFsbCBhbmNlc3RvciBvcHRpb25zIGFzIGFjdGl2YXRlZC5cbiAgICovXG4gIHByaXZhdGUgdHJhY2tBbmNlc3RvckFjdGl2YXRlZE9wdGlvbnMoc3RhcnRJbmRleDogbnVtYmVyKTogdm9pZCB7XG4gICAgZm9yIChsZXQgaSA9IHN0YXJ0SW5kZXggLSAxOyBpID49IDA7IGktLSkge1xuICAgICAgaWYgKCF0aGlzLmFjdGl2YXRlZE9wdGlvbnNbaV0pIHtcbiAgICAgICAgdGhpcy5hY3RpdmF0ZWRPcHRpb25zW2ldID0gdGhpcy5hY3RpdmF0ZWRPcHRpb25zW2kgKyAxXS5wYXJlbnQhO1xuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIHByaXZhdGUgZHJvcEJlaGluZEFjdGl2YXRlZE9wdGlvbnMobGFzdFJlc2VydmVJbmRleDogbnVtYmVyKTogdm9pZCB7XG4gICAgdGhpcy5hY3RpdmF0ZWRPcHRpb25zID0gdGhpcy5hY3RpdmF0ZWRPcHRpb25zLnNwbGljZSgwLCBsYXN0UmVzZXJ2ZUluZGV4ICsgMSk7XG4gIH1cblxuICBwcml2YXRlIGRyb3BCZWhpbmRDb2x1bW5zKGxhc3RSZXNlcnZlSW5kZXg6IG51bWJlcik6IHZvaWQge1xuICAgIGlmIChsYXN0UmVzZXJ2ZUluZGV4IDwgdGhpcy5jb2x1bW5zLmxlbmd0aCAtIDEpIHtcbiAgICAgIHRoaXMuY29sdW1ucyA9IHRoaXMuY29sdW1ucy5zbGljZSgwLCBsYXN0UmVzZXJ2ZUluZGV4ICsgMSk7XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIExvYWQgY2hpbGRyZW4gb2YgYW4gb3B0aW9uIGFzeW5jaHJvbm91c2x5LlxuICAgKi9cbiAgbG9hZENoaWxkcmVuKFxuICAgIG9wdGlvbjogTnpDYXNjYWRlck9wdGlvbiB8IE56U2FmZUFueSxcbiAgICBjb2x1bW5JbmRleDogbnVtYmVyLFxuICAgIHN1Y2Nlc3M/OiBWb2lkRnVuY3Rpb24sXG4gICAgZmFpbHVyZT86IFZvaWRGdW5jdGlvblxuICApOiB2b2lkIHtcbiAgICBjb25zdCBsb2FkRm4gPSB0aGlzLmNhc2NhZGVyQ29tcG9uZW50Lm56TG9hZERhdGE7XG5cbiAgICBpZiAobG9hZEZuKSB7XG4gICAgICAvLyBJZiB0aGVyZSBpc24ndCBhbnkgb3B0aW9uIGluIGNvbHVtbnMuXG4gICAgICB0aGlzLiRsb2FkaW5nLm5leHQoY29sdW1uSW5kZXggPCAwKTtcblxuICAgICAgaWYgKHR5cGVvZiBvcHRpb24gPT09ICdvYmplY3QnKSB7XG4gICAgICAgIG9wdGlvbi5sb2FkaW5nID0gdHJ1ZTtcbiAgICAgIH1cblxuICAgICAgbG9hZEZuKG9wdGlvbiwgY29sdW1uSW5kZXgpLnRoZW4oXG4gICAgICAgICgpID0+IHtcbiAgICAgICAgICBvcHRpb24ubG9hZGluZyA9IGZhbHNlO1xuICAgICAgICAgIGlmIChvcHRpb24uY2hpbGRyZW4pIHtcbiAgICAgICAgICAgIHRoaXMuc2V0Q29sdW1uRGF0YShvcHRpb24uY2hpbGRyZW4sIGNvbHVtbkluZGV4ICsgMSwgb3B0aW9uKTtcbiAgICAgICAgICB9XG4gICAgICAgICAgaWYgKHN1Y2Nlc3MpIHtcbiAgICAgICAgICAgIHN1Y2Nlc3MoKTtcbiAgICAgICAgICB9XG4gICAgICAgICAgdGhpcy4kbG9hZGluZy5uZXh0KGZhbHNlKTtcbiAgICAgICAgICB0aGlzLiRyZWRyYXcubmV4dCgpO1xuICAgICAgICB9LFxuICAgICAgICAoKSA9PiB7XG4gICAgICAgICAgb3B0aW9uLmxvYWRpbmcgPSBmYWxzZTtcbiAgICAgICAgICBvcHRpb24uaXNMZWFmID0gdHJ1ZTtcbiAgICAgICAgICBpZiAoZmFpbHVyZSkge1xuICAgICAgICAgICAgZmFpbHVyZSgpO1xuICAgICAgICAgIH1cbiAgICAgICAgICB0aGlzLiRyZWRyYXcubmV4dCgpO1xuICAgICAgICB9XG4gICAgICApO1xuICAgIH1cbiAgfVxuXG4gIHByaXZhdGUgaXNMb2FkZWQoaW5kZXg6IG51bWJlcik6IGJvb2xlYW4ge1xuICAgIHJldHVybiB0aGlzLmNvbHVtbnNbaW5kZXhdICYmIHRoaXMuY29sdW1uc1tpbmRleF0ubGVuZ3RoID4gMDtcbiAgfVxuXG4gIC8qKlxuICAgKiBGaW5kIGEgb3B0aW9uIHRoYXQgaGFzIGEgZ2l2ZW4gdmFsdWUgaW4gYSBnaXZlbiBjb2x1bW4uXG4gICAqL1xuICBwcml2YXRlIGZpbmRPcHRpb25XaXRoVmFsdWUoY29sdW1uSW5kZXg6IG51bWJlciwgdmFsdWU6IE56Q2FzY2FkZXJPcHRpb24gfCBOelNhZmVBbnkpOiBOekNhc2NhZGVyT3B0aW9uIHwgbnVsbCB7XG4gICAgY29uc3QgdGFyZ2V0Q29sdW1uID0gdGhpcy5jb2x1bW5zW2NvbHVtbkluZGV4XTtcbiAgICBpZiAodGFyZ2V0Q29sdW1uKSB7XG4gICAgICBjb25zdCB2ID0gdHlwZW9mIHZhbHVlID09PSAnb2JqZWN0JyA/IHRoaXMuZ2V0T3B0aW9uVmFsdWUodmFsdWUpIDogdmFsdWU7XG4gICAgICByZXR1cm4gdGFyZ2V0Q29sdW1uLmZpbmQobyA9PiB2ID09PSB0aGlzLmdldE9wdGlvblZhbHVlKG8pKSE7XG4gICAgfVxuICAgIHJldHVybiBudWxsO1xuICB9XG5cbiAgcHJpdmF0ZSBwcmVwYXJlRW1pdFZhbHVlKCk6IHZvaWQge1xuICAgIHRoaXMudmFsdWVzID0gdGhpcy5zZWxlY3RlZE9wdGlvbnMubWFwKG8gPT4gdGhpcy5nZXRPcHRpb25WYWx1ZShvKSk7XG4gIH1cbn1cbiJdfQ==