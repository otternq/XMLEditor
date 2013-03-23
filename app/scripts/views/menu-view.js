// Filename: views/useragreement
define([
  'jquery',
  'underscore',
  'backbone',
  // Using the Require.js text! plugin, we are loaded raw text
  // which will be used as our views primary template
  'mustache',
  'text!/templates/menu.html'
], function($, _, Backbone, Mustache, menuTemplate){
	
	var MenuView = Backbone.View.extend({
		el: $('#content'),
		render: function(type) {

			console.log("MenuView: rendering with type="+ type);

			if (type == "visual") {//is the type visual
				type = true;
			} else {//is the type editor
				type = false;
			}

			var data = {
				type: type
			}

			var extraRender = Mustache.to_html(menuTemplate, data);
			//console.log(extraRender);

			this.$el.append(extraRender);

		}

	});

	return MenuView;

});
