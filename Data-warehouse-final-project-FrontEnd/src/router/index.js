import Vue from "vue"
import Router from "vue-router"

Vue.use(Router)

/* Layout */
import Layout from "@/layout"

/**
 * Note: sub-menu only appear when route children.length >= 1
 * Detail see: https://panjiachen.github.io/vue-element-admin-site/guide/essentials/router-and-nav.html
 *
 * hidden: true                   if set true, item will not show in the sidebar(default is false)
 * alwaysShow: true               if set true, will always show the root menu
 *                                if not set alwaysShow, when item has more than one children route,
 *                                it will becomes nested mode, otherwise not show the root menu
 * redirect: noRedirect           if set noRedirect will no redirect in the breadcrumb
 * name:'router-name'             the name is used by <keep-alive> (must set!!!)
 * meta : {
    roles: ['admin','editor']    control the page roles (you can set multiple roles)
    title: 'title'               the name show in sidebar and breadcrumb (recommend set)
    icon: 'svg-name'             the icon show in the sidebar
    breadcrumb: false            if set false, the item will hidden in breadcrumb(default is true)
    activeMenu: '/example/list'  if set path, the sidebar will highlight the path you set
  }
 */

/**
 * constantRoutes
 * a base page that does not have permission requirements
 * all roles can be accessed
 */
export const constantRoutes = [
    {
        path: "/login",
        component: () => import("@/views/login/index"),
        hidden: true
    },

    {
        path: "/404",
        component: () => import("@/views/404"),
        hidden: true
    },

    {
        path: "/",
        component: Layout,
        redirect: "/dashboard",
        children: [
            {
                path: "dashboard",
                name: "项目简介",
                component: () => import("@/views/dashboard/index"),
                meta: { title: "项目简介", icon: "dashboard" }
            }
        ]
    },
    {
        path: "/movie",
        component: Layout,
        redirect: "/movies/search",
        name: "movies",
        children: [
            {
                path: "query",
                name: "项目简介",
                component: () => import("@/views/query/index"),
                meta: { title: "电影信息查询", icon: "movie" }
            }
        ]
    },
    {
        path: "/movie",
        component: Layout,
        redirect: "/movies/search",
        name: "movies",
        children: [
            {
                path: "relation",
                name: "项目简介",
                component: () => import("@/views/dashboard/index"),
                meta: { title: "电影信息查询", icon: "movie" }
            }
        ]
    },
    {
        path: "/movie",
        component: Layout,
        redirect: "/movies/search",
        name: "movies",
        children: [
            {
                path: "relation",
                name: "项目简介",
                component: () => import("@/views/dashboard/index"),
                meta: { title: "电影信息查询", icon: "movie" }
            }
        ]
    },
    // 404 page must be placed at the end !!!
    { path: "*", redirect: "/404", hidden: true }
]

const createRouter = () =>
    new Router({
        // mode: 'history', // require service support
        scrollBehavior: () => ({ y: 0 }),
        routes: constantRoutes
    })

const router = createRouter()

export function resetRouter() {
    const newRouter = createRouter()
    router.matcher = newRouter.matcher // reset router
}

export default router
