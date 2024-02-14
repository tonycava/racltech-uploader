<script lang="ts">
	import type { PageServerData, SubmitFunction } from './$types';
	import { applyAction, enhance } from '$app/forms';
	import { INPUT } from '$lib/utils';

	let isLoading = false;

	const handleSubmit: SubmitFunction = () => {
		isLoading = true;
		return async ({ result }) => {
			await applyAction(result);
			isLoading = false;
		};
	};

	export let data: PageServerData;
	export let form;

	$: console.log(data);
</script>

<div
  class="
  relative w-96 h-96 bg-secondary rounded-lg overflow-hidden mx-auto translate-y-1/4
  before:content-[''] before:absolute before:-top-1/2 before:-left-1/2 before:w-96 before:h-96 before:rounded-lg before:origin-bottom-right before:animate-spin-slow before:bg-gradient-to-r before:from-primary before:to-transparent
  after:content-[''] after:absolute after:-top-1/2 after:-left-1/2 after:w-96 after:h-96 after:rounded-lg after:origin-bottom-right after:animate-spin-slow after:bg-gradient-to-r after:from-primary after:to-transparent after:animation-delay-n-3s
"
>
  <form
    use:enhance={handleSubmit}
    method="POST"
    enctype="multipart/form-data"
    action="?/upload" class="form"
  >
    <div class="flex flex-col mb-6">
      <label
        class="block mb-2 text-sm font-medium text-primary"
        for="multiple_files"
      >
        Upload multiple lecture files
      </label>
      <input
        class="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400"
        id="multiple_files"
        name={INPUT.FILES}
        type="file"
        multiple
      >
    </div>

    <div class="w-3/4 text-center mb-2">
      <input
        class="flex justify-center px-16 bg-primary text-secondary rounded-lg w-full"
        type="submit"
        name="submit"
        value="Save Settings"
      >
    </div>
    {#if isLoading}
      <span class="text-primary text-sm">Fichiers en cours d'upload. Ne pas refresh !</span>
    {:else}
      <span class="text-primary text-sm">{form?.message ?? ""}</span>
    {/if}
  </form>
</div>


<style>
    .form {
        position: absolute;
        inset: 2px;
        border-radius: 8px;
        background-color: #28292d;
        z-index: 10;
        gap: 10px;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
    }

    .inputBox {
        position: relative;
        width: 300px;
        margin-top: 25px;
    }

    .inputBox input {
        position: relative;
        width: 100%;
        padding-inline: 5px;
        background: transparent;
        outline: none;
        font-size: 1.5em;
        letter-spacing: 0.05em;
        z-index: 10;
        color: #E3B13A;
        border: 2px solid #E3B13A;
    }
</style>
