import MarkdownIt from "markdown-it"
import { highlight } from "./highlight";
import type {
    BuiltinTheme,
    ThemeRegistrationAny
} from 'shiki'

export type ThemeOptions =
    | ThemeRegistrationAny
    | BuiltinTheme
    | {
        light: ThemeRegistrationAny | BuiltinTheme
        dark: ThemeRegistrationAny | BuiltinTheme
    }

export interface MarkdownOptions extends MarkdownIt.Options {
    theme?: ThemeOptions
}

export const createMarkdownRenderer = async (options: MarkdownOptions = {}) => {
    const theme = options.theme ?? { light: 'github-light', dark: 'github-dark' }
    const hasSingleTheme = typeof theme === 'string' || 'name' in theme

    const md = MarkdownIt({
        html: true,
        linkify: true,
        highlight: options.highlight || (await highlight(theme, options)),
        ...options
    })

    return md;
}