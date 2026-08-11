
import type { Config } from "tailwindcss";

export default {
	darkMode: ["class"],
	content: [
		"./pages/**/*.{ts,tsx}",
		"./components/**/*.{ts,tsx}",
		"./app/**/*.{ts,tsx}",
		"./src/**/*.{ts,tsx}",
	],
	prefix: "",
	theme: {
		container: {
			center: true,
			padding: '2rem',
			screens: {
				'2xl': '1400px'
			}
		},
		extend: {
			colors: {
				border: 'hsl(var(--border))',
				input: 'hsl(var(--input))',
				ring: 'hsl(var(--ring))',
				background: 'hsl(var(--background))',
				foreground: 'hsl(var(--foreground))',
				viralOrange: '#ff6a00',
				viralDark: '#0f0f0f',
				viralGray: '#1e1e1e',
				viralLight: '#f5f5f5',
				// Piel "Cuadrilla" de la web pública. Vive aparte de los tokens
				// de shadcn a propósito: el dashboard y el admin siguen con los
				// suyos y no se enteran de este rediseño.
				//
				// La idea es la obra: cartel, franja de peligro, marrón de
				// madera y el amarillo de las cintas. Cálida, no fría — el
				// intento anterior era azul tinta y se sintió distante para un
				// techista.
				vc: {
					marron: '#23180F',   // header, secciones oscuras, texto sobre claro
					marron2: '#2F2013',  // superficie elevada dentro de lo oscuro
					marron3: '#4A3520',  // bordes y texto secundario sobre crema
					marron4: '#5A4128',  // bordes dentro de lo oscuro
					crema: '#FFF9F0',    // el fondo de la página
					tinta: '#2A1B0E',    // el texto sobre crema
					// El naranja de la marca. Sobre el marrón da 6,05:1 y se usa
					// libre; sobre el crema da 2,74:1 y NO pasa AA ni de lejos,
					// así que ahí solo va como RELLENO (botones, bandas), nunca
					// como texto.
					naranja: '#FF6A00',
					// Naranja para TEXTO sobre crema: 4,58:1, pasa AA en
					// cualquier tamaño y sigue leyéndose naranja.
					oxido: '#C24E00',
					quemado: '#B44A00',  // hover de los rellenos naranjas y bordes
					amarillo: '#FFC42E', // franjas de peligro, etiquetas, subrayados
					alerta: '#FF3D00',   // solo el cronómetro "TÚ, SIN CONTESTAR"
					arena: '#C9A97F',    // texto secundario sobre marrón
					hueso: '#F2E3C9',    // texto corrido sobre marrón
					polvo: '#8A6B47',    // notas al pie en mono
					// El chat usa los colores REALES de WhatsApp: es lo que hace
					// que se lea como un teléfono y no como una ilustración.
					waFondo: '#E5DDD5',
					waVerde: '#DCF8C6',
					waBarra: '#54473B',
				},
				primary: {
					DEFAULT: 'hsl(var(--primary))',
					foreground: 'hsl(var(--primary-foreground))'
				},
				secondary: {
					DEFAULT: 'hsl(var(--secondary))',
					foreground: 'hsl(var(--secondary-foreground))'
				},
				destructive: {
					DEFAULT: 'hsl(var(--destructive))',
					foreground: 'hsl(var(--destructive-foreground))'
				},
				muted: {
					DEFAULT: 'hsl(var(--muted))',
					foreground: 'hsl(var(--muted-foreground))'
				},
				accent: {
					DEFAULT: 'hsl(var(--accent))',
					foreground: 'hsl(var(--accent-foreground))'
				},
				popover: {
					DEFAULT: 'hsl(var(--popover))',
					foreground: 'hsl(var(--popover-foreground))'
				},
				card: {
					DEFAULT: 'hsl(var(--card))',
					foreground: 'hsl(var(--card-foreground))'
				},
				sidebar: {
					DEFAULT: 'hsl(var(--sidebar-background))',
					foreground: 'hsl(var(--sidebar-foreground))',
					primary: 'hsl(var(--sidebar-primary))',
					'primary-foreground': 'hsl(var(--sidebar-primary-foreground))',
					accent: 'hsl(var(--sidebar-accent))',
					'accent-foreground': 'hsl(var(--sidebar-accent-foreground))',
					border: 'hsl(var(--sidebar-border))',
					ring: 'hsl(var(--sidebar-ring))'
				}
			},
			borderRadius: {
				lg: 'var(--radius)',
				md: 'calc(var(--radius) - 2px)',
				sm: 'calc(var(--radius) - 4px)'
			},
			keyframes: {
				'accordion-down': {
					from: {
						height: '0'
					},
					to: {
						height: 'var(--radix-accordion-content-height)'
					}
				},
				'accordion-up': {
					from: {
						height: 'var(--radix-accordion-content-height)'
					},
					to: {
						height: '0'
					}
				}
			},
			animation: {
				'accordion-down': 'accordion-down 0.2s ease-out',
				'accordion-up': 'accordion-up 0.2s ease-out'
			},
			fontFamily: {
				// No se pisa `sans` a propósito: eso cambiaría la tipografía del
				// dashboard y del admin, que no son parte de este rediseño.
				display: ['"Barlow Condensed"', 'system-ui', 'sans-serif'],
				body: ['Barlow', 'system-ui', 'sans-serif'],
				mono: ['"JetBrains Mono"', 'ui-monospace', 'monospace'],
			},
			backgroundImage: {
				// La franja de peligro: el guiño a la obra que hace reconocible
				// la piel. Va bajo el header y como separador de las secciones
				// clave — sin abusar, o deja de significar algo.
				'franja-peligro':
					'repeating-linear-gradient(-45deg,#FFC42E 0 18px,#23180F 18px 36px)',
			},
			boxShadow: {
				// Sombras duras, sin difuminado: es un cartel impreso, no una
				// tarjeta flotando.
				dura: '5px 5px 0 #23180F',
				'dura-lg': '8px 8px 0 #FFC42E',
				'dura-marron': '6px 6px 0 #23180F',
			}
		}
	},
	plugins: [require("tailwindcss-animate")],
} satisfies Config;
