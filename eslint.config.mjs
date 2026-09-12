import eslint from '@eslint/js';
import tslint from 'typescript-eslint';

export default tslint.config(
    eslint.configs.recommended,
    ...tslint.configs.strictTypeChecked,
    ...tslint.configs.stylisticTypeChecked,
    {
        languageOptions: {
            parserOptions: {
                project: 'tsconfig.all.json',
                tsconfigRootDir: import.meta.dirname
            }
        }
    },
    {
        ignores: ['dist/', 'dist-test/', 'eslint.config.mjs']
    },
    {
        rules: {
            '@typescript-eslint/explicit-member-accessibility': ['error', {
                accessibility: 'explicit',
                overrides: {
                    constructors: 'no-public'
                }
            }],
            '@typescript-eslint/no-non-null-assertion': 'off'
        }
    },
    {
        files: ['test/**/*.ts'],
        extends: [tslint.configs.disableTypeChecked]
    }
);
