export const sleep = async (ms: number): Promise<void> => {
    console.log(`new build at ${new Date()}`)
    return new Promise((resolve) => setTimeout(resolve, ms));
};
