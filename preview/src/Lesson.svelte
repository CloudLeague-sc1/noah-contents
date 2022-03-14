<script>
import Summary from "./Summary.svelte";

import MultilingualText from "./MultilingualText.svelte";

 import RichText from "./RichText.svelte";
 import Page from './Page.svelte';
 import Quiz from './Quiz.svelte';
 export let lesson;
 
</script>

<section class="column content">
 <h4><MultilingualText text={lesson.title}/></h4>

 <section class="columns pagesbox">
 {#each lesson.pages as page}
 <section class="column is-4 pagebox">
  {#if page.type=="page"}
 <Page page={page}/>
  {/if}
  {#if page.type=="quiz"}
   <Quiz quiz={page}/>
   {/if}
  </section>
  {/each}
  <section class="column is-4 pagebox">
  <Summary summary={lesson.summary}/>
</section>
</section>
</section>


<style scoped>

  .pagesbox{
    overflow-x: scroll;
  }
.pagebox {
  padding: 1rem;
  margin: 1rem;
  border: 1px solid #ccc;
  border-radius: 5px;
}
</style>
