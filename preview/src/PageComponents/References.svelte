
<script>
 export let references;
</script>
<div class="content references">
 <div class="column">
  {#each references as reference}
  <li>
   {#if reference.type==='web'}
   <a href="{reference.url}">{reference.title}</a>
   {:else}
   <span class="has-text-danger">UNKNOWN TYPE REFERENCE</span>
   {/if}
  </li>
  {/each}
  </div>
</div>

<style scoped>
 .references{
  border: 2px solid #086788;
  padding:10px;
  border-radius: 10px;
 }
</style>
