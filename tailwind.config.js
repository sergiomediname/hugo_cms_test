const argv          = require('yargs').argv;
const path_theme = `./themes/${argv.template}`;

module.exports = {
    content: [
        // './themes/**/*.xml',
        // './src/Core/js/*.js'
        // `${path_theme}/layouts/**/*.html`
        './themes/etch/layouts/**/*.html'
    ],
    darkMode: 'media',
    theme: {
        extend: {
            colors: {
                'main': 'var(--main-color)',
                'second': 'var(--second-color)',
                'body': 'var(--body-color)',
            }
        },
        container: {
            center: true,
            padding: '15px',
            screens: {
                'xl': '1230px'
            }
        },
        screens: {
            'sm': '640px',
            // => @media (min-width: 640px) { ... }
      
            'md': '768px',
            // => @media (min-width: 768px) { ... }
      
            'lg': '992px',
            // => @media (min-width: 1024px) { ... }
      
            'xl': '1230px',
            // => @media (min-width: 1280px) { ... }
        }
    },
    variants: {
        extend: {},
    },
    plugins: [],
}