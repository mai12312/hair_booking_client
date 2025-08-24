import type { Config } from "tailwindcss"

const config = {
  darkMode: ["class"],
  content: [
    './pages/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './app/**/*.{ts,tsx}',
    './src/**/*.{ts,tsx}',
  ],
  prefix: "",
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      transitionDuration: {
        '2000': '2000ms',
      },
      transitionProperty: {
        'width': 'width 2s',
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
        "scale-width-100": {
          '0%': { width: '0%' },
          '100%': { width: '100%' },
        },
        'page-2': { 
          '0%, 35%': { 
            transform: 'rotateY(180deg)', 
            opacity: '0' 
          }, 
          '20%': { 
            opacity: '1' 
          }, 
          '50%, 100%': { 
            transform: 'rotateY(0deg)', opacity: '0' 
          }, 
        }, 
        'page-3': { 
          '15%, 50%': { 
            transform: 'rotateY(180deg)', 
            opacity: '0' 
          }, 
          '35%': { 
            opacity: '1' 
          }, 
          '65%, 100%': { 
            transform: 'rotateY(0deg)', opacity: '0' 
          }, 
        }, 
        'page-4': { 
          '30%, 65%': {
             transform: 'rotateY(180deg)', opacity: '0' 
            }, 
            '50%': { 
              opacity: '1' 
            }, 
            '80%, 100%': { 
              transform: 'rotateY(0deg)', opacity: '0' 
            }, 
          }, 
          'page-5': { 
            '45%, 80%': { 
              transform: 'rotateY(180deg)', opacity: '0' 
            }, 
            '65%': { 
              opacity: '1' 
            }, 
            '95%, 100%': { 
              transform: 'rotateY(0deg)', opacity: '0' 
            }, 
          }
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        "scale-width-100": "scale-width-100 0.5s ease-out",
        'page-2': 'page-2 3s ease infinite', 
        'page-3': 'page-3 3s ease infinite', 
        'page-4': 'page-4 3s ease infinite', 
        'page-5': 'page-5 3s ease infinite'
      },
      // backgroundImage: {
      //   "background-banner": "url('https://th.bing.com/th/id/R.76c40ac2113966a69f86c7eef6f5ccc2?rik=zrOM3KMmLyCt5Q&riu=http%3a%2f%2f1.bp.blogspot.com%2f-cq8_pKOSCW4%2fUjiE5v_ScOI%2fAAAAAAAAAHw%2fWkblD-dMWpI%2fs1600%2f299437www.animeartwallpaper.blogspot.com.jpg&ehk=mHC0m8nYzpQmMRfOjtnj2i%2bEXEJxC%2fzHM4TVqgGSsqY%3d&risl=&pid=ImgRaw&r=0')"
      // },
      // backgroundSize: {
      //   "lg-banner-msize": "lg:min-h-[500px]",
      //   "md-banner-msize": "md:min-h-[400px]",
      //   "banner-msize": "min-h-[200px]",
      // }

    },
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config

export default config

  // keyframes: {
  //     'fade-in-down': {
  //         '0%': {
  //             opacity: '0',
  //             transform: 'translateY(-10px)'
  //         },
  //         '100%': {
  //             opacity: '1',
  //             transform: 'translateY(0)'
  //         },
  //     },
  //     'fade-out-down': {
  //         'from': {
  //             opacity: '1',
  //             transform: 'translateY(0px)'
  //         },
  //         'to': {
  //             opacity: '0',
  //             transform: 'translateY(10px)'
  //         },
  //     },
  //     'fade-in-up': {
  //         '0%': {
  //             opacity: '0',
  //             transform: 'translateY(10px)'
  //         },
  //         '100%': {
  //             opacity: '1',
  //             transform: 'translateY(0)'
  //         },
  //     },
  //     'fade-out-up': {
  //         'from': {
  //             opacity: '1',
  //             transform: 'translateY(0px)'
  //         },
  //         'to': {
  //             opacity: '0',
  //             transform: 'translateY(10px)'
  //         },
  //     }
  // },
  // animation: {
  //     'fade-in-down': 'fade-in-down 0.5s ease-out',
  //     'fade-out-down': 'fade-out-down 0.5s ease-out',
  //     'fade-in-up': 'fade-in-up 0.5s ease-out',
  //     'fade-out-up': 'fade-out-up 0.5s ease-out'
  // }
