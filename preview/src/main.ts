import App from './App.svelte';

import samplecourcedeck  from '../../generated/sample/courcedeck.json'
import courcedeck  from '../../generated/articles/courcedeck.json'

const app = new App({
	target: document.body,
	props: {
		cources: courcedeck.cources,
		sampleCources:samplecourcedeck.cources
	}
});

export default app;
