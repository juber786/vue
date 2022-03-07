import { shallowMount } from '@vue/test-utils'
import TvShowTable from '@/components/TvShowTable.vue'

describe('TvShowTable.vue', () => {
  
    let wrapper = shallowMount(TvShowTable);
    it("component exists", () => {
          expect(wrapper.exists()).toBe(true);
    });

})