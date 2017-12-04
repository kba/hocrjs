/*
 * Copyright (c) 2016-2017 Konstantin Baierer
 *
 * This software may be modified and distributed under the terms
 * of the MIT license.  See the LICENSE file for details.
 */

export const SEPARATOR = ';'

export default class PropertyParser {

    constructor(opts = {
        debug: false,
        allowUnknown: false,
        allowInvalidNumbers: false,
        disableCardinalityChecks: false,
    }) {
        opts.forEach(opt => {
            this[opt] = opts[opt]
        })
        this.parsers = {
            'baseline': this.numberParser([parseFloat, parseInt]),
            'bbox': this.numberParser(parseInt, {min:0}, {length:4}),
            'cflow': this.stringParser({collapse:true}),
            'cuts': (args) => { return args.map((arg) => {
                return this.numberParser(parseInt)(arg.split(','))
            })},
            'hardbreak': this.booleanParser({collapse:true}),
            'image': this.stringParser({collapse: true}),
            'imagemd5': this.stringParser({collapse: true}),
            'lpageno': this.stringParser({collapse: true}),
            'ppageno': this.numberParser(parseInt, {min: 0}, {collapse: true}),
            'nlp': this.numberParser(parseFloat, {min: 0, max: 100}),
            'order': this.numberParser(parseInt, {min: 0}, {collapse: true}),
            'poly': this.numberParser(parseInt, {min: 0}, {minLength: 4, modulo: 2}),
            'scan_res': this.numberParser(parseInt, {min: 0}),
            'textangle': this.numberParser(parseFloat, {}, {collapse: true}),
            'x_bboxes': this.numberParser(parseInt, {min:0}),
            'x_font': this.stringParser({collapse:true}),
            'x_fsize': this.numberParser(parseInt, {min:0}),
            'x_confs': this.numberParser(parseFloat, {min:0, max:100}),
            'x_scanner': this.stringParser(),
            'x_source': this.stringParser(),
            'x_wconf': this.numberParser(parseFloat, {min:0, max:100}),
        }
    }

    checkCardinality(args, {
        length = -1,
        modulo = -1,
        collapse = false,
        minLength = 0,
        maxLength = Number.MAX_VALUE,
    }) {
        if (this.disableCardinalityChecks) {
            return args
        }
        if (collapse) length = 1
        if (length > -1 && args.length != length)
            throw Error(`Incorrect number of arguments (${args.length} != ${length})`)
        if (modulo > -1 && length % modulo > 0)
            throw Error(`Number of arguments not a multiple of ${modulo} (${args.length})`)
        if (collapse) return args[0]
        if (args.length < minLength)
            throw Error(`Not enough arguments (${args.length} < ${minLength})`)
        if (args.length > maxLength)
            throw Error(`Too many arguments (${args.length} > ${minLength})`)
        return args
    }

    booleanParser(cardinality={}) {
        return (args) => {
            return this.checkCardinality(args.map((arg) => {
                return Boolean.valueOf()(arg)
            }), cardinality)
        }
    }

    stringParser(cardinality={}) {
        return (args) => {
            return this.checkCardinality(args, cardinality)
        }
    }

    numberParser(fns, {
        min = -Number.MAX_VALUE,
        max = Number.MAX_VALUE,
    } = {}, cardinality={}) {
        if (!Array.isArray(fns)) fns = [fns]
        return (args) => {
            let i = 0
            return this.checkCardinality(args.map((arg) => {
                let parsed = fns[i++ % fns.length](arg)
                if (!this.allowInvalidNumbers) {
                    if (Number.isNaN(parsed))
                        throw Error(`Not a number: '${arg}'`)
                    else if (parsed < min || parsed > max)
                        throw Error(`Not in range [${min}..${max}]: '${arg}'`)
                }
                return parsed
            }), cardinality)
        }
    }

    parse(s) {
        let tokens = this.tokenize(s)
        if (this.debug) console.log("tokens", tokens)
        let propertyMap = {}
        for (let i = 0; i < tokens.length; i++) {
            let propertyName = tokens[i]
            if (! this.allowUnknown && !(propertyName in this.parsers)) {
                throw Error(`Unknown property '${propertyName}'`)
            }
            let propertyArgs = []
            let j
            for (j = i + 1; j < tokens.length; j++) {
                if (tokens[j] === SEPARATOR) break
                propertyArgs.push(tokens[j])
            }
            i = j
            if (propertyName in this.parsers) {
                propertyArgs = this.parsers[propertyName](propertyArgs)
            }
            propertyMap[propertyName] = propertyArgs
        }
        if (this.debug) console.log(`propertyMap`, propertyMap)
        return propertyMap
    }

    tokenize(s) {
        let tokens = []
        let arr = s.split('')
        let doubleQuoteOpen = false
        let singleQuoteOpen = false
        let buf = []
        let cur = ''
        let flush = () => { tokens.push(buf.join('')); buf = [] }
        let append = () => { buf.push(cur) }
        for (let i = 0; i < arr.length; i++) {
            let prev = i>0 ? arr[i-1] : ''
            cur = arr[i]
            if (cur === "'" && prev != '\\' && !doubleQuoteOpen) {
                if (singleQuoteOpen) flush()
                singleQuoteOpen = !singleQuoteOpen
            } else if (cur === '"' && prev != '\\' && !singleQuoteOpen) {
                if (doubleQuoteOpen) flush()
                doubleQuoteOpen = !doubleQuoteOpen
            } else if (!singleQuoteOpen && !doubleQuoteOpen && cur === SEPARATOR) {
                if (buf.length > 0) flush()
                if (tokens[tokens.length-1] !== SEPARATOR) tokens.push(SEPARATOR)
            } else if (!singleQuoteOpen && !doubleQuoteOpen && cur.match(/\s/)) {
               if (buf.length > 0) flush()
            } else {
                append()
            }
        }
        if (buf.length > 0)
            flush()
        return tokens
    }
}


