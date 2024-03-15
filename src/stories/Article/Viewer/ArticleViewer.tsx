import { Divider, Icon, Tag } from '@douyinfe/semi-ui'
import { CSSProperties } from "react";
import styled from "styled-components";
import IArticle from "@/interfaces/DTO/Article/IArticle";
import dayjs from 'dayjs';
import ReactMarkdown from 'react-markdown';
import MarkdownIt from 'markdown-it'
import Shiki from '@shikijs/markdown-it'
import { codeToHtml } from 'shiki/index.mjs';
import IconEye from '@/stories/icon/eye';
interface ArticleViewerProps {
  article: IArticle;
  style?: CSSProperties;
}

const md = MarkdownIt()

md.use(await Shiki({
  themes: {
    light: 'material-theme-palenight',
    dark: 'github-dark'
  }
}))

export default function ArticleViewer({ article }: ArticleViewerProps) {
  return (
    <article>
      <div className='flex items-center gap-2'>
        <span>{dayjs(article.updatedAt).format("YYYY-MM-DD")}</span>
        <span className='inline-flex items-center gap-2'><Icon svg={<IconEye />} />{article.readCount}</span>
        {article.tags.length > 0 &&
          article.tags.map((tag) => {
            return (
              <Tag key={tag.id} color={tag.color ? tag.color : "orange"}>
                {tag.name}
              </Tag>
            );
          })}
      </div>
      <div className='markdown-body' dangerouslySetInnerHTML={{
        __html: md.render(article.content)
      }}>
      </div>
    </article >
  );
}