<script lang="ts">
 export let cources;
	export let sampleCources;
	import Cource from './Cource.svelte';
</script>

<section class="section">
	<div class="container">
			<h1 class="title has-text-info">Contents Preview</h1>
	{#each cources as cource}
	<div class="row">
		<Cource courceWithMetadata = {cource}/>
		<hr/>
	</div>
 {/each}

	{#each sampleCources as sampleCource}
	<div class="row">
		<Cource courceWithMetadata = {sampleCource}/>
		<hr/>
	</div>
 {/each}
	</div>
</section>
