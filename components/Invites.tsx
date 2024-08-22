"use client";
export function Invites() {
	return (
		<p onClick={() => alert("I figured it didn't make sense to implement invites for this demonstration. - Damian")} className="opacity-50 font-primary font-bold uppercase text-xs py-4">You have <span className="text-primary">0 invites</span> remaining.</p>
	);
}