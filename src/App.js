import './App.css';
import { useState } from 'react';

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
        props.onChangeMode(Number(event.target.id));  // target == a태그
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
  // const _mode = useState('WELCOME');  // state의 초기값
  // const mode = _mode[0];  // state의 값은 _mode[0]으로 읽음
  // const setMode = _mode[1];  // state의 값을 변경하려면 _mode[1]의 함수로 바꿈
  const [mode, setMode] = useState('WELCOME');  // 위 3줄과 같은 코드
  const [id, setId] = useState(null);
  const topics = [
    { id: 1, title: 'html', body: 'html is...' },
    { id: 2, title: 'css', body: 'css is...' },
    { id: 3, title: 'js', body: 'js is...' },
  ]
  let content = null;
  if(mode === 'WELCOME') {
    content = <Article title="Welcome" body="Hello, WEB" />
  } else if(mode === 'READ') {
    let title, body = null;
    for(let i = 0; i <topics.length; i++) {
      console.log(topics[i].id, id);
      if(topics[i].id === id) {
        title = topics[i].title;
        body = topics[i].body;
      }
    }
    content = <Article title={title} body={body} />
  }
  return (
    <div>
      <Header title="WEB" onChangeMode={() => {
        setMode('WELCOME');
      }} />
      <Nav topics={topics} onChangeMode={(_id) => {
        setMode('READ');
        setId(_id);
      }} />  {/* 있는 그대로 전달하기 위해 중괄호({})를 사용 */}
      {content}
    </div>
  );
}

export default App;
