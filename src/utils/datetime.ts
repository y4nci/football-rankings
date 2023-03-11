export const getCurrentSeason = () => {
    const date = new Date();
    const year = date.getFullYear();
    const month = date.getMonth();

    return month <= 8 ? year - 1 : year;
};
