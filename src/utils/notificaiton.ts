import api from 'zmp-sdk';
export const message = (s: string) => {
  api.showToast({
    message: s,
  })
}