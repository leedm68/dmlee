import React from 'react'
import {EditorState} from "prosemirror-state"
import {EditorView} from "prosemirror-view"
import {Schema, DOMParser} from "prosemirror-model"
import {schema} from "prosemirror-schema-basic"
import {addListNodes} from "prosemirror-schema-list"
import {exampleSetup} from "prosemirror-example-setup"
import {MenuItem} from "prosemirror-menu"
import {buildMenuItems} from "prosemirror-example-setup"
import { dinoNodeSpec, dinos } from './dinoNodeSpec'
import styles from './App.css';

function App() {

    const editorRef = React.useRef();
    const viewRef = React.useRef();
    const dinoSchema = new Schema({
        nodes: schema.spec.nodes.addBefore("image", "dino", dinoNodeSpec),
        marks : schema.spec.marks
    })
    const dinoType = dinoSchema.nodes.dino;

    const insertDino = (type) => {
        return function(state, dispatch) {
          let {$from} = state.selection, index = $from.index()
          if (!$from.parent.canReplaceWith(index, index, dinoType))
            return false
          if (dispatch)
            dispatch(state.tr.replaceSelectionWith(dinoType.create({type})))
          return true
        }
    }
    const menu = buildMenuItems(dinoSchema)
    // Add a dino-inserting item for each type of dino
    dinos.forEach(name => menu.insertMenu.content.push(
        new MenuItem({
            title: "Insert " + name,
            label: name.charAt(0).toUpperCase() + name.slice(1),
            enable(state) { return insertDino(name)(state) },
            run: insertDino(name)
        })
        )
    )

    const [state] = React.useState(
        EditorState.create({
            schema:dinoSchema,
            plugins: exampleSetup({schema: dinoSchema, menuContent: menu.fullMenu})
        })
    )
    React.useEffect(() =>{
        if(!editorRef.current) return;
        const view = new EditorView(editorRef.current, { state : state});
        viewRef.current = view;
        return () => view.destroy();
    },[state])


    return (
        <div>
            <div className={styles.container} ref={editorRef} />
        </div>
    )
}

export default App;