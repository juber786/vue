import { shallowMount } from '@vue/test-utils'
import ListTvShows from '@/components/ListTvShows.vue'

describe('ListTvShows.vue', () => {
  
    let wrapper = shallowMount(ListTvShows);
    it("component exists", () => {
          expect(wrapper.exists()).toBe(true);
    });
    it("Title should be TV Shows",() => {
        let wrapper = shallowMount(ListTvShows);
        expect(wrapper.html('h3')).toContain('TV Shows')
    });

})