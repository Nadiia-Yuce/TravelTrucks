export const selectCampers = (state) => state.campers.items;
export const selectPagination = (state) => state.campers.pagination;
export const selectTotal = (state) => state.campers.total;
export const selectCurrentCamper = (state) => state.campers.selected;
export const selectIsLoading = (state) => state.campers.isLoading;
export const selectError = (state) => state.campers.error;
