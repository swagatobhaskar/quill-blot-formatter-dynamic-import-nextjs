import dynamic from "next/dynamic";
import { useEffect, useState } from "react";

const QuillWrapper = dynamic(() => import("./quillcomponent"), {
  ssr: false,
  loading: () => <p>Loading...</p>
});

export default function Home() {
  const [delta, setDelta] = useState("");
  const [dirtyInnerHTML, setDirtyInnerHTML] = useState("");
  const [text, setText] = useState("");
  const [length, setLength] = useState("");
  console.log(delta);
  console.log(JSON.stringify(delta));

  //useEffect(() => {}, []);

  const handleTextChange = (content, delta, source, editor) => {
    setDelta(editor.getContents()); // the delta
    setDirtyInnerHTML(editor.getHTML()); // innerhtml
    setText(editor.getText()); // text string
    setLength(editor.getLength()); // text length
  };

  return (
    <div>
      <p>Index</p>
      <QuillWrapper onChange={handleTextChange} value={delta} />
    </div>
  );
}
