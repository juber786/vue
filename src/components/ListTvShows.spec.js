import { shallowMount } from '@vue/test-utils'
import ListTvShows from '@/components/ListTvShows.vue'
import SearchTvShow from '@/components/SearchTvShow.vue'
import TvShowTable from '@/components/TvShowTable.vue'
import TvShowsService from '@/services/TvShowsService'

import tvshowsresponse from '../../stubs/tvshowsresponse.json'
global.fetch = jest.fn(() => Promise.resolve());

describe('ListTvShows.vue', () => {

    let wrapper = shallowMount(ListTvShows);
    it("component exists", () => {
          expect(wrapper.exists()).toBe(true);
    });
    it("Title should be TV Shows",() => {
        let wrapper = shallowMount(ListTvShows);
        expect(wrapper.html('h3')).toContain('TV Shows')
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

    it("should test whether on calling displayTvShowData is received", async () => {
      const spyGetTvShow = jest.spyOn(TvShowsService, "getTvShow");


      await spyGetTvShow.mockReturnValueOnce(tvshowsresponse)
      expect(wrapper.vm.loading).toBe(true);
      await wrapper.vm.displayTvShowData();
      expect(spyGetTvShow).toBeCalled();

      // expect(wrapper.vm.tvShowsHistory).toEqual(tvshowsresponse);
      // expect(wrapper.vm.tvShows).toEqual(tvshowsresponse);
      // expect(wrapper.vm.loading).toBe(false);
      //
    });




})
