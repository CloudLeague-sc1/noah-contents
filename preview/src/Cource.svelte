
<script>
 import Lesson from './Lesson.svelte';
import MultilingualText from './MultilingualText.svelte';
 export let courseWithMetadata;
 let {course,meta:{source}}=courseWithMetadata;
</script>
<section class="column content mb-6">
 <h3><MultilingualText text={course.title}/></h3>
 <h6>Source: <code>{source}</code></h6>
 <div class="row">
  {#each course.lessons as lesson}
   <Lesson lesson={lesson}/>
  {/each}
</div>
</section>
