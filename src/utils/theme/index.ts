import { createBox, createText, createTheme } from "@shopify/restyle";
import { colors } from "./color";
import { textVariants } from "./text-variant";

export const theme = createTheme({
    breakpoints: {},
    colors: colors,
    textVariants: textVariants,
    spacing: {
        "1": 4,
        "2": 8,
        "3": 12,
        "4": 16,
        "5": 20,
        "6": 24,
        "10": 40,
        "11": 44,
        "12": 48,
        "14": 56,
        "16": 64,
        "20": 80,
        "24": 96,
        "28": 112,
    },
    borderRadii: {
        none: 0,
        rounded: 4,
        roundedXl: 8,
        rounded2Xl: 16,
    }
})
export type Theme = typeof theme

export const Box = createBox<Theme>()
export const Text = createText<Theme>()

export default theme