// eslint-disable-next-line import/named
import { GetterTree, ActionTree, MutationTree } from 'vuex'
import UserTypeEnum from '~/models/UserTypeEnum'

export const state = () => ({})

export type RootState = ReturnType<typeof state>

export const getters: GetterTree<RootState, RootState> = {
  profilePhoto(state: any) {
    const user = state.auth.user
    if (!user) return ''

    if (user.profile_picture) return user.profile_picture

    return '/img/placeholder_picture.png'
  },
  userType(state: any) {
    const user = state.auth.user
    if (!user) return ''
    // return UserTypeEnum.PAID

    return user.role

    // return UserTypeEnum.FREE === 'free_user'

    // const userType = (<any>UserTypeEnum)[user.role]

    // if (!userType) return UserTypeEnum.FREE
    // else return userType

    // // switch (user.role) {
    // //   case 'free_user':
    // //     return UserTypeEnum.FREE
    // //   case 'paid_user':
    // //     return UserTypeEnum.PAID
    // //   default:
    // //     return UserTypeEnum.FREE
    // // }
  },
}

export const mutations: MutationTree<RootState> = {}

export const actions: ActionTree<RootState, RootState> = {}
