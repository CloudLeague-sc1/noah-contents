<script lang="ts">
	import Cource from './Cource.svelte';

	type Toc={articles:string[],samples:string[]};

 const fetchCources = async()=>{
		const toc : Toc= await (await fetch('/generated/toc.json')).json();
		
		let cources = [];
		
		for (const docName of toc.articles){
			const articleJson = await (await fetch(`/generated/${docName}`)).json();
			cources = cources.concat(articleJson);
		}

		let sampleCources = [];
		
		for (const docName of toc.samples){
			const sampleJson = await (await fetch(`/generated/${docName}`)).json();
			sampleCources = sampleCources.concat(sampleJson);
		}

		return {cources,sampleCources};
};

</script>

<section class="section">
	<div class="container">
			<h1 class="title has-text-info">Contents Preview</h1>
	{#await fetchCources()}
	<p>...waiting</p>
	{:then {cources,sampleCources}}
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

	{:catch error}
	 <p>An error occurred!</p>
	{/await}
	</div>
</section>
