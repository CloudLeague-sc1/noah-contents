<script>
 import MultilingualRichText from "../MultilingualRichText.svelte";
 import MultilingualText from "../MultilingualText.svelte";
 export let quiz;

 let comment = null;
 let commentContainerStyle = "";

 const onClickOption=(option)=>{
     console.log("clicked");
     comment = option.comment;

     if(option.correct ){
      commentContainerStyle = "has-text-success"
     }else{
      commentContainerStyle = "has-text-danger"
     }
 };
</script>
<div class="row m-6">
<div class="row">
  <p class="is-size-5"><span class="has-text-success">Q.</span> <MultilingualRichText text={quiz.question}/></p>
</div>
<div class="columns is-centered m-4">
 <div class="column is-half">
 {#each quiz.options as option}
 <button class="button is-primary is-light is-fullwidth" on:click={onClickOption(option)}><MultilingualText text={option.label}/></button>
 {/each}
 </div>
</div>
{#if comment!==null}
<div class="row comment has-background-light {commentContainerStyle}">
 <MultilingualRichText text={comment}/>
</div>
{/if}
</div>

<style scoped>
 .comment{
  padding: 10px;
}

</style>
