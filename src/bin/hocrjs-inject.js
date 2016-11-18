#!/usr/bin/env node
/* BEGIN-BANNER -f smmono12 -i ' * ' -C "2016 Konstantin Baierer"  -L MIT
 * ▗▖                    █              █         █
 * ▐▌                    ▀              ▀         ▀             ▐▌
 * ▐▙██▖ ▟█▙  ▟██▖ █▟█▌ ██  ▗▟██▖      ██  ▐▙██▖ ██   ▟█▙  ▟██▖▐███
 * ▐▛ ▐▌▐▛ ▜▌▐▛  ▘ █▘    █  ▐▙▄▖▘       █  ▐▛ ▐▌  █  ▐▙▄▟▌▐▛  ▘ ▐▌
 * ▐▌ ▐▌▐▌ ▐▌▐▌    █     █   ▀▀█▖ ██▌   █  ▐▌ ▐▌  █  ▐▛▀▀▘▐▌    ▐▌
 * ▐▌ ▐▌▝█▄█▘▝█▄▄▌ █     █  ▐▄▄▟▌     ▗▄█▄▖▐▌ ▐▌  █  ▝█▄▄▌▝█▄▄▌ ▐▙▄
 * ▝▘ ▝▘ ▝▀▘  ▝▀▀  ▀     █   ▀▀▀      ▝▀▀▀▘▝▘ ▝▘  █   ▝▀▀  ▝▀▀   ▀▀
 *                     ▐█▛                      ▐█▛
 *
 * Copyright (c) 2016 Konstantin Baierer
 *
 * This software may be modified and distributed under the terms
 * of the MIT license.  See the LICENSE file for details.
 *

 * END-BANNER */

import fs from 'fs';

const argv = require('yargs').argv;
argv.distUrl = (argv.distUrl || 'https://kba.github.io/hocrjs/dist');
argv.cssUrl = (argv.cssUrl || `${argv.distUrl}/hocr-viewer.css`);
argv.scriptUrl = (argv.scriptUrl || `${argv.distUrl}/hocr-fullscreen.webpack.js`);
const cssSnippet = `<link rel="stylesheet" href="${argv.cssUrl}"/>`;
const scriptSnippet = `<script src="${argv.scriptUrl}"></script>`;
argv._.forEach((infile) => {
    const outlines = []
    const outfile = `${infile}.hocrjs.html`;
    fs.readFile(infile, {encoding: 'utf-8'}, (err, data) => {
        if (err) throw err;
        data.split('\n').forEach((line) => {
            if (line.match(/<\/head>/)) {
                outlines.push(cssSnippet);
            } else if (line.match(/<\/body>/)) {
                outlines.push(scriptSnippet);
            }
            outlines.push(line);
        });
        fs.writeFile(outfile, outlines.join('\n'), {encoding: 'utf-8'}, (err) => {
            if (err) throw err;
            console.log(`Written to ${outfile}`);
        });
    });
});
