import { shallowMount } from '@vue/test-utils'
import Dashboard from '@/components/Dashboard.vue'
import SearchTvShow from '@/components/SearchTvShow.vue'
import TvShowTable from '@/components/TvShowTable.vue'
import TvShowsService from '@/services/TvShowsService'
import tvshowsresponse from '../../tests/stubs/tvshowsresponse.json'



global.fetch = jest.fn(() => Promise.resolve());

describe('Dashboard.vue', () => {
    const wrapper = shallowMount(Dashboard);

    it("component exists", () => {
        expect(wrapper.exists()).toBe(true);
    });
    it("Title should be Popular TV Shows", () => {
        expect(wrapper.html('h3')).toContain('Popular TV Shows')
    });
    it("renders a loading", () => {
        const loading = wrapper.get(".overlay")
        expect(loading.exists()).toBe(true);
    });
    it("should not render loading", () => {
        let loading = wrapper.get(".overlay")
        expect(!loading.exists()).toBe(false);
    });

    it("should be exits SearchTvShow", () => {
        expect(wrapper.findComponent(SearchTvShow).exists()).toBe(true);
    });

    it("should be exits TvShowTable", () => {
        expect(wrapper.findComponent(TvShowTable).exists()).toBe(true);
    });

    it("should be exits SearchTvShow", () => {
        expect(wrapper.findComponent(TvShowTable).exists()).toBe(true);
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
        // const spyGetTvShow = jest.spyOn(TvShowsService, "getTvShow");
        // spyGetTvShow.mockReturnValue(tvshowsresponse);
        // wrapper.vm.displayTvShowData();
        // expect(spyGetTvShow).toBeCalled();
        // expect(wrapper.vm.tvShowsHistory).toEqual(tvshowsresponse);
        // expect(wrapper.vm.tvShows).toEqual(tvshowsresponse);
        // expect(wrapper.vm.loading).toBe(false);
    });
    /*it("getSearchData should be called", async () => {
        const mockMethod = jest.spyOn(Dashboard.methods, 'getSearchData')
        await mount(Dashboard).find('button').trigger('click')
        expect(mockMethod).toHaveBeenCalled()
    });


    it('test filter serach by category', () => {
        wrapper.filterTvShowByCat();
    });*/


})
