import type { Action, Actions, PageServerLoad } from './$types';
import { getLatestUploadedFiles, processFilesInBatches } from '$lib';

export const load: PageServerLoad = async () => {
	const files = await getLatestUploadedFiles() || [];

	return {
		files
	};
};

type UploadResponse = {
	status: number;
	message: string;
}

const upload: Action = async ({ request }): Promise<UploadResponse>  => {
	const form = await request.formData();
	const files = form.getAll('files') as File[];
	if (!files.length) return { status: 400, message: 'Aucun fichier à télécharger' };
	const errors = await processFilesInBatches(files);


	if (errors.length) {
		return {
			status: 500,
			message: `Erreur lors du téléchargement des fichiers: ${errors.join(', ')}`,
		};
	}

	return { status: 200, message: `Fichier téléchargé avec succès: ${files.map((file) => file.name).join(', ')}` };
};

export const actions: Actions = {
	default: upload,
};