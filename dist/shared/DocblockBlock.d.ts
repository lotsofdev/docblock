import type { TDocblockBlockSettings, TDocblockBlockTagsMap } from './types.js';
/**
 * @name                DocblockBlock
 * @namespace           shared
 * @type                Class
 * @platform            node
 * @status              beta
 *
 * This class represent a docblock object that contains all the "tags" values and some features like:
 * - Converting the block to markdown
 * - More to come...
 *
 * @feature         `author` tag support
 * @feature         `contributor` tag support
 * @feature         `cssClass` tag support
 * @feature         `description` tag support
 * @feature         `event` tag support
 * @feature         `example` tag support
 * @feature         `install` tag support
 * @feature         `menu` tag support
 * @feature         `namespace` tag support
 * @feature         `param` tag support
 * @feature         `platform` tag support
 * @feature         `return` tag support
 * @feature         `see` tag support
 * @feature         `snippet` tag support
 * @feature         `support` tag support
 * @feature         `todo` tag support
 * @feature         `type` tag support
 * @feature         All the other tags are treated like a `String` value
 *
 * @param         {String}       source      The docblock source.  Has to be a parsable docblock string
 * @param         {Object}      [settings={}]       A settings object to configure your instance
 *
 * @setting         {String}        [filePath=null]         Specify the file path where the docblocks are parsed from
 * @setting         {Any}           [packageJson={}]        Pass the current package.json data to add some metas to the docblocks
 * @setting         {Boolean}       [renderMarkdown=false]              Specify if you want to render the markdown in the tags values or not
 * @setting         {Any}           [markedOptions={}]                  Specify some [marked](https://www.npmjs.com/package/marked) options to render markdown
 * @setting         {Function}      [sortFunction=function(a, b) {})]       Specify a function to sort the docblocks. A default sort is applied
 * @setting         {Record<String, Function>}      [tags={}]           Specify some tags you want to include with a function that will be used to actually parse his value and return the formatted one. Some tags are built-in. Look at the features section.
 *
 * @todo        tests
 * @todo        Support "feature" tag
 * @todo        Check the supported tags
 *
 * @snippet         __DocblockBlock($1)
 * new __DocblockBlock($1)
 *
 * @example         js
 * import { __DocblockBlock } from '@lotsof/s-docblock';
 * const docblock = new __DocblockBlock(myDocblockString);
 * const docblock.toObject();
 *
 * @since     2.0.0
 * @author 	Olivier Bossel <olivier.bossel@gmail.com>
 */
declare class DocblockBlock {
    /**
     * @name            tagsMap
     * @type            Object
     * @static
     *
     * Store the default tags mapping to their parsing functions
     *
     * @author 	Olivier Bossel <olivier.bossel@gmail.com>
     */
    static tagsMap: TDocblockBlockTagsMap;
    /**
     * @name           settings
     * @type          TDocblockBlockSettings
     * @public
     *
     * Store the settings
     *
     * @author 	Olivier Bossel <olivier.bossel@gmail.com>
     */
    settings: TDocblockBlockSettings;
    /**
     * @name          _source
     * @type          String
     * @private
     *
     * Store the passed source
     *
     * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com
     */
    private _source;
    /**
     * @name        _blockObj
     * @type        {Object}
     * @private
     *
     * Store the parsed docblock object
     *
     * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com
     */
    private _blockObj;
    /**
     * @name          registerTag
     * @type          Function
     * @static
     *
     * This static method allows you to register a new tag that will
     * be recognized by the DocblockBlock class.
     *
     * @param     {String}      tagName       The tag you want to register without the @
     * @param     {Function}    parser    A function that will be called with the string tag content. You can parse this string and return an object that represent the tag data
     *
     * @since         2.0.0
     * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com
     */
    static registerTag(tagName: string, parser: any): void;
    /**
     * @name          constructor
     * @type          Function
     * @contructor
     *
     * Constructor
     *
     * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://lotsof.dev)
     */
    constructor(source: any, settings?: Partial<TDocblockBlockSettings>);
    /**
     * @name          toString
     * @type          Function
     *
     * This method return the passed source string
     *
     * @return      {String}              The passed docblock string
     *
     * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://lotsof.dev)
     */
    toString(): string;
    /**
     * @name          toObject
     * @type          Function
     *
     * This method return the parsed docblock object
     *
     * @return      {Object}              The parsed dobclock object
     *
     * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://lotsof.dev)
     */
    toObject(): any;
    /**
     * @name          parse
     * @type          Function
     * @async
     * @private
     *
     * This method take a docblick string and parse it to a javascript object
     *
     * @return      {Object}          The object version of the source string
     *
     * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://lotsof.dev)
     */
    parse(): Promise<any>;
}
export default DocblockBlock;
