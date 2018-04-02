const selectIsAuthorized = state => !!state.auth.token;

export { selectIsAuthorized };
