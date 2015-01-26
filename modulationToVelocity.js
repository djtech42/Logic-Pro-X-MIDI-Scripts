/* Use Modwheel to Set Velocity of Notes
Script by: Daniel Turner
License: MIT */

var modValue = 127; // set modValue to default value

function HandleMIDI(event)
{
	if (event instanceof ControlChange && event.number == 1) {
		modValue = event.value; // capture modulation changes
	}
	
	event.velocity = modValue; // set note velocity to modulation value
	
	event.send(); // send result to Logic
}
