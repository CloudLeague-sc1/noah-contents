import App from './App.svelte';

import samplecourcedeck  from '../../generated/sample/courcedeck.json'

const app = new App({
	target: document.body,
	props: {
		cources:samplecourcedeck.cources
	}
});

export default app;
