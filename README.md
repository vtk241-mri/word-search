# Word Search

Word Search is an educational single-page game built with React, Redux Toolkit, React Router and Vite. The project was started in **2025** and now includes legal documentation, GDPR-oriented cookie consent, generated technical documentation and Storybook coverage for UI components.

## Author

- Rostyslav

## Stack

- React 19
- Redux Toolkit
- React Router
- React Hook Form + Yup
- Vite
- Storybook

## Basic Commands

```bash
npm install
npm run dev
npm run build
npm run lint
npm run docs:generate
npm run licenses:report
npm run storybook
npm run storybook:build
```

## Configuration Notes

- App state is stored in `localStorage`.
- Game settings are managed in Redux slices under `src/store`.
- Cookie consent is stored under `wordsearch:cookie-consent`.
- The project currently does not use external analytics or marketing trackers; those categories are exposed only as explicit GDPR consent options.

## Project Documents

- [LICENSE](./LICENSE)
- [PRIVACY_POLICY.md](./PRIVACY_POLICY.md)
- [USER_GUIDE.md](./USER_GUIDE.md)
- [THIRD_PARTY_LICENSES.md](./THIRD_PARTY_LICENSES.md)
- [docs/PROJECT_DOCUMENTATION.generated.md](./docs/PROJECT_DOCUMENTATION.generated.md)

## License

The project source code is distributed under the MIT License. Third-party dependency licenses are listed in [THIRD_PARTY_LICENSES.md](./THIRD_PARTY_LICENSES.md).

## Storybook

Storybook documents two components:

- `LetterCell` as the base UI element
- `GamePage` as the complex composed screen

Each component has configurable props and multiple stories for visual verification.

## Documentation

Generated documentation is produced by a local script and written to `docs/PROJECT_DOCUMENTATION.generated.md`.

## GDPR / Privacy

The application includes a cookie consent popup with category-based preferences:

- Necessary
- Analytics
- Marketing

Detailed data processing rules and usage limitations are described in [PRIVACY_POLICY.md](./PRIVACY_POLICY.md) and [USER_GUIDE.md](./USER_GUIDE.md).
