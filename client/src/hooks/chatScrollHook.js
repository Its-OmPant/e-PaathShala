import React from "react";

function useChatScroll(dep) {
	const ref = React.useRef();
	React.useEffect(() => {
		if (ref.current) {
			ref.current.scrollTop = ref.current.scrollHeight;
		}
	}, [dep]);
	return ref;
}

export { useChatScroll };
// for auto scrolling to bottom when new message send/received
