// Filename: views/useragreement
define([
  'jquery',
  'underscore',
  'backbone',
  // Using the Require.js text! plugin, we are loaded raw text
  // which will be used as our views primary template
  'mustache',
  'graph',
  'text!/templates/graph-bad.html'
], function($, _, Backbone, Mustache, Graph, graphTemplate){
	
	var MenuView = Backbone.View.extend({
		el: $('#content'),
		render: function() {

			var renderer = Mustache.to_html(graphTemplate);
			//console.log(extraRender);

			this.$el.append(renderer);

			

		}

	});

	return MenuView;

});
