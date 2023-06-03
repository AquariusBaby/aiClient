import React, { FC, memo } from 'react';
import classnames from 'classnames';
import { Image, Popover } from 'antd-mobile';
// import { Action } from 'antd-mobile/es/components/popover';
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

function renderMarkdownToHTML(markdown: string) {
    const text = markdown.replace(/(^\s*)|(\s*$)/g, '')
    return { __html: mdi.render(text) };
}

const Dialogue: FC<any> = ({ context, question, dateTime, avatar, index, handlePostQuestion }) => {

    // const actions: Action[] = [
    //     { key: 'copy', icon: <i className={classnames('icon iconfont icon-copy', styles.copyIcon)} />, text: <CopyToClipboard text={context} copyBtnText="复制" /> },
    //     // { key: 'del', icon: <i className={classnames('icon iconfont icon-shanchu', styles.delIcon)} />, text: '删除' },
    // ]

    // function handleMenu(node: {key: string, text: string}) {
    //     switch(node.key) {
    //         case 'copy':
    //             break;
    //         // case 'del':

    //         //     break;
    //     }
    // }

    function refresh() {
        // handlePostQuestion(question, index, 1);
    }

    return (
        <>
            <div className={classnames(styles.dialogueWrap, styles.forUser)}>
                <Image className={styles.avatar} src={'https://c.aichat.la/default-avatar.png'} />
                <div className={styles.content}>
                    <p className={styles.date}>{dateTime}</p>
                    {/* <p className={styles.desc}>{marked.parse(question)}</p> */}
                    <p className={classnames(styles.desc, 'markdown-body')} dangerouslySetInnerHTML={renderMarkdownToHTML(question)} />
                </div>
            </div>
            <div className={classnames(styles.dialogueWrap, styles.forAi)}>
                <Image className={styles.avatar} src={avatar} />
                <div className={styles.content}>
                    <p className={styles.date}>{dateTime}</p>
                    {/* <p className={styles.desc}>{context}</p> */}
                    <div className={styles.descWrap}>
                        <div className={classnames(styles.desc, 'markdown-body')} dangerouslySetInnerHTML={renderMarkdownToHTML(context)} />
                        {/* <i className={classnames('icon iconfont icon-shuaxin', styles.refreshIcon)} onClick={refresh} /> */}
                        {/* <Popover.Menu
                            actions={actions}
                            placement='left'
                            onAction={(node: any) => handleMenu(node)}
                            trigger='click'
                            >
                            <i className={classnames('icon iconfont icon-listmore', styles.expandIcon)} />
                        </Popover.Menu> */}
                        <CopyToClipboard text={context} copyBtnText={<i className={classnames('icon iconfont icon-copy', styles.expandIcon)} />} />
                    </div>
                </div>
            </div>
        </>
    );
};

export default memo(Dialogue);