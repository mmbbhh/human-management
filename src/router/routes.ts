export const routes = [
    {
        path: '/',
        redirect: '/home'
    },
    {
        path: '/home',
        name: 'Home',
        meta: {
            requireAuth: true,
        },
        component: () => import('views/home/home.vue'),
    },
    {
        path: '/login',
        name: 'Login',
        component: () => import('views/login/login.vue')
    },
    {
        path: '/apply',
        name: 'Apply',
        meta: {
            requireAuth: true,
        },
        component: () => import('views/apply/apply.vue')
    },
    {
        path: '/setting',
        name: 'Setting',
        meta: {
            requireAuth: true,
        },
        component: () => import('views/setting/setting.vue')
    },
    {
        path: '/notice',
        name: 'Notice',
        meta: {
            requireAuth: true,
        },
        component: () => import('views/notice/notice.vue')
    },
    {
        path: '/human',
        name: 'Human',
        meta: {
            requireAuth: true,
        },
        component: () => import('views/human/human.vue')
    }
]