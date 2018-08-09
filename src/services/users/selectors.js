export const selectUserFullName = (state) => state.auth.user.fullName;
export const selectUserInitialValues = (state) => ({
  fullName:    state.auth.user.fullName,
  phoneNumber: state.auth.user.phoneNumber,
  email:       state.auth.user.email,
});
export const selectUserId = (state) => state.auth.user.id;
