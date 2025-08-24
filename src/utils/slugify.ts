import customSlugify from "slugify";

const isProduction = process.env.NODE_ENV === 'production';
const url = isProduction ? 'https://dev.suzu.net' : 'http://localhost:3000';

type SlugifyOptions = {
    replacement?: string;
    remove?: RegExp;
    lower?: boolean;
    strict?: boolean;
    locale?: string;
    trim?: boolean;
};
  
export const slugify = (
    string: string,
    options?: SlugifyOptions,
    args?: customSlugify.ExtendArgs | { [key: string]: any },
): string => {
    const defaultOptions: SlugifyOptions = {
        replacement: "-",
        remove: undefined,
        lower: true,
        strict: true,
        locale: "vi",
        trim: true,
    };

    const defaultExtend = {
        đ: "d",
    };

    customSlugify.extend({ ...defaultExtend, ...args });
    return customSlugify(string, { ...defaultOptions, ...options });
};

export const processSlug = (str: string) => {
    const slug = slugify(str, {
        replacement: "-"
    });
    return slug;
}