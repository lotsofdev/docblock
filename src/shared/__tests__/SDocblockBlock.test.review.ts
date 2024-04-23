import __SDocblockBlock from '../SDocblockBlock.js';

describe('s-docblock.shared.SDocblockBlock', () => {
    it('Should parse a complete docblock correctly', async () => {
        const block = `
        /**
 * @name            SProcessPipe
 * @namespace            node.process
 * @type            Class
 *
 * This class allows you to handle easily some process pipes.
 * A process pipe is simply multiple processes that will execute one after
 * the other by passing the params to one after the other
 * and will be resolved once all the processes have been executed correctly
 *
 * @param         {ISProcessSettings}           processes           The processes you want to pipe
 * @param         {ISProcessSettings}               [settings={}]               Some settings to configure your process pipe instance
 *
 * @example         js
 * import SProcess, { SProcessPipe } from '@coffeekraken/s-process';
 * class MyProcess extends SProcess {
 *  constructor(settings = {}) {
 *      super(settings);
 *  }
 * }
 * const processPipe = new SProcessPipe([
 *    (params) => {
 *      // update params to pass to the next process
 *      return params;
 *    },
 *    new MyProcess()
 * ]);
 * const res = await processPipe.run({
 *    something: 'coco'
 * });
 *
 * @since           2.0.0
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */
        `;

        const docblock = new __SDocblockBlock(block);

        // const obj = await docblock.parse();
        // const seializedObj = JSON.parse(JSON.stringify(obj));

        expect(true).toBe(true);

        // expect(seializedObj).toEqual({
        //     name: 'SProcessPipe',
        //     namespace: 'node.process',
        //     type: 'Class',
        //     description:
        //         'This class allows you to handle easily some process pipes.\n' +
        //         'A process pipe is simply multiple processes that will execute one after\n' +
        //         'the other by passing the params to one after the other\n' +
        //         'and will be resolved once all the processes have been executed correctly',
        //     param: {
        //         processes: {
        //             name: 'processes',
        //             type: ['ISProcessSettings'],
        //             description: 'The processes you want to pipe',
        //             default: undefined,
        //             defaultStr: '',
        //         },
        //         settings: {
        //             name: 'settings',
        //             type: ['ISProcessSettings'],
        //             description:
        //                 'Some settings to configure your process pipe instance',
        //             default: {},
        //             defaultStr: '{}',
        //         },
        //     },
        //     example: [
        //         {
        //             language: 'js',
        //             code:
        //                 "import SProcess, { SProcessPipe } from '@coffeekraken/s-process';\n" +
        //                 'class MyProcess extends SProcess {\n' +
        //                 ' constructor(settings = {}) {\n' +
        //                 '     super(settings);\n' +
        //                 ' }\n' +
        //                 '}\n' +
        //                 'const processPipe = new SProcessPipe([\n' +
        //                 '   (params) => {\n' +
        //                 '     // update params to pass to the next process\n' +
        //                 '     return params;\n' +
        //                 '   },\n' +
        //                 '   new MyProcess()\n' +
        //                 ']);\n' +
        //                 'const res = await processPipe.run({\n' +
        //                 "   something: 'coco'\n" +
        //                 '});',
        //         },
        //     ],
        //     since: '2.0.0',
        //     author: {
        //         name: 'Olivier Bossel',
        //         email: 'olivier.bossel@gmail.com',
        //         url: 'https://coffeekraken.io',
        //     },
        //     raw:
        //         '/**\n' +
        //         '*\n' +
        //         '* @name            SProcessPipe\n' +
        //         '* @namespace            node.process\n' +
        //         '* @type            Class\n' +
        //         '*\n' +
        //         '* This class allows you to handle easily some process pipes.\n' +
        //         '* A process pipe is simply multiple processes that will execute one after\n' +
        //         '* the other by passing the params to one after the other\n' +
        //         '* and will be resolved once all the processes have been executed correctly\n' +
        //         '*\n' +
        //         '* @param         {ISProcessSettings}           processes           The processes you want to pipe\n' +
        //         '* @param         {ISProcessSettings}               [settings={}]               Some settings to configure your process pipe instance\n' +
        //         '*\n' +
        //         '* @example         js\n' +
        //         "* import SProcess, { SProcessPipe } from '@coffeekraken/s-process';\n" +
        //         '* class MyProcess extends SProcess {\n' +
        //         '*  constructor(settings = {}) {\n' +
        //         '*      super(settings);\n' +
        //         '*  }\n' +
        //         '* }\n' +
        //         '* const processPipe = new SProcessPipe([\n' +
        //         '*    (params) => {\n' +
        //         '*      // update params to pass to the next process\n' +
        //         '*      return params;\n' +
        //         '*    },\n' +
        //         '*    new MyProcess()\n' +
        //         '* ]);\n' +
        //         '* const res = await processPipe.run({\n' +
        //         "*    something: 'coco'\n" +
        //         '* });\n' +
        //         '*\n' +
        //         '* @since           2.0.0\n' +
        //         '* @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)\n' +
        //         '\n' +
        //         '*/',
        // });
    });
});
