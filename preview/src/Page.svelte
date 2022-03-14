
<script>
 import Text from './PageComponents/Text.svelte';
 import Annotation from './PageComponents/Annotation.svelte'
import References from './PageComponents/References.svelte';
import Media from './PageComponents/Media.svelte';
 export let page;
</script>
<section>
 <div class="row">
  <div class="column">
   <Text text={page.text} />
  </div>
</div>

{#if page.media!==undefined}
<div class="row">
   <Media media={page.media} />
</div>
{/if}

{#if page.annotation!==undefined}
<div class="row">
   <Annotation annotation={page.annotation} />
</div>
{/if}

{#if page.references!==undefined}
<div class="row">
   <References references={page.references} />
</div>
{/if}

</section>
