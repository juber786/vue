import { shallowMount } from '@vue/test-utils'
import TvShowDetails from '@/components/TvShowDetails.vue'

describe('TvShowDetails.vue', () => {

    let wrapper = shallowMount(TvShowDetails);
    it("component exists", () => {
          expect(wrapper.exists()).toBe(true);
    });

})
