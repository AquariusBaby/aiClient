import React, { FC, memo } from 'react';
import classnames from 'classnames';
import { Image } from 'antd-mobile';

import MarkdownIt from 'markdown-it'
import mdKatex from '@traptitech/markdown-it-katex'
import mila from 'markdown-it-link-attributes'
import hljs from 'highlight.js'

import styles from './index.module.scss';

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

function renderMarkdownToHTML(markdown: string) {
    const text = markdown.replace(/(^\s*)|(\s*$)/g, '');

    return { __html: mdi.render(text) };
}

const Intro: FC<any> = ({ text, dateTime, avatar, setQuestionChat }) => {

    const introText = text?.split('#')?.[0];
    const actions = text?.split('#')?.slice(1)?.filter((item: string) => item !== '\n' && item.length > 0) || [];
    // console.log(Array.isArray(actions), actions?.length)

    return (
        text &&
        <div className={classnames(styles.dialogueWrap, styles.forAi)}>
            <Image className={styles.avatar} src={avatar} />
            <div className={styles.content}>
                <p className={styles.date}>{dateTime}</p>
                <div className={styles.text}>
                    <div className={classnames(styles.desc, 'markdown-body')} dangerouslySetInnerHTML={renderMarkdownToHTML(introText)} />
                    {
                        actions?.length > 0 && actions.map((item: string, index: number) =>
                            <li className={styles.action} key={index} onClick={() => setQuestionChat(item)}>{item}</li>
                        )
                    }
                </div>
            </div>
        </div>
    );
};

export default memo(Intro);