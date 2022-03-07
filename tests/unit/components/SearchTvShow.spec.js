import { shallowMount } from '@vue/test-utils'
import SearchTvShow from '@/components/SearchTvShow.vue'

describe('SearchTvShow.vue', () => {
  
    let wrapper = shallowMount(SearchTvShow);
    it("component exists", () => {
          expect(wrapper.exists()).toBe(true);
    });

})