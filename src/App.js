import './App.css';

// 컴포넌트
function Header() {
  return <header>
    <h1>
      <a href='/'>React</a>
    </h1>
  </header>
}

function Nav() {
  return <nav>
    <ol>
      <li><a href='/read/1'>html</a></li>
      <li><a href='/read/2'>css</a></li>
      <li><a href='/read/3'>js</a></li>
    </ol>
  </nav>
}

function Article() {
  return <article>
    <h2>Welcome</h2>
    Hello, WEB
  </article>
}

function App() {
  return (
    <div>
      <Header />
      <Header />  {/* 한 코드를 여러 개 복사하거나 여러 개의 코드를 수정할 때에도 용이함 */}
      <Nav />
      <Article />
    </div>
  );
}

export default App;
