import UserTypeEnum from '~/models/UserTypeEnum'

export default function ({ store, redirect }) {
  // If the user is not a paid user
  if (store.getters.userType !== UserTypeEnum.PAID) {
    return redirect('/dashboard')
  }
}
