import { atom } from 'recoil'

export const isFirstPostAtom = atom<boolean>({
  key: 'states/atom/isFirstPostAtom',
  default: true,
})
