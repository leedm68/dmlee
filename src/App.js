import React from 'react';
import {EditorState} from "prosemirror-state"
import {EditorView} from "prosemirror-view"
import {Schema, DOMParser} from "prosemirror-model"
import {schema} from "prosemirror-schema-basic"
import {addListNodes} from "prosemirror-schema-list"
import {exampleSetup} from "prosemirror-example-setup"
import styles from './App.css';


function App() {
  const editorRef = React.useRef();
  const viewRef = React.useRef();
  const mySchema = new Schema({
    nodes: addListNodes(schema.spec.nodes, "paragraph block*", "block"),
    marks: schema.spec.marks
  })
  const [state] = React.useState(
    EditorState.create({
      schema: mySchema,
      plugins: exampleSetup({schema: mySchema})
    })
  );

  React.useEffect(() => {
    console.log("test",editorRef.current)
    if (!editorRef.current) return;
    const view = new EditorView(editorRef.current, {
        state :  state
    });
    viewRef.current = view;
    console.log(state)
    return () => view.destroy()
  }, [state])

  return (
    <div className="App">
      <div className={styles.container} ref={editorRef} />
    </div>
  );
}

export default App;
