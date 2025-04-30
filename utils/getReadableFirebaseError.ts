export const getReadableErrorMessage = (errorMessage: string) => {
  switch (errorMessage) {
    case 'auth/invalid-email':
      return 'Invalid email address format';
    case 'auth/user-disabled':
      return 'This account has been disabled';
    case 'auth/user-not-found':
      return 'No account found with this email';
    case 'auth/wrong-password':
      return 'Incorrect password';
    case 'auth/too-many-requests':
      return 'Too many failed login attempts. Please try again later';
    case 'auth/email-already-in-use':
      return 'This email address is already in use';
    case 'auth/invalid-credential':
      return 'Wrong email or password';
    case 'auth/network-request-failed':
      return 'Network problem';
    case 'auth/unknown':
      return 'An unexpected error occurred';
    default:
      return errorMessage;
  }
};
