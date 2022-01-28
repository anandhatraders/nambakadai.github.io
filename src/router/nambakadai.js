import Stocks from '../components/stocks.vue'
import StockAdd from '../components/stocksAdd.vue'
import StockUpdate from '../components/stockUpdate.vue'
import Customer from '../components/customer.vue'
import CustomerEdit from '../components/customerEdit.vue'
import PlaceOrder from '../components/placeOrder.vue'
import Orders from '../components/orders.vue'
import DetailOrder from '../components/detailOrder.vue'
import Attendance from '../components/attendance.vue'
import AdminUserUpdate from '../components/adminUserUpdate.vue'
import AdminAllUser from '../components/adminAllUser.vue'

import auth from './middleware/auth'
import isAdmin from './middleware/isAdmin'


export default [
    {
        path: '/stocks',
        name: 'stocks',
        component: Stocks,
        meta: {
            middleware: [
                auth
            ]
        },

    },
    {
        path: '/stock-create',
        name: 'create-stocks',
        component: StockAdd,
        meta: {
            middleware: [
                auth
            ]
        },

    },
    {
        path: '/stock-update',
        name: 'update-stock',
        component: StockUpdate,
        meta: {
            middleware: [
                auth
            ]
        },

    },
    {
        path: '/customers',
        name: 'customer-List',
        component: Customer,
        meta: {
            middleware: [
                auth
            ]
        }
    },
    {
        path: '/place-order',
        name: 'place-order',
        component: PlaceOrder,
        meta: {
            middleware: [
                auth
            ]
        }
    },
    {
        path: '/orders',
        name: 'all-orders',
        component: Orders,
        meta: {
            middleware: [
                auth
            ]
        }
    },
    {
        path: '/invoice/item',
        name: 'detail-invoice',
        component: DetailOrder,
        meta: {
            middleware: [
                auth
            ]
        }
    },
    {
        path: '/customer/edit',
        name: 'customerEdit',
        component: CustomerEdit,
        meta: {
            middleware: [
                auth
            ]
        }
    },
    {
        path: '/attendance',
        name: 'attendance',
        component: Attendance,
        meta: {
            middleware: [
                auth
            ]
        }
    },
    {
        path: '/admin/users/all',
        name: 'admin-all-user',
        component: AdminAllUser,
        meta: {
            middleware: [
                auth,
                isAdmin
            ]
        }
    },
    {
        path: '/admin/user/update',
        name: 'user-delete',
        component: AdminUserUpdate,
        meta: {
            middleware: [
                auth,
                isAdmin
            ]
        }
    }
]
