import './globals.css'

export const metadata = {
  title: 'Gestion de Alertas',
  description: 'Banco GYT Continental',

}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
