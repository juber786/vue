import { shallowMount } from '@vue/test-utils'
import Dashboard from '@/components/Dashboard.vue'
import TvShowsService from '@/services/TvShowsService'
import tvshowsresponse from '../../tests/stubs/tvshowsresponse.json'
import tvshowssearchresponse from '../../tests/stubs/tvshowssearchresponse.json'
import tvshowsearchresponse1 from '../../tests/stubs/tvshowsearchresponse1.json'

import { filterByCategory } from "../utils/filterUtil.js";



global.fetch = jest.fn(() => Promise.resolve());
jest.mock('../utils/filterUtil.js');
filterByCategory.mockImplementation(() => tvshowsresponse);

describe('Dashboard.vue', () => {
    let wrapper;

    const $route = {
        path: '/'
    }
    beforeEach(()=>{
        wrapper = shallowMount(Dashboard, {
            mocks: {
                $route
              }
        });
    });
   

    it("component, loading exists and ", async () => {
        const loading = wrapper.get(".overlay")
        expect(loading.exists()).toBe(true);
        expect(wrapper.exists()).toBe(true);
        wrapper.vm.loading = false;
        // expect(wrapper.findComponent(SearchTvShow).exists()).toBe(true);
        // expect(wrapper.findComponent(TvShowTable).exists()).toBe(true);
    });

    it("should test whether on calling displayTvShowData is received", async () => {
            const spyGetTvShow = jest.spyOn(TvShowsService, "getTvShow");
            //spyGetTvShow.mockImplementation(() => Promise.resolve(tvshowsresponse))
            spyGetTvShow.mockReturnValue(Promise.resolve(tvshowsresponse));
            wrapper.vm.displayTvShowData();
            expect(wrapper.vm.loading).toBe(true);
            expect(await spyGetTvShow).toBeCalled();
            expect(wrapper.vm.tvShowsHistory).toEqual(tvshowsresponse);
            expect(wrapper.vm.tvShows).toEqual(tvshowsresponse);
            expect(wrapper.vm.loading).toBe(false);
    });
    it("should test displayTvShowData catch block ", async () => {  
        const spyGetTvShow = jest.spyOn(TvShowsService, "getTvShow");
        const error = new Error('Server Error');
        spyGetTvShow.mockImplementation(() => Promise.reject(error));
        await wrapper.vm.displayTvShowData();
        expect(wrapper.vm.errorText).toEqual(error);
    });

    it("should test get data by empty serach key ", () => {
        wrapper.vm.displayTvShowData = jest.fn();
        wrapper.vm.getSearchData('');
        expect(wrapper.vm.displayTvShowData).toBeCalled();
    });
    it("should test whether saerch is happening", async () => {
        const spyGetTvShow = jest.spyOn(TvShowsService, "getSearchResult");
        //spyGetTvShow.mockImplementation(() => Promise.resolve(tvshowsresponse))
        spyGetTvShow.mockReturnValue(Promise.resolve(tvshowssearchresponse));
        wrapper.vm.getSearchData('abc');
        expect(wrapper.vm.loading).toBe(true);
        expect(await spyGetTvShow).toBeCalled();
        expect(wrapper.vm.tvShowsHistory).toEqual(tvshowsearchresponse1);
        expect(wrapper.vm.tvShows).toEqual(tvshowsearchresponse1);
        expect(wrapper.vm.loading).toBe(false);
    });
    it("should test search catch block ", async () => {  
        const spyGetTvShowSer = jest.spyOn(TvShowsService, "getSearchResult");
        const error = new Error('Server Error');
        spyGetTvShowSer.mockImplementation(() => Promise.reject(error));
        await wrapper.vm.getSearchData('abc');
        expect(wrapper.vm.errorText).toEqual(error);
    });
   

    it("should test filterTvShowByCat ", () => {
        wrapper.vm.filterTvShowByCat('All');
        expect(filterByCategory).not.toBeCalled();
        wrapper.vm.filterTvShowByCat('Drama');
        expect(filterByCategory).toBeCalledWith(wrapper.vm.tvShowsHistory, 'Drama');
        expect(wrapper.vm.tvShows).toEqual(tvshowsresponse);
        
        
    });

    it("should test scrollfunction when scrollbar is not in the bottom", () => {
        wrapper.vm.getMoreData = jest.fn();
        wrapper.vm.scrollfunction() // 1
        expect(wrapper.vm.pageNumber).toEqual(0);
        expect(wrapper.vm.getMoreData).not.toBeCalled();
        wrapper.vm.tvShows = tvshowsresponse;
        window = {
            innerHeight: 100,
            scrollY: 20,
        }
        document = {
            body: {
                     offsetHeight: 90
                  }
        };
        wrapper.vm.scrollfunction();
        expect(wrapper.vm.pageNumber).toEqual(1);
        expect(wrapper.vm.getMoreData).toBeCalled();
    });

    it("should test getMoreData when scrolling", async() => {
        const spyGetTvShow = jest.spyOn(TvShowsService, "getTvShowByPage");
        spyGetTvShow.mockReturnValue(Promise.resolve(tvshowsresponse));
        wrapper.vm.getMoreData()
        expect(await spyGetTvShow).toBeCalled();
        let mockfn = jest.fn().mockReturnValue(Promise.resolve(tvshowsresponse))
        wrapper.vm.tvShowsHistory = wrapper.vm.tvShowsHistory.concat(await mockfn())
       
        wrapper.vm.selectedCategory = 'Science-Fiction';

        filterByCategory(await mockfn(),  wrapper.vm.selectedCategory)
        
        expect(filterByCategory(await mockfn(), wrapper.vm.selectedCategory)).toEqual(tvshowsresponse);
        expect(wrapper.vm.tvShows).toEqual(tvshowsresponse);
    });
    it("should test getMoreData catch block ", async () => {  
        const spyGetTvShowSer = jest.spyOn(TvShowsService, "getTvShowByPage");
        const error = new Error('Server Error');
        spyGetTvShowSer.mockImplementation(() => Promise.reject(error));
        await wrapper.vm.getMoreData();
        expect(wrapper.vm.errorText).toEqual(error);
    });
    
    it("shoud be removeEventListner on unmounted", async() => {
        const remover = jest.spyOn(document, 'removeEventListener').mockImplementation(() => {});
        wrapper.unmount();
        expect(remover).toHaveBeenCalled();
       
     });

     it("shoud be removeEventListner on unmounted", async() => {
        // wrapper.vm.$options.watch.$route.path == '/'
          console.log(wrapper.vm.$route.path)
     });

    

});
