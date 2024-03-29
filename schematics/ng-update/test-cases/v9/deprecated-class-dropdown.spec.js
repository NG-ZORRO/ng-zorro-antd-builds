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
describe('dropdown class migration', () => {
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
            yield runner.runSchematicAsync('migration-v9', {}, tree).toPromise();
        });
    }
    describe('dropdown class', () => {
        it('should properly report invalid deprecated class', () => __awaiter(void 0, void 0, void 0, function* () {
            writeFile('/index.ts', `
      import { Component, TemplateRef } from '@angular/core';
      import { NzDropdownContextComponent, NzDropdownService, NzMenuItemDirective } from 'ng-zorro-antd';

      @Component({
        selector: 'nz-demo-dropdown-context-menu',
        template: \`
          <div
            style="background: rgb(190, 200, 200); padding: 32px;text-align: center"
            (contextmenu)="contextMenu($event, template)"
          >
            <ng-template #template>
              <ul nz-menu nzInDropDown (nzClick)="close($event)">
                <li nz-menu-item>1st menu item</li>
                <li nz-submenu>
                  <span title>sub menu</span>
                  <ul>
                    <li nz-menu-item>4th menu item</li>
                  </ul>
                </li>
              </ul>
            </ng-template>
            <span style="color:#fff;font-size: 14px;">Context Menu</span>
          </div>
        \`,
        styles: []
      })
      export class NzDemoDropdownContextMenuComponent {
        private dropdown: NzDropdownContextComponent;

        contextMenu($event: MouseEvent, template: TemplateRef<void>): void {
          this.dropdown = this.nzDropdownService.create($event, template);
        }

        close(e: NzMenuItemDirective): void {
          console.log(e);
          this.dropdown.close();
        }

        constructor(private nzDropdownService: NzDropdownService) {}
      }`);
            yield runMigration();
            const messages = [
                '/index.ts@3:16 - Found "NzDropdownContextComponent" which has been removed. Your code need to be updated.',
                '/index.ts@3:44 - Found usage of "NzDropdownService" which has been removed. Please use "NzContextMenuService" ' +
                    'instead.',
                '/index.ts@29:27 - Found "NzDropdownContextComponent" which has been removed. Your code need to be updated.',
                '/index.ts@40:48 - Found usage of "NzDropdownService" which has been removed. Please use "NzContextMenuService" ' +
                    'instead.'
            ];
            messages.forEach(message => {
                expect(warnOutput).toContain(message);
            });
        }));
    });
});
//# sourceMappingURL=deprecated-class-dropdown.spec.js.map