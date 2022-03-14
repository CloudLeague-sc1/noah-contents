
<script>
 import Lesson from './Lesson.svelte';
import MultilingualText from './MultilingualText.svelte';
 export let courceWithMetadata;
 let {cource,file}=courceWithMetadata;
</script>
<section class="content">
 <h3><MultilingualText text={cource.title}/></h3>
 <h6>Source: <code>{file}</code></h6>
 <div class="row">
  {#each cource.lessons as lesson}
   <Lesson lesson={lesson}/>
  {/each}
</div>
</section>
