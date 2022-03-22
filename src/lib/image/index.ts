import Image from './Image.svelte';
import { Actions, Qualifiers, Plugins } from '$packages/cloudinary';
import { image } from './functions';
import * as Presets from './transformations';

export type { CloudinaryImage } from '@cloudinary/url-gen';
export type { Plugins as TPlugins } from '@cloudinary/html';

export { Image as default, image, Actions, Qualifiers, Plugins, Presets };
