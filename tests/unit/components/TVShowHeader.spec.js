import { shallowMount } from '@vue/test-utils'
import TvShowHeader from '@/components/TvShowHeader.vue'

describe('TvShowHeader.vue', () => {
  
    let wrapper = shallowMount(TvShowHeader);
    it("component exists", () => {
          expect(wrapper.exists()).toBe(true);
    });

})