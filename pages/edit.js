import { useState } from "react";
import dynamic from "next/dynamic";

const QuillWrapper = dynamic(() => import("./quillcomponent"), {
  ssr: false,
  loading: () => <p>Loading...</p>
});

export default function EditBlog() {
  const [dirtyInnerHTML, setDirtyInnerHTML] = useState();
  const [delta, setDelta] = useState({
    ops: [
      { insert: "Audre Toutou in " },
      { attributes: { bold: true }, insert: "Amelie 🤸‍♀️." },
      { insert: "\n" }
    ]
  });
  const [text, setText] = useState("");
  const [length, setLength] = useState("");

  console.log(delta);
  console.log(JSON.stringify(delta));

  function handleTextChange(content, delta, source, editor) {
    setDelta(editor.getContents()); // the delta
    setDirtyInnerHTML(editor.getHTML()); // innerhtml
    setText(editor.getText()); // text string
    setLength(editor.getLength()); // text length
  }

  return (
    <div>
      <QuillWrapper value={delta} onChange={handleTextChange} />
    </div>
  );
}
