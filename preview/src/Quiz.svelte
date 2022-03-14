
<script>
 import MultipleChoice from "./QuizComponents/MultipleChoice.svelte";
 export let quiz;
</script>
<section>
 <div class="row">
  {#if quiz.quiz_type=='multiple_choice'}
   <MultipleChoice quiz={quiz}/>
  {:else}
  <span class="has-text-danger">UNKNOWN QUIZ TYPE</span>
  {/if}
 </div>
</section>
