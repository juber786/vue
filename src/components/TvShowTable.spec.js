import { shallowMount } from '@vue/test-utils'
import TvShowTable from '@/components/SearchTvShow.vue'

describe('TvShowTable.vue', () => {
    let wrapper = shallowMount(TvShowTable);
    it("component exists", () => {
          expect(wrapper.exists()).toBe(true);
    });
})
