import Provider from './Provider'
// @ts-ignore
import * as style from './page.css'

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="ja">
      <head />
      <body>
        {/* @ts-ignore */}
        <div className={style.root}>
          <Provider>{children}</Provider>
        </div>
      </body>
    </html>
  )
}
