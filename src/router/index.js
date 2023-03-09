import { createRouter, createWebHashHistory } from "vue-router";

//通过createRouter创建路由实例
const router = createRouter({
    history: createWebHashHistory(),
    routes: [
        {
            path: '/',
            redirect: '/home'
        },
        {
            path: '/home',
            name: 'home',
            component: () => import('@/views/Home.vue')
        }, {
            path: '/about',
            name: 'about',
            component: () => import('@/views/About.vue')
        },
        {
            path: '/category',
            name: 'category',
            component: () => import('@/views/Category.vue')
        },
        {
            path: '/cart',
            name: 'cart',
            component: () => import('@/views/Cart.vue')
        },
        {
            path: '/user',
            name: 'user',
            component: () => import('@/views/User.vue')
        },
        {
            path: '/detail',
            name: 'detail',
            component: () => import('@/views/Detail.vue')
        }, {
            path: '/login',
            name: 'login',
            component: () => import('@/views/Login.vue')
        }, {
            path: '/product-list',
            name: 'product-list',
            component: () => import('@/views/ProductList.vue')
        }, {
            path: '/product/:id',
            name: 'product',
            component: () => import('@/views/ProductDetail.vue')
        }, {
            path: '/create-order',
            name: 'create-order',
            component: () => import('@/views/CreateOrder.vue')
        }, {
            path: '/address',
            name: 'address',
            component: () => import('@/views/Address.vue')
        }, {
            path: '/address-edit',
            name: 'address-edit',
            component: () => import('@/views/AddressEdit.vue')
        }, {
            path: '/order',
            name: 'order',
            component: () => import('@/views/Order.vue')
        }, {
            path: '/setting',
            name: 'setting',
            component: () => import('@/views/Setting.vue')
        }
    ]
})

export default router