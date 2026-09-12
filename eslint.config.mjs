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
        rules: {
            '@typescript-eslint/no-unsafe-call': 'off',
            '@typescript-eslint/no-unsafe-member-access': 'off',
            '@typescript-eslint/no-unsafe-assignment': 'off',
            '@typescript-eslint/no-unsafe-argument': 'off',
            '@typescript-eslint/no-unsafe-return': 'off',
            '@typescript-eslint/no-floating-promises': 'off'
        }
    }
);
