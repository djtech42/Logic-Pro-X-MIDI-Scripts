/* Automatic Velocity Builds
Script by: Daniel Turner
License: MIT */

var NeedsTimingInfo = true; // enables timing info object

// sliders and menu selection
var PluginParameters = [
{name:"Build Length", defaultValue:4, minValue:1, maxValue:16, numberOfSteps:15, unit:" measures", type:"lin"}, 
{name:"Build Range", defaultValue:127, minValue:1, maxValue:127, numberOfSteps:126, type:"lin"},
{name:"Peak Velocity", defaultValue:127, minValue:0, maxValue:127, numberOfSteps:127, type:"lin"},
{name:"Build Mode", type:'menu', valueStrings:["Linear", "Exponential"], defaultValue:0}];

function HandleMIDI(event)
{
	// load slider and menu parameters
	var measures = GetParameter("Build Length");
	var range = GetParameter("Build Range");
	var maxVelocity = GetParameter("Peak Velocity");
	var buildMode = GetParameter("Build Mode");

	// get current beat and set up number of beats for each build
	var logicInfo = GetTimingInfo();
	var beat = logicInfo.blockStartBeat + logicInfo.blockLength;
	var buildLength = logicInfo.meterNumerator * measures;
	var beatPositionInBuild = (beat-1) % buildLength;

	var newVelocity;
	// calculate velocity for linear setting
	newVelocity = beatPositionInBuild * (range / buildLength);
	// calculate velocity for exponential setting
	if (buildMode === 1) {
		newVelocity = Math.pow(newVelocity, 2)/range;
	}
	// compensate for range bottom and set peak velocity offset
	newVelocity += (maxVelocity - range);

	// minimum value for velocity is 0
	if (newVelocity > 0) {
		event.velocity = newVelocity;
	}
	else {
		event.velocity = 0;
	}

	// send note to Logic
	event.send();
}