import { BucketsClientPage } from './app.po';

describe('buckets-client App', function() {
  let page: BucketsClientPage;

  beforeEach(() => {
    page = new BucketsClientPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
