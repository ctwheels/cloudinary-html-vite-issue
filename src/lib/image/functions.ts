import { Cloudinary, CloudinaryImage } from '@cloudinary/url-gen';

const config = {
	cloud: {
		cloudName: "yourCloudName",
	},
	url: {
		secure: true,
	}
}

const cld = new Cloudinary(config);

/**
 * Generates a CloudinaryImage object from an Cloudinary object id
 * @param id The cloudinary image id
 * @returns A CloudinaryImage object
 */
const createImage = (id: string): CloudinaryImage => cld.image(id);

export { createImage as image };