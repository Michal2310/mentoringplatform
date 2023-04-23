const date = new Date();
export const getDaysDiff = (createdAt: string) => (date.getTime() - new Date(createdAt).getTime()) / (1000 * 60 * 60 * 24);
