import { palette } from "../theme/color"
import { nanoid } from 'nanoid/non-secure'

export const getColors = () => {
    const colors: IColor[] = Object.keys(palette).filter((paletteColor: string) => !paletteColor.includes("white") && !paletteColor.includes("gray")).map((paletteColor: string) => {
        return {
            id: `color_${nanoid()}`,
            name: paletteColor,
            code: palette[paletteColor as keyof typeof palette]
        }
    })

    return colors
}



