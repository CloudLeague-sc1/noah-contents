<script>
 import MultilingualRichText from "../MultilingualRichText.svelte";
 export let annotation;

 let annotationStyle= annotation.type=='warn'?'has-background-warning has-text-black-bis':' has-background-light';
</script>

<div class="column  {annotationStyle}">
    <MultilingualRichText text={annotation.text}/>
</div>
