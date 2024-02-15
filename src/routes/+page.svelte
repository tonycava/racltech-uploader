<script lang="ts">
	import type { PageServerData, SubmitFunction, ActionData } from './$types';
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
	export let form: ActionData;
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
    class="absolute inset-1 rounded-lg bg-[#28292d] z-10 gap-2 flex justify-center items-center flex-col"
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
