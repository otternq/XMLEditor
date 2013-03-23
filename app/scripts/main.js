require.config({
  shim: {
  },

  paths: {
    jquery: 'vendor/jquery.min',
    underscore: 'vendor/underscore-min',
    backbone: 'vendor/backbone-min',
    mustache: 'vendor/mustache',

    graph: 'general/graph'
  }
});
 
require(['app'], function(App) {
  // use app here
  App.initialize();
});