export const getIsAuthenticated = (state) => state.auth.isAuthenticated;
export const getUserId = (state) => state.auth.user.id;
export const getUserType = (state) => state.auth.user.userType;
export const getUserEmail = (state) => state.auth.user.email;
export const getActiveSubscription = (state) =>
  state.auth.user.hasActiveSubscription;
