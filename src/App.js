import './App.css';

// 컴포넌트
function Article(props) {
  return <article>
    <h2>{props.title}</h2>
    {props.body}
  </article>
}

function Header(props) {
  return <header>
    <h1><a href='/' onClick={(event) => {
      event.preventDefault();  // 기본 동작 방지 (클릭해도 reload가 일어나지 않음)
      props.onChangeMode();  // onChangeMode 함수를 호출함
    }}>{props.title}</a></h1>
  </header>
}

function Nav(props) {
  const lis = []
  for (let i = 0; i < props.topics.length; i++) {
    let t = props.topics[i]
    lis.push(<li key={t.id}>
      <a id={t.id} href={'/read/' + t.id} onClick={event=>{
        event.preventDefault();
        props.onChangeMode(event.target.id);  // target == a태그
      }}>{t.title}</a>
      {/* key={t.id}를 줌으로써 고유 id를 가지게 됨 */}
    </li>)
  }
  return <nav>
    <ol>
      {lis}
    </ol>
  </nav>
}

function App() {
  const topics = [
    { id: 1, title: 'html', body: 'html is...' },
    { id: 2, title: 'css', body: 'css is...' },
    { id: 3, title: 'js', body: 'js is...' },
  ]
  return (
    <div>
      <Header title="WEB" onChangeMode={() => {
        alert('Header');
      }} />
      <Nav topics={topics} onChangeMode={(id) => {
        alert(id);
      }} />  {/* 있는 그대로 전달하기 위해 중괄호({})를 사용 */}
      <Article title="Welcome" body="Hello, WEB" />
    </div>
  );
}

export default App;
