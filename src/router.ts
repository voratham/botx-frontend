import { RouteRecordRaw, createRouter, createWebHistory } from 'vue-router'



const manageTagRoutes: Array<RouteRecordRaw> = [
    {
        path: '',
        name: 'manage-tag',
        component: () => import('@/views/ManageTag.vue')
    },
    {
        path: 'create',
        name: 'manage-tag-create',
        component: () => import('@/views/CreateTag.vue')
    },
    {
        path: 'edit',
        name: 'manage-tag-edit',
        component: () => import('@/views/EditTag.vue')
    }
]


const router = createRouter({
    history: createWebHistory("/"),
    routes: [
        {
            path: '/register',
            name: 'register',
            component: () => import('@/views/Register.vue'),
        },
        {
            path: '/setup-admin',
            name: 'setup-admin',
            component: () => import('@/views/SetupAdmin.vue'),
        },
        {
            path: '/manage-tag',
            name: 'manage-tag',
            children: manageTagRoutes,
        },
        {
            path: '/history-message',
            name: 'history-message',
            component: () => import('@/views/HistoryMessage.vue')
        },
        {
            path: '/schedule-time',
            name: 'schedule-time',
            component: () => import('@/views/SetScheduleTime.vue')
        },
    ],
})

router.beforeEach((to, _, next) => {
    const getQueryString = to.query['liff.state']
    if (!Array.isArray(getQueryString)) {
        const path = getQueryString?.toString()
        if (path) {
            next(path)
        }
    }
    next()
})

export default router