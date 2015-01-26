/* Add Modulation When Key is Pressed Hard
Script by: Daniel Turner
License: MIT */

var velocityValue = 0; // set velocityValue to default value

function HandleMIDI(event)
{
	if (event instanceof NoteOn) {
		if (event.velocity >= 80) // capture note velocity
		{
			velocityValue = event.velocity - 40; // add modulation if high velocity
		}
		else
		{
			velocityValue = 0; // no modulation if low to mid velocity
		}
	}

	var addedMod = new ControlChange; // create modulation change
	addedMod.number = 1; // control change number
	addedMod.value = velocityValue; // set to calculated value
	addedMod.send(); // send added modulation with note

	event.send(); // send note to Logic
}
