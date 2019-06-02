import routes from '../index';

const testRoutes = (routes) => {
  test('routes is not null or undefined', () => {
    expect(routes).toEqual(expect.anything());
  });
  describe.each(routes)(
    'route index %#',
    testEachRoute
  );
};

const testEachRoute = record => {
  if (record.routes) {
    testRoutes(record.routes);
  }
  test('route have path?', () => {
    expect(record).toHaveProperty('path');
  });
};

testRoutes(routes);
