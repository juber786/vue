import {createRouter, createWebHistory} from 'vue-router';
import Dashboard from '../components/dashboard.vue';
import TvShows from '../components/list-tvshows.vue';
import TvShowsDetails from '../components/tvshow-details.vue';




const routes = [
    {
        path:'/',
        name:'Dashboard',
        component:Dashboard
    },
    {
        path:'/tvShows',
        name:'TvShows',
        component:TvShows
    },
    {
        path:'/tvShow/id=:id',
        name:'TvShowsDetails',
        component:TvShowsDetails
    }
    


]

const router = createRouter({
    history: createWebHistory(process.env.BASE_URL),
    routes:routes
})

export default router;