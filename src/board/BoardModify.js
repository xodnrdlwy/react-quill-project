import React, {useEffect, useMemo, useRef, useState} from "react";
import axios from "axios";
import {useParams} from "react-router-dom";
import {getDownloadURL, ref, uploadBytes} from "firebase/storage";
import {storage} from "../Editor/Firebase";
import ReactQuill from "react-quill";
import {Button, Flex, message, Popconfirm} from "antd";
import { useNavigate } from "react-router-dom";
export function BoardModify () {
    const [boardData, setBoardData] = useState([]);
    const {bid} = useParams();
    const quillRef = useRef();
    const navigate = useNavigate();

    useEffect(() => {
        axios.get(`/showBoard/${bid}`)
            .then(response => {
                setBoardData(response.data);
                console.log("response Data : {} ", response.data);

                // 데이터를 가져온 후에 title과 content를 설정
                setTitle(response.data.title);
                setContent(response.data.content);
            })
            .catch(error => {
                console.error("Error Axios Data :", error);
            })
    }, [bid]);

    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');

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

    const updateButton = async () => {
        try {
            const formData = {  // 서버로 보낼 단일 객체 데이터
                title: title,
                content: content,
                bid: bid,
            };
            const response = await axios.put(`/modifyBoard/${bid}`, formData, {
                headers: {
                    'Content-Type': 'application/json',
                },
            });
            console.log("Success : ", response.data);
            alert("게시물 수정 성공!");
            navigate(`/board/detail/${bid}`);
        } catch (error) {
            console.error('Error : ', error);
        }
    }
    const cancleButton = (e) => {
        navigate("/board/detail/{bid}");
    }
    const cancel = (e) => {
        message.error('취소하였습니다.');
    };

    return (
        <div className="Editor-write">
            <div className="write-input">
                <input
                    className="write-input-title"
                    type="text"
                    placeholder="제목"
                    value={title}
                    name="title"
                    onChange={(e) => setTitle(e.target.value)}
                >
                </input>
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
            <Flex wrap="wrap" gap="small" className="site-button-ghost-wrapper">
                <Popconfirm
                title="게시물 수정"
                description="수정하시겠습니까?"
                okText="예"
                cancelText="아니오"
                onConfirm={updateButton}
                onCancel={cancel}
                >
                <Button type="primary" ghost >
                    Update
                </Button>
                </Popconfirm>
                <Popconfirm
                    title="취소"
                    okText="예"
                    cancelText="아니오"
                    onConfirm={cancleButton}
                    onCancel={cancel}
                >
                <Button type="primary" ghost>
                    Cancle
                </Button>
                </Popconfirm>
            </Flex>
            </div>
        </div>
    );
}

