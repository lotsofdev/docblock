var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { __isPath } from '@lotsof/sugar/fs';
import { __packageJsonSync } from '@lotsof/sugar/package';
import __fs from 'fs';
// import __markdown from './markdown/index.js';
import { __isNode } from '@lotsof/sugar/is';
import { __deepMerge } from '@lotsof/sugar/object';
import __DocblockBlock from './DocblockBlock.js';
// @ts-ignore
class SDocblock {
    /**
     * @name            constructor
     * @type            Function
     *
     * Constructor
     *
     * @author 	Olivier Bossel <olivier.bossel@gmail.com>
     */
    constructor(source, settings) {
        /**
         * @name            _source
         * @type            String|Array<Object>
         * @private
         *
         * Store the passed source
         *
         * @author 	Olivier Bossel <olivier.bossel@gmail.com>
         */
        this._source = '';
        /**
         * @name            _blocks
         * @type            Array<Object>
         * @private
         *
         * Store the parsed array of docblock objects
         *
         * @author 	Olivier Bossel <olivier.bossel@gmail.com>
         */
        this._blocks = [];
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
         * @author 	Olivier Bossel <olivier.bossel@gmail.com> (https://lotsof.dev)
         */
        this._parsed = false;
        this.settings = __deepMerge({
            filter: undefined,
            filterByTag: undefined,
            sortFunction: (a, b) => {
                var _a, _b, _c, _d, _e, _f;
                let res = 0;
                if (!b || !a)
                    return res;
                const aObj = a.toObject(), bObj = b.toObject();
                // if (.object.namespace && !aObj.namespace) res -= 1;
                if (bObj.namespace)
                    res += 1;
                if (((_b = (_a = bObj.type) === null || _a === void 0 ? void 0 : _a.toLowerCase) === null || _b === void 0 ? void 0 : _b.call(_a)) === 'class')
                    res += 1;
                if (bObj.constructor)
                    res += 1;
                if (bObj.private)
                    res += 1;
                if (((_d = (_c = bObj.type) === null || _c === void 0 ? void 0 : _c.toLowerCase) === null || _d === void 0 ? void 0 : _d.call(_c)) === 'function')
                    res += 1;
                if (((_e = bObj.name) === null || _e === void 0 ? void 0 : _e.length) > ((_f = aObj.name) === null || _f === void 0 ? void 0 : _f.length))
                    res += 1;
                return res;
            },
            filePath: null,
            renderMarkdown: false,
            markedOptions: {},
        }, settings || {});
        // check if the source is path
        if (__isPath(source)) {
            if (!__isNode())
                throw new Error(`Sorry but in a none node environement the SDocblock class can take only a String to parse and not a file path like "<yellow>${source}</yellow>"...`);
            if (!__fs.existsSync(source))
                throw new Error(`Sorry but the passed source path "<yellow>${source}</yellow>" does not exists on the filesystem...`);
            this.settings.filePath = source;
            this._source = __fs.readFileSync(source, 'utf8');
            this._packageJson = __packageJsonSync(source);
        }
        else {
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
    sort(sortFunction) {
        if (!sortFunction)
            sortFunction = this.settings.sortFunction;
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
            throw new Error(`<red>${this.constructor.name}</red> Before accessing the blocks you'll need to parse the docblocks using "<yellow>await this.parse()</yellow>"`);
        }
        return this._blocks;
    }
    parse(string = this._source) {
        return new Promise((resolve) => __awaiter(this, void 0, void 0, function* () {
            // extract each docblocks
            const regDefault = /(['"`\s]+)?(\/\*{2})([\s\S]+?)(\*\/)/g;
            // update parsed flag
            this._parsed = true;
            let blocksArrayStr = [];
            // extracting blocks
            // @ts-ignore
            let regDefaultMatches = string.match(regDefault);
            if (regDefaultMatches === null || regDefaultMatches === void 0 ? void 0 : regDefaultMatches.length) {
                // @ts-ignore
                regDefaultMatches = regDefaultMatches
                    .filter((match) => {
                    if (match.trim().match(/^['`"]/))
                        return false;
                    return true;
                })
                    .map((match) => {
                    return match.trim();
                });
                // @ts-ignore
                blocksArrayStr = [...regDefaultMatches];
            }
            let blocks = [];
            if (!Array.isArray(blocksArrayStr)) {
                blocksArrayStr = [];
            }
            else if (Array.isArray(blocksArrayStr) && blocksArrayStr.length) {
                blocksArrayStr = blocksArrayStr.map((t) => t.trim());
                if (!blocksArrayStr || !blocksArrayStr.length)
                    return [];
                blocksArrayStr = blocksArrayStr.filter((blockStr) => {
                    const lines = blockStr.split('\n');
                    for (let i = 0; i < lines.length; i++) {
                        const line = lines[i];
                        if (line.trim().slice(0, 2) === '//')
                            return false;
                    }
                    if (this.settings.filterByTag) {
                        let isBlockMatchFilter = true;
                        for (let i = 0; i < Object.keys(this.settings.filterByTag).length; i++) {
                            const tagName = Object.keys(this.settings.filterByTag)[i];
                            const tagFilter = this.settings.filterByTag[tagName];
                            const tagValueReg = new RegExp(`@${tagName}([^\n]+)`);
                            const tagValue = blockStr.match(tagValueReg);
                            const tagFilterArray = Array.isArray(tagFilter)
                                ? tagFilter
                                : [tagFilter];
                            let isMatchOrCondition = false;
                            if (tagValue && tagValue[1]) {
                                const tagValueValue = tagValue[1].trim();
                                for (let j = 0; j < tagFilterArray.length; j++) {
                                    const tagFilterFilter = tagFilterArray[j];
                                    if (typeof tagFilterFilter === 'string') {
                                        if (tagValueValue === tagFilterFilter) {
                                            isMatchOrCondition = true;
                                            break;
                                        }
                                    }
                                    else if (tagFilterFilter instanceof RegExp) {
                                        if (tagValueValue.trim().match(tagFilterFilter)) {
                                            isMatchOrCondition = true;
                                            break;
                                        }
                                    }
                                    else if (typeof tagFilterFilter === 'function') {
                                        if (tagFilterFilter(tagValueValue.trim())) {
                                            isMatchOrCondition = true;
                                            break;
                                        }
                                    }
                                    else {
                                        throw new Error(`<red>[${this.constructor.name}]</red> Sorry but the passed "<yellow>${tagName}</yellow>" filterByTag filter can be only a RegExp or a function`);
                                    }
                                }
                            }
                            if (!isMatchOrCondition)
                                isBlockMatchFilter = false;
                        }
                        if (isBlockMatchFilter)
                            return true;
                        return false;
                    }
                    return true;
                });
            }
            for (let i = 0; i < blocksArrayStr.length; i++) {
                const block = blocksArrayStr[i];
                const docblockBlock = new __DocblockBlock(block || ' ', {
                    packageJson: this._packageJson,
                    filePath: this.settings.filePath || '',
                    renderMarkdown: this.settings.renderMarkdown,
                    markedOptions: this.settings.markedOptions,
                });
                yield docblockBlock.parse();
                blocks[i] = docblockBlock;
            }
            if (blocks && blocks.length) {
                this._blocks = blocks;
            }
            if (typeof this.settings.filter === 'function') {
                // @ts-ignore
                this._blocks = this._blocks.filter((docblockBlock) => {
                    // @ts-ignore
                    return this.settings.filter(docblockBlock.toObject(), docblockBlock);
                });
            }
            // sort
            this.sort();
            // return the class instance itself
            resolve(this._blocks);
        }));
    }
    /**
     * @name          toObject
     * @type          Function
     *
     * This method convert the parsed docblocks to a simple object
     *
     * @since       2.0.0
     * @author 	Olivier Bossel <olivier.bossel@gmail.com> (https://lotsof.dev)
     */
    toObject() {
        if (!this._parsed) {
            throw new Error(`<red>[SDocblock]</red> Before accessing any block, you MUST call the "parse" async method...`);
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
     * @author 	Olivier Bossel <olivier.bossel@gmail.com> (https://lotsof.dev)
     */
    toString() {
        if (!this._parsed) {
            throw new Error(`<red>[SDocblock]</red> Before accessing any block, you MUST call the "parse" async method...`);
        }
        return this.blocks
            .map((block) => {
            return block.toString();
        })
            .join('\n');
    }
}
export default SDocblock;
//# sourceMappingURL=Docblock.js.map