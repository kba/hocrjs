#!/usr/bin/env node
/*
 * Copyright (c) 2016-2017 Konstantin Baierer
 *
 * This software may be modified and distributed under the terms
 * of the MIT license.  See the LICENSE file for details.
 */

const fs = require('fs')

const argv = require('yargs').argv
argv.scriptUrl = (argv.scriptUrl || 'https://unpkg.com/hocrjs/dist/hocr.fullscreen.js')
const scriptSnippet = `<script src="${argv.scriptUrl}"></script>`
argv._.forEach((infile) => {
    const outfile = `${infile}.hocrjs.html`
    fs.readFile(infile, {encoding: 'utf-8'}, (err, data) => {
        if (err) throw err
        data = data.replace('</body>', `${scriptSnippet}</body>`)
        fs.writeFile(outfile, data, {encoding: 'utf-8'}, (err) => {
            if (err) throw err
            console.log(`Written to ${outfile}`)
        })
    })
})
