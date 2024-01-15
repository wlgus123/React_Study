import './App.css';

// 컴포넌트
function Header(props) {
  return <header>
    <h1><a href='/'>{props.title}</a></h1>
  </header>
}

function Nav(props) {
  const lis = []
  for (let i = 0; i < props.topics.length; i++) {
    let t = props.topics[i]
    lis.push(<li key={t.id}><a href={'/read/' + t.id}>{t.title}</a></li>)
    // key={t.id}를 줌으로써 고유 id를 가지게 됨
  }
  return <nav>
    <ol>
      {lis}
    </ol>
  </nav>
}

function Article(props) {
  return <article>
    <h2>{props.title}</h2>
    {props.body}
  </article>
}

function App() {
  const topics = [
    { id: 1, title: 'html', body: 'html is...' },
    { id: 2, title: 'css', body: 'css is...' },
    { id: 3, title: 'js', body: 'js is...' },
  ]
  return (
    <div>
      <Header title="REACT" />
      <Nav topics={topics} />  {/* 있는 그대로 전달하기 위해 중괄호({})를 사용 */}
      <Article title="Welcome" body="Hello, WEB" />
      <Article title="Hi" body="Hello, React" />  {/* 같은 코드라도 다르게 출력할 수 있음 */}
    </div>
  );
}

export default App;
