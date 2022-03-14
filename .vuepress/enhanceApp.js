/**
 * Client app enhancement file.
 *
 * https://v1.vuepress.vuejs.org/guide/basic-config.html#app-level-enhancements
 */

export default ({
  Vue, // the version of Vue being used in the VuePress app
  options, // the options for the root Vue instance
  router, // the router instance for the app
  siteData // site metadata
}) => {
  router.addRoutes([
    { path: '/book/00__introduction/00__forward', redirect: '/book/00__introduction/00__foreword' },
    { path: '/book/00__introduction/00__forward.html', redirect: '/book/00__introduction/00__foreword' },
  ])
}
