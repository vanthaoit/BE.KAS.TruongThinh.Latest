/* eslint-disable no-empty-function */
class SessionAuthen {
  // eslint-disable-next-line no-useless-constructor
  constructor() {}

  validateSession() {
    const currentPassword = sessionStorage.getItem('TruongThinhPassword');
    if (currentPassword === null)
      //   currentPassword !== 'vietnamthaotranvan@gmail.comooo0oooAdmin@2021'
      window.location.replace('/login');
  }
}
export default new SessionAuthen();
