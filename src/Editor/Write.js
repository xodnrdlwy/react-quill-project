import ReactQuill from "react-quill";
import { useState, useMemo, useRef } from "react";
import { useNavigate } from "react-router-dom";
import 'react-quill/dist/quill.snow.css';
import { storage } from "./Firebase";
import { uploadBytes, getDownloadURL, ref } from "firebase/storage";
import "./style.css";
import axios from "axios";

export function Write() {
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    const quillRef = useRef();
    const navigate = useNavigate();
    const handleSubmit = async () => {
        try {
            console.log("제목 : ", title);
            console.log("내용 : ", content);
            const formData = {
                title: title,
                content: content,
            };
            const response = await axios.post('/add', formData, {
                headers: {
                    'Content-Type': 'application/json',
                },
            });
            console.log('Success:', response.data);
            alert("게시물 올리기 성공!");
            navigate("/board/list");
        } catch (error) {
            console.error('Error:', error);
        }
    }



    const imageHandler = () => {
        const input = document.createElement("input");
        input.setAttribute("type", "file");
        input.setAttribute("accept", "image/*");
        input.click();
        input.addEventListener("change", async () => {
            const file = input.files[0];
            const quill = quillRef.current.getEditor();
            const range = quill.getSelection(true);

            if (file) {
                try {
                    const storageRef = ref(storage, `images/${Date.now()}`);
                    const snapshot = await uploadBytes(storageRef, file);
                    const url = await getDownloadURL(snapshot.ref);

                    quill.insertEmbed(range.index, 'image', url);
                    quill.setSelection(range.index + 1);
                } catch (error) {
                    console.error("Image upload failed: ", error);
                }
            }
        });
    };

    const modules = useMemo(() => {
        return {
            toolbar: {
                container: [
                    [{ header: [1, 2, 3, 4, 5, 6, false] },
                        "bold", "italic", "underline", "strike", "blockquote",
                        { list: "ordered" }, { list: "bullet" },
                        "link", "image", "color", "background",
                        { align: ["right", "center", "justify"] },
                        { size: [] }, { font: [] }],
                ],
                handlers: {
                    image: imageHandler,
                },
            },
        };
    }, []);

    return (
        <div className="Editor-write">
            <div className="write-input">
                <input
                    className="write-input-title"
                    type="text"
                    placeholder="제목"
                    name="title"
                    onChange={(e) => setTitle(e.target.value)}
                />
            </div>
            <div className="write-editor">
                <ReactQuill
                    ref={quillRef}
                    style={{ width: '35%', height: '500px', borderRadius: '5px' }}
                    theme="snow"
                    value={content}
                    modules={modules}
                    onChange={setContent}
                />
            </div>
            <div className="write-submit">
                <button className="submit-button" onClick={handleSubmit}>
                    제 출
                </button>
            </div>
        </div>
    );
}
