const YEAR = new Date().getFullYear()

const Page = () => { ... }
Page.theme = 'light'
export default Page

export default {
  footer: (
    <small style={{ display: 'block', marginTop: '8rem' }}>
      <time>{YEAR}</time> ©HousingSpanish. Creative Commons Attribution-ShareAlike 4.0 International License.
      <style jsx>{`
        a {
          float: right;
        }
        @media screen and (max-width: 480px) {
          article {
            padding-top: 2rem;
            padding-bottom: 4rem;
          }
        }
      `}</style>
    </small>
  )
}
