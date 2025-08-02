import { AuthProvider } from "./contexts/AuthContext"
import Header from "./components/Header"
import "./globals.css"

export const metadata = {
  title: "Society Meeting Keeper",
  description: "Manage society meetings and minutes",
    generator: 'v0.dev'
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <AuthProvider>
          <Header />
          <main>{children}</main>
        </AuthProvider>
      </body>
    </html>
  )
}
