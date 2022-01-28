import Signin from '../components/signin.vue'
import createUser from '../components/createUser.vue'
import SignOut from '../components/signout.vue'
import Profile from '../components/profile.vue'
import CrudUser from '../components/cruduser.vue'
import ChangePassword from '../components/changePassword.vue'

import guest from './middleware/guest'
import auth from './middleware/auth'
import isAdmin from './middleware/isAdmin'

export default [
    {
        path: '/user/add',
        name: 'createUser',
        component: createUser,
        meta: {
            middleware: [
                auth
            ]
        }
    },
    {
        path: '/signin',
        name: 'signin',
        component: Signin,
        meta: {
            middleware: [
                guest
            ]
        }
    },
    {
        path: '/signout',
        name: 'signout',
        component: SignOut,
    },
    {
        path: '/profile',
        name: 'profile',
        component: Profile,
        meta: {
            middleware: [
                auth
            ]
        },
    },
    {
        path: '/change-password',
        name: 'changePassword',
        component: ChangePassword,
        meta: {
            middleware: [
                auth
            ]
        },
    },
    {
        path: '/users/edit',
        name: 'allUser',
        component: CrudUser,
        meta: {
            middleware: [
                auth,
                isAdmin
            ]
        },
    },
]
