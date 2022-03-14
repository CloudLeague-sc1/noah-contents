<script>
 export let media;
</script>

 {#if media.type=='youtube'}
 <div class="column">
 <iframe class="mr-auto ml-auto mt-5" width="80%" src="https://www.youtube.com/embed/{media.videoid}" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
 </div>

 {:else if media.type=='image'}
  <div class="column">
   <img src="{media.src}" class="mr-auto ml-auto" width="80%" alt="Inserted" /> 
  </div>

   {:else if media.type=='audio'}
   <div class="column">
   <audio controls>
    <source src="{media.src}">
  </audio>
  </div>

 {/if}

