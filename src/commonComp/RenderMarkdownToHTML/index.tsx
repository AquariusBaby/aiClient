// import React, { FC, memo } from 'react';

import MarkdownIt from 'markdown-it'
import mdKatex from '@traptitech/markdown-it-katex'
import mila from 'markdown-it-link-attributes'
import hljs from 'highlight.js'

const mdi = new MarkdownIt({
    linkify: true,
    highlight(code, language) {
        const validLang = !!(language && hljs.getLanguage(language))
        if (validLang) {
            const lang = language ?? ''
            return highlightBlock(hljs.highlight(code, { language: lang }).value, lang)
        }
        return highlightBlock(hljs.highlightAuto(code).value, '')
    }
})

mdi.use(mila, { attrs: { target: '_blank', rel: 'noopener' } })
mdi.use(mdKatex, { blockClass: 'katexmath-block rounded-md p-[10px]', errorColor: ' #cc0000' })

function highlightBlock(str: any, lang: any) {
    return `<pre class="code-block-wrapper"><div class="code-block-header"><span class="code-block-header__lang">${lang}</span></div><code class="hljs code-block-body ${lang}">${str}</code></pre>`
}

export default function renderMarkdownToHTML(markdown: string) {
    const text = markdown.replace(/(^\s*)|(\s*$)/g, '');

    return { __html: mdi.render(text) };
}