import { EditorState } from "prosemirror-state";
import {Plugin} from "prosemirror-state"
import { schema } from "prosemirror-schema-basic";
import React from "react"
import { EditorView } from "prosemirror-view";
import SelectionSizeTooltip from "./SelectionSizeTooltip"
import {exampleSetup}  from "prosemirror-example-setup";

import styles from './App.css';

function App(params) {
    const editorRef = React.useRef();
    const viewRef = React.useRef();

    const selectionSizePlugin = new Plugin({
        view(editorView) { return new SelectionSizeTooltip(editorView) }
    })

    const [state] = React.useState(
        EditorState.create({
            schema,
            plugins: exampleSetup({schema}).concat(selectionSizePlugin)
        })
    )
    React.useEffect(() => {
        if (!editorRef.current) return;
        const view = new EditorView(editorRef.current,{ state : state})
        viewRef.current = view;
        return () => view.destroy();
    },[state])

    return (<div>
            <div id="editor" className={styles.container} ref={editorRef} />
    </div>)
}

export default App;