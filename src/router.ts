import { createRouter, createWebHistory } from 'vue-router'

export default createRouter({
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
            component: () => import('@/views/ManageTag.vue'),
        },
        {
            path: '/summary-message',
            name: 'summary-message',
            component: () => import('@/views/SummaryMessage.vue'),
        },
    ],
})
