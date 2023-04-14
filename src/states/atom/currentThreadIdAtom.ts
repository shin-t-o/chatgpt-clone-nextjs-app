import { atom } from 'recoil'

export const currentThreadIdAtom = atom<string>({
  key: 'states/atom/currentThreadIdAtom',
  default: '',
})
