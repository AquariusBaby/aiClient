import React, { FC, memo } from 'react';
import classnames from 'classnames';
import { Image } from 'antd-mobile';
import MarkdownIt from 'markdown-it'
import mdKatex from '@traptitech/markdown-it-katex'
import mila from 'markdown-it-link-attributes'
import hljs from 'highlight.js'

import CopyToClipboard from '../../../../commonComp/CopyToClipboard';

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

// interface DialogueProps {
//     aichat?: string | null;
//     userchat?: string | null;
//     time?: string;
// }

function renderMarkdownToHTML(markdown: string) {
    const text = markdown.replace(/(^\s*)|(\s*$)/g, '');

    return { __html: mdi.render(text) };
}

const Dialogue: FC<any> = ({ text, dateTime, inversion = false, avatar }) => {
    return (
        text &&
        <div className={classnames(styles.dialogueWrap, { [styles.forAi]: !inversion, [styles.forUser]: inversion })}>
            <Image className={styles.avatar} src={inversion ? 'https://c.aichat.la/default-avatar.png' : avatar} />
            <div className={styles.content}>
                <p className={styles.date}>{dateTime}</p>
                <div className={styles.descWrap}>
                <div className={classnames(styles.desc, 'markdown-body')} dangerouslySetInnerHTML={renderMarkdownToHTML(text)} />
                {!inversion && <CopyToClipboard text={text} copyBtnText={<i className={classnames('icon iconfont icon-copy', styles.expandIcon)} />} />}
                </div>
            </div>
        </div>
    );
};

export default memo(Dialogue);