define([
	'backbone',
	'communicator',
	'models/survey-model',
	'models/step-model',
	'models/choices-model',
	'models/metrics/gas-model',
	'models/metrics/emissions-model',
	'models/metrics/money-model'
],

function( Backbone, Communicator, surveyModel, stepModel, choicesModel, gasModel, emissionsModel, moneyModel ) {
    'use strict';

	var survey = new surveyModel({ name: 'bike', category: 'transit', completed: true }),
		vehicleType       = new stepModel({ step: 'vehicle type' }),
		fuelType          = new stepModel({ step: 'fuel type' }),
    roadType          = new stepModel({ step: 'road type' }),
    distanceTraveled  = new stepModel({ step: 'distance traveled' }),
		specificDistance  = new stepModel({ step: 'specific distance' }),
		specificVehicle   = new stepModel({ step: 'specific vehicle' }),
		userLocation      = new stepModel({ step: 'location' }),
    tripFrequency     = new stepModel({ step: 'specific frequency' }),
    foo               = new stepModel({ step: 'foo' }),
		gas               = new gasModel,
		emissions         = new emissionsModel,
		money             = new moneyModel

	survey.set('metrics', [ gas, emissions, money ]);

	survey.set('steps', [ vehicleType, fuelType, specificVehicle ]);


	/////////////////////////////
	// 	STEP 1
	/////////////////////////////

  /* Vehicle Type
   * ============ */	
	vehicleType.set('choices', [
		new choicesModel({
			name: 'sedan',
			iconClass: 'sedan',
			icon: 'sedan.svg',
			nextStep: fuelType,
			onSelect: function(){
				gas.activate().addTo(20);
        money.activate().addTo(10);
        emissions.activate().addTo(5);
			}
		}),
		new choicesModel({
			name: 'suv',
			iconClass: 'sedan',
			icon: 'sedan.svg',
			nextStep: fuelType,
      onSelect: function() {
        gas.activate().addTo(60);
        money.activate().addTo(12);
        emissions.activate().addTo(15);
      }
		}),
		new choicesModel({
			name: 'truck',
			iconClass: 'sedan',
			icon: 'sedan.svg',
			nextStep: fuelType,
      onSelect: function() {
        gas.activate().addTo(40);
        money.activate().addTo(40);
        emissions.activate().addTo(10);
      }
		}),
		new choicesModel({
			name: 'specific',
			iconClass: 'sedan',
			icon: 'sedan.svg',
			nextStep: specificVehicle
		}),
	]);

  /* Fuel Type
   * ========= */
	fuelType.set('choices', [
		new choicesModel({
			name: 'gas',
			iconClass: 'sedan',
			icon: 'sedan.svg',
      nextStep: userLocation,
      onSelect: function() {
        gas.activate().addTo(20);
        money.activate().addTo(20);
        emissions.activate().addTo(7);
      }
		}),
		new choicesModel({
			name: 'electric',
			iconClass: 'sedan',
			icon: 'sedan.svg',
      nextStep: userLocation,
      onSelect: function() {
        gas.activate().addTo(5);
        money.activate().addTo(5);
        emissions.activate().addTo(0);
      }
		}),
		new choicesModel({
			name: 'deisel',
			iconClass: 'sedan',
			icon: 'sedan.svg',
      nextStep: userLocation,
      onSelect: function() {
        gas.activate().addTo(40);
        money.activate().addTo(40);
        emissions.activate().addTo(30);
      }
		}),
		new choicesModel({
			name: 'hybrid',
			iconClass: 'sedan',
			icon: 'sedan.svg',
      nextStep: specificDistance,
		}),
	]);

  /* Location
   * ======== */
  userLocation.set('choices', [
    new choicesModel({
      name: 'Get Location',
      iconClass: 'sedan',
      icon: 'sedan.svg',
      nextStep: distanceTraveled,
      onSelect: function() {
      }
    }),
    new choicesModel({
      name: 'Enter Zipcode',
      iconClass: 'sedan',
      icon: 'sedan.svg',
      nextStep: distanceTraveled,
      onSelect: function() {
      }
    }),
  ]);

  /* Distance Traveled
   * ================= */
  distanceTraveled.set('choices', [
    new choicesModel({
      name: '0-5',
      iconClass: 'sedan',
      icon: 'sedan.svg',
      nextStep: roadType,
      onSelect: function() {
        gas.activate().addTo(10);
        money.activate().addTo(5);
        emissions.activate().addTo(5);
      }
    }),
    new choicesModel({
      name: '5-10',
      iconClass: 'sedan',
      icon: 'sedan.svg',
      nextStep: roadType,
      onSelect: function() {
        gas.activate().addTo(13);
        money.activate().addTo(10);
        emissions.activate().addTo(10);
      }
    }),
    new choicesModel({
      name: '10-20',
      iconClass: 'sedan',
      icon: 'sedan.svg',
      nextStep: roadType,
      onSelect: function() {
        gas.activate().addTo(15);
        money.activate().addTo(15);
        emissions.activate().addTo(15);
      }
    }),
    new choicesModel({
      name: 'Specific',
      iconClass: 'sedan',
      icon: 'sedan.svg',
      nextStep: roadType,
    })
  ]);

  /* Road Type
   * ========= */
  roadType.set('choices', [
    new choicesModel({
      name: 'Mostly Highway',
      iconClass: 'sedan',
      icon: 'sedan.svg',
      nextStep: tripFrequency,
      onSelect: function() {
          gas.activate().addTo(40);
          money.activate().addTo(40);
          emissions.activate().addTo(40);
      }
    }),
    new choicesModel({
      name: 'Equal Highway / City',
      iconClass: 'sedan',
      icon: 'sedan.svg',
      nextStep: tripFrequency,
      onSelect: function() {
          gas.activate().addTo(40);
          money.activate().addTo(40);
          emissions.activate().addTo(40);
      }
    }),
    new choicesModel({
      name: 'Mostly City',
      iconClass: 'sedan',
      icon: 'sedan.svg',
      nextStep: tripFrequency,
      onSelect: function() {
          gas.activate().addTo(40);
          money.activate().addTo(40);
          emissions.activate().addTo(40);
      }
    }),
    new choicesModel({
      name: 'Specific',
      iconClass: 'sedan',
      icon: 'sedan.svg',
      nextStep: tripFrequency
    }),
  ]);


  /* Trip Frequency (how often ride bike)
   * ==================================== */
  roadType.set('choices', [
    new choicesModel({
      name: '1 day a week',
      iconClass: 'sedan',
      icon: 'sedan.svg',
      nextStep: foo,
      onSelect: function() {
          gas.activate().addTo(40);
          money.activate().addTo(40);
          emissions.activate().addTo(40);
      }
    }),
    new choicesModel({
      name: '3 day a week',
      iconClass: 'sedan',
      icon: 'sedan.svg',
      nextStep: foo,
      onSelect: function() {
          gas.activate().addTo(40);
          money.activate().addTo(40);
          emissions.activate().addTo(40);
      }
    }),
    new choicesModel({
      name: '5 day a week',
      iconClass: 'sedan',
      icon: 'sedan.svg',
      nextStep: foo,
      onSelect: function() {
          gas.activate().addTo(40);
          money.activate().addTo(40);
          emissions.activate().addTo(40);
      }
    }),
    new choicesModel({
      name: 'Specific',
      iconClass: 'sedan',
      icon: 'sedan.svg',
      nextStep: foo
    }),
  ]);



	// specificVehicle.set('choices', [
	// 	new choicesModel({
	// 		name: 'vehicle',
	// 		customView: '',
	// 		nextStep: ''
	// 	})
	// ]);

	
	console.log(fuelType)
	return survey;
});
