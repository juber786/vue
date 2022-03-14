import TvShowsService from '@/services/TvShowsService'
// import tvshowsresponse from '../../tests/stubs/tvshowsresponse.json'



global.fetch = jest.fn(() => Promise.resolve());

describe('TvShowsService', () => {
    it("should test getTvShow", async () => {
             TvShowsService.getTvShow()
            //  const mockFn = await jest.fn().mockReturnValue(Promise.resolve(tvshowsresponse));
            //  expect(await mockFn()).toEqual(tvshowsresponse);
    });
    it("should test getTvShowDetails", async () => {
      TvShowsService.getTvShowDetails(1)
    });
    it("should test getTvShowByPage", async () => {
        TvShowsService.getTvShowByPage(1)
    });
    it("should test getSearchResult", async () => {
        TvShowsService.getSearchResult('girls')
    });
});