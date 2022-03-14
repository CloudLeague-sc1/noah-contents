<script>
 export let text;
</script>

<span>
 {#each text as item}
  {#if typeof item=='string'}
   <span> {item}</span>
  {:else if item.kind!==undefined}
  {#if item.kind=='em'}
  <span class="has-text-success"><svelte:self text={item.inner}/></span>
  {:else if item.kind=='bold'}
  <span class="has-text-weight-bold"><svelte:self text={item.inner}/></span>
  {:else if item.kind=='italic'}
  <span class="is-italic"><svelte:self text={item.inner}/></span>
  {:else if item.kind=='u'}
  <span class="is-underlined"><svelte:self text={item.inner}/></span>
  {:else if item.kind=='s'}
  <s><svelte:self text={item.inner}/></s>
  {/if}
  {:else}
   <span class="has-text-danger">UNKNOWN CONTENT</span>
  {/if}

 {/each}

</span>
