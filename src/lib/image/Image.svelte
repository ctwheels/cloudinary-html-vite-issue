<script lang="ts">
	import { afterUpdate, onDestroy } from 'svelte';
	import { browser } from '$app/env';
	import type { CloudinaryImage } from '@cloudinary/url-gen/assets/CloudinaryImage';
	import { HtmlImageLayer, serverSideSrc, cancelCurrentlyRunningPlugins } from '@cloudinary/html';
	import type { Plugins } from '@cloudinary/html';
	import * as cloudinary from '$packages/cloudinary';

	export let image: CloudinaryImage;
	export let plugins: Plugins = [
		//cloudinary.Plugins.lazyload(),
		//cloudinary.Plugins.responsive(200),
		cloudinary.Plugins.placeholder(),
	];

	// Internal variables used by this component
	let imgElement: HTMLImageElement; // Reference to underlying <img> element
	let htmlLayerInstance: HtmlImageLayer; // Updates dom using given image & plugins

	// Bind imgElement to the underlying <img> element.
	const bindImage = (node) => (imgElement = node);

	/**
	 * On mount: Create a new HTMLLayer instance
	 * On props change: Cancel running plugins and update image instance
	 */
	afterUpdate(() => {
		if (!htmlLayerInstance) {
			if (imgElement) {
				htmlLayerInstance = new HtmlImageLayer(imgElement, image, plugins);
			}
		} else {
			cancelCurrentlyRunningPlugins(htmlLayerInstance.htmlPluginState);
			htmlLayerInstance.update(image, plugins);
		}
	});

	/**
	 * On unmount we cancel the currently running plugins
	 * This is the only lifecycle method that runs on the server,
	 * so we must check for existence of htmlLayerInstance
	 */
	onDestroy(() => {
		if (htmlLayerInstance) {
			cancelCurrentlyRunningPlugins(htmlLayerInstance.htmlPluginState);
		}
	});
</script>

{#if browser}
	<!-- svelte-ignore a11y-missing-attribute -->
	<img use:bindImage {...$$restProps} />
{:else}
	<!-- svelte-ignore a11y-missing-attribute -->
	<img src={serverSideSrc(plugins, image)} {...$$restProps} />
{/if}

<style lang="scss">
	img {
		object-fit: cover;
		width: 100%;
	}
</style>