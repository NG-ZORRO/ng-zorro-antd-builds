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
describe('tooltip-like migration', () => {
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
    describe('Popconfirm', () => {
        it('should rename deprecated input names in ts', () => __awaiter(void 0, void 0, void 0, function* () {
            writeFile('/index.ts', `
        import {Component} from '@angular/core';
        @Component({template: \`
          <div nz-popconfirm [nzTitle]="title" nzTrigger="click" nzPlacement="top"></div>
        \`})
        export class MyComp {
          title = 'title'
        }
      `);
            yield runMigration();
            const content = tree.readContent('/index.ts');
            expect(content).toContain(`[nzPopconfirmTitle]="title"`);
            expect(content).toContain(`nzPopconfirmTrigger="click"`);
            expect(content).toContain(`nzPopconfirmPlacement="top"`);
        }));
        it('should rename deprecated input names in HTML', () => __awaiter(void 0, void 0, void 0, function* () {
            writeFile('/index.ts', `
      import {Component} from '@angular/core';
      @Component({
        templateUrl: './sub_dir/tmpl.html',
      })
      export class MyComp {}
     `);
            writeFile('/sub_dir/tmpl.html', `
        <div nz-popconfirm [nzTitle]="title" nzTrigger="click" nzPlacement="top"></div>
      `);
            yield runMigration();
            const content = tree.readContent('/sub_dir/tmpl.html');
            expect(content).toContain(`[nzPopconfirmTitle]="title"`);
            expect(content).toContain(`nzPopconfirmTrigger="click"`);
            expect(content).toContain(`nzPopconfirmPlacement="top"`);
        }));
    });
    describe('Tooltip', () => {
        it('should rename deprecated input names', () => __awaiter(void 0, void 0, void 0, function* () {
            writeFile('/index.ts', `
        import {Component} from '@angular/core';
        @Component({template: \`
          <div nz-tooltip [nzTitle]="title" nzTrigger="click" nzPlacement="top"></div>
        \`})
        export class MyComp {
          title = 'title'
        }
      `);
            yield runMigration();
            const content = tree.readContent('/index.ts');
            expect(content).toContain(`[nzTooltipTitle]="title"`);
            expect(content).toContain(`nzTooltipTrigger="click"`);
            expect(content).toContain(`nzTooltipPlacement="top"`);
        }));
        it('should rename deprecated input names in HTML', () => __awaiter(void 0, void 0, void 0, function* () {
            writeFile('/index.ts', `
      import {Component} from '@angular/core';
      @Component({
        templateUrl: './sub_dir/tmpl.html',
      })
      export class MyComp {}
     `);
            writeFile('/sub_dir/tmpl.html', `
        <div nz-tooltip [nzTitle]="title" nzTrigger="click" nzPlacement="top"></div>
      `);
            yield runMigration();
            const content = tree.readContent('/sub_dir/tmpl.html');
            expect(content).toContain(`[nzTooltipTitle]="title"`);
            expect(content).toContain(`nzTooltipTrigger="click"`);
            expect(content).toContain(`nzTooltipPlacement="top"`);
        }));
    });
    describe('Popover', () => {
        it('should rename deprecated input names', () => __awaiter(void 0, void 0, void 0, function* () {
            writeFile('/index.ts', `
        import {Component} from '@angular/core';
        @Component({template: \`
          <div nz-popover [nzTitle]="title" [nzContent]="content" nzTrigger="click" nzPlacement="top"></div>
          <ng-template #content>
          content
          </ng-template>
        \`})
        export class MyComp {
          title = 'title'
        }
      `);
            yield runMigration();
            const content = tree.readContent('/index.ts');
            expect(content).toContain(`[nzPopoverTitle]="title"`);
            expect(content).toContain(`[nzPopoverContent]="content"`);
            expect(content).toContain(`nzPopoverTrigger="click"`);
            expect(content).toContain(`nzPopoverPlacement="top"`);
        }));
        it('should rename deprecated input names in HTML', () => __awaiter(void 0, void 0, void 0, function* () {
            writeFile('/index.ts', `
      import {Component} from '@angular/core';
      @Component({
        templateUrl: './sub_dir/tmpl.html',
      })
      export class MyComp {}
     `);
            writeFile('/sub_dir/tmpl.html', `
      <div nz-popover [nzTitle]="title" [nzContent]="content" nzTrigger="click" nzPlacement="top"></div>
      <ng-template #content>
      content
      </ng-template>
      `);
            yield runMigration();
            const content = tree.readContent('/sub_dir/tmpl.html');
            expect(content).toContain(`[nzPopoverTitle]="title"`);
            expect(content).toContain(`[nzPopoverContent]="content"`);
            expect(content).toContain(`nzPopoverTrigger="click"`);
            expect(content).toContain(`nzPopoverPlacement="top"`);
        }));
    });
});
//# sourceMappingURL=input-names-tooltip-like.spec.js.map