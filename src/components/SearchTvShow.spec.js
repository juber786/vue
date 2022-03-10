import { shallowMount } from '@vue/test-utils'
import SearchTvShow from '@/components/SearchTvShow.vue'

describe('SearchTvShow.vue', () => {

    let wrapper = shallowMount(SearchTvShow);
    it("component exists", () => {
          expect(wrapper.exists()).toBe(true);
    });

    it("on button click should be test if getSearchKey is emitted", async () => {
        wrapper.vm.search = 'abc';
        wrapper.find('button#search').trigger("click");
        expect(wrapper.emitted('getSearchKey')).toBeTruthy();
        expect(wrapper.emitted('getSearchKey').length).toBe(1);
       expect(wrapper.emitted('getSearchKey')[0]).toEqual(['abc']);
    });

    it("on change should be call filterCategory method", async () => {
        wrapper.find('select').trigger("change");
        expect(wrapper.emitted('filterByCat')).toBeTruthy();
        expect(wrapper.emitted('filterByCat').length).toBe(1);
        expect(wrapper.emitted('filterByCat')[0]).toEqual(['All']);
    });



})
