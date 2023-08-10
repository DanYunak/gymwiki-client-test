export const getUsernameWithoutDomain = (username: string) => {
    const usernameParts = username.split('@')
    return usernameParts[0]
}