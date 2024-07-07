import React from 'react'
import { CodeiumEditor } from "@codeium/react-code-editor";


const Editor = ({SelectedFile}) => {

  return (
    <div className="EditorComponent">
        <p>Here's an AI-powered Python editor using Codeium. {SelectedFile}</p>
        <CodeiumEditor
            value=""
            language="python"
            options={{
                fontSize: 14,
                lineHeight: 24,
                minimap: {
                    enabled: false,
                },
            }}
        />

    </div>
  )
}

export default Editor