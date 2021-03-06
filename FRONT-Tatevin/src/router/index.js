import Vue from 'vue'
import Router from 'vue-router'
import Hello from '@/components/Hello'
import Sandbox from '@/components/Sandbox'
import ProdUser from '@/components/ProdUser'
import Login from '@/components/Login'
import Signup from '@/components/Signup'
import WinesPage from '@/components/WinesPage'
import WineStories from '@/components/WineStories'
import Story from '@/components/Story'
import Learning from '@/components/Learning'
import Dictionnary from '@/components/Dictionnary'
import Search from '@/components/Search'
import Cave from '@/components/Cave'
import Wishes from '@/components/Wishes'
import OtherUser from '@/components/OtherUser'
import Wine from '@/components/Wine/Wine'
import WineModification from '@/components/Wine/WineModification'
import WineStoryCreation from '@/components/WineStoryCreation'
import Chart from '@/components/Chart'
import CGU from '@/components/CGU'
import mentionsLegales from '@/components/mentionsLegales'
Vue.use(Router);

export default new Router({

    mode: 'history',
    routes: [
        {
            path: '/',
            name: 'Hello',
            component: Hello
        },
        {
            path: '/sandbox',
            name: 'Sandbox',
            component: Sandbox
        },
        // User
        {
            path: '/user/:username',
            name: 'UserAccount',
            component: OtherUser
        },
        {
            path: '/producer/:username',
            name: 'ProdAccount',
            component: ProdUser
        },
        {
            path: '/login',
            name: 'Login',
            component: Login
        },
        {
            path: '/signup',
            name: 'Signup',
            component: Signup
        },
        {
            path: '/wine/:id',
            name: 'Wine',
            component: Wine
        },
        {
            path: '/wine/m/:id',
            name: 'WineModification',
            component: WineModification
        },
        {
            path: '/wines',
            name: 'WinesPage',
            component: WinesPage
        },
        {
            path: '/wineStories',
            name: 'WineStories',
            component: WineStories
        },
        {
            path: '/wineStories/creation',
            name: 'WineStoryCreation',
            component: WineStoryCreation
        },
        {
            path: '/wineStories/modification/:id',
            name: 'WineStoryModification',
            component: WineStoryCreation
        },
        {
            path: '/story/:id',
            name: 'Story',
            component: Story
        },
        {
            path: '/learning',
            name: 'Learning',
            component: Learning
        },
        {
            path: '/dictionnary',
            name: 'Dictionnary',
            component: Dictionnary
        },
        {
            path: '/search',
            name: 'Search',
            component: Search

        },
        {
            path: '/cave',
            name: 'Cave',
            component: Cave
        },
        {
            path: '/wishes',
            name: 'Wishes',
            component: Wishes
        },
        {
            path: "/user/:username",
            component: OtherUser,
            name: "otherUser"
        },
        {
            path: "/chart",
            component: Chart
        },
        {
            path: "/cgu",
            component: CGU,
            name:"CGU"
        },
        {
            path: "/mentionsLegales",
            component: mentionsLegales,
            name:"mentionsLegales"
        },
    ]
})
