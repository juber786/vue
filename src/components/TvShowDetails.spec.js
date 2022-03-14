import { shallowMount } from '@vue/test-utils'
import TvShowDetails from '@/components/TvShowDetails.vue';


describe('TvShowDetails.vue', async () => {
    let wrapper = shallowMount(TvShowDetails);
    it("component exists", async () => {
         expect(wrapper.exists()).toBe(true);
    });
})
