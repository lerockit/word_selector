type EnumValueOfParams<T extends Record<string, any>, E extends Error> = {
    Enum: T,
    Exception: new () => E,
    key: string
}

export const enumValueOf = <T extends Record<string, any>, E extends Error>(
    {Enum, Exception, key}: EnumValueOfParams<T, E>
): T[keyof T] => {
    if(!Object.keys(Enum).includes(key)) throw new Exception()
    return Enum[key]
}