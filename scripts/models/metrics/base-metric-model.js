define([
	'backbone',
	'communicator',
	'associations'
],
function( Backbone, Communicator ) {
    'use strict';

	Backbone.MetricModel = Backbone.AssociatedModel.extend({
		defaults: {
			name: '',
			value: 0,
			min: 0,
			max: 100,
			showSlider: true
		},
		initialize: function(){
			var self = this;
			
			Communicator.events.on('endSurvey', function( survey ){
				var parent = self.collection.parents[0];
				if ( parent.cid == survey.cid ) self.calculateResult( survey );
			});
		},
		calculateResult: function( survey ){
			console.log(this.set('endSurvey', true))
		},
		add: function( val ){
			var oldVal = parseFloat(this.get('value')),
				newVal;

			val = parseFloat(val);
			newVal = oldVal + val;

			if (newVal > 100) newVal = 100;
			this.set('value', newVal);
		},
		subtract: function( val ){
			var oldVal = parseFloat(this.get('value')),
				newVal;

			val = parseFloat(val);
			newVal = oldVal - val;

			if (newVal > 100) newVal = 100;
			else if (newVal > 0) newVal = 0;

			this.set('value', newVal);
		}
	});
});
