import __SClass from '@coffeekraken/s-class';
import { __isPath } from '@coffeekraken/sugar/fs';
import { __packageJsonSync } from '@coffeekraken/sugar/package';
import __fs from 'fs';
// import __markdown from './markdown/index.js';
import { __isNode } from '@coffeekraken/sugar/is';
import { __deepMerge } from '@coffeekraken/sugar/object';
import type { ISDocblockBlock } from './SDocblockBlock.js';
import __SDocblockBlock from './SDocblockBlock.js';

/**
 *
 * @name                  SDockblock
 * @namespace           shared
 * @type                  Class
 * @extends             SClass
 * @platform            node
 * @status              beta
 *
 * This is the main class that expose the methods like "parse", etc...
 * You have to instanciate it by passing a settings object. Here's the available options:
 *
 * @param       {String|Object}     source        The docblock source. Can be either a string to parse or a filePath
 * @param       {Object}      [settings={}]       An object of settings to configure the SDocblock instance:
 *
 * @setting         {String}        [filePath=null]         Specify the file path where the docblocks are parsed from
 * @setting         {Function}      [filter=null]           Specify a function that will filter the SDocblockBlock items
 * @setting         {Record<String, Function|Regex>}        [filterByTag={}]        Specify some filters by tag. Can be a regex or a function
 * @setting         {Boolean}       [renderMarkdown=false]              Specify if you want to render the markdown in the tags values or not
 * @setting         {Any}           [markedOptions={}]                  Specify some [marked](https://www.npmjs.com/package/marked) options to render markdown
 * @setting         {Function}      [sortFunction=function(a, b) {})]       Specify a function to sort the docblocks. A default sort is applied
 *
 * @todo        tests
 * @todo        interface
 * @todo        doc
 *
 * @snippet         __SDocblock($1)
 * new __SDocblock($1)
 *
 * @example         js
 * import __SDocblock from '@coffeekraken/s-docblock';
 * const docblock = new __SDocblock(source, {
 *    // override some settings here...
 * });
 * const blocks = docblock.parse();
 *
 *
 * @since     2.0.0
 * @author 	Olivier Bossel <olivier.bossel@gmail.com>
 */

export interface ISDocblockSortFnSetting {
    (a: any, b: any);
}
export interface ISDocblockSettings {
    filePath?: string;
    filter?: Function;
    filterByTag: Record<string, any>;
    renderMarkdown: boolean;
    markedOptions: any;
    sortFunction?: ISDocblockSortFnSetting;
}

export interface ISDocblock {
    // new (source: string, settings?: ISDocblockSettings);
    _source: string;
    blocks: ISDocblockBlock[];
    toObject(): ISDocblockBlock[];
}

// @ts-ignore
class SDocblock extends __SClass implements ISDocblock {
    /**
     * @name            _source
     * @type            String|Array<Object>
     * @private
     *
     * Store the passed source
     *
     * @author 	Olivier Bossel <olivier.bossel@gmail.com>
     */
    _source: string = '';

    /**
     * @name            _packageJson
     * @type            String|Array<Object>
     * @private
     *
     * Store the package.json content if a file is passed as source
     *
     * @author 	Olivier Bossel <olivier.bossel@gmail.com>
     */
    _packageJson: any;

    /**
     * @name            _blocks
     * @type            Array<Object>
     * @private
     *
     * Store the parsed array of docblock objects
     *
     * @author 	Olivier Bossel <olivier.bossel@gmail.com>
     */
    _blocks: any[] = [];

    /**
     * @name            constructor
     * @type            Function
     *
     * Constructor
     *
     * @author 	Olivier Bossel <olivier.bossel@gmail.com>
     */
    constructor(source: string, settings?: Partial<ISDocblockSettings>) {
        super(
            __deepMerge(
                {
                    filter: undefined,
                    filterByTag: undefined,
                    sortFunction: (a, b) => {
                        let res = 0;

                        if (!b || !a) return res;

                        const aObj = a.toObject(),
                            bObj = b.toObject();

                        // if (.object.namespace && !aObj.namespace) res -= 1;
                        if (bObj.namespace) res += 1;
                        if (bObj.type?.toLowerCase?.() === 'class') res += 1;
                        if (bObj.constructor) res += 1;
                        if (bObj.private) res += 1;
                        if (bObj.type?.toLowerCase?.() === 'function') res += 1;
                        if (bObj.name?.length > aObj.name?.length) res += 1;
                        return res;
                    },
                    filePath: null,
                    renderMarkdown: false,
                    markedOptions: {},
                },
                settings || {},
            ),
        );
        // check if the source is path
        if (__isPath(source)) {
            if (!__isNode())
                throw new Error(
                    `Sorry but in a none node environement the SDocblock class can take only a String to parse and not a file path like "<yellow>${source}</yellow>"...`,
                );
            if (!__fs.existsSync(source))
                throw new Error(
                    `Sorry but the passed source path "<yellow>${source}</yellow>" does not exists on the filesystem...`,
                );
            this.settings.filePath = source;
            this._source = __fs.readFileSync(source, 'utf8');
            this._packageJson = __packageJsonSync(source);
        } else {
            this._source = source;
        }
    }

    /**
     * @name        sort
     * @type        Function
     *
     * This method allows you to set the order in which you want to get the
     * blocks back when using the methods like get blocks, etc...
     *
     * @param       {Function}      [sortFunction=null]       Specify a custom sort function you want to use. If not set, use the ```sortFunction``` setting.
     * @return      {SDocblock}                                   The class instance itself to maintain chainability
     *
     * @since       2.0.0
     * @author 	Olivier Bossel <olivier.bossel@gmail.com>
     */
    sort(sortFunction?: ISDocblockSortFnSetting) {
        if (!sortFunction) sortFunction = this.settings.sortFunction;
        this._blocks = this._blocks.sort(sortFunction);
        return this;
    }

    /**
     * @name        blocks
     * @type        Array
     *
     * Access the parsed blocks array
     *
     * @author 	Olivier Bossel <olivier.bossel@gmail.com>
     */
    get blocks() {
        if (!this._blocks) {
            throw new Error(
                `<red>${this.constructor.name}</red> Before accessing the blocks you'll need to parse the docblocks using "<yellow>await this.parse()</yellow>"`,
            );
        }
        return this._blocks;
    }

    /**
     * @name          parse
     * @type          Function
     * @async
     *
     * This method is the principal one. Use it to parse a string
     * and get back the object version of it
     *
     * @param       {String}        [string=this._source]        The string to parse
     * @return      {Array<SDocblockBlock>}                       An array of SDocblockBlock instances
     *
     * @since       2.0.0
     * @author 	Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
     */
    _parsed = false;
    parse(string = this._source): Promise<ISDocblockBlock[]> {
        return new Promise(async (resolve) => {
            // extract each docblocks
            const regDefault = /(['"`\s]+)?(\/\*{2})([\s\S]+?)(\*\/)/g;

            // update parsed flag
            this._parsed = true;

            let blocksArrayStr: string[] = [];

            // extracting blocks
            // @ts-ignore
            let regDefaultMatches = string.match(regDefault);
            if (regDefaultMatches?.length) {
                regDefaultMatches = regDefaultMatches
                    .filter((match) => {
                        if (match.trim().match(/^['`"]/)) return false;
                        return true;
                    })
                    .map((match) => {
                        return match.trim();
                    });
                blocksArrayStr = [...regDefaultMatches];
            }

            let blocks: __SDocblockBlock[] = [];

            if (!Array.isArray(blocksArrayStr)) {
                blocksArrayStr = [];
            } else if (Array.isArray(blocksArrayStr) && blocksArrayStr.length) {
                blocksArrayStr = blocksArrayStr.map((t) => t.trim());
                if (!blocksArrayStr || !blocksArrayStr.length) return [];
                blocksArrayStr = blocksArrayStr.filter((blockStr) => {
                    const lines = blockStr.split('\n');
                    for (let i = 0; i < lines.length; i++) {
                        const line = lines[i];
                        if (line.trim().slice(0, 2) === '//') return false;
                    }

                    if (this.settings.filterByTag) {
                        let isBlockMatchFilter = true;
                        for (
                            let i = 0;
                            i < Object.keys(this.settings.filterByTag).length;
                            i++
                        ) {
                            const tagName = Object.keys(
                                this.settings.filterByTag,
                            )[i];
                            const tagFilter =
                                this.settings.filterByTag[tagName];
                            const tagValueReg = new RegExp(
                                `@${tagName}([^\n]+)`,
                            );
                            const tagValue = blockStr.match(tagValueReg);
                            const tagFilterArray = Array.isArray(tagFilter)
                                ? tagFilter
                                : [tagFilter];
                            let isMatchOrCondition = false;
                            if (tagValue && tagValue[1]) {
                                const tagValueValue = tagValue[1].trim();
                                for (
                                    let j = 0;
                                    j < tagFilterArray.length;
                                    j++
                                ) {
                                    const tagFilterFilter = tagFilterArray[j];
                                    if (typeof tagFilterFilter === 'string') {
                                        if (tagValueValue === tagFilterFilter) {
                                            isMatchOrCondition = true;
                                            break;
                                        }
                                    } else if (
                                        tagFilterFilter instanceof RegExp
                                    ) {
                                        if (
                                            tagValueValue
                                                .trim()
                                                .match(tagFilterFilter)
                                        ) {
                                            isMatchOrCondition = true;
                                            break;
                                        }
                                    } else if (
                                        typeof tagFilterFilter === 'function'
                                    ) {
                                        if (
                                            tagFilterFilter(
                                                tagValueValue.trim(),
                                            )
                                        ) {
                                            isMatchOrCondition = true;
                                            break;
                                        }
                                    } else {
                                        throw new Error(
                                            `<red>[${this.constructor.name}]</red> Sorry but the passed "<yellow>${tagName}</yellow>" filterByTag filter can be only a RegExp or a function`,
                                        );
                                    }
                                }
                            }
                            if (!isMatchOrCondition) isBlockMatchFilter = false;
                        }
                        if (isBlockMatchFilter) return true;
                        return false;
                    }

                    return true;
                });
            }

            for (let i = 0; i < blocksArrayStr.length; i++) {
                const block = blocksArrayStr[i];
                const docblockBlock = new __SDocblockBlock(block || ' ', {
                    packageJson: this._packageJson,
                    filePath: this.settings.filePath || '',
                    renderMarkdown: this.settings.renderMarkdown,
                    markedOptions: this.settings.markedOptions,
                });

                await docblockBlock.parse();
                blocks[i] = docblockBlock;
            }

            if (blocks && blocks.length) {
                this._blocks = blocks;
            }

            if (typeof this.settings.filter === 'function') {
                // @ts-ignore
                this._blocks = this._blocks.filter((docblockBlock) => {
                    // @ts-ignore
                    return this.settings.filter(
                        docblockBlock.toObject(),
                        docblockBlock,
                    );
                });
            }

            // sort
            this.sort();

            // return the class instance itself
            resolve(this._blocks);
        });
    }

    /**
     * @name          toObject
     * @type          Function
     *
     * This method convert the parsed docblocks to a simple object
     *
     * @since       2.0.0
     * @author 	Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
     */
    toObject() {
        if (!this._parsed) {
            throw new Error(
                `<red>[SDocblock]</red> Before accessing any block, you MUST call the "parse" async method...`,
            );
        }

        return this.blocks.map((block) => {
            return block.toObject();
        });
    }

    /**
     * @name        toString
     * @type        Function
     *
     * This method allows you to get the string version of the docblock(s)
     *
     * @since       2.0.0
     * @author 	Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
     */
    toString() {
        if (!this._parsed) {
            throw new Error(
                `<red>[SDocblock]</red> Before accessing any block, you MUST call the "parse" async method...`,
            );
        }

        return this.blocks
            .map((block) => {
                return block.toString();
            })
            .join('\n');
    }
}

export default SDocblock;
