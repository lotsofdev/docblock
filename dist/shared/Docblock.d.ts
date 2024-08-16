import __DocblockBlock from './DocblockBlock.js';
import type { TDocblockSettings, TDocblockSortFnSetting } from './types.js';
/**
 *
 * @name                    Dockblock
 * @namespace               shared
 * @type                    Class
 * @platform                node
 * @status                  beta
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
 * import __SDocblock from '@lotsof/s-docblock';
 * const docblock = new __SDocblock(source, {
 *    // override some settings here...
 * });
 * const blocks = docblock.parse();
 *
 *
 * @since     2.0.0
 * @author 	Olivier Bossel <olivier.bossel@gmail.com>
 */
declare class SDocblock {
    /**
     * @name           settings
     * @type          TDocblockSettings
     * @public
     *
     * Store the settings
     *
     * @author 	Olivier Bossel <olivier.bossel@gmail.com>
     */
    settings: TDocblockSettings;
    /**
     * @name            _source
     * @type            String|Array<Object>
     * @private
     *
     * Store the passed source
     *
     * @author 	Olivier Bossel <olivier.bossel@gmail.com>
     */
    private _source;
    /**
     * @name            _packageJson
     * @type            String|Array<Object>
     * @private
     *
     * Store the package.json content if a file is passed as source
     *
     * @author 	Olivier Bossel <olivier.bossel@gmail.com>
     */
    private _packageJson;
    /**
     * @name            _blocks
     * @type            Array<Object>
     * @private
     *
     * Store the parsed array of docblock objects
     *
     * @author 	Olivier Bossel <olivier.bossel@gmail.com>
     */
    private _blocks;
    /**
     * @name            constructor
     * @type            Function
     *
     * Constructor
     *
     * @author 	Olivier Bossel <olivier.bossel@gmail.com>
     */
    constructor(source: string, settings?: Partial<TDocblockSettings>);
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
    sort(sortFunction?: TDocblockSortFnSetting): this;
    /**
     * @name        blocks
     * @type        Array
     *
     * Access the parsed blocks array
     *
     * @author 	Olivier Bossel <olivier.bossel@gmail.com>
     */
    get blocks(): any[];
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
    private _parsed;
    parse(string?: string): Promise<__DocblockBlock[]>;
    /**
     * @name          toObject
     * @type          Function
     *
     * This method convert the parsed docblocks to a simple object
     *
     * @since       2.0.0
     * @author 	Olivier Bossel <olivier.bossel@gmail.com> (https://lotsof.dev)
     */
    toObject(): any[];
    /**
     * @name        toString
     * @type        Function
     *
     * This method allows you to get the string version of the docblock(s)
     *
     * @since       2.0.0
     * @author 	Olivier Bossel <olivier.bossel@gmail.com> (https://lotsof.dev)
     */
    toString(): string;
}
export default SDocblock;
