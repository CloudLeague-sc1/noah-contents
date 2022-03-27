
<script>
 import Lesson from './Lesson.svelte';
import MultilingualText from './MultilingualText.svelte';
 export let courceWithMetadata;
 let {cource,meta:{source}}=courceWithMetadata;
</script>
<section class="column content mb-6">
 <h3><MultilingualText text={cource.title}/></h3>
 <h6>Source: <code>{source}</code></h6>
 <div class="row">
  {#each cource.lessons as lesson}
   <Lesson lesson={lesson}/>
  {/each}
</div>
</section>
