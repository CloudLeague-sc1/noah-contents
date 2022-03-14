<script lang="ts">
 export let cources;
	import Cource from './Cource.svelte';
</script>

<section class="section">
	<div class="container">
			<h1 class="title has-text-info">Contents Preview</h1>
	{#each cources as cource}
	<div class="row">
		<Cource courceWithMetadata = {cource}/>
	</div>

 {/each}
	</div>
</section>
