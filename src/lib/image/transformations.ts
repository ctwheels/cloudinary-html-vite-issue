import { CloudinaryImage } from '@cloudinary/url-gen';
import type { Transformation } from '@cloudinary/url-gen';
import { Actions, Qualifiers } from '$packages/cloudinary';

/**
 * Applies general transformations and optimizations to a Cloudinary image.
 * @returns CloudinaryImage with transformations applied.
 */
const general = (): Transformation =>
	new CloudinaryImage()
		.delivery(Actions.Delivery.format(Qualifiers.Format.auto()))
		.setDeliveryType('fetch')
		.quality(Qualifiers.Quality.autoGood()).transformation;

export { general };
