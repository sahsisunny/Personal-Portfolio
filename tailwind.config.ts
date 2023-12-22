import type { Config } from 'tailwindcss'


/*
:root{
  --color-primary: #392467;
  --color-secondary: #ffffff;
  --color-tertiary: #5D3587;
  --color-quaternary: #A367B1;
  --color-quinary: #FFD1E3;

}

*/
const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: 'white',
        textColor: 'white',
        secondary: 'black',
        tertiary: '#5D3587',
        quaternary: '#A367B1',
        quinary: '#FFD1E3',
      },
    },
  },
  plugins: [],
}
export default config
