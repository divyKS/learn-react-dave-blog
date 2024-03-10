const Header = ({ heading, width }) => {
    return (
      <header>
          <h1>{heading}<sup>{width}</sup></h1>

      </header>
    )
  }
  
  export default Header