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
      <a id={t.id} href={'/read/' + t.id} onClick={event => {
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

function Create(props) {
  return (<article>
    <h2>Create</h2>
    <form onSubmit={event => {
      event.preventDefault();  // submit 버튼을 눌렀을 때 페이지 새로고침을 막음
      const title = event.target.title.value;  // event를 발생한 타겟인 form 태그의 title인 value 값
      const body = event.target.body.value;
      props.onCreate(title, body);
    }}>
      <p><input type='text' name='title' placeholder='title' /></p>
      <p><textarea name='body' placeholder='body' /></p>
      <p><input type='submit' value='Create' /></p>
    </form>
  </article>
  );
}

function Update(props) {
  const [title, setTitle] = useState(props.title);
  const [body, setBody] = useState(props.body);
  return (<article>
    <h2>Update</h2>
    <form onSubmit={event => {
      event.preventDefault();  // submit 버튼을 눌렀을 때 페이지 새로고침을 막음
      const title = event.target.title.value;
      const body = event.target.body.value;
      props.onUpdate(title, body);
    }}>
      <p><input type='text' name='title' placeholder='title' value={title} onChange={event => {
        setTitle(event.target.value);  // 가장 최근에 변경된 값을 새로운 값으로 변경
      }} /></p>
      <p><textarea name='body' placeholder='body' value={body} onChange={event => {
        setBody(event.target.value);
      }} /></p>
      <p><input type='submit' value='Update' /></p>
    </form>
  </article>
  );
}

function App() {
  const [mode, setMode] = useState('WELCOME');
  const [id, setId] = useState(null);
  const [nextId, setNextId] = useState(4);
  const [topics, setTopics] = useState([
    { id: 1, title: 'html', body: 'html is...' },
    { id: 2, title: 'css', body: 'css is...' },
    { id: 3, title: 'js', body: 'js is...' },
  ]);  // topics를 변경할 수 있도록 승격시킴
  let content = null;
  let contextControl = null;  // 맥락적으로 노출되는 UI
  if (mode === 'WELCOME') {
    content = <Article title="Welcome" body="Hello, WEB" />
  } else if (mode === 'READ') {
    let title, body = null;
    for (let i = 0; i < topics.length; i++) {
      if (topics[i].id === id) {
        title = topics[i].title;
        body = topics[i].body;
      }
    }
    content = <Article title={title} body={body} />
    contextControl = <>
      <li><a href={'/update/' + id} onClick={event => {
        event.preventDefault();
        setMode('UPDATE');
      }}>Update</a></li>
      <li><input type='button' value='Delete' onClick={()=>{
        const newTopics = []
        for(let i = 0; i < topics.length; i++) {
          if(topics[i].id !== id) {  // 클릭한 요소 빼고 모두 출력
            newTopics.push(topics[i]);
          }
        }
        setTopics(newTopics);
        setMode('WELCOME');
      }}/></li>
    </>
  } else if (mode === 'CREATE') {
    content = <Create onCreate={(_title, _body) => {
      const newTopic = { id: nextId, title: _title, body: _body }
      const newTopics = [...topics];  // 배열만 복제할 시 대괄호([]) 사용
      newTopics.push(newTopic);
      setTopics(newTopics);
      setMode('READ');  // create 버튼을 누르면 쓴 글의 내용을 바로 보여줌
      setId(nextId);  // 생성된 글의 인덱스
      setNextId(nextId + 1);  // 생성된 글의 다음 인덱스
    }}></Create>
  } else if (mode === 'UPDATE') {
    let title, body = null;
    for (let i = 0; i < topics.length; i++) {
      if (topics[i].id === id) {
        title = topics[i].title;
        body = topics[i].body;
      }
    }
    content = <Update title={title} body={body} onUpdate={(title, body) => {
      const newTopics = [...topics]
      const updatedTopic = { id: id, title: title, body: body }
      for (let i = 0; i < newTopics.length; i++) {
        if (newTopics[i].id === id) {
          newTopics[i] = updatedTopic
          break
        }
      }
      setTopics(newTopics);
      setMode('READ');
    }}></Update>
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
      <ul>
        <li><a href='/create' onClick={event => {
          event.preventDefault();
          setMode('CREATE');
        }}>Create</a></li>
        {contextControl}
      </ul>
    </div>
  );
}

export default App;
