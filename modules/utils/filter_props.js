const filterProps = (props = {}, options = {}) => {
  const res = {};
  const excludeHash = {};
  const includeHash = {};

  let exclude;
  let include = [];

  if (options && options.constructor === Array) {
    exclude = options;
  } else if (typeof options === 'object') {
    include = options.include || [];
    exclude = options.exclude || [];
  } else if (typeof options === 'string') {
    exclude = options;
  }

  if (typeof include === 'string') {
    include = include.split(',');
  }

  if (typeof exclude === 'string') {
    exclude = exclude.split(',');
  }

  if (exclude) {
    exclude.forEach(function (value) {
      excludeHash[value] = true;
    });
  }

  const hasInclude = include && include.length > 0;

  if (hasInclude) {
    include.forEach(function (value) {
      includeHash[value] = true;
    });
  }

  Object.keys(props).forEach(function (key) {
    if ((hasInclude && includeHash[key]) || (!hasInclude && !excludeHash[key])) {
      res[key] = props[key];
    }
  });

  return res;
};

export default filterProps;
