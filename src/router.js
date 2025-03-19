import { createRouter, createWebHistory } from "vue-router";
import UserProfile from "./pages/UserProfile.vue";
import HomePage from "./pages/HomePage.vue";
import LoginPage from "./pages/LoginPage.vue";

const routes = [
    {
        path: "/",
        name : "home",
        component: HomePage,
        meta: {
            requiresAuth: true
        }
    },
    {
        path: "/user/:username",
        name: "user",
        component: UserProfile,
    },
    {
        path: "/login",
        name: "login",
        component: LoginPage,
    }
];

const router = createRouter({
    history: createWebHistory(),
    routes,
});

router.beforeEach((to, _, next) => {
    if (to.matched.some(record => record.meta.requiresAuth)) {
        const user = JSON.parse(localStorage.getItem('user'));
        if (!user) {
            next({ name: 'register' });
        } else {
            next();
        }
    } else {
        next();
    }
});

export default router;