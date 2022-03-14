<script>
import MultilingualRichText from "./MultilingualRichText.svelte";

 export let summary;
</script>

<section class="column has-background-light p-3">
 <div class="content">
 <h3 class="has-text-success"> Summary </h3>
 <ul class="p-3">
  {#each summary as item}
  <li> <MultilingualRichText text={item}/></li>
  {/each}
 </ul>
</div>
</section>


