<script lang="ts">
	import Course from './Course.svelte';

	type Toc={articles:string[],samples:string[]};

 const fetchCourses = async()=>{
		const toc : Toc= await (await fetch('generated/toc.json')).json();
		
		let courses = [];
		
		for (const docName of toc.articles){
			const articleJson = await (await fetch(`generated/${docName}`)).json();
			courses = courses.concat(articleJson);
		}

		let sampleCourses = [];
		
		for (const docName of toc.samples){
			const sampleJson = await (await fetch(`generated/${docName}`)).json();
			sampleCourses = sampleCourses.concat(sampleJson);
		}

		return {courses,sampleCourses};
};

</script>

<section class="section">
	<div class="container">
			<h1 class="title has-text-info">Contents Preview</h1>
	{#await fetchCourses()}
	<p>...waiting</p>
	{:then {courses,sampleCourses}}
	{#each courses as course}
	<div class="row">
		<Course courseWithMetadata = {course}/>
		<hr/>
	</div>
 {/each}

	{#each sampleCourses as sampleCourse}
	<div class="row">
		<Course courseWithMetadata = {sampleCourse}/>
		<hr/>
	</div>
 {/each}

	{:catch error}
	 <p>An error occurred! {error}</p>
	{/await}
	</div>
</section>
