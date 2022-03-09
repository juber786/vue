import {filterByCategory} from '@/utils/filterUtil.js';
import tvshowsresponse from '../../tests/stubs/tvshowsresponse.json';

describe('filterUtil.js', () => {
   it("should filter data", () => {
      expect(filterByCategory(tvshowsresponse, 'Drama')).toEqual([tvshowsresponse[0]]);
      expect(filterByCategory(tvshowsresponse, 'Science-Fiction')).toEqual(tvshowsresponse.reverse());
   });
});
