import { customAlphabet } from 'nanoid'
import type { ShikiTransformer } from 'shiki'
import { getHighlighter, bundledLanguages, isSpecialLang } from 'shiki'
import {
    transformerCompactLineOptions,
    transformerNotationDiff,
    transformerNotationErrorLevel,
    transformerNotationFocus,
    transformerNotationHighlight,
    type TransformerCompactLineOption
} from '@shikijs/transformers'

const nanoid = customAlphabet('abcdefghijklmnopqrstuvwxyz', 10)

const attrsToLines = (attrs: string): TransformerCompactLineOption[] => {
    attrs = attrs.replace(/^(?:\[.*?\])?.*?([\d,-]+).*/, '$1').trim()
    const result: number[] = []
    if (!attrs) {
        return []
    }
    attrs
        .split(',')
        .map((v) => v.split('-').map((v) => parseInt(v, 10)))
        .forEach(([start, end]) => {
            if (start && end) {
                result.push(
                    ...Array.from({ length: end - start + 1 }, (_, i) => start + i)
                )
            } else {
                result.push(start)
            }
        })
    return result.map((v) => ({
        line: v,
        classes: ['highlighted']
    }))
}

export async function highlight(
    theme: any,
    options: any,
): Promise<(str: string, lang: string, attrs: string) => string> {
    const {
        defaultHighlightLang: defaultLang = '',
        codeTransformers: userTransformers = []
    } = options

    const highlighter = await getHighlighter({
        themes:
            typeof theme === 'object' && 'light' in theme && 'dark' in theme
                ? [theme.light, theme.dark]
                : [theme],
        langs: [...Object.keys(bundledLanguages), ...(options.languages || [])],
        langAlias: options.languageAlias
    })

    await options?.shikiSetup?.(highlighter)

    const transformers: ShikiTransformer[] = [
        transformerNotationDiff(),
        transformerNotationFocus({
            classActiveLine: 'has-focus',
            classActivePre: 'has-focused-lines'
        }),
        transformerNotationHighlight(),
        transformerNotationErrorLevel(),
        {
            name: 'vitepress:add-class',
            pre(node) {
                this.addClassToHast(node, 'vp-code')
            }
        },
        {
            name: 'vitepress:clean-up',
            pre(node) {
                delete node.properties.tabindex
                delete node.properties.style
            }
        }
    ]

    const vueRE = /-vue$/
    const lineNoStartRE = /=(\d*)/
    const lineNoRE = /:(no-)?line-numbers(=\d*)?$/
    const mustacheRE = /\{\{.*?\}\}/g

    return (str: string, lang: string, attrs: string) => {
        const vPre = vueRE.test(lang) ? '' : 'v-pre'
        lang =
            lang
                .replace(lineNoStartRE, '')
                .replace(lineNoRE, '')
                .replace(vueRE, '')
                .toLowerCase() || defaultLang

        if (lang) {
            const langLoaded = highlighter.getLoadedLanguages().includes(lang as any)
            if (!langLoaded && !isSpecialLang(lang)) {
                // logger.warn(
                //     c.yellow(
                //         `\nThe language '${lang}' is not loaded, falling back to '${defaultLang || 'txt'
                //         }' for syntax highlighting.`
                //     )
                // )
                lang = defaultLang
            }
        }

        const lineOptions = attrsToLines(attrs)
        const mustaches = new Map<string, string>()

        const removeMustache = (s: string) => {
            if (vPre) return s
            return s.replace(mustacheRE, (match) => {
                let marker = mustaches.get(match)
                if (!marker) {
                    marker = nanoid()
                    mustaches.set(match, marker)
                }
                return marker
            })
        }

        const restoreMustache = (s: string) => {
            mustaches.forEach((marker, match) => {
                s = s.replaceAll(marker, match)
            })
            return s
        }

        str = removeMustache(str).trimEnd()

        const highlighted = highlighter.codeToHtml(str, {
            lang,
            transformers: [
                ...transformers,
                transformerCompactLineOptions(lineOptions),
                {
                    name: 'vitepress:v-pre',
                    pre(node) {
                        if (vPre) node.properties['v-pre'] = ''
                    }
                },
                {
                    name: 'vitepress:empty-line',
                    code(hast) {
                        hast.children.forEach((span) => {
                            if (
                                span.type === 'element' &&
                                span.tagName === 'span' &&
                                Array.isArray(span.properties.class) &&
                                span.properties.class.includes('line') &&
                                span.children.length === 0
                            ) {
                                span.children.push({
                                    type: 'element',
                                    tagName: 'wbr',
                                    properties: {},
                                    children: []
                                })
                            }
                        })
                    }
                },
                ...userTransformers
            ],
            meta: { __raw: attrs },
            ...(typeof theme === 'object' && 'light' in theme && 'dark' in theme
                ? { themes: theme, defaultColor: false }
                : { theme })
        })

        return restoreMustache(highlighted)
    }
}