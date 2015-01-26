/* Add Modulation When Key is Pressed Hard
Script by: Daniel Turner
License: MIT */

var velocityValue = 0; // set velocityValue to default value

function HandleMIDI(event)
{
	if (event instanceof NoteOn) {
		// capture note velocity
		if (event.velocity >= 80)
		{
			// add modulation if high velocity
			velocityValue = event.velocity - 40;
		}
		else
		{
			// no modulation if low to mid velocity
			velocityValue = 0;
		}
	}

	// create modulation change
	var addedMod = new ControlChange;
	// control change number
	addedMod.number = 1;
	// set to calculated value
	addedMod.value = velocityValue;
	// send added modulation with note
	addedMod.send()

	event.send(); // send note to Logic
}
