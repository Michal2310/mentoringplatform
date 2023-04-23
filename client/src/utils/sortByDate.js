export const sortByDate = (a, b) => {
    return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
};
