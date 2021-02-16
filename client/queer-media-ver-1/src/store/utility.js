export const updateState = (oldState, updateValues) => {
    return {
        ...oldState,
        ...updateValues
    }
}