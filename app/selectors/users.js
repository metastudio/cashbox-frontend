export const userFullNameSelector = (state) => state.auth.user.fullName
export const userInitialValuesSelector = (state) => ({
  fullName: state.auth.user.fullName,
  phoneNumber: state.auth.user.phoneNumber,
  email: state.auth.user.email
})
export const userIdSelector = (state) => state.auth.user.id
