export const formatAvatarUrl = (avatar: string | NonNullable<unknown>): string | null => {
    if( typeof avatar === "string") {
        return `https://ya-praktikum.tech/api/v2/resources/${avatar.replace(/\//g, "%2F")}`;
    } else return null;
};
