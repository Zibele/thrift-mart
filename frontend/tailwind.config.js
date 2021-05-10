module.exports = {
    prefix:'',
    purge : {
        content : [
            './src/**/*.{html,ts}',
        ]
    },
    darkMode: 'class',
    theme: {
        screens:{
            'xs': { 'max':'599.98px'},
            'sm': { 'min':'600px', 'max':'959.98px' },
            'md': { 'min':'960px', 'max':'1279.98px' },
            'lg': { 'min':'1280px', 'max':'1919.98px'},
            'xl': { 'max':'1920px' }
        },
        extend: {},
    },
    variants: {
        extend: {},
    },
    plugins: [ ],//require('@tailwindcss/forms'), require('@tailwindcss/typography')],

};