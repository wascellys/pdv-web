import '../Navbar/style.css'

export const Navbar = () => {
  return (
    <header class="header">
      <div class="container">
        <div class="row align-items-center justify-content-between">
          <div class="logo">
            <a href="#">Caixa Livre</a>
          </div>
          {/* <button type="button" class="nav-toggler">
            <span></span>
          </button> */}
          {/* <nav class="nav">
            <ul>
              <li>
                <a href="#" class="active">
                  home
                </a>
              </li>
              <li>
                <a href="#">about</a>
              </li>
              <li>
                <a href="#">services</a>
              </li>
              <li>
                <a href="#">portfolio</a>
              </li>
              <li>
                <a href="#">testimonials</a>
              </li>
              <li>
                <a href="#">contact</a>
              </li>
            </ul>
          </nav> */}
        </div>
      </div>
    </header>
  );
};
