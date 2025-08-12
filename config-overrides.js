module.exports = function override(config, env) {
  // Filter out existing source-map-loader rules to avoid conflicts
  config.module.rules = config.module.rules.filter(rule => {
    if (rule.use && Array.isArray(rule.use)) {
      return !rule.use.some(loader => 
        typeof loader === 'string' && loader.includes('source-map-loader')
      );
    }
    if (rule.use && typeof rule.use === 'string') {
      return !rule.use.includes('source-map-loader');
    }
    return true;
  });

  // Add a new source-map-loader rule that explicitly excludes react-datepicker
  config.module.rules.unshift({
    test: /\.(js|mjs|jsx|ts|tsx)$/,
    enforce: 'pre',
    use: ['source-map-loader'],
    exclude: [
      /node_modules[\\/]react-datepicker[\\/]/,
      /node_modules[\\/]@.*[\\/]react-datepicker[\\/]/
    ],
  });
  
  return config;
};