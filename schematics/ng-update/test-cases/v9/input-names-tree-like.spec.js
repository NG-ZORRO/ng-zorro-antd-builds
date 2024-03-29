"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@angular-devkit/core");
const testing_1 = require("@angular-devkit/core/node/testing");
const schematics_1 = require("@angular-devkit/schematics");
const testing_2 = require("@angular-devkit/schematics/testing");
const shx = require("shelljs");
const config_1 = require("../config");
describe('tree-like migration', () => {
    let runner;
    let host;
    let tree;
    let tmpDirPath;
    let previousWorkingDir;
    beforeEach(() => {
        runner = new testing_2.SchematicTestRunner('test', require.resolve('../../../migration.json'));
        host = new testing_1.TempScopedNodeJsSyncHost();
        tree = new testing_2.UnitTestTree(new schematics_1.HostTree(host));
        writeFile('/tsconfig.json', JSON.stringify(config_1.SchematicsTestTsConfig));
        writeFile('/angular.json', JSON.stringify(config_1.SchematicsTestNGConfig));
        previousWorkingDir = shx.pwd();
        tmpDirPath = (0, core_1.getSystemPath)(host.root);
        shx.cd(tmpDirPath);
        writeFakeAngular();
    });
    afterEach(() => {
        shx.cd(previousWorkingDir);
        shx.rm('-r', tmpDirPath);
    });
    function writeFakeAngular() {
        writeFile('/node_modules/@angular/core/index.d.ts', ``);
    }
    function writeFile(filePath, contents) {
        host.sync.write((0, core_1.normalize)(filePath), core_1.virtualFs.stringToFileBuffer(contents));
    }
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    function runMigration() {
        return __awaiter(this, void 0, void 0, function* () {
            yield runner.runSchematicAsync('migration-v9', {}, tree).toPromise();
        });
    }
    describe('Tree', () => {
        function expectTreeContent(content) {
            expect(content).not.toContain(`[nzDefaultExpandedKeys]="expandKeys"`);
            expect(content).not.toContain(`[nzDefaultCheckedKeys]="checkedKeys"`);
            expect(content).not.toContain(`[nzDefaultSelectedKeys]="selectedKeys"`);
            expect(content).not.toContain(`[nzDefaultExpandAll]="expandDefault"`);
            expect(content).not.toContain(`(nzOnSearchNode)="onSearch($event)"`);
            expect(content).toContain(`[nzExpandedKeys]="expandKeys"`);
            expect(content).toContain(`[nzCheckedKeys]="checkedKeys"`);
            expect(content).toContain(`[nzSelectedKeys]="selectedKeys"`);
            expect(content).toContain(`[nzExpandAll]="expandDefault"`);
            expect(content).toContain(`(nzSearchValueChange)="onSearch($event)"`);
        }
        it('should rename deprecated input names', () => __awaiter(void 0, void 0, void 0, function* () {
            writeFile('/index.ts', `
        import {Component} from '@angular/core';
        @Component({template: \`
          <nz-tree
            [nzDefaultExpandedKeys]="expandKeys"
            [nzDefaultCheckedKeys]="checkedKeys"
            [nzDefaultSelectedKeys]="selectedKeys"
            [nzDefaultExpandAll]="expandDefault"
            (nzOnSearchNode)="onSearch($event)">
          </nz-tree>
        \`})
        export class MyComp {
          expandKeys = [];
          checkedKeys = [];
          selectedKeys = [];
          expandDefault = [];

          onSearch(e) {
            // noop
          }
        }
      `);
            yield runMigration();
            const content = tree.readContent('/index.ts');
            expectTreeContent(content);
        }));
        it('should rename deprecated input names in HTML', () => __awaiter(void 0, void 0, void 0, function* () {
            writeFile('/index.ts', `
      import {Component} from '@angular/core';
      @Component({
        templateUrl: './sub_dir/tmpl.html',
      })
      export class MyComp {
        expandKeys = [];
        checkedKeys = [];
        selectedKeys = [];
        expandDefault = [];

        onSearch(e) {
          // noop
        }
       }
     `);
            writeFile('/sub_dir/tmpl.html', `
        <nz-tree
          [nzDefaultExpandedKeys]="expandKeys"
          [nzDefaultCheckedKeys]="checkedKeys"
          [nzDefaultSelectedKeys]="selectedKeys"
          [nzDefaultExpandAll]="expandDefault"
          (nzOnSearchNode)="onSearch($event)">
        </nz-tree>
      `);
            yield runMigration();
            const content = tree.readContent('/sub_dir/tmpl.html');
            expectTreeContent(content);
        }));
    });
    describe('Tree Select', () => {
        function expectTreeSelectContent(content) {
            expect(content).not.toContain(`[nzDefaultExpandedKeys]="expandKeys"`);
            expect(content).toContain(`[nzExpandedKeys]="expandKeys"`);
        }
        it('should rename deprecated input names', () => __awaiter(void 0, void 0, void 0, function* () {
            writeFile('/index.ts', `
        import {Component} from '@angular/core';
        @Component({template: \`
          <nz-tree-select [nzDefaultExpandedKeys]="expandKeys"></nz-tree-select>
        \`})
        export class MyComp {
          expandKeys = [];
        }
      `);
            yield runMigration();
            const content = tree.readContent('/index.ts');
            expectTreeSelectContent(content);
        }));
        it('should rename deprecated input names in HTML', () => __awaiter(void 0, void 0, void 0, function* () {
            writeFile('/index.ts', `
      import {Component} from '@angular/core';
      @Component({
        templateUrl: './sub_dir/tmpl.html',
      })
      export class MyComp {
        expandKeys = [];
      }
     `);
            writeFile('/sub_dir/tmpl.html', `
        <nz-tree-select [nzDefaultExpandedKeys]="expandKeys"></nz-tree-select>
      `);
            yield runMigration();
            const content = tree.readContent('/sub_dir/tmpl.html');
            expectTreeSelectContent(content);
        }));
    });
});
//# sourceMappingURL=input-names-tree-like.spec.js.map