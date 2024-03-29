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
describe('tabs migration', () => {
    let runner;
    let host;
    let tree;
    let tmpDirPath;
    let previousWorkingDir;
    let warnOutput;
    beforeEach(() => {
        runner = new testing_2.SchematicTestRunner('test', require.resolve('../../../migration.json'));
        host = new testing_1.TempScopedNodeJsSyncHost();
        tree = new testing_2.UnitTestTree(new schematics_1.HostTree(host));
        writeFile('/tsconfig.json', JSON.stringify(config_1.SchematicsTestTsConfig));
        writeFile('/angular.json', JSON.stringify(config_1.SchematicsTestNGConfig));
        warnOutput = [];
        runner.logger.subscribe(logEntry => {
            if (logEntry.level === 'warn') {
                warnOutput.push(logEntry.message);
            }
        });
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
            yield runner.runSchematicAsync('migration-v11', {}, tree).toPromise();
        });
    }
    describe('nz-tab components', () => {
        it('should properly report deprecated input and output', () => __awaiter(void 0, void 0, void 0, function* () {
            writeFile('/index.ts', `
      import {Component} from '@angular/core';
      @Component({
        template: \`
          <nz-tabset (nzOnPrevClick)="mockPre()" (nzOnNextClick)="mockNext()" [nzShowPagination]="false">
            <nz-tab nzTitle="Tab 1">
              Content of Tab Pane 1
            </nz-tab>
            <nz-tab nzTitle="Tab 2">
              Content of Tab Pane 2
            </nz-tab>
            <nz-tab nzTitle="Tab 3">
              Content of Tab Pane 3
            </nz-tab>
          </nz-tabset>
        \`
      })
      export class MyComp {
        mockPre(): void {}
        mockNext(): void {}
      }`);
            yield runMigration();
            const output = warnOutput.toString();
            expect(output).toContain('/index.ts@5:23 - Found deprecated output \'(nzOnPrevClick)\'. Please manually remove this output.');
            expect(output).toContain('/index.ts@5:51 - Found deprecated output \'(nzOnNextClick)\'. Please manually remove this output.');
            expect(output).toContain('/index.ts@5:80 - Found deprecated input \'[nzShowPagination]\'. Please manually remove this input.');
        }));
        it('should properly report deprecated selector', () => __awaiter(void 0, void 0, void 0, function* () {
            writeFile('/index.ts', `
      import {Component} from '@angular/core';
      @Component({
        template: \`
          <nz-tabset nzLinkRouter>
            <nz-tab>
              <a nz-tab-link [routerLink]="['.']">Default</a>
            </nz-tab>
          </nz-tabset>
        \`
      })
      export class MyComp {
      }`);
            yield runMigration();
            const output = warnOutput.toString();
            expect(output).toContain('/index.ts@7:15 - Found deprecated selector \'a[nz-tab-link]\', please use \'ng-template[nzTabLink] > a[nz-tab-link]\' instead.');
        }));
    });
});
//# sourceMappingURL=tabs-deprecated.spec.js.map