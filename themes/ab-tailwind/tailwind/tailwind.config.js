// Set flag to include Preflight conditionally based on the build target.
const includePreflight = ( 'editor' === process.env._TW_TARGET ) ? false : true;

module.exports = {
	presets: [
		// Manage Tailwind Typography's configuration in a separate file.
		require( './tailwind-typography.config.js' ),
	],
	content: [
		// Ensure changes to PHP files and `theme.json` trigger a rebuild.
		'./theme/**/*.php',
		'./theme/theme.json',
	],
	theme: {
		// Extend the default Tailwind theme.
		fontFamily: {
			'main': [ 'Roboto', 'sans-serif'],
			'secondary': [ 'Quicksand', 'sans-serif' ],
			'sans': [ 'Roboto', 'sans-serif'],
		},
		extend: {
			'maxWidth': {
				'90': '90%',
			}
		},
	},
	corePlugins: {
		// Disable Preflight base styles in CSS targeting the editor.
		preflight: includePreflight,
	},
	plugins: [
		// Add Tailwind Typography.
		require( '@tailwindcss/typography' ),

		// Extract colors and widths from `theme.json`.
		require( '@_tw/themejson' )( require( '../theme/theme.json' ) ),

		// Uncomment below to add additional first-party Tailwind plugins.
		// require( '@tailwindcss/aspect-ratio' ),
		// require( '@tailwindcss/forms' ),
		// require( '@tailwindcss/line-clamp' ),
		function({ addBase, theme }) {
			addBase({
				'html': { fontFamily: theme('fontFamily.main') },
			  'h1': { fontSize: theme('fontSize.2xl') },
			  'h2': { fontSize: theme('fontSize.xl') },
			  'h3': { fontSize: theme('fontSize.lg') },
			  'section': { marginBottom: theme('spacing.12') },
			  'p': { fontFamily: theme('fontFamily.main'), marginBottom: theme('spacing.4'), marginTop: theme('spacing.4') },
			  'hr': { borderColor: theme('colors.red'), margin: '40px 20px', borderTop: '1px solid' },
			  'blockquote': { color: theme('colors.gray'), textAlign: 'center', fontStyle: 'italic', fontSize: theme('fontSize.xl'), margin: '20px', fontWeight: '500' },
			'ul': { listStyleType: 'none', paddingLeft: '0' },
			'li': { fontFamily: theme('fontFamily.main'), marginBottom: theme('spacing.4'), marginTop: theme('spacing.4') },
			})
		  }
	],
};
