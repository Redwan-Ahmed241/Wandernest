module.exports = function override(config, env) {
  // Add a new rule to exclude react-datepicker from source-map-loader
  // This rule is added to the beginning of the rules array to ensure it takes precedence.
  config.module.rules.unshift({
    test: /\.js$/,
    enforce: 'pre',
    use: ['source-map-loader'],
    exclude: /node_modules[\\/]react-datepicker/,
  });
  
  return config;
};