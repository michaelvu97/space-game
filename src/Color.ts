export class Color {
    r: number;
    g: number;
    b: number;

    constructor (r: number, g: number, b: number) {
        /** 
         * Value normalization.
         */ 
        while (r > 255)
            r -= 256;
        while (r < 0)
            r += 256;
        while (g > 255)
            g -= 256;
        while (g < 0)
            g += 256;
        while (b > 256)
            b -= 256;
        while (b < 0)
            b += 256;

        this.r = r;
        this.g = g;
        this.b = b;
    }

    ToHexString = (): string => {

        /** 
         * Convert individual colors to hex strings.
         */ 
        var red = this.r.toString(16);
        var green = this.g.toString(16);
        var blue = this.b.toString(16);

        /** 
         * Pad with zeroes.
         */
        while (red.length < 2)
            red = '0' + red;

        while (green.length < 2)
            green = '0' + green;

        while (blue.length < 2)
            blue = '0' + blue;

        return '#' + red + green + blue;
    }

}
