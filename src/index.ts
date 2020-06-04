import { PreprocessorGroup, Processed } from "svelte/types/compiler/preprocess";
import { preprocess } from "svelte/compiler";

interface Source {
	readonly content: string;
	readonly filename: string;
}

const preprocessChain = (
	preprocessors: ReadonlyArray<Readonly<PreprocessorGroup>>,
): PreprocessorGroup => {
	return {
		markup: async ({ content, filename }: Source): Promise<Processed> =>
			preprocessors.reduce<Promise<Processed>>(
				async (
					previousResult: Readonly<Promise<Processed>>,
					preprocessor: Readonly<PreprocessorGroup>,
				) => {
					const { code } = await previousResult;
					return preprocess(code || content, preprocessor, {
						filename,
					});
				},
				Promise.resolve({
					code: "",
				}),
			),
	};
};

module.exports = preprocessChain;
export default preprocessChain;
