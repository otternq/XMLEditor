// Filename: views/useragreement
define([
  'jquery',
  'backbone'
], function($, Backbone){
	
	var Graph = Backbone.Model.extend({
		init: function () {

			this.w = 960;
            this.h = 500;
            this.root = {id: 0, content: 'root content'};
            this.data = [this.root];
            this.tree = d3.layout.tree().size([this.w - 20, this.h - 20]);
            this.diagonal = d3.svg.diagonal();
            this.duration = 750;

            this.vis = d3.select("#graph").append("svg")
                .attr("width", this.w)
                .attr("height", this.h)
                .append("g")
                .attr("transform", "translate(10, 10)");

            this.vis.selectAll("circle")
                .data(this.tree(this.root))
              .enter().append("circle")
                .attr("class", "node")
                .attr("r", 3.5)
                .attr("cx", this.x)
                .attr("cy", this.y)
                .on("click", 

                	function (env) {
			            update.call(this, env);
			        }

                );

		},

		run: function() {
			console.log("Graph: running e");


			
            //this.timer = setInterval(this.update(this), this.duration);

            

			console.log("Graph: running x");
		},
	
		randomNode: function () {
            if (this.data.length >= 5) return clearInterval(this.timer);
                
                var id = ~~(Math.random() * this.data.length);
                console.log("randomNode id="+id);
                this.addNode(id, "test");

                return true;


                
              // Add a new datum to a random parent.
              var d = {id: this.data.length, content: 'test'}, parent = this.data[~~(Math.random() * this.data.length)];
              if (parent.children) parent.children.push(d); else parent.children = [d];
              this.data.push(d);
        },

        addNode: function (parentId, tempContent) {
        	console.log("addNode: adding node to parent=" + parentId);
            var d = {id: this.data.length, content: tempContent}, parent = this.data[parentId];
            if (parent.children) parent.children.push(d); else parent.children = [d];
            this.data.push(d);

            //editor.getSession().setValue(JSON.stringify(simpleJSON(data), undefined, 2));
        },

        update: function () {
	        console.log("update e");
            this.randomNode(this);

            // Compute the new tree layout. We'll stash the old layout in the data.
            var nodes = this.tree.nodes(this.root);

            // Update the nodes…
            var node = this.vis.selectAll("circle.node")
              .data(nodes, function(d) { return d.id; });

            // Enter any new nodes at the parent's previous position.
            node.enter().append("circle")
              .attr("class", "node")
              .attr("r", 7)
              .attr("cx", function(d) { return d.parent.x0; })
              .attr("cy", function(d) { return d.parent.y0; })
              //.style("fill", function(d) { return d.children ? "lightsteelblue" : "#fff"; })
              .on("click", this.click(this))
              .on("mouseover", this.mouseover);

            // Transition nodes to their new position.
            node.transition()
              .duration(this.duration)
              .attr("cx", this.x)
              .attr("cy", this.y);

            // Update the links…
            var link = this.vis.selectAll("path.link")
              .data(this.tree.links(nodes), function(d) { return d.target.id; });

            diagonal = this.diagonal;

            // Enter any new links at the parent's previous position.
            link.enter().insert("path", "circle")
              .attr("class", "link")
              .attr("d", function(d) {
                var o = {x: d.source.x0, y: d.source.y0};
                return diagonal({source: o, target: o});
              });
              //.on("click", click);

            this.diagonal = diagonal;

            // Transition links to their new position.
            link.transition()
              .duration(this.duration)
              .attr("d", this.diagonal);

            //this.update();
        },

        x: function (d) {
          return d.x0 = d.x;
        },

        y: function (d) {
          return d.y0 = d.y;
        },

        mouseover: function (d) {
            //document.getElementById("data").innerHTML = d.id;
        },

        click: function (d) {
            console.log("Clicked = id:" + d.id + " content: " + d.content );
            this.addNode(d.id, "Temp Temp Temp");
            this.update();
        

            console.log(data);
        },

        simpleJSON: function (d3Data) {
            var data = this.getMinData(d3Data[0]);
            
            data.children = this.simpleJSONAux(d3Data[0].children);
            console.log(data);
            
            return data;
        },

        simpleJSONAux: function (d3Data) {
            var data = Array(); 
            for (var i = 0; i < d3Data.length; i++) {
                
                data[i] = this.getMinData(d3Data[i]);

                if (d3Data[i].children) {
                    data[i].children = this.simpleJSONAux(d3Data[i].children); 
                }
                
            }
            
            return data;
        },

        getMinData: function (data) {
            if (data) {
                return {
                    id: data.id,
                    content: data.content
                }
            } return undefined;
        }
	});

	return Graph;

});
