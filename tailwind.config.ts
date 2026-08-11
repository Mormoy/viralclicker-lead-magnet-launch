
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
				// Paleta de la web pública. Vive aparte de los tokens de shadcn
				// a propósito: el dashboard y el admin siguen con los suyos y no
				// se enteran de este rediseño.
				//
				// La idea: turno de noche. Fondo tinta azulada (no negro plano),
				// y los artefactos del oficio —la orden de trabajo, la
				// transcripción, el chat— en papel. Ese contraste papel/tinta es
				// lo que da imagen a una página que no tiene fotos.
				vc: {
					ink: '#0B1220',      // el fondo, azul tinta
					ink2: '#101B2D',     // superficie elevada
					ink3: '#18273E',     // bordes y separadores
					paper: '#F3F0EA',    // documentos
					paperDim: '#DAD4C8', // papel en segundo plano
					steel: '#8FA2BC',    // texto secundario sobre tinta
					// El naranja de la marca. Reservado para el reloj y el CTA
					// principal: si todo es naranja, nada es urgente.
					signal: '#FF6A00',
					wa: '#25D366',       // solo dentro del hilo de WhatsApp
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
				display: ['"Bricolage Grotesque"', 'system-ui', 'sans-serif'],
				body: ['"Public Sans"', 'system-ui', 'sans-serif'],
				mono: ['"IBM Plex Mono"', 'ui-monospace', 'monospace'],
			}
		}
	},
	plugins: [require("tailwindcss-animate")],
} satisfies Config;
