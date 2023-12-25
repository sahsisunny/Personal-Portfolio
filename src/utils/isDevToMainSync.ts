export const isDevToMainSync = (title: string) => {
    const devToMainSyncRegex = /dev to main sync/i
    return devToMainSyncRegex.test(title)
 }
 