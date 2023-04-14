import { atom } from 'recoil'

export const isLoadingAtom = atom<boolean>({
  key: 'states/atom/isLoadingAtom',
  default: false,
})
